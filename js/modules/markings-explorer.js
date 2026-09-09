/**
 * TECHNICAL MARKINGS & INTERACTIVE OPTICS SIMULATOR
 * 
 * Includes live ballistic rangefinder simulator, vector proof diagrams,
 * factory logos, and turret screw cross-sections.
 */

window.MarkingsExplorer = {
  currentTab: 'barrel-shank',  // which sub-tab is active (see getTabContent)
  simRange: 300,                // reticle simulator's current target distance in meters

  init() {
    this.renderExplorer();
    this.bindEvents();
  },

  // Renders the tab strip plus whichever tab's content is currently active.
  // Called on init and again every time a tab is clicked (full re-render,
  // not just a content swap, since the tab strip's "active" state changes too).
  renderExplorer() {
    const container = document.getElementById('markings-explorer-container');
    if (!container) return;

    let html = `
      <div class="explorer-wrapper">
        <!-- Subnavigation Pills -->
        <div class="explorer-tabs">
          <button type="button" class="tab-btn ${this.currentTab === 'barrel-shank' ? 'active' : ''}" data-tab="barrel-shank">
            🎯 Barrel Shank Proofs (Izhevsk vs Tula)
          </button>
          <button type="button" class="tab-btn ${this.currentTab === 'reticle-sim' ? 'active' : ''}" data-tab="reticle-sim">
            🔭 Interactive 3.5x Reticle Simulator
          </button>
          <button type="button" class="tab-btn ${this.currentTab === 'factory-logos' ? 'active' : ''}" data-tab="factory-logos">
            🏭 Scope Factory Logos (5 Plants)
          </button>
          <button type="button" class="tab-btn ${this.currentTab === 'optics-screws' ? 'active' : ''}" data-tab="optics-screws">
            🔧 Turret Screws & Construction
          </button>
          <button type="button" class="tab-btn ${this.currentTab === 'mount-receiver' ? 'active' : ''}" data-tab="mount-receiver">
            🔩 Kochetov Mount & Receiver Milling
          </button>
          <button type="button" class="tab-btn ${this.currentTab === 'stock-cartouches' ? 'active' : ''}" data-tab="stock-cartouches">
            🌲 Stock Cartouches & Unsanded Wood
          </button>
        </div>

        <!-- Tab Content Area -->
        <div class="explorer-content" id="explorer-tab-content">
          ${this.getTabContent(this.currentTab)}
        </div>
      </div>
    `;

    container.innerHTML = html;
    if (this.currentTab === 'reticle-sim') {
      this.bindSimulatorEvents();
    }
  },

  // Delegated click handler for the whole explorer: switching sub-tabs, and
  // (on the barrel-shank tab) clicking a numbered SVG hotspot to show its
  // writeup in the detail panel.
  bindEvents() {
    const container = document.getElementById('markings-explorer-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const tabBtn = e.target.closest('.tab-btn');
      if (tabBtn) {
        this.currentTab = tabBtn.getAttribute('data-tab');
        this.renderExplorer();
        return;
      }

      // Hotspot click handler
      const hotspot = e.target.closest('.diagram-hotspot');
      if (hotspot) {
        const hotspotId = hotspot.getAttribute('data-hotspot');
        this.showHotspotDetail(hotspotId);
      }
    });
  },

  // Only relevant on the reticle-sim tab: wires the distance slider to
  // updateSimulatorTelemetry(). Re-bound every time that tab is (re)rendered,
  // since renderExplorer() replaces the slider element via innerHTML.
  bindSimulatorEvents() {
    const rangeSlider = document.getElementById('sim-range-slider');
    if (!rangeSlider) return;

    rangeSlider.addEventListener('input', (e) => {
      this.simRange = parseInt(e.target.value, 10);
      this.updateSimulatorTelemetry();
    });
  },

  // Recomputes the three telemetry readouts (BDC drum, flight time, drop)
  // and rescales the target silhouette as the range slider moves, patching
  // the DOM directly rather than re-rendering — this runs on every 'input'
  // event while dragging, so a full innerHTML replace would be too slow/jittery.
  // NOTE: the same three formulas are duplicated in getReticleSimulatorView()
  // below for the initial paint (before any slider 'input' event has fired);
  // if you change the ballistics math here, update it there too.
  updateSimulatorTelemetry() {
    const r = this.simRange;
    const badge = document.getElementById('sim-range-val');
    const drumVal = document.getElementById('sim-drum-val');
    const timeVal = document.getElementById('sim-time-val');
    const dropVal = document.getElementById('sim-drop-val');
    const target = document.getElementById('sim-target-group');

    if (badge) badge.textContent = `${r} Meters (${Math.round(r * 1.09361)} yds)`;
    
    // Drum calculation: 100m = 1, 300m = 3, etc.
    const drumNum = (r / 100).toFixed(1);
    if (drumVal) drumVal.textContent = `Drum #${drumNum.replace('.0', '')}`;

    // Flight time for 7.62x54R 147gr LPS (approx ~865 m/s muzzle)
    const flightSec = (r / (865 - (r * 0.45))).toFixed(2);
    if (timeVal) timeVal.textContent = `${flightSec}s`;

    // Bullet drop in inches (approx ballistic table)
    let dropInches = 0;
    if (r === 100) dropInches = 0;
    else if (r <= 300) dropInches = ((r - 100) * 0.08).toFixed(1);
    else if (r <= 600) dropInches = (16 + (r - 300) * 0.28).toFixed(1);
    else dropInches = (100 + (r - 600) * 0.65).toFixed(1);
    if (dropVal) dropVal.textContent = `${dropInches}" Drop`;

    // Scale target inside scope view (inverse scale from 100m to 1000m)
    if (target) {
      const scale = Math.max(0.2, (1 - (r - 100) / 1100));
      target.setAttribute('transform', `translate(160, 160) scale(${scale}) translate(-160, -160)`);
    }
  },

  // Looks up hotspotId in the hotspotData table (bottom of this file) and
  // renders its writeup into the detail panel beside the barrel-shank diagram.
  showHotspotDetail(hotspotId) {
    const detailBox = document.getElementById('hotspot-detail-box');
    if (!detailBox) return;

    const data = this.hotspotData[hotspotId];
    if (!data) return;

    detailBox.innerHTML = `
      <div class="detail-card animate-fade-in">
        <div class="detail-badge ${data.isAuthentic ? 'badge-auth' : 'badge-alert'}">${data.badge}</div>
        <h4 class="detail-title">${data.title}</h4>
        <p class="detail-text">${data.description}</p>
        <div class="detail-collector-note">
          <strong>Collector Rule:</strong> ${data.collectorRule}
        </div>
      </div>
    `;
  },

  // Returns the HTML string for one sub-tab. Each tab's markup lives in its
  // own get*View() method below (mostly static content + inline SVG diagrams).
  getTabContent(tab) {
    switch (tab) {
      case 'barrel-shank':
        return this.getBarrelShankView();
      case 'reticle-sim':
        return this.getReticleSimulatorView();
      case 'factory-logos':
        return this.getFactoryLogosView();
      case 'optics-screws':
        return this.getOpticsScrewsView();
      case 'mount-receiver':
        return this.getMountView();
      case 'stock-cartouches':
        return this.getStockView();
      default:
        return this.getBarrelShankView();
    }
  },

  getReticleSimulatorView() {
    const r = this.simRange;
    const drumNum = (r / 100).toFixed(1).replace('.0', '');
    const flightSec = (r / (865 - (r * 0.45))).toFixed(2);

    return `
      <div class="reticle-simulator-card">
        <div class="reticle-sim-grid">
          <!-- Left: Scope Viewport -->
          <div class="scope-viewport-container">
            <div class="scope-viewport-wrap">
              <svg viewBox="0 0 320 320" class="reticle-svg-sim" aria-label="PU Scope Sight Simulator">
                <!-- Military Human Silhouette Target inside Viewport -->
                <g id="sim-target-group" class="sim-target-silhouette" transform="translate(160, 160) scale(${Math.max(0.2, (1 - (r - 100) / 1100))}) translate(-160, -160)">
                  <!-- Head -->
                  <circle cx="160" cy="115" r="14" fill="#334155"/>
                  <!-- Torso and Shoulders -->
                  <path d="M 135 135 L 185 135 L 180 200 L 140 200 Z" fill="#334155"/>
                </g>

                <!-- Soviet PU 3-Post Reticle -->
                <!-- Horizontal Aiming Posts -->
                <line x1="20" y1="160" x2="115" y2="160" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
                <line x1="205" y1="160" x2="300" y2="160" stroke="#0f172a" stroke-width="5" stroke-linecap="round"/>
                
                <!-- Center Pointed Post -->
                <polygon points="160,160 156,290 164,290" fill="#0f172a"/>
                
                <!-- Sight Zero Dot (Red) -->
                <circle cx="160" cy="160" r="2.5" fill="#ef4444"/>
              </svg>
            </div>
          </div>

          <!-- Right: Interactive Controls & Ballistics -->
          <div class="reticle-controls-panel">
            <div class="sim-panel-header">
              <span class="section-tag">LIVE OPTICAL SIMULATOR</span>
              <h3>Soviet 3.5x PU Scope & BDC Ballistics</h3>
              <p>Drag the distance slider below to see how target scale changes inside the 3.5x fixed magnification optic and how the elevation drum compensates for 7.62×54mmR Type L (147gr) bullet drop.</p>
            </div>

            <!-- Slider -->
            <div class="range-slider-group">
              <div class="range-slider-header">
                <label for="sim-range-slider"><strong>Target Distance:</strong></label>
                <span class="range-val-badge" id="sim-range-val">${r} Meters (${Math.round(r * 1.09361)} yds)</span>
              </div>
              <input type="range" id="sim-range-slider" class="range-slider" min="100" max="1000" step="50" value="${r}">
            </div>

            <!-- Live Telemetry Grid -->
            <div class="telemetry-metrics-grid">
              <div class="telemetry-card">
                <div class="telemetry-val" id="sim-drum-val">Drum #${drumNum}</div>
                <div class="telemetry-lbl">BDC Elevation Dial</div>
              </div>
              <div class="telemetry-card">
                <div class="telemetry-val" id="sim-time-val">${flightSec}s</div>
                <div class="telemetry-lbl">Flight Time</div>
              </div>
              <div class="telemetry-card">
                <div class="telemetry-val" id="sim-drop-val">16.0" Drop</div>
                <div class="telemetry-lbl">Gravity Compensation</div>
              </div>
            </div>

            <!-- Reticle Rangefinding Formula -->
            <div class="detail-collector-note">
              <strong>Soviet Rangefinding Rule:</strong> The width between the two horizontal posts is exactly <strong>7 mils (7 thousandths of distance)</strong>. A standing 1.7m infantry soldier fitting exactly between the tips of the horizontal posts is located at 250 meters!
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getBarrelShankView() {
    return `
      <div class="diagram-layout">
        <div class="diagram-visual-panel">
          <div class="diagram-header">
            <h3>Technical Blueprint: Izhevsk vs. Tula Barrel Shanks</h3>
            <p>Click any numbered circle below to view specific proofmarks, serial number rules, and factory stamping criteria.</p>
          </div>

          <div class="shank-comparison-grid">
            <!-- Izhevsk Shank Card -->
            <div class="shank-card">
              <div class="shank-card-title">Izhevsk Factory #74</div>
              <div class="shank-svg-container">
                <svg viewBox="0 0 320 400" class="diagram-svg" aria-label="Izhevsk barrel shank diagram">
                  <!-- Barrel Outline -->
                  <path d="M 60 20 L 260 20 L 250 380 L 70 380 Z" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
                  <!-- Receiver Line -->
                  <line x1="50" y1="380" x2="270" y2="380" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4"/>
                  <text x="160" y="395" fill="#475569" font-size="11" font-weight="bold" text-anchor="middle">RECEIVER / BARREL JOINT</text>

                  <!-- C in Circle Sniper Proof (Hotspot 1) -->
                  <g class="diagram-hotspot" data-hotspot="izh-c-circle" transform="translate(160, 70)">
                    <circle cx="0" cy="0" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
                    <circle cx="0" cy="0" r="12" fill="none" stroke="#0f172a" stroke-width="1.8"/>
                    <text x="0" y="5" fill="#0f172a" font-family="'JetBrains Mono', monospace" font-weight="bold" font-size="15" text-anchor="middle">С</text>
                    <circle cx="16" cy="-14" r="9" fill="#2563eb"/>
                    <text x="16" y="-11" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">1</text>
                  </g>

                  <!-- Soviet Crest / Izhevsk Triangle Arrow (Hotspot 2) -->
                  <g class="diagram-hotspot" data-hotspot="izh-crest" transform="translate(160, 130)">
                    <polygon points="0,-18 16,12 -16,12" fill="none" stroke="#0f172a" stroke-width="1.8"/>
                    <line x1="0" y1="10" x2="0" y2="-12" stroke="#0f172a" stroke-width="1.8"/>
                    <polygon points="0,-16 -4,-8 4,-8" fill="#0f172a"/>
                    <circle cx="20" cy="-14" r="9" fill="#2563eb"/>
                    <text x="20" y="-11" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">2</text>
                  </g>

                  <!-- Year Date Stamp (Hotspot 3) -->
                  <g class="diagram-hotspot" data-hotspot="izh-date" transform="translate(160, 190)">
                    <text x="0" y="0" fill="#0f172a" font-family="'JetBrains Mono', monospace" font-size="19" font-weight="bold" text-anchor="middle">1943 г.</text>
                    <circle cx="50" cy="-6" r="9" fill="#2563eb"/>
                    <text x="50" y="-3" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">3</text>
                  </g>

                  <!-- Rifle Serial Number (Hotspot 4) -->
                  <g class="diagram-hotspot" data-hotspot="izh-serial" transform="translate(160, 245)">
                    <text x="0" y="0" fill="#0f172a" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="bold" text-anchor="middle">№ ТБ 4921</text>
                    <circle cx="65" cy="-6" r="9" fill="#2563eb"/>
                    <text x="65" y="-3" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">4</text>
                  </g>

                  <!-- Left-Side Scope Serial Stamping (Hotspot 5) -->
                  <g class="diagram-hotspot" data-hotspot="izh-scope-serial" transform="translate(80, 310)">
                    <rect x="-10" y="-16" width="68" height="42" fill="#eff6ff" stroke="#2563eb" stroke-width="1.5" rx="3"/>
                    <text x="24" y="0" fill="#2563eb" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" text-anchor="middle">№ 441920</text>
                    <text x="24" y="15" fill="#64748b" font-size="9" font-weight="bold" text-anchor="middle">(Scope S/N)</text>
                    <circle cx="-12" cy="-14" r="9" fill="#2563eb"/>
                    <text x="-12" y="-11" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">5</text>
                  </g>
                </svg>
              </div>
            </div>

            <!-- Tula Shank Card -->
            <div class="shank-card">
              <div class="shank-card-title">Tula Factory #535</div>
              <div class="shank-svg-container">
                <svg viewBox="0 0 320 400" class="diagram-svg" aria-label="Tula barrel shank diagram">
                  <!-- Barrel Outline -->
                  <path d="M 60 20 L 260 20 L 250 380 L 70 380 Z" fill="#f8fafc" stroke="#64748b" stroke-width="2"/>
                  <!-- Receiver Line -->
                  <line x1="50" y1="380" x2="270" y2="380" stroke="#2563eb" stroke-width="2.5" stroke-dasharray="4"/>
                  <text x="160" y="395" fill="#475569" font-size="11" font-weight="bold" text-anchor="middle">RECEIVER / BARREL JOINT</text>

                  <!-- Cyrillic CH Sniper Proof (Hotspot 6) -->
                  <g class="diagram-hotspot" data-hotspot="tula-ch" transform="translate(160, 65)">
                    <circle cx="0" cy="0" r="18" fill="#eff6ff" stroke="#2563eb" stroke-width="1.8"/>
                    <text x="0" y="7" fill="#2563eb" font-family="'JetBrains Mono', monospace" font-weight="bold" font-size="20" text-anchor="middle">СН</text>
                    <circle cx="22" cy="-14" r="9" fill="#2563eb"/>
                    <text x="22" y="-11" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">6</text>
                  </g>

                  <!-- Tula Star with Arrow (Hotspot 7) -->
                  <g class="diagram-hotspot" data-hotspot="tula-star" transform="translate(160, 130)">
                    <polygon points="0,-18 5,-5 18,-5 8,4 12,18 0,9 -12,18 -8,4 -18,-5 -5,-5" fill="none" stroke="#0f172a" stroke-width="1.8"/>
                    <line x1="0" y1="12" x2="0" y2="-12" stroke="#0f172a" stroke-width="1.8"/>
                    <circle cx="24" cy="-14" r="9" fill="#2563eb"/>
                    <text x="24" y="-11" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">7</text>
                  </g>

                  <!-- Year Date Stamp (Hotspot 8) -->
                  <g class="diagram-hotspot" data-hotspot="tula-date" transform="translate(160, 195)">
                    <text x="0" y="0" fill="#0f172a" font-family="'JetBrains Mono', monospace" font-size="19" font-weight="bold" text-anchor="middle">1944 г.</text>
                    <circle cx="50" cy="-6" r="9" fill="#2563eb"/>
                    <text x="50" y="-3" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">8</text>
                  </g>

                  <!-- Rifle Serial Number (Hotspot 9) -->
                  <g class="diagram-hotspot" data-hotspot="tula-serial" transform="translate(160, 255)">
                    <text x="0" y="0" fill="#0f172a" font-family="'JetBrains Mono', monospace" font-size="17" font-weight="bold" text-anchor="middle">№ ГБ 1084</text>
                    <circle cx="65" cy="-6" r="9" fill="#2563eb"/>
                    <text x="65" y="-3" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">9</text>
                  </g>

                  <!-- NO Scope Serial on Tula Shank Rule (Hotspot 10) -->
                  <g class="diagram-hotspot" data-hotspot="tula-no-scope-serial" transform="translate(80, 315)">
                    <rect x="-15" y="-14" width="78" height="38" fill="#fff1f2" stroke="#f43f5e" stroke-width="1.5" stroke-dasharray="3" rx="3"/>
                    <text x="24" y="0" fill="#f43f5e" font-size="10" font-weight="bold" text-anchor="middle">NO SCOPE S/N</text>
                    <text x="24" y="14" fill="#64748b" font-size="8" font-weight="bold" text-anchor="middle">(Clean Metal)</text>
                    <circle cx="-16" cy="-14" r="9" fill="#f43f5e"/>
                    <text x="-16" y="-11" fill="#ffffff" font-weight="bold" font-size="10" text-anchor="middle">10</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Hotspot Detail Explanation Box -->
        <div class="diagram-detail-panel" id="hotspot-detail-box">
          <div class="detail-card">
            <div class="detail-badge badge-auth">INSPECTOR READY</div>
            <h4 class="detail-title">Select Any Hotspot Number</h4>
            <p class="detail-text">Click on any numbered circle above to inspect the specific Soviet military marking criteria, factory rules, and authentication tips documented in Alexey's research on m9130.info.</p>
            <div class="detail-collector-note">
              <strong>Quick Rule:</strong> An Izhevsk sniper ALWAYS had its scope number stamped on the left barrel shank from the factory; a Tula sniper did NOT have it on the shank!
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getFactoryLogosView() {
    return `
      <div class="factory-logos-grid">
        <!-- Logo Card 1: Factory #357 Progress -->
        <div class="logo-card">
          <div class="logo-svg-wrap">
            <svg viewBox="0 0 160 120" class="factory-logo-svg" aria-label="Factory 357 Progress Logo">
              <path d="M 40 100 L 40 50 A 40 40 0 0 1 120 50 L 120 100 Z" fill="none" stroke="#0f172a" stroke-width="3.5"/>
              <polygon points="80,35 105,80 55,80" fill="none" stroke="#2563eb" stroke-width="2.5"/>
              <line x1="80" y1="45" x2="80" y2="80" stroke="#0f172a" stroke-width="2"/>
              <line x1="60" y1="65" x2="100" y2="65" stroke="#0f172a" stroke-width="2"/>
            </svg>
          </div>
          <div class="logo-info">
            <span class="logo-plant-num">FACTORY #357 NKV</span>
            <h4>"Progress" (Leningrad / Omsk)</h4>
            <p>The primary and most prolific wartime scope producer (1940–1945). Features a tombstone arch enclosing an inverted optical prism and reticle crosshair.</p>
          </div>
        </div>

        <!-- Logo Card 2: Factory #393 Krasnogorsk -->
        <div class="logo-card">
          <div class="logo-svg-wrap">
            <svg viewBox="0 0 160 120" class="factory-logo-svg" aria-label="Factory 393 Krasnogorsk Logo">
              <polygon points="35,35 125,35 105,85 55,85" fill="none" stroke="#2563eb" stroke-width="3.5"/>
              <line x1="20" y1="60" x2="140" y2="60" stroke="#2563eb" stroke-width="3"/>
              <polygon points="140,60 125,52 125,68" fill="#2563eb"/>
            </svg>
          </div>
          <div class="logo-info">
            <span class="logo-plant-num">FACTORY #393 NKV</span>
            <h4>Krasnogorsk (Moscow Oblast)</h4>
            <p>Trapezoid prism pierced by a horizontal arrow. Manufactured scopes from 1943 to April 1944 using steel and silumin aluminum-alloy bodies.</p>
          </div>
        </div>

        <!-- Logo Card 3: Factory #297 Yoshkar-Ola -->
        <div class="logo-card">
          <div class="logo-svg-wrap">
            <svg viewBox="0 0 160 120" class="factory-logo-svg" aria-label="Factory 297 Yoshkar-Ola Logo">
              <path d="M 35 85 A 50 50 0 0 1 125 85" fill="none" stroke="#0f172a" stroke-width="3.5"/>
              <line x1="35" y1="85" x2="125" y2="85" stroke="#0f172a" stroke-width="2.5"/>
              <polygon points="80,45 95,65 80,85 65,65" fill="#2563eb" stroke="#2563eb" stroke-width="2"/>
              <line x1="80" y1="45" x2="80" y2="30" stroke="#0f172a" stroke-width="2"/>
              <line x1="60" y1="52" x2="48" y2="40" stroke="#0f172a" stroke-width="2"/>
              <line x1="100" y1="52" x2="112" y2="40" stroke="#0f172a" stroke-width="2"/>
            </svg>
          </div>
          <div class="logo-info">
            <span class="logo-plant-num">FACTORY #297 NKV</span>
            <h4>Yoshkar-Ola (Mari ASSR)</h4>
            <p>Arc segment enclosing a central diamond with radiant optical beams. Produced high quality steel scopes from March 1943 through 1945.</p>
          </div>
        </div>

        <!-- Logo Card 4: Factory #237 Kazan -->
        <div class="logo-card">
          <div class="logo-svg-wrap">
            <svg viewBox="0 0 160 120" class="factory-logo-svg" aria-label="Factory 237 Kazan Logo">
              <polygon points="45,30 115,30 95,85 65,85" fill="none" stroke="#0f172a" stroke-width="3.5"/>
              <line x1="80" y1="30" x2="80" y2="75" stroke="#2563eb" stroke-width="2.5"/>
              <line x1="60" y1="40" x2="75" y2="70" stroke="#2563eb" stroke-width="2"/>
              <line x1="100" y1="40" x2="85" y2="70" stroke="#2563eb" stroke-width="2"/>
            </svg>
          </div>
          <div class="logo-info">
            <span class="logo-plant-num">FACTORY #237 NKV</span>
            <h4>Kazan (Tatar ASSR)</h4>
            <p>Inverted trapezoid with converging optical ray lines. Produced SVT tube scopes and late-war PU scopes supplied to late Tula rifles (April–May 1944).</p>
          </div>
        </div>

        <!-- Logo Card 5: Factory #353 / #296 FED -->
        <div class="logo-card full-width-logo">
          <div class="logo-svg-wrap">
            <svg viewBox="0 0 200 100" class="factory-logo-svg" aria-label="FED Scope Logo">
              <rect x="30" y="20" width="140" height="60" rx="6" fill="none" stroke="#0f172a" stroke-width="3"/>
              <text x="100" y="58" fill="#2563eb" font-family="'Space Grotesk', sans-serif" font-weight="bold" font-size="28" text-anchor="middle">ФЭД</text>
            </svg>
          </div>
          <div class="logo-info">
            <span class="logo-plant-num">FACTORY #353 / #296 NKV ("FED")</span>
            <h4>Kharkov / Evacuated to Berdsk</h4>
            <p>Cyrillic <strong>"ФЭД"</strong> camera factory emblem. Highly prized early SVT-40 scopes that were retrofitted to early 1942 Mosin snipers with shims.</p>
          </div>
        </div>
      </div>
    `;
  },

  getOpticsScrewsView() {
    return `
      <div class="optics-deepdive-grid">
        <div class="optics-card">
          <span class="optics-card-badge">MANUFACTURING SPECIFICATIONS</span>
          <h3>PU Scope Metallurgy & Tube Materials</h3>
          <p>During World War II, Soviet optical plants utilized two primary metallurgy methods to produce the 26.5mm diameter PU scope tube:</p>
          
          <div class="technical-spec-box">
            <ul>
              <li><strong>Forged Steel Tubes (Standard):</strong> Produced primarily by Factory #357 Progress, Factory #297, and Factory #237. Finished in durable hot-dip black oxide bluing.</li>
              <li><strong>Silumin Aluminum-Silicon Alloy:</strong> Produced by Factory #393 Krasnogorsk in 1943–1944 to conserve steel. Anodized chemically, occasionally displaying dark reddish/plum tones under oxidation.</li>
              <li><strong>Post-War Arsenal Refurbishments:</strong> Scopes serviced post-war at Riga Arsenal No. 7 or Kiev No. 2 were frequently coated in durable semi-gloss baked black enamel paint.</li>
            </ul>
          </div>
        </div>

        <div class="optics-card">
          <span class="optics-card-badge">AUTHENTICATION CHECK</span>
          <h3>Optical Quality & Lens Specifications</h3>
          <p>Original wartime PU scopes feature simple, robust optical construction:</p>
          <div class="technical-spec-box">
            <ul>
              <li><strong>Magnification:</strong> Fixed 3.5x power with 6mm exit pupil.</li>
              <li><strong>Lens Coating:</strong> Early wartime optics (1940–1943) were uncoated. Late-war and post-war serviced optics received anti-reflective magnesium fluoride coatings.</li>
              <li><strong>Eye Relief:</strong> ~72 mm (2.8 inches) designed to clear bolt throw.</li>
            </ul>
          </div>
        </div>

        <!-- Turret Screws Comparison -->
        <div class="optics-card full-width-card">
          <h3>The #1 Scope Authentication Tell: Turret Screws</h3>
          <p>Examine the elevation and windage dial screws closely. Authentic Soviet wartime scopes ALWAYS feature rounded convex domed screws; modern replicas use flat machine screws.</p>
          
          <div class="screws-vector-grid">
            <div class="screw-vector-box real">
              <div class="screw-badge-real">✓ AUTHENTIC SOVIET WARTIME</div>
              <svg viewBox="0 0 200 100" class="screw-diagram-svg">
                <path d="M 50 70 A 50 35 0 0 1 150 70 Z" fill="#dcfce7" stroke="#10b981" stroke-width="2.5"/>
                <rect x="94" y="38" width="12" height="32" fill="#10b981"/>
                <circle cx="170" cy="70" r="7" fill="#2563eb"/>
                <text x="170" y="93" font-size="9" font-weight="bold" fill="#2563eb" text-anchor="middle">Locking Pin</text>
              </svg>
              <h4>Domed / Convex Screw Heads</h4>
              <p>Machined with smooth hemispherical dome profiles. Fitted with small retaining locking pins to prevent dials from drifting under recoil.</p>
            </div>

            <div class="screw-vector-box fake">
              <div class="screw-badge-fake">✕ MODERN REPRODUCTION / FAKE</div>
              <svg viewBox="0 0 200 100" class="screw-diagram-svg">
                <rect x="50" y="45" width="100" height="25" fill="#fee2e2" stroke="#f43f5e" stroke-width="2.5"/>
                <rect x="94" y="45" width="12" height="20" fill="#f43f5e"/>
                <circle cx="170" cy="65" r="7" fill="none" stroke="#f43f5e" stroke-dasharray="2"/>
                <text x="170" y="88" font-size="9" font-weight="bold" fill="#f43f5e" text-anchor="middle">NO Pin</text>
              </svg>
              <h4>Flat-Topped Modern Screws</h4>
              <p>Modern commercial Ukrainian, Chinese, or replica scopes use standard flat-head machine screws. Flat screw tops confirm modern replica manufacture.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  getMountView() {
    return `
      <div class="mount-deepdive-grid">
        <div class="mount-card">
          <h3>D.M. Kochetov Side Mount Assembly</h3>
          
          <div class="mount-features-list">
            <div class="feature-item">
              <strong>1. Forged Construction:</strong> Genuine Soviet mounts were hot-forged with rough interior milling chatter marks matching the receiver radius. Repro mounts are smooth cast steel with mold seam lines.
            </div>
            <div class="feature-item">
              <strong>2. 1942 Early Tula Mounts:</strong> 1942 early Tula mounts lack the clearance notch on the top-rear corner of the base (extremely rare!).
            </div>
            <div class="feature-item">
              <strong>3. High-Wall Receiver Clearance:</strong> Authentic sniper receivers have a smooth factory-milled clearance notch on the left receiver wall, blued at the factory prior to rifle assembly.
            </div>
          </div>
        </div>

        <div class="mount-card">
          <h3>Ex-Sniper Identification (Decommissioned Rifles)</h3>
          <p>After WWII, tens of thousands of PU snipers were decommissioned by Soviet arsenals: the scopes were removed, the base pin holes were plugged with threaded steel plugs or welded flush, and the stocks were repaired with wood patches. Knowing how to identify an ex-sniper is essential:</p>
          <div class="ex-sniper-checklist">
            <div class="check-box-line">🔍 Look inside the receiver: 2 plugged screw holes and 2 pin holes visible on the left inner wall.</div>
            <div class="check-box-line">🔍 Check barrel shank: Izhevsk scope serial on the left shank will be lined out (struck through with a horizontal line) or scrubbed.</div>
            <div class="check-box-line">🔍 Stock wood patch: Rectangular wood insert in the stock where the mount clearance cut once existed.</div>
          </div>
        </div>
      </div>
    `;
  },

  getStockView() {
    return `
      <div class="stock-deepdive-grid">
        <div class="stock-card highlight-stock">
          <span class="stock-badge">COLLECTOR FACTOR</span>
          <h3>Unsanded Factory Stocks (The Value Premium)</h3>
          <p>When Soviet arsenals (Riga #7, Kiev #2, Lysva #1) refurbished rifles during the Cold War, they routinely stripped stocks using high-speed industrial belt sanders. This aggressive process rounded off the stock wrist, flattened the sharp edges around the finger grooves, and obliterated the original factory acceptance cartouches.</p>
          <p>An <strong>unsanded original stock</strong> is exceptionally scarce. It preserves the full factory dimensions, sharp wood-to-metal transitions around the receiver tang, crisp rectangular finger grooves, and deep, legible factory proof cartouches.</p>
        </div>

        <div class="stock-card">
          <h3>Tula vs Izhevsk Factory Stock Cartouches</h3>
          <div class="cartouche-grid">
            <div class="cartouche-box">
              <h4>Tula Stock Cartouche</h4>
              <p>Large crisp <strong>5-pointed Star with Arrow inside a Circle</strong> stamped on the right buttstock, accompanied by the year (e.g. "1943") and small Cyrillic inspection stamps ("П", "К", "У").</p>
            </div>
            <div class="cartouche-box">
              <h4>Izhevsk Stock Cartouche</h4>
              <p>Circular roundel enclosing an <strong>Arrow inside an Isosceles Triangle</strong>, encircled by the production year. Pre-1944 stocks feature brass/copper screwed escutcheons; late 1944+ feature pressed steel liners.</p>
            </div>
          </div>
        </div>

        <div class="stock-card full-width-card">
          <h3>Arsenal Refurbishment Depot Cartouches</h3>
          <div class="arsenal-stamps-grid">
            <div class="stamp-box">
              <span class="stamp-icon">[/]</span>
              <strong>1st GRAU Arsenal No. 7 (Riga)</strong>
              <p>Square divided by a diagonal slash. The most common Soviet refurb mark.</p>
            </div>
            <div class="stamp-box">
              <span class="stamp-icon">▲ 1</span>
              <strong>Arsenal No. 2 (Kiev)</strong>
              <p>Triangle with numeral '1' or '2'. High quality Ukrainian refurb.</p>
            </div>
            <div class="stamp-box">
              <span class="stamp-icon">[ | ]</span>
              <strong>Arsenal No. 25</strong>
              <p>Diamond / Rhombus with vertical divider bar.</p>
            </div>
            <div class="stamp-box">
              <span class="stamp-icon">[+]</span>
              <strong>Artillery Base No. 1 (Lysva)</strong>
              <p>Circle with cross or square with X.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  hotspotData: {
    'izh-c-circle': {
      isAuthentic: true,
      badge: 'IZHEVSK SNIPER PROOF',
      title: "C-in-Circle (Cyrillic 'С' in Circle)",
      description: "The official Izhevsk Factory #74 sniper barrel acceptance mark. Barrels that achieved precision grouping tolerances during proof firing were stamped with this mark and routed to the dedicated sniper assembly shop.",
      collectorRule: "Mandatory for all 1942–1944 Izhevsk PU snipers. If this mark is absent, the rifle is a converted infantry rifle."
    },
    'izh-crest': {
      isAuthentic: true,
      badge: 'FACTORY ARSENAL CREST',
      title: "Izhevsk Arrow in Triangle",
      description: "The primary factory emblem for Factory #74 in Izhevsk. Stamped cleanly on top of the barrel shank directly above the production date.",
      collectorRule: "Look for crisp factory die stamping. Post-war refurbished rifles may exhibit slight thinning if lightly buffed."
    },
    'izh-date': {
      isAuthentic: true,
      badge: 'PRODUCTION YEAR',
      title: "Production Date Stamp ('1942 г.' to '1944 г.')",
      description: "Indicates the calendar year of barrel manufacture. Cyrillic 'г.' stands for 'год' (year). 1942 is very rare; 1943 and 1944 represent peak production.",
      collectorRule: "A 1942 date on an authentic Izhevsk PU represents first-year production and commands a notable collector premium."
    },
    'izh-serial': {
      isAuthentic: true,
      badge: 'RIFLE SERIAL NUMBER',
      title: "Cyrillic Prefix & Serial Digits",
      description: "Consists of a 2-letter Cyrillic prefix followed by 1 to 4 digits. The same prefix and digits were stamped on the bolt body, magazine floorplate, and buttplate.",
      collectorRule: "Factory stamped matching serials with identical original die fonts on all parts command a massive premium over electro-penciled (EP) refurbs."
    },
    'izh-scope-serial': {
      isAuthentic: true,
      badge: 'IZHEVSK-SPECIFIC PRACTICE',
      title: "Scope Serial Stamped on Left Shank",
      description: "Izhevsk factory SOP required stamping the serial number of the issued PU scope onto the left side of the barrel shank just above the stock line. When scopes were swapped at post-war arsenals, the original number was struck through and the new scope serial number was stamped or electro-penciled.",
      collectorRule: "If an Izhevsk sniper has an original, untouched scope serial that exactly matches the physical scope on the rifle, you have an ultra-rare 100% original matching wartime sniper ($3,500+)."
    },
    'tula-ch': {
      isAuthentic: true,
      badge: 'TULA SNIPER PROOF (HOLY GRAIL)',
      title: "Cyrillic 'СН' (CH) Sniper Acceptance Stamp",
      description: "The definitive sniper proof mark for Tula Factory #535. 'СН' stands for 'Снайперская' (Snayperskaya - Sniper). Stamped directly above the Tula star.",
      collectorRule: "1942 Tula snipers with 'СН' are the rarest production Mosin PU snipers in the world (< 25 known in the US). Beware of modern counterfeiters applying fake 'CH' stamps to standard infantry Tula rifles!"
    },
    'tula-star': {
      isAuthentic: true,
      badge: 'TULA ARSENAL STAR',
      title: "Tula 5-Pointed Star with Arrow",
      description: "The historic symbol of the Tula Arms Plant. Stamped prominently below the 'СН' sniper proof.",
      collectorRule: "Tula rifles are significantly scarcer across all WWII production years compared to Izhevsk (roughly 1 Tula for every 6 Izhevsk rifles)."
    },
    'tula-date': {
      isAuthentic: true,
      badge: 'TULA YEAR MATRIX',
      title: "Tula Production Years (1942, 1943, 1944)",
      description: "1942: ~2,020 produced (Ultra-Rare). 1943: ~35,000 produced (Rare). 1944: ~10,000 produced before shutdown in May 1944 (Very Rare).",
      collectorRule: "Any authentic Tula PU sniper commands a 30% to 150% price premium over equivalent Izhevsk rifles."
    },
    'tula-serial': {
      isAuthentic: true,
      badge: 'TULA SERIAL NUMBER',
      title: "Tula Serial Numbering",
      description: "Two-letter Cyrillic prefix followed by numbers. Tula used distinct serial prefixes (e.g. БА, ГБ, etc.) documented in the m9130.info serial registry.",
      collectorRule: "Cross-reference the serial prefix with the m9130.info database to confirm it falls within verified sniper production batches."
    },
    'tula-no-scope-serial': {
      isAuthentic: true,
      badge: 'CRITICAL TULA IDENTIFIER',
      title: "NO Scope Serial on Tula Barrel Shank",
      description: "Unlike Izhevsk, Tula Factory #535 NEVER stamped the scope serial number on the barrel shank at the factory. Instead, Tula recorded the scope number on the Kochetov mount body or in the rifle's military passport.",
      collectorRule: "If you see a Tula rifle with a scope serial stamped on the left barrel shank in wartime font, it is either a post-war depot modification or a fake Izhevsk-style counterfeit!"
    }
  }
};
