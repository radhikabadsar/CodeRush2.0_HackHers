/**
 * Community Redressal Planner - Core Frontend JavaScript Application
 * Architecture: Pure Vanilla ES6 JavaScript (Zero-Build)
 * Security: Strict Role-Based Authorization Guard (RESIDENT, OFFICER, ADMIN)
 * Persistence: LocalStorage for demo session & complaints state
 * Libraries: Leaflet.js for maps, FontAwesome 6 for icons
 */

// ==========================================
// 1. MULTILINGUAL TRANSLATION DICTIONARY
// ==========================================
const TRANSLATIONS = {
  en: {
    app_title: "COMMUNITY REDRESSAL PLANNER",
    tagline: "Report issues. Track action. Build better communities.",
    welcome_resident: "Good morning 👋",
    welcome_subtitle: "Track your reported civic complaints and monitor municipal SLA resolution status.",
    report_issue_title: "Report an Issue",
    report_issue_sub: "Tell us what's wrong in your community. We'll help route it to the right service team.",
    cat_road: "Road Damage / Potholes",
    cat_garbage: "Garbage / Waste",
    cat_water: "Water Leakage",
    cat_light: "Streetlight",
    cat_sewage: "Sewage",
    cat_safety: "Public Safety",
    cat_access: "Accessibility",
    cat_other: "Other",
    submit_btn: "Submit Complaint",
    privacy_notice: "🛡️ Privacy Protected: Only information necessary to process this complaint is shared with the responsible service team.",
    my_complaints: "My Complaints",
    civic_map: "Civic Map",
    track_complaint: "Track Complaint",
    dashboard: "Dashboard",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",
    access_denied: "ACCESS RESTRICTED",
    access_denied_sub: "You do not have permission to access this area."
  },
  hi: {
    app_title: "सामुदायिक निवारण योजनाकार",
    tagline: "समस्याएं दर्ज करें। कार्रवाई ट्रैक करें। बेहतर समुदाय बनाएं।",
    welcome_resident: "शुभ प्रभात 👋",
    welcome_subtitle: "अपनी दर्ज शिकायतों को ट्रैक करें और नगर निगम निवारण स्थिति की निगरानी करें।",
    report_issue_title: "समस्या दर्ज करें",
    report_issue_sub: "हमें बताएं कि आपके समुदाय में क्या समस्या है। हम इसे सही सेवा टीम तक पहुंचाएंगे।",
    cat_road: "सड़क की क्षति / गड्ढे",
    cat_garbage: "कचरा / अपशिष्ट",
    cat_water: "पानी का रिसाव",
    cat_light: "स्ट्रीटलाइट",
    cat_sewage: "सीवरेज",
    cat_safety: "सार्वजनिक सुरक्षा",
    cat_access: "पहुंच क्षमता",
    cat_other: "अन्य",
    submit_btn: "शिकायत दर्ज करें",
    privacy_notice: "🛡️ गोपनीयता सुरक्षित: केवल इस शिकायत को हल करने के लिए आवश्यक जानकारी ही सेवा टीम के साथ साझा की जाती है।",
    my_complaints: "मेरी शिकायतें",
    civic_map: "नागरिक मानचित्र",
    track_complaint: "शिकायत ट्रैक करें",
    dashboard: "डैशबोर्ड",
    notifications: "सूचनाएं",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    access_denied: "पहुंच प्रतिबंधित है",
    access_denied_sub: "आपके पास इस अनुभाग तक पहुंचने की अनुमति नहीं है।"
  }
};

// ==========================================
// 2. INITIAL REALISTIC MOCK DATA (20 COMPLAINTS)
// ==========================================
const DEFAULT_COMPLAINTS = [
  {
    id: "CRP-2026-00124",
    title: "Large hazardous pothole near Central School main gate",
    category: "Road Damage / Potholes",
    priority: "High",
    status: "In Progress",
    department: "Roads & Infrastructure",
    residentId: "RES-1001",
    location: "Ward 12 • MG Road, Near Central School",
    lat: 18.5204,
    lng: 73.8567,
    submittedAt: "2026-08-07 08:30",
    slaHours: 48,
    slaDueMs: Date.now() + (32 * 3600 * 1000),
    slaStatus: "ON_TRACK",
    description: "Deep pothole creating severe traffic bottleneck during school pickup hours. Water accumulates during rain causing skidding.",
    evidencePhoto: "pothole_photo.jpg",
    aiConfidence: "94%",
    duplicateCluster: "2 similar complaints nearby",
    auditTrail: [
      { time: "2026-08-07 08:30", action: "Complaint Submitted", actor: "Resident (RES-1001)" },
      { time: "2026-08-07 08:31", action: "AI Triage Completed", actor: "AI Engine (94% confidence)" },
      { time: "2026-08-07 09:15", action: "Routed & Assigned", actor: "Roads & Infrastructure Department" },
      { time: "2026-08-07 10:45", action: "Officer Reviewing", actor: "Officer R. Patil (OFF-1001)" }
    ]
  },
  {
    id: "CRP-2026-00125",
    title: "Overflowing garbage bin near Community Hall",
    category: "Garbage / Waste",
    priority: "Medium",
    status: "Assigned",
    department: "Solid Waste Management",
    residentId: "RES-1001",
    location: "Ward 12 • Community Center Complex",
    lat: 18.5230,
    lng: 73.8590,
    submittedAt: "2026-08-07 09:10",
    slaHours: 24,
    slaDueMs: Date.now() + (14 * 3600 * 1000),
    slaStatus: "ON_TRACK",
    description: "Garbage bins overflowing for 3 days. Stray animals scattering waste onto the main footpath.",
    evidencePhoto: "garbage_bin.jpg",
    aiConfidence: "91%",
    duplicateCluster: "None detected",
    auditTrail: [
      { time: "2026-08-07 09:10", action: "Complaint Submitted", actor: "Resident (RES-1001)" },
      { time: "2026-08-07 09:11", action: "AI Triage Completed", actor: "AI Engine" }
    ]
  },
  {
    id: "CRP-2026-00126",
    title: "Major water pipeline leak flooding Shivajinagar Lane 3",
    category: "Water Leakage",
    priority: "Critical",
    status: "In Progress",
    department: "Water Supply & Sewage",
    residentId: "RES-1001",
    location: "Ward 14 • Shivajinagar Lane 3",
    lat: 18.5312,
    lng: 73.8445,
    submittedAt: "2026-08-06 14:20",
    slaHours: 12,
    slaDueMs: Date.now() + (2 * 3600 * 1000),
    slaStatus: "AT_RISK",
    description: "Clean drinking water pipe burst leaking thousands of liters into street. Low pressure in surrounding houses.",
    evidencePhoto: "water_leak.jpg",
    aiConfidence: "97%",
    duplicateCluster: "4 similar complaints nearby",
    auditTrail: [
      { time: "2026-08-06 14:20", action: "Complaint Submitted", actor: "Resident (RES-1001)" },
      { time: "2026-08-06 14:25", action: "Escalated Priority to Critical", actor: "Officer R. Patil (OFF-1001)" }
    ]
  },
  {
    id: "CRP-2026-00127",
    title: "Non-functional streetlight on 5th Cross Road",
    category: "Streetlight",
    priority: "Low",
    status: "Resolved",
    department: "Electrical & Public Lighting",
    residentId: "RES-1001",
    location: "Ward 8 • 5th Cross Road",
    lat: 18.5180,
    lng: 73.8620,
    submittedAt: "2026-08-04 19:00",
    slaHours: 72,
    slaDueMs: Date.now() - (10 * 3600 * 1000),
    slaStatus: "RESOLVED",
    description: "Streetlight pole #44 dark at night creating safety issue for pedestrians.",
    evidencePhoto: null,
    aiConfidence: "89%",
    duplicateCluster: "None detected",
    auditTrail: [
      { time: "2026-08-04 19:00", action: "Complaint Submitted", actor: "Resident (RES-1001)" },
      { time: "2026-08-05 11:30", action: "Technician Dispatched", actor: "Electrical Dept Supervisor" },
      { time: "2026-08-06 16:45", action: "Bulb Replaced & Tested", actor: "Field Officer S. Kulkarni" },
      { time: "2026-08-06 17:00", action: "Complaint Resolved", actor: "Officer R. Patil (OFF-1001)" }
    ]
  },
  {
    id: "CRP-2026-00128",
    title: "Open drainage cover near public playground",
    category: "Sewage",
    priority: "High",
    status: "Received",
    department: "Water Supply & Sewage",
    residentId: "RES-1001",
    location: "Ward 12 • Balaji Park Playground",
    lat: 18.5255,
    lng: 73.8510,
    submittedAt: "2026-08-07 11:30",
    slaHours: 24,
    slaDueMs: Date.now() + (22 * 3600 * 1000),
    slaStatus: "ON_TRACK",
    description: "Concrete drain cover broken leaving 4ft deep opening right near children's play area.",
    evidencePhoto: "drain_cover.jpg",
    aiConfidence: "96%",
    duplicateCluster: "1 similar complaint nearby",
    auditTrail: [
      { time: "2026-08-07 11:30", action: "Complaint Submitted", actor: "Resident (RES-1001)" },
      { time: "2026-08-07 11:31", action: "AI Triage Completed", actor: "AI Engine" }
    ]
  },
  {
    id: "CRP-2026-00129",
    title: "Damaged wheelchair access ramp at Ward Office",
    category: "Accessibility",
    priority: "High",
    status: "In Progress",
    department: "Roads & Infrastructure",
    residentId: "RES-1002",
    location: "Ward 5 • Municipal Zone Office",
    lat: 18.5350,
    lng: 73.8650,
    submittedAt: "2026-08-05 09:00",
    slaHours: 48,
    slaDueMs: Date.now() - (2 * 3600 * 1000),
    slaStatus: "BREACHED",
    description: "Concrete slope cracked and uneven, making wheelchair navigation hazardous.",
    evidencePhoto: null,
    aiConfidence: "93%",
    duplicateCluster: "None detected",
    auditTrail: [
      { time: "2026-08-05 09:00", action: "Complaint Submitted", actor: "Resident (RES-1002)" },
      { time: "2026-08-07 09:01", action: "SLA Warning Breached", actor: "System Monitor" },
      { time: "2026-08-07 09:05", action: "Escalated to Zonal Officer", actor: "Automated SLA Rules" }
    ]
  }
];

