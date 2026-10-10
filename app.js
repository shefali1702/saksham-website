/* ==========================================================================
   SAKSHAM — NON-DESTRUCTIVE 30-BUILDING INJECTOR
   ========================================================================== */

const BUILDINGS_30 = [
  { id: 1, name: "Primary School", district: "Education", icon: "🏫", color: "#60a5fa", law: "Article 21A (RTE Act)" },
  { id: 2, name: "High School", district: "Education", icon: "🎓", color: "#3b82f6", law: "Right to Free Secondary Care" },
  { id: 3, name: "Library Hub", district: "Education", icon: "📚", color: "#2563eb", law: "Right to Knowledge & Digital Access" },
  { id: 4, name: "Vocational Centre", district: "Education", icon: "🛠️", color: "#1d4ed8", law: "Skill Development Protection" },
  { id: 5, name: "Anganwadi Care", district: "Education", icon: "🍼", color: "#93c5fd", law: "POSHAN Abhiyaan & Early Care" },
  { id: 6, name: "Play School", district: "Education", icon: "🎨", color: "#bfdbfe", law: "Early Childhood Care Rights" },

  { id: 7, name: "Police Station", district: "Legal", icon: "🚓", color: "#ef4444", law: "Special Juvenile Police Unit (SJPU)" },
  { id: 8, name: "Safe House", district: "Legal", icon: "🛡️", color: "#f87171", law: "POCSO Confidential Protection" },
  { id: 9, name: "Family Court", district: "Legal", icon: "⚖️", color: "#dc2626", law: "Child-Friendly Legal Proceedings" },
  { id: 10, name: "NALSA Legal Aid", district: "Legal", icon: "🏛️", color: "#b91c1c", law: "Free Legal Representation Rights" },
  { id: 11, name: "CWC Office", district: "Legal", icon: "📋", color: "#991b1b", law: "Child Welfare Committee Authority" },
  { id: 12, name: "Rescue Station", district: "Legal", icon: "🚨", color: "#7f1d1d", law: "1098 Immediate Intervention Unit" },

  { id: 13, name: "Highway Dhaba", district: "Labor", icon: "🍲", color: "#f59e0b", law: "Child Labour Prohibition Act" },
  { id: 14, name: "Brick Kiln", district: "Labor", icon: "🏭", color: "#d97706", law: "Hazardous Employment Ban" },
  { id: 15, name: "Garment Unit", district: "Labor", icon: "🧵", color: "#b45309", law: "Factory Act Minimum Age Standards" },
  { id: 16, name: "Tea Stall", district: "Labor", icon: "☕", color: "#92400e", law: "Commercial Establishment Ban" },
  { id: 17, name: "Firecracker Unit", district: "Labor", icon: "💥", color: "#78350f", law: "Strict Hazardous Occupation Prohibition" },
  { id: 18, name: "Agricultural Farm", district: "Labor", icon: "🌾", color: "#fef3c7", law: "Seasonal School Attendance Mandate" },

  { id: 19, name: "Gram Panchayat", district: "Civic", icon: "🏛️", color: "#10b981", law: "Prohibition of Child Marriage Act" },
  { id: 20, name: "Health Centre", district: "Civic", icon: "🏥", color: "#059669", law: "Right to Essential Health & Vaccines" },
  { id: 21, name: "Shelter Home", district: "Civic", icon: "🏡", color: "#047857", law: "Juvenile Justice Care & Protection" },
  { id: 22, name: "Youth Club", district: "Civic", icon: "⚽", color: "#065f46", law: "Right to Recreation & Play" },
  { id: 23, name: "Helpline Post", district: "Civic", icon: "📞", color: "#a7f3d0", law: "Childline 1098 Emergency Access" },
  { id: 24, name: "Nutrition Hub", district: "Civic", icon: "🍎", color: "#6ee7b7", law: "Mid-Day Meal Scheme Right" },

  { id: 25, name: "Media Station", district: "Awareness", icon: "📻", color: "#a855f7", law: "Right to Expression & Voice" },
  { id: 26, name: "Open Theatre", district: "Awareness", icon: "🎭", color: "#9333ea", law: "Cultural Rights Awareness" },
  { id: 27, name: "Rights Academy", district: "Awareness", icon: "📖", color: "#7e22ce", law: "Constitutional Awareness Training" },
  { id: 28, name: "Innovation Hub", district: "Awareness", icon: "💡", color: "#6b21a8", law: "Child Rights Tech Development" },
  { id: 29, name: "Advocacy Forum", district: "Awareness", icon: "📢", color: "#581c87", law: "Child Participation Rights" },
  { id: 30, name: "Hall of Champions", district: "Awareness", icon: "🏆", color: "#f3e8ff", law: "Master Rights Certification" }
];

