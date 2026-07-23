/**
 * Israel Dossier — Historical war-crimes / civilian-targeting pack (1948 → pre-Oct-2023)
 *
 * Editorial rules (Veritas Evidence Engine):
 * - Only entries with named, checkable primary or multi-source documentation
 * - Label tier honestly: verified = multi-source / official commission / court / UN finding;
 *   circumstantial = serious documentation with material dispute or incomplete attribution
 * - Never treat ethnicity, religion, or ancestry as evidence
 * - "War crime" language tracks courts, commissions, or UN fact-finding — not slogans
 * - This pack is curated for evidence strength; it is NOT a claim of completeness
 */

import type { DossierDocumentedIncident, DossierTimelineEvent } from './israelDossierCanon'
import { ISRAEL_DOSSIER_ASSETS } from './israelDossierCanon'

export type DossierEra =
  | 'mandate-1948'
  | '1948-1967'
  | 'occupation-1967-2005'
  | 'blockade-2007-2023'
  | 'post-oct7'

export interface DossierHistoricalIncident extends DossierDocumentedIncident {
  id: string
  era: DossierEra
  targetsCivilians: boolean
  targetsChildren: boolean
  relatedProfileIds: string[]
  relatedMoneyNodeIds: string[]
  legalStatus:
    | 'court-finding'
    | 'official-commission'
    | 'un-finding'
    | 'multi-source-investigation'
    | 'disputed-attribution'
}

export interface DossierHistoricalTimelineEvent extends DossierTimelineEvent {
  id: string
  era: DossierEra
  relatedProfileIds?: string[]
  relatedIncidentIds?: string[]
  tags?: string[]
}

/** Major documented civilian-targeting and massacre cases from 1948 onward with checkable sources. */
export const ISRAEL_DOSSIER_HISTORICAL_WAR_CRIMES: DossierHistoricalIncident[] = [
  {
    id: 'deir-yassin-1948',
    era: 'mandate-1948',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Deir Yassin Massacre',
    date: 'April 9, 1948',
    location: 'Deir Yassin, near Jerusalem',
    summary:
      'Irgun and Lehi paramilitary forces attacked the Palestinian village of Deir Yassin during the civil war phase preceding Israeli statehood. Estimates of those killed range roughly from about 100 to over 200, including women and children. The attack became a pivotal trauma in Palestinian collective memory and accelerated flight from other villages.',
    evidence:
      'Contemporary Red Cross and British Mandate reporting, survivor testimony, and later archival work by Israeli and Palestinian historians document a deliberate assault on a civilian village. Exact death toll remains disputed among historians; the fact of a large-scale killing of non-combatants is not seriously contested in the scholarly record.',
    sources: [
      { label: 'UN Conciliation Commission — historical refugee documentation context', url: 'https://www.un.org/unispal/document/auto-insert-206564/' },
      { label: 'Britannica — Deir Yassin massacre overview', url: 'https://www.britannica.com/event/Deir-Yassin-massacre' },
      { label: 'Jewish Virtual Library — contemporaneous source compilation (use critically)', url: 'https://www.jewishvirtuallibrary.org/the-capture-of-deir-yassin' },
    ],
    multimedia: [
      { type: 'document', label: 'UNISPAL — 1948 refugee and war documentation index', url: 'https://www.un.org/unispal/' },
      { type: 'investigation', label: 'Britannica — Encyclopedic synthesis with bibliography', url: 'https://www.britannica.com/event/Deir-Yassin-massacre' },
    ],
    tier: 'verified',
    casualties: { killed: 110 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'lydda-ramle-1948',
    era: 'mandate-1948',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Lydda and Ramle Expulsions',
    date: 'July 1948',
    location: 'Lydda (Lod) and Ramle, central Palestine',
    summary:
      'During Operation Dani, Israeli forces captured Lydda and Ramle. Tens of thousands of Palestinian civilians were expelled on foot toward the West Bank in extreme heat. Hundreds died from exhaustion, dehydration, and related violence. These expulsions are among the largest single population removals of the 1948 war.',
    evidence:
      'Israeli military orders, IDF archival material cited by historians (including Benny Morris), UN refugee registration, and survivor testimony document mass expulsion. Death estimates for the march vary; the forced removal of the majority civilian population is documented.',
    sources: [
      { label: 'UN Conciliation Commission for Palestine — Final Report context', url: 'https://www.un.org/unispal/document/auto-insert-206564/' },
      { label: 'Britannica — 1948 Palestine war / refugee creation', url: 'https://www.britannica.com/event/1948-Arab-Israeli-War' },
      { label: 'UNRWA — Palestine refugees origin overview', url: 'https://www.unrwa.org/palestine-refugees' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA — Refugee status origin documentation', url: 'https://www.unrwa.org/palestine-refugees' },
    ],
    tier: 'verified',
    casualties: { killed: 350 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'qibya-1953',
    era: '1948-1967',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'un-finding',
    title: 'Qibya Raid — Unit 101',
    date: 'October 14–15, 1953',
    location: 'Qibya, West Bank (then Jordanian-controlled)',
    summary:
      'Israeli special forces Unit 101, commanded by Ariel Sharon, raided the West Bank village of Qibya. Sixty-nine Palestinian villagers were killed, more than half of them women and children. Homes were dynamited with occupants inside. The raid followed cross-border fedayeen attacks, but the scale of civilian killing drew international condemnation.',
    evidence:
      'UN Security Council Resolution 101 (1953) condemned the action. U.S. and UK diplomatic protests are on record. Israeli official and later historical accounts acknowledge the raid and the civilian death toll.',
    sources: [
      { label: 'UN Security Council Resolution 101 (1953)', url: 'https://digitallibrary.un.org/record/112088' },
      { label: 'UNISPAL — Qibya incident documentation', url: 'https://www.un.org/unispal/document/auto-insert-179434/' },
      { label: 'Britannica — Ariel Sharon biographical record of Qibya', url: 'https://www.britannica.com/biography/Ariel-Sharon' },
    ],
    multimedia: [
      { type: 'document', label: 'UN Digital Library — Resolution 101 text', url: 'https://digitallibrary.un.org/record/112088' },
    ],
    tier: 'verified',
    casualties: { killed: 69 },
  },
  {
    id: 'kafr-qasim-1956',
    era: '1948-1967',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'court-finding',
    title: 'Kafr Qasim Massacre',
    date: 'October 29, 1956',
    location: 'Kafr Qasim, Israel',
    summary:
      'Israeli Border Police shot and killed 49 Palestinian citizens of Israel — including women and children returning from work — for violating a newly imposed curfew of which many had not been informed. The killings occurred on the first day of the Sinai Campaign.',
    evidence:
      'Israeli military court convicted several officers and soldiers. The trial established the "manifestly illegal order" doctrine in Israeli military law. Annual commemorations and official apologies have since acknowledged the massacre; the historical fact pattern is not in serious dispute.',
    sources: [
      { label: 'B\'Tselem — Kafr Qasim background', url: 'https://www.btselem.org/' },
      { label: 'Britannica — Kafr Qasim massacre', url: 'https://www.britannica.com/event/Kafr-Qasim-massacre' },
      { label: 'Israeli MFA historical yearbook references (use with commission context)', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
    ],
    multimedia: [
      { type: 'document', label: 'Encyclopedic record with court history', url: 'https://www.britannica.com/event/Kafr-Qasim-massacre' },
    ],
    tier: 'verified',
    casualties: { killed: 49 },
  },
  {
    id: 'sabra-shatila-1982',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'official-commission',
    title: 'Sabra and Shatila Massacre',
    date: 'September 16–18, 1982',
    location: 'Sabra and Shatila refugee camps, Beirut, Lebanon',
    summary:
      'Lebanese Phalangist militia massacred between roughly 800 and 3,500 Palestinian and Lebanese Shia civilians in the Sabra and Shatila camps after Israel occupied West Beirut. Israeli forces controlled the perimeter, illuminated the area at night, and allowed the militia entry. Defense Minister Ariel Sharon was found to bear personal responsibility by Israel\'s own Kahan Commission.',
    evidence:
      'The Kahan Commission (Israeli government) found that Israeli officials bore indirect responsibility and that Sharon bore personal responsibility for ignoring the danger of a massacre. UN General Assembly Resolution 37/123 condemned the massacre as an act of genocide (a political determination distinct from a criminal court judgment). Contemporary journalism and later archival work corroborate the scale of civilian killing.',
    sources: [
      { label: 'Kahan Commission Report — Israeli government inquiry', url: 'https://www.mfa.gov.il/mfa/foreignpolicy/mfadocuments/yearbook6/pages/104%20report%20of%20the%20commission%20of%20inquiry%20into%20the%20e.aspx' },
      { label: 'UN General Assembly Resolution 37/123', url: 'https://digitallibrary.un.org/record/40572' },
      { label: 'Britannica — Sabra and Shatila massacre', url: 'https://www.britannica.com/event/Sabra-and-Shatila-massacre' },
    ],
    multimedia: [
      { type: 'document', label: 'Kahan Commission — official finding on responsibility', url: 'https://www.mfa.gov.il/mfa/foreignpolicy/mfadocuments/yearbook6/pages/104%20report%20of%20the%20commission%20of%20inquiry%20into%20the%20e.aspx' },
      { type: 'investigation', label: 'Britannica — documented overview', url: 'https://www.britannica.com/event/Sabra-and-Shatila-massacre' },
    ],
    tier: 'verified',
    casualties: { killed: 800 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'qana-1996',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'artillery-use'],
    legalStatus: 'un-finding',
    title: 'Qana Massacre (UN Compound, 1996)',
    date: 'April 18, 1996',
    location: 'Qana, southern Lebanon',
    summary:
      'Israeli artillery struck a UNIFIL compound in Qana where more than 800 Lebanese civilians were sheltering. At least 106 civilians were killed, including many children, and around 116 wounded. The attack occurred during Operation Grapes of Wrath.',
    evidence:
      'A UN investigation concluded it was unlikely the shelling of the compound was the result of technical or procedural errors alone. Amnesty International and Human Rights Watch documented the civilian toll. Israel said it was responding to Hezbollah fire; the UN report challenged the claim that the compound strike was purely accidental.',
    sources: [
      { label: 'UN report on the Qana shelling (UNIFIL investigation context)', url: 'https://www.un.org/unispal/document/auto-insert-179197/' },
      { label: 'Amnesty International — Qana investigation archive', url: 'https://www.amnesty.org/en/documents/mde15/042/1996/en/' },
      { label: 'Human Rights Watch — Operation Grapes of Wrath / civilian protection', url: 'https://www.hrw.org/reports/1997/isrleb/' },
    ],
    multimedia: [
      { type: 'document', label: 'UNISPAL — Qana investigation materials', url: 'https://www.un.org/unispal/document/auto-insert-179197/' },
      { type: 'document', label: 'HRW — 1996 Lebanon civilian casualties report', url: 'https://www.hrw.org/reports/1997/isrleb/' },
    ],
    tier: 'verified',
    casualties: { killed: 106, injured: 116 },
  },
  {
    id: 'jenin-2002',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'un-finding',
    title: 'Jenin Refugee Camp Operation (2002)',
    date: 'April 2002',
    location: 'Jenin Refugee Camp, West Bank',
    summary:
      'During Operation Defensive Shield, Israeli forces conducted a major assault on Jenin refugee camp. Early claims of a large-scale "massacre" of hundreds were not sustained by later UN and other investigations, which documented roughly 52 Palestinian deaths (including combatants and civilians) and 23 Israeli soldiers killed. The operation still involved heavy destruction of civilian housing and documented civilian deaths.',
    evidence:
      'UN Secretary-General report A/ES-10/186 found no evidence of mass killing on the scale initially alleged, while documenting serious civilian harm, house demolitions, and restricted humanitarian access. This entry is included precisely because it is frequently misreported in both directions — the UN record is the verification floor.',
    sources: [
      { label: 'UN Secretary-General report on Jenin (A/ES-10/186)', url: 'https://www.un.org/unispal/document/auto-insert-183434/' },
      { label: 'Human Rights Watch — Jenin: IDF Military Operations', url: 'https://www.hrw.org/report/2002/05/02/jenin/idf-military-operations' },
      { label: 'Amnesty International — Shielded from scrutiny / Jenin findings', url: 'https://www.amnesty.org/en/documents/mde15/143/2002/en/' },
    ],
    multimedia: [
      { type: 'document', label: 'UN report — corrects inflated and minimized claims', url: 'https://www.un.org/unispal/document/auto-insert-183434/' },
      { type: 'investigation', label: 'HRW — field investigation', url: 'https://www.hrw.org/report/2002/05/02/jenin/idf-military-operations' },
    ],
    tier: 'verified',
    casualties: { killed: 52 },
  },
  {
    id: 'rachel-corrie-2003',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['joe-biden'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'disputed-attribution',
    title: 'Killing of Rachel Corrie',
    date: 'March 16, 2003',
    location: 'Rafah, Gaza Strip',
    summary:
      'American activist Rachel Corrie was crushed to death by an Israeli military bulldozer while nonviolently opposing house demolitions in Rafah. She was 23. Israel said the driver did not see her; her family and witnesses said she was clearly visible in a fluorescent vest.',
    evidence:
      'Israeli military investigation cleared the soldiers involved. A 2012 Haifa District Court ruling accepted the military account. Corrie\'s family and multiple eyewitnesses disputed that finding. U.S. diplomatic engagement was limited. Status: verified death by IDF equipment; intent/visibility remains disputed — labeled circumstantial for criminal attribution.',
    sources: [
      { label: 'Rachel Corrie Foundation — case documentation', url: 'https://rachelcorriefoundation.org/' },
      { label: 'Amnesty International — call for independent investigation', url: 'https://www.amnesty.org/en/latest/news/2003/03/israelopt-killing-rachel-corrie/' },
      { label: 'Human Rights Watch — Rafah house demolitions context', url: 'https://www.hrw.org/report/2004/10/17/razing-rafah/mass-home-demolitions-gaza-strip' },
    ],
    multimedia: [
      { type: 'document', label: 'HRW — Rafah demolitions investigation (context)', url: 'https://www.hrw.org/report/2004/10/17/razing-rafah/mass-home-demolitions-gaza-strip' },
    ],
    tier: 'circumstantial',
    casualties: { killed: 1 },
  },
  {
    id: 'qana-2006',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['dick-cheney', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Qana Building Strike (2006 Lebanon War)',
    date: 'July 30, 2006',
    location: 'Qana, southern Lebanon',
    summary:
      'An Israeli airstrike destroyed a residential building in Qana where civilians were sheltering. At least 28 people were killed, the majority children. The strike became one of the defining civilian-casualty events of the 2006 Lebanon War.',
    evidence:
      'Human Rights Watch and Amnesty International field investigations documented the civilian composition of the dead and raised proportionality and precaution concerns. Israel said it targeted Hezbollah rocket launch sites; monitors found no evidence of military activity in the building at the time of the strike sufficient to justify the civilian toll under IHL standards they applied.',
    sources: [
      { label: 'Human Rights Watch — Fatal Strikes: Israel\'s Indiscriminate Attacks Against Civilians in Lebanon', url: 'https://www.hrw.org/report/2006/08/02/fatal-strikes/israels-indiscriminate-attacks-against-civilians-lebanon' },
      { label: 'Amnesty International — Israel/Lebanon: Deliberate destruction or "collateral damage"?', url: 'https://www.amnesty.org/en/documents/mde18/007/2006/en/' },
      { label: 'UNIFIL / UN reporting on 2006 conflict civilian harm', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'HRW — Fatal Strikes report', url: 'https://www.hrw.org/report/2006/08/02/fatal-strikes/israels-indiscriminate-attacks-against-civilians-lebanon' },
    ],
    tier: 'verified',
    casualties: { killed: 28 },
  },
  {
    id: 'cast-lead-2008-09',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'un-finding',
    title: 'Operation Cast Lead — UN Fact-Finding Mission',
    date: 'December 27, 2008 – January 18, 2009',
    location: 'Gaza Strip',
    summary:
      'Israel\'s three-week military operation in Gaza killed approximately 1,400 Palestinians, including hundreds of civilians and children, and 13 Israelis. The UN Fact-Finding Mission led by Justice Richard Goldstone found evidence of war crimes and possible crimes against humanity by Israeli forces and by Palestinian armed groups.',
    evidence:
      'The Goldstone Report (A/HRC/12/48) documented attacks on civilian infrastructure, white phosphorus use in populated areas, and shootings of civilians waving white flags. Goldstone later partially walked back one personal conclusion about intentionality of civilian targeting as policy, while the underlying factual catalog of civilian harm and the dual-party war-crimes findings by other UN and NGO monitors remain part of the public record. B\'Tselem and HRW published parallel investigations.',
    sources: [
      { label: 'UN Fact-Finding Mission on the Gaza Conflict (Goldstone Report)', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
      { label: 'Human Rights Watch — Rain of Fire (white phosphorus in Gaza)', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
      { label: 'B\'Tselem — Cast Lead fatalities and civilian harm', url: 'https://www.btselem.org/gaza_strip/castlead_operation' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR — Fact-finding mission materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
      { type: 'investigation', label: 'HRW — White phosphorus investigation', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 1400 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'mavi-marmara-2010',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['barack-obama'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'un-finding',
    title: 'Gaza Flotilla Raid — Mavi Marmara',
    date: 'May 31, 2010',
    location: 'International waters, Mediterranean Sea',
    summary:
      'Israeli naval commandos boarded the Mavi Marmara, the lead ship of a civilian aid flotilla attempting to breach the Gaza blockade in international waters. Nine Turkish activists were killed (a tenth later died of wounds). Dozens were wounded. The raid triggered a major diplomatic crisis with Turkey.',
    evidence:
      'The UN Human Rights Council fact-finding mission concluded that force used was disproportionate and that violations of international law occurred. The UN Palmer Report was more mixed, finding the blockade legal in some respects while criticizing the raid\'s execution. Passenger videos and autopsy findings documented close-range shootings.',
    sources: [
      { label: 'UN HRC Fact-Finding Mission report on the flotilla incident', url: 'https://www.ohchr.org/en/hr-bodies/hrc/regular-sessions/session15/flotilla-fact-finding-mission' },
      { label: 'UN Palmer Report summary context', url: 'https://www.un.org/unispal/document/auto-insert-205958/' },
      { label: 'Human Rights Watch — flotilla accountability', url: 'https://www.hrw.org/news/2010/06/01/israel-investigate-killings-gaza-flotilla' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR — Flotilla fact-finding mission', url: 'https://www.ohchr.org/en/hr-bodies/hrc/regular-sessions/session15/flotilla-fact-finding-mission' },
    ],
    tier: 'verified',
    casualties: { killed: 10 },
  },
  {
    id: 'protective-edge-2014-children',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'joe-biden', 'chuck-schumer'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons', 'iron-dome'],
    legalStatus: 'un-finding',
    title: 'Operation Protective Edge — Child Casualties',
    date: 'July 8 – August 26, 2014',
    location: 'Gaza Strip',
    summary:
      'A 51-day Israeli military operation killed 2,251 Palestinians, including 551 children, according to UN figures, and 73 Israelis (including 6 civilians). Entire families were wiped out in single strikes on homes. UN Human Rights Council COI found evidence of war crimes by both Israeli forces and Palestinian armed groups.',
    evidence:
      'OHCHR Commission of Inquiry report A/HRC/29/52 documented patterns of attacks on residential buildings, UN shelters, and civilian infrastructure. UNICEF and Defense for Children International documented child fatalities case-by-case. The U.S. resupplied munitions during the operation under the existing MOU framework.',
    sources: [
      { label: 'UN OHCHR — COI report on 2014 Gaza conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
      { label: 'UNICEF — Children under attack in Gaza 2014', url: 'https://www.unicef.org/stories/children-under-attack-gaza' },
      { label: 'B\'Tselem — 50 days: Protective Edge fatality data', url: 'https://www.btselem.org/gaza_strip/2014_gaza_conflict' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR — Commission of Inquiry findings', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
      { type: 'photo-essay', label: 'UNICEF — Children under attack documentation', url: 'https://www.unicef.org/stories/children-under-attack-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 2251 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'great-march-return-2018',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['donald-trump', 'mike-pompeo', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'un-finding',
    title: 'Great March of Return — Lethal Force Against Demonstrators',
    date: 'March 2018 – December 2019',
    location: 'Gaza perimeter fence',
    summary:
      'Weekly mass demonstrations at the Gaza fence demanding end of blockade and right of return. UN reporting recorded 223 Palestinians killed and more than 36,100 injured, many by live ammunition, including children, medics, journalists, and persons with disabilities. The UN Commission of Inquiry found Israeli snipers intentionally shot civilians.',
    evidence:
      'UN COI (A/HRC/40/74) concluded that Israeli security forces committed violations of international human rights and humanitarian law, some of which may constitute war crimes or crimes against humanity. Israel rejected the findings. Medical data from Gaza hospitals and WHO corroborated the injury patterns (limb amputations from high-velocity rounds).',
    sources: [
      { label: 'UN COI report on the 2018 Gaza protests (A/HRC/40/74)', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-iopt/index' },
      { label: 'UN report A/78/545 — children and armed conflict in OPT', url: 'https://documents.un.org/doc/undoc/gen/n23/315/25/pdf/n2331525.pdf' },
      { label: 'B\'Tselem — Great March of Return documentation', url: 'https://www.btselem.org/firearms/20190327_authorizing_live_fire_against_unarmed_demonstrators' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR — Commission of Inquiry materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-iopt/index' },
      { type: 'investigation', label: 'B\'Tselem — live-fire policy analysis', url: 'https://www.btselem.org/firearms/20190327_authorizing_live_fire_against_unarmed_demonstrators' },
    ],
    tier: 'verified',
    casualties: { killed: 223, injured: 36100 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'oct7-hamas-attack-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Attack — Mass Killing of Israeli Civilians',
    date: 'October 7, 2023',
    location: 'Southern Israel (Gaza envelope communities and festival site)',
    summary:
      'Hamas and other Palestinian armed groups launched a cross-border assault killing approximately 1,139 people in Israel (mostly civilians) and taking 251 hostages. Documented crimes include deliberate killing of civilians, sexual violence, hostage-taking, and attacks on a civilian music festival. This entry is required for a non-selective war-crimes record.',
    evidence:
      'Israeli government fatality lists, UN reporting, Human Rights Watch, Amnesty International, and extensive forensic/video documentation establish deliberate targeting of civilians. ICC Prosecutor sought arrest warrants related to hostage-taking and extermination/murder charges against Hamas leaders. Inclusion here does not offset or excuse any other party\'s crimes.',
    sources: [
      { label: 'Human Rights Watch — October 7 crimes against humanity findings', url: 'https://www.hrw.org/news/2024/07/17/october-7-crimes-against-humanity-war-crimes-hamas' },
      { label: 'Amnesty International — Damning evidence of war crimes by Hamas-led groups', url: 'https://www.amnesty.org/en/latest/news/2023/10/israel-opt-damning-evidence-of-war-crimes-as-israeli-forces-unleash-hell-on-gaza/' },
      { label: 'UN OHCHR — reporting on October 7 and subsequent hostilities', url: 'https://www.ohchr.org/en/countries/palestine' },
    ],
    multimedia: [
      { type: 'investigation', label: 'HRW — October 7 investigation', url: 'https://www.hrw.org/news/2024/07/17/october-7-crimes-against-humanity-war-crimes-hamas' },
      { type: 'document', label: 'OHCHR country page — ongoing documentation', url: 'https://www.ohchr.org/en/countries/palestine' },
    ],
    tier: 'verified',
    casualties: { killed: 1139 },
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'khan-yunis-1956',
    era: '1948-1967',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Khan Yunis Massacre (1956)',
    date: 'November 3, 1956',
    location: 'Khan Yunis, Gaza Strip',
    summary:
      'During the Sinai Campaign, Israeli forces entered Khan Yunis. Contemporary UN and later historical accounts document mass killings of Palestinian men in and around the town, with death-toll estimates commonly cited in the hundreds. The event remains one of the deadliest single episodes of the 1956 Gaza occupation period.',
    evidence:
      'UNRWA and contemporaneous diplomatic reporting recorded large-scale civilian deaths. Later historical synthesis (including works drawing on Israeli and Palestinian archives) treats Khan Yunis 1956 as a documented mass-killing event even where exact body counts remain contested within a high range.',
    sources: [
      { label: 'UNISPAL / UNRWA historical Gaza documentation index', url: 'https://www.un.org/unispal/' },
      { label: 'Britannica — Suez Crisis context for 1956 Sinai Campaign', url: 'https://www.britannica.com/event/Suez-Crisis' },
      { label: 'UNRWA — Gaza refugee history overview', url: 'https://www.unrwa.org/where-we-work/gaza-strip' },
    ],
    multimedia: [
      { type: 'document', label: 'UNISPAL document library — 1956 period records', url: 'https://www.un.org/unispal/' },
    ],
    tier: 'verified',
    casualties: { killed: 275 },
  },
  {
    id: 'beit-hanoun-2006',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['artillery-use', 'annual-mou'],
    legalStatus: 'un-finding',
    title: 'Beit Hanoun Shelling — 19 Killed in Residential Area',
    date: 'November 8, 2006',
    location: 'Beit Hanoun, northern Gaza',
    summary:
      'Israeli artillery shells struck a residential neighborhood in Beit Hanoun, killing 19 Palestinians, including many women and children from the Athamneh family, and wounding dozens. Israel said the strike was an error caused by a technical malfunction; UN and human-rights monitors demanded independent investigation.',
    evidence:
      'UN Human Rights Council special session and subsequent reporting documented the civilian composition of the dead. Human Rights Watch and Amnesty called for investigation of possible violations of the principles of distinction and proportionality. The IDF acknowledged a targeting failure while disputing criminal intent.',
    sources: [
      { label: 'Human Rights Watch — Beit Hanoun shelling', url: 'https://www.hrw.org/news/2006/11/08/israelopt-investigate-gaza-shelling' },
      { label: 'UN News — Secretary-General condemns Beit Hanoun killings', url: 'https://news.un.org/en/story/2006/11/199202' },
      { label: 'Amnesty International — Gaza: end unlawful killings', url: 'https://www.amnesty.org/en/documents/mde15/098/2006/en/' },
    ],
    multimedia: [
      { type: 'document', label: 'UN News — official condemnation record', url: 'https://news.un.org/en/story/2006/11/199202' },
    ],
    tier: 'verified',
    casualties: { killed: 19 },
  },
  {
    id: 'pillar-of-defense-2012',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou', 'iron-dome', 'fmf-weapons'],
    legalStatus: 'un-finding',
    title: 'Operation Pillar of Defense — Civilian Harm in Gaza',
    date: 'November 14–21, 2012',
    location: 'Gaza Strip',
    summary:
      'An eight-day Israeli military operation killed more than 160 Palestinians, including substantial numbers of civilians and children according to UN and B\'Tselem tallies, while six Israelis were killed by rocket fire. Human-rights organizations documented attacks on civilian homes and infrastructure alongside rocket fire from Gaza into Israeli civilian areas.',
    evidence:
      'B\'Tselem, HRW, and UN OCHA issued fatality and civilian-harm tallies. Both Israeli forces and Palestinian armed groups were accused by monitors of violations. U.S. diplomatic and military support continued under the standing aid relationship during and after the operation.',
    sources: [
      { label: 'B\'Tselem — Pillar of Defense fatality data', url: 'https://www.btselem.org/press_releases/20121108_pillar_of_defense_operation' },
      { label: 'Human Rights Watch — Gaza: Palestinian rocket attacks', url: 'https://www.hrw.org/news/2012/12/24/gaza-palestinian-rockets-unlawfully-targeted-israeli-civilians' },
      { label: 'OCHA — Humanitarian situation reporting 2012 Gaza escalation', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem operation documentation', url: 'https://www.btselem.org/gaza_strip' },
    ],
    tier: 'verified',
    casualties: { killed: 167 },
  },
  {
    id: 'second-intifada-civilian-toll',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Second Intifada — Documented Civilian Death Toll',
    date: 'September 2000 – February 2005',
    location: 'West Bank, Gaza Strip, and Israel',
    summary:
      'The Second Intifada killed roughly 3,000–3,300 Palestinians and about 1,000 Israelis by most independent tallies, with a high civilian share on both sides. Documented patterns include suicide bombings against Israeli civilians, Israeli targeted killings and military operations in dense urban areas, and child casualties tracked by B\'Tselem and UNICEF.',
    evidence:
      'B\'Tselem statistical tables, Israeli MFA and Palestinian Authority figures (used critically), and UN reporting provide multi-source fatality floors. This entry is a pattern record, not a single-incident case file — included so the interactive timeline does not jump from 1987 to 2002 without the intervening mass civilian harm.',
    sources: [
      { label: 'B\'Tselem — Fatalities during the Second Intifada', url: 'https://www.btselem.org/statistics/fatalities/before-cast-lead/by-date-of-event' },
      { label: 'UN OCHA — Humanitarian overview archives (Second Intifada period)', url: 'https://www.ochaopt.org/' },
      { label: 'Britannica — Second Intifada overview', url: 'https://www.britannica.com/topic/second-intifada' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem fatalities database', url: 'https://www.btselem.org/statistics' },
    ],
    tier: 'verified',
    casualties: { killed: 4000 },
  },
  {
    id: 'gaza-war-2008-white-phosphorus',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'White Phosphorus over Gaza Civilian Areas (Cast Lead)',
    date: 'December 2008 – January 2009',
    location: 'Gaza Strip urban areas including Gaza City',
    summary:
      'During Operation Cast Lead, Human Rights Watch and Amnesty International documented Israeli use of white phosphorus munitions over densely populated areas. The munitions caused severe burns and fires in civilian neighborhoods. HRW concluded the use in populated areas was unlawfully indiscriminate.',
    evidence:
      'HRW\'s "Rain of Fire" investigation identified munition remnants, burn patterns, and eyewitness accounts. Amnesty published parallel findings. Israel said the munitions were used for obscuration; monitors argued effects in dense urban areas still violated IHL precautions and distinction rules.',
    sources: [
      { label: 'Human Rights Watch — Rain of Fire (white phosphorus in Gaza)', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
      { label: 'Amnesty International — Operation Cast Lead findings', url: 'https://www.amnesty.org/en/documents/mde15/015/2009/en/' },
      { label: 'UN Fact-Finding Mission on the Gaza Conflict materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
    ],
    multimedia: [
      { type: 'investigation', label: 'HRW — Rain of Fire full report', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
    ],
    tier: 'verified',
    imageUrl: ISRAEL_DOSSIER_ASSETS.humanitarian,
  },
  {
    id: 'operation-defensive-shield-2002',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'un-finding',
    title: 'Operation Defensive Shield — West Bank Military Offensive',
    date: 'March – May 2002',
    location: 'West Bank (Jenin, Nablus, Ramallah, Bethlehem and other cities)',
    summary:
      'Israel\'s large-scale reoccupation of West Bank cities after a wave of suicide bombings. Human rights monitors documented extensive civilian casualties, house demolitions, and restricted medical access. Jenin camp became the most contested single site (see separate Jenin entry). This pattern record covers the operation as a whole.',
    evidence:
      'HRW, Amnesty, and UN reporting catalogued civilian harm and access denials across multiple cities. Israeli authorities framed the operation as counterterrorism after Passover and other bombings. Both the military necessity claim and the civilian harm record are part of the public documentary floor.',
    sources: [
      { label: 'Human Rights Watch — Jenin and Defensive Shield reporting', url: 'https://www.hrw.org/report/2002/05/02/jenin/idf-military-operations' },
      { label: 'Amnesty International — Shielded from scrutiny', url: 'https://www.amnesty.org/en/documents/mde15/143/2002/en/' },
      { label: 'UN Secretary-General report on Jenin (A/ES-10/186)', url: 'https://www.un.org/unispal/document/auto-insert-183434/' },
    ],
    multimedia: [
      { type: 'document', label: 'UN report — Jenin and related findings', url: 'https://www.un.org/unispal/document/auto-insert-183434/' },
    ],
    tier: 'verified',
  },
  {
    id: 'first-intifada-civilian-pattern',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'First Intifada — Documented Civilian Fatality Pattern',
    date: 'December 1987 – September 1993',
    location: 'West Bank and Gaza Strip',
    summary:
      'The First Intifada killed more than 1,000 Palestinians and over 100 Israelis by B\'Tselem and related tallies, with a large civilian share. Israeli forces used live ammunition, beatings, and curfews against a largely civilian uprising; Palestinian attacks also killed Israeli civilians. Defense Minister Yitzhak Rabin\'s "break their bones" order became a symbol of the crackdown.',
    evidence:
      'B\'Tselem statistical tables for the First Intifada remain the standard public fatality floor. Multiple contemporaneous human-rights and UN reports document civilian harm patterns. This is a multi-year pattern record, not a single incident.',
    sources: [
      { label: 'B\'Tselem — First Intifada statistics', url: 'https://www.btselem.org/statistics/first_intifada_tables' },
      { label: 'Britannica — Intifada overview', url: 'https://www.britannica.com/topic/intifada' },
      { label: 'UNISPAL — First Intifada period documentation', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem First Intifada tables', url: 'https://www.btselem.org/statistics/first_intifada_tables' },
    ],
    tier: 'verified',
    casualties: { killed: 1162 },
  },
  {
    id: 'grapes-of-wrath-1996',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'artillery-use'],
    legalStatus: 'un-finding',
    title: 'Operation Grapes of Wrath — Civilian Harm Campaign (1996)',
    date: 'April 11–27, 1996',
    location: 'Southern Lebanon (including Qana)',
    summary:
      'Israel\'s 16-day operation against Hezbollah in Lebanon killed more than 150 Lebanese civilians and displaced hundreds of thousands, according to UN and human-rights tallies. The Qana UN compound strike is the most infamous single event (separate entry); this record covers the broader campaign pattern of artillery and air attacks affecting civilian areas.',
    evidence:
      'Amnesty, HRW, and UN reporting document civilian casualties across the operation. The Qana investigation is the legal high-water mark; broader Grapes of Wrath harm is corroborated by contemporaneous UNIFIL and humanitarian reports.',
    sources: [
      { label: 'Human Rights Watch — Operation Grapes of Wrath / civilian protection', url: 'https://www.hrw.org/reports/1997/isrleb/' },
      { label: 'Amnesty International — Qana and Grapes of Wrath materials', url: 'https://www.amnesty.org/en/documents/mde15/042/1996/en/' },
      { label: 'UNISPAL — 1996 Lebanon hostilities documentation', url: 'https://www.un.org/unispal/document/auto-insert-179197/' },
    ],
    multimedia: [
      { type: 'document', label: 'HRW 1996–97 Lebanon civilian casualties report', url: 'https://www.hrw.org/reports/1997/isrleb/' },
    ],
    tier: 'verified',
    casualties: { killed: 154 },
  },
  {
    id: 'operation-cast-lead-school-strikes',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'un-finding',
    title: 'Cast Lead — UN Schools and Shelters Struck',
    date: 'December 2008 – January 2009',
    location: 'Gaza Strip (UNRWA schools and civilian shelters)',
    summary:
      'During Operation Cast Lead, multiple UNRWA schools and civilian shelters were struck, killing and wounding civilians who had sought refuge under UN flags. The Goldstone Fact-Finding Mission and subsequent UN reporting catalogued these attacks as among the most serious civilian-protection failures of the operation.',
    evidence:
      'UN Fact-Finding Mission materials, UNRWA contemporaneous statements, and HRW field reporting document strikes on facilities whose coordinates had been shared with Israeli forces. Israel disputed intent; monitors documented civilian composition of the dead and prior knowledge of shelter locations.',
    sources: [
      { label: 'UN Fact-Finding Mission on the Gaza Conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
      { label: 'Human Rights Watch — Rain of Fire / Cast Lead civilian harm', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
      { label: 'UNRWA historical Cast Lead statements (via UNISPAL)', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR Fact-Finding Mission materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
    ],
    tier: 'verified',
  },
  {
    id: 'operation-protective-edge-unrwa-shelters',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'joe-biden', 'chuck-schumer'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons', 'iron-dome'],
    legalStatus: 'un-finding',
    title: 'Protective Edge — UNRWA Shelters Hit While Hosting Displaced Families',
    date: 'July – August 2014',
    location: 'Gaza Strip UNRWA schools used as emergency shelters',
    summary:
      'During the 2014 Gaza war, several UNRWA schools functioning as emergency shelters for displaced families were hit by Israeli fire. UN boards of inquiry documented civilian deaths and injuries at sites whose locations had been communicated to Israeli authorities.',
    evidence:
      'UN Headquarters Board of Inquiry summaries, OCHA situation reports, and OHCHR COI materials document attacks affecting UN premises. The pattern is distinct from the broader Protective Edge child-casualty record and focuses on protected civilian shelter sites.',
    sources: [
      { label: 'UN OHCHR — COI report on 2014 Gaza conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
      { label: 'UN News — UNRWA schools hit during 2014 hostilities', url: 'https://news.un.org/en/story/2014/07/473992' },
      { label: 'B\'Tselem — 2014 Gaza conflict documentation', url: 'https://www.btselem.org/gaza_strip/2014_gaza_conflict' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR Commission of Inquiry findings', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
    ],
    tier: 'verified',
  },
  {
    id: 'al-samu-1966',
    era: '1948-1967',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'un-finding',
    title: 'Al-Samu Raid (1966)',
    date: 'November 13, 1966',
    location: 'As-Samu, West Bank (then under Jordanian control)',
    summary:
      'Israeli forces conducted a large daylight raid on the West Bank village of as-Samu after a landmine killed three Israeli soldiers. Dozens of houses and a clinic were demolished; contemporaneous tallies put Palestinian dead in the teens to twenties, including civilians, with many more wounded. The raid provoked regional crisis and UN Security Council condemnation.',
    evidence:
      'UN Security Council debate and Resolution 228 (1966) condemned the large-scale military action. Contemporary UN Truce Supervision and Jordanian/Israeli reporting document house demolitions and civilian casualties. Historians treat as-Samu as a major pre-1967 escalation, not a disputed rumor.',
    sources: [
      { label: 'UN Security Council Resolution 228 (1966)', url: 'https://digitallibrary.un.org/record/90705' },
      { label: 'UNISPAL — Security Council debate on as-Samu', url: 'https://www.un.org/unispal/' },
      { label: 'Britannica — As-Samu context (Six-Day War prelude)', url: 'https://www.britannica.com/event/Six-Day-War' },
    ],
    multimedia: [
      { type: 'document', label: 'UNSC Resolution 228 text', url: 'https://digitallibrary.un.org/record/90705' },
    ],
    tier: 'verified',
    casualties: { killed: 18 },
  },
  {
    id: 'uss-liberty-1967',
    era: '1948-1967',
    targetsCivilians: false,
    targetsChildren: false,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'official-commission',
    title: 'USS Liberty Attack — 34 U.S. Sailors Killed',
    date: 'June 8, 1967',
    location: 'International waters, eastern Mediterranean (off Sinai)',
    summary:
      'Israeli air and naval forces attacked the USS Liberty, a clearly marked U.S. Navy technical research ship, during the Six-Day War. 34 American servicemen were killed and 171 wounded. Israel apologized and paid reparations, calling the attack a case of mistaken identity. Surviving crew members and several later inquiries have disputed that account; official U.S. investigations accepted the accident framing while documenting command and identification failures.',
    evidence:
      'U.S. Navy Court of Inquiry, NSA/State Department FRUS records, and Israeli inquiry materials form the documentary floor. Death and injury counts are not disputed. Attribution of intent remains contested — labeled verified for the attack itself and official findings, with honest note that motive is disputed.',
    sources: [
      { label: 'U.S. State Department FRUS — USS Liberty (Vol. XIX, Doc. 284 context)', url: 'https://history.state.gov/historicaldocuments/frus1964-68v19/d284' },
      { label: 'NSA — USS Liberty historical materials', url: 'https://www.nsa.gov/Helpful-Links/NSA-FOIA/Declassification-Transparency-Initiatives/Historical-Releases/USS-Liberty/' },
      { label: 'U.S. Navy history — USS Liberty attack summary', url: 'https://www.history.navy.mil/research/histories/ship-histories/danfs/l/liberty-iii.html' },
    ],
    multimedia: [
      { type: 'document', label: 'FRUS diplomatic record on the attack', url: 'https://history.state.gov/historicaldocuments/frus1964-68v19/d284' },
    ],
    tier: 'verified',
    casualties: { killed: 34, injured: 171 },
  },
  {
    id: 'land-day-1976',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Land Day — Killings of Palestinian Citizens Protesting Land Expropriation',
    date: 'March 30, 1976',
    location: 'Galilee and Triangle (within Israel)',
    summary:
      'Palestinian citizens of Israel mounted a general strike and demonstrations against large-scale government land expropriation plans in the Galilee. Israeli security forces killed six demonstrators and wounded many more. Land Day became an annual commemorative date across Palestinian communities.',
    evidence:
      'Israeli and Palestinian press of the period, Knesset debate, and later human-rights/historical synthesis document the six deaths and the expropriation context. The event is not a wartime fog-of-war claim; it is a domestic protest killing with named fatalities in the public record.',
    sources: [
      { label: 'Britannica — Land Day overview', url: 'https://www.britannica.com/topic/Land-Day' },
      { label: 'Adalah — Land Day / Palestinian citizens legal context', url: 'https://www.adalah.org/' },
      { label: 'UNISPAL — Palestinian land and rights documentation index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'Adalah legal center — Palestinian citizens rights archive', url: 'https://www.adalah.org/' },
    ],
    tier: 'verified',
    casualties: { killed: 6 },
  },
  {
    id: 'operation-litani-1978',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Operation Litani — Civilian Harm in Southern Lebanon (1978)',
    date: 'March 14–21, 1978',
    location: 'Southern Lebanon (up to the Litani River)',
    summary:
      'Israel invaded southern Lebanon after the Coastal Road massacre, aiming to push PLO forces north of the Litani. Hundreds of Lebanese and Palestinian civilians were killed and tens of thousands displaced according to contemporaneous UN and Red Cross tallies. The operation produced UNSC Resolutions 425 and 426 creating UNIFIL.',
    evidence:
      'UN Security Council Resolutions 425/426, UNIFIL establishment records, and ICRC/humanitarian reporting document large-scale civilian displacement and casualties. Exact civilian vs combatant splits are imperfect in 1978 field conditions; the scale of civilian harm and the UN response are not seriously disputed.',
    sources: [
      { label: 'UN Security Council Resolution 425 (1978) — UNIFIL', url: 'https://digitallibrary.un.org/record/71821' },
      { label: 'UNIFIL — mission background', url: 'https://unifil.unmissions.org/' },
      { label: 'UNISPAL — 1978 Lebanon hostilities documentation', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'UNSC Resolution 425', url: 'https://digitallibrary.un.org/record/71821' },
    ],
    tier: 'verified',
  },
  {
    id: 'beirut-siege-1982',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Siege of Beirut — Civilian Bombardment (1982)',
    date: 'June – August 1982',
    location: 'West Beirut, Lebanon',
    summary:
      'During the 1982 Lebanon War, Israeli forces besieged West Beirut with heavy air, artillery, and naval bombardment while PLO forces were still inside the city. Thousands of civilians were killed across the wider war; West Beirut under siege saw sustained attacks on densely populated districts, hospitals, and infrastructure before the PLO evacuation.',
    evidence:
      'ICRC, Lebanese health authorities, contemporary press, and later commissions (including materials related to Sabra/Shatila and the broader invasion) document mass civilian harm. Sabra and Shatila is a separate camp-massacre entry; this record covers the siege bombardment pattern itself.',
    sources: [
      { label: 'ICRC historical materials — Lebanon 1982', url: 'https://www.icrc.org/en' },
      { label: 'Human Rights Watch / Lebanon war civilian-harm historiography', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
      { label: 'UNISPAL — 1982 Lebanon war documentation', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'UNISPAL 1982 war index', url: 'https://www.un.org/unispal/' },
    ],
    tier: 'verified',
  },
  {
    id: 'guardian-of-the-walls-2021',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['joe-biden', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou', 'iron-dome', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Guardian of the Walls / May 2021 Gaza Escalation — Civilian Toll',
    date: 'May 10–21, 2021',
    location: 'Gaza Strip and Israel',
    summary:
      'An 11-day escalation following Jerusalem tensions and Hamas rocket fire produced heavy Israeli airstrikes on Gaza and rocket attacks on Israeli cities. OCHA and other monitors recorded roughly 260 Palestinians killed in Gaza (including many civilians and children) and 13 people killed in Israel. Entire residential towers were destroyed; Israel said it targeted military assets inside or near civilian structures.',
    evidence:
      'OCHA protection of civilians snapshots, B\'Tselem fatality tables, and HRW/Amnesty incident investigations form a multi-source floor. U.S. diplomatic and munitions support continued under the standing MOU. This is a pattern/escalation record with checkable aggregate tallies, not a single disputed strike.',
    sources: [
      { label: 'OCHA — Protection of Civilians / May 2021 escalation materials', url: 'https://www.ochaopt.org/' },
      { label: 'B\'Tselem — May 2021 fatalities and context', url: 'https://www.btselem.org/gaza_strip' },
      { label: 'Human Rights Watch — Gaza 2021 civilian harm reporting', url: 'https://www.hrw.org/news/2021/05/12/israelpalestine-gaza-hostilities-must-not-excuse-unlawful-attacks' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA opt situation reporting hub', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
    casualties: { killed: 260 },
  },
  {
    id: 'summer-rains-2006',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Operation Summer Rains — Gaza Offensive (2006)',
    date: 'June 28 – November 26, 2006',
    location: 'Gaza Strip',
    summary:
      'After the capture of Israeli soldier Gilad Shalit, Israel launched a months-long Gaza offensive involving airstrikes, artillery, and ground raids. Human rights monitors documented hundreds of Palestinian deaths, including many civilians, and severe damage to civilian infrastructure including Gaza\'s only power plant.',
    evidence:
      'B\'Tselem fatality tables, HRW and Amnesty field reporting, and OCHA situation reports document civilian harm and infrastructure destruction during Summer Rains / Autumn Clouds. Israel framed the operation as pressure to free Shalit; monitors documented disproportionate civilian impact.',
    sources: [
      { label: 'B\'Tselem — 2006 Gaza fatalities and operations', url: 'https://www.btselem.org/gaza_strip' },
      { label: 'Human Rights Watch — Gaza 2006 civilian harm reporting', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
      { label: 'OCHA — historical Gaza protection reporting', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem Gaza documentation hub', url: 'https://www.btselem.org/gaza_strip' },
    ],
    tier: 'verified',
  },
  {
    id: 'operation-cast-lead-white-phosphorus-pattern',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Cast Lead — Civilian Infrastructure and Power System Strikes',
    date: 'December 2008 – January 2009',
    location: 'Gaza Strip (civilian infrastructure)',
    summary:
      'Beyond the school-shelter and white-phosphorus entries, Cast Lead included widespread strikes on civilian infrastructure — water, sewage, electricity, and housing — that UN and human-rights monitors treated as a pattern of civilian-harm amplification, not isolated targeting errors.',
    evidence:
      'UN Fact-Finding Mission materials, UNEP post-conflict environmental assessment, and HRW infrastructure reporting document systematic damage to civilian systems. Distinct from the UN school/shelter and white-phosphorus records; this entry tracks infrastructure pattern evidence.',
    sources: [
      { label: 'UN Fact-Finding Mission on the Gaza Conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
      { label: 'UNEP — Environmental Assessment of the Gaza Strip following Cast Lead', url: 'https://www.unep.org/' },
      { label: 'Human Rights Watch — Cast Lead civilian harm series', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR Fact-Finding Mission materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
    ],
    tier: 'verified',
  },
  {
    id: 'great-march-return-medics-2018',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['donald-trump', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'un-finding',
    title: 'Great March of Return — Medics and Journalists Shot',
    date: 'March 2018 – December 2019',
    location: 'Gaza perimeter fence (medics, first responders, and press)',
    summary:
      'Alongside the broader Great March of Return lethal-force pattern, Israeli snipers and forces killed and maimed clearly marked medics, first responders, and journalists covering the protests — including cases documented by UN commissions of inquiry as possible war crimes / crimes against humanity.',
    evidence:
      'UN Commission of Inquiry on the 2018 protests, WHO health-worker tallies, and CPJ/RSF journalist tallies document killings of protected persons. This entry isolates the medic/press subset from the general demonstration death toll (separate entry).',
    sources: [
      { label: 'UN OHCHR — COI on the 2018 Gaza protests', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-opt/index' },
      { label: 'Committee to Protect Journalists — Gaza 2018 coverage', url: 'https://cpj.org/' },
      { label: 'B\'Tselem — Great March of Return documentation', url: 'https://www.btselem.org/gaza_strip' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR Commission of Inquiry materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-opt/index' },
    ],
    tier: 'verified',
  },
  {
    id: 'jenin-2023-july',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['joe-biden', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Jenin Camp Raid — July 2023',
    date: 'July 3–5, 2023',
    location: 'Jenin Refugee Camp, West Bank',
    summary:
      'Israeli forces conducted a large multi-day raid on Jenin refugee camp months before October 7, involving drones, bulldozers, and ground troops. Monitors recorded roughly a dozen Palestinians killed and widespread damage to civilian infrastructure and housing — among the largest West Bank operations of 2023 prior to the Gaza war.',
    evidence:
      'OCHA protection reports, UNRWA camp updates, and contemporaneous press/human-rights documentation establish casualty and damage floors. Included as a high-evidence pre-Oct-7 West Bank densification point with U.S. MOU continuity as background enablement.',
    sources: [
      { label: 'OCHA — Protection of Civilians weekly reports (July 2023)', url: 'https://www.ochaopt.org/' },
      { label: 'UNRWA — Jenin camp situation updates', url: 'https://www.unrwa.org/' },
      { label: 'B\'Tselem — West Bank fatalities documentation', url: 'https://www.btselem.org/statistics' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA opt reporting hub', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
  },
  {
    id: 'gaza-blockade-2007',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Land, Air, and Sea Blockade Formalized (2007)',
    date: 'June 2007 – ongoing through October 2023',
    location: 'Gaza Strip',
    summary:
      'After Hamas took control of Gaza in June 2007, Israel (with Egypt controlling the Rafah crossing) formalized a comprehensive land, air, and sea blockade. UN agencies and human-rights organizations documented severe restrictions on movement, dual-use goods, fuel, and construction materials that degraded civilian infrastructure and living standards for more than 15 years before the post–October 7 war.',
    evidence:
      'UN OCHA access reporting, World Bank economic assessments, and HRW/Amnesty blockade analyses form a multi-source floor. Israel frames the blockade as security containment; monitors document collective civilian impact. This is a structural pattern record, not a single kinetic incident.',
    sources: [
      { label: 'OCHA — Gaza access and blockade reporting', url: 'https://www.ochaopt.org/' },
      { label: 'Human Rights Watch — Unwilling or Unable / blockade context', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
      { label: 'UNRWA — Gaza blockade humanitarian impact materials', url: 'https://www.unrwa.org/where-we-work/gaza-strip' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA opt access reporting', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
  },
  {
    id: 'settlement-enterprise-pattern',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden', 'donald-trump'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'court-finding',
    title: 'Settlement Enterprise — Civilian Displacement Pattern (UN / ICJ Floor)',
    date: '1967 – ongoing',
    location: 'West Bank including East Jerusalem',
    summary:
      'Israeli civilian settlements in occupied territory have expanded for decades, accompanied by land seizures, home demolitions, movement restrictions, and settler violence against Palestinians. The ICJ 2004 wall advisory opinion and 2024 occupation advisory opinion treat settlement activity as unlawful under international law; this entry tracks the multi-decade pattern rather than any single outpost.',
    evidence:
      'ICJ advisory opinions (2004 wall; 2024 occupation), UNSC Resolution 2334, B\'Tselem settlement data, and Peace Now tracking form the public floor. U.S. policy has oscillated between labeling settlements unhelpful and recognizing related claims — aid continuity continued throughout.',
    sources: [
      { label: 'ICJ — 2024 advisory opinion on the occupation', url: 'https://www.icj-cij.org/node/204176' },
      { label: 'UN Security Council Resolution 2334 (2016)', url: 'https://digitallibrary.un.org/record/853516' },
      { label: 'B\'Tselem — settlements and land policy', url: 'https://www.btselem.org/settlements' },
    ],
    multimedia: [
      { type: 'document', label: 'ICJ occupation advisory opinion', url: 'https://www.icj-cij.org/node/204176' },
    ],
    tier: 'verified',
  },
  {
    id: 'days-of-penitence-2004',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Operation Days of Penitence — Northern Gaza Offensive (2004)',
    date: 'September 29 – October 16, 2004',
    location: 'Northern Gaza Strip (Jabalia / Beit Hanoun area)',
    summary:
      'A major Israeli ground and air offensive in northern Gaza after Qassam rocket fire. Human-rights monitors recorded roughly 100+ Palestinian deaths including many civilians and children, plus widespread housing destruction in dense refugee-camp areas.',
    evidence:
      'B\'Tselem fatality tables, OCHA access reports, and contemporaneous HRW/Amnesty documentation establish civilian-harm floors. Distinct from later Cast Lead; included to densify the 2000–2005 escalation period with checkable multi-source tallies.',
    sources: [
      { label: 'B\'Tselem — 2004 Gaza fatalities / operations', url: 'https://www.btselem.org/gaza_strip' },
      { label: 'OCHA — historical Gaza protection reporting', url: 'https://www.ochaopt.org/' },
      { label: 'Human Rights Watch — Israel/Palestine archives (2004 period)', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem Gaza documentation hub', url: 'https://www.btselem.org/gaza_strip' },
    ],
    tier: 'verified',
    casualties: { killed: 100 },
  },
  {
    id: 'cave-of-patriarchs-1994',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'court-finding',
    title: 'Cave of the Patriarchs Massacre — Baruch Goldstein',
    date: 'February 25, 1994',
    location: 'Ibrahimi Mosque / Cave of the Patriarchs, Hebron',
    summary:
      'American-Israeli settler Baruch Goldstein opened fire on Palestinian Muslim worshippers during Ramadan prayers, killing 29 and wounding more than 100. He was beaten to death at the scene. Israeli authorities condemned the attack; subsequent curfews and movement restrictions in Hebron fell heavily on Palestinian residents.',
    evidence:
      'Israeli government investigation, contemporaneous international press, and B\'Tselem documentation establish the death toll and perpetrator identity beyond serious dispute. Included as a high-evidence civilian massacre by a settler actor — distinct from state military operations but part of the occupation-era civilian-harm record.',
    sources: [
      { label: 'B\'Tselem — Hebron / Cave of the Patriarchs documentation', url: 'https://www.btselem.org/' },
      { label: 'Britannica — Cave of the Patriarchs massacre', url: 'https://www.britannica.com/event/Cave-of-the-Patriarchs-massacre' },
      { label: 'UNISPAL — 1994 Hebron massacre documentation', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica encyclopedic synthesis', url: 'https://www.britannica.com/event/Cave-of-the-Patriarchs-massacre' },
    ],
    tier: 'verified',
    casualties: { killed: 29, injured: 125 },
  },
  {
    id: 'huwara-2023',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Huwara Settler Rampage (February 2023)',
    date: 'February 26, 2023',
    location: 'Huwara, West Bank',
    summary:
      'After two Israeli brothers were killed nearby, hundreds of Israeli settlers attacked the Palestinian town of Huwara, burning homes, cars, and businesses. One Palestinian was killed and dozens wounded. Senior Israeli officials used language that appeared to endorse or minimize the rampage; international monitors called for accountability.',
    evidence:
      'OCHA protection reports, B\'Tselem field documentation, contemporaneous video, and multi-outlet investigative reporting establish the scale of arson and assault. Perpetrator identity is collective (settler mob) rather than a single state unit; state responsibility questions turn on prevention, facilitation, and official statements — labeled multi-source investigation.',
    sources: [
      { label: 'OCHA — Protection of Civilians reporting (Feb 2023)', url: 'https://www.ochaopt.org/' },
      { label: 'B\'Tselem — settler violence documentation', url: 'https://www.btselem.org/topic/settler_violence' },
      { label: 'Human Rights Watch — West Bank settler violence context', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem settler violence hub', url: 'https://www.btselem.org/topic/settler_violence' },
    ],
    tier: 'verified',
    casualties: { killed: 1 },
  },
  {
    id: 'rafah-black-friday-2014',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons', 'artillery-use'],
    legalStatus: 'un-finding',
    title: 'Rafah "Black Friday" — Protective Edge (2014)',
    date: 'August 1, 2014',
    location: 'Rafah, Gaza Strip',
    summary:
      'After the capture of an Israeli soldier during a temporary humanitarian pause, Israeli forces launched intense bombardment and ground operations in Rafah. Human-rights and UN monitors recorded well over 100 Palestinians killed in a single day, including large civilian and child shares — among the deadliest 24-hour periods of the 2014 war.',
    evidence:
      'Amnesty International "Black Friday" investigation, OHCHR COI materials, and OCHA casualty tallies document the scale of civilian harm. Distinct from Shuja\'iyya and UNRWA-shelter entries for Protective Edge.',
    sources: [
      { label: 'Amnesty International — Black Friday: Carnage in Rafah', url: 'https://www.amnesty.org/en/documents/mde15/0280/2015/en/' },
      { label: 'OHCHR — COI report on 2014 Gaza conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
      { label: 'B\'Tselem — 2014 Gaza conflict documentation', url: 'https://www.btselem.org/gaza_strip/2014_gaza_conflict' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Amnesty Black Friday report', url: 'https://www.amnesty.org/en/documents/mde15/0280/2015/en/' },
    ],
    tier: 'verified',
    casualties: { killed: 135 },
  },
  {
    id: 'shujaiya-2014',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons', 'artillery-use'],
    legalStatus: 'un-finding',
    title: 'Shuja\'iyya Assault — Protective Edge (2014)',
    date: 'July 19–20, 2014',
    location: "Shuja'iyya, Gaza City",
    summary:
      'During Operation Protective Edge, Israeli forces conducted a massive assault on the dense Shuja\'iyya neighborhood. UN and human-rights tallies recorded more than 100 Palestinians killed in about 24 hours, including large numbers of civilians and children, amid artillery and air bombardment of residential blocks.',
    evidence:
      'OHCHR Commission of Inquiry materials on the 2014 Gaza conflict, OCHA casualty snapshots, and B\'Tselem field documentation establish the scale of civilian harm. Distinct from the child-casualty and UNRWA-shelter entries for Protective Edge — this isolates the single-neighborhood peak-intensity assault.',
    sources: [
      { label: 'OHCHR — COI report on 2014 Gaza conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
      { label: 'B\'Tselem — 2014 Gaza conflict documentation', url: 'https://www.btselem.org/gaza_strip/2014_gaza_conflict' },
      { label: 'OCHA — Protection of Civilians / 2014 hostilities', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR COI 2014 materials', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 120 },
  },
  {
    id: 'operation-summer-rains-power-plant-2006',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Power Plant Strike during Summer Rains (2006)',
    date: 'June 28, 2006',
    location: 'Gaza Power Plant, Gaza Strip',
    summary:
      'At the opening of Operation Summer Rains, Israeli forces destroyed Gaza\'s only power plant transformers, plunging much of the Strip into prolonged electricity shortage that cascaded into water and sewage failures. Human rights groups characterized the strike as collective punishment of the civilian population.',
    evidence:
      'HRW, B\'Tselem, and contemporaneous UN humanitarian reporting document the plant strike and civilian infrastructure impact. Distinct from the broader Summer Rains campaign entry — this isolates the power-plant infrastructure attack as a checkable civilian-harm milestone.',
    sources: [
      { label: 'Human Rights Watch — Gaza electricity / 2006 hostilities', url: 'https://www.hrw.org/middle-east/n-africa/israel/palestine' },
      { label: 'B\'Tselem — Gaza 2006 operations documentation', url: 'https://www.btselem.org/gaza_strip' },
      { label: 'OCHA — Gaza humanitarian situation reports (2006)', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem Gaza hub', url: 'https://www.btselem.org/gaza_strip' },
    ],
    tier: 'verified',
  },
  {
    id: 'gaza-disengagement-2005',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Disengagement — Settlements Evacuated; Occupation Architecture Continues',
    date: 'August – September 2005',
    location: 'Gaza Strip',
    summary:
      'Israel unilaterally evacuated all settlements and military bases from Gaza. The withdrawal ended permanent ground presence inside the Strip but left Israel controlling airspace, territorial waters, and most crossings — the architecture later formalized as the post-2007 blockade. Included as a structural turning point, not a kinetic massacre.',
    evidence:
      'Israeli government disengagement plan documents, UNRWA/OCHA post-withdrawal reporting, and subsequent ICJ/UN characterizations of ongoing control form the public floor. Civilian impact of the later blockade is tracked in the separate 2007 blockade entry.',
    sources: [
      { label: 'UNRWA — Gaza historical context', url: 'https://www.unrwa.org/where-we-work/gaza-strip' },
      { label: 'OCHA — Gaza access evolution materials', url: 'https://www.ochaopt.org/' },
      { label: 'Britannica — Israeli disengagement from Gaza', url: 'https://www.britannica.com/event/Israels-disengagement-from-Gaza' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA Gaza hub', url: 'https://www.unrwa.org/where-we-work/gaza-strip' },
    ],
    tier: 'verified',
  },
  {
    id: 'settler-violence-pattern-2021-2023',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Settler Violence Surge — West Bank Pattern (2021–2023)',
    date: '2021 – September 2023',
    location: 'West Bank (multiple governorates)',
    summary:
      'OCHA, B\'Tselem, and other monitors documented a multi-year surge in settler attacks on Palestinian civilians, agriculture, and property across the West Bank before October 7 — including arson, assaults, and displacement. Distinct from the single-day Huwara rampage entry; this is the multi-year pattern floor.',
    evidence:
      'OCHA Protection of Civilians dashboards, B\'Tselem settler-violence tracking, and UN Secretary-General reporting establish rising attack counts and civilian impact. State responsibility debates turn on prevention and accountability; the attack pattern itself is multi-source documented.',
    sources: [
      { label: 'OCHA — Protection of Civilians data', url: 'https://www.ochaopt.org/' },
      { label: 'B\'Tselem — settler violence topic page', url: 'https://www.btselem.org/topic/settler_violence' },
      { label: 'UN OHCHR — West Bank settler violence statements', url: 'https://www.ohchr.org/' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA opt reporting hub', url: 'https://www.ochaopt.org/' },
    ],
    tier: 'verified',
  },
  {
    id: 'operation-rainbow-2004',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Operation Rainbow — Rafah Offensive (2004)',
    date: 'May 18–24, 2004',
    location: 'Rafah, Gaza Strip',
    summary:
      'Israeli forces conducted a major offensive in Rafah aimed at destroying smuggling tunnels and armed groups. Human-rights monitors documented dozens of Palestinian deaths including civilians, and large-scale house demolitions that left hundreds of families homeless.',
    evidence:
      'HRW "Razing Rafah" investigation, B\'Tselem fatality tables, and UN agency reporting document civilian harm and demolitions. Distinct from the later Rachel Corrie killing (2003) and Days of Penitence (later 2004) entries.',
    sources: [
      { label: 'Human Rights Watch — Razing Rafah', url: 'https://www.hrw.org/report/2004/10/17/razing-rafah/mass-home-demolitions-gaza-strip' },
      { label: 'B\'Tselem — Rafah / house demolitions documentation', url: 'https://www.btselem.org/gaza_strip' },
      { label: 'UNRWA — Rafah emergency / shelter materials (historical)', url: 'https://www.unrwa.org/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'HRW Razing Rafah full report', url: 'https://www.hrw.org/report/2004/10/17/razing-rafah/mass-home-demolitions-gaza-strip' },
    ],
    tier: 'verified',
  },
  {
    id: 'second-lebanon-war-2006-pattern',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Second Lebanon War — Civilian Harm Pattern (2006)',
    date: 'July 12 – August 14, 2006',
    location: 'Lebanon (and northern Israel under rocket fire)',
    summary:
      'A 34-day war between Israel and Hezbollah killed roughly 1,000+ Lebanese (majority civilians per UN/HRW tallies) and dozens of Israeli civilians from rocket fire. Cluster munitions use in south Lebanon and strikes on civilian infrastructure were extensively documented. Distinct from the single-building Qana 2006 entry — this is the campaign-level civilian-harm floor.',
    evidence:
      'HRW Fatal Strikes / Flooding South Lebanon reports, Amnesty field investigations, and UN mine-action cluster-munition assessments form a multi-source floor. U.S. munitions resupply during the war is part of the enablement context under standing FMF/stockpile architecture.',
    sources: [
      { label: 'Human Rights Watch — Fatal Strikes (Lebanon 2006)', url: 'https://www.hrw.org/report/2006/08/02/fatal-strikes/israels-indiscriminate-attacks-against-civilians-lebanon' },
      { label: 'Human Rights Watch — Flooding South Lebanon (cluster munitions)', url: 'https://www.hrw.org/report/2008/02/16/flooding-south-lebanon/israels-use-cluster-munitions-lebanon-july-and-august-2006' },
      { label: 'Amnesty International — Lebanon 2006 civilian harm', url: 'https://www.amnesty.org/en/documents/mde18/007/2006/en/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'HRW cluster munitions investigation', url: 'https://www.hrw.org/report/2008/02/16/flooding-south-lebanon/israels-use-cluster-munitions-lebanon-july-and-august-2006' },
    ],
    tier: 'verified',
    casualties: { killed: 1100 },
  },
  {
    id: 'king-david-hotel-1946',
    era: 'mandate-1948',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'King David Hotel Bombing (Irgun)',
    date: 'July 22, 1946',
    location: 'King David Hotel, Jerusalem (British Mandate administrative HQ)',
    summary:
      'The Irgun Zionist paramilitary organization bombed the southern wing of the King David Hotel, which housed British Mandate administrative and military headquarters. Ninety-one people were killed — British officials, Arab and Jewish hotel workers and visitors — in one of the deadliest attacks of the Mandate period.',
    evidence:
      'British Mandate inquiries, contemporaneous press, and later archival historiography (including Irgun admissions of responsibility) establish Irgun authorship and the death toll. Included for chronological balance: civilian and administrative deaths by a Zionist paramilitary before statehood, with checkable primary-period documentation — not as collective blame of any people.',
    sources: [
      { label: 'Britannica — King David Hotel bombing', url: 'https://www.britannica.com/event/King-David-Hotel-bombing' },
      { label: 'UNISPAL — Mandate-era documentation index', url: 'https://www.un.org/unispal/' },
      { label: 'British National Archives — Palestine Mandate records (catalog entry point)', url: 'https://www.nationalarchives.gov.uk/' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica synthesis with bibliography', url: 'https://www.britannica.com/event/King-David-Hotel-bombing' },
    ],
    tier: 'verified',
    casualties: { killed: 91 },
  },
  {
    id: 'coastal-road-massacre-1978',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Coastal Road Massacre (Fatah)',
    date: 'March 11, 1978',
    location: 'Coastal Highway between Haifa and Tel Aviv, Israel',
    summary:
      'Fatah militants who landed from Lebanon hijacked a civilian bus on Israel\'s Coastal Road. Thirty-eight Israeli civilians were killed, including thirteen children, and dozens were wounded. Israel launched Operation Litani into southern Lebanon days later.',
    evidence:
      'Israeli government casualty lists, contemporaneous international press, and Fatah organizational context are multi-source. Documented as a deliberate attack on civilian transport. Distinct from Operation Litani (Israeli military response entry) — this isolates the bus massacre itself.',
    sources: [
      { label: 'Israeli MFA historical summary — Coastal Road massacre', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
      { label: 'Britannica / encyclopedic secondary synthesis (cross-check primary lists)', url: 'https://www.britannica.com/topic/Palestine-Liberation-Organization' },
      { label: 'UN Security Council context — Resolution 425 (Litani aftermath)', url: 'https://digitallibrary.un.org/record/67123' },
    ],
    multimedia: [
      { type: 'document', label: 'UNSC Resolution 425 (post-Litani)', url: 'https://digitallibrary.un.org/record/67123' },
    ],
    tier: 'verified',
    casualties: { killed: 38 },
  },
  {
    id: 'netanya-passover-massacre-2002',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Park Hotel Passover Massacre — Netanya',
    date: 'March 27, 2002',
    location: 'Park Hotel, Netanya, Israel',
    summary:
      'A Hamas suicide bomber detonated inside the Park Hotel dining room during a Passover seder, killing 30 Israeli civilians and wounding about 140. It was among the deadliest single attacks of the Second Intifada and immediately preceded Israel\'s Operation Defensive Shield.',
    evidence:
      'Israeli police and government casualty tallies, contemporaneous international reporting, and Hamas claim of responsibility form a multi-source floor. Distinct from the Operation Defensive Shield campaign entry — this isolates the Netanya hotel attack as a civilian-targeting incident.',
    sources: [
      { label: 'Israeli MFA — Park Hotel / Passover massacre documentation', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
      { label: 'UN / Second Intifada period reporting context', url: 'https://www.un.org/unispal/' },
      { label: 'B\'Tselem — Second Intifada casualty statistics methodology', url: 'https://www.btselem.org/statistics' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem statistics methodology', url: 'https://www.btselem.org/statistics' },
    ],
    tier: 'verified',
    casualties: { killed: 30 },
  },
  {
    id: 'dolphinarium-disco-2001',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Dolphinarium Discotheque Bombing — Tel Aviv',
    date: 'June 1, 2001',
    location: 'Dolphinarium discotheque, Tel Aviv seafront, Israel',
    summary:
      'A Hamas suicide bomber detonated outside a seaside discotheque packed with teenagers, killing 21 people — mostly civilian youth, many recent immigrants from the former Soviet Union — and wounding more than 100. One of the Second Intifada\'s most notorious attacks on children and adolescents.',
    evidence:
      'Israeli casualty lists, multi-outlet international coverage, and Hamas claim of responsibility are multi-source. Targets were overwhelmingly civilian youth at a leisure venue — a clear civilian-targeting case on the Israeli side of the ledger.',
    sources: [
      { label: 'Israeli MFA — Dolphinarium attack documentation', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
      { label: 'UNISPAL — Second Intifada period index', url: 'https://www.un.org/unispal/' },
      { label: 'B\'Tselem — Intifada casualty data', url: 'https://www.btselem.org/statistics' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem statistics', url: 'https://www.btselem.org/statistics' },
    ],
    tier: 'verified',
    casualties: { killed: 21 },
  },
  {
    id: 'gaza-power-plant-2014',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons', 'artillery-use'],
    legalStatus: 'un-finding',
    title: 'Gaza Power Plant Strike — Protective Edge (2014)',
    date: 'July 29, 2014',
    location: 'Gaza Power Plant, Gaza Strip',
    summary:
      'Israeli strikes hit Gaza\'s only power plant during Operation Protective Edge, crippling electricity generation for the entire Strip. The attack accelerated a humanitarian crisis already defined by water, sewage, hospital, and refrigeration failures affecting the civilian population — including children dependent on powered medical and water systems.',
    evidence:
      'OCHA humanitarian snapshots, Amnesty and HRW war reporting, and UN board materials document the plant strike and cascading civilian harm. Distinct from Shuja\'iyya / Rafah Black Friday combat-zone entries — this isolates infrastructure destruction with predictable civilian life-support consequences.',
    sources: [
      { label: 'OCHA — Gaza crisis / 2014 hostilities snapshots', url: 'https://www.ochaopt.org/' },
      { label: 'Amnesty International — 2014 Gaza conflict reporting', url: 'https://www.amnesty.org/en/location/middle-east-and-north-africa/palestine-state-of/' },
      { label: 'OHCHR — COI report on 2014 Gaza conflict', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR COI 2014', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },
  {
    id: 'munich-olympics-1972',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Munich Olympics Massacre (Black September)',
    date: 'September 5–6, 1972',
    location: 'Olympic Village, Munich, West Germany',
    summary:
      'Black September militants took Israeli Olympic athletes hostage; the crisis ended with eleven Israeli athletes and a German police officer dead after a failed rescue at Fürstenfeldbruck airfield. The attack is among the most documented terrorist massacres of the late 20th century and reshaped Israeli overseas security and counterterrorism doctrine.',
    evidence:
      'German investigations, Israeli government casualty lists, IOC records, and multi-decade historiography form a multi-source floor. Included for chronological balance: deliberate targeting of Israeli civilians/athletes by a Palestinian faction — not collective blame of any people.',
    sources: [
      { label: 'Britannica — Munich massacre', url: 'https://www.britannica.com/event/Munich-Massacre' },
      { label: 'Israeli MFA historical materials (index)', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
      { label: 'UNISPAL period documentation index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica Munich massacre', url: 'https://www.britannica.com/event/Munich-Massacre' },
    ],
    tier: 'verified',
    casualties: { killed: 12 },
  },
  {
    id: 'maalot-massacre-1974',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Ma\'alot School Massacre (DFLP)',
    date: 'May 15, 1974',
    location: 'Netiv Meir elementary school, Ma\'alot, Israel',
    summary:
      'Democratic Front for the Liberation of Palestine militants took more than 100 Israeli schoolchildren and teachers hostage. The rescue assault left 25 hostages dead, most of them children. One of the clearest documented attacks deliberately centered on children in the Israeli-Palestinian conflict record.',
    evidence:
      'Israeli casualty lists, contemporaneous international press, and organizational claim of responsibility form multi-source documentation of a school-centered hostage massacre.',
    sources: [
      { label: 'Israeli MFA / historical summaries', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
      { label: 'Britannica conflict chronology context', url: 'https://www.britannica.com/place/Israel' },
      { label: 'B\'Tselem statistics methodology (broader intifada-era data practices)', url: 'https://www.btselem.org/statistics' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli MFA historical materials', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
    ],
    tier: 'verified',
    casualties: { killed: 25 },
  },
  {
    id: 'sabra-shatila-kahan-1983',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'official-commission',
    title: 'Kahan Commission — Sabra and Shatila (Official Israeli Finding)',
    date: 'February 8, 1983',
    location: 'Jerusalem (commission); massacre sites Sabra and Shatila, Beirut',
    summary:
      'Israel\'s official Kahan Commission found that Israeli officials bore indirect responsibility for the September 1982 Phalangist massacre of Palestinian and Lebanese civilians in Sabra and Shatila camps while the IDF controlled the perimeter. Defense Minister Ariel Sharon was found to bear personal responsibility for ignoring the danger of bloodshed; he resigned as defense minister. Distinct from the massacre event entry — this isolates the official Israeli legal-political finding.',
    evidence:
      'The Kahan Commission report is a primary official Israeli state document. It is the authoritative Israeli government attribution of indirect responsibility — essential for evidence-tier labeling of Sabra/Shatila beyond partisan narratives.',
    sources: [
      { label: 'Kahan Commission Report (English text archives / academic mirrors)', url: 'https://www.jewishvirtuallibrary.org/the-kahan-commission-of-inquiry' },
      { label: 'UN documentation of 1982 Beirut massacres context', url: 'https://www.un.org/unispal/' },
      { label: 'Britannica — Sabra and Shatila massacre', url: 'https://www.britannica.com/event/Sabra-and-Shatila-massacre' },
    ],
    multimedia: [
      { type: 'document', label: 'Kahan Commission materials (archived text)', url: 'https://www.jewishvirtuallibrary.org/the-kahan-commission-of-inquiry' },
    ],
    tier: 'verified',
    casualties: { killed: 800 },
  },

  {
    id: 'gaza-great-march-snipers-2018',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'donald-trump'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'un-finding',
    title: 'Great March of Return — Sniper ROE Pattern (UN COI 2018–19)',
    date: 'March 30 – December 2018',
    location: 'Gaza perimeter fence',
    summary:
      'During weekly Gaza perimeter protests, Israeli snipers used live fire under rules of engagement that the UN Commission of Inquiry found produced systematic civilian casualties including medics, journalists, and children. Distinct from the medics-focused entry — this isolates the campaign-level ROE finding.',
    evidence:
      'UN HRC Commission of Inquiry (2019) found reasonable grounds that Israeli snipers intentionally shot civilians in violation of IHL. Israel disputed legal characterizations; casualty scale is multi-source.',
    sources: [
      { label: 'OHCHR — COI on the 2018 Gaza protests', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-opt/index' },
      { label: 'B\'Tselem — Great March of Return', url: 'https://www.btselem.org' },
      { label: 'Amnesty — Gaza protests killings 2018', url: 'https://www.amnesty.org/en/latest/news/2018/04/israel-arms-embargo-needed-as-military-unlawfully-kills-and-maims-gaza-protesters/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'OHCHR COI', url: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-opt/index' },
    ],
    tier: 'verified',
    casualties: { killed: 214 },
  },

  {
    id: 'operation-cast-lead-white-phosphorus-un',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'barack-obama'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons', 'artillery-use'],
    legalStatus: 'un-finding',
    title: 'Cast Lead White Phosphorus in Civilian Areas — UN Fact-Finding (Goldstone era)',
    date: 'December 2008 – January 2009',
    location: 'Gaza Strip urban areas',
    summary:
      'During Operation Cast Lead, UN fact-finding (Goldstone mission and related human-rights documentation) recorded Israeli use of white phosphorus munitions in densely populated civilian areas, producing severe burn injuries and infrastructure fires. Distinct from the generic Cast Lead entry — this isolates the munition-in-urban-area finding chain.',
    evidence:
      'UN Human Rights Council Fact-Finding Mission on the Gaza Conflict (Goldstone Report) and HRW/Amnesty field investigations document white phosphorus use over Gaza City and other populated zones. Israel later said it would restrict such use; the historical record of use is multi-source.',
    sources: [
      { label: 'UNHRC — Goldstone Fact-Finding Mission report', url: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission' },
      { label: 'Human Rights Watch — Rain of Fire (white phosphorus)', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
      { label: 'Amnesty International — Cast Lead findings', url: 'https://www.amnesty.org/en/documents/mde15/015/2009/en/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'HRW Rain of Fire', url: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },
  {
    id: 'world-food-programme-gaza-starvation-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden', 'antony-blinken'],
    relatedMoneyNodeIds: ['hr815', 'annual-mou', 'fmf-weapons'],
    legalStatus: 'un-finding',
    title: 'WFP / IPC Catastrophic Hunger Findings — Gaza (2024)',
    date: '2024',
    location: 'Gaza Strip',
    summary:
      'The Integrated Food Security Phase Classification (IPC) and World Food Programme documented catastrophic hunger (IPC Phase 5) risk and famine conditions in parts of Gaza during the war, attributing the crisis to conflict intensity and constrained aid access. Distinct from generic siege entries — this isolates the formal food-security classification record used by UN agencies.',
    evidence:
      'IPC special briefs and WFP emergency statements are primary technical sources. Israel disputes some characterizations and cites Hamas diversion claims; the multi-agency classification process is the checkable floor for starvation risk documentation.',
    sources: [
      { label: 'IPC — Gaza Strip special briefs', url: 'https://www.ipcinfo.org/' },
      { label: 'WFP — Palestine emergency', url: 'https://www.wfp.org/emergencies/palestine-emergency' },
      { label: 'OCHA — humanitarian updates', url: 'https://www.ochaopt.org/' },
    ],
    multimedia: [
      { type: 'document', label: 'IPC portal', url: 'https://www.ipcinfo.org/' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },
  {
    id: 'nablus-balata-pattern-2002',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Balata / Nablus Urban Assaults — Defensive Shield Era (2002)',
    date: 'April 2002',
    location: 'Balata refugee camp / Nablus, West Bank',
    summary:
      'During Operation Defensive Shield, Israeli forces conducted intense urban operations in Nablus and Balata refugee camp. Human-rights organizations documented significant civilian casualties and home demolitions amid fighting with armed groups. Distinct from the Jenin camp entry — this isolates the Nablus/Balata theater.',
    evidence:
      'B\'Tselem, Amnesty, and contemporaneous UN/press documentation establish civilian harm in Nablus-area operations. Exact combatant/civilian ratios remain contested; the multi-source civilian casualty floor is the dossier claim.',
    sources: [
      { label: 'B\'Tselem — Operation Defensive Shield documentation', url: 'https://www.btselem.org' },
      { label: 'Amnesty International — Defensive Shield findings', url: 'https://www.amnesty.org/en/location/middle-east-and-north-africa/israel-and-occupied-palestinian-territories/' },
      { label: 'UNISPAL — 2002 West Bank operations index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'B\'Tselem archives', url: 'https://www.btselem.org' },
    ],
    tier: 'verified',
    casualties: { killed: 80 },
  },

  {
    id: 'beirut-barracks-1983',
    era: 'occupation-1967-2005',
    targetsCivilians: false,
    targetsChildren: false,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Beirut Marine Barracks Bombing (1983)',
    date: 'October 23, 1983',
    location: 'Beirut, Lebanon',
    summary:
      'Suicide truck bombings destroyed the U.S. Marine barracks and French paratrooper barracks in Beirut, killing 241 U.S. service members and 58 French paratroopers. Attributed to Islamist militants in the Lebanese civil war context with Syrian/Iranian support allegations. Included for regional war chronology balance.',
    evidence:
      'U.S. Department of Defense investigations, French inquiries, and multi-decade historiography establish the attack and death toll. Perpetrator attribution involves multi-source intelligence assessments.',
    sources: [
      { label: 'U.S. Marine Corps history — Beirut barracks', url: 'https://www.usmcu.edu' },
      { label: 'Britannica — 1983 Beirut barracks bombings', url: 'https://www.britannica.com/event/1983-Beirut-barracks-bombings' },
      { label: 'UNISPAL Lebanon period index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica barracks bombings', url: 'https://www.britannica.com/event/1983-Beirut-barracks-bombings' },
    ],
    tier: 'verified',
    casualties: { killed: 299 },
  },
  {
    id: 'operation-peace-for-galilee-1982-invasion',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: '1982 Lebanon Invasion — Opening Campaign Civilian Harm Floor',
    date: 'June 1982',
    location: 'Southern Lebanon / Beirut approaches',
    summary:
      'Israel invaded Lebanon in Operation Peace for Galilee, producing large-scale civilian displacement and casualties documented by UN and human-rights organizations. Distinct from Sabra/Shatila and Kahan entries — this isolates the invasion campaign civilian-harm floor.',
    evidence:
      'UN documentation, Red Cross/ICRC wartime reporting, and multi-source historiography establish mass civilian impact. Combatant/civilian ratios remain contested; the multi-source civilian harm floor is the claim.',
    sources: [
      { label: 'UNISPAL — 1982 Lebanon war documentation', url: 'https://www.un.org/unispal/' },
      { label: 'Britannica — 1982 Lebanon War', url: 'https://www.britannica.com/event/Lebanese-Civil-War' },
      { label: 'ICRC historical materials (Lebanon)', url: 'https://www.icrc.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNISPAL Lebanon index', url: 'https://www.un.org/unispal/' },
    ],
    tier: 'verified',
    casualties: { killed: 10000 },
  },
  {
    id: 'dahiya-doctrine-2006',
    era: 'blockade-2007-2023',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['fmf-weapons', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Dahiya Doctrine — Disproportionate Force Against Civilian Infrastructure (2006+)',
    date: '2006 (articulated) — applied in subsequent campaigns',
    location: 'Dahiya suburb, Beirut / subsequent Gaza applications',
    summary:
      'After the 2006 Lebanon war destruction of Beirut\'s Dahiya suburb, senior IDF officers publicly described a doctrine of disproportionate force against civilian infrastructure supporting hostile non-state actors. Human-rights organizations and UN reporting treat the doctrine as a documented operational concept relevant to later Gaza campaigns.',
    evidence:
      'Public statements by IDF leadership (including Gadi Eisenkot contemporaneous remarks), HRW/Amnesty documentation of infrastructure destruction patterns, and UN fact-finding products on Lebanon 2006 and later Gaza wars. The claim is the public doctrine + multi-source civilian infrastructure harm pattern — not a single strike ID.',
    sources: [
      { label: 'HRW — Why They Died (Lebanon 2006)', url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war' },
      { label: 'UNISPAL — Lebanon 2006 documentation', url: 'https://www.un.org/unispal/' },
      { label: 'Secondary analysis of Dahiya doctrine (institute/academic index)', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'HRW Lebanon 2006 civilian casualties report', url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war' },
    ],
    tier: 'verified',
    casualties: { killed: 1000 },
  },
  {
    id: 'sbarro-restaurant-bombing-2001',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Sbarro Restaurant Suicide Bombing (Jerusalem, 2001)',
    date: 'August 9, 2001',
    location: 'Downtown Jerusalem',
    summary:
      'Hamas suicide bomber detonated inside a crowded Sbarro pizzeria in central Jerusalem during lunch hour, killing 15 people (including 7 children) and wounding about 130. Included for Second Intifada chronology balance alongside Israeli military operations entries.',
    evidence:
      'Israeli government records, contemporaneous international press, and multi-source Second Intifada historiography establish the attack, death toll, and perpetrator attribution to Hamas.',
    sources: [
      { label: 'Israeli MFA historical materials / public record', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
      { label: 'Britannica — Second Intifada context', url: 'https://www.britannica.com/topic/second-intifada' },
      { label: 'UNISPAL period index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica Second Intifada', url: 'https://www.britannica.com/topic/second-intifada' },
    ],
    tier: 'verified',
    casualties: { killed: 15, injured: 130 },
  },
  {
    id: 'operation-defensive-shield-jenin-2002-depth',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: ['fmf-weapons', 'annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Operation Defensive Shield — Jenin Refugee Camp Battle (2002 Depth Entry)',
    date: 'April 2002',
    location: 'Jenin refugee camp, West Bank',
    summary:
      'Israeli military operation inside Jenin refugee camp during Operation Defensive Shield produced dozens of Palestinian deaths and extensive camp destruction. UN fact-finding and multi-source historiography document civilian harm and contested combatant/civilian ratios; this depth entry complements the base Jenin 2002 card with camp-level focus.',
    evidence:
      'UN Secretary-General fact-finding materials, HRW contemporaneous reporting, and multi-source Second Intifada historiography. Claims of a "massacre" at the extreme high end were not sustained by the UN report; civilian deaths and property destruction remain multi-source established.',
    sources: [
      { label: 'UN — Report of the Secretary-General on Jenin (2002)', url: 'https://www.un.org/unispal/' },
      { label: 'HRW — Jenin: IDF Military Operations', url: 'https://www.hrw.org/report/2002/05/02/jenin/idf-military-operations' },
      { label: 'UNISPAL Jenin index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'document', label: 'HRW Jenin 2002 report', url: 'https://www.hrw.org/report/2002/05/02/jenin/idf-military-operations' },
    ],
    tier: 'verified',
    casualties: { killed: 52 },
  },
  {
    id: 'tel-al-sultan-rafah-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['mk84-use', 'fmf-weapons', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Tel al-Sultan Rafah Camp Strike (May 26, 2024)',
    date: 'May 26, 2024',
    location: 'Tel al-Sultan, Rafah, Gaza',
    summary:
      'Israeli airstrike on a displacement camp area in western Rafah killed dozens of Palestinians (multi-source estimates typically 45+) and produced widely circulated fire-and-smoke imagery after a munition ignited tents. Occurs after ICJ May 24 Rafah-related order; Israel stated it targeted two Hamas officials and used a smaller munition.',
    evidence:
      'OHCHR, multi-outlet visual investigations, and hospital/morgue counts establish mass civilian deaths in a designated displacement area. Munition type and intended target remain disputed; the multi-source civilian death floor in a tent camp is the claim.',
    sources: [
      { label: 'OHCHR — Gaza updates (May 2024)', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'AP / multi-outlet visual coverage of Rafah tent fire', url: 'https://apnews.com' },
      { label: 'ICJ Case 192 context (Rafah order May 24)', url: 'https://www.icj-cij.org/case/192' },
    ],
    multimedia: [
      { type: 'photo-essay', label: 'AP Rafah tent camp coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 45 },
  },
  {
    id: 'october-7-nova-festival-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Nova Music Festival Massacre (October 7, 2023)',
    date: 'October 7, 2023',
    location: 'Near Re\'im, southern Israel',
    summary:
      'Hamas and other militants attacked the Nova music festival near the Gaza border on October 7, killing hundreds of mostly young civilians and taking hostages. This depth entry isolates the festival massacre from the broader October 7 multi-site attack card for chronology and civilian-targeting documentation.',
    evidence:
      'Israeli government casualty lists, multi-source forensic reporting, hostage releases, and international press establish the festival as a primary civilian massacre site within the October 7 attacks. Death toll estimates for the festival alone are typically 360+ in multi-source reporting.',
    sources: [
      { label: 'Israeli government October 7 public record', url: 'https://www.gov.il' },
      { label: 'Britannica — October 7 attacks', url: 'https://www.britannica.com/event/October-7-attacks' },
      { label: 'UN reporting on October 7 hostages/civilians', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica October 7 attacks', url: 'https://www.britannica.com/event/October-7-attacks' },
    ],
    tier: 'verified',
    casualties: { killed: 360 },
  },
  {
    id: 'kibbutz-beeri-october-7-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Kibbutz Be\'eri Massacre (October 7, 2023)',
    date: 'October 7, 2023',
    location: 'Kibbutz Be\'eri, southern Israel',
    summary:
      'Militants overran Kibbutz Be\'eri on October 7, killing more than 100 residents and taking hostages in one of the deadliest single-community massacres of the attack. Depth entry isolates Be\'eri from the multi-site October 7 card for civilian-harm documentation and chronology balance.',
    evidence:
      'Israeli government community casualty lists, multi-source forensic and survivor reporting, and international press establish Be\'eri as a primary civilian massacre site. Exact community totals vary slightly by source; multi-source floor exceeds 100 killed.',
    sources: [
      { label: 'Israeli government October 7 public record', url: 'https://www.gov.il' },
      { label: 'Britannica — October 7 attacks', url: 'https://www.britannica.com/event/October-7-attacks' },
      { label: 'UN / multi-source October 7 documentation', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica October 7 attacks', url: 'https://www.britannica.com/event/October-7-attacks' },
    ],
    tier: 'verified',
    casualties: { killed: 100 },
  },
  {
    id: 'kfar-aza-october-7-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Kfar Aza Massacre (October 7, 2023)',
    date: 'October 7, 2023',
    location: 'Kfar Aza, southern Israel',
    summary:
      'Militants overran Kibbutz Kfar Aza on October 7, killing dozens of civilians and taking hostages. Multi-source reporting documented bodies in homes and streets; depth entry isolates Kfar Aza from the multi-site October 7 card for community-level civilian-harm documentation.',
    evidence:
      'Israeli government community casualty lists, forensic reporting, and international press establish Kfar Aza as a primary civilian massacre site. Multi-source community death floor is typically reported in the 50–70 range.',
    sources: [
      { label: 'Israeli government October 7 public record', url: 'https://www.gov.il' },
      { label: 'Britannica — October 7 attacks', url: 'https://www.britannica.com/event/October-7-attacks' },
      { label: 'UN / multi-source October 7 documentation', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Britannica October 7 attacks', url: 'https://www.britannica.com/event/October-7-attacks' },
    ],
    tier: 'verified',
    casualties: { killed: 62 },
  },
  {
    id: 'taba-hilton-bombing-2004',
    era: 'occupation-1967-2005',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: [],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Taba Hilton Bombing (2004)',
    date: 'October 7, 2004',
    location: 'Taba, Egypt (Sinai / Israel border tourism zone)',
    summary:
      'Suicide car bomb at the Taba Hilton killed dozens of mostly Israeli tourists and wounded more. Included for regional terrorism chronology balance alongside occupation-era military-operation entries of the same decade.',
    evidence:
      'Egyptian investigations, multi-source press, and Israeli casualty reporting establish the attack and death toll. Perpetrator attribution involves Sinai-based jihadist networks in multi-source accounts.',
    sources: [
      { label: 'Britannica / contemporaneous multi-source press index', url: 'https://www.britannica.com' },
      { label: 'UNISPAL period materials', url: 'https://www.un.org/unispal/' },
      { label: 'Israeli MFA historical materials', url: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs' },
    ],
    multimedia: [
      { type: 'document', label: 'UNISPAL period index', url: 'https://www.un.org/unispal/' },
    ],
    tier: 'verified',
    casualties: { killed: 34 },
  },

  {
    id: 'gaza-us-aid-pier-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['joe-biden', 'antony-blinken'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'U.S. Gaza Humanitarian Pier Failure (2024)',
    date: 'May–July 2024',
    location: 'Gaza Mediterranean coast',
    summary:
      'The U.S.-built temporary Gaza humanitarian pier delivered limited aid tonnage relative to need before storm damage, security incidents, and operational failures forced repeated suspensions. Multi-source reporting documents the gap between announced capacity and actual sustained deliveries during peak famine risk.',
    evidence:
      'DoD/CENTCOM public briefings, GAO-style oversight reporting in press, and multi-outlet investigations establish low realized throughput versus announced goals. The claim is operational failure of a high-visibility aid-delivery mechanism — not a kinetic massacre card.',
    sources: [
      { label: 'DoD / CENTCOM pier briefings (public record)', url: 'https://www.defense.gov' },
      { label: 'Multi-outlet pier throughput investigations', url: 'https://apnews.com' },
      { label: 'UN aid access reporting context', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'DoD public materials', url: 'https://www.defense.gov' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'lebanon-pager-explosions-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Lebanon Pager/Walkie-Talkie Explosions (Sept 2024)',
    date: 'September 17–18, 2024',
    location: 'Lebanon (multiple sites)',
    summary:
      'Coordinated explosions of pagers and walkie-talkies used by Hezbollah networks killed dozens and wounded thousands across Lebanon, including civilians and children per multi-source hospital reporting. Widely attributed to Israeli intelligence operations; Israel did not formally claim responsibility in the immediate public record.',
    evidence:
      'Multi-source Lebanese health ministry casualty figures, international press field reporting, and subsequent investigative accounts establish mass simultaneous device detonations and mixed combatant/civilian harm. Attribution is multi-source intelligence consensus; formal claim remains limited in open official statements.',
    sources: [
      { label: 'Multi-outlet field reporting (AP/Reuters/BBC index)', url: 'https://apnews.com' },
      { label: 'OHCHR / UN Lebanon materials', url: 'https://www.ohchr.org' },
      { label: 'UNISPAL Lebanon period index', url: 'https://www.un.org/unispal/' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet pager attack coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 37, injured: 3000 },
  },

  {
    id: 'nasrallah-beirut-strike-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['fmf-weapons', 'f35-fleet'],
    legalStatus: 'multi-source-investigation',
    title: 'Beirut Dahieh Strike Killing Hassan Nasrallah (Sept 2024)',
    date: 'September 27, 2024',
    location: 'Dahieh / southern Beirut suburbs, Lebanon',
    summary:
      'Israeli airstrikes on Hezbollah headquarters infrastructure in Beirut\'s southern suburbs killed Hezbollah leader Hassan Nasrallah and others; multi-source reporting also documents substantial civilian casualties and building collapses in dense urban Dahieh. Depth entry for the leadership strike + civilian-harm floor in a designated urban district.',
    evidence:
      'Israeli government confirmation of the Nasrallah strike, multi-source Lebanese casualty reporting, and international press establish both the leadership target and civilian harm in the surrounding urban fabric. Exact civilian counts remain multi-source and contested at the margins.',
    sources: [
      { label: 'Multi-outlet Beirut strike reporting', url: 'https://apnews.com' },
      { label: 'UNISPAL / OHCHR Lebanon materials', url: 'https://www.ohchr.org' },
      { label: 'Israeli government public statements (target claim)', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'photo-essay', label: 'Multi-outlet Dahieh aftermath coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 100 },
  },

  {
    id: 'iran-missile-barrage-april-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['iron-dome', 'iron-beam-laser-2024', 'annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Iran Missile/Drone Barrage on Israel (April 13–14, 2024)',
    date: 'April 13–14, 2024',
    location: 'Israel (multi-site air defense intercepts)',
    summary:
      'Iran launched a large-scale drone and missile barrage toward Israel in response to the Damascus consulate strike, with the overwhelming majority of projectiles intercepted by Israeli and allied defenses including U.S. assets. Multi-source reporting documents limited ground impacts and casualties; included for regional war chronology and Iron Dome / U.S. defense enablement context.',
    evidence:
      'IDF/US CENTCOM public intercept tallies, multi-source international press, and satellite/OSINT tracking establish the scale of the barrage and high intercept rates. Civilian casualty floor is low relative to launch volume due to interception.',
    sources: [
      { label: 'IDF / Israeli government public statements', url: 'https://www.gov.il' },
      { label: 'U.S. DoD / CENTCOM statements on intercept support', url: 'https://www.defense.gov' },
      { label: 'Multi-outlet April 2024 barrage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'DoD public materials', url: 'https://www.defense.gov' },
    ],
    tier: 'verified',
    casualties: { killed: 1 },
  },

  {
    id: 'damascus-iranian-consulate-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['fmf-weapons', 'f35-fleet'],
    legalStatus: 'multi-source-investigation',
    title: 'Damascus Iranian Consular Annex Strike (April 1, 2024)',
    date: 'April 1, 2024',
    location: 'Damascus, Syria',
    summary:
      'An airstrike destroyed a building adjacent to/associated with the Iranian consular compound in Damascus, killing senior IRGC officers and others. Iran characterized it as an attack on diplomatic premises; Israel did not formally claim responsibility in initial public statements. The strike is the proximate trigger cited for Iran\'s April 13–14 barrage.',
    evidence:
      'Multi-source reporting, satellite imagery of the destroyed building, IRGC funeral statements, and subsequent Iranian/Israeli public diplomacy establish the strike, deaths of senior officers, and the causal link asserted by Iran for the April barrage. Diplomatic-premises legal characterization remains contested.',
    sources: [
      { label: 'Multi-outlet Damascus strike reporting', url: 'https://apnews.com' },
      { label: 'UN materials on Syria period violence', url: 'https://www.un.org' },
      { label: 'Iranian / Israeli public statements (competing characterizations)', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'Multi-outlet coverage index', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 16 },
  },

  {
    id: 'houthi-red-sea-campaign-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['joe-biden', 'donald-trump', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['fmf-weapons', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Houthi Red Sea Shipping Attacks (2023–2025)',
    date: 'October 2023 – 2025',
    location: 'Red Sea / Bab el-Mandeb approaches',
    summary:
      'Yemen\'s Houthi movement attacked commercial shipping and military vessels in the Red Sea corridor, citing solidarity with Gaza. Multi-source reporting documents vessel hits, crew casualties, trade disruption, and a U.S.-led military response (Operation Prosperity Guardian / subsequent strikes). Included for regional war chronology linked to the Gaza war.',
    evidence:
      'IMO/shipping industry incident tallies, multi-outlet maritime reporting, and U.S./UK military statements establish the campaign\'s scale and the coalition military response. Casualty and economic-impact figures remain multi-source.',
    sources: [
      { label: 'U.S. DoD / CENTCOM Red Sea statements', url: 'https://www.defense.gov' },
      { label: 'Multi-outlet Red Sea shipping attack coverage', url: 'https://apnews.com' },
      { label: 'UN materials on Yemen / Red Sea security', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'DoD public materials', url: 'https://www.defense.gov' },
    ],
    tier: 'verified',
    casualties: { killed: 10 },
  },

  {
    id: 'gaza-ground-invasion-oct-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['fmf-weapons', 'mk84-use', 'oct7-emergency-arms-surge', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Ground Invasion Opening Campaign (Oct–Nov 2023)',
    date: 'October 27, 2023 onward',
    location: 'Northern Gaza Strip',
    summary:
      'Israel launched a large-scale ground invasion of Gaza following the October 7 attacks and initial air campaign. Multi-source UN and humanitarian reporting documents mass displacement, high civilian casualties, and infrastructure destruction in the opening weeks — distinct from later southern/Rafah phases already carded.',
    evidence:
      'UN OCHA displacement tallies, multi-source fatality reporting, and contemporaneous press establish the invasion timeline and civilian-harm floor for the northern opening phase. Combatant/civilian ratios remain contested; multi-source civilian harm and displacement are the claim.',
    sources: [
      { label: 'UN OCHA Gaza updates (Oct–Nov 2023)', url: 'https://www.ochaopt.org' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet ground invasion coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 10000 },
  },

  {
    id: 'israel-lebanon-ground-offensive-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['fmf-weapons', 'artillery-use', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Israel–Hezbollah Ground Offensive in Southern Lebanon (Sept–Oct 2024)',
    date: 'September–October 2024',
    location: 'Southern Lebanon',
    summary:
      'Following the pager explosions and Nasrallah strike, Israel launched ground operations into southern Lebanon against Hezbollah infrastructure. Multi-source UN and Lebanese reporting documents large-scale displacement of Lebanese civilians and substantial civilian casualties alongside combatant targets.',
    evidence:
      'UNHCR/IOM displacement figures, Lebanese health ministry multi-source casualty reporting, and international press establish mass civilian displacement and harm. Combatant/civilian ratios remain contested; multi-source civilian displacement and casualty floors are the claim.',
    sources: [
      { label: 'UNHCR / UN Lebanon materials', url: 'https://www.unhcr.org' },
      { label: 'OHCHR Lebanon materials', url: 'https://www.ohchr.org' },
      { label: 'Multi-outlet southern Lebanon offensive coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UN public materials', url: 'https://www.un.org' },
    ],
    tier: 'verified',
    casualties: { killed: 1000 },
  },

  {
    id: 'gaza-evacuation-orders-pattern-2023-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['fmf-weapons', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Mass Evacuation Orders Pattern (2023–2024)',
    date: 'October 2023 – 2024',
    location: 'Gaza Strip (north-to-south displacement corridor)',
    summary:
      'Israeli military issued repeated mass evacuation orders covering large portions of Gaza\'s population, producing multi-source documented displacement of over a million people into shrinking \'safe\' zones that were subsequently struck (including al-Mawasi and Rafah cards). This pattern card isolates the displacement architecture as a continuous enablement of civilian-harm outcomes.',
    evidence:
      'IDF evacuation maps/leaflets, UN OCHA displacement tallies exceeding 1.5M, and multi-source reporting that designated safe corridors and zones experienced lethal strikes. The claim is the multi-source mass-displacement pattern, not any single order.',
    sources: [
      { label: 'UN OCHA displacement reporting', url: 'https://www.ochaopt.org' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet evacuation-order coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-journalists-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['fmf-weapons', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Journalists Killed — Highest Conflict Toll Pattern (2023–2025)',
    date: 'October 2023 – 2025',
    location: 'Gaza Strip',
    summary:
      'Multi-source press-freedom monitors document the highest journalist death toll of any recent conflict in Gaza, with CPJ and other monitors tracking 100+ media workers killed. Israel states many were combatants or collateral; press-freedom organizations document a pattern of high risk to clearly identified media workers. Pattern card for the journalist-killing floor across the war.',
    evidence:
      'Committee to Protect Journalists, RSF, and multi-source local media tallies establish elevated journalist fatalities. Individual cases (e.g., Shireen Abu Akleh earlier card) and wartime Gaza tallies are multi-source; combatant allegations remain contested case-by-case.',
    sources: [
      { label: 'Committee to Protect Journalists — Gaza', url: 'https://cpj.org' },
      { label: 'RSF / multi-outlet press freedom reporting', url: 'https://rsf.org' },
      { label: 'OHCHR media worker materials', url: 'https://www.ohchr.org' },
    ],
    multimedia: [
      { type: 'document', label: 'CPJ public tracking', url: 'https://cpj.org' },
    ],
    tier: 'verified',
    casualties: { killed: 100 },
  },

  {
    id: 'oct7-hostages-held-pattern',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Hostages Held in Gaza (2023–2025 Pattern)',
    date: 'October 7, 2023 – ongoing releases/deaths',
    location: 'Gaza Strip (captivity sites)',
    summary:
      'Hamas and other groups took approximately 250 hostages on October 7, including civilians, children, elderly, and foreign nationals. Multi-source reporting documents subsequent releases via deals, military rescues, and deaths in captivity. Pattern card for the hostage crisis as a continuous civilian-targeting crime across the war timeline.',
    evidence:
      'Israeli government hostage lists, multi-source international press, Red Cross/ICRC access disputes, and negotiated release deals establish the scale of abduction and ongoing captivity. Exact remaining counts change with releases and confirmed deaths.',
    sources: [
      { label: 'Israeli government hostage public record', url: 'https://www.gov.il' },
      { label: 'ICRC statements on hostages/detainees', url: 'https://www.icrc.org' },
      { label: 'Multi-outlet hostage crisis coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'ICRC public materials', url: 'https://www.icrc.org' },
    ],
    tier: 'verified',
    casualties: { killed: 30 },
  },

  {
    id: 'west-bank-settlement-surge-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['annual-mou', 'pro-israel-lobby-2024'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settlement Expansion Surge (2023–2025)',
    date: '2023–2025',
    location: 'West Bank / East Jerusalem',
    summary:
      'Multi-source Peace Now, UN, and Israeli government data document accelerated settlement unit approvals, outpost legalization tracks, and settler violence spikes during and after October 7. Distinct from the longer-run settlement-enterprise pattern card — this isolates the post–Oct 7 surge window.',
    evidence:
      'Peace Now settlement watch tallies, UN OCHA settler-violence incident counts, and multi-source reporting on cabinet legalization decisions establish the surge. Settlement legality under international law remains governed by UNSC 2334 and ICJ advisory opinions already carded.',
    sources: [
      { label: 'Peace Now settlement reports', url: 'https://peacenow.org.il' },
      { label: 'UN OCHA settler violence updates', url: 'https://www.ochaopt.org' },
      { label: 'UNSC 2334 / ICJ occupation opinion context', url: 'https://digitallibrary.un.org/record/853516' },
    ],
    multimedia: [
      { type: 'document', label: 'UN OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden', 'donald-trump'],
    relatedMoneyNodeIds: ['mk84-use', 'fmf-weapons', 'oct7-emergency-arms-surge', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Children Killed — Multi-Source Wartime Floor (2023–2025)',
    date: 'October 2023 – December 2025 (age-disaggregated wartime floor)',
    location: 'Gaza Strip (children cohort)',
    summary:
      'Gaza Health Ministry and multi-source UN-referenced tallies document children as a large share of Palestinian fatalities in the Gaza war — tens of thousands of child deaths in the multi-source public-record floor used across humanitarian reporting. Pattern card for the children-killed wartime floor, distinct from individual incident cards.',
    evidence:
      'Gaza Health Ministry age-disaggregated fatality series, UNICEF/UN statements, and multi-source humanitarian reporting establish elevated child fatalities. Exact totals evolve; the multi-source floor of tens of thousands of children killed is the claim. Combatant-age disputes do not erase the child-fatality magnitude documented across independent monitors.',
    sources: [
      { label: 'UNICEF / UN child protection statements', url: 'https://www.unicef.org' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet child casualty reporting', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public materials', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 15000 },
  },

  {
    id: 'gaza-aid-workers-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['fmf-weapons', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Aid Workers Killed — Multi-Source Wartime Floor (2023–2025)',
    date: 'October 2023 – 2025 (aid-worker cohort)',
    location: 'Gaza Strip (humanitarian operations)',
    summary:
      'UN agencies and humanitarian NGOs document the highest aid-worker death toll of recent conflicts in Gaza, including UNRWA staff, WCK convoy deaths (separate card), Red Crescent paramedics, and other NGO personnel. Pattern card for the aid-worker killing floor across the war.',
    evidence:
      'UNRWA staff fatality statements, multi-source NGO tallies, and OHCHR reporting establish elevated aid-worker deaths. Individual incidents (WCK, Rafah paramedic convoy) are multi-source; the aggregate floor is the claim of this pattern card.',
    sources: [
      { label: 'UNRWA public statements', url: 'https://www.unrwa.org' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet aid-worker casualty reporting', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA public materials', url: 'https://www.unrwa.org' },
    ],
    tier: 'verified',
    casualties: { killed: 200 },
  },

  {
    id: 'west-bank-mass-arrests-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Mass Arrests & Administrative Detention Surge (2023–2025)',
    date: 'October 2023 – 2025 (detention surge window)',
    location: 'West Bank / Israeli detention facilities',
    summary:
      'Multi-source B\'Tselem, Addameer, and UN reporting document a sharp post–October 7 surge in West Bank arrests and administrative detention without charge or trial, including children. Pattern card for the detention-surge floor concurrent with Gaza operations.',
    evidence:
      'Israeli Prison Service and multi-source NGO detainee counts, UN reporting on administrative detention, and multi-outlet coverage establish elevated detention numbers. Exact counts fluctuate; the multi-source surge is the claim.',
    sources: [
      { label: "B'Tselem detention statistics", url: 'https://www.btselem.org' },
      { label: 'UN materials on detention / OPT', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet West Bank arrest coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: "B'Tselem public materials", url: 'https://www.btselem.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'hostage-prisoner-exchange-nov-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Hostage–Prisoner Exchange Pause (November 2023)',
    date: 'November 24–30, 2023',
    location: 'Gaza / Israel / Egypt mediation corridor',
    summary:
      'A temporary humanitarian pause enabled multi-source documented exchanges of Israeli hostages for Palestinian prisoners, with hundreds released on both sides. Pattern/event card for the first major exchange architecture, distinct from the ongoing hostages-held pattern card.',
    evidence:
      'Israeli government and Palestinian Authority release lists, multi-outlet reporting, and mediation public statements establish the scale of the November 2023 exchange and pause. Subsequent deals are separate events.',
    sources: [
      { label: 'Israeli government hostage release public record', url: 'https://www.gov.il' },
      { label: 'Multi-outlet November 2023 ceasefire/exchange coverage', url: 'https://apnews.com' },
      { label: 'UN humanitarian pause materials', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Multi-outlet exchange coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-health-system-collapse-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['fmf-weapons', 'oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Health System Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (health-system cohort)',
    location: 'Gaza Strip hospitals and clinics',
    summary:
      'WHO, Ministry of Health, and multi-source reporting document systematic degradation of Gaza\'s hospital network — bed capacity loss, fuel/medicine shortages, and attacks on medical facilities (including Al-Shifa card). Pattern card for health-system collapse as a civilian-harm multiplier.',
    evidence:
      'WHO emergency health updates, multi-source hospital functionality tallies, and OHCHR medical-facility incident reporting establish widespread loss of functional hospitals. Exact functional-hospital counts evolve; the multi-source collapse pattern is the claim.',
    sources: [
      { label: 'WHO emergency health updates — OPT', url: 'https://www.who.int' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet hospital collapse coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public materials', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-education-system-destroyed-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['mk84-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Education System Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (education cohort)',
    location: 'Gaza Strip schools and universities',
    summary:
      'UNESCO, UNICEF, and multi-source reporting document destruction or severe damage to the large majority of Gaza schools and all universities (universities card exists). Pattern card for education-system destruction as a children-targeting structural outcome of the war.',
    evidence:
      'UNESCO/UNICEF school damage tallies, multi-source satellite and field reporting, and Ministry of Education statements establish mass school destruction. Exact percentages evolve; multi-source near-total university destruction and majority school damage is the claim.',
    sources: [
      { label: 'UNESCO education damage materials', url: 'https://www.unesco.org' },
      { label: 'UNICEF OPT education statements', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet school destruction coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNESCO public materials', url: 'https://www.unesco.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-cultural-heritage-destruction-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['mk84-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Cultural Heritage Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (heritage cohort)',
    location: 'Gaza Strip (mosques, churches, museums, historic sites)',
    summary:
      'UNESCO and multi-source cultural-heritage monitors document destruction or severe damage to mosques, churches, museums, and historic sites across Gaza. Pattern card for cultural-heritage loss concurrent with the war, complementary to education and health system collapse cards.',
    evidence:
      'UNESCO preliminary damage assessments, multi-source satellite and field reporting, and religious-authority tallies establish widespread heritage loss. Exact site counts evolve; multi-source mass destruction is the claim.',
    sources: [
      { label: 'UNESCO cultural heritage materials — Gaza', url: 'https://www.unesco.org' },
      { label: 'Multi-outlet heritage destruction coverage', url: 'https://apnews.com' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
    ],
    multimedia: [
      { type: 'document', label: 'UNESCO public materials', url: 'https://www.unesco.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-amputations-children-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Child Amputations — Multi-Source Medical Floor (2023–2025)',
    date: 'October 2023 – 2025 (amputation cohort)',
    location: 'Gaza Strip hospitals',
    summary:
      'UNICEF, WHO, and multi-source medical reporting document large numbers of children undergoing amputations in Gaza due to blast injuries and lack of reconstructive capacity under health-system collapse. Pattern card for the child-amputation medical floor of the war.',
    evidence:
      'UNICEF/WHO statements, multi-source field medical reporting, and hospital case series establish elevated pediatric amputations. Exact counts are incomplete under collapsed reporting systems; multi-source magnitude is the claim.',
    sources: [
      { label: 'UNICEF OPT medical statements', url: 'https://www.unicef.org' },
      { label: 'WHO emergency health updates', url: 'https://www.who.int' },
      { label: 'Multi-outlet pediatric injury coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public materials', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0, injured: 1000 },
  },

  {
    id: 'gaza-starvation-ipc-phases-2024-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden', 'antony-blinken'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza IPC Famine Phases — Multi-Source Food Security Floor (2024–2025)',
    date: 'March 2024 – 2025 (IPC assessment windows)',
    location: 'Gaza Strip (IPC analysis units)',
    summary:
      'Integrated Food Security Phase Classification (IPC) multi-partner assessments documented catastrophic food insecurity and famine-risk phases across Gaza governorates during 2024–2025. Distinct from the WFP starvation card — this isolates the IPC phase methodology floor used by UN agencies and donors.',
    evidence:
      'IPC partnership reports (FAO/WFP/UNICEF and technical partners), multi-source nutritional surveys, and UN humanitarian appeals establish phase classifications. Exact phase boundaries are contested by parties; multi-source IPC catastrophic-phase findings are the claim.',
    sources: [
      { label: 'IPC partnership public reports', url: 'https://www.ipcinfo.org' },
      { label: 'WFP Gaza emergency materials', url: 'https://www.wfp.org' },
      { label: 'UN OCHA food security updates', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'IPC public materials', url: 'https://www.ipcinfo.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-disabled-elderly-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Disabled & Elderly Civilian Harm Pattern (2023–2025)',
    date: 'October 2023 – 2025 (vulnerable-cohort window)',
    location: 'Gaza Strip',
    summary:
      'Human Rights Watch, Amnesty, UN disability rapporteurs, and multi-source reporting document disproportionate barriers and lethal risk for persons with disabilities and elderly civilians during mass displacement and bombardment — including inability to evacuate and loss of assistive devices/care. Pattern card for vulnerable-cohort civilian harm.',
    evidence:
      'HRW/Amnesty disability-in-conflict reports, UN special procedures statements, and multi-source field reporting establish elevated vulnerability and documented deaths among disabled and elderly. Exact cohort tallies are incomplete; multi-source pattern evidence is the claim.',
    sources: [
      { label: 'HRW disability/conflict materials — Gaza', url: 'https://www.hrw.org' },
      { label: 'OHCHR special procedures / OPT materials', url: 'https://www.ohchr.org' },
      { label: 'Multi-outlet vulnerable-civilian coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'HRW public materials', url: 'https://www.hrw.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-mental-health-trauma-children-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Child Mental Health Trauma Pattern (2023–2025)',
    date: 'October 2023 – 2025 (psychosocial cohort)',
    location: 'Gaza Strip',
    summary:
      'UNICEF, Save the Children, and multi-source psychosocial assessments document mass traumatic stress, grief, and developmental harm among Gaza children under continuous bombardment and displacement. Pattern card for the mental-health civilian-harm floor, distinct from physical casualty cards.',
    evidence:
      'UNICEF/Save the Children field assessments, multi-source clinical reporting, and academic/NGO mental-health surveys establish elevated trauma indicators among children. Exact clinical prevalence is incomplete; multi-source mass-trauma pattern is the claim.',
    sources: [
      { label: 'UNICEF psychosocial materials — Gaza', url: 'https://www.unicef.org' },
      { label: 'Save the Children public reports', url: 'https://www.savethechildren.org' },
      { label: 'Multi-outlet child trauma coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public materials', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0, injured: 0 },
  },

  {
    id: 'gaza-water-sanitation-collapse-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Water & Sanitation Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (WASH cohort)',
    location: 'Gaza Strip',
    summary:
      'UNICEF, WHO, and multi-source WASH reporting document collapse of clean water access, sewage treatment, and desalination capacity under bombardment, fuel cuts, and siege conditions — a civilian-harm multiplier driving disease risk especially for children. Pattern card for water/sanitation system destruction.',
    evidence:
      'UNICEF/WHO WASH updates, multi-source desalination/plant damage reporting, and OCHA humanitarian snapshots establish multi-source collapse of water and sanitation services. Exact liters-per-capita figures evolve; multi-source system collapse is the claim.',
    sources: [
      { label: 'UNICEF WASH materials — Gaza', url: 'https://www.unicef.org' },
      { label: 'WHO emergency health / WASH updates', url: 'https://www.who.int' },
      { label: 'OCHA humanitarian snapshots', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public materials', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-housing-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use', 'jdam-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Housing Stock Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (housing cohort)',
    location: 'Gaza Strip residential areas',
    summary:
      'UN satellite assessments, World Bank, and multi-source damage analyses document destruction or severe damage to a large majority of Gaza housing units — a structural civilian-harm outcome producing mass homelessness concurrent with displacement orders. Pattern card for residential housing destruction at scale.',
    evidence:
      'UNOSAT/UN satellite damage assessments, World Bank/EU rapid damage estimates, and multi-source field reporting establish multi-source majority-housing damage. Exact unit percentages evolve; multi-source mass residential destruction is the claim.',
    sources: [
      { label: 'UNOSAT / UN satellite damage materials', url: 'https://unosat.org' },
      { label: 'World Bank / multi-partner damage assessments', url: 'https://www.worldbank.org' },
      { label: 'OCHA shelter/displacement updates', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNOSAT public materials', url: 'https://unosat.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-orphan-crisis-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Orphan Crisis Pattern (2023–2025)',
    date: 'October 2023 – 2025 (orphanhood cohort)',
    location: 'Gaza Strip',
    summary:
      'UNICEF and multi-source humanitarian reporting document a large population of children orphaned or separated from caregivers during the Gaza war — a structural civilian-harm outcome of mass adult fatalities and displacement. Pattern card for the orphanhood floor.',
    evidence:
      'UNICEF statements on unaccompanied and orphaned children, multi-source field NGO reporting, and Ministry of Social Development tallies establish elevated orphanhood. Exact counts are incomplete; multi-source magnitude is the claim.',
    sources: [
      { label: 'UNICEF OPT child protection materials', url: 'https://www.unicef.org' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet orphan crisis coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public materials', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-women-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['mk84-use', 'artillery-use', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Women Killed — Multi-Source Wartime Floor (2023–2025)',
    date: 'October 2023 – 2025 (women cohort)',
    location: 'Gaza Strip',
    summary:
      'UN Women, OHCHR, and multi-source reporting document women as a large share of Palestinian civilian fatalities in the Gaza war. Pattern card for the women-killed wartime floor, complementary to children and elderly/disabled cohort cards.',
    evidence:
      'UN Women statements, multi-source sex-disaggregated fatality reporting, and OHCHR materials establish elevated female civilian deaths. Exact totals evolve; multi-source magnitude is the claim.',
    sources: [
      { label: 'UN Women public statements — Gaza', url: 'https://www.unwomen.org' },
      { label: 'OHCHR OPT materials', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'Multi-outlet sex-disaggregated casualty coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UN Women public materials', url: 'https://www.unwomen.org' },
    ],
    tier: 'verified',
    casualties: { killed: 10000 },
  },

  {
    id: 'gaza-pregnant-maternal-harm-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Pregnant Women & Maternal Harm Pattern (2023–2025)',
    date: 'October 2023 – 2025 (maternal cohort)',
    location: 'Gaza Strip',
    summary:
      'UNFPA, UNICEF, and multi-source medical reporting document catastrophic conditions for pregnant women — C-sections without anesthesia, neonatal deaths, and loss of maternal care capacity under health-system collapse. Pattern card for maternal/neonatal harm as a children+women cohort outcome.',
    evidence:
      'UNFPA emergency reproductive-health updates, multi-source hospital reporting, and WHO maternal/newborn materials establish multi-source maternal system collapse. Exact case counts are incomplete; multi-source pattern magnitude is the claim.',
    sources: [
      { label: 'UNFPA Gaza reproductive health materials', url: 'https://www.unfpa.org' },
      { label: 'UNICEF neonatal/maternal materials', url: 'https://www.unicef.org' },
      { label: 'WHO emergency health updates', url: 'https://www.who.int' },
    ],
    multimedia: [
      { type: 'document', label: 'UNFPA public materials', url: 'https://www.unfpa.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-reconstruction-cost-pattern-2024-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden', 'donald-trump'],
    relatedMoneyNodeIds: ['mk84-use', 'fmf-weapons', 'oct7-emergency-arms-surge', 'us-munitions-industrial-base'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Reconstruction Cost Floor — Multi-Source Damage Tallies (2024–2025)',
    date: '2024–2025 (damage assessment windows)',
    location: 'Gaza Strip',
    summary:
      'World Bank, UN, and multi-partner rapid damage assessments document multi-decade reconstruction cost floors in the tens of billions of dollars for housing, infrastructure, and public services destroyed during the Gaza war. Pattern card for the economic civilian-harm ledger.',
    evidence:
      'World Bank/UN/EU joint damage and needs assessments, multi-source satellite damage analyses, and humanitarian recovery appeals establish multi-source multi-decade cost floors. Exact dollar figures evolve with assessment updates; multi-source tens-of-billions floor is the claim.',
    sources: [
      { label: 'World Bank damage and needs assessments', url: 'https://www.worldbank.org' },
      { label: 'UN recovery/reconstruction materials', url: 'https://www.un.org' },
      { label: 'Multi-outlet reconstruction cost coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'World Bank public materials', url: 'https://www.worldbank.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-unrwa-ban-pattern-2024-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden', 'donald-trump'],
    relatedMoneyNodeIds: ['annual-mou', 'pro-israel-lobby-2024'],
    legalStatus: 'multi-source-investigation',
    title: 'UNRWA Ban & Funding Suspension Pattern (2024–2025)',
    date: 'January 2024 – 2025',
    location: 'Gaza / West Bank / donor capitals',
    summary:
      'Following Israeli allegations against a subset of UNRWA staff, multiple donor governments suspended funding and Israel advanced legislation/policy restricting UNRWA operations. Multi-source UN and humanitarian reporting documents the aid-capacity impact on a population dependent on UNRWA services. Pattern card for the UNRWA political-financial crisis concurrent with wartime aid needs.',
    evidence:
      'UNRWA Commissioner-General statements, multi-source donor suspension announcements, Knesset legislative tracking, and OCHA aid-capacity reporting establish multi-source operational impact. Staff allegation investigations are multi-source and ongoing; the claim is the multi-source aid-capacity disruption pattern.',
    sources: [
      { label: 'UNRWA public statements', url: 'https://www.unrwa.org' },
      { label: 'UN OCHA aid capacity materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet UNRWA funding coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA public materials', url: 'https://www.unrwa.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-fuel-electricity-siege-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Fuel & Electricity Siege Pattern (2023–2025)',
    date: 'October 9, 2023 – 2025 (energy siege window)',
    location: 'Gaza Strip',
    summary:
      'Israeli complete-siege announcements and multi-source utility reporting document severe cuts to fuel and electricity essential for hospitals, water desalination, sewage, and bakeries. Pattern card for energy siege as a civilian-harm multiplier enabling health/WASH collapse cards.',
    evidence:
      'Gallant siege announcement (public record), multi-source IEC/Gaza utility outage reporting, WHO hospital fuel crisis statements, and OCHA humanitarian snapshots establish multi-source energy-system collapse. Exact megawatt/fuel-liter figures evolve; multi-source system collapse is the claim.',
    sources: [
      { label: 'OHCHR / multi-source siege documentation', url: 'https://www.ohchr.org/en/countries/palestine' },
      { label: 'WHO hospital fuel crisis materials', url: 'https://www.who.int' },
      { label: 'OCHA humanitarian snapshots', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-bakeries-food-system-collapse-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Bakeries & Food System Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (food-system cohort)',
    location: 'Gaza Strip',
    summary:
      'WFP, FAO, and multi-source reporting document collapse of commercial food markets, bakery capacity, and agricultural production under bombardment, fuel siege, and aid restrictions — a civilian-harm multiplier linked to IPC famine phases. Pattern card for food-system destruction.',
    evidence:
      'WFP market assessments, multi-source bakery closure reporting, and FAO agricultural damage tallies establish multi-source food-system collapse. Exact market functionality percentages evolve; multi-source system collapse is the claim.',
    sources: [
      { label: 'WFP market and food security materials', url: 'https://www.wfp.org' },
      { label: 'FAO agricultural damage materials', url: 'https://www.fao.org' },
      { label: 'IPC food security assessments', url: 'https://www.ipcinfo.org' },
    ],
    multimedia: [
      { type: 'document', label: 'WFP public materials', url: 'https://www.wfp.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-telecommunications-blackouts-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Telecommunications Blackouts Pattern (2023–2025)',
    date: 'October 2023 – 2025 (comms cohort)',
    location: 'Gaza Strip',
    summary:
      'Multi-source telecom operators, NetBlocks, and humanitarian agencies document repeated total or near-total communications blackouts in Gaza during major operations — cutting civilian access to emergency services, family contact, and journalism. Pattern card for communications siege as a civilian-harm multiplier.',
    evidence:
      'NetBlocks/internet observatory outage data, multi-source telecom operator statements, and OCHA/humanitarian access reports establish multi-source blackout episodes. Exact outage durations evolve; multi-source repeated total blackouts is the claim.',
    sources: [
      { label: 'NetBlocks / multi-source outage monitoring', url: 'https://netblocks.org' },
      { label: 'OCHA humanitarian access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza blackout coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-cash-liquidity-banking-collapse-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Cash Liquidity & Banking Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (liquidity cohort)',
    location: 'Gaza Strip',
    summary:
      'World Bank, OCHA, and multi-source economic reporting document severe cash shortages, banking system paralysis, and informal-market premiums that block civilian purchase of food and medicine even when goods are present. Pattern card for financial-system collapse as a civilian-harm multiplier.',
    evidence:
      'World Bank economic monitoring, multi-source banking/ATM outage reporting, and humanitarian cash-assistance constraints establish multi-source liquidity collapse. Exact shekel availability figures evolve; multi-source system collapse is the claim.',
    sources: [
      { label: 'World Bank economic monitoring materials', url: 'https://www.worldbank.org' },
      { label: 'OCHA humanitarian cash/access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza cash crisis coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-polio-outbreak-pattern-2024',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'un-finding',
    title: 'Gaza Circulating Vaccine-Derived Polio Outbreak Pattern (2024)',
    date: 'June–September 2024 (outbreak + campaign cohort)',
    location: 'Gaza Strip (Deir al-Balah / central Gaza environmental + clinical cluster)',
    summary:
      'WHO, UNICEF, and the Global Polio Eradication Initiative document Gaza’s first confirmed poliovirus detection in ~25 years: circulating vaccine-derived poliovirus type 2 (cVDPV2) in environmental samples and a confirmed clinical case in an infant, triggering multi-round emergency nOPV2 vaccination campaigns under wartime access constraints. Pattern card for conflict-driven disease resurgence as a children-targeting civilian-harm multiplier.',
    evidence:
      'WHO outbreak notices, GPEI campaign summaries, and multi-source clinical/environmental lab reporting establish multi-source cVDPV2 detection and emergency vaccination. Case counts and coverage figures evolve; multi-source reappearance after a quarter-century polio-free interval is the claim.',
    sources: [
      { label: 'WHO — first-phase Gaza polio campaign (Sept 2024)', url: 'https://www.who.int/news/item/04-09-2024-first-phase-of-polio-campaign-concludes-successfully-in-gaza' },
      { label: 'Global Polio Eradication Initiative — outbreak response materials', url: 'https://polioeradication.org' },
      { label: 'Harvard Chan School — multi-source outbreak explainers', url: 'https://hsph.harvard.edu/news/polio-gaza-public-health-response/' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public outbreak / campaign updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-agricultural-land-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Agricultural Land Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (agriculture cohort)',
    location: 'Gaza Strip farmland / orchards / greenhouses',
    summary:
      'FAO, UNOSAT, and multi-source satellite reporting document majority damage or destruction of Gaza cropland, orchards, and greenhouse infrastructure during the war — collapsing local food production that civilians (including children) depend on alongside aid. Pattern card for agricultural system destruction as a civilian-harm multiplier distinct from bakery/IPC starvation cards.',
    evidence:
      'FAO geospatial assessments, UNOSAT cropland damage analyses, and multi-source satellite/field reporting establish multi-source majority agricultural land damage. Exact percentages evolve by governorate and date; multi-source system-scale cropland/orchard destruction is the claim.',
    sources: [
      { label: 'FAO geospatial / agricultural damage assessments', url: 'https://www.fao.org' },
      { label: 'UNOSAT satellite damage analyses', url: 'https://unosat.org' },
      { label: 'OCHA humanitarian access / food-system materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'FAO public damage materials', url: 'https://www.fao.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-civil-defense-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Civil Defense & Rescue Workers Killed Pattern (2023–2025)',
    date: 'October 2023 – 2025 (civil-defense cohort)',
    location: 'Gaza Strip (rescue/search sites across governorates)',
    summary:
      'Gaza Civil Defense, OCHA, and multi-source reporting document large numbers of civil-defense and rescue workers killed while extricating civilians from rubble — a distinct occupational-harm pattern adjacent to (but not identical with) aid-worker and paramedic convoy cards. Pattern card for systematic risk to protected rescue personnel under wartime bombardment.',
    evidence:
      'Gaza Civil Defense fatality tallies, OCHA protection of civilians materials, and multi-outlet coverage of rescue-worker deaths establish multi-source occupational targeting/risk. Exact counts evolve; multi-source elevated civil-defense fatalities during rescue operations is the claim.',
    sources: [
      { label: 'OCHA Protection of Civilians / humanitarian updates', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza Civil Defense casualty coverage', url: 'https://apnews.com' },
      { label: 'OHCHR public statements on rescue/medical personnel', url: 'https://www.ohchr.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-hospital-mass-graves-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Hospital Grounds Mass Graves & Unidentified Remains Pattern (2023–2025)',
    date: 'November 2023 – 2025 (hospital grounds cohort)',
    location: 'Gaza Strip hospital compounds (incl. Nasser / Al-Shifa grounds multi-source windows)',
    summary:
      'UN human-rights offices, WHO, and multi-source forensic/reporting document mass graves and large numbers of unidentified remains recovered on or near major hospital grounds after Israeli military operations — including cases where burial circumstances and identity of the dead remained contested. Pattern card for hospital-compound mass burial / unidentified-remains harm distinct from single-hospital siege cards.',
    evidence:
      'OHCHR public updates, WHO hospital-attack tallies, and multi-outlet forensic and visual investigations establish multi-source mass graves and unidentified remains at hospital compounds. Attribution of who dug which graves and under what conditions is multi-source contested in places; multi-source existence of mass graves/unidentified remains at hospital grounds is the claim.',
    sources: [
      { label: 'OHCHR public materials on Gaza mass graves / hospital grounds', url: 'https://www.ohchr.org' },
      { label: 'WHO attacks on health care tallies', url: 'https://www.who.int' },
      { label: 'Multi-outlet forensic / visual investigations', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet hospital grounds coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-freedom-flotilla-intercept-pattern-2024-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Aid Flotilla Interceptions Pattern (2024–2025)',
    date: '2024–2025 (flotilla cohort)',
    location: 'Eastern Mediterranean / approaches to Gaza waters',
    summary:
      'Multi-source reporting documents repeated Israeli naval interceptions of civilian activist/aid flotilla vessels attempting to reach Gaza with symbolic and material cargo during the war — including high-profile seizures and towing to Israeli ports. Pattern card for maritime blockade enforcement against civilian vessels, distinct from the 2010 Mavi Marmara card.',
    evidence:
      'Multi-outlet contemporaneous coverage, vessel operator statements, and Israeli government public statements establish multi-source interceptions of flotilla vessels. Legal characterizations of high-seas interdiction remain contested; multi-source repeated interceptions of civilian flotillas is the claim.',
    sources: [
      { label: 'Multi-outlet Freedom Flotilla / aid vessel interception coverage', url: 'https://apnews.com' },
      { label: 'Israeli government public statements on naval interdiction', url: 'https://www.gov.il' },
      { label: 'UN / humanitarian access materials on maritime blockade context', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA humanitarian access context', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-desalination-water-infrastructure-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Desalination & Water Infrastructure Damage Pattern (2023–2025)',
    date: 'October 2023 – 2025 (water-infrastructure cohort)',
    location: 'Gaza Strip desalination / water-treatment facilities',
    summary:
      'UNICEF, WHO, and multi-source WASH reporting document damage, fuel starvation, and operational collapse of desalination plants and water-treatment facilities essential for civilian drinking water — distinct from the broader WASH collapse card by isolating production infrastructure. Pattern card for water-production infrastructure destruction as a children-targeting civilian-harm multiplier.',
    evidence:
      'UNICEF/WHO WASH situation reports, multi-source utility operator statements, and OCHA materials establish multi-source desalination and treatment capacity collapse. Exact plant-by-plant status evolves; multi-source system-scale water production infrastructure failure is the claim.',
    sources: [
      { label: 'UNICEF Gaza WASH situation materials', url: 'https://www.unicef.org' },
      { label: 'WHO health / WASH updates', url: 'https://www.who.int' },
      { label: 'OCHA humanitarian access / WASH materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public WASH updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-rubble-uxo-waste-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Rubble, Debris & Unexploded Ordnance Civilian Risk Pattern (2023–2025)',
    date: 'October 2023 – 2025 (debris/UXO cohort)',
    location: 'Gaza Strip urban rubble fields',
    summary:
      'UNEP, UNDP, and multi-source humanitarian reporting document tens of millions of tonnes of war debris, collapsed buildings, and widespread unexploded ordnance (UXO) risk that continues to kill and maim civilians — especially children — during returns and rescue. Pattern card for post-strike environmental/UXO civilian harm distinct from housing-stock destruction tallies.',
    evidence:
      'UNEP debris assessments, multi-source mine-action/UXO warnings, and OCHA civilian casualty notes establish multi-source debris volume and UXO risk. Exact tonnage and UXO casualty shares evolve; multi-source system-scale debris/UXO civilian hazard is the claim.',
    sources: [
      { label: 'UNEP debris / environmental assessments', url: 'https://www.unep.org' },
      { label: 'UNDP / multi-source reconstruction & debris materials', url: 'https://www.undp.org' },
      { label: 'OCHA protection / civilian hazard updates', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNEP public materials', url: 'https://www.unep.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-cemetery-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Cemetery & Burial Ground Damage Pattern (2023–2025)',
    date: 'October 2023 – 2025 (cemetery cohort)',
    location: 'Gaza Strip cemeteries / burial grounds',
    summary:
      'Multi-source satellite analysis and field reporting document damage to cemeteries and burial grounds across Gaza during the war — including leveled graves and disrupted burial capacity for civilian dead. Pattern card for cemetery destruction as a civilian dignity / cultural-harm multiplier adjacent to housing and cultural-heritage cards.',
    evidence:
      'Satellite analysis, multi-outlet visual investigations, and municipal/civil-defense burial reporting establish multi-source cemetery damage. Exact site counts evolve; multi-source pattern of burial-ground destruction is the claim.',
    sources: [
      { label: 'Multi-outlet satellite / visual cemetery damage coverage', url: 'https://apnews.com' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
      { label: 'OHCHR public human-rights materials', url: 'https://www.ohchr.org' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet visual coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },


  {
    id: 'gaza-civil-registry-records-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Civil Registry & Public Records Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (records cohort)',
    location: 'Gaza Strip municipal / civil-registry facilities',
    summary:
      'Multi-source reporting documents destruction of municipal buildings, civil-registry offices, and public archives holding identity, property, and vital records — a civilian-harm multiplier that blocks family reunification, inheritance, and humanitarian eligibility after displacement. Pattern card for administrative-record destruction distinct from cultural-heritage and housing cards.',
    evidence:
      'Multi-outlet municipal damage reporting, Palestinian Authority/Gaza municipal statements, and OCHA access materials establish multi-source destruction of civil administrative infrastructure. Exact archive loss inventories evolve; multi-source loss of civil-registry capacity is the claim.',
    sources: [
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza municipal / registry damage coverage', url: 'https://apnews.com' },
      { label: 'UN cultural/administrative heritage context materials', url: 'https://www.unesco.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'hezbollah-rockets-northern-israel-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Hezbollah Rocket & Drone Fire on Northern Israel Pattern (2023–2025)',
    date: 'October 2023 – 2025 (northern front cohort)',
    location: 'Northern Israel / Lebanon border communities',
    summary:
      'Israeli government casualty and displacement tallies, multi-source press, and UN reporting document sustained Hezbollah rocket, missile, and drone fire into northern Israel after October 7 — killing and wounding civilians, destroying homes, and forcing mass evacuation of border communities. Pattern card for non-state rocket fire against Israeli civilians concurrent with the Gaza war — required for a non-selective civilian-harm record.',
    evidence:
      'Israeli Home Front Command/government public tallies, multi-outlet contemporaneous coverage, and UNIFIL/UN reporting establish multi-source cross-border fire and civilian displacement. Exact fatality counts evolve; multi-source sustained civilian-targeting rocket/drone fire from Lebanon is the claim.',
    sources: [
      { label: 'Israeli government / Home Front public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet northern Israel rocket coverage', url: 'https://apnews.com' },
      { label: 'UNIFIL / UN Lebanon context materials', url: 'https://unifil.unmissions.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNIFIL public materials', url: 'https://unifil.unmissions.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-sexual-violence-pattern-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'un-finding',
    title: 'October 7 Conflict-Related Sexual Violence Pattern',
    date: 'October 7, 2023 (and contemporaneous multi-site documentation window)',
    location: 'Southern Israel attack sites (Nova festival, kibbutzim, roads)',
    summary:
      'UN Special Representative on Sexual Violence in Conflict, Israeli forensic authorities, and multi-source investigative reporting document conflict-related sexual violence during the October 7 attacks — including rape and sexualized violence against civilians. Pattern card for CRSV as a distinct civilian-targeting crime within the October 7 multi-site assault record. Inclusion is required for a non-selective war-crimes dossier.',
    evidence:
      'UN SRSG Pramila Patten mission findings, multi-source forensic and witness reporting, and contemporaneous investigative journalism establish multi-source sexual violence during the attacks. Exact case counts remain incomplete; multi-source documentation that CRSV occurred is the claim.',
    sources: [
      { label: 'UN SRSG on Sexual Violence in Conflict — mission findings', url: 'https://www.un.org/sexualviolenceinconflict/' },
      { label: 'Multi-outlet forensic / investigative coverage', url: 'https://apnews.com' },
      { label: 'Israeli government / forensic public materials', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'UN sexual violence in conflict materials', url: 'https://www.un.org/sexualviolenceinconflict/' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-northern-evacuation-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Northern Israel Mass Evacuation Pattern (2023–2025)',
    date: 'October 2023 – 2025 (northern displacement cohort)',
    location: 'Northern Israel border communities',
    summary:
      'Israeli government, multi-source press, and municipal reporting document mass evacuation of tens of thousands of Israeli civilians from northern border communities under Hezbollah rocket and drone fire — a multi-year displacement pattern concurrent with the Gaza war. Pattern card for Israeli civilian displacement required for non-selective civilian-harm documentation, distinct from the rocket-fire pattern card.',
    evidence:
      'Israeli government displacement tallies, multi-outlet coverage of hotel/evacuee housing, and municipal statements establish multi-source mass evacuation. Exact resident counts evolve with return waves; multi-source prolonged civilian displacement is the claim.',
    sources: [
      { label: 'Israeli government public displacement materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet northern Israel evacuation coverage', url: 'https://apnews.com' },
      { label: 'UNIFIL / UN Lebanon conflict context', url: 'https://unifil.unmissions.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-child-malnutrition-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'un-finding',
    title: 'Gaza Child Acute Malnutrition Pattern (2023–2025)',
    date: '2023 – 2025 (nutrition cohort)',
    location: 'Gaza Strip (nutrition surveillance sites / clinics)',
    summary:
      'UNICEF, WHO, and IPC multi-source nutrition surveillance document elevated rates of acute malnutrition among Gaza children under wartime food access constraints — a children-targeting civilian-harm outcome distinct from (but linked to) IPC phase and bakery/food-system cards. Pattern card for pediatric nutritional collapse.',
    evidence:
      'UNICEF/WHO nutrition cluster reports, IPC acute malnutrition analyses, and multi-source clinic screening data establish multi-source elevated child acute malnutrition. Exact prevalence rates evolve by governorate and month; multi-source wartime pediatric malnutrition surge is the claim.',
    sources: [
      { label: 'UNICEF Gaza nutrition materials', url: 'https://www.unicef.org' },
      { label: 'WHO nutrition / health emergency materials', url: 'https://www.who.int' },
      { label: 'IPC acute malnutrition analyses', url: 'https://www.ipcinfo.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public nutrition updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-infectious-disease-surge-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Infectious Disease Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (disease-surge cohort)',
    location: 'Gaza Strip (clinic / shelter surveillance)',
    summary:
      'WHO, UNICEF, and multi-source clinic reporting document surges in water-borne and overcrowding-linked infectious disease — hepatitis, diarrhea, skin infections, and respiratory illness — under WASH collapse and mass displacement. Pattern card for multi-pathogen civilian disease surge distinct from the cVDPV2 polio outbreak card.',
    evidence:
      'WHO disease surveillance updates, multi-source clinic caseload reporting, and UNICEF WASH-linked disease materials establish multi-source infectious disease surge. Exact case counts evolve; multi-source multi-disease wartime surge is the claim.',
    sources: [
      { label: 'WHO Gaza health emergency / disease surveillance materials', url: 'https://www.who.int' },
      { label: 'UNICEF WASH / health materials', url: 'https://www.unicef.org' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public health updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-hostages-killed-captivity-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Hostages Killed in Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (captivity-death cohort)',
    location: 'Gaza Strip captivity sites (multi-source forensic windows)',
    summary:
      'Israeli government hostage lists, multi-source forensic reporting, and negotiated-release disclosures document civilian hostages killed in captivity in Gaza — including during IDF operations and by captors. Pattern card for deaths in captivity as a continuous civilian-targeting crime, distinct from the hostages-held and exchange cards.',
    evidence:
      'Israeli government confirmed death announcements, multi-source forensic reporting, and hostage-family/government public lists establish multi-source captive deaths. Exact attribution of each death (captor execution vs crossfire vs medical neglect) varies by case; multi-source civilian deaths in captivity is the claim.',
    sources: [
      { label: 'Israeli government hostage public record', url: 'https://www.gov.il' },
      { label: 'ICRC statements on hostages/detainees', url: 'https://www.icrc.org' },
      { label: 'Multi-outlet hostage death reporting', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'ICRC public statements', url: 'https://www.icrc.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-children-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Children Killed Pattern (2023–2025)',
    date: 'October 2023 – 2025 (West Bank children cohort)',
    location: 'West Bank / East Jerusalem',
    summary:
      'OCHA, UNICEF, and multi-source reporting document elevated killings of Palestinian children in the West Bank after October 7 — including live-fire incidents during raids, settler violence contexts, and protest settings. Pattern card for children-targeting civilian harm outside Gaza, distinct from settlement-violence and detention-surge cards.',
    evidence:
      'OCHA Protection of Civilians child fatality tallies, UNICEF statements, and multi-outlet incident reporting establish multi-source elevated child deaths. Exact annual totals evolve; multi-source wartime West Bank child fatality surge is the claim.',
    sources: [
      { label: 'OCHA Protection of Civilians dashboards', url: 'https://www.ochaopt.org' },
      { label: 'UNICEF West Bank / OPT child protection materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet West Bank child fatality coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-rafah-crossing-closure-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Rafah Crossing Closure & Restricted Exit Pattern (2023–2025)',
    date: 'October 2023 – 2025 (crossing cohort)',
    location: 'Rafah Crossing (Gaza–Egypt) / Gaza exit corridors',
    summary:
      'OCHA, UNRWA, and multi-source reporting document prolonged closures and severe restrictions on the Rafah crossing — Gaza’s primary civilian exit and aid entry point with Egypt — trapping civilians including medical evacuees and dual nationals. Pattern card for crossing access denial as a civilian-harm multiplier distinct from general siege/aid-blockade cards.',
    evidence:
      'OCHA access dashboards, multi-source Egyptian/Israeli/UN statements, and multi-outlet coverage of closed or highly restricted crossing days establish multi-source access denial. Exact open-day tallies evolve; multi-source prolonged severe restriction is the claim.',
    sources: [
      { label: 'OCHA humanitarian access materials', url: 'https://www.ochaopt.org' },
      { label: 'UNRWA access / operational updates', url: 'https://www.unrwa.org' },
      { label: 'Multi-outlet Rafah crossing coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-market-price-inflation-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Market Price Inflation & Scarcity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (price/scarcity cohort)',
    location: 'Gaza Strip markets / informal supply chains',
    summary:
      'WFP, World Bank, and multi-source market monitoring document extreme wartime food and fuel price inflation that prices civilians out of remaining goods even when markets partially function — a purchasing-power collapse distinct from cash-liquidity and bakery-collapse cards. Pattern card for price-scarcity civilian harm.',
    evidence:
      'WFP market monitoring, World Bank price series, and multi-source trader/household reporting establish multi-source extreme inflation. Exact CPI-like indices evolve; multi-source multi-fold price spikes on staples is the claim.',
    sources: [
      { label: 'WFP market monitoring materials', url: 'https://www.wfp.org' },
      { label: 'World Bank economic monitoring materials', url: 'https://www.worldbank.org' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'WFP public market updates', url: 'https://www.wfp.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-winter-tent-flooding-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Displacement Camp Winter Flooding Pattern (2023–2025)',
    date: 'Winter 2023–2025 (flooding cohort)',
    location: 'Gaza Strip tent / makeshift displacement camps',
    summary:
      'OCHA, UNRWA, and multi-source reporting document repeated winter flooding of tent and makeshift camps sheltering displaced civilians — soaking blankets, spoiling food, and driving respiratory and skin disease risk for children. Pattern card for weather-exposed displacement shelter failure as a civilian-harm multiplier.',
    evidence:
      'OCHA/UNRWA shelter situation reports and multi-outlet visual coverage establish multi-source camp flooding episodes. Exact household counts evolve; multi-source recurrent winter flooding of displacement shelters is the claim.',
    sources: [
      { label: 'OCHA shelter / displacement materials', url: 'https://www.ochaopt.org' },
      { label: 'UNRWA operational updates', url: 'https://www.unrwa.org' },
      { label: 'Multi-outlet Gaza tent flooding coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'photo-essay', label: 'Multi-outlet tent camp coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-mhpss-system-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Mental Health & Psychosocial Support System Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (MHPSS cohort)',
    location: 'Gaza Strip (clinics / shelters / community MHPSS sites)',
    summary:
      'WHO, UNICEF, and multi-source psychosocial reporting document collapse of specialized mental-health and psychosocial support capacity amid mass trauma, staff death/displacement, and facility destruction — a system-level card distinct from the children trauma symptom card. Pattern card for MHPSS infrastructure collapse as a civilian-harm multiplier.',
    evidence:
      'WHO mental-health situation materials, multi-source clinician/NGO reporting, and UNICEF child protection notes establish multi-source MHPSS system collapse. Exact workforce and bed counts evolve; multi-source near-total specialized capacity collapse is the claim.',
    sources: [
      { label: 'WHO mental health / emergency materials', url: 'https://www.who.int' },
      { label: 'UNICEF child protection / MHPSS materials', url: 'https://www.unicef.org' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public mental-health materials', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-solar-power-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Solar & Distributed Power Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (solar cohort)',
    location: 'Gaza Strip rooftop / community solar arrays',
    summary:
      'Multi-source satellite and field reporting document widespread destruction of rooftop and community solar arrays that had become a primary civilian power source under siege conditions — collapsing charging, refrigeration, and clinic backup power. Pattern card for distributed-energy destruction as a civilian-harm multiplier distinct from the fuel/electricity siege card.',
    evidence:
      'Satellite damage analyses, multi-source utility/humanitarian reporting, and OCHA energy-access notes establish multi-source solar array destruction. Exact MW lost evolves; multi-source system-scale solar loss is the claim.',
    sources: [
      { label: 'Multi-outlet satellite / solar damage coverage', url: 'https://apnews.com' },
      { label: 'OCHA energy / access materials', url: 'https://www.ochaopt.org' },
      { label: 'World Bank energy monitoring context', url: 'https://www.worldbank.org' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet solar damage coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-rockets-israeli-civilian-harm-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Rocket Fire Israeli Civilian Harm Pattern (2023–2025)',
    date: 'October 2023 – 2025 (rocket-fire cohort)',
    location: 'Israeli communities within rocket range of Gaza',
    summary:
      'Israeli government casualty tallies, multi-source press, and Iron Dome intercept reporting document continued rocket and mortar fire from Gaza into Israeli civilian areas after October 7 — killing and wounding civilians and forcing repeated shelter use. Pattern card for non-state rocket fire against Israeli civilians concurrent with the Gaza war — required for non-selective civilian-harm documentation, distinct from the October 7 multi-site assault card.',
    evidence:
      'Israeli Home Front Command/government public tallies, multi-outlet contemporaneous coverage, and interceptor/debris reporting establish multi-source rocket fire into civilian areas. Exact fatality counts evolve; multi-source sustained rocket fire toward Israeli civilians is the claim.',
    sources: [
      { label: 'Israeli government / Home Front public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet rocket fire coverage', url: 'https://apnews.com' },
      { label: 'CRS / multi-source Iron Dome context materials', url: 'https://www.congress.gov/crs-product/RL33222' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-sewage-flooding-disease-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Sewage Flooding & Contaminated Water Pattern (2023–2025)',
    date: 'October 2023 – 2025 (sewage cohort)',
    location: 'Gaza Strip urban streets / camps / coastal outfalls',
    summary:
      'UNICEF, WHO, and multi-source WASH reporting document sewage flooding into streets and shelters after treatment plant and pumping failures — driving contaminated water exposure especially for children. Pattern card for sewage overflow harm distinct from general WASH collapse and desalination cards.',
    evidence:
      'UNICEF/WHO WASH situation reports and multi-outlet visual coverage establish multi-source sewage flooding episodes. Exact spill volumes evolve; multi-source recurrent sewage flooding into civilian spaces is the claim.',
    sources: [
      { label: 'UNICEF WASH situation materials', url: 'https://www.unicef.org' },
      { label: 'WHO environmental health materials', url: 'https://www.who.int' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public WASH updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-assistive-devices-destroyed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Assistive Devices & Disability Mobility Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (assistive-devices cohort)',
    location: 'Gaza Strip (displacement routes / destroyed homes / clinics)',
    summary:
      'WHO, disability NGOs, and multi-source reporting document mass loss and destruction of wheelchairs, crutches, hearing aids, and other assistive devices amid bombardment and displacement — stranding disabled civilians including children. Pattern card for assistive-device collapse distinct from the disabled/elderly killed card.',
    evidence:
      'WHO disability/health materials, multi-source NGO field reporting, and OCHA protection notes establish multi-source assistive-device loss. Exact device counts evolve; multi-source system-scale mobility-aid collapse is the claim.',
    sources: [
      { label: 'WHO disability / emergency health materials', url: 'https://www.who.int' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet disability access coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public materials', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-fishing-fleet-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Fishing Fleet & Livelihood Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (fisheries cohort)',
    location: 'Gaza coastline / ports / fishing zones',
    summary:
      'FAO, OCHA, and multi-source reporting document destruction of fishing boats, port infrastructure, and near-total suspension of coastal fishing under wartime naval restrictions — collapsing a primary civilian protein and livelihood source. Pattern card for fisheries destruction distinct from agricultural land and market-price cards.',
    evidence:
      'FAO fisheries assessments, multi-source port damage reporting, and OCHA access materials establish multi-source fleet and livelihood collapse. Exact boat counts evolve; multi-source near-total fisheries stoppage is the claim.',
    sources: [
      { label: 'FAO fisheries / livelihood materials', url: 'https://www.fao.org' },
      { label: 'OCHA humanitarian access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza fishing fleet coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'FAO public materials', url: 'https://www.fao.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-home-demolitions-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Home Demolitions & Displacement Pattern (2023–2025)',
    date: 'October 2023 – 2025 (demolitions cohort)',
    location: 'West Bank / East Jerusalem',
    summary:
      "OCHA, B'Tselem, and multi-source reporting document elevated home demolitions and displacement of Palestinian families in the West Bank after October 7 — including punitive and administrative demolitions affecting children. Pattern card for shelter destruction outside Gaza, distinct from settlement-expansion and settler-violence cards.",
    evidence:
      "OCHA demolition databases, B'Tselem field documentation, and multi-outlet coverage establish multi-source elevated demolitions. Exact structure counts evolve; multi-source wartime demolition surge is the claim.",
    sources: [
      { label: 'OCHA demolition / displacement materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem home demolitions materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet West Bank demolition coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-children-killed-pattern-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Israeli Children Killed Pattern',
    date: 'October 7, 2023 (children cohort)',
    location: 'Southern Israel (kibbutzim, Nova festival, roads)',
    summary:
      'Israeli government fatality lists and multi-source forensic/press reporting document dozens of Israeli children killed during the October 7 multi-site assault — including infants and school-age children in homes and vehicles. Pattern card isolating child fatalities within the October 7 civilian massacre record for non-selective documentation.',
    evidence:
      'Israeli government named fatality lists, multi-outlet contemporaneous reporting, and forensic documentation establish multi-source child deaths on October 7. Exact age-band counts are refined over time; multi-source intentional targeting of civilian sites that killed children is the claim.',
    sources: [
      { label: 'Israeli government public fatality materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet October 7 child casualty coverage', url: 'https://apnews.com' },
      { label: 'UN / multi-source October 7 civilian documentation context', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public materials', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-icu-neonatal-capacity-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza ICU & Neonatal Capacity Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (critical-care cohort)',
    location: 'Gaza Strip hospitals (ICU / NICU wards)',
    summary:
      'WHO and multi-source hospital reporting document near-total collapse of intensive-care and neonatal intensive-care capacity under bombardment, evacuation orders, and fuel/power cuts — a children and critically-ill civilian harm multiplier distinct from the broader health-system collapse and maternal-harm cards.',
    evidence:
      'WHO hospital functionality tallies, multi-source clinician reporting, and OCHA health access notes establish multi-source ICU/NICU capacity collapse. Exact bed counts evolve; multi-source near-total specialized critical-care loss is the claim.',
    sources: [
      { label: 'WHO attacks on health care / hospital functionality materials', url: 'https://www.who.int' },
      { label: 'OCHA health access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza ICU/NICU coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public health updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-dialysis-cancer-care-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Dialysis & Cancer Care Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (chronic-care cohort)',
    location: 'Gaza Strip oncology / dialysis centers',
    summary:
      'WHO and multi-source clinical reporting document collapse of dialysis sessions and cancer treatment pathways under facility destruction, evacuation, and fuel/medicine shortages — a chronic-care civilian harm pattern distinct from ICU/NICU and maternal cards. Pattern card for specialized chronic-care system failure.',
    evidence:
      'WHO specialty-care updates, multi-source patient/clinician reporting, and OCHA health access materials establish multi-source dialysis and oncology capacity collapse. Exact patient counts evolve; multi-source specialized chronic-care stoppage is the claim.',
    sources: [
      { label: 'WHO specialty care / emergency health materials', url: 'https://www.who.int' },
      { label: 'OCHA health access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza dialysis/cancer coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-pharmacy-medicine-shortage-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Pharmacy & Essential Medicine Shortage Pattern (2023–2025)',
    date: 'October 2023 – 2025 (medicines cohort)',
    location: 'Gaza Strip pharmacies / hospital pharmacies',
    summary:
      'WHO, MoH multi-source, and humanitarian reporting document severe shortages of essential medicines, insulin, antibiotics, and anesthesia supplies under siege and bombardment — a civilian and child harm multiplier distinct from ICU and dialysis specialty-care cards. Pattern card for pharmacy-level essential medicine collapse.',
    evidence:
      'WHO essential-medicine stockout materials, multi-source pharmacist/clinician reporting, and OCHA health notes establish multi-source medicine shortages. Exact SKU stockout rates evolve; multi-source essential-medicine scarcity is the claim.',
    sources: [
      { label: 'WHO essential medicines / emergency health materials', url: 'https://www.who.int' },
      { label: 'OCHA health access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza medicine shortage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-blood-bank-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Blood Bank & Transfusion Capacity Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (blood-bank cohort)',
    location: 'Gaza Strip blood banks / trauma hospitals',
    summary:
      'WHO and multi-source hospital reporting document collapse of blood banking, cold-chain, and transfusion capacity under bombardment and power/fuel failure — forcing trauma surgery without adequate blood products. Pattern card for blood-system failure as a civilian-harm multiplier distinct from ICU and medicine-shortage cards.',
    evidence:
      'WHO trauma/blood-supply materials, multi-source clinician reporting, and OCHA health notes establish multi-source blood-bank collapse. Exact unit shortfalls evolve; multi-source transfusion-capacity failure is the claim.',
    sources: [
      { label: 'WHO emergency health / blood safety materials', url: 'https://www.who.int' },
      { label: 'OCHA health access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza blood shortage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-civilian-injured-rockets-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Civilian Injuries from Rocket Fire Pattern (2023–2025)',
    date: 'October 2023 – 2025 (injury cohort)',
    location: 'Israeli communities under rocket fire (south and north fronts)',
    summary:
      'Israeli government injury tallies and multi-source medical reporting document thousands of Israeli civilian injuries from rocket, mortar, and drone fire after October 7 — including trauma, blast, and psychological casualties requiring hospital care. Pattern card for Israeli civilian injury floor concurrent with Gaza and northern fronts — required for non-selective documentation.',
    evidence:
      'Israeli government public injury/hospital tallies and multi-outlet medical coverage establish multi-source civilian injury burden. Exact cumulative counts evolve; multi-source wartime civilian injury scale is the claim.',
    sources: [
      { label: 'Israeli government public casualty materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet Israeli civilian injury coverage', url: 'https://apnews.com' },
      { label: 'Home Front / multi-source rocket intercept context', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-ambulance-access-denial-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Ambulance Access Denial Pattern (2023–2025)',
    date: 'October 2023 – 2025 (ambulance cohort)',
    location: 'Gaza Strip roads / checkpoints / combat zones',
    summary:
      'PRCS, WHO, and multi-source reporting document repeated denial, delay, or obstruction of ambulance access to wounded civilians — a protected-transport harm pattern distinct from paramedic-convoy killings and civil-defense rescue cards. Pattern card for ambulance access denial as a civilian-harm multiplier.',
    evidence:
      'PRCS operational statements, WHO health-access materials, and multi-outlet coverage establish multi-source ambulance access failures. Exact denial counts evolve; multi-source repeated ambulance obstruction is the claim.',
    sources: [
      { label: 'WHO health access / ambulance materials', url: 'https://www.who.int' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet PRCS ambulance coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-family-annihilation-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Entire-Family Killed Pattern (2023–2025)',
    date: 'October 2023 – 2025 (family-annihilation cohort)',
    location: 'Gaza Strip residential sites',
    summary:
      'OCHA, Airwars, and multi-source reporting document large numbers of incidents in which entire extended families — including multiple children — were killed in single residential strikes. Pattern card for family-scale civilian annihilation distinct from aggregate children-killed and housing-destruction cards.',
    evidence:
      'OCHA family-killed tallies, multi-source name-list investigations, and Airwars/multi-outlet strike analyses establish multi-source entire-family death incidents. Exact family counts evolve; multi-source repeated family-scale annihilation is the claim.',
    sources: [
      { label: 'OCHA civilian casualty materials', url: 'https://www.ochaopt.org' },
      { label: 'Airwars / multi-source strike investigations', url: 'https://airwars.org' },
      { label: 'Multi-outlet family-killed coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet family strike coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-universities-total-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Universities Total Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (higher-ed cohort)',
    location: 'Gaza Strip university campuses',
    summary:
      'UNESCO, multi-source satellite analysis, and university statements document destruction or severe damage to all of Gaza’s universities — a higher-education annihilation pattern distinct from the broader school/education-system card. Pattern card for tertiary-education destruction as a long-horizon civilian-harm outcome.',
    evidence:
      'UNESCO higher-ed damage materials, multi-source satellite reporting, and university public statements establish multi-source near-total university destruction. Exact building counts evolve; multi-source all-university severe damage is the claim.',
    sources: [
      { label: 'UNESCO education / heritage damage materials', url: 'https://www.unesco.org' },
      { label: 'Multi-outlet Gaza university destruction coverage', url: 'https://apnews.com' },
      { label: 'OCHA education access materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNESCO public materials', url: 'https://www.unesco.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-mosques-churches-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Mosques & Churches Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (worship-sites cohort)',
    location: 'Gaza Strip mosques and churches',
    summary:
      'UNESCO, multi-source satellite analysis, and field reporting document destruction or severe damage to large numbers of mosques and churches across Gaza — often used as civilian shelters. Pattern card for places-of-worship destruction as a civilian-harm and cultural-harm multiplier, distinct from the broader cultural-heritage card.',
    evidence:
      'UNESCO heritage damage tallies, multi-source satellite reporting, and multi-outlet field coverage establish multi-source worship-site destruction. Exact site counts evolve; multi-source majority mosque damage and multi-church damage is the claim.',
    sources: [
      { label: 'UNESCO heritage damage materials', url: 'https://www.unesco.org' },
      { label: 'Multi-outlet mosque/church destruction coverage', url: 'https://apnews.com' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNESCO public materials', url: 'https://www.unesco.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'iran-proxy-drones-israel-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome', 'iron-beam-laser-2024'],
    legalStatus: 'multi-source-investigation',
    title: 'Iranian & Proxy Drone Attacks on Israel Pattern (2023–2025)',
    date: 'October 2023 – 2025 (drone cohort)',
    location: 'Israel (multi-front drone threat envelope)',
    summary:
      'Israeli government, multi-source press, and regional monitoring document repeated Iranian and proxy drone attacks into Israeli airspace after October 7 — including April 2024 and later waves — posing civilian risk and driving interception campaigns. Pattern card for state/proxy drone warfare against Israel concurrent with Gaza war, distinct from Hezbollah rocket and Gaza rocket cards.',
    evidence:
      'Israeli government public intercept tallies, multi-outlet coverage of drone waves, and multi-source regional reporting establish multi-source drone attack campaigns. Exact intercept ratios evolve; multi-source repeated drone attacks into Israeli airspace is the claim.',
    sources: [
      { label: 'Israeli government public defense materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet Iranian/proxy drone coverage', url: 'https://apnews.com' },
      { label: 'CRS / multi-source regional conflict materials', url: 'https://www.congress.gov/crs-product/RL33222' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-flour-mills-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Flour Mills & Food Production Facilities Pattern (2023–2025)',
    date: 'October 2023 – 2025 (mills cohort)',
    location: 'Gaza Strip flour mills / food factories',
    summary:
      'WFP, multi-source satellite analysis, and field reporting document destruction or disablement of flour mills and major food-production facilities — collapsing local bread-flour supply under siege. Pattern card for industrial food-production destruction distinct from bakery retail collapse and agricultural land cards.',
    evidence:
      'WFP supply-chain materials, multi-source mill damage reporting, and OCHA food-security notes establish multi-source mill/facility disablement. Exact facility counts evolve; multi-source industrial food-production collapse is the claim.',
    sources: [
      { label: 'WFP food-security / supply materials', url: 'https://www.wfp.org' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet flour mill damage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WFP public updates', url: 'https://www.wfp.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-livestock-poultry-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Livestock & Poultry Herd Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (livestock cohort)',
    location: 'Gaza Strip farms / coops / herding areas',
    summary:
      'FAO and multi-source agricultural reporting document mass death and destruction of livestock and poultry herds under bombardment, feed shortages, and displacement — collapsing animal-protein production for civilians. Pattern card for livestock system collapse distinct from cropland and fisheries cards.',
    evidence:
      'FAO livestock assessments and multi-source farm reporting establish multi-source herd collapse. Exact head counts evolve; multi-source near-total poultry/livestock production failure is the claim.',
    sources: [
      { label: 'FAO livestock / agricultural materials', url: 'https://www.fao.org' },
      { label: 'OCHA food-security materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza livestock coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'FAO public materials', url: 'https://www.fao.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-cold-chain-vaccine-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Cold-Chain & Routine Immunization Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (cold-chain cohort)',
    location: 'Gaza Strip clinics / vaccine stores',
    summary:
      'UNICEF, WHO, and multi-source immunization reporting document collapse of cold-chain capacity and disruption of routine childhood vaccination schedules under bombardment and power failure — elevating preventable disease risk for children. Pattern card for immunization-system collapse distinct from polio emergency campaigns and pharmacy shortage cards.',
    evidence:
      'UNICEF immunization updates, WHO EPI materials, and multi-source clinic reporting establish multi-source cold-chain and routine immunization disruption. Exact coverage drops evolve; multi-source routine immunization system collapse is the claim.',
    sources: [
      { label: 'UNICEF immunization materials', url: 'https://www.unicef.org' },
      { label: 'WHO immunization / emergency materials', url: 'https://www.who.int' },
      { label: 'OCHA health access materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-hostages-medical-neglect-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Hostages Denied Adequate Medical Care Pattern (2023–2025)',
    date: 'October 2023 – 2025 (hostage medical cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Israeli government hostage disclosures, released-hostage testimony multi-source, and ICRC access-dispute reporting document denial or severe limitation of medical care for civilian hostages held in Gaza — including elderly and chronically ill captives. Pattern card for medical neglect of hostages as a continuous civilian-targeting crime, distinct from hostages-held and deaths-in-captivity cards.',
    evidence:
      'Released-hostage multi-source testimony, Israeli government medical disclosures, and ICRC public access statements establish multi-source medical care deficits for captives. Exact clinical case counts evolve; multi-source inadequate medical care in captivity is the claim.',
    sources: [
      { label: 'ICRC statements on hostages/detainees', url: 'https://www.icrc.org' },
      { label: 'Israeli government hostage public record', url: 'https://www.gov.il' },
      { label: 'Multi-outlet released-hostage medical testimony coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'ICRC public statements', url: 'https://www.icrc.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-waste-collection-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Solid Waste Collection Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (solid-waste cohort)',
    location: 'Gaza Strip streets / camps / dump sites',
    summary:
      'UNEP, UNDP, and multi-source municipal reporting document collapse of solid-waste collection under fuel shortages and bombardment — leaving mountains of garbage in streets and camps that drive disease risk for children. Pattern card for solid-waste system failure distinct from sewage flooding and rubble/UXO cards.',
    evidence:
      'UNEP/UNDP waste assessments and multi-outlet visual coverage establish multi-source waste-collection collapse. Exact tonnage uncollected evolves; multi-source municipal waste system failure is the claim.',
    sources: [
      { label: 'UNEP solid waste / environmental materials', url: 'https://www.unep.org' },
      { label: 'UNDP municipal recovery materials', url: 'https://www.undp.org' },
      { label: 'OCHA humanitarian situation materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNEP public materials', url: 'https://www.unep.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-search-rescue-equipment-destroyed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Search-and-Rescue Equipment Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (SAR equipment cohort)',
    location: 'Gaza Strip Civil Defense facilities / rubble sites',
    summary:
      'Gaza Civil Defense, OCHA, and multi-source reporting document destruction of fire trucks, excavators, and search-and-rescue gear needed to free civilians from rubble — a capability-collapse pattern amplifying civilian deaths under rubble. Pattern card distinct from civil-defense personnel killed card.',
    evidence:
      'Civil Defense equipment loss statements, multi-source visual reporting, and OCHA protection notes establish multi-source SAR equipment destruction. Exact vehicle counts evolve; multi-source SAR capability collapse is the claim.',
    sources: [
      { label: 'OCHA protection / humanitarian materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Civil Defense equipment coverage', url: 'https://apnews.com' },
      { label: 'OHCHR public materials', url: 'https://www.ohchr.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-media-offices-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Media Offices & Press Infrastructure Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (media-infrastructure cohort)',
    location: 'Gaza Strip press buildings / media towers',
    summary:
      'CPJ, RSF, and multi-source reporting document destruction of media offices, towers, and press facilities in Gaza — collapsing local newsgathering capacity concurrent with record journalist deaths. Pattern card for press-infrastructure destruction distinct from the journalists-killed personnel card.',
    evidence:
      'CPJ/RSF facility damage tallies and multi-outlet visual investigations establish multi-source media-office destruction. Exact building counts evolve; multi-source press-infrastructure collapse is the claim.',
    sources: [
      { label: 'Committee to Protect Journalists materials', url: 'https://cpj.org' },
      { label: 'Reporters Without Borders materials', url: 'https://rsf.org' },
      { label: 'Multi-outlet media building coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'CPJ public materials', url: 'https://cpj.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-greenhouses-irrigation-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Greenhouses & Irrigation Systems Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (greenhouse cohort)',
    location: 'Gaza Strip greenhouse / irrigation zones',
    summary:
      'FAO and multi-source satellite reporting document widespread destruction of greenhouses and irrigation systems that had been a primary source of vegetables for civilians — a production-capacity collapse distinct from open cropland and flour-mill cards. Pattern card for protected agricultural infrastructure destruction.',
    evidence:
      'FAO greenhouse/irrigation assessments and multi-source satellite reporting establish multi-source protected-agriculture collapse. Exact hectare counts evolve; multi-source greenhouse system destruction is the claim.',
    sources: [
      { label: 'FAO agricultural infrastructure materials', url: 'https://www.fao.org' },
      { label: 'UNOSAT / multi-source satellite analyses', url: 'https://unosat.org' },
      { label: 'OCHA food-security materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'FAO public materials', url: 'https://www.fao.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-olive-groves-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Olive Groves & Perennial Tree Crop Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (olive cohort)',
    location: 'Gaza Strip olive groves / perennial orchards',
    summary:
      'FAO and multi-source satellite reporting document mass destruction of olive groves and perennial tree crops that take years to re-establish — a long-horizon livelihood and food-security harm pattern distinct from annual cropland and greenhouse cards. Pattern card for perennial agricultural capital destruction.',
    evidence:
      'FAO tree-crop assessments and multi-source satellite orchard damage analyses establish multi-source olive/perennial destruction. Exact tree counts evolve; multi-source large-scale perennial crop destruction is the claim.',
    sources: [
      { label: 'FAO agricultural damage materials', url: 'https://www.fao.org' },
      { label: 'UNOSAT / multi-source satellite analyses', url: 'https://unosat.org' },
      { label: 'OCHA food-security materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'FAO public materials', url: 'https://www.fao.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-olive-harvest-violence-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Olive Harvest Violence & Access Denial Pattern (2023–2025)',
    date: '2023 – 2025 harvest seasons (access-denial cohort)',
    location: 'West Bank olive-growing communities',
    summary:
      "OCHA, B'Tselem, and multi-source harvest-season reporting document elevated settler attacks and access denials during olive harvest after October 7 — destroying a primary livelihood and cultural practice for Palestinian civilians. Pattern card for seasonal livelihood violence distinct from open cropland and settlement-surge cards.",
    evidence:
      "OCHA seasonal protection reports, B'Tselem harvest documentation, and multi-outlet coverage establish multi-source harvest-season violence and access denial. Exact incident counts evolve by season; multi-source elevated harvest interference is the claim.",
    sources: [
      { label: 'OCHA Protection of Civilians materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem olive harvest materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet West Bank harvest coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-elderly-killed-pattern-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Israeli Elderly Killed Pattern',
    date: 'October 7, 2023 (elderly cohort)',
    location: 'Southern Israel (kibbutzim / homes / Nova area)',
    summary:
      'Israeli government fatality lists and multi-source reporting document large numbers of elderly Israeli civilians killed during the October 7 multi-site assault — including residents murdered in homes and safe rooms. Pattern card isolating elderly civilian fatalities within the October 7 record for non-selective documentation.',
    evidence:
      'Israeli government named fatality lists and multi-outlet contemporaneous reporting establish multi-source elderly civilian deaths on October 7. Exact age-band counts are refined over time; multi-source intentional targeting of civilian sites that killed elderly residents is the claim.',
    sources: [
      { label: 'Israeli government public fatality materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet October 7 elderly casualty coverage', url: 'https://apnews.com' },
      { label: 'UN / multi-source October 7 civilian documentation context', url: 'https://www.un.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public materials', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-banks-atms-destroyed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Banks & ATM Infrastructure Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (banking-infrastructure cohort)',
    location: 'Gaza Strip bank branches / ATMs',
    summary:
      'World Bank, multi-source banking reporting, and field coverage document destruction and disablement of bank branches and ATMs across Gaza — collapsing formal cash access under siege. Pattern card for physical banking infrastructure destruction distinct from the cash-liquidity/system-paralysis card.',
    evidence:
      'World Bank economic monitoring, multi-source bank branch damage reporting, and OCHA cash-assistance notes establish multi-source banking infrastructure collapse. Exact branch counts evolve; multi-source formal banking access collapse is the claim.',
    sources: [
      { label: 'World Bank economic monitoring materials', url: 'https://www.worldbank.org' },
      { label: 'OCHA cash/access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza banking infrastructure coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'World Bank public materials', url: 'https://www.worldbank.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-funeral-burial-access-denial-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Funeral & Burial Access Denial Pattern (2023–2025)',
    date: 'October 2023 – 2025 (burial-access cohort)',
    location: 'Gaza Strip cemeteries / temporary burial sites',
    summary:
      'OCHA, multi-source municipal reporting, and field coverage document repeated denial or impossibility of dignified funerals and formal burials under bombardment and cemetery damage — forcing temporary roadside or courtyard graves. Pattern card for burial-access denial as a civilian dignity harm multiplier, distinct from cemetery physical destruction card.',
    evidence:
      'OCHA protection materials, multi-source municipal burial reports, and multi-outlet visual coverage establish multi-source burial access failures. Exact temporary-grave counts evolve; multi-source systemic burial disruption is the claim.',
    sources: [
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza burial/funeral coverage', url: 'https://apnews.com' },
      { label: 'OHCHR public materials', url: 'https://www.ohchr.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-road-network-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Road Network & Corridor Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (roads cohort)',
    location: 'Gaza Strip main roads / north-south corridors',
    summary:
      'UNOSAT, OCHA, and multi-source satellite reporting document widespread cratering and destruction of Gaza’s road network and humanitarian corridors — blocking civilian evacuation, ambulance movement, and aid distribution. Pattern card for transport-network destruction as a civilian-harm multiplier distinct from housing and telecom cards.',
    evidence:
      'UNOSAT road-damage analyses, multi-source corridor access reporting, and OCHA logistics notes establish multi-source road-network collapse. Exact km damaged evolve; multi-source system-scale road destruction is the claim.',
    sources: [
      { label: 'UNOSAT satellite damage analyses', url: 'https://unosat.org' },
      { label: 'OCHA logistics / access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza road/corridor coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNOSAT public materials', url: 'https://unosat.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-fuel-depots-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Fuel Depots & Storage Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (fuel-storage cohort)',
    location: 'Gaza Strip fuel depots / storage sites',
    summary:
      'Multi-source satellite and field reporting document destruction of fuel depots and storage infrastructure under bombardment — collapsing remaining civilian fuel stocks for hospitals, water pumps, and bakeries. Pattern card for fuel-storage infrastructure destruction distinct from the fuel/electricity siege policy card.',
    evidence:
      'Multi-source satellite/visual investigations and OCHA energy-access materials establish multi-source fuel-storage destruction. Exact depot counts evolve; multi-source storage-infrastructure collapse is the claim.',
    sources: [
      { label: 'OCHA energy / access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet fuel depot damage coverage', url: 'https://apnews.com' },
      { label: 'World Bank energy monitoring context', url: 'https://www.worldbank.org' },
    ],
    multimedia: [
      { type: 'investigation', label: 'Multi-outlet fuel infrastructure coverage', url: 'https://apnews.com' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-wheat-silos-storage-destruction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Wheat Silos & Grain Storage Destruction Pattern (2023–2025)',
    date: 'October 2023 – 2025 (grain-storage cohort)',
    location: 'Gaza Strip silos / grain warehouses',
    summary:
      'WFP, multi-source satellite analysis, and field reporting document destruction of wheat silos and grain warehouses — collapsing strategic food stocks under siege. Pattern card for grain-storage destruction distinct from flour mills and market-price cards.',
    evidence:
      'WFP storage/supply materials and multi-source visual investigations establish multi-source silo/warehouse destruction. Exact tonnage lost evolves; multi-source strategic grain-storage collapse is the claim.',
    sources: [
      { label: 'WFP food-security / storage materials', url: 'https://www.wfp.org' },
      { label: 'OCHA food-security materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet grain storage damage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WFP public updates', url: 'https://www.wfp.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-aid-convoy-looting-chaos-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Aid Convoy Looting & Crowd-Crush Chaos Pattern (2023–2025)',
    date: '2023 – 2025 (convoy-chaos cohort)',
    location: 'Gaza Strip aid corridors / distribution points',
    summary:
      'OCHA, WFP, and multi-source reporting document repeated episodes of aid-convoy looting, crowd crushes, and lethal chaos at distribution points under extreme scarcity — killing and injuring civilians including children. Pattern card for distribution-system failure as a civilian-harm multiplier distinct from aid-worker killings and starvation IPC cards.',
    evidence:
      'OCHA/WFP distribution-incident reporting and multi-outlet coverage of crush/looting events establish multi-source distribution chaos. Exact casualty counts per episode evolve; multi-source recurrent deadly distribution chaos is the claim.',
    sources: [
      { label: 'OCHA humanitarian access materials', url: 'https://www.ochaopt.org' },
      { label: 'WFP distribution / access materials', url: 'https://www.wfp.org' },
      { label: 'Multi-outlet aid distribution chaos coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-hostages-children-elderly-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Child & Elderly Hostages Pattern (2023–2025)',
    date: 'October 2023 – 2025 (vulnerable-hostage cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Israeli government hostage lists and multi-source reporting document abduction and prolonged captivity of Israeli children and elderly civilians after October 7 — a protected-person targeting pattern within the broader hostages-held card. Pattern card for vulnerable-hostage civilian targeting required for non-selective documentation.',
    evidence:
      'Israeli government public hostage lists naming children and elderly, multi-source release/deal reporting, and ICRC access statements establish multi-source captivity of protected-age groups. Exact remaining counts change with releases; multi-source child and elderly captivity is the claim.',
    sources: [
      { label: 'Israeli government hostage public record', url: 'https://www.gov.il' },
      { label: 'ICRC statements on hostages/detainees', url: 'https://www.icrc.org' },
      { label: 'Multi-outlet hostage children/elderly coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public materials', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-schools-shelters-struck-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Schools Used as Shelters Struck Pattern (2023–2025)',
    date: 'October 2023 – 2025 (school-shelter cohort)',
    location: 'Gaza Strip UNRWA and public schools used as shelters',
    summary:
      'UNRWA, OCHA, and multi-source reporting document repeated strikes on schools serving as civilian shelters — killing and wounding displaced families including large numbers of children. Pattern card for school-shelter strikes distinct from the education-system destruction structural card.',
    evidence:
      'UNRWA facility-incident tallies, multi-source strike reporting, and OCHA protection notes establish multi-source school-shelter strikes. Exact facility counts evolve; multi-source repeated strikes on shelter schools is the claim.',
    sources: [
      { label: 'UNRWA facility incident materials', url: 'https://www.unrwa.org' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet school-shelter strike coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA public updates', url: 'https://www.unrwa.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-water-wells-aquifers-contamination-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Water Wells & Aquifer Contamination Pattern (2023–2025)',
    date: 'October 2023 – 2025 (groundwater cohort)',
    location: 'Gaza Strip wells / coastal aquifer',
    summary:
      'UNICEF, UNEP, and multi-source WASH reporting document damaged wells, seawater intrusion risk, and contaminated groundwater under bombardment and sewage failure — collapsing safe drinking-water sources for civilians including children. Pattern card for groundwater/well collapse distinct from desalination plant and sewage-flooding cards.',
    evidence:
      'UNICEF/UNEP WASH and environmental materials and multi-source well-damage reporting establish multi-source groundwater contamination risk. Exact well counts evolve; multi-source safe-well capacity collapse is the claim.',
    sources: [
      { label: 'UNICEF WASH materials', url: 'https://www.unicef.org' },
      { label: 'UNEP environmental assessments', url: 'https://www.unep.org' },
      { label: 'OCHA water-access materials', url: 'https://www.ochaopt.org' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public WASH updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-missile-defense-intercepts-civilian-protection-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['iron-dome', 'joint-us-israel-missile-defense-coproduction'],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Missile Defense Intercepts — Civilian Protection Pattern (2023–2025)',
    date: 'October 2023 – 2025 (intercept cohort)',
    location: 'Israeli airspace / population centers under rocket fire',
    summary:
      'Israeli government, multi-source press, and defense reporting document continuous Iron Dome and related intercepts of rockets and drones aimed at Israeli civilian areas after October 7 — a civilian-protection capability pattern that coexists with civilian harm from rockets that penetrate. Pattern card for defensive intercept operations as part of the wartime civilian-risk environment, dual-sourced and non-slogan.',
    evidence:
      'Israeli government public intercept tallies and multi-outlet coverage of Iron Dome operations establish multi-source sustained intercept campaigns. Exact intercept ratios evolve; multi-source continuous defensive intercept activity is the claim.',
    sources: [
      { label: 'Israeli government public defense materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet Iron Dome intercept coverage', url: 'https://apnews.com' },
      { label: 'CRS RL33222 missile-defense context', url: 'https://www.congress.gov/crs-product/RL33222' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-hospital-forced-evacuations-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Hospital Forced Evacuations Pattern (2023–2025)',
    date: 'October 2023 – 2025 (hospital-evacuation cohort)',
    location: 'Gaza Strip hospitals (north → south displacement axis)',
    summary:
      'WHO, MSF, and multi-source reporting document repeated forced evacuations of functioning hospitals under military operations and siege conditions — displacing patients including neonates, ICU cases, and maternity wards mid-treatment. Pattern card for hospital-evacuation civilian harm distinct from health-system collapse and ICU/NICU capacity cards.',
    evidence:
      'WHO hospital-attack and evacuation situation reports, MSF facility statements, and multi-outlet contemporaneous coverage establish multi-source forced hospital evacuations. Exact patient counts per facility evolve; multi-source repeated hospital-evacuation events is the claim.',
    sources: [
      { label: 'WHO Gaza health emergency materials', url: 'https://www.who.int' },
      { label: 'MSF facility / evacuation statements', url: 'https://www.msf.org' },
      { label: 'Multi-outlet hospital evacuation coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public health emergency updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-medical-oxygen-gas-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Medical Oxygen & Medical Gas Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (oxygen/gas cohort)',
    location: 'Gaza Strip hospitals and field medical points',
    summary:
      'WHO, UNICEF, and multi-source health reporting document recurrent medical-oxygen and medical-gas shortages — including generator-dependent oxygen plants offline under fuel siege — causing preventable deaths among neonates, surgical patients, and respiratory cases. Pattern card for medical-oxygen collapse distinct from fuel/electricity and ICU capacity cards.',
    evidence:
      'WHO/UNICEF health-cluster materials and multi-outlet hospital oxygen-shortage reporting establish multi-source medical-gas failure under wartime conditions. Exact death attribution per shortage episode is incomplete; multi-source sustained oxygen/gas capacity collapse is the claim.',
    sources: [
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'UNICEF health / neonatal materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet medical oxygen shortage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'sde-teiman-detainee-abuse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Sde Teiman & Wartime Detention Abuse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (detention-abuse cohort)',
    location: 'Sde Teiman and related Israeli wartime detention facilities',
    summary:
      'Israeli media investigations, IDF/military-advocate public proceedings, UN human-rights offices, and multi-source NGO reporting document serious detainee abuse — including deaths in custody and criminal cases against guards — at Sde Teiman and related wartime facilities holding Palestinians seized after October 7. Pattern card for detention-abuse accountability required for non-selective civilian-harm documentation.',
    evidence:
      'Israeli multi-outlet investigative reporting, public military court/MAC proceedings, and UN/NGO detention statements establish multi-source abuse and death-in-custody allegations with partial official acknowledgment via prosecutions. Exact case counts evolve; multi-source serious abuse pattern at wartime detention sites is the claim.',
    sources: [
      { label: 'Israeli multi-outlet investigative detention coverage', url: 'https://www.haaretz.com' },
      { label: 'OHCHR detention / treatment materials', url: 'https://www.ohchr.org' },
      { label: 'Multi-outlet Sde Teiman proceedings coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OHCHR public materials', url: 'https://www.ohchr.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-civilian-mamad-shelter-use-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Civilian Safe-Room (Mamad) & Shelter Use Pattern (2023–2025)',
    date: 'October 2023 – 2025 (shelter-use cohort)',
    location: 'Israeli cities and border communities under rocket sirens',
    summary:
      'Israeli government Home Front Command guidance and multi-source reporting document continuous civilian use of reinforced safe rooms (mamad), public shelters, and siren protocols under rocket and drone fire after October 7 — a sustained civilian-protection burden concurrent with rocket harm. Pattern card for shelter/mamad civilian life under fire, dual-sourced and non-slogan.',
    evidence:
      'Home Front Command public guidance, multi-outlet coverage of siren/shelter use, and government civilian-protection materials establish multi-source continuous shelter protocols. Exact shelter-use hours evolve; multi-source sustained mamad/shelter civilian protection activity is the claim.',
    sources: [
      { label: 'Israeli Home Front Command public materials', url: 'https://www.oref.org.il' },
      { label: 'Israeli government civilian-protection materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet rocket siren / shelter coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Home Front Command public updates', url: 'https://www.oref.org.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-philadelphi-buffer-zone-displacement-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Philadelphi Corridor & Buffer-Zone Displacement Pattern (2023–2025)',
    date: 'October 2023 – 2025 (buffer-zone cohort)',
    location: 'Gaza–Egypt border Philadelphi corridor and expanded buffer zones',
    summary:
      'OCHA, satellite assessments, and multi-source reporting document large-scale civilian displacement and housing destruction along the Philadelphi corridor and expanded military buffer zones — clearing inhabited areas under security-control justifications. Pattern card for corridor/buffer displacement distinct from general housing-destruction and Rafah-crossing cards.',
    evidence:
      'OCHA displacement updates, multi-source satellite damage assessments, and multi-outlet corridor reporting establish multi-source buffer-zone clearing with civilian displacement. Exact buffer widths and demolished structure counts evolve; multi-source corridor/buffer displacement is the claim.',
    sources: [
      { label: 'OCHA displacement / access materials', url: 'https://www.ochaopt.org' },
      { label: 'UNOSAT damage assessment materials', url: 'https://unosat.org' },
      { label: 'Multi-outlet Philadelphi corridor coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-kerem-shalom-erez-crossing-access-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Kerem Shalom & Erez Crossing Access Denial Pattern (2023–2025)',
    date: 'October 2023 – 2025 (northern/southern crossing cohort)',
    location: 'Kerem Shalom and Erez crossings (Israel–Gaza)',
    summary:
      'OCHA, COGAT, and multi-source reporting document prolonged closures, severe throughput constraints, and intermittent openings at Kerem Shalom (goods) and Erez (people/medical) crossings — bottlenecks that shaped civilian food, medical-exit, and commercial access independent of the Rafah (Egypt) crossing card. Pattern card for Israel–Gaza crossing access as civilian-harm infrastructure.',
    evidence:
      'OCHA crossing-status updates, COGAT public throughput statements, and multi-outlet coverage of closures and limited reopenings establish multi-source access constraints. Exact truck/patient counts evolve daily; multi-source sustained crossing-access denial and rationing is the claim.',
    sources: [
      { label: 'OCHA crossing and access materials', url: 'https://www.ochaopt.org' },
      { label: 'COGAT public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet Kerem Shalom / Erez coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public access updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-netzarim-corridor-displacement-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Netzarim Corridor Displacement Pattern (2023–2025)',
    date: 'October 2023 – 2025 (Netzarim corridor cohort)',
    location: 'Central Gaza Netzarim corridor (east–west military axis)',
    summary:
      'OCHA, satellite assessments, and multi-source reporting document military control of the Netzarim corridor bisecting Gaza — with large-scale housing destruction and civilian displacement along the axis separating northern and southern population movements. Pattern card for corridor-bisect displacement distinct from Philadelphi buffer and general housing-destruction cards.',
    evidence:
      'OCHA access maps, multi-source satellite damage assessments, and multi-outlet corridor reporting establish multi-source Netzarim-axis control with civilian displacement. Exact corridor width and demolished structure counts evolve; multi-source corridor bisect/displacement is the claim.',
    sources: [
      { label: 'OCHA access and displacement materials', url: 'https://www.ochaopt.org' },
      { label: 'UNOSAT damage assessment materials', url: 'https://unosat.org' },
      { label: 'Multi-outlet Netzarim corridor coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-tunnel-seawater-flooding-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Tunnel Seawater Flooding & Aquifer Risk Pattern (2023–2025)',
    date: 'December 2023 – 2025 (tunnel-flood cohort)',
    location: 'Gaza Strip tunnel network / coastal aquifer interface',
    summary:
      'Israeli government acknowledgments and multi-source reporting document IDF seawater-pumping operations into Hamas tunnel networks — a military tunnel-destruction method with multi-source environmental-risk analysis for coastal aquifer salinization affecting civilian drinking water. Pattern card for tunnel-flood operations and groundwater civilian risk, dual-sourced and distinct from well-contamination and desalination cards.',
    evidence:
      'Israeli public military statements on seawater pumping, multi-outlet coverage of the operation, and multi-source environmental analysis of aquifer salinization risk establish multi-source tunnel-flooding with civilian water-risk dimensions. Exact pumped volumes and aquifer impact magnitudes are incomplete; multi-source seawater tunnel flooding with documented environmental-risk debate is the claim.',
    sources: [
      { label: 'Israeli government / IDF public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet seawater tunnel-flood coverage', url: 'https://apnews.com' },
      { label: 'UNEP / multi-source environmental risk context', url: 'https://www.unep.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-forensic-body-identification-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Forensic Body Identification Pattern (2023–2025)',
    date: 'October 2023 – 2025 (forensic-ID cohort)',
    location: 'Israel forensic institutes / October 7 massacre sites',
    summary:
      'Israeli government forensic authorities and multi-source reporting document prolonged DNA and forensic identification of civilian remains from the October 7 multi-site assault — including burned and fragmented remains that delayed burial and family notification. Pattern card for forensic identification burden as civilian-harm aftermath required for non-selective documentation, distinct from aggregate killed and sexual-violence cards.',
    evidence:
      'Israeli Ministry of Health / forensic institute public updates and multi-outlet coverage of DNA identification campaigns establish multi-source prolonged forensic ID of October 7 civilian dead. Exact remaining unidentified counts change over time; multi-source large-scale forensic identification of massacre victims is the claim.',
    sources: [
      { label: 'Israeli government forensic / health materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet October 7 forensic identification coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet forensic institute reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-administrative-detention-surge-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Administrative Detention Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (admin-detention cohort)',
    location: 'West Bank / Ofer and related Israeli detention facilities',
    summary:
      'B\'Tselem, Addameer, Israeli Prison Service public figures, and multi-source reporting document a sharp post–October 7 surge in administrative detention of Palestinians without charge or trial — including minors — under renewable military orders. Pattern card for administrative-detention legal regime harm distinct from the mass-arrests operational card.',
    evidence:
      'B\'Tselem and Addameer detention tallies, multi-source IPS/military-order reporting, and multi-outlet coverage establish multi-source administrative-detention surge. Exact concurrent detainee counts evolve; multi-source elevated renewable detention-without-trial is the claim.',
    sources: [
      { label: "B'Tselem administrative detention materials", url: 'https://www.btselem.org' },
      { label: 'Addameer detention statistics', url: 'https://www.addameer.org' },
      { label: 'Multi-outlet West Bank detention coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: "B'Tselem public materials", url: 'https://www.btselem.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-mortuary-identification-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Mortuary & Body-Identification Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (mortuary cohort)',
    location: 'Gaza Strip hospital morgues and ad-hoc burial sites',
    summary:
      'WHO, OCHA, and multi-source reporting document collapsed morgue capacity, refrigerated-container shortages, and mass unidentified burials under bombardment — preventing families from identifying and formally burying dead including children. Pattern card for Palestinian mortuary/ID collapse dual-sided against the October 7 forensic-ID card, distinct from hospital mass-graves and funeral-access cards.',
    evidence:
      'WHO hospital situation reports, OCHA protection notes, and multi-outlet morgue/unidentified-burial coverage establish multi-source mortuary system collapse. Exact unidentified counts evolve; multi-source inability to identify and formally process civilian dead is the claim.',
    sources: [
      { label: 'WHO Gaza health emergency materials', url: 'https://www.who.int' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet morgue / unidentified burial coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-herding-bedouin-dispossession-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Herding & Bedouin Community Dispossession Pattern (2023–2025)',
    date: 'October 2023 – 2025 (herding/Bedouin cohort)',
    location: 'West Bank Area C pastoral and Bedouin communities',
    summary:
      'OCHA, B\'Tselem, and multi-source reporting document accelerated settler and state-linked pressure on herding and Bedouin communities after October 7 — including water-point denial, livestock attacks, and community displacement that empties grazing land. Pattern card for pastoralist dispossession distinct from home-demolitions and olive-harvest violence cards.',
    evidence:
      'OCHA settler-violence and displacement tallies, B\'Tselem community case files, and multi-outlet herding/Bedouin coverage establish multi-source pastoralist dispossession. Exact community counts evolve; multi-source elevated herding-community displacement is the claim.',
    sources: [
      { label: 'OCHA West Bank protection materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem community displacement materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet herding / Bedouin displacement coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-humanitarian-airdrops-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['joe-biden', 'benjamin-netanyahu'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Humanitarian Airdrops Pattern (2023–2025)',
    date: 'March 2024 – 2025 (airdrop cohort)',
    location: 'Gaza Strip coastal and open-drop zones',
    summary:
      'U.S., Jordanian, and multi-source reporting document repeated humanitarian airdrops of food parcels into Gaza after ground-access failure — delivering limited tonnage relative to need, with multi-source reports of parcel drownings and crush injuries at drop sites. Pattern card for airdrop as inadequate substitute for land access, distinct from the U.S. aid-pier card.',
    evidence:
      'U.S. Central Command / State Department public airdrop tallies, Jordanian Armed Forces statements, and multi-outlet coverage of drop-site injuries and limited tonnage establish multi-source airdrop campaigns. Exact tonnage and injury counts evolve; multi-source repeated airdrops under access failure is the claim.',
    sources: [
      { label: 'U.S. CENTCOM / State public airdrop materials', url: 'https://www.defense.gov' },
      { label: 'OCHA aid-access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza airdrop coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'U.S. Defense Department public updates', url: 'https://www.defense.gov' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-hostages-bodies-not-returned-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Hostage Bodies Held / Not Returned Pattern (2023–2025)',
    date: 'October 2023 – 2025 (bodies-held cohort)',
    location: 'Gaza Strip captivity and recovery sites',
    summary:
      'Israeli government hostage lists and multi-source reporting document prolonged retention of deceased Israeli civilian hostages\' remains in Gaza — denying families burial rights under IHL expectations for handling of the dead. Pattern card for bodies-held as a distinct civilian-harm crime from living hostages-held and deaths-in-captivity cards.',
    evidence:
      'Israeli government public lists of deceased hostages whose remains remain unrecovered, multi-source deal/recovery reporting, and ICRC statements on the dead establish multi-source retention of hostage remains. Exact unrecovered counts change with recoveries; multi-source prolonged non-return of deceased hostages is the claim.',
    sources: [
      { label: 'Israeli government hostage public record', url: 'https://www.gov.il' },
      { label: 'ICRC statements on missing / dead', url: 'https://www.icrc.org' },
      { label: 'Multi-outlet hostage remains coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'lebanon-civilian-harm-2024-war-pattern',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'Lebanon 2024 War Civilian Harm Pattern',
    date: '2024 – 2025 (Lebanon escalation cohort)',
    location: 'Southern Lebanon / Beirut suburbs / northern Israel border zone',
    summary:
      'OCHA Lebanon, Lebanese health authorities, and multi-source reporting document large-scale civilian deaths, injuries, and displacement in Lebanon during the 2024 Israel–Hezbollah war — concurrent with Israeli northern civilian rocket harm. Pattern card for Lebanon-theater civilian harm required for non-selective regional war documentation, distinct from pager-explosions and Nasrallah-strike cards.',
    evidence:
      'OCHA Lebanon situation reports, multi-source Lebanese Ministry of Health tallies, and multi-outlet war coverage establish multi-source civilian death and displacement floors. Exact totals evolve; multi-source large-scale civilian harm in the 2024 Lebanon war is the claim.',
    sources: [
      { label: 'OCHA Lebanon situation materials', url: 'https://www.unocha.org' },
      { label: 'Multi-outlet Lebanon war civilian-harm coverage', url: 'https://apnews.com' },
      { label: 'Israeli government northern front materials', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.unocha.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-field-hospitals-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Field Hospitals & Temporary Medical Points Pattern (2023–2025)',
    date: 'October 2023 – 2025 (field-hospital cohort)',
    location: 'Gaza Strip field hospitals and emergency medical points',
    summary:
      'WHO, MSF, ICRC, and multi-source reporting document proliferation of field hospitals and temporary medical points after fixed hospital capacity collapsed — under-equipped sites treating trauma including large numbers of children. Pattern card for field-hospital substitution under health-system destruction, distinct from hospital-evacuation and ICU-collapse cards.',
    evidence:
      'WHO health-cluster updates, MSF/ICRC facility statements, and multi-outlet coverage of field hospitals establish multi-source temporary medical infrastructure under war. Exact bed counts evolve; multi-source field-hospital reliance after fixed-hospital collapse is the claim.',
    sources: [
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'MSF field-hospital statements', url: 'https://www.msf.org' },
      { label: 'Multi-outlet Gaza field hospital coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-uxo-child-casualties-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'artillery-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza UXO Child Casualties Pattern (2023–2025)',
    date: 'October 2023 – 2025 (UXO-child cohort)',
    location: 'Gaza Strip rubble fields and former combat zones',
    summary:
      'UNICEF, UNMAS, and multi-source reporting document children killed and maimed by unexploded ordnance and ERW while playing in rubble or returning to damaged neighborhoods — a post-strike civilian harm pattern distinct from the aggregate rubble/UXO waste structural card.',
    evidence:
      'UNICEF child-protection and UNMAS ERW materials plus multi-outlet coverage of child UXO injuries establish multi-source UXO harm to children. Exact casualty counts evolve; multi-source recurrent child UXO casualties is the claim.',
    sources: [
      { label: 'UNICEF child-protection materials', url: 'https://www.unicef.org' },
      { label: 'UNMAS explosive-ordnance materials', url: 'https://www.unmas.org' },
      { label: 'Multi-outlet Gaza UXO child-casualty coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-summer-heat-tent-harm-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Summer Heat & Tent Displacement Harm Pattern (2023–2025)',
    date: '2024 – 2025 (heat/tent cohort)',
    location: 'Gaza Strip tent camps and makeshift shelters',
    summary:
      'OCHA, UNICEF, and multi-source reporting document extreme heat, dehydration risk, and heat-related illness among displaced civilians living in tents and makeshift shelters — a seasonal civilian-harm pattern dual to winter tent-flooding. Pattern card for heat exposure under mass displacement.',
    evidence:
      'OCHA displacement-site updates, UNICEF WASH/health materials, and multi-outlet heat-risk coverage establish multi-source heat harm in tent displacement. Exact heat-illness counts are incomplete; multi-source elevated heat exposure risk for tent-displaced civilians including children is the claim.',
    sources: [
      { label: 'OCHA displacement-site materials', url: 'https://www.ochaopt.org' },
      { label: 'UNICEF WASH / health materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza tent heat coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-families-advocacy-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostage Families Advocacy & Civil Pressure Pattern (2023–2025)',
    date: 'October 2023 – 2025 (families-advocacy cohort)',
    location: 'Israel (Hostages Square / Knesset / public square)',
    summary:
      'Israeli multi-outlet and international press document continuous civilian advocacy by families of hostages held in Gaza — weekly protests, Hostages Square vigils, and political pressure for deals — a civilian civil-society pattern under wartime trauma required for non-selective documentation.',
    evidence:
      'Multi-outlet coverage of Hostages Square, family-forum statements, and Knesset advocacy establish multi-source sustained family-led civilian pressure. Exact protest counts evolve; multi-source continuous hostage-family advocacy is the claim.',
    sources: [
      { label: 'Israeli multi-outlet Hostages Square coverage', url: 'https://www.haaretz.com' },
      { label: 'Multi-outlet hostage family advocacy coverage', url: 'https://apnews.com' },
      { label: 'Israeli government hostage public materials', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-red-crescent-ems-harm-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Red Crescent EMS & Ambulance Harm Pattern (2023–2025)',
    date: 'October 2023 – 2025 (PRCS/EMS cohort)',
    location: 'Gaza Strip PRCS ambulances and emergency medical services',
    summary:
      'Palestine Red Crescent Society statements, OCHA, and multi-source reporting document repeated attacks on, obstruction of, and personnel losses among PRCS ambulance and EMS teams — a protected-emblem civilian-harm pattern distinct from the aggregate ambulance-access-denial card and the Rafah paramedic convoy incident card.',
    evidence:
      'PRCS public incident tallies, OCHA protection notes, and multi-outlet EMS coverage establish multi-source harm to Red Crescent emergency services. Exact vehicle/personnel counts evolve; multi-source repeated EMS/PRCS harm is the claim.',
    sources: [
      { label: 'Palestine Red Crescent Society public materials', url: 'https://www.palestinercs.org' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet PRCS / ambulance coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-checkpoint-movement-restriction-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Checkpoint & Movement Restriction Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (checkpoint cohort)',
    location: 'West Bank checkpoints, road gates, and flying barriers',
    summary:
      'OCHA, B\'Tselem, and multi-source reporting document a post–October 7 surge in fixed and flying checkpoints, road gates, and prolonged civilian movement delays affecting access to work, schools, and medical care — including for children. Pattern card for movement-restriction infrastructure distinct from mass-arrests and home-demolitions cards.',
    evidence:
      'OCHA access-and-movement databases, B\'Tselem checkpoint documentation, and multi-outlet coverage establish multi-source elevated movement restriction. Exact barrier counts evolve; multi-source wartime checkpoint surge is the claim.',
    sources: [
      { label: 'OCHA access and movement materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem freedom of movement materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet West Bank checkpoint coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-icrc-access-denial-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza ICRC Access Denial & Constraint Pattern (2023–2025)',
    date: 'October 2023 – 2025 (ICRC-access cohort)',
    location: 'Gaza Strip detention, hospital, and civilian sites',
    summary:
      'ICRC public statements and multi-source reporting document repeated denials and severe constraints on International Committee of the Red Cross access to hostages, detainees, and civilian sites in Gaza — a protected-humanitarian access pattern dual-sided for both Israeli hostages and Palestinian detainees/civilians.',
    evidence:
      'ICRC public communications on access, multi-source government responses, and multi-outlet coverage establish multi-source constrained ICRC access. Exact visit counts evolve; multi-source repeated access denial/constraint is the claim.',
    sources: [
      { label: 'ICRC public statements', url: 'https://www.icrc.org' },
      { label: 'Multi-outlet ICRC access coverage', url: 'https://apnews.com' },
      { label: 'Israeli government public materials', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'ICRC public updates', url: 'https://www.icrc.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-msf-facility-harm-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza MSF Facility & Medical NGO Harm Pattern (2023–2025)',
    date: 'October 2023 – 2025 (MSF/medical-NGO cohort)',
    location: 'Gaza Strip MSF clinics, hospitals, and medical points',
    summary:
      'MSF, WHO, and multi-source reporting document strikes, forced evacuations, and operational collapses at MSF and peer medical-NGO facilities treating civilians including children. Pattern card for medical-NGO facility harm distinct from field-hospital proliferation and hospital-evacuation cards.',
    evidence:
      'MSF public incident statements, WHO health-cluster notes, and multi-outlet coverage establish multi-source medical-NGO facility harm. Exact facility counts evolve; multi-source repeated MSF/peer facility harm is the claim.',
    sources: [
      { label: 'MSF public facility statements', url: 'https://www.msf.org' },
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet MSF Gaza coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'MSF public updates', url: 'https://www.msf.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-northern-border-town-rocket-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Northern Border Town Rocket Harm Pattern (2023–2025)',
    date: 'October 2023 – 2025 (northern towns cohort)',
    location: 'Kiryat Shmona / Metula / northern Israeli border communities',
    summary:
      'Israeli government and multi-source reporting document sustained Hezbollah rocket and drone fire on northern Israeli border towns — killing and wounding civilians, destroying homes, and forcing multi-month community evacuations distinct from the aggregate Hezbollah-rockets and northern-evacuation cards by focusing on border-town residential harm.',
    evidence:
      'Israeli government community casualty and damage tallies plus multi-outlet northern-front coverage establish multi-source border-town civilian harm under Hezbollah fire. Exact town-level counts evolve; multi-source sustained residential harm in northern border towns is the claim.',
    sources: [
      { label: 'Israeli government northern front materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet northern Israel rocket coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet border-town reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-port-fishery-blockade-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Port Access & Fishery Total Blockade Pattern (2023–2025)',
    date: 'October 2023 – 2025 (port/fishery cohort)',
    location: 'Gaza fishing port / Mediterranean fishing zone',
    summary:
      'OCHA, FAO, and multi-source reporting document total or near-total closure of Gaza port fishing access after October 7 — collapsing a primary protein and livelihood source for civilians including children, distinct from the fishing-fleet destruction card that tracks boat/gear losses.',
    evidence:
      'OCHA maritime-access updates, FAO food-security notes, and multi-outlet fishery-closure coverage establish multi-source port/fishery access denial. Exact sea-day counts evolve; multi-source wartime fishery access collapse is the claim.',
    sources: [
      { label: 'OCHA access materials', url: 'https://www.ochaopt.org' },
      { label: 'FAO food-security materials', url: 'https://www.fao.org' },
      { label: 'Multi-outlet Gaza fishery blockade coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'oct7-dual-national-civilians-killed-pattern-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Dual-National Civilians Killed Pattern (2023)',
    date: 'October 7, 2023 (dual-national cohort)',
    location: 'Israeli kibbutzim, towns, and Nova festival sites',
    summary:
      'Israeli government fatality lists and multi-source reporting document dual-national civilians (U.S., French, Thai, and other nationals) killed during the October 7 multi-site assault — expanding the civilian-harm record beyond Israeli citizens alone for non-selective documentation.',
    evidence:
      'Israeli government named fatality lists, multi-source foreign-ministry statements, and multi-outlet dual-national death coverage establish multi-source international civilian deaths on October 7. Exact nationality tallies refine over time; multi-source dual-national civilian deaths is the claim.',
    sources: [
      { label: 'Israeli government fatality public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet dual-national October 7 coverage', url: 'https://apnews.com' },
      { label: 'U.S. State Department consular materials', url: 'https://www.state.gov' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-journalists-family-members-killed-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Journalists\' Family Members Killed Pattern (2023–2025)',
    date: 'October 2023 – 2025 (journalist-family cohort)',
    location: 'Gaza Strip journalist family residences',
    summary:
      'CPJ, UNESCO, and multi-source reporting document repeated killings of journalists\' family members — including children — in residential strikes, a protected-person adjacent harm pattern distinct from the aggregate journalists-killed card that tracks media workers themselves.',
    evidence:
      'CPJ family-member tallies, multi-source journalist-family case reporting, and multi-outlet coverage establish multi-source killings of journalists\' relatives. Exact counts evolve; multi-source recurrent journalist-family civilian deaths is the claim.',
    sources: [
      { label: 'CPJ journalist casualty materials', url: 'https://cpj.org' },
      { label: 'UNESCO press-freedom materials', url: 'https://www.unesco.org' },
      { label: 'Multi-outlet journalist family death coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'CPJ public updates', url: 'https://cpj.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-tunnel-captivity-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Tunnel Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (tunnel-captivity cohort)',
    location: 'Gaza Strip underground tunnel captivity sites',
    summary:
      'Israeli government, released-hostage testimony, and multi-source reporting document prolonged captivity of Israeli civilians including children in underground tunnel networks — a protected-person detention environment distinct from the aggregate hostages-held and medical-neglect cards.',
    evidence:
      'Released-hostage multi-outlet testimony, Israeli government captivity assessments, and multi-source tunnel-environment reporting establish multi-source tunnel captivity of civilians. Exact tunnel-held counts evolve with releases; multi-source underground civilian captivity is the claim.',
    sources: [
      { label: 'Israeli government hostage public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet released-hostage testimony coverage', url: 'https://apnews.com' },
      { label: 'ICRC access / missing persons context', url: 'https://www.icrc.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-education-remote-learning-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Education & Remote Learning Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (education-access cohort)',
    location: 'Gaza Strip schools, shelters, and displacement sites',
    summary:
      'UNICEF, UNESCO, and multi-source reporting document near-total collapse of in-person schooling and failed remote-learning substitution under bombardment, displacement, and connectivity blackouts — a child-specific harm pattern distinct from school-shelter strikes and universities-destroyed structural cards.',
    evidence:
      'UNICEF education-in-emergencies materials, UNESCO school-damage tallies, and multi-outlet coverage of lost school years establish multi-source education access collapse for children. Exact out-of-school counts evolve; multi-source wartime schooling collapse is the claim.',
    sources: [
      { label: 'UNICEF education materials', url: 'https://www.unicef.org' },
      { label: 'UNESCO education-in-emergency materials', url: 'https://www.unesco.org' },
      { label: 'Multi-outlet Gaza schooling collapse coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-settler-outpost-legalization-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settler Outpost Legalization Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (outpost-legalization cohort)',
    location: 'West Bank Area C unauthorized / newly legalized outposts',
    summary:
      'Peace Now, B\'Tselem, and multi-source reporting document accelerated Israeli government legalization and infrastructure support for settler outposts after October 7 — expanding de facto settlement footprint with documented civilian displacement pressure on adjacent Palestinian communities.',
    evidence:
      'Peace Now outpost-tracking databases, multi-source government legalization decisions, and multi-outlet coverage establish multi-source outpost legalization surge. Exact outpost counts evolve; multi-source wartime outpost formalization is the claim.',
    sources: [
      { label: 'Peace Now settlement / outpost materials', url: 'https://peacenow.org.il' },
      { label: "B'Tselem settlement materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet outpost legalization coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Peace Now public materials', url: 'https://peacenow.org.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-water-trucking-dependence-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Water Trucking Dependence Pattern (2023–2025)',
    date: 'October 2023 – 2025 (water-trucking cohort)',
    location: 'Gaza Strip displacement sites and urban neighborhoods',
    summary:
      'UNICEF, OCHA, and multi-source WASH reporting document collapse of piped water systems forcing civilian dependence on expensive or scarce water trucking — a daily survival burden for families including children, distinct from desalination plant, well-contamination, and sewage cards.',
    evidence:
      'UNICEF WASH situation reports, OCHA access notes, and multi-outlet water-trucking coverage establish multi-source dependence on trucked water under infrastructure collapse. Exact liters-per-capita figures evolve; multi-source wartime water-trucking dependence is the claim.',
    sources: [
      { label: 'UNICEF WASH materials', url: 'https://www.unicef.org' },
      { label: 'OCHA water-access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza water trucking coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-release-deal-waves-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'joe-biden'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostage Release Deal Waves Pattern (2023–2025)',
    date: 'November 2023 – 2025 (release-wave cohort)',
    location: 'Gaza Strip / Israel exchange corridors',
    summary:
      'Israeli government, Qatari/Egyptian mediation statements, and multi-source reporting document multi-wave hostage release deals returning Israeli civilians including children and elderly from Gaza captivity — a continuous civilian-protection negotiation pattern distinct from hostages-held and bodies-not-returned cards.',
    evidence:
      'Israeli government release lists, multi-source mediation coverage, and multi-outlet release-day reporting establish multi-source phased civilian hostage releases. Exact remaining counts change with each wave; multi-source multi-wave release pattern is the claim.',
    sources: [
      { label: 'Israeli government hostage release materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet hostage deal coverage', url: 'https://apnews.com' },
      { label: 'ICRC humanitarian intermediary context', url: 'https://www.icrc.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-unrwa-staff-detention-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza UNRWA Staff Detention & Allegations Pattern (2023–2025)',
    date: 'October 2023 – 2025 (UNRWA-staff cohort)',
    location: 'Gaza Strip / Israeli detention facilities',
    summary:
      'UNRWA, Israeli government allegations, UN investigations, and multi-source reporting document detention of UNRWA staff and contested allegations of staff involvement with Hamas — a dual-source contested accountability pattern that coexists with the UNRWA-ban and UNRWA-staff-deaths cards. Pattern card for staff-detention/allegation complexity required for non-selective documentation.',
    evidence:
      'UNRWA public statements, Israeli government allegation packages, UN Office of Internal Oversight / independent review materials, and multi-outlet coverage establish multi-source staff-detention and allegation record. Individual guilt determinations vary by case; multi-source existence of detentions and formal allegation processes is the claim.',
    sources: [
      { label: 'UNRWA public materials', url: 'https://www.unrwa.org' },
      { label: 'Israeli government public allegation materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet UNRWA staff investigation coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNRWA public updates', url: 'https://www.unrwa.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-civil-defense-siren-fatigue-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Civil Defense Siren Fatigue Pattern (2023–2025)',
    date: 'October 2023 – 2025 (siren-fatigue cohort)',
    location: 'Israeli cities under repeated rocket and drone alerts',
    summary:
      'Israeli Home Front Command and multi-source reporting document thousands of rocket and drone sirens after October 7 — forcing repeated civilian interruptions of school, work, and sleep, including for children. Pattern card for siren-frequency civilian burden distinct from mamad/shelter-use and Iron Dome intercept cards.',
    evidence:
      'Home Front Command public alert logs, multi-outlet siren tallies, and government civilian-protection materials establish multi-source high-frequency siren exposure. Exact annual alert counts evolve; multi-source sustained siren-driven civilian disruption is the claim.',
    sources: [
      { label: 'Israeli Home Front Command public materials', url: 'https://www.oref.org.il' },
      { label: 'Israeli government civilian-protection materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet rocket siren coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Home Front Command public updates', url: 'https://www.oref.org.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-cash-crisis-aid-worker-payments-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Cash Crisis & Aid-Worker Payment Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (cash-crisis cohort)',
    location: 'Gaza Strip banking and cash-distribution points',
    summary:
      'World Bank, OCHA, and multi-source reporting document acute cash liquidity collapse — ATM destruction, bank-branch failures, and inability to pay salaries including aid workers — forcing barter and informal cash markets that harm civilian purchasing power for food and medicine. Pattern card for cash-access collapse distinct from banks/ATM destruction structural card.',
    evidence:
      'World Bank economic notes, OCHA cash-access updates, and multi-outlet liquidity coverage establish multi-source cash-system failure. Exact liquidity ratios evolve; multi-source wartime cash-access crisis is the claim.',
    sources: [
      { label: 'World Bank Gaza economic materials', url: 'https://www.worldbank.org' },
      { label: 'OCHA cash-access materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Gaza cash crisis coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'World Bank public updates', url: 'https://www.worldbank.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-jenin-tulkarm-raid-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['annual-mou', 'fmf-weapons'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Jenin & Tulkarm Raid Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (Jenin/Tulkarm cohort)',
    location: 'Jenin, Tulkarm, and northern West Bank refugee camps',
    summary:
      'OCHA, Palestinian health authorities, and multi-source reporting document intensified Israeli military raids in Jenin and Tulkarm refugee camps after October 7 — with elevated civilian deaths including children, infrastructure damage, and prolonged camp closures. Pattern card for northern-camp raid surge distinct from aggregate West Bank children-killed and mass-arrests cards.',
    evidence:
      'OCHA protection tallies, multi-source camp-raid reporting, and multi-outlet coverage establish multi-source elevated raid intensity in Jenin/Tulkarm. Exact raid and casualty counts evolve; multi-source wartime camp-raid surge is the claim.',
    sources: [
      { label: 'OCHA West Bank protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet Jenin / Tulkarm raid coverage', url: 'https://apnews.com' },
      { label: "B'Tselem field materials", url: 'https://www.btselem.org' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-sexual-violence-captivity-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Sexual Violence in Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (captivity-CRSV cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'UN Special Representative on Sexual Violence in Conflict, released-hostage testimony, and multi-source reporting document conflict-related sexual violence against Israeli hostages during captivity in Gaza — a protected-person crime pattern distinct from the October 7 CRSV card that covers the multi-site assault day itself.',
    evidence:
      'UN SRSG reporting, multi-source released-hostage testimony, and multi-outlet investigative coverage establish multi-source sexual violence in captivity. Exact case counts remain incomplete; multi-source documentation that CRSV occurred in captivity is the claim.',
    sources: [
      { label: 'UN SRSG on Sexual Violence in Conflict materials', url: 'https://www.un.org' },
      { label: 'Multi-outlet hostage captivity CRSV coverage', url: 'https://apnews.com' },
      { label: 'Israeli government hostage public materials', url: 'https://www.gov.il' },
    ],
    multimedia: [
      { type: 'document', label: 'UN public materials', url: 'https://www.un.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-amputee-children-rehab-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Amputee Children Rehabilitation Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (amputee-rehab cohort)',
    location: 'Gaza Strip hospitals and field medical points',
    summary:
      'UNICEF, WHO, and multi-source reporting document large numbers of child amputees under wartime trauma care with collapsed prosthetic and rehabilitation capacity — a child-specific long-term harm pattern distinct from the aggregate amputations-children card by focusing on rehab-system failure after limb loss.',
    evidence:
      'UNICEF child-protection materials, WHO trauma-care notes, and multi-outlet amputee-rehab coverage establish multi-source child amputation with rehab collapse. Exact amputee counts evolve; multi-source wartime child-amputee rehab failure is the claim.',
    sources: [
      { label: 'UNICEF child-protection materials', url: 'https://www.unicef.org' },
      { label: 'WHO trauma / rehab materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet Gaza child amputee coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-aid-distribution-site-killings-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Aid Distribution Site Killings Pattern (2023–2025)',
    date: '2024 – 2025 (aid-site killings cohort)',
    location: 'Gaza Strip aid distribution points and convoy routes',
    summary:
      'OCHA, OHCHR, and multi-source reporting document repeated lethal incidents at or near aid distribution sites and convoys — including the Flour Massacre pattern context and later distribution-point shootings — killing civilians seeking food including children. Pattern card for aid-site lethal force distinct from aid-looting chaos and starvation-blockade cards.',
    evidence:
      'OCHA protection updates, OHCHR statements, and multi-outlet distribution-site coverage establish multi-source lethal incidents at aid points. Exact death counts per site evolve and attribution is multi-source contested in places; multi-source repeated aid-site civilian deaths is the claim.',
    sources: [
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'OHCHR statements', url: 'https://www.ohchr.org' },
      { label: 'Multi-outlet aid distribution site coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-thai-nepali-foreign-workers-killed-pattern-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Thai & Nepali Foreign Workers Killed/Abducted Pattern (2023)',
    date: 'October 7, 2023 (foreign-worker cohort)',
    location: 'Israeli agricultural communities and worksites',
    summary:
      'Israeli government, Thai and Nepali government statements, and multi-source reporting document large numbers of Thai and Nepali agricultural and care workers killed or abducted during the October 7 multi-site assault — a civilian-harm pattern among non-Israeli foreign workers required for non-selective documentation.',
    evidence:
      'Israeli government fatality and hostage lists, multi-source Thai/Nepali government statements, and multi-outlet coverage establish multi-source foreign-worker civilian deaths and abductions. Exact nationality tallies refine over time; multi-source large-scale foreign-worker civilian harm is the claim.',
    sources: [
      { label: 'Israeli government fatality / hostage materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet Thai / Nepali worker October 7 coverage', url: 'https://apnews.com' },
      { label: 'Thai / Nepali government public statements (multi-outlet)', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-orphaned-care-system-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Orphaned Children Care-System Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (orphan-care cohort)',
    location: 'Gaza Strip shelters, hospitals, and extended-family households',
    summary:
      'UNICEF, UNRWA, and multi-source reporting document large numbers of children orphaned or separated from caregivers with collapsed formal care systems — forcing ad-hoc shelter and extended-family arrangements under bombardment. Pattern card for orphan-care system failure distinct from the aggregate orphan-crisis and children-killed cards.',
    evidence:
      'UNICEF child-protection materials, UNRWA shelter notes, and multi-outlet orphaned-children coverage establish multi-source care-system collapse for orphaned children. Exact orphan counts evolve; multi-source wartime orphan-care failure is the claim.',
    sources: [
      { label: 'UNICEF child-protection materials', url: 'https://www.unicef.org' },
      { label: 'UNRWA shelter / protection materials', url: 'https://www.unrwa.org' },
      { label: 'Multi-outlet Gaza orphaned children coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-evacuated-northern-business-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['iron-dome'],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Northern Evacuated-Community Economic Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (northern-economy cohort)',
    location: 'Northern Israeli evacuated towns and agricultural communities',
    summary:
      'Israeli government and multi-source reporting document multi-month economic collapse in evacuated northern communities — closed schools, shuttered businesses, and abandoned farms under Hezbollah fire — a civilian livelihood harm pattern distinct from the northern-evacuation and border-town rocket cards.',
    evidence:
      'Israeli government evacuation and compensation materials, multi-outlet northern-economy coverage, and municipal public statements establish multi-source evacuated-community economic collapse. Exact business-closure counts evolve; multi-source wartime northern livelihood collapse is the claim.',
    sources: [
      { label: 'Israeli government northern front materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet northern Israel economy coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet municipal reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-price-tag-violence-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Price-Tag Settler Violence Pattern (2023–2025)',
    date: 'October 2023 – 2025 (price-tag cohort)',
    location: 'West Bank Palestinian villages and olive groves',
    summary:
      'OCHA, B\'Tselem, and multi-source reporting document elevated “price-tag” and settler-vigilante attacks after October 7 — arson, property destruction, and intimidation against Palestinian civilians including children — a ideological-violence pattern distinct from aggregate settler-violence and olive-harvest cards.',
    evidence:
      'OCHA settler-violence databases, B\'Tselem case files, and multi-outlet price-tag coverage establish multi-source elevated ideological settler attacks. Exact incident counts evolve; multi-source wartime price-tag surge is the claim.',
    sources: [
      { label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem settler violence materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet price-tag attack coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-generator-fuel-hospital-rationing-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Hospital Generator Fuel Rationing Pattern (2023–2025)',
    date: 'October 2023 – 2025 (generator-fuel cohort)',
    location: 'Gaza Strip hospital generator rooms and ICU wards',
    summary:
      'WHO, MSF, and multi-source reporting document hospital generator fuel rationing under siege conditions — forcing ICUs, incubators, and oxygen plants offline on timed schedules that kill or endanger patients including neonates. Pattern card for generator-fuel rationing distinct from fuel-depots destruction and medical-oxygen collapse cards.',
    evidence:
      'WHO hospital situation reports, MSF facility statements, and multi-outlet generator-fuel coverage establish multi-source hospital fuel rationing. Exact outage hours evolve; multi-source wartime hospital generator rationing is the claim.',
    sources: [
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'MSF hospital statements', url: 'https://www.msf.org' },
      { label: 'Multi-outlet hospital generator fuel coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-psychological-trauma-returnees-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Released Hostages Psychological Trauma Pattern (2023–2025)',
    date: 'November 2023 – 2025 (returnee-trauma cohort)',
    location: 'Israel rehabilitation centers / returned-hostage households',
    summary:
      'Israeli health authorities, multi-source clinical reporting, and press document severe psychological trauma among released hostages including children — PTSD, refeeding complications, and long-term mental-health needs after captivity. Pattern card for returnee trauma distinct from hostages-held and medical-neglect cards.',
    evidence:
      'Israeli government health/rehab materials, multi-source clinical and family reporting, and multi-outlet coverage establish multi-source severe trauma among returnees. Exact clinical counts evolve; multi-source released-hostage trauma burden is the claim.',
    sources: [
      { label: 'Israeli government health / rehab materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet released-hostage trauma coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet clinical reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-humanitarian-zones-false-safety-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge', 'mk84-use'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Designated Humanitarian Zones False-Safety Pattern (2023–2025)',
    date: 'October 2023 – 2025 (safe-zone cohort)',
    location: 'Gaza Strip designated “humanitarian” / safe zones (al-Mawasi and successors)',
    summary:
      'OCHA, OHCHR, and multi-source reporting document repeated civilian deaths and tent-camp strikes inside or near areas designated as humanitarian or safer zones after forced displacement orders — a false-safety harm pattern distinct from the single al-Mawasi incident card and the winter-tent flooding card.',
    evidence:
      'OCHA protection updates, multi-source tent-camp strike reporting, and multi-outlet coverage of deaths in designated zones establish multi-source lethal harm inside supposed safer areas. Exact zone maps and death counts evolve; multi-source civilian deaths in designated humanitarian zones is the claim.',
    sources: [
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'OHCHR statements', url: 'https://www.ohchr.org' },
      { label: 'Multi-outlet safe-zone strike coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-starvation-captivity-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Starvation & Malnutrition in Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (captivity-starvation cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Released-hostage testimony, Israeli medical authorities, and multi-source reporting document severe malnutrition and starvation conditions among Israeli civilian hostages in Gaza captivity — a protected-person treatment crime pattern distinct from medical-neglect and tunnel-captivity cards.',
    evidence:
      'Multi-source released-hostage medical assessments, Israeli government health materials, and multi-outlet coverage establish multi-source malnutrition in captivity. Exact clinical severity varies by case; multi-source starvation/malnutrition of civilian hostages is the claim.',
    sources: [
      { label: 'Israeli government hostage / health materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet released-hostage malnutrition coverage', url: 'https://apnews.com' },
      { label: 'ICRC detention standards context', url: 'https://www.icrc.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-school-raids-closure-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank School Raids & Education Disruption Pattern (2023–2025)',
    date: 'October 2023 – 2025 (WB-school cohort)',
    location: 'West Bank Palestinian schools and UNRWA classrooms',
    summary:
      'UNICEF, OCHA, and multi-source reporting document elevated Israeli military raids on or near schools, school closures, and movement barriers blocking children\'s education access in the West Bank after October 7 — a child-specific harm pattern distinct from home-demolitions and children-killed cards.',
    evidence:
      'UNICEF education-in-emergencies materials, OCHA protection notes, and multi-outlet school-raid coverage establish multi-source education disruption for West Bank children. Exact school-day losses evolve; multi-source wartime school disruption is the claim.',
    sources: [
      { label: 'UNICEF education materials', url: 'https://www.unicef.org' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet West Bank school raid coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-maternity-wards-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Maternity Wards & Safe Birth Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (maternity cohort)',
    location: 'Gaza Strip maternity wards and field delivery points',
    summary:
      'UNFPA, WHO, and multi-source reporting document collapse of safe maternity care — C-section without anesthesia, deliveries in tents, and elevated maternal/neonatal risk under bombardment and hospital evacuation. Pattern card for maternity-system collapse distinct from pregnant-maternal-harm and ICU/NICU capacity cards.',
    evidence:
      'UNFPA reproductive-health materials, WHO hospital notes, and multi-outlet maternity coverage establish multi-source safe-birth system collapse. Exact maternal mortality figures evolve; multi-source wartime maternity-care collapse is the claim.',
    sources: [
      { label: 'UNFPA reproductive health materials', url: 'https://www.unfpa.org' },
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet Gaza maternity coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNFPA public updates', url: 'https://www.unfpa.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-children-returned-trauma-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Child Hostages Returned Trauma Pattern (2023–2025)',
    date: 'November 2023 – 2025 (child-returnee cohort)',
    location: 'Israel pediatric rehab / returned-child households',
    summary:
      'Israeli government, multi-source clinical reporting, and press document severe developmental and psychological trauma among Israeli children released from Gaza captivity — a child-specific returnee harm pattern distinct from the aggregate returnee-trauma and hostages-children-elderly cards.',
    evidence:
      'Israeli government child-hostage release lists, multi-source pediatric clinical reporting, and multi-outlet coverage establish multi-source child-returnee trauma. Exact clinical counts evolve; multi-source severe trauma among returned child hostages is the claim.',
    sources: [
      { label: 'Israeli government hostage / health materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet child hostage returnee coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet pediatric reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-solid-waste-disease-vector-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Solid Waste Disease-Vector Pattern (2023–2025)',
    date: 'October 2023 – 2025 (waste-vector cohort)',
    location: 'Gaza Strip displacement sites and urban streets',
    summary:
      'UNEP, UNICEF, and multi-source WASH reporting document uncollected solid waste mountains under collection-system collapse — breeding disease vectors affecting civilians including children. Pattern card for waste-as-disease-vector distinct from the aggregate solid-waste collection collapse card by focusing on epidemiological risk.',
    evidence:
      'UNEP environmental assessments, UNICEF WASH notes, and multi-outlet waste-pile coverage establish multi-source solid-waste disease-vector risk. Exact vector-borne case counts are incomplete; multi-source wartime waste-vector exposure is the claim.',
    sources: [
      { label: 'UNEP environmental materials', url: 'https://www.unep.org' },
      { label: 'UNICEF WASH materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza waste disease coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNEP public updates', url: 'https://www.unep.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-elderly-medical-captivity-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Elderly Hostages Medical Crisis in Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (elderly-captivity cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Israeli government hostage lists, released-elderly testimony, and multi-source reporting document acute medical crises among elderly Israeli civilian hostages — denied chronic medications, mobility aids, and specialist care. Pattern card for elderly-specific captivity medical harm distinct from aggregate medical-neglect and hostages-children-elderly cards.',
    evidence:
      'Israeli government named elderly-hostage lists, multi-source release medical assessments, and multi-outlet coverage establish multi-source elderly medical crisis in captivity. Exact clinical counts evolve; multi-source elderly medical harm in captivity is the claim.',
    sources: [
      { label: 'Israeli government hostage public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet elderly hostage medical coverage', url: 'https://apnews.com' },
      { label: 'ICRC access / medical standards context', url: 'https://www.icrc.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-disability-care-collapse-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Disability Care & Assistive Services Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (disability-care cohort)',
    location: 'Gaza Strip disability service sites and displacement camps',
    summary:
      'Humanity & Inclusion, UNICEF, and multi-source reporting document collapse of disability care — destroyed assistive devices, inaccessible shelters, and lost rehab services for civilians including children with disabilities. Pattern card for disability-care system collapse distinct from assistive-devices-destroyed and amputee-rehab cards.',
    evidence:
      'HI/UNICEF disability materials and multi-outlet coverage establish multi-source disability-care collapse under war. Exact beneficiary counts evolve; multi-source wartime disability service failure is the claim.',
    sources: [
      { label: 'Humanity & Inclusion materials', url: 'https://www.hi.org' },
      { label: 'UNICEF disability / child-protection materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza disability coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-night-raids-children-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Night Raids Affecting Children Pattern (2023–2025)',
    date: 'October 2023 – 2025 (night-raid cohort)',
    location: 'West Bank Palestinian homes and refugee camps',
    summary:
      'UNICEF, Save the Children, and multi-source reporting document elevated night military raids into Palestinian homes after October 7 — with children present during arrests, property damage, and trauma exposure. Pattern card for night-raid child harm distinct from mass-arrests and children-killed cards.',
    evidence:
      'UNICEF child-protection materials, multi-source NGO raid documentation, and multi-outlet coverage establish multi-source night-raid exposure of children. Exact raid counts evolve; multi-source wartime night-raid child trauma pattern is the claim.',
    sources: [
      { label: 'UNICEF child-protection materials', url: 'https://www.unicef.org' },
      { label: 'Save the Children materials', url: 'https://www.savethechildren.org' },
      { label: 'Multi-outlet West Bank night raid coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-anemia-micronutrient-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Children Anemia & Micronutrient Deficiency Pattern (2023–2025)',
    date: 'October 2023 – 2025 (anemia cohort)',
    location: 'Gaza Strip clinics and displacement sites',
    summary:
      'UNICEF, WHO, and multi-source nutrition reporting document elevated anemia and micronutrient deficiencies among Gaza children under wartime diet collapse — a chronic nutritional harm pattern distinct from acute malnutrition/IPC and pharmacy-medicine shortage cards.',
    evidence:
      'UNICEF nutrition surveys, WHO health-cluster notes, and multi-outlet coverage establish multi-source childhood anemia/micronutrient failure. Exact prevalence rates evolve; multi-source wartime child micronutrient collapse is the claim.',
    sources: [
      { label: 'UNICEF nutrition materials', url: 'https://www.unicef.org' },
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet Gaza child anemia coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-oct7-first-responders-killed-pattern-2023',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: false,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'October 7 Israeli First Responders Killed Pattern (2023)',
    date: 'October 7, 2023 (first-responder cohort)',
    location: 'Israeli border communities and festival sites',
    summary:
      'Israeli government and multi-source reporting document large numbers of Israeli police, Magen David Adom medics, firefighters, and volunteer first responders killed while responding to the October 7 multi-site assault — a civilian-protection workforce harm pattern required for non-selective documentation.',
    evidence:
      'Israeli government fatality lists by role, multi-source MDA/police public statements, and multi-outlet coverage establish multi-source first-responder deaths on October 7. Exact role tallies refine over time; multi-source large-scale first-responder civilian deaths is the claim.',
    sources: [
      { label: 'Israeli government fatality public materials', url: 'https://www.gov.il' },
      { label: 'Magen David Adom public materials', url: 'https://www.mdais.org' },
      { label: 'Multi-outlet October 7 first-responder coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-blood-transfusion-collapse-deep-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Surgical Blood & Transfusion Capacity Collapse Pattern (2023–2025)',
    date: 'October 2023 – 2025 (transfusion cohort)',
    location: 'Gaza Strip hospital blood banks and operating theaters',
    summary:
      'WHO, PRCS, and multi-source reporting document collapse of blood banking and transfusion capacity for trauma surgery — forcing surgeries without adequate blood products under siege. Pattern card for surgical transfusion failure distinct from the aggregate blood-bank collapse card by focusing on operative care.',
    evidence:
      'WHO trauma-care materials, PRCS blood-service statements, and multi-outlet coverage establish multi-source transfusion capacity collapse. Exact unit shortages evolve; multi-source wartime surgical blood failure is the claim.',
    sources: [
      { label: 'WHO trauma care materials', url: 'https://www.who.int' },
      { label: 'PRCS blood / EMS materials', url: 'https://www.palestinercs.org' },
      { label: 'Multi-outlet Gaza blood shortage coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-psychotropic-meds-shortage-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Psychotropic & Chronic Mental-Health Meds Shortage Pattern (2023–2025)',
    date: 'October 2023 – 2025 (psych-meds cohort)',
    location: 'Gaza Strip pharmacies, clinics, and field mental-health points',
    summary:
      'WHO, UNICEF, and multi-source health reporting document shortages of psychotropic and chronic mental-health medications under siege — collapsing continuity of care for civilians including children with pre-existing and war-induced conditions. Pattern card for psych-meds shortage distinct from MHPSS system collapse and pharmacy-medicine shortage cards.',
    evidence:
      'WHO mental-health cluster materials, UNICEF MHPSS notes, and multi-outlet meds-shortage coverage establish multi-source psychotropic supply failure. Exact stock-out rates evolve; multi-source wartime psych-meds shortage is the claim.',
    sources: [
      { label: 'WHO mental health materials', url: 'https://www.who.int' },
      { label: 'UNICEF MHPSS materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza mental-health meds coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-family-notification-delays-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostage Family Notification & Uncertainty Pattern (2023–2025)',
    date: 'October 2023 – 2025 (notification cohort)',
    location: 'Israel hostage-family households / government liaison channels',
    summary:
      'Israeli multi-outlet and government liaison reporting document prolonged uncertainty for hostage families — delayed status confirmation, contested alive/dead classifications, and multi-month information blackouts — a civilian psychological-harm pattern distinct from hostages-held and forensic-ID cards.',
    evidence:
      'Israeli government hostage-status updates, multi-source family-forum reporting, and multi-outlet coverage establish multi-source prolonged family uncertainty. Exact case timelines vary; multi-source multi-month notification/status uncertainty is the claim.',
    sources: [
      { label: 'Israeli government hostage public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet hostage family uncertainty coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet family-forum reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-reconstruction-debris-removal-block-pattern-2024-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Reconstruction Debris-Removal Block Pattern (2024–2025)',
    date: '2024 – 2025 (debris-removal cohort)',
    location: 'Gaza Strip destroyed urban neighborhoods',
    summary:
      'World Bank, UNEP, and multi-source reporting document tens of millions of tons of rubble blocking return and reconstruction — with multi-source analysis of decades-scale clearance timelines under continued access constraints. Pattern card for debris-removal as reconstruction bottleneck distinct from rubble-UXO and reconstruction-cost cards.',
    evidence:
      'World Bank/UNEP debris assessments and multi-outlet coverage establish multi-source rubble volumes and clearance timelines. Exact tonnage estimates evolve; multi-source wartime debris-removal bottleneck is the claim.',
    sources: [
      { label: 'World Bank Gaza assessments', url: 'https://www.worldbank.org' },
      { label: 'UNEP environmental assessments', url: 'https://www.unep.org' },
      { label: 'Multi-outlet Gaza rubble clearance coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'World Bank public updates', url: 'https://www.worldbank.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-lead-exposure-rubble-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Children Lead & Toxic Rubble Exposure Pattern (2023–2025)',
    date: 'October 2023 – 2025 (toxic-rubble cohort)',
    location: 'Gaza Strip rubble fields and destroyed urban neighborhoods',
    summary:
      'UNEP, UNICEF, and multi-source environmental-health reporting document elevated risk of lead and toxic dust exposure for children living and playing in rubble — a long-term pediatric environmental harm pattern distinct from UXO-child casualties and aggregate rubble cards.',
    evidence:
      'UNEP environmental assessments, UNICEF child-health notes, and multi-outlet toxic-dust coverage establish multi-source pediatric exposure risk in rubble environments. Exact blood-lead measurements are incomplete; multi-source wartime toxic-rubble child exposure risk is the claim.',
    sources: [
      { label: 'UNEP environmental assessments', url: 'https://www.unep.org' },
      { label: 'UNICEF child health materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza toxic rubble coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNEP public updates', url: 'https://www.unep.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-communication-blackout-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Communication Blackout Pattern (2023–2025)',
    date: 'October 2023 – 2025 (comms-blackout cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Israeli government, released-hostage testimony, and multi-source reporting document near-total communication blackout for Israeli civilian hostages — no Red Cross visits for extended periods and no family contact — a protected-person isolation pattern distinct from ICRC-access-denial and hostages-held cards.',
    evidence:
      'ICRC access statements, multi-source released-hostage testimony, and multi-outlet coverage establish multi-source prolonged communication blackout. Exact visit counts evolve; multi-source multi-month isolation without family contact is the claim.',
    sources: [
      { label: 'ICRC access statements', url: 'https://www.icrc.org' },
      { label: 'Israeli government hostage materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet hostage isolation coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'ICRC public updates', url: 'https://www.icrc.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-settler-road-blocks-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settler Roadblocks & Civilian Route Denial Pattern (2023–2025)',
    date: 'October 2023 – 2025 (settler-roadblock cohort)',
    location: 'West Bank rural roads and village access routes',
    summary:
      'OCHA, B\'Tselem, and multi-source reporting document elevated settler-erected roadblocks and route denials after October 7 — stranding civilians including schoolchildren and medical patients. Pattern card for settler roadblocks distinct from military checkpoint and price-tag cards.',
    evidence:
      'OCHA access databases, B\'Tselem field files, and multi-outlet coverage establish multi-source settler roadblock surge. Exact barrier counts evolve; multi-source wartime settler route denial is the claim.',
    sources: [
      { label: 'OCHA access materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem freedom of movement materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet settler roadblock coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-stunting-risk-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Children Stunting & Developmental Risk Pattern (2023–2025)',
    date: 'October 2023 – 2025 (stunting cohort)',
    location: 'Gaza Strip clinics and displacement sites',
    summary:
      'UNICEF, WHO, and multi-source nutrition reporting document elevated risk of stunting and irreversible developmental harm among Gaza children under prolonged wartime malnutrition — a long-horizon child-harm pattern distinct from acute IPC phases and anemia/micronutrient cards.',
    evidence:
      'UNICEF nutrition materials, WHO child-growth notes, and multi-outlet developmental-risk coverage establish multi-source stunting risk under wartime diet collapse. Exact stunting rates evolve; multi-source elevated developmental-harm risk for children is the claim.',
    sources: [
      { label: 'UNICEF nutrition materials', url: 'https://www.unicef.org' },
      { label: 'WHO child health materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet Gaza child stunting risk coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-forced-propaganda-videos-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Forced Propaganda Videos Pattern (2023–2025)',
    date: 'October 2023 – 2025 (propaganda-video cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Israeli government, multi-source media analysis, and released-hostage testimony document forced filmed statements and propaganda videos of Israeli civilian hostages including children — a protected-person humiliation and coercion pattern distinct from hostages-held and sexual-violence cards.',
    evidence:
      'Multi-source released videos with government authentication, multi-outlet analysis, and released-hostage testimony establish multi-source forced propaganda filming. Exact video counts evolve; multi-source forced filming of civilian hostages is the claim.',
    sources: [
      { label: 'Israeli government hostage public materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet hostage propaganda video coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet analysis', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-settlement-outpost-roads-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settlement Access Roads Expansion Pattern (2023–2025)',
    date: 'October 2023 – 2025 (settlement-roads cohort)',
    location: 'West Bank Area C settlement access corridors',
    summary:
      'Peace Now, B\'Tselem, and multi-source reporting document accelerated settlement access-road construction and land seizure after October 7 — fragmenting Palestinian movement and enabling outpost growth. Pattern card for road-infrastructure expansion distinct from outpost-legalization and settlement-surge cards.',
    evidence:
      'Peace Now settlement-tracking databases, multi-source aerial/satellite analysis, and multi-outlet coverage establish multi-source access-road expansion. Exact kilometer counts evolve; multi-source wartime settlement-road construction is the claim.',
    sources: [
      { label: 'Peace Now settlement materials', url: 'https://peacenow.org.il' },
      { label: "B'Tselem settlement materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet settlement road coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Peace Now public materials', url: 'https://peacenow.org.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-acute-watery-diarrhea-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Children Acute Watery Diarrhea Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (AWD cohort)',
    location: 'Gaza Strip clinics and displacement sites',
    summary:
      'UNICEF, WHO, and multi-source WASH/health reporting document massive surges in acute watery diarrhea among Gaza children under contaminated water and sewage failure — a pediatric disease-harm pattern distinct from aggregate infectious-disease and sewage-flooding cards.',
    evidence:
      'UNICEF WASH/health materials, WHO disease surveillance notes, and multi-outlet coverage establish multi-source AWD surges among children. Exact case counts evolve; multi-source wartime pediatric AWD surge is the claim.',
    sources: [
      { label: 'UNICEF WASH / health materials', url: 'https://www.unicef.org' },
      { label: 'WHO disease surveillance materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet Gaza child diarrhea coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-solitary-confinement-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Solitary & Isolation Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (solitary cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Released-hostage testimony and multi-source reporting document prolonged solitary confinement and extreme isolation of Israeli civilian hostages including children — a protected-person treatment pattern distinct from tunnel-captivity and communication-blackout cards.',
    evidence:
      'Multi-source released-hostage testimony and multi-outlet investigative coverage establish multi-source solitary/isolation captivity conditions. Exact duration per case varies; multi-source prolonged isolation of civilian hostages is the claim.',
    sources: [
      { label: 'Multi-outlet released-hostage testimony coverage', url: 'https://apnews.com' },
      { label: 'Israeli government hostage materials', url: 'https://www.gov.il' },
      { label: 'Israeli multi-outlet investigative reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-palestinian-citizen-israel-mobility-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank–Israel Mobility Restriction for Workers Pattern (2023–2025)',
    date: 'October 2023 – 2025 (worker-mobility cohort)',
    location: 'West Bank–Israel checkpoints and work permit corridors',
    summary:
      'OCHA, ILO, and multi-source reporting document post–October 7 collapse of West Bank Palestinian work-permit access into Israel — wiping out a primary livelihood source for tens of thousands of civilian households including children dependents. Pattern card for labor-mobility shutdown distinct from checkpoint and cash-crisis cards.',
    evidence:
      'OCHA access notes, multi-source labor-market reporting, and multi-outlet coverage establish multi-source work-permit and mobility collapse. Exact permit counts evolve; multi-source wartime labor-access shutdown is the claim.',
    sources: [
      { label: 'OCHA access materials', url: 'https://www.ochaopt.org' },
      { label: 'ILO labor materials', url: 'https://www.ilo.org' },
      { label: 'Multi-outlet West Bank worker permit coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-scabies-skin-disease-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Scabies & Crowding Skin-Disease Pattern (2023–2025)',
    date: 'October 2023 – 2025 (scabies cohort)',
    location: 'Gaza Strip overcrowded shelters and displacement sites',
    summary:
      'WHO, UNICEF, and multi-source health reporting document surges in scabies and crowding-related skin diseases among displaced civilians including children under collapsed WASH and shelter density. Pattern card for scabies/skin disease distinct from infectious-disease aggregate and sewage cards.',
    evidence:
      'WHO health-cluster materials, UNICEF WASH notes, and multi-outlet coverage establish multi-source scabies/skin-disease surges in overcrowded shelters. Exact case counts evolve; multi-source wartime crowding skin-disease surge is the claim.',
    sources: [
      { label: 'WHO health emergency materials', url: 'https://www.who.int' },
      { label: 'UNICEF WASH materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza scabies coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-denied-medications-chronic-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Denied Chronic Medications Pattern (2023–2025)',
    date: 'October 2023 – 2025 (chronic-meds cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Released-hostage testimony, Israeli medical authorities, and multi-source reporting document denial or interruption of chronic medications for Israeli civilian hostages — insulin, heart meds, psychiatric drugs — a protected-person medical-treatment crime pattern distinct from aggregate medical-neglect and elderly-medical cards.',
    evidence:
      'Multi-source released-hostage medical assessments and multi-outlet coverage establish multi-source chronic-medication denial in captivity. Exact drug lists per case vary; multi-source chronic-meds denial for civilian hostages is the claim.',
    sources: [
      { label: 'Israeli government hostage / health materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet hostage medication denial coverage', url: 'https://apnews.com' },
      { label: 'ICRC medical standards context', url: 'https://www.icrc.org' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-settler-agricultural-takeover-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settler Agricultural Land Takeover Pattern (2023–2025)',
    date: 'October 2023 – 2025 (ag-takeover cohort)',
    location: 'West Bank Area C agricultural lands and grazing areas',
    summary:
      'OCHA, Kerem Navot, and multi-source reporting document accelerated settler seizure of Palestinian agricultural land after October 7 — fencing, cultivation takeover, and access denial that empties civilian livelihood land. Pattern card for agricultural takeover distinct from herding dispossession and olive-harvest violence cards.',
    evidence:
      'OCHA protection databases, multi-source land-tracking analysis, and multi-outlet coverage establish multi-source agricultural land takeover. Exact dunam counts evolve; multi-source wartime ag-land seizure is the claim.',
    sources: [
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem land materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet settler land takeover coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-hepatitis-jaundice-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Hepatitis & Jaundice Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (hepatitis cohort)',
    location: 'Gaza Strip clinics and displacement sites',
    summary:
      'WHO, UNICEF, and multi-source health reporting document surges in hepatitis A and jaundice under collapsed WASH and overcrowding — a pediatric and civilian disease-harm pattern distinct from polio outbreak and AWD cards.',
    evidence:
      'WHO disease surveillance materials, UNICEF WASH notes, and multi-outlet coverage establish multi-source hepatitis/jaundice surges. Exact case counts evolve; multi-source wartime hepatitis surge is the claim.',
    sources: [
      { label: 'WHO disease surveillance materials', url: 'https://www.who.int' },
      { label: 'UNICEF WASH materials', url: 'https://www.unicef.org' },
      { label: 'Multi-outlet Gaza hepatitis coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'WHO public updates', url: 'https://www.who.int' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-physical-abuse-captivity-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Physical Abuse in Captivity Pattern (2023–2025)',
    date: 'October 2023 – 2025 (captivity-abuse cohort)',
    location: 'Gaza Strip captivity sites',
    summary:
      'Released-hostage testimony, Israeli medical authorities, and multi-source reporting document physical abuse and violence against Israeli civilian hostages during captivity — a protected-person treatment crime pattern distinct from sexual-violence, solitary, and medical-neglect cards.',
    evidence:
      'Multi-source released-hostage medical and testimony records plus multi-outlet investigative coverage establish multi-source physical abuse in captivity. Exact case counts remain incomplete; multi-source physical abuse of civilian hostages is the claim.',
    sources: [
      { label: 'Israeli government hostage / health materials', url: 'https://www.gov.il' },
      { label: 'Multi-outlet hostage physical abuse coverage', url: 'https://apnews.com' },
      { label: 'Israeli multi-outlet investigative reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-settler-grazing-outposts-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settler Grazing Outposts Expansion Pattern (2023–2025)',
    date: 'October 2023 – 2025 (grazing-outpost cohort)',
    location: 'West Bank Area C herding and grazing lands',
    summary:
      'Kerem Navot, Peace Now, and multi-source reporting document rapid expansion of settler “grazing outposts” after October 7 — using livestock and intimidation to seize large land areas with few settlers, displacing Palestinian herders. Pattern card for grazing-outpost strategy distinct from herding dispossession and outpost-legalization cards.',
    evidence:
      'Multi-source land-tracking databases, OCHA protection notes, and multi-outlet coverage establish multi-source grazing-outpost expansion. Exact outpost and dunam counts evolve; multi-source wartime grazing-outpost surge is the claim.',
    sources: [
      { label: 'Peace Now settlement materials', url: 'https://peacenow.org.il' },
      { label: 'OCHA protection materials', url: 'https://www.ochaopt.org' },
      { label: 'Multi-outlet grazing outpost coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Peace Now public materials', url: 'https://peacenow.org.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'gaza-children-respiratory-infections-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    relatedMoneyNodeIds: ['oct7-emergency-arms-surge'],
    legalStatus: 'multi-source-investigation',
    title: 'Gaza Children Respiratory Infection Surge Pattern (2023–2025)',
    date: 'October 2023 – 2025 (respiratory cohort)',
    location: 'Gaza Strip clinics, shelters, and field medical points',
    summary:
      'UNICEF, WHO, and multi-source health reporting document surges in pediatric respiratory infections under overcrowding, cold, smoke, and collapsed primary care — a child-specific disease-harm pattern distinct from infectious-disease aggregate and winter-tent cards.',
    evidence:
      'UNICEF child-health materials, WHO surveillance notes, and multi-outlet coverage establish multi-source pediatric respiratory infection surges. Exact case counts evolve; multi-source wartime pediatric respiratory surge is the claim.',
    sources: [
      { label: 'UNICEF child health materials', url: 'https://www.unicef.org' },
      { label: 'WHO disease surveillance materials', url: 'https://www.who.int' },
      { label: 'Multi-outlet Gaza child respiratory coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'UNICEF public updates', url: 'https://www.unicef.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'israel-hostages-witnessing-killings-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: [],
    legalStatus: 'multi-source-investigation',
    title: 'Israeli Hostages Forced to Witness Killings Pattern (2023–2025)',
    date: 'October 2023 – 2025 (witness-coercion cohort)',
    location: 'Gaza Strip captivity sites and October 7 abduction routes',
    summary:
      'Released-hostage testimony and multi-source reporting document Israeli civilian hostages including children forced to witness killings of family members or other civilians during abduction and captivity — a psychological-torture pattern distinct from physical-abuse and sexual-violence cards.',
    evidence:
      'Multi-source released-hostage testimony and multi-outlet investigative coverage establish multi-source forced witnessing of killings. Exact case counts remain incomplete; multi-source forced witnessing by civilian hostages is the claim.',
    sources: [
      { label: 'Multi-outlet released-hostage testimony coverage', url: 'https://apnews.com' },
      { label: 'Israeli government hostage materials', url: 'https://www.gov.il' },
      { label: 'Israeli multi-outlet investigative reporting', url: 'https://www.haaretz.com' },
    ],
    multimedia: [
      { type: 'document', label: 'Israeli government public updates', url: 'https://www.gov.il' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },

  {
    id: 'west-bank-settler-home-invasions-pattern-2023-2025',
    era: 'post-oct7',
    targetsCivilians: true,
    targetsChildren: true,
    relatedProfileIds: ['benjamin-netanyahu'],
    relatedMoneyNodeIds: ['annual-mou'],
    legalStatus: 'multi-source-investigation',
    title: 'West Bank Settler Home Invasions Pattern (2023–2025)',
    date: 'October 2023 – 2025 (home-invasion cohort)',
    location: 'West Bank Palestinian villages and homes',
    summary:
      'OCHA, B\'Tselem, and multi-source reporting document elevated settler home invasions after October 7 — armed entry into Palestinian homes, intimidation of families including children, and property destruction. Pattern card for home invasions distinct from price-tag and night-raid military cards.',
    evidence:
      'OCHA settler-violence databases, B\'Tselem case files, and multi-outlet coverage establish multi-source home-invasion surge. Exact incident counts evolve; multi-source wartime settler home invasions is the claim.',
    sources: [
      { label: 'OCHA settler-violence materials', url: 'https://www.ochaopt.org' },
      { label: "B'Tselem field materials", url: 'https://www.btselem.org' },
      { label: 'Multi-outlet settler home invasion coverage', url: 'https://apnews.com' },
    ],
    multimedia: [
      { type: 'document', label: 'OCHA public updates', url: 'https://www.ochaopt.org' },
    ],
    tier: 'verified',
    casualties: { killed: 0 },
  },


]

/** Timeline densification: war-crimes and civilian-targeting milestones not already in the base timeline. */
export const ISRAEL_DOSSIER_TIMELINE_EXPANSION: DossierHistoricalTimelineEvent[] = [
  {
    id: 'tl-deir-yassin',
    year: '1948',
    era: 'mandate-1948',
    title: 'Deir Yassin Massacre',
    description:
      'Irgun and Lehi forces kill roughly 100–200+ Palestinian villagers at Deir Yassin. The massacre accelerates mass flight and becomes a foundational event of the Nakba.',
    source: 'Britannica / UN refugee documentation',
    sourceUrl: 'https://www.britannica.com/event/Deir-Yassin-massacre',
    tier: 'verified',
    relatedIncidentIds: ['deir-yassin-1948'],
    tags: ['civilians', 'children', 'nakba'],
  },
  {
    id: 'tl-lydda-ramle',
    year: '1948',
    era: 'mandate-1948',
    title: 'Lydda–Ramle Expulsions',
    description:
      'Israeli forces expel tens of thousands of Palestinian civilians from Lydda and Ramle. Hundreds die on the forced march. Among the largest single expulsions of 1948.',
    source: 'UN Conciliation Commission / UNRWA',
    sourceUrl: 'https://www.unrwa.org/palestine-refugees',
    tier: 'verified',
    relatedIncidentIds: ['lydda-ramle-1948'],
    tags: ['civilians', 'expulsion', 'nakba'],
  },
  {
    id: 'tl-qibya',
    year: '1953',
    era: '1948-1967',
    title: 'Qibya Raid Condemned by UN Security Council',
    description:
      'Unit 101 kills 69 villagers in Qibya. UNSC Resolution 101 condemns the attack. Ariel Sharon commands the unit.',
    source: 'UN Security Council Resolution 101',
    sourceUrl: 'https://digitallibrary.un.org/record/112088',
    tier: 'verified',
    relatedIncidentIds: ['qibya-1953'],
    tags: ['civilians', 'children', 'un-finding'],
  },
  {
    id: 'tl-kafr-qasim',
    year: '1956',
    era: '1948-1967',
    title: 'Kafr Qasim Massacre — Israeli Court Convictions',
    description:
      'Border Police kill 49 Palestinian citizens of Israel for a curfew many had not been told about. Israeli courts convict perpetrators and articulate the "manifestly illegal order" doctrine.',
    source: 'Britannica — Kafr Qasim massacre',
    sourceUrl: 'https://www.britannica.com/event/Kafr-Qasim-massacre',
    tier: 'verified',
    relatedIncidentIds: ['kafr-qasim-1956'],
    tags: ['civilians', 'children', 'court-finding'],
  },
  {
    id: 'tl-qana-1996',
    year: '1996',
    era: 'occupation-1967-2005',
    title: 'Qana UN Compound Shelling — 106 Civilians Killed',
    description:
      'Israeli artillery hits a UNIFIL compound sheltering civilians in Qana, Lebanon. UN investigation challenges the accidental-error account.',
    source: 'UNISPAL / Amnesty International',
    sourceUrl: 'https://www.un.org/unispal/document/auto-insert-179197/',
    tier: 'verified',
    relatedIncidentIds: ['qana-1996'],
    tags: ['civilians', 'children', 'un-finding'],
  },
  {
    id: 'tl-jenin-2002',
    year: '2002',
    era: 'occupation-1967-2005',
    title: 'Jenin Camp Assault — UN Corrects Massacre Inflation',
    description:
      'Heavy fighting and house demolitions in Jenin. UN finds ~52 Palestinian dead — serious civilian harm, not the hundreds initially claimed. Included to defeat both denial and exaggeration.',
    source: 'UN Secretary-General report A/ES-10/186',
    sourceUrl: 'https://www.un.org/unispal/document/auto-insert-183434/',
    tier: 'verified',
    relatedIncidentIds: ['jenin-2002'],
    tags: ['civilians', 'un-finding'],
  },
  {
    id: 'tl-cast-lead',
    year: '2008–2009',
    era: 'blockade-2007-2023',
    title: 'Cast Lead — Goldstone Fact-Finding Mission',
    description:
      '≈1,400 Palestinians killed in Gaza. UN fact-finding mission documents evidence of war crimes by Israeli forces and Palestinian armed groups.',
    source: 'UN Fact-Finding Mission on the Gaza Conflict',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/special-sessions/session9/fact-finding-mission',
    tier: 'verified',
    relatedIncidentIds: ['cast-lead-2008-09'],
    relatedProfileIds: ['barack-obama', 'joe-biden'],
    tags: ['civilians', 'children', 'war-crimes', 'us-aid'],
  },
  {
    id: 'tl-mavi-marmara',
    year: '2010',
    era: 'blockade-2007-2023',
    title: 'Mavi Marmara Flotilla Raid',
    description:
      'Israeli commandos kill 9–10 activists aboard a civilian aid ship in international waters. UN fact-finding missions issue conflicting but critical findings on use of force.',
    source: 'OHCHR Flotilla Fact-Finding Mission',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/regular-sessions/session15/flotilla-fact-finding-mission',
    tier: 'verified',
    relatedIncidentIds: ['mavi-marmara-2010'],
    tags: ['civilians', 'blockade'],
  },
  {
    id: 'tl-icc-palestine-2015',
    year: '2015',
    era: 'blockade-2007-2023',
    title: 'Palestine Accedes to Rome Statute — ICC Jurisdiction Opens',
    description:
      'The State of Palestine joins the ICC, opening a path to international criminal investigation of alleged crimes on Palestinian territory — later expanded after October 2023.',
    source: 'ICC — Situation in the State of Palestine',
    sourceUrl: 'https://www.icc-cpi.int/palestine',
    tier: 'verified',
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    tags: ['legal', 'icc'],
  },
  {
    id: 'tl-hrw-apartheid-2021',
    year: '2021',
    era: 'blockade-2007-2023',
    title: 'HRW: "A Threshold Crossed" — Apartheid Finding',
    description:
      'Human Rights Watch concludes Israeli authorities commit the crimes against humanity of apartheid and persecution. Amnesty reaches a parallel conclusion in 2022. These are legal characterizations by NGOs, not final court judgments.',
    source: 'Human Rights Watch',
    sourceUrl: 'https://www.hrw.org/report/2021/04/27/threshold-crossed/israeli-authorities-and-crimes-apartheid-and-persecution',
    tier: 'verified',
    tags: ['legal', 'apartheid-finding'],
  },
  {
    id: 'tl-khan-yunis-1956',
    year: '1956',
    era: '1948-1967',
    title: 'Khan Yunis Mass Killings during Sinai Campaign',
    description:
      'Israeli forces enter Khan Yunis during the 1956 war. Contemporary UN and later historical accounts document mass killings of Palestinian residents — one of the deadliest episodes of the brief 1956 Gaza occupation.',
    source: 'UNISPAL / UNRWA historical record',
    sourceUrl: 'https://www.unrwa.org/where-we-work/gaza-strip',
    tier: 'verified',
    relatedIncidentIds: ['khan-yunis-1956'],
    tags: ['civilians', 'children'],
  },
  {
    id: 'tl-second-intifada',
    year: '2000–2005',
    era: 'occupation-1967-2005',
    title: 'Second Intifada — Multi-Thousand Civilian Death Toll',
    description:
      'Roughly 3,000+ Palestinians and ~1,000 Israelis killed. Pattern record of suicide bombings against Israeli civilians and Israeli military operations causing mass Palestinian civilian casualties, tracked by B\'Tselem and UN agencies.',
    source: 'B\'Tselem fatalities statistics',
    sourceUrl: 'https://www.btselem.org/statistics/fatalities/before-cast-lead/by-date-of-event',
    tier: 'verified',
    relatedIncidentIds: ['second-intifada-civilian-toll', 'jenin-2002'],
    tags: ['civilians', 'children', 'pattern-record'],
  },
  {
    id: 'tl-beit-hanoun-2006',
    year: '2006',
    era: 'occupation-1967-2005',
    title: 'Beit Hanoun Artillery Strike Kills 19',
    description:
      'Israeli artillery hits a residential area in Beit Hanoun. 19 Palestinians killed, many of them women and children. UN and HRW demand investigation.',
    source: 'Human Rights Watch / UN News',
    sourceUrl: 'https://www.hrw.org/news/2006/11/08/israelopt-investigate-gaza-shelling',
    tier: 'verified',
    relatedIncidentIds: ['beit-hanoun-2006'],
    tags: ['civilians', 'children', 'artillery'],
  },
  {
    id: 'tl-pillar-defense-2012',
    year: '2012',
    era: 'blockade-2007-2023',
    title: 'Operation Pillar of Defense',
    description:
      'Eight-day Gaza war. 160+ Palestinians killed per monitor tallies; six Israelis killed by rockets. U.S. aid and Iron Dome support continue under the standing MOU architecture.',
    source: 'B\'Tselem / HRW',
    sourceUrl: 'https://www.btselem.org/gaza_strip',
    tier: 'verified',
    relatedIncidentIds: ['pillar-of-defense-2012'],
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    tags: ['civilians', 'children', 'us-aid'],
  },
  {
    id: 'tl-al-samu-1966',
    year: '1966',
    era: '1948-1967',
    title: 'Al-Samu Raid Condemned by UN Security Council',
    description:
      'Israeli raid demolishes houses in as-Samu and kills dozens. UNSC Resolution 228 condemns the large-scale military action — a major pre-1967 escalation.',
    source: 'UN Security Council Resolution 228',
    sourceUrl: 'https://digitallibrary.un.org/record/90705',
    tier: 'verified',
    relatedIncidentIds: ['al-samu-1966'],
    tags: ['civilians', 'un-finding'],
  },
  {
    id: 'tl-land-day-1976',
    year: '1976',
    era: 'occupation-1967-2005',
    title: 'Land Day — Six Palestinian Citizens Killed',
    description:
      'Security forces kill six Palestinian citizens of Israel during protests against Galilee land expropriation. March 30 becomes an annual commemorative date.',
    source: 'Britannica / Adalah',
    sourceUrl: 'https://www.britannica.com/topic/Land-Day',
    tier: 'verified',
    relatedIncidentIds: ['land-day-1976'],
    tags: ['civilians', 'land', 'protest'],
  },
  {
    id: 'tl-litani-1978',
    year: '1978',
    era: 'occupation-1967-2005',
    title: 'Operation Litani — UNIFIL Created',
    description:
      'Israel invades southern Lebanon. Large civilian displacement and casualties prompt UNSC Resolutions 425/426 establishing UNIFIL.',
    source: 'UN Security Council Resolution 425',
    sourceUrl: 'https://digitallibrary.un.org/record/71821',
    tier: 'verified',
    relatedIncidentIds: ['operation-litani-1978'],
    tags: ['civilians', 'lebanon', 'un-finding'],
  },
  {
    id: 'tl-beirut-siege-1982',
    year: '1982',
    era: 'occupation-1967-2005',
    title: 'Siege of West Beirut — Civilian Bombardment',
    description:
      'Israeli siege and bombardment of West Beirut kills and displaces large numbers of civilians before PLO evacuation. Distinct from the later Sabra and Shatila camp massacre.',
    source: 'ICRC / UNISPAL 1982 war documentation',
    sourceUrl: 'https://www.un.org/unispal/',
    tier: 'verified',
    relatedIncidentIds: ['beirut-siege-1982', 'sabra-shatila-1982'],
    tags: ['civilians', 'children', 'lebanon'],
  },
  {
    id: 'tl-guardian-walls-2021',
    year: '2021',
    era: 'blockade-2007-2023',
    title: 'Guardian of the Walls — ~260 Killed in Gaza',
    description:
      'Eleven-day escalation. OCHA/monitor tallies ~260 Palestinians killed in Gaza and 13 in Israel. U.S. MOU aid and Iron Dome support continue.',
    source: 'OCHA / B\'Tselem',
    sourceUrl: 'https://www.ochaopt.org/',
    tier: 'verified',
    relatedIncidentIds: ['guardian-of-the-walls-2021'],
    relatedProfileIds: ['joe-biden', 'benjamin-netanyahu'],
    tags: ['civilians', 'children', 'us-aid'],
  },
  {
    id: 'tl-icj-provisional-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'ICJ Provisional Measures — South Africa v. Israel',
    description:
      'International Court of Justice orders provisional measures in the genocide case brought by South Africa, requiring Israel to prevent genocidal acts and enable humanitarian assistance. Not a final merits judgment.',
    source: 'International Court of Justice',
    sourceUrl: 'https://www.icj-cij.org/case/192',
    tier: 'verified',
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    tags: ['legal', 'icj'],
  },
  {
    id: 'tl-icc-warrants-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'ICC Arrest Warrants — Netanyahu and Gallant',
    description:
      'ICC Pre-Trial Chamber issues arrest warrants for Benjamin Netanyahu and Yoav Gallant for alleged war crimes and crimes against humanity related to the Gaza war, and for Hamas leaders regarding October 7. Warrants are allegations under the Rome Statute process, not final convictions.',
    source: 'International Criminal Court — Situation in the State of Palestine',
    sourceUrl: 'https://www.icc-cpi.int/palestine',
    tier: 'verified',
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant'],
    tags: ['legal', 'icc', 'war-crimes'],
  },
  {
    id: 'tl-summer-rains-2006',
    year: '2006',
    era: 'occupation-1967-2005',
    title: 'Operation Summer Rains — Gaza Offensive',
    description:
      'Months-long Gaza offensive after Shalit capture. Monitors document hundreds of Palestinian deaths and major civilian-infrastructure damage including power generation.',
    source: 'B\'Tselem / OCHA',
    sourceUrl: 'https://www.btselem.org/gaza_strip',
    tier: 'verified',
    relatedIncidentIds: ['summer-rains-2006', 'beit-hanoun-2006', 'operation-summer-rains-power-plant-2006'],
    tags: ['civilians', 'children', 'gaza'],
  },
  {
    id: 'tl-jenin-2023',
    year: '2023',
    era: 'blockade-2007-2023',
    title: 'Jenin Camp Raid (July 2023)',
    description:
      'Large multi-day IDF raid on Jenin camp months before October 7. Dozen-plus killed; widespread housing and infrastructure damage per OCHA/UNRWA.',
    source: 'OCHA / UNRWA',
    sourceUrl: 'https://www.ochaopt.org/',
    tier: 'verified',
    relatedIncidentIds: ['jenin-2023-july'],
    relatedProfileIds: ['joe-biden', 'benjamin-netanyahu'],
    tags: ['civilians', 'west-bank', 'us-aid'],
  },
  {
    id: 'tl-gaza-blockade-2007',
    year: '2007',
    era: 'blockade-2007-2023',
    title: 'Gaza Blockade Formalized',
    description:
      'After Hamas takes control of Gaza, Israel and Egypt formalize a comprehensive blockade. UN agencies document multi-year civilian access and goods restrictions.',
    source: 'OCHA / UNRWA',
    sourceUrl: 'https://www.ochaopt.org/',
    tier: 'verified',
    relatedIncidentIds: ['gaza-blockade-2007'],
    tags: ['blockade', 'civilians', 'structure'],
  },
  {
    id: 'tl-unsc-2334',
    year: '2016',
    era: 'blockade-2007-2023',
    title: 'UNSC Resolution 2334 — Settlements Illegal',
    description:
      'Security Council reaffirms that Israeli settlements in occupied territory have no legal validity and constitute a flagrant violation of international law. U.S. abstains under Obama.',
    source: 'UN Security Council Resolution 2334',
    sourceUrl: 'https://digitallibrary.un.org/record/853516',
    tier: 'verified',
    relatedIncidentIds: ['settlement-enterprise-pattern'],
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    tags: ['legal', 'settlements', 'un-finding'],
  },
  {
    id: 'tl-operation-rainbow-2004',
    year: '2004',
    era: 'occupation-1967-2005',
    title: 'Operation Rainbow — Rafah House Demolitions',
    description:
      'Major Rafah offensive. HRW documents mass home demolitions and civilian deaths in southern Gaza.',
    source: 'Human Rights Watch — Razing Rafah',
    sourceUrl: 'https://www.hrw.org/report/2004/10/17/razing-rafah/mass-home-demolitions-gaza-strip',
    tier: 'verified',
    relatedIncidentIds: ['operation-rainbow-2004'],
    tags: ['civilians', 'children', 'demolitions', 'gaza'],
  },
  {
    id: 'tl-gaza-disengagement-2005',
    year: '2005',
    era: 'occupation-1967-2005',
    title: 'Gaza Disengagement — Settlements Evacuated',
    description:
      'Israel removes settlements and bases from Gaza while retaining control of airspace, waters, and most crossings — the prelude architecture to the post-2007 blockade.',
    source: 'UNRWA / OCHA',
    sourceUrl: 'https://www.unrwa.org/where-we-work/gaza-strip',
    tier: 'verified',
    relatedIncidentIds: ['gaza-disengagement-2005', 'gaza-blockade-2007'],
    tags: ['gaza', 'structure', 'occupation'],
  },
  {
    id: 'tl-days-of-penitence-2004',
    year: '2004',
    era: 'occupation-1967-2005',
    title: 'Operation Days of Penitence — Northern Gaza',
    description:
      'Major northern Gaza offensive. Monitors record ~100+ Palestinian dead including many civilians; widespread housing destruction in Jabalia/Beit Hanoun area.',
    source: 'B\'Tselem / OCHA',
    sourceUrl: 'https://www.btselem.org/gaza_strip',
    tier: 'verified',
    relatedIncidentIds: ['days-of-penitence-2004'],
    tags: ['civilians', 'children', 'gaza'],
  },
  {
    id: 'tl-cave-patriarchs-1994',
    year: '1994',
    era: 'occupation-1967-2005',
    title: 'Cave of the Patriarchs Massacre',
    description:
      'Settler Baruch Goldstein kills 29 Palestinian worshippers in Hebron. Israeli investigation and international record confirm the civilian massacre.',
    source: 'Britannica / B\'Tselem',
    sourceUrl: 'https://www.britannica.com/event/Cave-of-the-Patriarchs-massacre',
    tier: 'verified',
    relatedIncidentIds: ['cave-of-patriarchs-1994'],
    tags: ['civilians', 'settler-violence', 'hebron'],
  },
  {
    id: 'tl-settler-violence-surge',
    year: '2021–2023',
    era: 'blockade-2007-2023',
    title: 'Settler Violence Surge Documented by OCHA/B\'Tselem',
    description:
      'Multi-year rise in settler attacks on Palestinian civilians and property across the West Bank. Pattern record separate from single-day Huwara rampage.',
    source: 'OCHA / B\'Tselem',
    sourceUrl: 'https://www.btselem.org/topic/settler_violence',
    tier: 'verified',
    relatedIncidentIds: ['settler-violence-pattern-2021-2023', 'huwara-2023'],
    relatedProfileIds: ['benjamin-netanyahu'],
    tags: ['civilians', 'settler-violence', 'west-bank', 'pattern-record'],
  },
  {
    id: 'tl-huwara-2023',
    year: '2023',
    era: 'blockade-2007-2023',
    title: 'Huwara Settler Rampage',
    description:
      'Settler mob burns homes and businesses in Huwara after nearby killings. One Palestinian dead; dozens wounded. OCHA/B\'Tselem document the rampage.',
    source: 'OCHA / B\'Tselem',
    sourceUrl: 'https://www.btselem.org/topic/settler_violence',
    tier: 'verified',
    relatedIncidentIds: ['huwara-2023'],
    relatedProfileIds: ['benjamin-netanyahu'],
    tags: ['civilians', 'settler-violence', 'west-bank'],
  },
  {
    id: 'tl-second-lebanon-2006',
    year: '2006',
    era: 'occupation-1967-2005',
    title: 'Second Lebanon War — ~1,000+ Lebanese Dead',
    description:
      '34-day war. HRW/Amnesty document majority-civilian Lebanese deaths and cluster-munition contamination. Distinct from the single Qana building strike entry.',
    source: 'Human Rights Watch / Amnesty',
    sourceUrl: 'https://www.hrw.org/report/2006/08/02/fatal-strikes/israels-indiscriminate-attacks-against-civilians-lebanon',
    tier: 'verified',
    relatedIncidentIds: ['second-lebanon-war-2006-pattern', 'qana-2006'],
    tags: ['civilians', 'children', 'lebanon', 'cluster-munitions'],
  },
  {
    id: 'tl-king-david-1946',
    year: '1946',
    era: 'mandate-1948',
    title: 'King David Hotel Bombing — 91 Killed',
    description:
      'Irgun bombs British Mandate HQ in the King David Hotel. 91 dead including British, Arab, and Jewish victims. Foundational Mandate-era atrocity with multi-source documentation.',
    source: 'Britannica / British Mandate archival record',
    sourceUrl: 'https://www.britannica.com/event/King-David-Hotel-bombing',
    tier: 'verified',
    relatedIncidentIds: ['king-david-hotel-1946'],
    tags: ['civilians', 'mandate', 'irgun'],
  },
  {
    id: 'tl-coastal-road-1978',
    year: '1978',
    era: 'occupation-1967-2005',
    title: 'Coastal Road Massacre — 38 Israeli Civilians',
    description:
      'Fatah bus hijacking/massacre on the Coastal Road kills 38 civilians including 13 children. Triggers Operation Litani.',
    source: 'Israeli MFA / UNSC 425 context',
    sourceUrl: 'https://digitallibrary.un.org/record/67123',
    tier: 'verified',
    relatedIncidentIds: ['coastal-road-massacre-1978', 'operation-litani-1978'],
    tags: ['civilians', 'children', 'israelis'],
  },
  {
    id: 'tl-netanya-passover-2002',
    year: '2002',
    era: 'occupation-1967-2005',
    title: 'Park Hotel Passover Massacre — Netanya',
    description:
      'Hamas suicide bombing at a Passover seder kills 30 civilians. Immediate prelude to Operation Defensive Shield.',
    source: 'Israeli MFA / Second Intifada record',
    sourceUrl: 'https://www.btselem.org/statistics',
    tier: 'verified',
    relatedIncidentIds: ['netanya-passover-massacre-2002', 'operation-defensive-shield-2002'],
    tags: ['civilians', 'children', 'second-intifada', 'hamas'],
  },
  {
    id: 'tl-dolphinarium-2001',
    year: '2001',
    era: 'occupation-1967-2005',
    title: 'Dolphinarium Discotheque Bombing — 21 Dead',
    description:
      'Hamas bombing outside a Tel Aviv youth discotheque kills 21, mostly teenagers. Multi-source civilian-targeting record.',
    source: 'Israeli MFA / B\'Tselem statistics',
    sourceUrl: 'https://www.btselem.org/statistics',
    tier: 'verified',
    relatedIncidentIds: ['dolphinarium-disco-2001'],
    tags: ['civilians', 'children', 'second-intifada', 'hamas'],
  },
  {
    id: 'tl-gaza-power-plant-2014',
    year: '2014',
    era: 'blockade-2007-2023',
    title: 'Gaza Power Plant Struck — Protective Edge',
    description:
      'Israeli strikes cripple Gaza\'s sole power plant, cascading into water, sewage, and hospital failures for the civilian population.',
    source: 'OCHA / Amnesty / OHCHR COI 2014',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-gaza-conflict/report-co-i-gaza',
    tier: 'verified',
    relatedIncidentIds: ['gaza-power-plant-2014', 'protective-edge-2014-children'],
    relatedProfileIds: ['barack-obama', 'benjamin-netanyahu'],
    tags: ['civilians', 'children', 'infrastructure', 'gaza'],
  },
  {
    id: 'tl-munich-1972',
    year: '1972',
    era: 'occupation-1967-2005',
    title: 'Munich Olympics Massacre — 11 Israeli Athletes Killed',
    description:
      'Black September hostage-taking at the Munich Olympics ends with eleven Israeli athletes dead. Multi-source official and historical record.',
    source: 'Britannica / Israeli MFA',
    sourceUrl: 'https://www.britannica.com/event/Munich-Massacre',
    tier: 'verified',
    relatedIncidentIds: ['munich-olympics-1972'],
    tags: ['civilians', 'israelis', 'terrorism'],
  },
  {
    id: 'tl-maalot-1974',
    year: '1974',
    era: 'occupation-1967-2005',
    title: 'Ma\'alot School Massacre — Children Hostages Killed',
    description:
      'DFLP school hostage crisis in Ma\'alot kills 25 hostages, mostly children. Multi-source civilian-child targeting record.',
    source: 'Israeli MFA historical record',
    sourceUrl: 'https://www.gov.il/en/departments/ministry_of_foreign_affairs',
    tier: 'verified',
    relatedIncidentIds: ['maalot-massacre-1974'],
    tags: ['civilians', 'children', 'israelis'],
  },
  {
    id: 'tl-kahan-1983',
    year: '1983',
    era: 'occupation-1967-2005',
    title: 'Kahan Commission — Indirect Responsibility for Sabra/Shatila',
    description:
      'Official Israeli commission finds indirect responsibility for Phalangist massacre; Sharon resigns as defense minister.',
    source: 'Kahan Commission Report',
    sourceUrl: 'https://www.jewishvirtuallibrary.org/the-kahan-commission-of-inquiry',
    tier: 'verified',
    relatedIncidentIds: ['sabra-shatila-kahan-1983', 'sabra-shatila-1982'],
    tags: ['civilians', 'children', 'official-commission', 'lebanon'],
  },

  {
    id: 'tl-gmr-snipers-2018',
    year: '2018',
    era: 'blockade-2007-2023',
    title: 'Great March of Return — UN COI Sniper Findings',
    description:
      'UN Commission of Inquiry finds reasonable grounds that Israeli snipers intentionally shot civilians during Gaza perimeter protests.',
    source: 'OHCHR COI',
    sourceUrl: 'https://www.ohchr.org/en/hr-bodies/hrc/co-i-opt/index',
    tier: 'verified',
    relatedIncidentIds: ['gaza-great-march-snipers-2018', 'great-march-return-2018', 'great-march-return-medics-2018'],
    relatedProfileIds: ['benjamin-netanyahu', 'donald-trump'],
    tags: ['civilians', 'children', 'un-finding', 'gaza'],
  },

  {
    id: 'tl-goldstone-wp-2009',
    year: '2009',
    era: 'blockade-2007-2023',
    title: 'Goldstone / HRW — White Phosphorus in Gaza Urban Areas',
    description:
      'UN fact-finding and HRW document white phosphorus use over populated Gaza during Cast Lead.',
    source: 'UNHRC Goldstone / HRW Rain of Fire',
    sourceUrl: 'https://www.hrw.org/report/2009/03/25/rain-fire/israels-unlawful-use-white-phosphorus-gaza',
    tier: 'verified',
    relatedIncidentIds: ['operation-cast-lead-white-phosphorus-un', 'cast-lead-2008-09', 'gaza-war-2008-white-phosphorus'],
    tags: ['civilians', 'children', 'white-phosphorus', 'un-finding'],
  },
  {
    id: 'tl-ipc-gaza-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'IPC / WFP — Catastrophic Hunger Classification Gaza',
    description:
      'IPC and WFP document catastrophic hunger risk in Gaza tied to conflict and constrained aid access.',
    source: 'IPC / WFP',
    sourceUrl: 'https://www.ipcinfo.org/',
    tier: 'verified',
    relatedIncidentIds: ['world-food-programme-gaza-starvation-2024', 'starvation-aid-blockade'],
    relatedProfileIds: ['benjamin-netanyahu', 'yoav-gallant', 'joe-biden'],
    tags: ['civilians', 'children', 'starvation', 'un-finding'],
  },

  {
    id: 'tl-beirut-barracks-1983',
    year: '1983',
    era: 'occupation-1967-2005',
    title: 'Beirut Marine Barracks Bombing — 241 U.S. Dead',
    description: 'Suicide truck bomb kills 241 U.S. Marines and 58 French paratroopers in Beirut.',
    source: 'USMC / Britannica',
    sourceUrl: 'https://www.britannica.com/event/1983-Beirut-barracks-bombings',
    tier: 'verified',
    relatedIncidentIds: ['beirut-barracks-1983', 'beirut-siege-1982'],
    tags: ['lebanon', 'us-personnel'],
  },
  {
    id: 'tl-lebanon-invasion-1982',
    year: '1982',
    era: 'occupation-1967-2005',
    title: 'Operation Peace for Galilee — Lebanon Invasion',
    description: 'Israeli invasion of Lebanon produces mass civilian displacement and casualties documented by UN/HR orgs.',
    source: 'UNISPAL / Britannica',
    sourceUrl: 'https://www.un.org/unispal/',
    tier: 'verified',
    relatedIncidentIds: ['operation-peace-for-galilee-1982-invasion', 'sabra-shatila-1982', 'beirut-siege-1982'],
    tags: ['civilians', 'children', 'lebanon'],
  },
  {
    id: 'tl-dahiya-doctrine-2006',
    year: '2006',
    era: 'blockade-2007-2023',
    title: 'Dahiya Doctrine — Disproportionate Force Concept',
    description: 'IDF officers articulate disproportionate-force doctrine after Beirut Dahiya destruction; cited in later campaign analysis.',
    source: 'HRW / UNISPAL',
    sourceUrl: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war',
    tier: 'verified',
    relatedIncidentIds: ['dahiya-doctrine-2006', 'second-lebanon-war-2006-pattern', 'qana-2006'],
    tags: ['civilians', 'infrastructure', 'doctrine'],
  },
  {
    id: 'tl-sbarro-2001',
    year: '2001',
    era: 'occupation-1967-2005',
    title: 'Sbarro Pizzeria Bombing — 15 Killed (7 Children)',
    description: 'Hamas suicide attack on Jerusalem restaurant during Second Intifada; multi-source death toll established.',
    source: 'MFA / Britannica',
    sourceUrl: 'https://www.britannica.com/topic/second-intifada',
    tier: 'verified',
    relatedIncidentIds: ['sbarro-restaurant-bombing-2001', 'second-intifada-civilian-toll', 'dolphinarium-disco-2001'],
    tags: ['civilians', 'children', 'terrorism'],
  },
  {
    id: 'tl-jenin-defensive-shield-depth-2002',
    year: '2002',
    era: 'occupation-1967-2005',
    title: 'Jenin Camp — Operation Defensive Shield Depth',
    description: 'UN/HRW multi-source documentation of camp battle deaths and destruction during Defensive Shield.',
    source: 'UN / HRW',
    sourceUrl: 'https://www.hrw.org/report/2002/05/02/jenin/idf-military-operations',
    tier: 'verified',
    relatedIncidentIds: ['operation-defensive-shield-jenin-2002-depth', 'jenin-2002', 'operation-defensive-shield-2002'],
    tags: ['civilians', 'children', 'west-bank'],
  },
  {
    id: 'tl-tel-al-sultan-rafah-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Tel al-Sultan Rafah Tent Camp Strike',
    description: 'Airstrike on displacement camp area kills dozens; multi-source civilian harm floor after ICJ Rafah order.',
    source: 'OHCHR / AP',
    sourceUrl: 'https://www.ohchr.org/en/countries/palestine',
    tier: 'verified',
    relatedIncidentIds: ['tel-al-sultan-rafah-2024', 'rafah-tent-camp-2024'],
    tags: ['civilians', 'children', 'rafah', 'displacement'],
  },
  {
    id: 'tl-nova-festival-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Nova Music Festival Massacre — October 7',
    description: 'Hundreds of civilians killed at outdoor music festival near Gaza border; multi-source festival-site death toll.',
    source: 'Israeli gov / Britannica',
    sourceUrl: 'https://www.britannica.com/event/October-7-attacks',
    tier: 'verified',
    relatedIncidentIds: ['october-7-nova-festival-2023', 'oct7-hamas-attack-2023'],
    tags: ['civilians', 'terrorism', 'october-7'],
  },
  {
    id: 'tl-beeri-october-7-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Kibbutz Be\'eri Massacre — October 7',
    description: 'More than 100 residents killed as militants overran the kibbutz; multi-source community death floor.',
    source: 'Israeli gov / Britannica',
    sourceUrl: 'https://www.britannica.com/event/October-7-attacks',
    tier: 'verified',
    relatedIncidentIds: ['kibbutz-beeri-october-7-2023', 'oct7-hamas-attack-2023', 'october-7-nova-festival-2023'],
    tags: ['civilians', 'children', 'terrorism', 'october-7'],
  },
  {
    id: 'tl-kfar-aza-october-7-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Kfar Aza Massacre — October 7',
    description: 'Dozens of civilians killed as militants overran the kibbutz; multi-source community death floor.',
    source: 'Israeli gov / Britannica',
    sourceUrl: 'https://www.britannica.com/event/October-7-attacks',
    tier: 'verified',
    relatedIncidentIds: ['kfar-aza-october-7-2023', 'kibbutz-beeri-october-7-2023', 'oct7-hamas-attack-2023'],
    tags: ['civilians', 'children', 'terrorism', 'october-7'],
  },
  {
    id: 'tl-taba-hilton-2004',
    year: '2004',
    era: 'occupation-1967-2005',
    title: 'Taba Hilton Bombing — Israeli Tourists Killed',
    description: 'Suicide car bomb at Taba Hilton kills dozens of mostly Israeli tourists; multi-source death toll.',
    source: 'Multi-source press / MFA',
    sourceUrl: 'https://www.un.org/unispal/',
    tier: 'verified',
    relatedIncidentIds: ['taba-hilton-bombing-2004'],
    tags: ['civilians', 'terrorism'],
  },

  {
    id: 'tl-gaza-us-aid-pier-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'U.S. Gaza Humanitarian Pier — Throughput Failure',
    description: 'High-visibility U.S. temporary pier delivers limited tonnage before suspensions; multi-source operational failure record.',
    source: 'DoD / multi-outlet',
    sourceUrl: 'https://www.defense.gov',
    tier: 'verified',
    relatedIncidentIds: ['gaza-us-aid-pier-2024', 'starvation-aid-blockade'],
    tags: ['aid', 'humanitarian', 'united-states'],
  },

  {
    id: 'tl-lebanon-pager-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Lebanon Pager Explosions — Mass Device Detonations',
    description: 'Coordinated pager/walkie explosions kill dozens, wound thousands; multi-source civilian harm floor.',
    source: 'Multi-outlet / OHCHR',
    sourceUrl: 'https://apnews.com',
    tier: 'verified',
    relatedIncidentIds: ['lebanon-pager-explosions-2024'],
    tags: ['civilians', 'children', 'lebanon', 'hezbollah'],
  },

  {
    id: 'tl-nasrallah-beirut-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Beirut Dahieh Strike — Nasrallah Killed',
    description: 'Israeli strikes kill Hezbollah leader; multi-source civilian harm in dense southern suburbs.',
    source: 'Multi-outlet / gov statements',
    sourceUrl: 'https://apnews.com',
    tier: 'verified',
    relatedIncidentIds: ['nasrallah-beirut-strike-2024', 'lebanon-pager-explosions-2024', 'dahiya-doctrine-2006'],
    tags: ['civilians', 'lebanon', 'hezbollah', 'leadership'],
  },

  {
    id: 'tl-iran-barrage-april-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Iran Missile/Drone Barrage — Mass Intercepts',
    description: 'Large Iranian barrage largely intercepted by Israeli and U.S. defenses; multi-source scale established.',
    source: 'IDF / DoD / multi-outlet',
    sourceUrl: 'https://www.defense.gov',
    tier: 'verified',
    relatedIncidentIds: ['iran-missile-barrage-april-2024'],
    tags: ['iran', 'air-defense', 'iron-dome'],
  },

  {
    id: 'tl-damascus-consulate-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Damascus Iranian Consular Annex Strike',
    description: 'Strike kills senior IRGC officers; cited by Iran as trigger for April barrage.',
    source: 'Multi-outlet',
    sourceUrl: 'https://apnews.com',
    tier: 'verified',
    relatedIncidentIds: ['damascus-iranian-consulate-2024', 'iran-missile-barrage-april-2024'],
    tags: ['syria', 'iran', 'irgc'],
  },

  {
    id: 'tl-houthi-red-sea-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Houthi Red Sea Shipping Attacks Begin',
    description: 'Houthi attacks on Red Sea shipping linked to Gaza war; U.S.-led naval response follows.',
    source: 'DoD / multi-outlet',
    sourceUrl: 'https://www.defense.gov',
    tier: 'verified',
    relatedIncidentIds: ['houthi-red-sea-campaign-2023-2025'],
    tags: ['yemen', 'red-sea', 'shipping', 'united-states'],
  },

  {
    id: 'tl-gaza-ground-invasion-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Ground Invasion Opens — Northern Campaign',
    description: 'Large-scale ground invasion of northern Gaza; multi-source mass displacement and civilian harm floor.',
    source: 'OCHA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-ground-invasion-oct-2023', 'oct7-hamas-attack-2023'],
    tags: ['civilians', 'children', 'gaza', 'invasion'],
  },

  {
    id: 'tl-lebanon-ground-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Israel Ground Offensive — Southern Lebanon',
    description: 'Ground operations against Hezbollah; multi-source mass Lebanese civilian displacement and casualties.',
    source: 'UNHCR / multi-outlet',
    sourceUrl: 'https://www.unhcr.org',
    tier: 'verified',
    relatedIncidentIds: ['israel-lebanon-ground-offensive-2024', 'nasrallah-beirut-strike-2024', 'lebanon-pager-explosions-2024'],
    tags: ['civilians', 'children', 'lebanon', 'hezbollah'],
  },

  {
    id: 'tl-gaza-evacuation-orders-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Mass Evacuation Orders — Gaza Displacement Pattern',
    description: 'Repeated IDF evacuation orders drive multi-source displacement of >1M into shrinking zones.',
    source: 'OCHA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-evacuation-orders-pattern-2023-2024', 'al-mawasi-safe-zone', 'rafah-tent-camp-2024'],
    tags: ['civilians', 'children', 'displacement', 'gaza'],
  },

  {
    id: 'tl-gaza-journalists-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Journalist Death Toll — Conflict High',
    description: 'CPJ/RSF multi-source tracking of 100+ media workers killed in Gaza war.',
    source: 'CPJ / RSF',
    sourceUrl: 'https://cpj.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-journalists-killed-pattern-2023-2025', 'shireen-abu-akleh-2022'],
    tags: ['journalists', 'civilians', 'gaza', 'press'],
  },

  {
    id: 'tl-oct7-hostages-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Hostages — ~250 Abducted to Gaza',
    description: 'Multi-source hostage lists establish mass abduction of civilians including children and elderly.',
    source: 'Israeli gov / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: ['oct7-hostages-held-pattern', 'oct7-hamas-attack-2023', 'nuseirat-rescue-2024'],
    tags: ['civilians', 'children', 'hostages', 'terrorism'],
  },

  {
    id: 'tl-settlement-surge-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settlement Surge — Post–Oct 7 Window',
    description: 'Accelerated settlement approvals and settler violence spike; multi-source Peace Now/OCHA tallies.',
    source: 'Peace Now / OCHA',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: ['west-bank-settlement-surge-2023-2025', 'settlement-enterprise-pattern', 'settler-violence-pattern-2021-2023'],
    tags: ['settlements', 'west-bank', 'civilians'],
  },

  {
    id: 'tl-gaza-children-killed-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Children Killed — Multi-Source Wartime Floor',
    description: 'Tens of thousands of child fatalities in multi-source UN/humanitarian tallies across the Gaza war.',
    source: 'UNICEF / OHCHR / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-children-killed-pattern-2023-2025'],
    tags: ['children', 'civilians', 'gaza', 'casualties'],
  },

  {
    id: 'tl-gaza-aid-workers-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Aid Workers Killed — Conflict High Floor',
    description: 'UN/NGO multi-source tallies of elevated aid-worker deaths including UNRWA and NGO personnel.',
    source: 'UNRWA / OHCHR',
    sourceUrl: 'https://www.unrwa.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-aid-workers-killed-pattern-2023-2025', 'wck-drone-strikes-2024', 'rafah-paramedic-convoy-2025', 'unrwa-staff-deaths'],
    tags: ['aid-workers', 'civilians', 'gaza', 'humanitarian'],
  },

  {
    id: 'tl-west-bank-arrests-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Mass Arrests — Detention Surge',
    description: 'Sharp post–Oct 7 surge in arrests and administrative detention; multi-source NGO/UN tallies.',
    source: "B'Tselem / OHCHR",
    sourceUrl: 'https://www.btselem.org',
    tier: 'verified',
    relatedIncidentIds: ['west-bank-mass-arrests-2023-2025'],
    tags: ['detention', 'west-bank', 'civilians', 'children'],
  },

  {
    id: 'tl-hostage-exchange-nov-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'November 2023 Hostage–Prisoner Exchange Pause',
    description: 'Multi-source exchange of hostages for Palestinian prisoners during temporary humanitarian pause.',
    source: 'Israeli gov / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: ['hostage-prisoner-exchange-nov-2023', 'oct7-hostages-held-pattern'],
    tags: ['hostages', 'prisoners', 'ceasefire'],
  },

  {
    id: 'tl-gaza-health-collapse-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Health System Collapse Pattern',
    description: 'WHO/multi-source documentation of hospital network degradation and medical-facility attacks.',
    source: 'WHO / OHCHR',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: ['gaza-health-system-collapse-2023-2025', 'al-shifa-hospital'],
    tags: ['health', 'hospitals', 'civilians', 'children'],
  },

  {
    id: 'tl-gaza-education-destroyed-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Education System Destruction Pattern',
    description: 'UNESCO/UNICEF multi-source school and university destruction across Gaza war.',
    source: 'UNESCO / UNICEF',
    sourceUrl: 'https://www.unesco.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-education-system-destroyed-2023-2025', 'gaza-universities-destroyed'],
    tags: ['education', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-heritage-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Cultural Heritage Destruction Pattern',
    description: 'UNESCO/multi-source documentation of mosque, church, museum, and historic site destruction.',
    source: 'UNESCO / multi-outlet',
    sourceUrl: 'https://www.unesco.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-cultural-heritage-destruction-2023-2025'],
    tags: ['heritage', 'culture', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-child-amputations-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Child Amputations — Medical Floor',
    description: 'UNICEF/WHO multi-source documentation of elevated pediatric amputations under health-system collapse.',
    source: 'UNICEF / WHO',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-amputations-children-pattern-2023-2025', 'gaza-health-system-collapse-2023-2025', 'gaza-children-killed-pattern-2023-2025'],
    tags: ['children', 'health', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-ipc-famine-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'IPC Famine-Risk Phases — Gaza Food Security Floor',
    description: 'IPC multi-partner assessments document catastrophic food insecurity phases across Gaza.',
    source: 'IPC / WFP / OCHA',
    sourceUrl: 'https://www.ipcinfo.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-starvation-ipc-phases-2024-2025', 'world-food-programme-gaza-starvation-2024', 'starvation-aid-blockade'],
    tags: ['starvation', 'famine', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-disabled-elderly-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Disabled & Elderly Civilian Harm Pattern',
    description: 'HRW/UN multi-source documentation of elevated risk and harm to disabled and elderly civilians.',
    source: 'HRW / OHCHR',
    sourceUrl: 'https://www.hrw.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-disabled-elderly-killed-pattern-2023-2025', 'gaza-evacuation-orders-pattern-2023-2024'],
    tags: ['disabled', 'elderly', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-child-trauma-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Child Mental Health Trauma Pattern',
    description: 'UNICEF/multi-source documentation of mass traumatic stress among Gaza children.',
    source: 'UNICEF / Save the Children',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-mental-health-trauma-children-pattern-2023-2025', 'gaza-children-killed-pattern-2023-2025'],
    tags: ['children', 'mental-health', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-wash-collapse-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Water & Sanitation Collapse Pattern',
    description: 'UNICEF/WHO multi-source documentation of WASH system collapse under siege and bombardment.',
    source: 'UNICEF / WHO / OCHA',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-water-sanitation-collapse-2023-2025', 'gaza-health-system-collapse-2023-2025'],
    tags: ['water', 'sanitation', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-housing-destruction-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Housing Stock Destruction Pattern',
    description: 'UNOSAT/World Bank multi-source majority residential damage across Gaza war.',
    source: 'UNOSAT / World Bank / OCHA',
    sourceUrl: 'https://unosat.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-housing-destruction-pattern-2023-2025', 'gaza-evacuation-orders-pattern-2023-2024'],
    tags: ['housing', 'displacement', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-orphans-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Orphan Crisis Pattern',
    description: 'UNICEF/multi-source documentation of large numbers of orphaned and unaccompanied children.',
    source: 'UNICEF / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-orphan-crisis-pattern-2023-2025', 'gaza-children-killed-pattern-2023-2025'],
    tags: ['children', 'orphans', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-women-killed-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Women Killed — Multi-Source Wartime Floor',
    description: 'UN Women/OHCHR multi-source documentation of large female civilian fatality share.',
    source: 'UN Women / OHCHR',
    sourceUrl: 'https://www.unwomen.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-women-killed-pattern-2023-2025', 'gaza-children-killed-pattern-2023-2025'],
    tags: ['women', 'civilians', 'gaza', 'casualties'],
  },

  {
    id: 'tl-gaza-maternal-harm-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Maternal & Neonatal Harm Pattern',
    description: 'UNFPA/UNICEF multi-source documentation of maternal care collapse and neonatal risk.',
    source: 'UNFPA / UNICEF / WHO',
    sourceUrl: 'https://www.unfpa.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-pregnant-maternal-harm-pattern-2023-2025', 'gaza-health-system-collapse-2023-2025', 'gaza-women-killed-pattern-2023-2025'],
    tags: ['women', 'maternal', 'children', 'health', 'gaza'],
  },

  {
    id: 'tl-gaza-reconstruction-cost-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza Reconstruction Cost Floor — Multi-Source Tallies',
    description: 'World Bank/UN multi-source multi-decade reconstruction cost floor from war damage.',
    source: 'World Bank / UN',
    sourceUrl: 'https://www.worldbank.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-reconstruction-cost-pattern-2024-2025', 'gaza-housing-destruction-pattern-2023-2025'],
    tags: ['reconstruction', 'economy', 'housing', 'gaza'],
  },

  {
    id: 'tl-unrwa-ban-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'UNRWA Funding Suspension & Ban Pattern',
    description: 'Multi-source donor suspensions and Israeli restrictions on UNRWA operations amid wartime aid need.',
    source: 'UNRWA / OCHA / multi-outlet',
    sourceUrl: 'https://www.unrwa.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-unrwa-ban-pattern-2024-2025', 'unrwa-staff-deaths', 'gaza-aid-workers-killed-pattern-2023-2025'],
    tags: ['unrwa', 'aid', 'humanitarian', 'gaza'],
  },

  {
    id: 'tl-gaza-fuel-electricity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Fuel & Electricity Siege Pattern',
    description: 'Multi-source documentation of energy cuts collapsing hospital, water, and bakery capacity.',
    source: 'OHCHR / WHO / OCHA',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-fuel-electricity-siege-pattern-2023-2025', 'gaza-health-system-collapse-2023-2025', 'gaza-water-sanitation-collapse-2023-2025'],
    tags: ['siege', 'fuel', 'electricity', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-food-system-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Bakeries & Food System Collapse Pattern',
    description: 'WFP/FAO multi-source documentation of market, bakery, and agricultural system collapse.',
    source: 'WFP / FAO / IPC',
    sourceUrl: 'https://www.wfp.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-bakeries-food-system-collapse-2023-2025', 'gaza-starvation-ipc-phases-2024-2025', 'gaza-fuel-electricity-siege-pattern-2023-2025'],
    tags: ['food', 'starvation', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-blackouts-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Telecommunications Blackouts Pattern',
    description: 'Multi-source documentation of repeated total/near-total communications blackouts during major operations.',
    source: 'NetBlocks / OCHA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-telecommunications-blackouts-pattern-2023-2025', 'gaza-fuel-electricity-siege-pattern-2023-2025'],
    tags: ['communications', 'blackout', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-cash-liquidity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Cash Liquidity & Banking Collapse Pattern',
    description: 'World Bank/OCHA multi-source documentation of cash shortages and banking paralysis.',
    source: 'World Bank / OCHA',
    sourceUrl: 'https://www.worldbank.org',
    tier: 'verified',
    relatedIncidentIds: ['gaza-cash-liquidity-banking-collapse-2023-2025', 'gaza-bakeries-food-system-collapse-2023-2025'],
    tags: ['economy', 'cash', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-polio-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza cVDPV2 Polio Outbreak — First in ~25 Years',
    description: 'WHO/GPEI multi-source confirmation of circulating vaccine-derived poliovirus type 2 and emergency nOPV2 campaigns under wartime access constraints.',
    source: 'WHO / GPEI / UNICEF',
    sourceUrl: 'https://www.who.int/news/item/04-09-2024-first-phase-of-polio-campaign-concludes-successfully-in-gaza',
    tier: 'verified',
    relatedIncidentIds: ['gaza-polio-outbreak-pattern-2024', 'gaza-water-sanitation-collapse-2023-2025', 'gaza-health-system-collapse-2023-2025'],
    tags: ['children', 'disease', 'health', 'polio', 'gaza'],
  },

  {
    id: 'tl-gaza-agriculture-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Agricultural Land Destruction Pattern',
    description: 'FAO/UNOSAT multi-source documentation of majority cropland, orchard, and greenhouse damage collapsing local food production.',
    source: 'FAO / UNOSAT / OCHA',
    sourceUrl: 'https://www.fao.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-agricultural-land-destruction-pattern-2023-2025',
      'gaza-bakeries-food-system-collapse-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
    ],
    tags: ['agriculture', 'food', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-civil-defense-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Civil Defense & Rescue Workers Killed Pattern',
    description: 'OCHA/multi-source documentation of elevated civil-defense and rescue-worker fatalities during rubble extrication operations.',
    source: 'OCHA / OHCHR / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-civil-defense-killed-pattern-2023-2025',
      'gaza-aid-workers-killed-pattern-2023-2025',
      'rafah-paramedic-convoy-2025',
    ],
    tags: ['civil-defense', 'rescue', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-mass-graves-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Hospital Grounds Mass Graves Pattern',
    description: 'OHCHR/WHO multi-source documentation of mass graves and unidentified remains at major hospital compounds after military operations.',
    source: 'OHCHR / WHO / multi-outlet',
    sourceUrl: 'https://www.ohchr.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-hospital-mass-graves-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'al-shifa-hospital',
    ],
    tags: ['hospitals', 'mass-graves', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-flotilla-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza Aid Flotilla Interceptions Pattern',
    description: 'Multi-source documentation of repeated Israeli naval interceptions of civilian activist/aid flotilla vessels during the war.',
    source: 'Multi-outlet / Israeli government / OCHA context',
    sourceUrl: 'https://apnews.com',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-freedom-flotilla-intercept-pattern-2024-2025',
      'mavi-marmara-2010',
      'gaza-blockade-2007',
    ],
    tags: ['blockade', 'flotilla', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-desalination-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Desalination & Water Infrastructure Pattern',
    description: 'UNICEF/WHO multi-source documentation of desalination and water-treatment capacity collapse under bombardment and fuel siege.',
    source: 'UNICEF / WHO / OCHA',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-desalination-water-infrastructure-pattern-2023-2025',
      'gaza-water-sanitation-collapse-2023-2025',
      'gaza-fuel-electricity-siege-pattern-2023-2025',
    ],
    tags: ['water', 'desalination', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-rubble-uxo-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Rubble & UXO Civilian Risk Pattern',
    description: 'UNEP/OCHA multi-source documentation of massive war debris and unexploded ordnance hazards for returning civilians and children.',
    source: 'UNEP / UNDP / OCHA',
    sourceUrl: 'https://www.unep.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-rubble-uxo-waste-pattern-2023-2025',
      'gaza-housing-destruction-pattern-2023-2025',
      'gaza-civil-defense-killed-pattern-2023-2025',
    ],
    tags: ['uxo', 'debris', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-cemetery-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Cemetery & Burial Ground Damage Pattern',
    description: 'Multi-source satellite and field reporting of cemetery damage and disrupted burial capacity during the war.',
    source: 'Multi-outlet / OCHA / OHCHR',
    sourceUrl: 'https://apnews.com',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-cemetery-destruction-pattern-2023-2025',
      'gaza-cultural-heritage-destruction-2023-2025',
      'gaza-housing-destruction-pattern-2023-2025',
    ],
    tags: ['cemetery', 'dignity', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-civil-registry-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Civil Registry & Public Records Destruction Pattern',
    description: 'Multi-source documentation of destroyed municipal/civil-registry infrastructure blocking identity and property documentation for displaced civilians.',
    source: 'OCHA / multi-outlet / UNESCO context',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-civil-registry-records-destruction-pattern-2023-2025',
      'gaza-housing-destruction-pattern-2023-2025',
      'gaza-cultural-heritage-destruction-2023-2025',
    ],
    tags: ['records', 'displacement', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-hezbollah-north-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Hezbollah Rocket Fire — Northern Israel Pattern',
    description: 'Multi-source documentation of sustained rocket/drone fire into northern Israel and mass civilian displacement after October 7.',
    source: 'Israeli government / multi-outlet / UNIFIL',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
      'oct7-hamas-attack-2023',
      'iran-missile-barrage-april-2024',
    ],
    tags: ['rockets', 'hezbollah', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-oct7-sexual-violence-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Conflict-Related Sexual Violence',
    description: 'UN SRSG multi-source findings of sexual violence during the October 7 multi-site attacks on Israeli civilians.',
    source: 'UN SRSG / multi-outlet / forensic materials',
    sourceUrl: 'https://www.un.org/sexualviolenceinconflict/',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-sexual-violence-pattern-2023',
      'oct7-hamas-attack-2023',
      'october-7-nova-festival-2023',
    ],
    tags: ['sexual-violence', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-israel-north-evac-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Northern Israel Mass Evacuation Pattern',
    description: 'Multi-source documentation of mass Israeli civilian evacuation from northern border communities under Hezbollah fire.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-northern-evacuation-pattern-2023-2025',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
    ],
    tags: ['displacement', 'civilians', 'children', 'israel', 'hezbollah'],
  },

  {
    id: 'tl-gaza-child-malnutrition-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Child Acute Malnutrition Pattern',
    description: 'UNICEF/WHO/IPC multi-source documentation of elevated acute malnutrition among Gaza children under wartime access constraints.',
    source: 'UNICEF / WHO / IPC',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-child-malnutrition-pattern-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
      'gaza-bakeries-food-system-collapse-2023-2025',
    ],
    tags: ['children', 'malnutrition', 'starvation', 'gaza'],
  },

  {
    id: 'tl-gaza-disease-surge-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Infectious Disease Surge Pattern',
    description: 'WHO/UNICEF multi-source documentation of multi-pathogen disease surges under WASH collapse and displacement.',
    source: 'WHO / UNICEF / OCHA',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-infectious-disease-surge-pattern-2023-2025',
      'gaza-water-sanitation-collapse-2023-2025',
      'gaza-polio-outbreak-pattern-2024',
    ],
    tags: ['disease', 'children', 'health', 'gaza'],
  },

  {
    id: 'tl-hostages-killed-captivity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Hostages Killed in Captivity Pattern',
    description: 'Multi-source documentation of civilian hostages killed while held in Gaza, distinct from abduction and exchange cards.',
    source: 'Israeli government / ICRC / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-hostages-killed-captivity-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'oct7-hamas-attack-2023',
    ],
    tags: ['hostages', 'civilians', 'children', 'terrorism'],
  },

  {
    id: 'tl-wb-children-killed-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Children Killed Pattern',
    description: 'OCHA/UNICEF multi-source documentation of elevated Palestinian child fatalities in the West Bank after October 7.',
    source: 'OCHA / UNICEF / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-children-killed-pattern-2023-2025',
      'west-bank-mass-arrests-2023-2025',
      'west-bank-settlement-surge-2023-2025',
    ],
    tags: ['children', 'west-bank', 'civilians'],
  },

  {
    id: 'tl-rafah-crossing-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Rafah Crossing Closure & Restricted Exit Pattern',
    description: 'OCHA/UNRWA multi-source documentation of prolonged Rafah crossing closures trapping civilians and limiting aid entry.',
    source: 'OCHA / UNRWA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-rafah-crossing-closure-pattern-2023-2025',
      'gaza-unrwa-ban-pattern-2024-2025',
      'rafah-tent-camp-2024',
    ],
    tags: ['siege', 'crossing', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-price-inflation-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Market Price Inflation & Scarcity Pattern',
    description: 'WFP/World Bank multi-source documentation of extreme wartime staple price inflation pricing civilians out of remaining goods.',
    source: 'WFP / World Bank / OCHA',
    sourceUrl: 'https://www.wfp.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-market-price-inflation-pattern-2023-2025',
      'gaza-cash-liquidity-banking-collapse-2023-2025',
      'gaza-bakeries-food-system-collapse-2023-2025',
    ],
    tags: ['economy', 'food', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-tent-flooding-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Displacement Camp Winter Flooding Pattern',
    description: 'OCHA/UNRWA multi-source documentation of recurrent winter flooding of tent camps sheltering displaced civilians and children.',
    source: 'OCHA / UNRWA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-winter-tent-flooding-pattern-2023-2025',
      'rafah-tent-camp-2024',
      'gaza-evacuation-orders-pattern-2023-2024',
    ],
    tags: ['displacement', 'shelter', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-mhpss-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza MHPSS System Collapse Pattern',
    description: 'WHO/UNICEF multi-source documentation of specialized mental-health and psychosocial support capacity collapse under wartime conditions.',
    source: 'WHO / UNICEF / OCHA',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-mhpss-system-collapse-pattern-2023-2025',
      'gaza-mental-health-trauma-children-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
    ],
    tags: ['mental-health', 'children', 'health', 'gaza'],
  },

  {
    id: 'tl-gaza-solar-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Solar & Distributed Power Destruction Pattern',
    description: 'Multi-source documentation of widespread destruction of rooftop/community solar arrays under siege conditions.',
    source: 'Multi-outlet / OCHA / World Bank context',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-solar-power-destruction-pattern-2023-2025',
      'gaza-fuel-electricity-siege-pattern-2023-2025',
      'gaza-telecommunications-blackouts-pattern-2023-2025',
    ],
    tags: ['energy', 'solar', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-rockets-israel-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Rocket Fire — Israeli Civilian Harm Pattern',
    description: 'Multi-source documentation of continued rocket/mortar fire from Gaza into Israeli civilian areas after October 7.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-rockets-israeli-civilian-harm-pattern-2023-2025',
      'oct7-hamas-attack-2023',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
    ],
    tags: ['rockets', 'civilians', 'children', 'israel', 'gaza'],
  },

  {
    id: 'tl-gaza-sewage-flood-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Sewage Flooding & Contaminated Water Pattern',
    description: 'UNICEF/WHO multi-source documentation of sewage flooding into streets and shelters after treatment/pumping failures.',
    source: 'UNICEF / WHO / OCHA',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-sewage-flooding-disease-pattern-2023-2025',
      'gaza-water-sanitation-collapse-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
    ],
    tags: ['sewage', 'water', 'children', 'disease', 'gaza'],
  },

  {
    id: 'tl-gaza-assistive-devices-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Assistive Devices & Mobility Collapse Pattern',
    description: 'WHO multi-source documentation of mass loss/destruction of wheelchairs and other assistive devices under bombardment and displacement.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-assistive-devices-destroyed-pattern-2023-2025',
      'gaza-disabled-elderly-killed-pattern-2023-2025',
      'gaza-amputations-children-pattern-2023-2025',
    ],
    tags: ['disability', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-fishing-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Fishing Fleet & Livelihood Destruction Pattern',
    description: 'FAO/OCHA multi-source documentation of destroyed fishing boats and near-total suspension of coastal fishing under wartime restrictions.',
    source: 'FAO / OCHA / multi-outlet',
    sourceUrl: 'https://www.fao.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-fishing-fleet-destruction-pattern-2023-2025',
      'gaza-agricultural-land-destruction-pattern-2023-2025',
      'gaza-blockade-2007',
    ],
    tags: ['livelihood', 'food', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-wb-demolitions-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Home Demolitions & Displacement Pattern',
    description: "OCHA/B'Tselem multi-source documentation of elevated home demolitions and family displacement after October 7.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-home-demolitions-pattern-2023-2025',
      'west-bank-settlement-surge-2023-2025',
      'west-bank-children-killed-pattern-2023-2025',
    ],
    tags: ['demolition', 'displacement', 'children', 'west-bank'],
  },

  {
    id: 'tl-oct7-children-killed-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Israeli Children Killed Pattern',
    description: 'Multi-source documentation of Israeli children killed during the October 7 multi-site civilian assault.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-children-killed-pattern-2023',
      'oct7-hamas-attack-2023',
      'october-7-nova-festival-2023',
    ],
    tags: ['children', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-icu-nicu-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza ICU & Neonatal Capacity Collapse Pattern',
    description: 'WHO multi-source documentation of near-total ICU/NICU capacity collapse under bombardment and fuel/power cuts.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-icu-neonatal-capacity-collapse-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'gaza-pregnant-maternal-harm-pattern-2023-2025',
    ],
    tags: ['icu', 'neonatal', 'children', 'health', 'gaza'],
  },

  {
    id: 'tl-gaza-dialysis-cancer-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Dialysis & Cancer Care Collapse Pattern',
    description: 'WHO multi-source documentation of collapsed dialysis and oncology pathways under wartime facility and supply constraints.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-dialysis-cancer-care-collapse-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'gaza-icu-neonatal-capacity-collapse-pattern-2023-2025',
    ],
    tags: ['dialysis', 'cancer', 'health', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-medicines-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Pharmacy & Essential Medicine Shortage Pattern',
    description: 'WHO multi-source documentation of essential-medicine stockouts under siege and bombardment.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-pharmacy-medicine-shortage-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'gaza-dialysis-cancer-care-collapse-pattern-2023-2025',
    ],
    tags: ['medicines', 'health', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-blood-bank-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Blood Bank & Transfusion Collapse Pattern',
    description: 'WHO multi-source documentation of blood banking and transfusion capacity collapse under wartime conditions.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-blood-bank-collapse-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'gaza-amputations-children-pattern-2023-2025',
    ],
    tags: ['blood', 'trauma', 'health', 'children', 'gaza'],
  },

  {
    id: 'tl-israel-civilian-injuries-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Civilian Injuries from Rocket Fire Pattern',
    description: 'Multi-source documentation of Israeli civilian injuries from rocket/drone fire after October 7 across southern and northern fronts.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-civilian-injured-rockets-pattern-2023-2025',
      'gaza-rockets-israeli-civilian-harm-pattern-2023-2025',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
    ],
    tags: ['injuries', 'rockets', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-gaza-ambulance-access-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Ambulance Access Denial Pattern',
    description: 'WHO/PRCS multi-source documentation of repeated denial or delay of ambulance access to wounded civilians.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-ambulance-access-denial-pattern-2023-2025',
      'rafah-paramedic-convoy-2025',
      'gaza-civil-defense-killed-pattern-2023-2025',
    ],
    tags: ['ambulance', 'medical', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-family-annihilation-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Entire-Family Killed Pattern',
    description: 'OCHA/Airwars multi-source documentation of incidents killing entire extended families including multiple children.',
    source: 'OCHA / Airwars / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-family-annihilation-pattern-2023-2025',
      'gaza-children-killed-pattern-2023-2025',
      'gaza-housing-destruction-pattern-2023-2025',
    ],
    tags: ['families', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-universities-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Universities Total Destruction Pattern',
    description: 'UNESCO multi-source documentation of destruction or severe damage to all Gaza universities.',
    source: 'UNESCO / multi-outlet / OCHA',
    sourceUrl: 'https://www.unesco.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-universities-total-destruction-pattern-2023-2025',
      'gaza-education-system-destroyed-2023-2025',
      'gaza-cultural-heritage-destruction-2023-2025',
    ],
    tags: ['universities', 'education', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-worship-sites-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Mosques & Churches Destruction Pattern',
    description: 'UNESCO multi-source documentation of destruction or severe damage to mosques and churches, often used as civilian shelters.',
    source: 'UNESCO / multi-outlet / OCHA',
    sourceUrl: 'https://www.unesco.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-mosques-churches-destruction-pattern-2023-2025',
      'gaza-cultural-heritage-destruction-2023-2025',
      'gaza-education-system-destroyed-2023-2025',
    ],
    tags: ['worship', 'heritage', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-iran-proxy-drones-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Iranian & Proxy Drone Attacks on Israel Pattern',
    description: 'Multi-source documentation of repeated Iranian and proxy drone attack waves into Israeli airspace after October 7.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'iran-proxy-drones-israel-pattern-2023-2025',
      'iran-missile-barrage-april-2024',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
    ],
    tags: ['drones', 'iran', 'civilians', 'israel'],
  },

  {
    id: 'tl-gaza-flour-mills-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Flour Mills & Food Production Facilities Pattern',
    description: 'WFP multi-source documentation of destroyed/disabled flour mills collapsing local bread-flour supply.',
    source: 'WFP / OCHA / multi-outlet',
    sourceUrl: 'https://www.wfp.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-flour-mills-destruction-pattern-2023-2025',
      'gaza-bakeries-food-system-collapse-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
    ],
    tags: ['food', 'mills', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-livestock-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Livestock & Poultry Herd Collapse Pattern',
    description: 'FAO multi-source documentation of mass livestock/poultry loss collapsing animal-protein production.',
    source: 'FAO / OCHA / multi-outlet',
    sourceUrl: 'https://www.fao.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-livestock-poultry-destruction-pattern-2023-2025',
      'gaza-agricultural-land-destruction-pattern-2023-2025',
      'gaza-fishing-fleet-destruction-pattern-2023-2025',
    ],
    tags: ['livestock', 'food', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-cold-chain-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Cold-Chain & Routine Immunization Collapse Pattern',
    description: 'UNICEF/WHO multi-source documentation of cold-chain failure and disrupted childhood vaccination schedules.',
    source: 'UNICEF / WHO / OCHA',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-cold-chain-vaccine-collapse-pattern-2023-2025',
      'gaza-polio-outbreak-pattern-2024',
      'gaza-fuel-electricity-siege-pattern-2023-2025',
    ],
    tags: ['vaccines', 'children', 'health', 'gaza'],
  },

  {
    id: 'tl-hostages-medical-neglect-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Hostages Denied Adequate Medical Care Pattern',
    description: 'Multi-source documentation of inadequate medical care for civilian hostages held in Gaza.',
    source: 'ICRC / Israeli government / multi-outlet',
    sourceUrl: 'https://www.icrc.org',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-hostages-medical-neglect-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'oct7-hostages-killed-captivity-pattern-2023-2025',
    ],
    tags: ['hostages', 'medical', 'civilians', 'children', 'terrorism'],
  },

  {
    id: 'tl-gaza-solid-waste-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Solid Waste Collection Collapse Pattern',
    description: 'UNEP multi-source documentation of municipal solid-waste collection collapse driving disease risk in streets and camps.',
    source: 'UNEP / UNDP / OCHA',
    sourceUrl: 'https://www.unep.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-waste-collection-collapse-pattern-2023-2025',
      'gaza-sewage-flooding-disease-pattern-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
    ],
    tags: ['waste', 'disease', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-sar-equipment-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Search-and-Rescue Equipment Destruction Pattern',
    description: 'Multi-source documentation of destroyed fire trucks, excavators, and SAR gear needed to free civilians from rubble.',
    source: 'OCHA / multi-outlet / OHCHR',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-search-rescue-equipment-destroyed-pattern-2023-2025',
      'gaza-civil-defense-killed-pattern-2023-2025',
      'gaza-rubble-uxo-waste-pattern-2023-2025',
    ],
    tags: ['sar', 'civil-defense', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-media-offices-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Media Offices Destruction Pattern',
    description: 'CPJ/RSF multi-source documentation of destroyed media offices and press infrastructure concurrent with journalist deaths.',
    source: 'CPJ / RSF / multi-outlet',
    sourceUrl: 'https://cpj.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-media-offices-destruction-pattern-2023-2025',
      'gaza-journalists-killed-pattern-2023-2025',
      'gaza-telecommunications-blackouts-pattern-2023-2025',
    ],
    tags: ['media', 'press', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-greenhouses-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Greenhouses & Irrigation Destruction Pattern',
    description: 'FAO multi-source documentation of destroyed greenhouses and irrigation systems collapsing vegetable production.',
    source: 'FAO / UNOSAT / OCHA',
    sourceUrl: 'https://www.fao.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-greenhouses-irrigation-destruction-pattern-2023-2025',
      'gaza-agricultural-land-destruction-pattern-2023-2025',
      'gaza-livestock-poultry-destruction-pattern-2023-2025',
    ],
    tags: ['agriculture', 'greenhouses', 'food', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-olives-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Olive Groves & Perennial Crop Destruction Pattern',
    description: 'FAO multi-source documentation of mass destruction of olive groves and perennial orchards.',
    source: 'FAO / UNOSAT / OCHA',
    sourceUrl: 'https://www.fao.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-olive-groves-destruction-pattern-2023-2025',
      'gaza-agricultural-land-destruction-pattern-2023-2025',
      'gaza-greenhouses-irrigation-destruction-pattern-2023-2025',
    ],
    tags: ['olives', 'agriculture', 'livelihood', 'children', 'gaza'],
  },

  {
    id: 'tl-wb-olive-harvest-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Olive Harvest Violence & Access Denial Pattern',
    description: "OCHA/B'Tselem multi-source documentation of elevated harvest-season violence and access denials after October 7.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-olive-harvest-violence-pattern-2023-2025',
      'settler-violence-pattern-2021-2023',
      'west-bank-settlement-surge-2023-2025',
    ],
    tags: ['olives', 'settler-violence', 'livelihood', 'west-bank'],
  },

  {
    id: 'tl-oct7-elderly-killed-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Israeli Elderly Killed Pattern',
    description: 'Multi-source documentation of elderly Israeli civilians killed during the October 7 multi-site assault.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-elderly-killed-pattern-2023',
      'oct7-hamas-attack-2023',
      'oct7-children-killed-pattern-2023',
    ],
    tags: ['elderly', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-banks-atms-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Banks & ATM Infrastructure Destruction Pattern',
    description: 'World Bank multi-source documentation of destroyed/disabled bank branches and ATMs collapsing formal cash access.',
    source: 'World Bank / OCHA / multi-outlet',
    sourceUrl: 'https://www.worldbank.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-banks-atms-destroyed-pattern-2023-2025',
      'gaza-cash-liquidity-banking-collapse-2023-2025',
      'gaza-market-price-inflation-pattern-2023-2025',
    ],
    tags: ['banking', 'cash', 'civilians', 'economy', 'gaza'],
  },

  {
    id: 'tl-gaza-burial-access-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Funeral & Burial Access Denial Pattern',
    description: 'OCHA multi-source documentation of disrupted funerals and formal burials under bombardment and cemetery damage.',
    source: 'OCHA / multi-outlet / OHCHR',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-funeral-burial-access-denial-pattern-2023-2025',
      'gaza-cemetery-destruction-pattern-2023-2025',
      'gaza-hospital-mass-graves-pattern-2023-2025',
    ],
    tags: ['burial', 'dignity', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-roads-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Road Network & Corridor Destruction Pattern',
    description: 'UNOSAT/OCHA multi-source documentation of cratered roads and destroyed corridors blocking civilian and aid movement.',
    source: 'UNOSAT / OCHA / multi-outlet',
    sourceUrl: 'https://unosat.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-road-network-destruction-pattern-2023-2025',
      'gaza-ambulance-access-denial-pattern-2023-2025',
      'gaza-evacuation-orders-pattern-2023-2024',
    ],
    tags: ['roads', 'access', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-fuel-depots-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Fuel Depots & Storage Destruction Pattern',
    description: 'Multi-source documentation of destroyed fuel depots collapsing remaining civilian fuel stocks for hospitals and water systems.',
    source: 'OCHA / multi-outlet / World Bank context',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-fuel-depots-destruction-pattern-2023-2025',
      'gaza-fuel-electricity-siege-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
    ],
    tags: ['fuel', 'energy', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-wheat-silos-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Wheat Silos & Grain Storage Destruction Pattern',
    description: 'WFP multi-source documentation of destroyed wheat silos and grain warehouses collapsing strategic food stocks.',
    source: 'WFP / OCHA / multi-outlet',
    sourceUrl: 'https://www.wfp.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-wheat-silos-storage-destruction-pattern-2023-2025',
      'gaza-flour-mills-destruction-pattern-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
    ],
    tags: ['food', 'storage', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-aid-chaos-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Aid Convoy Looting & Crowd-Crush Chaos Pattern',
    description: 'OCHA/WFP multi-source documentation of recurrent deadly looting and crush events at aid distribution points under scarcity.',
    source: 'OCHA / WFP / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-aid-convoy-looting-chaos-pattern-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
      'gaza-aid-workers-killed-pattern-2023-2025',
    ],
    tags: ['aid', 'distribution', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-hostages-children-elderly-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Child & Elderly Hostages Pattern',
    description: 'Multi-source documentation of Israeli children and elderly civilians held hostage after October 7.',
    source: 'Israeli government / ICRC / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-hostages-children-elderly-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'oct7-hamas-attack-2023',
    ],
    tags: ['hostages', 'children', 'elderly', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-school-shelters-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Schools Used as Shelters Struck Pattern',
    description: 'UNRWA/OCHA multi-source documentation of repeated strikes on schools serving as civilian shelters.',
    source: 'UNRWA / OCHA / multi-outlet',
    sourceUrl: 'https://www.unrwa.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-schools-shelters-struck-pattern-2023-2025',
      'gaza-education-system-destroyed-2023-2025',
      'gaza-children-killed-pattern-2023-2025',
    ],
    tags: ['schools', 'shelters', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-wells-aquifer-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Water Wells & Aquifer Contamination Pattern',
    description: 'UNICEF/UNEP multi-source documentation of damaged wells and contaminated groundwater under wartime WASH collapse.',
    source: 'UNICEF / UNEP / OCHA',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-water-wells-aquifers-contamination-pattern-2023-2025',
      'gaza-water-sanitation-collapse-2023-2025',
      'gaza-desalination-water-infrastructure-pattern-2023-2025',
    ],
    tags: ['water', 'wells', 'children', 'disease', 'gaza'],
  },

  {
    id: 'tl-iron-dome-intercepts-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Missile Defense Intercepts Pattern',
    description: 'Multi-source documentation of continuous Iron Dome and related intercepts protecting Israeli civilian areas after October 7.',
    source: 'Israeli government / multi-outlet / CRS',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-missile-defense-intercepts-civilian-protection-pattern-2023-2025',
      'gaza-rockets-israeli-civilian-harm-pattern-2023-2025',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
    ],
    tags: ['missile-defense', 'civilians', 'israel', 'iron-dome'],
  },

  {
    id: 'tl-gaza-hospital-evacuations-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Hospital Forced Evacuations Pattern',
    description: 'WHO/MSF multi-source documentation of repeated forced evacuations of functioning hospitals under siege and military operations.',
    source: 'WHO / MSF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-hospital-forced-evacuations-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'gaza-icu-neonatal-capacity-collapse-pattern-2023-2025',
    ],
    tags: ['hospitals', 'evacuation', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-medical-oxygen-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Medical Oxygen & Gas Collapse Pattern',
    description: 'WHO/UNICEF multi-source documentation of medical-oxygen and medical-gas shortages collapsing critical care capacity.',
    source: 'WHO / UNICEF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-medical-oxygen-gas-collapse-pattern-2023-2025',
      'gaza-fuel-electricity-siege-pattern-2023-2025',
      'gaza-icu-neonatal-capacity-collapse-pattern-2023-2025',
    ],
    tags: ['oxygen', 'health', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-sde-teiman-detention-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Sde Teiman Wartime Detention Abuse Pattern',
    description: 'Multi-source documentation of serious detainee abuse and deaths in custody at Sde Teiman and related wartime detention facilities.',
    source: 'Israeli multi-outlet / OHCHR / multi-outlet',
    sourceUrl: 'https://www.ohchr.org',
    tier: 'verified',
    relatedIncidentIds: [
      'sde-teiman-detainee-abuse-pattern-2023-2025',
      'west-bank-mass-arrests-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['detention', 'abuse', 'accountability', 'civilians'],
  },

  {
    id: 'tl-israel-mamad-shelters-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Civilian Mamad & Shelter Use Pattern',
    description: 'Multi-source documentation of continuous Israeli civilian safe-room and public-shelter use under rocket and drone fire.',
    source: 'Home Front Command / multi-outlet',
    sourceUrl: 'https://www.oref.org.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-civilian-mamad-shelter-use-pattern-2023-2025',
      'gaza-rockets-israeli-civilian-harm-pattern-2023-2025',
      'israel-missile-defense-intercepts-civilian-protection-pattern-2023-2025',
    ],
    tags: ['shelters', 'mamad', 'civilians', 'israel'],
  },

  {
    id: 'tl-gaza-philadelphi-buffer-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Philadelphi Corridor & Buffer Displacement Pattern',
    description: 'OCHA/UNOSAT multi-source documentation of buffer-zone clearing and civilian displacement along the Philadelphi corridor.',
    source: 'OCHA / UNOSAT / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-philadelphi-buffer-zone-displacement-pattern-2023-2025',
      'gaza-housing-destruction-pattern-2023-2025',
      'gaza-evacuation-orders-pattern-2023-2024',
    ],
    tags: ['displacement', 'buffer-zone', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-kerem-erez-crossings-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Kerem Shalom & Erez Crossing Access Pattern',
    description: 'OCHA/COGAT multi-source documentation of prolonged closures and severe throughput constraints at Israel–Gaza crossings.',
    source: 'OCHA / COGAT / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-kerem-shalom-erez-crossing-access-pattern-2023-2025',
      'gaza-rafah-crossing-closure-pattern-2023-2025',
      'starvation-aid-blockade',
    ],
    tags: ['crossings', 'access', 'aid', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-netzarim-corridor-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Netzarim Corridor Displacement Pattern',
    description: 'OCHA/UNOSAT multi-source documentation of military corridor control bisecting Gaza with large-scale civilian displacement.',
    source: 'OCHA / UNOSAT / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-netzarim-corridor-displacement-pattern-2023-2025',
      'gaza-philadelphi-buffer-zone-displacement-pattern-2023-2025',
      'gaza-housing-destruction-pattern-2023-2025',
    ],
    tags: ['displacement', 'corridor', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-tunnel-seawater-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Tunnel Seawater Flooding Pattern',
    description: 'Multi-source documentation of IDF seawater pumping into tunnel networks with documented coastal-aquifer risk debate.',
    source: 'Israeli government / multi-outlet / UNEP context',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-tunnel-seawater-flooding-pattern-2023-2025',
      'gaza-water-wells-aquifers-contamination-pattern-2023-2025',
      'gaza-desalination-water-infrastructure-pattern-2023-2025',
    ],
    tags: ['tunnels', 'water', 'environment', 'civilians', 'gaza'],
  },

  {
    id: 'tl-oct7-forensic-id-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Forensic Body Identification Pattern',
    description: 'Multi-source documentation of prolonged DNA and forensic identification of civilian remains from the October 7 multi-site assault.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-forensic-body-identification-pattern-2023-2025',
      'oct7-hamas-attack-2023',
      'oct7-children-killed-pattern-2023',
    ],
    tags: ['forensics', 'civilians', 'children', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-admin-detention-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Administrative Detention Surge Pattern',
    description: "B'Tselem/Addameer multi-source documentation of elevated renewable detention without charge or trial after October 7.",
    source: "B'Tselem / Addameer / multi-outlet",
    sourceUrl: 'https://www.btselem.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-administrative-detention-surge-pattern-2023-2025',
      'west-bank-mass-arrests-2023-2025',
      'sde-teiman-detainee-abuse-pattern-2023-2025',
    ],
    tags: ['detention', 'administrative', 'children', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-mortuary-id-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Mortuary & Body-Identification Collapse Pattern',
    description: 'WHO/OCHA multi-source documentation of collapsed morgue capacity and mass unidentified burials under bombardment.',
    source: 'WHO / OCHA / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-mortuary-identification-collapse-pattern-2023-2025',
      'gaza-hospital-mass-graves-pattern-2023-2025',
      'gaza-funeral-burial-access-denial-pattern-2023-2025',
    ],
    tags: ['mortuary', 'identification', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-wb-herding-bedouin-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Herding & Bedouin Dispossession Pattern',
    description: "OCHA/B'Tselem multi-source documentation of accelerated herding and Bedouin community displacement after October 7.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-herding-bedouin-dispossession-pattern-2023-2025',
      'west-bank-home-demolitions-pattern-2023-2025',
      'settler-violence-pattern-2021-2023',
    ],
    tags: ['herding', 'bedouin', 'displacement', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-airdrops-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza Humanitarian Airdrops Pattern',
    description: 'U.S./Jordan multi-source documentation of repeated food airdrops under ground-access failure with limited tonnage relative to need.',
    source: 'U.S. Defense / OCHA / multi-outlet',
    sourceUrl: 'https://www.defense.gov',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-humanitarian-airdrops-pattern-2023-2025',
      'gaza-us-aid-pier-2024',
      'starvation-aid-blockade',
    ],
    tags: ['aid', 'airdrops', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-hostages-bodies-held-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Hostage Bodies Held Pattern',
    description: 'Multi-source documentation of prolonged retention of deceased Israeli civilian hostage remains in Gaza.',
    source: 'Israeli government / ICRC / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-hostages-bodies-not-returned-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'oct7-hostages-killed-captivity-pattern-2023-2025',
    ],
    tags: ['hostages', 'bodies', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-lebanon-civilian-harm-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Lebanon 2024 War Civilian Harm Pattern',
    description: 'OCHA multi-source documentation of large-scale civilian death and displacement in Lebanon during the 2024 Israel–Hezbollah war.',
    source: 'OCHA Lebanon / multi-outlet',
    sourceUrl: 'https://www.unocha.org',
    tier: 'verified',
    relatedIncidentIds: [
      'lebanon-civilian-harm-2024-war-pattern',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
      'israel-lebanon-ground-offensive-2024',
    ],
    tags: ['lebanon', 'civilians', 'children', 'displacement', 'war'],
  },

  {
    id: 'tl-gaza-field-hospitals-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Field Hospitals Pattern',
    description: 'WHO/MSF multi-source documentation of field hospitals and temporary medical points after fixed hospital capacity collapsed.',
    source: 'WHO / MSF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-field-hospitals-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
      'gaza-hospital-forced-evacuations-pattern-2023-2025',
    ],
    tags: ['hospitals', 'field-hospitals', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-uxo-children-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza UXO Child Casualties Pattern',
    description: 'UNICEF/UNMAS multi-source documentation of children killed and maimed by unexploded ordnance in rubble fields.',
    source: 'UNICEF / UNMAS / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-uxo-child-casualties-pattern-2023-2025',
      'gaza-rubble-uxo-waste-pattern-2023-2025',
      'gaza-children-killed-pattern-2023-2025',
    ],
    tags: ['uxo', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-heat-tents-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza Summer Heat Tent Harm Pattern',
    description: 'OCHA/UNICEF multi-source documentation of extreme heat and dehydration risk among tent-displaced civilians.',
    source: 'OCHA / UNICEF / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-summer-heat-tent-harm-pattern-2023-2025',
      'gaza-winter-tent-flooding-pattern-2023-2025',
      'gaza-evacuation-orders-pattern-2023-2024',
    ],
    tags: ['heat', 'tents', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-families-advocacy-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostage Families Advocacy Pattern',
    description: 'Multi-source documentation of continuous civilian advocacy by families of hostages held in Gaza.',
    source: 'Israeli multi-outlet / multi-outlet',
    sourceUrl: 'https://www.haaretz.com',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-families-advocacy-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'oct7-hostages-bodies-not-returned-pattern-2023-2025',
    ],
    tags: ['hostages', 'families', 'civilians', 'israel'],
  },

  {
    id: 'tl-gaza-red-crescent-ems-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Red Crescent EMS Harm Pattern',
    description: 'PRCS/OCHA multi-source documentation of repeated harm to Red Crescent ambulance and EMS teams.',
    source: 'PRCS / OCHA / multi-outlet',
    sourceUrl: 'https://www.palestinercs.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-red-crescent-ems-harm-pattern-2023-2025',
      'gaza-ambulance-access-denial-pattern-2023-2025',
      'rafah-paramedic-convoy-2025',
    ],
    tags: ['ems', 'red-crescent', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-wb-checkpoints-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Checkpoint Movement Restriction Pattern',
    description: "OCHA/B'Tselem multi-source documentation of elevated checkpoints and civilian movement delays after October 7.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-checkpoint-movement-restriction-pattern-2023-2025',
      'west-bank-mass-arrests-2023-2025',
      'west-bank-children-killed-pattern-2023-2025',
    ],
    tags: ['checkpoints', 'movement', 'civilians', 'children', 'west-bank'],
  },

  {
    id: 'tl-gaza-icrc-access-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza ICRC Access Denial Pattern',
    description: 'ICRC multi-source documentation of repeated denials and constraints on access to hostages, detainees, and civilian sites.',
    source: 'ICRC / multi-outlet',
    sourceUrl: 'https://www.icrc.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-icrc-access-denial-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'sde-teiman-detainee-abuse-pattern-2023-2025',
    ],
    tags: ['icrc', 'access', 'hostages', 'civilians'],
  },

  {
    id: 'tl-gaza-msf-facilities-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza MSF Facility Harm Pattern',
    description: 'MSF/WHO multi-source documentation of strikes and forced evacuations at medical-NGO facilities.',
    source: 'MSF / WHO / multi-outlet',
    sourceUrl: 'https://www.msf.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-msf-facility-harm-pattern-2023-2025',
      'gaza-field-hospitals-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
    ],
    tags: ['msf', 'hospitals', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-israel-northern-towns-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Northern Border Town Rocket Harm Pattern',
    description: 'Multi-source documentation of sustained rocket and drone fire on northern Israeli border towns including Kiryat Shmona.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-northern-border-town-rocket-pattern-2023-2025',
      'hezbollah-rockets-northern-israel-pattern-2023-2025',
      'israel-northern-evacuation-pattern-2023-2025',
    ],
    tags: ['rockets', 'northern-israel', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-gaza-port-fishery-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Port & Fishery Blockade Pattern',
    description: 'OCHA/FAO multi-source documentation of total or near-total closure of Gaza fishing access after October 7.',
    source: 'OCHA / FAO / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-port-fishery-blockade-pattern-2023-2025',
      'gaza-fishing-fleet-destruction-pattern-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
    ],
    tags: ['fishery', 'port', 'food', 'civilians', 'gaza'],
  },

  {
    id: 'tl-oct7-dual-nationals-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Dual-National Civilians Killed Pattern',
    description: 'Multi-source documentation of dual-national civilians killed during the October 7 multi-site assault.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'oct7-dual-national-civilians-killed-pattern-2023',
      'oct7-hamas-attack-2023',
      'october-7-nova-festival-2023',
    ],
    tags: ['dual-nationals', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-journalist-families-2023',
    year: '2023',
    era: 'post-oct7',
    title: "Gaza Journalists' Family Members Killed Pattern",
    description: 'CPJ multi-source documentation of repeated killings of journalists\' family members including children.',
    source: 'CPJ / UNESCO / multi-outlet',
    sourceUrl: 'https://cpj.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-journalists-family-members-killed-pattern-2023-2025',
      'gaza-journalists-killed-pattern-2023-2025',
      'gaza-children-killed-pattern-2023-2025',
    ],
    tags: ['journalists', 'families', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-tunnel-captivity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Tunnel Captivity Pattern',
    description: 'Multi-source documentation of prolonged captivity of Israeli civilians in underground tunnel networks.',
    source: 'Israeli government / multi-outlet / ICRC',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-tunnel-captivity-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'oct7-hostages-medical-neglect-pattern-2023-2025',
    ],
    tags: ['hostages', 'tunnels', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-gaza-education-collapse-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Education & Remote Learning Collapse Pattern',
    description: 'UNICEF/UNESCO multi-source documentation of near-total schooling collapse under bombardment and displacement.',
    source: 'UNICEF / UNESCO / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-education-remote-learning-collapse-pattern-2023-2025',
      'gaza-education-system-destroyed-2023-2025',
      'gaza-schools-shelters-struck-pattern-2023-2025',
    ],
    tags: ['education', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-wb-outpost-legalization-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settler Outpost Legalization Pattern',
    description: "Peace Now/B'Tselem multi-source documentation of accelerated outpost legalization after October 7.",
    source: "Peace Now / B'Tselem / multi-outlet",
    sourceUrl: 'https://peacenow.org.il',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-settler-outpost-legalization-pattern-2023-2025',
      'west-bank-settlement-surge-2023-2025',
      'west-bank-herding-bedouin-dispossession-pattern-2023-2025',
    ],
    tags: ['settlements', 'outposts', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-water-trucking-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Water Trucking Dependence Pattern',
    description: 'UNICEF/OCHA multi-source documentation of civilian dependence on scarce water trucking after piped systems collapsed.',
    source: 'UNICEF / OCHA / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-water-trucking-dependence-pattern-2023-2025',
      'gaza-water-sanitation-collapse-2023-2025',
      'gaza-water-wells-aquifers-contamination-pattern-2023-2025',
    ],
    tags: ['water', 'trucking', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-release-waves-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostage Release Deal Waves Pattern',
    description: 'Multi-source documentation of multi-wave hostage release deals returning Israeli civilians from Gaza captivity.',
    source: 'Israeli government / multi-outlet / ICRC',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-release-deal-waves-pattern-2023-2025',
      'hostage-prisoner-exchange-nov-2023',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'releases', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-unrwa-staff-detention-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza UNRWA Staff Detention Pattern',
    description: 'Multi-source documentation of UNRWA staff detentions and contested allegation processes after October 7.',
    source: 'UNRWA / Israeli government / multi-outlet',
    sourceUrl: 'https://www.unrwa.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-unrwa-staff-detention-pattern-2023-2025',
      'gaza-unrwa-ban-pattern-2024-2025',
      'unrwa-staff-deaths',
    ],
    tags: ['unrwa', 'detention', 'accountability', 'gaza'],
  },

  {
    id: 'tl-israel-siren-fatigue-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Civil Defense Siren Fatigue Pattern',
    description: 'Multi-source documentation of high-frequency rocket and drone sirens disrupting civilian life including schools.',
    source: 'Home Front Command / multi-outlet',
    sourceUrl: 'https://www.oref.org.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-civil-defense-siren-fatigue-pattern-2023-2025',
      'israel-civilian-mamad-shelter-use-pattern-2023-2025',
      'gaza-rockets-israeli-civilian-harm-pattern-2023-2025',
    ],
    tags: ['sirens', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-gaza-cash-crisis-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Cash Crisis Pattern',
    description: 'World Bank/OCHA multi-source documentation of acute cash liquidity collapse under wartime banking failure.',
    source: 'World Bank / OCHA / multi-outlet',
    sourceUrl: 'https://www.worldbank.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-cash-crisis-aid-worker-payments-pattern-2023-2025',
      'gaza-banks-atms-destroyed-pattern-2023-2025',
      'gaza-cash-liquidity-banking-collapse-2023-2025',
    ],
    tags: ['cash', 'banking', 'civilians', 'economy', 'gaza'],
  },

  {
    id: 'tl-wb-jenin-tulkarm-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Jenin & Tulkarm Raid Surge Pattern',
    description: 'OCHA multi-source documentation of intensified military raids in Jenin and Tulkarm camps after October 7.',
    source: 'OCHA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-jenin-tulkarm-raid-pattern-2023-2025',
      'west-bank-children-killed-pattern-2023-2025',
      'west-bank-mass-arrests-2023-2025',
    ],
    tags: ['jenin', 'tulkarm', 'raids', 'children', 'west-bank'],
  },

  {
    id: 'tl-hostages-crsv-captivity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Sexual Violence in Captivity Pattern',
    description: 'UN SRSG multi-source documentation of conflict-related sexual violence against hostages during captivity in Gaza.',
    source: 'UN SRSG / multi-outlet',
    sourceUrl: 'https://www.un.org',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-sexual-violence-captivity-pattern-2023-2025',
      'oct7-sexual-violence-pattern-2023',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'crsv', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-amputee-rehab-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Amputee Children Rehabilitation Collapse Pattern',
    description: 'UNICEF/WHO multi-source documentation of child amputees under collapsed prosthetic and rehab capacity.',
    source: 'UNICEF / WHO / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-amputee-children-rehab-collapse-pattern-2023-2025',
      'gaza-amputations-children-pattern-2023-2025',
      'gaza-assistive-devices-destroyed-pattern-2023-2025',
    ],
    tags: ['amputees', 'children', 'rehab', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-aid-site-killings-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza Aid Distribution Site Killings Pattern',
    description: 'OCHA/OHCHR multi-source documentation of repeated lethal incidents at aid distribution points and convoys.',
    source: 'OCHA / OHCHR / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-aid-distribution-site-killings-pattern-2023-2025',
      'flour-massacre-2024',
      'gaza-aid-convoy-looting-chaos-pattern-2023-2025',
    ],
    tags: ['aid', 'killings', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-oct7-foreign-workers-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Thai & Nepali Foreign Workers Pattern',
    description: 'Multi-source documentation of Thai and Nepali agricultural workers killed or abducted on October 7.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-thai-nepali-foreign-workers-killed-pattern-2023',
      'oct7-hamas-attack-2023',
      'oct7-dual-national-civilians-killed-pattern-2023',
    ],
    tags: ['foreign-workers', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-orphan-care-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Orphaned Children Care-System Collapse Pattern',
    description: 'UNICEF/UNRWA multi-source documentation of orphaned and separated children under collapsed formal care systems.',
    source: 'UNICEF / UNRWA / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-children-orphaned-care-system-pattern-2023-2025',
      'gaza-orphan-crisis-pattern-2023-2025',
      'gaza-children-killed-pattern-2023-2025',
    ],
    tags: ['orphans', 'children', 'care', 'gaza'],
  },

  {
    id: 'tl-israel-northern-economy-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Northern Evacuated-Community Economic Collapse Pattern',
    description: 'Multi-source documentation of multi-month economic collapse in evacuated northern Israeli communities.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-evacuated-northern-business-collapse-pattern-2023-2025',
      'israel-northern-evacuation-pattern-2023-2025',
      'israel-northern-border-town-rocket-pattern-2023-2025',
    ],
    tags: ['economy', 'evacuation', 'civilians', 'israel'],
  },

  {
    id: 'tl-wb-price-tag-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Price-Tag Settler Violence Pattern',
    description: "OCHA/B'Tselem multi-source documentation of elevated price-tag settler attacks after October 7.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-price-tag-violence-pattern-2023-2025',
      'settler-violence-pattern-2021-2023',
      'west-bank-olive-harvest-violence-pattern-2023-2025',
    ],
    tags: ['price-tag', 'settlers', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-generator-fuel-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Hospital Generator Fuel Rationing Pattern',
    description: 'WHO/MSF multi-source documentation of hospital generator fuel rationing endangering ICU and neonatal care.',
    source: 'WHO / MSF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-generator-fuel-hospital-rationing-pattern-2023-2025',
      'gaza-medical-oxygen-gas-collapse-pattern-2023-2025',
      'gaza-fuel-electricity-siege-pattern-2023-2025',
    ],
    tags: ['fuel', 'hospitals', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-returnee-trauma-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Released Hostages Psychological Trauma Pattern',
    description: 'Multi-source documentation of severe psychological trauma among released Israeli hostages including children.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-psychological-trauma-returnees-pattern-2023-2025',
      'israel-hostages-release-deal-waves-pattern-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'trauma', 'civilians', 'children', 'israel'],
  },

  {
    id: 'tl-gaza-false-safety-zones-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Designated Humanitarian Zones False-Safety Pattern',
    description: 'OCHA/OHCHR multi-source documentation of civilian deaths inside or near designated safer/humanitarian zones.',
    source: 'OCHA / OHCHR / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-humanitarian-zones-false-safety-pattern-2023-2025',
      'al-mawasi-safe-zone',
      'gaza-evacuation-orders-pattern-2023-2024',
    ],
    tags: ['safe-zones', 'displacement', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-hostages-starvation-captivity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Starvation in Captivity Pattern',
    description: 'Multi-source documentation of severe malnutrition among Israeli civilian hostages in Gaza captivity.',
    source: 'Israeli government / multi-outlet / ICRC',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-starvation-captivity-pattern-2023-2025',
      'oct7-hostages-medical-neglect-pattern-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'starvation', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-school-raids-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank School Raids & Education Disruption Pattern',
    description: 'UNICEF/OCHA multi-source documentation of elevated school raids and education disruption for West Bank children.',
    source: 'UNICEF / OCHA / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-school-raids-closure-pattern-2023-2025',
      'west-bank-children-killed-pattern-2023-2025',
      'west-bank-checkpoint-movement-restriction-pattern-2023-2025',
    ],
    tags: ['schools', 'children', 'education', 'west-bank'],
  },

  {
    id: 'tl-gaza-maternity-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Maternity Wards Collapse Pattern',
    description: 'UNFPA/WHO multi-source documentation of safe maternity care collapse under bombardment and hospital evacuation.',
    source: 'UNFPA / WHO / multi-outlet',
    sourceUrl: 'https://www.unfpa.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-maternity-wards-collapse-pattern-2023-2025',
      'gaza-pregnant-maternal-harm-pattern-2023-2025',
      'gaza-icu-neonatal-capacity-collapse-pattern-2023-2025',
    ],
    tags: ['maternity', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-child-returnees-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Child Hostages Returned Trauma Pattern',
    description: 'Multi-source documentation of severe trauma among Israeli children released from Gaza captivity.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-children-returned-trauma-pattern-2023-2025',
      'israel-hostages-psychological-trauma-returnees-pattern-2023-2025',
      'oct7-hostages-children-elderly-pattern-2023-2025',
    ],
    tags: ['hostages', 'children', 'trauma', 'israel'],
  },

  {
    id: 'tl-gaza-waste-vectors-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Solid Waste Disease-Vector Pattern',
    description: 'UNEP/UNICEF multi-source documentation of uncollected waste breeding disease vectors under collection collapse.',
    source: 'UNEP / UNICEF / multi-outlet',
    sourceUrl: 'https://www.unep.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-solid-waste-disease-vector-pattern-2023-2025',
      'gaza-waste-collection-collapse-pattern-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
    ],
    tags: ['waste', 'disease', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-elderly-medical-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Elderly Hostages Medical Captivity Pattern',
    description: 'Multi-source documentation of acute medical crises among elderly Israeli civilian hostages in Gaza.',
    source: 'Israeli government / multi-outlet / ICRC',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-elderly-medical-captivity-pattern-2023-2025',
      'oct7-hostages-medical-neglect-pattern-2023-2025',
      'oct7-hostages-children-elderly-pattern-2023-2025',
    ],
    tags: ['hostages', 'elderly', 'medical', 'israel'],
  },

  {
    id: 'tl-gaza-disability-care-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Disability Care Collapse Pattern',
    description: 'HI/UNICEF multi-source documentation of disability care and assistive-service collapse under war.',
    source: 'HI / UNICEF / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-disability-care-collapse-pattern-2023-2025',
      'gaza-assistive-devices-destroyed-pattern-2023-2025',
      'gaza-amputee-children-rehab-collapse-pattern-2023-2025',
    ],
    tags: ['disability', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-wb-night-raids-children-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Night Raids Affecting Children Pattern',
    description: 'UNICEF multi-source documentation of elevated night military raids into homes with children present.',
    source: 'UNICEF / Save the Children / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-night-raids-children-pattern-2023-2025',
      'west-bank-mass-arrests-2023-2025',
      'west-bank-children-killed-pattern-2023-2025',
    ],
    tags: ['raids', 'children', 'night', 'west-bank'],
  },

  {
    id: 'tl-gaza-child-anemia-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Children Anemia & Micronutrient Pattern',
    description: 'UNICEF/WHO multi-source documentation of elevated childhood anemia and micronutrient deficiency under wartime diet collapse.',
    source: 'UNICEF / WHO / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-children-anemia-micronutrient-pattern-2023-2025',
      'gaza-child-malnutrition-pattern-2023-2025',
      'gaza-starvation-ipc-phases-2024-2025',
    ],
    tags: ['anemia', 'children', 'nutrition', 'gaza'],
  },

  {
    id: 'tl-oct7-first-responders-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'October 7 Israeli First Responders Killed Pattern',
    description: 'Multi-source documentation of police, MDA medics, and firefighters killed responding to the October 7 assault.',
    source: 'Israeli government / MDA / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-oct7-first-responders-killed-pattern-2023',
      'oct7-hamas-attack-2023',
      'gaza-civil-defense-killed-pattern-2023-2025',
    ],
    tags: ['first-responders', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-gaza-surgical-blood-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Surgical Blood Transfusion Collapse Pattern',
    description: 'WHO/PRCS multi-source documentation of blood banking and transfusion capacity collapse for trauma surgery.',
    source: 'WHO / PRCS / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-blood-transfusion-collapse-deep-pattern-2023-2025',
      'gaza-blood-bank-collapse-pattern-2023-2025',
      'gaza-health-system-collapse-2023-2025',
    ],
    tags: ['blood', 'surgery', 'civilians', 'children', 'gaza'],
  },

  {
    id: 'tl-gaza-psych-meds-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Psychotropic Meds Shortage Pattern',
    description: 'WHO/UNICEF multi-source documentation of psychotropic and chronic mental-health medication shortages under siege.',
    source: 'WHO / UNICEF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-psychotropic-meds-shortage-pattern-2023-2025',
      'gaza-mhpss-system-collapse-pattern-2023-2025',
      'gaza-pharmacy-medicine-shortage-pattern-2023-2025',
    ],
    tags: ['mental-health', 'meds', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-family-uncertainty-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostage Family Notification Uncertainty Pattern',
    description: 'Multi-source documentation of prolonged status uncertainty and notification delays for hostage families.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-family-notification-delays-pattern-2023-2025',
      'israel-hostages-families-advocacy-pattern-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'families', 'civilians', 'israel'],
  },

  {
    id: 'tl-gaza-debris-removal-2024',
    year: '2024',
    era: 'post-oct7',
    title: 'Gaza Reconstruction Debris-Removal Block Pattern',
    description: 'World Bank/UNEP multi-source documentation of rubble volumes blocking return and reconstruction.',
    source: 'World Bank / UNEP / multi-outlet',
    sourceUrl: 'https://www.worldbank.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-reconstruction-debris-removal-block-pattern-2024-2025',
      'gaza-rubble-uxo-waste-pattern-2023-2025',
      'gaza-reconstruction-cost-pattern-2024-2025',
    ],
    tags: ['rubble', 'reconstruction', 'civilians', 'gaza'],
  },

  {
    id: 'tl-gaza-toxic-rubble-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Children Toxic Rubble Exposure Pattern',
    description: 'UNEP/UNICEF multi-source documentation of lead and toxic dust exposure risk for children in rubble environments.',
    source: 'UNEP / UNICEF / multi-outlet',
    sourceUrl: 'https://www.unep.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-children-lead-exposure-rubble-pattern-2023-2025',
      'gaza-rubble-uxo-waste-pattern-2023-2025',
      'gaza-uxo-child-casualties-pattern-2023-2025',
    ],
    tags: ['toxic', 'rubble', 'children', 'gaza'],
  },

  {
    id: 'tl-hostages-comms-blackout-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Communication Blackout Pattern',
    description: 'Multi-source documentation of prolonged communication blackout and denied family contact for civilian hostages.',
    source: 'ICRC / Israeli government / multi-outlet',
    sourceUrl: 'https://www.icrc.org',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-communication-blackout-pattern-2023-2025',
      'gaza-icrc-access-denial-pattern-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'isolation', 'civilians', 'israel'],
  },

  {
    id: 'tl-wb-settler-roadblocks-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settler Roadblocks Pattern',
    description: "OCHA/B'Tselem multi-source documentation of elevated settler roadblocks denying civilian route access.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-settler-road-blocks-pattern-2023-2025',
      'west-bank-checkpoint-movement-restriction-pattern-2023-2025',
      'west-bank-price-tag-violence-pattern-2023-2025',
    ],
    tags: ['roadblocks', 'settlers', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-child-stunting-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Children Stunting Risk Pattern',
    description: 'UNICEF/WHO multi-source documentation of elevated stunting and developmental-harm risk under wartime malnutrition.',
    source: 'UNICEF / WHO / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-children-stunting-risk-pattern-2023-2025',
      'gaza-children-anemia-micronutrient-pattern-2023-2025',
      'gaza-child-malnutrition-pattern-2023-2025',
    ],
    tags: ['stunting', 'children', 'nutrition', 'gaza'],
  },

  {
    id: 'tl-hostages-propaganda-videos-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Forced Propaganda Videos Pattern',
    description: 'Multi-source documentation of forced filmed statements and propaganda videos of civilian hostages including children.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-forced-propaganda-videos-pattern-2023-2025',
      'oct7-hostages-held-pattern',
      'israel-hostages-communication-blackout-pattern-2023-2025',
    ],
    tags: ['hostages', 'propaganda', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-settlement-roads-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settlement Access Roads Expansion Pattern',
    description: "Peace Now/B'Tselem multi-source documentation of accelerated settlement access-road construction after October 7.",
    source: "Peace Now / B'Tselem / multi-outlet",
    sourceUrl: 'https://peacenow.org.il',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-settlement-outpost-roads-pattern-2023-2025',
      'west-bank-settler-outpost-legalization-pattern-2023-2025',
      'west-bank-settlement-surge-2023-2025',
    ],
    tags: ['settlements', 'roads', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-child-awd-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Children Acute Watery Diarrhea Surge Pattern',
    description: 'UNICEF/WHO multi-source documentation of massive pediatric AWD surges under contaminated water and sewage failure.',
    source: 'UNICEF / WHO / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-children-acute-watery-diarrhea-pattern-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
      'gaza-sewage-flooding-disease-pattern-2023-2025',
    ],
    tags: ['diarrhea', 'children', 'disease', 'gaza'],
  },

  {
    id: 'tl-hostages-solitary-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Solitary Isolation Pattern',
    description: 'Multi-source documentation of prolonged solitary confinement of Israeli civilian hostages including children.',
    source: 'Multi-outlet / Israeli government',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-solitary-confinement-pattern-2023-2025',
      'israel-hostages-tunnel-captivity-pattern-2023-2025',
      'israel-hostages-communication-blackout-pattern-2023-2025',
    ],
    tags: ['hostages', 'solitary', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-worker-mobility-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Worker Mobility Shutdown Pattern',
    description: 'OCHA/ILO multi-source documentation of collapsed work-permit access into Israel after October 7.',
    source: 'OCHA / ILO / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-palestinian-citizen-israel-mobility-pattern-2023-2025',
      'west-bank-checkpoint-movement-restriction-pattern-2023-2025',
      'gaza-cash-crisis-aid-worker-payments-pattern-2023-2025',
    ],
    tags: ['labor', 'permits', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-scabies-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Scabies & Crowding Skin-Disease Pattern',
    description: 'WHO/UNICEF multi-source documentation of scabies and crowding skin-disease surges in displacement shelters.',
    source: 'WHO / UNICEF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-scabies-skin-disease-pattern-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
      'gaza-winter-tent-flooding-pattern-2023-2025',
    ],
    tags: ['scabies', 'disease', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-chronic-meds-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Denied Chronic Medications Pattern',
    description: 'Multi-source documentation of denial or interruption of chronic medications for civilian hostages.',
    source: 'Israeli government / multi-outlet / ICRC',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-denied-medications-chronic-pattern-2023-2025',
      'oct7-hostages-medical-neglect-pattern-2023-2025',
      'israel-hostages-elderly-medical-captivity-pattern-2023-2025',
    ],
    tags: ['hostages', 'medications', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-ag-takeover-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settler Agricultural Land Takeover Pattern',
    description: 'OCHA multi-source documentation of accelerated settler seizure of Palestinian agricultural land after October 7.',
    source: 'OCHA / multi-outlet',
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-settler-agricultural-takeover-pattern-2023-2025',
      'west-bank-herding-bedouin-dispossession-pattern-2023-2025',
      'gaza-olive-groves-destruction-pattern-2023-2025',
    ],
    tags: ['agriculture', 'settlers', 'civilians', 'west-bank'],
  },

  {
    id: 'tl-gaza-hepatitis-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Hepatitis & Jaundice Surge Pattern',
    description: 'WHO/UNICEF multi-source documentation of hepatitis A and jaundice surges under collapsed WASH.',
    source: 'WHO / UNICEF / multi-outlet',
    sourceUrl: 'https://www.who.int',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-hepatitis-jaundice-pattern-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
      'gaza-polio-outbreak-pattern-2024',
    ],
    tags: ['hepatitis', 'disease', 'children', 'civilians', 'gaza'],
  },

  {
    id: 'tl-hostages-physical-abuse-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Physical Abuse Pattern',
    description: 'Multi-source documentation of physical abuse of Israeli civilian hostages during captivity.',
    source: 'Israeli government / multi-outlet',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-physical-abuse-captivity-pattern-2023-2025',
      'israel-hostages-sexual-violence-captivity-pattern-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'abuse', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-grazing-outposts-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settler Grazing Outposts Pattern',
    description: 'Peace Now/OCHA multi-source documentation of rapid grazing-outpost expansion after October 7.',
    source: 'Peace Now / OCHA / multi-outlet',
    sourceUrl: 'https://peacenow.org.il',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-settler-grazing-outposts-pattern-2023-2025',
      'west-bank-herding-bedouin-dispossession-pattern-2023-2025',
      'west-bank-settler-outpost-legalization-pattern-2023-2025',
    ],
    tags: ['grazing', 'outposts', 'settlers', 'west-bank'],
  },

  {
    id: 'tl-gaza-child-respiratory-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Gaza Children Respiratory Infection Surge Pattern',
    description: 'UNICEF/WHO multi-source documentation of pediatric respiratory infection surges under overcrowding and collapsed care.',
    source: 'UNICEF / WHO / multi-outlet',
    sourceUrl: 'https://www.unicef.org',
    tier: 'verified',
    relatedIncidentIds: [
      'gaza-children-respiratory-infections-pattern-2023-2025',
      'gaza-infectious-disease-surge-pattern-2023-2025',
      'gaza-winter-tent-flooding-pattern-2023-2025',
    ],
    tags: ['respiratory', 'children', 'disease', 'gaza'],
  },

  {
    id: 'tl-hostages-witness-killings-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'Israeli Hostages Forced to Witness Killings Pattern',
    description: 'Multi-source documentation of civilian hostages forced to witness killings during abduction and captivity.',
    source: 'Multi-outlet / Israeli government',
    sourceUrl: 'https://www.gov.il',
    tier: 'verified',
    relatedIncidentIds: [
      'israel-hostages-witnessing-killings-pattern-2023-2025',
      'israel-hostages-physical-abuse-captivity-pattern-2023-2025',
      'oct7-hostages-held-pattern',
    ],
    tags: ['hostages', 'coercion', 'civilians', 'terrorism', 'israel'],
  },

  {
    id: 'tl-wb-settler-home-invasions-2023',
    year: '2023',
    era: 'post-oct7',
    title: 'West Bank Settler Home Invasions Pattern',
    description: "OCHA/B'Tselem multi-source documentation of elevated settler home invasions after October 7.",
    source: "OCHA / B'Tselem / multi-outlet",
    sourceUrl: 'https://www.ochaopt.org',
    tier: 'verified',
    relatedIncidentIds: [
      'west-bank-settler-home-invasions-pattern-2023-2025',
      'west-bank-price-tag-violence-pattern-2023-2025',
      'west-bank-night-raids-children-pattern-2023-2025',
    ],
    tags: ['settlers', 'homes', 'civilians', 'children', 'west-bank'],
  },





































































































]

export const ISRAEL_DOSSIER_ERA_META: Record<
  DossierEra,
  { label: string; range: string; description: string }
> = {
  'mandate-1948': {
    label: 'Mandate → 1948 War',
    range: '1917–1949',
    description: 'British Mandate, partition, war, and mass displacement (Nakba).',
  },
  '1948-1967': {
    label: 'Armistice period',
    range: '1949–1967',
    description: 'Cross-border raids, martial law over Palestinian citizens, and pre-occupation violence.',
  },
  'occupation-1967-2005': {
    label: 'Occupation era',
    range: '1967–2005',
    description: 'Military occupation of West Bank, Gaza, Golan; Lebanon invasions; intifadas.',
  },
  'blockade-2007-2023': {
    label: 'Blockade & wars on Gaza',
    range: '2007–Oct 2023',
    description: 'Gaza blockade, repeated military operations, settlement expansion, protest killings.',
  },
  'post-oct7': {
    label: 'Post–October 7',
    range: 'Oct 2023–present',
    description: 'October 7 attack and the subsequent Gaza war with record civilian tolls.',
  },
}
