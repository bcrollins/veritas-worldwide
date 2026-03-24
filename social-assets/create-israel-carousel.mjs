import pptxgenjs from "pptxgenjs";

const pptx = new pptxgenjs();
pptx.defineLayout({ name: "IG_SQUARE", w: 10, h: 10 });
pptx.layout = "IG_SQUARE";

// Brand colors
const PARCHMENT = "FAF8F5";
const INK = "1A1A1A";
const CRIMSON = "8B1A1A";
const CRIMSON_LIGHT = "A52A2A";
const WHITE = "FFFFFF";
const DARK_BG = "0F0F0F";
const MUTED = "666666";
const BORDER_GRAY = "333333";

// Helper for consistent slide footer
function addFooter(slide, num) {
  slide.addText("veritasworldwide.com", {
    x: 0.4, y: 9.3, w: 5, h: 0.4,
    fontSize: 11, color: MUTED, fontFace: "Arial"
  });
  slide.addText(`${num}/10`, {
    x: 8.5, y: 9.3, w: 1.2, h: 0.4,
    fontSize: 11, color: MUTED, fontFace: "Arial", align: "right"
  });
}

// ─── SLIDE 1: COVER ───
let s1 = pptx.addSlide();
s1.background = { color: DARK_BG };
s1.addText("VERITAS WORLDWIDE PRESS", {
  x: 0.5, y: 1.0, w: 9, h: 0.5,
  fontSize: 13, color: CRIMSON, fontFace: "Arial", bold: true,
  charSpacing: 6, align: "center"
});
s1.addShape(pptx.ShapeType.rect, {
  x: 3.5, y: 1.8, w: 3, h: 0.03, fill: { color: CRIMSON }
});
s1.addText("THE ISRAEL\nDOSSIER", {
  x: 0.5, y: 2.5, w: 9, h: 3,
  fontSize: 54, color: WHITE, fontFace: "Georgia", bold: true,
  align: "center", lineSpacingMultiple: 1.1
});
s1.addText("$310B+ in U.S. aid · 75,000+ killed · 17,000+ children\nEvery figure sourced to government records.", {
  x: 0.8, y: 5.8, w: 8.4, h: 1.2,
  fontSize: 15, color: "CCCCCC", fontFace: "Arial", align: "center",
  lineSpacingMultiple: 1.4
});
s1.addText("Sources: CRS · UN OCHA · ICJ · CPJ · SIPRI · World Bank", {
  x: 0.8, y: 7.3, w: 8.4, h: 0.5,
  fontSize: 11, color: MUTED, fontFace: "Arial", align: "center"
});
s1.addText("← SWIPE TO READ THE RECORD →", {
  x: 2, y: 8.5, w: 6, h: 0.5,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, align: "center"
});
addFooter(s1, 1);

// ─── SLIDE 2: FOLLOW THE MONEY ───
let s2 = pptx.addSlide();
s2.background = { color: DARK_BG };
s2.addText("FOLLOW THE MONEY", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 4
});
s2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s2.addText("$310 BILLION+", {
  x: 0.5, y: 1.8, w: 9, h: 1.2,
  fontSize: 60, color: CRIMSON, fontFace: "Georgia", bold: true, align: "center"
});
s2.addText("Total U.S. aid to Israel (inflation-adjusted)\nCongressional Research Service Report RL33222", {
  x: 0.8, y: 3.1, w: 8.4, h: 0.8,
  fontSize: 13, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.3
});
s2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 4.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
// 4 stat boxes
const moneyStats = [
  { val: "$38B", label: "10-year MOU\n(2019–2028)" },
  { val: "$16.3B", label: "Post-Oct 7\nsupplemental" },
  { val: "$46.5B", label: "Israel defense\nbudget 2024" },
  { val: "14,000+", label: "MK-84 bombs\ndelivered" }
];
moneyStats.forEach((s, i) => {
  const xPos = 0.5 + i * 2.3;
  s2.addShape(pptx.ShapeType.rect, {
    x: xPos, y: 4.6, w: 2.0, h: 2.4,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 },
    rectRadius: 0.1
  });
  s2.addText(s.val, {
    x: xPos, y: 4.9, w: 2.0, h: 0.8,
    fontSize: 24, color: CRIMSON, fontFace: "Georgia", bold: true, align: "center"
  });
  s2.addText(s.label, {
    x: xPos + 0.1, y: 5.8, w: 1.8, h: 0.9,
    fontSize: 11, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.2
  });
});
s2.addText("Each MK-84 has a lethal blast radius of 360 meters — 4 football fields", {
  x: 0.8, y: 7.5, w: 8.4, h: 0.5,
  fontSize: 12, color: MUTED, fontFace: "Arial", italic: true, align: "center"
});
s2.addText("Source: CRS Report RL33222 · SIPRI · WSJ/NYT Investigation", {
  x: 0.8, y: 8.2, w: 8.4, h: 0.4,
  fontSize: 10, color: MUTED, fontFace: "Arial", align: "center"
});
addFooter(s2, 2);

