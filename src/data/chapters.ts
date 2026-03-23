export interface Source {
  id: number;
  text: string;
  url?: string;
}

export interface EvidenceBox {
  tier: 'verified' | 'circumstantial' | 'disputed';
  label: string;
  text: string;
}

export interface Quote {
  text: string;
  attribution: string;
  note?: string;
}

export interface StatCard {
  value: string;
  label: string;
}

export interface TableData {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export interface TimelineEvent {
  year: string;
  text: string;
}

export interface ContentBlock {
  type: 'dropcap' | 'text' | 'heading' | 'subheading' | 'quote' | 'evidence' | 'stats' | 'table' | 'timeline';
  text?: string;
  quote?: Quote;
  evidence?: EvidenceBox;
  stats?: StatCard[];
  table?: TableData;
  timeline?: TimelineEvent[];
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  dateRange: string;
  author: string;
  publishDate: string;
  content: ContentBlock[];
  sources: Source[];
  crossLinks: { label: string; chapterId: string }[];
  keywords: string[];
}

export const chapters: Chapter[] = [
  {
    id: 'foreword',
    number: 'Foreword',
    title: 'A Note on Methodology, Evidence Standards & How to Read This Book',
    subtitle: 'This is a reference work. It compiles primary source documents — court records, congressional testimony, declassified government files, academic studies, and verified financial disclosures — into a single chronological narrative.',
    dateRange: '',
    author: 'B.R.',
    publishDate: 'March 2026',
    content: [
      { type: 'dropcap', text: 'Before proceeding, it is necessary to address a phrase that will occur to many readers upon encountering this book\'s subject matter. The term "conspiracy theory" has become, in modern usage, a mechanism for dismissing inquiry rather than engaging with it. Its history is instructive. A 1967 CIA dispatch (Document 1035-960), declassified in 1976 under a Freedom of Information Act request by The New York Times, recommended that the Agency\'s media contacts use the term "conspiracy theorists" to discredit critics of the Warren Commission\'s findings on the assassination of President Kennedy. The document is available in full from the National Archives.' },
      { type: 'text', text: 'This is not to suggest that all claims labeled "conspiracy theories" are true. Many are not. It is to observe that the phrase functions, in practice, as a thought-terminating cliché — a label that substitutes for analysis. When a claim is false, it can be refuted with evidence. When a claim is true but inconvenient, it is often easier to label it a "conspiracy theory" than to address the evidence it presents.' },
      { type: 'text', text: 'This book does not ask the reader to accept any theory. It presents documented facts — sourced to primary documents that the reader can verify independently — and allows those facts to speak for themselves. Where the evidence is strong, we say so. Where the evidence is incomplete or contested, we say that as well. Where a mainstream counter-argument exists, we present it. The reader is the judge.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'THE COUNTER-ARGUMENT, STATED FAIRLY', text: 'Skeptics will argue — reasonably — that pattern recognition is not proof of coordination. The fact that the same institutions, families, or individuals appear across multiple historical events does not, by itself, prove that those events were orchestrated. Correlation is not causation. Institutional power tends to concentrate naturally in market economies, and the same names recur because wealth compounds across generations. This is a valid analytical framework, and the reader should keep it in mind throughout.' } },
      { type: 'heading', text: 'Methodology' },
      { type: 'text', text: 'The research methodology for this book follows the standards of academic historiography. Every factual claim is sourced. Sources are prioritized in a four-tier hierarchy: Tier 1 (Primary) includes congressional records, court filings, executive orders, declassified intelligence documents, SEC filings, Federal Register entries, and National Archives materials. Tier 2 (Peer-Reviewed) includes academic journal articles, university press monographs, and doctoral dissertations. Tier 3 (Verified Journalism) includes investigative reporting from established outlets with named sources, FOIA-obtained documents, and court-verified testimony. Tier 4 (Secondary) includes biographies, historical surveys, and memoirs used for context but not as sole evidence for factual claims.' },
      { type: 'heading', text: 'The Three-Tier Evidence Classification System' },
      { type: 'text', text: 'Every substantive claim in this book is classified using a three-tier evidence system. This system exists for a single purpose: to allow the reader to evaluate each claim independently, on its own merits, rather than accepting or rejecting the book as a whole.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — Primary Source Documentation', text: 'This claim is supported by a primary source document: a court filing, a congressional record, a National Archives document, a signed executive order, a published academic study with peer review, or a verified journalistic investigation based on primary sources. The source is cited. The document exists and is publicly accessible.' } },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL — Documented Facts, Interpretive Conclusion', text: 'Each individual fact in this section is documented and independently verifiable. However, the connection drawn between those facts — the inference that they form a pattern or indicate coordination — is an interpretation, not a proven conclusion. Alternative explanations exist and are noted where applicable.' } },
      { type: 'evidence', evidence: { tier: 'disputed', label: 'DISPUTED / UNPROVEN — Reported But Not Independently Confirmed', text: 'This claim has been made by a named source, in a published report, or in sworn testimony — but it has not been independently confirmed by multiple credible sources, proven in a court of law, or supported by primary documentation. It is included because it is part of the historical record. It is clearly labeled and should not be treated as established fact.' } },
      { type: 'heading', text: 'What This Book Is Not' },
      { type: 'text', text: 'This book is not a polemic. It does not argue for a single, unified "conspiracy" that explains all of modern history. The historical record is more complex than any single narrative can capture, and the authors of this book are aware that the desire to find patterns can itself become a form of bias — a phenomenon psychologists call apophenia.' },
      { type: 'text', text: 'This book is not a political document. It documents actions taken by both Republican and Democratic administrations, by both conservative and liberal institutions, and by individuals across the political spectrum. The patterns documented here do not align neatly with any partisan framework, which is itself part of the point.' },
      { type: 'quote', quote: { text: 'The real truth of the matter is, as you and I know, that a financial element in the larger centers has owned the Government ever since the days of Andrew Jackson.', attribution: 'Franklin D. Roosevelt, Letter to Colonel Edward House, November 21, 1933', note: 'Original held in the FDR Presidential Library, Hyde Park, NY' } },
      { type: 'quote', quote: { text: 'In the councils of government, we must guard against the acquisition of unwarranted influence, whether sought or unsought, by the military-industrial complex.', attribution: 'President Dwight D. Eisenhower, Farewell Address, January 17, 1961', note: 'Full text and video archived at the Eisenhower Presidential Library' } },
      { type: 'text', text: 'Every source cited in this book is publicly accessible. Congressional records are available through congress.gov. Court filings are available through PACER and public court websites. Declassified documents are available through the National Archives, the CIA FOIA Reading Room, and the National Security Archive at George Washington University. SEC filings are available through EDGAR. The reader is encouraged to verify any claim independently. This book is not asking for trust. It is asking for examination.' },
    ],
    sources: [
      { id: 1, text: 'Central Intelligence Agency, "Countering Criticism of the Warren Report," Dispatch 1035-960, April 1, 1967. Declassified 1976.', url: 'https://www.maryferrell.org' },
    ],
    crossLinks: [
      { label: 'Chapter 1: The Birth of Central Banking', chapterId: 'chapter-1' },
      { label: 'Overview: The World Today', chapterId: 'overview' },
    ],
    keywords: ['methodology', 'evidence', 'conspiracy theory', 'CIA', 'Warren Commission', 'primary sources', 'historiography'],
  },

  {
    id: 'overview',
    number: 'Overview',
    title: 'The World Today',
    subtitle: 'How a convergence of financial, political, pharmaceutical, and intelligence systems created the architecture of modern control — and why most people never notice.',
    dateRange: '2025',
    author: 'B.R.',
    publishDate: 'March 2026',
    content: [
      { type: 'dropcap', text: 'This chapter is your map. The chapters that follow will take you deep into the history — the Rothschild banking dynasty, the creation of the Federal Reserve, the assassination of JFK, the Epstein intelligence operation, and more. But before you descend into those details, you need to see the present clearly. What follows is a systematic overview of the interlocking systems that shape your daily life: what you eat, what you watch, who represents you, how your money works, and what happens to those who try to change it.' },
      { type: 'heading', text: 'I. Your Representatives Are Bought' },
      { type: 'text', text: 'The American Israel Public Affairs Committee (AIPAC) is the most powerful foreign-policy lobbying organization in the United States. In the 2024 election cycle alone, AIPAC and its affiliated entities directed $42.6 million to congressional candidates — reaching 489 individual recipients across both parties. This is not a partisan issue. Democrats received 58.6% of AIPAC funds; Republicans received 38.5%. The lobby buys both sides.' },
      { type: 'stats', stats: [
        { value: '$42.6M', label: 'AIPAC TOTAL (2024 CYCLE)' },
        { value: '489', label: 'CONGRESSIONAL RECIPIENTS' },
        { value: '$227K', label: 'AVG. SENATE RECIPIENT' },
        { value: '$87K', label: 'AVG. HOUSE RECIPIENT' },
      ] },
      { type: 'table', table: {
        headers: ['Rank', 'Recipient', 'Party', 'Total from AIPAC', 'Chamber'],
        rows: [
          ['1', 'Wesley Bell', 'D-MO', '$2,555,095', 'House'],
          ['2', 'George Latimer', 'D-NY', '$2,448,899', 'House'],
          ['3', 'Jacky Rosen', 'D-NV', '$1,269,951', 'Senate'],
          ['4', 'Robert Menendez', 'I-NJ', '$1,074,760', 'Senate'],
          ['5', 'Hakeem Jeffries', 'D-NY', '$866,425', 'House'],
          ['6', 'Josh Gottheimer', 'D-NJ', '$797,189', 'House'],
          ['7', 'Donald Bacon', 'R-NE', '$697,837', 'House'],
          ['8', 'Mike Johnson', 'R-LA', '$618,530', 'House'],
          ['9', 'Ted Cruz', 'R-TX', '$562,593', 'Senate'],
          ['10', 'Debbie Wasserman Schultz', 'D-FL', '$519,842', 'House'],
        ],
        caption: 'Source: OpenSecrets.org, FEC data released February 6, 2025. 2024 election cycle.',
      } },
      { type: 'text', text: 'The spending is strategic. When Rep. Cori Bush (D-MO) and Rep. Jamaal Bowman (D-NY) — both members of "The Squad" who vocally supported Palestinian rights — faced primary challenges, AIPAC flooded their opponents with cash. Wesley Bell received $2.55 million from AIPAC-linked donors and defeated Bush. George Latimer received $2.45 million and defeated Bowman. The message to Congress is unmistakable: criticize Israel, and you will be replaced.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — FEDERAL ELECTION COMMISSION RECORDS', text: 'All AIPAC contribution data is sourced from FEC filings as compiled by OpenSecrets.org. These are public records. Every dollar listed above is documented, traceable, and verifiable. The pattern is clear: AIPAC spends across both parties, targeting leadership positions and eliminating dissenters.' } },
      { type: 'heading', text: 'II. Six Corporations Control What You See' },
      { type: 'text', text: 'In 1983, fifty companies controlled the majority of American media. By 2025, that number has collapsed to six: Comcast, Walt Disney, Warner Bros. Discovery, Paramount Global, Sony, and Amazon. These six corporations control approximately 90% of what Americans read, watch, and hear. But the consolidation goes deeper than corporate logos.' },
      { type: 'text', text: 'A Harvard University investigation into media ownership revealed a striking pattern: the same institutional investors — Vanguard, BlackRock, and State Street — appear as top shareholders in virtually every major media company. Vanguard holds 13.05% of Fox/News Corp, 7.43% of CNN\'s parent company, and 7.66% of Disney/ABC. BlackRock holds 4.99% of Fox, 4.85% of CNN, and comparable stakes across the board. State Street rounds out the trio.' },
      { type: 'table', table: {
        headers: ['Media Company', 'Controlling Interest', 'Vanguard Stake', 'BlackRock Stake', 'Properties'],
        rows: [
          ['Fox / News Corp', 'Murdoch Family (39%)', '13.05%', '4.99%', 'Fox News, WSJ, NY Post'],
          ['CNN / Warner', 'AT&T / Discovery', '7.43%', '4.85%', 'CNN, HBO, TNT'],
          ['ABC / Disney', 'L. Powell Jobs Trust', '7.66%', '~4.5%', 'ABC, ESPN, FX, Marvel'],
          ['NBC / Comcast', 'Roberts Family', 'Major', 'Major', 'NBC, MSNBC, CNBC, Universal'],
          ['Paramount', 'Shari Redstone', 'Major', 'Major', 'CBS, MTV, Nickelodeon'],
        ],
        caption: 'Source: Harvard Future of Media Project, SEC filings, 2021.',
      } },
      { type: 'text', text: 'This means the same three asset managers that control your retirement fund also control the news you consume. The illusion of media diversity — Fox vs. CNN, MSNBC vs. Newsmax — masks a deeper unity of ownership. The "debate" is managed. The boundaries of acceptable discourse are set by the same capital.' },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL — OWNERSHIP ≠ EDITORIAL CONTROL', text: 'Institutional ownership does not automatically equal editorial control. Vanguard and BlackRock hold shares through index funds on behalf of millions of investors. However, these firms exercise proxy voting power at shareholder meetings, influence board composition, and set ESG standards that shape corporate behavior. The question is not whether they dictate headlines — it is whether the structural incentives of consolidated ownership produce a narrowing of permissible narratives.' } },
      { type: 'heading', text: 'III. Three Companies Own Everything' },
      { type: 'text', text: 'BlackRock, Vanguard, and State Street collectively manage approximately $25.9 trillion in assets — a figure that exceeds the entire GDP of the United States (~$28 trillion). BlackRock alone manages $12.5 trillion. These are not banks. They are asset managers — the silent majority shareholders of virtually every publicly traded corporation in America.' },
      { type: 'stats', stats: [
        { value: '$12.5T', label: 'BLACKROCK AUM' },
        { value: '$9.3T', label: 'VANGUARD AUM' },
        { value: '$4.1T', label: 'STATE STREET AUM' },
        { value: '$25.9T', label: 'COMBINED TOTAL' },
      ] },
      { type: 'text', text: 'BlackRock was founded in 1988 by Larry Fink and seven partners, initially as a risk-management division of Blackstone Group. By 2009, the U.S. Treasury had retained BlackRock Solutions to analyze and unwind the toxic assets from the 2008 financial crisis — effectively making a private firm the arbiter of the nation\'s financial recovery. The Federal Reserve allowed BlackRock to superintend the $130 billion debt settlement of Bear Stearns and AIG.' },
      { type: 'text', text: 'BlackRock\'s Aladdin platform — an acronym for Asset, Liability, and Debt and Derivative Investment Network — monitors and manages investment portfolios worth an estimated $21.6 trillion across all its clients, including sovereign wealth funds, pension systems, and central banks. One algorithm, one company, one system.' },
      { type: 'text', text: 'Between 2021 and 2023, institutional investors — led by firms in which BlackRock is the largest shareholder — purchased an unprecedented share of single-family homes across the United States. Invitation Homes, in which BlackRock holds the largest institutional stake, owns over 80,000 single-family rental properties. American Homes 4 Rent controls another 60,000+. In some Sun Belt markets, institutional buyers accounted for up to 25% of all home purchases, driving prices beyond the reach of first-time buyers and converting the American Dream of homeownership into a subscription service.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — SEC FILINGS & PUBLIC FINANCIAL DISCLOSURES', text: 'BlackRock\'s AUM figures are reported in quarterly SEC filings. Invitation Homes\' ownership structure is public record. The Federal Reserve\'s engagement of BlackRock during the 2008 crisis is documented in congressional testimony.' } },
      { type: 'heading', text: 'IV. What You Eat Is Making You Sick' },
      { type: 'text', text: 'In 1911, Procter & Gamble introduced Crisco — the first commercially produced shortening made from hydrogenated cottonseed oil. It was a revolution in food manufacturing, not because it was healthier, but because it was cheaper. Cottonseed oil had previously been classified as toxic waste from the cotton industry. Through aggressive marketing and partnerships with the American Heart Association, seed oils were rebranded as "heart-healthy" alternatives to animal fats.' },
      { type: 'text', text: 'The numbers tell the story. In 1900, soybean oil consumption in the United States was effectively zero. By 2025, Americans consume an average of 80 grams per day — a roughly 1,000-fold increase. Soybean oil alone now accounts for approximately 10% of total caloric intake in the American diet. Vegetable oils collectively represent 32% of the average American\'s calories — up from 0% before Crisco.' },
      { type: 'stats', stats: [
        { value: '1,000x', label: 'SOYBEAN OIL INCREASE SINCE 1900' },
        { value: '-51%', label: 'GLOBAL SPERM COUNT (1973-2018)' },
        { value: '-1%/yr', label: 'TESTOSTERONE DECLINE SINCE 1980S' },
      ] },
      { type: 'text', text: 'Male testosterone levels have been declining at approximately 1% per year since the 1980s, according to data published in the Journal of Clinical Endocrinology & Metabolism. Global sperm counts declined by 51% between 1973 and 2018, per a meta-analysis published in Human Reproduction Update.' },
      { type: 'heading', text: 'V. The Chronic Disease Machine' },
      { type: 'text', text: 'Approximately 60% of American adults now have at least one chronic disease, according to the National Institute for Health Care Management (NIHCM). Chronic, non-communicable diseases account for eight of the ten leading causes of death in the United States.' },
      { type: 'table', table: {
        headers: ['Condition', 'Prevalence (Earlier)', 'Prevalence (Recent)', 'Change'],
        rows: [
          ['Obesity', '30.5% (1999-2000)', '42.4% (2022)', '+39%'],
          ['Diabetes', '10.3% (2001-2004)', '13.2% (2017-2020)', '+28%'],
          ['Autoimmune Disorders', '~24M (2005 est.)', '~50M (2024 est.)', '+108%'],
          ['Childhood Obesity', '13.9% (1999-2000)', '19.7% (2017-2020)', '+42%'],
          ['Mental Health (Depression)', '6.7% (2005)', '8.4% (2021)', '+25%'],
        ],
        caption: 'Sources: CDC NHANES, NIH/PMC, NIHCM, KFF Health System Tracker.',
      } },
      { type: 'text', text: 'The United States spends $4.5 trillion per year on healthcare — more than any other nation on Earth, by a wide margin. Yet Americans are sicker than citizens of comparable nations. The system is not failing. It is succeeding — at generating revenue. Pfizer alone reported $100.3 billion in revenue in 2022, driven largely by COVID-19 vaccines and treatments. Since 2000, Pfizer has paid $4.7 billion in fines for illegal marketing, bribery, and fraud — including the largest pharmaceutical settlement in U.S. history ($2.3 billion in 2009).' },
      { type: 'quote', quote: { text: 'A patient cured is a customer lost.', attribution: 'Goldman Sachs Analyst Report on Gene Therapy, April 2018', note: 'Research note titled "The Genome Revolution"' } },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — CDC, NIH, AND CORPORATE FINANCIAL FILINGS', text: 'All chronic disease statistics are sourced from CDC NHANES surveys and NIH publications. Pfizer revenue and fine data are from SEC filings and Department of Justice records. The Goldman Sachs quote appeared in a research note titled "The Genome Revolution" (April 10, 2018).' } },
      { type: 'heading', text: 'VI. The Invisible Slave Trade' },
      { type: 'text', text: 'The International Labour Organization (ILO) estimates that 50 million people are living in conditions of modern slavery worldwide as of 2022 — including 27.6 million in forced labor and 22 million in forced marriage. The global profits from forced labor alone total an estimated $150 billion annually. Women and girls constitute 61% of all detected trafficking victims, and the majority are trafficked for sexual exploitation, according to the UNODC Global Report on Trafficking in Persons.' },
      { type: 'stats', stats: [
        { value: '50M', label: 'PEOPLE IN MODERN SLAVERY' },
        { value: '$150B', label: 'ANNUAL FORCED LABOR PROFITS' },
        { value: '61%', label: 'VICTIMS ARE WOMEN/GIRLS' },
      ] },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — ILO, UNODC, U.S. STATE DEPARTMENT', text: 'All trafficking statistics are sourced from the ILO Global Estimates of Modern Slavery (2022), the UNODC Global Report on Trafficking in Persons (2024), and the U.S. State Department Trafficking in Persons Report (2025).' } },
      { type: 'heading', text: 'VII. The Kushner Nexus' },
      { type: 'text', text: 'Jared Kushner — son-in-law of President Donald Trump and Senior Advisor to the President from 2017 to 2021 — represents one of the most visible intersections of American political power and Israeli interests in modern history. In 2007, Kushner Companies purchased 666 Fifth Avenue in Manhattan for $1.8 billion — a record price at the time. The building became a massive financial liability. In 2018, while Jared Kushner served as the administration\'s Middle East envoy, Brookfield Asset Management signed a 99-year lease on the property, paying $1.2 billion. A Senate Finance Committee investigation led by Sen. Ron Wyden found that Brookfield\'s funding came from the Government of Qatar.' },
      { type: 'text', text: 'After leaving the White House, Jared Kushner launched Affinity Partners, a private equity firm that received a $2 billion investment from the Saudi Arabian Public Investment Fund — a deal that drew scrutiny from the Senate Finance Committee and was described by ethics experts as unprecedented.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — SENATE INVESTIGATION, NYT, SEC FILINGS', text: 'The 666 Fifth Avenue deal, Qatar funding connection, and Saudi investment are documented in Senate Finance Committee correspondence, New York Times reporting, and SEC filings.' } },
      { type: 'heading', text: 'VIII. The Illusion of Opposition' },
      { type: 'text', text: 'George Soros — Hungarian-American financier, born 1930 — has distributed over $32 billion through his Open Society Foundations since 1984, making it one of the largest private philanthropic networks in history. The concept of controlled opposition — in which both sides of a political debate are funded or influenced by the same interests — is central to understanding modern political theater. The left-right paradigm, as presented by mainstream media, functions as a pressure-release valve: citizens are given the illusion of choice while the fundamental structures of power remain unchanged.' },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL — PATTERN ANALYSIS', text: 'The "controlled opposition" thesis is an analytical framework, not a proven conspiracy. What is verifiable: the same donor networks fund organizations on both sides of political debates. What is interpretive: whether this constitutes deliberate management of public discourse or simply reflects the reality of a political system dominated by wealth.' } },
      { type: 'heading', text: 'IX. The Architecture of Secrecy' },
      { type: 'text', text: 'Freemasonry is the world\'s oldest and largest fraternal organization, with an estimated 2-6 million members worldwide. At least fourteen U.S. Presidents have been confirmed Freemasons, including George Washington, Franklin D. Roosevelt, and Harry Truman. Founded at Yale University in 1832, Skull and Bones — formally known as "The Order of Death" — taps exactly 15 new members each year from the junior class. Its membership roster reads like a directory of American power: President George H.W. Bush, President George W. Bush, Secretary of State John Kerry, President William Howard Taft, and numerous heads of the CIA, major banks, and media organizations.' },
      { type: 'heading', text: 'X. The Map: How It All Connects' },
      { type: 'text', text: 'The systems documented in this chapter are not isolated. They are interlocking. The same institutional investors (BlackRock, Vanguard, State Street) that own the media companies also own the pharmaceutical companies, the defense contractors, the food conglomerates, and the banks. The same lobbying networks (AIPAC, AIPAC-affiliated PACs) that fund congressional campaigns also fund think tanks that shape foreign policy. This is the architecture of modern control. It is not a single conspiracy with a single mastermind. It is a system — a network of aligned interests that operates through institutional capture, financial leverage, and information control.' },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'A NOTE ON INTERPRETATION', text: 'The statistics and data presented in this overview chapter are drawn from public records, government filings, and peer-reviewed research. However, the juxtaposition of data points from different domains — lobbying, media ownership, asset management, public health — does not, by itself, establish causal relationships between them. Institutional concentration is a feature of mature market economies, and the same names recur across sectors because wealth and influence compound over time. The reader is encouraged to evaluate each data point on its own merits and to consider alternative explanations for the patterns presented.' } },
    ],
    sources: [
      { id: 1, text: 'OpenSecrets.org, "American Israel Public Affairs Cmte — Recipients," FEC data, 2024 election cycle, released February 6, 2025.', url: 'https://www.opensecrets.org' },
      { id: 2, text: 'The Motley Fool, "The Big 6 Largest Media Companies," February 2026.', url: 'https://www.fool.com' },
      { id: 3, text: 'Harvard University, The Future of Media Project, "Index of US Mainstream Media Ownership," May 2021.', url: 'https://www.harvard.edu' },
      { id: 4, text: 'BlackRock, Inc. SEC filings, Q4 2024 earnings report; Wikipedia, "BlackRock," citing multiple SEC and financial sources.', url: 'https://www.wikipedia.org' },
      { id: 5, text: 'Invitation Homes SEC filings; American Homes 4 Rent annual reports; Congressional Research Service, "Institutional Investors and the Single-Family Rental Market," 2023.' },
      { id: 6, text: 'NPR, "The Forgotten, Fascinating Saga of Crisco," January 9, 2012.', url: 'https://www.npr.org' },
      { id: 7, text: 'University of California, "Study Links America\'s Favorite Cooking Oil to Obesity," December 4, 2025.', url: 'https://www.universityofcalifornia.edu' },
      { id: 8, text: 'Mitchell Landon, "Shocking History of Seed Oils," January 2022, citing USDA consumption data.', url: 'https://www.mitchelllandon.com' },
      { id: 9, text: 'Travison, T.G. et al., "A Population-Level Decline in Serum Testosterone Levels in American Men," Journal of Clinical Endocrinology & Metabolism, 2007.' },
      { id: 10, text: 'Levine, H. et al., "Temporal trends in sperm count," Human Reproduction Update, 2022.' },
      { id: 11, text: 'University of Copenhagen / CBMR, "Not all calories are equal: Ultra-processed foods harm men\'s health," August 28, 2025.', url: 'https://www.ku.dk' },
      { id: 12, text: 'Whittaker, J., "Dietary trends and the decline in male reproductive health," Hormones, 2023, Springer.', url: 'https://www.springer.com' },
      { id: 13, text: 'National Institute for Health Care Management (NIHCM), "The Growing Burden of Chronic Diseases," April 3, 2025.', url: 'https://www.nihcm.org' },
      { id: 14, text: 'KFF Health System Tracker, "How has the burden of chronic diseases in the U.S. and peer nations changed over time?" April 16, 2025.', url: 'https://www.kff.org' },
      { id: 15, text: 'NIH / PMC, "The Burden of Chronic Disease," January 20, 2024.', url: 'https://www.nih.gov' },
      { id: 16, text: 'Pfizer Inc. Annual Report 2022, SEC filing. Revenue: $100.3 billion.' },
      { id: 17, text: 'U.S. Department of Justice, "Justice Department Announces Largest Health Care Fraud Settlement in Its History," September 2, 2009. Pfizer total fines since 2000: $4.7 billion.' },
      { id: 18, text: 'Morin, S.L., "Manufacturing illness: The role of big food and big pharma in the healthcare crisis," Health Economics and Management Review, Vol. 6, Issue 1, 2025.', url: 'https://www.armgpublishing.com' },
      { id: 19, text: 'International Labour Organization, Walk Free, and IOM, "Global Estimates of Modern Slavery," 2022.', url: 'https://www.ilo.org' },
      { id: 20, text: 'UNODC, "Global Report on Trafficking in Persons 2024."', url: 'https://www.unodc.org' },
      { id: 21, text: 'National Human Trafficking Hotline, Annual Report 2020.', url: 'https://humantraffickinghotline.org' },
      { id: 22, text: 'The New York Times, "Kushner\'s Financial Ties to Israel Deepen Even With Mideast Role," January 7, 2018.', url: 'https://www.nytimes.com' },
      { id: 23, text: 'U.S. Senate Finance Committee, Sen. Ron Wyden, "Investigation Into Kushner Conflicts of Interest," October 13, 2022.', url: 'https://www.senate.gov' },
      { id: 24, text: 'Museum of the Jewish People / Le Monde, "How Jared Kushner Became a Teenage Hero — and Learned To Be a Zionist," January 26, 2017.', url: 'https://www.motl.org' },
      { id: 25, text: 'Wikipedia, "Jared Kushner," citing multiple sources including NYT, WSJ, and DOJ records.', url: 'https://www.wikipedia.org' },
      { id: 26, text: 'The New York Times, "Kushner\'s Firm Got $2 Billion From Saudi Fund," April 10, 2022.' },
      { id: 27, text: 'Open Society Foundations, "About Us."', url: 'https://www.opensocietyfoundations.org' },
      { id: 28, text: 'Grand Lodge of British Columbia and Yukon, "U.S. Presidents and Freemasonry." Multiple historical sources.' },
      { id: 29, text: 'Robbins, A., Secrets of the Tomb: Skull and Bones, the Ivy League, and the Hidden Paths of Power, Little, Brown and Company, 2002.' },
    ],
    crossLinks: [
      { label: 'Ch. 14: AIPAC & Congressional Lobbying', chapterId: 'chapter-14' },
      { label: 'Ch. 11: Shadow Institutions', chapterId: 'chapter-11' },
      { label: 'Ch. 12: How the Federal Reserve Works', chapterId: 'chapter-12' },
      { label: 'Ch. 13: The 2008 Financial Crisis', chapterId: 'chapter-13' },
      { label: 'Ch. 20: Rockefeller Medicine', chapterId: 'chapter-20' },
      { label: 'Ch. 28: The Epstein Files', chapterId: 'chapter-28' },
    ],
    keywords: ['AIPAC', 'BlackRock', 'Vanguard', 'State Street', 'media consolidation', 'seed oils', 'chronic disease', 'Pfizer', 'lobbying', 'modern slavery', 'Kushner', 'Soros', 'Freemasonry', 'Skull and Bones'],
  },

  {
    id: 'chapter-1',
    number: 'Chapter 1',
    title: 'The Birth of Central Banking',
    subtitle: 'From the Frankfurt ghetto to the Bank of England, from Napoleon\'s wars to the halls of the United States Congress, the story of how private banking dynasties captured the power to create money, and what happened to those who tried to take it back.',
    dateRange: '1694–1836',
    author: 'B.R.',
    publishDate: 'March 2026',
    content: [
      { type: 'dropcap', text: 'In 1744, in a cramped alley of the Frankfurt Judengasse — the walled Jewish ghetto of Frankfurt am Main — a boy named Mayer Amschel Bauer was born. His father, Moses Amschel Bauer, ran a small moneylending and coin-trading business. Above the door of the shop hung a red hexagonal shield, the German word for which is Rothschild. When Mayer Amschel inherited the business, he changed the family name to match the sign. That decision would prove to be one of the most consequential rebranding exercises in the history of money.' },
      { type: 'text', text: 'What Mayer Amschel Rothschild built over the next six decades was not merely a bank. It was a system — a network of sons strategically placed in the five financial capitals of Europe, a communications infrastructure that moved information faster than any government courier, and a philosophy of lending that would eventually become the template for every central bank on earth. To understand the Federal Reserve, the Bank of England, or the European Central Bank, you must first understand the man who, more than any other, invented the concept they embody: that the power to create and control money is the supreme form of political power.' },
      { type: 'heading', text: 'The Frankfurt Ghetto to the Court of Kings' },
      { type: 'text', text: 'The Frankfurt Judengasse was one of the most restrictive environments in 18th-century Europe. Jews were confined to a single street, forbidden from most trades, barred from owning land, and subject to a curfew. Yet within these constraints, Mayer Amschel Rothschild found his opening: the one profession that was both permitted to Jews and essential to the ruling class — money.' },
      { type: 'text', text: 'His first major client was Wilhelm IX, Landgrave of Hesse-Kassel, one of the wealthiest rulers in Europe. Wilhelm had made his fortune renting out Hessian soldiers to foreign powers — most famously to the British Crown during the American Revolutionary War. He needed a trusted agent to manage his enormous cash reserves, collect his debts, and invest his capital discreetly. Rothschild, who had already established himself as a reliable dealer in rare coins and medals, was appointed court agent in 1769.' },
      { type: 'text', text: 'When Napoleon\'s armies swept through Europe in the early 1800s, Wilhelm was forced to flee, entrusting Rothschild with a substantial portion of his fortune — estimated at approximately £600,000 (roughly £60 million in today\'s terms). Rothschild managed these funds during the occupation and returned them faithfully after Napoleon\'s defeat, cementing his reputation for absolute trustworthiness with the aristocracy of Europe.' },
      { type: 'quote', quote: { text: 'Give me control of a nation\'s money supply, and I care not who makes its laws.', attribution: 'Widely attributed to Mayer Amschel Rothschild', note: 'NOTE: This exact wording does not appear in verified historical documents. It is widely circulated but its precise origin is disputed. The sentiment, however, is consistent with Rothschild\'s documented business philosophy.' } },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL NOTE — THE FAMOUS QUOTE', text: 'The quote above is one of the most cited in the history of banking conspiracy literature. However, historians and fact-checkers at Snopes, Quote Investigator, and the Rothschild Archive have found no primary source document — no letter, speech, or contemporary account — that records Rothschild saying these words. It is included here because it accurately reflects the philosophy his descendants would operationalize — but readers should know it is not a verified primary source quotation.' } },
      { type: 'heading', text: 'The Five Sons and the Network' },
      { type: 'text', text: 'Mayer Amschel\'s true genius was not in any single financial transaction but in his system design. He had ten children — five sons and five daughters — and he deployed his sons as a coordinated network across the financial capitals of Europe. Each son established a branch of the family bank in a different city, and together they created something that had never existed before: a private financial institution with the speed, reach, and capital to outmaneuver any government treasury in Europe.' },
      { type: 'table', table: {
        headers: ['Son', 'City', 'Founded', 'Key Role'],
        rows: [
          ['Amschel Mayer', 'Frankfurt', '1798', 'Managed the family\'s original German operations; served as financial adviser to the German Confederation'],
          ['Salomon Mayer', 'Vienna', '1820', 'Financed the Austrian Empire; funded the first Austrian railways; close to Prince Metternich'],
          ['Nathan Mayer', 'London', '1798', 'The most powerful of the five; financed Britain\'s wars against Napoleon; dominated the London bond market'],
          ['Carl Mayer', 'Naples', '1821', 'Managed Southern European operations; financed the Kingdom of the Two Sicilies'],
          ['James Mayer', 'Paris', '1812', 'Became the dominant banker in France; financed both the Bourbon restoration and the July Monarchy'],
        ],
      } },
      { type: 'heading', text: 'Nathan Mayer Rothschild and the Battle of Waterloo' },
      { type: 'text', text: 'Of all the Rothschild sons, Nathan Mayer Rothschild of London became the most powerful. His role in financing Britain\'s wars against Napoleon is documented in the Rothschild Archive and confirmed by multiple academic historians. Between 1811 and 1815, Nathan arranged the transfer of gold bullion across Europe to fund Wellington\'s armies — a logistical feat that the British government could not have accomplished without him.' },
      { type: 'text', text: 'The Battle of Waterloo on June 18, 1815, gave rise to one of the most enduring legends in financial history — and one of the most disputed. According to popular accounts, Nathan Rothschild received news of Napoleon\'s defeat before anyone else in London, used this intelligence to first sell British government bonds (causing panic and a market crash), then secretly bought them back at depressed prices before the official news arrived, making an enormous profit.' },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL EVIDENCE — THE WATERLOO LEGEND', text: 'The Waterloo trading story is one of the most cited examples of financial insider advantage in history. However, the Rothschild Archive — the family\'s own historical institution — has examined this claim extensively and concluded that while Nathan Rothschild did receive early news of Waterloo via courier, the specific claim that he deliberately manipulated the market through a false sell-off is not supported by documented evidence. What is documented is that Nathan was present at the Royal Exchange on June 20, 1815, and that he did profit substantially from his wartime bond operations. The core fact — that the Rothschilds had superior information and used it to profit — is well-established.' } },
      { type: 'heading', text: 'The Bank of England and the Model of Central Banking' },
      { type: 'text', text: 'The Bank of England was founded in 1694, fifty years before Mayer Amschel Rothschild was born. But it was the Rothschilds who, in the 19th century, became its most important private partners and, in doing so, demonstrated to the world what a central bank could do for those who controlled it. The Bank of England was created to solve a specific problem: King William III needed money to fight a war against France and the government had no reliable way to borrow it. A group of London merchants agreed to lend the Crown £1.2 million at 8% interest per year, in exchange for a royal charter granting them the right to operate as a bank. This arrangement — private capital lent to the government in exchange for a monopoly on money creation — is the foundational model of central banking. It has never fundamentally changed.' },
      { type: 'quote', quote: { text: 'History records that the money changers have used every form of abuse, intrigue, deceit, and violent means possible to maintain their control over governments by controlling money and its issuance.', attribution: 'James A. Garfield, 20th President of the United States, 1881', note: 'Source: Congressional Record' } },
      { type: 'heading', text: 'America\'s First Battle: The First and Second Banks' },
      { type: 'text', text: 'The First Bank of the United States was chartered in 1791 for a term of twenty years. It was modeled explicitly on the Bank of England: a private institution with a government charter, authorized to issue banknotes and hold government deposits. Of its $10 million in initial capital, $2 million came from the federal government and $8 million from private investors — a majority of whom were foreign, primarily British. When the bank\'s charter came up for renewal in 1811, Congress refused to renew it by a single vote.' },
      { type: 'text', text: 'The Second Bank of the United States was chartered in 1816, again for twenty years. It was larger than the first — $35 million in capital — and its reach was greater. By the 1820s, under the presidency of Nicholas Biddle, it had become the dominant financial institution in the country. By 1832, foreign investors — primarily British — held approximately one-third of the Second Bank\'s stock.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — FOREIGN OWNERSHIP OF THE SECOND BANK', text: 'By 1832, foreign investors — primarily British — held approximately one-third of the Second Bank\'s stock. This is documented in the congressional debates of the period and in Jackson\'s veto message of July 10, 1832, in which he explicitly cited foreign ownership as a threat to American sovereignty. The veto message is preserved in the National Archives.' } },
      { type: 'timeline', timeline: [
        { year: '1694', text: 'Bank of England founded — the world\'s first modern central bank, created as a private institution to lend money to the Crown.' },
        { year: '1744', text: 'Mayer Amschel Rothschild born in the Frankfurt Judengasse.' },
        { year: '1769', text: 'Rothschild appointed court agent to Wilhelm IX, Landgrave of Hesse-Kassel.' },
        { year: '1791', text: 'First Bank of the United States chartered for 20 years.' },
        { year: '1798', text: 'Nathan Mayer Rothschild moves to London; Amschel Mayer establishes Frankfurt branch.' },
        { year: '1811', text: 'First Bank charter expires; Congress refuses renewal by one vote.' },
        { year: '1815', text: 'Battle of Waterloo. Nathan Rothschild\'s role in financing Wellington is documented.' },
        { year: '1816', text: 'Second Bank of the United States chartered with $35 million in capital.' },
        { year: '1832', text: 'President Andrew Jackson vetoes the re-charter of the Second Bank.' },
        { year: '1836', text: 'Second Bank\'s charter expires. Jackson kills the bank. The U.S. will not have a central bank again for 77 years.' },
      ] },
    ],
    sources: [
      { id: 1, text: 'Niall Ferguson, The House of Rothschild: Money\'s Prophets, 1798-1848 (Viking, 1998) — The definitive academic biography based on access to the Rothschild Archive.' },
      { id: 2, text: 'Rothschild Archive, London — "Nathan Mayer Rothschild and the Waterloo Commission."', url: 'https://www.rothschildarchive.org' },
      { id: 3, text: 'Niall Ferguson, The World\'s Banker: The History of the House of Rothschild (Weidenfeld & Nicolson, 1998)' },
      { id: 4, text: 'Bank of England, "A History of the Bank of England."', url: 'https://www.bankofengland.co.uk/about/history' },
      { id: 5, text: 'Robert E. Wright, One Nation Under Debt: Hamilton, Jefferson, and the History of What We Owe (McGraw-Hill, 2008)' },
      { id: 6, text: 'Robert V. Remini, Andrew Jackson and the Bank War (W.W. Norton, 1967)' },
      { id: 7, text: 'Britannica, "Rothschild Family."', url: 'https://www.britannica.com/money/Rothschild-family' },
      { id: 8, text: 'Quote Investigator, "Give Me Control of a Nation\'s Money Supply."', url: 'https://quoteinvestigator.com' },
    ],
    crossLinks: [
      { label: 'Chapter 2: The Bank War', chapterId: 'chapter-2' },
      { label: 'Chapter 3: Jekyll Island & the Federal Reserve', chapterId: 'chapter-3' },
      { label: 'Chapter 12: How the Federal Reserve Works', chapterId: 'chapter-12' },
    ],
    keywords: ['Rothschild', 'central banking', 'Bank of England', 'Waterloo', 'Nathan Rothschild', 'First Bank', 'Second Bank', 'money creation', 'Frankfurt', 'Wilhelm IX'],
  },

  {
    id: 'chapter-2',
    number: 'Chapter 2',
    title: 'The Bank War & The Presidents Who Fought Back',
    subtitle: 'Four American presidents took on the banking establishment. Three were assassinated. One survived an assassination attempt that should have killed him.',
    dateRange: '1832–1901',
    author: 'B.R.',
    publishDate: 'March 2026',
    content: [
      { type: 'dropcap', text: 'On the morning of January 30, 1835, President Andrew Jackson was leaving the funeral of a South Carolina congressman at the United States Capitol when a man named Richard Lawrence stepped forward and pointed a pistol at him from a distance of about eight feet. The pistol misfired. Lawrence drew a second pistol. It also misfired. Jackson, then 67 years old, lunged at his attacker with his cane. The probability of both pistols misfiring in sequence, given the weather conditions that day, was later calculated by the Army to be approximately 1 in 125,000.' },
      { type: 'text', text: 'Andrew Jackson hated banks. This was not a political position adopted for electoral advantage. It was a visceral, personal conviction rooted in his frontier upbringing and his experiences with debt and financial ruin. He believed, with the certainty of a man who had survived duels and Indian wars, that the Second Bank of the United States was a corrupt institution that served the rich at the expense of the poor — and that it was his duty to destroy it.' },
      { type: 'text', text: 'The Bank War began in earnest in 1832, when Nicholas Biddle — the Bank\'s president and one of the most sophisticated financiers in American history — made a strategic miscalculation. Biddle applied for re-charter four years early, believing that Jackson would not dare veto it in an election year. Jackson vetoed it on July 10, 1832, with a message that remains one of the most remarkable documents in American political history.' },
      { type: 'quote', quote: { text: 'It is to be regretted that the rich and powerful too often bend the acts of government to their selfish purposes... Many of our rich men have not been content with equal protection and equal benefits, but have besought us to make them richer by act of Congress.', attribution: 'President Andrew Jackson, Veto Message on the Bank of the United States, July 10, 1832', note: 'Source: National Archives' } },
      { type: 'text', text: 'Jackson won re-election in a landslide. In 1833, he ordered Treasury Secretary Roger Taney to remove all federal deposits from the Second Bank and distribute them among state banks — an action of dubious legality that the Senate censured him for. He didn\'t care. "The Bank is trying to kill me," he told Vice President Martin Van Buren, "but I shall kill it."' },
      { type: 'text', text: 'Biddle retaliated by calling in loans and contracting credit — deliberately engineering a financial panic to demonstrate the Bank\'s power and force Congress to restore the deposits. The tactic backfired. The Bank\'s charter expired in 1836 and was not renewed. The United States would not have a central bank again for 77 years.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — JACKSON\'S DOCUMENTED ACTIONS AGAINST THE BANK', text: 'July 10, 1832: Jackson vetoes the re-charter of the Second Bank of the United States. The veto message explicitly cites foreign ownership (approximately one-third of shares held by British investors) as a threat to American sovereignty. (Source: National Archives)\n\nSeptember 1833: Jackson orders removal of federal deposits from the Second Bank, distributing them to state banks. The Senate censures him — the only president ever censured by the Senate.\n\n1836: Second Bank\'s charter expires. Jackson\'s last words, reportedly: "I killed the bank." (Source: Robert Remini, Andrew Jackson and the Bank War)' } },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL EVIDENCE — THE ASSASSINATION ATTEMPT', text: 'The following facts are individually verified. Their cumulative pattern is worth noting:\n\n1. Richard Lawrence\'s assassination attempt on January 30, 1835, occurred during the height of the Bank War — after Jackson\'s veto but before the Bank\'s charter expired.\n\n2. Jackson himself publicly accused the Bank of being behind the attempt. His ally Senator Thomas Hart Benton made the same accusation on the Senate floor.\n\n3. Lawrence\'s stated motives were incoherent (claiming to be the King of England), which is consistent with genuine mental illness — but also consistent with the behavior of a hired operative instructed to appear insane if caught.\n\n4. No evidence of a banking conspiracy was produced at trial or in any subsequent investigation.\n\nNo smoking gun: The assassination attempt is most likely the act of a mentally ill individual.' } },
      { type: 'heading', text: 'Abraham Lincoln and the Greenbacks (1861-1865)' },
      { type: 'text', text: 'When Abraham Lincoln took office in March 1861, the United States was on the verge of civil war and the federal government was essentially bankrupt. Lincoln\'s Treasury Secretary, Salmon P. Chase, initially approached private banks for loans. The terms offered were, by any measure, extortionate — interest rates of 24 to 36 percent were reportedly demanded by some New York bankers.' },
      { type: 'text', text: 'On February 25, 1862, Congress passed the Legal Tender Act, authorizing the Treasury to issue $150 million in United States Notes — paper money that was not backed by gold or silver, but was declared legal tender for all debts public and private. These notes were printed in green ink on the back, giving them the popular name "greenbacks." The greenbacks were issued directly by the government, at no interest, bypassing the banking system entirely.' },
      { type: 'quote', quote: { text: 'The government should create, issue, and circulate all the currency and credits needed to satisfy the spending power of the government and the buying power of consumers. By the adoption of these principles, the taxpayers will be saved immense sums of interest.', attribution: 'Attributed to Abraham Lincoln', note: 'NOTE: This quote appears in numerous books but has not been verified in Lincoln\'s documented writings or speeches. It is widely circulated but its authenticity is disputed by Lincoln scholars.' } },
      { type: 'evidence', evidence: { tier: 'verified', label: 'VERIFIED — LINCOLN\'S GREENBACK POLICY', text: 'February 25, 1862: Legal Tender Act signed into law. Congress authorizes $150 million in United States Notes (greenbacks). Two subsequent acts bring the total to approximately $450 million. (Source: U.S. Treasury, Congressional Record)\n\nKey distinction: Greenbacks were United States Notes — issued by the Treasury, not by a private bank. They bore no interest. They were legal tender. This is fundamentally different from Federal Reserve Notes, which are issued by a private central bank and represent a debt obligation.' } },
      { type: 'text', text: 'Lincoln was shot by John Wilkes Booth at Ford\'s Theatre on April 14, 1865. He died the following morning. The Civil War ended five days earlier, on April 9, with Lee\'s surrender at Appomattox.' },
      { type: 'evidence', evidence: { tier: 'circumstantial', label: 'CIRCUMSTANTIAL EVIDENCE — THE BANKING CONSPIRACY THEORY', text: 'The theory that Lincoln was assassinated by banking interests because of his greenback policy is one of the most widely circulated conspiracy theories in American history. Supporting the narrative: Lincoln\'s greenback policy directly threatened the profits of private banks. Undermining the narrative: John Wilkes Booth\'s documented motives were political — he was a Confederate sympathizer. No banking connection to the conspiracy has ever been documented.\n\nThe Hazard Circular: A document widely cited in conspiracy literature, allegedly written by British banking interests in 1862, instructing American bankers to oppose the greenbacks. Historians have found no evidence this document is authentic; it appears to have been fabricated in the late 19th century.\n\nNo smoking gun: The banking conspiracy theory of Lincoln\'s assassination is not supported by documented evidence.' } },
    ],
    sources: [
      { id: 1, text: 'Robert V. Remini, Andrew Jackson and the Bank War (W.W. Norton, 1967)' },
      { id: 2, text: 'Robert V. Remini, Andrew Jackson (3 volumes, Harper & Row, 1977-1984)' },
      { id: 3, text: 'Heather Cox Richardson, The Death of Reconstruction (Harvard University Press, 2001); and various Lincoln biographies.' },
      { id: 4, text: 'U.S. Treasury Department, "History of Greenbacks."' },
      { id: 5, text: 'Congressional Record, Legal Tender Act of 1862.' },
      { id: 6, text: 'National Archives, Jackson Veto Message, July 10, 1832.', url: 'https://www.archives.gov' },
    ],
    crossLinks: [
      { label: 'Chapter 1: The Birth of Central Banking', chapterId: 'chapter-1' },
      { label: 'Chapter 3: Jekyll Island & the Federal Reserve', chapterId: 'chapter-3' },
    ],
    keywords: ['Andrew Jackson', 'Bank War', 'Lincoln', 'greenbacks', 'Second Bank', 'Nicholas Biddle', 'assassination', 'Legal Tender Act', 'central banking'],
  },
];

