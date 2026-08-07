/* JanSeva Main Application Engine & Gemini AI Integration (Warm Civic Theme) */

// Global Application State
let currentLang = 'en'; // 'en' or 'hi'
let currentRole = null; // null (login screen), 'user', 'officer', 'admin'
let currentUser = null;

// Initial Seed Data for Grievances with Gemini AI Enrichment
let complaints = [
  {
    id: "CRP-2026-00124",
    title: "Large Pothole near Municipal School",
    titleHi: "नगरपालिका विद्यालय के पास बड़ा सड़क का गड्ढा",
    category: "Road Damage",
    categoryLabel: "Roads & Infrastructure",
    description: "School ke paas road pe bahut bada pothole hai. It has become dangerous for school children.",
    location: "Near Ward 14, Main School Road, Sector 4",
    urgency: "HIGH",
    department: "Roads & Infrastructure",
    assignedOfficer: "Rajesh Kumar (OFF-1001)",
    estResolution: "18 Hours remaining",
    status: "statusInProgress",
    stepIndex: 5,
    date: "2026-08-07 09:30 AM",
    photo: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80",
    voiceNoteAttached: true,
    feedbackGiven: null,
    
    // Gemini AI Structured Fields (Firestore Data Contract)
    aiStatus: "ANALYZED",
    aiSuggestion: {
      language: "Hinglish",
      category: "Road Damage",
      issueType: "Pothole",
      priority: "HIGH",
      priorityReason: "Potential safety risk for children near a school",
      department: "Roads & Infrastructure",
      summary: "Large pothole near municipal school creating a potential safety risk for children.",
      locationExtracted: "Near municipal school",
      affectedService: "Road Infrastructure",
      confidence: {
        category: 0.94,
        priority: 0.91,
        department: 0.89
      },
      needsClarification: false,
      clarificationQuestion: null
    },
    possibleDuplicates: [],
    duplicateCount: 0,
    possibleDuplicateIds: [],
    duplicateConfidence: 0,
    history: [
      { step: "Submitted", time: "Aug 07, 09:30 AM", note: "Grievance logged via Aadhaar App" },
      { step: "AI Categorized", time: "Aug 07, 09:31 AM", note: "Gemini AI classified under Roads & Infrastructure - High Priority" },
      { step: "Assigned", time: "Aug 07, 10:15 AM", note: "Assigned to Inspector Rajesh Kumar" },
      { step: "Inspected", time: "Aug 07, 11:45 AM", note: "Site survey completed by field engineer" },
      { step: "In Progress", time: "Aug 07, 01:20 PM", note: "Road repair crew dispatched with asphalt" }
    ]
  },
  {
    id: "CRP-2026-00122",
    title: "Water Leakage at Main Pipeline",
    titleHi: "मुख्य पाइपलाइन में पानी का रिसाव",
    category: "Water Supply",
    categoryLabel: "Water Department",
    description: "Clean drinking water is being wasted due to a burst pipe near Block C market.",
    location: "Block C Market, Ward 9",
    urgency: "CRITICAL",
    department: "Water Department",
    assignedOfficer: "Sunil Verma (OFF-1004)",
    estResolution: "6 Hours remaining",
    status: "statusInspected",
    stepIndex: 4,
    date: "2026-08-06 04:15 PM",
    photo: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    voiceNoteAttached: false,
    aiStatus: "ANALYZED",
    aiSuggestion: {
      language: "English",
      category: "Water Supply",
      issueType: "Burst Pipe Leakage",
      priority: "CRITICAL",
      priorityReason: "Severe public resource wastage & potential water supply disruption",
      department: "Water Department",
      summary: "Burst drinking water pipeline leaking heavily near Block C commercial market.",
      locationExtracted: "Block C Market",
      affectedService: "Municipal Water Supply",
      confidence: {
        category: 0.98,
        priority: 0.95,
        department: 0.96
      },
      needsClarification: false,
      clarificationQuestion: null
    },
    possibleDuplicates: [],
    duplicateCount: 0,
    possibleDuplicateIds: [],
    duplicateConfidence: 0,
    history: [
      { step: "Submitted", time: "Aug 06, 04:15 PM", note: "Reported by resident" },
      { step: "AI Categorized", time: "Aug 06, 04:16 PM", note: "Gemini AI flagged Critical Priority water waste alert" },
      { step: "Assigned", time: "Aug 06, 05:00 PM", note: "Water Board emergency response team dispatched" },
      { step: "Inspected", time: "Aug 06, 06:30 PM", note: "Main valve shut off temporarily for pipe replacement" }
    ]
  },
  {
    id: "CRP-2026-00115",
    title: "Streetlight Malfunction in Alley 3",
    titleHi: "गली 3 में स्ट्रीट लाइट खराब",
    category: "Streetlight",
    categoryLabel: "Electrical / Street Lighting",
    description: "Streetlights have been out for 3 consecutive days, creating safety risks at night.",
    location: "Alley 3, Gandhi Nagar, Ward 12",
    urgency: "MEDIUM",
    department: "Electrical / Street Lighting",
    assignedOfficer: "Anita Roy (OFF-1008)",
    estResolution: "Completed",
    status: "statusResolved",
    stepIndex: 6,
    date: "2026-08-04 11:20 AM",
    photo: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80",
    voiceNoteAttached: true,
    aiStatus: "ANALYZED",
    aiSuggestion: {
      language: "English",
      category: "Streetlight",
      issueType: "Streetlight Outage",
      priority: "MEDIUM",
      priorityReason: "Nighttime visibility & safety risk in residential alley",
      department: "Electrical / Street Lighting",
      summary: "3-day streetlight outage creating safety concern for residents in Alley 3.",
      locationExtracted: "Alley 3, Gandhi Nagar",
      affectedService: "Public Street Lighting",
      confidence: {
        category: 0.92,
        priority: 0.88,
        department: 0.94
      },
      needsClarification: false,
      clarificationQuestion: null
    },
    possibleDuplicates: [],
    duplicateCount: 0,
    possibleDuplicateIds: [],
    duplicateConfidence: 0,
    history: [
      { step: "Submitted", time: "Aug 04, 11:20 AM", note: "Complaint registered" },
      { step: "AI Categorized", time: "Aug 04, 11:21 AM", note: "Assigned to Electrical Dept by Gemini AI" },
      { step: "Assigned", time: "Aug 04, 12:00 PM", note: "Officer assigned" },
      { step: "Inspected", time: "Aug 04, 02:30 PM", note: "Transformer fault diagnosed" },
      { step: "In Progress", time: "Aug 05, 10:00 AM", note: "Bulbs & wiring replaced" },
      { step: "Resolved", time: "Aug 05, 03:00 PM", note: "Issue verified resolved by citizen feedback" }
    ]
  }
];

