/**
 * ISRAEL DOSSIER — EXPANDED DATA (10x depth)
 * Every figure sourced to primary documents.
 * Evidence tiers: verified | circumstantial | disputed
 */

// ═══════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════

export interface StatCard {
  value: string
  label: string
  source: string
  sourceUrl: string
  category: string
  note?: string
  lastVerified: string
  details?: StatDetail[]
  imageUrl?: string
  tier?: 'verified' | 'circumstantial' | 'disputed'
}

export interface StatDetail {
  title: string
  text: string
  sourceUrl?: string
}

export interface DocumentedIncident {
  title: string
  date: string
  location: string
  summary: string
  evidence: string
  sources: { label: string; url: string }[]
  multimedia: { type: 'video' | 'investigation' | 'photo-essay' | 'document'; label: string; url: string }[]
  tier: 'verified' | 'circumstantial'
  casualties?: { killed: number; injured?: number }
  imageUrl?: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
  source: string
  sourceUrl: string
  tier: 'verified' | 'circumstantial'
  imageUrl?: string
}

export interface LobbyingRecord {
  organization: string
  amount: string
  cycle: string
  recipients: string
  source: string
  sourceUrl: string
  note?: string
}

export interface LegalCase {
  title: string
  court: string
  date: string
  ruling: string
  significance: string
  sourceUrl: string
  status: 'decided' | 'pending' | 'ongoing'
}

// ═══════════════════════════════════════════════════════════
// HISTORICAL TIMELINE — From Balfour to Present
// ═══════════════════════════════════════════════════════════

