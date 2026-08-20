/**
 * PRODUCTION MATRIX & SERIAL PREFIX REGISTRY
 * 
 * Izhevsk Factory #74 and Tula Factory #535 WWII Production Data (1942–1947).
 */

window.ProductionMatrix = {
  currentFilter: 'all',
  searchQuery: '',

  init() {
    this.renderMatrix();
    this.bindEvents();
  },

  renderMatrix() {
    const container = document.getElementById('production-matrix-container');
    if (!container) return;

    const data = this.getFilteredData();

    let html = `
      <div class="matrix-wrapper">
        <!-- Controls Bar -->
        <div class="matrix-controls-bar">
          <div class="filter-pills">
            <button type="button" class="pill-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">
              All Arsenals (Izhevsk & Tula)
            </button>
            <button type="button" class="pill-btn ${this.currentFilter === 'tula' ? 'active' : ''}" data-filter="tula">
              Tula Factory #535 / #66 Only
            </button>
            <button type="button" class="pill-btn ${this.currentFilter === 'izhevsk' ? 'active' : ''}" data-filter="izhevsk">
              Izhevsk Factory #74 Only
            </button>
            <button type="button" class="pill-btn ${this.currentFilter === '1942' ? 'active' : ''}" data-filter="1942">
              🔥 1942 Production Only
            </button>
          </div>

          <div class="matrix-search-box">
            <input type="text" id="matrix-search" class="search-input" placeholder="Search year, serial prefix (e.g. БА, ТБ)..." value="${this.searchQuery}">
            <span class="search-icon">🔍</span>
          </div>
        </div>

        <!-- 1942 Tula Spotlight Alert Banner -->
        <div class="rarity-spotlight-banner">
          <div class="spotlight-icon">⭐</div>
          <div class="spotlight-content">
            <h4>The 1942 Rarity Benchmark: Why 1942 Rifles Command Such Massive Premiums</h4>
            <p>During the critical emergency of 1942, Tula Factory #535 was evacuated under artillery siege to Mednogorsk, producing only <strong>~2,020 PU snipers</strong> before relocating. Surviving authentic 1942 Tula rifles are among the rarest collectible firearms in North America (fewer than 25 verified examples known in the US).</p>
            <p>1942 Izhevsk rifles (~12,600 made) represent first-year PU production and command significant premiums over standard 1943–1944 rifles.</p>
          </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
          <table class="matrix-table">
            <thead>
              <tr>
                <th>Arsenal / Plant</th>
                <th>Year</th>
                <th>Units Produced</th>
                <th>Rarity Tier & Score</th>
                <th>US Survival Est.</th>
                <th>US Market Value</th>
                <th>Known Cyrillic Prefixes</th>
              </tr>
            </thead>
            <tbody>
              ${data.length > 0 ? data.map(item => `
                <tr class="${item.year === '1942' ? 'highlight-row-1942' : ''}">
                  <td class="factory-cell">
                    <strong>${item.factoryName}</strong>
                    <span class="factory-loc">${item.location}</span>
                  </td>
                  <td>
                    <span class="year-badge ${item.year === '1942' ? 'badge-1942' : ''}">${item.year}</span>
                  </td>
                  <td>
                    <span class="unit-count">${item.count > 0 ? item.count.toLocaleString() : 'Trials (< 100)'}</span>
                  </td>
                  <td>
                    <span class="rarity-pill ${item.rarityScore > 85 ? 'rarity-ultra' : 'rarity-std'}">
                      ${item.rarityTier}
                    </span>
                    <div class="matrix-rarity-bar">
                      <div class="matrix-rarity-fill" style="width: ${item.rarityScore}%;"></div>
                    </div>
                  </td>
                  <td>
                    <span class="survivor-count">${item.survivorsUS}</span>
                  </td>
                  <td>
                    <span class="val-range">${item.estValueRange}</span>
                  </td>
                  <td>
                    <div class="prefix-wrap">
                      <div class="prefix-tags">
                        ${item.prefixes.slice(0, 8).map(p => `<span class="prefix-tag">${p}</span>`).join('')}
                        ${item.prefixes.length > 8 ? `<span class="prefix-tag more">+${item.prefixes.length - 8} more</span>` : ''}
                      </div>
                    </div>
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="7" class="empty-table-msg">No production records found matching your search.</td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;
  },

  getFilteredData() {
    const raw = window.MOSIN_DATA.production;
    let list = [];

    // Flatten data (Izhevsk and Tula only)
    ['tula', 'izhevsk'].forEach(factKey => {
      const fact = raw[factKey];
      if (!fact) return;
      Object.keys(fact.years).forEach(yr => {
        const yData = fact.years[yr];
        list.push({
          factoryKey: factKey,
          factoryName: fact.factoryName,
          location: fact.location,
          year: yr,
          count: yData.count,
          rarityTier: yData.rarityTier,
          rarityScore: yData.rarityScore,
          survivorsUS: yData.survivorsUS,
          estValueRange: yData.estValueRange,
          prefixes: yData.prefixes || [],
          notes: yData.notes
        });
      });
    });

    // Apply Filter
    if (this.currentFilter === 'tula') {
      list = list.filter(item => item.factoryKey === 'tula');
    } else if (this.currentFilter === 'izhevsk') {
      list = list.filter(item => item.factoryKey === 'izhevsk');
    } else if (this.currentFilter === '1942') {
      list = list.filter(item => item.year === '1942');
    }

    // Apply Search
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(item => 
        item.factoryName.toLowerCase().includes(q) ||
        item.year.includes(q) ||
        item.rarityTier.toLowerCase().includes(q) ||
        item.prefixes.some(p => p.toLowerCase().includes(q))
      );
    }

    return list;
  },

  bindEvents() {
    const container = document.getElementById('production-matrix-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const pillBtn = e.target.closest('.pill-btn');
      if (pillBtn) {
        this.currentFilter = pillBtn.getAttribute('data-filter');
        this.renderMatrix();
        this.bindSearchInput();
      }
    });

    this.bindSearchInput();
  },

  bindSearchInput() {
    const searchInput = document.getElementById('matrix-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      this.searchQuery = e.target.value;
      this.renderMatrix();
      // Keep focus on input after re-render
      const newSearchInput = document.getElementById('matrix-search');
      if (newSearchInput) {
        newSearchInput.focus();
        newSearchInput.setSelectionRange(newSearchInput.value.length, newSearchInput.value.length);
      }
    });
  }
};