// ==========================================
// 3. APPLICATION STATE MANAGEMENT
// ==========================================
let state = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  complaints: JSON.parse(localStorage.getItem("community_complaints")) || DEFAULT_COMPLAINTS,
  auditLogs: JSON.parse(localStorage.getItem("community_audit_logs")) || [],
  currentLanguage: localStorage.getItem("app_language") || "en",
  currentTheme: localStorage.getItem("app_theme") || "light",
  currentRoute: "login",
  selectedComplaintId: null,
  pendingTriageComplaint: null
};

// Available Routes per Role
const ROLE_ALLOWED_ROUTES = {
  RESIDENT: ["report", "my-complaints", "track-complaint", "dashboard", "map", "notifications", "profile", "settings", "ai-triage", "complaint-submitted"],
  OFFICER: ["officer-dashboard", "complaint-queue", "complaint-review", "dept-assignment", "priority-mgmt", "sla-monitor", "escalations", "map", "officer-analytics", "audit-trail", "notifications", "settings"],
  ADMIN: ["admin-dashboard", "system-analytics", "dept-performance", "sla-rules", "fairness-monitoring", "audit-logs", "complaint-trends", "system-settings", "notifications", "map"]
};

// ==========================================
// 4. INITIALIZATION & ROUTING GUARD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initEventListeners();
  initAuthUI();
  
  if (state.currentUser) {
    // If user is already logged in from localStorage, check role authorization
    if (state.currentUser.role === "RESIDENT") {
      navigateTo("report"); // Resident FIRST page MUST BE report issue as specified!
    } else if (state.currentUser.role === "OFFICER") {
      navigateTo("officer-dashboard");
    } else if (state.currentUser.role === "ADMIN") {
      navigateTo("admin-dashboard");
    }
  } else {
    showAuthScreen();
  }
});

// Save state helpers
function saveState() {
  localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  localStorage.setItem("community_complaints", JSON.stringify(state.complaints));
  localStorage.setItem("community_audit_logs", JSON.stringify(state.auditLogs));
}

// Theme Handling
function initTheme() {
  if (state.currentTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function toggleTheme() {
  state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
  localStorage.setItem("app_theme", state.currentTheme);
  initTheme();
}

// ==========================================
// 5. AUTHENTICATION & LOGIN UI HANDLERS
// ==========================================
function initAuthUI() {
  // Role selector cards event listeners
  const resCard = document.getElementById("selectResidentRole");
  const offCard = document.getElementById("selectOfficerRole");
  const admCard = document.getElementById("selectAdminRole");

  const resForm = document.getElementById("residentLoginForm");
  const offForm = document.getElementById("officerLoginForm");
  const admForm = document.getElementById("adminLoginForm");

  function setActiveRoleCard(activeCard, activeForm) {
    [resCard, offCard, admCard].forEach(c => {
      c.classList.remove("active", "border-[#B8860B]");
      c.classList.add("border-[#E8D4C3]", "dark:border-[#382D23]");
      c.querySelector(".role-badge").classList.add("hidden");
    });
    activeCard.classList.add("active", "border-[#B8860B]");
    activeCard.querySelector(".role-badge").classList.remove("hidden");

    [resForm, offForm, admForm].forEach(f => f.classList.add("hidden"));
    activeForm.classList.remove("hidden");
  }

  resCard.addEventListener("click", () => setActiveRoleCard(resCard, resForm));
  offCard.addEventListener("click", () => setActiveRoleCard(offCard, offForm));
  admCard.addEventListener("click", () => setActiveRoleCard(admCard, admForm));

  // Resident Aadhaar OTP Step
  const btnRequestOtp = document.getElementById("btnRequestOtp");
  const otpVerifyStep = document.getElementById("otpVerifyStep");
  const otpRequestStep = document.getElementById("otpRequestStep");
  const resAadhaarInput = document.getElementById("resAadhaarInput");

  resAadhaarInput.addEventListener("input", (e) => {
    // Format 12-digit Aadhaar as XXXX XXXX XXXX
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 12) val = val.substring(0, 12);
    let formatted = "";
    for (let i = 0; i < val.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += " ";
      formatted += val[i];
    }
    e.target.value = formatted;
  });

  btnRequestOtp.addEventListener("click", () => {
    const rawAadhaar = resAadhaarInput.value.replace(/\s/g, "");
    if (rawAadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar Card number.");
      return;
    }
    otpVerifyStep.classList.remove("hidden");
    otpRequestStep.classList.add("hidden");
  });

  // Resident Form Submission
  resForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const otp = document.getElementById("resOtpInput").value.trim();
    if (otp !== "123456" && otp.length !== 6) {
      alert("Invalid OTP! Use demo OTP: 123456");
      return;
    }
    // Set authenticated Resident user (No Aadhaar/PII stored!)
    state.currentUser = {
      id: "RES-1001",
      name: "Resident",
      role: "RESIDENT",
      maskedAadhaar: "XXXX XXXX 9123"
    };
    saveState();
    logAudit("Resident Login", "Resident (RES-1001)", "Authenticated via Aadhaar OTP");
    
    // First page MUST BE REPORT ISSUE as requested!
    navigateTo("report");
  });

  // Officer Form Submission
  offForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const offId = document.getElementById("offIdInput").value.trim();
    const pass = document.getElementById("offPasswordInput").value.trim();
    
    if (offId === "OFF-1001" && pass === "123456") {
      state.currentUser = {
        id: "OFF-1001",
        name: "Officer R. Patil",
        role: "OFFICER",
        department: "Roads & Infrastructure"
      };
      saveState();
      logAudit("Officer Login", "Officer R. Patil (OFF-1001)", "Authenticated via Staff Credentials");
      navigateTo("officer-dashboard");
    } else {
      alert("Invalid Officer Credentials! Use OFF-1001 / 123456");
    }
  });

  // Admin Form Submission
  admForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const adminId = document.getElementById("adminIdInput").value.trim();
    const pass = document.getElementById("adminPasswordInput").value.trim();

    if (adminId === "ADMIN-001" && pass === "admin123") {
      state.currentUser = {
        id: "ADMIN-001",
        name: "System Administrator",
        role: "ADMIN"
      };
      saveState();
      logAudit("Admin Login", "System Administrator (ADMIN-001)", "Authenticated via Admin Console");
      navigateTo("admin-dashboard");
    } else {
      alert("Invalid Admin Credentials! Use ADMIN-001 / admin123");
    }
  });
}

function showAuthScreen() {
  document.getElementById("authScreen").classList.remove("hidden");
  document.getElementById("appContainer").classList.add("hidden");
}

function logout() {
  state.currentUser = null;
  state.selectedComplaintId = null;
  localStorage.removeItem("currentUser");
  showAuthScreen();
}

// Audit Logger
function logAudit(action, actor, details) {
  const entry = {
    id: "AUD-" + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toLocaleString(),
    action,
    actor,
    details
  };
  state.auditLogs.unshift(entry);
  saveState();
}

