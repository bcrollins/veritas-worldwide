import pptxgenjs from "pptxgenjs";

const DARK_BG = "0F0F0F";
const CRIMSON = "8B1A1A";
const WHITE = "FFFFFF";
const MUTED = "666666";
const BORDER = "333333";
const GOLD = "B8860B";

function footer(slide, num, total) {
  slide.addText("veritasworldwide.com", { x:0.4,y:9.3,w:5,h:0.4,fontSize:11,color:MUTED,fontFace:"Arial" });
  slide.addText(`${num}/${total}`, { x:8.5,y:9.3,w:1.2,h:0.4,fontSize:11,color:MUTED,fontFace:"Arial",align:"right" });
}

function makeCover(pptx, tag, title, subtitle, stat, statLabel, src) {
  let s = pptx.addSlide();
  s.background = { color: DARK_BG };
  s.addText("VERITAS WORLDWIDE PRESS", { x:0.5,y:1.0,w:9,h:0.5,fontSize:12,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:5,align:"center" });
  s.addShape(pptx.ShapeType.rect, { x:3.5,y:1.7,w:3,h:0.03,fill:{color:CRIMSON} });
  s.addText(tag, { x:0.5,y:2.2,w:9,h:0.4,fontSize:11,color:MUTED,fontFace:"Arial",align:"center",charSpacing:3 });
  s.addText(title, { x:0.5,y:3.0,w:9,h:2.0,fontSize:40,color:WHITE,fontFace:"Georgia",bold:true,align:"center",lineSpacingMultiple:1.1,shrinkText:true });
  s.addText(subtitle, { x:0.8,y:5.2,w:8.4,h:0.8,fontSize:14,color:"CCCCCC",fontFace:"Arial",align:"center",lineSpacingMultiple:1.3 });
  s.addText(stat, { x:0.5,y:6.5,w:9,h:1.0,fontSize:52,color:CRIMSON,fontFace:"Georgia",bold:true,align:"center" });
  s.addText(statLabel, { x:0.8,y:7.5,w:8.4,h:0.4,fontSize:12,color:"AAAAAA",fontFace:"Arial",align:"center" });
  s.addText(src, { x:0.8,y:8.2,w:8.4,h:0.3,fontSize:9,color:MUTED,fontFace:"Arial",align:"center" });
  s.addText("← SWIPE FOR THE FULL STORY →", { x:2,y:8.8,w:6,h:0.4,fontSize:13,color:CRIMSON,fontFace:"Arial",bold:true,align:"center" });
  footer(s, 1, 10);
  return s;
}

function makeStatSlide(pptx, heading, stats, src, num) {
  let s = pptx.addSlide();
  s.background = { color: DARK_BG };
  s.addText(heading, { x:0.5,y:0.5,w:9,h:0.6,fontSize:14,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:3 });
  s.addShape(pptx.ShapeType.rect, { x:0.5,y:1.2,w:9,h:0.02,fill:{color:BORDER} });
  stats.forEach((st, i) => {
    const cols = Math.min(stats.length, 3);
    const row = Math.floor(i / cols);
    const col = i % cols;
    const w = cols === 1 ? 9 : cols === 2 ? 4.2 : 2.7;
    const gap = cols === 1 ? 0 : cols === 2 ? 0.6 : 0.45;
    const xPos = 0.5 + col * (w + gap);
    const yPos = 1.6 + row * 2.8;
    s.addShape(pptx.ShapeType.rect, { x:xPos,y:yPos,w:w,h:2.4,fill:{color:"1A1A1A"},line:{color:BORDER,width:1},rectRadius:0.1 });
    s.addText(st.val, { x:xPos,y:yPos+0.3,w:w,h:0.8,fontSize:32,color:st.accent||CRIMSON,fontFace:"Georgia",bold:true,align:"center" });
    s.addText(st.label, { x:xPos+0.2,y:yPos+1.2,w:w-0.4,h:0.9,fontSize:11,color:"AAAAAA",fontFace:"Arial",align:"center",lineSpacingMultiple:1.2 });
  });
  s.addText(src, { x:0.5,y:8.6,w:9,h:0.3,fontSize:9,color:MUTED,fontFace:"Arial",align:"center" });
  footer(s, num, 10);
  return s;
}