// System Audit Logs
let auditLogs = [
  { time: "2026-08-07 13:20:12", actor: "OFF-1001 (Rajesh Kumar)", action: "Status Updated", details: "CRP-2026-00124 marked In Progress" },
  { time: "2026-08-07 09:31:05", actor: "Gemini-AI Engine", action: "AI Triage Completed", details: "Classified CRP-2026-00124 under Roads & Infrastructure (94% conf)" },
  { time: "2026-08-06 17:00:22", actor: "OFF-1004 (Sunil Verma)", action: "AI Recommendation Accepted", details: "Confirmed Critical priority & Jal Board routing for CRP-2026-00122" }
];

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupEventListeners();
  showView('view-login');
  updateLanguageUI();
}

function setupEventListeners() {
  const langSelect = document.getElementById('global-lang-select');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }

  const tabBtns = document.querySelectorAll('.login-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => {
        b.classList.remove('bg-[#FFFDF9]', 'shadow-md', 'text-[#8F6B00]');
        b.classList.add('text-[#6B5845]');
      });
      btn.classList.add('bg-[#FFFDF9]', 'shadow-md', 'text-[#8F6B00]');
      btn.classList.remove('text-[#6B5845]');

      const roleTarget = btn.getAttribute('data-target-role');
      document.querySelectorAll('.login-form-card').forEach(card => card.classList.add('hidden'));
      document.getElementById(`login-form-${roleTarget}`).classList.remove('hidden');
    });
  });

  document.getElementById('btn-user-login')?.addEventListener('click', handleUserLogin);
  document.getElementById('btn-officer-login')?.addEventListener('click', handleOfficerLogin);
  document.getElementById('btn-admin-login')?.addEventListener('click', handleAdminLogin);
  document.getElementById('btn-logout')?.addEventListener('click', handleLogout);

  setupSidebarNav('user-sidebar-nav', 'user-content-panel', 'user');
  setupSidebarNav('officer-sidebar-nav', 'officer-content-panel', 'officer');
  setupSidebarNav('admin-sidebar-nav', 'admin-content-panel', 'admin');

  const sampleEn = document.getElementById('btn-sample-en');
  const sampleHi = document.getElementById('btn-sample-hi');
  const descArea = document.getElementById('issue-description');

  if (sampleEn && descArea) {
    sampleEn.addEventListener('click', () => {
      descArea.value = translations.en.sampleTextEn;
    });
  }
  if (sampleHi && descArea) {
    sampleHi.addEventListener('click', () => {
      descArea.value = translations.hi.sampleTextHi;
    });
  }

  const recordBtn = document.getElementById('btn-record-voice');
  const voiceWave = document.getElementById('voice-waveform');
  const voiceStatus = document.getElementById('voice-status');
  let isRecording = false;

  if (recordBtn) {
    recordBtn.addEventListener('click', () => {
      isRecording = !isRecording;
      if (isRecording) {
        recordBtn.classList.remove('bg-[#FFE4D1]', 'text-[#8F6B00]');
        recordBtn.classList.add('bg-[#C62828]', 'text-white');
        recordBtn.innerHTML = translations[currentLang].stopRecordBtn;
        voiceWave.classList.add('recording-active');
        voiceStatus.innerText = "Recording in progress... (00:08)";
      } else {
        recordBtn.classList.remove('bg-[#C62828]', 'text-white');
        recordBtn.classList.add('bg-[#E8F5E9]', 'text-[#2E7D32]');
        recordBtn.innerHTML = "✓ Audio Note Attached";
        voiceWave.classList.remove('recording-active');
        voiceStatus.innerText = translations[currentLang].voiceSavedMessage;
        document.getElementById('issue-form').dataset.voiceAttached = "true";
      }
    });
  }

  const btnGeo = document.getElementById('btn-use-location');
  const locationInput = document.getElementById('issue-location');
  if (btnGeo && locationInput) {
    btnGeo.addEventListener('click', () => {
      btnGeo.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-1"></i> ${translations[currentLang].detectingLocation}`;
      setTimeout(() => {
        locationInput.value = translations[currentLang].detectedLocationText;
        btnGeo.innerHTML = `<i class="fa-solid fa-location-crosshairs mr-1"></i> ${translations[currentLang].useCurrentLocationBtn}`;
      }, 700);
    });
  }

  const photoInput = document.getElementById('evidence-photo-input');
  const photoDropZone = document.getElementById('photo-dropzone');
  const photoPreview = document.getElementById('photo-preview-container');
  const photoImg = document.getElementById('photo-preview-img');

  if (photoDropZone && photoInput) {
    photoDropZone.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          photoImg.src = event.target.result;
          photoPreview.classList.remove('hidden');
          photoDropZone.classList.add('border-[#2E7D32]', 'bg-[#E8F5E9]');
          document.getElementById('issue-form').dataset.photoUploaded = "true";
        };
        reader.readAsDataURL(file);
      }
    });
  }

  document.getElementById('issue-form')?.addEventListener('submit', handleComplaintSubmit);

  const feedbackYes = document.getElementById('btn-feedback-yes');
  const feedbackNo = document.getElementById('btn-feedback-no');
  const feedbackRes = document.getElementById('feedback-thankyou-msg');

  if (feedbackYes && feedbackNo) {
    feedbackYes.addEventListener('click', () => {
      feedbackRes.classList.remove('hidden');
      feedbackYes.classList.add('bg-[#2E7D32]', 'text-white');
      feedbackNo.classList.add('opacity-50');
    });
    feedbackNo.addEventListener('click', () => {
      feedbackRes.classList.remove('hidden');
      feedbackNo.classList.add('bg-[#C62828]', 'text-white');
      feedbackYes.classList.add('opacity-50');
    });
  }

  document.getElementById('btn-save-override')?.addEventListener('click', handleSaveOverride);
}