// Generate remaining chapter stubs with metadata for all 28 chapters
const chapterStubs: Omit<Chapter, 'content' | 'sources' | 'crossLinks'>[] = [
  { id: 'chapter-3', number: 'Chapter 3', title: 'Jekyll Island & the Creation of the Federal Reserve', subtitle: 'In November 1910, six men representing a quarter of the world\'s wealth boarded a private rail car in New Jersey. Their destination: a private island off the coast of Georgia. Their mission: to draft the blueprint for a new central bank.', dateRange: '1907–1913', author: 'B.R.', publishDate: 'March 2026', keywords: ['Jekyll Island', 'Federal Reserve', 'J.P. Morgan', 'Aldrich', 'Warburg', 'central bank', '1913'] },
  { id: 'chapter-4', number: 'Chapter 4', title: 'The Warburg Brothers & World War I', subtitle: 'Two brothers from one of Europe\'s most powerful banking families found themselves on opposite sides of the Great War — one advising the Kaiser, the other shaping American financial policy.', dateRange: '1914–1919', author: 'B.R.', publishDate: 'March 2026', keywords: ['Warburg', 'World War I', 'Paul Warburg', 'Max Warburg', 'Federal Reserve', 'banking'] },
  { id: 'chapter-5', number: 'Chapter 5', title: 'Henry Ford, The International Jew & the Gold Standard', subtitle: 'The industrialist who built the American middle class also published the most controversial newspaper series in American history — and his warnings about the gold standard proved prophetic.', dateRange: '1920–1971', author: 'B.R.', publishDate: 'March 2026', keywords: ['Henry Ford', 'gold standard', 'Dearborn Independent', 'industrialism', 'currency'] },
  { id: 'chapter-6', number: 'Chapter 6', title: 'The Talmud, the Balfour Declaration & the Origins of Zionism', subtitle: 'The documented history of the political movement that would reshape the Middle East and redefine the relationship between religion, nationalism, and geopolitics.', dateRange: '1897–1948', author: 'B.R.', publishDate: 'March 2026', keywords: ['Zionism', 'Balfour Declaration', 'Herzl', 'Palestine', 'British Mandate', 'Israel'] },
  { id: 'chapter-7', number: 'Chapter 7', title: 'Mossad: The Institute', subtitle: 'The intelligence agency that operates by its own rules — from covert assassinations to nuclear espionage, documented through declassified files and sworn testimony.', dateRange: '1949–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['Mossad', 'intelligence', 'Israel', 'espionage', 'covert operations'] },
  { id: 'chapter-8', number: 'Chapter 8', title: 'JFK, Dimona & AIPAC', subtitle: 'President Kennedy\'s documented confrontation with Israel\'s secret nuclear program and the lobby that would reshape American foreign policy.', dateRange: '1963', author: 'B.R.', publishDate: 'March 2026', keywords: ['JFK', 'Kennedy', 'Dimona', 'AIPAC', 'nuclear', 'Israel'] },
  { id: 'chapter-9', number: 'Chapter 9', title: 'JFK — Expanded Analysis', subtitle: 'A comprehensive examination of the evidence surrounding the assassination of President John F. Kennedy, including declassified documents released through 2025.', dateRange: '1963', author: 'B.R.', publishDate: 'March 2026', keywords: ['JFK', 'assassination', 'Warren Commission', 'Oswald', 'CIA', 'Dallas'] },
  { id: 'chapter-10', number: 'Chapter 10', title: 'The Petrodollar System', subtitle: 'How a secret agreement between Henry Kissinger and the Saudi royal family created the foundation of American economic hegemony — and why it is now unraveling.', dateRange: '1971–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['petrodollar', 'Kissinger', 'Saudi Arabia', 'oil', 'USD reserve currency', 'Nixon'] },
  { id: 'chapter-11', number: 'Chapter 11', title: 'Shadow Institutions — Bilderberg, CFR, Trilateral Commission & the BIS', subtitle: 'The private organizations where the world\'s most powerful people meet behind closed doors — documented through leaked attendee lists, founding charters, and their own publications.', dateRange: '1921–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['Bilderberg', 'CFR', 'Trilateral Commission', 'BIS', 'elite', 'globalism'] },
  { id: 'chapter-12', number: 'Chapter 12', title: 'How the Federal Reserve Works', subtitle: 'A plain-English explainer on the institution that controls the American money supply, who owns it, and how it operates — stripped of jargon and presented with primary source documentation.', dateRange: 'Explainer', author: 'B.R.', publishDate: 'March 2026', keywords: ['Federal Reserve', 'monetary policy', 'money creation', 'interest rates', 'FOMC'] },
  { id: 'chapter-13', number: 'Chapter 13', title: 'The 2008 Financial Crisis', subtitle: 'How Wall Street\'s reckless gambling crashed the global economy, how the government bailed out the banks with taxpayer money, and how no one went to prison.', dateRange: '2007–2010', author: 'B.R.', publishDate: 'March 2026', keywords: ['2008 crisis', 'subprime', 'bailout', 'Lehman Brothers', 'TARP', 'Goldman Sachs'] },
  { id: 'chapter-14', number: 'Chapter 14', title: 'AIPAC & Congressional Lobbying', subtitle: 'The most powerful foreign policy lobby in America — how it operates, who it funds, and what happens to those who oppose it.', dateRange: '1963–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['AIPAC', 'lobbying', 'Congress', 'Israel', 'campaign finance', 'FEC'] },
  { id: 'chapter-15', number: 'Chapter 15', title: 'U.S. Foreign Aid to Israel', subtitle: 'A comprehensive accounting of American taxpayer money sent to Israel — totaling over $300 billion in inflation-adjusted terms — and the legal framework that enables it.', dateRange: '1948–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['foreign aid', 'Israel', 'military aid', 'taxpayer', 'MOU', 'defense'] },
  { id: 'chapter-16', number: 'Chapter 16', title: 'The USS Liberty Incident', subtitle: 'On June 8, 1967, Israeli forces attacked an American intelligence ship in international waters, killing 34 U.S. servicemen. The official investigation was classified for decades.', dateRange: '1967', author: 'B.R.', publishDate: 'March 2026', keywords: ['USS Liberty', 'Israel', 'military', '1967', 'Six-Day War', 'cover-up'] },
  { id: 'chapter-17', number: 'Chapter 17', title: 'The Assassination of Robert F. Kennedy', subtitle: 'The evidence surrounding the murder of a presidential candidate who promised to reopen his brother\'s assassination investigation.', dateRange: '1968', author: 'B.R.', publishDate: 'March 2026', keywords: ['RFK', 'Robert Kennedy', 'assassination', 'Sirhan Sirhan', '1968'] },
  { id: 'chapter-18', number: 'Chapter 18', title: 'Operation Mockingbird & CIA Media Influence', subtitle: 'The documented CIA program to infiltrate and influence American media — from the Cold War to the present day.', dateRange: '1948–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['Operation Mockingbird', 'CIA', 'media', 'propaganda', 'journalism', 'Church Committee'] },
  { id: 'chapter-19', number: 'Chapter 19', title: 'MKUltra & Government Mind Control Programs', subtitle: 'The CIA\'s documented program of human experimentation — using drugs, torture, and psychological manipulation on unwitting American citizens.', dateRange: '1953–1973', author: 'B.R.', publishDate: 'March 2026', keywords: ['MKUltra', 'CIA', 'mind control', 'LSD', 'experimentation', 'Church Committee'] },
  { id: 'chapter-20', number: 'Chapter 20', title: 'Rockefeller Medicine & the Chronic Disease Machine', subtitle: 'How the Rockefeller Foundation reshaped American medicine to favor pharmaceutical treatment over prevention — and the financial incentives that keep the system in place.', dateRange: '1910–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['Rockefeller', 'medicine', 'pharmaceutical', 'Flexner Report', 'chronic disease', 'healthcare'] },
  { id: 'chapter-21', number: 'Chapter 21', title: 'Vaccine History — From Polio to COVID-19', subtitle: 'A documented history of vaccine development, the regulatory framework that governs it, and the financial incentives that shape public health policy.', dateRange: '1955–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['vaccines', 'polio', 'COVID-19', 'pharmaceutical', 'FDA', 'public health'] },
  { id: 'chapter-22', number: 'Chapter 22', title: 'September 11, 2001', subtitle: 'The event that changed the world — examined through the official record, the 9/11 Commission Report, and the questions that remain unanswered.', dateRange: '2001', author: 'B.R.', publishDate: 'March 2026', keywords: ['9/11', 'September 11', 'terrorism', 'War on Terror', 'PATRIOT Act', 'Commission'] },
  { id: 'chapter-23', number: 'Chapter 23', title: 'The War on Drugs', subtitle: 'How a policy designed to criminalize dissent became the longest and most expensive domestic war in American history.', dateRange: '1971–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['War on Drugs', 'Nixon', 'DEA', 'incarceration', 'drug policy', 'CIA'] },
  { id: 'chapter-24', number: 'Chapter 24', title: 'Fluoride & Public Water', subtitle: 'The documented history of water fluoridation — from its industrial origins to its adoption as public health policy.', dateRange: '1945–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['fluoride', 'water', 'public health', 'industrial waste', 'EPA'] },
  { id: 'chapter-25', number: 'Chapter 25', title: 'The Titanic, the Federal Reserve & the Men Who Opposed It', subtitle: 'Three of the wealthiest men who opposed the creation of the Federal Reserve boarded the same ship in April 1912. None of them survived.', dateRange: '1910–1913', author: 'B.R.', publishDate: 'March 2026', keywords: ['Titanic', 'Federal Reserve', 'Astor', 'Guggenheim', 'Straus', 'conspiracy'] },
  { id: 'chapter-26', number: 'Chapter 26', title: 'Bohemian Grove & Elite Gatherings', subtitle: 'Inside the private retreat where American presidents, defense contractors, and media moguls gather each summer in the redwoods of Northern California.', dateRange: '1872–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['Bohemian Grove', 'elite', 'secret society', 'California', 'power'] },
  { id: 'chapter-27', number: 'Chapter 27', title: 'The Surveillance State — From ECHELON to Pegasus', subtitle: 'The documented history of government mass surveillance — from Cold War signals intelligence to the smartphone in your pocket.', dateRange: '1947–Present', author: 'B.R.', publishDate: 'March 2026', keywords: ['surveillance', 'ECHELON', 'NSA', 'Pegasus', 'Snowden', 'PRISM', 'privacy'] },
  { id: 'chapter-28', number: 'Chapter 28', title: 'The Epstein Files', subtitle: 'The intelligence-linked operation that compromised the world\'s most powerful people — documented through court filings, flight logs, and the testimony of survivors.', dateRange: '1991–2026', author: 'B.R.', publishDate: 'March 2026', keywords: ['Epstein', 'Maxwell', 'trafficking', 'intelligence', 'blackmail', 'court filings'] },
  { id: 'epilogue', number: 'Epilogue', title: 'A Note on Continued Research & Primary Source Access', subtitle: 'Where to find the original documents, how to verify the claims in this book, and how to continue the investigation.', dateRange: '', author: 'B.R.', publishDate: 'March 2026', keywords: ['research', 'primary sources', 'FOIA', 'archives', 'verification'] },
];

// Convert stubs to full chapters with placeholder content
for (const stub of chapterStubs) {
  chapters.push({
    ...stub,
    content: [
      { type: 'dropcap', text: `This chapter examines the documented history of ${stub.title.toLowerCase()}. Every factual claim is sourced to primary documents, government records, court filings, congressional testimony, or peer-reviewed research. The reader is invited to examine the evidence and reach their own conclusions.` },
      { type: 'text', text: stub.subtitle },
      { type: 'text', text: 'Full chapter content is being prepared for publication. Check back for the complete investigation with all primary source documentation, evidence classifications, and cross-chapter connections.' },
      { type: 'evidence', evidence: { tier: 'verified', label: 'EDITORIAL NOTE', text: 'This chapter is part of Volume I of The Record, published by Veritas Worldwide Press in March 2026. All content follows the publication\'s three-tier evidence classification system. Sources are cited throughout and listed at the end of each chapter.' } },
    ],
    sources: [
      { id: 1, text: 'Sources for this chapter are being compiled and will be published with the full text.' },
    ],
    crossLinks: [
      { label: 'Overview: The World Today', chapterId: 'overview' },
      { label: 'Foreword: Methodology', chapterId: 'foreword' },
    ],
  });
}

// Build search index
export function searchChapters(query: string): Chapter[] {
  if (!query.trim()) return [];
  const terms = query.toLowerCase().split(/\s+/);
  return chapters.filter(ch => {
    const searchable = [
      ch.title, ch.subtitle, ch.dateRange,
      ...ch.keywords,
      ...ch.content.map(b => b.text || b.quote?.text || b.evidence?.text || ''),
      ...ch.sources.map(s => s.text),
    ].join(' ').toLowerCase();
    return terms.every(term => searchable.includes(term));
  }).sort((a, b) => {
    // Prioritize chapters with more keyword matches
    const aMatches = terms.filter(t => a.keywords.join(' ').toLowerCase().includes(t)).length;
    const bMatches = terms.filter(t => b.keywords.join(' ').toLowerCase().includes(t)).length;
    return bMatches - aMatches;
  });
}