// ==========================================
// 6. ROUTING & AUTHORIZATION GUARD
// ==========================================
function navigateTo(route, params = null) {
  if (!state.currentUser) {
    showAuthScreen();
    return;
  }

  // Check role authorization guard
  const userRole = state.currentUser.role;
  const allowed = ROLE_ALLOWED_ROUTES[userRole] || [];

  if (!allowed.includes(route)) {
    // Show Access Restricted Modal & Redirect
    showAccessDeniedModal(route);
    return;
  }

  state.currentRoute = route;
  if (params && params.id) {
    state.selectedComplaintId = params.id;
  }

  // Update App Container Layout
  document.getElementById("authScreen").classList.add("hidden");
  document.getElementById("appContainer").classList.remove("hidden");

  // Update Header & Sidebar display for active user
  updateHeaderAndSidebar();

  // Render Page Content
  const mainContent = document.getElementById("mainContent");
  mainContent.scrollTop = 0;
  mainContent.innerHTML = renderRouteView(route);

  // Attach post-render dynamic scripts (e.g. Map, Forms, Overrides)
  postRenderView(route);
}

function showAccessDeniedModal(attemptedRoute) {
  const modal = document.getElementById("accessDeniedModal");
  document.getElementById("deniedAttemptRoute").innerText = `/${attemptedRoute}`;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  document.getElementById("btnDismissAccessDenied").onclick = () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    // Redirect to default authorized route
    if (state.currentUser.role === "RESIDENT") navigateTo("dashboard");
    else if (state.currentUser.role === "OFFICER") navigateTo("officer-dashboard");
    else if (state.currentUser.role === "ADMIN") navigateTo("admin-dashboard");
  };
}

function updateHeaderAndSidebar() {
  const role = state.currentUser.role;
  document.getElementById("sidebarRoleLabel").innerText = `${role} Portal`;
  document.getElementById("navUserName").innerText = state.currentUser.name;
  document.getElementById("navUserId").innerText = state.currentUser.id;
  document.getElementById("userAvatarText").innerText = role.substring(0, 3);

  document.getElementById("headerUserName").innerText = state.currentUser.name;
  document.getElementById("headerUserRole").innerText = role;
  document.getElementById("headerAvatarText").innerText = role.substring(0, 3);

  // Render Role Specific Sidebar Menu Items
  const navList = document.getElementById("navMenuList");
  let menuHtml = "";

  if (role === "RESIDENT") {
    // RESIDENT NAVIGATION ONLY (NO ANALYTICS!)
    const items = [
      { id: "dashboard", label: "🏠 Dashboard", route: "dashboard" },
      { id: "report", label: "📝 Report Issue", route: "report" },
      { id: "my-complaints", label: "📋 My Complaints", route: "my-complaints" },
      { id: "map", label: "🗺️ Civic Map", route: "map" },
      { id: "notifications", label: "🔔 Notifications", route: "notifications" },
      { id: "profile", label: "👤 Profile", route: "profile" },
      { id: "settings", label: "⚙️ Settings", route: "settings" }
    ];
    menuHtml = items.map(i => `
      <button onclick="navigateTo('${i.route}')" class="nav-item w-full text-left px-4 py-3 rounded-xl font-medium text-xs md:text-sm flex items-center justify-between ${state.currentRoute === i.route ? 'active' : ''}">
        <span>${i.label}</span>
        ${i.route === 'report' ? '<span class="text-[10px] bg-[#F4D77A] text-[#3B2A1A] font-bold px-2 py-0.5 rounded-full">New</span>' : ''}
      </button>
    `).join("");
  } else if (role === "OFFICER") {
    // OFFICER NAVIGATION
    const items = [
      { id: "officer-dashboard", label: "🏠 Dashboard", route: "officer-dashboard" },
      { id: "complaint-queue", label: "📥 Complaint Queue", route: "complaint-queue" },
      { id: "officer-analytics", label: "📊 Analytics", route: "officer-analytics" },
      { id: "map", label: "🗺️ Civic Map", route: "map" },
      { id: "audit-trail", label: "📜 Audit Trail", route: "audit-trail" },
      { id: "notifications", label: "🔔 Notifications", route: "notifications" },
      { id: "settings", label: "⚙️ Settings", route: "settings" }
    ];
    menuHtml = items.map(i => `
      <button onclick="navigateTo('${i.route}')" class="nav-item w-full text-left px-4 py-3 rounded-xl font-medium text-xs md:text-sm flex items-center justify-between ${state.currentRoute === i.route ? 'active' : ''}">
        <span>${i.label}</span>
      </button>
    `).join("");
  } else if (role === "ADMIN") {
    // ADMIN NAVIGATION
    const items = [
      { id: "admin-dashboard", label: "🏠 Admin Dashboard", route: "admin-dashboard" },
      { id: "system-analytics", label: "📊 System Analytics", route: "system-analytics" },
      { id: "fairness-monitoring", label: "⚖️ Fairness & Accessibility", route: "fairness-monitoring" },
      { id: "audit-logs", label: "📜 Audit Logs", route: "audit-logs" },
      { id: "map", label: "🗺️ Civic Map", route: "map" },
      { id: "notifications", label: "🔔 Notifications", route: "notifications" },
      { id: "settings", label: "⚙️ Settings", route: "settings" }
    ];
    menuHtml = items.map(i => `
      <button onclick="navigateTo('${i.route}')" class="nav-item w-full text-left px-4 py-3 rounded-xl font-medium text-xs md:text-sm flex items-center justify-between ${state.currentRoute === i.route ? 'active' : ''}">
        <span>${i.label}</span>
      </button>
    `).join("");
  }

  navList.innerHTML = menuHtml;
}

// ==========================================
// 7. VIEW RENDERING ENGINE
// ==========================================
function renderRouteView(route) {
  switch (route) {
    case "report":
      return renderReportIssueView();
    case "ai-triage":
      return renderAiTriageView();
    case "complaint-submitted":
      return renderComplaintSubmittedView();
    case "my-complaints":
      return renderMyComplaintsView();
    case "track-complaint":
      return renderTrackComplaintView();
    case "dashboard":
      return renderResidentDashboardView();
    case "officer-dashboard":
    case "complaint-queue":
      return renderOfficerDashboardView();
    case "complaint-review":
      return renderOfficerReviewView();
    case "officer-analytics":
      return renderOfficerAnalyticsView();
    case "admin-dashboard":
    case "system-analytics":
      return renderAdminDashboardView();
    case "fairness-monitoring":
      return renderFairnessMonitoringView();
    case "audit-logs":
    case "audit-trail":
      return renderAuditLogsView();
    case "map":
      return renderCivicMapView();
    case "notifications":
      return renderNotificationsView();
    case "profile":
      return renderProfileView();
    case "settings":
      return renderSettingsView();
    default:
      return `<div class="p-6 text-center">Route not found</div>`;
  }
}

