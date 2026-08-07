"""
db.py — SQLite persistence layer.

Zero third-party dependencies on purpose: this backend is meant to run
anywhere a plain `python3` is available (hackathon judging boxes,
offline demos, CI, etc). All tables are created idempotently on import.
"""
import sqlite3
import os
import threading
import json
from datetime import datetime, timezone

DB_PATH = os.path.join(os.path.dirname(__file__), "redressal.db")

_local = threading.local()


def get_conn():
    """One SQLite connection per thread (http.server uses a thread pool)."""
    if not hasattr(_local, "conn"):
        conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        conn.execute("PRAGMA foreign_keys = ON")
        _local.conn = conn
    return _local.conn


def now_iso():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


SCHEMA = """
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('resident','ops')),
    lang TEXT DEFAULT 'en',
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS complaints (
    id TEXT PRIMARY KEY,
    reference_number TEXT UNIQUE NOT NULL,
    resident_id TEXT NOT NULL,
    lang TEXT DEFAULT 'en',
    channel TEXT DEFAULT 'web',                 -- web | sms | voice | low_bandwidth
    raw_text TEXT NOT NULL,                      -- original, access-controlled
    redacted_text TEXT NOT NULL,                 -- PII-stripped, safe for ops/analytics views
    category TEXT,
    category_source TEXT,                        -- 'resident' | 'classifier' | 'human_override'
    priority TEXT,                                -- low | medium | high | critical
    confidence REAL,
    needs_human_review INTEGER DEFAULT 0,
    explanation TEXT,
    department TEXT,
    ward TEXT,
    lat REAL,
    lng REAL,
    address_text TEXT,
    disability_access_need INTEGER DEFAULT 0,
    consent_public_trends INTEGER DEFAULT 1,      -- resident consented to anonymised trend use
    retention_expires_at TEXT,
    status TEXT NOT NULL DEFAULT 'submitted',
    duplicate_of TEXT,                            -- reference_number of the canonical complaint
    sla_hours REAL,
    sla_due_at TEXT,
    escalated INTEGER DEFAULT 0,
    resolved_note TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    complaint_id TEXT NOT NULL,
    actor TEXT NOT NULL,                          -- user id or 'system'
    actor_role TEXT,
    action TEXT NOT NULL,                         -- submitted | classified | routed | overridden | escalated | resolved | confirmed | disputed
    reason TEXT,
    detail TEXT,                                   -- JSON blob of before/after values
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_complaints_dept ON complaints(department);
CREATE INDEX IF NOT EXISTS idx_complaints_resident ON complaints(resident_id);
CREATE INDEX IF NOT EXISTS idx_audit_complaint ON audit_log(complaint_id);
"""


def init_db():
    conn = get_conn()
    conn.executescript(SCHEMA)
    conn.commit()


def row_to_dict(row: sqlite3.Row) -> dict:
    return {k: row[k] for k in row.keys()}


def log_audit(complaint_id, actor, actor_role, action, reason=None, detail=None):
    conn = get_conn()
    conn.execute(
        """INSERT INTO audit_log (complaint_id, actor, actor_role, action, reason, detail, created_at)
           VALUES (?,?,?,?,?,?,?)""",
        (complaint_id, actor, actor_role, action, reason,
         json.dumps(detail) if detail is not None else None, now_iso()),
    )
    conn.commit()
