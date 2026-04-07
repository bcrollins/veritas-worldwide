import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setMetaTags, clearMetaTags, setJsonLd, removeJsonLd, SITE_URL, SITE_NAME } from '../lib/seo'
import SharePanel from '../components/SharePanel'
import NewsletterSignup from '../components/NewsletterSignup'
import ReadingProgress from '../components/ReadingProgress'

/* ── Evidence Tier System ─────────────────────────────────────── */
type EvidenceTier = 'verified' | 'circumstantial' | 'disputed'

const TIER_CONFIG: Record<EvidenceTier, { label: string; color: string; bg: string; border: string; desc: string; icon: string }> = {
  verified: { label: 'Verified', color: 'var(--color-verified)', bg: 'var(--color-verified-bg)', border: 'var(--color-verified-border)', desc: 'Confirmed via archaeological evidence, manuscript records, or independent historical attestation', icon: '✓' },
  circumstantial: { label: 'Circumstantial', color: 'var(--color-circumstantial)', bg: 'var(--color-circumstantial-bg)', border: 'var(--color-circumstantial-border)', desc: 'Individual facts documented — the connection or interpretation involves scholarly debate', icon: '◐' },
  disputed: { label: 'Disputed', color: 'var(--color-disputed)', bg: 'var(--color-disputed-bg)', border: 'var(--color-disputed-border)', desc: 'Claimed by tradition or text but not independently confirmed by external evidence', icon: '⚠' },
}

/* ── Data Types ───────────────────────────────────────────────── */
interface EvidenceBlock {
  claim: string
  detail: string
  tier: EvidenceTier
  sources: { label: string; url: string }[]
}

interface TimelineEntry {
  date: string
  title: string
  detail: string
  tier: EvidenceTier
}