function makeTextSlide(pptx, heading, bodyText, src, num) {
  let s = pptx.addSlide();
  s.background = { color: DARK_BG };
  s.addText(heading, { x:0.5,y:0.5,w:9,h:0.6,fontSize:14,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:3 });
  s.addShape(pptx.ShapeType.rect, { x:0.5,y:1.2,w:9,h:0.02,fill:{color:BORDER} });
  s.addShape(pptx.ShapeType.rect, { x:0.5,y:1.6,w:9,h:6.6,fill:{color:"1A1A1A"},line:{color:BORDER,width:1},rectRadius:0.1 });
  s.addText(bodyText, { x:0.8,y:1.8,w:8.4,h:6.2,fontSize:13,color:"CCCCCC",fontFace:"Arial",lineSpacingMultiple:1.4,valign:"top" });
  s.addText(src, { x:0.5,y:8.6,w:9,h:0.3,fontSize:9,color:MUTED,fontFace:"Arial",align:"center" });
  footer(s, num, 10);
  return s;
}

function makeCTA(pptx, topic, url, num) {
  let s = pptx.addSlide();
  s.background = { color: DARK_BG };
  s.addText("VERITAS WORLDWIDE PRESS", { x:0.5,y:1.5,w:9,h:0.5,fontSize:12,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:5,align:"center" });
  s.addShape(pptx.ShapeType.rect, { x:3.5,y:2.2,w:3,h:0.03,fill:{color:CRIMSON} });
  s.addText(`Read the full\n${topic}`, { x:0.5,y:3.0,w:9,h:2.0,fontSize:40,color:WHITE,fontFace:"Georgia",bold:true,align:"center",lineSpacingMultiple:1.15 });
  s.addText("Every claim sourced. Every figure documented.\nNo ads. No paywalls. Just the record.", { x:1,y:5.2,w:8,h:0.8,fontSize:14,color:"CCCCCC",fontFace:"Arial",align:"center",lineSpacingMultiple:1.3 });
  s.addShape(pptx.ShapeType.rect, { x:2.5,y:6.5,w:5,h:0.8,fill:{color:CRIMSON},rectRadius:0.1 });
  s.addText(url, { x:2.5,y:6.5,w:5,h:0.8,fontSize:15,color:WHITE,fontFace:"Arial",bold:true,align:"center",valign:"middle" });
  s.addText("Save · Share · Send to someone who needs to see this.", { x:1,y:7.7,w:8,h:0.5,fontSize:13,color:"AAAAAA",fontFace:"Arial",align:"center" });
  s.addText("\"The truth does not need your belief — it needs your voice.\"", { x:1.5,y:8.4,w:7,h:0.5,fontSize:13,color:MUTED,fontFace:"Georgia",italic:true,align:"center" });
  footer(s, num, 10);
  return s;
}

