/* ==========================================================================
   COMMUNITY REDRESSAL PLANNER - COMPLETE APPLICATION LOGIC
   Multilingual i18n, AI Triage, PII Redaction, SLA Manager, Duplicate Cluster,
   Human Overrides, Geospatial Map & Chart.js Analytics
   ========================================================================== */

// Global Application State
const AppState = {
  currentRole: 'resident', // 'resident' | 'officer' | 'admin'
  currentLang: 'en', // 'en' | 'hi' | 'mr'
  activeView: 'dashboard',
  selectedComplaintId: null,
  pendingDraft: null,
  mapFilter: 'ALL',

  // Mock Database of Grievances
  complaints: [
    {
      id: 'CRP-2026-00124',
      title: 'Deep pothole near Central School main gate',
      description: 'Dangerous 2-foot pothole on main road right in front of Central School entrance causing heavy morning traffic and risk to school buses.',
      category: 'Road Damage',
      priority: 'HIGH',
      department: 'Roads & Infrastructure',
      status: 'In Progress',
      location: 'Near Central School Main Gate, Ward 12, Pune',
      ward: 'Ward 12',
      reportedBy: 'Aarav Sharma',
      createdAt: '2026-08-05T09:30:00',
      slaHoursRemaining: 62,
      confidence: 94,
      duplicateRisk: 87,
      upvotes: 14,
      escalationLevel: 'Field Officer',
      privacyRedacted: true,
      lat: 48,
      lng: 42,
      auditTrail: [
        { time: '2026-08-05 09:30 AM', event: 'Complaint registered by resident via Web Intake.' },
        { time: '2026-08-05 09:31 AM', event: 'AI Engine categorized as Road Damage (94% confidence) & assigned HIGH priority.' },
        { time: '2026-08-05 10:15 AM', event: 'Assigned to Roads Dept Field Officer (Ramesh K.).' },
        { time: '2026-08-06 02:00 PM', event: 'Status updated to In Progress. Site inspection dispatched.' }
      ]
    },
    {
      id: 'CRP-2026-00128',
      title: 'Garbage dump accumulation & foul odor near Market Complex',
      description: 'Unattended waste pile near Ward 14 vegetable market overflowed onto sidewalk. Poses public health hazard.',
      category: 'Garbage',
      priority: 'CRITICAL',
      department: 'Sanitation & Solid Waste',
      status: 'SLA At Risk',
      location: 'Behind Vegetable Market, Ward 14, Pune',
      ward: 'Ward 14',
      reportedBy: 'Sunita Patil',
      createdAt: '2026-08-04T14:15:00',
      slaHoursRemaining: 8,
      confidence: 96,
      duplicateRisk: 42,
      upvotes: 29,
      escalationLevel: 'Dept Supervisor',
      privacyRedacted: true,
      lat: 65,
      lng: 70,
      auditTrail: [
        { time: '2026-08-04 02:15 PM', event: 'Complaint submitted with photo evidence.' },
        { time: '2026-08-04 02:16 PM', event: 'AI Triage assigned CRITICAL priority due to bio-hazard risk.' },
        { time: '2026-08-06 06:00 PM', event: 'SLA Warning: 12 hours remaining before auto-escalation.' },
        { time: '2026-08-07 08:00 AM', event: 'Human Override by Supervisor: Escalated to Sanitation Truck Fleet #4.' }
      ]
    },
    {
      id: 'CRP-2026-00132',
      title: 'Major water pipe burst flooding street',
      description: 'Water pipeline burst near Metro Station Gate 2. Drinking water gushing continuously for 4 hours.',
      category: 'Water Leakage',
      priority: 'CRITICAL',
      department: 'Water Supply & Sewage',
      status: 'Assigned',
      location: 'Metro Station Gate 2, Ward 5, Pune',
      ward: 'Ward 5',
      reportedBy: 'Karan Deshmukh',
      createdAt: '2026-08-07T08:00:00',
      slaHoursRemaining: 20,
      confidence: 98,
      duplicateRisk: 91,
      upvotes: 43,
      escalationLevel: 'Field Officer',
      privacyRedacted: true,
      lat: 30,
      lng: 55,
      auditTrail: [
        { time: '2026-08-07 08:00 AM', event: 'Emergency complaint received via voice input simulation.' },
        { time: '2026-08-07 08:02 AM', event: 'AI categorized as Emergency Water Leakage. Routed to Water Works emergency crew.' }
      ]
    },
    {
      id: 'CRP-2026-00119',
      title: 'Dark alley due to 5 non-functional streetlights',
      description: 'Streetlights unlit between plot 40 and 52 for 3 consecutive nights. Safety risk for evening commuters.',
      category: 'Streetlight',
      priority: 'MEDIUM',
      department: 'Electrical Maintenance',
      status: 'Resolved',
      location: 'Sector 4 Residential Zone, Ward 12, Pune',
      ward: 'Ward 12',
      reportedBy: 'Meera Nair',
      createdAt: '2026-08-01T19:40:00',
      slaHoursRemaining: 0,
      confidence: 92,
      duplicateRisk: 15,
      upvotes: 8,
      escalationLevel: 'Field Officer',
      privacyRedacted: true,
      lat: 38,
      lng: 35,
      auditTrail: [
        { time: '2026-08-01 07:40 PM', event: 'Complaint registered.' },
        { time: '2026-08-02 11:00 AM', event: 'Technician team dispatched.' },
        { time: '2026-08-03 04:30 PM', event: 'LED fixtures replaced. Complaint marked Resolved.' }
      ]
    },
    {
      id: 'CRP-2026-00135',
      title: 'Open drain manhole missing heavy cover',
      description: 'Manhole cover broken on pedestrian walking path. High safety danger to children and visually impaired residents.',
      category: 'Public Safety',
      priority: 'CRITICAL',
      department: 'Public Works Dept',
      status: 'In Progress',
      location: 'Opposite Community Library, Ward 8, Pune',
      ward: 'Ward 8',
      reportedBy: 'Priya Joshi',
      createdAt: '2026-08-06T11:20:00',
      slaHoursRemaining: 16,
      confidence: 97,
      duplicateRisk: 30,
      upvotes: 19,
      escalationLevel: 'Field Officer',
      privacyRedacted: true,
      lat: 72,
      lng: 25,
      auditTrail: [
        { time: '2026-08-06 11:20 AM', event: 'Accessibility hazard complaint registered.' },
        { time: '2026-08-06 11:22 AM', event: 'AI Triage flagged safety hazard. Barricading crew dispatched.' }
      ]
    }
  ],

  // Notifications Queue
  notifications: [
    { id: 1, title: 'Complaint Assigned', msg: 'Ticket CRP-2026-00132 has been routed to Water Supply Dept.', time: '10 mins ago', unread: true },
    { id: 2, title: 'SLA Warning Alert', msg: 'Ticket CRP-2026-00128 is within 8 hours of SLA deadline.', time: '1 hour ago', unread: true },
    { id: 3, title: 'Issue Resolved', msg: 'Streetlight repair ticket CRP-2026-00119 was marked resolved.', time: 'Yesterday', unread: true },
    { id: 4, title: 'Duplicate Upvote', msg: '3 residents upvoted your pothole complaint CRP-2026-00124.', time: '2 days ago', unread: true }
  ]
};

