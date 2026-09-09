/**
 * COLLECTOR PHOTO GALLERY
 *
 * Renders a grid of hand-picked collection photos with a click-through
 * lightbox. Background of every photo has been digitally cleaned to a
 * neutral white so proof marks and optics detail read clearly.
 */

window.CollectorGallery = {
  items: [
    {
      img: 'assets/images/gallery/collection-lineup.jpg',
      tag: 'Overview',
      title: 'The Working Collection',
      teaser: 'Six 91/30 PU snipers racked side by side.',
      desc: 'Six PU snipers from different factories and production years, racked side by side. Lined up like this, the consistency of the Kochetov side-mount system stands out immediately — the offset bracket, the ring spacing, and the bolt handle clearance are nearly identical across rifles built years apart.'
    },
    {
      img: 'assets/images/gallery/side-mount-scope-detail.jpg',
      tag: 'Optics & Mount',
      title: 'Mount Base Inspector Marks',
      teaser: 'Pencilled property numbers on the mount base.',
      desc: 'A closer look at the mount base, stamped with a serial and pencilled with inspector or armory property numbers ("ГВ 478", "44 13/52") — the kind of secondary handwritten notation that shows up during Soviet arsenal rebuilds. The leather retention strap looped through the mount is original-pattern.'
    },
    {
      img: 'assets/images/gallery/scope-ring-1940-mark.jpg',
      tag: 'Proof Marks',
      title: '1940 Scope Tube Hallmark',
      teaser: 'An early-production PU scope tube, dated 1940.',
      desc: 'A factory hallmark, serial "№3240," and the year "1940" rolled directly into the scope tube. 1940 is the PU scope\'s first production year — these early tubes were originally built for the SVT-40 before thousands were redirected to the newly adopted 91/30 PU after 1942.'
    },
    {
      img: 'assets/images/gallery/scope-ring-1942-mark.jpg',
      tag: 'Proof Marks',
      title: '1942 Optics Serial',
      teaser: 'Hammer-and-sickle hallmark dated to the PU\'s adoption year.',
      desc: 'A hammer-and-sickle optics hallmark, the year "1942," serial "№А-21308," and a "РОМ" inspector stamp rolled into the tube. 1942 is the year the 91/30 PU was officially adopted, right as Soviet optical plants were scrambling to keep pace with frontline demand.'
    },
    {
      img: 'assets/images/gallery/scope-ring-krasnogorsk.jpg',
      tag: 'Proof Marks',
      title: 'Serialed Scope, Arsenal Rework Code',
      teaser: 'Serial 4337778 alongside a later overhaul stamp.',
      desc: 'A pentagon-shaped hammer-and-sickle optics hallmark, serial "4337778," and a secondary "Р□59" code stamped beneath it. Codes like this were typically added during a Cold War-era arsenal overhaul, when scopes were re-inspected, re-matched, and re-stamped before rifles went back into storage.'
    },
    {
      img: 'assets/images/gallery/receiver-arsenal-star.jpg',
      tag: 'Proof Marks',
      title: '1944 Receiver & "МО" Overhaul Stamp',
      teaser: 'A wartime receiver bearing a later arsenal rework mark.',
      desc: 'The receiver ring shows a hammer-and-sickle proof, the production year "1944," serial "МН5468," and — stamped just beneath it — the boxed "МО" mark commonly associated with a later Soviet arsenal overhaul. Seeing both a wartime date and a rework stamp on the same rifle is normal: most surviving PU snipers passed through at least one Cold War-era refurbishment.'
    },
    {
      img: 'assets/images/gallery/receiver-1936-tula.jpg',
      tag: 'Proof Marks',
      title: '1938 Star Proof',
      teaser: 'A five-point Soviet star flanked by inspector letters.',
      desc: 'A five-point Soviet star flanked by the inspector letters "С" and "П," the production year "1938," and serial "СР421" stamped into the receiver ring. This action started life years before the PU program even existed — a reminder that most 91/30 actions were pulled from existing pre-war stock and converted, not built new as snipers.'
    },
    {
      img: 'assets/images/gallery/ati-importer-mark.jpg',
      tag: 'Importer Marks',
      title: 'ATI Rochester Import Mark',
      teaser: '"ATI Roch. NY S0211" — a US compliance stamp.',
      desc: 'A crisp "ATI Roch. NY S0211" roll-mark on the barrel. American Tactical Imports (Rochester, NY) is one of the importers that brought Soviet surplus PU snipers into the US market, and federal law requires every imported firearm to carry a mark like this naming the importer and its city and state.'
    },
    {
      img: 'assets/images/gallery/kras-importer-mark.jpg',
      tag: 'Importer Marks',
      title: 'Compliance & Caliber Roll-Mark',
      teaser: '"MADE IN RUSSIA" and caliber, stamped for US import.',
      desc: 'The model, caliber, and country of origin — "91/30," "7.62x54R," "MADE IN RUSSIA" — roll-marked into the barrel alongside the original Russian proof roundels. This combination of Cyrillic-era Soviet proofs sitting next to English-language import text is exactly what collectors look for to confirm a rifle came in through a legitimate, documented import channel.'
    },
    {
      img: 'assets/images/gallery/stock-serial-channel.jpg',
      tag: 'Authenticity Detail',
      title: 'Hidden Serial in the Barrel Channel',
      teaser: 'A serial hand-scratched where only a disassembled rifle reveals it.',
      desc: 'Serial "83111" and a secondary Cyrillic serial "ПА 3512" scratched into the wood of the barrel channel, visible only with the action out of the stock. Soviet armorers marked hidden surfaces like this precisely so a mismatched stock, mount, or barrel could be caught later — it is one of the first places serious buyers check before paying serious money.'
    },
    {
      img: 'assets/images/gallery/stock-cartouche.jpg',
      tag: 'Wood & Furniture',
      title: 'Sling Slot & Furniture Detail',
      teaser: 'The oval steel-lined sling slot cut into the buttstock.',
      desc: 'The oval, steel-lined sling slot let into the buttstock, with the deep reddish shellac finish typical of a Soviet arsenal refinish. Unissued and lightly-issued stocks tend to show a lighter, more honey-toned wood; this darker, glossier finish is what most Cold War-refurbished PU stocks look like today.'
    },
    {
      img: 'assets/images/gallery/rifle-full-profile.jpg',
      tag: 'Optics & Mount',
      title: 'Kochetov Mount, Two Rifles Compared',
      teaser: 'Two racked rifles showing how consistent the mount really is.',
      desc: 'Two side-mounted rifles racked together, one stacked above the other. Comparing them directly shows just how consistently the Kochetov mount, bolt handle clearance, and trigger guard were executed across separate production runs — this was a wartime rifle built to a tight, repeatable spec, not a series of one-off gunsmith conversions.'
    }
  ],

  activeIndex: 0,   // index into `items` currently shown in the open lightbox

  init() {
    this.renderGallery();
    this.bindEvents();
  },

  // Renders the card grid plus the (initially hidden) lightbox markup — both
  // built once here since this module has no filters/search to re-render for.
  renderGallery() {
    const container = document.getElementById('collector-gallery-container');
    if (!container) return;

    const cards = this.items.map((item, idx) => `
      <button type="button" class="gallery-card" data-gallery-idx="${idx}" aria-label="View larger: ${item.title}">
        <span class="gallery-card-img-wrap">
          <img src="${item.img}" alt="${item.title} — Mosin-Nagant 91/30 PU sniper detail" loading="lazy">
        </span>
        <span class="gallery-card-body">
          <span class="gallery-card-tag">${item.tag}</span>
          <span class="gallery-card-title">${item.title}</span>
          <span class="gallery-card-teaser">${item.teaser}</span>
        </span>
      </button>
    `).join('');

    container.innerHTML = `
      <p class="gallery-disclaimer">
        📷 All photos below are of rifles from a private American collection. Backgrounds have been digitally cleaned to neutral white so the stamps and hallmarks are easier to read — nothing else about the rifles has been altered.
      </p>
      <div class="gallery-grid">${cards}</div>

      <div class="gallery-lightbox-overlay" id="gallery-lightbox-overlay">
        <div class="gallery-lightbox-box" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-title">
          <button type="button" class="gallery-lightbox-close" id="gallery-lightbox-close" aria-label="Close">✕</button>
          <div class="gallery-lightbox-img-wrap">
            <img src="" alt="" id="gallery-lightbox-img">
          </div>
          <div class="gallery-lightbox-info">
            <span class="gallery-card-tag" id="gallery-lightbox-tag"></span>
            <h3 id="gallery-lightbox-title"></h3>
            <p id="gallery-lightbox-desc"></p>
            <div class="gallery-lightbox-nav">
              <button type="button" class="btn btn-secondary" id="gallery-lightbox-prev">← Previous</button>
              <button type="button" class="btn btn-secondary" id="gallery-lightbox-next">Next →</button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // Opens (or jumps to a new photo within) the lightbox. `idx` is wrapped
  // with modulo so Prev/Next can pass activeIndex - 1 / + 1 without bounds
  // checking and correctly loop from the first photo to the last and back.
  openLightbox(idx) {
    const overlay = document.getElementById('gallery-lightbox-overlay');
    if (!overlay) return;
    this.activeIndex = (idx + this.items.length) % this.items.length;
    const item = this.items[this.activeIndex];

    document.getElementById('gallery-lightbox-img').src = item.img;
    document.getElementById('gallery-lightbox-img').alt = item.title;
    document.getElementById('gallery-lightbox-tag').textContent = item.tag;
    document.getElementById('gallery-lightbox-title').textContent = item.title;
    document.getElementById('gallery-lightbox-desc').textContent = item.desc;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeLightbox() {
    const overlay = document.getElementById('gallery-lightbox-overlay');
    if (!overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  // One delegated click listener handles opening a card, closing via the ✕
  // button, Prev/Next, and clicking the dark overlay backdrop to dismiss.
  // A separate document-level keydown listener adds Esc/←/→ shortcuts,
  // scoped to only act while the lightbox is actually open.
  bindEvents() {
    const container = document.getElementById('collector-gallery-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const card = e.target.closest('.gallery-card');
      if (card) {
        this.openLightbox(parseInt(card.getAttribute('data-gallery-idx'), 10));
        return;
      }
      if (e.target.closest('#gallery-lightbox-close')) {
        this.closeLightbox();
        return;
      }
      if (e.target.closest('#gallery-lightbox-prev')) {
        this.openLightbox(this.activeIndex - 1);
        return;
      }
      if (e.target.closest('#gallery-lightbox-next')) {
        this.openLightbox(this.activeIndex + 1);
        return;
      }
      if (e.target.id === 'gallery-lightbox-overlay') {
        this.closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      const overlay = document.getElementById('gallery-lightbox-overlay');
      if (!overlay || !overlay.classList.contains('open')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.openLightbox(this.activeIndex - 1);
      if (e.key === 'ArrowRight') this.openLightbox(this.activeIndex + 1);
    });
  }
};
