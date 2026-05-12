import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, "outputs");
await fs.mkdir(outDir, { recursive: true });

const W = 2200;
const H = 1400;

const C = {
  paper: "#f7f5ee",
  white: "#ffffff",
  ink: "#171717",
  muted: "#59636a",
  yellow: "#f4c430",
  green: "#4f765c",
  greenLight: "#dfe8d9",
  yellowLight: "#fff3b0",
  steel: "#dfe4e4",
  steel2: "#eef1ef",
  line: "#b7c0bd",
  blue: "#5b7f95",
  red: "#b65a52",
};

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function text(text, x, y, opts = {}) {
  const size = opts.size ?? 28;
  const fill = opts.fill ?? C.ink;
  const weight = opts.weight ?? 400;
  const family = opts.family ?? "Aptos, Arial, Helvetica, sans-serif";
  const max = opts.max ?? 32;
  const lineH = opts.lineH ?? size * 1.25;
  const lines = wrap(text, max).slice(0, opts.maxLines ?? 10);
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" ${opts.anchor ? `text-anchor="${opts.anchor}"` : ""}>
${lines.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineH}">${esc(line)}</tspan>`).join("")}
</text>`;
}

function pill(x, y, w, h, label, fill, stroke = "#d9ddd7", opts = {}) {
  const size = opts.size ?? 25;
  const lines = wrap(label, opts.max ?? Math.floor(w / (size * 0.47))).slice(0, opts.maxLines ?? 2);
  const totalH = (lines.length - 1) * size * 1.1;
  const startY = y + h / 2 - totalH / 2 + size * 0.34;
  return `<g>
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${opts.rx ?? 18}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
  <text x="${x + w / 2}" y="${startY}" font-family="Aptos, Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${opts.weight ?? 700}" fill="${opts.color ?? C.ink}" text-anchor="middle">
    ${lines.map((line, i) => `<tspan x="${x + w / 2}" dy="${i === 0 ? 0 : size * 1.1}">${esc(line)}</tspan>`).join("")}
  </text>
</g>`;
}

function section(x, y, w, h, title, fill = C.white, accent = C.yellow) {
  return `<g filter="url(#softShadow)">
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${fill}" stroke="#d7ddd8" stroke-width="2"/>
  <rect x="${x}" y="${y}" width="${w}" height="64" rx="28" fill="${accent}" opacity="0.16"/>
  <rect x="${x + 24}" y="${y + 26}" width="70" height="8" rx="4" fill="${accent}"/>
  ${text(title, x + 112, y + 43, { size: 27, weight: 800, fill: C.ink, max: 50 })}
</g>`;
}

function arrow(x1, y1, x2, y2, opts = {}) {
  const color = opts.color ?? C.line;
  const dash = opts.dash ? `stroke-dasharray="${opts.dash}"` : "";
  return `<path d="M ${x1} ${y1} C ${(x1 + x2) / 2} ${y1}, ${(x1 + x2) / 2} ${y2}, ${x2} ${y2}" fill="none" stroke="${color}" stroke-width="${opts.width ?? 4}" ${dash} marker-end="url(#arrow)"/>`;
}

function smallLabel(x, y, textValue, fill = C.white) {
  const w = Math.max(170, textValue.length * 11 + 28);
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="34" rx="17" fill="${fill}" stroke="#ccd3cf" stroke-width="1"/>
    ${text(textValue, x + w / 2, y + 23, { size: 18, weight: 700, fill: C.muted, anchor: "middle", max: 60 })}
  </g>`;
}

const userPills = [
  "Customer buyer",
  "Fleet manager",
  "Service manager",
  "Internal support",
  "Business admin",
];

const portalModules = [
  "Shop / quotes / orders",
  "My Fleet overview",
  "Electronic manuals",
  "Safety & parts bulletins",
  "Digital service insights",
  "Warranty claims",
];

const appServices = [
  "Account & RBAC service",
  "Catalog / pricing service",
  "Order / quote service",
  "Asset & fleet service",
  "Warranty case service",
  "Content / manuals service",
  "Reporting / notification service",
];

const systems = [
  "ERP / order management",
  "CRM / customer master",
  "PIM / parts catalogue",
  "Asset registry / fleet master",
  "Warranty system",
  "CMS / DAM / manuals",
  "IoT / telemetry platform",
];

const dataLayer = [
  "Raw / curated data lake (S3 or equivalent)",
  "Data processing (Databricks / Spark / Glue)",
  "Analytics warehouse (Snowflake or equivalent)",
  "Data catalogue / lineage / ownership",
  "BI dashboards & portal reports",
];

let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
<defs>
  <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#1d2428" flood-opacity="0.12"/>
  </filter>
  <marker id="arrow" markerWidth="14" markerHeight="14" refX="12" refY="7" orient="auto" markerUnits="strokeWidth">
    <path d="M 0 0 L 14 7 L 0 14 z" fill="${C.line}"/>
  </marker>
  <pattern id="dots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1.7" fill="#cfd5d1" opacity="0.45"/>
  </pattern>
</defs>
<rect width="${W}" height="${H}" fill="${C.paper}"/>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#dots)" opacity="0.55"/>
<circle cx="1950" cy="155" r="210" fill="${C.yellow}" opacity="0.18"/>
<circle cx="120" cy="1260" r="260" fill="${C.green}" opacity="0.10"/>

${text("My Sandvik Customer Portal", 70, 76, { size: 52, weight: 900, max: 42 })}
${text("High-level architecture inferred from public portal features", 72, 120, { size: 26, fill: C.muted, max: 80 })}
${text("Technology examples are plausible/typical for this kind of service, not confirmed Sandvik internal implementation.", 72, 156, { size: 21, fill: C.red, max: 110 })}

