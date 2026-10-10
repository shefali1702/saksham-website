/* ==========================================================================
   SAKSHAM — BULLETPROOF VISIBLE 30-MODULE INJECTOR
   ========================================================================== */

(function() {
  const BUILDINGS_30 = [
    { id: 1, name: "Primary School", district: "Education", icon: "🏫", law: "Article 21A (RTE Act)" },
    { id: 2, name: "High School", district: "Education", icon: "🎓", law: "Right to Free Secondary Care" },
    { id: 3, name: "Library Hub", district: "Education", icon: "📚", law: "Right to Knowledge & Digital Access" },
    { id: 4, name: "Vocational Centre", district: "Education", icon: "🛠️", law: "Skill Development Protection" },
    { id: 5, name: "Anganwadi Care", district: "Education", icon: "🍼", law: "POSHAN Abhiyaan & Early Care" },
    { id: 6, name: "Play School", district: "Education", icon: "🎨", law: "Early Childhood Care Rights" },
    { id: 7, name: "Police Station", district: "Legal", icon: "🚓", law: "Special Juvenile Police Unit (SJPU)" },
    { id: 8, name: "Safe House", district: "Legal", icon: "🛡️", law: "POCSO Confidential Protection" },
    { id: 9, name: "Family Court", district: "Legal", icon: "⚖️", law: "Child-Friendly Legal Proceedings" },
    { id: 10, name: "NALSA Legal Aid", district: "Legal", icon: "🏛️", law: "Free Legal Representation Rights" },
    { id: 11, name: "CWC Office", district: "Legal", icon: "📋", law: "Child Welfare Committee Authority" },
    { id: 12, name: "Rescue Station", district: "Legal", icon: "🚨", law: "1098 Immediate Intervention Unit" },
    { id: 13, name: "Highway Dhaba", district: "Labor", icon: "🍲", law: "Child Labour Prohibition Act" },
    { id: 14, name: "Brick Kiln", district: "Labor", icon: "🏭", law: "Hazardous Employment Ban" },
    { id: 15, name: "Garment Unit", district: "Labor", icon: "🧵", law: "Factory Act Minimum Age Standards" },
    { id: 16, name: "Tea Stall", district: "Labor", icon: "☕", law: "Commercial Establishment Ban" },
    { id: 17, name: "Firecracker Unit", district: "Labor", icon: "💥", law: "Strict Hazardous Occupation Prohibition" },
    { id: 18, name: "Agricultural Farm", district: "Labor", icon: "🌾", law: "Seasonal School Attendance Mandate" },
    { id: 19, name: "Gram Panchayat", district: "Civic", icon: "🏛️", law: "Prohibition of Child Marriage Act" },
    { id: 20, name: "Health Centre", district: "Civic", icon: "🏥", law: "Right to Essential Health & Vaccines" },
    { id: 21, name: "Shelter Home", district: "Civic", icon: "🏡", law: "Juvenile Justice Care & Protection" },
    { id: 22, name: "Youth Club", district: "Civic", icon: "⚽", law: "Right to Recreation & Play" },
    { id: 23, name: "Helpline Post", district: "Civic", icon: "📞", law: "Childline 1098 Emergency Access" },
    { id: 24, name: "Nutrition Hub", district: "Civic", icon: "🍎", law: "Mid-Day Meal Scheme Right" },
    { id: 25, name: "Media Station", district: "Awareness", icon: "📻", law: "Right to Expression & Voice" },
    { id: 26, name: "Open Theatre", district: "Awareness", icon: "🎭", law: "Cultural Rights Awareness" },
    { id: 27, name: "Rights Academy", district: "Awareness", icon: "📖", law: "Constitutional Awareness Training" },
    { id: 28, name: "Innovation Hub", district: "Awareness", icon: "💡", law: "Child Rights Tech Development" },
    { id: 29, name: "Advocacy Forum", district: "Awareness", icon: "📢", law: "Child Participation Rights" },
    { id: 30, name: "Hall of Champions", district: "Awareness", icon: "🏆", law: "Master Rights Certification" }
  ];

  let unlockedList = JSON.parse(localStorage.getItem('saksham_buildings_30')) || [];

  function forceRenderGrid() {
    // Find main container or fallback to body
    let parent = document.querySelector('main') || document.body;
    
    // Check if grid already exists, otherwise create it
    let gridContainer = document.getElementById('forced-30-modules-grid');
    if (!gridContainer) {
      gridContainer = document.createElement('div');
      gridContainer.id = 'forced-30-modules-grid';
      gridContainer.style.cssText = `
        max-width: 1200px;
        margin: 3rem auto;
        padding: 0 1.5rem;
        position: relative;
        z-index: 50;
      `;
      parent.appendChild(gridContainer);
    }

    gridContainer.innerHTML = `
      <div style="background: rgba(30, 27, 75, 0.9); padding: 1.5rem 2rem; border-radius: 20px; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.2); display: flex; justify-content: space-between; align-items: center; backdrop-filter: blur(10px);">
        <h2 style="color: #fff; font-size: 1.5rem; margin: 0;">🚀 SAKSHAM 30-Module Ecosystem</h2>
        <span style="background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 999px; font-weight: bold; font-size: 0.9rem;">
          ${unlockedList.length} / 30 Completed
        </span>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
        ${BUILDINGS_30.map(b => {
          const done = unlockedList.includes(b.id);
          return `
            <div onclick="window.openSakshamModal(${b.id})" style="
              background: ${done ? 'rgba(16, 185, 129, 0.2)' : 'rgba(15, 23, 42, 0.85)'};
              border: 2px solid ${done ? '#10b981' : 'rgba(255, 255, 255, 0.15)'};
              border-radius: 16px;
              padding: 1.25rem;
              text-align: center;
              cursor: pointer;
              transition: transform 0.2s ease, border-color 0.2s ease;
              box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            ">
              <span style="font-size: 2.5rem; display: block; margin-bottom: 0.5rem;">${b.icon}</span>
              <h4 style="color: #fff; font-size: 1rem; margin-bottom: 0.2rem;">#${b.id}${b.name}</h4>
              <p style="color: #94a3b8; font-size: 0.75rem; margin-bottom: 0.75rem;">${b.district}</p>
              <span style="display: inline-block; font-size: 0.75rem; font-weight: bold; color: ${done ? '#34d399' : '#fbbf24'};">
                ${done ? '🟢 Completed' : '🔒 Tap to Explore'}
              </span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  window.openSakshamModal = function(id) {
    const b = BUILDINGS_30.find(i => i.id === id);
    if (!b) return;

    let modal = document.getElementById('saksham-popup-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'saksham-popup-modal';
      modal.style.cssText = `
        position: fixed; inset: 0; background: rgba(0,0,0,0.85);
        display: flex; align-items: center; justify-content: center; z-index: 99999;
        backdrop-filter: blur(8px);
      `;
      modal.innerHTML = `
        <div style="background: #1e1b4b; border: 1px solid rgba(255,255,255,0.2); padding: 2.5rem; border-radius: 24px; max-width: 480px; width: 90%; color: #fff; position: relative; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
          <button onclick="document.getElementById('saksham-popup-modal').style.display='none'" style="position: absolute; top: 1rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 1.5rem; cursor: pointer;">✕</button>
          <div id="saksham-modal-content"></div>
        </div>
      `;
      document.body.appendChild(modal);
    } else {
      modal.style.display = 'flex';
    }

    document.getElementById('saksham-modal-content').innerHTML = `
      <div style="text-align: center;">
        <span style="font-size: 3.5rem; display: block; margin-bottom: 0.5rem;">${b.icon}</span>
        <h2 style="margin: 0 0 0.5rem 0; color: #fff; font-size: 1.5rem;">${b.name}</h2>
        <p style="color: #fbbf24; font-weight: bold; margin-bottom: 1.25rem;">District: ${b.district}</p>
        <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: left; border: 1px solid rgba(255,255,255,0.1);">
          <strong style="color: #38bdf8;">⚖️ Governed Law:</strong><br><span style="color: #cbd5e1; font-size: 0.95rem;">${b.law}</span>
        </div>
        <button onclick="window.markCompleted(${b.id})" style="background: linear-gradient(135deg, #6366f1, #a855f7); color: white; border: none; padding: 0.85rem 1.5rem; border-radius: 999px; font-weight: bold; cursor: pointer; width: 100%; box-shadow: 0 4px 15px rgba(99,102,241,0.4);">
          Mark Module Complete ✅
        </button>
      </div>
    `;
  };

  window.markCompleted = function(id) {
    if (!unlockedList.includes(id)) {
      unlockedList.push(id);
      localStorage.setItem('saksham_buildings_30', JSON.stringify(unlockedList));
      forceRenderGrid();
    }
    document.getElementById('saksham-popup-modal').style.display = 'none';
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', forceRenderGrid);
  } else {
    forceRenderGrid();
  }
})();