export const HISTORICAL_TIMELINE: TimelineEvent[] = [
  {
    year: '1917',
    title: 'The Balfour Declaration',
    description: 'British Foreign Secretary Arthur Balfour writes to Lord Rothschild: "His Majesty\'s Government view with favour the establishment in Palestine of a national home for the Jewish people." Britain controlled neither the land nor the consent of its 700,000 Arab inhabitants.',
    source: 'UK National Archives, CAB 24/4',
    sourceUrl: 'https://www.nationalarchives.gov.uk/education/resources/letters-first-world-war-1916-18/source-9b/',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Balfour_declaration_unmarked.jpg/440px-Balfour_declaration_unmarked.jpg',
  },
  {
    year: '1947',
    title: 'UN Partition Plan (Resolution 181)',
    description: 'The UN General Assembly votes to partition Palestine into Jewish and Arab states, granting 56% of the land to the Jewish state despite Jews comprising 33% of the population and owning 7% of the land. Arab states reject the plan.',
    source: 'United Nations General Assembly Resolution 181',
    sourceUrl: 'https://www.un.org/unispal/document/auto-insert-185393/',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/UN_Palestine_Partition_Versions_1947.jpg/440px-UN_Palestine_Partition_Versions_1947.jpg',
  },
  {
    year: '1948',
    title: 'The Nakba — 750,000 Palestinians Expelled',
    description: 'During the 1948 Arab-Israeli War, approximately 750,000 Palestinians are expelled or flee from their homes. Over 400 Palestinian villages are depopulated and destroyed. Israel declares independence on May 14.',
    source: 'UN Conciliation Commission for Palestine, Final Report',
    sourceUrl: 'https://www.un.org/unispal/document/auto-insert-206564/',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Flickr_-_Government_Press_Office_%28GPO%29_-_Arab_refugees.jpg/440px-Flickr_-_Government_Press_Office_%28GPO%29_-_Arab_refugees.jpg',
  },
  {
    year: '1967',
    title: 'Six-Day War — Occupation Begins',
    description: 'Israel captures the West Bank, Gaza Strip, Sinai Peninsula, and Golan Heights. Military occupation of Palestinian territories begins — now in its 58th year. UN Security Council Resolution 242 calls for Israeli withdrawal.',
    source: 'UN Security Council Resolution 242',
    sourceUrl: 'https://digitallibrary.un.org/record/90717',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Six_Day_War_Territories.svg/440px-Six_Day_War_Territories.svg.png',
  },
  {
    year: '1967',
    title: 'USS Liberty Attack — 34 Americans Killed',
    description: 'Israeli air and naval forces attack the USS Liberty, a clearly marked U.S. Navy intelligence ship, in international waters off the Sinai Peninsula. 34 American servicemen killed, 171 wounded. Israel calls it a case of mistaken identity; surviving crew members and multiple investigations dispute this.',
    source: 'USS Liberty Veterans Association / Naval History',
    sourceUrl: 'https://www.history.navy.mil/research/library/online-reading-room/title-list-alphabetically/u/uss-liberty-incident.html',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/USS_Liberty_%28AGTR-5%29_underway_in_Chesapeake_Bay_on_29_July_1967_%28NH_97379%29.jpg/440px-USS_Liberty_%28AGTR-5%29_underway_in_Chesapeake_Bay_on_29_July_1967_%28NH_97379%29.jpg',
  },
  {
    year: '1978',
    title: 'Camp David Accords — U.S. Aid Escalates',
    description: 'Israel and Egypt sign the Camp David Accords, brokered by President Carter. As part of the deal, the U.S. commits to $3 billion/year in military and economic aid to Israel and $2 billion/year to Egypt — permanently reshaping U.S. foreign aid.',
    source: 'Jimmy Carter Presidential Library',
    sourceUrl: 'https://www.jimmycarterlibrary.gov/research/camp_david_accords',
    tier: 'verified',
  },
  {
    year: '1982',
    title: 'Sabra and Shatila Massacre',
    description: 'Israeli-allied Lebanese Phalangist militia massacres between 800 and 3,500 Palestinian and Lebanese Shia civilians in the Sabra and Shatila refugee camps. Israeli forces surround the camps and provide illumination. The Kahan Commission finds Defense Minister Ariel Sharon bears "personal responsibility."',
    source: 'Kahan Commission Report (Israeli government)',
    sourceUrl: 'https://www.mfa.gov.il/mfa/foreignpolicy/mfadocuments/yearbook6/pages/104%20report%20of%20the%20commission%20of%20inquiry%20into%20the%20e.aspx',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Sabra_and_Shatila_massacre.jpg/440px-Sabra_and_Shatila_massacre.jpg',
  },
  {
    year: '1987',
    title: 'First Intifada Begins',
    description: 'Palestinian uprising against Israeli occupation. Over six years, 1,551 Palestinians and 422 Israelis are killed. Defense Minister Yitzhak Rabin orders soldiers to "break their bones" — a policy documented by B\'Tselem.',
    source: 'B\'Tselem — Israeli Information Center for Human Rights',
    sourceUrl: 'https://www.btselem.org/statistics/first_intifada_tables',
    tier: 'verified',
  },
  {
    year: '1993',
    title: 'Oslo Accords',
    description: 'Israel and the PLO sign the Declaration of Principles on Interim Self-Government. Intended as a 5-year interim arrangement leading to a final status agreement. That agreement never materializes. Settlement population triples in the years following Oslo.',
    source: 'UN Peacemaker',
    sourceUrl: 'https://peacemaker.un.org/israelopt-osloaccord93',
    tier: 'verified',
  },
  {
    year: '2004',
    title: 'ICJ Rules Separation Wall Illegal',
    description: 'The International Court of Justice rules 14-1 that Israel\'s construction of a wall in the occupied Palestinian territory is contrary to international law. Israel ignores the ruling. The wall is now 712 km long, 85% built inside the West Bank.',
    source: 'International Court of Justice, Advisory Opinion',
    sourceUrl: 'https://www.icj-cij.org/case/131',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Israeli_West-Bank_Barrier.jpg/640px-Israeli_West-Bank_Barrier.jpg',
  },
  {
    year: '2007',
    title: 'Gaza Blockade Begins',
    description: 'Following Hamas\'s takeover of Gaza, Israel imposes a land, air, and sea blockade. The UN and ICRC describe it as collective punishment of 2 million civilians. The blockade continues for 19 years.',
    source: 'ICRC — Gaza closure: not another year!',
    sourceUrl: 'https://www.icrc.org/en/document/gaza-closure-not-another-year',
    tier: 'verified',
  },
  {
    year: '2014',
    title: 'Operation Protective Edge — 2,251 Palestinians Killed',
    description: '51-day Israeli military operation in Gaza. 2,251 Palestinians killed (including 551 children) and 73 Israelis killed (including 6 civilians). UN Human Rights Council finds evidence of war crimes by both sides.',
    source: 'UN OHCHR Report A/HRC/29/52',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza',
    tier: 'verified',
  },
  {
    year: '2016',
    title: '$38 Billion MOU Signed',
    description: 'Obama administration signs the largest military aid package in U.S. history: $38 billion over 10 years ($3.8B/year). Israel is the only country permitted to spend part of U.S. military aid on its own defense industry.',
    source: 'U.S. State Department Fact Sheet',
    sourceUrl: 'https://2009-2017.state.gov/r/pa/prs/ps/2016/09/261987.htm',
    tier: 'verified',
  },
  {
    year: '2018',
    title: 'Great March of Return — 223 Palestinians Killed',
    description: 'Palestinians in Gaza hold weekly protests at the border fence demanding the right of return. Over 10 months, Israeli snipers kill 223 protesters and injure over 8,000 with live ammunition. A UN inquiry finds Israeli forces may have committed war crimes.',
    source: 'UN Human Rights Council, Report A/HRC/40/CRP.2',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-protests/report',
    tier: 'verified',
  },
  {
    year: '2021',
    title: 'Human Rights Watch: "A Threshold Crossed" — Apartheid Finding',
    description: 'Human Rights Watch publishes a 213-page report concluding that Israel\'s treatment of Palestinians amounts to the crimes of apartheid and persecution. Amnesty International publishes a similar finding in February 2022.',
    source: 'Human Rights Watch',
    sourceUrl: 'https://www.hrw.org/report/2021/04/27/threshold-crossed/israeli-authorities-and-crimes-apartheid-and-persecution',
    tier: 'verified',
  },
  {
    year: '2023',
    title: 'October 7 Attack and Gaza War Begins',
    description: 'Hamas and other Palestinian armed groups launch a surprise attack on southern Israel, killing approximately 1,139 Israelis and foreign nationals and taking 251 hostages. Israel declares war and begins a military campaign in Gaza that, as of March 2026, has killed over 75,000 Palestinians.',
    source: 'Israeli Ministry of Foreign Affairs / Gaza MoH / Lancet',
    sourceUrl: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext',
    tier: 'verified',
  },
  {
    year: '2024',
    title: 'ICJ Orders Provisional Measures / ICC Issues Arrest Warrants',
    description: 'The ICJ orders Israel to prevent genocide in Gaza (Jan). The ICJ rules the occupation itself is illegal (Jul). The ICC issues arrest warrants for Netanyahu and Gallant for war crimes and crimes against humanity (Nov).',
    source: 'ICJ / ICC official records',
    sourceUrl: 'https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges',
    tier: 'verified',
  },
]

// ═══════════════════════════════════════════════════════════
// ADDITIONAL INCIDENTS (expanding from 6 to 16+)
// ═══════════════════════════════════════════════════════════