// ─── SLIDE 3: THE HUMAN COST ───
let s3 = pptx.addSlide();
s3.background = { color: DARK_BG };
s3.addText("THE HUMAN COST", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 4
});
s3.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s3.addText("75,000+", {
  x: 0.5, y: 1.6, w: 9, h: 1.4,
  fontSize: 72, color: WHITE, fontFace: "Georgia", bold: true, align: "center"
});
s3.addText("Palestinians killed since October 7, 2023", {
  x: 0.8, y: 3.0, w: 8.4, h: 0.5,
  fontSize: 16, color: "CCCCCC", fontFace: "Arial", align: "center"
});
s3.addShape(pptx.ShapeType.rect, { x: 0.5, y: 3.8, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
const humanStats = [
  { val: "17,000+", label: "Children killed", color: CRIMSON },
  { val: "171,000+", label: "Injured", color: "B8860B" },
  { val: "1.9M", label: "Displaced", color: "B8860B" },
  { val: "786", label: "Babies under\nage 1 killed", color: CRIMSON }
];
humanStats.forEach((s, i) => {
  const xPos = 0.5 + i * 2.3;
  s3.addShape(pptx.ShapeType.rect, {
    x: xPos, y: 4.2, w: 2.0, h: 2.2,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
  });
  s3.addText(s.val, {
    x: xPos, y: 4.4, w: 2.0, h: 0.9,
    fontSize: 26, color: s.color, fontFace: "Georgia", bold: true, align: "center"
  });
  s3.addText(s.label, {
    x: xPos + 0.1, y: 5.4, w: 1.8, h: 0.7,
    fontSize: 11, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.2
  });
});
s3.addText("Max Planck Institute estimate: 100,000–126,000 total deaths\n27% children under 15 · 24% women", {
  x: 0.5, y: 7.0, w: 9, h: 0.8,
  fontSize: 12, color: MUTED, fontFace: "Arial", italic: true, align: "center", lineSpacingMultiple: 1.3
});
s3.addText("Source: Gaza MoH via OCHA · Max Planck Institute · UNICEF", {
  x: 0.8, y: 8.2, w: 8.4, h: 0.4,
  fontSize: 10, color: MUTED, fontFace: "Arial", align: "center"
});
addFooter(s3, 3);

// ─── SLIDE 4: INFRASTRUCTURE DESTRUCTION ───
let s4 = pptx.addSlide();
s4.background = { color: DARK_BG };
s4.addText("WHAT WAS DESTROYED", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 4
});
s4.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
const infraItems = [
  { pct: "70%", label: "of Gaza's housing\ndamaged or destroyed", src: "UNOSAT" },
  { pct: "26/36", label: "hospitals rendered\nnon-functional", src: "WHO" },
  { pct: "12/12", label: "universities damaged\nor destroyed", src: "UNESCO" },
  { pct: "300+", label: "schools damaged\nor destroyed", src: "UNRWA" },
  { pct: "97%", label: "of water infrastructure\nnon-functional", src: "UNICEF" },
  { pct: "100%", label: "of electrical grid\ndestroyed", src: "OCHA" }
];
infraItems.forEach((item, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const xPos = 0.5 + col * 3.1;
  const yPos = 1.8 + row * 3.2;
  s4.addShape(pptx.ShapeType.rect, {
    x: xPos, y: yPos, w: 2.8, h: 2.8,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
  });
  s4.addText(item.pct, {
    x: xPos, y: yPos + 0.3, w: 2.8, h: 1.0,
    fontSize: 36, color: CRIMSON, fontFace: "Georgia", bold: true, align: "center"
  });
  s4.addText(item.label, {
    x: xPos + 0.2, y: yPos + 1.3, w: 2.4, h: 0.8,
    fontSize: 12, color: "CCCCCC", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.2
  });
  s4.addText(item.src, {
    x: xPos, y: yPos + 2.2, w: 2.8, h: 0.3,
    fontSize: 9, color: MUTED, fontFace: "Arial", align: "center"
  });
});
s4.addText("625,000+ housing units damaged or destroyed — 85% of population displaced", {
  x: 0.5, y: 8.4, w: 9, h: 0.4,
  fontSize: 11, color: MUTED, fontFace: "Arial", italic: true, align: "center"
});
addFooter(s4, 4);

// ─── SLIDE 5: PRESS FREEDOM ───
let s5 = pptx.addSlide();
s5.background = { color: DARK_BG };
s5.addText("THE WAR ON JOURNALISTS", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 4
});
s5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s5.addText("250+", {
  x: 0.5, y: 1.8, w: 9, h: 1.4,
  fontSize: 80, color: WHITE, fontFace: "Georgia", bold: true, align: "center"
});
s5.addText("Journalists killed by Israel since October 2023", {
  x: 0.8, y: 3.2, w: 8.4, h: 0.5,
  fontSize: 16, color: "CCCCCC", fontFace: "Arial", align: "center"
});
s5.addText("More than any nation has killed in CPJ's\nentire 32-year history of record-keeping.", {
  x: 0.8, y: 4.0, w: 8.4, h: 0.8,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", italic: true, align: "center", lineSpacingMultiple: 1.3
});
s5.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
const pressStats = [
  { year: "2024", val: "124", sub: "journalists killed globally\n~70% by Israel\nDeadliest year in CPJ history" },
  { year: "2025", val: "129", sub: "journalists killed globally\n2/3 by Israel\nNew record set" },
  { year: "TARGETED", val: "47", sub: "journalists murdered\nfor their work in 2025\n81% by Israeli forces" }
];
pressStats.forEach((s, i) => {
  const xPos = 0.5 + i * 3.1;
  s5.addShape(pptx.ShapeType.rect, {
    x: xPos, y: 5.5, w: 2.8, h: 3.0,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
  });
  s5.addText(s.year, {
    x: xPos, y: 5.7, w: 2.8, h: 0.4,
    fontSize: 11, color: CRIMSON, fontFace: "Arial", bold: true, align: "center", charSpacing: 2
  });
  s5.addText(s.val, {
    x: xPos, y: 6.1, w: 2.8, h: 0.8,
    fontSize: 36, color: WHITE, fontFace: "Georgia", bold: true, align: "center"
  });
  s5.addText(s.sub, {
    x: xPos + 0.2, y: 7.0, w: 2.4, h: 1.2,
    fontSize: 10, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.3
  });
});
s5.addText("Source: Committee to Protect Journalists, Annual Press Freedom Reports 2024 & 2025", {
  x: 0.8, y: 8.8, w: 8.4, h: 0.3,
  fontSize: 9, color: MUTED, fontFace: "Arial", align: "center"
});
addFooter(s5, 5);