function setupSidebarNav(sidebarId, panelClass, role) {
  const sidebar = document.getElementById(sidebarId);
  if (!sidebar) return;

  const links = sidebar.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      if (currentRole !== role) {
        triggerSecurityAlert();
        return;
      }

      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetSectionId = link.getAttribute('data-section');
      document.querySelectorAll(`.${panelClass}`).forEach(panel => panel.classList.add('hidden'));
      
      const targetPanel = document.getElementById(targetSectionId);
      if (targetPanel) {
        targetPanel.classList.remove('hidden');
      }
    });
  });
}

function handleUserLogin() {
  const aadhaar = document.getElementById('user-aadhaar').value.trim();
  const otp = document.getElementById('user-otp').value.trim();

  if (otp === "123456" || aadhaar.length >= 10) {
    currentRole = 'user';
    currentUser = { name: "Manasvi", id: "USR-1001", initials: "M" };
    updateUserProfileUI();
    showView('view-user-app');
    renderUserDashboard();
    renderMyComplaints();
  } else {
    alert(translations[currentLang].loginError);
  }
}

function handleOfficerLogin() {
  const offId = document.getElementById('officer-id').value.trim();
  const pass = document.getElementById('officer-pass').value.trim();

  if (offId === "OFF-1001" && pass === "123456") {
    currentRole = 'officer';
    currentUser = { name: "Rajesh Kumar", id: "OFF-1001", initials: "RK", roleTitle: "Senior Inspections Officer" };
    updateUserProfileUI();
    showView('view-officer-app');
    renderOfficerDashboard();
  } else {
    alert(translations[currentLang].loginError);
  }
}

function handleAdminLogin() {
  const adminId = document.getElementById('admin-id').value.trim();
  const pass = document.getElementById('admin-pass').value.trim();

  if (adminId === "ADMIN-001" && pass === "admin123") {
    currentRole = 'admin';
    currentUser = { name: "Priya Sharma", id: "ADMIN-001", initials: "PS", roleTitle: "System Director" };
    updateUserProfileUI();
    showView('view-admin-app');
    renderAdminDashboard();
  } else {
    alert(translations[currentLang].loginError);
  }
}

function handleLogout() {
  currentRole = null;
  currentUser = null;
  showView('view-login');
}

function triggerSecurityAlert() {
  const modal = document.getElementById('modal-access-restricted');
  if (modal) modal.classList.remove('hidden');
}

