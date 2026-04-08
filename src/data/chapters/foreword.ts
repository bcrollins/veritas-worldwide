import type { Chapter } from '../chapterTypes'

const chapter: Chapter = {
  id: 'foreword',
  number: 'Foreword',
  title: 'A Note on Methodology, Evidence Standards & How to Read This Book',
  subtitle: 'This is a reference work. It compiles primary source documents — court records, congressional testimony, declassified government files, academic studies, and verified financial disclosures — into a single chronological narrative.',
  dateRange: '',
  author: 'Veritas Worldwide',
  publishDate: 'March 2026',
  heroImage: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/US_National_Archives_Building.jpg/1280px-US_National_Archives_Building.jpg',
    alt: 'The National Archives Building in Washington, D.C., viewed from Pennsylvania Avenue — the repository of America\'s founding documents and declassified government records',
    caption: 'The National Archives Building, Washington, D.C. — where the primary source documents cited throughout this publication are preserved and publicly accessible.',
    credit: 'Photo: National Archives, Public Domain via Wikimedia Commons',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:National_Archives_Building_-_from_Pennsylvania_Avenue.jpg',
  },
  content: [
    { type: 'dropcap', text: 'Before proceeding, it is necessary to address a phrase that will occur to many readers upon encountering this book\'s subject matter. The term "conspiracy theory" has become, in modern usage, a mechanism for dismissing inquiry rather than engaging with it. Its history is instructive. A 1967 CIA dispatch (Document 1035-960), declassified in 1976 under a Freedom of Information Act request by The New York Times, recommended that the Agency\'s media contacts use the term "conspiracy theorists" to discredit critics of the Warren Commission\'s findings on the assassination of President Kennedy. The document is available in full from the National Archives.' },
    { type: 'text', text: 'This is not to suggest that all claims labeled "conspiracy theories" are true. Many are not. It is to observe that the phrase functions, in practice, as a thought-terminating cliché — a label that substitutes for analysis. When a claim is false, it can be refuted with evidence. When a claim is true but inconvenient, it is often easier to label it a "conspiracy theory" than to address the evidence it presents.' },
    { type: 'text', text: 'This book does not ask the reader to accept any theory. It presents documented facts — sourced to primary documents that the reader can verify independently — and allows those facts to speak for themselves. Where the evidence is strong, we say so. Where the evidence is incomplete or contested, we say that as well. Where a mainstream counter-argument exists, we present it. The reader is the judge.' },
    { type: 'evidence', evidence: { tier: 'verified', label: 'THE COUNTER-ARGUMENT, STATED FAIRLY', text: 'Skeptics will argue — reasonably — that pattern recognition is not proof of coordination. The fact that the same institutions, families, or individuals appear across multiple historical events does not, by itself, prove that those events were orchestrated. Correlation is not causation. Institutional power tends to concentrate naturally in market economies, and the same names recur because wealth compounds across generations. This is a valid analytical framework, and the reader should keep it in mind throughout.' } },
    { type: 'heading', text: 'Methodology' },
    { type: 'text', text: 'The research methodology for this book follows the standards of academic historiography. Every factual claim is sourced. Sources are prioritized in a five-tier hierarchy: Tier 1 (Government & Legal Records) includes congressional records, court filings, executive orders, treaties, statutory text, declassified intelligence documents, and National Archives materials. Tier 2 (Institutional Records) includes official publications and filings from the institutions named in the reporting, including central bank releases, international body reports, and company disclosures. Tier 3 (Investigative Journalism) includes long-form reporting from outlets with documented editorial standards, especially when it surfaces named testimony or hard-to-obtain records. Tier 4 (Academic & Scholarly Works) includes peer-reviewed journal articles, law reviews, university press monographs, and doctoral dissertations. Tier 5 (Secondary Reporting & Analysis) includes biographies, historical surveys, and memoirs used for context but not as the sole basis for factual claims.' },
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
  }

export default chapter