// ═══════════════════════════════════════════════════════════
// PACK 1: FEDERAL RESERVE
// ═══════════════════════════════════════════════════════════
const p1 = new pptxgenjs();
p1.defineLayout({ name:"IG", w:10, h:10 }); p1.layout="IG";
makeCover(p1,"FEDERAL RESERVE","The Fed Held Rates\nWhile Oil Surged\nPast $110/Barrel","March 18, 2026 — FOMC voted 11–1 to hold at 3.5–3.75%","$110/bbl","Crude oil price as the Fed held steady","Source: Federal Reserve FOMC Statement, March 2026");
makeStatSlide(p1,"FOMC DECISION — MARCH 18, 2026",[
  {val:"3.5–3.75%",label:"Federal funds rate\nheld unchanged"},
  {val:"11–1",label:"FOMC vote\n(Waller dissented)"},
  {val:"$110+/bbl",label:"Crude oil price\nduring decision"}
],"Source: Federal Reserve FOMC Statement · EIA · Reuters",2);
makeTextSlide(p1,"WHY THIS MATTERS","The Federal Reserve held interest rates steady despite surging energy costs driven by geopolitical instability in the Middle East.\n\nCrude oil has surged past $110/barrel due to escalating tensions with Iran and disrupted shipping through the Strait of Hormuz.\n\nFor American households, this means:\n• Higher gas prices at the pump\n• Elevated food costs (transportation)\n• Mortgage rates remain elevated\n• Credit card rates near historic highs\n\nThe Fed is caught between fighting inflation and avoiding a recession — a scenario economists call stagflation.\n\nGovernor Waller's lone dissent signals internal disagreement about the correct path forward.","Source: FOMC Minutes · Bureau of Labor Statistics · EIA",3);
makeStatSlide(p1,"THE INFLATION PICTURE",[
  {val:"3.2%",label:"Core CPI\n(Feb 2026)"},
  {val:"4.1%",label:"Energy inflation\nyear-over-year"},
  {val:"$3.89",label:"Average gas price\nnational (Mar 2026)"}
],"Source: Bureau of Labor Statistics · EIA",4);
makeTextSlide(p1,"HISTORICAL CONTEXT","The Federal Reserve was created in 1913 following a secret meeting on Jekyll Island, Georgia (Chapter 3 of The Record).\n\nSix men representing a quarter of the world's wealth drafted the blueprint for America's central bank.\n\nToday, the Fed controls:\n• The money supply\n• Interest rates\n• Bank regulation\n• Emergency lending (lender of last resort)\n\nCritics argue the Fed operates with insufficient oversight — it has never been fully audited despite controlling the world's reserve currency.\n\nThe 2008 financial crisis (Chapter 13) exposed how Fed policy enabled the housing bubble through artificially low rates from 2001–2004.","Source: Federal Reserve Act of 1913 · CRS Reports",5);
makeStatSlide(p1,"FED BALANCE SHEET",[
  {val:"$6.8T",label:"Current Fed\nbalance sheet"},
  {val:"$4.5T",label:"Pre-COVID\nbalance sheet"},
  {val:"$900B",label:"Pre-2008 crisis\nbalance sheet"}
],"Source: Federal Reserve Economic Data (FRED)",6);
makeTextSlide(p1,"WHO OWNS THE FED?","The Federal Reserve is not a government agency. It is a hybrid institution:\n\n• 12 regional Federal Reserve Banks are owned by their member commercial banks\n• The Board of Governors is appointed by the President and confirmed by the Senate\n• The Fed remits profits to the Treasury but operates independently of Congress\n\nMember banks receive a 6% annual dividend on their stock.\n\nThe New York Fed conducts open market operations and maintains relationships with primary dealers — the largest Wall Street banks.\n\nRead the full chapter: \"How the Federal Reserve Works\" (Chapter 12) at veritasworldwide.com","Source: Federal Reserve Act § 5 · 12 U.S.C. § 289",7);
makeStatSlide(p1,"KEY PLAYERS",[
  {val:"Powell",label:"Fed Chair since 2018\nReappointed by Biden"},
  {val:"Waller",label:"Governor — lone dissent\nFavored rate cut"},
  {val:"Dimon",label:"JPMorgan CEO\nLargest Fed member bank"}
],"Source: Federal Reserve Board of Governors",8);
makeTextSlide(p1,"WHAT HAPPENS NEXT","The next FOMC meeting is May 6–7, 2026.\n\nIf oil prices remain above $110/barrel:\n• Inflation could re-accelerate\n• The Fed may be forced to raise rates\n• Consumer spending would decline further\n\nIf geopolitical tensions ease:\n• Oil could retreat to $85–90 range\n• The Fed could begin cutting in Q3 2026\n• Markets would likely rally\n\nWatch for: CPI data (April 10), jobs report (May 2), and any Iranian nuclear deal developments.\n\nThe primary source documents — FOMC statements, meeting minutes, and economic projections — are all available at federalreserve.gov.","Source: FOMC Schedule · Economic Projections",9);
makeCTA(p1,"Federal Reserve Analysis","veritasworldwide.com",10);
await p1.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pack-federal-reserve-carousel.pptx" });
console.log("✅ Pack 1: Federal Reserve");

