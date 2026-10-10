/* ==========================================================================
   SAKSHAM — DIRECT 30-MODULE ENGINE
   ========================================================================== */

const MODULES_DATA = [
  // Pillar 1: Town Scenarios
  { id: 1, icon: "🏫", name: "School (RTE Act)", category: "Town", desc: "Interactive scenario on stopping forced school dropouts.", story: "Raju's parents want him to quit school to work in the fields. What is the lawful choice?", choices: [{ text: "Quit school quietly", correct: false, feedback: "Article 21A guarantees free education up to age 14!" }, { text: "Involve school committee & invoke RTE", correct: true, feedback: "RTE mandates compulsory elementary education." }] },
  { id: 2, icon: "🍲", name: "Dhaba & Market (Child Labor)", category: "Town", desc: "Scenario on wage denial and commercial child labor.", story: "11-year-old Chotu works 12-hour shifts at a highway tea stall.", choices: [{ text: "Ignore the situation", correct: false, feedback: "Child labor under 14 is strictly prohibited." }, { text: "Report to Childline (1098)", correct: true, feedback: "Childline rescue teams immediately intervene." }] },
  { id: 3, icon: "🛡️", name: "Safe House (POCSO Protection)", category: "Town", desc: "Safe touch and body autonomy awareness.", story: "Understanding confidential reporting rights under POCSO.", choices: [{ text: "Keep secrets about uncomfortable touches", correct: false, feedback: "Always speak up to a trusted adult!" }, { text: "Report immediately under POCSO guidelines", correct: true, feedback: "POCSO provides strict legal protection." }] },
  { id: 4, icon: "🏛️", name: "Panchayat (Child Marriage)", category: "Town", desc: "Preventing underage marriage traditions.", story: "A minor wedding is planned in the community. How do you stop it?", choices: [{ text: "Attend silently", correct: false, feedback: "Child marriage is illegal and punishable." }, { text: "Alert child protection authorities", correct: true, feedback: "PCMA enables immediate legal intervention." }] },
  { id: 5, icon: "🏭", name: "Factory & Brick Kiln", category: "Town", desc: "Hazardous industrial exploitation protection." },
  { id: 6, icon: "🚓", name: "Police Station & SJPU", category: "Town", desc: "Special Juvenile Police Unit protocols for minors." },
  { id: 7, icon: "🍼", name: "Anganwadi Health Centre", category: "Town", desc: "Nutrition, health, and early childhood care rights." },

  // Pillar 2: Legal Library
  { id: 8, icon: "🎓", name: "RTE Act Simple Decoder", category: "Legal", desc: "Plain-language translation of Constitutional Article 21A." },
  { id: 9, icon: "📜", name: "Child Labor Law Guide", category: "Legal", desc: "Prohibited vs. regulated occupations breakdown." },
  { id: 10, icon: "📖", name: "POCSO Act Handbook", category: "Legal", desc: "Child-friendly legal rights during official reporting." },
  { id: 11, icon: "⚖️", name: "Child Marriage Act Guide", category: "Legal", desc: "Legal marriage age criteria and annulment procedures." },
  { id: 12, icon: "🤝", name: "Juvenile Justice Act Viewer", category: "Legal", desc: "Care and protection provisions for children in need." },
  { id: 13, icon: "🇮🇳", name: "Constitutional Rights Hub", category: "Legal", desc: "Overview of fundamental rights guaranteed to Indian minors." },

  // Pillar 3: Myth vs Fact
  { id: 14, icon: "⚡", name: "Myth: Work Over Education", category: "Mythbuster", desc: "Debunking parental forced-dropout misconceptions." },
  { id: 15, icon: "⚡", name: "Myth: Commercial Family Business", category: "Mythbuster", desc: "Clarifying illegal commercial labor in family shops." },
  { id: 16, icon: "⚡", name: "Myth: Custom Supersedes Law", category: "Mythbuster", desc: "Proving statutory law overrules harmful traditional customs." },
  { id: 17, icon: "⚡", name: "Myth: Private Family Matter", category: "Mythbuster", desc: "Establishing that child abuse is never a private matter." },

  // Pillar 4: SOS Safety
  { id: 18, icon: "📞", name: "Childline 1098 Dialer", category: "SOS", desc: "Direct 24/7 emergency toll-free protection helpline." },
  { id: 19, icon: "🚨", name: "National Emergency 112", category: "SOS", desc: "Integrated police, fire, and medical dispatch." },
  { id: 20, icon: "⚖️", name: "NALSA Free Legal Aid", category: "SOS", desc: "Free legal representation services for children and families." },
  { id: 21, icon: "📋", name: "Kid Safety Checklist", category: "SOS", desc: "Interactive personal boundary self-assessment tool." },

  // Pillar 5: Gamification & NGO Toolkit
  { id: 22, icon: "🎮", name: "XP & Streak System", category: "Gamification", desc: "Gamified progression tracked directly via LocalStorage." },
  { id: 23, icon: "🏆", name: "7 Rights Badges Grid", category: "Gamification", desc: "Unlockable visual badges for completed town scenarios." },
  { id: 24, icon: "🎓", name: "Canvas Certificate Generator", category: "Gamification", desc: "Render customizable downloadable 'Rights Champion' certificates." },
  { id: 25, icon: "🎒", name: "School Workshop Presentation Mode", category: "Toolkit", desc: "Full-screen presentation view for classroom smartboards." },
  { id: 26, icon: "🖨️", name: "Printable Worksheet Generator", category: "Toolkit", desc: "Auto-formatted offline worksheets for NGO educators." },
  { id: 27, icon: "📊", name: "Teacher Assessment Rubric", category: "Toolkit", desc: "Evaluator scoring framework for student legal awareness." },
  { id: 28, icon: "🌐", name: "Bilingual Language Switcher", category: "Toolkit", desc: "Instant toggle between English and Hindi text strings." },
  { id: 29, icon: "🔊", name: "Web Audio Sound Engine", category: "Toolkit", desc: "Native browser-synthesized audio feedback on clicks." },
  { id: 30, icon: "💾", name: "LocalStorage Privacy Manager", category: "Toolkit", desc: "Zero-backend client data persistence engine." }
];

