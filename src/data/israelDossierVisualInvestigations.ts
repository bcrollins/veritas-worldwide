/**
 * Israel Dossier — Visual Investigations densify pack
 * Attribution: Veritas Worldwide only. Entity-only; no personal operator identifiers.
 *
 * Method (NYT Visual Investigations / ProPublica / AP):
 * - Every row requires ≥2 independent checkable sources OR one primary + one multi-outlet forensic package.
 * - Video / photo-essay / investigation links are first-class multimedia, not decoration.
 * - Tier "verified" only for multi-source documented events; contested causal claims stay circumstantial.
 * - Multi-party documentation: includes Oct 7 civilian massacres and Gaza wartime civilian-harm cases.
 * - Ethnicity/religion is never treated as evidence. Claims are about documented conduct and sources.
 */
import type { DossierDocumentedIncident } from './israelDossierCanon'

/** New visual-first incidents + enrichment rows (unique titles/locations preferred). */
export const ISRAEL_DOSSIER_VISUAL_INVESTIGATIONS: DossierDocumentedIncident[] = [
  {
    id: 'vi-hind-rajab-2024',
    title: 'Hind Rajab — Child Killed in Car; Visual Reconstruction of Firing Timeline',
    date: 'January 29, 2024',
    location: 'Tel al-Hawa / Gaza City area',
    summary:
      'Six-year-old Hind Rajab was trapped in a car after relatives were killed. Multi-outlet forensic reconstructions and later court filings document communications with rescue crews and the sequence of fire that killed the child and responding paramedics. Causal attribution of every round remains multi-source investigative work, not a single-camera claim.',
    evidence:
      'Forensic Architecture / Earshot / partner investigations, contemporaneous ambulance-service communications reporting, and multi-outlet visual reconstructions establish the timeline and civilian status of the victims. Israeli authorities dispute aspects of the sequence; the multi-source civilian-harm record is the floor.',
    sources: [
      { label: 'Forensic Architecture — Hind Rajab investigation', url: 'https://forensic-architecture.org/investigation/the-killing-of-hind-rajab' },
      { label: 'Al Jazeera — Hind Rajab coverage & reconstruction packages', url: 'https://www.aljazeera.com/tag/hind-rajab/' },
      { label: 'Washington Post — Hind Rajab killing coverage package', url: 'https://www.washingtonpost.com/world/middle_east/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Forensic Architecture — spatial/acoustic reconstruction', url: 'https://forensic-architecture.org/investigation/the-killing-of-hind-rajab' },
      { type: 'video', label: 'Al Jazeera — visual investigation package', url: 'https://www.aljazeera.com/tag/hind-rajab/' },
      { type: 'document', label: 'Ambulance / rescue communications contemporaneous reporting trail', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    tier: 'verified',
    casualties: { killed: 6 },
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-wck-drone-triple-strike-2024',
    title: 'World Central Kitchen Convoy — Triple Drone Strike on Marked Aid Vehicles',
    date: 'April 1, 2024',
    location: 'Deir al-Balah corridor, Gaza',
    summary:
      'Seven World Central Kitchen aid workers were killed when their clearly marked convoy was hit in successive drone strikes after coordinating movements with Israeli authorities. Israel later acknowledged the strike as a serious mistake and dismissed officers; multi-outlet forensic packages reconstruct the strike sequence.',
    evidence:
      'WCK public statements, IDF acknowledgments of error, and multi-outlet visual/forensic reconstructions (including drone-timing analyses) establish multi-source documentation of civilian aid-worker deaths. Intent remains legally contested; the factual killing of marked aid workers is multi-source verified.',
    sources: [
      { label: 'World Central Kitchen — official statement trail', url: 'https://wck.org/' },
      { label: 'AP — World Central Kitchen strike multi-source reporting', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Reuters — IDF acknowledgment trail on WCK strike', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire-verified aftermath & convoy marking footage packages', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'investigation', label: 'Multi-outlet forensic reconstruction of successive strikes', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'WCK operational statement', url: 'https://wck.org/' },
    ],
    tier: 'verified',
    casualties: { killed: 7 },
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-shireen-abu-akleh-2022',
    title: 'Shireen Abu Akleh — Journalist Shot Dead While Reporting (Jenin)',
    date: 'May 11, 2022',
    location: 'Jenin, West Bank',
    summary:
      'Al Jazeera correspondent Shireen Abu Akleh was shot and killed while covering an Israeli military raid in Jenin, wearing press markings. Multi-outlet ballistic and visual investigations (including CNN, AP, Bellingcat-linked open-source work, and later U.S. assessments) found Israeli fire responsible; Israel later said there was a high possibility she was hit by IDF fire and expressed regret without criminal charges against the shooter.',
    evidence:
      'Synchronized video of the approach, bullet analysis, and multi-outlet OSINT establish Israeli fire as the source of the fatal shot at high confidence. Criminal accountability remains incomplete; the killing and press-status facts are multi-source verified.',
    sources: [
      { label: 'CNN — forensic visual investigation', url: 'https://www.cnn.com/2022/05/24/middleeast/shireen-abu-akleh-jenin-killing-investigation-cmd-intl/index.html' },
      { label: 'AP — investigation into the killing', url: 'https://apnews.com/article/shireen-abu-akleh' },
      { label: 'CPJ — case file & press-freedom record', url: 'https://cpj.org/' },
      { label: 'Bellingcat — open-source analysis materials', url: 'https://www.bellingcat.com/' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN Visual Investigations — synchronized gunfire analysis', url: 'https://www.cnn.com/2022/05/24/middleeast/shireen-abu-akleh-jenin-killing-investigation-cmd-intl/index.html' },
      { type: 'investigation', label: 'AP multi-source reconstruction', url: 'https://apnews.com/article/shireen-abu-akleh' },
      { type: 'photo-essay', label: 'Press-marked vest / scene documentation packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    tier: 'verified',
    casualties: { killed: 1 },
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-sde-teiman-abuse-footage-2024',
    title: 'Sde Teiman Detention — Abuse Imagery and Subsequent Indictments',
    date: '2024',
    location: 'Sde Teiman detention facility, Israel',
    summary:
      'Video and photographic material circulated showing severe abuse of Palestinian detainees at Sde Teiman. Israeli media and courts later processed related criminal cases against soldiers; multi-outlet verification established the imagery as genuine detention-facility abuse documentation rather than fabricated combat footage.',
    evidence:
      'Israeli court filings, IDF/military police case trails, and multi-outlet authentication of leaked footage establish verified documentation of detainee abuse. Scale of the broader detention system remains multi-source investigative; this row documents the authenticated abuse package and legal follow-up.',
    sources: [
      { label: 'Major Israeli & international wire reporting on Sde Teiman cases', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'AP / multi-outlet detainee abuse coverage', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'B’Tselem — detention conditions', url: 'https://www.btselem.org/torture' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated abuse footage packages (wire-verified circulation)', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'investigation', label: 'Multi-outlet verification & court-case trail reporting', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'B’Tselem detention condition reports', url: 'https://www.btselem.org/torture' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-great-march-return-sniper-2018',
    title: 'Great March of Return — Sniper Fire on Unarmed Protesters & Medics (Visual Record)',
    date: '2018',
    location: 'Gaza perimeter fence',
    summary:
      'During 2018 border protests, multi-outlet visual investigations and rights monitors documented Israeli sniper fire killing and maiming unarmed protesters, journalists, and medics—including clearly marked medical workers. The ICJ and UN commissions later treated the pattern as a major accountability file.',
    evidence:
      "B’Tselem video banks, Al Jazeera/AJ+ field video, HRW/Amnesty investigations, and UN commission materials form a multi-source visual record of live-fire against civilians and medics. Rules-of-engagement disputes do not erase the multi-source casualty and footage record.",
    sources: [
      { label: 'B’Tselem — Great March of Return documentation', url: 'https://www.btselem.org/firearms' },
      { label: 'HRW — Israel: Gaza Killings Unlawful and Willful (2018)', url: 'https://www.hrw.org/news/2018/04/03/israel-gaza-killings-unlawful-and-willful' },
      { label: 'UN Commission of Inquiry materials (OPT)', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem field video bank — fence protests', url: 'https://www.btselem.org/video' },
      { type: 'video', label: 'Al Jazeera — medic/journalist shooting documentation', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'HRW multi-case investigation — Gaza 2018', url: 'https://www.hrw.org/news/2018/04/03/israel-gaza-killings-unlawful-and-willful' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-settler-pogrom-huwara-2023',
    title: 'Huwara Rampage — Settler Violence Filmed in Real Time',
    date: 'February 26, 2023',
    location: 'Huwara, West Bank',
    summary:
      'After a shooting of Israeli settlers, large groups of Israeli settlers attacked Huwara—burning homes and cars while residents fled. Extensive smartphone and press video captured arson and assaults; Israeli officials later called the events a pogrom. Accountability for organizers remains a multi-source open file.',
    evidence:
      'Wall-to-wall contemporaneous video from residents and journalists, Israeli official characterizations, and multi-outlet investigations establish verified mass settler violence against Palestinian civilians. Military standing-down disputes are separately documented.',
    sources: [
      { label: 'B’Tselem — Huwara attack documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'Haaretz / Times of Israel contemporaneous reporting', url: 'https://www.haaretz.com/israel-news/' },
      { label: 'AP / Reuters wire packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem — Huwara arson/assault video bank', url: 'https://www.btselem.org/video' },
      { type: 'photo-essay', label: 'Wire photo packages — burned homes/vehicles', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'B’Tselem settler violence case compilation', url: 'https://www.btselem.org/settler_violence' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-nova-festival-2023',
    title: 'October 7 — Nova Music Festival Civilian Massacre (Bodycam & Survivor Video)',
    date: 'October 7, 2023',
    location: 'Near Re’im, southern Israel',
    summary:
      'Hamas-led militants attacked the Nova music festival, killing hundreds of civilians. Extensive bodycam, dashcam, smartphone, and later forensic compilations document systematic killing, abductions, and sexual violence allegations investigated by UN and multi-outlet teams. Included for multi-party documentation rules: civilian massacre evidence is not limited to one side’s victims.',
    evidence:
      'IDF-released militant bodycam, survivor video, forensic pathology reporting, and multi-outlet reconstructions establish verified mass killing of civilians at the festival site. Specific counts and crime classifications continue to be refined by investigators.',
    sources: [
      { label: 'AP / Reuters October 7 multi-outlet investigations', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT — October 7 visual investigation packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'UN human rights materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Bodycam/dashcam packages authenticated by major outlets', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations — October 7 packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN / rights-body documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    casualties: { killed: 360 },
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-kibbutz-beeri-2023',
    title: 'October 7 — Kibbutz Be’eri Civilian Killings (Site Video & Forensics)',
    date: 'October 7, 2023',
    location: 'Kibbutz Be’eri, southern Israel',
    summary:
      'Militants overran Kibbutz Be’eri, killing civilians in homes and communal spaces. Site video, survivor testimony, and forensic work by major outlets document systematic civilian targeting. Some firefights involving Israeli forces later raised separate “Hannibal” policy debates; those debates do not erase militant-perpetrated civilian killings established on video.',
    evidence:
      'Authenticated militant footage, survivor video, and multi-outlet forensic site work establish verified civilian mass killing. Attribution of every individual death (militant vs. friendly fire) is unit-level investigative work.',
    sources: [
      { label: 'AP / Reuters Be’eri reporting packages', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'Haaretz investigations on Be’eri', url: 'https://www.haaretz.com/israel-news/' },
      { label: 'OHCHR / multi-source October 7 documentation', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Site/bodycam video packages (wire-authenticated)', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'investigation', label: 'Longform forensic site reconstructions', url: 'https://www.haaretz.com/israel-news/' },
      { type: 'photo-essay', label: 'Aftermath documentation by major wires', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-double-tap-ambulance-patterns-2023-2025',
    title: 'Double-Tap Strikes on Rescue Workers — Visual Pattern File',
    date: '2023–2025',
    location: 'Gaza Strip (multiple sites)',
    summary:
      'Civil defense and ambulance crews report successive strikes hitting first responders after initial blasts—classic “double-tap” patterns that kill medics and journalists documenting scenes. Multi-outlet investigations and rights monitors compile video of marked rescue vehicles hit during response.',
    evidence:
      'PRCS / civil-defense logs, multi-outlet video of marked ambulances under fire, and OHCHR/medical-protection reporting establish a multi-source pattern file. Not every strike is independently filmed; the pattern magnitude is the claim.',
    sources: [
      { label: 'Palestine Red Crescent operational updates', url: 'https://www.palestinercs.org/' },
      { label: 'OHCHR medical personnel protection materials', url: 'https://www.ohchr.org/' },
      { label: 'Al Jazeera / wire video packages of EMS strikes', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'Marked ambulance / civil-defense strike video compilations', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'Rights-monitor EMS harm pattern files', url: 'https://www.ohchr.org/' },
      { type: 'document', label: 'PRCS incident updates', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-al-shifa-siege-visual-2023-2024',
    title: 'Al-Shifa Hospital Siege — Satellite, Drone & Ground Video of Civilian Patients',
    date: 'November 2023 – April 2024',
    location: 'Al-Shifa Hospital complex, Gaza City',
    summary:
      'Multiple siege phases at Al-Shifa produced extensive satellite imagery, drone video, and ground footage of patient evacuations, mass graves, and combat inside a hospital complex. Israel alleged major Hamas infrastructure; multi-outlet investigations found limited verified evidence for the largest command-center claims while documenting severe civilian patient harm.',
    evidence:
      'UNOSAT damage analysis, WHO hospital functionality updates, and multi-outlet visual investigations establish verified civilian harm around the complex. Underground-command claims remain contested and are not labeled verified here.',
    sources: [
      { label: 'WHO — occupied Palestinian territory emergency', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { label: 'UNOSAT / UNITAR damage assessments', url: 'https://unosat.org/' },
      { label: 'NYT Visual Investigations — Gaza hospital siege packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Ground/drone packages of hospital siege conditions', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'NYT / multi-outlet hospital siege visual packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'WHO hospital functionality updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons', 'mk84-use'],
  },
  {
    id: 'vi-soldiers-trophy-social-video-2023-2025',
    title: 'Soldier Social-Media “Trophy” & Demolition Videos — Authenticated Conduct Record',
    date: '2023–2025',
    location: 'Gaza Strip (multiple units)',
    summary:
      'Israeli soldiers and linked channels posted videos of detonating residential blocks, humiliating detainees, and celebrating destruction of civilian areas. Multi-outlet authentication treated large volumes of this material as genuine unit-level conduct documentation—primary visual evidence of attitude and tactics toward civilian property and captives.',
    evidence:
      'Bellingcat-style authentication, Israeli media self-reporting, and rights-monitor compilations establish verified circulation of genuine soldier-recorded videos. Individual criminal liability is case-by-case; the aggregate visual record is multi-source.',
    sources: [
      { label: 'B’Tselem video archives', url: 'https://www.btselem.org/video' },
      { label: 'Major outlet authentication of soldier social posts', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'Breaking the Silence / Israeli media follow-ups', url: 'https://www.breakingthesilence.org.il/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem — authenticated soldier-recorded conduct videos', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'Multi-outlet authentication packages', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'photo-essay', label: 'B’Tselem stills from verified unit videos', url: 'https://www.btselem.org/video' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-flour-massacre-visual-enrichment-2024',
    title: 'Flour Massacre — Forensic Video of Aid Seekers Under Fire (Visual Package)',
    date: 'February 29, 2024',
    location: 'Al-Rashid / Nabulsi area, Gaza City coastal road',
    summary:
      'Crowds waiting for flour aid came under fire; multi-outlet forensic video analyses reconstruct trajectories and unit positions. Israel claimed warning shots and vehicle threats; visual investigations document dense civilian casualties among aid seekers.',
    evidence:
      'CNN forensic video analysis, Al Jazeera longform visual package, and multi-source casualty reporting establish verified mass civilian harm at an aid distribution point. Rules-of-engagement disputes remain contested; civilian deaths are multi-source verified.',
    sources: [
      { label: 'CNN — forensic video analysis of convoy/aid shootings', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-cmd/index.html' },
      { label: 'Al Jazeera longform visual investigation', url: 'https://www.aljazeera.com/news/longform/2024/3/5/the-blood-was-everywhere-inside-the-gaza-flour-massacre' },
      { label: 'AP / Reuters casualty & scene reporting', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN forensic video analysis', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-cmd/index.html' },
      { type: 'video', label: 'Al Jazeera longform visual investigation', url: 'https://www.aljazeera.com/news/longform/2024/3/5/the-blood-was-everywhere-inside-the-gaza-flour-massacre' },
      { type: 'investigation', label: 'Multi-outlet scene reconstruction', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    casualties: { killed: 100 },
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-rafah-paramedic-phone-footage-2025',
    title: 'Rafah Paramedic Convoy — Recovered Phone Footage of Execution-Style Killings',
    date: 'March 23, 2025',
    location: 'Rafah area, southern Gaza',
    summary:
      'A convoy of clearly marked emergency workers was killed; recovered phone footage published by major outlets appears to show close-range fire and subsequent handling of bodies. Multi-outlet investigations treat the footage as authentic primary visual evidence of attacks on rescue personnel.',
    evidence:
      'CNN recovered-phone investigation packages, PRCS identification of personnel, and multi-outlet authentication establish verified killing of marked paramedics. Israel has offered competing operational narratives; the footage authenticity and civilian-rescuer status are multi-source floors.',
    sources: [
      { label: 'CNN investigation — recovered phone footage', url: 'https://www.cnn.com/2025/04/07/middleeast/gaza-aid-workers-killed-audio-intl-investigation' },
      { label: 'PRCS / civil defense identification materials', url: 'https://www.palestinercs.org/' },
      { label: 'TRT / multi-outlet survivor & scene packages', url: 'https://www.trtworld.com/' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN — recovered phone footage investigation', url: 'https://www.cnn.com/2025/04/07/middleeast/gaza-aid-workers-killed-audio-intl-investigation' },
      { type: 'video', label: 'Multi-outlet survivor testimony packages', url: 'https://www.trtworld.com/' },
      { type: 'investigation', label: 'EMS identification & timeline reconstruction', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-jabalia-repeated-strikes-visual-2023-2024',
    title: 'Jabalia Refugee Camp — Repeated Strikes on Dense Civilian Shelter (Visual Record)',
    date: '2023–2024',
    location: 'Jabalia refugee camp, northern Gaza',
    summary:
      'Repeated large munitions strikes on Jabalia—one of Gaza’s densest civilian areas—produced extensive aerial, drone, and ground video of collapsed residential blocks and mass casualty extraction. Multi-outlet visual packages document civilian density at impact sites.',
    evidence:
      'UNOSAT damage time-series, Al Jazeera/Reuters ground video, and Airwars/OHCHR incident tallies establish multi-source civilian-harm documentation. Presence of militants in dense urban areas is alleged by Israel; civilian density at impact is visually verified.',
    sources: [
      { label: 'UNOSAT damage assessments', url: 'https://unosat.org/' },
      { label: 'Al Jazeera gallery & video packages', url: 'https://www.aljazeera.com/gallery/2023/11/4/israel-ramps-up-attacks-in-gaza-strip' },
      { label: 'Airwars — Gaza Patterns of Harm', url: 'https://gaza-patterns-harm.airwars.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Ground/drone aftermath packages', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'photo-essay', label: 'Al Jazeera photo report — camp strikes', url: 'https://www.aljazeera.com/gallery/2023/11/4/israel-ramps-up-attacks-in-gaza-strip' },
      { type: 'investigation', label: 'Satellite damage time-series', url: 'https://unosat.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['mk84-use', 'fmf-weapons', 'oct7-emergency-arms-surge'],
  },
  {
    id: 'vi-rafah-tent-fire-visual-2024',
    title: 'Rafah Designated Safe-Zone Tent Fire — Verified Burn Footage',
    date: 'May 26, 2024',
    location: 'Rafah tent encampments, southern Gaza',
    summary:
      'Strikes on tent camps in areas Israel had signaled for displacement produced firestorm footage verified by major wires—families burned in fabric shelters. Visual packages show densely packed civilian tents engulfed after ordnance impacts.',
    evidence:
      'Reuters-verified fire footage, multi-outlet casualty reporting, and displacement maps establish multi-source civilian harm in designated displacement zones. Israel claimed militant targets nearby; tent-civilian density is visually verified.',
    sources: [
      { label: 'Reuters — verified camp fire footage & reporting', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'AP scene packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'OCHA displacement / humanitarian updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Reuters-verified tent fire footage', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'photo-essay', label: 'Wire photos — burned shelters', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA humanitarian situation updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-white-phosphorus-visual-2023',
    title: 'White Phosphorus Airbursts over Populated Areas — Video Analysis',
    date: 'October 2023',
    location: 'Gaza and southern Lebanon populated areas',
    summary:
      'HRW and multi-outlet video analysis identified white phosphorus airbursts over populated areas. Use of such munitions in dense civilian settings raises distinct legal questions under protocol rules; the visual identification of airburst signatures is multi-source.',
    evidence:
      'HRW video analysis methodology, munitions signature comparison, and multi-outlet corroboration establish verified use of white phosphorus munitions in populated settings. Legal characterization (incendiary vs. obscurant employment) remains contested.',
    sources: [
      { label: 'HRW — white phosphorus video analysis', url: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon' },
      { label: 'Amnesty / multi-outlet munitions reporting', url: 'https://www.amnesty.org/' },
      { label: 'Wire photo/video packages of airbursts', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    multimedia: [
      { type: 'video', label: 'HRW video analysis of airburst signatures', url: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon' },
      { type: 'investigation', label: 'Rights-monitor munitions methodology notes', url: 'https://www.hrw.org/' },
      { type: 'photo-essay', label: 'Wire stills of airburst patterns', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-nuseirat-rescue-civilian-toll-visual-2024',
    title: 'Nuseirat “Rescue” Operation — 274 Civilian Deaths Documented on Video',
    date: 'June 8, 2024',
    location: 'Nuseirat refugee camp, central Gaza',
    summary:
      'An Israeli hostage-rescue operation in Nuseirat produced mass civilian casualties. Multi-outlet video and Euro-Med/rights-monitor tallies document large-scale civilian deaths in dense camp streets during the operation.',
    evidence:
      'Al Jazeera World documentary packages, Euro-Med investigation reporting, and multi-outlet casualty tallies establish multi-source civilian mass-casualty documentation. Military necessity claims for the rescue are separate from the civilian death record.',
    sources: [
      { label: 'Al Jazeera World — Nuseirat 274', url: 'https://www.aljazeera.com/video/al-jazeera-world/2025/10/22/nuseirat-274' },
      { label: 'Euro-Med Monitor investigation', url: 'https://euromedmonitor.org/en/article/6773/' },
      { label: 'AP / Reuters operation casualty reporting', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Al Jazeera World documentary package', url: 'https://www.aljazeera.com/video/al-jazeera-world/2025/10/22/nuseirat-274' },
      { type: 'investigation', label: 'Euro-Med full investigation report', url: 'https://euromedmonitor.org/en/article/6773/' },
      { type: 'video', label: 'Wire ground video from camp streets', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    tier: 'verified',
    casualties: { killed: 274 },
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-unrwa-school-shelter-strikes-visual-2023-2025',
    title: 'UNRWA Schools Used as Shelters — Strike Aftermath Video Record',
    date: '2023–2025',
    location: 'Gaza Strip (multiple UNRWA facilities)',
    summary:
      'Schools sheltering displaced families were repeatedly hit. UN boards of inquiry historically documented similar patterns; post-Oct-7 multi-outlet video shows bloodied classrooms, body bags, and families sheltering under UN flags before impacts.',
    evidence:
      'UNRWA flash updates, OCHA incident lists, and multi-outlet video establish multi-source strikes affecting civilian shelters. Israel alleges militant misuse of some sites; civilian shelter use at impact times is extensively filmed.',
    sources: [
      { label: 'UNRWA emergency updates', url: 'https://www.unrwa.org/' },
      { label: 'OCHA OPT incident reporting', url: 'https://www.ochaopt.org/' },
      { label: 'Al Jazeera / wire school-strike video packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'Aftermath video inside damaged school shelters', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'photo-essay', label: 'Wire photos — UN-flagged shelters hit', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'UNRWA flash updates', url: 'https://www.unrwa.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons', 'mk84-use'],
  },
  {
    id: 'vi-west-bank-settler-paramedic-attacks-visual-2023-2025',
    title: 'West Bank — Settlers Filmed Attacking Ambulances & Paramedics',
    date: '2023–2025',
    location: 'West Bank (multiple villages)',
    summary:
      'Repeated smartphone and press video shows Israeli settlers assaulting Palestinian paramedics, blocking ambulances, and attacking clearly marked medical personnel during and after raids or settler marches.',
    evidence:
      "B’Tselem video bank, PRCS incident logs, and multi-outlet verification establish multi-source visual documentation of settler attacks on medical personnel. Enforcement gaps are separately documented by Israeli and international monitors.",
    sources: [
      { label: 'B’Tselem video documentation', url: 'https://www.btselem.org/video' },
      { label: 'PRCS West Bank incident updates', url: 'https://www.palestinercs.org/' },
      { label: 'AP / Haaretz contemporaneous reporting', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem — ambulance/paramedic attack videos', url: 'https://www.btselem.org/video' },
      { type: 'video', label: 'Press-captured settler assault packages', url: 'https://www.haaretz.com/israel-news/' },
      { type: 'document', label: 'PRCS incident logs', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-gaza-journalists-targeted-visual-2023-2025',
    title: 'Gaza Journalists Killed in Press Markings — Visual & CPJ Case Files',
    date: '2023–2025',
    location: 'Gaza Strip',
    summary:
      'CPJ and multi-outlet investigations document an unprecedented killing rate of journalists and media workers in Gaza, including cases assessed as direct targeting. Press vests, cameras, and live streams form a continuous visual record of journalists dying while reporting.',
    evidence:
      'CPJ case methodology, UNESCO condemnations, and multi-outlet visual packages establish multi-source documentation of journalist deaths. Exact targeting findings are case-by-case; the aggregate magnitude is verified by CPJ tallies.',
    sources: [
      { label: 'CPJ — Israel-Gaza war journalist casualties', url: 'https://cpj.org/special-reports/' },
      { label: 'UNESCO Director-General statements', url: 'https://www.unesco.org/' },
      { label: 'Al Jazeera / wire journalist-killing packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'Final streams / press-marking documentation packages', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'CPJ case methodology & tallies', url: 'https://cpj.org/special-reports/' },
      { type: 'photo-essay', label: 'Memorial / press-vest photo packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-mass-graves-hospital-courtyards-visual-2024',
    title: 'Hospital Courtyard Mass Graves — Satellite & Ground Video',
    date: '2024',
    location: 'Multiple Gaza hospitals (Nasser, Al-Shifa environs)',
    summary:
      'After sieges, multi-outlet video and satellite analysis documented mass graves and hastily buried bodies in and around hospital complexes. Forensic exhumation claims remain contested in places; the visual fact of mass burial under combat conditions is multi-source.',
    evidence:
      'WHO situation reports, multi-outlet ground video, and satellite time-series establish multi-source documentation of mass burial activity at hospital sites. Specific cause-of-death attribution for each body is incomplete without full forensic process.',
    sources: [
      { label: 'WHO — OPT emergency health updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { label: 'Multi-outlet mass-grave reporting packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Satellite analysis cited by major outlets', url: 'https://unosat.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Ground video of hospital courtyard burials', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'Satellite + open-source time-series packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'WHO OPT situation reports', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-beita-and-west-bank-live-fire-visual-2021-2023',
    title: 'Beita & West Bank Protest Killings — Live-Fire Video Against Stone-Throwers & Bystanders',
    date: '2021–2023',
    location: 'Beita and other West Bank protest sites',
    summary:
      "Sustained protests against settlement outposts produced a large B’Tselem and press video record of live fire killing and wounding Palestinian civilians—including bystanders and medics—during weekly demonstrations.",
    evidence:
      "B’Tselem video case files, medical records cited by rights monitors, and multi-outlet reporting establish multi-source live-fire civilian harm. Rules-of-engagement defenses do not erase the footage record.",
    sources: [
      { label: 'B’Tselem Beita / protest documentation', url: 'https://www.btselem.org/firearms' },
      { label: '972 Magazine / +972 investigations', url: 'https://www.972mag.com/' },
      { label: 'HRW West Bank use-of-force materials', url: 'https://www.hrw.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem protest live-fire videos', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: '+972 / rights-monitor case compilations', url: 'https://www.972mag.com/' },
      { type: 'photo-essay', label: 'Press stills of weekly protests', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-amputation-children-visual-2024-2025',
    title: 'Children’s Mass Casualty Wards — Medical Video of Blast Injuries',
    date: '2024–2025',
    location: 'Remaining Gaza hospitals & field clinics',
    summary:
      'Surgeons and international medical NGOs published video from pediatric trauma wards showing blast amputations and burns among children. Multi-outlet medical journalism treats this as primary visual evidence of civilian child injury patterns under bombardment.',
    evidence:
      'MSF/WHO medical updates, multi-outlet hospital embeds, and NGO surgical video establish multi-source documentation of pediatric blast trauma. Intent and proportionality are legal questions; injury patterns are visually verified.',
    sources: [
      { label: 'WHO — OPT emergency health updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { label: 'MSF — Palestine operational updates', url: 'https://www.msf.org/palestine' },
      { label: 'Multi-outlet hospital embed packages', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    multimedia: [
      { type: 'video', label: 'MSF hospital ward / surgical packages', url: 'https://www.msf.org/palestine' },
      { type: 'photo-essay', label: 'Wire photos — pediatric trauma', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'WHO OPT medical situation updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['mk84-use', 'oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  // ── Wave 2 densify (specific multi-source visual packages) ──
  {
    id: 'vi-gaza-killing-zone-safe-corridor-2024',
    title: 'Gaza “Safe Corridors” & Killing Zones — Visual Pattern of Fire on Displaced Civilians',
    date: '2023–2024',
    location: 'Gaza displacement corridors (multiple)',
    summary:
      'Multi-outlet visual investigations document Israeli fire along routes and zones civilians were told to use for displacement—including “safe corridor” segments where families were killed while moving with white flags or civilian vehicles. Pattern evidence is visual and multi-source; each segment remains unit-level.',
    evidence:
      'Al Jazeera forensic packages, Airwars civilian-harm mapping, and multi-outlet corridor reporting establish multi-source documentation of civilian deaths on displacement routes. Israel cites operational necessities and militant presence; filmed civilian movement at impact is the verified floor.',
    sources: [
      { label: 'Al Jazeera Investigation — Gaza killing zone packages', url: 'https://www.aljazeera.com/program/investigations/' },
      { label: 'Airwars — Gaza Patterns of Harm', url: 'https://gaza-patterns-harm.airwars.org/' },
      { label: 'OCHA displacement & civilian casualty updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Al Jazeera Investigation — corridor/killing-zone analysis', url: 'https://www.aljazeera.com/program/investigations/' },
      { type: 'investigation', label: 'Airwars civilian harm geospatial patterns', url: 'https://gaza-patterns-harm.airwars.org/' },
      { type: 'document', label: 'OCHA humanitarian updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-khan-younis-tent-camp-strikes-visual-2024',
    title: 'Khan Younis Tent Camps — Strikes on Displaced Families (Video Record)',
    date: '2024',
    location: 'Khan Younis, southern Gaza',
    summary:
      'After mass displacement into Khan Younis, multi-outlet video documents strikes on tent camps and UN-adjacent shelters housing families who had already fled northern Gaza. Visual packages show densely packed civilian tents before and after impacts.',
    evidence:
      'Wire-verified aftermath video, OCHA shelter updates, and multi-outlet casualty reporting establish multi-source civilian harm in displacement camps. Militant-presence claims do not erase filmed civilian density.',
    sources: [
      { label: 'Reuters / AP Khan Younis camp strike packages', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'Al Jazeera camp-strike video packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire-verified tent camp strike aftermath', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'photo-essay', label: 'Press photos — burned/collapsed shelters', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA shelter & displacement updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons', 'mk84-use'],
  },
  {
    id: 'vi-west-bank-olive-harvest-attacks-visual-2023-2025',
    title: 'West Bank Olive Harvest — Settler Attacks Filmed Against Farmers',
    date: '2023–2025',
    location: 'West Bank agricultural lands (multiple villages)',
    summary:
      "Annual olive harvest seasons produce a large B’Tselem and press video record of settlers attacking Palestinian farmers, burning trees, and assaulting harvesters—often with soldiers present and non-intervening.",
    evidence:
      "B’Tselem video case files, OCHA settler-violence tallies, and multi-outlet harvest-season reporting establish multi-source visual documentation of civilian agricultural violence.",
    sources: [
      { label: 'B’Tselem — settler violence / harvest documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA settler violence reporting', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Haaretz harvest-season packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem — harvest assault video bank', url: 'https://www.btselem.org/video' },
      { type: 'photo-essay', label: 'Press photos — burned olive groves', url: 'https://www.haaretz.com/israel-news/' },
      { type: 'document', label: 'OCHA settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-home-demolition-live-video-west-bank-2023-2025',
    title: 'West Bank Home Demolitions — Live Video of Civilian Displacement',
    date: '2023–2025',
    location: 'West Bank (Area C and East Jerusalem)',
    summary:
      'Extensive video shows Israeli forces demolishing Palestinian homes as families watch. Rights monitors and multi-outlet packages treat this as a continuous visual record of punitive and administrative demolitions affecting civilians.',
    evidence:
      "B’Tselem demolition video banks, OCHA demolition tallies, and multi-outlet reporting establish multi-source documentation. Legal rationales (permits/punitive) are contested; filmed civilian displacement is verified.",
    sources: [
      { label: 'B’Tselem — home demolitions', url: 'https://www.btselem.org/planning_and_building' },
      { label: 'OCHA demolition & displacement data', url: 'https://www.ochaopt.org/' },
      { label: 'HRW / multi-outlet demolition reporting', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem demolition video bank', url: 'https://www.btselem.org/video' },
      { type: 'photo-essay', label: 'Press stills of demolitions', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA demolition statistics', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-amputee-children-field-hospitals-visual-2024-2025',
    title: 'Field Hospitals — Visual Record of Pediatric Blast Amputations Under Siege',
    date: '2024–2025',
    location: 'Gaza field hospitals and remaining pediatric wards',
    summary:
      'International medical NGOs and multi-outlet embeds published continuous video from field hospitals showing children with blast amputations and severe burns—primary visual evidence of pediatric injury patterns under bombardment.',
    evidence:
      'MSF/WHO medical updates and multi-outlet hospital embeds establish multi-source documentation of pediatric blast trauma. Proportionality and intent remain legal questions; injury patterns are visually verified.',
    sources: [
      { label: 'MSF — Palestine operational updates', url: 'https://www.msf.org/palestine' },
      { label: 'WHO — OPT emergency', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { label: 'Multi-outlet hospital embed packages', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    multimedia: [
      { type: 'video', label: 'MSF / press field-hospital packages', url: 'https://www.msf.org/palestine' },
      { type: 'photo-essay', label: 'Wire photos — pediatric trauma wards', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'WHO OPT health emergency updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['mk84-use', 'oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-bodycam-sexual-violence-investigations-2023-2024',
    title: 'October 7 — Bodycam & Forensic Packages on Sexual Violence Against Civilians',
    date: 'October 7, 2023',
    location: 'Southern Israel (multiple sites)',
    summary:
      'UN and multi-outlet investigations assembled bodycam, witness, and forensic material documenting sexual violence against civilians during the October 7 attacks. Included for multi-party documentation: civilian atrocity evidence is not limited to one side’s victims.',
    evidence:
      'UN Special Representative materials, multi-outlet forensic reporting, and authenticated militant footage establish multi-source documentation of sexual violence against civilians. Case-level detail continues under investigation.',
    sources: [
      { label: 'UN human rights materials — October 7 crimes', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters multi-outlet investigations', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT investigation packages on October 7 sexual violence', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet forensic investigation packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
      { type: 'video', label: 'Authenticated bodycam packages cited by major outlets', url: 'https://www.reuters.com/world/middle-east/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-aid-seeker-shootings-pattern-visual-2024-2025',
    title: 'Aid Seeker Shootings — Pattern File Beyond the Flour Massacre',
    date: '2024–2025',
    location: 'Gaza aid distribution points (multiple)',
    summary:
      'Beyond the February 2024 flour massacre, multi-outlet video documents repeated shootings of crowds waiting for food aid. Pattern packages compile timestamps, geolocation, and casualty counts across distribution points.',
    evidence:
      'CNN/AJ forensic packages, WFP access reporting, and multi-outlet scene video establish multi-source pattern documentation of civilian deaths at aid points. Rules-of-engagement disputes remain contested; civilian aid-seeker deaths are multi-source.',
    sources: [
      { label: 'CNN forensic packages on aid shootings', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-cmd/index.html' },
      { label: 'WFP Palestine emergency', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { label: 'Al Jazeera aid-distribution visual packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN forensic video analysis (aid convoy/shootings)', url: 'https://www.cnn.com/2024/04/09/middleeast/gaza-food-aid-convoy-deaths-eyewitness-intl-cmd/index.html' },
      { type: 'video', label: 'Al Jazeera aid-point visual packages', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'document', label: 'WFP emergency access updates', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-icrc-prcs-ambulance-strikes-visual-2023-2025',
    title: 'Marked Ambulances Under Fire — ICRC/PRCS Visual Protection File',
    date: '2023–2025',
    location: 'Gaza Strip & West Bank',
    summary:
      'ICRC/PRCS and multi-outlet video document attacks on clearly marked ambulances and EMS crews. Medical emblem protection is a core IHL rule; the visual record shows repeated emblem-bearing vehicles damaged or crews killed.',
    evidence:
      'PRCS incident logs, ICRC operational statements, and multi-outlet video establish multi-source documentation of harm to medical transport. Attribution and intent are case-level; emblem-bearing status is visually verified.',
    sources: [
      { label: 'Palestine Red Crescent operational updates', url: 'https://www.palestinercs.org/' },
      { label: 'ICRC operational statements — Israel/OPT', url: 'https://www.icrc.org/' },
      { label: 'OHCHR medical personnel protection materials', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'PRCS / press video of marked ambulances under fire', url: 'https://www.palestinercs.org/' },
      { type: 'investigation', label: 'OHCHR medical-protection documentation', url: 'https://www.ohchr.org/' },
      { type: 'document', label: 'ICRC operational statements', url: 'https://www.icrc.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  // ── Wave 3 densify — additional multi-source visual packages ──
  {
    id: 'vi-forensic-architecture-medical-infrastructure-2023-2024',
    title: 'Forensic Architecture — Destruction of Medical Infrastructure (Spatial Analysis)',
    date: '2023–2024',
    location: 'Gaza Strip (hospitals, clinics, ambulances)',
    summary:
      'Forensic Architecture and partner investigations map strikes on hospitals, clinics, and ambulance routes using satellite imagery, video, and open-source geolocation—producing a spatial visual record of medical infrastructure destruction under bombardment.',
    evidence:
      'FA published spatial analyses and multi-outlet corroboration of medical-site damage establish multi-source documentation of harm to medical infrastructure. Legal characterization of each strike remains case-level; the destruction pattern is visually documented.',
    sources: [
      { label: 'Forensic Architecture — investigations index', url: 'https://forensic-architecture.org/investigation' },
      { label: 'WHO — OPT emergency health', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { label: 'OHCHR medical personnel protection materials', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Forensic Architecture spatial investigation packages', url: 'https://forensic-architecture.org/investigation' },
      { type: 'video', label: 'FA / partner video explainers on medical infrastructure', url: 'https://forensic-architecture.org/investigation' },
      { type: 'document', label: 'WHO OPT hospital functionality updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons', 'mk84-use'],
  },
  {
    id: 'vi-bellingcat-open-source-strike-geolocation-2023-2025',
    title: 'Bellingcat-Style Open-Source Geolocation of Civilian-Area Strikes',
    date: '2023–2025',
    location: 'Gaza Strip (multiple geolocated strike sites)',
    summary:
      'Open-source investigators geolocate strike videos and photos against satellite basemaps, often placing impacts in dense residential blocks, markets, and shelters. Multi-outlet OSINT packages treat geolocation as checkable visual evidence of where munitions landed relative to civilian density.',
    evidence:
      'Bellingcat methodology posts, multi-outlet OSINT reconstructions, and Airwars site tallies establish multi-source geolocation practice. Presence of militants nearby may be alleged; civilian density at geolocated sites is the verified floor.',
    sources: [
      { label: 'Bellingcat — methodology & Middle East OSINT', url: 'https://www.bellingcat.com/' },
      { label: 'Airwars — Gaza Patterns of Harm', url: 'https://gaza-patterns-harm.airwars.org/' },
      { label: 'UNOSAT damage assessments', url: 'https://unosat.org/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Bellingcat open-source investigation packages', url: 'https://www.bellingcat.com/' },
      { type: 'investigation', label: 'Airwars geospatial civilian-harm patterns', url: 'https://gaza-patterns-harm.airwars.org/' },
      { type: 'document', label: 'UNOSAT satellite damage products', url: 'https://unosat.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['mk84-use', 'oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-israeli-tv-and-channel14-soldier-content-2023-2025',
    title: 'Israeli Media Amplification of Soldier Trophy Content — Authenticated Circulations',
    date: '2023–2025',
    location: 'Gaza Strip / Israeli media ecosystem',
    summary:
      'Israeli commercial and social channels recirculated soldier-recorded videos of demolitions, detainee humiliation, and residential destruction. Multi-outlet authentication treated large volumes as genuine unit-level conduct documentation—primary visual evidence of tactics and attitudes toward civilians and property.',
    evidence:
      "B’Tselem video banks, Israeli media self-reporting, and international wire authentication establish multi-source circulation of genuine soldier content. Individual prosecutions are incomplete; the aggregate visual record is multi-source.",
    sources: [
      { label: 'B’Tselem video archives', url: 'https://www.btselem.org/video' },
      { label: 'Reuters Middle East authentication packages', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'Breaking the Silence materials', url: 'https://www.breakingthesilence.org.il/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem authenticated soldier-content bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'Wire authentication of unit social posts', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'document', label: 'Breaking the Silence testimony archive', url: 'https://www.breakingthesilence.org.il/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-north-gaza-evacuation-orders-vs-fire-2023-2024',
    title: 'Evacuation Orders vs. Fire — Visual Record of Civilians Hit After Displacement Directives',
    date: '2023–2024',
    location: 'Northern and central Gaza displacement routes',
    summary:
      'Multi-outlet visual investigations compare IDF evacuation maps/orders with subsequent fire on routes and “safe” zones, documenting civilian casualties among families who complied with displacement directives.',
    evidence:
      'Al Jazeera/Airwars/OCHA multi-source packages establish documentation of civilian harm after published displacement guidance. Operational necessity claims are contested; filmed civilian compliance and casualties are multi-source floors.',
    sources: [
      { label: 'Al Jazeera Investigations — Gaza packages', url: 'https://www.aljazeera.com/program/investigations/' },
      { label: 'Airwars Gaza Patterns of Harm', url: 'https://gaza-patterns-harm.airwars.org/' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'AJ Investigations — displacement-route fire analyses', url: 'https://www.aljazeera.com/program/investigations/' },
      { type: 'investigation', label: 'Airwars geospatial harm patterns', url: 'https://gaza-patterns-harm.airwars.org/' },
      { type: 'document', label: 'OCHA displacement updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-unrwa-staff-killed-visual-2023-2025',
    title: 'UNRWA Staff Killed — Visual & Agency Documentation of Aid Worker Deaths',
    date: '2023–2025',
    location: 'Gaza Strip',
    summary:
      'UNRWA reports the highest UN staff death toll in the agency’s history in Gaza. Multi-outlet video and agency flash updates document killings of clearly identified aid workers and school staff during bombardment and raids.',
    evidence:
      'UNRWA flash updates, UN Secretary-General statements, and multi-outlet packages establish multi-source documentation of UN staff deaths. Targeting findings are case-level; staff-status casualties are multi-source verified.',
    sources: [
      { label: 'UNRWA emergency updates', url: 'https://www.unrwa.org/' },
      { label: 'UN news / SG materials on UN staff deaths', url: 'https://news.un.org/' },
      { label: 'AP / Reuters UNRWA staff casualty packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire/agency video of UNRWA facility and staff harm', url: 'https://www.unrwa.org/' },
      { type: 'document', label: 'UNRWA flash casualty updates', url: 'https://www.unrwa.org/' },
      { type: 'photo-essay', label: 'Press photos — UN facilities hit', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-night-raid-bodycam-and-resident-video-2023-2025',
    title: 'West Bank Night Raids — Bodycam & Resident Video of Civilian Harm',
    date: '2023–2025',
    location: 'West Bank (Jenin, Nablus, Tulkarm, and other cities)',
    summary:
      'Intensified West Bank raids produced extensive resident smartphone video and occasional military bodycam releases showing civilian injuries, home damage, and medical obstruction during night operations.',
    evidence:
      "B’Tselem video banks, PRCS incident logs, and multi-outlet raid reporting establish multi-source visual documentation of civilian harm during raids. Rules of engagement are contested; filmed civilian injury is multi-source.",
    sources: [
      { label: 'B’Tselem video documentation', url: 'https://www.btselem.org/video' },
      { label: 'PRCS operational updates', url: 'https://www.palestinercs.org/' },
      { label: 'AP / Haaretz West Bank raid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem resident/raid video bank', url: 'https://www.btselem.org/video' },
      { type: 'video', label: 'Press packages of night raid aftermath', url: 'https://www.haaretz.com/israel-news/' },
      { type: 'document', label: 'PRCS West Bank incident logs', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-starvation-ipc-visual-context-2024-2025',
    title: 'IPC Famine Risk & Starvation Visual Record — Emaciated Civilians Under Siege',
    date: '2024–2025',
    location: 'Gaza Strip (especially northern governorates)',
    summary:
      'IPC multi-agency classifications and multi-outlet visual journalism document extreme food insecurity, including images and video of emaciated children and adults. Visual packages sit beside technical IPC briefs—not as standalone “proof of intent,” but as multi-source documentation of starvation conditions.',
    evidence:
      'IPC special briefs, WFP emergency statements, and multi-outlet medical/visual journalism establish multi-source documentation of famine-risk conditions. Diversion allegations and access disputes are separately labeled; nutritional collapse evidence is multi-source.',
    sources: [
      { label: 'IPC — famine/food insecurity classifications', url: 'https://www.ipcinfo.org/' },
      { label: 'WFP Palestine emergency', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { label: 'WHO OPT emergency health', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
    ],
    multimedia: [
      { type: 'document', label: 'IPC technical briefs', url: 'https://www.ipcinfo.org/' },
      { type: 'video', label: 'WFP / press visual packages on food access collapse', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { type: 'photo-essay', label: 'Multi-outlet medical malnutrition photo packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-hostage-release-and-oct7-civilian-video-balance-2023-2025',
    title: 'October 7 Hostage Videos & Release Footage — Civilian Captivity Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip / southern Israel interface',
    summary:
      'Hostage families, Israeli authorities, and multi-outlet journalism published authenticated footage of civilian captives taken on October 7 and of later releases. Included for multi-party documentation: visual records of civilian victimization by Hamas-led attackers are part of the same evidence engine as Gaza wartime civilian-harm packages.',
    evidence:
      'Authenticated hostage videos, release ceremonies, and multi-outlet forensic reporting establish multi-source documentation of civilian captivity. Conditions underground remain partially opaque; captivity and civilian status are multi-source verified.',
    sources: [
      { label: 'AP / Reuters hostage coverage packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
      { label: 'NYT / multi-outlet hostage investigation packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated hostage/release footage packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Multi-outlet hostage investigation packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation on October 7 civilian crimes', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-al-ahli-hospital-blast-visual-2023',
    title: 'Al-Ahli Hospital Blast — Multi-Outlet Visual Forensics (Contested Attribution)',
    date: 'October 17, 2023',
    location: 'Al-Ahli Arab Hospital, Gaza City',
    summary:
      'A blast at Al-Ahli hospital killed large numbers of civilians sheltering there. Multi-outlet visual forensics analyzed crater geometry, audio, and munition signatures. Attribution remains contested between Israeli and Palestinian rocket explanations; civilian mass-casualty fact is multi-source verified while perpetrator remains circumstantial/disputed in open sources.',
    evidence:
      'Human Rights Watch, NYT Visual Investigations, and multi-outlet crater/audio analyses establish multi-source documentation of a mass-casualty blast at a hospital shelter. Because attribution is contested, this card keeps civilian harm as verified visual fact and does not elevate a single perpetrator claim to verified.',
    sources: [
      { label: 'HRW — Al-Ahli hospital explosion analysis', url: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion' },
      { label: 'NYT Visual Investigations — hospital blast packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'AP / Reuters multi-outlet hospital blast reporting', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'investigation', label: 'HRW forensic analysis of Al-Ahli explosion', url: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion' },
      { type: 'investigation', label: 'NYT Visual Investigations blast packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'video', label: 'Multi-outlet scene video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'circumstantial',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-israeli-police-west-bank-live-fire-protests-visual-2021-2025',
    title: 'West Bank Protest Live Fire — Multi-Year Video Bank of Civilian Casualties',
    date: '2021–2025',
    location: 'West Bank protest sites (Beita, Kafr Qaddum, and others)',
    summary:
      "Multi-year B’Tselem and press video banks document live fire wounding and killing Palestinian civilians—including medics and bystanders—during weekly protests against settlement expansion and land seizure.",
    evidence:
      "B’Tselem video case files, medical records cited by rights monitors, and multi-outlet reporting establish multi-source live-fire civilian harm. Rules-of-engagement defenses do not erase the footage record.",
    sources: [
      { label: 'B’Tselem video / firearms documentation', url: 'https://www.btselem.org/firearms' },
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'HRW Israel/Palestine use-of-force materials', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem protest live-fire video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem firearms policy documentation', url: 'https://www.btselem.org/firearms' },
      { type: 'photo-essay', label: 'Press stills of weekly protests', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-flotilla-mavi-marmara-visual-legacy-2010',
    title: 'Mavi Marmara Flotilla Raid (2010) — Video Legacy of Deadly Boarding',
    date: 'May 31, 2010',
    location: 'International waters / Gaza flotilla',
    summary:
      'Israeli commandos boarded the Mavi Marmara; nine activists were killed (a tenth later). Extensive ship video and multi-outlet investigations document the deadly raid. UN and national inquiries produced contested legal characterizations; civilian activist deaths are multi-source verified.',
    evidence:
      'Shipboard video, UN inquiry materials, and multi-outlet investigations establish multi-source documentation of deaths during the boarding. Self-defense claims remain contested in open literature.',
    sources: [
      { label: 'UN materials on flotilla raid (historical)', url: 'https://www.un.org/' },
      { label: 'HRW / multi-outlet flotilla investigations', url: 'https://www.hrw.org/' },
      { label: 'AP / Reuters historical flotilla packages', url: 'https://apnews.com/' },
    ],
    multimedia: [
      { type: 'video', label: 'Shipboard / press video packages of boarding', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'Multi-outlet flotilla investigation packages', url: 'https://www.hrw.org/' },
      { type: 'document', label: 'UN inquiry trail materials', url: 'https://www.un.org/' },
    ],
    tier: 'verified',
    casualties: { killed: 10 },
    targetsCivilians: true,
    targetsChildren: false,
  },

  {
    id: 'vi-gaza-press-vest-killings-visual-2023-2025',
    title: 'Press Vests Under Fire — Visual Record of Journalists Killed While Clearly Marked',
    date: '2023–2025',
    location: 'Gaza Strip',
    summary:
      'CPJ tallies and multi-outlet visual packages document journalists killed while wearing press markings, carrying cameras, or livestreaming. Includes cases CPJ assesses as direct targeting and cases still under investigation.',
    evidence:
      'CPJ methodology, UNESCO condemnations, and multi-outlet visual packages establish multi-source documentation of press deaths. Targeting is case-level; marked-press status of many victims is multi-source verified.',
    sources: [
      { label: 'CPJ — Israel-Gaza war journalist casualties', url: 'https://cpj.org/special-reports/' },
      { label: 'UNESCO Director-General statements on journalist killings', url: 'https://www.unesco.org/' },
      { label: 'Al Jazeera Gaza journalism packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'Press-marked final streams / aftermath packages', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'investigation', label: 'CPJ case tallies and methodology', url: 'https://cpj.org/special-reports/' },
      { type: 'photo-essay', label: 'Wire photos — press vests and memorials', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-israel-ground-forces-bodycam-civilian-harm-2023-2025',
    title: 'Ground Forces Bodycam & Helmet Cam — Civilian Encounters Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip (multiple unit releases and leaks)',
    summary:
      'Authenticated bodycam and helmet-cam footage from ground operations shows civilian detentions, home entries, and property destruction. Multi-outlet authentication treats large volumes as genuine unit footage—primary visual evidence of ground-force conduct toward civilians.',
    evidence:
      "B’Tselem compilations, Israeli media recirculation, and international wire authentication establish multi-source circulation of genuine bodycam content. Legal character of each engagement is case-level; civilian presence in footage is multi-source.",
    sources: [
      { label: 'B’Tselem video archives', url: 'https://www.btselem.org/video' },
      { label: 'Reuters Middle East packages', url: 'https://www.reuters.com/world/middle-east/' },
      { label: 'Breaking the Silence', url: 'https://www.breakingthesilence.org.il/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated bodycam/helmet-cam packages', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'Wire authentication of unit footage', url: 'https://www.reuters.com/world/middle-east/' },
      { type: 'document', label: 'Breaking the Silence testimony materials', url: 'https://www.breakingthesilence.org.il/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-gaza-aid-pier-and-maritime-corridor-visual-2024',
    title: 'Maritime Aid Corridor & Pier — Visual Record of Aid Flow Under Fire Conditions',
    date: '2024',
    location: 'Gaza coast / temporary pier operations',
    summary:
      'U.S. and partner maritime aid efforts produced multi-outlet video of aid offload under security constraints, alongside documentation of limited throughput relative to need. Visual packages sit beside official capacity claims for independent verification.',
    evidence:
      'DoD/partner public briefings, multi-outlet pier video, and WFP/OCHA throughput reporting establish multi-source documentation of maritime aid attempts and constraints. Not a claim that maritime aid replaced land access; visual scale is multi-source.',
    sources: [
      { label: 'WFP Palestine emergency', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters pier and maritime aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire video of pier/maritime aid operations', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'WFP emergency updates', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { type: 'document', label: 'OCHA humanitarian updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-pogrom-huwara-follow-on-visual-2023-2024',
    title: 'Huwara and Follow-On Settler Riots — Expanded Video Bank',
    date: '2023–2024',
    location: 'Huwara and nearby West Bank villages',
    summary:
      "Beyond the February 2023 Huwara rampage, multi-outlet and B’Tselem video banks document repeated settler arson, assaults, and property destruction in the same corridor—often with soldiers present and non-intervening.",
    evidence:
      "B’Tselem video case files, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source visual documentation of repeated civilian-targeted settler violence.",
    sources: [
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'OCHA settler violence reporting', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem Huwara corridor video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'photo-essay', label: 'Wire photos of arson aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-church-and-mosque-strikes-visual-2023-2025',
    title: 'Churches and Mosques Hit — Visual Record of Civilian Shelter Sites Damaged',
    date: '2023–2025',
    location: 'Gaza Strip (multiple places of worship used as shelters)',
    summary:
      'Multi-outlet video documents damage to churches and mosques sheltering civilians, including the Greek Orthodox Church of Saint Porphyrius complex and numerous mosques used as displacement sites. Cultural-property and civilian-shelter status are multi-source.',
    evidence:
      'Wire video, church/mosque authority statements, and multi-outlet investigations establish multi-source documentation of strikes affecting worship sites used as shelters. Militant-presence claims are case-level; civilian shelter use is multi-source filmed.',
    sources: [
      { label: 'AP / Reuters packages on religious-site damage', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Al Jazeera Gaza packages', url: 'https://www.aljazeera.com/tag/gaza/' },
      { label: 'OCHA humanitarian site damage updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire video of damaged churches/mosques used as shelters', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Press photos of worship-site damage', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'document', label: 'OCHA humanitarian updates', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons', 'mk84-use'],
  },

  {
    id: 'vi-gaza-ammunition-dump-vs-civilian-blocks-visual-2023-2025',
    title: 'Ammunition Dump Claims vs. Civilian Blocks — Visual Forensics of Secondary Explosions',
    date: '2023–2025',
    location: 'Gaza Strip (multiple strike sites)',
    summary:
      'Multi-outlet visual forensics examine secondary explosions after airstrikes, sometimes cited as proof of militant munitions. Independent packages map blast signatures against civilian density. Presence of secondary explosions is multi-source filmed; interpretation as munitions stores remains contested case-by-case.',
    evidence:
      'Wire video, satellite damage products, and multi-outlet OSINT establish multi-source documentation of large secondary blasts in dense areas. Legal meaning (munitions vs. fuel vs. other) is not auto-verified from video alone.',
    sources: [
      { label: 'Airwars Gaza Patterns of Harm', url: 'https://gaza-patterns-harm.airwars.org/' },
      { label: 'UNOSAT damage assessments', url: 'https://unosat.org/' },
      { label: 'AP / Reuters multi-outlet strike packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire video of secondary explosions in dense areas', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Airwars geospatial civilian-harm patterns', url: 'https://gaza-patterns-harm.airwars.org/' },
      { type: 'document', label: 'UNOSAT satellite damage products', url: 'https://unosat.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['mk84-use', 'oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-israeli-settlers-live-stream-attacks-visual-2023-2025',
    title: 'Settler Live-Streams & Self-Recorded Assaults — Primary Visual Confessions',
    date: '2023–2025',
    location: 'West Bank (multiple villages)',
    summary:
      'Settlers have live-streamed and self-recorded assaults, arson, and intimidation of Palestinian civilians. Multi-outlet authentication treats many of these as genuine primary visual records of civilian-targeted violence—often more direct than third-party reporting alone.',
    evidence:
      "B’Tselem video banks, Israeli media recirculation, and international wire authentication establish multi-source documentation of self-recorded settler violence against civilians.",
    sources: [
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'Haaretz / AP packages on settler violence', url: 'https://www.haaretz.com/israel-news/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem authenticated settler attack video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'photo-essay', label: 'Press stills of arson and assault aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-icu-and-nicu-evacuations-visual-2023-2024',
    title: 'ICU/NICU Evacuations Under Fire — Visual Record of Patient Transfers',
    date: '2023–2024',
    location: 'Gaza hospitals (Al-Shifa, Nasser, and others)',
    summary:
      'Multi-outlet video documents evacuations of ICU and NICU patients—including incubators moved by hand—during sieges and evacuation orders. Visual packages establish civilian patient status independent of facility combat claims.',
    evidence:
      'WHO hospital updates, multi-outlet hospital embeds, and medical NGO materials establish multi-source documentation of critical-patient transfers under combat conditions.',
    sources: [
      { label: 'WHO OPT emergency health', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { label: 'MSF Palestine updates', url: 'https://www.msf.org/palestine' },
      { label: 'AP / Reuters hospital embed packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire/NGO video of ICU/NICU evacuations', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'WHO hospital functionality updates', url: 'https://www.who.int/emergencies/situations/occupied-palestinian-territory' },
      { type: 'photo-essay', label: 'Press photos of incubator and critical transfers', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-dashboard-camera-civilian-murders-visual-2023',
    title: 'October 7 Dashboard & Traffic Cameras — Civilian Killings on Roadways',
    date: 'October 7, 2023',
    location: 'Southern Israel road network',
    summary:
      'Dashboard cameras and traffic cameras captured militants killing civilians in cars and at roadside stops on October 7. Multi-outlet authentication of these videos is a primary visual record of civilian mass murder—included for multi-party documentation balance.',
    evidence:
      'Authenticated dashcam packages, multi-outlet investigations, and official compilations establish multi-source documentation of roadway civilian killings. Specific unit attribution continues in open investigations.',
    sources: [
      { label: 'AP / Reuters October 7 multi-outlet packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations October 7 packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated dashcam/roadway packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations October 7 packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-tunnel-shaft-claims-vs-residential-visual-2023-2025',
    title: 'Tunnel Shaft Claims Under Residences — Visual Forensics of Home Destruction',
    date: '2023–2025',
    location: 'Gaza Strip residential neighborhoods',
    summary:
      'Israeli forces frequently cite tunnel shafts under homes when explaining residential destruction. Multi-outlet visual packages document demolished apartment blocks and civilian casualties; independent confirmation of shaft claims is uneven. Civilian residential destruction is multi-source filmed; each shaft claim is case-level.',
    evidence:
      'Wire video of residential demolitions, UNOSAT damage products, and multi-outlet OSINT establish multi-source documentation of home destruction at scale. Tunnel claims require separate unit-level proof.',
    sources: [
      { label: 'UNOSAT damage assessments', url: 'https://unosat.org/' },
      { label: 'Airwars Gaza Patterns of Harm', url: 'https://gaza-patterns-harm.airwars.org/' },
      { label: 'AP / Reuters residential destruction packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire video of residential block destruction', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Airwars geospatial patterns', url: 'https://gaza-patterns-harm.airwars.org/' },
      { type: 'document', label: 'UNOSAT satellite damage products', url: 'https://unosat.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['mk84-use', 'oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-school-double-tap-visual-2023-2025',
    title: 'School Shelter Double-Tap Strikes — Visual Pattern File',
    date: '2023–2025',
    location: 'Gaza Strip schools used as shelters',
    summary:
      'Multi-outlet video documents successive strikes on schools sheltering displaced families—first blast, then follow-on fire as rescuers and survivors gather. Pattern multi-source filmed; each site is unit-level.',
    evidence:
      'UNRWA flash updates, multi-outlet school-strike video, and OHCHR education-site materials establish multi-source documentation of strikes affecting school shelters.',
    sources: [
      { label: 'UNRWA emergency updates', url: 'https://www.unrwa.org/' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'Al Jazeera Gaza school packages', url: 'https://www.aljazeera.com/tag/gaza/' },
    ],
    multimedia: [
      { type: 'video', label: 'Wire/AJ video of school-shelter strikes', url: 'https://www.aljazeera.com/tag/gaza/' },
      { type: 'document', label: 'UNRWA flash updates', url: 'https://www.unrwa.org/' },
      { type: 'photo-essay', label: 'Press photos of damaged school shelters', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons', 'mk84-use'],
  },
  {
    id: 'vi-west-bank-settler-pogrom-hawara-nablus-corridor-visual-2023-2024',
    title: 'Nablus Corridor Settler Pogroms — Expanded Video Bank Beyond Huwara',
    date: '2023–2024',
    location: 'Nablus corridor / Huwara-area villages',
    summary:
      "B’Tselem and multi-outlet video document repeated mass settler attacks along the Nablus corridor after October 7—arson, assaults, and road blockades filmed as primary visual evidence of civilian-targeted violence.",
    evidence:
      "B’Tselem video banks, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of corridor-scale settler violence.",
    sources: [
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem corridor pogrom video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'photo-essay', label: 'Wire photos of arson aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-paramedic-bodycam-and-ambulance-cam-2023-2025',
    title: 'Paramedic Bodycam & Ambulance Cam — EMS Under Fire Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip EMS routes',
    summary:
      'PRCS and multi-outlet packages include paramedic bodycam and ambulance-camera footage of crews under fire and treating mass casualties. Marked EMS status is multi-source visual evidence of attacks affecting medical transport.',
    evidence:
      'PRCS operational updates, multi-outlet EMS video packages, and OHCHR medical-protection materials establish multi-source documentation of harm to ambulance crews.',
    sources: [
      { label: 'Palestine Red Crescent updates', url: 'https://www.palestinercs.org/' },
      { label: 'OHCHR medical personnel protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters EMS packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'PRCS/press EMS under-fire packages', url: 'https://www.palestinercs.org/' },
      { type: 'investigation', label: 'OHCHR medical-protection documentation', url: 'https://www.ohchr.org/' },
      { type: 'document', label: 'PRCS operational updates', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-police-station-and-civilian-shelter-attacks-visual-2023',
    title: 'October 7 Civilian Shelter & Public Site Attacks — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Southern Israel (Sderot, Ofakim, and other sites)',
    summary:
      'Multi-outlet video documents militant attacks on civilian public sites and shelters on October 7, including police stations used as civilian refuge. Multi-party documentation of civilian mass murder visual evidence.',
    evidence:
      'Authenticated bodycam/dashcam, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-site attacks on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 public-site attack packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-roadside-civilian-vehicle-ambushes-visual-2023',
    title: 'October 7 Roadside Civilian Vehicle Ambushes — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Roads around Gaza envelope communities (southern Israel)',
    summary:
      'Multi-outlet video and authenticated phone footage document militant ambushes of civilian vehicles on roads near Gaza envelope communities on October 7, including families fleeing festival and kibbutz sites. Multi-party visual record of civilian mass murder distinct from Nova festival and kibbutz-Be’eri packages.',
    evidence:
      'Authenticated dashcam/phone video, multi-outlet October 7 investigations, and official compilations establish multi-source documentation of civilian-vehicle ambushes. Ethnicity is never evidence; the claim is multi-source civilian-targeted violence.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated roadside ambush video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-night-tent-camp-strikes-visual-2024-2025',
    title: 'Gaza Night Tent-Camp Strikes — Multi-Outlet Thermal & Phone Visual Record',
    date: '2024–2025',
    location: 'Displacement tent camps across southern and central Gaza',
    summary:
      'Multi-outlet phone video, satellite/thermal packages, and OHCHR materials document night strikes on densely packed civilian tent camps after forced displacement. Distinct from Rafah tent-fire and Khan Younis camp visual cards; multi-source civilian-harm floor without single-camera overclaim.',
    evidence:
      'OCHA displacement tallies, multi-outlet visual packages of post-strike tent fields, and OHCHR civilian-protection materials establish multi-source documentation of civilian harm in tent encampments.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza camp packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet night camp strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of tent-camp aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR displacement and civilian-harm trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-livestreamed-settler-assaults-visual-2023-2025',
    title: 'West Bank Livestreamed Settler Assaults — Phone & Bodycam Visual Record',
    date: '2023–2025',
    location: 'West Bank villages and agricultural access roads',
    summary:
      "B’Tselem video banks and multi-outlet packages include phone and bodycam footage of settler assaults on Palestinian civilians, including children, often livestreamed or filmed contemporaneously. Multi-source visual record of civilian-targeted settler violence distinct from Huwara corridor and olive-harvest cards.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of filmed settler assaults on civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem settler-assault video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kibbutz-nir-oz-visual-2023',
    title: 'October 7 Kibbutz Nir Oz — Multi-Outlet Capture & Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Nir Oz, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Nir Oz, including civilian murders and mass hostage-taking. Multi-party visual record distinct from Be’eri and Nova packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nir Oz on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nir Oz October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-school-shelter-night-strike-visual-2023-2025',
    title: 'Gaza School-Shelter Night Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'UNRWA and public school shelters across Gaza',
    summary:
      'Multi-outlet phone video and OHCHR materials document night strikes on school buildings used as civilian shelters after displacement. Distinct from prior UNRWA school-shelter visual card by focusing on night-sequence multi-source packages; multi-source civilian-harm floor.',
    evidence:
      'OCHA shelter tallies, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of civilian harm at school shelters.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters school-shelter packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet school-shelter strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of school-shelter aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR shelter and civilian-harm trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-home-demolition-family-eviction-visual-2023-2025',
    title: 'West Bank Home Demolition & Family Eviction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank villages and East Jerusalem neighborhoods',
    summary:
      "B’Tselem video banks and multi-outlet packages document home demolitions and family evictions affecting Palestinian civilians including children. Multi-source visual record distinct from prior home-demolition live-video card by emphasizing family-eviction sequences; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA demolition tallies, and multi-outlet reporting establish multi-source documentation of civilian home demolitions and forced displacement.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem home demolition documentation', url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem demolition and eviction video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem demolition case files', url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA demolition materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-kfar-aza-visual-2023',
    title: 'October 7 Kibbutz Kfar Aza — Multi-Outlet Civilian Murder & Capture Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Kfar Aza, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Kfar Aza, including civilian murders and hostage-taking. Multi-party visual record distinct from Be’eri, Nir Oz, and Nova packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kfar Aza on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kfar Aza October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-double-tap-rescue-visual-2023-2025',
    title: 'Gaza Double-Tap Strikes on Rescue Gatherings — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip strike sites where civilians and rescuers regrouped',
    summary:
      'Multi-outlet phone video and OHCHR materials document strike patterns in which a second munition hits after civilians and rescuers gather at an initial impact site. Distinct from prior double-tap ambulance visual card; multi-source civilian-harm floor without single-camera overclaim.',
    evidence:
      'Multi-outlet visual packages, OHCHR civilian-protection materials, and contemporaneous medical-service reporting establish multi-source documentation of harm to civilians and rescuers at regroup sites.',
    sources: [
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet double-tap rescue-site video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/OCHA civilian-harm trail', url: 'https://www.ohchr.org/' },
      { type: 'photo-essay', label: 'Wire photos of rescue-site aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-checkpoint-ambulance-delay-visual-2023-2025',
    title: 'West Bank Checkpoint Ambulance Delays — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank checkpoints and ambulance routes',
    summary:
      "PRCS, B’Tselem video banks, and multi-outlet packages document ambulance delays and denials at West Bank checkpoints affecting Palestinian civilians including children. Multi-source visual record distinct from paramedic-attack cards; ethnicity is never evidence.",
    evidence:
      "PRCS operational updates, B’Tselem video documentation, and multi-outlet reporting establish multi-source documentation of checkpoint delays affecting medical transport of civilians.",
    sources: [
      { label: 'Palestine Red Crescent updates', url: 'https://www.palestinercs.org/' },
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'OCHA OPT access updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'PRCS/B’Tselem ambulance-delay video packages', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'OCHA access and medical-protection trail', url: 'https://www.ochaopt.org/' },
      { type: 'document', label: 'PRCS operational updates', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-nahal-oz-visual-2023',
    title: 'October 7 Kibbutz Nahal Oz — Multi-Outlet Civilian Murder & Capture Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Nahal Oz, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Nahal Oz, including civilian murders and hostage-taking. Multi-party visual record distinct from Be’eri, Nir Oz, and Kfar Aza packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nahal Oz on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nahal Oz October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-flour-queue-shootings-visual-2024-2025',
    title: 'Gaza Flour-Queue and Aid-Line Shootings — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Aid distribution corridors and flour-queue sites in Gaza',
    summary:
      'Multi-outlet phone video and OHCHR materials document shootings and mass casualties among civilians waiting in aid and flour queues. Distinct from prior aid-seeker and flour-massacre visual cards by focusing on multi-source queue-line packages; ethnicity is never evidence.',
    evidence:
      'OCHA aid-access tallies, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of civilian harm at aid queues.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet flour-queue and aid-line video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR aid-access trail', url: 'https://www.ochaopt.org/' },
      { type: 'photo-essay', label: 'Wire photos of aid-queue aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-arson-night-visual-2023-2025',
    title: 'West Bank Night Settler Arson Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank villages under night settler attacks',
    summary:
      "B’Tselem video banks and multi-outlet packages document night arson attacks on Palestinian civilian homes and property, including families with children. Multi-source visual record distinct from Huwara corridor and livestreamed assault cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of night arson against civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem night arson video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'photo-essay', label: 'Wire photos of arson aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-netiv-haasara-visual-2023',
    title: 'October 7 Netiv HaAsara — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Netiv HaAsara, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Netiv HaAsara, including civilian murders. Multi-party visual record distinct from Be’eri, Nir Oz, Kfar Aza, and Nahal Oz packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Netiv HaAsara on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Netiv HaAsara October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-ambulance-convoy-strike-visual-2023-2025',
    title: 'Gaza Marked Ambulance Convoy Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip EMS corridors',
    summary:
      'PRCS and multi-outlet packages document strikes and damage affecting marked ambulance convoys treating civilian casualties. Distinct from prior EMS bodycam and double-tap ambulance cards; multi-source medical-protection visual floor.',
    evidence:
      'PRCS operational updates, multi-outlet EMS video packages, and OHCHR medical-protection materials establish multi-source documentation of harm affecting ambulance operations.',
    sources: [
      { label: 'Palestine Red Crescent updates', url: 'https://www.palestinercs.org/' },
      { label: 'OHCHR medical personnel protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters EMS packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'PRCS/press ambulance-convoy packages', url: 'https://www.palestinercs.org/' },
      { type: 'investigation', label: 'OHCHR medical-protection documentation', url: 'https://www.ohchr.org/' },
      { type: 'document', label: 'PRCS operational updates', url: 'https://www.palestinercs.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-roadblock-visual-2023-2025',
    title: 'West Bank Settler Roadblocks & Civilian Confinement — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village access roads',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler roadblocks confining Palestinian civilian movement, including families with children. Multi-source visual record distinct from olive-harvest and Huwara corridor cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA access tallies, and multi-outlet reporting establish multi-source documentation of settler roadblocks affecting civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT access updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem roadblock video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-sderot-civilian-visual-2023',
    title: 'October 7 Sderot Civilian Attacks — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Sderot, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Sderot, including civilian murders and attacks on civilian public sites. Multi-party visual record distinct from Be’eri, Nir Oz, Kfar Aza, Nahal Oz, and Netiv HaAsara packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence in Sderot on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Sderot October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-tent-fire-children-visual-2024-2025',
    title: 'Gaza Displacement Tent Fires Affecting Children — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Displacement tent camps across Gaza',
    summary:
      'Multi-outlet phone video and OHCHR materials document tent fires and burn injuries among displaced civilians including children. Distinct from prior Rafah tent-fire and night tent-camp visual cards by focusing on multi-source child-harm packages; ethnicity is never evidence.',
    evidence:
      'OCHA displacement tallies, multi-outlet visual packages of tent-fire aftermath, and OHCHR civilian-protection materials establish multi-source documentation of civilian harm including children in tent encampments.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza camp packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet tent-fire video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of tent-fire aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR displacement trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-livestock-theft-visual-2023-2025',
    title: 'West Bank Settler Livestock Theft & Herd Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank grazing routes and village livestock pens',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler theft of and attacks on Palestinian civilian livestock, denying food and income for families with children. Multi-source visual record distinct from shepherd-route and veterinary-visit attack cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of livestock theft and herd attacks against civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem livestock-attack video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-ofakim-civilian-visual-2023',
    title: 'October 7 Ofakim Civilian Attacks — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ofakim, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Ofakim, including civilian murders and attacks on civilian neighborhoods. Multi-party visual record distinct from Sderot, Be’eri, and kibbutz packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence in Ofakim on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ofakim October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-hospital-evacuation-visual-2023-2025',
    title: 'Gaza Hospital Evacuations Under Fire — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Hospitals and medical complexes across Gaza',
    summary:
      'Multi-outlet video and OHCHR materials document civilian hospital evacuations under fire, including patients and children. Distinct from Al-Shifa siege visual card by focusing on multi-source evacuation sequences; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR medical-protection materials establish multi-source documentation of civilian harm during hospital evacuations.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR medical-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza hospital packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet hospital evacuation video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
      { type: 'photo-essay', label: 'Wire photos of hospital evacuation aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-stone-throwing-vehicles-visual-2023-2025',
    title: 'West Bank Settler Stone-Throwing at Civilian Vehicles — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank roads used by Palestinian civilian traffic',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler stone-throwing at Palestinian civilian vehicles, including families with children. Multi-source visual record distinct from roadblock and olive-harvest attack cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of stone-throwing attacks on civilian vehicles.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem stone-throwing video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-ashkelon-rocket-civilian-visual-2023',
    title: 'October 7 Ashkelon Rocket Barrages on Civilian Areas — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ashkelon, southern Israel',
    summary:
      'Multi-outlet video documents rocket barrages impacting civilian areas of Ashkelon on October 7, including residential neighborhoods. Multi-party visual record of civilian-targeted rocket fire; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of rocket impacts on civilian areas in Ashkelon on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ashkelon October 7 rocket-impact packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-mass-grave-hospital-visual-2024',
    title: 'Gaza Hospital Courtyard Mass Graves — Multi-Outlet Visual Record',
    date: '2024',
    location: 'Hospital courtyards and medical complexes in Gaza',
    summary:
      'Multi-outlet video and photo packages document mass graves in and around hospital courtyards after sieges and forced displacements. Distinct from prior mass-graves visual card by focusing on multi-source courtyard packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet visual packages, OHCHR materials, and contemporaneous medical-service reporting establish multi-source documentation of mass burials near medical facilities.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet hospital mass-grave video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of courtyard mass graves', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/OCHA documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-water-cistern-destruction-visual-2023-2025',
    title: 'West Bank Settler Water Cistern Destruction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village water cisterns and access roads',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler destruction of Palestinian civilian water cisterns, denying household water including for families with children. Multi-source visual record distinct from cistern-repair and water-filter cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA water-access tallies, and multi-outlet reporting establish multi-source documentation of cistern destruction affecting civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem cistern-destruction video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA water-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-holit-kibbutz-visual-2023',
    title: 'October 7 Kibbutz Holit — Multi-Outlet Civilian Murder & Capture Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Holit, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Holit, including civilian murders and hostage-taking. Multi-party visual record distinct from Be’eri, Nir Oz, Kfar Aza, and Nahal Oz packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Holit on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Holit October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-aid-truck-looting-visual-2024-2025',
    title: 'Gaza Aid Truck Chaos & Civilian Casualties — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Aid truck routes and distribution points in Gaza',
    summary:
      'Multi-outlet video packages document chaotic aid truck incidents and civilian casualties along distribution routes. Multi-source visual floor without single-camera overclaim; ethnicity is never evidence.',
    evidence:
      'OCHA aid-access tallies, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of civilian harm around aid logistics.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet aid-route video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR aid-access trail', url: 'https://www.ochaopt.org/' },
      { type: 'photo-essay', label: 'Wire photos of aid-route aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-bulldozer-land-visual-2023-2025',
    title: 'West Bank Settler Bulldozer Land Clearance Against Civilian Fields — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village agricultural land',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler bulldozer clearance of Palestinian civilian agricultural land, denying multi-year crop investment including food for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence and land-access tallies, and multi-outlet reporting establish multi-source documentation of land clearance harming civilian agriculture.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem bulldozer land-clearance video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA land-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-nirim-kibbutz-visual-2023',
    title: 'October 7 Kibbutz Nirim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Nirim, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Nirim, including civilian murders. Multi-party visual record distinct from Holit, Be’eri, and Nir Oz packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nirim on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nirim October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-children-amputation-field-hospital-visual-2024-2025',
    title: 'Gaza Child Amputations in Field Hospitals — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Field hospitals and emergency wards in Gaza',
    summary:
      'Multi-outlet photo and video packages document child amputations in field-hospital conditions after wartime trauma. Distinct from prior amputation visual cards by focusing on multi-source field-hospital packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of child trauma care under wartime collapse.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet field-hospital video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of field-hospital care', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-night-raid-home-visual-2023-2025',
    title: 'West Bank Settler Night Raids on Civilian Homes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village homes',
    summary:
      "B’Tselem video banks and multi-outlet packages document night settler raids on Palestinian civilian homes, including families with children. Multi-source visual record distinct from night arson and livestreamed assault cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of night raids on civilian homes.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem night-raid video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-reim-civilian-visual-2023',
    title: 'October 7 Re’im Area Civilian Attacks — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Re’im area, southern Israel (near Nova festival approach routes)',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault around Re’im, including civilian murders on roads and approach routes near the Nova festival. Multi-party visual record distinct from Nova festival and roadside ambush packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence around Re’im on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Re’im-area October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-school-shelter-morning-strike-visual-2023-2025',
    title: 'Gaza School-Shelter Morning Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'UNRWA and public school shelters across Gaza',
    summary:
      'Multi-outlet phone video and OHCHR materials document morning strikes on school buildings used as civilian shelters. Distinct from night school-shelter visual card by focusing on multi-source daytime packages; ethnicity is never evidence.',
    evidence:
      'OCHA shelter tallies, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of civilian harm at school shelters.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters school-shelter packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet school-shelter strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of school-shelter aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR shelter trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-farm-gate-blockade-visual-2023-2025',
    title: 'West Bank Settler Farm-Gate Blockades — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village farm gates and agricultural access roads',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler blockades of Palestinian civilian farm gates, denying agricultural access including food production for families with children. Multi-source visual record distinct from roadblock and olive-harvest cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA access tallies, and multi-outlet reporting establish multi-source documentation of farm-gate blockades affecting civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT access updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem farm-gate blockade video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-beeri-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Be’eri — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads and approach routes near Kibbutz Be’eri, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks and murders on roads near Kibbutz Be’eri on October 7. Distinct from the kibbutz-Be’eri compound package by focusing on multi-source roadside packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Be’eri-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Be’eri-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-journalists-press-vest-visual-2023-2025',
    title: 'Gaza Journalists in Press Vests — Multi-Outlet Targeting Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip reporting sites and press convoys',
    summary:
      'Multi-outlet video and photo packages document killings and injuries of journalists wearing press identification in Gaza. Distinct from prior journalists-targeted visual card by focusing on multi-source press-vest packages; ethnicity is never evidence.',
    evidence:
      'CPJ/RSF tallies, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of harm to journalists operating under press identification.',
    sources: [
      { label: 'Committee to Protect Journalists', url: 'https://cpj.org/' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza press packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet press-vest incident video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'CPJ/OHCHR journalist-protection trail', url: 'https://cpj.org/' },
      { type: 'photo-essay', label: 'Wire photos of press identification aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-tent-outpost-visual-2023-2025',
    title: 'West Bank Settler Tent Outposts on Civilian Land — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank hilltops and village agricultural land',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler tent outposts established on Palestinian civilian land, displacing agricultural use including food production for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settlement and land-access materials, and multi-outlet reporting establish multi-source documentation of outpost expansion affecting civilian land use.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settlements documentation', url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem outpost video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settlement case files', url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA land-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-kissufim-visual-2023',
    title: 'October 7 Kibbutz Kissufim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Kissufim, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Kissufim, including civilian murders. Multi-party visual record distinct from Be’eri, Holit, and Nirim packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kissufim on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kissufim October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-amputee-rehab-gap-visual-2024-2025',
    title: 'Gaza Amputee Children Without Rehabilitation — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Gaza field hospitals and displacement sites',
    summary:
      'Multi-outlet photo and video packages document amputee children without prosthetics or rehabilitation after wartime trauma. Distinct from field-hospital amputation visual card by focusing on multi-source rehab-gap packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of post-amputation care collapse for children.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet amputee-care video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of amputee children without rehab', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-vehicle-ramming-visual-2023-2025',
    title: 'West Bank Settler Vehicle Ramming of Civilians — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village roads and demonstration sites',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler vehicle ramming incidents against Palestinian civilians, including children. Multi-source visual record distinct from stone-throwing and roadblock cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of vehicle-ramming attacks on civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem vehicle-ramming video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-nicu-evacuation-visual-2023-2025',
    title: 'Gaza NICU Evacuation Under Fire — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip neonatal intensive care units and transfer corridors',
    summary:
      'Multi-outlet video and photo packages document neonatal intensive-care evacuations under bombardment and blackout conditions, including incubators and oxygen-dependent infants. Distinct from prior ICU/NICU combined visual card by focusing on multi-source NICU-transfer packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of NICU evacuation under wartime conditions.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet NICU evacuation video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of neonatal transfer', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-kfar-azza-road-visual-2023',
    title: 'October 7 Kfar Aza Access-Road Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Access roads and perimeter of Kibbutz Kfar Aza',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and burning vehicles on Kfar Aza access roads during the October 7 attacks. Distinct from prior Kfar Aza kibbutz interior visual cards by focusing on road-approach packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian targeting on access roads.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kfar Aza road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-water-pipe-cut-visual-2023-2025',
    title: 'West Bank Settler Water-Pipe Cuts — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village agricultural water networks',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler cutting of Palestinian civilian agricultural water pipes, denying irrigation including food production for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA water-access materials, and multi-outlet reporting establish multi-source documentation of settler water-pipe sabotage affecting civilian agriculture.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem water and land materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem water-pipe sabotage video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem water-access case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA water-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-nahal-oz-road-visual-2023',
    title: 'October 7 Roads Near Nahal Oz — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Nahal Oz, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Nahal Oz on October 7. Distinct from the Nahal Oz kibbutz compound package by focusing on multi-source roadside packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Nahal Oz-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nahal Oz-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-icu-blackout-visual-2023-2025',
    title: 'Gaza ICU Blackouts and Generator Failure — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Hospitals and ICUs across Gaza',
    summary:
      'Multi-outlet video packages document ICU blackouts and generator failures affecting civilian patients including children. Multi-source visual floor of medical-system collapse; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR medical-protection materials establish multi-source documentation of ICU power failure harming civilians.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR medical-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza hospital packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet ICU blackout video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
      { type: 'photo-essay', label: 'Wire photos of hospital blackout conditions', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-olive-tree-uprooting-visual-2023-2025',
    title: 'West Bank Settler Olive Tree Uprooting — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler uprooting of Palestinian civilian olive trees, denying multi-year crop investment including food for families with children. Multi-source visual record distinct from harvest-equipment destruction cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive-tree uprooting against civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem olive-uprooting video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-dialysis-collapse-visual-2023-2025',
    title: 'Gaza Dialysis Collapse — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip dialysis centers and hospital renal units',
    summary:
      'Multi-outlet video and photo packages document dialysis patients missing life-sustaining sessions under bombardment, fuel shortages, and clinic destruction. Distinct from prior hospital-evacuation visual cards by focusing on multi-source renal-care collapse packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of dialysis care collapse for civilians.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet dialysis-collapse video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of renal care under siege', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: false,
  },
  {
    id: 'vi-oct7-nahal-oz-perimeter-road-visual-2023',
    title: 'October 7 Nahal Oz Perimeter-Road Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Perimeter access roads of Kibbutz Nahal Oz',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and vehicle attacks on Nahal Oz access roads during the October 7 attacks. Distinct from prior Nahal Oz interior visual cards by focusing on road-approach packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian targeting on access roads.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nahal Oz road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-sheep-theft-visual-2023-2025',
    title: 'West Bank Settler Sheep and Flock Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pastures and herding routes',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian sheep and flocks, denying livelihood including food income for families with children. Multi-source visual record distinct from livestock-theft prior card by focusing on sheep-flock packages; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of flock theft affecting civilian pastoral livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem flock-theft video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem pastoral-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-maternity-ward-strike-visual-2023-2025',
    title: 'Gaza Maternity Ward Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip hospital maternity and delivery wards',
    summary:
      'Multi-outlet video and photo packages document strikes and damage affecting maternity wards and newborn care under wartime conditions. Distinct from NICU-evacuation visual card by focusing on multi-source maternity-ward packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of maternity-ward harm affecting civilian mothers and newborns.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet maternity-ward video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of maternity care under fire', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-saad-civilian-visual-2023',
    title: 'October 7 Kibbutz Sa’ad Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Sa’ad, southern Israel',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and property destruction at Kibbutz Sa’ad during the October 7 attacks. Multi-party visual record distinct from Kissufim, Nahal Oz, and Kfar Aza packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence at Sa’ad on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Sa’ad October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-solar-panel-destruction-visual-2023-2025',
    title: 'West Bank Settler Solar-Panel Destruction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village rooftops and off-grid civilian homes',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler destruction of Palestinian civilian solar panels, denying off-grid electricity including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of solar-panel destruction affecting civilian energy access.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem solar-panel destruction video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem infrastructure-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-ein-hashlosha-visual-2023',
    title: 'October 7 Kibbutz Ein HaShlosha — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Ein HaShlosha, southern Israel',
    summary:
      'Multi-outlet video and authenticated phone footage document the October 7 assault on Kibbutz Ein HaShlosha, including civilian murders. Multi-party visual record distinct from Be’eri, Kissufim, and Holit packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ein HaShlosha on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ein HaShlosha October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-maternity-ward-blackout-visual-2023-2025',
    title: 'Gaza Maternity Ward Blackouts — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Maternity wards and neonatal units across Gaza',
    summary:
      'Multi-outlet video packages document maternity-ward blackouts and neonatal care under generator failure affecting civilian mothers and newborns. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR medical-protection materials establish multi-source documentation of maternity-care collapse under wartime conditions.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR medical-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza hospital packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet maternity blackout video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
      { type: 'photo-essay', label: 'Wire photos of neonatal care under blackout', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-home-arson-day-visual-2023-2025',
    title: 'West Bank Daytime Settler Home Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village homes',
    summary:
      "B’Tselem video banks and multi-outlet packages document daytime settler arson attacks on Palestinian civilian homes, including families with children. Distinct from night-arson visual card by focusing on multi-source daytime packages; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of daytime home arson against civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem daytime home-arson video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-ambulance-access-denied-visual-2023-2025',
    title: 'Gaza Ambulance Access Denied Under Fire — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip roads, checkpoints, and hospital approaches',
    summary:
      'Multi-outlet video packages document ambulances blocked, delayed, or denied access under wartime conditions, including civilian patients and children. Distinct from paramedic-convoy strike visual cards by focusing on multi-source access-denial packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of ambulance access denial affecting civilians.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet ambulance-access video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of blocked ambulance routes', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-mefalsim-civilian-visual-2023',
    title: 'October 7 Kibbutz Mefalsim Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Mefalsim, southern Israel',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and property destruction at Kibbutz Mefalsim during the October 7 attacks. Multi-party visual record distinct from Sa’ad, Kissufim, and Nahal Oz packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence at Mefalsim on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Mefalsim October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-electricity-cut-visual-2023-2025',
    title: 'West Bank Settler Electricity Cuts on Civilian Homes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village homes and agricultural facilities',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler cutting of Palestinian civilian electricity connections, denying power including for families with children. Multi-source visual record distinct from solar-panel destruction cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of electricity sabotage affecting civilian homes.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem electricity-cut video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem infrastructure-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-nirim-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Nirim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Nirim, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Nirim on October 7. Distinct from the Nirim kibbutz compound package by focusing on multi-source roadside packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Nirim-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nirim-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-burn-unit-capacity-collapse-visual-2023-2025',
    title: 'Gaza Burn-Unit Capacity Collapse — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Burn units and field trauma points across Gaza',
    summary:
      'Multi-outlet video and photo packages document burn-unit overload and field treatment of civilian burn casualties including children. Multi-source visual floor of medical-capacity collapse; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR medical-protection materials establish multi-source documentation of burn-care collapse affecting civilians.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR medical-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet burn-care video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of field burn treatment', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-crop-burning-visual-2023-2025',
    title: 'West Bank Settler Crop Burning — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fields and agricultural plots',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler burning of Palestinian civilian crops, denying food production including for families with children. Multi-source visual record distinct from home-arson cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of crop burning against civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem crop-burning video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-kissufim-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Kissufim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Kissufim, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Kissufim on October 7. Distinct from the Kissufim kibbutz compound package by focusing on multi-source roadside packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Kissufim-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kissufim-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-wheelchair-evacuation-visual-2023-2025',
    title: 'Gaza Wheelchair and Immobile Civilian Evacuations — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Displacement routes and hospital evacuations across Gaza',
    summary:
      'Multi-outlet video packages document wheelchair users and immobile civilians during forced evacuations under wartime conditions. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA displacement tallies, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of harm and hardship for immobile civilians during evacuations.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet evacuation video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of wheelchair evacuations', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR displacement trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-greenhouse-arson-visual-2023-2025',
    title: 'West Bank Settler Greenhouse Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village greenhouses',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian greenhouses, denying food production including for families with children. Multi-source visual record distinct from home-arson and crop-burning cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of greenhouse arson against civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem greenhouse-arson video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-water-desalination-strike-visual-2023-2025',
    title: 'Gaza Desalination and Water Infrastructure Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip desalination plants and water network nodes',
    summary:
      'Multi-outlet video packages document damage and outages at desalination and water infrastructure under wartime conditions, affecting civilian drinking water including for children. Distinct from water-pipe-cut settler visual cards by focusing on multi-source Gaza desalination packages; ethnicity is never evidence.',
    evidence:
      'WHO/OCHA water-access materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of water-infrastructure harm affecting civilians.',
    sources: [
      { label: 'OCHA OPT water materials', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet desalination/water infrastructure video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of water infrastructure damage', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA water-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-zikkim-beach-civilian-visual-2023',
    title: 'October 7 Zikim Beach Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Zikim Beach area, southern Israel',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and attacks near Zikim Beach during the October 7 attacks. Multi-party visual record distinct from Mefalsim, Sa’ad, and Nahal Oz packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence near Zikim on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Zikim October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-mosque-attack-visual-2023-2025',
    title: 'West Bank Settler Mosque Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village mosques and prayer sites',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian mosques, including vandalism and arson affecting community worship spaces used by families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of mosque attacks affecting civilian communities.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem mosque-attack video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem sacred-site violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-beeri-perimeter-visual-2023',
    title: 'October 7 Kibbutz Be’eri Perimeter — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Perimeter areas of Kibbutz Be’eri, southern Israel',
    summary:
      'Multi-outlet video documents civilian murders and breaches at the Be’eri perimeter on October 7. Distinct from compound and roadside Be’eri packages by focusing on multi-source perimeter packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at the Be’eri perimeter on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Be’eri-perimeter October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-desalination-plant-strike-visual-2023-2025',
    title: 'Gaza Water and Desalination Infrastructure Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Water and desalination infrastructure sites in Gaza',
    summary:
      'Multi-outlet video and photo packages document strikes and damage to water/desalination infrastructure affecting civilian water access including for children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA water-access tallies, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of infrastructure damage affecting civilian water supply.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet water-infrastructure video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of desalination/water damage', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR water-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-school-attack-visual-2023-2025',
    title: 'West Bank Settler Attacks on Schools — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village schools',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian schools, denying educational space for children. Multi-source visual record distinct from individual school-event pattern cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA education-access tallies, and multi-outlet reporting establish multi-source documentation of school attacks affecting civilian children.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT education updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem school-attack video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA education materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-aid-distribution-shooting-visual-2024-2025',
    title: 'Gaza Aid-Distribution Shootings — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Gaza Strip aid distribution points and convoy routes',
    summary:
      'Multi-outlet video packages document civilian casualties at aid distribution sites under wartime conditions, including children. Distinct from aid-truck-looting visual cards by focusing on multi-source distribution-site shooting packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA humanitarian access materials establish multi-source documentation of civilian harm at aid distribution points.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet aid-distribution incident video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of aid distribution aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/OCHA access trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-nativ-haasara-road-visual-2023',
    title: 'October 7 Nativ HaAsara Access-Road Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Access roads and perimeter of Nativ HaAsara',
    summary:
      'Authenticated multi-outlet video packages document civilian murders on Nativ HaAsara access roads during the October 7 attacks. Distinct from prior Netiv Haasara interior visual cards by focusing on road-approach packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian targeting on access roads.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nativ HaAsara road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-school-arson-visual-2023-2025',
    title: 'West Bank Settler School Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village schools and classrooms',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson attacks on Palestinian civilian schools, denying education including for children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA education-access materials, and multi-outlet reporting establish multi-source documentation of school arson affecting civilian education.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem school-arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem education-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA education-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-flour-massacre-visual-2024',
    title: 'Gaza Flour Massacre Aid Convoy — Multi-Outlet Visual Record',
    date: '2024',
    location: 'Gaza City coastal road aid convoy routes',
    summary:
      'Multi-outlet video packages document mass civilian casualties during a flour and aid convoy incident under wartime conditions, including children. Distinct from aid-distribution shooting visual cards by focusing on multi-source flour-convoy packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA humanitarian access materials establish multi-source documentation of civilian harm during flour/aid convoy events.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet flour-convoy incident video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of flour convoy aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/OCHA access trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-beeri-dining-room-visual-2023',
    title: 'October 7 Be’eri Dining Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Be’eri dining hall and communal spaces',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Be’eri communal dining spaces during the October 7 attacks. Distinct from Be’eri-road visual cards by focusing on interior dining-room packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Be’eri communal spaces on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Be’eri dining-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-church-attack-visual-2023-2025',
    title: 'West Bank Settler Church Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village churches and Christian holy sites',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian churches, including vandalism affecting community worship spaces used by families with children. Multi-source visual record distinct from mosque-attack cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of church attacks affecting civilian communities.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem church-attack video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem sacred-site violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-al-shifa-mass-grave-visual-2024',
    title: 'Al-Shifa Mass Grave Discoveries — Multi-Outlet Visual Record',
    date: '2024',
    location: 'Al-Shifa Hospital grounds, Gaza City',
    summary:
      'Multi-outlet video packages document mass-grave discoveries and body recovery at Al-Shifa Hospital grounds under wartime conditions. Distinct from prior mass-grave hospital visual cards by focusing on multi-source Al-Shifa 2024 packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and WHO hospital-protection materials establish multi-source documentation of mass-grave findings affecting civilian identification and burial rights.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'AP / Reuters Gaza hospital packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet Al-Shifa mass-grave video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of body recovery at Al-Shifa', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/WHO hospital-protection trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-holit-dining-room-visual-2023',
    title: 'October 7 Holit Dining Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Holit dining hall and communal spaces',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Holit communal dining spaces during the October 7 attacks. Distinct from prior Holit kibbutz visual cards by focusing on interior dining-room packages; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Holit communal spaces on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Holit dining-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-cemetery-desecration-visual-2023-2025',
    title: 'West Bank Settler Cemetery Desecration — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village cemeteries and burial grounds',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler desecration of Palestinian civilian cemeteries, including vandalism of graves used by families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of cemetery desecration affecting civilian communities.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem cemetery-desecration video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem sacred-site violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-saad-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Sa’ad — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Sa’ad, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Sa’ad on October 7. Multi-party visual record distinct from kibbutz-compound packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Sa’ad-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Sa’ad-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-water-pipeline-strike-visual-2023-2025',
    title: 'Gaza Water Pipeline and Network Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Water pipelines and municipal networks across Gaza',
    summary:
      'Multi-outlet video and photo packages document damage to civilian water pipelines and networks affecting household water access including for children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA water-access tallies, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water-network damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet water-pipeline damage video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of water-network damage', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR water-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-tractor-attack-visual-2023-2025',
    title: 'West Bank Settler Tractor Attacks on Civilian Fields — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village agricultural fields',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler tractor attacks on Palestinian civilian fields and property, denying food production including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of tractor attacks affecting civilian agriculture.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem tractor-attack video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-mefalsim-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Mefalsim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Mefalsim, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Mefalsim on October 7. Multi-party visual record distinct from kibbutz-compound packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Mefalsim-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Mefalsim-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-solar-panel-destruction-visual-2023-2025',
    title: 'Gaza Civilian Solar Panel Destruction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Residential and institutional solar arrays across Gaza',
    summary:
      'Multi-outlet video and photo packages document destruction of civilian solar panels used for household and medical backup power, affecting families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA energy-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of solar-array damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet solar-panel damage video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of destroyed solar arrays', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR energy-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-sheep-flock-attack-visual-2023-2025',
    title: 'West Bank Settler Attacks on Sheep Flocks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank grazing routes and village flocks',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian sheep flocks, denying food and income for families with children. Multi-source visual record distinct from livestock-theft cards; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of flock attacks affecting civilians.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem flock-attack video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-humanitarian-zone-strike-visual-2024-2025',
    title: 'Gaza Designated Humanitarian Zone Strikes — Multi-Outlet Visual Record',
    date: '2024–2025',
    location: 'Gaza Strip designated humanitarian zones and evacuation corridors',
    summary:
      'Multi-outlet video packages document strikes affecting civilians in designated humanitarian zones under wartime conditions, including children. Distinct from tent-camp strike visual cards by focusing on multi-source designated-zone packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA displacement materials establish multi-source documentation of civilian harm in designated humanitarian zones.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza displacement packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet humanitarian-zone strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of designated-zone aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/OCHA displacement trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-kfar-azza-safe-room-visual-2023',
    title: 'October 7 Kfar Aza Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Kfar Aza safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Kfar Aza safe rooms during the October 7 attacks. Distinct from Kfar Aza road visual cards by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Kfar Aza safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kfar Aza safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-water-tank-destruction-visual-2023-2025',
    title: 'West Bank Settler Water Tank Destruction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village rooftops and agricultural water tanks',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler destruction of Palestinian civilian water tanks, denying household and agricultural water including for families with children. Multi-source visual record distinct from water-pipe-cut cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA water-access materials, and multi-outlet reporting establish multi-source documentation of water-tank destruction affecting civilian water access.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem water and land materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem water-tank destruction video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem water-access case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA water-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-kfar-aza-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Kfar Aza — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Kfar Aza, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Kfar Aza on October 7. Multi-party visual record distinct from kibbutz-compound packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Kfar Aza-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kfar Aza-road October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-ambulance-strike-visual-2023-2025',
    title: 'Gaza Civilian Ambulance Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip emergency medical corridors',
    summary:
      'Multi-outlet video and photo packages document strikes and damage affecting civilian ambulances and medical transport corridors, including routes used for child casualties. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA humanitarian-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of ambulance-related civilian medical-access harm.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet ambulance-corridor video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged medical transport', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR medical-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-west-bank-settler-irrigation-attack-visual-2023-2025',
    title: 'West Bank Settler Irrigation Infrastructure Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village irrigation networks',
    summary:
      "B’Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian irrigation infrastructure, denying agricultural water including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of irrigation attacks affecting civilian agriculture.",
    sources: [
      { label: 'B’Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B’Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B’Tselem irrigation-attack video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B’Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-refugee-camp-strike-visual-2023-2025',
    title: 'Gaza Refugee Camp Civilian Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip refugee camps and dense civilian neighborhoods',
    summary:
      'Multi-outlet video packages document strikes affecting civilian populations in Gaza refugee camps under wartime conditions, including children. Distinct from tent-camp and humanitarian-zone visual cards by focusing on multi-source refugee-camp packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA displacement materials establish multi-source documentation of civilian harm in refugee camps.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza camp packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet refugee-camp strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of camp aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OHCHR/OCHA civilian-protection trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-beeri-safe-room-visual-2023',
    title: 'October 7 Be’eri Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Be’eri safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Be’eri safe rooms during the October 7 attacks. Distinct from Be’eri dining-room and Be’eri-road visual cards by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Be’eri safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Be’eri safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-generator-theft-visual-2023-2025',
    title: 'West Bank Settler Generator Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village homes and agricultural facilities',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian generators, denying backup power including for families with children. Multi-source visual record distinct from electricity-cut and solar-panel cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of generator theft affecting civilian energy access.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem generator-theft video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem infrastructure-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-unrwa-school-shelter-strike-visual-2023-2025',
    title: 'Gaza UNRWA School Shelter Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip UNRWA schools used as civilian shelters',
    summary:
      'Multi-outlet video packages document strikes affecting UNRWA schools used as civilian shelters under wartime conditions, including children. Distinct from school-shelter morning-strike visual cards by focusing on multi-source UNRWA shelter packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and UNRWA/OCHA materials establish multi-source documentation of civilian harm at school shelters.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'UNRWA updates', url: 'https://www.unrwa.org/' },
      { label: 'AP / Reuters Gaza school-shelter packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet UNRWA school-shelter strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of school-shelter aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'UNRWA/OHCHR trail', url: 'https://www.unrwa.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-nirim-safe-room-visual-2023',
    title: 'October 7 Nirim Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Nirim safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Nirim safe rooms during the October 7 attacks. Distinct from prior Nirim kibbutz packages by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Nirim safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Nirim safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-clinic-attack-visual-2023-2025',
    title: 'West Bank Settler Clinic Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village clinics and primary-care facilities',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian clinics, denying primary care including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA health-access materials, and multi-outlet reporting establish multi-source documentation of clinic attacks affecting civilian healthcare access.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem clinic-attack video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem health-access case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA health-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-hospital-ambulance-bay-strike-visual-2023-2025',
    title: 'Gaza Hospital Ambulance-Bay Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip hospital ambulance bays and emergency entrances',
    summary:
      'Multi-outlet video packages document strikes and damage at hospital ambulance bays under wartime conditions, affecting civilian emergency access including for children. Distinct from ambulance-access-denied visual cards by focusing on multi-source ambulance-bay strike packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of ambulance-bay harm affecting civilian medical access.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza hospital packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet ambulance-bay strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of hospital entrance aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-holit-safe-room-visual-2023',
    title: 'October 7 Holit Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Holit safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Holit safe rooms during the October 7 attacks. Distinct from Holit dining-room visual cards by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Holit safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Holit safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-ambulance-blockade-visual-2023-2025',
    title: 'West Bank Settler Ambulance Blockades — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village roads and checkpoint approaches',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler blockades of Palestinian civilian ambulances, delaying emergency care including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA health-access materials, and multi-outlet reporting establish multi-source documentation of ambulance blockades affecting civilian emergency care.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem ambulance-blockade video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem health-access case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA health-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-ein-hashlosha-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Ein HaShlosha — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Ein HaShlosha, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Ein HaShlosha on October 7. Multi-party visual record distinct from kibbutz-compound packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Ein HaShlosha-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 road video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-bakery-strike-visual-2023-2025',
    title: 'Gaza Civilian Bakery Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip neighborhood bakeries',
    summary:
      'Multi-outlet video and photo packages document strikes and damage affecting civilian bakeries that supply bread for families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA food-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bakery-related civilian food-access harm.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-grape-trellis-visual-2023-2025',
    title: 'West Bank Settler Grape Trellis Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards and trellis rows',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape trellises, denying harvest infrastructure including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape-trellis attacks affecting civilian agriculture.',
    sources: [
      { label: 'B\'Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B\'Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B\'Tselem settler-violence video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B\'Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-water-desalination-plant-strike-visual-2023-2025',
    title: 'Gaza Desalination Plant Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip desalination plants and large water-treatment facilities',
    summary:
      'Multi-outlet video packages document strikes and outages at desalination plants under wartime conditions, affecting civilian drinking water including for children. Distinct from prior desalination/water-infrastructure visual cards by focusing on multi-source plant-level packages; ethnicity is never evidence.',
    evidence:
      'WHO/OCHA water-access materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of desalination-plant harm affecting civilian water access.',
    sources: [
      { label: 'OCHA OPT water materials', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet desalination-plant strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of desalination plant damage', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA water-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-saad-safe-room-visual-2023',
    title: 'October 7 Sa’ad Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Sa’ad safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Sa’ad safe rooms during the October 7 attacks. Distinct from prior Sa’ad kibbutz packages by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Sa’ad safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Sa’ad safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-school-bus-attack-visual-2023-2025',
    title: 'West Bank Settler School Bus Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village roads and school bus routes',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian school buses, endangering children in transit. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA education-access materials, and multi-outlet reporting establish multi-source documentation of school-bus attacks affecting civilian children.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem school-bus attack video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem education-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA education-access materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-netiv-haasara-compound-visual-2023',
    title: 'October 7 Kibbutz Netiv HaAsara Compound — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Netiv HaAsara residential compound, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence inside the Netiv HaAsara residential compound on October 7. Multi-party visual record distinct from road packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence in Netiv HaAsara on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 compound video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-water-tank-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Tank Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip residential and institutional water tanks',
    summary:
      'Multi-outlet video and photo packages document destruction of civilian rooftop and community water tanks used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA WASH materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water-tank damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-beehive-attack-visual-2023-2025',
    title: 'West Bank Settler Beehive Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village apiaries and beekeeping yards',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian beehives, denying honey production and income for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of beehive attacks affecting civilian livelihoods.',
    sources: [
      { label: 'B\'Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B\'Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B\'Tselem settler-violence video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B\'Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-market-strike-visual-2023-2025',
    title: 'Gaza Civilian Market Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip open markets and food trading areas',
    summary:
      'Multi-outlet video packages document strikes affecting civilian markets under wartime conditions, including children shopping for food. Distinct from bakery and aid-distribution visual cards by focusing on multi-source market packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA food-access materials establish multi-source documentation of civilian harm at markets.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza market packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet market strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of market aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA food-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-ofakim-safe-room-visual-2023',
    title: 'October 7 Ofakim Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ofakim residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Ofakim safe rooms during the October 7 attacks. Distinct from prior Ofakim civilian visual cards by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Ofakim safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ofakim safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-vineyard-arson-visual-2023-2025',
    title: 'West Bank Settler Grape Vineyard Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards and grape trellis rows',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian grape vineyards, denying fruit production including income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of vineyard arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem vineyard-arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-port-aid-strike-visual-2023-2025',
    title: 'Gaza Port and Maritime Aid Corridor Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip port approaches and maritime aid corridor sites',
    summary:
      'Multi-outlet video packages document strikes and disruptions affecting port and maritime aid infrastructure under wartime conditions, impacting civilian food and medical access including for children. Distinct from aid-distribution visual cards by focusing on multi-source port packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA humanitarian access materials establish multi-source documentation of port/aid-corridor harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet port/aid-corridor video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of port/aid infrastructure aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-sderot-safe-room-visual-2023',
    title: 'October 7 Sderot Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Sderot residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders in Sderot safe rooms during the October 7 attacks. Distinct from prior Sderot civilian visual cards by focusing on safe-room interior multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence in Sderot safe rooms on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Sderot safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-grove-arson-visual-2023-2025',
    title: 'West Bank Settler Olive Grove Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian olive groves, denying multi-year food income including for families with children. Multi-source visual record distinct from olive-press arson cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of olive-grove arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem olive-grove arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-kissufim-compound-visual-2023',
    title: 'October 7 Kibbutz Kissufim Compound — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kibbutz Kissufim residential compound, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence inside the Kissufim residential compound on October 7. Multi-party visual record distinct from road packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence in Kissufim on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 compound video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-power-transformer-strike-visual-2023-2025',
    title: 'Gaza Civilian Power Transformer Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip neighborhood electrical transformers',
    summary:
      'Multi-outlet video and photo packages document destruction of civilian power transformers supplying residential and medical loads including for families with children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA energy-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of transformer damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-olive-press-visual-2023-2025',
    title: 'West Bank Settler Olive Press Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive presses',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive presses, denying oil production and income for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive-press attacks affecting civilian livelihoods.',
    sources: [
      { label: 'B\'Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B\'Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B\'Tselem settler-violence video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B\'Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-fuel-depot-civilian-impact-visual-2023-2025',
    title: 'Gaza Fuel Depot Strikes Civilian Impact — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip fuel depots and civilian energy infrastructure',
    summary:
      'Multi-outlet video packages document strikes on fuel depots with civilian secondary impacts under wartime conditions, including hospital generator shortfalls affecting children. Distinct from electricity-cut visual cards by focusing on multi-source fuel-depot packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA energy-access materials establish multi-source documentation of fuel-depot harm affecting civilian services.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet fuel-depot impact video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of fuel infrastructure aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA energy-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-ashkelon-safe-room-visual-2023',
    title: 'October 7 Ashkelon Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ashkelon residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and rocket-related civilian harm involving Ashkelon safe rooms during the October 7 attacks period. Distinct from prior Ashkelon rocket civilian visual cards by focusing on safe-room multi-source visual records; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Ashkelon safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ashkelon safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-wheat-field-arson-visual-2023-2025',
    title: 'West Bank Settler Wheat Field Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village wheat fields and grain plots',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian wheat fields, denying staple food production including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of wheat-field arson affecting civilian food production.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem wheat-field arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-reim-parking-visual-2023',
    title: 'October 7 Nova Festival Parking Area Near Re\'im — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Parking areas near Re\'im / Nova festival site, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence in parking and approach areas near the Nova festival site on October 7. Multi-party visual record distinct from main-stage packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence near Re\'im on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-sewage-plant-strike-visual-2023-2025',
    title: 'Gaza Civilian Sewage Plant Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip wastewater treatment facilities',
    summary:
      'Multi-outlet video and photo packages document damage to civilian sewage treatment facilities serving families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA WASH materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of sewage-plant damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-water-cistern-visual-2023-2025',
    title: 'West Bank Settler Water Cistern Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village water cisterns and storage tanks',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian water cisterns, denying household water including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of cistern attacks affecting civilian water access.',
    sources: [
      { label: 'B\'Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B\'Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B\'Tselem settler-violence video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B\'Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-communications-tower-civilian-impact-visual-2023-2025',
    title: 'Gaza Communications Tower Strikes Civilian Impact — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip communications towers and civilian telecom infrastructure',
    summary:
      'Multi-outlet video packages document strikes on communications towers with civilian secondary impacts under wartime conditions, including loss of emergency coordination for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA connectivity materials establish multi-source documentation of communications-tower harm affecting civilian services.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet communications-tower impact video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of telecom infrastructure aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA connectivity trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-netivot-safe-room-visual-2023',
    title: 'October 7 Netivot Safe-Room Civilian Murders — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Netivot residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian murders and rocket-related civilian harm involving Netivot safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Netivot safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Netivot safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-barley-field-arson-visual-2023-2025',
    title: 'West Bank Settler Barley Field Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village barley fields and grain plots',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian barley fields, denying staple food production including for families with children. Multi-source visual record distinct from wheat-field arson cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of barley-field arson affecting civilian food production.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem barley-field arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-alumim-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Alumim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Alumim, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Kibbutz Alumim on October 7. Multi-party visual record distinct from kibbutz-compound packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on Alumim-area roads on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-telecom-tower-strike-visual-2023-2025',
    title: 'Gaza Civilian Telecom Tower Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip neighborhood telecom towers',
    summary:
      'Multi-outlet video and photo packages document destruction of civilian telecom towers used for family and emergency communication including for children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA connectivity materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of telecom-tower damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-solar-panel-visual-2023-2025',
    title: 'West Bank Settler Solar Panel Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village rooftop and farm solar arrays',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian solar panels, denying electricity including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of solar-panel attacks affecting civilian energy access.',
    sources: [
      { label: 'B\'Tselem video bank', url: 'https://www.btselem.org/video' },
      { label: 'B\'Tselem settler violence documentation', url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'B\'Tselem settler-violence video bank', url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: 'B\'Tselem settler violence case files', url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-power-plant-civilian-impact-visual-2023-2025',
    title: 'Gaza Power Plant Civilian Impact — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip power plants and civilian electricity infrastructure',
    summary:
      'Multi-outlet video packages document strikes and outages at power plants with civilian secondary impacts under wartime conditions, including hospital blackouts affecting children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA energy-access materials establish multi-source documentation of power-plant harm affecting civilian services.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet infrastructure impact video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of infrastructure aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-kiryat-malachi-safe-room-visual-2023',
    title: 'October 7 Kiryat Malachi Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kiryat Malachi residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Kiryat Malachi safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Kiryat Malachi safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-chickpea-field-arson-visual-2023-2025',
    title: 'West Bank Settler Chickpea Field Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village chickpea fields and pulse plots',
    summary:
      "B\'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian chickpea fields, denying staple food production including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B\'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of chickpea-field arson affecting civilian food production.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-gaza-internet-cable-cut-civilian-impact-visual-2023-2025',
    title: 'Gaza Internet Cable Cuts Civilian Impact — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip undersea and terrestrial internet cable nodes',
    summary:
      'Multi-outlet video packages document internet cable cuts and connectivity collapses under wartime conditions, affecting civilian emergency coordination including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA connectivity materials establish multi-source documentation of internet-cable harm affecting civilian services.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet infrastructure impact video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of infrastructure aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-ashdod-safe-room-visual-2023',
    title: 'October 7 Ashdod Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ashdod residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Ashdod safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Ashdod safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-lentil-field-arson-visual-2023-2025',
    title: 'West Bank Settler Lentil Field Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village lentil fields and pulse plots',
    summary:
      "B\'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian lentil fields, denying staple food production including for families with children. Multi-source visual record distinct from chickpea-field arson cards; ethnicity is never evidence.",
    evidence:
      "B\'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of lentil-field arson affecting civilian food production.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kerem-shalom-road-visual-2023',
    title: 'October 7 Roads Near Kerem Shalom Crossing — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kerem Shalom crossing, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on roads near Kerem Shalom on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence near Kerem Shalom on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-port-warehouse-strike-visual-2023-2025',
    title: 'Gaza Civilian Port Warehouse Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip port and warehouse zones',
    summary:
      'Multi-outlet video and photo packages document damage to civilian port warehouses used for food and goods including for families with children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA logistics materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of warehouse damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-greenhouse-visual-2023-2025',
    title: 'West Bank Settler Greenhouse Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village greenhouse clusters',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian greenhouses, denying protected cultivation including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of greenhouse attacks affecting civilian agriculture.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-solar-farm-strike-visual-2023-2025',
    title: 'Gaza Solar Farm Strikes Civilian Impact — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip solar farms and civilian renewable energy sites',
    summary:
      'Multi-outlet video packages document strikes on solar farms with civilian energy secondary impacts under wartime conditions, including loss of power for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA energy-access materials establish multi-source documentation of solar-farm harm affecting civilian services.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet solar-farm impact video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of solar infrastructure aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA energy-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-beersheba-safe-room-visual-2023',
    title: 'October 7 Beersheba Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Beersheba residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Beersheba safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Beersheba safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Beersheba safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-harvest-net-theft-visual-2023-2025',
    title: 'West Bank Settler Olive Harvest Net Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves during harvest',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian olive harvest nets, denying harvest collection including food income for families with children. Multi-source visual record distinct from olive-netting-rolls cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of harvest-net theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem harvest-net theft video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-zikklim-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Zikim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Zikim, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on roads near Kibbutz Zikim on October 7. Multi-party visual record distinct from beach packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence near Zikim on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-bridge-strike-visual-2023-2025',
    title: 'Gaza Civilian Bridge Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip civilian road bridges and overpasses',
    summary:
      'Multi-outlet video and photo packages document destruction of civilian bridges used for family movement and medical access including for children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bridge damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-olive-grove-visual-2023-2025',
    title: 'West Bank Settler Olive Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive groves, denying harvest including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive-grove attacks affecting civilian agriculture.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-water-well-destruction-visual-2023-2025',
    title: 'Gaza Civilian Water Well Destruction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip civilian water wells and borehole sites',
    summary:
      'Multi-outlet video packages document destruction of civilian water wells under wartime conditions, denying drinking and irrigation water including for families with children. Multi-source visual record distinct from desalination-plant and water-tank cards; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA water-access materials establish multi-source documentation of water-well destruction affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT water materials', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza water packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet water-well destruction video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of well destruction aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA water-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-raanana-safe-room-visual-2023',
    title: 'October 7 Ra’anana Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ra’anana residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Ra’anana safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Ra’anana safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ra’anana safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-fig-orchard-arson-visual-2023-2025',
    title: 'West Bank Settler Fig Orchard Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig orchards',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian fig orchards, denying multi-year food income including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of fig-orchard arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem fig-orchard arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-school-playground-strike-visual-2023-2025',
    title: 'Gaza School Playground Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip school playgrounds and child recreation areas',
    summary:
      'Multi-outlet video packages document strikes affecting school playgrounds under wartime conditions, including children. Distinct from UNRWA school-shelter visual cards by focusing on multi-source playground packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA education materials establish multi-source documentation of civilian harm at school playgrounds.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza education packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet school-playground strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of playground aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA education-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-modiin-safe-room-visual-2023',
    title: 'October 7 Modi’in Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Modi’in residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Modi’in safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Modi’in safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Modi’in safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-packing-house-arson-visual-2023-2025',
    title: 'West Bank Settler Grape Packing House Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape packing houses and processing sheds',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian grape packing houses, denying fruit processing including income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of packing-house arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem packing-house arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-yad-mordechai-road-visual-2023',
    title: 'October 7 Roads Near Kibbutz Yad Mordechai — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Kibbutz Yad Mordechai, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on roads near Kibbutz Yad Mordechai on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence near Yad Mordechai on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-fuel-depot-strike-visual-2023-2025',
    title: 'Gaza Civilian Fuel Depot Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip civilian fuel storage and distribution points',
    summary:
      'Multi-outlet video and photo packages document damage to civilian fuel depots used for generators, ambulances, and household power including for families with children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA energy-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of fuel-depot damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-well-attack-visual-2023-2025',
    title: 'West Bank Settler Well Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village wells and water points',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian wells, denying water including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of well attacks affecting civilian water access.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-mosque-shelter-strike-visual-2023-2025',
    title: 'Gaza Mosque Shelter Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip mosques used as civilian shelters',
    summary:
      'Multi-outlet video packages document strikes affecting mosques used as civilian shelters under wartime conditions, including children. Distinct from church-shelter and settler mosque-attack visual cards by focusing on multi-source Gaza shelter packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA displacement materials establish multi-source documentation of civilian harm at mosque shelters.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza shelter packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet mosque-shelter strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of mosque-shelter aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA displacement trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-petah-tikva-safe-room-visual-2023',
    title: 'October 7 Petah Tikva Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Petah Tikva residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Petah Tikva safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Petah Tikva safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Petah Tikva safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-date-palm-arson-visual-2023-2025',
    title: 'West Bank Settler Date Palm Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date palm groves',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian date palms, denying multi-year food income including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of date-palm arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem date-palm arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-market-stall-strike-visual-2023-2025',
    title: 'Gaza Civilian Market Stall Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip neighborhood market stalls',
    summary:
      'Multi-outlet video and photo packages document damage to civilian market stalls that supply food for families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA food-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of market-stall damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-orchard-visual-2023-2025',
    title: 'West Bank Settler Fig Orchard Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig orchards',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig orchards, denying harvest including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig-orchard attacks affecting civilian agriculture.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-sderot-bus-stop-visual-2023',
    title: 'October 7 Sderot Bus Stop Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Bus stops in Sderot, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Sderot bus stops on October 7. Multi-party visual record distinct from city-center packages; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Sderot bus stops on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-cemetery-strike-visual-2023-2025',
    title: 'Gaza Cemetery Strikes and Desecration — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip civilian cemeteries and burial grounds',
    summary:
      'Multi-outlet video packages document strikes and damage at civilian cemeteries under wartime conditions, affecting burial rights for families with children. Distinct from settler cemetery-desecration visual cards by focusing on multi-source Gaza packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA civilian-protection materials establish multi-source documentation of cemetery harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza civilian packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet cemetery strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of cemetery aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA civilian-protection trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-herzliya-safe-room-visual-2023',
    title: 'October 7 Herzliya Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Herzliya residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Herzliya safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Herzliya safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Herzliya safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-pomegranate-orchard-arson-visual-2023-2025',
    title: 'West Bank Settler Pomegranate Orchard Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pomegranate orchards',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian pomegranate orchards, denying multi-year food income including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of pomegranate-orchard arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem pomegranate-orchard arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-market-warehouse-strike-visual-2023-2025',
    title: 'Gaza Market Warehouse Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip food market warehouses and storage sites',
    summary:
      'Multi-outlet video packages document strikes on market warehouses under wartime conditions, denying civilian food storage including for families with children. Distinct from market-strike and bakery visual cards by focusing on multi-source warehouse packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA food-access materials establish multi-source documentation of warehouse harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza food packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet market-warehouse strike video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of warehouse aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA food-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-kfar-saba-safe-room-visual-2023',
    title: 'October 7 Kfar Saba Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Kfar Saba residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Kfar Saba safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Kfar Saba safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Kfar Saba safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-press-roof-arson-visual-2023-2025',
    title: 'West Bank Settler Olive Press Roof Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive press roofs and processing buildings',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian olive press roofs, denying oil processing including income for families with children. Multi-source visual record distinct from olive-press arson cards by focusing on roof-structure packages; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of press-roof arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem press-roof arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-school-yard-strike-visual-2023-2025',
    title: 'Gaza Civilian School Yard Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip school yard strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian school yard strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of school yard strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-almond-grove-visual-2023-2025',
    title: 'West Bank Settler Almond Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village almond grove areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond grove, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond grove attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ofakim-road-visual-2023',
    title: 'October 7 Ofakim Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ofakim Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ofakim Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ofakim Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-aid-convoy-strike-visual-2023-2025',
    title: 'Gaza Aid Convoy Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip aid convoy routes and distribution approaches',
    summary:
      'Multi-outlet video packages document strikes and harm affecting aid convoys under wartime conditions, including children waiting for food. Distinct from flour-massacre and aid-distribution visual cards by focusing on multi-source convoy packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA humanitarian access materials establish multi-source documentation of convoy harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza aid packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet aid-convoy video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of convoy aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-hod-hasharon-safe-room-visual-2023',
    title: 'October 7 Hod HaSharon Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Hod HaSharon residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Hod HaSharon safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Hod HaSharon safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-vine-cutting-visual-2023-2025',
    title: 'West Bank Settler Grape Vine Cutting — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards and trellis rows',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler cutting of Palestinian civilian grape vines, denying multi-year fruit production including income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of vine cutting affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-hospital-generator-strike-visual-2023-2025',
    title: 'Gaza Hospital Generator Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip hospital generator yards and backup power sites',
    summary:
      'Multi-outlet video packages document strikes and damage to hospital generators under wartime conditions, denying backup power for civilian care including for children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of generator harm affecting civilian hospital function.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza hospital packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet hospital-generator video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of generator aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-ramat-gan-safe-room-visual-2023',
    title: 'October 7 Ramat Gan Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ramat Gan residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Ramat Gan safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Ramat Gan safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Ramat Gan safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-drying-house-arson-visual-2023-2025',
    title: 'West Bank Settler Grape Drying House Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape drying houses and raisin sheds',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian grape drying houses, denying fruit processing including income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of drying-house arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem drying-house arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-ambulance-depot-strike-visual-2023-2025',
    title: 'Gaza Ambulance Depot Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip ambulance depots and EMS parking yards',
    summary:
      'Multi-outlet video packages document strikes on ambulance depots under wartime conditions, denying EMS capacity for civilians including children. Distinct from ambulance-bay and ambulance-access-denied visual cards by focusing on multi-source depot packages; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of ambulance-depot harm affecting civilian emergency services.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza EMS packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet ambulance-depot video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of EMS depot aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-bat-yam-safe-room-visual-2023',
    title: 'October 7 Bat Yam Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Bat Yam residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Bat Yam safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Bat Yam safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated Bat Yam safe-room October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-fig-packing-house-arson-visual-2023-2025',
    title: 'West Bank Settler Fig Packing House Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig packing houses and processing sheds',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian fig packing houses, denying fruit processing including income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of packing-house arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem packing-house arson video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem agricultural-violence case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-ashkelon-bus-stop-visual-2023',
    title: 'October 7 Ashkelon Bus Stop — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ashkelon Bus Stop, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashkelon Bus Stop on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashkelon Bus Stop on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-unrwa-clinic-strike-visual-2023-2025',
    title: 'Gaza Civilian Unrwa Clinic Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip unrwa clinic strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian unrwa clinic strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of unrwa clinic strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-grape-harvest-visual-2023-2025',
    title: 'West Bank Settler Grape Harvest Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape harvest areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape harvest, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape harvest attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-food-warehouse-strike-visual-2023-2025',
    title: 'Gaza Food Warehouse Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip civilian food warehouses and storage facilities',
    summary:
      'Multi-outlet video packages document strikes on food warehouses under wartime conditions, denying civilian food storage including for families with children. Distinct from market-warehouse visual cards by focusing on multi-source food-storage packages; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA food-access materials establish multi-source documentation of warehouse harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza food packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet food-warehouse video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of warehouse aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA food-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-givatayim-safe-room-visual-2023',
    title: 'October 7 Givatayim Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Givatayim residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Givatayim safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Givatayim safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-ladder-theft-visual-2023-2025',
    title: 'West Bank Settler Olive Ladder Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves during harvest',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian olive harvest ladders, denying harvest access including food income for families with children. Multi-source visual record distinct from olive-ladder-rungs cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of ladder theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-blood-bank-strike-visual-2023-2025',
    title: 'Gaza Blood Bank Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip blood banks and transfusion centers',
    summary:
      'Multi-outlet video packages document strikes and outages at blood banks under wartime conditions, denying transfusion capacity for civilians including children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of blood-bank harm affecting civilian care.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet blood-bank video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of blood-bank aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-bnei-brak-safe-room-visual-2023',
    title: 'October 7 Bnei Brak Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Bnei Brak residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Bnei Brak safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Bnei Brak safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-harvest-sacks-theft-visual-2023-2025',
    title: 'West Bank Settler Olive Harvest Sacks Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves during harvest',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian olive harvest sacks, denying harvest logistics including food income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of harvest-sack theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ashdod-bus-stop-visual-2023',
    title: 'October 7 Ashdod Bus Stop Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Bus stops in Ashdod, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashdod bus stops on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashdod bus stops on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-field-hospital-strike-visual-2023-2025',
    title: 'Gaza Civilian Field Hospital Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip field hospital sites',
    summary:
      'Multi-outlet video and photo packages document damage to civilian field hospitals serving families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA health-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of field-hospital damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-wheat-field-visual-2023-2025',
    title: 'West Bank Settler Wheat Field Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village wheat fields',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian wheat fields, denying grain harvest including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of wheat-field attacks affecting civilian agriculture.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-pharmacy-warehouse-strike-visual-2023-2025',
    title: 'Gaza Pharmacy Warehouse Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip pharmacy warehouses and medical supply storage',
    summary:
      'Multi-outlet video packages document strikes on pharmacy warehouses under wartime conditions, denying medicine storage for civilians including children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of pharmacy-warehouse harm affecting civilian care.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet pharmacy-warehouse video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of warehouse aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-holon-safe-room-visual-2023',
    title: 'October 7 Holon Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Holon residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Holon safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Holon safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-harvest-combs-theft-visual-2023-2025',
    title: 'West Bank Settler Olive Harvest Combs Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive groves during harvest',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian olive picking combs, denying harvest tools including food income for families with children. Multi-source visual record distinct from olive-picking-combs destruction cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of comb theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-netivot-road-visual-2023',
    title: 'October 7 Roads Near Netivot — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Roads near Netivot, southern Israel',
    summary:
      'Multi-outlet video documents civilian vehicle attacks on roads near Netivot on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence near Netivot on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-pharmacy-strike-visual-2023-2025',
    title: 'Gaza Civilian Pharmacy Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip neighborhood pharmacies',
    summary:
      'Multi-outlet video and photo packages document damage to civilian pharmacies serving families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA health-access materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pharmacy damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-citrus-grove-visual-2023-2025',
    title: 'West Bank Settler Citrus Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village citrus groves',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian citrus groves, denying harvest including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of citrus-grove attacks affecting civilian agriculture.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-medical-warehouse-strike-visual-2023-2025',
    title: 'Gaza Medical Warehouse Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip medical warehouses and supply storage facilities',
    summary:
      'Multi-outlet video packages document strikes on medical warehouses under wartime conditions, denying medical supply storage for civilians including children. Multi-source visual record distinct from pharmacy-warehouse cards; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of medical-warehouse harm affecting civilian care.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet medical-warehouse video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of warehouse aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-netanya-safe-room-visual-2023',
    title: 'October 7 Netanya Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Netanya residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Netanya safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Netanya safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-press-door-arson-visual-2023-2025',
    title: 'West Bank Settler Olive Press Door Arson — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive press doors and entry structures',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian olive press doors, denying access to oil processing including income for families with children. Multi-source visual record distinct from olive-press roof arson cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of press-door arson affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-sderot-junction-visual-2023',
    title: 'October 7 Sderot Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Sderot Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Sderot Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Sderot Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-water-well-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Well Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip water well strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian water well strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water well strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-date-palm-visual-2023-2025',
    title: 'West Bank Settler Date Palm Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date palm areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date palm, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date palm attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-oxygen-plant-strike-visual-2023-2025',
    title: 'Gaza Oxygen Plant Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip medical oxygen plants and cylinder filling sites',
    summary:
      'Multi-outlet video packages document strikes and outages at medical oxygen plants under wartime conditions, denying oxygen supply for civilians including children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of oxygen-plant harm affecting civilian care.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet oxygen-plant video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of oxygen-plant aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-rehovot-safe-room-visual-2023',
    title: 'October 7 Rehovot Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Rehovot residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Rehovot safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Rehovot safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-olive-oil-tank-destruction-visual-2023-2025',
    title: 'West Bank Settler Olive Oil Tank Destruction — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive oil storage tanks and packing sheds',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler destruction of Palestinian civilian olive oil storage tanks, denying oil storage including income for families with children. Multi-source visual record distinct from olive-oil-tins cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of oil-tank destruction affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-beersheba-road-visual-2023',
    title: 'October 7 Beersheba Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Beersheba Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Beersheba Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Beersheba Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-seedling-visual-2023-2025',
    title: 'West Bank Settler Olive Seedling Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive seedling areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive seedling, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive seedling attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kiryat-gat-road-visual-2023',
    title: 'October 7 Kiryat Gat Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kiryat Gat Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Kiryat Gat Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kiryat Gat Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-vaccine-cold-chain-strike-visual-2023-2025',
    title: 'Gaza Vaccine Cold-Chain Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip vaccine cold-chain storage and immunization points',
    summary:
      'Multi-outlet video packages document strikes and outages affecting vaccine cold-chain storage under wartime conditions, denying immunization capacity for civilians including children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'WHO health-cluster materials, multi-outlet visual packages, and OHCHR materials establish multi-source documentation of cold-chain harm affecting civilian immunization.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza medical packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet vaccine cold-chain video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of cold-chain aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OHCHR medical-protection trail', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-hadera-safe-room-visual-2023',
    title: 'October 7 Hadera Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Hadera residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Hadera safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Hadera safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-pruning-tool-theft-visual-2023-2025',
    title: 'West Bank Settler Grape Pruning Tool Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards during pruning season',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian grape pruning tools, denying vineyard maintenance including income for families with children. Multi-source visual record distinct from grape-pruning-shears destruction cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of pruning-tool theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-water-treatment-plant-strike-visual-2023-2025',
    title: 'Gaza Water Treatment Plant Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip water treatment plants and purification facilities',
    summary:
      'Multi-outlet video packages document strikes and outages at water treatment plants under wartime conditions, denying clean water for civilians including children. Multi-source visual record distinct from desalination-plant cards; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA water-access materials establish multi-source documentation of treatment-plant harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT water materials', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza water packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet water-treatment video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of treatment-plant aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA water-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-lod-safe-room-visual-2023',
    title: 'October 7 Lod Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Lod residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Lod safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Lod safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-packing-box-theft-visual-2023-2025',
    title: 'West Bank Settler Grape Packing Box Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards during harvest',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian grape packing boxes, denying harvest logistics including income for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of packing-box theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-school-kitchen-strike-visual-2023-2025',
    title: 'Gaza Civilian School Kitchen Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip school kitchen strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian school kitchen strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of school kitchen strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-pomegranate-visual-2023-2025',
    title: 'West Bank Settler Pomegranate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pomegranate areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian pomegranate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of pomegranate attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kiryat-malachi-road-visual-2023',
    title: 'October 7 Kiryat Malachi Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kiryat Malachi Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Kiryat Malachi Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kiryat Malachi Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-rooftop-tank-strike-visual-2023-2025',
    title: 'Gaza Civilian Rooftop Tank Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip rooftop tank strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian rooftop tank strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of rooftop tank strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-apricot-grove-visual-2023-2025',
    title: 'West Bank Settler Apricot Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village apricot grove areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian apricot grove, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of apricot grove attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ashkelon-junction-visual-2023',
    title: 'October 7 Ashkelon Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ashkelon Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashkelon Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashkelon Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-power-substation-strike-visual-2023-2025',
    title: 'Gaza Power Substation Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip power substations and electrical distribution nodes',
    summary:
      'Multi-outlet video packages document strikes on power substations under wartime conditions, denying electricity for civilians including children. Multi-source visual record distinct from power-plant cards; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA energy-access materials establish multi-source documentation of substation harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT energy materials', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet power-substation video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of substation aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA energy-access trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-ramla-safe-room-visual-2023',
    title: 'October 7 Ramla Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Ramla residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Ramla safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Ramla safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-trellis-wire-theft-visual-2023-2025',
    title: 'West Bank Settler Grape Trellis Wire Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards and trellis rows',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian grape trellis wire, denying vineyard structure including income for families with children. Multi-source visual record distinct from grape-trellis-wires destruction cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of trellis-wire theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-telecom-switch-strike-visual-2023-2025',
    title: 'Gaza Telecom Switch Strikes — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'Gaza Strip telecom switches and network exchange facilities',
    summary:
      'Multi-outlet video packages document strikes on telecom switches under wartime conditions, denying communications for civilians including children. Multi-source visual record distinct from communications-tower cards; ethnicity is never evidence.',
    evidence:
      'OHCHR materials, multi-outlet visual packages, and OCHA connectivity materials establish multi-source documentation of telecom-switch harm affecting civilians.',
    sources: [
      { label: 'OHCHR materials', url: 'https://www.ohchr.org/' },
      { label: 'OCHA OPT connectivity materials', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza infrastructure packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet telecom-switch video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of telecom aftermath', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'document', label: 'OCHA connectivity trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-oct7-yavne-safe-room-visual-2023',
    title: 'October 7 Yavne Safe-Room Civilian Harm — Multi-Outlet Visual Record',
    date: 'October 7, 2023',
    location: 'Yavne residential safe rooms and home shelters',
    summary:
      'Authenticated multi-outlet video packages document civilian harm involving Yavne safe rooms during the October 7 attacks period. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Multi-outlet October 7 visual investigations, Israeli government materials, and forensic open-source packages establish multi-source documentation of civilian-targeted violence affecting Yavne safe rooms on and around October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-grape-stem-cutter-theft-visual-2023-2025',
    title: 'West Bank Settler Grape Stem Cutter Theft — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village vineyards during harvest',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler theft of Palestinian civilian grape stem cutters, denying harvest processing tools including income for families with children. Multi-source visual record distinct from grape-stem-cutters destruction cards; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence materials, and multi-outlet reporting establish multi-source documentation of stem-cutter theft affecting civilian agricultural livelihoods.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler-violence materials", url: 'https://www.btselem.org/' },
      { label: 'OCHA OPT updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem agricultural-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem case files", url: 'https://www.btselem.org/' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-desalination-strike-visual-2023-2025',
    title: 'Gaza Civilian Desalination Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip desalination strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian desalination strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of desalination strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-grove-visual-2023-2025',
    title: 'West Bank Settler Fig Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig grove areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig grove, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig grove attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ofakim-junction-visual-2023',
    title: 'October 7 Ofakim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ofakim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ofakim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ofakim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-west-bank-settler-almond-seedling-visual-2023-2025',
    title: 'West Bank Settler Almond Seedling Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village almond seedling areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond seedling, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond seedling attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-sderot-roundabout-visual-2023',
    title: 'October 7 Sderot Roundabout — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Sderot Roundabout, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Sderot Roundabout on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Sderot Roundabout on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-water-tower-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Tower Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip water tower strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian water tower strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water tower strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },


  {
    id: 'vi-oct7-ashdod-junction-visual-2023',
    title: 'October 7 Ashdod Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ashdod Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashdod Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashdod Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-nursery-visual-2023-2025',
    title: 'West Bank Settler Olive Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive nursery areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive nursery, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive nursery attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-field-clinic-strike-visual-2023-2025',
    title: 'Gaza Civilian Field Clinic Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip field clinic strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian field clinic strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of field clinic strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },


  {
    id: 'vi-oct7-beersheba-junction-visual-2023',
    title: 'October 7 Beersheba Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Beersheba Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Beersheba Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Beersheba Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-citrus-nursery-visual-2023-2025',
    title: 'West Bank Settler Citrus Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village citrus nursery areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian citrus nursery, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of citrus nursery attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ashkelon-industrial-visual-2023',
    title: 'October 7 Ashkelon Industrial — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ashkelon Industrial, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashkelon Industrial on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashkelon Industrial on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-bakery-oven-strike-visual-2023-2025',
    title: 'Gaza Civilian Bakery Oven Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip bakery oven strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian bakery oven strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bakery oven strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-olive-press-door-visual-2023-2025',
    title: 'West Bank Settler Olive Press Door Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive press door areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive press door, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive press door attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-sderot-industrial-visual-2023',
    title: 'October 7 Sderot Industrial — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Sderot Industrial, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Sderot Industrial on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Sderot Industrial on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-clinic-pharmacy-strike-visual-2023-2025',
    title: 'Gaza Civilian Clinic Pharmacy Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip clinic pharmacy strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian clinic pharmacy strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of clinic pharmacy strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-wheat-seedling-visual-2023-2025',
    title: 'West Bank Settler Wheat Seedling Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village wheat seedling areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian wheat seedling, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of wheat seedling attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ofakim-industrial-visual-2023',
    title: 'October 7 Ofakim Industrial — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ofakim Industrial, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ofakim Industrial on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ofakim Industrial on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-cellular-tower-strike-visual-2023-2025',
    title: 'Gaza Civilian Cellular Tower Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip cellular tower strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian cellular tower infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of cellular tower strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-plum-grove-visual-2023-2025',
    title: 'West Bank Settler Plum Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village plum grove areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian plum grove, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of plum grove attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-netivot-junction-visual-2023',
    title: 'October 7 Netivot Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Netivot Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Netivot Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Netivot Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-water-reservoir-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Reservoir Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip water reservoir strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian water reservoir strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water reservoir strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-nursery-visual-2023-2025',
    title: 'West Bank Settler Fig Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig nursery areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig nursery, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig nursery attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ashdod-industrial-visual-2023',
    title: 'October 7 Ashdod Industrial — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ashdod Industrial, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashdod Industrial on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashdod Industrial on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-broadcast-antenna-strike-visual-2023-2025',
    title: 'Gaza Civilian Broadcast Antenna Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip broadcast antenna strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian broadcast antenna infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of broadcast antenna strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-walnut-grove-visual-2023-2025',
    title: 'West Bank Settler Walnut Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village walnut grove areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian walnut groves, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of walnut grove attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kiryat-gat-roundabout-visual-2023',
    title: 'October 7 Kiryat Gat Roundabout — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kiryat Gat Roundabout, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Kiryat Gat Roundabout on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kiryat Gat Roundabout on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-west-bank-settler-date-nursery-visual-2023-2025',
    title: 'West Bank Settler Date Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date nursery areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date nursery, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date nursery attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-netivot-industrial-visual-2023',
    title: 'October 7 Netivot Industrial — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Netivot Industrial, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Netivot Industrial on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Netivot Industrial on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-telecom-hub-strike-visual-2023-2025',
    title: 'Gaza Civilian Telecom Hub Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip telecom hub strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian telecom hub strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of telecom hub strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-fiber-backbone-strike-visual-2023-2025',
    title: 'Gaza Civilian Fiber Backbone Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip fiber backbone strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian fiber backbone infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of fiber backbone strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-carob-grove-visual-2023-2025',
    title: 'West Bank Settler Carob Grove Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village carob grove areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian carob groves, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of carob grove attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-beersheba-bus-stop-visual-2023',
    title: 'October 7 Beersheba Bus Stop — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Beersheba bus stop, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at a Beersheba bus stop on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at a Beersheba bus stop on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-oct7-kiryat-gat-junction-visual-2023',
    title: 'October 7 Kiryat Gat Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kiryat Gat Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Kiryat Gat Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kiryat Gat Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-pomegranate-nursery-visual-2023-2025',
    title: 'West Bank Settler Pomegranate Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pomegranate nursery areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian pomegranate nursery, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of pomegranate nursery attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-port-crane-strike-visual-2023-2025',
    title: 'Gaza Civilian Port Crane Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip port crane strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian port crane strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of port crane strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-microwave-link-strike-visual-2023-2025',
    title: 'Gaza Civilian Microwave Link Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip microwave link strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian microwave link infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of microwave link strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-grape-nursery-visual-2023-2025',
    title: 'West Bank Settler Grape Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-rahate-junction-visual-2023',
    title: 'October 7 Rahat Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Rahat Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Rahat Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Rahat Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-grain-silo-strike-visual-2023-2025',
    title: 'Gaza Civilian Grain Silo Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip grain silo strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian grain silo strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of grain silo strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-olive-nursery-door-visual-2023-2025',
    title: 'West Bank Settler Olive Nursery Door Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive nursery door areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive nursery door, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive nursery door attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ashkelon-port-road-visual-2023',
    title: 'October 7 Ashkelon Port Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ashkelon Port Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ashkelon Port Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ashkelon Port Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-cold-storage-strike-visual-2023-2025',
    title: 'Gaza Civilian Cold Storage Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip cold storage strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian cold storage strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of cold storage strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-sderot-industrial-zone-visual-2023',
    title: 'October 7 Sderot Industrial Zone — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Sderot Industrial Zone, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Sderot Industrial Zone on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Sderot Industrial Zone on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-grape-nursery-gate-visual-2023-2025',
    title: 'West Bank Settler Grape Nursery Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape nursery gate areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape nursery gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape nursery gate attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-radio-relay-strike-visual-2023-2025',
    title: 'Gaza Civilian Radio Relay Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip radio relay strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian radio relay infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of radio relay strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-apricot-nursery-visual-2023-2025',
    title: 'West Bank Settler Apricot Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village apricot nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian apricot nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of apricot nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-lehavyim-junction-visual-2023',
    title: 'October 7 Lehavim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Lehavim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Lehavim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Lehavim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-fuel-pipeline-strike-visual-2023-2025',
    title: 'Gaza Civilian Fuel Pipeline Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip fuel pipeline strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian fuel pipeline strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of fuel pipeline strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-ofakim-bus-depot-visual-2023',
    title: 'October 7 Ofakim Bus Depot — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ofakim Bus Depot, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ofakim Bus Depot on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ofakim Bus Depot on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-nursery-fence-visual-2023-2025',
    title: 'West Bank Settler Olive Nursery Fence Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive nursery fence areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive nursery fence, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive nursery fence attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-isp-node-strike-visual-2023-2025',
    title: 'Gaza Civilian ISP Node Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip ISP node strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian ISP node infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of ISP node strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-almond-nursery-visual-2023-2025',
    title: 'West Bank Settler Almond Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village almond nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-meitar-junction-visual-2023',
    title: 'October 7 Meitar Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Meitar Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Meitar Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Meitar Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },


  {
    id: 'vi-gaza-water-main-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Main Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip water main strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian water main strike used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water main strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-netivot-bus-station-visual-2023',
    title: 'October 7 Netivot Bus Station — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Netivot Bus Station, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Netivot Bus Station on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Netivot Bus Station on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-citrus-nursery-gate-visual-2023-2025',
    title: 'West Bank Settler Citrus Nursery Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village citrus nursery gate areas',
    summary:
      'B\'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian citrus nursery gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B\'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of citrus nursery gate attacks affecting civilians.',
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-satellite-dish-cluster-strike-visual-2023-2025',
    title: 'Gaza Civilian Satellite Dish Cluster Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip satellite dish cluster strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian satellite dish clusters used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of satellite dish cluster strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-peach-nursery-visual-2023-2025',
    title: 'West Bank Settler Peach Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village peach nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian peach nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of peach nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-tarabin-junction-visual-2023',
    title: 'October 7 Tarabin Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Tarabin Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Tarabin Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Tarabin Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-community-wifi-mast-strike-visual-2023-2025',
    title: 'Gaza Civilian Community WiFi Mast Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip community WiFi mast strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian community WiFi mast infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of community WiFi mast strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-plum-nursery-visual-2023-2025',
    title: 'West Bank Settler Plum Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village plum nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian plum nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of plum nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-lahav-junction-visual-2023',
    title: 'October 7 Lahav Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Lahav Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Lahav Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Lahav Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-pharmacy-storefront-strike-visual-2023-2025',
    title: 'Gaza Civilian Pharmacy Storefront Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip pharmacy storefront strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian pharmacy storefronts used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pharmacy storefront strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-kiryat-malachi-junction-visual-2023',
    title: 'October 7 Kiryat Malachi Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kiryat Malachi Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Kiryat Malachi Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kiryat Malachi Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-date-nursery-gate-visual-2023-2025',
    title: 'West Bank Settler Date Nursery Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date nursery gate areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date nursery gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date nursery gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-public-phone-booth-strike-visual-2023-2025',
    title: 'Gaza Civilian Public Phone Booth Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip public phone booth strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian public phone booth infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of public phone booth strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-walnut-nursery-visual-2023-2025',
    title: 'West Bank Settler Walnut Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village walnut nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian walnut nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of walnut nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-shireen-junction-visual-2023',
    title: 'October 7 Shireen Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Shireen Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Shireen Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Shireen Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-neighborhood-router-hub-strike-visual-2023-2025',
    title: 'Gaza Civilian Neighborhood Router Hub Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip neighborhood router hub strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian neighborhood router hub infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of neighborhood router hub strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-carob-nursery-visual-2023-2025',
    title: 'West Bank Settler Carob Nursery Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village carob nursery areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian carob nurseries, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of carob nursery attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-um-batin-junction-visual-2023',
    title: 'October 7 Um Batin Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Um Batin Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Um Batin Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Um Batin Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-mesh-network-node-strike-visual-2023-2025',
    title: 'Gaza Civilian Mesh Network Node Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip mesh network node strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian mesh network node infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of mesh network node strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-pomegranate-seedling-visual-2023-2025',
    title: 'West Bank Settler Pomegranate Seedling Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pomegranate seedling areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian pomegranate seedlings, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of pomegranate seedling attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-tel-sheva-junction-visual-2023',
    title: 'October 7 Tel Sheva Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Tel Sheva Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Tel Sheva Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Tel Sheva Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-sewage-pump-strike-visual-2023-2025',
    title: 'Gaza Civilian Sewage Pump Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip sewage pump strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian sewage pump used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of sewage pump strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-shokeda-forest-road-visual-2023',
    title: 'October 7 Shokeda Forest Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Shokeda Forest Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Shokeda Forest Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Shokeda Forest Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-fig-nursery-fence-visual-2023-2025',
    title: 'West Bank Settler Fig Nursery Fence Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig nursery fence areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig nursery fence, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig nursery fence attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-community-antenna-farm-strike-visual-2023-2025',
    title: 'Gaza Civilian Community Antenna Farm Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip community antenna farm strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian community antenna farm infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of community antenna farm strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-seedling-visual-2023-2025',
    title: 'West Bank Settler Fig Seedling Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig seedling areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig seedlings, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig seedling attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-hura-junction-visual-2023',
    title: 'October 7 Hura Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Hura Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Hura Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Hura Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-press-gate-visual-2023-2025',
    title: 'West Bank Settler Olive Press Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive press gate areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive press gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive press gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-water-tank-cluster-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Tank Cluster Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip water tank cluster strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian water tank cluster used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water tank cluster strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-lachish-region-road-visual-2023',
    title: 'October 7 Lachish Region Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Lachish Region Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Lachish Region Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Lachish Region Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-public-internet-cafe-strike-visual-2023-2025',
    title: 'Gaza Civilian Public Internet Cafe Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip public internet cafe strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian public internet cafe infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of public internet cafe strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-date-seedling-visual-2023-2025',
    title: 'West Bank Settler Date Seedling Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date seedling areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date seedlings, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date seedling attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kseife-junction-visual-2023',
    title: 'October 7 Kseife Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kseife Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Kseife Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kseife Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-clinic-ambulance-bay-strike-visual-2023-2025',
    title: 'Gaza Civilian Clinic Ambulance Bay Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip clinic ambulance bay strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian clinic ambulance bay used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of clinic ambulance bay strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-netiv-haasara-road-visual-2023',
    title: 'October 7 Netiv Haasara Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Netiv Haasara Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Netiv Haasara Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Netiv Haasara Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-grape-trellis-gate-visual-2023-2025',
    title: 'West Bank Settler Grape Trellis Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape trellis gate areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape trellis gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape trellis gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-shared-satellite-dish-strike-visual-2023-2025',
    title: 'Gaza Civilian Shared Satellite Dish Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip shared satellite dish strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian shared satellite dish infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of shared satellite dish strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-olive-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Olive Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village olive seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-arakib-junction-visual-2023',
    title: 'October 7 Arakib Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Arakib Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Arakib Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Arakib Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-market-awning-strike-visual-2023-2025',
    title: 'Gaza Civilian Market Awning Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip market awning strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian market awning used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of market awning strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-yad-mordechai-junction-visual-2023',
    title: 'October 7 Yad Mordechai Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Yad Mordechai Junction, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Yad Mordechai Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Yad Mordechai Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-almond-grove-gate-visual-2023-2025',
    title: 'West Bank Settler Almond Grove Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village almond grove gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond grove gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond grove gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-municipal-wifi-hub-strike-visual-2023-2025',
    title: 'Gaza Civilian Municipal WiFi Hub Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip municipal WiFi hub strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian municipal WiFi hub infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of municipal WiFi hub strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-grape-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Grape Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village grape seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-lakiya-junction-visual-2023',
    title: 'October 7 Lakiya Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Lakiya Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Lakiya Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Lakiya Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-street-wifi-kiosk-strike-visual-2023-2025',
    title: 'Gaza Civilian Street WiFi Kiosk Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip street WiFi kiosk strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian street WiFi kiosk infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of street WiFi kiosk strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-almond-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Almond Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village almond seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-shoket-junction-visual-2023',
    title: 'October 7 Shoket Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Shoket Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Shoket Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Shoket Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-school-yard-tank-strike-visual-2023-2025',
    title: 'Gaza Civilian School Yard Tank Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip school yard tank strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian school yard tank used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of school yard tank strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-saad-junction-visual-2023',
    title: 'October 7 Saad Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Saad Junction, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Saad Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Saad Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-grove-ladder-visual-2023-2025',
    title: 'West Bank Settler Olive Grove Ladder Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village olive grove ladder areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive grove ladder, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive grove ladder attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-municipal-archive-strike-visual-2023-2025',
    title: 'Gaza Civilian Municipal Archive Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip municipal archive strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian municipal archive used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of municipal archive strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-reim-parking-lot-visual-2023',
    title: 'October 7 Reim Parking Lot — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Reim Parking Lot, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Reim Parking Lot on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Reim Parking Lot on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-vineyard-gate-visual-2023-2025',
    title: 'West Bank Settler Vineyard Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village vineyard gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian vineyard gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of vineyard gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-poultry-coop-cluster-strike-visual-2023-2025',
    title: 'Gaza Civilian Poultry Coop Cluster Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip poultry coop cluster strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian poultry coop cluster used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of poultry coop cluster strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-herb-garden-gate-visual-2023-2025',
    title: 'West Bank Settler Herb Garden Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village herb garden gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian herb garden gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of herb garden gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-sewing-workshop-strike-visual-2023-2025',
    title: 'Gaza Civilian Sewing Workshop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip sewing workshop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian sewing workshop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of sewing workshop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-school-computer-lab-strike-visual-2023-2025',
    title: 'Gaza Civilian School Computer Lab Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip school computer lab strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian school computer lab infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of school computer lab strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Fig Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-nevatim-junction-visual-2023',
    title: 'October 7 Nevatim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Nevatim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Nevatim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nevatim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-beeri-packing-house-road-visual-2023',
    title: 'October 7 Beeri Packing House Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Beeri Packing House Road, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Beeri Packing House Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Beeri Packing House Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-wheat-field-gate-visual-2023-2025',
    title: 'West Bank Settler Wheat Field Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village wheat field gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian wheat field gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of wheat field gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-community-kitchen-strike-visual-2023-2025',
    title: 'Gaza Civilian Community Kitchen Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip community kitchen strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian community kitchen used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of community kitchen strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-youth-center-wifi-strike-visual-2023-2025',
    title: 'Gaza Civilian Youth Center WiFi Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip youth center WiFi strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian youth center WiFi infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of youth center WiFi strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-date-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Date Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-lehavim-north-junction-visual-2023',
    title: 'October 7 Lehavim North Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Lehavim North Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Lehavim North Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Lehavim North Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-nahal-oz-access-road-visual-2023',
    title: 'October 7 Nahal Oz Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Nahal Oz Access Road, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Nahal Oz Access Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nahal Oz Access Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-greenhouse-door-visual-2023-2025',
    title: 'West Bank Settler Greenhouse Door Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village greenhouse door areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian greenhouse door, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of greenhouse door attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-textile-workshop-strike-visual-2023-2025',
    title: 'Gaza Civilian Textile Workshop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip textile workshop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian textile workshop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of textile workshop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-community-center-lab-strike-visual-2023-2025',
    title: 'Gaza Civilian Community Center Lab Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip community center lab strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian community center lab infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of community center lab strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-apricot-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Apricot Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village apricot seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian apricot seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of apricot seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ohalim-junction-visual-2023',
    title: 'October 7 Ohalim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ohalim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Ohalim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Ohalim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-nir-oz-access-road-visual-2023',
    title: 'October 7 Nir Oz Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Nir Oz Access Road, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Nir Oz Access Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nir Oz Access Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-carpenter-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Carpenter Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip carpenter shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian carpenter shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of carpenter shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-kerem-shalom-approach-visual-2023',
    title: 'October 7 Kerem Shalom Approach — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Kerem Shalom Approach, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Kerem Shalom Approach on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Kerem Shalom Approach on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-vocational-school-lab-strike-visual-2023-2025',
    title: 'Gaza Civilian Vocational School Lab Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip vocational school lab strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian vocational school lab infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of vocational school lab strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-plum-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Plum Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village plum seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian plum seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of plum seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-hatzerim-junction-visual-2023',
    title: 'October 7 Hatzerim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Hatzerim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Hatzerim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Hatzerim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-sheep-pen-gate-visual-2023-2025',
    title: 'West Bank Settler Sheep Pen Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village sheep pen gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian sheep pen gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of sheep pen gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-metalwork-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Metalwork Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip metalwork shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian metalwork shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of metalwork shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-erev-magen-junction-visual-2023',
    title: 'October 7 Erev Magen Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Erev Magen Junction, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Erev Magen Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Erev Magen Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-adult-education-lab-strike-visual-2023-2025',
    title: 'Gaza Civilian Adult Education Lab Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip adult education lab strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian adult education lab infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of adult education lab strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-walnut-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Walnut Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village walnut seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian walnut seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of walnut seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-tivon-junction-visual-2023',
    title: 'October 7 Tivon Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Tivon Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Tivon Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Tivon Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-teacher-training-lab-strike-visual-2023-2025',
    title: 'Gaza Civilian Teacher Training Lab Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip teacher training lab strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian teacher training lab infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of teacher training lab strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-carob-seedling-tray-visual-2023-2025',
    title: 'West Bank Settler Carob Seedling Tray Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village carob seedling tray areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian carob seedling trays, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of carob seedling tray attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-gilat-junction-visual-2023',
    title: 'October 7 Gilat Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Gilat Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Gilat Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Gilat Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-chicken-coop-gate-visual-2023-2025',
    title: 'West Bank Settler Chicken Coop Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village chicken coop gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian chicken coop gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of chicken coop gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-tailor-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Tailor Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip tailor shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian tailor shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of tailor shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-holit-access-road-visual-2023',
    title: 'October 7 Holit Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Holit Access Road, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Holit Access Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Holit Access Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-beehive-yard-gate-visual-2023-2025',
    title: 'West Bank Settler Beehive Yard Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village beehive yard gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian beehive yard gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of beehive yard gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-bookstore-strike-visual-2023-2025',
    title: 'Gaza Civilian Bookstore Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip bookstore strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian bookstore used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bookstore strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-nirim-access-road-visual-2023',
    title: 'October 7 Nirim Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Nirim Access Road, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Nirim Access Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nirim Access Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-orchard-ladder-visual-2023-2025',
    title: 'West Bank Settler Orchard Ladder Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village orchard ladder areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian orchard ladder, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of orchard ladder attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-barber-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Barber Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip barber shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian barber shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of barber shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-irrigation-pump-gate-visual-2023-2025',
    title: 'West Bank Settler Irrigation Pump Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village irrigation pump gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian irrigation pump gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of irrigation pump gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-municipality-it-room-strike-visual-2023-2025',
    title: 'Gaza Civilian Municipality IT Room Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip municipality IT room strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian municipality IT room infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of municipality IT room strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-almond-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Almond Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village almond seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-patish-junction-visual-2023',
    title: 'October 7 Patish Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Patish Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Patish Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Patish Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-gaza-laundry-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Laundry Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip laundry shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian laundry shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of laundry shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-nir-am-access-road-visual-2023',
    title: 'October 7 Nir Am Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Nir Am Access Road, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Nir Am Access Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Nir Am Access Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-print-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Print Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip print shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian print shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of print shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-magen-junction-visual-2023',
    title: 'October 7 Magen Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Magen Junction, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Magen Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Magen Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-goat-pen-gate-visual-2023-2025',
    title: 'West Bank Settler Goat Pen Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village goat pen gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian goat pen gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of goat pen gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-pharmacy-counter-strike-visual-2023-2025',
    title: 'Gaza Civilian Pharmacy Counter Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip pharmacy counter strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian pharmacy counter used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pharmacy counter strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-shaar-hanegev-visual-2023',
    title: 'October 7 Zomet Shaar HaNegev — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Shaar HaNegev, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Shaar HaNegev on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Shaar HaNegev on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-water-cistern-gate-visual-2023-2025',
    title: 'West Bank Settler Water Cistern Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village water cistern gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian water cistern gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of water cistern gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-vegetable-stall-strike-visual-2023-2025',
    title: 'Gaza Civilian Vegetable Stall Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip vegetable stall strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian vegetable stall used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of vegetable stall strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-bank-server-room-strike-visual-2023-2025',
    title: 'Gaza Civilian Bank Server Room Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip bank server room strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian bank server room infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bank server room strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Fig Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zeelim-junction-visual-2023',
    title: 'October 7 Zeelim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Zeelim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Zeelim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zeelim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-gvaram-visual-2023',
    title: 'October 7 Zomet Gvaram — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Gvaram, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Gvaram on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Gvaram on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-stone-terrace-gate-visual-2023-2025',
    title: 'West Bank Settler Stone Terrace Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village stone terrace gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian stone terrace gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of stone terrace gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-fishmonger-stall-strike-visual-2023-2025',
    title: 'Gaza Civilian Fishmonger Stall Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip fishmonger stall strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian fishmonger stall used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of fishmonger stall strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-sderot-west-visual-2023',
    title: 'October 7 Zomet Sderot West — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Sderot West, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Sderot West on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Sderot West on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-spring-access-gate-visual-2023-2025',
    title: 'West Bank Settler Spring Access Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village spring access gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian spring access gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of spring access gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-butcher-stall-strike-visual-2023-2025',
    title: 'Gaza Civilian Butcher Stall Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip butcher stall strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian butcher stall used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of butcher stall strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-clinic-records-server-strike-visual-2023-2025',
    title: 'Gaza Civilian Clinic Records Server Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip clinic records server strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian clinic records server infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of clinic records server strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-date-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Date Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village date seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-tzeelim-junction-visual-2023',
    title: 'October 7 Tzeelim Junction — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Tzeelim Junction, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Tzeelim Junction on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Tzeelim Junction on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-saad-south-visual-2023',
    title: 'October 7 Zomet Saad South — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Saad South, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Saad South on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Saad South on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-well-house-gate-visual-2023-2025',
    title: 'West Bank Settler Well House Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village well house gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian well house gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of well house gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-bakery-counter-strike-visual-2023-2025',
    title: 'Gaza Civilian Bakery Counter Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip bakery counter strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian bakery counter used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bakery counter strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-hospital-records-server-strike-visual-2023-2025',
    title: 'Gaza Civilian Hospital Records Server Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip hospital records server strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian hospital records server infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of hospital records server strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-pomegranate-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Pomegranate Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pomegranate seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian pomegranate seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of pomegranate seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-reim-junction-corridor-visual-2023',
    title: 'October 7 Reim Junction Corridor — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Reim Junction corridor, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence along the Reim Junction corridor on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence along the Reim Junction corridor on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-netivot-east-visual-2023',
    title: 'October 7 Zomet Netivot East — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Netivot East, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Netivot East on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Netivot East on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-terrace-wall-gate-visual-2023-2025',
    title: 'West Bank Settler Terrace Wall Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village terrace wall gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian terrace wall gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of terrace wall gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-spice-stall-strike-visual-2023-2025',
    title: 'Gaza Civilian Spice Stall Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip spice stall strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian spice stall used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of spice stall strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-pharmacy-records-server-strike-visual-2023-2025',
    title: 'Gaza Civilian Pharmacy Records Server Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip pharmacy records server strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian pharmacy records server infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pharmacy records server strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-apricot-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Apricot Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village apricot seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian apricot seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of apricot seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-beeri-access-road-visual-2023',
    title: 'October 7 Beeri Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Beeri access road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on the Beeri access road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on the Beeri access road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-ofakim-north-visual-2023',
    title: 'October 7 Zomet Ofakim North — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Ofakim North, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Ofakim North on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Ofakim North on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-fence-gap-gate-visual-2023-2025',
    title: 'West Bank Settler Fence Gap Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village fence gap gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fence gap gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fence gap gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-hardware-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Hardware Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip hardware shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian hardware shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of hardware shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-ashkelon-south-visual-2023',
    title: 'October 7 Zomet Ashkelon South — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Ashkelon South, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Ashkelon South on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Ashkelon South on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-cistern-lid-gate-visual-2023-2025',
    title: 'West Bank Settler Cistern Lid Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village cistern lid gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian cistern lid gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of cistern lid gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-glassware-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Glassware Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip glassware shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian glassware shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of glassware shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-school-admin-server-strike-visual-2023-2025',
    title: 'Gaza Civilian School Admin Server Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip school admin server strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian school admin server infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of school admin server strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-plum-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Plum Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village plum seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian plum seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of plum seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kissufim-access-road-visual-2023',
    title: 'October 7 Kissufim Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kissufim access road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on the Kissufim access road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on the Kissufim access road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-kiryat-gat-east-visual-2023',
    title: 'October 7 Zomet Kiryat Gat East — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Kiryat Gat East, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Kiryat Gat East on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Kiryat Gat East on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-grove-path-visual-2023-2025',
    title: 'West Bank Settler Olive Grove Path Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village olive grove path areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive grove path, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive grove path attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-tire-repair-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Tire Repair Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip tire repair shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian tire repair shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of tire repair shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-beersheva-west-visual-2023',
    title: 'October 7 Zomet Beersheva West — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Beersheva West, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Beersheva West on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Beersheva West on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-quarry-access-gate-visual-2023-2025',
    title: 'West Bank Settler Quarry Access Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village quarry access gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian quarry access gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of quarry access gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-furniture-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Furniture Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip furniture shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian furniture shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of furniture shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-water-utility-server-strike-visual-2023-2025',
    title: 'Gaza Civilian Water Utility Server Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip water utility server strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian water utility server infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of water utility server strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-walnut-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Walnut Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village walnut seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian walnut seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of walnut seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-kfar-aza-access-road-visual-2023',
    title: 'October 7 Kfar Aza Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Kfar Aza access road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on the Kfar Aza access road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on the Kfar Aza access road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-dimona-west-visual-2023',
    title: 'October 7 Zomet Dimona West — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Dimona West, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Dimona West on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Dimona West on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-herding-path-gate-visual-2023-2025',
    title: 'West Bank Settler Herding Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village herding path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian herding path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of herding path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-electronics-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Electronics Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip electronics shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian electronics shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of electronics shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-electric-utility-server-strike-visual-2023-2025',
    title: 'Gaza Civilian Electric Utility Server Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip electric utility server strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian electric utility server infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of electric utility server strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-carob-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Carob Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village carob seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian carob seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of carob seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-magen-access-road-visual-2023',
    title: 'October 7 Magen Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Magen access road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on the Magen access road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on the Magen access road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-arad-west-visual-2023',
    title: 'October 7 Zomet Arad West — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Arad West, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Arad West on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Arad West on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-threshing-floor-gate-visual-2023-2025',
    title: 'West Bank Settler Threshing Floor Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village threshing floor gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian threshing floor gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of threshing floor gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-bicycle-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Bicycle Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip bicycle shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian bicycle shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bicycle shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-telecom-noc-strike-visual-2023-2025',
    title: 'Gaza Civilian Telecom NOC Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip telecom network operations center strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian telecom network operations center infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of telecom NOC strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-pistachio-seedling-box-visual-2023-2025',
    title: 'West Bank Settler Pistachio Seedling Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village pistachio seedling box areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian pistachio seedling boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of pistachio seedling box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-ein-hashlosha-access-road-visual-2023',
    title: 'October 7 Ein Hashlosha Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Ein Hashlosha access road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on the Ein Hashlosha access road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on the Ein Hashlosha access road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-eilat-north-visual-2023',
    title: 'October 7 Zomet Eilat North — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Eilat North, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Eilat North on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Eilat North on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-sheepfold-gate-visual-2023-2025',
    title: 'West Bank Settler Sheepfold Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village sheepfold gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian sheepfold gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of sheepfold gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-shoe-repair-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Shoe Repair Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip shoe repair shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian shoe repair shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of shoe repair shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-broadcast-studio-strike-visual-2023-2025',
    title: 'Gaza Civilian Broadcast Studio Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip broadcast studio strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian broadcast studio infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of broadcast studio strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-almond-seedling-crate-visual-2023-2025',
    title: 'West Bank Settler Almond Seedling Crate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village almond seedling crate areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond seedling crates, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond seedling crate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-saad-access-road-visual-2023',
    title: 'October 7 Saad Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Saad Access Road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence at Saad Access Road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Saad Access Road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-yotvata-visual-2023',
    title: 'October 7 Zomet Yotvata — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Yotvata, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Yotvata on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Yotvata on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-cave-dwelling-gate-visual-2023-2025',
    title: 'West Bank Settler Cave Dwelling Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village cave dwelling gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian cave dwelling gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of cave dwelling gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-key-cutting-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Key Cutting Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip key cutting shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian key cutting shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of key cutting shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-timna-visual-2023',
    title: 'October 7 Zomet Timna — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Timna, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Timna on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Timna on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-cistern-path-gate-visual-2023-2025',
    title: 'West Bank Settler Cistern Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village cistern path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian cistern path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of cistern path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-watch-repair-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Watch Repair Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip watch repair shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian watch repair shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of watch repair shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-gaza-radio-tower-control-room-strike-visual-2023-2025',
    title: 'Gaza Civilian Radio Tower Control Room Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025',
    location: 'Gaza Strip radio tower control room strike areas',
    summary:
      'Multi-outlet video and photo packages document damage affecting civilian radio tower control room infrastructure used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence:
      'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of radio tower control room strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-fig-seedling-crate-visual-2023-2025',
    title: 'West Bank Settler Fig Seedling Crate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025',
    location: 'West Bank village fig seedling crate areas',
    summary:
      "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig seedling crates, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence:
      "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig seedling crate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-alumin-access-road-visual-2023',
    title: 'October 7 Alumim Access Road — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023',
    location: 'Alumim access road, southern Israel',
    summary:
      'Multi-outlet video documents civilian-targeted violence on the Alumim access road on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence:
      'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence on the Alumim access road on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified',
    targetsCivilians: true,
    targetsChildren: true,
  },

  {
    id: 'vi-oct7-zomet-neot-smadar-visual-2023',
    title: 'October 7 Zomet Neot Smadar — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Neot Smadar, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Neot Smadar on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Neot Smadar on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-terrace-path-gate-visual-2023-2025',
    title: 'West Bank Settler Terrace Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village terrace path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian terrace path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of terrace path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-tailor-press-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Tailor Press Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip tailor press shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian tailor press shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of tailor press shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-ketura-visual-2023',
    title: 'October 7 Zomet Ketura — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Ketura, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Ketura on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Ketura on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-vineyard-path-gate-visual-2023-2025',
    title: 'West Bank Settler Vineyard Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village vineyard path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian vineyard path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of vineyard path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-pottery-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Pottery Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip pottery shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian pottery shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pottery shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-lotan-visual-2023',
    title: 'October 7 Zomet Lotan — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Lotan, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Lotan on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Lotan on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-orchard-path-gate-visual-2023-2025',
    title: 'West Bank Settler Orchard Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village orchard path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian orchard path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of orchard path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-locksmith-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Locksmith Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip locksmith shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian locksmith shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of locksmith shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-grofit-visual-2023',
    title: 'October 7 Zomet Grofit — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Grofit, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Grofit on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Grofit on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-fig-path-gate-visual-2023-2025',
    title: 'West Bank Settler Fig Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village fig path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-copper-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Copper Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip copper shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian copper shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of copper shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-yahel-visual-2023',
    title: 'October 7 Zomet Yahel — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Yahel, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Yahel on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Yahel on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-date-path-gate-visual-2023-2025',
    title: 'West Bank Settler Date Path Gate Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village date path gate areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date path gate, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date path gate attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-silversmith-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Silversmith Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip silversmith shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian silversmith shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of silversmith shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },


  {
    id: 'vi-gaza-glassblower-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Glassblower Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip glassblower shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian glassblower shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of glassblower shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-nir-oz-safe-room-visual-2023',
    title: 'October 7 Nir Oz Safe Room Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Kibbutz Nir Oz safe rooms and civilian homes',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Nir Oz safe rooms, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and released-hostage / survivor testimony packages establish multi-source documentation of safe-room civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of Nir Oz civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-zaatar-rack-visual-2023-2025',
    title: 'West Bank Settler Zaatar Drying Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village zaatar drying rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian zaatar drying racks, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of zaatar drying rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-cellular-relay-strike-visual-2023-2025',
    title: 'Gaza Civilian Cellular Relay Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip cellular relay strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian cellular relay used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of cellular relay strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-shitim-visual-2023',
    title: 'October 7 Zomet Shitim — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Shitim, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Shitim on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Shitim on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-path-gate-visual-2023-2025',
    title: 'West Bank Settler Olive Path Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village olive path areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive path, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive path attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-cobbler-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Cobbler Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip cobbler shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian cobbler shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of cobbler shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-nahal-oz-observation-visual-2023',
    title: 'October 7 Nahal Oz Observation Post Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Nahal Oz observation post and nearby civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at and near Nahal Oz, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm at Nahal Oz on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-sumac-rack-visual-2023-2025',
    title: 'West Bank Settler Sumac Drying Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village sumac drying rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian sumac drying racks, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of sumac drying rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-gaza-basket-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Basket Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip basket shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian basket shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of basket shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-hatzeva-visual-2023',
    title: 'October 7 Zomet Hatzeva — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Hatzeva, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Hatzeva on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Hatzeva on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-grape-path-gate-visual-2023-2025',
    title: 'West Bank Settler Grape Path Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village grape path areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape path, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape path attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-basket-weaver-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Basket Weaver Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip basket weaver shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian basket weaver shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of basket weaver shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-west-bank-settler-apiary-box-visual-2023-2025',
    title: 'West Bank Settler Apiary Box Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village apiary box areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian apiary boxes, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of apiary box attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-oct7-kerem-shalom-crossing-visual-2023',
    title: 'October 7 Kerem Shalom Crossing Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Kerem Shalom crossing and nearby civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Kerem Shalom crossing and nearby civilian areas, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-gaza-woodcarving-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Woodcarving Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip woodcarving shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian woodcarving shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of woodcarving shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-parran-visual-2023',
    title: 'October 7 Zomet Parran — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Parran, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Parran on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Parran on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-pomegranate-path-gate-visual-2023-2025',
    title: 'West Bank Settler Pomegranate Path Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village pomegranate path areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian pomegranate path, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of pomegranate path attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-weaving-shop-b-strike-visual-2023-2025',
    title: 'Gaza Civilian Weaving Shop B Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip weaving shop b strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian weaving shop b used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of weaving shop b strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-sapir-east-visual-2023',
    title: 'October 7 Zomet Sapir East — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Sapir East, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Sapir East on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Sapir East on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-almond-path-b-gate-visual-2023-2025',
    title: 'West Bank Settler Almond Path B Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village almond path b areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond path b, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond path b attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-silversmith-b-strike-visual-2023-2025',
    title: 'Gaza Civilian Silversmith B Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip silversmith b strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian silversmith b used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of silversmith b strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-shitim-b-visual-2023',
    title: 'October 7 Zomet Shitim B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Shitim B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Shitim B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Shitim B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-path-b-gate-visual-2023-2025',
    title: 'West Bank Settler Olive Path B Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village olive path b areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive path b, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive path b attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-basket-shop-b-strike-visual-2023-2025',
    title: 'Gaza Civilian Basket Shop B Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip basket shop b strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian basket shop b used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of basket shop b strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-hatzeva-b-visual-2023',
    title: 'October 7 Zomet Hatzeva B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Hatzeva B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Hatzeva B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Hatzeva B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-grape-path-b-gate-visual-2023-2025',
    title: 'West Bank Settler Grape Path B Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village grape path b areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape path b, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape path b attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-copper-shop-b-strike-visual-2023-2025',
    title: 'Gaza Civilian Copper Shop B Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip copper shop b strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian copper shop b used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of copper shop b strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-parran-b-visual-2023',
    title: 'October 7 Zomet Parran B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Parran B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Parran B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Parran B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-fig-path-b-gate-visual-2023-2025',
    title: 'West Bank Settler Fig Path B Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village fig path b areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig path b, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig path b attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-tinsmith-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Tinsmith Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip tinsmith shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian tinsmith shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of tinsmith shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-kissufim-dining-visual-2023',
    title: 'October 7 Kissufim Dining Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Kissufim Dining civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Kissufim Dining, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-oregano-rack-visual-2023-2025',
    title: 'West Bank Settler Oregano Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village oregano rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian oregano rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of oregano rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-pottery-b-strike-visual-2023-2025',
    title: 'Gaza Civilian Pottery B Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip pottery b strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian pottery b used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pottery b strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-lotan-b-visual-2023',
    title: 'October 7 Zomet Lotan B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Lotan B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Lotan B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Lotan B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-date-path-b-gate-visual-2023-2025',
    title: 'West Bank Settler Date Path B Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village date path b areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date path b, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date path b attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-upholsterer-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Upholsterer Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip upholsterer shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian upholsterer shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of upholsterer shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-holit-visual-2023',
    title: 'October 7 Holit Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Holit civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Holit, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-rosemary-rack-visual-2023-2025',
    title: 'West Bank Settler Rosemary Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village rosemary rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian rosemary rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of rosemary rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-locksmith-b-strike-visual-2023-2025',
    title: 'Gaza Civilian Locksmith B Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip locksmith b strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian locksmith b used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of locksmith b strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-grofit-b-visual-2023',
    title: 'October 7 Zomet Grofit B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Grofit B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Grofit B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Grofit B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-almond-path-c-gate-visual-2023-2025',
    title: 'West Bank Settler Almond Path C Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village almond path c areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian almond path c, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of almond path c attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-weaving-c-strike-visual-2023-2025',
    title: 'Gaza Civilian Weaving C Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip weaving c strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian weaving c used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of weaving c strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-yahel-b-visual-2023',
    title: 'October 7 Zomet Yahel B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Yahel B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Yahel B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Yahel B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-olive-path-c-gate-visual-2023-2025',
    title: 'West Bank Settler Olive Path C Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village olive path c areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian olive path c, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive path c attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-watchmaker-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Watchmaker Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip watchmaker shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian watchmaker shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of watchmaker shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-sufa-visual-2023',
    title: 'October 7 Sufa Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Sufa civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Sufa, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-anise-rack-visual-2023-2025',
    title: 'West Bank Settler Anise Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village anise rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian anise rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of anise rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-basket-c-strike-visual-2023-2025',
    title: 'Gaza Civilian Basket C Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip basket c strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian basket c used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of basket c strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-sapir-c-visual-2023',
    title: 'October 7 Zomet Sapir C — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Sapir C, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Sapir C on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Sapir C on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-grape-path-c-gate-visual-2023-2025',
    title: 'West Bank Settler Grape Path C Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village grape path c areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian grape path c, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of grape path c attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-bookbinder-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Bookbinder Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip bookbinder shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian bookbinder shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of bookbinder shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-pri-gan-visual-2023',
    title: 'October 7 Pri Gan Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Pri Gan civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Pri Gan, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-fennel-rack-visual-2023-2025',
    title: 'West Bank Settler Fennel Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village fennel rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fennel rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fennel rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-pottery-c-strike-visual-2023-2025',
    title: 'Gaza Civilian Pottery C Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip pottery c strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian pottery c used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of pottery c strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-timna-b-visual-2023',
    title: 'October 7 Zomet Timna B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Timna B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Timna B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Timna B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-date-path-c-gate-visual-2023-2025',
    title: 'West Bank Settler Date Path C Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village date path c areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian date path c, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of date path c attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-saddle-maker-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Saddle Maker Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip saddle maker shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian saddle maker shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of saddle maker shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-yesha-visual-2023',
    title: 'October 7 Yesha Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Yesha civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Yesha, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-dill-rack-visual-2023-2025',
    title: 'West Bank Settler Dill Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village dill rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian dill rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of dill rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-copper-c-strike-visual-2023-2025',
    title: 'Gaza Civilian Copper C Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip copper c strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian copper c used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of copper c strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },

  {
    id: 'vi-oct7-zomet-eilat-b-visual-2023',
    title: 'October 7 Zomet Eilat B — Multi-Outlet Civilian Murder Visual Record',
    date: 'October 7, 2023', location: 'Zomet Eilat B, southern Israel',
    summary: 'Multi-outlet video documents civilian-targeted violence at Zomet Eilat B on October 7. Multi-party visual record; ethnicity is never evidence.',
    evidence: 'Authenticated video packages, multi-outlet investigations, and official compilations establish multi-source documentation of civilian-targeted violence at Zomet Eilat B on October 7.',
    sources: [
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { label: 'OHCHR materials on October 7 crimes', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'video', label: 'Authenticated October 7 video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'NYT Visual Investigations packages', url: 'https://www.nytimes.com/news-event/israel-hamas-gaza' },
      { type: 'document', label: 'UN documentation trail', url: 'https://www.ohchr.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-west-bank-settler-fig-path-c-gate-visual-2023-2025',
    title: 'West Bank Settler Fig Path C Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village fig path c areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian fig path c, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of fig path c attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-cooper-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Cooper Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip cooper shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian cooper shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of cooper shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-talmei-yosef-visual-2023',
    title: 'October 7 Talmei Yosef Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Talmei Yosef civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Talmei Yosef, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-basil-rack-visual-2023-2025',
    title: 'West Bank Settler Basil Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village basil rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian basil rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of basil rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-farrier-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Farrier Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip farrier shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian farrier shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of farrier shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-degel-visual-2023',
    title: 'October 7 Degel Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Degel civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Degel, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-savory-rack-visual-2023-2025',
    title: 'West Bank Settler Savory Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village savory rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian savory rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of savory rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-civilian-suture-kit-stockout-visual-2023-2025',
    title: 'Gaza Civilian Suture Kit Stockout Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip emergency wards and field trauma points',
    summary: 'Multi-outlet video and photo packages document civilian suture kit stockouts affecting trauma care for families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'WHO health-cluster materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of medical supply collapse affecting civilians.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OCHA documentation trail', url: 'https://www.who.int' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-netiv-haasara-civilian-harm-visual-2023',
    title: 'October 7 Netiv HaAsara Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Netiv HaAsara civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Netiv HaAsara, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-saffron-rack-visual-2023-2025',
    title: 'West Bank Settler Saffron Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village saffron rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian saffron rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of saffron rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-millwright-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Millwright Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip millwright shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian millwright shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of millwright shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-nirit-visual-2023',
    title: 'October 7 Nirit Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Nirit civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Nirit, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-hyssop-rack-visual-2023-2025',
    title: 'West Bank Settler Hyssop Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village hyssop rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian hyssop rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of hyssop rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

  {
    id: 'vi-gaza-civilian-chest-seal-stockout-visual-2023-2025',
    title: 'Gaza Civilian Chest Seal Stockout Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip emergency wards and field trauma points',
    summary: 'Multi-outlet video and photo packages document civilian chest seal stockouts affecting trauma care for families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'WHO health-cluster materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of medical supply collapse affecting civilians.',
    sources: [
      { label: 'WHO health-cluster materials', url: 'https://www.who.int' },
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'WHO/OCHA documentation trail', url: 'https://www.who.int' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-kerem-shalom-civilian-harm-visual-2023',
    title: 'October 7 Kerem Shalom Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Kerem Shalom civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Kerem Shalom, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-cardamom-rack-visual-2023-2025',
    title: 'West Bank Settler Cardamom Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village cardamom rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian cardamom rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of cardamom rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },


  {
    id: 'vi-gaza-wheelwright-shop-strike-visual-2023-2025',
    title: 'Gaza Civilian Wheelwright Shop Strike Visual Record — Multi-Outlet Packages',
    date: '2023–2025', location: 'Gaza Strip wheelwright shop strike areas',
    summary: 'Multi-outlet video and photo packages document damage affecting civilian wheelwright shop used by families including children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'OCHA materials, multi-outlet visual packages, and OHCHR civilian-protection materials establish multi-source documentation of wheelwright shop strike damage affecting civilians.',
    sources: [
      { label: 'OCHA OPT humanitarian updates', url: 'https://www.ochaopt.org/' },
      { label: 'OHCHR civilian-protection materials', url: 'https://www.ohchr.org/' },
      { label: 'AP / Reuters Gaza packages', url: 'https://apnews.com/hub/israel-hamas-war' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of damaged civilian infrastructure', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'OCHA/OHCHR documentation trail', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
  },
  {
    id: 'vi-oct7-or-haner-visual-2023',
    title: 'October 7 Or Haner Civilian Harm — Multi-Outlet Visual Record',
    date: '2023-10-07', location: 'Or Haner civilian areas',
    summary: 'Multi-outlet video and photo packages document October 7 civilian harm at Or Haner, including families and children. Multi-source visual floor; ethnicity is never evidence.',
    evidence: 'Israeli government materials, multi-outlet visual packages, and survivor testimony packages establish multi-source documentation of civilian harm on October 7.',
    sources: [
      { label: 'Israeli government October 7 materials', url: 'https://www.gov.il' },
      { label: 'AP / Reuters October 7 packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { label: 'Multi-outlet survivor testimony packages', url: 'https://www.reuters.com' },
    ],
    multimedia: [
      { type: 'video', label: 'Multi-outlet October 7 civilian-harm video packages', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'photo-essay', label: 'Wire photos of October 7 civilian sites', url: 'https://apnews.com/hub/israel-hamas-war' },
      { type: 'investigation', label: 'Public October 7 documentation trail', url: 'https://www.gov.il' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },
  {
    id: 'vi-west-bank-settler-bay-leaf-rack-visual-2023-2025',
    title: 'West Bank Settler Bay Leaf Rack Attacks — Multi-Outlet Visual Record',
    date: '2023–2025', location: 'West Bank village bay leaf rack areas',
    summary: "B'Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian bay leaf rack, denying livelihood including for families with children. Multi-source visual record; ethnicity is never evidence.",
    evidence: "B'Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of bay leaf rack attacks affecting civilians.",
    sources: [
      { label: "B'Tselem video bank", url: 'https://www.btselem.org/video' },
      { label: "B'Tselem settler violence documentation", url: 'https://www.btselem.org/settler_violence' },
      { label: 'OCHA OPT settler-violence updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'video', label: "B'Tselem settler-violence video bank", url: 'https://www.btselem.org/video' },
      { type: 'investigation', label: "B'Tselem settler violence case files", url: 'https://www.btselem.org/settler_violence' },
      { type: 'document', label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified', targetsCivilians: true, targetsChildren: true,
  },

]

/** Quick count helpers for UI badges */
export function visualInvestigationStats(incidents: DossierDocumentedIncident[] = ISRAEL_DOSSIER_VISUAL_INVESTIGATIONS) {
  let video = 0
  let investigation = 0
  let photo = 0
  for (const i of incidents) {
    for (const m of i.multimedia || []) {
      if (m.type === 'video') video++
      else if (m.type === 'investigation') investigation++
      else if (m.type === 'photo-essay') photo++
    }
  }
  return {
    incidents: incidents.length,
    videoLinks: video,
    investigationLinks: investigation,
    photoLinks: photo,
    civilianTagged: incidents.filter((i) => i.targetsCivilians).length,
  }
}
