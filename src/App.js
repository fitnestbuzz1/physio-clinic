import { useState, useEffect } from "react";

// ── Palette & helpers ──────────────────────────────────────────────────────────
const C = {
  bg: "#0d1117",
  surface: "#161b22",
  card: "#1c2128",
  border: "#30363d",
  accent: "#00c9a7",
  accentDim: "#00c9a720",
  accentHover: "#00e5be",
  text: "#e6edf3",
  muted: "#7d8590",
  danger: "#f85149",
  warn: "#d29922",
  success: "#3fb950",
  blue: "#58a6ff",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    min-height: 100vh;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${C.bg}; }
  ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }

  .app-wrap {
    display: flex;
    min-height: 100vh;
  }

  /* ── Sidebar ── */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: ${C.surface};
    border-right: 1px solid ${C.border};
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0;
    z-index: 100;
  }

  .logo-area {
    padding: 28px 24px 20px;
    border-bottom: 1px solid ${C.border};
  }

  .logo-title {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    color: ${C.accent};
    letter-spacing: -0.5px;
  }

  .logo-sub {
    font-size: 11px;
    color: ${C.muted};
    margin-top: 2px;
    letter-spacing: 0.5px;
  }

  .nav-section {
    padding: 16px 12px;
    flex: 1;
  }

  .nav-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    color: ${C.muted};
    text-transform: uppercase;
    padding: 0 12px;
    margin-bottom: 8px;
    margin-top: 16px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    color: ${C.muted};
    transition: all 0.15s ease;
    margin-bottom: 2px;
    border: 1px solid transparent;
  }

  .nav-item:hover {
    background: ${C.card};
    color: ${C.text};
  }

  .nav-item.active {
    background: ${C.accentDim};
    color: ${C.accent};
    border-color: ${C.accent}30;
    font-weight: 500;
  }

  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid ${C.border};
  }

  .clinic-badge {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 8px;
    padding: 10px 12px;
    font-size: 12px;
    color: ${C.muted};
  }

  .clinic-badge strong {
    display: block;
    color: ${C.text};
    font-size: 13px;
    margin-bottom: 2px;
  }

  /* ── Main ── */
  .main-content {
    margin-left: 240px;
    flex: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .topbar {
    height: 64px;
    background: ${C.surface};
    border-bottom: 1px solid ${C.border};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .page-title {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${C.accent}, #0088ff);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: #000;
    cursor: pointer;
  }

  .page-body {
    padding: 28px;
    flex: 1;
  }

  /* ── Stat Cards ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }

  .stat-card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 12px;
    padding: 20px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }

  .stat-card:hover { border-color: ${C.accent}50; }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--accent-color, ${C.accent});
  }

  .stat-icon {
    font-size: 22px;
    margin-bottom: 12px;
  }

  .stat-value {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: ${C.text};
    line-height: 1;
    margin-bottom: 4px;
  }

  .stat-label {
    font-size: 12px;
    color: ${C.muted};
    font-weight: 500;
  }

  .stat-change {
    font-size: 11px;
    margin-top: 8px;
    font-weight: 500;
  }

  .stat-change.up { color: ${C.success}; }
  .stat-change.down { color: ${C.danger}; }

  /* ── Section header ── */
  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
  }

  /* ── Buttons ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    transition: all 0.15s ease;
    font-family: 'DM Sans', sans-serif;
  }

  .btn-primary {
    background: ${C.accent};
    color: #000;
  }

  .btn-primary:hover { background: ${C.accentHover}; transform: translateY(-1px); }

  .btn-outline {
    background: transparent;
    color: ${C.text};
    border: 1px solid ${C.border};
  }

  .btn-outline:hover { border-color: ${C.accent}; color: ${C.accent}; }

  .btn-danger {
    background: ${C.danger}20;
    color: ${C.danger};
    border: 1px solid ${C.danger}40;
  }

  .btn-danger:hover { background: ${C.danger}30; }

  .btn-sm { padding: 5px 10px; font-size: 12px; }

  /* ── Table ── */
  .table-wrap {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 12px;
    overflow: hidden;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
  }

  thead {
    background: ${C.surface};
    border-bottom: 1px solid ${C.border};
  }

  th {
    padding: 12px 16px;
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: ${C.muted};
  }

  td {
    padding: 13px 16px;
    border-bottom: 1px solid ${C.border}60;
    color: ${C.text};
    vertical-align: middle;
  }

  tr:last-child td { border-bottom: none; }

  tr:hover td { background: ${C.surface}; }

  /* ── Badge ── */
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
  }

  .badge-green { background: ${C.success}20; color: ${C.success}; }
  .badge-yellow { background: ${C.warn}20; color: ${C.warn}; }
  .badge-red { background: ${C.danger}20; color: ${C.danger}; }
  .badge-blue { background: ${C.blue}20; color: ${C.blue}; }
  .badge-gray { background: ${C.muted}20; color: ${C.muted}; }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(4px);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  .modal {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 16px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    animation: slideUp 0.2s ease;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid ${C.border};
  }

  .modal-title {
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
  }

  .modal-close {
    width: 28px; height: 28px;
    border-radius: 6px;
    border: 1px solid ${C.border};
    background: transparent;
    color: ${C.muted};
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    transition: all 0.15s;
  }

  .modal-close:hover { color: ${C.text}; border-color: ${C.text}; }

  .modal-body { padding: 20px 24px; }

  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid ${C.border};
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  /* ── Form ── */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  .form-grid.full { grid-template-columns: 1fr; }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-group.span-2 { grid-column: span 2; }

  label {
    font-size: 12px;
    font-weight: 500;
    color: ${C.muted};
    letter-spacing: 0.3px;
  }

  input, select, textarea {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 8px;
    padding: 9px 12px;
    color: ${C.text};
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.15s;
    outline: none;
    width: 100%;
  }

  input:focus, select:focus, textarea:focus {
    border-color: ${C.accent};
    box-shadow: 0 0 0 3px ${C.accent}15;
  }

  select option { background: ${C.card}; }

  textarea { resize: vertical; min-height: 80px; }

  /* ── Search bar ── */
  .search-bar {
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 8px;
    padding: 8px 12px;
    margin-bottom: 16px;
  }

  .search-bar input {
    background: transparent;
    border: none;
    outline: none;
    flex: 1;
    padding: 0;
    font-size: 13px;
    box-shadow: none;
  }

  .search-icon { color: ${C.muted}; font-size: 15px; }

  /* ── Calendar ── */
  .cal-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
  }

  .cal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .cal-day-head {
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: ${C.muted};
    padding: 6px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cal-day {
    aspect-ratio: 1;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid transparent;
    font-size: 13px;
    transition: all 0.15s;
    gap: 2px;
    padding: 4px;
  }

  .cal-day:hover { background: ${C.surface}; border-color: ${C.border}; }
  .cal-day.today { border-color: ${C.accent}; color: ${C.accent}; font-weight: 700; }
  .cal-day.selected { background: ${C.accent}; color: #000; font-weight: 700; }
  .cal-day.has-apt::after {
    content: '';
    width: 4px; height: 4px;
    background: ${C.accent};
    border-radius: 50%;
  }
  .cal-day.selected.has-apt::after { background: #000; }
  .cal-day.other-month { color: ${C.muted}; opacity: 0.4; }

  /* ── Appointment list ── */
  .apt-list { display: flex; flex-direction: column; gap: 8px; }

  .apt-item {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 12px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: border-color 0.15s;
  }

  .apt-item:hover { border-color: ${C.accent}40; }

  .apt-time {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: ${C.accent};
    min-width: 48px;
    text-align: center;
  }

  .apt-divider {
    width: 1px; height: 36px;
    background: ${C.border};
  }

  .apt-info { flex: 1; }

  .apt-patient {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 2px;
  }

  .apt-meta {
    font-size: 12px;
    color: ${C.muted};
  }

  /* ── Two column layout ── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .three-col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }

  /* ── Card ── */
  .card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 12px;
    padding: 20px;
  }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 16px;
    color: ${C.text};
  }

  /* ── Empty state ── */
  .empty {
    text-align: center;
    padding: 40px 20px;
    color: ${C.muted};
  }

  .empty-icon { font-size: 36px; margin-bottom: 10px; opacity: 0.5; }
  .empty-text { font-size: 14px; }

  /* ── Revenue bar ── */
  .rev-bar-wrap {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rev-bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
  }

  .rev-bar-label { width: 110px; color: ${C.muted}; flex-shrink: 0; }

  .rev-bar-bg {
    flex: 1;
    height: 8px;
    background: ${C.surface};
    border-radius: 4px;
    overflow: hidden;
  }

  .rev-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, ${C.accent}, #0088ff);
    border-radius: 4px;
    transition: width 0.8s ease;
  }

  .rev-bar-val { width: 70px; text-align: right; font-weight: 600; font-size: 12px; }

  /* ── Therapist card ── */
  .therapist-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  .therapist-card {
    background: ${C.card};
    border: 1px solid ${C.border};
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 8px;
    transition: border-color 0.2s;
  }

  .therapist-card:hover { border-color: ${C.accent}50; }

  .therapist-avatar {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: #000;
    margin-bottom: 4px;
  }

  .therapist-name { font-size: 13px; font-weight: 600; }
  .therapist-spec { font-size: 11px; color: ${C.muted}; }
  .therapist-stats { font-size: 11px; color: ${C.muted}; margin-top: 4px; }

  /* ── Invoice ── */
  .invoice-summary {
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 16px;
    margin-top: 16px;
  }

  .invoice-row {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    padding: 4px 0;
  }

  .invoice-row.total {
    border-top: 1px solid ${C.border};
    margin-top: 8px;
    padding-top: 10px;
    font-weight: 700;
    font-size: 15px;
    color: ${C.accent};
  }

  /* ── Tabs ── */
  .tabs {
    display: flex;
    gap: 4px;
    background: ${C.surface};
    border: 1px solid ${C.border};
    border-radius: 10px;
    padding: 4px;
    margin-bottom: 20px;
    width: fit-content;
  }

  .tab {
    padding: 7px 16px;
    border-radius: 7px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    color: ${C.muted};
    transition: all 0.15s;
    border: none;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
  }

  .tab.active {
    background: ${C.card};
    color: ${C.accent};
    border: 1px solid ${C.border};
  }

  .tab:hover:not(.active) { color: ${C.text}; }

  /* ── Notification dot ── */
  .notif-dot {
    width: 8px; height: 8px;
    background: ${C.danger};
    border-radius: 50%;
    flex-shrink: 0;
  }

  .progress-ring {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    color: ${C.muted};
  }