let unlockedList = JSON.parse(localStorage.getItem('saksham_buildings_30')) || [];

function inject30Buildings() {
  // Look for existing town container or create a grid dynamically
  let target = document.querySelector('.town') || document.getElementById('town-svg-container');
  
  if (!target) {
    // Fallback: create a container at the top of main if missing
    target = document.createElement('div');
    target.id = 'dynamic-30-grid';
    target.style.cssText = 'max-width:1200px; margin: 2rem auto; padding: 1rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;';
    document.body.appendChild(target);
  }

  target.innerHTML = BUILDINGS_30.map(b => {
    const done = unlockedList.includes(b.id);
    return `
      <div onclick="openSakshamModal(${b.id})" style="background: ${done ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.08)'}; border: 2px solid ${done ? '#10b981' : 'rgba(255,255,255,0.2)'}; border-radius: 16px; padding: 1rem; text-align: center; cursor: pointer; transition: transform 0.2s;">
        <span style="font-size: 2.5rem; display:block; margin-bottom:0.5rem;">${b.icon}</span>
        <h4 style="color: #fff; font-size: 1rem; margin-bottom: 0.2rem;">#${b.id} ${b.name}</h4>
        <p style="color: #94a3b8; font-size: 0.75rem;">${b.district}</p>
        <span style="display:inline-block; margin-top:0.5rem; font-size:0.7rem; font-weight:bold; color:${done ? '#10b981' : '#fbbf24'};">${done ? '🟢 Completed' : '🔒 Explore'}</span>
      </div>
    `;
  }).join('');
}

function openSakshamModal(id) {
  const b = BUILDINGS_30.find(i => i.id === id);
  
  // Check if modal already exists, else create one
  let modal = document.getElementById('scenario-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'scenario-modal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(0,0,0,0.8); display:flex; align-items:center; justify-content:center; z-index:9999;';
    modal.innerHTML = `<div id="modal-box" style="background:#1e1b4b; padding:2rem; border-radius:20px; max-width:450px; width:90%; color:#fff; position:relative;">
      <button onclick="document.getElementById('scenario-modal').style.display='none'" style="position:absolute; top:1rem; right:1rem; background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer;">✕</button>
      <div id="modal-body"></div>
    </div>`;
    document.body.appendChild(modal);
  } else {
    modal.style.display = 'flex';
  }

  document.getElementById('modal-body').innerHTML = `
    <div style="text-align:center;">
      <span style="font-size: 3rem;">${b.icon}</span>
      <h2 style="margin: 0.5rem 0; color:#fff;">${b.name}</h2>
      <p style="color:#fbbf24; font-weight:bold; margin-bottom:1rem;">District: ${b.district}</p>
      <p style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:12px; margin-bottom:1.5rem; text-align:left; color:#cbd5e1;">⚖️ <strong>Law:</strong> ${b.law}</p>
      <button onclick="markBuildingDone(${b.id})" style="background:#6366f1; color:white; border:none; padding:0.75rem 1.5rem; border-radius:999px; font-weight:bold; cursor:pointer; width:100%;">Mark Completed ✅</button>
    </div>
  `;
}

function markBuildingDone(id) {
  if (!unlockedList.includes(id)) {
    unlockedList.push(id);
    localStorage.setItem('saksham_buildings_30', JSON.stringify(unlockedList));
    inject30Buildings();
  }
  document.getElementById('scenario-modal').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', inject30Buildings);