// Translations Dictionary (English, Hindi, Marathi)
const I18N_DICT = {
  en: {
    current_role: 'Demo Mode Role',
    nav_dashboard: 'Dashboard',
    nav_report: 'Report Issue',
    nav_my_complaints: 'My Complaints',
    nav_map: 'Civic Map',
    nav_analytics: 'Analytics',
    nav_notifications: 'Notifications',
    nav_settings: 'Settings',
    nav_evaluation: 'Model Card & Specs',
    welcome_greeting: 'Good morning',
    tagline_banner: 'Official Municipal Redressal Gateway',
    welcome_subtitle: 'Track civic complaints, leverage AI automated triage, and monitor SLA timelines to build a better community.',
    btn_report_issue: 'Report an Issue',
    stat_active: 'Active Complaints',
    stat_resolved: 'Resolved',
    stat_sla_risk: 'SLA At Risk',
    stat_escalated: 'Escalated',
    heading_recent_complaints: 'Recent Complaints',
    subheading_recent: 'Live municipal complaint feeds with automated SLA timers',
    form_title: 'Report a Civic Problem',
    form_subtitle: 'Our AI engine will analyze your report, redact private information, assign priority, and route it to the appropriate department.',
    field_language: 'Language',
    field_category: 'Category',
    field_description: 'Issue Description',
    field_location: 'Location',
    field_evidence: 'Evidence Photo',
    btn_voice: 'Voice Input',
    btn_curr_location: 'Use Current Location',
    btn_analyze_submit: 'Analyze & Submit with AI',
    heading_my_complaints: 'My Reported Complaints',
    subheading_my_complaints: 'Track the live resolution status and SLA compliance of your submitted grievances',
    heading_map: 'Civic Problem Map',
    subheading_map: 'Geospatial view of active municipal issues across city wards',
    heading_analytics: 'Municipal Analytics & SLA Audit',
    subheading_analytics: 'Department-level grievance redressal performance, SLA compliance rates, and resolution efficiency.',
    heading_notifications: 'Activity Notifications',
    mark_all_read: 'Mark all as read',
    notifications: 'Notifications'
  },
  hi: {
    current_role: 'डेमो मोड भूमिका',
    nav_dashboard: 'डैशबोर्ड',
    nav_report: 'समस्या दर्ज करें',
    nav_my_complaints: 'मेरी शिकायतें',
    nav_map: 'नागरिक मानचित्र',
    nav_analytics: 'विश्लेषण',
    nav_notifications: 'सूचनाएं',
    nav_settings: 'सेटिंग्स',
    nav_evaluation: 'मॉडल कार्ड और विनिर्देश',
    welcome_greeting: 'नमस्ते / शुभ प्रभात',
    tagline_banner: 'आधिकारिक नगर निगम निवारण पोर्टल',
    welcome_subtitle: 'नागरिक शिकायतों को ट्रैक करें, एआई ऑटोमेटेड ट्राइएज का उपयोग करें और एसएलए समयसीमा की निगरानी करें।',
    btn_report_issue: 'समस्या दर्ज करें',
    stat_active: 'सक्रिय शिकायतें',
    stat_resolved: 'हल की गई',
    stat_sla_risk: 'जोखिम में एसएलए',
    stat_escalated: 'एस्कलेटेड (उच्च)',
    heading_recent_complaints: 'हाल की शिकायतें',
    subheading_recent: 'स्वचालित एसएलए टाइमर के साथ लाइव नगर निगम शिकायत फीड',
    form_title: 'नागरिक समस्या दर्ज करें',
    form_subtitle: 'हमारा एआई इंजन आपकी रिपोर्ट का विश्लेषण करेगा, निजी जानकारी छिपाएगा, प्राथमिकता देगा और सही विभाग को भेजेगा।',
    field_language: 'भाषा',
    field_category: 'श्रेणी',
    field_description: 'समस्या का विवरण',
    field_location: 'स्थान',
    field_evidence: 'प्रमाण फोटो',
    btn_voice: 'वॉयस इनपुट',
    btn_curr_location: 'वर्तमान स्थान का उपयोग करें',
    btn_analyze_submit: 'विश्लेषण करें और एआई के साथ जमा करें',
    heading_my_complaints: 'मेरी दर्ज शिकायतें',
    subheading_my_complaints: 'अपनी दर्ज शिकायतों की लाइव स्थिति और एसएलए की निगरानी करें',
    heading_map: 'नागरिक समस्या मानचित्र',
    subheading_map: 'शहर के वार्डों में सक्रिय नगर निगम मुद्दों का भौगोलिक दृश्य',
    heading_analytics: 'नगर पालिका विश्लेषण एवं एसएलए ऑडिट',
    subheading_analytics: 'विभाग वार शिकायत निवारण प्रदर्शन और संकल्प दक्षता।',
    heading_notifications: 'गतिविधि सूचनाएं',
    mark_all_read: 'सभी को पढ़ा हुआ चिह्नित करें',
    notifications: 'सूचनाएं'
  },
  mr: {
    current_role: 'डेमो मोड भूमिका',
    nav_dashboard: 'डॅशबोर्ड',
    nav_report: 'तक्रार नोंदवा',
    nav_my_complaints: 'माझ्या तक्रारी',
    nav_map: 'नागरी नकाशा',
    nav_analytics: 'विश्लेषण',
    nav_notifications: 'सूचना',
    nav_settings: 'सेटिंग्ज',
    nav_evaluation: 'मॉडेल कार्ड आणि तपशील',
    welcome_greeting: 'शुभ प्रभात / नमस्कार',
    tagline_banner: 'अधिकृत महानगरपालिका निवारण पोर्टल',
    welcome_subtitle: 'नागरी तक्रारी ट्रॅक करा, AI स्वयंचलित वर्गीकरण वापरा आणि SLA वेळेचे निरीक्षण करा.',
    btn_report_issue: 'तक्रार नोंदवा',
    stat_active: 'सक्रिय तक्रारी',
    stat_resolved: 'निराकरण झालेले',
    stat_sla_risk: 'SLA धोक्यात',
    stat_escalated: 'वरिष्ठांकडे पाठवलेले',
    heading_recent_complaints: 'अलीकडील तक्रारी',
    subheading_recent: 'स्वयंचलित SLA टाइमरसह थेट महापालिका तक्रार फीड',
    form_title: 'नागरी समस्या नोंदवा',
    form_subtitle: 'आमचे AI इंजिन तुमच्या अहवालाचे विश्लेषण करेल, वैयक्तिक माहिती गुप्त ठेवेल आणि योग्य विभागाकडे पाठवेल.',
    field_language: 'भाषा',
    field_category: 'वर्ग',
    field_description: 'समस्येचे वर्णन',
    field_location: 'ठिकाण',
    field_evidence: 'पुरावा फोटो',
    btn_voice: 'व्हॉइस इनपुट',
    btn_curr_location: 'सध्याचे स्थान वापरा',
    btn_analyze_submit: 'विश्लेषण करा आणि AI सह सबमिट करा',
    heading_my_complaints: 'माझ्या नोंदवलेल्या तक्रारी',
    subheading_my_complaints: 'तुमच्या तक्रारींची थेट स्थिती आणि SLA वेळेचा मागोवा घ्या',
    heading_map: 'नागरी समस्या नकाशा',
    subheading_map: 'शहरातील प्रभागांमधील सक्रिय समस्यांचे भौगोलिक दृश्य',
    heading_analytics: 'महापालिका विश्लेषण आणि SLA ऑडिट',
    subheading_analytics: 'विभागनिहाय तक्रार निवारण कामगिरी आणि दुरुस्ती कार्यक्षमता.',
    heading_notifications: 'कार्यकलाप सूचना',
    mark_all_read: 'सर्व वाचलेले म्हणून चिन्हांकित करा',
    notifications: 'सूचना'
  }
};

