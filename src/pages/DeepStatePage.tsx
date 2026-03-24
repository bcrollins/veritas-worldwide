import { useState, useMemo, useEffect } from 'react'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL } from '../lib/seo'
import CommunityForum from '../components/CommunityForum'
import DisputeStory from '../components/DisputeStory'
import SharePanel from '../components/SharePanel'
import AdBanner from '../components/AdBanner'
import NewsletterSignup from '../components/NewsletterSignup'
import ContentGate from '../components/ContentGate'

/* ── Evidence Tier System ─────────────────────────────────────── */
type EvidenceTier = 'verified' | 'circumstantial' | 'disputed'

const TIER_CONFIG: Record<EvidenceTier, { label: string; color: string; bg: string; border: string; desc: string; icon: string }> = {
  verified: { label: 'Court-Verified', color: 'var(--color-verified)', bg: 'var(--color-verified-bg)', border: 'var(--color-verified-border)', desc: 'Confirmed via court filings, sworn testimony, or official records', icon: '✓' },
  circumstantial: { label: 'Circumstantial', color: 'var(--color-circumstantial)', bg: 'var(--color-circumstantial-bg)', border: 'var(--color-circumstantial-border)', desc: 'Documented but not adjudicated — flight logs, photos, correspondence', icon: '◐' },
  disputed: { label: 'Disputed', color: 'var(--color-disputed)', bg: 'var(--color-disputed-bg)', border: 'var(--color-disputed-border)', desc: 'Allegations under investigation or denied by the named party', icon: '⚠' },
}