let unlockedModules = JSON.parse(localStorage.getItem('saksham_unlocked_30')) || [];

function render30Modules() {
  const container = document.getElementById('modules-30-grid');
  if (!container) return;

  container.innerHTML = MODULES_DATA.map(mod => {
    const isUnlocked = unlockedModules.includes(mod.id);
    return `
      <div class="mod-card ${isUnlocked ? 'unlocked' : ''}" onclick="openModuleModal(${mod.id})">
        <span class="mod-num">#${mod.id}</span>
        <div class="mod-icon">${mod.icon}</div>
        <h4>${mod.name}</h4>
        <p>${mod.desc}</p>
        <span class="mod-status">${isUnlocked ? '🟢 Completed' : '🔒 Tap to Explore'}</span>
      </div>
    `;
  }).join('');

  const progressCount = document.getElementById('total-progress-count');
  if (progressCount) progressCount.innerText = `${unlockedModules.length} / 30 Unlocked`;
}

function openModuleModal(id) {
  const mod = MODULES_DATA.find(m => m.id === id);
  if (!mod) return;

  const modal = document.getElementById('scenario-modal');
  const body = document.getElementById('modal-body');

  if (mod.story && mod.choices) {
    body.innerHTML = `
      <h3>${mod.icon} Module #${mod.id}:${mod.name}</h3>
      <p style="margin: 1rem 0; color: #cbd5e1; font-size: 1.05rem;">${mod.story}</p>
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${mod.choices.map(c => `
          <button class="btn-primary" onclick="handleChoice(${mod.id}, ${c.correct}, '${c.feedback}')">
            ${c.text}
          </button>
        `).join('')}
      </div>
    `;
  } else {
    body.innerHTML = `
      <h3>${mod.icon} Module #${mod.id}:${mod.name}</h3>
      <p style="margin: 1rem 0; color: #cbd5e1;">${mod.desc}</p>
      <span style="color: #fbbf24; font-weight: 700;">Category: ${mod.category}</span>
      <button class="btn-primary" style="margin-top: 1.5rem;