`;

// ── Data seeds ─────────────────────────────────────────────────────────────────

const THERAPISTS = [
  { id: 1, name: "Dr. Arjun Mehta",    spec: "Sports Rehabilitation",  color: "#00c9a7", apts: 142, patients: 38 },
  { id: 2, name: "Dr. Priya Shah",     spec: "Neurological Physio",    color: "#58a6ff", apts: 118, patients: 32 },
  { id: 3, name: "Dr. Rohan Patel",    spec: "Orthopedic Physio",      color: "#d29922", apts: 135, patients: 41 },
  { id: 4, name: "Dr. Sneha Joshi",    spec: "Pediatric Physio",       color: "#f85149", apts: 96,  patients: 28 },
  { id: 5, name: "Dr. Kiran Desai",    spec: "Geriatric Physio",       color: "#a5d6ff", apts: 109, patients: 35 },
  { id: 6, name: "Dr. Meera Gupta",    spec: "Post-Surgical Rehab",    color: "#3fb950", apts: 88,  patients: 24 },
];

const SERVICES = [
  { id: 1, name: "Initial Assessment",         price: 1200 },
  { id: 2, name: "Follow-up Session (45 min)",  price: 800  },
  { id: 3, name: "Manual Therapy",             price: 950  },
  { id: 4, name: "Electrotherapy",             price: 700  },
  { id: 5, name: "Exercise Therapy",           price: 850  },
  { id: 6, name: "Home Visit",                 price: 1800 },
  { id: 7, name: "Group Session",              price: 500  },
  { id: 8, name: "Ultrasound Therapy",         price: 600  },
];

const TODAY = new Date();
const fmt = (d) => d.toISOString().slice(0, 10);
const fmtDate = (s) => new Date(s).toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" });

function genId() { return Math.random().toString(36).slice(2, 9); }

const INIT_PATIENTS = [
  { id: genId(), name: "Rahul Sharma",    phone: "9876543210", email: "rahul@email.com", dob: "1988-04-15", gender: "Male",   address: "12, MG Road, Surat", condition: "Knee Ligament Tear",       therapistId: 1, createdAt: "2025-11-01" },
  { id: genId(), name: "Anita Verma",     phone: "9765432109", email: "anita@email.com", dob: "1975-09-22", gender: "Female", address: "45, Ring Road, Surat",  condition: "Cervical Spondylosis",     therapistId: 2, createdAt: "2025-11-15" },
  { id: genId(), name: "Suresh Patel",    phone: "9654321098", email: "suresh@email.com",dob: "1960-12-03", gender: "Male",   address: "8, Citylight, Surat",   condition: "Frozen Shoulder",          therapistId: 3, createdAt: "2025-12-01" },
  { id: genId(), name: "Pooja Nair",      phone: "9543210987", email: "pooja@email.com", dob: "1995-06-18", gender: "Female", address: "22, Adajan, Surat",     condition: "Lower Back Pain",          therapistId: 1, createdAt: "2025-12-10" },
  { id: genId(), name: "Vikram Singh",    phone: "9432109876", email: "vikram@email.com",dob: "1982-01-30", gender: "Male",   address: "5, Pal, Surat",         condition: "Post ACL Surgery",         therapistId: 3, createdAt: "2026-01-05" },
  { id: genId(), name: "Divya Iyer",      phone: "9321098765", email: "divya@email.com", dob: "1990-07-11", gender: "Female", address: "33, Katargam, Surat",   condition: "Sciatica",                 therapistId: 2, createdAt: "2026-01-12" },
  { id: genId(), name: "Mahesh Kumar",    phone: "9210987654", email: "mahesh@email.com",dob: "1955-03-25", gender: "Male",   address: "17, Vesu, Surat",       condition: "Arthritis Rehabilitation", therapistId: 5, createdAt: "2026-01-20" },
  { id: genId(), name: "Geeta Pandya",    phone: "9109876543", email: "geeta@email.com", dob: "1978-11-08", gender: "Female", address: "7, Althan, Surat",      condition: "Post Stroke Rehab",        therapistId: 2, createdAt: "2026-02-01" },
];

const STATUSES = ["Scheduled", "Completed", "Cancelled", "No-Show"];
const TIMES = ["09:00", "09:45", "10:30", "11:15", "12:00", "14:00", "14:45", "15:30", "16:15", "17:00", "17:45"];

function genApts(patients) {
  const apts = [];
  const base = new Date("2026-02-10");
  patients.forEach(p => {
    for (let i = 0; i < 3; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + Math.floor(Math.random() * 14));
      const s = STATUSES[Math.floor(Math.random() * STATUSES.length)];
      const svc = SERVICES[Math.floor(Math.random() * SERVICES.length)];
      apts.push({
        id: genId(),
        patientId: p.id,
        therapistId: p.therapistId,
        date: fmt(d),
        time: TIMES[Math.floor(Math.random() * TIMES.length)],
        service: svc.name,
        serviceId: svc.id,
        status: s,
        notes: "",
      });
    }
  });
  return apts;
}

const INIT_APTS = genApts(INIT_PATIENTS);

function genBills(apts, patients) {
  return apts
    .filter(a => a.status === "Completed")
    .map(a => {
      const svc = SERVICES.find(s => s.name === a.service) || SERVICES[0];
      const paid = Math.random() > 0.25;
      return {
        id: genId(),
        aptId: a.id,
        patientId: a.patientId,
        date: a.date,
        service: a.service,
        amount: svc.price,
        paid,
        paymentMethod: paid ? (["Cash", "UPI", "Card"][Math.floor(Math.random() * 3)]) : "",
      };
    });
}

const INIT_BILLS = genBills(INIT_APTS, INIT_PATIENTS);

// ── Sub-components ─────────────────────────────────────────────────────────────

function Modal({ title, onClose, children, footer }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Scheduled: "badge-blue",
    Completed: "badge-green",
    Cancelled: "badge-red",
    "No-Show": "badge-yellow",
    Paid: "badge-green",
    Unpaid: "badge-red",
    Active: "badge-green",
    Inactive: "badge-gray",
  };
  return <span className={`badge ${map[status] || "badge-gray"}`}>{status}</span>;
}

// ── Dashboard ──────────────────────────────────────────────────────────────────

function Dashboard({ patients, appointments, bills, therapists }) {
  const todayStr = fmt(TODAY);
  const todayApts = appointments.filter(a => a.date === todayStr);
  const totalRevenue = bills.filter(b => b.paid).reduce((s, b) => s + b.amount, 0);
  const pending = bills.filter(b => !b.paid).reduce((s, b) => s + b.amount, 0);
  const thisMonthApts = appointments.filter(a => a.date.startsWith("2026-02")).length;

  const recentApts = [...appointments]
    .sort((a, b) => (a.date + a.time) < (b.date + b.time) ? 1 : -1)
    .slice(0, 5);

  const therapistRevenue = therapists.map(t => {
    const rev = bills.filter(b => {
      const apt = appointments.find(a => a.id === b.aptId);
      return apt && apt.therapistId === t.id && b.paid;
    }).reduce((s, b) => s + b.amount, 0);
    return { ...t, revenue: rev };
  }).sort((a, b) => b.revenue - a.revenue);

  const maxRev = Math.max(...therapistRevenue.map(t => t.revenue), 1);

  return (
    <div>
      <div className="stats-grid">
        {[
          { icon: "👥", label: "Total Patients", value: patients.length, change: "+3 this month", up: true, color: C.accent },
          { icon: "📅", label: "Today's Appointments", value: todayApts.length, change: `${todayApts.filter(a=>a.status==="Completed").length} completed`, up: true, color: C.blue },
          { icon: "💰", label: "Revenue Collected", value: `₹${(totalRevenue/1000).toFixed(1)}K`, change: "This period", up: true, color: C.success },
          { icon: "⏳", label: "Pending Payments", value: `₹${(pending/1000).toFixed(1)}K`, change: `${bills.filter(b=>!b.paid).length} invoices`, up: false, color: C.warn },
        ].map((s, i) => (
          <div className="stat-card" key={i} style={{ "--accent-color": s.color }}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up ? "up" : "down"}`}>{s.change}</div>
          </div>
        ))}
      </div>

      <div className="two-col" style={{ marginBottom: 20 }}>
        {/* Today's appointments */}
        <div className="card">
          <div className="card-title">📋 Today's Schedule ({todayStr})</div>
          {todayApts.length === 0 ? (
            <div className="empty"><div className="empty-icon">📅</div><div className="empty-text">No appointments today</div></div>
          ) : (
            <div className="apt-list">
              {todayApts.sort((a,b)=>a.time>b.time?1:-1).map(apt => {
                const p = patients.find(x => x.id === apt.patientId);
                const t = therapists.find(x => x.id === apt.therapistId);
                return (
                  <div className="apt-item" key={apt.id}>
                    <div className="apt-time">{apt.time}</div>
                    <div className="apt-divider" />
                    <div className="apt-info">
                      <div className="apt-patient">{p?.name || "Unknown"}</div>
                      <div className="apt-meta">{apt.service} · {t?.name}</div>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Revenue by therapist */}
        <div className="card">
          <div className="card-title">💹 Revenue by Therapist</div>
          <div className="rev-bar-wrap">
            {therapistRevenue.map(t => (
              <div className="rev-bar-row" key={t.id}>
                <div className="rev-bar-label" style={{ fontSize: 11 }}>{t.name.split(" ")[1]} {t.name.split(" ")[2]}</div>
                <div className="rev-bar-bg">
                  <div className="rev-bar-fill" style={{ width: `${(t.revenue / maxRev) * 100}%`, background: `linear-gradient(90deg, ${t.color}, ${t.color}99)` }} />
                </div>
                <div className="rev-bar-val" style={{ color: t.color }}>₹{(t.revenue/1000).toFixed(1)}K</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="two-col">
        {/* Recent activity */}
        <div className="card">
          <div className="card-title">🔔 Recent Appointments</div>
          <div className="apt-list">
            {recentApts.map(apt => {
              const p = patients.find(x => x.id === apt.patientId);
              return (
                <div className="apt-item" key={apt.id}>
                  <div style={{ fontSize: 12, color: C.muted, minWidth: 60 }}>{apt.date.slice(5)}</div>
                  <div className="apt-info">
                    <div className="apt-patient">{p?.name}</div>
                    <div className="apt-meta">{apt.service}</div>
                  </div>
                  <StatusBadge status={apt.status} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick stats */}
        <div className="card">
          <div className="card-title">📊 This Month's Overview</div>
          {[
            { label: "Appointments", val: thisMonthApts, icon: "📅" },
            { label: "New Patients", val: patients.filter(p => p.createdAt?.startsWith("2026-02")).length, icon: "🆕" },
            { label: "Completed Sessions", val: appointments.filter(a => a.date.startsWith("2026-02") && a.status === "Completed").length, icon: "✅" },
            { label: "Cancellations", val: appointments.filter(a => a.date.startsWith("2026-02") && a.status === "Cancelled").length, icon: "❌" },
            { label: "No-Shows", val: appointments.filter(a => a.date.startsWith("2026-02") && a.status === "No-Show").length, icon: "⚠️" },
            { label: "Revenue Invoiced", val: `₹${(bills.filter(b=>b.date?.startsWith("2026-02")).reduce((s,b)=>s+b.amount,0)/1000).toFixed(1)}K`, icon: "💰" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${C.border}40` : "none", fontSize: 13 }}>
              <span style={{ color: C.muted }}>{s.icon} {s.label}</span>
              <span style={{ fontWeight: 700, color: C.text }}>{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Patients ───────────────────────────────────────────────────────────────────

function Patients({ patients, setPatients, therapists, appointments }) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [viewPatient, setViewPatient] = useState(null);
  const [form, setForm] = useState({ name:"", phone:"", email:"", dob:"", gender:"Male", address:"", condition:"", therapistId: therapists[0]?.id || 1 });

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.condition?.toLowerCase().includes(search.toLowerCase())
  );

  function addPatient() {
    if (!form.name || !form.phone) return;
    setPatients(prev => [...prev, { ...form, id: genId(), createdAt: fmt(TODAY), therapistId: Number(form.therapistId) }]);
    setShowModal(false);
    setForm({ name:"", phone:"", email:"", dob:"", gender:"Male", address:"", condition:"", therapistId: therapists[0]?.id || 1 });
  }

  function deletePatient(id) {
    if (confirm("Delete this patient?")) setPatients(prev => prev.filter(p => p.id !== id));
  }

  const f = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Patient Records <span style={{ color: C.muted, fontWeight: 400, fontSize: 13 }}>({patients.length})</span></span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Add Patient</button>
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search by name, phone, condition…" value={search} onChange={e => setSearch(e.target.value)} />
        {search && <button className="btn btn-sm btn-outline" onClick={() => setSearch("")}>Clear</button>}
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Patient</th><th>Phone</th><th>Condition</th><th>Therapist</th><th>Since</th><th>Sessions</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const t = therapists.find(x => x.id === Number(p.therapistId));
              const sessions = appointments.filter(a => a.patientId === p.id).length;
              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent},${C.blue})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:"#000", flexShrink:0 }}>
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight:500 }}>{p.name}</div>
                        <div style={{ fontSize:11, color:C.muted }}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.phone}</td>
                  <td><span style={{ fontSize:12, color:C.muted }}>{p.condition || "—"}</span></td>
                  <td>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:8, height:8, borderRadius:"50%", background: t?.color || C.muted }} />
                      <span style={{ fontSize:12 }}>{t?.name?.split(" ").slice(1).join(" ") || "—"}</span>
                    </div>
                  </td>
                  <td style={{ fontSize:12, color:C.muted }}>{p.createdAt}</td>
                  <td><span className="badge badge-blue">{sessions}</span></td>
                  <td>
                    <div style={{ display:"flex", gap:6 }}>
                      <button className="btn btn-sm btn-outline" onClick={() => setViewPatient(p)}>View</button>
                      <button className="btn btn-sm btn-danger" onClick={() => deletePatient(p.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="empty"><div className="empty-icon">👥</div><div className="empty-text">No patients found</div></div>}
      </div>

      {showModal && (
        <Modal title="Add New Patient" onClose={() => setShowModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={addPatient}>Save Patient</button></>}>
          <div className="form-grid">
            <div className="form-group"><label>Full Name *</label><input value={form.name} onChange={e=>f("name",e.target.value)} placeholder="Patient name" /></div>
            <div className="form-group"><label>Phone *</label><input value={form.phone} onChange={e=>f("phone",e.target.value)} placeholder="10-digit number" /></div>
            <div className="form-group"><label>Email</label><input value={form.email} onChange={e=>f("email",e.target.value)} placeholder="email@example.com" /></div>
            <div className="form-group"><label>Date of Birth</label><input type="date" value={form.dob} onChange={e=>f("dob",e.target.value)} /></div>
            <div className="form-group"><label>Gender</label><select value={form.gender} onChange={e=>f("gender",e.target.value)}><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div className="form-group"><label>Assigned Therapist</label>
              <select value={form.therapistId} onChange={e=>f("therapistId",e.target.value)}>
                {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="form-group span-2"><label>Address</label><input value={form.address} onChange={e=>f("address",e.target.value)} placeholder="Full address" /></div>
            <div className="form-group span-2"><label>Condition / Diagnosis</label><textarea value={form.condition} onChange={e=>f("condition",e.target.value)} placeholder="Primary condition or diagnosis" style={{minHeight:60}} /></div>
          </div>
        </Modal>
      )}

      {viewPatient && (
        <Modal title="Patient Details" onClose={() => setViewPatient(null)}
          footer={<button className="btn btn-outline" onClick={() => setViewPatient(null)}>Close</button>}>
          {(() => {
            const t = therapists.find(x => x.id === Number(viewPatient.therapistId));
            const pApts = appointments.filter(a => a.patientId === viewPatient.id);
            return (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, padding:16, background:C.surface, borderRadius:10 }}>
                  <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg,${C.accent},${C.blue})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, color:"#000" }}>{viewPatient.name.charAt(0)}</div>
                  <div>
                    <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:16 }}>{viewPatient.name}</div>
                    <div style={{ color:C.muted, fontSize:12 }}>{viewPatient.condition}</div>
                    <div style={{ color:C.accent, fontSize:11, marginTop:2 }}>Assigned: {t?.name}</div>
                  </div>
                </div>
                {[["📞 Phone", viewPatient.phone],["📧 Email", viewPatient.email || "—"],["🗓 DOB", viewPatient.dob || "—"],["⚧ Gender", viewPatient.gender],["📍 Address", viewPatient.address || "—"],["📅 Registered", viewPatient.createdAt]].map(([l,v]) => (
                  <div key={l} style={{ display:"flex", gap:12, padding:"8px 0", borderBottom:`1px solid ${C.border}40`, fontSize:13 }}>
                    <span style={{ color:C.muted, minWidth:100 }}>{l}</span>
                    <span>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop:16 }}>
                  <div style={{ fontWeight:600, marginBottom:8, fontSize:13 }}>Session History ({pApts.length})</div>
                  {pApts.slice(0,5).map(a => (
                    <div key={a.id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:`1px solid ${C.border}30`, fontSize:12 }}>
                      <span style={{ color:C.muted }}>{a.date} {a.time}</span>
                      <span>{a.service}</span>
                      <StatusBadge status={a.status} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </Modal>
      )}
    </div>
  );
}

// ── Appointments (Calendar) ────────────────────────────────────────────────────

function Appointments({ appointments, setAppointments, patients, therapists }) {
  const [currentDate, setCurrentDate] = useState(new Date(TODAY));
  const [selectedDate, setSelectedDate] = useState(fmt(TODAY));
  const [showModal, setShowModal] = useState(false);
  const [editApt, setEditApt] = useState(null);
  const [filterTherapist, setFilterTherapist] = useState("all");
  const [form, setForm] = useState({ patientId:"", therapistId: therapists[0]?.id || 1, date: fmt(TODAY), time:"09:00", service: SERVICES[0].name, status:"Scheduled", notes:"" });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const dayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const days = [];
  const prevDays = new Date(year, month, 0).getDate();
  for (let i = firstDay - 1; i >= 0; i--) days.push({ day: prevDays - i, curr: false });
  for (let d = 1; d <= daysInMonth; d++) days.push({ day: d, curr: true });
  while (days.length % 7 !== 0) days.push({ day: days.length - daysInMonth - firstDay + 1, curr: false });

  const dateStr = (d) => `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const selApts = appointments.filter(a => a.date === selectedDate && (filterTherapist === "all" || a.therapistId === Number(filterTherapist)));

  function openAdd() { setEditApt(null); setForm({ patientId: patients[0]?.id || "", therapistId: therapists[0]?.id, date: selectedDate, time:"09:00", service: SERVICES[0].name, status:"Scheduled", notes:"" }); setShowModal(true); }
  function openEdit(apt) { setEditApt(apt); setForm({ ...apt, therapistId: Number(apt.therapistId) }); setShowModal(true); }

  function saveApt() {
    if (!form.patientId) return;
    if (editApt) {
      setAppointments(prev => prev.map(a => a.id === editApt.id ? { ...editApt, ...form, therapistId: Number(form.therapistId) } : a));
    } else {
      setAppointments(prev => [...prev, { ...form, id: genId(), therapistId: Number(form.therapistId) }]);
    }
    setShowModal(false);
  }

  function deleteApt(id) { if (confirm("Delete this appointment?")) setAppointments(prev => prev.filter(a => a.id !== id)); }

  const f = (k,v) => setForm(prev=>({...prev,[k]:v}));

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Appointment Calendar</span>
        <div style={{ display:"flex", gap:10 }}>
          <select style={{ width:"auto", background:C.card, fontSize:12 }} value={filterTherapist} onChange={e=>setFilterTherapist(e.target.value)}>
            <option value="all">All Therapists</option>
            {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button className="btn btn-primary" onClick={openAdd}>+ New Appointment</button>
        </div>
      </div>

      <div className="two-col">
        {/* Calendar */}
        <div className="card">
          <div className="cal-header">
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentDate(new Date(year, month-1, 1))}>‹</button>
            <span style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:15 }}>{monthNames[month]} {year}</span>
            <button className="btn btn-outline btn-sm" onClick={() => setCurrentDate(new Date(year, month+1, 1))}>›</button>
          </div>
          <div className="cal-grid">
            {dayNames.map(d => <div key={d} className="cal-day-head">{d}</div>)}
            {days.map((d, i) => {
              const ds = d.curr ? dateStr(d.day) : "";
              const hasApt = appointments.some(a => a.date === ds);
              const isToday = ds === fmt(TODAY);
              const isSel = ds === selectedDate;
              return (
                <div key={i}
                  className={`cal-day ${!d.curr?"other-month":""} ${isToday&&!isSel?"today":""} ${isSel?"selected":""} ${hasApt&&!isSel?"has-apt":""}`}
                  onClick={() => d.curr && setSelectedDate(ds)}
                >
                  {d.day}
                  {hasApt && isSel && <span style={{ fontSize:8, color:"#000" }}>●</span>}
                  {hasApt && !isSel && <span style={{ display:"block" }}></span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Day view */}
        <div className="card">
          <div className="card-title">
            📋 {selectedDate === fmt(TODAY) ? "Today" : selectedDate} &nbsp;
            <span style={{ fontWeight:400, fontSize:12, color:C.muted }}>{selApts.length} appointment{selApts.length!==1?"s":""}</span>
          </div>
          {selApts.length === 0 ? (
            <div className="empty"><div className="empty-icon">📅</div><div className="empty-text">No appointments {filterTherapist!=="all"?"for this therapist":""} on this date</div></div>
          ) : (
            <div className="apt-list">
              {selApts.sort((a,b)=>a.time>b.time?1:-1).map(apt => {
                const p = patients.find(x => x.id === apt.patientId);
                const t = therapists.find(x => x.id === apt.therapistId);
                return (
                  <div className="apt-item" key={apt.id}>
                    <div className="apt-time">{apt.time}</div>
                    <div className="apt-divider" />
                    <div className="apt-info">
                      <div className="apt-patient">{p?.name || "Unknown"}</div>
                      <div className="apt-meta">{apt.service} · <span style={{ color: t?.color }}>{t?.name?.split(" ").slice(1).join(" ")}</span></div>
                      {apt.notes && <div className="apt-meta" style={{ marginTop:2 }}>📝 {apt.notes}</div>}
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                      <StatusBadge status={apt.status} />
                      <div style={{ display:"flex", gap:4 }}>
                        <button className="btn btn-sm btn-outline" onClick={() => openEdit(apt)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteApt(apt.id)}>✕</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <Modal title={editApt ? "Edit Appointment" : "New Appointment"} onClose={() => setShowModal(false)}
          footer={<><button className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={saveApt}>Save</button></>}>
          <div className="form-grid">
            <div className="form-group span-2"><label>Patient *</label>
              <select value={form.patientId} onChange={e=>f("patientId",e.target.value)}>
                <option value="">— Select patient —</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name} · {p.phone}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Therapist</label>
              <select value={form.therapistId} onChange={e=>f("therapistId",e.target.value)}>
                {therapists.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Service</label>
              <select value={form.service} onChange={e=>f("service",e.target.value)}>
                {SERVICES.map(s => <option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>f("date",e.target.value)} /></div>
            <div className="form-group"><label>Time</label>
              <select value={form.time} onChange={e=>f("time",e.target.value)}>
                {TIMES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group span-2"><label>Status</label>
              <select value={form.status} onChange={e=>f("status",e.target.value)}>
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group span-2"><label>Notes</label><textarea value={form.notes} onChange={e=>f("notes",e.target.value)} placeholder="Session notes…" /></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ── Billing ────────────────────────────────────────────────────────────────────

function Billing({ bills, setBills, patients, appointments, therapists }) {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [viewBill, setViewBill] = useState(null);
  const [form, setForm] = useState({ patientId:"", aptId:"", service: SERVICES[0].name, amount: SERVICES[0].price, paymentMethod:"Cash", date: fmt(TODAY) });

  const f = (k,v) => setForm(prev=>({...prev,[k]:v}));

  const filtered = bills.filter(b => {
    const p = patients.find(x => x.id === b.patientId);
    const nameMatch = p?.name.toLowerCase().includes(search.toLowerCase());
    if (tab === "Paid") return nameMatch && b.paid;
    if (tab === "Unpaid") return nameMatch && !b.paid;
    return nameMatch;
  });

  const totalCollected = bills.filter(b=>b.paid).reduce((s,b)=>s+b.amount,0);
  const totalPending = bills.filter(b=>!b.paid).reduce((s,b)=>s+b.amount,0);

  function addBill() {
    if (!form.patientId) return;
    setBills(prev => [...prev, { ...form, id: genId(), paid: false, amount: Number(form.amount) }]);
    setShowModal(false);
  }

  function markPaid(id, method) {
    setBills(prev => prev.map(b => b.id === id ? { ...b, paid: true, paymentMethod: method } : b));
  }

  function deleteBill(id) { if (confirm("Delete this invoice?")) setBills(prev => prev.filter(b => b.id !== id)); }

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Billing & Invoices</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ New Invoice</button>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns:"repeat(3,1fr)", marginBottom:20 }}>
        {[
          { label:"Total Invoiced",  val:`₹${((totalCollected+totalPending)/1000).toFixed(1)}K`, icon:"🧾", color:C.blue },
          { label:"Collected",       val:`₹${(totalCollected/1000).toFixed(1)}K`,                icon:"✅", color:C.success },
          { label:"Pending",         val:`₹${(totalPending/1000).toFixed(1)}K`,                  icon:"⏳", color:C.warn },
        ].map((s,i)=>(
          <div className="stat-card" key={i} style={{"--accent-color":s.color}}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs">
        {["All","Paid","Unpaid"].map(t => <button key={t} className={`tab ${tab===t?"active":""}`} onClick={()=>setTab(t)}>{t}</button>)}
      </div>

      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input placeholder="Search by patient name…" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>

      <div className="table-wrap">
        <table>
          <thead><tr><th>Invoice #</th><th>Patient</th><th>Service</th><th>Date</th><th>Amount</th><th>Status</th><th>Payment</th><th>Actions</th></tr></thead>
          <tbody>
            {filtered.map((b,i) => {
              const p = patients.find(x=>x.id===b.patientId);
              return (
                <tr key={b.id}>
                  <td style={{ fontFamily:"monospace", fontSize:11, color:C.muted }}>INV-{b.id.toUpperCase().slice(0,6)}</td>
                  <td style={{ fontWeight:500 }}>{p?.name || "Unknown"}</td>
                  <td style={{ fontSize:12, color:C.muted }}>{b.service}</td>
                  <td style={{ fontSize:12, color:C.muted }}>{b.date}</td>
                  <td style={{ fontFamily:"Syne,sans-serif", fontWeight:700 }}>₹{b.amount.toLocaleString("en-IN")}</td>
                  <td><StatusBadge status={b.paid?"Paid":"Unpaid"} /></td>
                  <td style={{ fontSize:12, color:C.muted }}>{b.paymentMethod || "—"}</td>
                  <td>
                    <div style={{ display:"flex", gap:6 }}>
                      {!b.paid && (
                        <select style={{ fontSize:11, padding:"4px 6px", width:"auto", background:C.surface }} onChange={e => { if(e.target.value) markPaid(b.id, e.target.value); }}>
                          <option value="">Mark Paid</option>
                          {["Cash","UPI","Card","Cheque"].map(m=><option key={m}>{m}</option>)}
                        </select>
                      )}
                      <button className="btn btn-sm btn-outline" onClick={()=>setViewBill(b)}>View</button>
                      <button className="btn btn-sm btn-danger" onClick={()=>deleteBill(b.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0 && <div className="empty"><div className="empty-icon">🧾</div><div className="empty-text">No invoices found</div></div>}
      </div>

      {showModal && (
        <Modal title="Create Invoice" onClose={()=>setShowModal(false)}
          footer={<><button className="btn btn-outline" onClick={()=>setShowModal(false)}>Cancel</button><button className="btn btn-primary" onClick={addBill}>Create Invoice</button></>}>
          <div className="form-grid">
            <div className="form-group span-2"><label>Patient *</label>
              <select value={form.patientId} onChange={e=>f("patientId",e.target.value)}>
                <option value="">— Select patient —</option>
                {patients.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="form-group span-2"><label>Service</label>
              <select value={form.service} onChange={e=>{
                const svc=SERVICES.find(s=>s.name===e.target.value);
                setForm(prev=>({...prev,service:e.target.value,amount:svc?.price||0}));
              }}>
                {SERVICES.map(s=><option key={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Amount (₹)</label><input type="number" value={form.amount} onChange={e=>f("amount",e.target.value)} /></div>
            <div className="form-group"><label>Date</label><input type="date" value={form.date} onChange={e=>f("date",e.target.value)} /></div>
          </div>
          <div className="invoice-summary">
            <div className="invoice-row"><span>Service</span><span>{form.service}</span></div>
            <div className="invoice-row"><span>Patient</span><span>{patients.find(p=>p.id===form.patientId)?.name||"—"}</span></div>
            <div className="invoice-row total"><span>Total</span><span>₹{Number(form.amount).toLocaleString("en-IN")}</span></div>
          </div>
        </Modal>
      )}

      {viewBill && (() => {
        const p = patients.find(x=>x.id===viewBill.patientId);
        return (
          <Modal title="Invoice Details" onClose={()=>setViewBill(null)}
            footer={<button className="btn btn-outline" onClick={()=>setViewBill(null)}>Close</button>}>
            <div style={{ textAlign:"center", marginBottom:20, paddingBottom:20, borderBottom:`1px solid ${C.border}` }}>
              <div style={{ fontFamily:"Syne,sans-serif", fontSize:22, fontWeight:800, color:C.accent }}>PhysioClinic</div>
              <div style={{ fontSize:11, color:C.muted, marginTop:2 }}>Tax Invoice</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
              {[["Invoice #",`INV-${viewBill.id.toUpperCase().slice(0,6)}`],["Date",viewBill.date],["Patient",p?.name],["Phone",p?.phone],["Service",viewBill.service],["Status",viewBill.paid?"Paid":"Unpaid"]].map(([l,v])=>(
                <div key={l} style={{ fontSize:12 }}><div style={{ color:C.muted, marginBottom:2 }}>{l}</div><div style={{ fontWeight:500 }}>{v}</div></div>
              ))}
            </div>
            <div className="invoice-summary">
              <div className="invoice-row"><span>Amount</span><span>₹{viewBill.amount.toLocaleString("en-IN")}</span></div>
              <div className="invoice-row"><span>GST (0%)</span><span>₹0</span></div>
              <div className="invoice-row total"><span>Total Payable</span><span>₹{viewBill.amount.toLocaleString("en-IN")}</span></div>
            </div>
            {viewBill.paid && <div style={{ marginTop:12, textAlign:"center", color:C.success, fontSize:13, fontWeight:600 }}>✅ Paid via {viewBill.paymentMethod}</div>}
          </Modal>
        );
      })()}
    </div>
  );
}

// ── Reports ────────────────────────────────────────────────────────────────────

function Reports({ patients, appointments, bills, therapists }) {
  const months = ["Oct","Nov","Dec","Jan","Feb"];
  const monthKeys = ["2025-10","2025-11","2025-12","2026-01","2026-02"];

  const monthlyRevenue = monthKeys.map(m => bills.filter(b=>b.paid&&b.date?.startsWith(m)).reduce((s,b)=>s+b.amount,0));
  const monthlyApts = monthKeys.map(m => appointments.filter(a=>a.date?.startsWith(m)).length);

  const maxRev = Math.max(...monthlyRevenue, 1);
  const maxApt = Math.max(...monthlyApts, 1);

  const statusDist = STATUSES.map(s => ({ label: s, count: appointments.filter(a=>a.status===s).length }));
  const serviceDist = SERVICES.map(s => ({ label: s.name, count: appointments.filter(a=>a.service===s.name).length }))
    .sort((a,b)=>b.count-a.count).slice(0,6);
  const maxSvc = Math.max(...serviceDist.map(s=>s.count), 1);

  return (
    <div>
      <div className="section-header">
        <span className="section-title">Reports & Analytics</span>
        <span style={{ fontSize:12, color:C.muted }}>Last 5 months</span>
      </div>

      <div className="two-col" style={{ marginBottom:20 }}>
        {/* Revenue chart */}
        <div className="card">
          <div className="card-title">💰 Monthly Revenue (₹)</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:140, paddingTop:10 }}>
            {monthlyRevenue.map((r,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ fontSize:10, color:C.muted }}>{(r/1000).toFixed(1)}K</div>
                <div style={{ width:"100%", background:`linear-gradient(180deg,${C.accent},${C.accent}60)`, borderRadius:"4px 4px 0 0", height:`${(r/maxRev)*110}px`, transition:"height 0.8s ease", minHeight:4 }} />
                <div style={{ fontSize:11, color:C.muted }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment chart */}
        <div className="card">
          <div className="card-title">📅 Monthly Appointments</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:140, paddingTop:10 }}>
            {monthlyApts.map((a,i)=>(
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                <div style={{ fontSize:10, color:C.muted }}>{a}</div>
                <div style={{ width:"100%", background:`linear-gradient(180deg,${C.blue},${C.blue}60)`, borderRadius:"4px 4px 0 0", height:`${(a/maxApt)*110}px`, transition:"height 0.8s ease", minHeight:4 }} />
                <div style={{ fontSize:11, color:C.muted }}>{months[i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="three-col" style={{ marginBottom:20 }}>
        {/* Status distribution */}
        <div className="card">
          <div className="card-title">📊 Appointment Status</div>
          {statusDist.map(s=>(
            <div key={s.label} className="rev-bar-row" style={{ marginBottom:10 }}>
              <div className="rev-bar-label" style={{ fontSize:11, width:90 }}>{s.label}</div>
              <div className="rev-bar-bg" style={{ flex:1 }}>
                <div className="rev-bar-fill" style={{ width:`${(s.count/appointments.length)*100}%` }} />
              </div>
              <div className="rev-bar-val" style={{ width:30 }}>{s.count}</div>
            </div>
          ))}
        </div>

        {/* Top services */}
        <div className="card">
          <div className="card-title">🏆 Top Services</div>
          {serviceDist.map((s,i)=>(
            <div key={s.label} className="rev-bar-row" style={{ marginBottom:10 }}>
              <div style={{ fontSize:10, color:C.muted, width:80 }}>{s.label.split(" ").slice(0,2).join(" ")}</div>
              <div className="rev-bar-bg" style={{ flex:1 }}>
                <div className="rev-bar-fill" style={{ width:`${(s.count/maxSvc)*100}%`, background:`linear-gradient(90deg,${C.warn},${C.warn}60)` }} />
              </div>
              <div className="rev-bar-val" style={{ width:24, color:C.warn }}>{s.count}</div>
            </div>
          ))}
        </div>

        {/* Therapist performance */}
        <div className="card">
          <div className="card-title">👨‍⚕️ Therapist Performance</div>
          {therapists.map(t=>{
            const tApts = appointments.filter(a=>a.therapistId===t.id);
            const completed = tApts.filter(a=>a.status==="Completed").length;
            const rate = tApts.length ? Math.round((completed/tApts.length)*100) : 0;
            return (
              <div key={t.id} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:4 }}>
                  <span style={{ color:C.text }}>{t.name.split(" ").slice(1).join(" ")}</span>
                  <span style={{ color:t.color, fontWeight:600 }}>{rate}%</span>
                </div>
                <div className="rev-bar-bg">
                  <div className="rev-bar-fill" style={{ width:`${rate}%`, background:`linear-gradient(90deg,${t.color},${t.color}80)` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Therapist cards */}
      <div className="section-header"><span className="section-title">Our Therapists</span></div>
      <div className="therapist-grid">
        {therapists.map(t => {
          const revenue = bills.filter(b=>{
            const a=appointments.find(x=>x.id===b.aptId);
            return a&&a.therapistId===t.id&&b.paid;
          }).reduce((s,b)=>s+b.amount,0);
          return (
            <div className="therapist-card" key={t.id}>
              <div className="therapist-avatar" style={{ background: `linear-gradient(135deg,${t.color},${t.color}80)` }}>{t.name.charAt(4)}</div>
              <div className="therapist-name">{t.name}</div>
              <div className="therapist-spec">{t.spec}</div>
              <div style={{ display:"flex", gap:10, marginTop:6 }}>
                <span className="badge badge-blue">{t.patients} patients</span>
                <span className="badge badge-green">₹{(revenue/1000).toFixed(1)}K</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── App Shell ──────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [patients, setPatients] = useState(INIT_PATIENTS);
  const [appointments, setAppointments] = useState(INIT_APTS);
  const [bills, setBills] = useState(INIT_BILLS);

  const nav = [
    { id:"dashboard",    icon:"⊞",  label:"Dashboard"     },
    { id:"patients",     icon:"👥", label:"Patients"       },
    { id:"appointments", icon:"📅", label:"Appointments"   },
    { id:"billing",      icon:"💰", label:"Billing"        },
    { id:"reports",      icon:"📊", label:"Reports"        },
  ];

  const pageTitles = { dashboard:"Dashboard", patients:"Patients", appointments:"Appointments", billing:"Billing & Invoicing", reports:"Reports & Analytics" };

  return (
    <>
      <style>{css}</style>
      <div className="app-wrap">
        <aside className="sidebar">
          <div className="logo-area">
            <div className="logo-title">PhysioClinic</div>
            <div className="logo-sub">Clinic Management System</div>
          </div>
          <nav className="nav-section">
            <div className="nav-label">Menu</div>
            {nav.map(n => (
              <div key={n.id} className={`nav-item ${page===n.id?"active":""}`} onClick={()=>setPage(n.id)}>
                <span className="nav-icon">{n.icon}</span>
                {n.label}
              </div>
            ))}
          </nav>
          <div className="sidebar-footer">
            <div className="clinic-badge">
              <strong>Surat Physio Centre</strong>
              {THERAPISTS.length} Therapists · {patients.length} Patients
            </div>
          </div>
        </aside>

        <main className="main-content">
          <div className="topbar">
            <div className="page-title">{pageTitles[page]}</div>
            <div className="topbar-right">
              <div style={{ fontSize:12, color:C.muted }}>{fmt(TODAY)}</div>
              <div className="avatar">A</div>
            </div>
          </div>
          <div className="page-body">
            {page==="dashboard"    && <Dashboard    patients={patients} appointments={appointments} bills={bills} therapists={THERAPISTS} />}
            {page==="patients"     && <Patients     patients={patients} setPatients={setPatients} therapists={THERAPISTS} appointments={appointments} />}
            {page==="appointments" && <Appointments appointments={appointments} setAppointments={setAppointments} patients={patients} therapists={THERAPISTS} />}
            {page==="billing"      && <Billing      bills={bills} setBills={setBills} patients={patients} appointments={appointments} therapists={THERAPISTS} />}
            {page==="reports"      && <Reports      patients={patients} appointments={appointments} bills={bills} therapists={THERAPISTS} />}
          </div>
        </main>
      </div>
    </>
  );
}
