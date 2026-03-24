import pptxgenjs from "pptxgenjs";

const DARK_BG = "0F0F0F";
const CRIMSON = "8B1A1A";
const WHITE = "FFFFFF";
const MUTED = "666666";
const BORDER = "333333";

// ═══════════════════════════════════════════════════════════
// PIN 1: BRAND HERO — "The Record"
// ═══════════════════════════════════════════════════════════
const pin1 = new pptxgenjs();
pin1.defineLayout({ name:"IG", w:10, h:10 }); pin1.layout="IG";
let s1 = pin1.addSlide();
s1.background = { color: DARK_BG };
// Crimson accent bar at top
s1.addShape(pin1.ShapeType.rect, { x:0,y:0,w:10,h:0.08,fill:{color:CRIMSON} });
// Brand name
s1.addText("VERITAS WORLDWIDE PRESS", {
  x:0.5,y:1.2,w:9,h:0.5,fontSize:14,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:6,align:"center"
});
s1.addShape(pin1.ShapeType.rect, { x:3.5,y:2.0,w:3,h:0.03,fill:{color:CRIMSON} });
// Main title
s1.addText("The Record", {
  x:0.5,y:2.5,w:9,h:1.8,fontSize:64,color:WHITE,fontFace:"Georgia",bold:true,align:"center"
});
s1.addText("A Documentary History of Power, Money &\nthe Institutions That Shaped the Modern World", {
  x:0.8,y:4.4,w:8.4,h:1.0,fontSize:15,color:"CCCCCC",fontFace:"Arial",italic:true,align:"center",lineSpacingMultiple:1.35
});
// Stats row
const heroStats = [
  { val:"31", label:"Chapters" },
  { val:"240+", label:"Years" },
  { val:"500+", label:"Sources" },
  { val:"100%", label:"Free" }
];
heroStats.forEach((st, i) => {
  const xPos = 0.5 + i * 2.3;
  s1.addShape(pin1.ShapeType.rect, {
    x:xPos,y:5.8,w:2.0,h:1.6,fill:{color:"1A1A1A"},line:{color:BORDER,width:1},rectRadius:0.1
  });
  s1.addText(st.val, { x:xPos,y:5.9,w:2.0,h:0.8,fontSize:30,color:CRIMSON,fontFace:"Georgia",bold:true,align:"center" });
  s1.addText(st.label, { x:xPos,y:6.7,w:2.0,h:0.4,fontSize:11,color:"AAAAAA",fontFace:"Arial",align:"center" });
});
s1.addText("Primary Sources · Public Record · Your Conclusions", {
  x:1,y:7.8,w:8,h:0.4,fontSize:13,color:MUTED,fontFace:"Arial",align:"center"
});
// CTA
s1.addShape(pin1.ShapeType.rect, { x:2.5,y:8.5,w:5,h:0.7,fill:{color:CRIMSON},rectRadius:0.1 });
s1.addText("veritasworldwide.com", { x:2.5,y:8.5,w:5,h:0.7,fontSize:16,color:WHITE,fontFace:"Arial",bold:true,align:"center",valign:"middle" });
// Bottom accent bar
s1.addShape(pin1.ShapeType.rect, { x:0,y:9.92,w:10,h:0.08,fill:{color:CRIMSON} });

await pin1.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pinned-1-the-record.pptx" });
console.log("✅ Pin 1: The Record (Brand Hero)");