// Charts Instances
let chartCategory = null;
let chartTrend = null;
let chartDept = null;
let chartSla = null;

// ==========================================
// INITIALIZATION ON DOM CONTENT LOADED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initThemeSwitcher();
  initRoleSwitcher();
  initLanguageSwitcher();
  initFormListeners();
  initModals();
  initNotifications();
  renderDashboard();
  renderMap();
  renderAnalyticsCharts();
  startSlaTicker();
});

// ==========================================
// NAVIGATION & VIEW SWITCHING
// ==========================================
function initNavigation() {
  const navBtns = document.querySelectorAll('.nav-item');
  const actionBtns = document.querySelectorAll('[data-nav]');

  actionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.getAttribute('data-nav');
      switchView(targetView);
    });
  });

  // Mobile menu sidebar toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const sidebar = document.getElementById('sidebar');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  if (mobileMenuBtn && sidebar && mobileBackdrop) {
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.remove('-translate-x-full');
      mobileBackdrop.classList.remove('hidden');
    });

    const closeSidebar = () => {
      sidebar.classList.add('-translate-x-full');
      mobileBackdrop.classList.add('hidden');
    };

    if (closeMobileMenu) closeMobileMenu.addEventListener('click', closeSidebar);
    mobileBackdrop.addEventListener('click', closeSidebar);
  }

  // Global search input
  const globalSearch = document.getElementById('globalSearch');
  if (globalSearch) {
    globalSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      filterRecentTable(query);
    });
  }
}