/* ── Factual Evidence Blocks ──────────────────────────────────── */
const EVIDENCE_BLOCKS: EvidenceBlock[] = [
  {
    claim: 'The Dead Sea Scrolls confirm textual stability of the Hebrew Bible across 1,000+ years',
    detail: 'Discovered between 1946–1956 in the Qumran caves near the Dead Sea, these ~900 manuscripts include fragments of every Old Testament book except Esther. The Great Isaiah Scroll (1QIsaᵃ), carbon-dated to c. 125 BCE, matches the Masoretic text (c. 900 CE) with over 95% accuracy — the 5% variance consisting almost entirely of spelling differences and scribal slips, not doctrinal alterations.',
    tier: 'verified',
    sources: [
      { label: 'Israel Antiquities Authority — Dead Sea Scrolls Digital Library', url: 'https://www.deadseascrolls.org.il/' },
      { label: 'Abegg, Flint & Ulrich, The Dead Sea Scrolls Bible (1999)', url: 'https://www.harpercollins.com/products/the-dead-sea-scrolls-bible' },
      { label: 'Tov, Emanuel. Textual Criticism of the Hebrew Bible. Fortress Press, 2012.', url: 'https://www.fortresspress.com/' },
    ],
  },
  {
    claim: 'The New Testament manuscript tradition is the most attested of any ancient text',
    detail: 'There are approximately 5,800 Greek manuscripts, 10,000+ Latin Vulgate manuscripts, and over 9,300 copies in other early languages (Syriac, Coptic, Armenian, etc.) — totaling more than 25,000 manuscript copies or fragments. The earliest fragment, Papyrus P52 (Rylands Library Papyrus P52), contains portions of John 18 and is paleographically dated to c. 125–175 CE, within roughly 50–100 years of the original composition. By comparison, Homer\'s Iliad — the second-most attested ancient text — survives in approximately 1,900 manuscripts, with the earliest substantial copy dating ~400 years after composition.',
    tier: 'verified',
    sources: [
      { label: 'Institut für Neutestamentliche Textforschung — Manuscript Statistics', url: 'https://ntvmr.uni-muenster.de/' },
      { label: 'Roberts, C.H. An Unpublished Fragment of the Fourth Gospel. Manchester UP, 1935.', url: 'https://www.library.manchester.ac.uk/rylands/special-collections/' },
      { label: 'Metzger & Ehrman, The Text of the New Testament. Oxford UP, 2005.', url: 'https://global.oup.com/' },
    ],
  },
  {
    claim: 'The Tel Dan Stele provides extra-biblical confirmation of the Davidic dynasty',
    detail: 'Discovered in 1993–1994 at Tel Dan in northern Israel by archaeologist Avraham Biran, this 9th-century BCE Aramaic inscription contains the phrase "House of David" (bytdwd) — the first archaeological reference to King David outside the Bible. The stele was erected by an Aramean king (likely Hazael of Damascus) commemorating a military victory over Israel and Judah. It is now housed in the Israel Museum, Jerusalem.',
    tier: 'verified',
    sources: [
      { label: 'Biran, A. & Naveh, J. "An Aramaic Stele Fragment from Tel Dan." Israel Exploration Journal 43 (1993): 81–98.', url: 'https://www.jstor.org/stable/27926373' },
      { label: 'Israel Museum, Jerusalem — Tel Dan Stele', url: 'https://www.imj.org.il/' },
    ],
  },
  {
    claim: 'The Merneptah Stele (c. 1208 BCE) is the earliest known extra-biblical reference to "Israel"',
    detail: 'This Egyptian granite stele, erected by Pharaoh Merneptah (son of Ramesses II), describes a military campaign in Canaan and includes the line: "Israel is laid waste and his seed is not." The determinative hieroglyph indicates "Israel" as a people (not a state), placing an identifiable Israelite group in Canaan by the late 13th century BCE. The stele is in the Egyptian Museum, Cairo.',
    tier: 'verified',
    sources: [
      { label: 'Pritchard, J.B. Ancient Near Eastern Texts Relating to the Old Testament (ANET). Princeton UP, 1969.', url: 'https://press.princeton.edu/' },
      { label: 'Kitchen, K.A. On the Reliability of the Old Testament. Eerdmans, 2003.', url: 'https://www.eerdmans.com/' },
    ],
  },
  {
    claim: 'Pontius Pilate\'s historicity confirmed by the Pilate Stone',
    detail: 'In 1961, a limestone block was discovered at the Roman theater in Caesarea Maritima bearing a Latin inscription that reads, in part: "[...]TIUS PILATUS [...] PRAEFECTUS IUDA[EA]E" — "Pontius Pilate, Prefect of Judaea." This is the only known archaeological artifact naming Pilate and confirms the Gospel accounts\' identification of him as the Roman official who presided over Jesus\' trial. The stone is in the Israel Museum.',
    tier: 'verified',
    sources: [
      { label: 'Frova, A. "L\'iscrizione di Ponzio Pilato a Cesarea." Rendiconti dell\'Istituto Lombardo 95 (1961).', url: 'https://www.jstor.org/' },
      { label: 'Israel Museum — Pilate Inscription', url: 'https://www.imj.org.il/' },
      { label: 'Bond, Helen K. Pontius Pilate in History and Interpretation. Cambridge UP, 1998.', url: 'https://www.cambridge.org/' },
    ],
  },
  {
    claim: 'The ossuary of Caiaphas — the high priest who presided at Jesus\' trial — was found in 1990',
    detail: 'A decorated limestone ossuary (bone box) inscribed "Yehosef bar Qayafa" (Joseph son of Caiaphas) was discovered in a burial cave in Jerusalem\'s Peace Forest in November 1990. Caiaphas is named in all four Gospels and in Josephus\' Antiquities (18.2.2) as the high priest who organized the trial of Jesus. The ossuary contained the bones of a 60-year-old male and is now in the Israel Museum.',
    tier: 'verified',
    sources: [
      { label: 'Reich, Ronny. "Caiaphas Name Inscribed on Bone Boxes." Biblical Archaeology Review 18:5 (1992).', url: 'https://www.biblicalarchaeology.org/' },
      { label: 'Josephus, Antiquities of the Jews, 18.2.2', url: 'https://penelope.uchicago.edu/josephus/' },
    ],
  },
  {
    claim: 'The Cyrus Cylinder corroborates the biblical account of the Persian decree to return Jewish exiles',
    detail: 'This clay cylinder, inscribed c. 539 BCE, records Cyrus the Great\'s conquest of Babylon and his policy of returning displaced peoples to their homelands and restoring their temples. This aligns with 2 Chronicles 36:22–23 and Ezra 1:1–4, which describe Cyrus issuing a decree permitting Jews to return to Jerusalem and rebuild the Temple. The cylinder is in the British Museum.',
    tier: 'verified',
    sources: [
      { label: 'British Museum — The Cyrus Cylinder', url: 'https://www.britishmuseum.org/collection/object/W_1880-0617-1941' },
      { label: 'Kuhrt, A. "The Cyrus Cylinder and Achaemenid Imperial Policy." Journal for the Study of the Old Testament 25 (1983).', url: 'https://journals.sagepub.com/home/jot' },
    ],
  },
  {
    claim: 'Luke\'s Gospel demonstrates verifiable accuracy on Roman administrative titles',
    detail: 'The historian Luke uses specific Roman administrative titles — proconsul (anthypatos) for Sergius Paulus in Cyprus (Acts 13:7), politarchs for Thessalonian magistrates (Acts 17:6), and Asiarchs in Ephesus (Acts 19:31). Every title has been confirmed correct for that specific location and period by inscriptions and coins. Classical historian A.N. Sherwin-White of Oxford wrote: "For Acts the confirmation of historicity is overwhelming... any attempt to reject its basic historicity even in matters of detail must now appear absurd."',
    tier: 'verified',
    sources: [
      { label: 'Sherwin-White, A.N. Roman Society and Roman Law in the New Testament. Oxford UP, 1963.', url: 'https://global.oup.com/' },
      { label: 'Hemer, Colin J. The Book of Acts in the Setting of Hellenistic History. Eisenbrauns, 1990.', url: 'https://www.eisenbrauns.org/' },
    ],
  },
  {
    claim: 'The destruction of Jerusalem in 70 CE is independently attested by Josephus, Roman sources, and archaeology',
    detail: 'Flavius Josephus, a Jewish-Roman historian and eyewitness, records the Roman siege and destruction of Jerusalem and the Second Temple in The Jewish War (c. 75 CE). The Arch of Titus in Rome (erected c. 81 CE) depicts Roman soldiers carrying the Temple\'s menorah and sacred objects. Archaeological excavations at the Temple Mount have uncovered a stone bearing the inscription "To the place of trumpeting" and massive ashlars pushed from the Temple platform — physical evidence of the destruction described in both Josephus and the Gospels (Mark 13:1–2).',
    tier: 'verified',
    sources: [
      { label: 'Josephus, The Jewish War, Books V–VII', url: 'https://penelope.uchicago.edu/josephus/' },
      { label: 'Mazar, Benjamin. The Mountain of the Lord. Doubleday, 1975.', url: 'https://www.penguinrandomhouse.com/' },
    ],
  },
  {
    claim: 'The Hezekiah Tunnel inscription matches the biblical account of the Siloam water system',
    detail: 'In 1880, an ancient Hebrew inscription was discovered inside a water tunnel connecting the Gihon Spring to the Pool of Siloam in Jerusalem. The tunnel is attributed to King Hezekiah (2 Kings 20:20, 2 Chronicles 32:30), who prepared for Sennacherib\'s siege c. 701 BCE by diverting the city\'s water supply underground. The inscription describes two teams of miners digging from opposite ends and meeting in the middle — consistent with the biblical account. The inscription is in the Istanbul Archaeological Museum.',
    tier: 'verified',
    sources: [
      { label: 'Shanks, Hershel. "The Siloam Pool." Biblical Archaeology Review 31:5 (2005).', url: 'https://www.biblicalarchaeology.org/' },
      { label: 'Istanbul Archaeological Museum — Siloam Inscription', url: 'https://muze.gov.tr/' },
    ],
  },
  {
    claim: 'The Apostle Paul\'s letters are among the earliest Christian documents, written within 20–30 years of the crucifixion',
    detail: 'Critical scholarship — including secular historians — dates Paul\'s undisputed letters (Romans, 1–2 Corinthians, Galatians, Philippians, 1 Thessalonians, Philemon) to approximately 49–58 CE. The crucifixion is dated by consensus to c. 30–33 CE. Paul\'s first letter to the Thessalonians (c. 49–51 CE) may be the earliest surviving Christian document. In 1 Corinthians 15:3–7, Paul transmits a creedal formula about Jesus\' death, burial, and resurrection appearances that scholars date to within 2–5 years of the crucifixion itself.',
    tier: 'verified',
    sources: [
      { label: 'Ehrman, Bart D. The New Testament: A Historical Introduction. Oxford UP, 2016.', url: 'https://global.oup.com/' },
      { label: 'Hengel, Martin. The Pre-Christian Paul. Trinity Press, 1991.', url: 'https://www.fortresspress.com/' },
      { label: 'Habermas, Gary R. "The Early Christian Creed of 1 Corinthians 15." Journal for the Study of the Historical Jesus 3 (2005).', url: 'https://bfrjournal.com/' },
    ],
  },
  {
    claim: 'The Exodus from Egypt: the route, timing, and scale remain debated despite Egyptian archaeological silence',
    detail: 'No Egyptian inscription or archaeological site has been conclusively identified as evidence of the Israelite Exodus as described in the Torah. Egyptian records from the relevant periods (typically 15th or 13th century BCE) contain no mention of a mass departure of Semitic slaves. However, Egyptian records do attest to Semitic laborers (the "Apiru") in state construction projects, and the Merneptah Stele confirms an Israelite presence in Canaan by c. 1208 BCE. Scholars are divided: some propose a smaller-scale migration that left no monumental record; others argue the narrative is theological rather than strictly historical.',
    tier: 'circumstantial',
    sources: [
      { label: 'Finkelstein, Israel & Silberman, N.A. The Bible Unearthed. Free Press, 2001.', url: 'https://www.simonandschuster.com/' },
      { label: 'Hoffmeier, James K. Israel in Egypt. Oxford UP, 1996.', url: 'https://global.oup.com/' },
      { label: 'Kitchen, K.A. On the Reliability of the Old Testament. Eerdmans, 2003.', url: 'https://www.eerdmans.com/' },
    ],
  },
  {
    claim: 'Jericho\'s walls: archaeological evidence is debated regarding the biblical conquest narrative',
    detail: 'Kathleen Kenyon\'s 1950s excavations at Tell es-Sultan (ancient Jericho) dated the city\'s destruction layer to c. 1550 BCE — too early for a 13th-century Exodus/Conquest. Bryant Wood (1990) reanalyzed the pottery and radiocarbon data and argued for a destruction closer to 1400 BCE, aligning with an earlier Exodus date. The debate continues: the site shows evidence of a dramatic destruction with collapsed mudbrick walls and a burn layer, but the dating and its connection to the Joshua narrative remain contested.',
    tier: 'circumstantial',
    sources: [
      { label: 'Kenyon, Kathleen. Excavations at Jericho. British School of Archaeology, 1960–1983.', url: 'https://www.britac.ac.uk/' },
      { label: 'Wood, Bryant G. "Did the Israelites Conquer Jericho?" Biblical Archaeology Review 16:2 (1990).', url: 'https://www.biblicalarchaeology.org/' },
    ],
  },
  {
    claim: 'The Gospel accounts of Jesus\' crucifixion align with known Roman execution practices',
    detail: 'In 1968, the skeletal remains of a crucified man named Yehohanan were discovered in a Jerusalem ossuary, with an iron nail still embedded in his heel bone — the only direct archaeological evidence of Roman crucifixion. The discovery confirmed details described in the Gospels: crucifixion victims were nailed (not merely tied) and given proper burial in some cases. Josephus, Cicero, and Seneca independently describe crucifixion as a standard Roman punishment. The practice was abolished by Constantine I in 337 CE.',
    tier: 'verified',
    sources: [
      { label: 'Tzaferis, V. "Crucifixion — The Archaeological Evidence." Biblical Archaeology Review 11:1 (1985).', url: 'https://www.biblicalarchaeology.org/' },
      { label: 'Hengel, Martin. Crucifixion in the Ancient World. Fortress Press, 1977.', url: 'https://www.fortresspress.com/' },
    ],
  },
  {
    claim: 'The Moabite Stone (Mesha Stele) corroborates events recorded in 2 Kings 3',
    detail: 'Discovered in 1868 at Dhiban, Jordan, this 9th-century BCE basalt inscription was erected by King Mesha of Moab. It describes Moab\'s subjugation by "Omri, king of Israel" and Mesha\'s subsequent revolt — events paralleling the account in 2 Kings 3. The inscription mentions the Israelite god Yahweh by name and references specific cities named in the Hebrew Bible (Ataroth, Nebo, Jahaz). It is in the Louvre Museum, Paris.',
    tier: 'verified',
    sources: [
      { label: 'Louvre Museum — Mesha Stele', url: 'https://www.louvre.fr/en/explore/the-palace/mesha-stele' },
      { label: 'Dearman, J. Andrew, ed. Studies in the Mesha Inscription and Moab. Scholars Press, 1989.', url: 'https://www.sbl-site.org/' },
    ],
  },
  {
    claim: 'Moses\' authorship of the Torah is attributed by tradition but challenged by modern textual criticism',
    detail: 'Jewish and Christian tradition attributes the first five books (Genesis–Deuteronomy) to Moses. However, since the 18th century, scholars have identified multiple literary sources within the Torah (the Documentary Hypothesis: J, E, D, P sources), suggesting composite authorship over several centuries. The text refers to Moses\' death (Deuteronomy 34), uses anachronistic place names, and contains duplicate narratives with distinct vocabulary and theology. Conservative scholars counter that Mosaic authorship allows for later editorial updates and that the text itself claims Mosaic origin in several passages (Exodus 24:4, Deuteronomy 31:9).',
    tier: 'disputed',
    sources: [
      { label: 'Wellhausen, Julius. Prolegomena to the History of Israel. 1883.', url: 'https://archive.org/' },
      { label: 'Friedman, Richard Elliott. Who Wrote the Bible? Harper, 1987.', url: 'https://www.harpercollins.com/' },
      { label: 'Cassuto, Umberto. The Documentary Hypothesis. Magnes Press, 1961.', url: 'https://www.huji.ac.il/' },
    ],
  },
  {
    claim: 'The canon of the New Testament was formally recognized at the Councils of Hippo (393 CE) and Carthage (397 CE)',
    detail: 'The 27 books of the New Testament were in wide circulation and general consensus by the late 2nd century (Irenaeus, Muratorian Canon). Athanasius of Alexandria listed the exact 27-book canon in his 39th Festal Letter (367 CE). The regional councils at Hippo Regius (393 CE) and Carthage (397 CE) formally ratified this list. The canon was not "imposed" by a single authority but rather recognized through a centuries-long process of communal usage, doctrinal consistency, and apostolic attribution.',
    tier: 'verified',
    sources: [
      { label: 'Metzger, Bruce M. The Canon of the New Testament. Oxford UP, 1987.', url: 'https://global.oup.com/' },
      { label: 'Athanasius, 39th Festal Letter (367 CE)', url: 'https://www.newadvent.org/fathers/2806039.htm' },
      { label: 'McDonald, Lee Martin. The Biblical Canon. Hendrickson, 2007.', url: 'https://www.hendricksonrose.com/' },
    ],
  },
  {
    claim: 'The resurrection of Jesus: historical claim attested by early sources, but not independently verifiable',
    detail: 'The bodily resurrection of Jesus is the central claim of Christianity. Paul\'s creedal tradition in 1 Corinthians 15:3–8 (dated to within ~5 years of the event) lists post-resurrection appearances to Peter, the Twelve, 500+ witnesses, James, and Paul himself. All four Gospels report the empty tomb. Historian N.T. Wright argues the combination of an empty tomb and post-mortem appearances is best explained by bodily resurrection; skeptical scholars (e.g., Bart Ehrman) attribute the appearances to visionary experiences. No physical or documentary evidence exists to confirm or refute the claim — it is a matter of historical inference and interpretive framework.',
    tier: 'disputed',
    sources: [
      { label: 'Wright, N.T. The Resurrection of the Son of God. Fortress Press, 2003.', url: 'https://www.fortresspress.com/' },
      { label: 'Ehrman, Bart D. How Jesus Became God. HarperOne, 2014.', url: 'https://www.harpercollins.com/' },
      { label: '1 Corinthians 15:3–8 (c. 53–55 CE)', url: 'https://www.biblegateway.com/passage/?search=1+Corinthians+15%3A3-8&version=ESV' },
    ],
  },
]