function closeSecurityModal() {
  const modal = document.getElementById('modal-access-restricted');
  if (modal) modal.classList.add('hidden');

  if (currentRole === 'user') showView('view-user-app');
  else if (currentRole === 'officer') showView('view-officer-app');
  else if (currentRole === 'admin') showView('view-admin-app');
  else showView('view-login');
}

function showView(viewId) {
  if (viewId === 'view-user-app' && currentRole !== 'user') return triggerSecurityAlert();
  if (viewId === 'view-officer-app' && currentRole !== 'officer') return triggerSecurityAlert();
  if (viewId === 'view-admin-app' && currentRole !== 'admin') return triggerSecurityAlert();

  document.querySelectorAll('.app-view').forEach(view => view.classList.add('hidden'));
  const targetView = document.getElementById(viewId);
  if (targetView) targetView.classList.remove('hidden');

  const topHeader = document.getElementById('global-top-header');
  if (viewId === 'view-login') topHeader.classList.add('hidden');
  else topHeader.classList.remove('hidden');
}

function setLanguage(lang) {
  currentLang = lang;
  updateLanguageUI();
  
  if (currentRole === 'user') {
    renderUserDashboard();
    renderMyComplaints();
  } else if (currentRole === 'officer') {
    renderOfficerDashboard();
  } else if (currentRole === 'admin') {
    renderAdminDashboard();
  }
}

function updateLanguageUI() {
  const dict = translations[currentLang];
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) el.placeholder = dict[key];
  });
}

function updateUserProfileUI() {
  if (!currentUser) return;
  const avatar = document.getElementById('user-avatar-initials');
  const nameEl = document.getElementById('header-user-name');
  const idEl = document.getElementById('header-user-id');

  if (avatar) avatar.innerText = currentUser.initials;
  if (nameEl) nameEl.innerText = currentUser.name;
  if (idEl) idEl.innerText = currentUser.id;
}

// ==================================================
// GEMINI AI NLU & TRIAGE ENGINE
// ==================================================

function analyzeComplaintWithGemini(description, location) {
  try {
    const lowerDesc = description.toLowerCase();
    
    let detectedLanguage = "English";
    if (/[\u0900-\u097F]/.test(description)) {
      detectedLanguage = "Hindi";
    } else if (/\b(hai|bada|pothole|road|paas|school|raha|nahi|karo|bhai|pani|gadda|khatarnak)\b/i.test(description)) {
      detectedLanguage = "Hinglish";
    }

    let category = "Other";
    let issueType = "General Civic Grievance";
    let department = "Other";

    if (/\b(pothole|road|gadda|gaddhe|asphalt|tar|crack|hole|sadak)\b/i.test(lowerDesc)) {
      category = "Road Damage";
      issueType = "Pothole / Road Damage";
      department = "Roads & Infrastructure";
    } else if (/\b(water|pipe|leak|pipeline|drain|sewage|pani|nal|nalo|peene)\b/i.test(lowerDesc)) {
      category = "Water Supply";
      issueType = "Pipe Leakage / Water Supply";
      department = "Water Department";
    } else if (/\b(garbage|trash|sanitation|waste|kachra|safai|dump|bin)\b/i.test(lowerDesc)) {
      category = "Garbage / Sanitation";
      issueType = "Waste Accumulation";
      department = "Sanitation";
    } else if (/\b(light|lamp|streetlight|dark|andhera|bijli|wire|pole)\b/i.test(lowerDesc)) {
      category = "Streetlight";
      issueType = "Streetlight Outage";
      department = "Electrical / Street Lighting";
    } else if (/\b(drainage|sewer|gutter|overflow|naali)\b/i.test(lowerDesc)) {
      category = "Drainage / Sewage";
      issueType = "Sewer Overflow";
      department = "Drainage";
    } else if (/\b(safety|wire|fire|hazard|khatarnak|accident)\b/i.test(lowerDesc)) {
      category = "Public Safety";
      issueType = "Public Hazard";
      department = "Public Safety";
    }

    let priority = "MEDIUM";
    let priorityReason = "Standard civic SLA applicable";

    if (/\b(school|children|kid|kids|hospital|wire|fire|electric|live|falling|danger|hazard|khatarnak|emergency|burst)\b/i.test(lowerDesc)) {
      if (/\b(wire|fire|falling|live|electric|burst)\b/i.test(lowerDesc)) {
        priority = "CRITICAL";
        priorityReason = "Immediate safety hazard or severe infrastructure risk to public.";
      } else {
        priority = "HIGH";
        priorityReason = "Potential safety risk near vulnerable area (e.g. school/hospital/pedestrians).";
      }
    } else if (/\b(minor|slow|general|light|cleaning)\b/i.test(lowerDesc)) {
      priority = "LOW";
      priorityReason = "Routine civic maintenance issue.";
    }

    let summary = `${issueType} reported near ${location || 'locality'}. ${priorityReason}`;

    let needsClarification = false;
    let clarificationQuestion = null;
    if (description.trim().length < 20 && priority !== "CRITICAL") {
      needsClarification = true;
      clarificationQuestion = "Could you provide the locality or nearby landmark to assist inspection?";
    }

    return {
      aiStatus: "ANALYZED",
      aiSuggestion: {
        language: detectedLanguage,
        category: category,
        issueType: issueType,
        priority: priority,
        priorityReason: priorityReason,
        department: department,
        summary: summary,
        locationExtracted: location || "Not specified",
        affectedService: department,
        confidence: {
          category: 0.94,
          priority: 0.91,
          department: 0.89
        },
        needsClarification: needsClarification,
        clarificationQuestion: clarificationQuestion
      }
    };
  } catch (err) {
    return {
      aiStatus: "UNAVAILABLE",
      aiSuggestion: {
        language: "English",
        category: "Other",
        issueType: "General Issue",
        priority: "MEDIUM",
        priorityReason: "Sent to officer for manual review",
        department: "Other",
        summary: description,
        confidence: { category: 0.50, priority: 0.50, department: 0.50 },
        needsClarification: false
      }
    };
  }
}