export const EXPANDED_INCIDENTS: DocumentedIncident[] = [  // ─── NEW INCIDENT: Jabalia Refugee Camp ───
  {
    title: 'Jabalia Refugee Camp — Repeated Strikes on Densest Civilian Area',
    date: 'October 31, 2023 — ongoing through 2024',
    location: 'Jabalia Refugee Camp, Northern Gaza',
    summary: 'Israel conducted multiple large-scale airstrikes on Jabalia refugee camp, one of the most densely populated places on Earth (116,000 people in 1.4 km²). The first strike on October 31, 2023 hit a residential area, killing over 120 people. Israel stated it was targeting a Hamas commander. Subsequent strikes in November 2023 and throughout 2024 continued hitting residential buildings, UN shelters, and market areas within the camp.',
    evidence: 'Satellite imagery from Planet Labs showed at least 15 large craters consistent with MK-84 2,000-pound bombs in a residential area. Euro-Med Human Rights Monitor documented the use of at least six heavy bombs in the first attack alone. CNN geolocated video of the aftermath, confirming residential buildings were the primary structures destroyed.',
    sources: [
      { label: 'CNN — Satellite imagery confirms scale of Jabalia strikes', url: 'https://www.cnn.com/2023/10/31/middleeast/israel-jabalya-refugee-camp-strike-intl-hnk' },
      { label: 'Euro-Med Monitor — Documentation of Jabalia strikes', url: 'https://euromedmonitor.org/en/article/5908' },
      { label: 'Al Jazeera — Timeline of Jabalia camp attacks', url: 'https://www.aljazeera.com/news/2023/11/1/jabalia-refugee-camp-what-we-know-about-the-latest-israeli-attack' },
    ],
    multimedia: [
      { type: 'investigation', label: 'CNN — Satellite analysis of bomb craters', url: 'https://www.cnn.com/2023/10/31/middleeast/israel-jabalya-refugee-camp-strike-intl-hnk' },
      { type: 'video', label: 'Al Jazeera — Ground footage of aftermath', url: 'https://www.aljazeera.com/gallery/2023/11/1/photos-aftermath-of-israeli-strikes-on-jabalia-refugee-camp-in-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 120, injured: 280 },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg/640px-Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg',
  },
  // ─── NEW INCIDENT: Al-Ahli Arab Hospital ───
  {
    title: 'Al-Ahli Arab Hospital Explosion — Disputed Responsibility',
    date: 'October 17, 2023',
    location: 'Al-Ahli Arab Hospital, Gaza City',
    summary: 'A massive explosion in the courtyard of Al-Ahli Arab Hospital killed an estimated 100-300 people sheltering there. Initial Palestinian reports blamed an Israeli airstrike. Israel claimed a misfired Palestinian Islamic Jihad rocket caused the explosion. Multiple independent investigations reached conflicting conclusions.',
    evidence: 'The New York Times visual investigation found evidence consistent with a rocket rather than an air-dropped bomb but could not conclusively determine responsibility. Channel 4 News and Al Jazeera investigations pointed to an Israeli munition. The crater size was smaller than typical MK-84 impacts. U.S. intelligence assessed with "low confidence" it was a Palestinian rocket misfire. No party has provided conclusive evidence.',
    sources: [
      { label: 'New York Times — Visual investigation', url: 'https://www.nytimes.com/video/world/middleeast/100000009129042/gaza-hospital-explosion-investigation.html' },
      { label: 'Channel 4 News — Independent forensic analysis', url: 'https://www.channel4.com/news/forensic-analysis-of-images-and-video-of-al-ahli-arab-hospital-blast' },
      { label: 'Human Rights Watch — Hospital investigation', url: 'https://www.hrw.org/news/2023/11/26/gaza-findings-october-17-al-ahli-hospital-explosion' },
    ],
    multimedia: [
      { type: 'investigation', label: 'NYT Visual Investigation — Blast analysis', url: 'https://www.nytimes.com/video/world/middleeast/100000009129042/gaza-hospital-explosion-investigation.html' },
    ],
    tier: 'circumstantial',
    casualties: { killed: 200, injured: 500 },
  },
  // ─── NEW INCIDENT: Systematic Destruction of Universities ───
  {
    title: 'Systematic Destruction of Every University in Gaza',
    date: 'October 2023 — March 2026',
    location: 'All university campuses in Gaza',
    summary: 'All 12 universities in Gaza have been damaged or destroyed by Israeli military operations, including the Islamic University of Gaza, Al-Azhar University, and Al-Aqsa University. Satellite imagery shows controlled demolitions of campus buildings weeks after Israeli forces secured the areas — suggesting destruction beyond military necessity.',
    evidence: 'Euro-Med Human Rights Monitor documented the destruction of all 12 institutions using satellite imagery comparisons. Forensic Architecture published spatial analysis showing several university buildings were demolished by controlled explosions rather than airstrikes, indicating deliberate destruction rather than collateral damage. UNESCO condemned the "scholasticide" — the systematic destruction of educational infrastructure.',
    sources: [
      { label: 'Euro-Med Monitor — Complete destruction of Gaza universities', url: 'https://euromedmonitor.org/en/article/6129' },
      { label: 'UNESCO — Statement on destruction of educational infrastructure', url: 'https://www.unesco.org/en/articles/gaza-higher-education-destroyed' },
      { label: 'The Guardian — "Scholasticide": destruction of every university in Gaza', url: 'https://www.theguardian.com/world/2024/jan/24/scholasticide-gaza-university-education-system-destroyed' },
    ],
    multimedia: [
      { type: 'photo-essay', label: 'Satellite before/after imagery of all 12 campuses', url: 'https://euromedmonitor.org/en/article/6129' },
    ],
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg/640px-Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg',
  },
  // ─── NEW INCIDENT: Destruction of Al-Shifa Hospital ───
  {
    title: 'Al-Shifa Hospital Siege and Destruction',
    date: 'November 2023 — March 2024',
    location: 'Al-Shifa Hospital, Gaza City',
    summary: 'Israeli forces besieged and raided Al-Shifa Hospital — Gaza\'s largest medical complex — twice. The first raid (November 15, 2023) was justified by claims of a Hamas command center beneath the hospital. Israel presented video of a tunnel shaft and a few weapons but no evidence of the extensive underground complex initially described. The second raid (March 18, 2024) lasted two weeks and left the hospital in ruins. Over 400 people were killed in and around the hospital during the two operations.',
    evidence: 'Israel released video showing a tunnel shaft and corridor beneath Al-Shifa during the first raid, along with a small cache of weapons. Independent analysts, including the Washington Post, found the evidence fell short of the claimed "command and control center." The second raid resulted in near-total destruction of the facility. WHO reported the hospital was rendered "a death zone" and "an empty shell."',
    sources: [
      { label: 'Washington Post — Analysis of Israel\'s Al-Shifa evidence', url: 'https://www.washingtonpost.com/world/2023/11/17/israel-hamas-al-shifa-hospital-evidence/' },
      { label: 'WHO — Al-Shifa hospital "a death zone"', url: 'https://www.who.int/news/item/01-04-2024-who-appalled-by-latest-reports-from-al-shifa-hospital' },
      { label: 'BBC — Second Al-Shifa raid kills 400+', url: 'https://www.bbc.com/news/world-middle-east-68820038' },
    ],
    multimedia: [
      { type: 'video', label: 'BBC — Inside Al-Shifa after the siege', url: 'https://www.bbc.com/news/world-middle-east-68820038' },
      { type: 'investigation', label: 'Washington Post — Evaluating the tunnel evidence', url: 'https://www.washingtonpost.com/world/2023/11/17/israel-hamas-al-shifa-hospital-evidence/' },
    ],
    tier: 'verified',
    casualties: { killed: 400 },
  },
  // ─── NEW INCIDENT: Starvation as Weapon ───
  {
    title: 'Deliberate Starvation — Aid Blocked While Famine Declared',
    date: 'January 2024 — ongoing',
    location: 'Northern Gaza',
    summary: 'The Integrated Food Security Phase Classification (IPC) — the global authority on hunger — declared famine in northern Gaza in March 2024, making it the first official famine declaration since 2017 Somalia. Israel was documented blocking, delaying, and restricting humanitarian aid delivery while the population starved. The IPC found that 100% of Gaza\'s population was in crisis-level food insecurity or worse.',
    evidence: 'The IPC Famine Review Committee confirmed famine conditions in northern Gaza. COGAT (Israeli military body controlling aid) approved only 37% of humanitarian aid missions in November 2024. WFP reported that food aid trucks were held at checkpoints for days. Multiple videos showed Israeli settlers and soldiers physically blocking aid convoys. Documented cases of children dying from malnutrition were reported by WHO, UNICEF, and MSF.',
    sources: [
      { label: 'IPC — Famine confirmed in northern Gaza', url: 'https://www.ipcinfo.org/ipc-country-analysis/details-map/en/c/1157345/' },
      { label: 'WFP — "Catastrophic hunger" in Gaza', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { label: 'MSF — Children dying of malnutrition in Gaza hospitals', url: 'https://www.msf.org/gaza-children-are-dying-malnutrition-while-aid-blocked' },
      { label: 'Reuters — Israeli settlers block Gaza aid convoys', url: 'https://www.reuters.com/world/middle-east/israeli-activists-block-gaza-aid-trucks-2024-02-12/' },
    ],
    multimedia: [
      { type: 'video', label: 'CNN — Footage of starving children in Gaza hospitals', url: 'https://www.cnn.com/2024/03/04/middleeast/gaza-children-starvation-famine-intl/index.html' },
      { type: 'document', label: 'IPC Famine Review Committee Report', url: 'https://www.ipcinfo.org/ipc-country-analysis/details-map/en/c/1157345/' },
    ],
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/UNRWA_school_in_Gaza.jpg/640px-UNRWA_school_in_Gaza.jpg',
  },
  // ─── NEW INCIDENT: Killing of Shireen Abu Akleh ───
  {
    title: 'Killing of Journalist Shireen Abu Akleh',
    date: 'May 11, 2022',
    location: 'Jenin Refugee Camp, West Bank',
    summary: 'Al Jazeera journalist Shireen Abu Akleh, a Palestinian-American, was shot and killed while covering an Israeli military raid in Jenin refugee camp. She was wearing a clearly marked press vest and helmet. Israeli forces initially blamed Palestinian gunfire, then acknowledged an Israeli soldier "likely" fired the fatal shot. The U.S. State Department found no reason to pursue further investigation despite Abu Akleh\'s American citizenship.',
    evidence: 'Multiple independent investigations (CNN, Washington Post, NYT, AP, Bellingcat) concluded the bullet was fired by an Israeli soldier from a known military position. No Palestinian gunmen were in the line of fire. Acoustic analysis of video recordings pinpointed the shot to an Israeli convoy 200 meters away. The bullet was identified as a 5.56mm round consistent with Israeli-issued M4 rifles. Despite Abu Akleh\'s U.S. citizenship, the FBI investigation was closed without charges.',
    sources: [
      { label: 'CNN — Investigation: Israeli forces shot Shireen Abu Akleh', url: 'https://www.cnn.com/2022/05/24/middleeast/shireen-abu-akleh-investigation-cmd-intl' },
      { label: 'Washington Post — Ballistic analysis points to Israeli soldier', url: 'https://www.washingtonpost.com/investigations/interactive/2022/shireen-abu-akleh-death/' },
      { label: 'Al Jazeera — Full investigation', url: 'https://www.aljazeera.com/news/2022/9/5/killing-of-shireen-abu-akleh-al-jazeera-submits-case-to-icc' },
      { label: 'UN OHCHR — "Shots that killed Abu Akleh came from Israeli forces"', url: 'https://www.ohchr.org/en/press-releases/2022/06/un-human-rights-office-concludes-shots-killed-journalist-came-israeli' },
    ],
    multimedia: [
      { type: 'investigation', label: 'CNN — Visual and acoustic investigation', url: 'https://www.cnn.com/2022/05/24/middleeast/shireen-abu-akleh-investigation-cmd-intl' },
      { type: 'video', label: 'Al Jazeera — Documentary on Abu Akleh killing', url: 'https://www.aljazeera.com/program/witness/2023/5/10/killing-shireen' },
    ],
    tier: 'verified',
    casualties: { killed: 1 },
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Press_photographers_with_cameras.jpg/640px-Press_photographers_with_cameras.jpg',
  },
  // ─── NEW INCIDENT: Tent Camp Strikes ───
  {
    title: 'Repeated Strikes on Displacement Tent Camps',
    date: 'May 2024 — ongoing',
    location: 'Rafah, Khan Yunis, Al-Mawasi — designated "safe zones"',
    summary: 'Israeli forces conducted repeated airstrikes on displacement tent camps in areas the IDF itself designated as "humanitarian safe zones." On May 26, 2024, a strike on a tent camp in Rafah killed at least 45 displaced civilians and sparked fires that burned alive people trapped in makeshift shelters. Videos showed screaming civilians on fire. On September 10, 2024, another strike on Al-Mawasi safe zone killed at least 40.',
    evidence: 'Video evidence of the May 26 Rafah strike showed tents engulfed in flames with civilians burning alive. Amnesty International analyzed munition fragments and identified U.S.-manufactured GBU-39 small diameter bombs. The IDF stated it was targeting two senior Hamas operatives. The September 10 strike used at least two 2,000-pound bombs on a displacement camp. Satellite imagery confirmed the strikes hit clearly marked civilian encampments.',
    sources: [
      { label: 'Amnesty International — U.S.-made bombs identified in Rafah tent camp strike', url: 'https://www.amnesty.org/en/latest/news/2024/06/israel-opt-us-made-munitions-identified-in-deadly-strike-rafah-displacement-camp/' },
      { label: 'BBC — Rafah tent camp strike kills 45', url: 'https://www.bbc.com/news/articles/cd11qj7rq79o' },
      { label: 'Al Jazeera — Al-Mawasi safe zone strike', url: 'https://www.aljazeera.com/news/2024/9/10/at-least-40-killed-in-israeli-attack-on-gaza-safe-zone' },
    ],
    multimedia: [
      { type: 'video', label: 'BBC — Footage of burning tent camp', url: 'https://www.bbc.com/news/articles/cd11qj7rq79o' },
      { type: 'investigation', label: 'Amnesty — Munition analysis', url: 'https://www.amnesty.org/en/latest/news/2024/06/israel-opt-us-made-munitions-identified-in-deadly-strike-rafah-displacement-camp/' },
    ],
    tier: 'verified',
    casualties: { killed: 85, injured: 200 },
  },
  // ─── NEW INCIDENT: UNRWA Workers Killed ───
  {
    title: 'UNRWA Staff Killings — Highest UN Death Toll in Any Conflict',
    date: 'October 2023 — ongoing',
    location: 'Throughout Gaza',
    summary: 'Over 230 UNRWA staff members have been killed since October 7, 2023 — the highest number of UN staff killed in any single conflict in the history of the United Nations. UNRWA facilities have been struck over 500 times despite coordinates being shared with Israeli forces. Israel passed legislation banning UNRWA from operating in its territory, threatening the primary aid lifeline for 5.9 million Palestinian refugees.',
    evidence: 'UNRWA Commissioner-General Philippe Lazzarini has formally documented each staff killing. GPS coordinates of all UNRWA facilities were shared with the IDF as required by international humanitarian law. Despite this, UNRWA schools, shelters, and warehouses have been struck repeatedly. Israel\'s Knesset voted to ban UNRWA on October 28, 2024 — a move condemned by the UN Secretary-General, WHO, UNICEF, and 120+ member states.',
    sources: [
      { label: 'UNRWA — Situation reports and staff casualty tracker', url: 'https://www.unrwa.org/resources/reports/unrwa-situation-update' },
      { label: 'UN News — Highest UN staff death toll in any conflict', url: 'https://news.un.org/en/story/2024/11/1157071' },
      { label: 'Al Jazeera — Israel bans UNRWA', url: 'https://www.aljazeera.com/news/2024/10/28/israel-bans-unrwa-what-does-this-mean-for-palestinian-refugees' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA — Complete staff casualty documentation', url: 'https://www.unrwa.org/resources/reports/unrwa-situation-update' },
    ],
    tier: 'verified',
    casualties: { killed: 230 },
  },
  // ─── NEW INCIDENT: Use of AI Targeting Systems ───
  {
    title: '"Lavender" and "Where\'s Daddy?" — AI-Assisted Targeting of Homes',
    date: 'October 2023 — ongoing',
    location: 'Throughout Gaza',
    summary: 'Israeli military sources revealed to +972 Magazine that the IDF used two AI systems: "Lavender," which generated a database of 37,000+ suspected Hamas operatives with minimal human verification (an average of 20 seconds per target), and "Where\'s Daddy?", which tracked targets to their family homes and authorized strikes when they entered. Sources stated the acceptable civilian casualty ratio was 15-20 civilians per low-ranking militant and up to 100+ for senior commanders.',
    evidence: 'Six Israeli intelligence officers provided testimony to +972 Magazine and Local Call, speaking on condition of anonymity. They described the AI systems, the minimal human oversight, and the policy of striking targets at home with their families. The investigation was corroborated by analysis of strike patterns showing a disproportionate number of residential building attacks during nighttime hours. The IDF did not deny the existence of the systems but disputed the characterization of their use.',
    sources: [
      { label: '+972 Magazine — "Lavender": The AI machine directing Israel\'s bombing', url: 'https://www.972mag.com/lavender-ai-israeli-army-gaza/' },
      { label: 'The Guardian — Israeli army used AI to target thousands in Gaza', url: 'https://www.theguardian.com/world/2024/apr/03/israel-gaza-ai-database-hamas-lavender' },
      { label: '+972 Magazine — "Where\'s Daddy?" tracking system', url: 'https://www.972mag.com/mass-assassination-factory-israel-calculated-bombing-gaza/' },
    ],
    multimedia: [
      { type: 'investigation', label: '+972 Magazine — Full investigation with officer testimony', url: 'https://www.972mag.com/lavender-ai-israeli-army-gaza/' },
    ],
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg/640px-Destroyed_apartment_tower_in_Gaza_City_%28cropped%29.jpg',
  },
  // ─── NEW INCIDENT: White Phosphorus ───
  {
    title: 'White Phosphorus Use in Populated Areas',
    date: 'October 2023',
    location: 'Gaza City, Southern Lebanon',
    summary: 'Human Rights Watch verified the use of white phosphorus by Israeli forces over populated areas in Gaza City on October 10-11, 2023, and in southern Lebanon. White phosphorus burns at 800°C, causes severe chemical burns that can penetrate to the bone, and reignites when exposed to oxygen. Its use in populated areas violates international humanitarian law.',
    evidence: 'HRW researchers verified 155mm artillery-delivered white phosphorus munitions through video analysis and munition fragment identification. The organization identified the specific munition type as M825A1 155mm smoke projectiles — U.S.-manufactured. Amnesty International separately verified white phosphorus use through similar analysis. The IDF stated it uses white phosphorus "in accordance with international law" but did not deny its use.',
    sources: [
      { label: 'Human Rights Watch — Israel uses white phosphorus in Gaza, Lebanon', url: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon' },
      { label: 'Amnesty International — Evidence of white phosphorus use', url: 'https://www.amnesty.org/en/latest/news/2023/10/israel-opt-evidence-of-war-crimes-in-gaza/' },
      { label: 'Washington Post — What is white phosphorus and why is it controversial?', url: 'https://www.washingtonpost.com/world/2023/10/13/white-phosphorus-israel-gaza-lebanon/' },
    ],
    multimedia: [
      { type: 'video', label: 'HRW — Video analysis of white phosphorus airburst', url: 'https://www.hrw.org/news/2023/10/12/israel-white-phosphorus-used-gaza-lebanon' },
    ],
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_the_Red_Cross.svg/640px-Flag_of_the_Red_Cross.svg.png',
  },
]

// ═══════════════════════════════════════════════════════════
// AIPAC & LOBBYING DATA
// ═══════════════════════════════════════════════════════════

export const LOBBYING_DATA: LobbyingRecord[] = [
  {
    organization: 'AIPAC (American Israel Public Affairs Committee)',
    amount: '$100M+',
    cycle: '2024 election cycle',
    recipients: 'Pro-Israel candidates across both parties',
    source: 'OpenSecrets',
    sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/aipac/C00104638/summary/2024',
    note: 'AIPAC launched its first-ever Super PAC in 2022, immediately becoming one of the largest spenders in U.S. politics',
  },
  {
    organization: 'United Democracy Project (AIPAC Super PAC)',
    amount: '$41.7M',
    cycle: '2024 primaries',
    recipients: 'Targeted progressive candidates who criticized Israel',
    source: 'FEC filings / OpenSecrets',
    sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/united-democracy-project/C00822007/summary/2024',
    note: 'Largest spender in 2024 Democratic primaries. Defeated Jamaal Bowman ($14.5M spent) and Cori Bush ($8.5M spent)',
  },
  {
    organization: 'Democratic Majority for Israel',
    amount: '$15M+',
    cycle: '2024 cycle',
    recipients: 'Pro-Israel Democrats in competitive primaries',
    source: 'FEC filings',
    sourceUrl: 'https://www.opensecrets.org/political-action-committees-pacs/democratic-majority-for-israel/C00764126/summary/2024',
  },
  {
    organization: 'Pro-Israel lobby (total — all organizations)',
    amount: '$180M+',
    cycle: '2024 cycle (total)',
    recipients: 'Both parties, federal candidates',
    source: 'OpenSecrets aggregate analysis',
    sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
    note: 'The pro-Israel lobby was the single largest source of PAC spending in the 2024 federal election cycle',
  },
]

// ═══════════════════════════════════════════════════════════
// INTERNATIONAL LEGAL CASES
// ═══════════════════════════════════════════════════════════

export const LEGAL_CASES: LegalCase[] = [
  {
    title: 'South Africa v. Israel — Genocide Convention Case',
    court: 'International Court of Justice (ICJ)',
    date: 'December 29, 2023 — ongoing',
    ruling: 'ICJ ordered provisional measures (Jan 26, 2024): Israel must prevent genocide, ensure humanitarian aid, prevent incitement. Additional order (Mar 28, 2024): Israel must ensure unhindered food aid. The court found it "plausible" that Israel\'s actions could constitute genocide.',
    significance: 'First time the ICJ has ordered provisional measures against Israel under the Genocide Convention. Supported by 50+ countries intervening on South Africa\'s behalf.',
    sourceUrl: 'https://www.icj-cij.org/case/192',
    status: 'ongoing',
  },
  {
    title: 'ICC Arrest Warrants — Netanyahu and Gallant',
    court: 'International Criminal Court (ICC)',
    date: 'November 21, 2024',
    ruling: 'Pre-Trial Chamber I issued arrest warrants for Israeli PM Benjamin Netanyahu and former Defense Minister Yoav Gallant for war crimes and crimes against humanity including: starvation as a method of warfare, murder, persecution, and other inhumane acts.',
    significance: 'First arrest warrants issued for a sitting Western-allied head of state since the ICC\'s establishment. ICC member states (124 countries) are legally obligated to arrest Netanyahu if he enters their territory.',
    sourceUrl: 'https://www.icc-cpi.int/news/situation-state-palestine-icc-pre-trial-chamber-i-rejects-state-israels-challenges',
    status: 'decided',
  },
  {
    title: 'ICJ Advisory Opinion — Legality of the Occupation',
    court: 'International Court of Justice (ICJ)',
    date: 'July 19, 2024',
    ruling: 'The court found Israel\'s continued presence in the Occupied Palestinian Territory is unlawful, that settlements violate Article 49 of the Fourth Geneva Convention, and that Israel\'s policies amount to de facto annexation and apartheid.',
    significance: 'First time the world\'s highest court applied the term "apartheid" to Israeli policies. Called on all states to distinguish between Israel and the occupied territories in their dealings.',
    sourceUrl: 'https://www.icj-cij.org/node/204176',
    status: 'decided',
  },
  {
    title: 'ICJ Advisory Opinion — Separation Wall',
    court: 'International Court of Justice (ICJ)',
    date: 'July 9, 2004',
    ruling: 'The court ruled 14-1 that the construction of the wall in the occupied Palestinian territory is contrary to international law. Israel was obligated to dismantle it and make reparation for damage caused.',
    significance: 'Israel refused to comply. 22 years later, the wall remains, now 712 km long, with 85% built inside the West Bank rather than on the Green Line.',
    sourceUrl: 'https://www.icj-cij.org/case/131',
    status: 'decided',
  },
]

// ═══════════════════════════════════════════════════════════
// EXPANDED STATISTICS — New categories
// ═══════════════════════════════════════════════════════════

export const EXPANDED_STATS: StatCard[] = [
  // ─── MEDIA & INFORMATION ───
  {
    value: '176',
    label: 'Mosques destroyed in Gaza (Oct 2023 — Mar 2026)',
    source: 'Euro-Med Human Rights Monitor',
    sourceUrl: 'https://euromedmonitor.org/en/article/6129',
    category: 'infrastructure',
    lastVerified: '2026-03-24',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Dome_of_the_Rock%2C_Temple_Mount%2C_Jerusalem.jpg/640px-Dome_of_the_Rock%2C_Temple_Mount%2C_Jerusalem.jpg',
  },
  {
    value: '610+',
    label: 'Healthcare workers killed in Gaza',
    source: 'WHO Surveillance System for Attacks on Health Care',
    sourceUrl: 'https://extranet.who.int/ssa/Index.aspx',
    category: 'infrastructure',
    lastVerified: '2026-03-24',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_the_Red_Cross.svg/640px-Flag_of_the_Red_Cross.svg.png',
    details: [
      { title: 'Hospital attacks', text: 'WHO documented 900+ attacks on healthcare facilities in Gaza. All 36 hospitals in Gaza have been damaged; fewer than 10 remain partially functional.' },
      { title: 'Ambulance attacks', text: 'Over 120 ambulances have been damaged or destroyed. PRCS reported multiple incidents of ambulances being directly targeted while responding to emergencies.' },
    ],
  },
  {
    value: '80%',
    label: 'Of Gaza\'s housing damaged or destroyed',
    source: 'UNOSAT satellite damage assessment',
    sourceUrl: 'https://unosat.org/products/',
    category: 'infrastructure',
    lastVerified: '2026-03-24',
    tier: 'verified',
    details: [
      { title: 'Scale of destruction', text: 'UNOSAT analysis found that more than 50% of all structures in Gaza have been destroyed or severely damaged — representing the highest destruction rate documented in any modern conflict.' },
      { title: 'Rebuilding timeline', text: 'UNDP estimates it would take 80 years to rebuild Gaza\'s housing at pre-war construction rates, assuming the blockade is lifted and materials can enter.' },
    ],
  },
  {
    value: '$18.5B',
    label: 'Estimated reconstruction cost for Gaza (as of mid-2024)',
    source: 'World Bank — Gaza Interim Damage Assessment',
    sourceUrl: 'https://www.worldbank.org/en/news/press-release/2024/04/02/joint-world-bank-un-report-assesses-damage-to-gaza-s-infrastructure',
    category: 'infrastructure',
    lastVerified: '2026-03-24',
    tier: 'verified',
    note: 'This estimate was made in April 2024 when destruction was at ~50% of current levels. Updated estimates exceed $40B.',
  },
  // ─── ANTI-BDS LEGISLATION ───
  {
    value: '38',
    label: 'U.S. states with anti-BDS laws or executive orders',
    source: 'Palestine Legal — State-by-state tracker',
    sourceUrl: 'https://palestinelegal.org/righttoboycott',
    category: 'domestic',
    lastVerified: '2026-03-24',
    tier: 'verified',
    details: [
      { title: 'What these laws do', text: 'Anti-BDS (Boycott, Divestment, Sanctions) laws require state contractors to sign pledges not to boycott Israel. Several states have barred individuals, companies, and pension funds from engaging in boycotts of Israel as a condition of doing business with the government.' },
      { title: 'First Amendment concerns', text: 'Federal courts have issued conflicting rulings on constitutionality. The ACLU describes these laws as "unconstitutional" restrictions on political speech. The 8th Circuit upheld Arkansas\'s law; the 5th and 11th Circuits have heard challenges.' },
    ],
  },
  {
    value: '$180M+',
    label: 'Total pro-Israel lobby spending in 2024 U.S. federal elections',
    source: 'OpenSecrets aggregate data',
    sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
    category: 'domestic',
    lastVerified: '2026-03-24',
    tier: 'verified',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/United_States_Capitol_-_west_front.jpg/640px-United_States_Capitol_-_west_front.jpg',
    details: [
      { title: 'AIPAC\'s first Super PAC', text: 'In 2022, AIPAC launched the United Democracy Project — its first-ever Super PAC. It immediately became one of the largest spenders in U.S. politics, spending $41.7M in 2024 Democratic primaries alone.' },
      { title: 'Primary defeats', text: 'AIPAC-backed challengers defeated progressive incumbents Jamaal Bowman (NY-16, $14.5M spent) and Cori Bush (MO-1, $8.5M spent) — two vocal critics of U.S. military aid to Israel.' },
    ],
  },
  // ─── COMPARATIVE ───
  {
    value: '83 years',
    label: 'Israeli life expectancy vs. 74 in Palestine (9-year gap)',
    source: 'World Bank Development Indicators',
    sourceUrl: 'https://data.worldbank.org/indicator/SP.DYN.LE00.IN?locations=IL-PS',
    category: 'comparative',
    lastVerified: '2026-03-24',
    tier: 'verified',
  },
  {
    value: '$310B',
    label: 'U.S. aid to Israel vs. $0 in universal healthcare for Americans',
    source: 'Congressional Research Service RL33222',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    category: 'comparative',
    lastVerified: '2026-03-24',
    tier: 'verified',
    note: 'Israel provides universal healthcare to all citizens, partially enabled by U.S. military aid offsetting defense costs',
    details: [
      { title: 'The comparison', text: 'The U.S. has provided $310B+ in aid to Israel since 1948, helping subsidize Israel\'s universal healthcare, free university education for veterans, and extensive social safety net — benefits that American taxpayers themselves do not receive.' },
      { title: 'What $310B could fund domestically', text: 'The Congressional Budget Office estimated universal pre-K for all American children would cost $250B over 10 years. The total U.S. aid to Israel over its lifetime exceeds the cost of providing clean water infrastructure to every American community.' },
    ],
  },
]

// ═══════════════════════════════════════════════════════════
// INSTAGRAM CAROUSEL SLIDE DATA — 10 slides for viral content
// ═══════════════════════════════════════════════════════════

export interface CarouselSlide {
  headline: string
  stat?: string
  body: string
  source: string
  sourceUrl: string
  bgStyle: 'dark' | 'crimson' | 'light' | 'stat'
  imageUrl?: string
}

export const ISRAEL_DOSSIER_CAROUSEL: CarouselSlide[] = [
  {
    headline: 'The Israel Dossier',
    body: 'Every dollar traced. Every statistic sourced. Every incident documented.\n\nSwipe to see what your government doesn\'t want you to know.',
    source: 'Veritas Press',
    sourceUrl: 'https://veritasworldwide.com/israel-dossier',
    bgStyle: 'dark',
  },
  {
    headline: '$310 BILLION',
    stat: '$310B+',
    body: 'Total U.S. taxpayer money sent to Israel since 1948. The largest cumulative recipient of U.S. foreign aid in history.',
    source: 'Congressional Research Service, Report RL33222',
    sourceUrl: 'https://www.congress.gov/crs-product/RL33222',
    bgStyle: 'stat',
  },
  {
    headline: '75,000+ Palestinians Killed',
    stat: '75,000+',
    body: 'Since October 7, 2023. Independent Lancet survey found 35% higher death toll than official counts. 70% of verified deaths were women and children.',
    source: 'The Lancet Global Health (2025)',
    sourceUrl: 'https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(25)00522-4/fulltext',
    bgStyle: 'crimson',
  },
  {
    headline: '17,000+ Children',
    stat: '17,000+',
    body: 'More children killed in Gaza since October 2023 than in all the world\'s conflict zones combined over the previous four years.',
    source: 'UNICEF',
    sourceUrl: 'https://www.unicef.org/press-releases/unimaginable-horrors-more-50000-children-reportedly-killed-or-injured-gaza-strip',
    bgStyle: 'dark',
  },
  {
    headline: 'Follow the Money',
    body: 'Congress approved $26.4B in emergency aid → Pentagon purchased 14,000+ MK-84 2,000-pound bombs → Bombs documented in strikes on refugee camps, safe zones, and hospitals.\n\nEvery link in the chain is sourced.',
    source: 'H.R.815 / DSCA / Responsible Statecraft',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/house-bill/815',
    bgStyle: 'light',
  },
  {
    headline: 'The World\'s Courts Have Ruled',
    stat: 'UNLAWFUL',
    body: 'ICJ: Occupation is illegal. ICC: Arrest warrants for Netanyahu. ICJ: Apartheid policies confirmed.\n\nThe U.S. vetoed 51+ UNSC resolutions to shield Israel from accountability.',
    source: 'ICJ / ICC official records',
    sourceUrl: 'https://www.icj-cij.org/node/204176',
    bgStyle: 'stat',
  },
  {
    headline: '$180M to Buy Congress',
    stat: '$180M+',
    body: 'The pro-Israel lobby spent $180M+ in the 2024 election cycle. AIPAC\'s Super PAC defeated two sitting members of Congress who criticized Israel — spending $23M against them.',
    source: 'OpenSecrets / FEC filings',
    sourceUrl: 'https://www.opensecrets.org/industries/indus?ind=Q05',
    bgStyle: 'crimson',
  },
  {
    headline: 'AI Decides Who Dies',
    body: '"Lavender" — an AI system that flagged 37,000 Palestinians as targets with 20 seconds of human review. "Where\'s Daddy?" — tracked targets to their family homes for nighttime strikes.',
    source: '+972 Magazine (six IDF intelligence officers)',
    sourceUrl: 'https://www.972mag.com/lavender-ai-israeli-army-gaza/',
    bgStyle: 'dark',
  },
  {
    headline: 'Every University Destroyed',
    body: 'All 12 universities in Gaza demolished. 80% of housing destroyed. 176 mosques, 3 churches, and 36 hospitals damaged. Famine declared. 1.9 million displaced.\n\nThis is what $310 billion bought.',
    source: 'UNESCO / UNOSAT / IPC',
    sourceUrl: 'https://www.unesco.org/en/articles/gaza-higher-education-destroyed',
    bgStyle: 'light',
  },
  {
    headline: 'Read the Full Dossier',
    body: 'Every statistic sourced to government records, UN agencies, and verified reporting.\n\nNo opinion. No spin. Just the documented record.\n\nveritasworldwide.com/israel-dossier',
    source: 'Veritas Press',
    sourceUrl: 'https://veritasworldwide.com/israel-dossier',
    bgStyle: 'crimson',
  },
]

// ═══════════════════════════════════════════════════════════
// PINNED POST IMAGE DATA
// ═══════════════════════════════════════════════════════════

export interface PinnedPostData {
  id: string
  title: string
  subtitle: string
  stat: string
  statLabel: string
  cta: string
  url: string
  bgStyle: 'dark-crimson' | 'parchment' | 'full-crimson'
}

export const PINNED_POSTS: PinnedPostData[] = [
  {
    id: 'pinned-dossier',
    title: 'THE ISRAEL DOSSIER',
    subtitle: 'Every dollar traced. Every life counted. Every source linked.',
    stat: '$310B',
    statLabel: 'of your money. Exposed.',
    cta: 'READ THE EVIDENCE',
    url: 'veritasworldwide.com/israel-dossier',
    bgStyle: 'dark-crimson',
  },
  {
    id: 'pinned-record',
    title: 'THE RECORD',
    subtitle: '31 chapters. 500+ primary sources. 240 years of documented history.',
    stat: '100%',
    statLabel: 'free reader account access',
    cta: 'READ THE RECORD',
    url: 'veritasworldwide.com',
    bgStyle: 'parchment',
  },
  {
    id: 'pinned-mission',
    title: 'WE DON\'T TELL YOU WHAT TO THINK',
    subtitle: 'Primary sources only. Government documents. Court filings. Congressional records.',
    stat: '500+',
    statLabel: 'sources cited',
    cta: 'VERIFY IT YOURSELF',
    url: 'veritasworldwide.com/sources',
    bgStyle: 'full-crimson',
  },
]
