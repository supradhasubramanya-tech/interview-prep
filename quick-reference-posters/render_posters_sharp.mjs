import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { PDFDocument } from "pdf-lib";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const W = 1654;
const H = 2339;
const outDir = path.join(__dirname, "outputs");
const bgPath = path.join(__dirname, "assets", "sticky-background.png");
await fs.mkdir(outDir, { recursive: true });

const posters = [
  {
    part: "Part 1",
    title: "Opening Pitch",
    subtitle: "Use this page for the first 5 minutes: tell me about yourself, why Sandvik, and why you fit.",
    notes: [
      ["yellow", "Core Positioning", "I own customer-facing digital services so they stay reliable, measurable, well-governed and continuously improved.", "Anchor words: service reliability, user value, governance, alignment, measurable outcomes."],
      ["white", "Tell Me About Yourself", "14+ years across IT service delivery, customer-facing platforms, agile application delivery and stakeholder governance. I create clarity across business, IT, engineering, operations, security, suppliers and users."],
      ["green", "Why Sandvik", "Sandvik combines industrial engineering, global scale, sustainability and digital transformation. My Sandvik directly affects parts, fleet data, manuals, warranty, digital services and customer trust."],
      ["gray", "Why I Fit", "ITIL + agile delivery + customer portals + supplier coordination + SLA/KPI reporting + governance + continuous improvement."],
      ["yellow", "Proof Points", "50% faster service request turnaround. 40% delivery performance improvement. 80+ engineers and stakeholders coordinated. Jira/Confluence dashboards for delivery health, risks, KPIs and service visibility."],
      ["white", "Closing Line", "The value I bring is structured service ownership: reliable, secure, measurable digital services with clear ownership from customer need to business value."],
    ],
  },
  {
    part: "Part 2",
    title: "Sandvik + My Sandvik",
    subtitle: "Use this when they ask what you know about Sandvik, Mining, or the customer portal.",
    notes: [
      ["yellow", "Sandvik Snapshot", ["Purpose: Advancing the world through engineering.", "Values: Winning together, Curiosity, Responsibility, Customer focus.", "Strategy: Advancing to 2030.", "Digital target: SEK 13B digital revenue by 2030."]],
      ["green", "Mining Context", ["Equipment, tools, parts, services and digital solutions.", "Priorities: aftermarket growth, automation, mining software, electrification.", "Portal is close to aftermarket, uptime and customer self-service."]],
      ["white", "My Sandvik Features", ["Shop, quotes and online ordering.", "Fleet overview, status and warranty dates.", "Electronic manuals and bulletins.", "Digital service insights and warranty claims."]],
      ["gray", "Why It Matters", ["Customers find parts and service data faster.", "Better uptime and maintenance decisions.", "Sandvik grows aftermarket and digital engagement.", "One portal links customer experience to business value."]],
      ["yellow", "Service Owner Lens", "My Sandvik is a business-critical digital service, not just an application. Understand boundaries, journeys, suppliers, integrations, SLAs, pain points and roadmap."],
      ["green", "Metrics To Mention", "Availability, incidents, MTTR, login success, quote/order completion, search success, warranty cycle time, active users, supplier SLA, vulnerability aging, API latency."],
    ],
  },
  {
    part: "Part 3",
    title: "Role Fit + First 90 Days",
    subtitle: "Use this when the interview turns to role scope, budget/supplier ownership, security, and how you would start.",
    notes: [
      ["yellow", "Lifecycle Ownership", "Manage service value, roadmap, application lifecycle, reliability, governance, security compliance, service reporting and continuous improvement."],
      ["white", "Stakeholder Model", "Sales & Marketing, Parts & Services, Digital Mining, IT, Security, Support, regional teams, suppliers and customers need one clear service rhythm."],
      ["gray", "Budget / Contract Bridge", "I have strong operational involvement in forecasting inputs, resource visibility, supplier coordination and performance reporting. I am ready to take fuller formal ownership."],
      ["green", "Security Bridge", "Not a security specialist, but I keep security visible in roadmap, release readiness, supplier delivery, risk tracking, documentation and audit readiness."],
      ["yellow", "30 Days: Baseline", "Map service boundaries, suppliers, integrations, stakeholders, SLAs, incidents, roadmap, risks and decision forums."],
      ["green", "60-90 Days: Improve", "Top pain points, governance cadence, escalation paths, measurable roadmap, adoption reporting, supplier follow-up and continuous improvement plan."],
    ],
  },
  {
    part: "Part 4",
    title: "STAR Story Bank",
    subtitle: "Use these examples for competency-based questions. Keep answers short: Situation, Task, Action, Result, Sandvik relevance.",
    compact: true,
    notes: [
      ["yellow", "Improve A Service", ["Qwikcilver: requests moving slowly.", "Introduced Kanban, WIP limits, visibility and escalations.", "Result: 50% faster turnaround.", "Phrase: service flow, ownership, measurable improvement."]],
      ["white", "Complex Stakeholders", ["Payment platform across Product, Engineering, Security, Ops, QA, vendors, customers.", "Governance, releases, dashboards, risks.", "Result: 40% better delivery performance."]],
      ["green", "Customer Ownership", ["Primary liaison for integrations, onboarding, issue resolution, SLA tracking.", "Ran reviews, escalations, backlog follow-up.", "Result: more confidence and predictability."]],
      ["gray", "Governance / Audit", ["Payment platform SDLC controls and ISO audit readiness.", "Documentation, reporting, evidence, risks and dependencies.", "Phrase: make compliance operational, not ceremonial."]],
      ["yellow", "Agile Delivery", ["Philips Forecast2Plan as PO/Scrum Master.", "Epics, features, stories, acceptance criteria, KPIs.", "Result: better business/delivery transparency."]],
      ["white", "Digital Adoption", ["Publicis Sapient: Microsoft 365 Copilot rollout.", "Governance, readiness, adoption planning, success metrics.", "Phrase: portal succeeds when users trust it daily."]],
    ],
  },
  {
    part: "Part 5",
    title: "Conflict + Bad Situation Handling",
    subtitle: "This is the Swedish competency-interview hotspot. Stay calm, factual, accountable and no-blame.",
    compact: true,
    notes: [
      ["yellow", "Default Tone", "Understand facts and impact. Bring the right people together. Clarify ownership. Communicate transparently. Recover first, then improve the process."],
      ["white", "Stakeholder Conflict", "Business wanted fast customer commitment; engineering saw risk. I made options and trade-offs visible, phased scope and protected the critical outcome."],
      ["green", "Customer Escalation", "Separate immediate recovery from root cause. Assign owner, communication cadence and next actions. Keep customer update clear without overpromising."],
      ["gray", "Supplier Issue", "Make the gap specific: timeline, quality, communication, requirement, dependency or capacity. Follow up with owner, date, impact and evidence-based escalation."],
      ["yellow", "Saying No", "Do not just say no. Explain impact on timeline, quality and commitments. Offer options: next release, smaller version, or open reprioritization."],
      ["white", "Strong Close", "Difficult situations become easier to manage when ownership, facts, communication and follow-up are clear."],
    ],
  },
  {
    part: "Part 6",
    title: "Questions, Salary + Logistics",
    subtitle: "Use near the end. Ask smart questions, answer salary calmly, and close with confidence.",
    notes: [
      ["yellow", "Ask Riitta", ["What outcomes matter most in the first 6-12 months?", "What are the biggest portal pain points today?", "Which KPIs matter most for the portal?", "How is supplier performance managed today?"]],
      ["white", "Ask About Scope", ["What applications and integrations are in scope?", "How is the roadmap governed?", "How do security and compliance enter releases?", "What would make year one a success?"]],
      ["green", "Closing Question", "Based on our conversation, is there any area of my background you would like me to clarify further, especially around service ownership, suppliers, budget or customer-facing platforms?"],
      ["gray", "Salary Answer", "Expectation: around SEK 63,000/month gross fixed salary. Open to discuss depending on full package, responsibility level and benefits. Say it calmly, then pause."],
      ["yellow", "Notice Period", "Confirm exact contract notice period. If unsure: I will confirm the exact contractual notice period, but I expect it to be around [X months]."],
      ["white", "Teams Checklist", "May 18, 2026, 13:00 CEST. Camera, microphone, internet, clean background. Join 5-7 minutes early. Keep resume, job ad and notes nearby."],
    ],
  },
];