function switchView(viewName) {
  AppState.activeView = viewName;

  // Update Nav Active UI
  document.querySelectorAll('.nav-item').forEach(btn => {
    if (btn.getAttribute('data-nav') === viewName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Toggle View Sections
  document.querySelectorAll('.content-view').forEach(sec => {
    sec.classList.add('hidden');
  });

  const targetSec = document.getElementById(`view-${viewName}`);
  if (targetSec) {
    targetSec.classList.remove('hidden');
  }

  // View specific triggers
  if (viewName === 'complaints') {
    renderMyComplaints();
  } else if (viewName === 'map') {
    renderMap();
  } else if (viewName === 'analytics') {
    renderAnalyticsCharts();
  } else if (viewName === 'notifications') {
    renderFullNotificationsList();
  }
}

// ==========================================
// THEME SWITCHER (DARK / LIGHT MODE)
// ==========================================
function initThemeSwitcher() {
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    showToast(isDark ? 'Dark Mode Activated' : 'Light Mode Activated', 'info');
    renderAnalyticsCharts(); // Redraw charts with dark background adjustments
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
}

// ==========================================
// DEMO ROLE SWITCHER
// ==========================================
function initRoleSwitcher() {
  const roleSwitcher = document.getElementById('roleSwitcher');
  const roleBadge = document.getElementById('roleBadge');
  const userName = document.getElementById('userName');
  const userRoleSub = document.getElementById('userRoleSub');

  if (roleSwitcher) {
    roleSwitcher.addEventListener('change', (e) => {
      AppState.currentRole = e.target.value;
      if (roleBadge) roleBadge.textContent = AppState.currentRole.toUpperCase();

      if (AppState.currentRole === 'resident') {
        if (userName) userName.textContent = 'Aarav Sharma';
        if (userRoleSub) userRoleSub.textContent = 'Resident • Ward 12';
        showToast('Switched to Resident Mode', 'info');
      } else if (AppState.currentRole === 'officer') {
        if (userName) userName.textContent = 'Officer Ramesh K.';
        if (userRoleSub) userRoleSub.textContent = 'Ward Nodal Officer • Roads & Infra';
        showToast('Switched to Officer Queue Mode (Overrides Enabled)', 'warning');
      } else if (AppState.currentRole === 'admin') {
        if (userName) userName.textContent = 'Municipal Commissioner';
        if (userRoleSub) userRoleSub.textContent = 'City Governance HQ';
        showToast('Switched to Admin Analytics Mode', 'success');
      }

      renderDashboard();
    });
  }
}

// ==========================================
// MULTILINGUAL i18n SWITCHER
// ==========================================
function initLanguageSwitcher() {
  const desktopLangSelect = document.getElementById('desktopLangSelect');
  const mobileLangSelect = document.getElementById('mobileLangSelect');

  const setLanguage = (lang) => {
    AppState.currentLang = lang;
    if (desktopLangSelect) desktopLangSelect.value = lang;
    if (mobileLangSelect) mobileLangSelect.value = lang;

    // Translate UI Elements with data-i18n
    const dict = I18N_DICT[lang] || I18N_DICT['en'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    showToast(`Language set to ${lang.toUpperCase()}`, 'info');
  };

  if (desktopLangSelect) desktopLangSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  if (mobileLangSelect) mobileLangSelect.addEventListener('change', (e) => setLanguage(e.target.value));
}

// ==========================================
// FORM HANDLING & VOICE SIMULATION
// ==========================================
function initFormListeners() {
  const complaintForm = document.getElementById('complaintForm');
  const voiceInputBtn = document.getElementById('voiceInputBtn');
  const useLocationBtn = document.getElementById('useLocationBtn');
  const fileInput = document.getElementById('fileInput');
  const dropZone = document.getElementById('dropZone');
  const previewImg = document.getElementById('previewImg');
  const imagePreview = document.getElementById('imagePreview');
  const uploadPrompt = document.getElementById('uploadPrompt');
  const removeImgBtn = document.getElementById('removeImgBtn');

  // Voice Input Simulation
  if (voiceInputBtn) {
    voiceInputBtn.addEventListener('click', () => {
      const descArea = document.getElementById('formDescription');
      voiceInputBtn.classList.add('animate-bounce');
      showToast('Listening... Speak your complaint (Voice transcription active)', 'info');

      setTimeout(() => {
        voiceInputBtn.classList.remove('animate-bounce');
        if (descArea) {
          descArea.value = 'School ke samne bada pothole hai paani bhar gaya hai, accident ho sakta hai. Urgent fix required near Ward 12.';
        }
        showToast('Voice transcription completed (Multilingual code-switching auto-detected)', 'success');
      }, 1800);
    });
  }

  // GPS Location Simulation
  if (useLocationBtn) {
    useLocationBtn.addEventListener('click', () => {
      const locInput = document.getElementById('formLocation');
      if (locInput) {
        locInput.value = 'Ward 12, Central School Main Gate, Pune (GPS Lat: 18.5204, Lng: 73.8567)';
      }
      showToast('GPS Coordinates Acquired', 'success');
    });
  }

  // Drag & Drop Image
  if (dropZone && fileInput) {
    dropZone.addEventListener('click', (e) => {
      if (e.target !== removeImgBtn && !removeImgBtn.contains(e.target)) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (previewImg) previewImg.src = evt.target.result;
          if (uploadPrompt) uploadPrompt.classList.add('hidden');
          if (imagePreview) imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
      }
    });

    if (removeImgBtn) {
      removeImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.value = '';
        if (imagePreview) imagePreview.classList.add('hidden');
        if (uploadPrompt) uploadPrompt.classList.remove('hidden');
      });
    }
  }

  // Form Submit -> Triggers AI Modal
  if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const lang = document.getElementById('formLanguage').value;
      const cat = document.getElementById('formCategory').value;
      const desc = document.getElementById('formDescription').value.trim();
      const loc = document.getElementById('formLocation').value.trim();

      if (!desc) {
        showToast('Please enter a description for your complaint.', 'danger');
        return;
      }

      // Check Incomplete Info Clarification Prompt
      if (desc.length < 15 || !loc) {
        showToast('Notice: Brief description detected. AI will auto-infer missing ward details without blocking urgent escalation.', 'warning');
      }

      // Create Draft Item
      const redactedDesc = redactPII(desc);
      AppState.pendingDraft = {
        title: desc.substring(0, 50) + (desc.length > 50 ? '...' : ''),
        description: redactedDesc,
        category: cat,
        location: loc || 'Ward 12 (AI Inferred from IP / Cell Tower)',
        lang: lang,
        evidenceAttached: fileInput && fileInput.files.length > 0
      };

      // Open AI Triage Modal
      showAiTriageModal(AppState.pendingDraft);
    });
  }
}

// PII Redaction Logic
function redactPII(text) {
  // Regex for Indian Phone Numbers & Emails
  const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/g;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  return text
    .replace(phoneRegex, '[REDACTED PHONE]')
    .replace(emailRegex, '[REDACTED EMAIL]');
}

