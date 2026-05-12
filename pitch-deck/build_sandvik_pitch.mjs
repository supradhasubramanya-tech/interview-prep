import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { Presentation, PresentationFile } = await import("@oai/artifact-tool");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUT = path.join(__dirname, "outputs");
const TMP = path.join(__dirname, "tmp");
const IMG = path.join(TMP, "reference-images");
await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(path.join(TMP, "previews"), { recursive: true });

const W = 1280;
const H = 720;

const C = {
  ink: "#171717",
  muted: "#5C646B",
  lightMuted: "#7B848B",
  paper: "#F7F7F2",
  white: "#FFFFFF",
  yellow: "#F4C430",
  green: "#4F765C",
  steel: "#D5DCE0",
  steelDark: "#374047",
  line: "#D9DDD9",
};

const FONT = {
  title: "Poppins",
  body: "Lato",
  mono: "Aptos Mono",
};

async function readImageBlob(imagePath) {
  const bytes = await fs.readFile(imagePath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function addText(slide, text, position, style = {}) {
  const shape = slide.shapes.add({
    geometry: "rect",
    position,
    fill: { color: "#FFFFFF", transparency: 100000 },
    line: { width: 0, fill: "#FFFFFF00" },
  });
  shape.text = text;
  shape.text.typeface = style.typeface || FONT.body;
  shape.text.fontSize = style.fontSize || 24;
  shape.text.color = style.color || C.ink;
  shape.text.bold = Boolean(style.bold);
  shape.text.alignment = style.alignment || "left";
  shape.text.verticalAlignment = style.verticalAlignment || "top";
  shape.text.insets = style.insets || { left: 0, right: 0, top: 0, bottom: 0 };
  if (style.autoFit) shape.text.autoFit = style.autoFit;
  return shape;
}

function addPanel(slide, position, opts = {}) {
  return slide.shapes.add({
    geometry: "roundRect",
    adjustmentList: [{ name: "adj", formula: `val ${opts.radius ?? 10000}` }],
    position,
    fill: opts.fill || C.white,
    line: opts.line || { style: "solid", fill: "#FFFFFF", width: 0 },
  });
}

function addRule(slide, left, top, width, color = C.yellow, height = 5) {
  slide.shapes.add({
    geometry: "rect",
    position: { left, top, width, height },
    fill: color,
    line: { width: 0, fill: color },
  });
}

function addMetric(slide, left, top, value, label, accent = C.yellow) {
  addPanel(slide, { left, top, width: 185, height: 92 }, {
    fill: "#FFFFFFE8",
    line: { style: "solid", fill: "#E6E6DD", width: 1 },
    radius: 7000,
  });
  addRule(slide, left + 18, top + 15, 36, accent, 4);
  addText(slide, value, { left: left + 18, top: top + 25, width: 150, height: 34 }, {
    typeface: FONT.title,
    fontSize: 28,
    bold: true,
    color: C.ink,
  });
  addText(slide, label, { left: left + 18, top: top + 61, width: 145, height: 24 }, {
    fontSize: 13,
    color: C.muted,
    autoFit: "shrinkText",
  });
}

function addValueCard(slide, left, top, title, body, accent = C.yellow) {
  addPanel(slide, { left, top, width: 247, height: 182 }, {
    fill: "#FFFFFFE8",
    line: { style: "solid", fill: "#E2E5E1", width: 1 },
    radius: 8000,
  });
  addRule(slide, left + 24, top + 22, 42, accent, 5);
  addText(slide, title, { left: left + 24, top: top + 42, width: 198, height: 38 }, {
    typeface: FONT.title,
    fontSize: 25,
    bold: true,
    color: C.ink,
    autoFit: "shrinkText",
  });
  addText(slide, body, { left: left + 24, top: top + 92, width: 197, height: 66 }, {
    fontSize: 18,
    color: C.steelDark,
    autoFit: "shrinkText",
  });
}

function addOutcome(slide, left, top, title, body, accent = C.green) {
  addPanel(slide, { left, top, width: 310, height: 86 }, {
    fill: "#FFFFFFEE",
    line: { style: "solid", fill: "#E1E5E0", width: 1 },
    radius: 6500,
  });
  slide.shapes.add({
    geometry: "ellipse",
    position: { left: left + 18, top: top + 21, width: 20, height: 20 },
    fill: accent,
    line: { width: 0, fill: accent },
  });
  addText(slide, title, { left: left + 50, top: top + 16, width: 230, height: 26 }, {
    typeface: FONT.title,
    fontSize: 20,
    bold: true,
    color: C.ink,
    autoFit: "shrinkText",
  });
  addText(slide, body, { left: left + 50, top: top + 44, width: 235, height: 30 }, {
    fontSize: 14.5,
    color: C.muted,
    autoFit: "shrinkText",
  });
}

function addStep(slide, left, top, num, title, body) {
  slide.shapes.add({
    geometry: "ellipse",
    position: { left, top, width: 48, height: 48 },
    fill: C.yellow,
    line: { width: 0, fill: C.yellow },
  });
  addText(slide, num, { left, top: top + 9, width: 48, height: 28 }, {
    typeface: FONT.title,
    fontSize: 22,
    bold: true,
    color: C.ink,
    alignment: "center",
    verticalAlignment: "middle",
  });
  addText(slide, title, { left: left + 62, top: top - 2, width: 175, height: 25 }, {
    typeface: FONT.title,
    fontSize: 18,
    bold: true,
    color: C.ink,
  });
  addText(slide, body, { left: left + 62, top: top + 25, width: 175, height: 40 }, {
    fontSize: 13.5,
    color: C.muted,
    autoFit: "shrinkText",
  });
}

const presentation = Presentation.create({ slideSize: { width: W, height: H } });
presentation.theme.colorScheme = {
  name: "Sandvik Pitch",
  themeColors: {
    bg1: C.paper,
    tx1: C.ink,
    bg2: C.white,
    tx2: C.muted,
    accent1: C.yellow,
    accent2: C.green,
    accent3: C.steel,
    accent4: C.steelDark,
  },
};

// Slide 1
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  const img = slide.images.add({
    blob: await readImageBlob(path.join(IMG, "slide-01.png")),
    fit: "cover",
    alt: "Industrial customer portal and mining service operations visual",
  });
  img.position = { left: 0, top: 0, width: W, height: H };
  slide.shapes.add({
    geometry: "rect",
    position: { left: 0, top: 0, width: 670, height: H },
    fill: { color: C.paper, transparency: 5000 },
    line: { width: 0, fill: C.paper },
  });
  addText(slide, "ANURADHA SRINIVASAN", { left: 70, top: 54, width: 470, height: 32 }, {
    typeface: FONT.mono,
    fontSize: 21,
    color: C.muted,
    letterSpacing: 0,
  });
  addRule(slide, 70, 105, 72, C.yellow, 6);
  addText(slide, "Reliable digital services customers can trust", { left: 70, top: 135, width: 565, height: 176 }, {
    typeface: FONT.title,
    fontSize: 50,
    bold: true,
    color: C.ink,
    autoFit: "shrinkText",
  });
  addText(slide, "IT Service Owner - Customer Portal", { left: 72, top: 328, width: 450, height: 34 }, {
    typeface: FONT.title,
    fontSize: 24,
    bold: true,
    color: C.green,
  });
  addText(slide, "I bring service ownership, customer-facing digital platform delivery, ITIL governance, agile roadmap discipline, and measurable improvement across business, IT, security, suppliers, and users.", { left: 72, top: 382, width: 535, height: 95 }, {
    fontSize: 21,
    color: C.steelDark,
    autoFit: "shrinkText",
  });
  addMetric(slide, 72, 545, "50%", "faster service request turnaround", C.yellow);
  addMetric(slide, 275, 545, "40%", "delivery performance improvement", C.green);
  addMetric(slide, 478, 545, "80+", "engineers and stakeholders coordinated", C.steelDark);
  slide.speakerNotes.setText("Open with the simple pitch: I make business-critical customer-facing IT services reliable, measurable, well-governed, and continuously improved.");
}

// Slide 2
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  const img = slide.images.add({
    blob: await readImageBlob(path.join(IMG, "slide-02.png")),
    fit: "cover",
    alt: "Cross-functional service leadership and dashboard visual",
  });
  img.position = { left: 0, top: 0, width: W, height: H };
  slide.shapes.add({
    geometry: "rect",
    position: { left: 0, top: 0, width: W, height: H },
    fill: { color: "#FFFFFF", transparency: 23000 },
    line: { width: 0, fill: "#FFFFFF" },
  });
  addText(slide, "How I Create Impact", { left: 72, top: 54, width: 640, height: 58 }, {
    typeface: FONT.title,
    fontSize: 42,
    bold: true,
    color: C.ink,
  });
  addText(slide, "My operating style is calm, transparent and measurable: make the service visible, make ownership clear, and improve the flow.", { left: 74, top: 116, width: 760, height: 52 }, {
    fontSize: 21,
    color: C.steelDark,
    autoFit: "shrinkText",
  });
  addValueCard(slide, 72, 278, "Transparency", "Clear goals, risks, trade-offs and decisions.", C.yellow);
  addValueCard(slide, 355, 278, "Data-driven", "KPIs, dashboards, SLA/service health and adoption signals.", C.green);
  addValueCard(slide, 638, 278, "Accountability", "End-to-end ownership across teams, suppliers and outcomes.", C.steelDark);
  addValueCard(slide, 921, 278, "Timeliness", "Predictable releases, early escalation and faster value realization.", C.yellow);
  addPanel(slide, { left: 72, top: 596, width: 720, height: 52 }, {
    fill: "#171717E8",
    line: { width: 0, fill: C.ink },
    radius: 8000,
  });
  addText(slide, "Conflict handling principle: facts first, people respected, decisions visible.", { left: 96, top: 611, width: 664, height: 28 }, {
    typeface: FONT.title,
    fontSize: 20,
    bold: true,
    color: C.white,
    autoFit: "shrinkText",
  });
  slide.speakerNotes.setText("Use this slide to explain your T-DAT style: transparency, data-driven thinking, accountability and timeliness. Mention that this also helps with conflict resolution because decisions become fact-based.");
}