/* ── Bible Timeline ───────────────────────────────────────────── */
const TIMELINE: TimelineEntry[] = [
  { date: 'c. 1400–1200 BCE', title: 'Earliest proposed composition of Torah sources', detail: 'The oldest textual traditions within Genesis–Deuteronomy may originate from this period, though dating is debated.', tier: 'disputed' },
  { date: 'c. 1208 BCE', title: 'Merneptah Stele — earliest mention of "Israel"', detail: 'Egyptian pharaoh records a military campaign against a people called Israel in Canaan.', tier: 'verified' },
  { date: 'c. 840 BCE', title: 'Mesha Stele erected', detail: 'King Mesha of Moab records events paralleling 2 Kings, mentioning Omri, Israel, and Yahweh.', tier: 'verified' },
  { date: 'c. 840–830 BCE', title: 'Tel Dan Stele — "House of David"', detail: 'Aramean king commemorates victory over the "House of David," confirming the Davidic dynasty.', tier: 'verified' },
  { date: 'c. 701 BCE', title: 'Hezekiah\'s Tunnel constructed', detail: 'Water system built in preparation for Sennacherib\'s siege, matching 2 Kings 20:20.', tier: 'verified' },
  { date: '586 BCE', title: 'Babylonian destruction of Jerusalem', detail: 'Nebuchadnezzar II destroys the First Temple. Babylonian Chronicles confirm the siege.', tier: 'verified' },
  { date: '539 BCE', title: 'Cyrus Cylinder — decree to return exiles', detail: 'Cyrus the Great\'s policy of returning displaced peoples aligns with Ezra 1:1–4.', tier: 'verified' },
  { date: 'c. 250–150 BCE', title: 'Septuagint (LXX) translation', detail: 'The Hebrew Bible is translated into Greek in Alexandria, becoming the Old Testament of early Christianity.', tier: 'verified' },
  { date: 'c. 125 BCE', title: 'Great Isaiah Scroll copied (Dead Sea Scrolls)', detail: 'The oldest near-complete copy of Isaiah, demonstrating textual stability over a millennium.', tier: 'verified' },
  { date: 'c. 30–33 CE', title: 'Crucifixion of Jesus of Nazareth', detail: 'Dated by cross-referencing Pilate\'s prefecture (26–36 CE), Passover timing, and astronomical data.', tier: 'verified' },
  { date: 'c. 49–51 CE', title: '1 Thessalonians — earliest surviving Christian document', detail: 'Paul writes to the church in Thessalonica; likely the first New Testament text composed.', tier: 'verified' },
  { date: 'c. 53–55 CE', title: 'Paul transmits pre-Pauline creed (1 Cor. 15:3–8)', detail: 'The creed about Jesus\' death, burial, and resurrection appearances — dated by scholars to within 2–5 years of the events.', tier: 'verified' },
  { date: 'c. 66–70 CE', title: 'Gospel of Mark composed', detail: 'Widely considered the earliest Gospel, written during or just before the Jewish-Roman War.', tier: 'circumstantial' },
  { date: '70 CE', title: 'Destruction of the Second Temple', detail: 'Roman forces under Titus destroy Jerusalem. Confirmed by Josephus, the Arch of Titus, and archaeology.', tier: 'verified' },
  { date: 'c. 80–100 CE', title: 'Gospels of Matthew, Luke, and John composed', detail: 'Standard critical dating places these texts in the late first century CE.', tier: 'circumstantial' },
  { date: 'c. 125–175 CE', title: 'Papyrus P52 — earliest NT manuscript fragment', detail: 'A fragment of John 18 found in Egypt, demonstrating early and wide geographic distribution of Gospel texts.', tier: 'verified' },
  { date: '367 CE', title: 'Athanasius\' 39th Festal Letter', detail: 'First known listing of the exact 27-book New Testament canon.', tier: 'verified' },
  { date: '393–397 CE', title: 'Councils of Hippo and Carthage', detail: 'Regional church councils formally ratify the 27-book New Testament canon.', tier: 'verified' },
  { date: '1455 CE', title: 'Gutenberg Bible printed', detail: 'Johannes Gutenberg produces the first major book printed with movable type — a Latin Vulgate Bible.', tier: 'verified' },
  { date: '1946–1956', title: 'Dead Sea Scrolls discovered', detail: 'Approximately 900 manuscripts found in 11 caves near the Dead Sea, revolutionizing biblical textual criticism.', tier: 'verified' },
]