${smallLabel(1570, 54, "Publicly described functions", C.greenLight)}
${smallLabel(1570, 98, "Inferred / typical technology", C.yellowLight)}
${smallLabel(1570, 142, "Governance & operations", C.steel2)}

${section(60, 220, 260, 820, "Users", C.white, C.green)}
${section(370, 220, 420, 820, "Experience Layer", C.white, C.green)}
${section(840, 220, 420, 820, "API & Application Services", C.white, C.yellow)}
${section(1310, 220, 390, 820, "Systems Of Record", C.white, C.yellow)}
${section(1740, 220, 400, 820, "Data Platform", C.white, C.yellow)}
${section(60, 1090, 2080, 250, "Cross-Cutting Operations", C.white, C.steel)}
`;

userPills.forEach((label, i) => {
  svg += pill(90, 320 + i * 118, 200, 72, label, C.greenLight, "#bdcabc", { size: 22, max: 17 });
});

svg += pill(430, 300, 300, 82, "My Sandvik portal web / mobile experience", C.greenLight, "#bdcabc", { size: 23, max: 22 });
portalModules.forEach((label, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  svg += pill(405 + col * 190, 430 + row * 118, 165, 76, label, i < 4 ? C.greenLight : C.white, "#bdcabc", { size: 19, max: 14 });
});
svg += pill(430, 820, 300, 76, "Quick sign-up / login", C.greenLight, "#bdcabc", { size: 22 });

svg += pill(885, 300, 330, 76, "CDN / WAF / Load Balancer", C.yellowLight, "#dfd29d", { size: 21, max: 26 });
svg += pill(885, 396, 330, 76, "IAM / SSO / MFA / RBAC", C.yellowLight, "#dfd29d", { size: 21, max: 26 });
svg += pill(885, 492, 330, 76, "API Gateway / BFF / REST APIs", C.yellowLight, "#dfd29d", { size: 20, max: 26 });
appServices.forEach((label, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const width = col === 0 ? 155 : 155;
  svg += pill(875 + col * 180, 604 + row * 84, width, 60, label, C.white, "#d3d7d0", { size: 16, max: 15, maxLines: 2 });
});

systems.forEach((label, i) => {
  svg += pill(1345, 300 + i * 90, 320, 60, label, C.white, "#d3d7d0", { size: 18, max: 27 });
});

dataLayer.forEach((label, i) => {
  svg += pill(1775, 300 + i * 118, 330, 78, label, i === 3 ? C.greenLight : C.white, "#d3d7d0", { size: 18, max: 29 });
});

svg += arrow(290, 500, 405, 500, { width: 4 });
svg += arrow(730, 500, 885, 500, { width: 4 });
svg += arrow(1215, 500, 1345, 500, { width: 4 });
svg += arrow(1665, 590, 1775, 590, { width: 4 });
svg += arrow(1940, 850, 1060, 910, { width: 3, dash: "9 9", color: "#8da39a" });
svg += text("analytics / insights back to portal", 1518, 942, { size: 17, fill: C.green, weight: 700, max: 40 });

svg += pill(105, 1190, 245, 58, "CI/CD pipelines", C.steel2, "#cdd3d0", { size: 20 });
svg += pill(380, 1190, 285, 58, "IaC: Terraform / CloudFormation / CDK", C.steel2, "#cdd3d0", { size: 18, max: 28 });
svg += pill(695, 1190, 280, 58, "AWS infrastructure example", C.steel2, "#cdd3d0", { size: 19 });
svg += pill(1005, 1190, 275, 58, "Blue-green / canary releases", C.steel2, "#cdd3d0", { size: 18, max: 26 });
svg += pill(1310, 1190, 260, 58, "Monitoring: logs, SLAs, MTTR", C.steel2, "#cdd3d0", { size: 18, max: 28 });
svg += pill(1600, 1190, 230, 58, "GDPR / ISEC controls", C.steel2, "#cdd3d0", { size: 18 });
svg += pill(1860, 1190, 220, 58, "Supplier governance", C.steel2, "#cdd3d0", { size: 18 });

svg += text("Service ownership, DevOps and security controls across every layer.", 140, 1164, { size: 19, fill: C.muted, weight: 700, max: 95 });
svg += `<line x1="120" y1="1282" x2="2080" y2="1282" stroke="${C.line}" stroke-width="3" stroke-dasharray="10 12"/>`;
svg += text("Service Owner focus: reliability, roadmap alignment, access control, data quality, supplier performance, release readiness, security, customer experience and measurable improvement.", 140, 1322, { size: 20, fill: C.ink, weight: 800, max: 180, maxLines: 2 });

svg += text("Public feature basis: Shop, My Fleet, electronic manuals, bulletins, Digital Service Solutions, warranty portal, quick sign-up/login.", 70, 1376, { size: 16, fill: C.muted, max: 135, maxLines: 1 });
svg += text("Architecture note: technologies are interview-ready examples, not a claim about Sandvik's private implementation.", 1145, 1376, { size: 16, fill: C.red, max: 98, maxLines: 1 });
svg += `</svg>`;

const svgPath = path.join(outDir, "mysandvik-high-level-architecture.svg");
const pngPath = path.join(outDir, "mysandvik-high-level-architecture.png");
await fs.writeFile(svgPath, svg, "utf8");
await sharp(Buffer.from(svg)).png().toFile(pngPath);
console.log(pngPath);
console.log(svgPath);