const colors = {
  yellow: "#fff5b8",
  green: "#dfe8d9",
  gray: "#eef0ec",
  white: "#fffdf2",
  ink: "#171717",
  body: "#273035",
  muted: "#5c646b",
  dark: "#374047",
  accent: "#f4c430",
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
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

function textBlock(text, x, y, width, opts = {}) {
  const size = opts.size ?? 28;
  const lineHeight = opts.lineHeight ?? size * 1.24;
  const weight = opts.weight ?? 400;
  const fill = opts.fill ?? colors.body;
  const family = opts.family ?? "Arial, Helvetica, sans-serif";
  const maxChars = Math.max(12, Math.floor(width / (size * 0.53)));
  const lines = wrapText(text, maxChars).slice(0, opts.maxLines ?? 20);
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}">
    ${lines
      .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
      .join("")}
  </text>`;
}

function bulletBlock(items, x, y, width, opts = {}) {
  const size = opts.size ?? 25;
  const lineHeight = opts.lineHeight ?? size * 1.18;
  const paraGap = opts.paraGap ?? 8;
  let currentY = y;
  let svg = "";
  const maxChars = Math.max(14, Math.floor((width - 28) / (size * 0.52)));
  for (const item of items) {
    const lines = wrapText(item, maxChars).slice(0, 3);
    svg += `<circle cx="${x + 6}" cy="${currentY - 7}" r="4.5" fill="${colors.dark}" opacity="0.85" />`;
    svg += `<text x="${x + 26}" y="${currentY}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" fill="${colors.body}">
      ${lines
        .map((line, index) => `<tspan x="${x + 26}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
        .join("")}
    </text>`;
    currentY += lines.length * lineHeight + paraGap;
  }
  return svg;
}

function noteSvg(note, x, y, w, h, compact) {
  const [tone, title, body, micro] = note;
  const pad = 42;
  const titleSize = compact ? 32 : 34;
  const bodySize = compact ? 24 : 25;
  let svg = `
    <g filter="url(#shadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="${colors[tone] || colors.yellow}" stroke="rgba(42,45,39,0.10)" stroke-width="2"/>
    </g>
    <rect x="${x + pad}" y="${y + 36}" width="78" height="8" rx="4" fill="${tone === "green" ? "#4f765c" : tone === "gray" ? "#374047" : colors.accent}" />
    ${textBlock(title, x + pad, y + 92, w - pad * 2, {
      size: titleSize,
      lineHeight: titleSize * 1.08,
      weight: 700,
      fill: colors.ink,
      maxLines: 2,
    })}
  `;
  const bodyY = y + (title.length > 22 ? 164 : 152);
  if (Array.isArray(body)) {
    svg += bulletBlock(body, x + pad, bodyY, w - pad * 2, {
      size: bodySize,
      lineHeight: bodySize * 1.14,
    });
  } else {
    svg += textBlock(body, x + pad, bodyY, w - pad * 2, {
      size: body.length < 140 ? bodySize + 2 : bodySize,
      lineHeight: bodySize * 1.22,
      weight: body.length < 125 ? 600 : 400,
      maxLines: compact ? 7 : 8,
    });
  }
  if (micro) {
    svg += `<line x1="${x + pad}" y1="${y + h - 70}" x2="${x + w - pad}" y2="${y + h - 70}" stroke="#171717" stroke-opacity="0.16" stroke-width="2"/>`;
    svg += textBlock(micro, x + pad, y + h - 42, w - pad * 2, {
      size: 22,
      lineHeight: 25,
      fill: colors.muted,
      maxLines: 2,
    });
  }
  return svg;
}

function posterOverlay(poster, index) {
  const marginX = 126;
  const noteW = 610;
  const noteH = poster.compact ? 350 : 388;
  const gapX = 58;
  const gapY = poster.compact ? 34 : 34;
  const gridTop = 530;
  const left2 = marginX + noteW + gapX;
  let notesSvg = "";
  for (let i = 0; i < poster.notes.length; i += 1) {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const x = col === 0 ? marginX : left2;
    const y = gridTop + row * (noteH + gapY);
    notesSvg += noteSvg(poster.notes[i], x, y, noteW, noteH, poster.compact);
  }
  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#222219" flood-opacity="0.14"/>
      </filter>
    </defs>
    <rect width="${W}" height="${H}" fill="#fbf8ee" opacity="0.40"/>
    <rect x="88" y="96" width="1478" height="2138" rx="66" fill="#fffffa" opacity="0.90"/>
    <text x="${marginX}" y="158" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="700" fill="#65716a" letter-spacing="3">${esc(poster.part.toUpperCase())} / SANDVIK INTERVIEW QUICK REFERENCE</text>
    ${textBlock(poster.title, marginX, 248, 1200, {
      size: 68,
      lineHeight: 72,
      weight: 800,
      fill: colors.ink,
      maxLines: 2,
    })}
    <rect x="${marginX}" y="312" width="200" height="16" rx="8" fill="${colors.accent}"/>
    ${textBlock(poster.subtitle, marginX, 385, 1250, {
      size: 28,
      lineHeight: 34,
      fill: colors.dark,
      maxLines: 3,
    })}
    ${notesSvg}
    <text x="${marginX}" y="2278" font-family="Arial, Helvetica, sans-serif" font-size="19" fill="#68736c">IT Service Owner - Customer Portal / Sandvik Mining</text>
    <rect x="872" y="2245" width="610" height="42" rx="21" fill="#171717"/>
    <text x="902" y="2273" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#ffffff">Speak in headlines, then example, result, relevance</text>
    <text x="1510" y="158" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" fill="#65716a" text-anchor="end">${String(index + 1).padStart(2, "0")}/06</text>
  </svg>`;
}

const background = await sharp(bgPath).resize(W, H, { fit: "cover" }).png().toBuffer();
const pngPaths = [];

for (let i = 0; i < posters.length; i += 1) {
  const overlay = Buffer.from(posterOverlay(posters[i], i));
  const outPath = path.join(outDir, `poster-${String(i + 1).padStart(2, "0")}.png`);
  await sharp(background).composite([{ input: overlay, top: 0, left: 0 }]).png().toFile(outPath);
  pngPaths.push(outPath);
}

const pdfDoc = await PDFDocument.create();
for (const pngPath of pngPaths) {
  const page = pdfDoc.addPage([595.28, 841.89]);
  const png = await pdfDoc.embedPng(await fs.readFile(pngPath));
  page.drawImage(png, { x: 0, y: 0, width: 595.28, height: 841.89 });
}
await fs.writeFile(path.join(outDir, "sandvik-interview-sticky-note-posters.pdf"), await pdfDoc.save());

console.log(path.join(outDir, "sandvik-interview-sticky-note-posters.pdf"));