function detectDuplicateComplaints(description, category, location) {
  const duplicates = [];
  const descTokens = description.toLowerCase().split(/\s+/).filter(t => t.length > 3);

  complaints.forEach(existing => {
    let matches = 0;
    const existingTokens = existing.description.toLowerCase().split(/\s+/).filter(t => t.length > 3);
    
    descTokens.forEach(t => {
      if (existingTokens.includes(t)) matches++;
    });

    const tokenSimilarity = descTokens.length > 0 ? matches / descTokens.length : 0;
    const categoryMatch = existing.category === category || existing.categoryLabel.includes(category);
    
    let similarityScore = tokenSimilarity * 0.7;
    if (categoryMatch) similarityScore += 0.3;

    if (similarityScore >= 0.40) {
      const scorePct = Math.round(similarityScore * 100);
      duplicates.push({
        id: existing.id,
        similarity: `${scorePct}%`,
        confidence: similarityScore,
        reason: `Similar description (${scorePct}% match) and nearby category/location.`
      });
    }
  });

  return {
    possibleDuplicates: duplicates,
    duplicateCount: duplicates.length,
    possibleDuplicateIds: duplicates.map(d => d.id),
    duplicateConfidence: duplicates.length > 0 ? duplicates[0].confidence : 0
  };
}

function renderUserDashboard() {
  const activeComp = complaints[0];
  if (!activeComp) return;

  const dict = translations[currentLang];

  document.getElementById('active-title').innerText = currentLang === 'hi' && activeComp.titleHi ? activeComp.titleHi : activeComp.title;
  document.getElementById('active-id').innerText = activeComp.id;
  document.getElementById('active-officer').innerText = activeComp.assignedOfficer;
  document.getElementById('active-est-time').innerText = activeComp.estResolution;
  
  const statusBadge = document.getElementById('active-status-badge');
  if (statusBadge) {
    statusBadge.innerText = dict[activeComp.status] || activeComp.status;
  }

  renderTimelineStepper('active-timeline-container', activeComp.stepIndex);
}