// ==========================================
// MODALS LOGIC (AI, PRIVACY, DUPLICATE, DETAILS, OVERRIDE)
// ==========================================
function initModals() {
  // AI Modal Buttons
  const aiEditBtn = document.getElementById('aiEditBtn');
  const aiProceedBtn = document.getElementById('aiProceedBtn');

  if (aiEditBtn) aiEditBtn.addEventListener('click', () => closeModal('aiModal'));
  if (aiProceedBtn) {
    aiProceedBtn.addEventListener('click', () => {
      closeModal('aiModal');
      openModal('privacyModal');
    });
  }

  // Privacy Modal Button
  const privacyProceedBtn = document.getElementById('privacyProceedBtn');
  if (privacyProceedBtn) {
    privacyProceedBtn.addEventListener('click', () => {
      closeModal('privacyModal');
      openModal('duplicateModal');
    });
  }

  // Duplicate Modal Buttons
  const upvoteExistingBtn = document.getElementById('upvoteExistingBtn');
  const confirmNewSubmitBtn = document.getElementById('confirmNewSubmitBtn');

  if (upvoteExistingBtn) {
    upvoteExistingBtn.addEventListener('click', () => {
      closeModal('duplicateModal');
      // Upvote parent ticket #CRP-2026-00124
      const parentTicket = AppState.complaints.find(c => c.id === 'CRP-2026-00124');
      if (parentTicket) {
        parentTicket.upvotes += 1;
        parentTicket.auditTrail.unshift({
          time: new Date().toLocaleString(),
          event: `Upvoted (+1) by resident as duplicate report.`
        });
      }
      showToast('Thank you! You upvoted existing ticket #CRP-2026-00124 (+1)', 'success');
      resetForm();
      switchView('complaints');
    });
  }

  if (confirmNewSubmitBtn) {
    confirmNewSubmitBtn.addEventListener('click', () => {
      closeModal('duplicateModal');
      finalizeComplaintSubmission();
    });
  }

  // Details Modal Close
  const closeDetailsBtn = document.getElementById('closeDetailsBtn');
  if (closeDetailsBtn) closeDetailsBtn.addEventListener('click', () => closeModal('detailsModal'));

  // Officer Controls Buttons
  const overrideBtn = document.getElementById('overrideBtn');
  const resolveBtn = document.getElementById('resolveBtn');

  if (overrideBtn) {
    overrideBtn.addEventListener('click', () => {
      openModal('overrideModal');
    });
  }

  if (resolveBtn) {
    resolveBtn.addEventListener('click', () => {
      const ticket = AppState.complaints.find(c => c.id === AppState.selectedComplaintId);
      if (ticket) {
        ticket.status = 'Resolved';
        ticket.slaHoursRemaining = 0;
        ticket.auditTrail.unshift({
          time: new Date().toLocaleString(),
          event: `Marked RESOLVED by Officer ${AppState.currentRole === 'officer' ? 'Ramesh K.' : 'Admin'}.`
        });
        showToast(`Ticket ${ticket.id} marked as Resolved!`, 'success');
        closeModal('detailsModal');
        renderDashboard();
      }
    });
  }

  // Override Modal Actions
  const cancelOverrideBtn = document.getElementById('cancelOverrideBtn');
  const confirmOverrideBtn = document.getElementById('confirmOverrideBtn');

  if (cancelOverrideBtn) cancelOverrideBtn.addEventListener('click', () => closeModal('overrideModal'));
  if (confirmOverrideBtn) {
    confirmOverrideBtn.addEventListener('click', () => {
      const newPriority = document.getElementById('overridePriority').value;
      const reason = document.getElementById('overrideReason').value.trim();

      if (!reason) {
        showToast('Please provide a mandatory reason for human override.', 'danger');
        return;
      }

      const ticket = AppState.complaints.find(c => c.id === AppState.selectedComplaintId);
      if (ticket) {
        const oldP = ticket.priority;
        ticket.priority = newPriority;
        ticket.auditTrail.unshift({
          time: new Date().toLocaleString(),
          event: `HUMAN OVERRIDE by Officer Ramesh: Priority modified from ${oldP} to ${newPriority}. Reason: "${reason}".`
        });

        showToast(`Human Override logged for ${ticket.id}`, 'warning');
        closeModal('overrideModal');
        openDetailsModal(ticket.id); // Refresh details view
        renderDashboard();
      }
    });
  }
}

function openModal(modalId) {
  const backdrop = document.getElementById(modalId);
  if (backdrop) {
    backdrop.classList.remove('hidden');
    setTimeout(() => backdrop.classList.add('open'), 10);
  }
}

function closeModal(modalId) {
  const backdrop = document.getElementById(modalId);
  if (backdrop) {
    backdrop.classList.remove('open');
    setTimeout(() => backdrop.classList.add('hidden'), 250);
  }
}

function showAiTriageModal(draft) {
  const aiLang = document.getElementById('aiLang');
  const aiCategory = document.getElementById('aiCategory');
  const aiPriority = document.getElementById('aiPriority');
  const aiDept = document.getElementById('aiDept');
  const aiExplanation = document.getElementById('aiExplanation');

  if (aiLang) aiLang.textContent = draft.lang || 'English';
  if (aiCategory) aiCategory.textContent = draft.category;

  // Determine Priority & Dept based on category
  let priority = 'MEDIUM';
  let dept = 'Municipal General';

  if (draft.category === 'Road Damage') {
    priority = 'HIGH';
    dept = 'Roads & Infrastructure';
  } else if (draft.category === 'Garbage') {
    priority = 'HIGH';
    dept = 'Sanitation & Solid Waste';
  } else if (draft.category === 'Water Leakage' || draft.category === 'Public Safety') {
    priority = 'CRITICAL';
    dept = 'Water Supply & Sewage';
  } else if (draft.category === 'Streetlight') {
    priority = 'MEDIUM';
    dept = 'Electrical Maintenance';
  }

  if (aiPriority) aiPriority.textContent = priority;
  if (aiDept) aiDept.textContent = dept;
  if (aiExplanation) {
    aiExplanation.textContent = `“AI model assigned ${priority} priority to ${draft.category} based on contextual safety risks and proximity to residential zones.”`;
  }

  openModal('aiModal');
}

