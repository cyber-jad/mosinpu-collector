/**
 * AUTHENTICITY INSPECTOR / "REAL VS REPRO" DIAGNOSTIC ENGINE
 * 
 * Evaluates Mosin Nagant PU sniper rifle attributes and calculates
 * real-time fraud probability, authenticity rating, and collector flags.
 */

window.AuthenticityWizard = {
  currentStep: 0,       // index into MOSIN_DATA.authFactors — which question is on screen
  answers: {},           // factorId -> selected optionId, one entry per answered question

  init() {
    this.renderWizard();
    this.bindEvents();
  },

  // Renders the current question (title, options, progress bar, nav buttons)
  // into #auth-wizard-container. Re-run on every step change and every answer.
  renderWizard() {
    const container = document.getElementById('auth-wizard-container');
    if (!container) return;

    const factors = window.MOSIN_DATA.authFactors;
    
    let html = `
      <div class="wizard-card">
        <div class="wizard-progress-bar">
          <div class="wizard-progress-fill" id="wizard-progress-fill" style="width: ${((this.currentStep + 1) / factors.length) * 100}%"></div>
        </div>
        <div class="wizard-header">
          <div class="wizard-step-badge">Step ${this.currentStep + 1} of ${factors.length}</div>
          <h3 class="wizard-title" id="wizard-question-title">${factors[this.currentStep].title}</h3>
          <p class="wizard-subtitle">${factors[this.currentStep].question}</p>
        </div>

        <div class="wizard-options" id="wizard-options-container">
          ${factors[this.currentStep].options.map(opt => `
            <label class="wizard-option-card ${this.answers[factors[this.currentStep].id] === opt.id ? 'selected' : ''}" data-option-id="${opt.id}">
              <input type="radio" name="${factors[this.currentStep].id}" value="${opt.id}" ${this.answers[factors[this.currentStep].id] === opt.id ? 'checked' : ''} class="wizard-radio">
              <div class="wizard-option-content">
                <div class="wizard-option-label">${opt.label}</div>
                <div class="wizard-option-detail">${opt.detail}</div>
              </div>
              <div class="wizard-option-check">
                <span class="check-icon">✓</span>
              </div>
            </label>
          `).join('')}
        </div>

        <div class="wizard-nav">
          <button type="button" class="btn btn-secondary" id="wizard-prev-btn" ${this.currentStep === 0 ? 'disabled' : ''}>
            ← Previous Step
          </button>
          <button type="button" class="btn btn-primary" id="wizard-next-btn" ${!this.answers[factors[this.currentStep].id] ? 'disabled' : ''}>
            ${this.currentStep === factors.length - 1 ? 'Generate Final Report ➔' : 'Next Step →'}
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  // Single delegated click handler for the whole wizard: answering a question,
  // stepping forward/back, and (on the results screen) restarting.
  bindEvents() {
    const container = document.getElementById('auth-wizard-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const optionCard = e.target.closest('.wizard-option-card');
      if (optionCard) {
        const optionId = optionCard.getAttribute('data-option-id');
        const factorId = window.MOSIN_DATA.authFactors[this.currentStep].id;
        
        this.answers[factorId] = optionId;
        
        // Update UI selection
        container.querySelectorAll('.wizard-option-card').forEach(c => c.classList.remove('selected'));
        optionCard.classList.add('selected');
        const radio = optionCard.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        const nextBtn = document.getElementById('wizard-next-btn');
        if (nextBtn) nextBtn.disabled = false;
        return;
      }

      if (e.target.closest('#wizard-next-btn')) {
        const factors = window.MOSIN_DATA.authFactors;
        if (this.currentStep < factors.length - 1) {
          this.currentStep++;
          this.renderWizard();
        } else {
          this.calculateAndRenderResults();
        }
        return;
      }

      if (e.target.closest('#wizard-prev-btn')) {
        if (this.currentStep > 0) {
          this.currentStep--;
          this.renderWizard();
        }
        return;
      }

      if (e.target.closest('#wizard-restart-btn')) {
        this.currentStep = 0;
        this.answers = {};
        this.renderWizard();
      }
    });
  },

  // Tallies points from every answered question into a 0-100 authenticity
  // index, derives a verdict (genuine / refurb / ex-sniper / faux), and
  // renders the results screen in place of the question flow.
  calculateAndRenderResults() {
    const container = document.getElementById('auth-wizard-container');
    if (!container) return;

    const factors = window.MOSIN_DATA.authFactors;
    let totalScore = 0;
    let maxPossibleScore = 0;
    let redFlags = [];
    let positiveProofs = [];
    let isExSniper = false;
    let isFauxClone = false;

    factors.forEach(factor => {
      const selectedOptId = this.answers[factor.id];
      const opt = factor.options.find(o => o.id === selectedOptId);
      if (opt) {
        totalScore += opt.points;
        if (opt.points < 0) {
          redFlags.push({
            factor: factor.title,
            detail: opt.detail,
            label: opt.label
          });
        } else if (opt.points >= 15) {
          positiveProofs.push({
            factor: factor.title,
            detail: opt.detail,
            label: opt.label
          });
        }

        if (opt.type === 'ex_sniper') isExSniper = true;
        // These specific option IDs are unambiguous "this is a modern commercial
        // build, not a wartime rifle" tells (hex receiver, no shank proof, alloy
        // mount, Russian export stamp, welded bolt). Any one of them caps the
        // verdict at "faux clone" below regardless of how the other answers scored,
        // since a single disqualifying red flag shouldn't be averaged away by
        // otherwise-plausible answers on the remaining questions.
        if (opt.id === 'hex_receiver' || opt.id === 'no_proof' || opt.id === 'aluminum_mount' || opt.id === 'made_in_russia_stamp' || opt.id === 'welded_infantry_bolt') {
          isFauxClone = true;
        }
      }
      // maxPossibleScore accumulates the best-case (highest-point) answer for
      // each question, so the final ratio reflects "how close to a perfect
      // answer set" rather than an arbitrary fixed denominator.
      maxPossibleScore += Math.max(...factor.options.map(o => o.points));
    });

    // Normalize the raw point total to a 0-100 "Authenticity Index".
    let normalizedScore = Math.max(0, Math.min(100, Math.round((totalScore / maxPossibleScore) * 100)));
    // A confirmed faux-clone tell overrides whatever the arithmetic score says —
    // clamp into the "Commercial Reproduction" band (see verdict thresholds
    // below) even if enough other answers scored high enough to average out
    // above it. 32 is an arbitrary mid-band value; anything under the 40
    // threshold below produces the same "faux" verdict.
    if (isFauxClone && normalizedScore > 40) normalizedScore = 32;

    let verdictClass = "";
    let verdictTitle = "";
    let verdictDesc = "";
    let collectorRecommendation = "";

    // Verdict bands: 85+ genuine, 60-84 arsenal refurb, 40-59 (or any
    // ex-sniper answer) re-snipered, everything else faux/reproduction.
    if (normalizedScore >= 85 && !isFauxClone) {
      verdictClass = "verdict-genuine";
      verdictTitle = "100% Authentic Genuine Soviet / Hungarian Sniper";
      verdictDesc = "High confidence of original factory sniper manufacture. The rifle possesses authentic sniper-grade barrel proofs, proper receiver milling, forged Kochetov pattern mount, and period-correct optic configuration.";
      collectorRecommendation = "Prime Collector Grade. Verify matching serial stamps and lack of heavy post-war sanding to assess whether it is an unissued/original matching example ($2,500 - $5,000+) or a standard high-quality Soviet arsenal refurbishment ($1,300 - $2,200).";
    } else if (normalizedScore >= 60 && !isFauxClone) {
      verdictClass = "verdict-refurb";
      verdictTitle = "Genuine Soviet Arsenal Refurbished Sniper";
      verdictDesc = "The core barreled receiver left the factory as a verified sniper rifle during WWII. It shows classic signatures of post-war GRAU Soviet depot refurbishment (e.g. Riga Arsenal No. 7, Kiev No. 2, lined-out scope serials, or electro-penciled bolt/mount).";
      collectorRecommendation = "Solid, highly collectible authentic military surplus. Standard US market value ranges between $1,300 and $2,000 depending on importer marks (RGuns/Molot vs Century billboard).";
    } else if (isExSniper || (normalizedScore >= 40 && normalizedScore < 60)) {
      verdictClass = "verdict-exsniper";
      verdictTitle = "Decommissioned Ex-Sniper / Restored 'Re-Snipered' Rifle";
      verdictDesc = "This rifle was originally manufactured as a factory sniper rifle, but was decommissioned after WWII by the military (scope removed, holes plugged or welded) to serve as standard infantry issue, and subsequently re-scoped by an importer or civilian collector.";
      collectorRecommendation = "Fair Collector Value ($750 - $1,100). Holds real WWII sniper lineage, but lacks original factory scope matching and factory-set mount geometry.";
    } else {
      verdictClass = "verdict-fake";
      verdictTitle = "Commercial Reproduction / Faux 'Clone' Sniper";
      verdictDesc = "CRITICAL RED FLAG DETECTED. This is a standard infantry Mosin M91/30 that was converted into a sniper configuration post-import or commercially (e.g. Century repro builds, modern gunsmith conversions, or replica optics).";
      collectorRecommendation = "Shooter Grade Only ($600 - $850). Do NOT pay genuine sniper prices for this rifle. It lacks historical sniper factory provenance.";
    }

    let html = `
      <div class="wizard-results-card ${verdictClass}">
        <div class="results-header">
          <div class="score-circle-container">
            <div class="score-circle">
              <span class="score-number">${normalizedScore}%</span>
              <span class="score-label">Authenticity Index</span>
            </div>
          </div>
          <div class="results-verdict-info">
            <span class="verdict-tag">${verdictClass.replace('verdict-', '').toUpperCase()}</span>
            <h3 class="verdict-heading">${verdictTitle}</h3>
            <p class="verdict-summary">${verdictDesc}</p>
          </div>
        </div>

        <div class="results-body">
          <div class="collector-advice-box">
            <div class="advice-header">
              <span class="icon">💡</span> <strong>Collector Appraisal & Action Plan:</strong>
            </div>
            <p>${collectorRecommendation}</p>
          </div>

          <div class="results-details-grid">
            <div class="details-column red-flags-column">
              <h4 class="column-title"><span class="icon">⚠️</span> Red Flags & Deviations (${redFlags.length})</h4>
              ${redFlags.length === 0 ? `
                <div class="empty-state-card positive">No reproduction red flags or commercial conversion defects detected!</div>
              ` : `
                <ul class="flags-list">
                  ${redFlags.map(rf => `
                    <li class="flag-item">
                      <span class="flag-factor">${rf.factor}:</span>
                      <strong class="flag-label">${rf.label}</strong>
                      <p class="flag-detail">${rf.detail}</p>
                    </li>
                  `).join('')}
                </ul>
              `}
            </div>

            <div class="details-column proofs-column">
              <h4 class="column-title"><span class="icon">🛡️</span> Verified Authenticity Proofs (${positiveProofs.length})</h4>
              ${positiveProofs.length === 0 ? `
                <div class="empty-state-card warning">No primary sniper factory proofs confirmed.</div>
              ` : `
                <ul class="proofs-list">
                  ${positiveProofs.map(pf => `
                    <li class="proof-item">
                      <span class="proof-factor">${pf.factor}:</span>
                      <strong class="proof-label">${pf.label}</strong>
                      <p class="proof-detail">${pf.detail}</p>
                    </li>
                  `).join('')}
                </ul>
              `}
            </div>
          </div>
        </div>

        <div class="results-footer">
          <button type="button" class="btn btn-secondary" id="wizard-restart-btn">
            🔄 Start New Inspection
          </button>
          <button type="button" class="btn btn-primary" onclick="window.print()">
            🖨️ Print / Save Diagnostic Report
          </button>
        </div>
      </div>
    `;

    container.innerHTML = html;
  }
};