// ------------------------------------------
// 7A. RESIDENT VIEWS
// ------------------------------------------
function renderReportIssueView() {
  return `
    <div class="max-w-3xl mx-auto space-y-6">
      
      <!-- Page Header -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
        <div class="flex items-center gap-3 mb-2">
          <div class="w-10 h-10 rounded-xl bg-[#FFE4D1] dark:bg-[#382D23] text-[#B8860B] flex items-center justify-center font-bold text-xl">
            📝
          </div>
          <div>
            <h2 class="font-display font-bold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Report an Issue</h2>
            <p class="text-xs md:text-sm text-[#6B5845] dark:text-[#D6C4AE]">Tell us what's wrong in your community. We'll help route it to the right service team.</p>
          </div>
        </div>
      </div>

      <!-- Report Form Container -->
      <form id="newComplaintForm" class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 md:p-8 shadow-md space-y-6">
        
        <!-- Category Dropdown -->
        <div>
          <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-2">Category *</label>
          <select id="issueCategory" class="w-full bg-[#FFF7F0] dark:bg-[#382D23] border border-[#E8D4C3] dark:border-[#4A3B2C] text-[#3B2A1A] dark:text-[#FFF7E8] px-4 py-3 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#B8860B]" required>
            <option value="Road Damage / Potholes">Road Damage / Potholes</option>
            <option value="Garbage / Waste">Garbage / Waste</option>
            <option value="Water Leakage">Water Leakage</option>
            <option value="Streetlight">Streetlight</option>
            <option value="Sewage">Sewage</option>
            <option value="Public Safety">Public Safety</option>
            <option value="Accessibility">Accessibility</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <!-- Issue Description -->
        <div>
          <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-2">Issue Description *</label>
          <textarea id="issueDescription" rows="4" placeholder="Describe what happened, where it happened, and any important details..." class="w-full bg-[#FFF7F0] dark:bg-[#382D23] border border-[#E8D4C3] dark:border-[#4A3B2C] text-[#3B2A1A] dark:text-[#FFF7E8] p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" required></textarea>
        </div>

        <!-- Location Entry -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider">Location *</label>
            <button type="button" id="btnUseCurrentLocation" class="text-xs text-[#B8860B] dark:text-[#F4D77A] font-bold hover:underline flex items-center gap-1">
              <i class="fa-solid fa-location-crosshairs"></i> Use Current Location
            </button>
          </div>
          <input type="text" id="issueLocation" placeholder="Ward 12 • MG Road, Near Central School" class="w-full bg-[#FFF7F0] dark:bg-[#382D23] border border-[#E8D4C3] dark:border-[#4A3B2C] text-[#3B2A1A] dark:text-[#FFF7E8] px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#B8860B]" required>
          
          <!-- Map Preview Box -->
          <div class="mt-3 h-36 bg-[#FFE4D1]/40 dark:bg-[#382D23] rounded-xl border border-dashed border-[#E8D4C3] dark:border-[#4A3B2C] flex items-center justify-center text-xs text-[#6B5845] dark:text-[#D6C4AE] relative overflow-hidden">
            <i class="fa-solid fa-map-location-dot text-2xl text-[#B8860B] mr-2"></i>
            <span>Geospatial Ward Location Tagged</span>
          </div>
        </div>

        <!-- Urgency Selection -->
        <div>
          <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-2">Urgency Level</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <label class="flex items-center gap-2 p-3 rounded-xl border border-[#E8D4C3] dark:border-[#4A3B2C] bg-[#FFF7F0] dark:bg-[#382D23] cursor-pointer hover:border-[#B8860B]">
              <input type="radio" name="urgency" value="Low" class="accent-[#B8860B]">
              <span class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">Low</span>
            </label>
            <label class="flex items-center gap-2 p-3 rounded-xl border border-[#E8D4C3] dark:border-[#4A3B2C] bg-[#FFF7F0] dark:bg-[#382D23] cursor-pointer hover:border-[#B8860B]">
              <input type="radio" name="urgency" value="Medium" checked class="accent-[#B8860B]">
              <span class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">Medium</span>
            </label>
            <label class="flex items-center gap-2 p-3 rounded-xl border border-[#E8D4C3] dark:border-[#4A3B2C] bg-[#FFF7F0] dark:bg-[#382D23] cursor-pointer hover:border-[#B8860B]">
              <input type="radio" name="urgency" value="High" class="accent-[#B8860B]">
              <span class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">High</span>
            </label>
            <label class="flex items-center gap-2 p-3 rounded-xl border border-[#E8D4C3] dark:border-[#4A3B2C] bg-[#FFF7F0] dark:bg-[#382D23] cursor-pointer hover:border-[#B8860B]">
              <input type="radio" name="urgency" value="Critical" class="accent-[#B8860B]">
              <span class="text-xs font-bold text-[#C62828]">Critical</span>
            </label>
          </div>
          <p class="text-[11px] text-[#8C7A68] dark:text-[#D6C4AE] mt-1.5">If priority is uncertain: <em>Needs human review</em> will be assigned automatically.</p>
        </div>

        <!-- Evidence (Optional Photo/Audio) -->
        <div>
          <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-2">Evidence Photo / Audio (Optional)</label>
          <div class="flex items-center gap-4">
            <input type="file" id="evidenceFile" class="hidden">
            <button type="button" onclick="document.getElementById('evidenceFile').click()" class="py-2.5 px-4 rounded-xl border border-[#E8D4C3] dark:border-[#4A3B2C] bg-[#FFF7F0] dark:bg-[#382D23] text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] hover:bg-[#FFE4D1] flex items-center gap-2">
              <i class="fa-solid fa-camera text-[#B8860B]"></i> Attach Photo
            </button>
            <button type="button" onclick="alert('Voice recording simulation activated')" class="py-2.5 px-4 rounded-xl border border-[#E8D4C3] dark:border-[#4A3B2C] bg-[#FFF7F0] dark:bg-[#382D23] text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] hover:bg-[#FFE4D1] flex items-center gap-2">
              <i class="fa-solid fa-microphone text-[#B8860B]"></i> Record Voice
            </button>
          </div>
        </div>

        <!-- Privacy Shield Notice -->
        <div class="p-4 bg-[#FFE4D1]/50 dark:bg-[#382D23] rounded-2xl border border-[#E8D4C3] dark:border-[#4A3B2C] text-xs text-[#6B5845] dark:text-[#D6C4AE] flex items-start gap-3">
          <i class="fa-solid fa-shield-halved text-[#2E7D32] text-lg mt-0.5"></i>
          <div>
            <strong class="font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">🛡️ Privacy Protected</strong>
            <p class="mt-0.5">Only information necessary to process this complaint is shared with the responsible service team. Personal Aadhaar and phone identity details are masked.</p>
          </div>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="w-full py-4 px-6 rounded-2xl bg-[#B8860B] hover:bg-[#8F6B00] text-white font-bold text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
          <span>Submit Complaint & Trigger AI Triage</span>
          <i class="fa-solid fa-[#F4D77A] fa-wand-magic-sparkles"></i>
        </button>

      </form>
    </div>
  `;
}

function renderAiTriageView() {
  const c = state.pendingTriageComplaint || state.complaints[0];
  return `
    <div class="max-w-2xl mx-auto space-y-6 my-auto py-8">
      
      <!-- AI Triage Header Box -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border-2 border-[#B8860B] rounded-3xl p-8 shadow-2xl text-center space-y-6">
        
        <div class="w-20 h-20 rounded-full bg-[#FFE4D1] text-[#B8860B] flex items-center justify-center text-4xl mx-auto shadow-inner ai-scan-pulse">
          ✨
        </div>

        <div>
          <span class="px-3 py-1 rounded-full bg-[#B8860B] text-white text-xs font-extrabold uppercase tracking-wider">AI Assisted Triage</span>
          <h2 class="font-display font-extrabold text-2xl md:text-3xl text-[#3B2A1A] dark:text-[#FFF7E8] mt-2">Analyzing complaint...</h2>
          <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE] mt-1">Automated category classification & duplicate detection</p>
        </div>

        <!-- AI Findings Grid -->
        <div class="grid grid-cols-2 gap-4 text-left pt-4 border-t border-[#E8D4C3] dark:border-[#382D23]">
          
          <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl">
            <span class="text-[10px] font-bold text-[#8C7A68] uppercase">Category</span>
            <p class="font-bold text-sm text-[#3B2A1A] dark:text-[#FFF7E8]">${c.category}</p>
          </div>

          <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl">
            <span class="text-[10px] font-bold text-[#8C7A68] uppercase">Priority</span>
            <p class="font-bold text-sm text-[#C62828]">${c.priority}</p>
          </div>

          <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl">
            <span class="text-[10px] font-bold text-[#8C7A68] uppercase">Suggested Department</span>
            <p class="font-bold text-sm text-[#3B2A1A] dark:text-[#FFF7E8]">${c.department}</p>
          </div>

          <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl">
            <span class="text-[10px] font-bold text-[#8C7A68] uppercase">Possible Duplicate</span>
            <p class="font-bold text-xs text-[#B8860B]">${c.duplicateCluster || "2 similar complaints nearby"}</p>
          </div>

        </div>

        <!-- Confidence Rating -->
        <div class="flex items-center justify-between p-4 bg-[#FFE4D1]/60 dark:bg-[#382D23] rounded-2xl text-xs font-bold">
          <span class="text-[#3B2A1A] dark:text-[#FFF7E8]">AI Confidence Rating</span>
          <span class="text-[#B8860B] font-mono text-sm">94% Accuracy</span>
        </div>

        <p class="text-xs text-[#8C7A68] dark:text-[#D6C4AE]">
          <i class="fa-solid fa-circle-info text-[#B8860B]"></i> AI suggestion — Human review available. Authorized officers may override classification with log reason.
        </p>

        <!-- Proceed Button -->
        <button onclick="navigateTo('complaint-submitted')" class="w-full py-3.5 rounded-xl bg-[#B8860B] hover:bg-[#8F6B00] text-white font-bold text-sm shadow-md transition-all">
          Proceed to Complaint Confirmation
        </button>

      </div>
    </div>
  `;
}