function finalizeComplaintSubmission() {
  if (!AppState.pendingDraft) return;

  const newId = `CRP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const draft = AppState.pendingDraft;

  const newComplaint = {
    id: newId,
    title: draft.title,
    description: draft.description,
    category: draft.category,
    priority: draft.category === 'Public Safety' ? 'CRITICAL' : 'HIGH',
    department: draft.category === 'Road Damage' ? 'Roads & Infrastructure' : 'Sanitation & Public Works',
    status: 'Assigned',
    location: draft.location,
    ward: 'Ward 12',
    reportedBy: 'Aarav Sharma',
    createdAt: new Date().toISOString(),
    slaHoursRemaining: 48,
    confidence: 95,
    duplicateRisk: 20,
    upvotes: 1,
    escalationLevel: 'Field Officer',
    privacyRedacted: true,
    lat: 40 + Math.floor(Math.random() * 30),
    lng: 30 + Math.floor(Math.random() * 40),
    auditTrail: [
      { time: new Date().toLocaleString(), event: 'Complaint registered by resident.' },
      { time: new Date().toLocaleString(), event: 'AI Engine auto-triaged, redacted PII, and assigned initial SLA.' }
    ]
  };

  AppState.complaints.unshift(newComplaint);
  AppState.pendingDraft = null;

  // Add notification
  AppState.notifications.unshift({
    id: Date.now(),
    title: 'Complaint Registered',
    msg: `Your ticket ${newId} has been successfully assigned to municipal team.`,
    time: 'Just now',
    unread: true
  });

  showToast(`Complaint registered successfully! ID: ${newId}`, 'success');
  resetForm();
  renderDashboard();
  switchView('complaints');
}

function resetForm() {
  const form = document.getElementById('complaintForm');
  if (form) form.reset();
  const preview = document.getElementById('imagePreview');
  const prompt = document.getElementById('uploadPrompt');
  if (preview) preview.classList.add('hidden');
  if (prompt) prompt.classList.remove('hidden');
}

// ==========================================
// RENDER DASHBOARD & TABLES
// ==========================================
function renderDashboard() {
  // Stat values calculation
  const activeCount = AppState.complaints.filter(c => c.status !== 'Resolved').length;
  const resolvedCount = AppState.complaints.filter(c => c.status === 'Resolved').length;
  const slaRiskCount = AppState.complaints.filter(c => c.slaHoursRemaining > 0 && c.slaHoursRemaining <= 12).length;
  const escalatedCount = AppState.complaints.filter(c => c.escalationLevel !== 'Field Officer').length;

  const statActiveVal = document.getElementById('statActiveVal');
  const statResolvedVal = document.getElementById('statResolvedVal');
  const statSlaRiskVal = document.getElementById('statSlaRiskVal');
  const statEscalatedVal = document.getElementById('statEscalatedVal');
  const navCountBadge = document.getElementById('navCountBadge');

  if (statActiveVal) statActiveVal.textContent = activeCount;
  if (statResolvedVal) statResolvedVal.textContent = resolvedCount;
  if (statSlaRiskVal) statSlaRiskVal.textContent = slaRiskCount;
  if (statEscalatedVal) statEscalatedVal.textContent = escalatedCount;
  if (navCountBadge) navCountBadge.textContent = AppState.complaints.length;

  // Render Recent Complaints Table
  renderRecentTable(AppState.complaints);
}

function renderRecentTable(data) {
  const tbody = document.getElementById('recentComplaintsTbody');
  if (!tbody) return;

  tbody.innerHTML = '';

  data.forEach(c => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors cursor-pointer';
    tr.onclick = () => openDetailsModal(c.id);

    // Priority badge class
    let priorityClass = 'priority-medium';
    if (c.priority === 'CRITICAL') priorityClass = 'priority-critical';
    else if (c.priority === 'HIGH') priorityClass = 'priority-high';
    else if (c.priority === 'LOW') priorityClass = 'priority-low';

    // Status badge color
    let statusBg = 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300';
    if (c.status === 'Resolved') statusBg = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300';
    if (c.status === 'SLA At Risk') statusBg = 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300';

    tr.innerHTML = `
      <td class="py-3 px-3 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">${c.id}</td>
      <td class="py-3 px-3 max-w-xs font-semibold text-slate-800 dark:text-slate-100 truncate">${c.title}</td>
      <td class="py-3 px-3 text-xs text-slate-500">${c.category}</td>
      <td class="py-3 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityClass}">${c.priority}</span></td>
      <td class="py-3 px-3"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusBg}">${c.status}</span></td>
      <td class="py-3 px-3 font-mono text-xs text-slate-600 dark:text-slate-300">${c.slaHoursRemaining > 0 ? `${c.slaHoursRemaining}h remaining` : 'Resolved / Due'}</td>
      <td class="py-3 px-3 text-right">
        <button class="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline">View →</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function filterRecentTable(query) {
  const cat = document.getElementById('dashCategoryFilter')?.value || 'ALL';
  const status = document.getElementById('dashStatusFilter')?.value || 'ALL';

  let filtered = AppState.complaints.filter(c => {
    const matchesQ = c.title.toLowerCase().includes(query) || c.id.toLowerCase().includes(query) || c.location.toLowerCase().includes(query);
    const matchesCat = cat === 'ALL' || c.category === cat;
    const matchesStatus = status === 'ALL' || c.status === status;
    return matchesQ && matchesCat && matchesStatus;
  });

  renderRecentTable(filtered);
}