// ═══════════════════════════════════════════════════════════
// PACK 2: EPSTEIN FILES
// ═══════════════════════════════════════════════════════════
const p2 = new pptxgenjs();
p2.defineLayout({ name:"IG", w:10, h:10 }); p2.layout="IG";
makeCover(p2,"ACCOUNTABILITY","DOJ Releases 3.5 Million\nPages of Epstein Files","2,000 videos · 180,000 images · Names on the record","3.5M","Pages released under Transparency Act","Source: U.S. Department of Justice, March 2026");
makeStatSlide(p2,"THE RELEASE",[
  {val:"3.5M",label:"Pages of documents\nreleased"},
  {val:"2,000",label:"Videos in the\ncollection"},
  {val:"180,000",label:"Images cataloged\nby DOJ"}
],"Source: U.S. Department of Justice, March 2026",2);
makeTextSlide(p2,"WHAT'S IN THE FILES","The DOJ release under the Transparency Act includes:\n\n• Flight logs from Epstein's private jets (including the Boeing 727 \"Lolita Express\")\n• Visitor logs from residences in Manhattan, Palm Beach, New Mexico, and the U.S. Virgin Islands\n• Financial records showing transfers to associates\n• Sealed grand jury testimony now made public\n• Communications between Epstein and prominent figures\n• FBI surveillance records\n\nThis is the largest single document release in the Epstein case, dwarfing previous disclosures from the Ghislaine Maxwell trial and the Virgin Islands civil suit.","Source: DOJ Press Release · Court Records · FBI",3);
makeStatSlide(p2,"THE NETWORK",[
  {val:"73",label:"Flights logged to\nEpstein's island"},
  {val:"150+",label:"Named individuals\nin court documents"},
  {val:"$600M+",label:"Estimated Epstein\nestate value"}
],"Source: Court Records · FAA Flight Logs · USVI AG Office",4);
makeTextSlide(p2,"KEY LEGAL TIMELINE","• 2005–2006: Palm Beach PD investigation; FBI opens case\n• 2007: U.S. Attorney Alex Acosta negotiates plea deal\n• 2008: Epstein pleads guilty to state charges; 13-month sentence with work release\n• 2018: Miami Herald investigation by Julie K. Brown reopens case\n• 2019: SDNY indicts Epstein on federal sex trafficking charges\n• Aug 10, 2019: Epstein found dead in MCC Manhattan\n• 2021–2022: Ghislaine Maxwell trial and conviction\n• 2023: JPMorgan settles for $290M; Deutsche Bank for $75M\n• 2024: Virgin Islands reaches $105M settlement\n• Mar 2026: DOJ releases 3.5 million pages under Transparency Act\n\nThe full documented timeline with primary sources is in Chapter 28 of The Record.","Source: DOJ · SDNY · Miami Herald · Court Records",5);
makeTextSlide(p2,"THE INTELLIGENCE CONNECTION","Multiple documented connections link Epstein to intelligence agencies:\n\n• Former CIA Director William Barr's father hired Epstein as a teacher at Dalton School in 1974 — despite Epstein lacking a degree\n• Ghislaine Maxwell's father Robert Maxwell was documented by the FBI as a Mossad asset\n• Epstein's associate Ari Ben-Menashe (former Israeli military intelligence) stated under oath that Epstein was recruited by Israeli intelligence\n• Epstein's New Mexico ranch was reportedly equipped with surveillance equipment\n\nEvidence tier: CIRCUMSTANTIAL — Individual facts are documented. The connections drawn between them are interpretive.\n\nThe full intelligence analysis is in Chapter 28 of The Record.","Source: FBI files · Court depositions · OIG Report",6);
makeStatSlide(p2,"FINANCIAL SETTLEMENTS",[
  {val:"$290M",label:"JPMorgan Chase\nsettlement (2023)"},
  {val:"$75M",label:"Deutsche Bank\nsettlement (2023)"},
  {val:"$105M",label:"U.S. Virgin Islands\nsettlement (2024)"}
],"Source: Court Records · SEC Filings",7);
makeTextSlide(p2,"WHAT REMAINS UNANSWERED","Despite 3.5 million pages, critical questions persist:\n\n1. How did Epstein accumulate his wealth? No verified client list from his \"financial advisory\" firm has ever been produced.\n\n2. Why was the original 2008 plea deal so lenient? The DOJ OIG report found \"professional failures\" but no criminal misconduct.\n\n3. How did both cameras outside Epstein's cell malfunction on the night of his death?\n\n4. Who were the unnamed co-conspirators referenced in the original indictment?\n\n5. What is in the classified intelligence briefings referenced in the released documents?\n\nThese questions are not conspiracy — they are gaps in the official record that remain unexplained.","Source: DOJ OIG Report · SDNY Indictment · MCC Records",8);
makeTextSlide(p2,"HOW TO VERIFY","Every claim in The Record's Epstein chapter links to primary sources:\n\n• Flight logs: Searchable at CourtListener.com\n• Court filings: PACER (Public Access to Court Electronic Records)\n• FBI records: FBI Vault — vault.fbi.gov\n• DOJ releases: justice.gov/epstein-transparency\n• Financial records: SEC EDGAR database\n\nWe encourage every reader to verify independently. If you find an error, submit a factual dispute at veritasworldwide.com.\n\nThe truth does not require your trust in us — it requires your willingness to read the documents yourself.","Source: PACER · FBI Vault · DOJ · SEC EDGAR",9);
makeCTA(p2,"Epstein Investigation","veritasworldwide.com",10);
await p2.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pack-epstein-files-carousel.pptx" });
console.log("✅ Pack 2: Epstein Files");