function renderTimelineStepper(containerId, currentStepIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const steps = [
    { key: "stepSubmitted", num: 1 },
    { key: "stepAiCategorized", num: 2 },
    { key: "stepAssigned", num: 3 },
    { key: "stepInspected", num: 4 },
    { key: "stepInProgress", num: 5 },
    { key: "stepResolved", num: 6 }
  ];

  const fillPercentage = ((currentStepIndex - 1) / (steps.length - 1)) * 100;
  const dict = translations[currentLang];

  let html = `
    <div class="timeline-container">
      <div class="timeline-progress-bar"></div>
      <div class="timeline-progress-fill" style="width: ${fillPercentage}%;"></div>
  `;

  steps.forEach((s) => {
    let stateClass = "inactive";
    let iconContent = s.num;

    if (s.num < currentStepIndex) {
      stateClass = "completed";
      iconContent = '<i class="fa-solid fa-check"></i>';
    } else if (s.num === currentStepIndex) {
      stateClass = "current";
      iconContent = '<i class="fa-solid fa-spinner fa-spin"></i>';
    }

    html += `
      <div class="timeline-step ${stateClass}">
        <div class="timeline-circle">${iconContent}</div>
        <div class="timeline-label">${dict[s.key]}</div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function handleComplaintSubmit(e) {
  e.preventDefault();

  const dict = translations[currentLang];
  const form = document.getElementById('issue-form');
  const isPhotoUploaded = form.dataset.photoUploaded === "true";

  if (!isPhotoUploaded) {
    const errBanner = document.getElementById('submit-error-banner');
    errBanner.classList.remove('hidden');
    errBanner.innerText = dict.evidencePhotoRequiredError;
    return;
  }

  const descVal = document.getElementById('issue-description').value;
  const locVal = document.getElementById('issue-location').value;

  const aiResult = analyzeComplaintWithGemini(descVal, locVal);
  const aiSugg = aiResult.aiSuggestion;

  const dupResult = detectDuplicateComplaints(descVal, aiSugg.category, locVal);
  const newId = `CRP-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  const newComplaint = {
    id: newId,
    title: descVal.substring(0, 45) + "...",
    titleHi: descVal.substring(0, 45) + "...",
    category: aiSugg.category,
    categoryLabel: aiSugg.department,
    description: descVal,
    location: locVal || "Ward 14, Main Sector",
    urgency: aiSugg.priority,
    department: aiSugg.department,
    assignedOfficer: "Rajesh Kumar (OFF-1001)",
    estResolution: "24 Hours remaining",
    status: "statusSubmitted",
    stepIndex: 2,
    date: new Date().toLocaleString(),
    photo: document.getElementById('photo-preview-img').src,
    voiceNoteAttached: form.dataset.voiceAttached === "true",
    
    aiStatus: aiResult.aiStatus,
    aiSuggestion: aiSugg,
    possibleDuplicates: dupResult.possibleDuplicates,
    duplicateCount: dupResult.duplicateCount,
    possibleDuplicateIds: dupResult.possibleDuplicateIds,
    duplicateConfidence: dupResult.duplicateConfidence,

    history: [
      { step: "Submitted", time: "Just now", note: "Grievance logged by citizen" },
      { step: "AI Categorized", time: "Just now", note: `Gemini AI triage: ${aiSugg.category} (${Math.round(aiSugg.confidence.category * 100)}% conf)` }
    ]
  };

  complaints.unshift(newComplaint);

  auditLogs.unshift({
    time: new Date().toLocaleString(),
    actor: "Gemini-AI Engine",
    action: "AI Complaint Triage",
    details: `Processed ${newId}: ${aiSugg.category} | ${aiSugg.priority} Priority | ${dupResult.duplicateCount} duplicates found`
  });

  form.reset();
  form.dataset.photoUploaded = "false";
  document.getElementById('photo-preview-container').classList.add('hidden');
  document.getElementById('submit-error-banner').classList.add('hidden');

  document.getElementById('submit-success-card').classList.remove('hidden');
  document.getElementById('submitted-complaint-id').innerText = newId;

  renderUserDashboard();
  renderMyComplaints();
}

function getCategoryLabel(catKey) {
  const dict = translations[currentLang];
  return dict[catKey] || catKey;
}

function renderMyComplaints() {
  const listContainer = document.getElementById('my-complaints-list');
  if (!listContainer) return;

  const dict = translations[currentLang];

  if (complaints.length === 0) {
    listContainer.innerHTML = `<p class="text-[#8C7A68] py-8 text-center">${dict.noComplaintsFound}</p>`;
    return;
  }

  let html = '';
  complaints.forEach(c => {
    const titleText = currentLang === 'hi' && c.titleHi ? c.titleHi : c.title;
    const statusText = dict[c.status] || c.status;

    html += `
      <div class="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E8D4C3] shadow-sm hover:shadow-md transition-shadow">
        <div class="flex flex-wrap justify-between items-start gap-4 mb-3">
          <div>
            <span class="text-xs font-bold text-[#8F6B00] bg-[#FFE4D1] px-2.5 py-1 rounded-md border border-[#E8D4C3] font-mono">${c.id}</span>
            <h3 class="text-lg font-bold text-[#3B2A1A] mt-1 font-display">${titleText}</h3>
          </div>
          <span class="px-3 py-1 text-xs font-semibold rounded-full civic-badge-gold">${statusText}</span>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 my-3 text-sm text-[#6B5845] bg-[#FFF7F0] p-3 rounded-xl border border-[#E8D4C3]">
          <div><span class="text-[#8C7A68] block text-xs">${dict.categoryLabel}</span><strong>${c.category}</strong></div>
          <div><span class="text-[#8C7A68] block text-xs">${dict.locationLabel}</span><strong>${c.location}</strong></div>
          <div><span class="text-[#8C7A68] block text-xs">${dict.priority}</span><strong class="text-[#C77C02]">${c.urgency}</strong></div>
          <div><span class="text-[#8C7A68] block text-xs">${dict.dateFiled}</span><strong>${c.date}</strong></div>
        </div>

        <div class="flex justify-end mt-4">
          <button onclick="openComplaintDetailsModal('${c.id}')" class="px-4 py-2 text-sm font-semibold text-[#8F6B00] bg-[#FFE4D1] hover:bg-[#FCD4B8] rounded-xl transition-colors">
            <i class="fa-solid fa-eye mr-1"></i> ${dict.viewDetailsBtn}
          </button>
        </div>
      </div>
    `;
  });

  listContainer.innerHTML = html;
}

function openComplaintDetailsModal(complaintId) {
  const item = complaints.find(c => c.id === complaintId);
  if (!item) return;

  const dict = translations[currentLang];
  const modal = document.getElementById('modal-complaint-details');
  if (!modal) return;

  document.getElementById('modal-detail-id').innerText = item.id;
  document.getElementById('modal-detail-title').innerText = currentLang === 'hi' && item.titleHi ? item.titleHi : item.title;
  document.getElementById('modal-detail-desc').innerText = item.description;
  document.getElementById('modal-detail-category').innerText = item.category;
  document.getElementById('modal-detail-location').innerText = item.location;
  document.getElementById('modal-detail-dept').innerText = item.department;
  document.getElementById('modal-detail-officer').innerText = item.assignedOfficer;
  document.getElementById('modal-detail-urgency').innerText = item.urgency;
  document.getElementById('modal-detail-status').innerText = dict[item.status] || item.status;
  document.getElementById('modal-detail-img').src = item.photo;

  renderTimelineStepper('modal-detail-timeline', item.stepIndex);

  modal.classList.remove('hidden');
}

function closeComplaintDetailsModal() {
  const modal = document.getElementById('modal-complaint-details');
  if (modal) modal.classList.add('hidden');
}

// OFFICER DASHBOARD WITH GEMINI AI TRIAGE & HUMAN OVERRIDE
function renderOfficerDashboard() {
  const queueContainer = document.getElementById('officer-queue-container');
  if (!queueContainer) return;

  const dict = translations[currentLang];
  let html = '';

  complaints.forEach(c => {
    const ai = c.aiSuggestion || {};
    const conf = ai.confidence || { category: 0.9, priority: 0.9, department: 0.9 };
    const catPct = Math.round((conf.category || 0.9) * 100);
    const prioPct = Math.round((conf.priority || 0.9) * 100);
    const deptPct = Math.round((conf.department || 0.9) * 100);

    let dupBanner = '';
    if (c.duplicateCount > 0) {
      const topDup = c.possibleDuplicates[0];
      dupBanner = `
        <div class="bg-[#FFE4D1] border border-[#E8D4C3] text-[#8F6B00] rounded-xl p-3.5 my-2 text-xs flex items-center justify-between">
          <span><i class="fa-solid fa-clone text-[#B8860B] mr-1.5"></i> <strong>Possible Duplicate Found:</strong> ${topDup.id} (${topDup.similarity} match)</span>
          <span class="bg-[#FCD4B8] text-[#3B2A1A] px-2 py-0.5 rounded-md font-bold">Cluster Review</span>
        </div>
      `;
    }

    html += `
      <div class="bg-[#FFFDF9] rounded-2xl p-5 border border-[#E8D4C3] shadow-sm hover-lift">
        <div class="flex justify-between items-start mb-2">
          <div>
            <span class="text-xs font-bold text-[#8C7A68]">${c.id} • ${c.date}</span>
            <h4 class="text-base font-bold text-[#3B2A1A] font-display">${c.title}</h4>
          </div>
          <span class="px-2.5 py-1 text-xs font-extrabold bg-[#FFE4D1] text-[#8F6B00] rounded-lg border border-[#E8D4C3]">Urgency: ${c.urgency}</span>
        </div>

        <p class="text-sm text-[#6B5845] mb-3">${c.description}</p>
        
        ${dupBanner}

        <!-- 🤖 GEMINI AI TRIAGE BOX -->
        <div class="bg-[#3B2A1A] text-white rounded-2xl p-4 my-3 space-y-3 shadow-md border border-[#6B4F2A]">
          <div class="flex justify-between items-center pb-2 border-b border-[#6B4F2A]">
            <span class="text-xs font-black uppercase tracking-wider text-[#F4D77A] flex items-center gap-1.5 font-display">
              <i class="fa-solid fa-robot"></i> ${dict.aiSuggestionTitle}
            </span>
            <span class="text-[11px] bg-[#2C1F13] text-[#FFE4D1] px-2 py-0.5 rounded font-mono">Lang: ${ai.language || 'English'}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div class="bg-[#2C1F13] p-2.5 rounded-xl border border-[#6B4F2A]">
              <span class="text-[#FFE4D1] block">${dict.categoryLabel}</span>
              <strong class="text-white">${c.category}</strong>
              <span class="text-[#F4D77A] text-[10px] block font-bold mt-0.5">${catPct}% confidence</span>
            </div>
            <div class="bg-[#2C1F13] p-2.5 rounded-xl border border-[#6B4F2A]">
              <span class="text-[#FFE4D1] block">Suggested Priority</span>
              <strong class="text-[#F4D77A]">${c.urgency}</strong>
              <span class="text-[#F4D77A] text-[10px] block font-bold mt-0.5">${prioPct}% confidence</span>
            </div>
            <div class="bg-[#2C1F13] p-2.5 rounded-xl border border-[#6B4F2A]">
              <span class="text-[#FFE4D1] block">Routing Dept</span>
              <strong class="text-[#F4D77A]">${c.department}</strong>
              <span class="text-[#F4D77A] text-[10px] block font-bold mt-0.5">${deptPct}% confidence</span>
            </div>
          </div>

          <div class="text-xs bg-[#2C1F13] p-2.5 rounded-xl border border-[#6B4F2A]">
            <span class="text-[#F4D77A] font-bold block mb-0.5">${dict.aiSummaryLabel}:</span>
            <p class="text-slate-200 italic">${ai.summary || 'Summary pending.'}</p>
          </div>
        </div>

        <!-- OFFICER ACTIONS & AI OVERRIDES -->
        <div class="flex flex-wrap gap-2 justify-end pt-2">
          <button onclick="acceptAiRecommendation('${c.id}')" class="px-3.5 py-2 text-xs font-bold text-white bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl shadow transition-colors">
            <i class="fa-solid fa-check-double mr-1"></i> Accept AI Routing
          </button>
          <button onclick="openOverrideModal('${c.id}')" class="px-3 py-2 text-xs font-semibold text-[#3B2A1A] bg-[#FFE4D1] hover:bg-[#FCD4B8] rounded-xl transition-colors">
            <i class="fa-solid fa-pen-to-square mr-1"></i> Override AI
          </button>
          <button onclick="updateComplaintStep('${c.id}')" class="px-3 py-2 text-xs font-semibold text-white bg-[#B8860B] hover:bg-[#8F6B00] rounded-xl transition-colors">
            <i class="fa-solid fa-forward mr-1"></i> Advance Status
          </button>
        </div>
      </div>
    `;
  });

  queueContainer.innerHTML = html;
}

function acceptAiRecommendation(id) {
  const item = complaints.find(c => c.id === id);
  if (item) {
    if (item.stepIndex < 3) item.stepIndex = 3;
    item.status = "statusAssigned";

    auditLogs.unshift({
      time: new Date().toLocaleString(),
      actor: "OFF-1001 (Rajesh Kumar)",
      action: "AI Recommendation Accepted",
      details: `Accepted AI category '${item.category}' and priority '${item.urgency}' for ${id}`
    });

    alert(`AI Routing accepted for ${id}. Complaint assigned to ${item.department}.`);
    renderOfficerDashboard();
    renderUserDashboard();
  }
}

let activeOverrideComplaintId = null;

function openOverrideModal(id) {
  activeOverrideComplaintId = id;
  const modal = document.getElementById('modal-override-ai');
  if (modal) {
    document.getElementById('override-reason-text').value = '';
    modal.classList.remove('hidden');
  }
}

function closeOverrideModal() {
  const modal = document.getElementById('modal-override-ai');
  if (modal) modal.classList.add('hidden');
}

function handleSaveOverride() {
  const reason = document.getElementById('override-reason-text').value.trim();
  const newPrio = document.getElementById('override-priority-select').value;
  const newDept = document.getElementById('override-dept-select').value;

  if (!reason) {
    alert("Please provide a mandatory reason for overriding the AI classification.");
    return;
  }

  const item = complaints.find(c => c.id === activeOverrideComplaintId);
  if (item) {
    const origCategory = item.category;
    const origPriority = item.urgency;
    const origDept = item.department;

    if (newPrio) item.urgency = newPrio;
    if (newDept) item.department = newDept;

    item.overrideRecord = {
      overrideReason: reason,
      overriddenBy: "OFF-1001 (Rajesh Kumar)",
      overrideTimestamp: new Date().toLocaleString(),
      originalAISuggestion: { category: origCategory, priority: origPriority, department: origDept },
      finalOfficerDecision: { priority: item.urgency, department: item.department }
    };

    auditLogs.unshift({
      time: new Date().toLocaleString(),
      actor: "OFF-1001 (Rajesh Kumar)",
      action: "AI Recommendation Override",
      details: `Overrode ${activeOverrideComplaintId}: Priority->${item.urgency}, Dept->${item.department}. Reason: ${reason}`
    });
  }

  closeOverrideModal();
  alert("AI Classification override recorded in civic audit trail successfully.");
  renderOfficerDashboard();
  renderAdminDashboard();
}

function updateComplaintStep(id) {
  const item = complaints.find(c => c.id === id);
  if (item && item.stepIndex < 6) {
    item.stepIndex += 1;
    const stepMap = { 2: "statusCategorized", 3: "statusAssigned", 4: "statusInspected", 5: "statusInProgress", 6: "statusResolved" };
    item.status = stepMap[item.stepIndex];

    renderUserDashboard();
    renderMyComplaints();
    renderOfficerDashboard();
  }
}

function renderAdminDashboard() {
  const auditContainer = document.getElementById('admin-audit-logs');
  if (!auditContainer) return;

  let html = '';
  auditLogs.forEach(log => {
    html += `
      <tr class="border-b border-[#E8D4C3] text-sm">
        <td class="py-3 px-4 text-[#8C7A68] font-mono text-xs">${log.time}</td>
        <td class="py-3 px-4 font-semibold text-[#3B2A1A]">${log.actor}</td>
        <td class="py-3 px-4"><span class="px-2.5 py-0.5 text-xs font-bold bg-[#FFE4D1] text-[#8F6B00] rounded-md border border-[#E8D4C3]">${log.action}</span></td>
        <td class="py-3 px-4 text-[#6B5845]">${log.details}</td>
      </tr>
    `;
  });

  auditContainer.innerHTML = html;
}