// ==========================================
// RENDER MY COMPLAINTS CARDS VIEW
// ==========================================
function renderMyComplaints() {
  const grid = document.getElementById('myComplaintsCardsGrid');
  if (!grid) return;

  grid.innerHTML = '';

  AppState.complaints.forEach(c => {
    const card = document.createElement('div');
    card.className = 'bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4 hover:shadow-md transition-all cursor-pointer';
    card.onclick = () => openDetailsModal(c.id);

    let priorityBadge = 'priority-high';
    if (c.priority === 'CRITICAL') priorityBadge = 'priority-critical';

    card.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950 rounded-lg">${c.id}</span>
        <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${priorityBadge}">${c.priority}</span>
      </div>

      <h3 class="font-display font-bold text-base text-slate-900 dark:text-white line-clamp-2">${c.title}</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">${c.description}</p>

      <div class="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
        <span class="text-slate-400"><i class="fa-solid fa-building mr-1"></i>${c.department}</span>
        <span class="font-bold text-indigo-600 dark:text-indigo-400">Upvotes: ${c.upvotes}</span>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ==========================================
// COMPLAINT DETAILS & AUDIT TRAIL MODAL
// ==========================================
function openDetailsModal(id) {
  const ticket = AppState.complaints.find(c => c.id === id);
  if (!ticket) return;

  AppState.selectedComplaintId = id;

  const detailId = document.getElementById('detailId');
  const detailTitle = document.getElementById('detailTitle');
  const detailCategoryBadge = document.getElementById('detailCategoryBadge');
  const detailPriority = document.getElementById('detailPriority');
  const detailStatus = document.getElementById('detailStatus');
  const detailDept = document.getElementById('detailDept');
  const detailLocation = document.getElementById('detailLocation');
  const slaTimerText = document.getElementById('slaTimerText');
  const slaStatusBadge = document.getElementById('slaStatusBadge');
  const auditTrailList = document.getElementById('auditTrailList');
  const officerControls = document.getElementById('officerControls');

  if (detailId) detailId.textContent = ticket.id;
  if (detailTitle) detailTitle.textContent = ticket.title;
  if (detailCategoryBadge) detailCategoryBadge.textContent = ticket.category;
  if (detailPriority) detailPriority.textContent = ticket.priority;
  if (detailStatus) detailStatus.textContent = ticket.status;
  if (detailDept) detailDept.textContent = ticket.department;
  if (detailLocation) detailLocation.textContent = ticket.location;

  if (slaTimerText) {
    slaTimerText.textContent = ticket.slaHoursRemaining > 0 
      ? `${Math.floor(ticket.slaHoursRemaining / 24)} Days ${ticket.slaHoursRemaining % 24} Hours Remaining`
      : 'SLA Expired / Issue Closed';
  }

  if (slaStatusBadge) {
    if (ticket.status === 'Resolved') {
      slaStatusBadge.textContent = '🟢 Resolved';
      slaStatusBadge.className = 'px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    } else if (ticket.slaHoursRemaining > 24) {
      slaStatusBadge.textContent = '🟢 On Track';
      slaStatusBadge.className = 'px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40';
    } else if (ticket.slaHoursRemaining > 0) {
      slaStatusBadge.textContent = '🟡 SLA At Risk';
      slaStatusBadge.className = 'px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40';
    } else {
      slaStatusBadge.textContent = '🔴 Escalated / Overdue';
      slaStatusBadge.className = 'px-3 py-1.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40';
    }
  }

  // Render Audit Trail List
  if (auditTrailList) {
    auditTrailList.innerHTML = '';
    ticket.auditTrail.forEach(log => {
      const item = document.createElement('div');
      item.className = 'p-2 bg-slate-50 dark:bg-slate-700/40 rounded-xl flex flex-col gap-0.5';
      item.innerHTML = `
        <span class="text-[10px] text-slate-400 font-bold">${log.time}</span>
        <span class="text-xs text-slate-700 dark:text-slate-200">${log.event}</span>
      `;
      auditTrailList.appendChild(item);
    });
  }

  // Show Officer controls if in officer role
  if (officerControls) {
    if (AppState.currentRole === 'officer' || AppState.currentRole === 'admin') {
      officerControls.classList.remove('hidden');
    } else {
      officerControls.classList.add('hidden');
    }
  }

  openModal('detailsModal');
}

// ==========================================
// CIVIC MAP GEOSPATIAL PIN RENDERING
// ==========================================
function renderMap() {
  const mapArea = document.getElementById('mapMarkersArea');
  if (!mapArea) return;

  mapArea.innerHTML = '';

  // Filter map pins
  const filter = AppState.mapFilter;
  const filtered = filter === 'ALL' ? AppState.complaints : AppState.complaints.filter(c => c.category === filter);

  filtered.forEach(c => {
    const pin = document.createElement('div');
    pin.className = 'map-marker';
    pin.style.top = `${c.lat}%`;
    pin.style.left = `${c.lng}%`;

    let pinColor = '#3b82f6'; // default blue
    let iconClass = 'fa-circle-exclamation';

    if (c.category === 'Road Damage') { pinColor = '#f43f5e'; iconClass = 'fa-road'; }
    else if (c.category === 'Garbage') { pinColor = '#f59e0b'; iconClass = 'fa-trash-can'; }
    else if (c.category === 'Water Leakage') { pinColor = '#3b82f6'; iconClass = 'fa-droplet'; }
    else if (c.category === 'Streetlight') { pinColor = '#10b981'; iconClass = 'fa-lightbulb'; }

    pin.innerHTML = `
      <div class="map-pin" style="background-color: ${pinColor}; color: white;">
        <i class="fa-solid ${iconClass}"></i>
      </div>
      <div class="map-popup">
        <div class="font-bold text-xs truncate">${c.title}</div>
        <div class="text-[10px] text-slate-300 mt-1">${c.location}</div>
        <div class="mt-2 flex items-center justify-between font-bold text-[10px]">
          <span style="color: ${pinColor}">${c.priority}</span>
          <span class="text-indigo-400">Click to View →</span>
        </div>
      </div>
    `;

    pin.onclick = () => openDetailsModal(c.id);
    mapArea.appendChild(pin);
  });

  // Map Filter buttons listener
  document.querySelectorAll('.map-filter-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.map-filter-btn').forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white');
        b.classList.add('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });
      btn.classList.remove('bg-white', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      btn.classList.add('bg-indigo-600', 'text-white');

      AppState.mapFilter = btn.getAttribute('data-map-filter');
      renderMap();
    };
  });
}

// ==========================================
// CHART.JS ANALYTICS ENGINE
// ==========================================
function renderAnalyticsCharts() {
  if (typeof Chart === 'undefined') return;

  const isDark = document.documentElement.classList.contains('dark');
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? '#334155' : '#e2e8f0';

  // Chart 1: Category Breakdown
  const ctxCat = document.getElementById('categoryChart')?.getContext('2d');
  if (ctxCat) {
    if (chartCategory) chartCategory.destroy();
    chartCategory = new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: ['Road Damage', 'Garbage', 'Water Leakage', 'Streetlight', 'Sewage', 'Public Safety'],
        datasets: [{
          data: [42, 35, 28, 20, 15, 12],
          backgroundColor: ['#f43f5e', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Inter', size: 11 } } }
        }
      }
    });
  }

  // Chart 2: 7-Day Trend
  const ctxTrend = document.getElementById('trendChart')?.getContext('2d');
  if (ctxTrend) {
    if (chartTrend) chartTrend.destroy();
    chartTrend = new Chart(ctxTrend, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Reported',
            data: [18, 24, 20, 32, 28, 15, 22],
            borderColor: '#6366f1',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Resolved',
            data: [14, 20, 18, 28, 25, 18, 20],
            borderColor: '#10b981',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: textColor }, grid: { color: gridColor } },
          y: { ticks: { color: textColor }, grid: { color: gridColor } }
        },
        plugins: {
          legend: { labels: { color: textColor } }
        }
      }
    });
  }

  // Chart 3: Dept Resolution Time
  const ctxDept = document.getElementById('deptChart')?.getContext('2d');
  if (ctxDept) {
    if (chartDept) chartDept.destroy();
    chartDept = new Chart(ctxDept, {
      type: 'bar',
      data: {
        labels: ['Roads', 'Sanitation', 'Water', 'Electrical', 'Public Works'],
        datasets: [{
          label: 'Avg Days',
          data: [4.2, 1.8, 2.5, 1.2, 3.8],
          backgroundColor: '#3b82f6',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: textColor }, grid: { display: false } },
          y: { ticks: { color: textColor }, grid: { color: gridColor } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  // Chart 4: SLA Compliance
  const ctxSla = document.getElementById('slaChart')?.getContext('2d');
  if (ctxSla) {
    if (chartSla) chartSla.destroy();
    chartSla = new Chart(ctxSla, {
      type: 'bar',
      data: {
        labels: ['Roads', 'Sanitation', 'Water', 'Electrical', 'Public Works'],
        datasets: [{
          label: 'SLA Compliance %',
          data: [88, 96, 91, 98, 85],
          backgroundColor: '#10b981',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { ticks: { color: textColor }, grid: { display: false } },
          y: { min: 60, max: 100, ticks: { color: textColor }, grid: { color: gridColor } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }
}

// ==========================================
// NOTIFICATIONS CENTER
// ==========================================
function initNotifications() {
  const notifBellBtn = document.getElementById('notifBellBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const markAllRead = document.getElementById('markAllRead');

  if (notifBellBtn && notifDropdown) {
    notifBellBtn.addEventListener('click', () => {
      notifDropdown.classList.toggle('hidden');
      renderDropdownNotifications();
    });
  }

  if (markAllRead) {
    markAllRead.addEventListener('click', () => {
      AppState.notifications.forEach(n => n.unread = false);
      renderDropdownNotifications();
      document.getElementById('unreadNotifBadge').textContent = '0';
      showToast('All notifications marked as read', 'info');
    });
  }
}

function renderDropdownNotifications() {
  const notifList = document.getElementById('notifList');
  if (!notifList) return;

  notifList.innerHTML = '';
  AppState.notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = `p-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${n.unread ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''}`;
    item.innerHTML = `
      <div class="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between">
        <span>${n.title}</span>
        <span class="text-[10px] font-normal text-slate-400">${n.time}</span>
      </div>
      <p class="text-slate-600 dark:text-slate-300 mt-1">${n.msg}</p>
    `;
    notifList.appendChild(item);
  });
}

function renderFullNotificationsList() {
  const list = document.getElementById('fullNotifList');
  if (!list) return;

  list.innerHTML = '';
  AppState.notifications.forEach(n => {
    const item = document.createElement('div');
    item.className = 'py-4 flex items-start gap-4';
    item.innerHTML = `
      <div class="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-lg flex-shrink-0">
        <i class="fa-solid fa-bell"></i>
      </div>
      <div class="flex-1 min-w-0 space-y-1">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-sm text-slate-900 dark:text-white">${n.title}</h4>
          <span class="text-xs text-slate-400">${n.time}</span>
        </div>
        <p class="text-xs text-slate-600 dark:text-slate-300">${n.msg}</p>
      </div>
    `;
    list.appendChild(item);
  });
}

// ==========================================
// SLA TICKER SIMULATOR
// ==========================================
function startSlaTicker() {
  setInterval(() => {
    // Decrease SLA for un-resolved items slightly to demonstrate live countdown
    AppState.complaints.forEach(c => {
      if (c.status !== 'Resolved' && c.slaHoursRemaining > 0) {
        c.slaHoursRemaining = Math.max(0, c.slaHoursRemaining - 1);
        if (c.slaHoursRemaining === 0) {
          c.status = 'Overdue';
          c.escalationLevel = 'Municipal Commissioner';
        }
      }
    });
  }, 45000); // Ticks every 45s
}

// ==========================================
// TOAST NOTIFICATIONS STACK
// ==========================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastStack');
  if (!container) return;

  const toast = document.createElement('div');
  let icon = 'fa-circle-info';
  let borderBg = 'bg-slate-900 text-white border-slate-700';

  if (type === 'success') {
    icon = 'fa-circle-check text-emerald-400';
    borderBg = 'bg-slate-900 text-white border-emerald-500/40';
  } else if (type === 'warning') {
    icon = 'fa-triangle-exclamation text-amber-400';
    borderBg = 'bg-slate-900 text-white border-amber-500/40';
  } else if (type === 'danger') {
    icon = 'fa-circle-xmark text-rose-400';
    borderBg = 'bg-slate-900 text-white border-rose-500/40';
  }

  toast.className = `pointer-events-auto p-3.5 rounded-2xl border shadow-xl flex items-center gap-3 text-xs max-w-sm transform transition-all translate-y-4 opacity-0 ${borderBg}`;
  toast.innerHTML = `
    <i class="fa-solid ${icon} text-base"></i>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