function renderComplaintSubmittedView() {
  const c = state.pendingTriageComplaint || state.complaints[0];
  return `
    <div class="max-w-2xl mx-auto space-y-6 my-auto py-8">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-8 shadow-xl text-center space-y-6">
        
        <div class="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center text-3xl mx-auto">
          ✓
        </div>

        <div>
          <h2 class="font-display font-extrabold text-3xl text-[#3B2A1A] dark:text-[#FFF7E8]">Complaint Submitted</h2>
          <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE] mt-1">Your grievance has been logged successfully into the municipal queue.</p>
        </div>

        <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl border border-[#E8D4C3] dark:border-[#4A3B2C] text-left space-y-3">
          <div class="flex items-center justify-between border-b border-[#E8D4C3] dark:border-[#4A3B2C] pb-2">
            <span class="text-xs text-[#8C7A68]">Complaint ID:</span>
            <span class="font-mono font-extrabold text-sm text-[#B8860B]">${c.id}</span>
          </div>
          <div class="flex items-center justify-between border-b border-[#E8D4C3] dark:border-[#4A3B2C] pb-2">
            <span class="text-xs text-[#8C7A68]">Status:</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FFE4D1] text-[#8F6B00]">Received</span>
          </div>
          <div>
            <span class="text-xs text-[#8C7A68] block mb-1">Expected Next Step:</span>
            <p class="text-xs font-semibold text-[#3B2A1A] dark:text-[#FFF7E8]">Your complaint will be reviewed and routed to the responsible service team.</p>
          </div>
        </div>

        <!-- Action Buttons (Track Complaint & My Complaints - NO auto redirect to Dashboard) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button onclick="navigateTo('track-complaint', {id: '${c.id}'})" class="py-3.5 px-6 rounded-xl bg-[#B8860B] hover:bg-[#8F6B00] text-white font-bold text-sm shadow-md transition-all">
            Track Complaint
          </button>
          <button onclick="navigateTo('my-complaints')" class="py-3.5 px-6 rounded-xl border border-[#B8860B] text-[#8F6B00] dark:text-[#F4D77A] bg-[#FFF1E6] dark:bg-[#382D23] font-bold text-sm hover:bg-[#FFE4D1] transition-all">
            My Complaints
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderMyComplaintsView() {
  const userComplaints = state.complaints.filter(c => c.residentId === "RES-1001" || c.residentId === state.currentUser.id);
  
  return `
    <div class="space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFDF9] dark:bg-[#2C231B] p-6 rounded-3xl border border-[#E8D4C3] dark:border-[#382D23] shadow-sm">
        <div>
          <h2 class="font-display font-bold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">My Complaints</h2>
          <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]">Track live resolution status and SLA compliance for your submitted grievances</p>
        </div>
        <button onclick="navigateTo('report')" class="py-3 px-5 rounded-xl bg-[#B8860B] hover:bg-[#8F6B00] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2">
          <i class="fa-solid fa-plus"></i> Report New Issue
        </button>
      </div>

      <!-- Complaints List Grid -->
      <div class="grid grid-cols-1 gap-4">
        ${userComplaints.map(c => `
          <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div class="space-y-2 flex-1">
              <div class="flex items-center gap-3">
                <span class="font-mono text-xs font-bold text-[#B8860B]">${c.id}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE4D1] text-[#8F6B00]">${c.category}</span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getPriorityBadgeClass(c.priority)}">${c.priority}</span>
              </div>
              <h3 class="font-display font-bold text-base text-[#3B2A1A] dark:text-[#FFF7E8]">${c.title}</h3>
              <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]"><i class="fa-solid fa-location-dot text-[#B8860B]"></i> ${c.location}</p>
            </div>

            <div class="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#E8D4C3] dark:border-[#382D23]">
              <span class="px-3 py-1 rounded-full text-xs font-extrabold ${getStatusBadgeClass(c.status)}">${c.status}</span>
              <span class="text-[11px] font-mono text-[#8C7A68]">SLA: ${c.slaStatus === 'BREACHED' ? '⚠️ Breached' : '1d 9h remaining'}</span>
              <button onclick="navigateTo('track-complaint', {id: '${c.id}'})" class="py-2 px-4 rounded-xl bg-[#FFF1E6] dark:bg-[#382D23] border border-[#B8860B] text-[#8F6B00] dark:text-[#F4D77A] text-xs font-bold hover:bg-[#B8860B] hover:text-white transition-all">
                View Details
              </button>
            </div>

          </div>
        `).join("")}
      </div>

    </div>
  `;
}

function renderTrackComplaintView() {
  const complaintId = state.selectedComplaintId || "CRP-2026-00124";
  const c = state.complaints.find(x => x.id === complaintId) || state.complaints[0];

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <!-- Top Details Card -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E8D4C3] dark:border-[#382D23]">
          <div>
            <span class="text-xs font-mono font-bold text-[#B8860B]">${c.id}</span>
            <h2 class="font-display font-extrabold text-xl text-[#3B2A1A] dark:text-[#FFF7E8]">${c.title}</h2>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${getStatusBadgeClass(c.status)}">${c.status}</span>
            <span class="px-3 py-1 rounded-full text-xs font-extrabold ${getPriorityBadgeClass(c.priority)}">${c.priority}</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <span class="text-[#8C7A68] block">Category</span>
            <strong class="text-[#3B2A1A] dark:text-[#FFF7E8]">${c.category}</strong>
          </div>
          <div>
            <span class="text-[#8C7A68] block">Location</span>
            <strong class="text-[#3B2A1A] dark:text-[#FFF7E8]">${c.location}</strong>
          </div>
          <div>
            <span class="text-[#8C7A68] block">Assigned Service</span>
            <strong class="text-[#3B2A1A] dark:text-[#FFF7E8]">${c.department}</strong>
          </div>
        </div>
      </div>

      <!-- Timeline & SLA Countdown -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Timeline Stepper -->
        <div class="md:col-span-2 bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-5">
          <h3 class="font-display font-bold text-lg text-[#3B2A1A] dark:text-[#FFF7E8]">Resolution Timeline</h3>
          
          <div class="space-y-6 relative pl-6 border-l-2 border-[#B8860B]">
            
            <div class="relative">
              <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#2E7D32] text-white text-[10px] flex items-center justify-center font-bold">✓</div>
              <p class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">Complaint Submitted</p>
              <p class="text-[11px] text-[#8C7A68]">Aug 7, 2026 • 08:30 AM</p>
            </div>

            <div class="relative">
              <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#2E7D32] text-white text-[10px] flex items-center justify-center font-bold">✓</div>
              <p class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">AI Triage Completed</p>
              <p class="text-[11px] text-[#8C7A68]">Confidence: 94% • High Priority Tagged</p>
            </div>

            <div class="relative">
              <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#2E7D32] text-white text-[10px] flex items-center justify-center font-bold">✓</div>
              <p class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">Routed to ${c.department}</p>
              <p class="text-[11px] text-[#8C7A68]">Aug 7, 2026 • 09:15 AM</p>
            </div>

            <div class="relative">
              <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#B8860B] text-white text-[10px] flex items-center justify-center font-bold">●</div>
              <p class="text-xs font-bold text-[#B8860B]">Officer Reviewing</p>
              <p class="text-[11px] text-[#8C7A68]">Assigned to Officer R. Patil</p>
            </div>

            <div class="relative opacity-60">
              <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#E8D4C3] text-white text-[10px] flex items-center justify-center font-bold">○</div>
              <p class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">Work in Progress</p>
              <p class="text-[11px] text-[#8C7A68]">Field Repair Operations</p>
            </div>

            <div class="relative opacity-60">
              <div class="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#E8D4C3] text-white text-[10px] flex items-center justify-center font-bold">○</div>
              <p class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">Resolved</p>
              <p class="text-[11px] text-[#8C7A68]">Final Verification</p>
            </div>

          </div>

          <!-- Plain-Language Explanation Box ("Why this status?") -->
          <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl border border-[#E8D4C3] dark:border-[#4A3B2C]">
            <h4 class="text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] mb-1">Why this status?</h4>
            <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]">
              Your complaint was routed to the <strong>${c.department}</strong> team because it was identified as a road-damage issue near a school zone requiring urgent repair.
            </p>
          </div>

        </div>

        <!-- SLA Card -->
        <div class="space-y-4">
          <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-4">
            <h3 class="font-display font-bold text-base text-[#3B2A1A] dark:text-[#FFF7E8]">SLA Resolution Countdown</h3>
            
            <div class="p-4 bg-[#FFE4D1]/60 dark:bg-[#382D23] rounded-2xl text-center">
              <span class="text-[10px] font-bold uppercase text-[#8C7A68]">Target Completion</span>
              <p class="font-mono font-extrabold text-xl text-[#B8860B] mt-1">1d 9h remaining</p>
              <span class="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F5E9] text-[#2E7D32]">ON TRACK</span>
            </div>

            ${c.slaStatus === 'BREACHED' ? `
              <div class="p-4 bg-[#FFEBEE] rounded-2xl border border-[#C62828] text-xs text-[#C62828]">
                <strong>⚠ Escalation Notice</strong>
                <p class="mt-1">Your complaint has been escalated because the expected response time was exceeded.</p>
              </div>
            ` : ''}

            <div class="text-[11px] text-[#8C7A68] space-y-1">
              <p>• Initial SLA Target: 48 Hours</p>
              <p>• Automatic Escalation Trigger: 36 Hours</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  `;
}

