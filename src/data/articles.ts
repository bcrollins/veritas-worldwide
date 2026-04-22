// Current events publication engine — primary source journalism
// Updated daily with the top stories in power, money, and institutions
import { expandedArticlesA } from './articlesExpanded'

export interface Article {
  id: string
  slug: string
  title: string
  subtitle: string
  author: string
  publishDate: string
  updatedDate?: string
  category: ArticleCategory
  tags: string[]
  heroImage: { src: string; alt: string; credit: string }
  readingTime: number
  content: ArticleBlock[]
  sources: ArticleSource[]
  relatedChapters: string[]
  seo: { metaTitle: string; metaDescription: string; keywords: string[] }
}

export type ArticleCategory =
  | 'Federal Reserve & Banking'
  | 'Surveillance & Civil Liberties'
  | 'Defense & Foreign Policy'
  | 'Accountability & Transparency'
  | 'Lobbying & Political Influence'

export interface ArticleBlock {
  type: 'text' | 'heading' | 'subheading' | 'quote' | 'evidence' | 'callout' | 'image' | 'stat'
  text?: string
  attribution?: string
  tier?: 'verified' | 'circumstantial' | 'disputed'
  image?: { src: string; alt: string; caption: string; credit: string }
  stat?: { value: string; label: string }
}

export interface ArticleSource {
  id: number
  title: string
  publisher: string
  url: string
  date: string
  type: 'primary' | 'government' | 'journalism' | 'academic'
}

export const CATEGORY_META: Record<ArticleCategory, { label: string }> = {
  'Federal Reserve & Banking': { label: 'FEDERAL RESERVE & BANKING' },
  'Surveillance & Civil Liberties': { label: 'SURVEILLANCE & CIVIL LIBERTIES' },
  'Defense & Foreign Policy': { label: 'DEFENSE & FOREIGN POLICY' },
  'Accountability & Transparency': { label: 'ACCOUNTABILITY & TRANSPARENCY' },
  'Lobbying & Political Influence': { label: 'LOBBYING & POLITICAL INFLUENCE' },
}

