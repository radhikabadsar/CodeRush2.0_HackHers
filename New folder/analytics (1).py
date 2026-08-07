"""
analytics.py — Operations dashboard aggregates & evaluation metrics
(blueprint item 146; MVD item 152; eval item 153).

The hotspot/trend endpoint intentionally suppresses any bucket
(ward x category) with fewer than MIN_BUCKET_SIZE reports, so a single
resident's complaint can never be reverse-identified from a "trend"
view — this is the neighborhood-level analytics requirement without
exposing individual reporters.
"""
from db import get_conn
from sla import sla_state

MIN_BUCKET_SIZE = 3  # k-anonymity floor for any published aggregate


def resolution_funnel():
    conn = get_conn()

    def count(where, params=()):
        return conn.execute(f"SELECT COUNT(*) AS n FROM complaints WHERE {where}", params).fetchone()["n"]

    field_resolved = count("status IN ('resolved','awaiting_confirmation','disputed')")
    awaiting = count("status = 'awaiting_confirmation'")
    confirmed = count("status = 'resolved'")
    disputed = count("status = 'disputed'")
    return {
        "field_resolved": field_resolved,
        "awaiting_resident_confirmation": awaiting,
        "resident_confirmed": confirmed,
        "resident_disputed": disputed,
    }


def sla_and_override_metrics():
    conn = get_conn()
    rows = conn.execute("SELECT sla_due_at, status FROM complaints").fetchall()
    total = len(rows)
    breached = sum(1 for r in rows if sla_state(r["sla_due_at"], r["status"]) == "breached")
    at_risk = sum(1 for r in rows if sla_state(r["sla_due_at"], r["status"]) == "at_risk")

    total_reviewed = conn.execute(
        "SELECT COUNT(DISTINCT complaint_id) AS n FROM audit_log WHERE action='overridden'"
    ).fetchone()["n"]
    override_rate = round(total_reviewed / total, 3) if total else 0.0

    dup_flagged = conn.execute(
        "SELECT COUNT(*) AS n FROM complaints WHERE duplicate_of IS NOT NULL"
    ).fetchone()["n"]

    needs_review = conn.execute(
        "SELECT COUNT(*) AS n FROM complaints WHERE needs_human_review = 1"
    ).fetchone()["n"]

    return {
        "total_complaints": total,
        "sla_breached": breached,
        "sla_at_risk": at_risk,
        "human_override_rate": override_rate,
        "duplicates_merged": dup_flagged,
        "flagged_for_human_review": needs_review,
    }


def neighborhood_hotspots():
    """
    Ward x category counts, with small buckets suppressed. No resident
    id, complaint id, or free text is included — this endpoint is safe
    to expose on a public-facing dashboard.
    """
    conn = get_conn()
    rows = conn.execute(
        """SELECT ward, category, COUNT(*) AS n
           FROM complaints
           WHERE ward IS NOT NULL AND category IS NOT NULL
           GROUP BY ward, category"""
    ).fetchall()
    return [
        {"ward": r["ward"], "category": r["category"], "count": r["n"]}
        for r in rows if r["n"] >= MIN_BUCKET_SIZE
    ]


def language_and_channel_parity():
    """Fairness/accessibility check (blueprint item 147): are outcomes
    (e.g. share flagged for human review) comparable across language and
    channel, or is one group systematically worse-served?"""
    conn = get_conn()
    rows = conn.execute(
        """SELECT lang, channel,
                  COUNT(*) AS total,
                  SUM(needs_human_review) AS flagged,
                  SUM(CASE WHEN status='resolved' THEN 1 ELSE 0 END) AS resolved
           FROM complaints GROUP BY lang, channel"""
    ).fetchall()
    return [
        {
            "lang": r["lang"], "channel": r["channel"], "total": r["total"],
            "flagged_for_review_rate": round((r["flagged"] or 0) / r["total"], 2) if r["total"] else 0,
            "resolved_rate": round((r["resolved"] or 0) / r["total"], 2) if r["total"] else 0,
        }
        for r in rows
    ]