// Slide 3
{
  const slide = presentation.slides.add();
  slide.background.fill = C.paper;
  const img = slide.images.add({
    blob: await readImageBlob(path.join(IMG, "slide-03.png")),
    fit: "cover",
    alt: "Global digital customer portal operations ecosystem visual",
  });
  img.position = { left: 0, top: 0, width: W, height: H };
  slide.shapes.add({
    geometry: "rect",
    position: { left: 0, top: 0, width: W, height: H },
    fill: { color: "#FFFFFF", transparency: 15000 },
    line: { width: 0, fill: "#FFFFFF" },
  });
  slide.shapes.add({
    geometry: "rect",
    position: { left: 0, top: 0, width: 525, height: H },
    fill: { color: C.paper, transparency: 2000 },
    line: { width: 0, fill: C.paper },
  });
  addText(slide, "What I Bring To My Sandvik", { left: 64, top: 48, width: 460, height: 104 }, {
    typeface: FONT.title,
    fontSize: 39,
    bold: true,
    color: C.ink,
    autoFit: "shrinkText",
  });
  addRule(slide, 66, 159, 72, C.yellow, 6);
  addText(slide, "A practical Service Owner operating model for a portal that must be reliable, secure, measurable and easy for customers to use.", { left: 66, top: 188, width: 405, height: 94 }, {
    fontSize: 21,
    color: C.steelDark,
    autoFit: "shrinkText",
  });
  addOutcome(slide, 575, 80, "Service Reliability", "SLAs, incidents, root causes and operational readiness.", C.green);
  addOutcome(slide, 915, 80, "Roadmap Alignment", "Business value, customer impact and clear prioritization.", C.yellow);
  addOutcome(slide, 575, 188, "Supplier Governance", "Performance follow-up, ownership and escalation discipline.", C.steelDark);
  addOutcome(slide, 915, 188, "Security Awareness", "Controls, audit readiness and secure release thinking.", C.green);
  addOutcome(slide, 745, 296, "Continuous Improvement", "Use trends and feedback to reduce friction over time.", C.yellow);
  addPanel(slide, { left: 64, top: 432, width: 1115, height: 170 }, {
    fill: "#FFFFFFE8",
    line: { style: "solid", fill: "#E1E5E0", width: 1 },
    radius: 9000,
  });
  addText(slide, "First 90 days", { left: 92, top: 457, width: 185, height: 32 }, {
    typeface: FONT.title,
    fontSize: 25,
    bold: true,
    color: C.ink,
  });
  addStep(slide, 290, 465, "30", "Baseline", "Service boundaries, stakeholders, SLAs, incidents and suppliers.");
  addStep(slide, 575, 465, "60", "Stabilize", "Top pain points, governance cadence and escalation paths.");
  addStep(slide, 860, 465, "90", "Scale", "Measurable roadmap, adoption, reporting and improvements.");
  addText(slide, "Goal: clear ownership from customer need to reliable portal value.", { left: 94, top: 626, width: 740, height: 34 }, {
    typeface: FONT.title,
    fontSize: 23,
    bold: true,
    color: C.green,
    autoFit: "shrinkText",
  });
  slide.speakerNotes.setText("Close by tying your background to My Sandvik: service reliability, roadmap alignment, supplier governance, security awareness and continuous improvement. Then ask what the top portal priorities are for the first year.");
}

for (let i = 0; i < presentation.slides.count; i += 1) {
  const slide = presentation.slides.getItem(i);
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(
    path.join(TMP, "previews", `slide-${String(i + 1).padStart(2, "0")}.png`),
    Buffer.from(await png.arrayBuffer()),
  );
}

const pptx = await PresentationFile.exportPptx(presentation);
const outputPath = path.join(OUT, "anuradha-sandvik-self-pitch.pptx");
await pptx.save(outputPath);

console.log(outputPath);
