/* ==========================================================================
   SAKSHAM — CORE APP ENGINE (State, Audio, Canvas & Scenarios)
   ========================================================================== */

// --- 1. SPA Navigation Switcher ---
function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

  const targetTab = document.getElementById(`tab-${tabId}`);
  if (targetTab) targetTab.classList.add('active');

  // Highlight button
  const activeBtn = Array.from(document.querySelectorAll('.nav-btn'))
    .find(btn => btn.getAttribute('onclick').includes(tabId));
  if (activeBtn) activeBtn.classList.add('active');

  SakshamAudio.playBeep();
}

// --- 2. Web Audio API Sound Synthesizer (Zero Assets Needed) ---
const SakshamAudio = {
  ctx: null,
  enabled: true,

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  toggle() {
    this.enabled = !this.enabled;
    document.getElementById('sound-toggle').innerText = this.enabled ? '🔊 Sound' : '🔇 Muted';
  },

  playBeep(freq = 440, duration = 0.1) {
    if (!this.enabled) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
};

// --- 3. Main Application Engine & State ---
const SakshamEngine = {
  unlocked: JSON.parse(localStorage.getItem('saksham_unlocked')) || [],

  scenarios: {
    school: {
      title: "🏫 School — Right to Education",
      story: "Raju's parents want him to stop going to school to work in the field. What should he do?",
      choices: [
        { text: "Quit school quietly.", correct: false, feedback: "Incorrect. Education is every child's right up to age 14!" },
        { text: "Inform the teacher & school management committee.", correct: true, feedback: "Correct! Article 21A guarantees free & compulsory education." }
      ]
    },
    dhaba: {
      title: "🍲 Dhaba — Child Labor Protection",
      story: "11-year-old Chotu works 12 hours a day at a highway tea stall instead of studying.",
      choices: [
        { text: "Ignore it.", correct: false, feedback: "Incorrect. Child labor under 14 is completely prohibited." },
        { text: "Report to Childline (1098).", correct: true, feedback: "Correct! Calling 1098 alerts child protection services." }
      ]
    }
  },

  openBuilding(id) {
    const sc = this.scenarios[id] || {
      title: "🏛️ Community Center",
      story: "Learn about your legal rights and local panchayat protection.",
      choices: [{ text: "Understand Law", correct: true, feedback: "You learned your fundamental right!" }]
    };

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <h3>${sc.title}</h3>
      <p style="margin: 1rem 0; color: #cbd5e1;">${sc.story}</p>
      <div style="display:flex; flex-direction:column; gap:0.75rem;">
        ${sc.choices.map((c, idx) => `
          <button class="btn-primary" onclick="SakshamEngine.makeChoice('${id}', ${c.correct}, '${c.feedback}')">
            ${c.text}
          </button>
        `).join('')}
      </div>
    `;

    document.getElementById('scenario-modal').classList.remove('hidden');
  },

  makeChoice(buildingId, isCorrect, feedback) {
    if (isCorrect) {
      if (!this.unlocked.includes(buildingId)) {
        this.unlocked.push(buildingId);
        localStorage.setItem('saksham_unlocked', JSON.stringify(this.unlocked));
      }
      alert(`🎉 Correct! ${feedback}`);
      this.updateUI();
    } else {
      alert(`❌ ${feedback}`);
    }
    this.closeModal();
  },

  closeModal() {
    document.getElementById('scenario-modal').classList.add('hidden');
  },

  updateUI() {
    document.getElementById('unlocked-count').innerText = `${this.unlocked.length} / 4`;
    this.unlocked.forEach(id => {
      const el = document.getElementById(`status-${id}`);
      if (el) {
        el.innerText = "Unlocked 🟢";
        el.style.color = "#10b981";
      }
    });
  },

  askGyani(topic) {
    const gyaniText = document.getElementById('gyani-speech');
    if (topic === 'rte') gyaniText.innerText = "Hoo-hoo! The RTE Act ensures every child aged 6-14 gets free education!";
    if (topic === 'labor') gyaniText.innerText = "Child labor under 14 is illegal in India under the Child Labour Act!";
    if (topic === 'help') gyaniText.innerText = "You can dial 1098 anytime for free emergency help!";
  },

  generateCertificate() {
    const name = document.getElementById('user-name-input').value || "Child Rights Champion";
    const canvas = document.getElementById('cert-canvas');
    const ctx = canvas.getContext('2d');

    // Draw Certificate Background
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, 800, 500);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 10;
    ctx.strokeRect(20, 20, 760, 460);

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Outfit';
    ctx.textAlign = 'center';
    ctx.fillText("CERTIFICATE OF ADVOCACY", 400, 100);

    ctx.font = '20px Plus Jakarta Sans';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText("This certifies that", 400, 180);

    ctx.font = '36px Outfit';
    ctx.fillStyle = '#fbbf24';
    ctx.fillText(name, 400, 240);

    ctx.font = '18px Plus Jakarta Sans';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText("has successfully completed the SAKSHAM Child Rights Training.", 400, 310);
  }
};

// --- 4. Ambient Canvas Particle Animation ---
function initCanvasParticles() {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 40 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// Initializing on Page Load
window.addEventListener('DOMContentLoaded', () => {
  SakshamEngine.updateUI();
  initCanvasParticles();
});