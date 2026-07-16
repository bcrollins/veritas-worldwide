import type { Article } from './articles'

/**
 * Sourced replacement pack for the withdrawn fabricated B-pack.
 * Every source URL must resolve to a durable government or institutional host
 * (200/403). No invented path segments, no placeholder 2026 journalism URLs.
 */
export const expandedArticlesB: Article[] = [
  {
    id: 'election-security-ai-risk-frameworks-2026',
    slug: 'election-security-ai-risk-frameworks-cisa-nist-2026',
    title: 'Election Security and AI Risk Frameworks: What Primary Institutions Actually Publish',
    subtitle:
      'CISA election-security guidance and NIST’s AI Risk Management Framework define the public baseline for infrastructure protection and model risk — without requiring unverified incident claims.',
    author: 'Veritas Worldwide',
    publishDate: 'July 16, 2026',
    category: 'Surveillance & Civil Liberties',
    tags: ['election security', 'CISA', 'NIST', 'AI risk', 'infrastructure'],
    heroImage: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Seal_of_the_United_States_Department_of_Homeland_Security.svg/1024px-Seal_of_the_United_States_Department_of_Homeland_Security.svg.png',
      alt: 'Seal of the U.S. Department of Homeland Security',
      credit: 'Public Domain',
    },
    readingTime: 14,
    seo: {
      metaTitle: 'Election Security & AI Risk Frameworks | CISA and NIST Primary Sources',
      metaDescription:
        'How CISA election-security resources and the NIST AI Risk Management Framework set the public institutional baseline for election infrastructure and AI risk governance.',
      keywords: [
        'CISA election security',
        'NIST AI RMF',
        'election infrastructure',
        'AI risk management',
        'primary sources',
      ],
    },
    relatedChapters: ['chapter-18', 'chapter-19', 'chapter-27'],
    sources: [
      {
        id: 1,
        title: 'Election Security — CISA Topics Hub',
        publisher: 'Cybersecurity and Infrastructure Security Agency',
        url: 'https://www.cisa.gov/topics/election-security',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 2,
        title: 'AI Risk Management Framework',
        publisher: 'National Institute of Standards and Technology',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 3,
        title: 'U.S. Department of Justice — Main Portal',
        publisher: 'U.S. Department of Justice',
        url: 'https://www.justice.gov/',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 4,
        title: 'Bureau of Justice Assistance',
        publisher: 'Office of Justice Programs',
        url: 'https://bja.ojp.gov/',
        date: 'Ongoing',
        type: 'government',
      },
    ],
    content: [
      {
        type: 'text',
        text: 'Public debate about artificial intelligence and elections often collapses into unverifiable incident claims. The institutional record is narrower and more useful: the Cybersecurity and Infrastructure Security Agency publishes election-security guidance for infrastructure owners, and the National Institute of Standards and Technology publishes the AI Risk Management Framework as a voluntary but authoritative structure for identifying, measuring, and managing AI risks.',
      },
      {
        type: 'heading',
        text: 'What CISA Actually Owns',
      },
      {
        type: 'text',
        text: 'CISA’s election-security topic hub is the federal government’s standing public entry point for election infrastructure protection. It does not adjudicate campaign speech. It catalogs guidance, services, and coordination pathways for state and local election officials, vendors, and other infrastructure stakeholders. Readers evaluating AI-era election claims should start with what the designated infrastructure agency publishes — not with anonymous social posts.',
      },
      {
        type: 'evidence',
        text: 'CISA maintains a public Election Security topics page at cisa.gov/topics/election-security describing federal support for election infrastructure security. Source: CISA.',
        tier: 'verified',
      },
      {
        type: 'heading',
        text: 'NIST AI Risk Management Framework',
      },
      {
        type: 'text',
        text: 'NIST’s AI RMF is deliberately non-regulatory. It provides a shared vocabulary — map, measure, manage, govern — for organizations deploying AI systems. For election-adjacent AI (content moderation tooling, fraud detection, synthetic media detection research), the framework is the primary federal technical reference. It does not certify any commercial deepfake detector, and it should not be cited as if it did.',
      },
      {
        type: 'quote',
        text: 'The AI RMF is intended for voluntary use and to improve the ability to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems.',
        attribution: 'NIST — AI Risk Management Framework overview',
      },
      {
        type: 'heading',
        text: 'Justice Department Context Without Overclaim',
      },
      {
        type: 'text',
        text: 'Federal criminal and civil enforcement around election interference, foreign influence, and technology-facilitated fraud sits with the Department of Justice and related components. Public portals at justice.gov and bja.ojp.gov are the correct starting points for program documentation. Specific case outcomes require charging documents, pleas, or judgments — not press paraphrases alone.',
      },
      {
        type: 'callout',
        text: 'This article deliberately avoids unverified deepfake incident tallies. When a specific synthetic-media incident is alleged, the publication standard is a named primary source (court filing, agency advisory, or multi-outlet corroboration with linked originals).',
      },
      {
        type: 'heading',
        text: 'How Readers Should Use These Sources',
      },
      {
        type: 'text',
        text: 'Pair CISA guidance with state election-board publications for operational claims. Pair NIST AI RMF language with vendor documentation only when evaluating a named system. For criminal allegations, require DOJ or court primary records. That discipline is how The Record separates infrastructure risk from narrative inflation.',
      },
    ],
  },
  {
    id: 'treasury-debt-transparency-fiscaldata-2026',
    slug: 'treasury-debt-transparency-fiscaldata-fed-h15-2026',
    title: 'Debt Transparency Without the Panic: FiscalData, Monthly Treasury Statements, and Fed Rate Tables',
    subtitle:
      'How to read the federal debt position from primary Treasury datasets and Federal Reserve statistical releases — and what those sources do not claim.',
    author: 'Veritas Worldwide',
    publishDate: 'July 16, 2026',
    category: 'Federal Reserve & Banking',
    tags: ['national debt', 'Treasury', 'FiscalData', 'FOMC', 'H.15', 'interest rates'],
    heroImage: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/United_States_Department_of_the_Treasury_Seal.svg/1024px-United_States_Department_of_the_Treasury_Seal.svg.png',
      alt: 'Seal of the United States Department of the Treasury',
      credit: 'Public Domain',
    },
    readingTime: 12,
    seo: {
      metaTitle: 'Treasury Debt Transparency | FiscalData and Fed H.15 Primary Sources',
      metaDescription:
        'Read federal debt and interest-rate data from Treasury FiscalData, Monthly Treasury Statements, and Federal Reserve H.15 releases — primary sources only.',
      keywords: [
        'debt to the penny',
        'FiscalData',
        'Monthly Treasury Statement',
        'Federal Reserve H.15',
        'federal debt primary sources',
      ],
    },
    relatedChapters: ['chapter-3', 'chapter-9', 'chapter-10', 'chapter-12'],
    sources: [
      {
        id: 1,
        title: 'Debt to the Penny Dataset',
        publisher: 'U.S. Treasury Fiscal Data',
        url: 'https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/debt-to-the-penny',
        date: 'Daily',
        type: 'government',
      },
      {
        id: 2,
        title: 'Monthly Treasury Statement (MTS)',
        publisher: 'Bureau of the Fiscal Service',
        url: 'https://fiscal.treasury.gov/reports-statements/mts/',
        date: 'Monthly',
        type: 'government',
      },
      {
        id: 3,
        title: 'H.15 — Selected Interest Rates',
        publisher: 'Board of Governors of the Federal Reserve System',
        url: 'https://www.federalreserve.gov/releases/h15/',
        date: 'Weekly',
        type: 'government',
      },
      {
        id: 4,
        title: 'Federal Open Market Committee',
        publisher: 'Board of Governors of the Federal Reserve System',
        url: 'https://www.federalreserve.gov/monetarypolicy/fomc.htm',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 5,
        title: 'Treasury International Capital (TIC) Data',
        publisher: 'U.S. Department of the Treasury',
        url: 'https://www.treasury.gov/resource-center/data-chart-center/tic/Pages/index.aspx',
        date: 'Ongoing',
        type: 'government',
      },
    ],
    content: [
      {
        type: 'text',
        text: 'Federal debt rhetoric often freezes a single headline number and invents a crisis timeline. The primary record is more granular. Treasury Fiscal Data publishes “Debt to the Penny,” the Bureau of the Fiscal Service publishes Monthly Treasury Statements, the Federal Reserve publishes H.15 selected interest rates, and the FOMC publishes policy materials. Together they support careful claims about debt stock, cash operations, and rate environment without requiring secondary speculation.',
      },
      {
        type: 'heading',
        text: 'Debt to the Penny',
      },
      {
        type: 'text',
        text: 'FiscalData’s Debt to the Penny dataset is the public series for total public debt outstanding. It is updated daily and is the correct citation for “what is the debt today?” claims. It does not, by itself, prove insolvency, default risk, or political intent. It is a stock measure with defined components (debt held by the public and intragovernmental holdings).',
      },
      {
        type: 'evidence',
        text: 'U.S. Treasury Fiscal Data hosts the Debt to the Penny dataset with daily total public debt outstanding. Source: fiscaldata.treasury.gov.',
        tier: 'verified',
      },
      {
        type: 'heading',
        text: 'Monthly Treasury Statement',
      },
      {
        type: 'text',
        text: 'The Monthly Treasury Statement summarizes receipts, outlays, and the deficit/surplus for the month and fiscal year to date. Interest on the public debt appears in outlay tables. Readers comparing “interest vs. defense” narratives should pull the MTS tables rather than viral graphics.',
      },
      {
        type: 'heading',
        text: 'Rates: H.15 and the FOMC',
      },
      {
        type: 'text',
        text: 'H.15 provides selected interest rates, including Treasury yields and related series. FOMC materials document the policy rate target range and the Committee’s published rationale. Linking debt-service stress to rate levels requires both: debt stock/composition from Treasury and rate context from the Fed. Neither agency’s public portal claims a single “crisis date.”',
      },
      {
        type: 'stat',
        stat: {
          value: 'Daily',
          label: 'Debt to the Penny update cadence (FiscalData)',
        },
      },
      {
        type: 'heading',
        text: 'Foreign Holdings Context via TIC',
      },
      {
        type: 'text',
        text: 'Treasury International Capital data tracks cross-border portfolio flows and positions. It is the primary public source for careful claims about foreign official and private holdings of U.S. securities. Misreading TIC tables is a common source of false “who owns the debt” narratives.',
      },
      {
        type: 'callout',
        text: 'This article does not forecast a fiscal crisis date. It maps the primary dashboards readers should use before accepting secondary debt panic claims.',
      },
    ],
  },
  {
    id: 'aviation-safety-ntsb-faa-primary-2026',
    slug: 'aviation-safety-ntsb-faa-primary-records-2026',
    title: 'Aviation Safety Claims Belong in NTSB and FAA Primary Records',
    subtitle:
      'How to evaluate manufacturing, maintenance, and accident narratives using NTSB investigations and FAA public portals — not viral corporate conspiracy frames.',
    author: 'Veritas Worldwide',
    publishDate: 'July 16, 2026',
    category: 'Accountability & Transparency',
    tags: ['aviation safety', 'NTSB', 'FAA', 'accident investigation', 'primary sources'],
    heroImage: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/FAA_logo.svg/1024px-FAA_logo.svg.png',
      alt: 'Federal Aviation Administration logo',
      credit: 'Public Domain',
    },
    readingTime: 11,
    seo: {
      metaTitle: 'Aviation Safety Primary Sources | NTSB and FAA Records',
      metaDescription:
        'Evaluate aviation safety and manufacturing claims using NTSB investigation records and FAA public portals — the durable federal primary sources.',
      keywords: ['NTSB', 'FAA', 'aviation safety', 'accident reports', 'primary sources'],
    },
    relatedChapters: ['chapter-20', 'chapter-21'],
    sources: [
      {
        id: 1,
        title: 'NTSB — Investigations and Accident Reports',
        publisher: 'National Transportation Safety Board',
        url: 'https://www.ntsb.gov/',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 2,
        title: 'NTSB Accident Report AIR-24-01 Portal',
        publisher: 'National Transportation Safety Board',
        url: 'https://www.ntsb.gov/investigations/AccidentReports/Pages/AIR2401.aspx',
        date: '2024',
        type: 'government',
      },
      {
        id: 3,
        title: 'FAA Newsroom',
        publisher: 'Federal Aviation Administration',
        url: 'https://www.faa.gov/newsroom',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 4,
        title: 'FAA Aircraft Information',
        publisher: 'Federal Aviation Administration',
        url: 'https://www.faa.gov/aircraft',
        date: 'Ongoing',
        type: 'government',
      },
    ],
    content: [
      {
        type: 'text',
        text: 'Aviation safety controversies attract simplified villain stories. The federal primary system is slower and more rigorous: the National Transportation Safety Board investigates civil transportation accidents and publishes reports; the Federal Aviation Administration regulates civil aviation and publishes airworthiness and operational guidance. Veritas treats those portals as the baseline for any manufacturing or maintenance claim that reaches public readers.',
      },
      {
        type: 'heading',
        text: 'NTSB as the Investigation Record',
      },
      {
        type: 'text',
        text: 'NTSB reports document factual findings, analysis, and recommendations. They are not criminal indictments. When a public narrative asserts intent, concealment, or individual criminal liability, the NTSB report alone is usually insufficient — and that boundary should remain visible in publication prose.',
      },
      {
        type: 'evidence',
        text: 'The NTSB maintains public investigation and accident report collections at ntsb.gov, including numbered aviation investigation reports such as AIR-24-01. Source: NTSB.',
        tier: 'verified',
      },
      {
        type: 'heading',
        text: 'FAA as the Regulatory Record',
      },
      {
        type: 'text',
        text: 'FAA newsroom releases, airworthiness directives, and aircraft information pages establish the regulator’s public posture. Readers should separate emergency orders, proposed rules, and final rules. Collapsing those categories is a common secondary-media failure mode.',
      },
      {
        type: 'heading',
        text: 'How This Publication Handles Safety Claims',
      },
      {
        type: 'text',
        text: 'For any major aviation incident: (1) cite the NTSB docket or report number when available; (2) cite the FAA release or directive by date; (3) label incomplete investigations as open; (4) keep corporate communications as statements, not findings. That method is slower than social media and more accurate.',
      },
      {
        type: 'callout',
        text: 'This article does not restate disputed whistleblower narratives without primary dockets. When those materials become public records, they can be added with the same evidence-tier discipline used across The Record.',
      },
    ],
  },
  {
    id: 'judicial-ethics-scotus-code-2026',
    slug: 'judicial-ethics-supreme-court-code-of-conduct-primary-2026',
    title: 'Judicial Ethics Starts With the Court’s Own Code — Not Viral Gift Lists Alone',
    subtitle:
      'The Supreme Court’s November 13, 2023 Code of Conduct for Justices is the primary institutional text for ethics claims about the Court; secondary reporting must still attach to primary documents.',
    author: 'Veritas Worldwide',
    publishDate: 'July 16, 2026',
    category: 'Accountability & Transparency',
    tags: ['Supreme Court', 'judicial ethics', 'Code of Conduct', 'recusal', 'transparency'],
    heroImage: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Supreme_Court_US_2021.jpg/1280px-Supreme_Court_US_2021.jpg',
      alt: 'United States Supreme Court building',
      credit: 'Public Domain',
    },
    readingTime: 10,
    seo: {
      metaTitle: 'Supreme Court Code of Conduct Primary Text | Judicial Ethics',
      metaDescription:
        'How to ground Supreme Court ethics claims in the Court’s November 13, 2023 Code of Conduct for Justices and related primary materials.',
      keywords: [
        'Supreme Court Code of Conduct',
        'judicial ethics',
        'Justices ethics code',
        'recusal',
        'primary sources',
      ],
    },
    relatedChapters: ['chapter-22', 'chapter-23', 'chapter-28'],
    sources: [
      {
        id: 1,
        title: 'Code of Conduct for Justices of the Supreme Court of the United States (November 13, 2023)',
        publisher: 'Supreme Court of the United States',
        url: 'https://www.supremecourt.gov/about/Code-of-Conduct-for-Justices_November_13_2023.pdf',
        date: 'November 13, 2023',
        type: 'government',
      },
      {
        id: 2,
        title: 'Supreme Court of the United States — Official Portal',
        publisher: 'Supreme Court of the United States',
        url: 'https://www.supremecourt.gov/',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 3,
        title: 'U.S. Senate Committee on Appropriations',
        publisher: 'U.S. Senate',
        url: 'https://www.appropriations.senate.gov/',
        date: 'Ongoing',
        type: 'government',
      },
      {
        id: 4,
        title: 'Office of Management and Budget',
        publisher: 'Executive Office of the President',
        url: 'https://www.whitehouse.gov/omb/',
        date: 'Ongoing',
        type: 'government',
      },
    ],
    content: [
      {
        type: 'text',
        text: 'Ethics coverage of the Supreme Court often begins with secondary gift reporting. That reporting can be valuable when it attaches to financial disclosures or other primary filings. The Court’s own November 13, 2023 Code of Conduct for Justices is the institutional text that sets stated ethical expectations for the Justices. Any serious ethics analysis should open that PDF before extrapolating enforcement mechanisms the Code does not create.',
      },
      {
        type: 'heading',
        text: 'What the Code Is — and Is Not',
      },
      {
        type: 'text',
        text: 'The Code articulates canons on independence, integrity, diligence, and extrajudicial activities. It is not a criminal statute. It does not, by itself, create an inspector-general process with subpoena power. Secondary claims that “the Court has no ethics rules” are false after November 2023; secondary claims that “the Code fully solves enforcement” are also overstated. Precision matters.',
      },
      {
        type: 'evidence',
        text: 'The Supreme Court published the Code of Conduct for Justices as a public PDF dated November 13, 2023, hosted on supremecourt.gov. Source: Supreme Court of the United States.',
        tier: 'verified',
      },
      {
        type: 'heading',
        text: 'How to Use Secondary Journalism Responsibly',
      },
      {
        type: 'text',
        text: 'Investigative reporting on travel, hospitality, or relationships should be cited as journalism unless and until primary disclosures, court orders, or legislative records corroborate specific facts. The Record’s evidence tiers exist for this boundary: verified for primary documents; circumstantial for well-sourced reporting with incomplete primary attachment; disputed for contested interpretations.',
      },
      {
        type: 'heading',
        text: 'Budget and Oversight Context',
      },
      {
        type: 'text',
        text: 'Congressional appropriations and OMB materials define the fiscal environment for the judiciary as a branch. They do not adjudicate individual ethics allegations. Linking budget fights to ethics narratives without a primary connective record is a category error this publication refuses to make.',
      },
      {
        type: 'callout',
        text: 'For ethics claims about any Justice: open the Code, open the relevant financial disclosure if available, open any related court order or congressional record. Skip the viral summary until those attachments exist.',
      },
    ],
  },
]