function renderResidentDashboardView() {
  const userComplaints = state.complaints.filter(c => c.residentId === "RES-1001" || c.residentId === state.currentUser.id);
  
  return `
    <div class="space-y-6">
      
      <!-- Greeting Banner -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Good morning 👋</h2>
          <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE] mt-0.5">Welcome back to your civic redressal portal.</p>
        </div>
        <div class="flex items-center gap-3">
          <button onclick="navigateTo('report')" class="py-3 px-5 rounded-xl bg-[#B8860B] hover:bg-[#8F6B00] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2">
            <i class="fa-solid fa-plus"></i> Report New Issue
          </button>
        </div>
      </div>

      <!-- Resident Personal Stat Cards (Personal stats ONLY - NO internal admin analytics) -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-5 shadow-sm">
          <span class="text-xs font-semibold text-[#6B5845] dark:text-[#D6C4AE]">Active Complaints</span>
          <p class="font-display font-black text-3xl text-[#B8860B] mt-2">3</p>
        </div>

        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-5 shadow-sm">
          <span class="text-xs font-semibold text-[#6B5845] dark:text-[#D6C4AE]">Resolved</span>
          <p class="font-display font-black text-3xl text-[#2E7D32] mt-2">12</p>
        </div>

        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-5 shadow-sm">
          <span class="text-xs font-semibold text-[#6B5845] dark:text-[#D6C4AE]">SLA At Risk</span>
          <p class="font-display font-black text-3xl text-[#C77C02] mt-2">1</p>
        </div>

        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-5 shadow-sm">
          <span class="text-xs font-semibold text-[#6B5845] dark:text-[#D6C4AE]">Total Reports</span>
          <p class="font-display font-black text-3xl text-[#3B2A1A] dark:text-[#FFF7E8] mt-2">15</p>
        </div>

      </div>

      <!-- Recent Complaints Table -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-display font-bold text-lg text-[#3B2A1A] dark:text-[#FFF7E8]">Recent Complaints</h3>
          <button onclick="navigateTo('my-complaints')" class="text-xs text-[#B8860B] font-bold hover:underline">View All</button>
        </div>

        <div class="space-y-3">
          ${userComplaints.slice(0, 3).map(c => `
            <div class="p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl flex items-center justify-between">
              <div>
                <span class="font-mono text-[11px] font-bold text-[#B8860B]">${c.id}</span>
                <p class="font-bold text-xs text-[#3B2A1A] dark:text-[#FFF7E8]">${c.title}</p>
              </div>
              <button onclick="navigateTo('track-complaint', {id: '${c.id}'})" class="text-xs font-bold text-[#8F6B00] dark:text-[#F4D77A] hover:underline">Track</button>
            </div>
          `).join("")}
        </div>
      </div>

    </div>
  `;
}

