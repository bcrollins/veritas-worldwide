import type { Chapter } from '../chapterTypes'

const chapter: Chapter = {
  id: 'chapter-29',
  number: 'Chapter 29',
  title: 'The Evidence Chain - How Claims Become Public Record',
  subtitle: 'A field guide for turning allegations, rumors, filings, disclosures, and public data into a disciplined research trail without confusing documentation with inference.',
  dateRange: 'Methodology',
  author: 'Veritas Worldwide',
  publishDate: 'April 2026',
  heroImage: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/US_National_Archives_Building.jpg/1280px-US_National_Archives_Building.jpg',
    alt: 'The National Archives Building in Washington, D.C.',
    caption: 'A durable investigation begins with records that can be retrieved, cited, compared, and challenged.',
    credit: 'Carol M. Highsmith, Library of Congress',
  },
  chapterType: 'reference',
  content: [
    {
      type: 'dropcap',
      text: 'The most important question in an investigation is not whether a claim sounds plausible. It is whether the claim can survive contact with the record. A public allegation, a viral clip, a donor database entry, a court docket, a federal spending record, and a sworn filing do not carry the same evidentiary weight. They belong on different rungs of the ladder.',
    },
    {
      type: 'stats',
      stats: [
        { value: '10', label: 'public record systems mapped' },
        { value: '5', label: 'evidence labels enforced' },
        { value: '0', label: 'identity shortcuts allowed' },
        { value: '1', label: 'rule: records before certainty' },
      ],
    },
    {
      type: 'evidence',
      evidence: {
        tier: 'verified',
        label: 'Verified - Public record repositories exist before interpretation begins',
        text: 'The National Archives, Congress.gov, Federal Register, FOIA.gov, FEC data, SEC EDGAR, USAspending, Data.gov, and court-record access systems each publish different classes of public records. Their existence does not prove a theory by itself; it gives the researcher a place to retrieve a document, preserve the link, and test a narrower claim.',
      },
    },
    {
      type: 'heading',
      text: 'The record is not the conclusion',
    },
    {
      type: 'text',
      text: 'A record can prove that a document exists, that a filing was made, that a payment was disclosed, that an agency published a rule, or that a case docket recorded a filing. It usually cannot prove hidden motive, secret coordination, ideological causation, or criminal intent without additional evidence. The Veritas method treats that boundary as a publication rule, not a stylistic preference.',
    },
    {
      type: 'text',
      text: 'This is the discipline that keeps a dossier from becoming a pile of screenshots. Every claim must be reduced to a testable sentence: who did what, when, where, according to which record, and what confidence level does that record actually support. If the record supports only contact, disclosure, payment, ownership, appointment, travel, or publication, the wording must stop there unless additional evidence closes the gap.',
    },
    {
      type: 'table',
      table: {
        caption: 'Record types and evidentiary limits',
        headers: ['Record type', 'Best first source', 'Can support', 'Cannot prove alone'],
        rows: [
          ['Bills, votes, hearings', 'Congress.gov', 'Official legislative text, sponsors, actions, committees', 'Private motive or undisclosed pressure'],
          ['Rules and notices', 'Federal Register / govinfo', 'Published agency action, comment windows, official PDFs', 'Whether the policy is wise or corrupt'],
          ['Federal case dockets', 'PACER / CourtListener RECAP', 'Filings, docket entries, parties, dates, public documents', 'Truth of every allegation inside a filing'],
          ['Campaign finance', 'FEC data', 'Disclosed receipts, spending, filings, committee records', 'A quid pro quo without corroboration'],
          ['Corporate filings', 'SEC EDGAR', 'Issuer disclosures, officers, transactions, risk language', 'Facts omitted from the filing'],
          ['Federal spending', 'USAspending.gov', 'Awards, recipients, agencies, dates, amounts', 'Performance quality or hidden beneficiaries'],
          ['Archival records', 'National Archives', 'Record groups, files, declassified material, historical context', 'A complete account of events not yet released'],
          ['FOIA records', 'FOIA.gov / agency portals', 'Request path, agency ownership, released documents', 'That unreleased material does not exist'],
        ],
      },
    },
    {
      type: 'heading',
      text: 'The source ladder',
    },
    {
      type: 'text',
      text: 'The first rung is the original public record: statute, docket, filing, disclosure, budget record, contract, agency notice, declassified file, official transcript, or archive catalog entry. The second rung is an institutional explanation from the agency or record custodian. The third rung is reporting that points back to documents. The fourth rung is expert interpretation. The fifth rung is open-source commentary. A dossier can use every rung, but it cannot pretend they are equal.',
    },
    {
      type: 'evidence',
      evidence: {
        tier: 'verified',
        label: 'Verified - Federal Register pages warn researchers to verify legal results against official editions',
        text: 'FederalRegister.gov provides searchable XML renditions and API endpoints, but its legal-status notice tells researchers to verify legal results against the official editions, including the corresponding official PDFs. The method therefore records both the searchable page and the official edition when legal precision matters.',
      },
    },
    {
      type: 'evidence',
      evidence: {
        tier: 'circumstantial',
        label: 'Circumstantial - Patterns require multiple independent records',
        text: 'A repeated pattern across campaign filings, procurement awards, meetings, lobbying disclosures, court records, and public statements can justify analysis. It still does not become settled fact until the chain shows causation, agreement, or intent through stronger evidence. Pattern language must stay labeled as analysis unless the record closes that gap.',
      },
    },
    {
      type: 'heading',
      text: 'Build the claim file before writing the claim',
    },
    {
      type: 'timeline',
      timeline: [
        { year: '1', text: 'Write the narrow claim in one sentence and remove any motive language that the current record does not prove.' },
        { year: '2', text: 'Find the original record system before relying on a screenshot, excerpt, repost, or secondary summary.' },
        { year: '3', text: 'Capture the citation: title, custodian, date, docket or accession number when available, URL, access date, and archive fallback.' },
        { year: '4', text: 'Identify what the record proves and what it merely suggests. Separate verified facts from circumstantial analysis.' },
        { year: '5', text: 'Look for disconfirming records: corrections, amended filings, later rulings, agency updates, retractions, and competing explanations.' },
        { year: '6', text: 'Write with the lowest defensible certainty. Upgrade the wording only when the evidence chain supports the upgrade.' },
      ],
    },
    {
      type: 'heading',
      text: 'Money records need extra restraint',
    },
    {
      type: 'text',
      text: 'Campaign finance, federal spending, and corporate filings are among the most useful public records because they name dates, amounts, parties, and disclosure categories. They also invite overreach. A donor record can document a disclosed contribution. It cannot, by itself, prove that a public official sold an action. A grant or contract record can document public spending. It cannot, by itself, prove that the recipient performed well, underperformed, or acted as a proxy for someone else.',
    },
    {
      type: 'evidence',
      evidence: {
        tier: 'verified',
        label: 'Verified - FEC, SEC, and USAspending expose different money trails',
        text: 'FEC data is built for campaign-finance reporting, SEC EDGAR for company and securities filings, and USAspending for federal award data. A serious money trail keeps those systems separate, records the exact entity names used by each system, and avoids merging similarly named people or organizations without corroboration.',
      },
    },
    {
      type: 'heading',
      text: 'Court records are filings, not verdicts',
    },
    {
      type: 'text',
      text: 'Court dockets are powerful because they preserve procedural history, filings, orders, exhibits, and party positions. They are also dangerous if used lazily. A complaint records what one side alleged. An indictment records what prosecutors charged. A plea, verdict, judgment, dismissal, sanctions order, or appellate decision carries a different meaning. The citation must say which document is being used and what legal posture it had when accessed.',
    },
    {
      type: 'evidence',
      evidence: {
        tier: 'disputed',
        label: 'Disputed - A public allegation is not a finding',
        text: 'If a dossier cites a complaint, affidavit, leaked memo, anonymous claim, or public accusation, Veritas cannot present the underlying allegation as established fact unless a later record independently confirms it. The correct language is alleged, stated, filed, testified, reported, or disputed, depending on the source and posture.',
      },
    },
    {
      type: 'heading',
      text: 'What not to infer',
    },
    {
      type: 'text',
      text: 'Never use religion, ethnicity, nationality, ancestry, or protected identity as evidence. Never merge two people because their names are similar. Never describe a family, faith community, ethnic group, political constituency, or nationality as a criminal actor. Never promote guilt by association when the record documents only proximity. The unit of evidence is the specific act, document, transaction, official role, filing, quote, or corroborated relationship.',
    },
    {
      type: 'text',
      text: 'The better sentence is usually narrower and stronger: the record shows a contribution on this date; the docket shows this filing; the rule was published here; the agency awarded this contract; the archive catalog lists this record group; the witness testified to this statement. From there, analysis may explain why the fact matters, but the reader must always be able to see where documentation ends and inference begins.',
    },
    {
      type: 'quote',
      quote: {
        text: 'The public record is the floor, not the ceiling. The job is to climb from documentation to judgment without skipping any rungs.',
        attribution: 'Veritas Worldwide methodology note',
      },
    },
    {
      type: 'heading',
      text: 'The dossier standard',
    },
    {
      type: 'text',
      text: 'A finished Veritas dossier should contain the claim sentence, source ladder, record table, chronology, contradictions, open questions, evidence labels, and publication wording. If one of those parts is missing, the dossier may still be useful internally, but it is not publication-ready. This standard slows bad claims down and makes strong claims harder to dismiss.',
    },
    {
      type: 'evidence',
      evidence: {
        tier: 'verified',
        label: 'Verified - FOIA begins after public research is exhausted',
        text: 'FOIA.gov directs researchers to first determine whether information is already publicly available and then identify the correct agency if a request is still needed. That sequence matters: broad requests filed before public research create delay, ambiguity, and avoidable denials.',
      },
    },
    {
      type: 'text',
      text: 'The archive grows in two directions from here. Backward, every existing chapter and dossier can be checked against this source ladder. Forward, every new chapter should begin with the claim file before prose begins. That is how a publication earns trust from a skeptical reader: not by sounding certain, but by making the path from record to conclusion visible.',
    },
  ],
  sources: [
    {
      id: 1,
      text: 'National Archives, "Research Our Records." Accessed April 22, 2026.',
      url: 'https://www.archives.gov/research',
      hierarchy: 'governmentLegal',
    },
    {
      id: 2,
      text: 'Congress.gov API, official congressional data access point. Accessed April 22, 2026.',
      url: 'https://api.congress.gov/',
      hierarchy: 'governmentLegal',
    },
    {
      id: 3,
      text: 'FederalRegister.gov, API Documentation and legal-status notice. Accessed April 22, 2026.',
      url: 'https://www.federalregister.gov/developers/documentation/api/v1',
      hierarchy: 'governmentLegal',
    },
    {
      id: 4,
      text: 'FOIA.gov, Freedom of Information Act portal and request guidance. Accessed April 22, 2026.',
      url: 'https://www.foia.gov/',
      hierarchy: 'governmentLegal',
    },
    {
      id: 5,
      text: 'Federal Election Commission, Campaign finance data. Accessed April 22, 2026.',
      url: 'https://www.fec.gov/data/',
      hierarchy: 'governmentLegal',
    },
    {
      id: 6,
      text: 'U.S. Securities and Exchange Commission, EDGAR search filings. Accessed April 22, 2026.',
      url: 'https://www.sec.gov/search-filings',
      hierarchy: 'governmentLegal',
    },
    {
      id: 7,
      text: 'USAspending API documentation. Accessed April 22, 2026.',
      url: 'https://api.usaspending.gov/docs/',
      hierarchy: 'governmentLegal',
    },
    {
      id: 8,
      text: 'Data.gov, U.S. Government open data portal. Accessed April 22, 2026.',
      url: 'https://data.gov/',
      hierarchy: 'governmentLegal',
    },
    {
      id: 9,
      text: 'CourtListener, RECAP Archive coverage documentation. Accessed April 22, 2026.',
      url: 'https://www.courtlistener.com/help/coverage/recap/',
      hierarchy: 'institutional',
    },
    {
      id: 10,
      text: 'CourtListener, Advanced RECAP Archive Search for PACER. Accessed April 22, 2026.',
      url: 'https://www.courtlistener.com/recap/',
      hierarchy: 'institutional',
    },
  ],
  crossLinks: [
    { label: 'Foreword: Methodology and Evidence Standards', chapterId: 'foreword' },
    { label: 'Epilogue: Continued Research and Primary Source Access', chapterId: 'epilogue' },
    { label: 'Chapter 14: AIPAC and Congressional Lobbying', chapterId: 'chapter-14' },
    { label: 'Chapter 27: The Surveillance State', chapterId: 'chapter-27' },
  ],
  keywords: [
    'evidence',
    'public records',
    'FOIA',
    'Congress.gov',
    'FEC',
    'SEC EDGAR',
    'USAspending',
    'Federal Register',
    'CourtListener',
    'source hierarchy',
    'research methodology',
  ],
}

export default chapter
