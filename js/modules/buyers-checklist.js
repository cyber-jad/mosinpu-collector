/**
 * BUYER'S FIELD INSPECTION CHECKLIST (GUN SHOW & AUCTION TOOL)
 * 
 * High-yield 10-point inspection protocol designed for fast, in-person
 * evaluations at gun shows, pawn shops, and collector auctions.
 */

window.BuyersChecklist = {
  items: [
    {
      id: "check-1",
      title: "1. Barrel Shank Sniper Proof",
      desc: "Look on top of the barrel shank: Check for Izhevsk 'C in circle' (С) or Tula 'СН' mark.",
      weight: 20
    },
    {
      id: "check-2",
      title: "2. Left-Side Scope Serial Stamping",
      desc: "For Izhevsk rifles: Verify scope serial number stamped on left side of barrel shank. For Tula rifles: Confirm shank is clean (no scope serial).",
      weight: 15
    },
    {
      id: "check-3",
      title: "3. Receiver Type & Notch",
      desc: "Confirm round receiver (NEVER hex!). Check that left receiver wall has a factory-milled clearance notch with dark bluing matching the receiver.",
      weight: 15
    },
    {
      id: "check-4",
      title: "4. Kochetov Mount Screws & Pins",
      desc: "Examine mount: Ensure forged construction, rounded/domed screws, and small locking pins in place. No flat-head machine screws.",
      weight: 12
    },
    {
      id: "check-5",
      title: "5. Scope Turret Screw Heads",
      desc: "Inspect elevation and windage dials: Turret screws must have DOMED / ROUNDED heads. Flat screws indicate reproduction optic.",
      weight: 12
    },
    {
      id: "check-6",
      title: "6. Scope Factory Logo & Finish",
      desc: "Identify factory emblem: Progress #357, Krasnogorsk #393 (plum/purple silumin or black paint), Yoshkar-Ola #297, or Kazan #237. No 'Made in Russia' commercial text.",
      weight: 8
    },
    {
      id: "check-7",
      title: "7. Bolt Handle Geometry & Proofs",
      desc: "Ensure forged bent bolt with smooth bend radius and Izhevsk/Tula arsenal proof on root. No cut-and-welded infantry bolt seams.",
      weight: 8
    },
    {
      id: "check-8",
      title: "8. Receiver Interior (Ex-Sniper Check)",
      desc: "Open bolt and shine light inside left receiver wall: Check whether mount screw holes are open and threaded (genuine sniper) or welded/plugged flush (ex-sniper).",
      weight: 5
    },
    {
      id: "check-9",
      title: "9. Stock Cartouches & Unsanded Wood",
      desc: "Check right buttstock for crisp Tula star or Izhevsk roundel. Verify sharp rectangular finger grooves (unsanded = premium).",
      weight: 3
    },
    {
      id: "check-10",
      title: "10. Import Mark Style & Placement",
      desc: "Identify import stamping: Discreet under-barrel (RGuns/ATI) vs Molot Russian proof vs large receiver laser billboard (Late CAI).",
      weight: 2
    }
  ],

  checkedState: {},

  init() {
    this.renderChecklist();
    this.bindEvents();
  },

  renderChecklist() {
    const container = document.getElementById('buyers-checklist-container');
    if (!container) return;

    const totalScore = this.calculateScore();

    let html = `
      <div class="checklist-wrapper">
        <div class="checklist-header-card">
          <div class="checklist-summary">
            <h3>Field Inspection & Purchase Checklist</h3>
            <p>Perform these 10 rapid checks before buying or bidding on any Mosin-Nagant PU sniper rifle.</p>
          </div>
          <div class="checklist-score-badge">
            <span class="score-val">${totalScore} / 100</span>
            <span class="score-lbl">Inspection Confidence</span>
          </div>
        </div>

        <div class="checklist-items-grid">
          ${this.items.map(item => `
            <label class="checklist-card ${this.checkedState[item.id] ? 'checked' : ''}" data-id="${item.id}">
              <input type="checkbox" class="checklist-input" ${this.checkedState[item.id] ? 'checked' : ''}>
              <div class="checklist-box">
                <span class="chk-mark">✓</span>
              </div>
              <div class="checklist-info">
                <h4 class="chk-title">${item.title} <span class="chk-weight">+${item.weight} pts</span></h4>
                <p class="chk-desc">${item.desc}</p>
              </div>
            </label>
          `).join('')}
        </div>

        <div class="checklist-actions">
          <button type="button" class="btn btn-secondary" id="checklist-reset-btn">
            🔄 Reset Checklist
          </button>
          <button type="button" class="btn btn-primary" onclick="window.print()">
            🖨️ Print / PDF Field Card
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  calculateScore() {
    let score = 0;
    this.items.forEach(item => {
      if (this.checkedState[item.id]) score += item.weight;
    });
    return score;
  },

  bindEvents() {
    const container = document.getElementById('buyers-checklist-container');
    if (!container) return;

    container.addEventListener('change', (e) => {
      const card = e.target.closest('.checklist-card');
      if (card) {
        const id = card.getAttribute('data-id');
        this.checkedState[id] = e.target.checked;
        this.renderChecklist();
      }
    });

    container.addEventListener('click', (e) => {
      if (e.target.closest('#checklist-reset-btn')) {
        this.checkedState = {};
        this.renderChecklist();
      }
    });
  }
};