export const articles: Article[] = 
[
  {
    "id": "fed-holds-rates-march-2026",
    "slug": "federal-reserve-holds-rates-march-2026-iran-oil-crisis",
    "title": "The Federal Reserve Holds Rates Steady as Iran Conflict Roils Global Oil Markets",
    "subtitle": "With the federal funds rate anchored at 3.5–3.75% and crude oil prices surging past $110 per barrel, the central bank faces its most consequential policy crossroads since 2008.",
    "author": "Veritas Worldwide",
    "publishDate": "March 24, 2026",
    "category": "Federal Reserve & Banking",
    "tags": [
      "federal reserve",
      "interest rates",
      "iran",
      "oil crisis",
      "FOMC",
      "inflation"
    ],
    "heroImage": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg/1200px-Marriner_S._Eccles_Federal_Reserve_Board_Building.jpg",
      "alt": "Federal Reserve Board headquarters, the Eccles Building",
      "credit": "Public Domain"
    },
    "readingTime": 12,
    "seo": {
      "metaTitle": "Federal Reserve Holds Rates March 2026 | Iran Oil Crisis Impact",
      "metaDescription": "The Fed held rates at 3.5-3.75% on March 18, 2026, as the Iran conflict drives oil past $110/barrel. Full FOMC analysis with primary sources.",
      "keywords": [
        "federal reserve march 2026",
        "fed holds rates",
        "iran oil crisis",
        "FOMC decision",
        "interest rate 2026"
      ]
    },
    "relatedChapters": [
      "chapter-3",
      "chapter-10",
      "chapter-12",
      "chapter-13"
    ],
    "sources": [
      {
        "id": 1,
        "title": "FOMC Statement — March 18, 2026",
        "publisher": "Federal Reserve Board",
        "url": "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260318a.htm",
        "date": "March 18, 2026",
        "type": "government"
      },
      {
        "id": 2,
        "title": "Fed Interest Rate Decision March 2026",
        "publisher": "CNBC",
        "url": "https://www.cnbc.com/2026/03/18/fed-interest-rate-decision-march-2026.html",
        "date": "March 18, 2026",
        "type": "journalism"
      },
      {
        "id": 3,
        "title": "Summary of Economic Projections, March 18, 2026",
        "publisher": "Federal Reserve Board",
        "url": "https://www.federalreserve.gov/monetarypolicy/fomcprojtabl20260318.htm",
        "date": "March 18, 2026",
        "type": "government"
      },
      {
        "id": 4,
        "title": "H.15 — Selected Interest Rates",
        "publisher": "Federal Reserve Board",
        "url": "https://www.federalreserve.gov/releases/h15/",
        "date": "March 20, 2026",
        "type": "government"
      },
      {
        "id": 5,
        "title": "Powell Says Oil Crisis May Have Temporary Effects",
        "publisher": "CNN Business",
        "url": "https://www.cnn.com/2026/03/18/economy/fed-march-rates-decision",
        "date": "March 18, 2026",
        "type": "journalism"
      }
    ],
    "content": [
      {
        "type": "text",
        "text": "On March 18, 2026, the Federal Open Market Committee voted 11-1 to hold the federal funds rate in a target range of 3.50% to 3.75%, extending the pause that began in late 2025. The decision came as the U.S. economy faces a convergence of pressures that echo every major crisis documented in The Record: a central bank navigating between inflation and recession while geopolitical conflict reshapes global commodity markets."
      },
      {
        "type": "heading",
        "text": "The Vote: 11-1, With a Notable Dissent"
      },
      {
        "type": "text",
        "text": "Governor Stephen Miran cast the lone dissenting vote, favoring a quarter-point reduction. His dissent marks the longest stretch of consecutive FOMC dissents since 2013 — a signal of genuine policy disagreement within the institution. The Federal Reserve’s own statement acknowledged that ‘inflation remains somewhat elevated’ while ‘job gains have remained low.’"
      },
      {
        "type": "evidence",
        "text": "The FOMC statement issued March 18, 2026, states: ‘The Committee decided to maintain the target range for the federal funds rate at 3-1/2 to 3-3/4 percent.’ Source: federalreserve.gov",
        "tier": "verified"
      },
      {
        "type": "heading",
        "text": "The Iran Factor: Oil, Inflation, and the Strait of Hormuz"
      },
      {
        "type": "text",
        "text": "The dominant factor behind the March decision is the ongoing military conflict with Iran, now entering its fourth week. The fighting and its impact on shipping through the Strait of Hormuz — through which roughly 20% of the world’s oil supply transits daily — has driven crude prices past $110 per barrel, threatening to entrench inflation above the Fed’s 2% target."
      },
      {
        "type": "quote",
        "text": "Near-term measures of inflation expectations have risen in recent weeks, likely reflecting the substantial rise in oil prices caused by the supply disruptions in the Middle East.",
        "attribution": "Fed Chair Jerome Powell, March 18, 2026"
      },
      {
        "type": "callout",
        "text": "RELATED: Chapter 10 — The Petrodollar System traces how a 1974 agreement between Kissinger and Saudi Arabia made U.S. monetary policy structurally dependent on Middle Eastern oil. Chapter 12 explains how the Federal Reserve operates."
      },
      {
        "type": "heading",
        "text": "The Dot Plot: One Cut This Year, Maybe"
      },
      {
        "type": "text",
        "text": "The dot plot pointed to just one rate reduction this year and another in 2027 — a downgrade from three cuts projected as recently as September 2025. The median longer-run neutral rate held at 3.0%."
      },
      {
        "type": "stat",
        "stat": {
          "value": "3.50–3.75%",
          "label": "Federal Funds Rate (March 2026)"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "$110+/bbl",
          "label": "Crude Oil Price"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "11-1",
          "label": "FOMC Vote"
        }
      },
      {
        "type": "heading",
        "text": "Historical Pattern: The Fed in Crisis"
      },
      {
        "type": "text",
        "text": "The Federal Reserve has faced similar crossroads before. In 2008, as documented in Chapter 13 of The Record, the Fed slashed rates to near zero while bailing out the institutions whose reckless behavior caused the crisis. Not a single top banking executive was prosecuted. The $700 billion in taxpayer-funded bailouts went to the same firms that packaged toxic mortgages as AAA securities."
      },
      {
        "type": "text",
        "text": "Today’s situation differs in mechanism but not in structure: the Federal Reserve remains the institution tasked with managing consequences of policy decisions made elsewhere — in this case, a military conflict that has disrupted the oil supply chain the U.S. economy was built to depend on."
      },
      {
        "type": "evidence",
        "text": "All interest rate data, FOMC statements, and dot plot projections cited in this article are sourced directly from the Federal Reserve Board’s official publications at federalreserve.gov.",
        "tier": "verified"
      }
    ]
  },
  {
    "id": "epstein-files-3-5-million-pages",
    "slug": "doj-releases-3-5-million-pages-epstein-files-2026",
    "title": "The DOJ Has Released 3.5 Million Pages of Epstein Files. Here Is What They Contain.",
    "subtitle": "The largest disclosure of criminal case materials in American history includes 2,000 videos, 180,000 images, and records from five federal investigations — and has exposed catastrophic failures in victim privacy protections.",
    "author": "Veritas Worldwide",
    "publishDate": "March 24, 2026",
    "category": "Accountability & Transparency",
    "tags": [
      "epstein files",
      "DOJ",
      "transparency",
      "victim privacy",
      "Epstein Files Transparency Act"
    ],
    "heroImage": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/NY_Southern_District_Courthouse.jpg/1200px-NY_Southern_District_Courthouse.jpg",
      "alt": "U.S. District Court, Southern District of New York",
      "credit": "Wikimedia Commons / CC BY-SA 4.0"
    },
    "readingTime": 14,
    "seo": {
      "metaTitle": "Epstein Files 2026: 3.5 Million Pages Released | Full Analysis",
      "metaDescription": "The DOJ released 3.5 million pages of Epstein files including 2,000 videos and 180,000 images. What the documents reveal and the privacy crisis they caused.",
      "keywords": [
        "epstein files 2026",
        "DOJ epstein documents",
        "epstein transparency act",
        "epstein files released"
      ]
    },
    "relatedChapters": [
      "chapter-28"
    ],
    "sources": [
      {
        "id": 1,
        "title": "DOJ Publishes 3.5 Million Responsive Pages",
        "publisher": "U.S. Department of Justice",
        "url": "https://www.justice.gov/opa/pr/department-justice-publishes-35-million-responsive-pages-compliance-epstein-files",
        "date": "Jan 30, 2026",
        "type": "government"
      },
      {
        "id": 2,
        "title": "Epstein Library",
        "publisher": "U.S. Department of Justice",
        "url": "https://www.justice.gov/epstein",
        "date": "2026",
        "type": "government"
      },
      {
        "id": 3,
        "title": "Massive Trove of Epstein Files Released by DOJ",
        "publisher": "CBS News",
        "url": "https://www.cbsnews.com/live-updates/epstein-files-released-doj-2026/",
        "date": "Jan 30, 2026",
        "type": "journalism"
      },
      {
        "id": 4,
        "title": "4 Things to Know About the Latest Epstein Files",
        "publisher": "NPR",
        "url": "https://www.npr.org/2026/02/03/nx-s1-5696975/what-to-know-epstein-files-latest",
        "date": "Feb 3, 2026",
        "type": "journalism"
      },
      {
        "id": 5,
        "title": "Epstein Files Transparency Act — Full Text",
        "publisher": "Congress.gov",
        "url": "https://www.congress.gov/bill/119th-congress/house-bill/4405/text",
        "date": "2025",
        "type": "government"
      },
      {
        "id": 6,
        "title": "Flawed Disclosures Undermine Accountability",
        "publisher": "UN OHCHR",
        "url": "https://www.ohchr.org/en/press-releases/2026/02/flawed-epstein-files-disclosures-undermine-accountability-grave-crimes",
        "date": "Feb 2026",
        "type": "primary"
      }
    ],
    "content": [
      {
        "type": "text",
        "text": "On January 30, 2026, the Department of Justice published the largest single disclosure of criminal case materials in American history: approximately 3.5 million pages of documents, 2,000 videos, and 180,000 images related to Jeffrey Epstein and his associates. The release was mandated by the Epstein Files Transparency Act, signed into law on November 19, 2025."
      },
      {
        "type": "heading",
        "text": "Five Federal Investigations, One Archive"
      },
      {
        "type": "text",
        "text": "The documents were compiled from five primary investigative sources: the Florida and New York criminal cases against Epstein, the case against Ghislaine Maxwell, investigations into Epstein’s death at the Metropolitan Correctional Center, a Florida case involving a former Epstein employee, multiple FBI investigations, and the Office of Inspector General’s inquiry into Epstein’s death in August 2019."
      },
      {
        "type": "evidence",
        "text": "The DOJ’s official press release confirms the publication of approximately 3.5 million responsive pages across multiple federal investigations, accessible through the Epstein Library portal at justice.gov/epstein.",
        "tier": "verified"
      },
      {
        "type": "heading",
        "text": "The Privacy Catastrophe"
      },
      {
        "type": "text",
        "text": "Within hours of publication, the release became the subject of emergency legal action. Attorneys representing more than 200 alleged victims filed motions demanding the immediate takedown of the DOJ’s Epstein Files website. The Justice Department had published dozens of unredacted images showing young women with their faces visible."
      },
      {
        "type": "quote",
        "text": "The release constitutes the single most egregious violation of victim privacy in one day in United States history.",
        "attribution": "Attorneys for 200+ alleged Epstein victims, Feb. 1, 2026"
      },
      {
        "type": "text",
        "text": "The UN Office of the High Commissioner for Human Rights issued a statement saying the flawed disclosures undermine accountability for grave crimes and called for immediate remedial action."
      },
      {
        "type": "callout",
        "text": "RELATED: Chapter 28 of The Record — The Epstein Files provides the full documented history through court filings, flight logs, and sworn testimony. The Deep State interactive dossier maps the network connections."
      },
      {
        "type": "stat",
        "stat": {
          "value": "3.5M",
          "label": "Pages Released"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "2,000",
          "label": "Videos in Archive"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "180,000",
          "label": "Images Published"
        }
      },
      {
        "type": "heading",
        "text": "What the Documents Reveal"
      },
      {
        "type": "text",
        "text": "NPR’s analysis identified four key takeaways: references to powerful individuals across finance, politics, and entertainment; inconsistent redaction patterns; evidence of institutional failures in monitoring Epstein in custody; and documentation of a trafficking operation spanning multiple countries and decades."
      },
      {
        "type": "heading",
        "text": "The Transparency Act and Its Limits"
      },
      {
        "type": "text",
        "text": "The Epstein Files Transparency Act was modeled on the JFK Records Act of 1992. As documented in Chapter 9 of The Record, JFK assassination records remain partially classified more than 60 years later — a cautionary precedent. The DOJ has indicated additional materials may be published as review continues."
      },
      {
        "type": "evidence",
        "text": "All documents referenced are accessible through the DOJ’s Epstein Library at justice.gov/epstein. The Transparency Act is published at congress.gov.",
        "tier": "verified"
      }
    ]
  },
  {
    "id": "fisa-section-702-reform-2026",
    "slug": "government-surveillance-reform-act-fisa-section-702-2026",
    "title": "Congress Races to Reform FISA Section 702 Before April Sunset. Here Is What the Bill Would Change.",
    "subtitle": "The bipartisan Government Surveillance Reform Act would require warrants for FBI searches, close the data broker loophole, and restore oversight of the secret FISA court — the most significant surveillance reform since the Snowden disclosures.",
    "author": "Veritas Worldwide",
    "publishDate": "March 24, 2026",
    "category": "Surveillance & Civil Liberties",
    "tags": [
      "FISA",
      "Section 702",
      "surveillance",
      "privacy",
      "Fourth Amendment",
      "data brokers",
      "Wyden",
      "Lee"
    ],
    "heroImage": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Edward_Snowden-2.jpg/800px-Edward_Snowden-2.jpg",
      "alt": "Edward Snowden, former NSA contractor who exposed mass surveillance",
      "credit": "Wikimedia Commons / CC BY 3.0"
    },
    "readingTime": 11,
    "seo": {
      "metaTitle": "FISA Section 702 Reform 2026: Government Surveillance Reform Act Explained",
      "metaDescription": "The Government Surveillance Reform Act would require warrants for FBI searches of Section 702 data and close the data broker loophole. Full analysis of the bipartisan bill.",
      "keywords": [
        "FISA section 702 reform 2026",
        "government surveillance reform act",
        "FISA sunset 2026",
        "warrant requirement FBI",
        "data broker loophole"
      ]
    },
    "relatedChapters": [
      "chapter-18",
      "chapter-19",
      "chapter-27"
    ],
    "sources": [
      {
        "id": 1,
        "title": "Lee Introduces Bipartisan Government Surveillance Reform Act",
        "publisher": "Office of Sen. Mike Lee",
        "url": "https://www.lee.senate.gov/2026/3/lee-introduces-bipartisan-government-surveillance-reform-act",
        "date": "March 2026",
        "type": "government"
      },
      {
        "id": 2,
        "title": "Wyden, Lee, Davidson and Lofgren Introduce Bill to Reform FISA Section 702",
        "publisher": "Office of Sen. Ron Wyden",
        "url": "https://www.wyden.senate.gov/news/press-releases/wyden-lee-davidson-and-lofgren-introduce-bill-to-reform-fisa-section-702-protect-americans-constitutional-rights-and-plug-data-broker-surveillance-loophole",
        "date": "March 2026",
        "type": "government"
      },
      {
        "id": 3,
        "title": "Government Surveillance Reform Act — Section-by-Section",
        "publisher": "Sen. Wyden’s Office",
        "url": "https://www.wyden.senate.gov/imo/media/doc/section-by-section_for_government_surveillance_reform_act_of_2026pdf.pdf",
        "date": "2026",
        "type": "government"
      },
      {
        "id": 4,
        "title": "The SAFE Act Is an Imperfect Vehicle for Real Section 702 Reform",
        "publisher": "Electronic Frontier Foundation",
        "url": "https://www.eff.org/deeplinks/2026/03/safe-act-imperfect-vehicle-real-section-702-reform",
        "date": "March 2026",
        "type": "journalism"
      },
      {
        "id": 5,
        "title": "Government Surveillance Transparency Act (H.R. 7738)",
        "publisher": "Congress.gov",
        "url": "https://www.congress.gov/bill/119th-congress/house-bill/7738",
        "date": "2026",
        "type": "government"
      }
    ],
    "content": [
      {
        "type": "text",
        "text": "With FISA Section 702 approaching its April 2026 sunset, a bipartisan coalition in Congress has introduced the most significant surveillance reform legislation since the Snowden disclosures. The Government Surveillance Reform Act, sponsored by Senators Ron Wyden (D-OR) and Mike Lee (R-UT) alongside Representatives Warren Davidson (R-OH) and Zoe Lofgren (D-CA), would fundamentally restructure how the U.S. government collects and searches Americans’ communications data."
      },
      {
        "type": "heading",
        "text": "What Section 702 Allows Today"
      },
      {
        "type": "text",
        "text": "Section 702 of the Foreign Intelligence Surveillance Act authorizes the NSA to collect the communications of foreigners located outside the United States. In practice, this collection inevitably sweeps up vast quantities of Americans’ communications — emails, phone calls, text messages — when they communicate with foreign targets. The FBI can then search this database for Americans’ information without a warrant, a practice civil liberties groups call the ‘backdoor search loophole.’"
      },
      {
        "type": "evidence",
        "text": "The Government Surveillance Reform Act bill text and section-by-section analysis are published by Sen. Wyden’s office, confirming the warrant requirement for FBI queries of Section 702 data involving U.S. persons.",
        "tier": "verified"
      },
      {
        "type": "heading",
        "text": "What the Reform Bill Would Change"
      },
      {
        "type": "text",
        "text": "The bill introduces five major reforms. First, it requires federal law enforcement to obtain a warrant before searching Section 702 data for Americans’ information. Second, it closes the data broker loophole by prohibiting the government from purchasing Americans’ location data, web browsing history, search records, and chatbot conversations from commercial data brokers. Third, it repeals a controversial 2024 expansion that allowed the government to compel millions of Americans and companies to secretly participate in surveillance. Fourth, it reinstates the Privacy and Civil Liberties Oversight Board with confirmed members and bans politically motivated firings. Fifth, it mandates timely audits of agency query practices and public reporting."
      },
      {
        "type": "callout",
        "text": "RELATED: Chapter 27 of The Record — The Surveillance State traces the history of government mass surveillance from Cold War ECHELON to modern smartphone tracking. Chapter 18 documents Operation Mockingbird and CIA media infiltration."
      },
      {
        "type": "heading",
        "text": "The Transparency Companion Bill"
      },
      {
        "type": "text",
        "text": "In parallel, the Government Surveillance Transparency Act (H.R. 7738) would require public reporting of the hundreds of thousands of criminal surveillance orders issued by courts each year. Currently, these orders are typically sealed indefinitely — meaning Americans may be surveilled without ever learning about it, even when they are never charged with a crime."
      },
      {
        "type": "stat",
        "stat": {
          "value": "April 2026",
          "label": "Section 702 Sunset Date"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "4",
          "label": "Bipartisan Sponsors"
        }
      },
      {
        "type": "heading",
        "text": "Why This Matters Now"
      },
      {
        "type": "text",
        "text": "The bill arrives at a moment when government surveillance capabilities have expanded far beyond what even the Church Committee could have imagined in 1975. As documented throughout The Record, from Operation Mockingbird to MKUltra to the Snowden disclosures, the pattern is consistent: surveillance powers granted in the name of national security are routinely turned inward against domestic populations. The question before Congress is whether this generation will impose the constraints that previous generations did not."
      },
      {
        "type": "evidence",
        "text": "All legislative texts and official statements cited are published on congress.gov and the sponsoring members’ official Senate and House websites.",
        "tier": "verified"
      }
    ]
  },
  {
    "id": "defense-budget-1-5-trillion-2027",
    "slug": "us-defense-budget-1-5-trillion-2027-proposal",
    "title": "$1.5 Trillion: The Pentagon’s Proposed 2027 Budget Would Be the Largest in American History",
    "subtitle": "Coming on the heels of an $839 billion FY2026 appropriation and a $152 billion reconciliation boost, the White House is requesting a defense budget that exceeds the GDP of all but 12 nations on Earth.",
    "author": "Veritas Worldwide",
    "publishDate": "March 24, 2026",
    "category": "Defense & Foreign Policy",
    "tags": [
      "defense budget",
      "military spending",
      "Pentagon",
      "F-47",
      "Iran",
      "defense appropriations"
    ],
    "heroImage": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/The_Pentagon_January_2008.jpg/1200px-The_Pentagon_January_2008.jpg",
      "alt": "Aerial view of the Pentagon",
      "credit": "Public Domain — U.S. Department of Defense"
    },
    "readingTime": 10,
    "seo": {
      "metaTitle": "US Defense Budget 2027: $1.5 Trillion Proposed | Military Spending Analysis",
      "metaDescription": "The White House 2027 defense budget proposal of $1.5 trillion would be the largest in American history. Analysis of spending priorities, weapon systems, and what it means for taxpayers.",
      "keywords": [
        "defense budget 2027",
        "military spending 2026",
        "pentagon budget 1.5 trillion",
        "US defense spending",
        "F-47 fighter budget"
      ]
    },
    "relatedChapters": [
      "chapter-10",
      "chapter-11",
      "chapter-15"
    ],
    "sources": [
      {
        "id": 1,
        "title": "Congress Approves FY 2026 Defense Appropriations Bill",
        "publisher": "Senate Appropriations Committee",
        "url": "https://www.appropriations.senate.gov/news/majority/congress-approves-fy-2026-defense-appropriations-bill",
        "date": "2026",
        "type": "government"
      },
      {
        "id": 2,
        "title": "Record-Smashing $1.5 Trillion Spending Proposal",
        "publisher": "Defense One",
        "url": "https://www.defenseone.com/policy/2026/03/record-smashing-15-trillion-spending-proposal-will-fund-only-most-essential-things-comptroller/412190/",
        "date": "March 2026",
        "type": "journalism"
      },
      {
        "id": 3,
        "title": "DoD Plans to Spend $152 Billion From Reconciliation",
        "publisher": "Federal News Network",
        "url": "https://federalnewsnetwork.com/defense-main/2026/02/dod-plans-to-spend-entire-152-billion-from-reconciliation-bill-in-one-year/",
        "date": "Feb 2026",
        "type": "journalism"
      },
      {
        "id": 4,
        "title": "Trump’s 2026 State of the Union: $1 Trillion Defense Budget",
        "publisher": "Military.com",
        "url": "https://www.military.com/feature/2026/02/24/trumps-2026-state-of-union-1-trillion-defense-budget-warrior-dividend-and-what-it-means-troops.html",
        "date": "Feb 2026",
        "type": "journalism"
      },
      {
        "id": 5,
        "title": "FY2026 Defense Budget: Funding for Selected Weapon Systems",
        "publisher": "Congressional Research Service",
        "url": "https://www.congress.gov/crs-product/R48860",
        "date": "2026",
        "type": "government"
      }
    ],
    "content": [
      {
        "type": "text",
        "text": "The numbers are staggering even by Pentagon standards. The White House’s upcoming budget request will ask Congress to approve approximately $1.5 trillion in defense spending for fiscal year 2027 — roughly 50% more than the current year’s already record-breaking budget. The proposal comes as the United States is simultaneously engaged in a military conflict with Iran and maintaining force postures across Europe, the Pacific, and the Middle East."
      },
      {
        "type": "heading",
        "text": "How We Got Here: The Spending Trajectory"
      },
      {
        "type": "text",
        "text": "Congress approved an $838.7 billion defense appropriations bill for FY2026 by a Senate vote of 71-29. That figure was itself $8.4 billion more than the Pentagon had requested. On top of this, the Department of Defense plans to spend an additional $152 billion from a reconciliation bill in a single year — funds originally intended to be disbursed over multiple years."
      },
      {
        "type": "evidence",
        "text": "The Senate Appropriations Committee confirms the FY2026 defense appropriations bill was passed at $838.7 billion. Defense One reports the FY2027 proposal at $1.5 trillion.",
        "tier": "verified"
      },
      {
        "type": "heading",
        "text": "Where the Money Goes"
      },
      {
        "type": "text",
        "text": "The FY2026 appropriation includes $3 billion for the Air Force’s sixth-generation F-47 fighter, $972 million for the Navy’s F/A-XX program, and $500 million for U.S.-Israel missile defense cooperation including Iron Dome, David’s Sling, and Arrow systems. The $152 billion reconciliation supplement is expected to accelerate procurement of advanced weapons systems and expand the industrial base."
      },
      {
        "type": "stat",
        "stat": {
          "value": "$1.5T",
          "label": "Proposed FY2027 Defense Budget"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "$839B",
          "label": "FY2026 Enacted"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "$152B",
          "label": "Reconciliation Supplement"
        }
      },
      {
        "type": "callout",
        "text": "RELATED: Chapter 15 — U.S. Foreign Aid to Israel documents CRS's $298 billion constant-dollar aid-obligation total for 1946-2024. Chapter 11 — Shadow Institutions examines the private organizations influencing defense policy."
      },
      {
        "type": "heading",
        "text": "Historical Context: The Arc of Military Spending"
      },
      {
        "type": "text",
        "text": "To appreciate the scale: $1.5 trillion exceeds the entire GDP of Spain, Australia, or Mexico. It is roughly equal to the combined military budgets of the next 10 largest defense spenders on Earth. The trajectory from $700 billion in 2020 to $1.5 trillion in 2027 represents a doubling in seven years — a rate of increase that outpaces inflation, GDP growth, and every other category of federal spending."
      },
      {
        "type": "text",
        "text": "As documented in Chapter 10 of The Record, the petrodollar system and its associated military commitments have driven U.S. defense spending upward for five decades. The current Iran conflict has accelerated this trajectory, providing the political justification for spending levels that would have been unthinkable even a decade ago."
      },
      {
        "type": "evidence",
        "text": "All budget figures are sourced from the Senate Appropriations Committee, Congressional Research Service, and the DoD Comptroller’s office.",
        "tier": "verified"
      }
    ]
  },
  {
    "id": "aipac-spending-2026-elections",
    "slug": "aipac-record-spending-reshaping-congress-2026",
    "title": "AIPAC Has Spent $28 Million Reshaping Congress in 2026. Here Is Where the Money Went.",
    "subtitle": "The most powerful foreign policy lobby in America is funneling record sums through shell super PACs to defeat candidates who support conditioning U.S. aid to Israel. The Illinois primaries reveal the full playbook.",
    "author": "Veritas Worldwide",
    "publishDate": "March 24, 2026",
    "category": "Lobbying & Political Influence",
    "tags": [
      "AIPAC",
      "lobbying",
      "Israel",
      "elections",
      "campaign finance",
      "Illinois primaries",
      "foreign aid"
    ],
    "heroImage": {
      "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/US_Capitol_Building_at_night_Jan_2006.jpg/1200px-US_Capitol_Building_at_night_Jan_2006.jpg",
      "alt": "U.S. Capitol Building at night",
      "credit": "Public Domain — Wikimedia Commons"
    },
    "readingTime": 11,
    "seo": {
      "metaTitle": "AIPAC Spending 2026: $28 Million in Congressional Elections | Full Breakdown",
      "metaDescription": "AIPAC and its super PACs have spent $28 million in the 2026 election cycle targeting candidates who support conditioning aid to Israel. Analysis of Illinois primaries and lobbying tactics.",
      "keywords": [
        "AIPAC spending 2026",
        "AIPAC elections",
        "Israel lobby congress",
        "AIPAC super PAC",
        "Illinois primary AIPAC"
      ]
    },
    "relatedChapters": [
      "chapter-8",
      "chapter-14",
      "chapter-15"
    ],
    "sources": [
      {
        "id": 1,
        "title": "AIPAC Record Spending Is Reshaping Congress in 2026",
        "publisher": "Legis1",
        "url": "https://legis1.com/news/aipac-is-the-biggest-follow-the-money-pac-story-of-2026-and-its-getting-complicated/",
        "date": "2026",
        "type": "journalism"
      },
      {
        "id": 2,
        "title": "Pro-Israel Group Pours $13.7 Million Into Chicago Primaries",
        "publisher": "WBEZ Chicago",
        "url": "https://www.wbez.org/politics/2026/02/27/aipac-pro-israel-groups-chicago-area-democratic-congressional-primaries-miller-conyears-ervin-bean-fine",
        "date": "Feb 27, 2026",
        "type": "journalism"
      },
      {
        "id": 3,
        "title": "AIPAC Is Targeting Candidates Who Want to Condition Aid to Israel",
        "publisher": "Jewish Telegraphic Agency",
        "url": "https://www.jta.org/2026/03/10/politics/aipac-is-targeting-candidates-who-want-to-condition-aid-to-israel-who-has-crossed-its-red-line",
        "date": "March 10, 2026",
        "type": "journalism"
      },
      {
        "id": 4,
        "title": "American Israel Public Affairs Committee — Summary",
        "publisher": "OpenSecrets",
        "url": "https://www.opensecrets.org/orgs/american-israel-public-affairs-cmte/summary?id=D000046963",
        "date": "2026",
        "type": "primary"
      },
      {
        "id": 5,
        "title": "AIPAC Super PAC Funded Illinois Groups",
        "publisher": "NBC News",
        "url": "https://www.nbcnews.com/politics/2026-election/aipac-super-pac-funded-illinois-groups-democratic-primaries-israel-rcna264379",
        "date": "2026",
        "type": "journalism"
      },
      {
        "id": 6,
        "title": "House Adopts Defense Bill With Pro-Israel Provisions",
        "publisher": "AIPAC",
        "url": "https://www.aipac.org/resources/house-ndaa-2026",
        "date": "2026",
        "type": "primary"
      }
    ],
    "content": [
      {
        "type": "text",
        "text": "Through the first half of the 2025–2026 election cycle, the American Israel Public Affairs Committee and its affiliated organizations have delivered approximately $28 million to campaigns of members of Congress — more than three times the amount contributed by the next-largest PAC, the National Association of Realtors. The spending has reshaped primary elections across the country, with the Illinois Democratic primaries serving as the most dramatic case study."
      },
      {
        "type": "heading",
        "text": "The Illinois Playbook: $22 Million Through Shell PACs"
      },
      {
        "type": "text",
        "text": "AIPAC’s super PAC, United Democracy Project, spent $22 million to influence four 2026 Illinois House Democratic primary elections. The money was funneled through two shell organizations — Elect Chicago Women and Affordable Chicago Now — that were created specifically for these races and gave no indication of their pro-Israel funding source in their names or public materials."
      },
      {
        "type": "evidence",
        "text": "NBC News and WBEZ Chicago both confirmed AIPAC’s United Democracy Project seeded the shell super PACs. OpenSecrets FEC filings corroborate the $28 million total cycle contribution figure.",
        "tier": "verified"
      },
      {
        "type": "heading",
        "text": "The Red Line: Conditioning Aid to Israel"
      },
      {
        "type": "text",
        "text": "The Jewish Telegraphic Agency reported that AIPAC’s United Democracy Project stated its strategy plainly: the organization focuses on defeating candidates who are ‘detractors of Israel or who want to put conditions on aid.’ Conditioning U.S. military aid to Israel on compliance with international humanitarian law has become the lobby’s primary red line."
      },
      {
        "type": "quote",
        "text": "We are going to have a focus on stopping candidates who are detractors of Israel or who want to put conditions on aid.",
        "attribution": "United Democracy Project (AIPAC super PAC), 2026"
      },
      {
        "type": "callout",
        "text": "RELATED: Chapter 14 — AIPAC & Congressional Lobbying documents how the lobby operates, who it funds, and what happens to those who oppose it. Chapter 15 details CRS's $298 billion constant-dollar aid-obligation total for 1946-2024."
      },
      {
        "type": "heading",
        "text": "Defense Bill Provisions"
      },
      {
        "type": "text",
        "text": "The lobbying effort extends beyond elections. The bipartisan FY2026 National Defense Authorization Act, which passed the House, includes $500 million for U.S.-Israel missile defense cooperation, including procurement of Iron Dome, David’s Sling, and Arrow systems, plus bilateral research and development funding — all identified as AIPAC priorities."
      },
      {
        "type": "stat",
        "stat": {
          "value": "$28M+",
          "label": "AIPAC Cycle Spending (2025–2026)"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "$22M",
          "label": "Spent on Illinois Primaries Alone"
        }
      },
      {
        "type": "stat",
        "stat": {
          "value": "$500M",
          "label": "Israel Missile Defense in FY2026 NDAA"
        }
      },
      {
        "type": "heading",
        "text": "The Broader Pattern"
      },
      {
        "type": "text",
        "text": "As documented in Chapter 8 of The Record, AIPAC’s influence on American politics dates to President Kennedy’s confrontation with Israel over the Dimona nuclear reactor. Kennedy demanded inspections; AIPAC worked to block them. The lobby’s evolution from a traditional advocacy organization to the largest PAC spender in American politics represents one of the most significant transformations in the relationship between foreign policy and domestic elections."
      },
      {
        "type": "text",
        "text": "The question raised by the 2026 spending is whether a foreign policy lobby’s ability to determine the outcome of domestic primary elections through anonymous shell PACs is compatible with democratic self-governance. The answer, as with all claims in this publication, is left to the reader."
      },
      {
        "type": "evidence",
        "text": "All spending figures are sourced from FEC filings via OpenSecrets, NBC News, and WBEZ Chicago investigative reporting. AIPAC’s own published priorities are cited from aipac.org.",
        "tier": "verified"
      }
    ]
  }
]


// Merge all article batches into single collection
export const allArticles: Article[] = [
  ...articles,
  ...expandedArticlesA,
]

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug)
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return allArticles.filter(a => a.category === category)
}

export function getLatestArticles(count: number = 5): Article[] {
  return allArticles.slice(0, count)
}
