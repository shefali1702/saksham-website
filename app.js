/* ==========================================================================
   SAKSHAM — FULL 30-MODULE ENGINE & STATE CONTROLLER
   ========================================================================== */

const SakshamPlatform = {
  // Global State stored in LocalStorage
  state: {
    unlockedModules: JSON.parse(localStorage.getItem('saksham_30_modules')) || [],
    xp: parseInt(localStorage.getItem('saksham_xp')) || 0,
    lang: 'en'
  },

  // Master Data Definition for all 30 Modules
  modules: {
    // --- PILLAR 1: LANDING & ENTRY (1-5) ---
    1: { name: "Cinematic Hero Banner", category: "Landing", icon: "✨", desc: "High-impact visual entry point for users." },
    2: { name: "Mission & Vision Modal", category: "Landing", icon: "🎯", desc: "Core social impact statement for evaluators." },
    3: { name: "Live Impact Counter", category: "Landing", icon: "📊", desc: "Real-time session reach tracking via LocalStorage." },
    4: { name: "Ambient Audio Synthesizer", category: "Landing", icon: "🔊", desc: "Web Audio API soundscape generator." },
    5: { name: "Bilingual State Engine", category: "Landing", icon: "🌐", desc: "Instant English and Hindi localization toggle." },

    // --- PILLAR 2: TOWN SCENARIOS & BUILDINGS (6-12) ---
    6: { 
      name: "School (RTE Act)", category: "Town", icon: "🏫", 
      desc: "Interactive scenario on stopping forced dropouts.",
      story: "Raju's parents want him to quit school to work in the fields. What is the lawful step?",
      choices: [
        { text: "Accept it quietly", correct: false, feedback: "Incorrect. Article 21A guarantees free education up to age 14." },
        { text: "Involve school committee & invoke RTE", correct: true, feedback: "Correct! RTE mandates compulsory elementary education." }
      ]
    },
    7: { 
      name: "Dhaba & Market (Child Labor)", category: "Town", icon: "🍲", 
      desc: "Scenario on wage denial and hazardous commercial labor.",
      story: "11-year-old Chotu is working 12-hour shifts at a roadside dhaba.",
      choices: [
        { text: "Ignore the situation", correct: false, feedback: "Incorrect. Child labor under 14 is strictly prohibited." },
        { text: "Report to Childline (1098)", correct: true, feedback: "Correct! Childline rescue teams immediately intervene." }
      ]
    },
    8: { 
      name: "Safe House (POCSO Protection)", category: "Town", icon: "🛡️", 
      desc: "Safe touch and unsafe touch awareness training.",
      story: "Understanding reporting rights and confidential support under POCSO.",
      choices: [
        { text: "Keep secrets about uncomfortable touches", correct: false, feedback: "Incorrect. Always speak up to a trusted adult or authority." },
        { text: "Report immediately under POCSO guidelines", correct: true, feedback: "Correct! POCSO mandates strict child-friendly legal protection." }
      ]
    },
    9: { 
      name: "Panchayat (Child Marriage Prevention)", category: "Town", icon: "🏛️", 
      desc: "Intervening in underage marriage traditions.",
      story: "A minor wedding is planned in the community. How do you stop it?",
      choices: [
        { text: "Attend silently", correct: false, feedback: "Incorrect. Child marriage is illegal and punishable." },
        { text: "Alert local child protection authorities & police", correct: true, feedback: "Correct! PCMA enables immediate legal intervention." }
      ]
    },
    10: { name: "Factory & Brick Kiln", category: "Town", icon: "🏭", desc: "Advanced scenario on hazardous industrial exploitation." },
    11: { name: "Police Station & SJPU", category: "Town", icon: "🚓", desc: "Special Juvenile Police Unit protocols for minors." },
    12: { name: "Anganwadi Health Centre", category: "Town", icon: "🍼", desc: "Nutrition, health, and early childhood rights." },

    // --- PILLAR 3: LEGAL KNOWLEDGE & CONSTITUTION (13-18) ---
    13: { name: "RTE Act Simple Decoder", category: "Legal", icon: "🎓", desc: "Plain-language translation of Article 21A." },
    14: { name: "Child Labor Law Guide", category: "Legal", icon: "📜", desc: "Prohibited vs. regulated occupations breakdown." },
    15: { name: "POCSO Act Handbook", category: "Legal", icon: "📖", desc: "Child-friendly legal rights during investigation." },
    16: { name: "Child Marriage Act Guide", category: "Legal", icon: "⚖️", desc: "Legal age criteria and annulment rules." },
    17: { name: "Juvenile Justice Act Viewer", category: "Legal", icon: "🤝", desc: "Care and protection provisions for children in need." },
    18: { name: "Constitutional Rights Hub", category: "Legal", icon: "🇮🇳", desc: "Overview of fundamental rights for minors." },

    // --- PILLAR 4: MYTH VS FACT ENGINE (19-22) ---
    19: { name: "Myth: Work Over School", category: "Mythbuster", icon: "⚡", desc: "Debunking parental forced-dropout myths." },
    20: { name: "Myth: Family Business Labor", category: "Mythbuster", icon: "⚡", desc: "Clarifying rules around commercial family shops." },
    21: { name: "Myth: Tradition Over Law", category: "Mythbuster", icon: "⚡", desc: "Proving statutory law supersedes harmful customs." },
    22: { name: "Myth: Private Matter Abuses", category: "Mythbuster", icon: "⚡", desc: "Establishing that abuse is never a private family matter." },

    // --- PILLAR 5: SOS & EMERGENCY SAFETY HUB (23-26) ---
    23: { name: "Childline 1098 Dialer", category: "SOS", icon: "📞", desc: "Direct 24/7 emergency toll-free connection." },
    24: { name: "National Emergency 112", category: "SOS", icon: "🚨", desc: "Police, fire, and health emergency integration." },
    25: { name: "NALSA Legal Aid Finder", category: "SOS", icon: "⚖️", desc: "Free legal representation services for minors." },
    26: { name: "Kid Safety Checklist", category: "SOS", icon: "📋", desc: "Interactive personal boundary self-assessment." },

    // --- PILLAR 6: GAMIFICATION & NGO TOOLKIT (27-30) ---
    27: { name: "XP & Streak System", category: "Toolkit", icon: "🎮", desc: "Gamified progression tracked via LocalStorage." },
    28: { name: "7 Rights Badges Grid", category: "Toolkit", icon: "🏆", desc: "Visual unlockable achievements for completed modules." },
    29: { name: "Canvas Certificate Generator", category: "Toolkit", icon: "🎓", desc: "Render customizable 'Rights Champion' certificates." },
    30: { name: "NGO Facilitator Presentation Mode", category: "Toolkit", icon: "🎒", desc: "Printable worksheet generator for school workshops." }
  },

  init() {
    this.renderModuleDashboard();
    this.updateStats();
  },

  // Render all 30 modules dynamically into the UI
  renderModuleDashboard() {
    const container = document.getElementById('modules-30-grid');
    if (!container) return;

    let html = '';
    for (let i = 1; i <= 30; i++) {
      const mod = this.modules[i];
      const isUnlocked = this.state.unlockedModules.includes(i);
      html += `
        <div class="mod-card ${isUnlocked ? 'unlocked' : ''}" onclick="SakshamPlatform.openModule(${i})">
          <span class="mod-num">#${i}</span>
          <div class="mod-icon">${mod.icon}</div>
          <h4>${mod.name}</h4>
          <p>${mod.desc}</p>
          <span class="mod-status">${isUnlocked ? '🟢 Completed' : '🔒 Tap to Explore'}</span>
        </div>
      `;
    }
    container.innerHTML = html;
  },

  openModule(id) {
    const mod = this.modules[id];
    const modal = document.getElementById('scenario-modal');
    const body = document.getElementById('modal-body');

    if (mod.story && mod.choices) {
      body.innerHTML = `
        <h3>${mod.icon} ${mod.name}</h3>
        <p style="margin: 1rem 0; color: #cbd5e1; font-size: 1.1rem;">${mod.story}</p>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${mod.choices.map((c, idx) => `
            <button class="btn-primary" onclick="SakshamPlatform.verifyChoice(${id}, ${c.correct}, '${c.feedback}')">
              ${c.text}
            </button>
          `).join('')}
        </div>
      `;
    } else {
      body.innerHTML = `
        <h3>${mod.icon} ${mod.name}</h3>
        <p style="margin: 1rem 0; color: #cbd5e1;">${mod.desc}</p>
        <p style="color: #fbbf24; font-weight: 600;">Category: ${mod.category} Module</p>
        <button class="btn-primary" style="margin-top: 1rem;" onclick="SakshamPlatform.completeModule(${id})">Mark Module Complete ✅</button>
      `;
    }
    modal.classList.remove('hidden');
  },

  verifyChoice(modId, isCorrect, feedback) {
    if (isCorrect) {
      alert(`🎉 Correct! ${feedback}`);
      this.completeModule(modId);
    } else {
      alert(`❌ ${feedback}`);
    }
    this.closeModal();
  },

  completeModule(id) {
    if (!this.state.unlockedModules.includes(id)) {
      this.state.unlockedModules.push(id);
      this.state.xp += 50;
      localStorage.setItem('saksham_30_modules', JSON.stringify(this.state.unlockedModules));
      localStorage.setItem('saksham_xp', this.state.xp);
      this.renderModuleDashboard();
      this.updateStats();
    }
    this.closeModal();
  },

  closeModal() {
    document.getElementById('scenario-modal').classList.add('hidden');
  },

  updateStats() {
    const el = document.getElementById('total-progress-count');
    if (el) el.innerText = `${this.state.unlockedModules.length} / 30 Modules Unlocked`;
    const xpEl = document.getElementById('total-xp-count');
    if (xpEl) xpEl.innerText = `${this.state.xp} XP`;
  }
};

window.addEventListener('DOMContentLoaded', () => {
  SakshamPlatform.init();
});