// ═══════════════════════════════════════════════════════════
// PIN 2: ISRAEL DOSSIER FEATURE
// ═══════════════════════════════════════════════════════════
const pin2 = new pptxgenjs();
pin2.defineLayout({ name:"IG", w:10, h:10 }); pin2.layout="IG";
let s2 = pin2.addSlide();
s2.background = { color: DARK_BG };
s2.addShape(pin2.ShapeType.rect, { x:0,y:0,w:10,h:0.08,fill:{color:CRIMSON} });
s2.addText("SPECIAL INVESTIGATION", {
  x:0.5,y:0.8,w:9,h:0.4,fontSize:12,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:4,align:"center"
});
s2.addText("The Israel Dossier", {
  x:0.5,y:1.5,w:9,h:1.2,fontSize:48,color:WHITE,fontFace:"Georgia",bold:true,align:"center"
});
s2.addShape(pin2.ShapeType.rect, { x:3.5,y:2.9,w:3,h:0.03,fill:{color:CRIMSON} });
s2.addText("Every figure sourced to government records", {
  x:0.8,y:3.2,w:8.4,h:0.5,fontSize:14,color:"CCCCCC",fontFace:"Arial",italic:true,align:"center"
});
// 4 key stats
const dossierStats = [
  { val:"$310B+", label:"U.S. Aid" },
  { val:"75,000+", label:"Killed" },
  { val:"17,000+", label:"Children" },
  { val:"14,000+", label:"Bombs" }
];
dossierStats.forEach((st, i) => {
  const xPos = 0.5 + i * 2.3;
  s2.addShape(pin2.ShapeType.rect, {
    x:xPos,y:4.0,w:2.0,h:2.0,fill:{color:"1A1A1A"},line:{color:BORDER,width:1},rectRadius:0.1
  });
  s2.addText(st.val, { x:xPos,y:4.2,w:2.0,h:0.9,fontSize:26,color:CRIMSON,fontFace:"Georgia",bold:true,align:"center" });
  s2.addText(st.label, { x:xPos,y:5.1,w:2.0,h:0.5,fontSize:12,color:"AAAAAA",fontFace:"Arial",align:"center" });
});
// Source badges
s2.addText("Sources: CRS · UN OCHA · ICJ · CPJ · B'Tselem · SIPRI · The Lancet", {
  x:0.5,y:6.4,w:9,h:0.4,fontSize:10,color:MUTED,fontFace:"Arial",align:"center"
});
// Key quote
s2.addShape(pin2.ShapeType.rect, {
  x:0.8,y:7.0,w:8.4,h:1.2,fill:{color:"1A1A1A"},line:{color:CRIMSON,width:2},rectRadius:0.1
});
s2.addText("Interactive · Click any stat to expand · Full source links\nRead the documented record at veritasworldwide.com/israel-dossier", {
  x:1.0,y:7.1,w:8.0,h:1.0,fontSize:12,color:"CCCCCC",fontFace:"Arial",align:"center",lineSpacingMultiple:1.4
});
// CTA
s2.addShape(pin2.ShapeType.rect, { x:2.5,y:8.6,w:5,h:0.7,fill:{color:CRIMSON},rectRadius:0.1 });
s2.addText("READ THE FULL DOSSIER", { x:2.5,y:8.6,w:5,h:0.7,fontSize:15,color:WHITE,fontFace:"Arial",bold:true,align:"center",valign:"middle" });
s2.addShape(pin2.ShapeType.rect, { x:0,y:9.92,w:10,h:0.08,fill:{color:CRIMSON} });

await pin2.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pinned-2-israel-dossier.pptx" });
console.log("✅ Pin 2: Israel Dossier Feature");

// ═══════════════════════════════════════════════════════════
// PIN 3: CALL TO ACTION — SHARE THE TRUTH
// ═══════════════════════════════════════════════════════════
const pin3 = new pptxgenjs();
pin3.defineLayout({ name:"IG", w:10, h:10 }); pin3.layout="IG";
let s3 = pin3.addSlide();
s3.background = { color: DARK_BG };
s3.addShape(pin3.ShapeType.rect, { x:0,y:0,w:10,h:0.08,fill:{color:CRIMSON} });
s3.addText("VERITAS WORLDWIDE PRESS", {
  x:0.5,y:1.5,w:9,h:0.5,fontSize:13,color:CRIMSON,fontFace:"Arial",bold:true,charSpacing:5,align:"center"
});
s3.addShape(pin3.ShapeType.rect, { x:3.5,y:2.3,w:3,h:0.03,fill:{color:CRIMSON} });
s3.addText("The truth does\nnot need\nyour belief.", {
  x:0.5,y:2.8,w:9,h:3.0,fontSize:48,color:WHITE,fontFace:"Georgia",bold:true,align:"center",lineSpacingMultiple:1.15
});
s3.addText("It needs your voice.", {
  x:0.5,y:5.8,w:9,h:1.0,fontSize:40,color:CRIMSON,fontFace:"Georgia",italic:true,align:"center"
});
s3.addShape(pin3.ShapeType.rect, { x:0.5,y:7.2,w:9,h:0.02,fill:{color:BORDER} });
s3.addText("31 Chapters · 500+ Primary Sources · 100% Free", {
  x:1,y:7.5,w:8,h:0.4,fontSize:13,color:"AAAAAA",fontFace:"Arial",align:"center"
});
s3.addText("No ads · No paywalls · No sponsors", {
  x:1,y:7.9,w:8,h:0.4,fontSize:12,color:MUTED,fontFace:"Arial",align:"center"
});
// CTA
s3.addShape(pin3.ShapeType.rect, { x:2.5,y:8.6,w:5,h:0.7,fill:{color:CRIMSON},rectRadius:0.1 });
s3.addText("veritasworldwide.com", { x:2.5,y:8.6,w:5,h:0.7,fontSize:16,color:WHITE,fontFace:"Arial",bold:true,align:"center",valign:"middle" });
s3.addShape(pin3.ShapeType.rect, { x:0,y:9.92,w:10,h:0.08,fill:{color:CRIMSON} });

await pin3.writeFile({ fileName: "/Users/brandonrollins/Documents/GitHub/veritas-worldwide/social-assets/pinned-3-share-the-truth.pptx" });
console.log("✅ Pin 3: Share The Truth CTA");

console.log("\n🎉 All 3 pinned profile images generated!");
