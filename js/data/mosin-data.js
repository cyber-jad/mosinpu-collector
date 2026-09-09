/**
 * MOSIN NAGANT PU SNIPER - AUTHORITATIVE COLLECTOR DATASET
 * 
 * Historical data, production statistics, serial prefix registries,
 * optical factories, refurbishment arsenals, and US importer records.
 * Primary research courtesy of Alexey (https://www.m9130.info/pu-snipers).
 */

window.MOSIN_DATA = {
  // Factory Production Statistics (Izhevsk and Tula only)
  // rarityScore: 0-100 scarcity/desirability rating used to sort and color-code year entries in the Production Matrix (higher = rarer).
  production: {
    tula: {
      factoryName: "Tula Factory #535 / #66",
      location: "Tula / Mednogorsk (Evacuated)",
      totalProduction: 47020,
      years: {
        "1942": {
          count: 2020,
          rarityTier: "Holy Grail (Ultra-Rare)",
          rarityScore: 99,
          survivorsUS: "< 25 known",
          estValueRange: "$5,500 – $8,000+",
          prefixes: ["БА", "БВ", "БГ", "БД", "БЕ", "БЖ", "БЗ"],
          notes: "Manufactured during siege/evacuation to Mednogorsk. Base lacks top-rear clearance notch. Barrel shank has Cyrillic 'СН' and NO scope serial. Peak collector value up to $8,000."
        },
        "1943": {
          count: 35000,
          rarityTier: "Rare",
          rarityScore: 82,
          survivorsUS: "1,200 – 1,800",
          estValueRange: "$2,200 – $3,400",
          prefixes: ["ГА", "ГБ", "ГВ", "ГГ", "ГД", "ДЕ", "ДЖ", "ДЗ", "ЕА", "ЕБ"],
          notes: "Resumed full production at Factory #535. Stamped with Cyrillic 'СН' above the Tula star. High collector demand."
        },
        "1944": {
          count: 10000,
          rarityTier: "Very Rare (Final Run)",
          rarityScore: 88,
          survivorsUS: "350 – 500",
          estValueRange: "$2,600 – $4,200",
          prefixes: ["ЖА", "ЖБ", "ЖВ", "ЖГ", "ЖД", "ЗА", "ЗБ"],
          notes: "Production terminated in May 1944. Roughly 5x scarcer than 1944 Izhevsk. Highly sought after."
        }
      }
    },
    izhevsk: {
      factoryName: "Izhevsk Factory #74",
      location: "Izhevsk, Udmurt ASSR",
      totalProduction: 299833,
      years: {
        "1942": {
          count: 12600,
          rarityTier: "Very Rare (1st Year Izhevsk)",
          rarityScore: 85,
          survivorsUS: "450 – 700",
          estValueRange: "$2,800 – $4,500",
          prefixes: ["АА", "АБ", "АВ", "АГ", "АД", "БА", "ББ"],
          notes: "First year of PU sniper production at Izhevsk. Stamped with 'C in a circle' proof and scope serial number on left barrel shank."
        },
        "1943": {
          count: 147580,
          rarityTier: "Standard Wartime Backbone",
          rarityScore: 65,
          survivorsUS: "12,000 – 18,000",
          estValueRange: "$1,700 – $2,300",
          prefixes: ["ТА", "ТБ", "ТВ", "ТГ", "УА", "УБ", "УВ", "ФА", "ФБ", "ХА", "ХБ", "ЦА", "ЦБ", "ЧА", "ЧБ", "ША", "ШБ", "ЩА", "ЩБ", "ЭА", "ЭБ", "ЮА", "ЮБ", "ЯА", "ЯБ"],
          notes: "Peak WWII production year. Most authentic Soviet arsenal refurbished rifles in the US market trade right around $2,000."
        },
        "1944": {
          count: 139653,
          rarityTier: "Standard Wartime Backbone",
          rarityScore: 64,
          survivorsUS: "10,000 – 15,000",
          estValueRange: "$1,700 – $2,300",
          prefixes: ["АА", "АБ", "АВ", "АГ", "БА", "ББ", "БВ", "ВА", "ВБ", "ГА", "ГБ", "ДА", "ДБ", "ЕА", "ЕБ", "ЖА", "ЖБ", "ЗА", "ЗБ", "ИА", "ИБ", "КА", "КБ", "ЛА", "ЛБ"],
          notes: "High production year. Transitioned from screwed stock escutcheons to pressed steel liners in late 1944. Typical value around $2,000."
        },
        "1945": {
          count: 0,
          rarityTier: "Ultra-Rare (Late Post-War Trial)",
          rarityScore: 95,
          survivorsUS: "< 10 known",
          estValueRange: "$4,000 – $6,500",
          prefixes: ["Trial batches"],
          notes: "Post-war final cleanup assembly. Negligible production recorded."
        },
        "1947": {
          count: 0,
          rarityTier: "Ultra-Rare (Post-War Trials)",
          rarityScore: 95,
          survivorsUS: "< 10 known",
          estValueRange: "$4,000 – $6,500",
          prefixes: ["Trial batches"],
          notes: "Small post-war experimental sniper evaluation lot."
        }
      }
    }
  },

  // Optical Scope Manufacturers (5 Soviet Plants)
  scopeFactories: [
    {
      id: "factory_357",
      name: "Factory #357 NKV ('Progress')",
      city: "Leningrad / Evacuated to Omsk",
      logoDesc: "Tombstone arch enclosing inverted optical prism and reticle crosshairs",
      years: "1940–1945",
      construction: "Solid forged steel tube, black hot bluing, occasional plum oxidized ocular bells",
      standaloneValue: "$550 – $750"
    },
    {
      id: "factory_393",
      name: "Factory #393 NKV (Krasnogorsk)",
      city: "Krasnogorsk, Moscow Oblast",
      logoDesc: "Elongated trapezoid prism pierced by a horizontal arrow",
      years: "1943–1944",
      construction: "Steel and Silumin (aluminum-silicon alloy) anodized tubes",
      standaloneValue: "$650 – $900"
    },
    {
      id: "factory_297",
      name: "Factory #297 NKV",
      city: "Yoshkar-Ola, Mari ASSR",
      logoDesc: "Arc segment with central diamond and radiating optical rays",
      years: "1943–1945",
      construction: "Steel tube with sharp optical glass quality",
      standaloneValue: "$550 – $750"
    },
    {
      id: "factory_237",
      name: "Factory #237 NKV",
      city: "Kazan, Tatar ASSR",
      logoDesc: "Inverted trapezoid with converging optical rays",
      years: "1943–1944",
      construction: "SVT tube scopes and late-war PU scopes",
      standaloneValue: "$600 – $800"
    },
    {
      id: "factory_353",
      name: "Factory #353 / #296 NKV ('FED')",
      city: "Kharkov / Evacuated to Berdsk",
      logoDesc: "Stylized Cyrillic 'ФЭД' camera plant logo",
      years: "1940–1942",
      construction: "Early SVT-40 scopes retrofitted to 1942 Mosin snipers with shims",
      standaloneValue: "$900 – $1,500"
    }
  ],

  // Authenticity Diagnostic Factors for Authenticity Wizard
  // Each option's `points` value is added to a running total by authenticity-wizard.js;
  // the final sum is compared against thresholds there to render a verdict
  // (genuine / arsenal refurb / ex-sniper / likely fake). Negative points flag red-flag answers.
  authFactors: [
    {
      id: "barrel_proofs",
      title: "Barrel Shank Proofmarks & Stamping",
      question: "What specific markings are present on the top and left side of the barrel shank?",
      options: [
        {
          id: "izh_c_circle",
          label: "Izhevsk: 'C-in-circle' proof + Scope serial stamped on left side of shank",
          detail: "Authentic Factory #74 sniper barrel proof. Izhevsk factory SOP required stamping the scope serial on the left shank.",
          points: 25
        },
        {
          id: "tula_ch_clean",
          label: "Tula: Cyrillic 'СН' stamp above star + Clean left shank (NO scope serial)",
          detail: "Authentic Factory #535 sniper marking. Tula NEVER stamped the scope serial on the barrel shank at the factory.",
          points: 25
        },
        {
          id: "lined_out_scope_serial",
          label: "Izhevsk: Scope serial on left shank is LINED OUT / STRUCK THROUGH with new serial nearby",
          detail: "Classic Soviet Cold War arsenal refurbishment proof (e.g. Riga #7, Kiev #2). Scope was replaced at depot.",
          points: 15
        },
        {
          id: "no_proof",
          label: "Standard infantry markings only (NO 'C-in-circle', NO 'СН', NO shank scope serial)",
          detail: "CRITICAL RED FLAG: Standard infantry rifle barrel. Indicates a modern commercial 'faux' sniper conversion.",
          points: -30
        }
      ]
    },
    {
      id: "receiver_geometry",
      title: "Receiver Shape & Mount Clearance Milling",
      question: "Examine the receiver profile and the cutout on the left receiver wall:",
      options: [
        {
          id: "round_factory_notch",
          label: "Round receiver with smooth factory-milled mount clearance notch (Blued over from factory)",
          detail: "Correct military high-wall round receiver geometry with smooth factory machining.",
          points: 20
        },
        {
          id: "hex_receiver",
          label: "Hexagonal (Hex) receiver",
          detail: "RED FLAG: Soviet military 91/30 PU snipers were ONLY built on round receivers (1942–1944). Hex PU snipers are 100% fantasy fakes.",
          points: -40
        },
        {
          id: "dremeled_rough_cut",
          label: "Rough, un-blued dremel / hand-ground wood and receiver notch",
          detail: "RED FLAG: Post-import civilian or commercial gunsmith conversion.",
          points: -25
        }
      ]
    },
    {
      id: "kochetov_mount",
      title: "Kochetov Side Mount Assembly & Screws",
      question: "Inspect the side scope mount base and clamping bracket:",
      options: [
        {
          id: "forged_mount_domed_screws",
          label: "Hot-forged steel mount with rough interior radius chatter & rounded/domed screws with locking pins",
          detail: "Authentic Soviet military D.M. Kochetov mount assembly.",
          points: 20
        },
        {
          id: "cast_repro_flat_screws",
          label: "Smooth cast steel mount with mold seams and flat-topped machine screws",
          detail: "RED FLAG: Modern commercial Chinese or Ukrainian reproduction mount.",
          points: -20
        },
        {
          id: "aluminum_mount",
          label: "Aluminum or lightweight alloy aftermarket mount base",
          detail: "RED FLAG: Modern aftermarket commercial scope base.",
          points: -35
        }
      ]
    },
    {
      id: "scope_optics",
      title: "PU 3.5x Scope Body, Dials & Turret Screws",
      question: "Examine the scope tube, dials, and turret screws closely:",
      options: [
        {
          id: "authentic_domed_screws",
          label: "Wartime factory logo (Progress #357, Krasnogorsk #393, Yoshkar-Ola #297, Kazan #237) + Domed turret screws with locking pins",
          detail: "100% genuine WWII Soviet optical manufacture.",
          points: 20
        },
        {
          id: "flat_screws_repro",
          label: "Flat-head modern machine screws on turret dials (no locking pins)",
          detail: "RED FLAG: Modern commercial replica scope.",
          points: -25
        },
        {
          id: "made_in_russia_stamp",
          label: "Marked 'Made in Russia' or modern commercial English export text",
          detail: "RED FLAG: Modern commercial post-1991 scope.",
          points: -30
        }
      ]
    },
    {
      id: "bolt_handle",
      title: "Turned-Down Bolt Handle Construction",
      question: "Inspect the bent sniper bolt handle and root:",
      options: [
        {
          id: "factory_forged_bent_bolt",
          label: "Forged bent bolt handle with smooth contour and Tula star or Izhevsk arrow proof on root",
          detail: "Authentic Soviet military sniper bolt handle.",
          points: 15
        },
        {
          id: "welded_infantry_bolt",
          label: "Infantry straight bolt handle cut, bent, and welded with visible seam line or grinder marks",
          detail: "RED FLAG: Commercial conversion of a standard infantry bolt.",
          points: -25
        }
      ]
    },
    {
      id: "receiver_holes_exsniper",
      title: "Receiver Interior & Ex-Sniper Plug Check",
      question: "Open the bolt and look inside the left interior receiver wall:",
      options: [
        {
          id: "clean_threaded_holes",
          label: "Clean drilled & tapped holes holding the original Kochetov mount screws securely",
          detail: "Genuine sniper receiver maintaining original factory mount geometry.",
          points: 15
        },
        {
          id: "plugged_welded_holes",
          label: "Steel threaded plugs or welded spots visible inside (ex-sniper converted back to sniper)",
          detail: "Ex-Sniper: Was decommissioned to infantry service and subsequently re-snipered.",
          points: 5,
          type: "ex_sniper"
        }
      ]
    }
  ],

  // Arsenal Refurbishment Depots
  arsenals: [
    { code: "1st GRAU Arsenal No. 7", location: "Riga, Latvia", mark: "[/]", symbol: "Square with diagonal slash", notes: "Most prolific Cold War refurbisher. High quality rebluing and EP matching." },
    { code: "Arsenal No. 2", location: "Kiev, Ukraine", mark: "▲ 1 or ▲ 2", symbol: "Triangle with number inside", notes: "Ukrainian Military District depot. Excellent re-arsenaled finish." },
    { code: "Artillery Base No. 1", location: "Lysva, Perm Krai", mark: "[+]", symbol: "Circle or square with cross", notes: "Ural military district refurbishments." },
    { code: "Arsenal No. 25", location: "Unknown Soviet Depot", mark: "[ | ]", symbol: "Diamond with vertical slash", notes: "Found on select post-war refurbished snipers." },
    { code: "WZR (Wojskowe Zakłady Remontowe)", location: "Poland", mark: "W.Z.R.", symbol: "Stenciled cartouche", notes: "Polish military refurbished Soviet sniper rifles." }
  ],

  // Major US Importers
  importers: [
    {
      id: "rguns",
      name: "RGuns (Carpentersville, IL)",
      importEra: "2000s–2010s",
      reputation: "Gold Standard for Unissued / Matching",
      importMarkStyle: "Small mark on top of the receiver, just under the front scope lens — never on the barrel side or under the scope mount",
      authenticityRate: "99% Real Authentic Sniper Crates",
      priceImpact: "+ $200 – $400 Premium",
      description: "Imported unissued sniper crates directly from Ukrainian military storage. High percentage of all-stamped factory matching rifles with original scopes. Rifles show electro-penciled matching serial and scope numbers on the mount, consistent with a 1960s–1970s Soviet arsenal refurbishment before export.",
      keyNotes: "Highly sought after by serious collectors for un-molested factory originality. RED FLAG: if the 'RGuns' mark appears anywhere else — on the barrel side, under the scope mount, or on a standard non-sniper M91/30 — treat it as a strong indicator of a faked import mark."
    },
    {
      id: "molot",
      name: "Molot / Vyatskie Polyany (KO-91/30M)",
      importEra: "2010s",
      reputation: "Authentic Russian Arsenal Factory Export",
      importMarkStyle: "'Bn' trademark on the receiver and under the handguard, plus a diamond Russian government proof mark. IO Inc. (the US importer/distributor) added the BATF-required serial behind the barrel shank and its own import mark on the barrel near the muzzle; some later batches carry the Molot import mark on top of the receiver instead.",
      authenticityRate: "98% Genuine Russian Arsenal Refurbs",
      priceImpact: "High Solid Value ($1,800 – $2,200)",
      description: "Direct exports from Russian Ministry of Defense strategic reserve depots, distributed in the US by IO Inc. through sellers like AIM Surplus, Century, and Centerfire.",
      keyNotes: "Comes with official Russian arsenal proof passports and matching serial documentation. CAUTION: scope numbers on Molots are frequently relined or restamped in visibly modern fonts — don't assume a Molot's scope-to-mount serial match is untouched wartime work. Tula-marked Molot examples are unusual in showing the scope number stamped on the barrel itself."
    },
    {
      id: "ati",
      name: "ATI (American Tactical Imports)",
      importEra: "2010s",
      reputation: "Clean Authentic Refurbished Snipers",
      importMarkStyle: "Small discreet under-barrel marking",
      authenticityRate: "95% Genuine Soviet Refurbs",
      priceImpact: "Solid Market Baseline ($1,800 – $2,100)",
      description: "Imported genuine Soviet arsenal refurbished snipers with minimal cosmetic disruption.",
      keyNotes: "Very clean imports with minimal billboard interruption."
    },
    {
      id: "samco",
      name: "Samco Global Arms (Miami, FL)",
      importEra: "1990s–2000s",
      reputation: "Early Surplus Imports (Yugoslav Reserve Stock)",
      importMarkStyle: "Clean barrel stamping near muzzle; the rifle's own serial number is stamped under the buttplate rather than laser-marked on the receiver",
      authenticityRate: "90% Genuine Early Imports",
      priceImpact: "Strong Provenance ($1,800 – $2,300)",
      description: "Famous early surplus batches sourced from Yugoslavian military reserves — imported as bare sniper rifles WITHOUT scopes, so the Kochetov mount holes are present, drilled, and tapped (sometimes still with the mounting pins in place) but no optic is included.",
      keyNotes: "Two easy visual tells for a genuine Samco Yugoslav import: the cleaning rod head is brazed on and shows brass/gold coloring at the joint, and the packing grease is noticeably darker than typical Russian-depot grease. Since these came without scopes, a period-correct scope must be sourced and fitted separately — factor that into value versus a rifle that arrived with matching original optics."
    },
    {
      id: "groupwest",
      name: "Group West",
      importEra: "1990s",
      reputation: "Minimal-Mark Early Surplus Import",
      importMarkStyle: "Tiny discreet mark under the barrel near the muzzle end; import serial stamped on the receiver flat, visible only with the bolt closed",
      authenticityRate: "High — Genuine Soviet Surplus",
      priceImpact: "Solid Provenance (comparable to other discreet-mark imports, ~$1,800 – $2,200)",
      description: "Part of the 1990s wave of importers bringing in Soviet surplus rifles, distinguished by unusually minimal, easy-to-overlook import marking compared to later importers' barrel billboards.",
      keyNotes: "Check the receiver flat under the closed bolt for the import serial — it's easy to miss since there's no under-barrel stamp block or billboard like later imports used."
    },
    {
      id: "mitchells",
      name: "Mitchell's Mausers",
      importEra: "2000s–2010s",
      reputation: "Heavy Marketing / Legitimate Molot Imports",
      importMarkStyle: "Molot Russian export marks + Mitchell's packaging",
      authenticityRate: "85% Real Molot Refurbs (Check Proofs)",
      priceImpact: "Market Value ($1,700 – $2,100)",
      description: "While Mitchell's was notorious for over-marketing German Mausers, their Mosin PU snipers were genuine Molot-imported Russian arsenal refurbs.",
      keyNotes: "Always verify the barrel shank for genuine 'C-in-circle' or 'СН' proofs."
    },
    {
      id: "century",
      name: "Century Arms International (CAI)",
      importEra: "1990s–2010s",
      reputation: "Two Distinct Categories: Real Refurbs vs Commercial Builds",
      importMarkStyle: "Early: discreet under-barrel. Late: Large laser billboard on receiver wall. Genuine Ukrainian-sourced Century sniper imports often carry serial numbers beginning with the prefix '9130S'.",
      authenticityRate: "50% Real Refurbs / 50% US Faux Builds",
      priceImpact: "Variable ($750 Clone vs $1,800+ Real Refurb)",
      description: "Century imported 100% genuine Soviet arsenal refurbished snipers, BUT also assembled commercial 'faux' snipers in the US using standard 91/30 infantry rifles and reproduction scopes.",
      keyNotes: "Mandatory to check barrel shank for 'C-in-circle' or 'СН' proofs and forged mount screws. On genuine examples the scope number is stamped on the barrel side; some rifles show this number deliberately scrubbed out."
    },
    {
      id: "tulsky",
      name: "Tulsky Patronny Zavod (via PW Arms)",
      importEra: "April 2014+",
      reputation: "Modern Russian Export, Clearly Marked",
      importMarkStyle: "PW Arms import marks on the barrel front and receiver front, 'Made in Russia' stamped on the right side of the receiver, a 'T inside a circle inside a triangle' Tulsky trademark, and the diamond Russian government proof mark. Additional markings appear on the rear sight base.",
      authenticityRate: "High — Genuine Russian Arsenal Stock",
      priceImpact: "Market Value ($1,700 – $2,100)",
      description: "One of the last major legal waves of Russian Mosin surplus into the US, imported by PW Arms starting April 2014 and sold on through dealers including SAMCO, AIM Surplus, Classic Arms, and Royal Tiger Imports.",
      keyNotes: "The heaviest and most explicit import marking of any major importer on this list — genuinely hard to miss, which also makes an UNMARKED rifle claimed as a 'Tulsky/PW Arms import' worth a second look."
    }
  ]
};

