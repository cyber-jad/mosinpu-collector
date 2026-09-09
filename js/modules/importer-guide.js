/**
 * US IMPORTER & PROVENANCE GUIDE
 * 
 * In-depth analysis of the import batches that shaped the American market:
 * RGuns, Molot, Century Arms (CAI), Mitchell's Mausers, ATI, Samco, PW Arms, Pre-68.
 */

window.ImporterGuide = {
  init() {
    this.renderGuide();
    this.bindEvents();
  },

  // This module is static content (no filters/search/state) — renders once
  // from MOSIN_DATA.importers and never re-renders itself.
  renderGuide() {
    const container = document.getElementById('importer-guide-container');
    if (!container) return;

    const importers = window.MOSIN_DATA.importers;

    let html = `
      <div class="importer-guide-wrapper">
        <!-- Spotlight Deep-Dives: Century & Mitchell's -->
        <div class="importer-spotlight-grid">
          <!-- Century Arms Real vs Repro Guide -->
          <div class="spotlight-card century-card">
            <div class="spotlight-tag">CRITICAL COLLECTOR KNOWLEDGE</div>
            <h3>Century Arms (CAI): Genuine Surplus vs. US 'Faux' Builds</h3>
            <p class="spotlight-intro">Century Arms imported more Mosin PU snipers to the USA than any other company. However, collectors must recognize that Century sold <strong>two totally different products</strong> under the CAI name:</p>
            
            <div class="comparison-two-col">
              <div class="col-box genuine-box">
                <div class="box-badge-real">✓ 100% GENUINE SOVIET REFURB</div>
                <h4>Authentic CAI Import</h4>
                <ul>
                  <li>Imported complete directly from Ukrainian/Russian military depots.</li>
                  <li>Features authentic Izhevsk "C-in-circle" or Tula "СН" barrel proof.</li>
                  <li>Original scope serial on left barrel shank (Izhevsk).</li>
                  <li>Forged Soviet Kochetov mount with domed screws & locking pins.</li>
                  <li>High-wall receiver clearance notch milled before factory bluing.</li>
                </ul>
              </div>

              <div class="col-box fake-box">
                <div class="box-badge-fake">⚠️ COMMERCIAL FAUX / REPRO</div>
                <h4>Century US 'Repro' Assembly</h4>
                <ul>
                  <li>Assembled in the US by modifying standard infantry M91/30 rifles.</li>
                  <li>Standard infantry barrel shank (NO sniper proofs, no "C-in-circle").</li>
                  <li>Straight infantry bolt cut and welded down with visible seam.</li>
                  <li>Reproduction cast mount with modern flat-topped screws.</li>
                  <li>Fresh un-blued dremeled receiver notch and raw drill holes.</li>
                </ul>
              </div>
            </div>
            <div class="importer-verdict-banner">
              <strong>Collector Verdict:</strong> Genuine Century-imported snipers are fantastic authentic historical pieces ($1,300–$1,900). Century "Faux" clones are shooters only ($650–$900). Always check barrel proofs!
            </div>
          </div>

          <!-- Mitchell's Mausers Nuance Card -->
          <div class="spotlight-card mitchells-card">
            <div class="spotlight-tag">MYTH BUSTING & REALITY</div>
            <h3>Mitchell's Mausers: The Truth About Their Mosin Snipers</h3>
            <p class="spotlight-intro">Mitchell's Mausers has a controversial reputation in the surplus community for "pimp-shining", re-numbering, and over-marketing German K98k rifles. <strong>However, their Mosin PU snipers require nuanced appraisal:</strong></p>

            <div class="mitchells-facts">
              <div class="fact-item">
                <span class="fact-icon">💎</span>
                <div>
                  <strong>Genuine Molot-Refurbished Snipers:</strong>
                  <p>Mitchell's imported a legitimate batch of authentic Soviet PU snipers sourced through the Russian Molot arsenal in Vyatskie Polyany. These rifles have verified wartime sniper barrels, genuine Kochetov mounts, original optics, and shoot exceptionally well.</p>
                </div>
              </div>

              <div class="fact-item">
                <span class="fact-icon">⚠️</span>
                <div>
                  <strong>Commercial Repros & Heavy Polishing:</strong>
                  <p>Conversely, Mitchell's also marketed reproduction clones and sometimes polished bolt bodies to a mirror bright finish not typical of Soviet military issue. Some were sold with custom wooden presentation boxes and inflated marketing claims.</p>
                </div>
              </div>
            </div>

            <div class="importer-verdict-banner">
              <strong>Collector Verdict:</strong> Do not immediately discard a Mitchell's PU sniper! Inspect the barrel shank for genuine "C-in-circle" or "СН" proofs and original receiver cuts. If real, it is a high-grade shooter/collector piece worth $1,400–$2,000.
            </div>
          </div>
        </div>

        <!-- Import Mark Aesthetics: Discreet vs Billboard -->
        <div class="import-marks-aesthetics-card">
          <h3>Import Mark Location & Placement: Price & Aesthetic Impact</h3>
          <p>Federal ATF import regulations evolved over time, drastically affecting how import marks were applied:</p>
          <div class="aesthetics-grid">
            <div class="aesthetic-box discreet">
              <span class="aest-badge">+ $200 – $400 Value</span>
              <h4>Discreet Under-Barrel Stamping</h4>
              <p>Found on <strong>early ATI, Group West, and early CAI</strong> imports. Tiny two-line dot matrix or stamped text located on the underside of the barrel near the muzzle or under the cleaning rod. Leaves the receiver and barrel shank completely clean and historically authentic. RGuns is the notable exception: its mark sits on <strong>top of the receiver, just under the front scope lens</strong> — never on the barrel underside or the scope mount itself.</p>
            </div>

            <div class="aesthetic-box molot-proof">
              <span class="aest-badge">Solid Value</span>
              <h4>Russian Molot Export Laser Markings</h4>
              <p>Found on <strong>KO-91/30 / Molot</strong> rifles. Clean laser-etched Russian proof house markings and 'КО-91/30' designation. Proves official Russian arsenal lineage, accompanied by Russian proof passport certificates.</p>
            </div>

            <div class="aesthetic-box billboard">
              <span class="aest-badge">- $150 – $250 Value</span>
              <h4>Giant Receiver Billboard Laser</h4>
              <p>Found on <strong>later Century Arms (CAI) and PW Arms</strong> imports. Large 1-to-2 inch laser billboard text stamped directly across the left or right side of the receiver flat. Authentic rifle underneath, but aesthetically intrusive.</p>
            </div>
          </div>
        </div>

        <!-- Import Mark Red Flags & Rarity Notes -->
        <div class="import-marks-aesthetics-card">
          <h3>Import Mark Red Flags & The Never-Refurbished Rarity Tier</h3>
          <div class="aesthetics-grid">
            <div class="aesthetic-box billboard">
              <span class="aest-badge">⚠️ Fake Indicator</span>
              <h4>Import Mark "Under" the Scope Base</h4>
              <p>A genuine import mark is applied by the importer to an already-assembled rifle, so it never needs to sit underneath the scope mount itself. A mark positioned under the base — meaning the mount had to be removed to stamp it — is a strong sign of a faked or misapplied import mark added after the fact.</p>
            </div>

            <div class="aesthetic-box billboard">
              <span class="aest-badge">⚠️ Fake Indicator</span>
              <h4>RGuns Mark on a Non-Sniper Rifle</h4>
              <p>RGuns imported sniper crates specifically — its mark showing up on a standard infantry M91/30 (no side mount, no sniper barrel proofs) means the mark was added to a rifle it was never on, almost always to inflate a plain infantry rifle's price to sniper levels.</p>
            </div>

            <div class="aesthetic-box discreet">
              <span class="aest-badge">Top Rarity Tier</span>
              <h4>Never-Refurbished Wartime Imports</h4>
              <p>The scarcest and most valuable category of all: rifles that reached the US still in their original WWII-era configuration, never touched by a Cold War arsenal rebuild. Most RGuns-imported snipers, by contrast, show a 1960s–1970s Soviet refurbishment (some later reissued to Soviet police units) — still fully authentic, just not untouched wartime originals.</p>
            </div>
          </div>
        </div>

        <!-- All Importers Directory Grid -->
        <div class="importers-directory">
          <h3 class="directory-heading">Complete US Importer Directory</h3>
          <div class="importer-cards-grid">
            ${importers.map(imp => `
              <div class="imp-card" id="imp-${imp.id}">
                <div class="imp-card-header">
                  <span class="imp-era">${imp.importEra}</span>
                  <h4 class="imp-name">${imp.name}</h4>
                  <div class="imp-reputation">${imp.reputation}</div>
                </div>
                <div class="imp-body">
                  <p class="imp-desc">${imp.description}</p>
                  <div class="imp-mark-info">
                    <strong>Import Mark Style:</strong> ${imp.importMarkStyle}
                  </div>
                  <div class="imp-stat-row">
                    <span class="stat-label">Authenticity Rate:</span>
                    <strong class="stat-value">${imp.authenticityRate}</strong>
                  </div>
                  <div class="imp-stat-row">
                    <span class="stat-label">Market Value Impact:</span>
                    <strong class="stat-value val">${imp.priceImpact}</strong>
                  </div>
                  <div class="imp-notes">
                    <strong>Collector Note:</strong> ${imp.keyNotes}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // No-op: this guide has no interactive controls. Kept as a stub (rather
  // than omitted) so it matches every other module's init() -> render +
  // bindEvents shape, which app.js relies on when it loops over modules.
  bindEvents() {
    // Interactive handlers if needed
  }
};