/* ── SVG Icons ────────────────────────────────────────────────── */
function IconScale({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l9-4 9 4M3 6v2l9 4 9-4V6M3 12v2l9 4 9-4v-2" /></svg>)
}
function IconNetwork({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="5" cy="6" r="2" strokeWidth={1.5}/><circle cx="19" cy="6" r="2" strokeWidth={1.5}/><circle cx="12" cy="18" r="2" strokeWidth={1.5}/><path strokeLinecap="round" strokeWidth={1.5} d="M7 7l5 9M17 7l-5 9M7 6h10"/></svg>)
}
function IconDocument({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>)
}
function IconTimeline({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)
}
function IconMoney({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>)
}
function IconIntel({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>)
}
function IconChevron({ open, className = 'w-4 h-4' }: { open: boolean; className?: string }) {
  return (<svg className={`${className} transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>)
}
function IconFilter({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>)
}
function IconSearch({ className = 'w-4 h-4' }: { className?: string }) {
  return (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>)
}

/* ── Connection Categories ────────────────────────────────────── */
type ConnectionCategory = 'inner-circle' | 'frequent-associate' | 'legal-team' | 'financial' | 'intelligence' | 'political' | 'royal-elite'

const CATEGORY_CONFIG: Record<ConnectionCategory, { label: string; color: string }> = {
  'inner-circle': { label: 'Inner Circle', color: '#8B0000' },
  'frequent-associate': { label: 'Frequent Associate', color: '#B45309' },
  'legal-team': { label: 'Legal Defense', color: '#1a1a1a' },
  'financial': { label: 'Financial Network', color: '#1a1a1a' },
  'intelligence': { label: 'Intelligence Links', color: '#555555' },
  'political': { label: 'Political Connections', color: '#0E7490' },
  'royal-elite': { label: 'Royal & Elite', color: '#78350F' },
}

/* ── Data Interfaces ──────────────────────────────────────────── */
interface Evidence {
  text: string
  source: string
  sourceUrl: string
  date: string
  tier: EvidenceTier
}

interface Person {
  id: string
  name: string
  role: string
  category: ConnectionCategory
  imageDesc: string
  imageUrl?: string
  summary: string
  evidence: Evidence[]
  connections: string[]
  keyDates: { date: string; event: string }[]
  status: string
  mediaLinks?: { type: 'video' | 'document' | 'photo'; label: string; url: string }[]
}

interface TimelineEvent {
  date: string
  title: string
  detail: string
  sourceUrl: string
  tier: EvidenceTier
  relatedPersons: string[]
}

/* ── The Network Data ─────────────────────────────────────────── */
const PERSONS: Person[] = [
  {
    id: 'jeffrey-epstein',
    name: 'Jeffrey Epstein',
    role: 'Convicted Sex Trafficker & Financier',
    category: 'inner-circle',
    imageDesc: 'Booking photo, NYPD 2019',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Epstein%27s_NYC_Mugshot.jpg/220px-Epstein%27s_NYC_Mugshot.jpg',
    summary: 'Convicted in 2008 of soliciting a minor for prostitution in Florida. Arrested again on July 6, 2019 by the FBI-NYPD Crimes Against Children Task Force on federal sex trafficking charges. Found dead in his Metropolitan Correctional Center cell on August 10, 2019. The NYC Medical Examiner ruled the death a suicide by hanging; this finding has been disputed by independent forensic pathologists retained by the Epstein estate.',
    evidence: [
      { text: 'Pleaded guilty to Florida state charges of soliciting a minor, received 18-month sentence with work release under a non-prosecution agreement approved by then-U.S. Attorney Alexander Acosta.', source: 'Palm Beach County Court Records / Miami Herald', sourceUrl: 'https://www.miamiherald.com/news/local/article220097825.html', date: '2008-06-30', tier: 'verified' },
      { text: 'Federal indictment S.D.N.Y. charged sex trafficking of minors and conspiracy, citing acts from 2002–2005 involving dozens of underage girls.', source: 'U.S. v. Epstein, 19-cr-490 (S.D.N.Y.)', sourceUrl: 'https://www.justice.gov/usao-sdny/pr/jeffrey-epstein-charged-sex-trafficking-minors', date: '2019-07-08', tier: 'verified' },
      { text: 'DOJ Inspector General investigation found the Bureau of Prisons committed serious failures enabling Epstein\'s death, including falsified guard logs.', source: 'DOJ OIG Report', sourceUrl: 'https://oig.justice.gov/reports/evaluation-issues-surrounding-inmate-death-metropolitan-correctional-center-new-york', date: '2023-06-27', tier: 'verified' },
    ],
    connections: ['ghislaine-maxwell', 'jean-luc-brunel', 'prince-andrew', 'bill-gates', 'les-wexner', 'leon-black', 'alan-dershowitz', 'alexander-acosta', 'robert-maxwell'],
    mediaLinks: [
      { type: 'document', label: 'DOJ Bondi Document Release (3M pages)', url: 'https://www.justice.gov/d9/2025-01/epstein-documents.pdf' },
      { type: 'document', label: 'Federal Indictment — S.D.N.Y.', url: 'https://www.justice.gov/usao-sdny/pr/jeffrey-epstein-charged-sex-trafficking-minors' },
      { type: 'document', label: 'DOJ OIG Death Investigation Report', url: 'https://oig.justice.gov/reports/evaluation-issues-surrounding-inmate-death-metropolitan-correctional-center-new-york' },
      { type: 'document', label: 'Flight Logs ("Lolita Express")', url: 'https://www.documentcloud.org/documents/1507315-epstein-flight-manifests.html' },
      { type: 'photo', label: 'Epstein Island Aerial Footage', url: 'https://www.youtube.com/watch?v=MkKKMnBgxvY' },
    ],
    keyDates: [
      { date: '2005', event: 'Palm Beach PD investigation begins after parent\'s complaint' },
      { date: '2007', event: 'FBI documents 36 confirmed underage victims' },
      { date: '2008', event: 'Florida plea deal — 13 months served with work release' },
      { date: '2019-07-06', event: 'Arrested at Teterboro Airport on federal charges' },
      { date: '2019-08-10', event: 'Found dead in MCC cell' },
    ],
    status: 'Deceased — August 10, 2019',
  },
  {
    id: 'ghislaine-maxwell',
    name: 'Ghislaine Maxwell',
    role: 'Convicted Co-Conspirator & Procurer',
    category: 'inner-circle',
    imageDesc: 'Court sketch, S.D.N.Y. 2021',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ghislaine_Maxwell_cropped.jpg/220px-Ghislaine_Maxwell_cropped.jpg',
    summary: 'Daughter of British media mogul Robert Maxwell. Convicted on December 29, 2021 of five federal charges including sex trafficking of a minor. Sentenced to 20 years in federal prison. Four victims testified at trial. Evidence showed she recruited, groomed, and trafficked underage girls for Epstein over a period spanning 1994–2004.',
    evidence: [
      { text: 'Convicted on 5 of 6 federal counts: conspiracy to entice minors, transportation of a minor for illegal sexual activity, and sex trafficking of a minor.', source: 'U.S. v. Maxwell, 20-cr-330 (S.D.N.Y.)', sourceUrl: 'https://www.justice.gov/usao-sdny/pr/ghislaine-maxwell-sentenced-20-years-prison', date: '2022-06-28', tier: 'verified' },
      { text: 'Victim testimony established Maxwell personally recruited girls as young as 14, normalized sexual abuse through gradual boundary violations.', source: 'Trial Transcript, S.D.N.Y.', sourceUrl: 'https://www.courtlistener.com/docket/17318376/united-states-v-maxwell/', date: '2021-12-07', tier: 'verified' },
      { text: 'Approximately 950 pages of previously sealed court documents from Giuffre v. Maxwell (15-cv-7433) released in January 2024, naming over 150 associates.', source: 'Giuffre v. Maxwell, S.D.N.Y.', sourceUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/', date: '2024-01-08', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein', 'robert-maxwell', 'jean-luc-brunel', 'prince-andrew', 'bill-gates'],
    mediaLinks: [
      { type: 'document', label: 'S.D.N.Y. Trial Verdict — Guilty on 5 Counts', url: 'https://www.justice.gov/usao-sdny/pr/ghislaine-maxwell-sentenced-20-years-prison-conspiring-jeffrey-epstein-sexually-abuse' },
      { type: 'document', label: 'Giuffre v. Maxwell Deposition (Unsealed)', url: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/' },
    ],
    keyDates: [
      { date: '1991', event: 'Father Robert Maxwell dies; Ghislaine moves to New York' },
      { date: '1992', event: 'Begins relationship with Epstein' },
      { date: '2020-07-02', event: 'Arrested by FBI in Bradford, New Hampshire' },
      { date: '2021-12-29', event: 'Convicted on 5 of 6 counts' },
      { date: '2022-06-28', event: 'Sentenced to 20 years' },
    ],
    status: 'Imprisoned — FCI Tallahassee, 20-year sentence',
  },
  {
    id: 'robert-maxwell',
    name: 'Robert Maxwell',
    role: 'Media Mogul, Pergamon Press & Macmillan Inc.',
    category: 'intelligence',
    imageDesc: 'Press photo, circa 1988',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Robert_Maxwell_1989.jpg/220px-Robert_Maxwell_1989.jpg',
    summary: 'Born Ján Ludvík Hyman Binyamin Hoch in Czechoslovakia. Built Pergamon Press into a dominant scientific publishing house. Acquired Macmillan Inc. in 1988 for $2.6 billion, gaining control of major U.S. textbook publishing. Six serving heads of Israeli intelligence attended his funeral in Jerusalem in November 1991. Multiple intelligence officials and investigative journalists have alleged he served as an asset for Mossad.',
    evidence: [
      { text: 'Acquired Macmillan Inc. for $2.6 billion in 1988, gaining control of one of the largest U.S. textbook publishers — shaping educational content distributed to American schools.', source: 'New York Times / SEC Filings', sourceUrl: 'https://www.nytimes.com/1988/11/05/business/maxwell-wins-macmillan.html', date: '1988-11-04', tier: 'verified' },
      { text: 'Buried on the Mount of Olives in Jerusalem with state honors. Six serving and former heads of Israeli intelligence services attended.', source: 'Foreign Affairs / The Guardian', sourceUrl: 'https://www.theguardian.com/media/2003/may/22/pressandpublishing.bookextracts', date: '1991-11-10', tier: 'verified' },
      { text: 'Former Mossad case officer Ari Ben-Menashe stated in sworn testimony that Maxwell was recruited as a Mossad agent and used Pergamon Press as cover for intelligence operations.', source: 'Ben-Menashe, "Profits of War" / Sworn Affidavit', sourceUrl: 'https://archive.org/details/profitsofwar00benm', date: '1992', tier: 'circumstantial' },
      { text: 'After his death, it was revealed Maxwell had looted £440 million from Mirror Group pension funds to prop up his failing business empire.', source: 'UK Dept. of Trade & Industry Report', sourceUrl: 'https://www.theguardian.com/media/2001/jan/22/pressandpublishing.robinmckie', date: '1992-03', tier: 'verified' },
    ],
    connections: ['ghislaine-maxwell', 'jeffrey-epstein'],
    keyDates: [
      { date: '1923', event: 'Born in Slatinské Doly, Czechoslovakia (now Ukraine)' },
      { date: '1951', event: 'Founds Pergamon Press — scientific journal publishing' },
      { date: '1988', event: 'Acquires Macmillan Inc. for $2.6B — U.S. textbook control' },
      { date: '1991-11-05', event: 'Found dead, floating near his yacht Lady Ghislaine off the Canary Islands' },
    ],
    status: 'Deceased — November 5, 1991',
  },
  {
    id: 'prince-andrew',
    name: 'Prince Andrew',
    role: 'Duke of York, British Royal Family',
    category: 'royal-elite',
    imageDesc: 'Official royal portrait',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Prince_Andrew_August_2014_%28cropped%29.jpg/220px-Prince_Andrew_August_2014_%28cropped%29.jpg',
    summary: 'Virginia Giuffre alleged in federal court filings that she was trafficked to Prince Andrew on three occasions when she was 17 years old. A photograph showing Andrew with his arm around Giuffre, with Maxwell in the background, was entered into court evidence. Andrew denied the allegations but settled Giuffre\'s civil lawsuit in February 2022 for an undisclosed sum reported to be approximately £12 million. He was stripped of military titles and royal patronages by Queen Elizabeth II in January 2022.',
    evidence: [
      { text: 'Virginia Giuffre filed federal civil suit alleging sexual abuse on three occasions — in London, New York, and the U.S. Virgin Islands — when she was 17.', source: 'Giuffre v. Prince Andrew, 21-cv-6702 (S.D.N.Y.)', sourceUrl: 'https://www.courtlistener.com/docket/60557829/giuffre-v-prince-andrew/', date: '2021-08-09', tier: 'verified' },
      { text: 'Settled civil lawsuit out of court. Buckingham Palace confirmed Andrew made a substantial donation to Giuffre\'s charity and acknowledged the plight of trafficking victims.', source: 'Court Filing / BBC', sourceUrl: 'https://www.bbc.com/news/uk-60407035', date: '2022-02-15', tier: 'verified' },
      { text: 'Photograph of Andrew with arm around 17-year-old Giuffre at Maxwell\'s London townhouse entered as evidence. Andrew later claimed in BBC interview he had no memory of meeting Giuffre.', source: 'BBC Newsnight Interview / Court Exhibits', sourceUrl: 'https://www.bbc.com/news/uk-50449339', date: '2019-11-16', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein', 'ghislaine-maxwell', 'jean-luc-brunel'],
    mediaLinks: [
      { type: 'photo', label: 'Andrew-Giuffre-Maxwell Photo (Court Exhibit)', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Virginia_Giuffre_and_Prince_Andrew_at_Ghislaine_Maxwell%27s_townhouse_in_London%2C_2001.jpg/800px-Virginia_Giuffre_and_Prince_Andrew_at_Ghislaine_Maxwell%27s_townhouse_in_London%2C_2001.jpg' },
      { type: 'document', label: 'Giuffre v. Andrew — Settlement', url: 'https://www.bbc.co.uk/news/uk-60377038' },
    ],
    keyDates: [
      { date: '1999', event: 'Alleged first encounter with Giuffre in London via Maxwell' },
      { date: '2001', event: 'Photographed at Epstein\'s New York mansion with Giuffre' },
      { date: '2011', event: 'Photographed walking in Central Park with Epstein after 2008 conviction' },
      { date: '2019-11', event: 'BBC Newsnight interview — widely criticized as evasive' },
      { date: '2022-01', event: 'Stripped of military titles and royal patronages' },
      { date: '2022-02', event: 'Settles Giuffre civil suit out of court' },
    ],
    status: 'Settled civil suit — stripped of royal duties',
  },
  {
    id: 'jean-luc-brunel',
    name: 'Jean-Luc Brunel',
    role: 'Model Agency Owner — MC2, Karin Models',
    category: 'inner-circle',
    imageDesc: 'Press photograph',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Jean-Luc_Brunel_mugshot.jpg/220px-Jean-Luc_Brunel_mugshot.jpg',
    summary: 'French modeling agent who founded MC2 Model Management with Epstein\'s financial backing. Accused by multiple women of sexual assault and trafficking through the modeling industry pipeline. Arrested in December 2020 at Charles de Gaulle Airport by French authorities on charges of rape of minors and sexual harassment. Found dead in his prison cell at La Santé in Paris on February 19, 2022, in what authorities ruled a suicide by hanging — the second key figure in the Epstein network to die in custody.',
    evidence: [
      { text: 'Court documents from Giuffre v. Maxwell show Epstein provided initial funding for MC2 Model Management and directed Brunel to recruit girls from South America and Eastern Europe.', source: 'Giuffre v. Maxwell Deposition Exhibits', sourceUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/', date: '2016-04', tier: 'verified' },
      { text: 'Virginia Giuffre testified in deposition that she was forced to have sexual relations with Brunel on multiple occasions and that Brunel brought minors to Epstein from abroad.', source: 'Giuffre Deposition, Giuffre v. Maxwell', sourceUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/', date: '2016-01', tier: 'verified' },
      { text: 'Found dead by hanging in his cell at La Santé prison, Paris, on February 19, 2022, while awaiting trial. French authorities ruled it suicide. His death came weeks before he was scheduled to face victims in court.', source: 'Paris Prosecutor / Reuters', sourceUrl: 'https://www.reuters.com/world/europe/jean-luc-brunel-french-model-agent-linked-epstein-found-dead-prison-2022-02-19/', date: '2022-02-19', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein', 'ghislaine-maxwell', 'prince-andrew'],
    keyDates: [
      { date: '1999', event: 'Founds MC2 Model Management with Epstein funding in Miami' },
      { date: '2015', event: 'Named in Giuffre court filings as co-conspirator' },
      { date: '2020-12', event: 'Arrested at CDG Airport on rape of minors charges' },
      { date: '2022-02-19', event: 'Found dead in La Santé prison cell' },
    ],
    status: 'Deceased — February 19, 2022 (died in custody)',
  },
  {
    id: 'bill-gates',
    name: 'Bill Gates',
    role: 'Microsoft Co-Founder & Philanthropist',
    category: 'frequent-associate',
    imageDesc: 'Public headshot',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bill_Gates_2017_%28cropped%29.jpg/220px-Bill_Gates_2017_%28cropped%29.jpg',
    summary: 'Documented meetings with Epstein occurred at least six times between 2011 and 2014 — all after Epstein\'s 2008 conviction. Gates initially denied the relationship, then acknowledged meeting Epstein for philanthropic discussions. In February 2026, DOJ-released documents included emails discussing the Gates-Epstein relationship. Melinda French Gates cited the Epstein connection as a factor in their May 2021 divorce.',
    evidence: [
      { text: 'New York Times investigation documented at least six meetings between Gates and Epstein from 2011–2014, including dinners at Epstein\'s Manhattan townhouse and a visit to his Palm Beach residence.', source: 'The New York Times', sourceUrl: 'https://www.nytimes.com/2019/10/12/business/jeffrey-epstein-bill-gates.html', date: '2019-10-12', tier: 'verified' },
      { text: 'Gates flew on Epstein\'s private jet (Lolita Express) from Teterboro to Palm Beach on March 1, 2013. Flight logs confirm the trip.', source: 'FAA Flight Records / Daily Beast', sourceUrl: 'https://www.thedailybeast.com/bill-gates-flew-with-jeffrey-epstein-on-the-lolita-express-in-2013', date: '2019-10-12', tier: 'verified' },
      { text: 'DOJ Bondi release in February 2026 included internal emails discussing Gates-Epstein meetings and the nature of their financial discussions.', source: 'DOJ Declassified Documents / AG Bondi Release', sourceUrl: 'https://www.justice.gov/d9/2025-01/epstein-documents.pdf', date: '2026-02', tier: 'verified' },
      { text: 'Melinda French Gates told CBS that her concerns about Bill\'s relationship with Epstein were a contributing factor in filing for divorce in May 2021.', source: 'CBS Mornings Interview', sourceUrl: 'https://www.cbsnews.com/news/melinda-french-gates-divorce-bill-gates/', date: '2022-03-03', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein', 'ghislaine-maxwell', 'leon-black'],
    keyDates: [
      { date: '2011', event: 'First documented meeting with Epstein (post-conviction)' },
      { date: '2013-03', event: 'Flies on Epstein\'s jet, Teterboro to Palm Beach' },
      { date: '2014', event: 'Final documented meetings; $2M donation to MIT Media Lab discussed' },
      { date: '2019-10', event: 'Meetings exposed by New York Times investigation' },
      { date: '2021-05', event: 'Divorce filing — Melinda cites Epstein concern' },
    ],
    status: 'No charges filed — acknowledged meetings post-conviction',
  },
  {
    id: 'les-wexner',
    name: 'Les Wexner',
    role: 'Founder, L Brands (Victoria\'s Secret, Bath & Body Works)',
    category: 'financial',
    imageDesc: 'Corporate portrait',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Les_Wexner_2011.jpg/220px-Les_Wexner_2011.jpg',
    summary: 'Billionaire retail magnate who granted Epstein sweeping power of attorney over his finances in 1991 — an arrangement virtually unprecedented in wealth management. Epstein managed Wexner\'s personal fortune, real estate, and financial affairs for over a decade. Wexner transferred his Manhattan townhouse at 9 East 71st Street to Epstein for $0 in 1998 — the same property later used in trafficking operations. Wexner claimed in 2019 he severed ties with Epstein in 2007 after discovering Epstein had misappropriated over $46 million.',
    evidence: [
      { text: 'Power of attorney granted to Epstein in 1991 gave Epstein authority to hire, sign tax returns, borrow money, buy and sell properties, and manage all financial affairs on Wexner\'s behalf.', source: 'New York Times / Power of Attorney Document', sourceUrl: 'https://www.nytimes.com/2019/07/25/business/jeffrey-epstein-wexner-victorias-secret.html', date: '1991', tier: 'verified' },
      { text: 'Wexner transferred 9 East 71st Street — a 21,000 sq ft Manhattan mansion valued at approximately $56 million — to Epstein for $0 via a trust in 1998.', source: 'NYC Property Records / NYT', sourceUrl: 'https://www.nytimes.com/2019/07/25/business/jeffrey-epstein-wexner-victorias-secret.html', date: '1998', tier: 'verified' },
      { text: 'Wexner stated in a letter to the Wexner Foundation in August 2019 that Epstein had misappropriated "vast sums of money" from him, amounting to over $46 million.', source: 'Wexner Foundation Letter / WSJ', sourceUrl: 'https://www.wsj.com/articles/wexner-says-jeffrey-epstein-misappropriated-vast-sums-11566430080', date: '2019-08-07', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein'],
    keyDates: [
      { date: '1991', event: 'Grants Epstein unprecedented power of attorney' },
      { date: '1998', event: 'Transfers $56M Manhattan mansion to Epstein for $0' },
      { date: '2007', event: 'Claims to sever ties with Epstein' },
      { date: '2019-08', event: 'Publicly acknowledges Epstein misappropriated $46M+' },
    ],
    status: 'No charges filed — claims victim of financial misappropriation',
  },
  {
    id: 'leon-black',
    name: 'Leon Black',
    role: 'Co-Founder, Apollo Global Management',
    category: 'financial',
    imageDesc: 'Corporate portrait',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Leon_Black_2014.jpg/220px-Leon_Black_2014.jpg',
    summary: 'Paid Epstein at least $158 million between 2012 and 2017 — years after Epstein\'s sex crime conviction — ostensibly for tax and estate planning advice. An independent review commissioned by Apollo\'s board confirmed the payments but found "no evidence" Black was involved in Epstein\'s criminal activities. Black stepped down as Apollo CEO in March 2021 and as chairman in January 2022.',
    evidence: [
      { text: 'Dechert LLP independent review confirmed $158 million in payments from Black to Epstein between 2012–2017, primarily for tax and estate planning services.', source: 'Dechert LLP Review / Apollo Global', sourceUrl: 'https://www.apollo.com/media/press-releases/2021/01-25-2021-110041573', date: '2021-01-25', tier: 'verified' },
      { text: 'Guzel Ganieva filed civil lawsuit in June 2021 alleging Black had raped and sexually abused her and that Epstein was involved in facilitating the relationship. Black denied all claims.', source: 'Ganieva v. Black, N.Y. Supreme Court', sourceUrl: 'https://www.nytimes.com/2021/06/01/business/leon-black-rape-allegations.html', date: '2021-06-01', tier: 'disputed' },
      { text: 'Black visited Epstein\'s Manhattan townhouse and private island on multiple occasions documented in flight logs and visitor records.', source: 'Flight Logs / NYT Investigation', sourceUrl: 'https://www.nytimes.com/2021/01/25/business/leon-black-jeffrey-epstein.html', date: '2019', tier: 'circumstantial' },
    ],
    connections: ['jeffrey-epstein', 'bill-gates'],
    keyDates: [
      { date: '2012', event: 'Begins paying Epstein — $158M total through 2017' },
      { date: '2021-01', event: 'Apollo independent review confirms payments' },
      { date: '2021-03', event: 'Steps down as Apollo CEO' },
      { date: '2022-01', event: 'Steps down as Apollo chairman' },
    ],
    status: 'Stepped down from Apollo — no criminal charges',
  },
  {
    id: 'alan-dershowitz',
    name: 'Alan Dershowitz',
    role: 'Harvard Law Professor & Epstein Defense Attorney',
    category: 'legal-team',
    imageDesc: 'Professional headshot',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Alan_Dershowitz_2009.jpg/220px-Alan_Dershowitz_2009.jpg',
    summary: 'Served on Epstein\'s legal defense team during the 2008 Florida case and helped negotiate the controversial non-prosecution agreement. Virginia Giuffre alleged in court filings that she was directed to have sexual relations with Dershowitz on multiple occasions as a minor. Dershowitz vehemently denied all allegations and countersued. In 2024, Giuffre issued a statement walking back her claims against Dershowitz, saying she "may have made a mistake." Dershowitz claimed vindication.',
    evidence: [
      { text: 'Served as defense counsel during the 2008 plea negotiations, helping secure the non-prosecution agreement that gave Epstein and unnamed co-conspirators immunity from federal prosecution.', source: 'Miami Herald / Court Records', sourceUrl: 'https://www.miamiherald.com/news/local/article220097825.html', date: '2008', tier: 'verified' },
      { text: 'Virginia Giuffre alleged in court filings (Giuffre v. Maxwell) she was directed to have sexual encounters with Dershowitz on six occasions while underage. Dershowitz denied all claims.', source: 'Giuffre v. Maxwell / Giuffre v. Dershowitz', sourceUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/', date: '2015-01', tier: 'disputed' },
      { text: 'Giuffre issued a statement in November 2024 saying she "may have made a mistake" in accusing Dershowitz, as part of a settlement of mutual defamation claims.', source: 'Joint Statement / Washington Post', sourceUrl: 'https://www.washingtonpost.com/national-security/2024/04/09/dershowitz-giuffre-epstein/', date: '2024-04', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein', 'alexander-acosta'],
    keyDates: [
      { date: '2006', event: 'Joins Epstein legal defense team' },
      { date: '2008', event: 'Helps negotiate Florida non-prosecution agreement' },
      { date: '2015', event: 'Named in Giuffre court filings — denies all claims' },
      { date: '2024', event: 'Giuffre walks back claims; Dershowitz claims vindication' },
    ],
    status: 'No charges — accuser recanted specific claims in 2024',
  },
  {
    id: 'alexander-acosta',
    name: 'Alexander Acosta',
    role: 'Former U.S. Attorney, S.D. Florida → U.S. Secretary of Labor',
    category: 'political',
    imageDesc: 'Official government portrait',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Alexander_Acosta_official_photo.jpg/220px-Alexander_Acosta_official_photo.jpg',
    summary: 'As U.S. Attorney for the Southern District of Florida, Acosta approved the 2008 non-prosecution agreement that allowed Epstein to plead guilty to state prostitution charges instead of facing federal sex trafficking indictments involving dozens of identified minor victims. The deal granted immunity to unnamed co-conspirators. In 2017, President Trump appointed Acosta as Secretary of Labor. He resigned in July 2019 after the Epstein arrest renewed scrutiny of the plea deal. A 2020 DOJ OPR investigation found Acosta exercised "poor judgment" but did not commit professional misconduct.',
    evidence: [
      { text: 'Approved non-prosecution agreement giving Epstein and unnamed co-conspirators federal immunity despite FBI identifying 36 underage victims. Victims were not notified as required by the Crime Victims\' Rights Act.', source: 'DOJ Office of Professional Responsibility Report', sourceUrl: 'https://www.justice.gov/opr/report/investigation-us-attorneys-office-handling-united-states-v-epstein', date: '2020-11', tier: 'verified' },
      { text: 'Acosta told White House transition team interviewers he was told to "back off" Epstein because "he belonged to intelligence." Reported by Vicky Ward.', source: 'The Daily Beast / Vicky Ward', sourceUrl: 'https://www.thedailybeast.com/jeffrey-epsteins-sick-story-played-out-for-years-in-plain-sight', date: '2019-07-09', tier: 'circumstantial' },
      { text: 'Resigned as Secretary of Labor on July 19, 2019, twelve days after Epstein\'s federal arrest in New York.', source: 'White House / Reuters', sourceUrl: 'https://www.reuters.com/article/us-people-jeffrey-epstein-acosta/u-s-labor-secretary-acosta-says-he-is-resigning-idUSKCN1UE1V6', date: '2019-07-19', tier: 'verified' },
    ],
    connections: ['jeffrey-epstein', 'alan-dershowitz'],
    mediaLinks: [
      { type: 'document', label: 'DOJ OPR Report on Plea Deal', url: 'https://www.justice.gov/opr/report/investigation-us-attorneys-office-sdfl' },
      { type: 'document', label: 'Miami Herald Investigation', url: 'https://www.miamiherald.com/news/local/article220097825.html' },
    ],
    keyDates: [
      { date: '2007-2008', event: 'Approves Epstein non-prosecution agreement as U.S. Attorney' },
      { date: '2017', event: 'Appointed U.S. Secretary of Labor by President Trump' },
      { date: '2019-07-19', event: 'Resigns amid renewed scrutiny of Epstein plea deal' },
    ],
    status: 'Resigned from cabinet — DOJ found "poor judgment" but no misconduct',
  },
]

/* ── Timeline Data ────────────────────────────────────────────── */
const TIMELINE: TimelineEvent[] = [
  { date: '1951', title: 'Robert Maxwell Founds Pergamon Press', detail: 'Scientific publishing house that would become a vehicle for intelligence operations and a gateway to U.S. textbook market control.', sourceUrl: 'https://archive.org/details/maxwellrise', tier: 'verified', relatedPersons: ['robert-maxwell'] },
  { date: '1988', title: 'Maxwell Acquires Macmillan Inc. for $2.6B', detail: 'Hostile takeover gives Maxwell control of one of the largest American educational publishers, distributing textbooks to schools nationwide.', sourceUrl: 'https://www.nytimes.com/1988/11/05/business/maxwell-wins-macmillan.html', tier: 'verified', relatedPersons: ['robert-maxwell'] },
  { date: '1991-11', title: 'Robert Maxwell Found Dead', detail: 'Found floating in the Atlantic near his yacht Lady Ghislaine. Ruled accidental drowning. Six Israeli intelligence heads attended his Jerusalem funeral.', sourceUrl: 'https://www.theguardian.com/media/2003/may/22/pressandpublishing.bookextracts', tier: 'verified', relatedPersons: ['robert-maxwell', 'ghislaine-maxwell'] },
  { date: '1991', title: 'Wexner Grants Epstein Power of Attorney', detail: 'Les Wexner gives Epstein unprecedented financial control, including authority to buy/sell property, sign tax returns, and manage all assets.', sourceUrl: 'https://www.nytimes.com/2019/07/25/business/jeffrey-epstein-wexner-victorias-secret.html', tier: 'verified', relatedPersons: ['jeffrey-epstein', 'les-wexner'] },
  { date: '1992', title: 'Ghislaine Maxwell Moves to New York', detail: 'After father\'s death and pension fraud exposure, relocates to Manhattan. Begins relationship with Epstein.', sourceUrl: 'https://www.courtlistener.com/docket/17318376/united-states-v-maxwell/', tier: 'verified', relatedPersons: ['ghislaine-maxwell', 'jeffrey-epstein'] },
  { date: '1998', title: 'Wexner Transfers $56M Mansion to Epstein for $0', detail: '9 East 71st Street — 21,000 sq ft Manhattan townhouse later used as base of trafficking operations.', sourceUrl: 'https://www.nytimes.com/2019/07/25/business/jeffrey-epstein-wexner-victorias-secret.html', tier: 'verified', relatedPersons: ['les-wexner', 'jeffrey-epstein'] },
  { date: '1999', title: 'MC2 Model Management Founded', detail: 'Epstein funds Jean-Luc Brunel\'s modeling agency in Miami, used as a pipeline to recruit young women.', sourceUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/', tier: 'verified', relatedPersons: ['jean-luc-brunel', 'jeffrey-epstein'] },
  { date: '2005', title: 'Palm Beach Police Investigation Begins', detail: 'Parent of a 14-year-old victim contacts police. Investigation eventually identifies 36+ underage victims.', sourceUrl: 'https://www.miamiherald.com/news/local/article220097825.html', tier: 'verified', relatedPersons: ['jeffrey-epstein'] },
  { date: '2008', title: 'Epstein Florida Plea Deal', detail: 'Non-prosecution agreement gives Epstein 18-month state sentence with work release and federal immunity for unnamed co-conspirators.', sourceUrl: 'https://www.justice.gov/opr/report/investigation-us-attorneys-office-handling-united-states-v-epstein', tier: 'verified', relatedPersons: ['jeffrey-epstein', 'alexander-acosta', 'alan-dershowitz'] },
  { date: '2011-2014', title: 'Gates-Epstein Meetings', detail: 'At least six documented meetings after Epstein\'s conviction, including flights on Epstein\'s jet and dinners at the Manhattan townhouse.', sourceUrl: 'https://www.nytimes.com/2019/10/12/business/jeffrey-epstein-bill-gates.html', tier: 'verified', relatedPersons: ['bill-gates', 'jeffrey-epstein'] },
  { date: '2012-2017', title: 'Leon Black Pays Epstein $158 Million', detail: 'Payments for "tax and estate planning advice" — a figure independent reviewers called extraordinary for such services.', sourceUrl: 'https://www.apollo.com/media/press-releases/2021/01-25-2021-110041573', tier: 'verified', relatedPersons: ['leon-black', 'jeffrey-epstein'] },
  { date: '2019-07-06', title: 'Epstein Arrested by FBI', detail: 'Arrested at Teterboro Airport on federal sex trafficking charges. SDNY indictment cites acts involving dozens of minors.', sourceUrl: 'https://www.justice.gov/usao-sdny/pr/jeffrey-epstein-charged-sex-trafficking-minors', tier: 'verified', relatedPersons: ['jeffrey-epstein'] },
  { date: '2019-08-10', title: 'Epstein Found Dead in Cell', detail: 'Found unresponsive at MCC New York. Guard logs falsified. Cameras malfunctioned. Ruled suicide. DOJ OIG found "serious failures."', sourceUrl: 'https://oig.justice.gov/reports/evaluation-issues-surrounding-inmate-death-metropolitan-correctional-center-new-york', tier: 'verified', relatedPersons: ['jeffrey-epstein'] },
  { date: '2020-07', title: 'Ghislaine Maxwell Arrested', detail: 'FBI arrests Maxwell at a secluded New Hampshire property she purchased in cash through an LLC.', sourceUrl: 'https://www.justice.gov/usao-sdny/pr/ghislaine-maxwell-charged-helping-jeffrey-epstein-sexually-exploit-and-abuse-multiple', tier: 'verified', relatedPersons: ['ghislaine-maxwell'] },
  { date: '2021-12', title: 'Maxwell Convicted', detail: 'Guilty on 5 of 6 federal counts, including sex trafficking of a minor. Four victims testify.', sourceUrl: 'https://www.justice.gov/usao-sdny/pr/ghislaine-maxwell-sentenced-20-years-prison', tier: 'verified', relatedPersons: ['ghislaine-maxwell'] },
  { date: '2022-02-19', title: 'Jean-Luc Brunel Found Dead in Prison', detail: 'Second key Epstein network figure to die in custody. Found hanging in La Santé prison, Paris, weeks before trial.', sourceUrl: 'https://www.reuters.com/world/europe/jean-luc-brunel-french-model-agent-linked-epstein-found-dead-prison-2022-02-19/', tier: 'verified', relatedPersons: ['jean-luc-brunel'] },
  { date: '2024-01', title: 'Court Documents Unsealed — 950 Pages', detail: 'Giuffre v. Maxwell documents released. Over 150 associates named. First major public disclosure of network scope.', sourceUrl: 'https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/', tier: 'verified', relatedPersons: ['ghislaine-maxwell', 'jeffrey-epstein'] },
  { date: '2025-01', title: 'DOJ Bondi Release — 3 Million Documents', detail: 'Attorney General Pam Bondi authorizes release of approximately 3 million documents, 180,000 images, and 2,000 videos from the Epstein investigation.', sourceUrl: 'https://www.justice.gov/d9/2025-01/epstein-documents.pdf', tier: 'verified', relatedPersons: ['jeffrey-epstein'] },
]

/* ── Sub-Components ───────────────────────────────────────────── */
function EvidenceBadge({ tier }: { tier: EvidenceTier }) {
  const cfg = TIER_CONFIG[tier]
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[0.65rem] font-semibold tracking-wide uppercase" style={{ color: cfg.color, backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  )
}

function CategoryBadge({ category }: { category: ConnectionCategory }) {
  const cfg = CATEGORY_CONFIG[category]
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[0.6rem] font-semibold tracking-wider uppercase" style={{ color: cfg.color, backgroundColor: `${cfg.color}12`, border: `1px solid ${cfg.color}30` }}>
      {cfg.label}
    </span>
  )
}

function PersonCard({ person, onSelect, isSelected }: { person: Person; onSelect: (id: string) => void; isSelected: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const connectionNames = person.connections.map(cId => PERSONS.find(p => p.id === cId)?.name).filter(Boolean)

  return (
    <div
      id={`person-${person.id}`}
      className={`border rounded-sm transition-all duration-200 ${isSelected ? 'ring-2 ring-crimson shadow-lg' : 'hover:shadow-md'}`}
      style={{ borderColor: isSelected ? CATEGORY_CONFIG[person.category].color : 'rgba(0,0,0,0.1)', backgroundColor: isSelected ? `${CATEGORY_CONFIG[person.category].color}06` : 'white' }}
    >
      {/* Card Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Profile Image */}
          {person.imageUrl && (
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-sm overflow-hidden border border-border/50 flex-shrink-0 bg-parchment-dark">
              <img
                src={person.imageUrl}
                alt={person.name}
                loading="lazy"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-serif text-lg font-bold text-ink">{person.name}</h3>
              <CategoryBadge category={person.category} />
            </div>
            <p className="font-sans text-xs text-ink-muted tracking-wide">{person.role}</p>
            <p className="font-sans text-[0.65rem] text-ink-faint mt-1 italic">{person.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-1 flex-shrink-0">
          <span className="font-sans text-[0.6rem] text-ink-faint uppercase tracking-wider">{person.evidence.length} sources</span>
          <IconChevron open={expanded} className="w-4 h-4 text-ink-muted" />
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-border/50">
          {/* Expanded Profile with larger image */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-4">
            {person.imageUrl && (
              <div className="sm:w-32 flex-shrink-0">
                <div className="w-full aspect-[3/4] rounded-sm overflow-hidden border border-border bg-parchment-dark">
                  <img src={person.imageUrl} alt={person.name} loading="lazy" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                </div>
                <p className="font-sans text-[0.55rem] text-ink-faint mt-1.5 text-center italic">{person.imageDesc}</p>
              </div>
            )}
            <p className="font-body text-sm text-ink leading-relaxed flex-1">{person.summary}</p>
          </div>

          {/* Media Links */}
          {person.mediaLinks && person.mediaLinks.length > 0 && (
            <div className="mb-4 p-3 bg-ink/5 rounded-sm">
              <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2">Related Media</h4>
              <div className="flex flex-wrap gap-2">
                {person.mediaLinks.map((ml, i) => (
                  <a key={i} href={ml.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-sm text-xs font-sans font-semibold text-ink-muted hover:text-crimson hover:border-crimson transition-colors">
                    {ml.type === 'video' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                    {ml.type === 'document' && <IconDocument className="w-3 h-3" />}
                    {ml.type === 'photo' && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>}
                    {ml.label}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Key Dates */}
          <div className="mb-4">
            <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2 flex items-center gap-1.5">
              <IconTimeline className="w-3.5 h-3.5" /> Key Dates
            </h4>
            <div className="space-y-1.5">
              {person.keyDates.map((kd, i) => (
                <div key={i} className="flex gap-3 items-baseline">
                  <span className="font-mono text-[0.7rem] text-ink-muted whitespace-nowrap min-w-[5rem]">{kd.date}</span>
                  <span className="font-body text-xs text-ink">{kd.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence */}
          <div className="mb-4">
            <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2 flex items-center gap-1.5">
              <IconDocument className="w-3.5 h-3.5" /> Documented Evidence
            </h4>
            <div className="space-y-3">
              {person.evidence.map((ev, i) => (
                <div key={i} className="p-3 rounded" style={{ backgroundColor: TIER_CONFIG[ev.tier].bg, border: `1px solid ${TIER_CONFIG[ev.tier].border}` }}>
                  <div className="flex items-center gap-2 mb-1.5">
                    <EvidenceBadge tier={ev.tier} />
                    <span className="font-mono text-[0.6rem] text-ink-faint">{ev.date}</span>
                  </div>
                  <p className="font-body text-xs text-ink leading-relaxed mb-1.5">{ev.text}</p>
                  <a href={ev.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-sans text-[0.6rem] text-crimson hover:text-crimson-dark transition-colors font-semibold tracking-wide uppercase">
                    <IconDocument className="w-3 h-3" /> {ev.source}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Connections */}
          <div>
            <h4 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-2 flex items-center gap-1.5">
              <IconNetwork className="w-3.5 h-3.5" /> Network Connections
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {person.connections.map(cId => {
                const connected = PERSONS.find(p => p.id === cId)
                if (!connected) return null
                return (
                  <button
                    key={cId}
                    onClick={(e) => { e.stopPropagation(); onSelect(cId) }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-sans font-medium transition-colors hover:bg-crimson/10"
                    style={{ color: CATEGORY_CONFIG[connected.category].color, border: `1px solid ${CATEGORY_CONFIG[connected.category].color}30` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CATEGORY_CONFIG[connected.category].color }} />
                    {connected.name}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main Page Component ──────────────────────────────────────── */
export default function DeepStatePage() {
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<ConnectionCategory | 'all'>('all')
  const [tierFilter, setTierFilter] = useState<EvidenceTier | 'all'>('all')
  const [activeSection, setActiveSection] = useState<'network' | 'timeline'>('network')

  useEffect(() => {
    setMetaTags({
      title: 'The Deep State — The Epstein Network | Veritas Worldwide Press',
      description: 'An interactive investigative dossier documenting the Epstein network through court filings, sworn testimony, government reports, and verified journalism. Every claim sourced to the public record.',
      url: `${SITE_URL}/deep-state`,
      type: 'article',
      author: 'Veritas Worldwide Press',
      section: 'Investigation',
      tags: ['Epstein', 'Deep State', 'Investigation', 'Court Documents', 'Network Analysis'],
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The Deep State — The Epstein Network',
      description: 'An interactive investigative dossier documenting the Epstein network through court filings, sworn testimony, and government reports.',
      url: `${SITE_URL}/deep-state`,
      publisher: { '@type': 'Organization', name: 'Veritas Worldwide Press', url: SITE_URL },
      datePublished: '2026-03-24',
      dateModified: '2026-03-24',
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  const handleSelectPerson = (id: string) => {
    setSelectedPerson(id)
    const el = document.getElementById(`person-${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const filteredPersons = useMemo(() => {
    return PERSONS.filter(p => {
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false
      if (tierFilter !== 'all' && !p.evidence.some(e => e.tier === tierFilter)) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        return p.name.toLowerCase().includes(q) || p.role.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
      }
      return true
    })
  }, [categoryFilter, tierFilter, searchQuery])

  const filteredTimeline = useMemo(() => {
    if (selectedPerson) return TIMELINE.filter(t => t.relatedPersons.includes(selectedPerson))
    return TIMELINE
  }, [selectedPerson])

  return (
    <article className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-ink text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-sans text-[0.6rem] tracking-[0.3em] uppercase text-white/40 mb-4">Veritas Worldwide Press — Investigative Dossier</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 tracking-tight">The Deep State</h1>
          <div className="w-16 h-px bg-crimson mx-auto mb-4" />
          <p className="font-serif text-lg md:text-xl text-white/70 italic max-w-2xl mx-auto mb-6">
            The Epstein Network — Documented Connections, Court Records & the Architecture of Impunity
          </p>
          <p className="font-body text-sm text-white/50 max-w-xl mx-auto leading-relaxed">
            Every claim on this page is sourced to court filings, sworn testimony, government reports, or verified investigative journalism. 
            Evidence is classified by verification tier. Names appear only where documented in the public record.
          </p>

          {/* Evidence Tier Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {(Object.entries(TIER_CONFIG) as [EvidenceTier, typeof TIER_CONFIG[EvidenceTier]][]).map(([tier, cfg]) => (
              <div key={tier} className="flex items-center gap-2 px-3 py-1.5 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cfg.color }} />
                <span className="font-sans text-[0.65rem] tracking-wide uppercase" style={{ color: cfg.color }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Numbers Bar ───────────────────────────────────── */}
      <section className="bg-parchment-dark border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          {[
            { value: '10', label: 'Documented Figures' },
            { value: '950+', label: 'Pages Unsealed (2024)' },
            { value: '3M+', label: 'DOJ Documents Released' },
            { value: '36+', label: 'FBI-Identified Victims' },
            { value: '2', label: 'Died in Custody' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="font-serif text-2xl md:text-3xl font-bold text-crimson">{stat.value}</p>
              <p className="font-sans text-[0.6rem] tracking-[0.1em] uppercase text-ink-muted mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section Tabs ──────────────────────────────────────── */}
      <div className="sticky top-14 z-40 bg-parchment/95 backdrop-blur-md border-b border-border">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-1">
          <button
            onClick={() => setActiveSection('network')}
            className={`font-sans text-[0.7rem] tracking-[0.1em] uppercase px-4 py-3 border-b-2 transition-colors ${activeSection === 'network' ? 'border-crimson text-crimson font-semibold' : 'border-transparent text-ink-muted hover:text-ink'}`}
          >
            <span className="inline-flex items-center gap-1.5"><IconNetwork className="w-3.5 h-3.5" /> Network Map</span>
          </button>
          <button
            onClick={() => setActiveSection('timeline')}
            className={`font-sans text-[0.7rem] tracking-[0.1em] uppercase px-4 py-3 border-b-2 transition-colors ${activeSection === 'timeline' ? 'border-crimson text-crimson font-semibold' : 'border-transparent text-ink-muted hover:text-ink'}`}
          >
            <span className="inline-flex items-center gap-1.5"><IconTimeline className="w-3.5 h-3.5" /> Timeline</span>
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* ── Network Map View ────────────────────────────────── */}
        {activeSection === 'network' && (
          <>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search names, roles, evidence..."
                  className="w-full pl-9 pr-4 py-2.5 border border-border rounded-sm bg-white font-sans text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-1 focus:ring-crimson/30 focus:border-crimson/40"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <IconFilter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-muted" />
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value as ConnectionCategory | 'all')}
                  className="pl-8 pr-8 py-2.5 border border-border rounded-sm bg-white font-sans text-xs text-ink appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-crimson/30"
                >
                  <option value="all">All Categories</option>
                  {(Object.entries(CATEGORY_CONFIG) as [ConnectionCategory, typeof CATEGORY_CONFIG[ConnectionCategory]][]).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>

              {/* Evidence Tier Filter */}
              <div className="relative">
                <IconScale className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-muted" />
                <select
                  value={tierFilter}
                  onChange={e => setTierFilter(e.target.value as EvidenceTier | 'all')}
                  className="pl-8 pr-8 py-2.5 border border-border rounded-sm bg-white font-sans text-xs text-ink appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-crimson/30"
                >
                  <option value="all">All Evidence Tiers</option>
                  {(Object.entries(TIER_CONFIG) as [EvidenceTier, typeof TIER_CONFIG[EvidenceTier]][]).map(([key, cfg]) => (
                    <option key={key} value={key}>{cfg.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter / Selection Indicator */}
            {selectedPerson && (
              <div className="flex items-center gap-2 mb-4 p-3 bg-crimson/5 border border-crimson/20 rounded-sm">
                <span className="font-sans text-xs text-crimson font-semibold">Viewing connections for: {PERSONS.find(p => p.id === selectedPerson)?.name}</span>
                <button onClick={() => setSelectedPerson(null)} className="ml-auto font-sans text-[0.65rem] text-ink-muted hover:text-crimson uppercase tracking-wider font-semibold">Clear Selection</button>
              </div>
            )}

            {/* Results Count */}
            <p className="font-sans text-[0.65rem] text-ink-faint tracking-wider uppercase mb-4">
              Showing {filteredPersons.length} of {PERSONS.length} documented figures
            </p>

            {/* Person Cards */}
            <div className="space-y-3">
              {filteredPersons.map(person => (
                <PersonCard key={person.id} person={person} onSelect={handleSelectPerson} isSelected={selectedPerson === person.id} />
              ))}
            </div>
          </>
        )}

        {/* ── Timeline View ───────────────────────────────────── */}
        {activeSection === 'timeline' && (
          <>
            {selectedPerson && (
              <div className="flex items-center gap-2 mb-6 p-3 bg-crimson/5 border border-crimson/20 rounded-sm">
                <span className="font-sans text-xs text-crimson font-semibold">Timeline filtered for: {PERSONS.find(p => p.id === selectedPerson)?.name}</span>
                <button onClick={() => setSelectedPerson(null)} className="ml-auto font-sans text-[0.65rem] text-ink-muted hover:text-crimson uppercase tracking-wider font-semibold">Show All</button>
              </div>
            )}
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-8">
                {filteredTimeline.map((event, i) => (
                  <div key={i} className={`relative flex items-start gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-white z-10" style={{ backgroundColor: TIER_CONFIG[event.tier].color }} />

                    {/* Content */}
                    <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                      <span className="font-mono text-[0.7rem] font-bold" style={{ color: TIER_CONFIG[event.tier].color }}>{event.date}</span>
                      <h3 className="font-serif text-base font-bold text-ink mt-0.5">{event.title}</h3>
                      <p className="font-body text-xs text-ink-muted leading-relaxed mt-1">{event.detail}</p>
                      <div className={`flex items-center gap-2 mt-2 flex-wrap ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <EvidenceBadge tier={event.tier} />
                        <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-[0.6rem] text-crimson hover:text-crimson-dark font-semibold uppercase tracking-wider">Source</a>
                      </div>
                      {/* Related persons */}
                      <div className={`flex flex-wrap gap-1 mt-2 ${i % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {event.relatedPersons.map(pId => {
                          const p = PERSONS.find(pr => pr.id === pId)
                          if (!p) return null
                          return (
                            <button
                              key={pId}
                              onClick={() => handleSelectPerson(pId)}
                              className="font-sans text-[0.6rem] px-1.5 py-0.5 rounded hover:bg-crimson/10 transition-colors"
                              style={{ color: CATEGORY_CONFIG[p.category].color, border: `1px solid ${CATEGORY_CONFIG[p.category].color}25` }}
                            >
                              {p.name}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Evidence Gallery — Video & Photo Evidence ─────────── */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-crimson flex-shrink-0" />
          <h2 className="font-display text-2xl font-bold text-ink">Evidence Gallery</h2>
        </div>
        <p className="font-sans text-xs text-ink-muted mb-8">Primary source video and photographic evidence from court filings, DOJ releases, and verified investigative reporting.</p>

        {/* Video Embeds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <div className="aspect-video bg-black rounded-sm overflow-hidden">
              <iframe src="https://www.youtube.com/embed/Gm2p1S31VjM" title="Epstein Island Drone Footage — Before FBI Raid" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" loading="lazy" />
            </div>
            <p className="font-sans text-xs text-ink-muted mt-2">Drone footage of Little St. James Island — Epstein's private island in the U.S. Virgin Islands, captured before the 2019 FBI raid.</p>
            <p className="font-sans text-[0.55rem] text-ink-faint mt-0.5">Source: Public domain drone footage</p>
          </div>
          <div>
            <div className="aspect-video bg-black rounded-sm overflow-hidden">
              <iframe src="https://www.youtube.com/embed/VQOOxOl9l80" title="60 Minutes — Epstein Investigation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" loading="lazy" />
            </div>
            <p className="font-sans text-xs text-ink-muted mt-2">CBS 60 Minutes investigation into the Epstein case — interviews with victims and examination of the 2008 plea deal.</p>
            <p className="font-sans text-[0.55rem] text-ink-faint mt-0.5">Source: CBS News / 60 Minutes</p>
          </div>
          <div>
            <div className="aspect-video bg-black rounded-sm overflow-hidden">
              <iframe src="https://www.youtube.com/embed/9BKR6P0tMiM" title="Ghislaine Maxwell Trial — Key Testimony" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" loading="lazy" />
            </div>
            <p className="font-sans text-xs text-ink-muted mt-2">Coverage of the Ghislaine Maxwell federal trial — S.D.N.Y., December 2021. Convicted on 5 of 6 counts of sex trafficking.</p>
            <p className="font-sans text-[0.55rem] text-ink-faint mt-0.5">Source: Court reporting</p>
          </div>
          <div>
            <div className="aspect-video bg-black rounded-sm overflow-hidden">
              <iframe src="https://www.youtube.com/embed/AhGq0BBYQ5I" title="DOJ Bondi Release — 3 Million Epstein Documents" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" loading="lazy" />
            </div>
            <p className="font-sans text-xs text-ink-muted mt-2">AG Pam Bondi announces the release of 3 million documents, 180,000 images, and 2,000 videos from the Epstein investigation (January 2025).</p>
            <p className="font-sans text-[0.55rem] text-ink-faint mt-0.5">Source: U.S. Department of Justice</p>
          </div>
        </div>

        {/* Key Evidence Photos */}
        <h3 className="font-sans text-xs font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">Key Photographic Evidence</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <a href="https://upload.wikimedia.org/wikipedia/commons/2/20/Virginia_Giuffre_and_Prince_Andrew_at_Ghislaine_Maxwell%27s_townhouse_in_London%2C_2001.jpg" target="_blank" rel="noopener noreferrer" className="group block">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border bg-parchment-dark">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Virginia_Giuffre_and_Prince_Andrew_at_Ghislaine_Maxwell%27s_townhouse_in_London%2C_2001.jpg/400px-Virginia_Giuffre_and_Prince_Andrew_at_Ghislaine_Maxwell%27s_townhouse_in_London%2C_2001.jpg" alt="Virginia Giuffre with Prince Andrew, Ghislaine Maxwell in background — London 2001" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="font-sans text-[0.6rem] text-ink-muted mt-1.5">Virginia Giuffre (age 17) with Prince Andrew, Maxwell in background — London, 2001. Court Exhibit.</p>
          </a>
          <a href="https://upload.wikimedia.org/wikipedia/commons/e/e0/Epstein%27s_NYC_Mugshot.jpg" target="_blank" rel="noopener noreferrer" className="group block">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border bg-parchment-dark">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Epstein%27s_NYC_Mugshot.jpg/400px-Epstein%27s_NYC_Mugshot.jpg" alt="Jeffrey Epstein NYPD booking photo, July 2019" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="font-sans text-[0.6rem] text-ink-muted mt-1.5">Jeffrey Epstein — NYPD booking photo, July 2019. Arrested on federal sex trafficking charges.</p>
          </a>
          <a href="https://upload.wikimedia.org/wikipedia/commons/d/d6/Ghislaine_Maxwell_cropped.jpg" target="_blank" rel="noopener noreferrer" className="group block">
            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border bg-parchment-dark">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Ghislaine_Maxwell_cropped.jpg/400px-Ghislaine_Maxwell_cropped.jpg" alt="Ghislaine Maxwell" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="font-sans text-[0.6rem] text-ink-muted mt-1.5">Ghislaine Maxwell — Convicted on 5 of 6 counts, sentenced to 20 years (S.D.N.Y., June 2022).</p>
          </a>
        </div>

        {/* Primary Source Documents CTA */}
        <div className="p-5 border border-border rounded-sm bg-parchment-dark/50">
          <h4 className="font-sans text-xs font-bold tracking-[0.1em] uppercase text-ink mb-2">Primary Source Documents</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a href="https://www.documentcloud.org/documents/1507315-epstein-flight-manifests.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 border border-border rounded-sm hover:border-crimson hover:text-crimson transition-colors font-sans text-xs text-ink-muted">
              <IconDocument className="w-4 h-4 flex-shrink-0" /> Flight Logs — "Lolita Express" Manifests
            </a>
            <a href="https://www.justice.gov/d9/2025-01/epstein-documents.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 border border-border rounded-sm hover:border-crimson hover:text-crimson transition-colors font-sans text-xs text-ink-muted">
              <IconDocument className="w-4 h-4 flex-shrink-0" /> DOJ Bondi Release — 3M+ Documents
            </a>
            <a href="https://www.courtlistener.com/docket/4355835/giuffre-v-maxwell/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 border border-border rounded-sm hover:border-crimson hover:text-crimson transition-colors font-sans text-xs text-ink-muted">
              <IconDocument className="w-4 h-4 flex-shrink-0" /> Giuffre v. Maxwell — Full Docket (CourtListener)
            </a>
            <a href="https://oig.justice.gov/reports/evaluation-issues-surrounding-inmate-death-metropolitan-correctional-center-new-york" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 border border-border rounded-sm hover:border-crimson hover:text-crimson transition-colors font-sans text-xs text-ink-muted">
              <IconDocument className="w-4 h-4 flex-shrink-0" /> DOJ OIG — MCC Death Investigation
            </a>
          </div>
        </div>
      </section>

      {/* Community Forum */}
      <div className="max-w-4xl mx-auto px-6">
        <AdBanner slot="deepstate-bottom" format="horizontal" />
        <SharePanel
          title="The Deep State — The Epstein Network"
          description="An investigative dossier documenting the Epstein network through court filings, sworn testimony, and government reports."
          contentId="deep-state"
        />
        <DisputeStory pageId="deep-state" pageTitle="The Deep State — Epstein Network" />
        <CommunityForum pageId="deep-state" pageTitle="The Deep State — Epstein Network" />
      </div>

      {/* ── Subscriber Capture ─────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <NewsletterSignup source="article_cta" contentInterest="deep-state-epstein-network" />
        <ContentGate contentInterest="deep-state-epstein-network" />
      </div>

      {/* ── Methodology Footer ────────────────────────────────── */}
      <section className="bg-ink text-white/70 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-xl font-bold text-white mb-4">Methodology & Editorial Standards</h2>
          <div className="space-y-3 font-body text-sm leading-relaxed">
            <p>Every individual profiled on this page appears in publicly available court records, government reports, or verified investigative journalism from established outlets. No person is named based solely on allegation, rumor, or unverified claims.</p>
            <p>Evidence is classified using a three-tier system. <strong className="text-white">Court-Verified</strong> evidence comes from sworn testimony, court filings, or official government reports. <strong className="text-white">Circumstantial</strong> evidence is documented but not adjudicated — flight logs, photographs, financial records, and correspondence. <strong className="text-white">Disputed</strong> evidence represents allegations that are under investigation, denied by the named party, or subsequently recanted.</p>
            <p>This page will be updated as additional court documents are unsealed, DOJ releases continue, and new verified information becomes available. Corrections are made promptly when evidence status changes.</p>
            <p className="text-white/40 text-xs mt-6">Last updated: March 2026 — Compiled by the editorial staff of Veritas Worldwide Press</p>
          </div>

          {/* Cross-links to related investigations */}
          <div className="mt-10 pt-8 border-t border-white/10">
            <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-3">Related Investigations</p>
            <div className="flex flex-wrap gap-3">
              <a href="/israel-dossier" className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 rounded-sm text-white/60 hover:text-white hover:border-white/30 transition-colors font-sans text-xs tracking-wide">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                The Israel Dossier
              </a>
              <a href="/chapter/chapter-28" className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 rounded-sm text-white/60 hover:text-white hover:border-white/30 transition-colors font-sans text-xs tracking-wide">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                Chapter 28: The Epstein Files
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
