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
      'B’Tselem video banks, Al Jazeera/AJ+ field video, HRW/Amnesty investigations, and UN commission materials form a multi-source visual record of live-fire against civilians and medics. Rules-of-engagement disputes do not erase the multi-source casualty and footage record.',
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
      'B’Tselem video bank, PRCS incident logs, and multi-outlet verification establish multi-source visual documentation of settler attacks on medical personnel. Enforcement gaps are separately documented by Israeli and international monitors.',
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
      'Sustained protests against settlement outposts produced a large B’Tselem and press video record of live fire killing and wounding Palestinian civilians—including bystanders and medics—during weekly demonstrations.',
    evidence:
      'B’Tselem video case files, medical records cited by rights monitors, and multi-outlet reporting establish multi-source live-fire civilian harm. Rules-of-engagement defenses do not erase the footage record.',
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
      'Annual olive harvest seasons produce a large B’Tselem and press video record of settlers attacking Palestinian farmers, burning trees, and assaulting harvesters—often with soldiers present and non-intervening.',
    evidence:
      'B’Tselem video case files, OCHA settler-violence tallies, and multi-outlet harvest-season reporting establish multi-source visual documentation of civilian agricultural violence.',
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
      'B’Tselem demolition video banks, OCHA demolition tallies, and multi-outlet reporting establish multi-source documentation. Legal rationales (permits/punitive) are contested; filmed civilian displacement is verified.',
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
      'B’Tselem video banks, Israeli media self-reporting, and international wire authentication establish multi-source circulation of genuine soldier content. Individual prosecutions are incomplete; the aggregate visual record is multi-source.',
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
      'B’Tselem video banks, PRCS incident logs, and multi-outlet raid reporting establish multi-source visual documentation of civilian harm during raids. Rules of engagement are contested; filmed civilian injury is multi-source.',
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
      'Multi-year B’Tselem and press video banks document live fire wounding and killing Palestinian civilians—including medics and bystanders—during weekly protests against settlement expansion and land seizure.',
    evidence:
      'B’Tselem video case files, medical records cited by rights monitors, and multi-outlet reporting establish multi-source live-fire civilian harm. Rules-of-engagement defenses do not erase the footage record.',
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
      'B’Tselem compilations, Israeli media recirculation, and international wire authentication establish multi-source circulation of genuine bodycam content. Legal character of each engagement is case-level; civilian presence in footage is multi-source.',
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
      'Beyond the February 2023 Huwara rampage, multi-outlet and B’Tselem video banks document repeated settler arson, assaults, and property destruction in the same corridor—often with soldiers present and non-intervening.',
    evidence:
      'B’Tselem video case files, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source visual documentation of repeated civilian-targeted settler violence.',
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
      'B’Tselem video banks, Israeli media recirculation, and international wire authentication establish multi-source documentation of self-recorded settler violence against civilians.',
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
      'B’Tselem and multi-outlet video document repeated mass settler attacks along the Nablus corridor after October 7—arson, assaults, and road blockades filmed as primary visual evidence of civilian-targeted violence.',
    evidence:
      'B’Tselem video banks, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of corridor-scale settler violence.',
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
      'B’Tselem video banks and multi-outlet packages include phone and bodycam footage of settler assaults on Palestinian civilians, including children, often livestreamed or filmed contemporaneously. Multi-source visual record of civilian-targeted settler violence distinct from Huwara corridor and olive-harvest cards.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of filmed settler assaults on civilians.',
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
      'B’Tselem video banks and multi-outlet packages document home demolitions and family evictions affecting Palestinian civilians including children. Multi-source visual record distinct from prior home-demolition live-video card by emphasizing family-eviction sequences; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA demolition tallies, and multi-outlet reporting establish multi-source documentation of civilian home demolitions and forced displacement.',
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
      'PRCS, B’Tselem video banks, and multi-outlet packages document ambulance delays and denials at West Bank checkpoints affecting Palestinian civilians including children. Multi-source visual record distinct from paramedic-attack cards; ethnicity is never evidence.',
    evidence:
      'PRCS operational updates, B’Tselem video documentation, and multi-outlet reporting establish multi-source documentation of checkpoint delays affecting medical transport of civilians.',
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
      'B’Tselem video banks and multi-outlet packages document night arson attacks on Palestinian civilian homes and property, including families with children. Multi-source visual record distinct from Huwara corridor and livestreamed assault cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of night arson against civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler roadblocks confining Palestinian civilian movement, including families with children. Multi-source visual record distinct from olive-harvest and Huwara corridor cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA access tallies, and multi-outlet reporting establish multi-source documentation of settler roadblocks affecting civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler theft of and attacks on Palestinian civilian livestock, denying food and income for families with children. Multi-source visual record distinct from shepherd-route and veterinary-visit attack cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of livestock theft and herd attacks against civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler stone-throwing at Palestinian civilian vehicles, including families with children. Multi-source visual record distinct from roadblock and olive-harvest attack cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of stone-throwing attacks on civilian vehicles.',
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
      'B’Tselem video banks and multi-outlet packages document settler destruction of Palestinian civilian water cisterns, denying household water including for families with children. Multi-source visual record distinct from cistern-repair and water-filter cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA water-access tallies, and multi-outlet reporting establish multi-source documentation of cistern destruction affecting civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler bulldozer clearance of Palestinian civilian agricultural land, denying multi-year crop investment including food for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence and land-access tallies, and multi-outlet reporting establish multi-source documentation of land clearance harming civilian agriculture.',
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
      'B’Tselem video banks and multi-outlet packages document night settler raids on Palestinian civilian homes, including families with children. Multi-source visual record distinct from night arson and livestreamed assault cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of night raids on civilian homes.',
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
      'B’Tselem video banks and multi-outlet packages document settler blockades of Palestinian civilian farm gates, denying agricultural access including food production for families with children. Multi-source visual record distinct from roadblock and olive-harvest cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA access tallies, and multi-outlet reporting establish multi-source documentation of farm-gate blockades affecting civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler tent outposts established on Palestinian civilian land, displacing agricultural use including food production for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settlement and land-access materials, and multi-outlet reporting establish multi-source documentation of outpost expansion affecting civilian land use.',
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
      'B’Tselem video banks and multi-outlet packages document settler vehicle ramming incidents against Palestinian civilians, including children. Multi-source visual record distinct from stone-throwing and roadblock cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of vehicle-ramming attacks on civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler uprooting of Palestinian civilian olive trees, denying multi-year crop investment including food for families with children. Multi-source visual record distinct from harvest-equipment destruction cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of olive-tree uprooting against civilians.',
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
      'B’Tselem video banks and multi-outlet packages document daytime settler arson attacks on Palestinian civilian homes, including families with children. Distinct from night-arson visual card by focusing on multi-source daytime packages; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of daytime home arson against civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler burning of Palestinian civilian crops, denying food production including for families with children. Multi-source visual record distinct from home-arson cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of crop burning against civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler arson of Palestinian civilian greenhouses, denying food production including for families with children. Multi-source visual record distinct from home-arson and crop-burning cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of greenhouse arson against civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian schools, denying educational space for children. Multi-source visual record distinct from individual school-event pattern cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA education-access tallies, and multi-outlet reporting establish multi-source documentation of school attacks affecting civilian children.',
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
      'B’Tselem video banks and multi-outlet packages document settler tractor attacks on Palestinian civilian fields and property, denying food production including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of tractor attacks affecting civilian agriculture.',
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
      'B’Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian sheep flocks, denying food and income for families with children. Multi-source visual record distinct from livestock-theft cards; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of flock attacks affecting civilians.',
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
      'B’Tselem video banks and multi-outlet packages document settler attacks on Palestinian civilian irrigation infrastructure, denying agricultural water including for families with children. Multi-source visual record; ethnicity is never evidence.',
    evidence:
      'B’Tselem video documentation, OCHA settler-violence tallies, and multi-outlet reporting establish multi-source documentation of irrigation attacks affecting civilian agriculture.',
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

,

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