// ═══════════════════════════════════════════════════════════
// PACK 3: FISA / SURVEILLANCE
// ═══════════════════════════════════════════════════════════
const p3 = new pptxgenjs();
p3.defineLayout({ name:"IG", w:10, h:10 }); p3.layout="IG";
makeCover(p3,"SURVEILLANCE","FISA Section 702\nFaces April Sunset","Bipartisan reform bill demands warrant requirement for Americans","Apr 2026","Sunset deadline for warrantless surveillance","Source: Congress.gov, S.4201 / H.R.8901");
makeStatSlide(p3,"SECTION 702 BY THE NUMBERS",[
  {val:"3.4M",label:"Americans' communications\ncollected without warrant\n(2023, ODNI report)"},
  {val:"0",label:"Warrants required\nfor U.S. person queries\n(current law)"},
  {val:"278,000",label:"FBI queries of\nAmericans' data\n(2022, declassified)"}
],"Source: ODNI Annual Transparency Report · FISA Court",2);
makeTextSlide(p3,"WHAT IS SECTION 702?","Section 702 of the Foreign Intelligence Surveillance Act allows U.S. intelligence agencies to collect communications of foreign targets located outside the United States — WITHOUT a warrant.\n\nThe problem: When those foreign targets communicate with Americans, those American communications are swept up too. Intelligence agencies can then search this database for American communications — a practice critics call the \"backdoor search loophole.\"\n\nThe NSA, CIA, and FBI all have access to this data.\n\nThe program was first authorized in 2008 and has been reauthorized multiple times, most recently in April 2024 for two years.\n\nChapter 27 of The Record traces surveillance from ECHELON (1960s) through PRISM (2013, revealed by Edward Snowden) to today's Section 702 debate.","Source: FISA Amendments Act of 2008 · ODNI",3);
makeStatSlide(p3,"THE REFORM BILL",[
  {val:"S.4201",label:"Senate bill\nrequiring warrants\nfor U.S. person queries"},
  {val:"H.R.8901",label:"House companion\nbill — bipartisan\n48 co-sponsors"},
  {val:"April",label:"2026 sunset\ndeadline — must\nrenew or reform"}
],"Source: Congress.gov · Senate Judiciary Committee",4);
makeTextSlide(p3,"WHAT SNOWDEN REVEALED","In June 2013, NSA contractor Edward Snowden disclosed classified documents revealing:\n\n• PRISM: Direct access to servers of Google, Apple, Microsoft, Facebook, Yahoo\n• Upstream collection: Tapping fiber optic cables carrying internet traffic\n• XKeyscore: Tool allowing analysts to search virtually anything a person does online\n• Tempora (UK/GCHQ): Collecting all internet traffic flowing through UK cables\n• Phone metadata: NSA collected records of every American phone call (who, when, duration)\n\nThe FISA Court had secretly approved these programs.\n\nThe 2015 USA FREEDOM Act ended bulk phone metadata collection but left Section 702 intact.\n\nChapter 27 of The Record documents the full surveillance timeline.","Source: NSA declassified docs · FISA Court opinions",5);
makeTextSlide(p3,"FROM ECHELON TO PEGASUS","The surveillance state didn't start with 9/11:\n\n• 1947: UKUSA Agreement (Five Eyes) — US, UK, Canada, Australia, New Zealand\n• 1960s–2000s: ECHELON — satellite interception network\n• 2001: PATRIOT Act massively expanded surveillance authority\n• 2005: NYT reveals warrantless wiretapping under Bush\n• 2013: Snowden revelations\n• 2021: Pegasus Project — NSO Group spyware on journalists, activists, heads of state\n• 2024: Section 702 renewed with expanded definition of \"electronic communications service provider\"\n\nThe expansion of the provider definition in 2024 means the government can now compel virtually any company with access to communications equipment to assist in surveillance.","Source: UKUSA Agreement (declassified) · NYT · Pegasus Project",6);
makeStatSlide(p3,"COST OF SURVEILLANCE",[
  {val:"$80B+",label:"Annual U.S.\nintelligence budget\n(17 agencies)"},
  {val:"$15B",label:"NSA annual\nbudget (estimated)\nSnowden docs"},
  {val:"5",label:"Eyes — nations in the\nlargest intelligence\nalliance in history"}
],"Source: ODNI · Snowden documents · Congressional oversight",7);
makeTextSlide(p3,"YOUR PHONE RIGHT NOW","This is not abstract. Your smartphone:\n\n• Has a unique advertising ID tracked across apps and websites\n• Shares location data with data brokers (sold to anyone, including government)\n• Connects to cell towers that log your position 24/7\n• Runs apps that request microphone, camera, and contact access\n• Uses DNS queries that reveal every website you visit\n\nIn 2024, the FTC found that major data brokers sold Americans' location data to government agencies — bypassing the warrant requirement entirely.\n\nThe Fourth Amendment protects against unreasonable searches. The question is whether digital surveillance has rendered that protection meaningless.","Source: FTC Reports · Carpenter v. United States (2018)",8);
makeTextSlide(p3,"WHAT YOU CAN DO","1. Contact your representatives: Tell them to support S.4201/H.R.8901 requiring warrants for U.S. person queries\n\n2. Understand your digital footprint: Review app permissions on your phone — revoke access you didn't knowingly grant\n\n3. Use encrypted communications: Signal, ProtonMail — end-to-end encryption that even service providers cannot access\n\n4. Read the primary sources: FISA Court opinions are declassified and available at fisc.uscourts.gov\n\n5. Share this information: An informed public is the strongest safeguard against the abuse of power\n\nThe full surveillance chapter (Chapter 27) with all primary source links is free at veritasworldwide.com.","Source: EFF · ACLU · Senate Judiciary Committee",9);
makeCTA(p3,"Surveillance Chapter","veritasworldwide.com",10);
await p3.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pack-surveillance-carousel.pptx" });
console.log("✅ Pack 3: Surveillance / FISA");