/* ── By-the-Numbers ───────────────────────────────────────────── */
const STATS = [
  { label: 'Greek NT Manuscripts', value: '5,800+', note: 'More than any other ancient text by a factor of 10' },
  { label: 'Total Ancient Copies', value: '25,000+', note: 'Greek, Latin, Syriac, Coptic, Armenian, and more' },
  { label: 'Years of Textual Stability', value: '1,000+', note: 'Dead Sea Scrolls vs. Masoretic Text agreement: >95%' },
  { label: 'Languages Translated Into', value: '3,500+', note: 'The most translated book in human history' },
  { label: 'Approximate Composition Span', value: '~1,500 yrs', note: 'From earliest Torah traditions to Revelation' },
  { label: 'Named Authors / Contributors', value: '~40', note: 'Across three continents over 15 centuries' },
]

/* ── Filter Component ─────────────────────────────────────────── */
function TierFilter({ active, onToggle }: { active: Set<EvidenceTier>; onToggle: (t: EvidenceTier) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(TIER_CONFIG) as EvidenceTier[]).map(tier => {
        const cfg = TIER_CONFIG[tier]
        const isActive = active.has(tier)
        return (
          <button
            key={tier}
            onClick={() => onToggle(tier)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-sans font-medium transition-all border"
            style={{
              backgroundColor: isActive ? cfg.bg : 'transparent',
              color: isActive ? cfg.color : 'var(--color-ink-muted)',
              borderColor: isActive ? cfg.color : 'var(--color-border)',
              opacity: isActive ? 1 : 0.6,
            }}
            aria-pressed={isActive}
          >
            <span>{cfg.icon}</span>
            {cfg.label}
          </button>
        )
      })}
    </div>
  )
}