// ------------------------------------------
// 7B. OFFICER VIEWS
// ------------------------------------------
function renderOfficerDashboardView() {
  return `
    <div class="space-y-6">
      
      <!-- Officer Header -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="px-3 py-1 rounded-full bg-[#FFE4D1] text-[#8F6B00] text-xs font-bold">Officer Portal • Roads & Infrastructure</span>
          <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8] mt-1">Officer Complaint Queue</h2>
        </div>
      </div>

      <!-- Officer Stats -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-4">
          <span class="text-xs text-[#8C7A68]">Total Open</span>
          <p class="font-display font-bold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8] mt-1">24</p>
        </div>
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-4">
          <span class="text-xs text-[#8C7A68]">High Priority</span>
          <p class="font-display font-bold text-2xl text-[#C62828] mt-1">6</p>
        </div>
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-4">
          <span class="text-xs text-[#8C7A68]">SLA At Risk</span>
          <p class="font-display font-bold text-2xl text-[#C77C02] mt-1">3</p>
        </div>
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-4">
          <span class="text-xs text-[#8C7A68]">SLA Breached</span>
          <p class="font-display font-bold text-2xl text-[#C62828] mt-1">1</p>
        </div>
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl p-4">
          <span class="text-xs text-[#8C7A68]">Resolved Today</span>
          <p class="font-display font-bold text-2xl text-[#2E7D32] mt-1">8</p>
        </div>
      </div>

      <!-- Complaint Queue Table -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm overflow-x-auto">
        <h3 class="font-display font-bold text-lg text-[#3B2A1A] dark:text-[#FFF7E8] mb-4">Pending Department Review</h3>
        
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-[#E8D4C3] dark:border-[#382D23] text-[#8C7A68] uppercase">
              <th class="py-3 px-2">Complaint ID</th>
              <th class="py-3 px-2">Issue & Category</th>
              <th class="py-3 px-2">Location</th>
              <th class="py-3 px-2">Priority</th>
              <th class="py-3 px-2">AI Confidence</th>
              <th class="py-3 px-2">SLA</th>
              <th class="py-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E8D4C3] dark:divide-[#382D23]">
            ${state.complaints.map(c => `
              <tr class="hover:bg-[#FFF7F0] dark:hover:bg-[#382D23]">
                <td class="py-3 px-2 font-mono font-bold text-[#B8860B]">${c.id}</td>
                <td class="py-3 px-2">
                  <p class="font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">${c.title}</p>
                  <span class="text-[10px] text-[#8C7A68]">${c.category}</span>
                </td>
                <td class="py-3 px-2 text-[#6B5845] dark:text-[#D6C4AE]">${c.location}</td>
                <td class="py-3 px-2"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadgeClass(c.priority)}">${c.priority}</span></td>
                <td class="py-3 px-2 font-mono text-[#B8860B] font-bold">${c.aiConfidence || '94%'}</td>
                <td class="py-3 px-2 font-mono">${c.slaStatus === 'BREACHED' ? '⚠️ Breached' : '1d 9h'}</td>
                <td class="py-3 px-2 text-right">
                  <button onclick="navigateTo('complaint-review', {id: '${c.id}'})" class="py-1.5 px-3 rounded-lg bg-[#B8860B] text-white font-bold hover:bg-[#8F6B00]">Review / Override</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

    </div>
  `;
}

function renderOfficerReviewView() {
  const complaintId = state.selectedComplaintId || "CRP-2026-00124";
  const c = state.complaints.find(x => x.id === complaintId) || state.complaints[0];

  return `
    <div class="max-w-3xl mx-auto space-y-6">
      
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-6">
        
        <div class="flex items-center justify-between pb-4 border-b border-[#E8D4C3] dark:border-[#382D23]">
          <div>
            <span class="font-mono text-xs font-bold text-[#B8860B]">${c.id}</span>
            <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">${c.title}</h2>
          </div>
          <button onclick="navigateTo('officer-dashboard')" class="text-xs text-[#8C7A68] font-bold hover:underline">← Back to Queue</button>
        </div>

        <!-- AI Classification Overview -->
        <div class="p-4 bg-[#FFE4D1]/40 dark:bg-[#382D23] rounded-2xl space-y-2 text-xs">
          <h4 class="font-bold text-[#3B2A1A] dark:text-[#FFF7E8]">🤖 Current AI Recommendations</h4>
          <p>• Category: <strong>${c.category}</strong></p>
          <p>• Priority: <strong>${c.priority}</strong></p>
          <p>• Department: <strong>${c.department}</strong></p>
          <p>• Duplicate Cluster: <strong>${c.duplicateCluster || 'None'}</strong></p>
        </div>

        <!-- Human Override Controls Form -->
        <form id="officerOverrideForm" class="space-y-4 pt-4 border-t border-[#E8D4C3] dark:border-[#382D23]">
          <h3 class="font-display font-bold text-lg text-[#3B2A1A] dark:text-[#FFF7E8]">Officer Review & Override</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-1">Update Priority</label>
              <select id="overridePriority" class="w-full bg-[#FFF7F0] dark:bg-[#382D23] border border-[#E8D4C3] dark:border-[#4A3B2C] text-xs p-3 rounded-xl font-bold">
                <option value="Low" ${c.priority==='Low'?'selected':''}>Low</option>
                <option value="Medium" ${c.priority==='Medium'?'selected':''}>Medium</option>
                <option value="High" ${c.priority==='High'?'selected':''}>High</option>
                <option value="Critical" ${c.priority==='Critical'?'selected':''}>Critical</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-1">Reassign Department</label>
              <select id="overrideDept" class="w-full bg-[#FFF7F0] dark:bg-[#382D23] border border-[#E8D4C3] dark:border-[#4A3B2C] text-xs p-3 rounded-xl font-bold">
                <option value="Roads & Infrastructure">Roads & Infrastructure</option>
                <option value="Solid Waste Management">Solid Waste Management</option>
                <option value="Water Supply & Sewage">Water Supply & Sewage</option>
                <option value="Electrical & Public Lighting">Electrical & Public Lighting</option>
              </select>
            </div>
          </div>

          <!-- MANDATORY Human Override Reason -->
          <div>
            <label class="block text-xs font-bold text-[#3B2A1A] dark:text-[#FFF7E8] uppercase tracking-wider mb-1">Override Reason (Mandatory for Audit Trail) *</label>
            <textarea id="overrideReason" rows="3" placeholder="Explain why AI recommendation was modified (e.g., Changed priority to High because pothole is blocking emergency vehicle access)..." class="w-full bg-[#FFF7F0] dark:bg-[#382D23] border border-[#E8D4C3] dark:border-[#4A3B2C] text-xs p-3 rounded-xl" required></textarea>
          </div>

          <button type="submit" class="w-full py-3.5 rounded-xl bg-[#B8860B] hover:bg-[#8F6B00] text-white font-bold text-sm shadow-md">
            Save Changes & Log Audit Entry
          </button>
        </form>

      </div>
    </div>
  `;
}

function renderOfficerAnalyticsView() {
  return `
    <div class="space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
        <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Officer Operations Analytics</h2>
        <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]">Department-level resolution throughput, SLA bottlenecks, and hotspot clustering</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
          <h3 class="font-display font-bold text-base text-[#3B2A1A] dark:text-[#FFF7E8] mb-4">SLA Compliance by Department</h3>
          <div class="space-y-3 text-xs">
            <div>
              <div class="flex justify-between font-bold mb-1"><span>Roads & Infra</span><span>92%</span></div>
              <div class="w-full h-2 bg-[#FFE4D1] rounded-full overflow-hidden"><div class="h-full bg-[#B8860B] w-[92%]"></div></div>
            </div>
            <div>
              <div class="flex justify-between font-bold mb-1"><span>Solid Waste Management</span><span>88%</span></div>
              <div class="w-full h-2 bg-[#FFE4D1] rounded-full overflow-hidden"><div class="h-full bg-[#B8860B] w-[88%]"></div></div>
            </div>
            <div>
              <div class="flex justify-between font-bold mb-1"><span>Water Supply & Sewage</span><span>79%</span></div>
              <div class="w-full h-2 bg-[#FFE4D1] rounded-full overflow-hidden"><div class="h-full bg-[#C77C02] w-[79%]"></div></div>
            </div>
          </div>
        </div>

        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
          <h3 class="font-display font-bold text-base text-[#3B2A1A] dark:text-[#FFF7E8] mb-4">Hotspot Wards</h3>
          <div class="space-y-2 text-xs">
            <div class="p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl flex justify-between"><span>Ward 12 (Central Zone)</span><strong class="text-[#B8860B]">42 complaints</strong></div>
            <div class="p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl flex justify-between"><span>Ward 14 (Shivajinagar)</span><strong class="text-[#B8860B]">28 complaints</strong></div>
            <div class="p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl flex justify-between"><span>Ward 5 (Market Yard)</span><strong class="text-[#B8860B]">19 complaints</strong></div>
          </div>
        </div>

      </div>
    </div>
  `;
}

// ------------------------------------------
// 7C. ADMIN VIEWS
// ------------------------------------------
function renderAdminDashboardView() {
  return `
    <div class="space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
        <span class="px-3 py-1 rounded-full bg-[#B8860B] text-white text-xs font-bold">System Administrator Console</span>
        <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8] mt-2">Municipal Governance & SLA Monitoring</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
          <span class="text-xs text-[#8C7A68]">Systemwide SLA Compliance</span>
          <p class="font-display font-black text-3xl text-[#2E7D32] mt-2">91.4%</p>
        </div>
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
          <span class="text-xs text-[#8C7A68]">Avg Resolution Time</span>
          <p class="font-display font-black text-3xl text-[#B8860B] mt-2">1.8 Days</p>
        </div>
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
          <span class="text-xs text-[#8C7A68]">Human Override Rate</span>
          <p class="font-display font-black text-3xl text-[#8F6B00] mt-2">8.2%</p>
        </div>
      </div>
    </div>
  `;
}

function renderFairnessMonitoringView() {
  return `
    <div class="space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
        <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Fairness & Accessibility Monitoring</h2>
        <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]">Audit routing accuracy, multilingual performance, and accessibility task success</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-4">
          <h3 class="font-display font-bold text-lg text-[#3B2A1A] dark:text-[#FFF7E8]">AI Fairness Metrics</h3>
          
          <div class="space-y-3 text-xs">
            <div class="flex justify-between p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl"><span>Routing Accuracy</span><strong class="text-[#2E7D32]">96.2%</strong></div>
            <div class="flex justify-between p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl"><span>Duplicate Detection Accuracy</span><strong class="text-[#2E7D32]">94.8%</strong></div>
            <div class="flex justify-between p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl"><span>Multilingual Performance</span><strong class="text-[#2E7D32]">95.1%</strong></div>
            <div class="flex justify-between p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl"><span>Accessibility Task Success</span><strong class="text-[#2E7D32]">98.4%</strong></div>
            <div class="flex justify-between p-3 bg-[#FFF7F0] dark:bg-[#382D23] rounded-xl"><span>Human Override Rate</span><strong class="text-[#B8860B]">8.2%</strong></div>
          </div>
        </div>

        <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-4">
          <h3 class="font-display font-bold text-lg text-[#3B2A1A] dark:text-[#FFF7E8]">Disparity Alerts</h3>
          
          <div class="p-4 bg-[#FFF3E0] rounded-2xl border border-[#C77C02] text-xs text-[#C77C02] space-y-1">
            <strong>⚠️ Review Recommended</strong>
            <p>Multilingual complaints in Ward 7 show a 4.2% longer routing latency. Flagged for operational review.</p>
          </div>

          <p class="text-[11px] text-[#8C7A68]">
            <i class="fa-solid fa-info-circle text-[#B8860B]"></i> Fairness flags highlight potential bias or delay for human officer review. System never automatically denies or rejects a complaint.
          </p>
        </div>

      </div>
    </div>
  `;
}

function renderAuditLogsView() {
  return `
    <div class="space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm">
        <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">System Audit Trail</h2>
        <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]">Immutable record of complaint submissions, AI triages, officer overrides, and status changes</p>
      </div>

      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead>
            <tr class="border-b border-[#E8D4C3] dark:border-[#382D23] text-[#8C7A68] uppercase">
              <th class="py-3 px-2">Timestamp</th>
              <th class="py-3 px-2">Action</th>
              <th class="py-3 px-2">Actor</th>
              <th class="py-3 px-2">Details</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-[#E8D4C3] dark:divide-[#382D23]">
            ${state.auditLogs.map(a => `
              <tr>
                <td class="py-3 px-2 font-mono text-[#8C7A68]">${a.timestamp}</td>
                <td class="py-3 px-2 font-bold text-[#B8860B]">${a.action}</td>
                <td class="py-3 px-2 font-semibold text-[#3B2A1A] dark:text-[#FFF7E8]">${a.actor}</td>
                <td class="py-3 px-2 text-[#6B5845] dark:text-[#D6C4AE]">${a.details}</td>
              </tr>
            `).join("")}
            ${state.auditLogs.length === 0 ? `
              <tr><td colspan="4" class="py-6 text-center text-[#8C7A68]">No audit logs recorded yet.</td></tr>
            ` : ''}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ------------------------------------------
// 7D. SHARED VIEWS (MAP, NOTIFS, PROFILE, SETTINGS)
// ------------------------------------------
function renderCivicMapView() {
  return `
    <div class="space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Civic Problem Map</h2>
          <p class="text-xs text-[#6B5845] dark:text-[#D6C4AE]">Geospatial view of active municipal issues across city wards</p>
        </div>
      </div>

      <!-- Leaflet Map Container -->
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-4 shadow-md">
        <div id="leafletMap" class="h-[500px] w-full rounded-2xl z-10"></div>
      </div>
    </div>
  `;
}

function renderNotificationsView() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Notifications</h2>
        <button class="text-xs text-[#B8860B] font-bold hover:underline">Mark all as read</button>
      </div>

      <div class="space-y-3">
        <div class="p-4 bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl text-xs space-y-1">
          <span class="font-bold text-[#B8860B]">Complaint Status Update</span>
          <p class="text-[#3B2A1A] dark:text-[#FFF7E8]">Complaint #CRP-2026-00124 has been assigned to Officer R. Patil (Roads Dept).</p>
          <span class="text-[10px] text-[#8C7A68]">10 minutes ago</span>
        </div>
        <div class="p-4 bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-2xl text-xs space-y-1">
          <span class="font-bold text-[#2E7D32]">Complaint Resolved</span>
          <p class="text-[#3B2A1A] dark:text-[#FFF7E8]">Streetlight issue #CRP-2026-00127 has been marked resolved.</p>
          <span class="text-[10px] text-[#8C7A68]">Yesterday</span>
        </div>
      </div>
    </div>
  `;
}

function renderProfileView() {
  const u = state.currentUser;
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-6">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-full bg-[#B8860B] text-white flex items-center justify-center font-bold text-2xl">
            ${u.role.substring(0, 3)}
          </div>
          <div>
            <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">${u.name}</h2>
            <p class="text-xs font-mono text-[#B8860B] font-bold">${u.id}</p>
          </div>
        </div>

        <div class="space-y-3 pt-4 border-t border-[#E8D4C3] dark:border-[#382D23] text-xs">
          <div class="flex justify-between py-2 border-b border-[#E8D4C3] dark:border-[#382D23]">
            <span class="text-[#8C7A68]">Assigned Role</span>
            <strong class="text-[#3B2A1A] dark:text-[#FFF7E8]">${u.role}</strong>
          </div>
          ${u.maskedAadhaar ? `
            <div class="flex justify-between py-2 border-b border-[#E8D4C3] dark:border-[#382D23]">
              <span class="text-[#8C7A68]">Masked Aadhaar Identity</span>
              <strong class="font-mono text-[#3B2A1A] dark:text-[#FFF7E8]">${u.maskedAadhaar}</strong>
            </div>
          ` : ''}
          <div class="flex justify-between py-2">
            <span class="text-[#8C7A68]">Privacy Shield</span>
            <strong class="text-[#2E7D32]">Active</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderSettingsView() {
  return `
    <div class="max-w-2xl mx-auto space-y-6">
      <div class="bg-[#FFFDF9] dark:bg-[#2C231B] border border-[#E8D4C3] dark:border-[#382D23] rounded-3xl p-6 shadow-sm space-y-6">
        <h2 class="font-display font-extrabold text-2xl text-[#3B2A1A] dark:text-[#FFF7E8]">Settings</h2>
        
        <div class="space-y-4 text-xs">
          <div class="flex items-center justify-between p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl">
            <div>
              <strong class="block text-[#3B2A1A] dark:text-[#FFF7E8]">Theme Mode</strong>
              <span class="text-[#8C7A68]">Toggle between light peach and warm dark theme</span>
            </div>
            <button onclick="toggleTheme()" class="py-2 px-4 rounded-xl bg-[#B8860B] text-white font-bold">Toggle Theme</button>
          </div>

          <div class="flex items-center justify-between p-4 bg-[#FFF7F0] dark:bg-[#382D23] rounded-2xl">
            <div>
              <strong class="block text-[#3B2A1A] dark:text-[#FFF7E8]">Logout</strong>
              <span class="text-[#8C7A68]">End active authenticated session</span>
            </div>
            <button onclick="logout()" class="py-2 px-4 rounded-xl bg-[#C62828] text-white font-bold">Logout</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 8. POST-RENDER HANDLERS & EVENT BINDING
// ==========================================
function postRenderView(route) {
  if (route === "report") {
    const form = document.getElementById("newComplaintForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const cat = document.getElementById("issueCategory").value;
        const desc = document.getElementById("issueDescription").value.trim();
        const loc = document.getElementById("issueLocation").value.trim();
        const urgency = document.querySelector('input[name="urgency"]:checked').value;

        const newId = "CRP-2026-00" + Math.floor(100 + Math.random() * 900);
        const newComplaint = {
          id: newId,
          title: desc.substring(0, 50) + "...",
          category: cat,
          priority: urgency,
          status: "Received",
          department: getSuggestedDepartment(cat),
          residentId: "RES-1001",
          location: loc,
          lat: 18.5204 + (Math.random() - 0.5) * 0.05,
          lng: 73.8567 + (Math.random() - 0.5) * 0.05,
          submittedAt: new Date().toLocaleString(),
          slaHours: 48,
          slaDueMs: Date.now() + 48 * 3600 * 1000,
          slaStatus: "ON_TRACK",
          description: desc,
          aiConfidence: "94%",
          duplicateCluster: "2 similar complaints nearby",
          auditTrail: [
            { time: new Date().toLocaleString(), action: "Complaint Submitted", actor: "Resident (RES-1001)" },
            { time: new Date().toLocaleString(), action: "AI Triage Completed", actor: "AI Engine (94% confidence)" }
          ]
        };

        state.pendingTriageComplaint = newComplaint;
        state.complaints.unshift(newComplaint);
        logAudit("Complaint Submitted", "Resident (RES-1001)", `Logged ID: ${newId} - ${cat}`);
        saveState();

        // Immediately show AI Assisted Triage view!
        navigateTo("ai-triage");
      };
    }
  } else if (route === "complaint-review") {
    const form = document.getElementById("officerOverrideForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const complaintId = state.selectedComplaintId || "CRP-2026-00124";
        const c = state.complaints.find(x => x.id === complaintId);
        if (c) {
          const newPrio = document.getElementById("overridePriority").value;
          const newDept = document.getElementById("overrideDept").value;
          const reason = document.getElementById("overrideReason").value.trim();

          c.priority = newPrio;
          c.department = newDept;
          c.auditTrail.unshift({
            time: new Date().toLocaleString(),
            action: `Human Override: Priority to ${newPrio}`,
            actor: `${state.currentUser.name} (${state.currentUser.id})`,
            reason: reason
          });

          logAudit("Officer Override", `${state.currentUser.name} (${state.currentUser.id})`, `ID ${c.id}: Prio->${newPrio}, Reason: ${reason}`);
          saveState();
          alert("Override recorded and audit entry logged!");
          navigateTo("officer-dashboard");
        }
      };
    }
  } else if (route === "map") {
    setTimeout(initLeafletMap, 100);
  }
}