// ─── SLIDE 6: ICJ RULING ───
let s6 = pptx.addSlide();
s6.background = { color: DARK_BG };
s6.addText("INTERNATIONAL LAW", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 4
});
s6.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s6.addText("ICJ Advisory Opinion\nJuly 19, 2024", {
  x: 0.5, y: 1.6, w: 9, h: 1.2,
  fontSize: 32, color: WHITE, fontFace: "Georgia", bold: true, align: "center", lineSpacingMultiple: 1.2
});
s6.addText("The largest proceeding in ICJ history — 52 states presented arguments", {
  x: 0.8, y: 2.9, w: 8.4, h: 0.4,
  fontSize: 12, color: MUTED, fontFace: "Arial", italic: true, align: "center"
});
const icjFindings = [
  "Israel's occupation of Gaza, West Bank, and East Jerusalem is UNLAWFUL",
  "The settlement regime constitutes ANNEXATION violating international law",
  "Israel's measures violate the prohibition on RACIAL SEGREGATION and APARTHEID",
  "Israel must END its occupation, DISMANTLE settlements, pay FULL REPARATIONS"
];
icjFindings.forEach((f, i) => {
  s6.addShape(pptx.ShapeType.rect, {
    x: 0.8, y: 3.6 + i * 1.2, w: 8.4, h: 1.0,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.08
  });
  s6.addText(f, {
    x: 1.1, y: 3.7 + i * 1.2, w: 7.8, h: 0.8,
    fontSize: 13, color: "DDDDDD", fontFace: "Arial", valign: "middle"
  });
});
s6.addText("UNGA Vote: 124 IN FAVOR · 43 abstained · 14 against (incl. U.S. & Israel)", {
  x: 0.5, y: 8.3, w: 9, h: 0.4,
  fontSize: 12, color: CRIMSON, fontFace: "Arial", bold: true, align: "center"
});
addFooter(s6, 6);