// ═══════════════════════════════════════════════════════════
// PACK 4: DEFENSE BUDGET
// ═══════════════════════════════════════════════════════════
const p4 = new pptxgenjs();
p4.defineLayout({ name:"IG", w:10, h:10 }); p4.layout="IG";
makeCover(p4,"DEFENSE & FOREIGN POLICY","$1.5 Trillion\nDefense Budget","The largest defense authorization in American history","$1.5T","FY2027 proposed defense budget","Source: Senate Appropriations Committee Markup");
makeStatSlide(p4,"WHERE THE MONEY GOES",[
  {val:"$886B",label:"Base Pentagon\nbudget (DoD)"},
  {val:"$32B",label:"Nuclear weapons\n(DOE/NNSA)"},
  {val:"$500M",label:"Israel missile\ndefense (included)"}
],"Source: Senate Appropriations Committee · CBO",2);
makeTextSlide(p4,"THE F-47 STEALTH FIGHTER","The FY2027 budget includes funding for the F-47, the next-generation stealth fighter:\n\n• Developed under the Next Generation Air Dominance (NGAD) program\n• Estimated cost: $300M+ per aircraft\n• Designed to replace the F-22 Raptor\n• Features AI-enabled systems and drone wingman integration\n• Boeing selected as prime contractor (October 2024)\n\nFor comparison:\n• F-35: $80M per unit (most expensive weapons program in history at $1.7T lifetime)\n• F-22: $150M per unit (production ended 2011)\n\nThe defense budget has grown every year since 2015. In inflation-adjusted terms, current spending exceeds Cold War peaks.","Source: DoD Budget Request · CBO · GAO",3);
makeStatSlide(p4,"COMPARISON: WHAT $1.5T BUYS",[
  {val:"$1.5T",label:"FY2027 defense\nbudget proposal",accent:CRIMSON},
  {val:"$100B",label:"Annual cost to end\nhomelessness (HUD est.)",accent:GOLD},
  {val:"$80B",label:"Free public university\ntuition (all states)",accent:GOLD}
],"Source: HUD · Dept of Education · CBO",4);
makeTextSlide(p4,"WHO PROFITS","The top 5 defense contractors by revenue (2024):\n\n1. Lockheed Martin — $67.6B (F-35, missiles, space)\n2. RTX (Raytheon) — $56.4B (missiles, radar, Patriot)\n3. Northrop Grumman — $39.3B (B-21, satellites, cyber)\n4. Boeing Defense — $26.9B (F-47, tankers, helicopters)\n5. General Dynamics — $42.3B (submarines, IT, Gulfstream)\n\nThese five companies collectively spent $55M+ on lobbying in 2024 and donated to 90%+ of congressional defense committee members.\n\nThe revolving door: 80%+ of senior DoD officials who left government in 2019–2024 took positions with defense contractors.","Source: SIPRI · OpenSecrets · GAO",5);
makeStatSlide(p4,"GLOBAL COMPARISON",[
  {val:"$886B",label:"United States\n(39% of global total)"},
  {val:"$296B",label:"China\n(13% of global total)"},
  {val:"$83B",label:"Russia\n(3.6% of global total)"}
],"Source: SIPRI Military Expenditure Database 2024",6);
makeTextSlide(p4,"800+ BASES WORLDWIDE","The U.S. maintains approximately 800 military bases in 80+ countries and territories worldwide.\n\nFor comparison:\n• UK: ~145 bases abroad\n• Russia: ~36 bases abroad\n• France: ~13 bases abroad\n• China: ~5 bases abroad\n\nThe annual cost of maintaining overseas bases is estimated at $55–100 billion (DoD doesn't provide a precise figure).\n\nKey concentrations: Germany (119 bases), Japan (120), South Korea (73), Italy (44).\n\nChapter 22 of The Record examines how the post-9/11 era dramatically expanded the U.S. military footprint globally.","Source: DoD Base Structure Report · David Vine, American University",7);
makeTextSlide(p4,"THE NUCLEAR ARSENAL","The FY2027 budget includes $32 billion for nuclear weapons maintenance and modernization:\n\n• New ICBM: Sentinel (replacing Minuteman III) — $96B program\n• New bomber: B-21 Raider — $80B+ program\n• New submarine: Columbia-class SSBN — $128B program\n• New warhead: W93 for submarine-launched missiles\n\nThe U.S. currently maintains approximately 5,044 nuclear warheads (1,770 deployed).\n\nThe total cost of nuclear modernization over the next 30 years: estimated $1.5–2 trillion.\n\nNote: Israel is estimated to possess 80–400 nuclear warheads but has never signed the Nuclear Non-Proliferation Treaty (see Chapter 8).","Source: CBO · SIPRI Nuclear Forces · DOE/NNSA",8);
makeTextSlide(p4,"WHAT THE FOUNDERS SAID","\"Overgrown military establishments are, under any form of government, inauspicious to liberty.\"\n— George Washington, Farewell Address, 1796\n\n\"Of all the enemies to public liberty, war is, perhaps, the most to be dreaded.\"\n— James Madison, Political Observations, 1795\n\n\"The spirit of this country is totally adverse to a large military force.\"\n— Thomas Jefferson, 1807\n\nThe Constitution grants Congress — not the President — the power to declare war (Article I, Section 8). The last formal declaration of war by Congress was in 1942.\n\nSince then, the U.S. has engaged in military action in Korea, Vietnam, Grenada, Panama, Gulf War, Somalia, Kosovo, Afghanistan, Iraq, Libya, Syria, and Yemen — all without formal declarations of war.","Source: National Archives · Congressional Record",9);
makeCTA(p4,"Defense Budget Analysis","veritasworldwide.com",10);
await p4.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pack-defense-budget-carousel.pptx" });
console.log("✅ Pack 4: Defense Budget");