function getSuggestedDepartment(cat) {
  if (cat.includes("Road")) return "Roads & Infrastructure";
  if (cat.includes("Garbage")) return "Solid Waste Management";
  if (cat.includes("Water") || cat.includes("Sewage")) return "Water Supply & Sewage";
  if (cat.includes("Streetlight")) return "Electrical & Public Lighting";
  return "General Municipal Services";
}

function getPriorityBadgeClass(prio) {
  if (prio === "Critical") return "bg-[#FFEBEE] text-[#C62828]";
  if (prio === "High") return "bg-[#FFF3E0] text-[#C77C02]";
  if (prio === "Medium") return "bg-[#FFE4D1] text-[#8F6B00]";
  return "bg-[#E8F5E9] text-[#2E7D32]";
}

function getStatusBadgeClass(status) {
  if (status === "Resolved") return "bg-[#E8F5E9] text-[#2E7D32]";
  if (status === "In Progress") return "bg-[#FFF7F0] text-[#B8860B] border border-[#B8860B]";
  return "bg-[#FFE4D1] text-[#8F6B00]";
}

// Leaflet Map Initialization
function initLeafletMap() {
  const mapElement = document.getElementById("leafletMap");
  if (!mapElement) return;

  const map = L.map("leafletMap").setView([18.5204, 73.8567], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  state.complaints.forEach(c => {
    if (c.lat && c.lng) {
      const marker = L.circleMarker([c.lat, c.lng], {
        radius: 8,
        fillColor: getMarkerColor(c.category),
        color: "#3B2A1A",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      }).addTo(map);

      marker.bindPopup(`
        <div class="font-sans text-xs">
          <strong class="font-bold text-[#B8860B] block">${c.id}</strong>
          <p class="font-bold text-[#3B2A1A]">${c.title}</p>
          <span class="text-[10px] text-gray-600 block mt-1">${c.location}</span>
        </div>
      `);
    }
  });
}

function getMarkerColor(cat) {
  if (cat.includes("Road")) return "#C62828";
  if (cat.includes("Garbage")) return "#2E7D32";
  if (cat.includes("Water")) return "#0288D1";
  if (cat.includes("Streetlight")) return "#FBC02D";
  return "#B8860B";
}

// Global Event Listeners
function initEventListeners() {
  // Mobile Sidebar Toggle
  const openBtn = document.getElementById("openSidebarBtn");
  const closeBtn = document.getElementById("closeSidebarBtn");
  const sidebar = document.getElementById("sidebar");

  if (openBtn && sidebar) {
    openBtn.addEventListener("click", () => sidebar.classList.remove("-translate-x-full"));
  }
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => sidebar.classList.add("-translate-x-full"));
  }

  // Theme Toggles
  document.getElementById("authThemeToggle")?.addEventListener("click", toggleTheme);
  document.getElementById("headerThemeToggle")?.addEventListener("click", toggleTheme);

  // Logout Buttons
  document.getElementById("headerLogoutBtn")?.addEventListener("click", logout);
  document.getElementById("sidebarLogoutBtn")?.addEventListener("click", logout);

  // Language Selectors
  const authLang = document.getElementById("authLangSelect");
  const headerLang = document.getElementById("headerLangSelect");

  if (authLang) {
    authLang.addEventListener("change", (e) => {
      state.currentLanguage = e.target.value;
      localStorage.setItem("app_language", state.currentLanguage);
      if (headerLang) headerLang.value = e.target.value;
    });
  }
  if (headerLang) {
    headerLang.addEventListener("change", (e) => {
      state.currentLanguage = e.target.value;
      localStorage.setItem("app_language", state.currentLanguage);
      if (authLang) authLang.value = e.target.value;
      updateHeaderAndSidebar();
      if (state.currentUser) navigateTo(state.currentRoute);
    });
  }
}