// ─── SLIDE 7: AIPAC & LOBBYING ───
let s7 = pptx.addSlide();
s7.background = { color: DARK_BG };
s7.addText("AIPAC & CONGRESSIONAL LOBBYING", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 3
});
s7.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s7.addText("$126.9M", {
  x: 0.5, y: 1.6, w: 9, h: 1.2,
  fontSize: 64, color: CRIMSON, fontFace: "Georgia", bold: true, align: "center"
});
s7.addText("AIPAC PAC + Super PAC spending in 2024 election cycle\nFEC filings — public record", {
  x: 0.8, y: 2.9, w: 8.4, h: 0.7,
  fontSize: 13, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.3
});
s7.addShape(pptx.ShapeType.rect, { x: 0.5, y: 3.9, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
const aipacStats = [
  { val: "389", label: "Congressional races\nfunded in 2024" },
  { val: "$28M", label: "Delivered in 2025–26\ncycle so far" },
  { val: "3x", label: "Larger than the\nnext-biggest PAC" },
  { val: "53+", label: "U.S. vetoes at\nUN Security Council" }
];
aipacStats.forEach((s, i) => {
  const xPos = 0.5 + i * 2.3;
  s7.addShape(pptx.ShapeType.rect, {
    x: xPos, y: 4.3, w: 2.0, h: 2.4,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
  });
  s7.addText(s.val, {
    x: xPos, y: 4.6, w: 2.0, h: 0.8,
    fontSize: 28, color: WHITE, fontFace: "Georgia", bold: true, align: "center"
  });
  s7.addText(s.label, {
    x: xPos + 0.1, y: 5.5, w: 1.8, h: 0.8,
    fontSize: 11, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.2
  });
});
s7.addText("AIPAC's Super PAC (United Democracy Project) targets Democratic\nprimaries to defeat candidates who criticize Israel's conduct.", {
  x: 0.5, y: 7.2, w: 9, h: 0.8,
  fontSize: 12, color: MUTED, fontFace: "Arial", italic: true, align: "center", lineSpacingMultiple: 1.3
});
s7.addText("Source: FEC filings · Read Sludge · The Intercept · TrackAIPAC.com", {
  x: 0.8, y: 8.3, w: 8.4, h: 0.3,
  fontSize: 9, color: MUTED, fontFace: "Arial", align: "center"
});
addFooter(s7, 7);

// ─── SLIDE 8: HIND RAJAB ───
let s8 = pptx.addSlide();
s8.background = { color: DARK_BG };
s8.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 0.5, w: 9, h: 0.3,
  fill: { color: "166534" }, rectRadius: 0.05
});
s8.addText("✓  VERIFIED — Multiple independent sources", {
  x: 0.8, y: 0.5, w: 8.4, h: 0.3,
  fontSize: 10, color: WHITE, fontFace: "Arial", bold: true
});
s8.addText("DOCUMENTED INCIDENT", {
  x: 0.5, y: 1.2, w: 9, h: 0.4,
  fontSize: 12, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 3
});
s8.addText("The Killing of Hind Rajab\nAge 5", {
  x: 0.5, y: 1.8, w: 9, h: 1.4,
  fontSize: 34, color: WHITE, fontFace: "Georgia", bold: true, align: "center", lineSpacingMultiple: 1.15
});
s8.addText("January 29, 2024 — Tel al-Hawa, Gaza City", {
  x: 0.5, y: 3.2, w: 9, h: 0.4,
  fontSize: 12, color: MUTED, fontFace: "Arial", align: "center"
});
s8.addShape(pptx.ShapeType.rect, { x: 0.5, y: 3.9, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s8.addShape(pptx.ShapeType.rect, {
  x: 0.8, y: 4.3, w: 8.4, h: 3.6,
  fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
});
s8.addText(
  "Hind and six family members were fleeing in a civilian vehicle when it was fired upon by an Israeli tank.\n\n" +
  "Her cousin Layan, 15, called the Red Crescent:\n\"They are shooting at us. The tank is right next to me.\"\n\n" +
  "All passengers except Hind were killed instantly. She survived alone for three hours, whispering to dispatchers:\n\"Come take me. I'm so scared.\"\n\n" +
  "Two paramedics dispatched with Israeli military coordination were also killed. 9 total dead.",
  {
    x: 1.1, y: 4.5, w: 7.8, h: 3.2,
    fontSize: 12, color: "CCCCCC", fontFace: "Arial", lineSpacingMultiple: 1.35, valign: "top"
  }
);
s8.addText("Sources: PRCS audio recordings · Euro-Med Monitor · Al Jazeera · Forensic Architecture", {
  x: 0.8, y: 8.3, w: 8.4, h: 0.3,
  fontSize: 9, color: MUTED, fontFace: "Arial", align: "center"
});
addFooter(s8, 8);

// ─── SLIDE 9: GDP DISPARITY & FAMINE ───
let s9 = pptx.addSlide();
s9.background = { color: DARK_BG };
s9.addText("THE ECONOMIC REALITY", {
  x: 0.5, y: 0.5, w: 9, h: 0.6,
  fontSize: 14, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 4
});
s9.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
// GDP comparison
s9.addShape(pptx.ShapeType.rect, {
  x: 0.5, y: 1.6, w: 4.2, h: 3.2,
  fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
});
s9.addText("ISRAEL", {
  x: 0.5, y: 1.8, w: 4.2, h: 0.4,
  fontSize: 11, color: MUTED, fontFace: "Arial", align: "center", charSpacing: 2
});
s9.addText("$54,177", {
  x: 0.5, y: 2.2, w: 4.2, h: 0.8,
  fontSize: 36, color: WHITE, fontFace: "Georgia", bold: true, align: "center"
});
s9.addText("GDP per capita", {
  x: 0.5, y: 3.0, w: 4.2, h: 0.3,
  fontSize: 11, color: MUTED, fontFace: "Arial", align: "center"
});
s9.addShape(pptx.ShapeType.rect, {
  x: 5.3, y: 1.6, w: 4.2, h: 3.2,
  fill: { color: "1A1A1A" }, line: { color: CRIMSON, width: 2 }, rectRadius: 0.1
});
s9.addText("PALESTINE", {
  x: 5.3, y: 1.8, w: 4.2, h: 0.4,
  fontSize: 11, color: MUTED, fontFace: "Arial", align: "center", charSpacing: 2
});
s9.addText("$2,592", {
  x: 5.3, y: 2.2, w: 4.2, h: 0.8,
  fontSize: 36, color: CRIMSON, fontFace: "Georgia", bold: true, align: "center"
});
s9.addText("GDP per capita", {
  x: 5.3, y: 3.0, w: 4.2, h: 0.3,
  fontSize: 11, color: MUTED, fontFace: "Arial", align: "center"
});
s9.addText("54:1 RATIO", {
  x: 3.5, y: 3.7, w: 3, h: 0.5,
  fontSize: 16, color: CRIMSON, fontFace: "Arial", bold: true, align: "center"
});
// Famine stats
s9.addShape(pptx.ShapeType.rect, { x: 0.5, y: 5.2, w: 9, h: 0.02, fill: { color: BORDER_GRAY } });
s9.addText("FAMINE CONDITIONS", {
  x: 0.5, y: 5.5, w: 9, h: 0.4,
  fontSize: 12, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 3, align: "center"
});
const famineStats = [
  { val: "85%", label: "Gaza GDP\ncontraction\n(Oct '23–Sep '24)" },
  { val: "2.23M", label: "People facing\ncrisis-level food\ninsecurity" },
  { val: "94,000", label: "Children treated\nfor acute\nmalnutrition in 2025" }
];
famineStats.forEach((s, i) => {
  const xPos = 0.5 + i * 3.1;
  s9.addShape(pptx.ShapeType.rect, {
    x: xPos, y: 6.2, w: 2.8, h: 2.2,
    fill: { color: "1A1A1A" }, line: { color: BORDER_GRAY, width: 1 }, rectRadius: 0.1
  });
  s9.addText(s.val, {
    x: xPos, y: 6.4, w: 2.8, h: 0.7,
    fontSize: 28, color: CRIMSON, fontFace: "Georgia", bold: true, align: "center"
  });
  s9.addText(s.label, {
    x: xPos + 0.2, y: 7.2, w: 2.4, h: 0.9,
    fontSize: 10, color: "AAAAAA", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.2
  });
});
s9.addText("Source: World Bank 2024 · IPC Special Brief Dec 2024 · WHO Nutrition Surveillance", {
  x: 0.5, y: 8.7, w: 9, h: 0.3,
  fontSize: 9, color: MUTED, fontFace: "Arial", align: "center"
});
addFooter(s9, 9);

// ─── SLIDE 10: CALL TO ACTION ───
let s10 = pptx.addSlide();
s10.background = { color: DARK_BG };
s10.addText("VERITAS WORLDWIDE PRESS", {
  x: 0.5, y: 1.5, w: 9, h: 0.5,
  fontSize: 13, color: CRIMSON, fontFace: "Arial", bold: true, charSpacing: 6, align: "center"
});
s10.addShape(pptx.ShapeType.rect, {
  x: 3.5, y: 2.2, w: 3, h: 0.03, fill: { color: CRIMSON }
});
s10.addText("Read the full\nIsrael Dossier", {
  x: 0.5, y: 2.8, w: 9, h: 2.0,
  fontSize: 44, color: WHITE, fontFace: "Georgia", bold: true, align: "center", lineSpacingMultiple: 1.15
});
s10.addText("Every figure sourced. Every claim documented.\nNo commentary. Just the record.", {
  x: 1, y: 5.0, w: 8, h: 0.8,
  fontSize: 15, color: "CCCCCC", fontFace: "Arial", align: "center", lineSpacingMultiple: 1.4
});
s10.addShape(pptx.ShapeType.rect, {
  x: 2.5, y: 6.3, w: 5, h: 0.8,
  fill: { color: CRIMSON }, rectRadius: 0.1
});
s10.addText("veritasworldwide.com/israel-dossier", {
  x: 2.5, y: 6.3, w: 5, h: 0.8,
  fontSize: 16, color: WHITE, fontFace: "Arial", bold: true, align: "center", valign: "middle"
});
s10.addText("Share this post · Save it · Send it to someone who needs to see it.", {
  x: 1, y: 7.5, w: 8, h: 0.5,
  fontSize: 13, color: "AAAAAA", fontFace: "Arial", align: "center"
});
s10.addText("\"The truth does not need your belief —\nit needs your voice.\"", {
  x: 1.5, y: 8.2, w: 7, h: 0.8,
  fontSize: 14, color: MUTED, fontFace: "Georgia", italic: true, align: "center", lineSpacingMultiple: 1.3
});
addFooter(s10, 10);

// ─── WRITE FILE ───
const outPath = "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/israel-dossier-carousel.pptx";
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log("✅ Israel Dossier carousel saved:", outPath);
}).catch(err => console.error("Error:", err));
