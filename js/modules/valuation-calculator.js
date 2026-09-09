/**
 * DYNAMIC COLLECTOR VALUATION & SCOPE APPRAISAL ENGINE
 * 
 * Accurately models real-world US market valuations, rarity tiers,
 * scope pricing dynamics, stock integrity, and importer provenance.
 * Calibrated: Top holy grail $8,000, median surplus rifles ~$2,000.
 */

window.ValuationCalculator = {
  state: {
    factory: 'izhevsk',
    year: '1943',
    config: 'soviet_refurb',
    matchingType: 'electropencil',
    stockCondition: 'lightly_sanded_refurb',
    scopeMatch: 'arsenal_matched_ep',
    scopeOpticsCondition: 'good_battlefield',
    importer: 'rguns',
    boreCondition: 'very_good'
  },

  init() {
    this.renderCalculator();
    this.bindEvents();
    this.updateValuation();
  },

  // Builds the static form markup (all <select> options) once. The results
  // panel itself is left empty here and filled in by updateValuation().
  renderCalculator() {
    const container = document.getElementById('valuation-calc-container');
    if (!container) return;

    let html = `
      <div class="calc-grid">
        <!-- Controls Column -->
        <div class="calc-controls-card">
          <div class="calc-card-header">
            <h3 class="calc-title">Rifle Specifications & Optics Setup</h3>
            <p class="calc-subtitle">Configure rifle features and scope setup to calculate current US collector market appraisal (Most rifles ~ $2,000; 1942 Tula up to $8,000)</p>
          </div>

          <form id="valuation-form" class="calc-form">
            <!-- Factory & Year -->
            <div class="form-row two-col">
              <div class="form-group">
                <label for="calc-factory">Factory / Arsenal:</label>
                <select id="calc-factory" class="form-select">
                  <option value="izhevsk" selected>Izhevsk Factory #74</option>
                  <option value="tula">Tula Factory #535 / #66</option>
                </select>
              </div>

              <div class="form-group">
                <label for="calc-year">Production Year:</label>
                <select id="calc-year" class="form-select">
                  <!-- Populated dynamically -->
                </select>
              </div>
            </div>

            <!-- Scope Matching & Provenance (Major Value Driver) -->
            <div class="form-group scope-highlight-group">
              <label for="calc-scope-match">🎯 PU Scope Model & Matching Status (Major Impact):</label>
              <select id="calc-scope-match" class="form-select">
                <option value="arsenal_matched_ep" selected>Soviet Arsenal Lined-Out & EP / Stamped Matched Scope [Standard Refurb Baseline]</option>
                <option value="matching_original_shank">100% Factory Stamped Matching Scope (Shank S/N matches scope physical S/N) [+$1,500 - $2,000+]</option>
                <option value="rare_fed_svt">Rare Factory #353 FED / Early SVT-40 Scope in Shimmed Base [+$900]</option>
                <option value="krasnogorsk_393">Factory #393 Krasnogorsk Scope (Silumin/Steel Anodized) [+$650]</option>
                <option value="authentic_soviet_nonmatching">Authentic WWII Soviet Scope (Factory #357/#297, Non-matching serial) [-$150 vs matched]</option>
                <option value="reproduction_scope">⚠️ Modern Commercial Reproduction / Fake Optic (Flat Screws) [-$700 Penalty]</option>
                <option value="no_scope_base_only">❌ No Scope (Mount/Base Only, Missing Optic) [-$850 Deduction]</option>
              </select>
            </div>

            <!-- Scope Optical Clarity & Mechanical Health -->
            <div class="form-group">
              <label for="calc-scope-condition">Scope Optical Clarity & Turret Health:</label>
              <select id="calc-scope-condition" class="form-select">
                <option value="good_battlefield" selected>Good Battlefield Clear (Minor dust/patina, crisp reticle, smooth dials)</option>
                <option value="mint_optics">Crystal Clear Lenses, Sharp Reticle, Smooth Turret Turn & Intact Leather Caps (+ $150)</option>
                <option value="foggy_cloudy">Cloudy / Fungus / Delaminated Lenses / Loose Post (- $250 Repair Cost)</option>
              </select>
            </div>

            <!-- Configuration & Refurbishment -->
            <div class="form-group">
              <label for="calc-config">Rifle Configuration & Lineage:</label>
              <select id="calc-config" class="form-select">
                <option value="soviet_refurb" selected>Authentic Soviet Arsenal Refurbished (Riga #7, Kiev #2, Lysva - Typical ~ $2,000)</option>
                <option value="original_matching">Original As-Issued (Non-Refurbished / Vet Bring-Back / Crate Original)</option>
                <option value="resnipered_exsniper">Re-Snipered Ex-Sniper (Collector restored with period optics)</option>
                <option value="decommissioned_exsniper">Decommissioned Ex-Sniper (Plugged receiver holes, iron sights only)</option>
                <option value="reproduction_faux">Commercial Reproduction / Faux Clone (Built on standard 91/30)</option>
              </select>
            </div>

            <!-- Serial Matching / Electro-Pencil -->
            <div class="form-group">
              <label for="calc-matching">Rifle Serial Number Matching & Font:</label>
              <select id="calc-matching" class="form-select">
                <option value="electropencil" selected>Arsenal Electro-Pencil (EP) Force-Matched (Classic Soviet Refurb)</option>
                <option value="factory_stamped">All Factory-Stamped Matching (Original Dies, NO Electro-Pencil)</option>
                <option value="arsenal_stamped">Arsenal Restamped Matching (Old serial ground, new serial die-stamped)</option>
                <option value="mismatched">Mismatched Bolt / Floorplate / Buttplate</option>
              </select>
            </div>

            <!-- Stock Condition & Cartouches -->
            <div class="form-group">
              <label for="calc-stock">Stock Condition & Cartouche Integrity:</label>
              <select id="calc-stock" class="form-select">
                <option value="lightly_sanded_refurb" selected>Lightly Sanded Arsenal Refurb (Faint cartouches, clean shellac)</option>
                <option value="unsanded_crisp_cartouche">Unsanded Factory Stock (Deep Crisp Tula Star / Izhevsk Roundel)</option>
                <option value="heavily_sanded_refurb">Heavily Sanded Refurb (Rounded edges, cartouches washed out)</option>
                <option value="laminated_stock">Post-War Soviet Laminated Stock (Birch Plywood)</option>
                <option value="refinished_modern">Sanded / Polyurethane / Modern Sporter Refinished</option>
              </select>
            </div>

            <!-- Importer & Import Mark Placement -->
            <div class="form-group">
              <label for="calc-importer">Importer & Import Mark Placement:</label>
              <select id="calc-importer" class="form-select">
                <option value="rguns" selected>RGuns (Small mark on receiver top under scope lens, unissued matching crates)</option>
                <option value="pre68">Pre-1968 / Vet Bringback (ZERO Import Marks)</option>
                <option value="ati">ATI (American Tactical - Discreet under-barrel mark)</option>
                <option value="samco">Samco Global Arms (Clean barrel mark)</option>
                <option value="groupwest">Group West (Tiny under-barrel mark + receiver flat serial under closed bolt)</option>
                <option value="molot">Molot / KO-91/30M (Vyatskie Polyany Russian Export proofs & certificate)</option>
                <option value="tulsky">Tulsky / PW Arms (Heavy explicit marking: barrel, receiver front & rear sight base)</option>
                <option value="mitchells_real">Mitchell's Mausers (Verified Real Russian Molot Refurb Import)</option>
                <option value="century_clean">Century Arms (CAI) - Early Small Under-Barrel Mark (Authentic Refurb)</option>
                <option value="century_billboard">Century Arms (CAI) - Large Laser Billboard on Receiver Wall</option>
                <option value="century_repro_build">Century Arms - US Commercial 'Faux' Repro Sniper Assembly</option>
              </select>
            </div>

            <!-- Bore & Metal Condition -->
            <div class="form-group">
              <label for="calc-bore">Bore & Metal Finish Condition:</label>
              <select id="calc-bore" class="form-select">
                <option value="very_good" selected>Very Good (Bright bore with minor frosting, 85-90% finish)</option>
                <option value="mint_excellent">Mint / Unissued Bore (Mirror bright, sharp lands, 95%+ metal finish)</option>
                <option value="good_shooter">Good / Shooter Grade (Dark bore with strong rifling, 70-80% finish)</option>
                <option value="fair_worn">Fair / Battlefield Worn (Pitted bore, patina, thinned bluing)</option>
              </select>
            </div>
          </form>
        </div>

        <!-- Valuation Results Output Card -->
        <div class="calc-results-card" id="calc-results-display">
          <!-- Populated by updateValuation() -->
        </div>
      </div>
    `;

    container.innerHTML = html;
    this.updateYearOptions();
  },

  // Rebuilds the Year <select> to match whichever factory is now chosen
  // (Izhevsk and Tula shipped different year ranges), keeping the previously
  // selected year if it still exists for the new factory.
  updateYearOptions() {
    const factorySelect = document.getElementById('calc-factory');
    const yearSelect = document.getElementById('calc-year');
    if (!factorySelect || !yearSelect) return;

    const factory = factorySelect.value;
    const yearsData = window.MOSIN_DATA.production[factory].years;

    yearSelect.innerHTML = Object.keys(yearsData).map(yr => `
      <option value="${yr}" ${yr === this.state.year ? 'selected' : ''}>${yr} (${yearsData[yr].rarityTier})</option>
    `).join('');

    this.state.factory = factory;
    this.state.year = yearSelect.value;
  },

  // Delegated change handler for every form field: syncs `state` from the
  // current DOM values, then recalculates. Reading all fields on every
  // change (rather than just the one that fired) keeps this simple and
  // avoids state drift if a future field is added and forgotten here.
  bindEvents() {
    const container = document.getElementById('valuation-calc-container');
    if (!container) return;

    container.addEventListener('change', (e) => {
      const target = e.target;
      if (target.id === 'calc-factory') {
        this.updateYearOptions();
      }

      this.state.factory = document.getElementById('calc-factory').value;
      this.state.year = document.getElementById('calc-year').value;
      this.state.scopeMatch = document.getElementById('calc-scope-match').value;
      this.state.scopeOpticsCondition = document.getElementById('calc-scope-condition').value;
      this.state.config = document.getElementById('calc-config').value;
      this.state.matchingType = document.getElementById('calc-matching').value;
      this.state.stockCondition = document.getElementById('calc-stock').value;
      this.state.importer = document.getElementById('calc-importer').value;
      this.state.boreCondition = document.getElementById('calc-bore').value;

      this.updateValuation();
    });
  },

  // Core pricing model. Establishes a [baseLow, baseHigh] price band from
  // factory + year (step 1), then walks every other spec in turn (steps 2-7),
  // each either shifting the band by a flat dollar amount or scaling it by a
  // percentage — additive dollar shifts for scope/optics/importer swaps,
  // multiplicative percentages for condition/quality grades. `priceDrivers`
  // and `highlights` accumulate human-readable strings describing each
  // adjustment so the results panel can show its work. Re-run in full on
  // every form change (see bindEvents) rather than incrementally patched.
  updateValuation() {
    const resultsContainer = document.getElementById('calc-results-display');
    if (!resultsContainer) return;

    const { factory, year, config, matchingType, stockCondition, scopeMatch, scopeOpticsCondition, importer, boreCondition } = this.state;

    // Baseline for typical authentic Soviet refurbished rifle (most rifles sit right around $1,800 – $2,200)
    let baseLow = 1800;
    let baseHigh = 2200;
    let rarityScore = 65;
    let rarityBadge = "Standard Wartime";
    let highlights = [];
    let priceDrivers = [];
    let scopeValueImpact = 0;
    let scopeImpactDesc = "";

    // 1. Factory & Year baseline
    if (factory === 'tula') {
      if (year === '1942') {
        baseLow = 5500;
        baseHigh = 7500;
        rarityScore = 99;
        rarityBadge = "HOLY GRAIL (Ultra-Rare)";
        highlights.push("🏆 <strong>1942 Tula PU Sniper:</strong> Only ~2,020 produced during siege/evacuation. Fewer than 25 verified in the USA. Top market value reaches $8,000.");
      } else if (year === '1944') {
        baseLow = 2600;
        baseHigh = 4000;
        rarityScore = 88;
        rarityBadge = "Very Rare (Final Tula Run)";
        highlights.push("⭐ <strong>1944 Tula:</strong> Production stopped in May 1944. Only ~10,000 made. 5x scarcer than 1944 Izhevsk.");
      } else {
        baseLow = 2200;
        baseHigh = 3400;
        rarityScore = 82;
        rarityBadge = "Rare (Tula Wartime)";
        highlights.push("⭐ <strong>1943 Tula:</strong> Cyrillic 'СН' sniper proof. 4x scarcer than Izhevsk.");
      }
    } else if (factory === 'izhevsk') {
      if (year === '1942') {
        baseLow = 2800;
        baseHigh = 4400;
        rarityScore = 85;
        rarityBadge = "Very Rare (1st Year Izhevsk)";
        highlights.push("⭐ <strong>1942 Izhevsk:</strong> First production run. High combat attrition during 1942 counter-offensives.");
      } else if (year === '1945' || year === '1947') {
        baseLow = 4000;
        baseHigh = 6500;
        rarityScore = 95;
        rarityBadge = "Ultra-Rare (Post-War Trial)";
        highlights.push("⭐ <strong>Rare Final/Post-War Batch:</strong> Negligible numbers recorded.");
      } else {
        // Standard 1943 / 1944 Izhevsk baseline: $1,800 – $2,200 (around $2,000)
        baseLow = 1800;
        baseHigh = 2200;
        rarityScore = 65;
        rarityBadge = "Standard Wartime Backbone (~ $2,000 Baseline)";
      }
    }

    // 2. SCOPE PRICING IMPACT
    if (scopeMatch === 'matching_original_shank') {
      scopeValueImpact = 1800;
      scopeImpactDesc = "+$1,800 (100% Factory Stamped Matching Scope to Barrel Shank)";
      baseLow += 1400;
      baseHigh += 2000;
      highlights.push("🎯 <strong>Untouched Scope Serial Match:</strong> Barrel shank stamped scope serial number exactly matches physical optic. Top tier collector value.");
    } else if (scopeMatch === 'rare_fed_svt') {
      scopeValueImpact = 900;
      scopeImpactDesc = "+$900 (Rare 1940–1942 FED SVT-40 Optic in Shimmed Base)";
      baseLow += 700;
      baseHigh += 1100;
      highlights.push("🔭 <strong>Rare FED SVT Optic:</strong> Authentic pre-war/early Kharkov FED scope with factory shims.");
    } else if (scopeMatch === 'krasnogorsk_393') {
      scopeValueImpact = 650;
      scopeImpactDesc = "+$650 (Authentic Factory #393 Krasnogorsk Scope)";
      baseLow += 400;
      baseHigh += 700;
    } else if (scopeMatch === 'arsenal_matched_ep') {
      scopeValueImpact = 500;
      scopeImpactDesc = "Authentic Soviet Arsenal Restamped/EP Matched Scope (Standard Refurb Baseline)";
    } else if (scopeMatch === 'authentic_soviet_nonmatching') {
      scopeValueImpact = 350;
      scopeImpactDesc = "-$150 Authentic WWII Soviet PU Optic, Non-Matching Serial";
      baseLow -= 150;
      baseHigh -= 150;
    } else if (scopeMatch === 'reproduction_scope') {
      scopeValueImpact = -700;
      scopeImpactDesc = "-$700 (Modern Reproduction / Fake Optic Penalty)";
      baseLow -= 650;
      baseHigh -= 800;
      highlights.push("⚠️ <strong>Reproduction Optic Detected:</strong> Modern commercial scope reduces rifle to shooter grade.");
    } else if (scopeMatch === 'no_scope_base_only') {
      scopeValueImpact = -850;
      scopeImpactDesc = "-$850 (Missing Optic / Base & Mount Only)";
      baseLow -= 750;
      baseHigh -= 950;
    }
    priceDrivers.push(scopeImpactDesc);

    // Scope Optics Condition
    if (scopeOpticsCondition === 'mint_optics') {
      baseLow += 150;
      baseHigh += 200;
      priceDrivers.push("+$150 Crystal Clear Optics, Crisp Reticle & Smooth Turrets");
    } else if (scopeOpticsCondition === 'foggy_cloudy') {
      baseLow -= 250;
      baseHigh -= 300;
      priceDrivers.push("-$250 Cloudy / Delaminated Lens or Gritty/Binding Turret Movement");
    }

    // 3. Configuration
    if (config === 'original_matching') {
      baseLow *= 1.25;
      baseHigh *= 1.30;
      priceDrivers.push("+30% Original Non-Refurbished Provenance");
    } else if (config === 'soviet_refurb') {
      priceDrivers.push("Baseline: Authentic Soviet Arsenal Refurbished (~ $2,000 range)");
    } else if (config === 'resnipered_exsniper') {
      baseLow = 850;
      baseHigh = 1250;
      priceDrivers.push("-45% Re-Snipered Ex-Sniper (Collector restored with civilian drilled holes)");
    } else if (config === 'decommissioned_exsniper') {
      baseLow = 550;
      baseHigh = 800;
      priceDrivers.push("-65% Decommissioned Ex-Sniper (Optics Removed & Plugged)");
    } else if (config === 'reproduction_faux') {
      baseLow = 700;
      baseHigh = 950;
      priceDrivers.push("⚠️ Commercial Clone / Faux Sniper ($700-$950 Shooter Value Only)");
    }

    // 4. Serial Matching
    if (matchingType === 'factory_stamped' && config === 'original_matching') {
      baseLow += 600;
      baseHigh += 1200;
      priceDrivers.push("+$800-$1,200 All Factory Stamped Matching Parts (Non-EP)");
    } else if (matchingType === 'electropencil') {
      priceDrivers.push("Standard Soviet Arsenal Electro-Pencil (EP) Matched");
    } else if (matchingType === 'mismatched') {
      baseLow *= 0.82;
      baseHigh *= 0.82;
      priceDrivers.push("-18% Mismatched Component Serial Numbers");
    }

    // 5. Stock Condition & Unsanded Cartouches
    if (stockCondition === 'unsanded_crisp_cartouche') {
      baseLow *= 1.25;
      baseHigh *= 1.35;
      priceDrivers.push("+30% Unsanded Original Stock with Crisp Factory Cartouches");
      highlights.push("🌲 <strong>Unsanded Stock Premium:</strong> Sharp factory wrist and deep, un-buffed factory proof cartouches.");
    } else if (stockCondition === 'laminated_stock') {
      baseLow += 50;
      baseHigh += 100;
      priceDrivers.push("Soviet Laminated Birch Plywood Refurb Stock");
    } else if (stockCondition === 'heavily_sanded_refurb' || stockCondition === 'refinished_modern') {
      baseLow *= 0.88;
      baseHigh *= 0.88;
      priceDrivers.push("-12% Heavily Sanded or Non-Military Stock Refinish");
    }

    // 6. Importer
    if (importer === 'pre68') {
      baseLow *= 1.25;
      baseHigh *= 1.35;
      priceDrivers.push("+25% Pre-1968 / Vet Bringback (ZERO Import Stampings)");
      highlights.push("📜 <strong>Zero Import Markings:</strong> Pristine pre-GCA / battlefield bring-back provenance.");
    } else if (importer === 'rguns') {
      baseLow += 100;
      baseHigh += 200;
      priceDrivers.push("+$150 RGuns Import (Mark on Receiver Top Under Scope Lens, Clean Crates)");
    } else if (importer === 'groupwest') {
      baseLow += 75;
      baseHigh += 150;
      priceDrivers.push("+$100 Group West Import (Tiny Under-Barrel Mark, Receiver Flat Serial Only)");
      highlights.push("🔎 <strong>Minimal Group West Marking:</strong> Import serial is only found on the receiver flat under a closed bolt — easy to overlook, no barrel billboard or stamp block.");
    } else if (importer === 'century_billboard') {
      baseLow -= 150;
      baseHigh -= 200;
      priceDrivers.push("-$150 Century Arms Laser Billboard on Receiver Wall");
    } else if (importer === 'mitchells_real') {
      priceDrivers.push("Mitchell's Mausers (Verified Real Russian Molot Import with Cert)");
    }

    // 7. Bore Condition
    if (boreCondition === 'mint_excellent') {
      baseLow *= 1.12;
      baseHigh *= 1.15;
      priceDrivers.push("+15% Mint / Unissued Bore & Metal Finish");
    } else if (boreCondition === 'good_shooter') {
      baseLow *= 0.90;
      baseHigh *= 0.90;
      priceDrivers.push("-10% Shooter Grade Bore / Worn Finish");
    } else if (boreCondition === 'fair_worn') {
      baseLow *= 0.75;
      baseHigh *= 0.75;
      priceDrivers.push("-25% Battlefield Worn / Pitted Bore");
    }

    // Cap maximum at $8,000 for top holy grail rifles — the site's own
    // calibration ceiling (see file header). Once a rifle's low estimate
    // pushes past $7,500 it's pulled back to $7,200 so the band doesn't
    // collapse to a single number right at the $8,000 ceiling.
    if (baseHigh > 8000) baseHigh = 8000;
    if (baseLow > 7500) baseLow = 7200;

    // Round to the nearest $25 — real listings don't quote odd dollar
    // amounts, and it also hides the false precision of stacking ~10
    // independent percentage/flat modifiers together.
    let finalLow = Math.round(baseLow / 25) * 25;
    let finalHigh = Math.round(baseHigh / 25) * 25;
    // Negative modifiers (mismatched parts, faux clone, etc.) can compress
    // the band until low/high invert or collide; enforce a minimum $300
    // spread so the result still reads as a range rather than a point estimate.
    if (finalHigh < finalLow) finalHigh = finalLow + 300;
    if (finalHigh > 8000) finalHigh = 8000;

    let html = `
      <div class="calc-valuation-display">
        <div class="val-header">
          <span class="rarity-badge ${rarityScore > 85 ? 'badge-ultra' : 'badge-standard'}">${rarityBadge}</span>
          <div class="rarity-meter-wrap">
            <div class="rarity-label">Collector Rarity Index: <strong>${rarityScore}/100</strong></div>
            <div class="rarity-bar">
              <div class="rarity-fill" style="width: ${rarityScore}%;"></div>
            </div>
          </div>
        </div>

        <div class="val-price-card">
          <div class="price-title">Estimated Fair Market Value (US Collector Market):</div>
          <div class="price-range">
            $${finalLow.toLocaleString()} – $${finalHigh.toLocaleString()}
          </div>
          <div class="price-trend">
            Market Baseline: <strong>Typical Soviet Refurb sits at ~$2,000 | Holy Grail 1942 Tula up to $8,000</strong>
          </div>
        </div>

        <!-- Scope Pricing Impact Feature Box -->
        <div class="scope-valuation-highlight-box ${scopeValueImpact >= 0 ? 'positive-scope' : 'negative-scope'}">
          <div class="scope-box-header">
            <strong>🔭 Scope & Optics Valuation Contribution:</strong>
            <span class="scope-impact-num ${scopeValueImpact >= 0 ? 'plus' : 'minus'}">
              ${scopeValueImpact >= 0 ? '+' : ''}$${Math.abs(scopeValueImpact).toLocaleString()}
            </span>
          </div>
          <p class="scope-box-text">${scopeImpactDesc}</p>
        </div>

        ${highlights.length > 0 ? `
          <div class="val-highlights">
            ${highlights.map(h => `<div class="highlight-item">${h}</div>`).join('')}
          </div>
        ` : ''}

        <div class="price-drivers-box">
          <div class="drivers-title">Active Valuation Modifiers:</div>
          <ul class="drivers-list">
            ${priceDrivers.map(d => `<li>${d}</li>`).join('')}
          </ul>
        </div>

        <div class="liquidity-box">
          <div class="liq-row">
            <span class="liq-label">Collector Liquidity Rating:</span>
            <span class="liq-val high">${rarityScore > 80 ? 'Extremely High (Rare Surplus / Priority Buy)' : 'Strong Demand (~ $2,000 Market)'}</span>
          </div>
          <div class="liq-row">
            <span class="liq-label">Authentication Status:</span>
            <span class="liq-val">${config === 'reproduction_faux' ? 'Shooter clone only' : 'Verify barrel proofs before purchase'}</span>
          </div>
        </div>
      </div>
    `;

    resultsContainer.innerHTML = html;
  }
};
