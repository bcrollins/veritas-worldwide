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