/* ── Evidence Card ────────────────────────────────────────────── */
function EvidenceCard({ block }: { block: EvidenceBlock }) {
  const [open, setOpen] = useState(false)
  const cfg = TIER_CONFIG[block.tier]
  return (
    <article
      className="border rounded-sm overflow-hidden transition-shadow hover:shadow-md"
      style={{ borderColor: cfg.color + '40' }}
    >
      <div className="p-5 sm:p-6" style={{ backgroundColor: cfg.bg }}>
        {/* Tier Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[0.65rem] font-sans font-bold tracking-[0.08em] uppercase"
            style={{ backgroundColor: cfg.color + '18', color: cfg.color, border: `1px solid ${cfg.color}30` }}
          >
            <span>{cfg.icon}</span>
            {cfg.label}
          </span>
        </div>
        {/* Claim */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-ink leading-snug mb-3">
          {block.claim}
        </h3>
        {/* Detail */}
        <p className="font-body text-sm text-ink-light leading-relaxed">
          {block.detail}
        </p>
        {/* Sources Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="mt-4 inline-flex items-center gap-1.5 font-sans text-[0.7rem] font-semibold tracking-[0.05em] uppercase transition-colors"
          style={{ color: cfg.color }}
          aria-expanded={open}
        >
          <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          {open ? 'Hide' : 'View'} Sources ({block.sources.length})
        </button>
        {open && (
          <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: cfg.color + '20' }}>
            {block.sources.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block font-sans text-xs text-ink-muted hover:text-ink transition-colors leading-relaxed"
              >
                <span className="font-semibold" style={{ color: cfg.color }}>[{i + 1}]</span> {s.label} <span className="text-ink-faint">↗</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

/* ── Main Page ────────────────────────────────────────────────── */
export default function BibleHistoryPage() {
  const [activeTiers, setActiveTiers] = useState<Set<EvidenceTier>>(new Set(['verified', 'circumstantial', 'disputed']))

  const toggleTier = (tier: EvidenceTier) => {
    setActiveTiers(prev => {
      const next = new Set(prev)
      if (next.has(tier)) { next.delete(tier) } else { next.add(tier) }
      if (next.size === 0) next.add(tier) // prevent empty filter
      return next
    })
  }

  const filtered = EVIDENCE_BLOCKS.filter(b => activeTiers.has(b.tier))
  const filteredTimeline = TIMELINE.filter(t => activeTiers.has(t.tier))

  useEffect(() => {
    setMetaTags({
      title: 'The Bible: History & Factual Record | Veritas Press',
      description: 'A primary-source examination of the Bible\'s historical claims — archaeological confirmations, manuscript evidence, and scholarly consensus. Every claim classified by evidence tier.',
      url: `${SITE_URL}/bible`,
      type: 'article',
    })
    setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': 'The Bible: History & Factual Record',
      'description': 'A primary-source examination of the Bible\'s historical claims — archaeological confirmations, manuscript evidence, and scholarly consensus.',
      'url': `${SITE_URL}/bible`,
      'isPartOf': { '@type': 'WebSite', 'name': `The Record — ${SITE_NAME}`, 'url': SITE_URL },
      'publisher': { '@type': 'Organization', 'name': SITE_NAME, 'url': SITE_URL },
      'author': { '@type': 'Organization', 'name': SITE_NAME },
    })
    return () => { clearMetaTags(); removeJsonLd() }
  }, [])

  return (
    <div className="w-full max-w-[1920px] mx-auto">
      <ReadingProgress />

      {/* Section Bar */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 py-2">
            <Link to="/" className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ink-faint hover:text-crimson transition-colors">
              The Record
            </Link>
            <span className="text-ink-faint">/</span>
            <span className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson">
              The Bible
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <header className="max-w-3xl mb-14 border-b border-border pb-10">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-4">
            Documentary Record
          </p>
          <h1 className="font-display text-3xl md:text-5xl lg:text-[3.25rem] font-bold text-ink leading-[1.08] mb-5">
            The Bible: History &amp; Factual Record
          </h1>
          <p className="font-body text-lg md:text-xl italic text-ink-muted leading-relaxed max-w-2xl">
            What the archaeological record, manuscript evidence, and independent historical sources confirm, contextualize, or contest about the most published book in human history.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <span className="font-sans text-[0.6rem] tracking-[0.08em] uppercase text-ink-faint">
              {EVIDENCE_BLOCKS.length} evidence entries &middot; {TIMELINE.length} timeline events &middot; {EVIDENCE_BLOCKS.reduce((n, b) => n + b.sources.length, 0)} cited sources
            </span>
          </div>
        </header>

        {/* Two-Column Layout */}
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Left Column — Main Content */}
          <div>
            {/* Evidence Tier Legend */}
            <section className="mb-10 p-5 sm:p-6 border border-border rounded-sm bg-surface">
              <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">
                Evidence Classification System
              </h2>
              <div className="space-y-3">
                {(Object.keys(TIER_CONFIG) as EvidenceTier[]).map(tier => {
                  const cfg = TIER_CONFIG[tier]
                  return (
                    <div key={tier} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-sm text-xs font-bold mt-0.5"
                        style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}30` }}
                      >
                        {cfg.icon}
                      </span>
                      <div>
                        <span className="font-sans text-sm font-semibold text-ink">{cfg.label}</span>
                        <p className="font-sans text-xs text-ink-muted leading-relaxed mt-0.5">{cfg.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* By the Numbers */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold text-ink mb-6">By the Numbers</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {STATS.map((s, i) => (
                  <div key={i} className="p-4 border border-border rounded-sm bg-surface text-center">
                    <p className="font-display text-2xl md:text-3xl font-bold text-crimson leading-none mb-1">{s.value}</p>
                    <p className="font-sans text-xs font-semibold text-ink tracking-[0.03em] mb-1">{s.label}</p>
                    <p className="font-sans text-[0.65rem] text-ink-faint leading-snug">{s.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Filter Bar */}
            <section className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
                <h2 className="font-display text-2xl font-bold text-ink">The Evidence</h2>
                <TierFilter active={activeTiers} onToggle={toggleTier} />
              </div>
              <p className="font-sans text-xs text-ink-faint">
                Showing {filtered.length} of {EVIDENCE_BLOCKS.length} entries. Filter by evidence tier above.
              </p>
            </section>

            {/* Evidence Cards */}
            <div className="space-y-5 mb-16">
              {filtered.map((block, i) => (
                <EvidenceCard key={i} block={block} />
              ))}
              {filtered.length === 0 && (
                <p className="font-body text-sm text-ink-muted italic py-8 text-center">No evidence blocks match the selected filters.</p>
              )}
            </div>

            {/* Timeline */}
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold text-ink mb-2">Historical Timeline</h2>
              <p className="font-sans text-xs text-ink-faint mb-8">
                Key dates in the Bible&rsquo;s composition, transmission, and archaeological confirmation.
              </p>
              <div className="relative pl-6 border-l-2 border-border space-y-6">
                {filteredTimeline.map((evt, i) => {
                  const cfg = TIER_CONFIG[evt.tier]
                  return (
                    <div key={i} className="relative">
                      {/* Dot */}
                      <span
                        className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 bg-parchment flex items-center justify-center text-[0.5rem] font-bold"
                        style={{ borderColor: cfg.color, color: cfg.color }}
                      >
                        {cfg.icon}
                      </span>
                      <p className="font-sans text-[0.65rem] font-bold tracking-[0.1em] uppercase mb-0.5" style={{ color: cfg.color }}>
                        {evt.date}
                      </p>
                      <h3 className="font-display text-base font-bold text-ink leading-snug mb-1">{evt.title}</h3>
                      <p className="font-body text-sm text-ink-muted leading-relaxed">{evt.detail}</p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Editorial Note */}
            <section className="mb-12 p-5 sm:p-6 border-l-4 rounded-sm" style={{ borderColor: 'var(--color-crimson)', backgroundColor: 'var(--color-surface)' }}>
              <h2 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">
                Editorial Note
              </h2>
              <p className="font-body text-sm text-ink-light leading-relaxed mb-3">
                This page presents the documentary and archaeological record as it stands. Veritas Press does not advocate for or against any faith tradition. The evidence tier system classifies claims by the strength of independent, external corroboration — not by theological significance.
              </p>
              <p className="font-body text-sm text-ink-light leading-relaxed">
                Readers are encouraged to consult the cited primary sources directly and to form their own conclusions. Where scholarly consensus is divided, both majority and minority positions are represented. This page will be updated as new evidence emerges.
              </p>
            </section>

            {/* Share + Newsletter */}
            <SharePanel title="The Bible: History & Factual Record" url={`${SITE_URL}/bible`} />
            <div className="mt-10">
              <NewsletterSignup variant="inline" source="bible_history_page" />
            </div>
          </div>

          {/* Right Column — Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-8">
              {/* Quick Navigation */}
              <nav className="border border-border rounded-sm p-5 bg-surface">
                <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">
                  On This Page
                </h3>
                <div className="space-y-2.5">
                  <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Introduction
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); document.querySelector('h2')?.scrollIntoView({ behavior: 'smooth' }) }} className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    By the Numbers
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); document.querySelectorAll('h2')[2]?.scrollIntoView({ behavior: 'smooth' }) }} className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    The Evidence
                  </a>
                  <a href="#" onClick={(e) => { e.preventDefault(); document.querySelectorAll('h2')[3]?.scrollIntoView({ behavior: 'smooth' }) }} className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Historical Timeline
                  </a>
                </div>
              </nav>

              {/* Tier Breakdown */}
              <div className="border border-border rounded-sm p-5 bg-surface">
                <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">
                  Evidence Breakdown
                </h3>
                {(Object.keys(TIER_CONFIG) as EvidenceTier[]).map(tier => {
                  const cfg = TIER_CONFIG[tier]
                  const count = EVIDENCE_BLOCKS.filter(b => b.tier === tier).length
                  const pct = Math.round((count / EVIDENCE_BLOCKS.length) * 100)
                  return (
                    <div key={tier} className="mb-3 last:mb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-sans text-xs font-medium" style={{ color: cfg.color }}>{cfg.label}</span>
                        <span className="font-sans text-xs text-ink-faint">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Related Sections */}
              <div className="border border-border rounded-sm p-5 bg-surface">
                <h3 className="font-sans text-[0.65rem] font-bold tracking-[0.15em] uppercase text-ink-muted mb-4">
                  Related Sections
                </h3>
                <div className="space-y-2.5">
                  <Link to="/methodology" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Methodology &amp; Evidence Standards →
                  </Link>
                  <Link to="/sources" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Source Library →
                  </Link>
                  <Link to="/timeline" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    Master Timeline →
                  </Link>
                  <Link to="/" className="block font-sans text-xs text-ink-muted hover:text-crimson transition-colors">
                    The Record — All Chapters →
                  </Link>
                </div>
              </div>

              {/* Membership CTA */}
              <div className="border border-crimson/20 rounded-sm p-5 bg-crimson/5 text-center">
                <p className="font-sans text-[0.6rem] font-bold tracking-[0.15em] uppercase text-crimson mb-2">Support This Research</p>
                <p className="font-body text-xs text-ink-muted leading-relaxed mb-4">
                  This research is free because the documentary record belongs to everyone.
                </p>
                <Link
                  to="/membership"
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-crimson text-white font-sans text-xs font-bold tracking-[0.08em] uppercase hover:bg-crimson-dark transition-colors rounded-sm w-full"
                >
                  Become a Member
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
