/**
 * Content Pack Carousel Data — 10-slide carousels for each content pack
 * Each pack gets a full Instagram carousel with brand-consistent styling
 */

export interface PackCarouselSlide {
  headline: string
  stat?: string
  body: string
  source: string
  bgStyle: 'dark' | 'crimson' | 'light' | 'stat'
}

export interface PackCarousel {
  packId: string
  title: string
  slides: PackCarouselSlide[]
}

export const PACK_CAROUSELS: PackCarousel[] = [
  {
    packId: 'fed-rates',
    title: 'The Fed Is Holding Rates While Oil Hits $110',
    slides: [
      { headline: 'The Fed Just Made Its Decision', body: 'The FOMC voted 11-1 to hold the federal funds rate at 3.5-3.75%. Here\'s what they\'re not telling you.', source: 'Federal Reserve FOMC Statement', bgStyle: 'dark' },
      { headline: '$110/Barrel', stat: '$110', body: 'Crude oil has surged past $110/barrel amid the Iran conflict. Gas prices are climbing. The Fed says: hold steady.', source: 'EIA / CME Group', bgStyle: 'stat' },
      { headline: '11 to 1', stat: '11-1', body: 'The FOMC vote. Only one dissent. Governor Waller wanted a cut. The rest held firm despite rising energy costs hitting working families.', source: 'FOMC Minutes', bgStyle: 'crimson' },
      { headline: 'History Repeats', body: 'In 1979, the Fed held rates while oil prices surged. The result: the worst recession in 50 years. Are we watching the same playbook?', source: 'Federal Reserve History', bgStyle: 'dark' },
      { headline: 'The Dot Plot Says...', body: 'Fed officials\' projections show rates could stay elevated through 2027. That means higher mortgage rates, higher car loans, higher credit card bills — for years.', source: 'FOMC Dot Plot, March 2026', bgStyle: 'light' },
      { headline: 'Who Gets Hurt?', body: 'When rates stay high:\n• Mortgage payments up 40% from 2021\n• Small business loans at 9%+\n• Credit card APR averaging 22.8%', source: 'Federal Reserve Bank of NY', bgStyle: 'dark' },
      { headline: 'The Iran Factor', body: 'The Iran conflict has disrupted 20% of global oil transit through the Strait of Hormuz. The Fed can\'t print oil — but it can crush demand by keeping rates high.', source: 'EIA Short-Term Energy Outlook', bgStyle: 'crimson' },
      { headline: 'Follow the Money', body: 'The Fed\'s balance sheet: $7.3 trillion. The interest on the national debt: $1.2 trillion/year. Higher rates = more money to bondholders, less to services.', source: 'U.S. Treasury / CBO', bgStyle: 'stat' },
      { headline: 'Primary Sources Only', body: 'We didn\'t ask pundits what they think. We read the FOMC statement, the dot plot, and the BLS data. Then we showed you.', source: 'Veritas Worldwide Press', bgStyle: 'light' },
      { headline: 'Read the Full Analysis', body: 'Every figure sourced. Every claim linked to the original document.\n\nveritasworldwide.com', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
    ],
  },
  {
    packId: 'epstein-files',
    title: '3.5 Million Pages of Epstein Files',
    slides: [
      { headline: 'The Largest Document Drop in DOJ History', body: 'The Department of Justice just released 3.5 million pages of Jeffrey Epstein files. Here\'s what\'s in them.', source: 'U.S. Department of Justice', bgStyle: 'dark' },
      { headline: '3.5 Million Pages', stat: '3.5M', body: 'Pages of documents. 2,000 videos. 180,000 images. Names. Flight logs. Financial records.', source: 'DOJ Compliance Filing', bgStyle: 'stat' },
      { headline: 'The Transparency Act', body: 'Congress passed the Epstein Transparency Act with bipartisan support. The DOJ was required to release everything that wouldn\'t compromise ongoing investigations.', source: 'Congress.gov', bgStyle: 'light' },
      { headline: 'Who Flew on the Planes?', body: 'The flight logs document hundreds of trips on Epstein\'s private jets. Names. Dates. Destinations. All now public record.', source: 'FAA records / DOJ release', bgStyle: 'dark' },
      { headline: 'The Financial Trail', body: 'Bank records show wire transfers, shell companies, and financial arrangements connecting Epstein to powerful figures across business, politics, and academia.', source: 'DOJ financial exhibits', bgStyle: 'crimson' },
      { headline: 'What the FBI Knew', body: 'Internal FBI communications show the bureau was aware of Epstein\'s activities years before his 2019 arrest. The documents reveal what they knew and when.', source: 'FBI files / DOJ release', bgStyle: 'stat' },
      { headline: 'Victim Testimony', body: 'Hundreds of victim statements are now public. Their accounts span decades and multiple continents. The patterns are documented.', source: 'DOJ victim impact files', bgStyle: 'dark' },
      { headline: 'The UN Responds', body: 'The UN OHCHR issued a statement on victim privacy protections. The tension between transparency and victim safety is documented in the release guidelines.', source: 'UN OHCHR', bgStyle: 'light' },
      { headline: 'No Commentary Needed', body: 'We don\'t tell you what to think. We show you the documents. The primary sources. The public record. Read it yourself.', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
      { headline: 'Read the Full Breakdown', body: 'Every document sourced. Every claim verified against the original filing.\n\nveritasworldwide.com', source: 'Veritas Worldwide Press', bgStyle: 'dark' },
    ],
  },
  {
    packId: 'fisa-702',
    title: 'The Government Can Read Your Texts',
    slides: [
      { headline: 'They\'re Reading Your Messages', body: 'FISA Section 702 lets the U.S. government access your emails, texts, and calls — without a warrant. And it\'s up for renewal.', source: 'Congress.gov', bgStyle: 'dark' },
      { headline: 'Section 702', stat: '702', body: 'The FISA section that authorizes warrantless surveillance of Americans\' electronic communications. Sunsets April 2026.', source: 'FISA Amendments Act', bgStyle: 'stat' },
      { headline: 'No Warrant Required', body: 'Under current law, the NSA, FBI, and CIA can search a database of Americans\' communications without ever getting a warrant from a judge.', source: 'EFF Analysis', bgStyle: 'crimson' },
      { headline: 'The Reform Bill', body: 'The Government Surveillance Reform Act — bipartisan — would require a warrant for the first time. It\'s before Congress now.', source: 'S.4201 / H.R.8901', bgStyle: 'light' },
      { headline: 'The Church Committee Warned Us', body: 'In 1975, the Church Committee exposed illegal government surveillance. Their reforms created FISA. Now those reforms are being gutted.', source: 'Senate Church Committee Report', bgStyle: 'dark' },
      { headline: '3.4 Million Searches', stat: '3.4M', body: 'FBI searches of Section 702 data in a single year. The FISA court itself called the number "sobering."', source: 'FISA Court Opinion', bgStyle: 'stat' },
      { headline: 'Your Fourth Amendment', body: '"The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated."', source: 'U.S. Constitution', bgStyle: 'crimson' },
      { headline: 'Who Supports Reform?', body: 'ACLU. EFF. FreedomWorks. A rare left-right coalition agrees: Americans deserve a warrant requirement. Congress is the holdout.', source: 'Coalition statements', bgStyle: 'dark' },
      { headline: 'April 2026 Deadline', body: 'If Congress doesn\'t act by April, Section 702 expires. The intelligence community is lobbying hard for a clean reauthorization — no warrant requirement.', source: 'Congressional calendar', bgStyle: 'light' },
      { headline: 'Full Analysis With Sources', body: 'Bill text. Sponsor statements. EFF analysis. Historical context. All primary sources.\n\nveritasworldwide.com', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
    ],
  },
  {
    packId: 'defense-budget',
    title: '$1.5 Trillion for the Military',
    slides: [
      { headline: 'The Largest Defense Budget in History', body: 'Congress is proposing $1.5 trillion in defense spending for FY2027. That\'s $4,500 for every American. Here\'s where it goes.', source: 'Senate Appropriations Committee', bgStyle: 'dark' },
      { headline: '$1.5 Trillion', stat: '$1.5T', body: 'Total proposed FY2027 defense spending: $839B base budget + $152B reconciliation supplement + additional classified programs.', source: 'CRS Defense Budget Analysis', bgStyle: 'stat' },
      { headline: 'The F-47', body: 'The next-generation stealth fighter. Estimated program cost: $300 billion over its lifetime. Funded in this budget. No public debate.', source: 'DoD Budget Request FY2027', bgStyle: 'crimson' },
      { headline: '$500M for Israel', stat: '$500M', body: 'Half a billion for Israeli missile defense alone — on top of the $3.8B annual aid package and the $26.4B emergency supplement.', source: 'H.R.815 / DoD Budget', bgStyle: 'stat' },
      { headline: 'What $1.5T Could Buy Instead', body: 'Universal pre-K for every American child. Clean water for every community. A fully funded VA. Debt-free community college. Infrastructure repair nationwide.', source: 'CBO cost estimates', bgStyle: 'light' },
      { headline: 'The Reconciliation Trick', stat: '$152B', body: 'The $152B "reconciliation supplement" bypasses normal budget rules. It\'s defense spending disguised as fiscal reform.', source: 'Senate Budget Committee', bgStyle: 'dark' },
      { headline: 'Who Profits?', body: 'The top 5 defense contractors received $150B+ in FY2024. Lockheed Martin alone: $45.5B. Their stock prices are at all-time highs.', source: 'SIPRI / SEC filings', bgStyle: 'crimson' },
      { headline: 'Compared to the World', body: 'U.S. military spending exceeds the next 10 countries combined. China ($292B), Russia ($109B), India ($84B) — all dwarfed.', source: 'SIPRI Military Expenditure Database', bgStyle: 'stat' },
      { headline: '$4,500 Per American', stat: '$4,500', body: 'That\'s what every man, woman, and child pays for defense this year. A family of four: $18,000. For perspective, median household income is $75,000.', source: 'Census Bureau / CBO', bgStyle: 'dark' },
      { headline: 'Read the Full Breakdown', body: 'Every line item sourced to the Senate Appropriations markup and CRS analysis.\n\nveritasworldwide.com', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
    ],
  },
  {
    packId: 'aipac-spending',
    title: 'One Lobby Spent $28M to Reshape Congress',
    slides: [
      { headline: 'The Most Powerful Lobby You\'ve Never Heard Of', body: 'AIPAC and its shell PACs spent $28 million in the 2026 election cycle. Every dollar traced through FEC filings.', source: 'OpenSecrets / FEC', bgStyle: 'dark' },
      { headline: '$28 Million', stat: '$28M', body: 'Total AIPAC network spending in 2026 primaries. $22 million in Illinois alone. Funneled through PACs that don\'t mention Israel in their names.', source: 'FEC filings', bgStyle: 'stat' },
      { headline: 'Shell PACs', body: 'United Democracy Project. Democratic Majority for Israel. Mainstream Democrats PAC. Names designed to obscure who\'s really funding the campaigns.', source: 'OpenSecrets PAC tracker', bgStyle: 'crimson' },
      { headline: 'They Took Out Bowman', stat: '$14.5M', body: 'AIPAC spent $14.5 million to defeat Jamaal Bowman — a sitting member of Congress who criticized Israeli military operations. The most expensive House primary in history.', source: 'FEC / OpenSecrets', bgStyle: 'stat' },
      { headline: 'They Took Out Bush', stat: '$8.5M', body: 'Cori Bush of Missouri: another progressive incumbent who called for a ceasefire. AIPAC spent $8.5M. She lost her primary.', source: 'FEC / OpenSecrets', bgStyle: 'dark' },
      { headline: 'The Message to Congress', body: 'Criticize Israel\'s military operations → face tens of millions in PAC spending against you in your next primary. The chilling effect is the point.', source: 'Analysis: The Intercept / Politico', bgStyle: 'light' },
      { headline: '$180M in 2024', stat: '$180M+', body: 'Total pro-Israel lobby spending in the 2024 federal election cycle. The single largest source of PAC spending in American politics.', source: 'OpenSecrets aggregate', bgStyle: 'crimson' },
      { headline: '38 States', stat: '38', body: 'States with anti-BDS laws requiring contractors to pledge not to boycott Israel. Your right to political boycott — restricted by state law.', source: 'Palestine Legal', bgStyle: 'stat' },
      { headline: 'Follow the Money', body: 'We traced every dollar through FEC filings. Named donors. Shell PAC structures. Recipient lists. No opinion — just the documented money trail.', source: 'Veritas Worldwide Press', bgStyle: 'dark' },
      { headline: 'See the Full Investigation', body: 'Every dollar sourced to FEC filings and OpenSecrets data.\n\nveritasworldwide.com', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
    ],
  },
  {
    packId: 'brand-mission',
    title: 'We Don\'t Tell You What to Think',
    slides: [
      { headline: 'We Don\'t Tell You What to Think', body: 'Veritas Worldwide Press is different. We cite exclusively primary sources. No anonymous sources. No opinion. No spin.', source: 'Veritas Worldwide Press', bgStyle: 'dark' },
      { headline: '500+ Primary Sources', stat: '500+', body: 'Government documents. Court filings. Congressional records. Declassified intelligence reports. Every claim traceable.', source: 'Veritas source library', bgStyle: 'stat' },
      { headline: 'Three Evidence Tiers', body: 'VERIFIED — Primary source confirmed.\nCIRCUMSTANTIAL — Facts documented, connection interpreted.\nDISPUTED — Claimed but not independently confirmed.\n\nEvery claim is classified.', source: 'Veritas methodology', bgStyle: 'light' },
      { headline: '31 Chapters', stat: '31', body: 'A documentary history spanning 240+ years. From the founding of the Federal Reserve to the Epstein files. Chronological. Sourced. Complete.', source: 'The Record', bgStyle: 'crimson' },
      { headline: 'The Israel Dossier', body: '$310B in aid traced. 75,000+ deaths documented. 14,000+ bombs tracked from Congress to impact zones. Every figure linked to its source.', source: 'Veritas Israel Dossier', bgStyle: 'dark' },
      { headline: 'The Deep State Dossier', body: 'The Epstein network mapped. Intelligence community connections documented. Financial flows traced. All from court records and declassified files.', source: 'Veritas Deep State page', bgStyle: 'stat' },
      { headline: 'Free and Open', stat: '100%', body: 'No paywall. No subscription required. We believe primary source journalism should be accessible to everyone. Always.', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
      { headline: 'Who We Are', body: 'Independent researchers and journalists. No corporate sponsors. No government funding. No political affiliation. Just the documented record.', source: 'Veritas about page', bgStyle: 'light' },
      { headline: 'Your Conclusions', body: 'We present the evidence. We cite the sources. We classify the claims. You decide what it means. That\'s how journalism should work.', source: 'Veritas Worldwide Press', bgStyle: 'dark' },
      { headline: 'Start Reading', body: 'Primary sources. Public record. Your conclusions.\n\nveritasworldwide.com', source: 'Veritas Worldwide Press', bgStyle: 'crimson' },
    ],
  },
]