// ═══════════════════════════════════════════════════════════
// PACK 5: AIPAC
// ═══════════════════════════════════════════════════════════
const p5 = new pptxgenjs();
p5.defineLayout({ name:"IG", w:10, h:10 }); p5.layout="IG";
makeCover(p5,"FOLLOW THE MONEY","AIPAC Spent $28M\nin 2026 Primaries\nThrough Shell PACs","$22M in Illinois alone · FEC filings · Named donors","$126.9M","Total AIPAC spending in 2024 election cycle","Source: FEC Filings · Read Sludge · TrackAIPAC.com");
makeStatSlide(p5,"2024 ELECTION CYCLE",[
  {val:"$100M+",label:"Spent across\n389 races"},
  {val:"$55.2M",label:"Direct donations\nto candidates"},
  {val:"70%",label:"Backed candidates\nwon their races"}
],"Source: FEC filings · OpenSecrets",2);
makeTextSlide(p5,"HOW AIPAC OPERATES","AIPAC uses a multi-layered spending structure:\n\n1. AIPAC PAC: Direct contributions to candidates (limited to $5,000/election per candidate)\n\n2. United Democracy Project (UDP): Super PAC — unlimited spending on ads and outreach, cannot coordinate directly with campaigns\n\n3. Bundling: AIPAC connects donors to candidates, facilitating millions in individual contributions that don't appear as AIPAC spending\n\n4. State-level PACs: Affiliated organizations in key states\n\nKey strategy: AIPAC's super PAC focuses on DEMOCRATIC PRIMARIES — spending millions to defeat progressive candidates who criticize Israel.\n\nThis is legal under Citizens United v. FEC (2010).","Source: FEC · Center for Responsive Politics · The Intercept",3);
makeStatSlide(p5,"2025–2026 CYCLE (TO DATE)",[
  {val:"$28M",label:"Delivered to\ncampaigns so far"},
  {val:"$12.75M",label:"PAC contributions\nH1 2025 alone"},
  {val:"88%",label:"Increase in PAC\nspending YoY"}
],"Source: FEC H1 2025 filings · Read Sludge March 2026",4);
makeTextSlide(p5,"WHO GOT THE MOST","AIPAC's spending is bipartisan but strategic:\n\nTop recipients in 2024 included members of:\n• Senate Foreign Relations Committee\n• House Foreign Affairs Committee\n• Senate and House Appropriations (defense subcommittees)\n• Senate and House Armed Services\n\nAIPAC-backed candidates won in 70%+ of contested races.\n\nNotably, AIPAC spent more than any other single organization to defeat progressive Democrats in 2024 primaries — a strategic choice to shape the party's position on Israel from within.\n\nTrack every dollar: TrackAIPAC.com provides a searchable database of AIPAC contributions to every member of Congress.","Source: FEC · TrackAIPAC.com · OpenSecrets",5);
makeTextSlide(p5,"THE VETO RECORD","The lobbying extends to international forums:\n\nThe United States has used its UN Security Council veto to block resolutions critical of Israel more than 53 times since 1970.\n\nThis makes Israel-related vetoes the single most common use of the American veto power.\n\nRecent vetoes:\n• Oct 2023: Vetoed humanitarian ceasefire resolution\n• Dec 2023: Vetoed ceasefire resolution (13-1 vote)\n• Feb 2024: Vetoed ceasefire resolution\n• Mar 2024: First abstention allowing ceasefire resolution to pass\n\nThe U.S. is one of 5 permanent members with veto power (alongside UK, France, Russia, China).","Source: UN Security Council Official Records · UN Watch",6);
makeStatSlide(p5,"LOBBYING SPEND",[
  {val:"$1.8M",label:"AIPAC lobbying\nH1 2025"},
  {val:"12.5%",label:"Increase over\nH1 2024"},
  {val:"3x",label:"Larger than next\nbiggest PAC"}
],"Source: FEC lobbying disclosures · Read Sludge",7);
makeTextSlide(p5,"WHAT THE LAW SAYS","Key legislation governing this relationship:\n\n• Foreign Agents Registration Act (FARA): Requires agents of foreign governments to register with DOJ. AIPAC has never been required to register, arguing it represents American citizens, not a foreign government.\n\n• The 1963 Fulbright hearings investigated AIPAC's predecessor (the American Zionist Council) and recommended FARA registration. The recommendation was not enforced.\n\n• Citizens United v. FEC (2010): Removed limits on independent expenditures by corporations and unions, enabling the super PAC structure AIPAC now uses.\n\n• Leahy Law: Prohibits military aid to units committing human rights violations — critics argue it has never been enforced against Israeli units.","Source: FARA · Fulbright Hearings (1963) · Citizens United",8);
makeTextSlide(p5,"HOW TO FOLLOW THE MONEY","Every dollar is on the public record:\n\n1. FEC.gov: Search all PAC contributions by candidate, committee, or donor\n\n2. OpenSecrets.org: Aggregated lobbying and campaign finance data\n\n3. TrackAIPAC.com: Specific AIPAC contributions by member of Congress\n\n4. Congress.gov: Voting records — compare votes to contributions\n\n5. Lobbying Disclosure Act filings: justice.gov\n\nLook up YOUR representative. See how much they received. Compare it to their votes on Israel-related legislation.\n\nThe full AIPAC chapter (Chapter 14) with primary source links is free at veritasworldwide.com.","Source: FEC · OpenSecrets · DOJ",9);
makeCTA(p5,"AIPAC Investigation","veritasworldwide.com",10);
await p5.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pack-aipac-carousel.pptx" });
console.log("✅ Pack 5: AIPAC");

console.log("\n🎉 All 5 content pack carousels generated!");
