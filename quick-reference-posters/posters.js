const posters = [
  {
    part: "Part 1",
    title: "Opening Pitch",
    subtitle: "Use this page for the first 5 minutes: tell me about yourself, why Sandvik, and why you fit.",
    notes: [
      {
        title: "Core Positioning",
        tone: "yellow",
        body: "I own customer-facing digital services so they stay reliable, measurable, well-governed and continuously improved.",
        micro: "Anchor words: service reliability, user value, governance, alignment, measurable outcomes.",
      },
      {
        title: "Tell Me About Yourself",
        tone: "white",
        body: "14+ years across IT service delivery, customer-facing platforms, agile application delivery and stakeholder governance. I create clarity across business, IT, engineering, operations, security, suppliers and users.",
      },
      {
        title: "Why Sandvik",
        tone: "green",
        body: "Sandvik combines industrial engineering, global scale, sustainability and digital transformation. My Sandvik directly affects parts, fleet data, manuals, warranty, digital services and customer trust.",
      },
      {
        title: "Why I Fit",
        tone: "gray",
        body: "ITIL + agile delivery + customer portals + supplier coordination + SLA/KPI reporting + governance + continuous improvement.",
      },
      {
        title: "Proof Points",
        tone: "yellow",
        body: "50% faster service request turnaround. 40% delivery performance improvement. 80+ engineers and stakeholders coordinated. Jira/Confluence dashboards for delivery health, risks, KPIs and service visibility.",
      },
      {
        title: "Closing Line",
        tone: "white",
        body: "The value I bring is structured service ownership: reliable, secure, measurable digital services with clear ownership from customer need to business value.",
      },
    ],
  },
  {
    part: "Part 2",
    title: "Sandvik + My Sandvik",
    subtitle: "Use this when they ask what you know about Sandvik, Mining, or the customer portal.",
    notes: [
      {
        title: "Sandvik Snapshot",
        tone: "yellow",
        bullets: [
          "Purpose: Advancing the world through engineering.",
          "Values: Winning together, Curiosity, Responsibility, Customer focus.",
          "Strategy: Advancing to 2030.",
          "Digital target: SEK 13B digital revenue by 2030.",
        ],
      },
      {
        title: "Mining Context",
        tone: "green",
        bullets: [
          "Equipment, tools, parts, services and digital solutions.",
          "Priorities: aftermarket growth, automation, mining software, electrification.",
          "Portal is close to aftermarket, uptime and customer self-service.",
        ],
      },
      {
        title: "My Sandvik Features",
        tone: "white",
        bullets: [
          "Shop, quotes and online ordering.",
          "Fleet overview, status and warranty dates.",
          "Electronic manuals and bulletins.",
          "Digital service insights and warranty claims.",
        ],
      },
      {
        title: "Why It Matters",
        tone: "gray",
        bullets: [
          "Customers find parts and service data faster.",
          "Better uptime and maintenance decisions.",
          "Sandvik grows aftermarket and digital engagement.",
          "One portal links customer experience to business value.",
        ],
      },
      {
        title: "Service Owner Lens",
        tone: "yellow",
        body: "My Sandvik is a business-critical digital service, not just an application. Understand boundaries, journeys, suppliers, integrations, SLAs, pain points and roadmap.",
      },
      {
        title: "Metrics To Mention",
        tone: "green",
        body: "Availability, incidents, MTTR, login success, quote/order completion, search success, warranty cycle time, active users, supplier SLA, vulnerability aging, API latency.",
      },
    ],
  },
  {
    part: "Part 3",
    title: "Role Fit + First 90 Days",
    subtitle: "Use this when the interview turns to role scope, budget/supplier ownership, security, and how you would start.",
    notes: [
      {
        title: "Lifecycle Ownership",
        tone: "yellow",
        body: "Manage service value, roadmap, application lifecycle, reliability, governance, security compliance, service reporting and continuous improvement.",
      },
      {
        title: "Stakeholder Model",
        tone: "white",
        body: "Sales & Marketing, Parts & Services, Digital Mining, IT, Security, Support, regional teams, suppliers and customers need one clear service rhythm.",
      },
      {
        title: "Budget / Contract Bridge",
        tone: "gray",
        body: "I have strong operational involvement in forecasting inputs, resource visibility, supplier coordination and performance reporting. I am ready to take fuller formal ownership.",
      },
      {
        title: "Security Bridge",
        tone: "green",
        body: "Not a security specialist, but I keep security visible in roadmap, release readiness, supplier delivery, risk tracking, documentation and audit readiness.",
      },
      {
        title: "30 Days: Baseline",
        tone: "yellow",
        body: "Map service boundaries, suppliers, integrations, stakeholders, SLAs, incidents, roadmap, risks and decision forums.",
      },
      {
        title: "60-90 Days: Improve",
        tone: "green",
        body: "Top pain points, governance cadence, escalation paths, measurable roadmap, adoption reporting, supplier follow-up and continuous improvement plan.",
      },
    ],
  },
  {
    part: "Part 4",
    title: "STAR Story Bank",
    subtitle: "Use these examples for competency-based questions. Keep answers short: Situation, Task, Action, Result, Sandvik relevance.",
    compact: true,
    notes: [
      {
        title: "Improve A Service",
        tone: "yellow",
        bullets: [
          "Qwikcilver: requests moving slowly.",
          "Introduced Kanban, WIP limits, visibility and escalations.",
          "Result: 50% faster turnaround.",
          "Phrase: service flow, ownership, measurable improvement.",
        ],
      },
      {
        title: "Complex Stakeholders",
        tone: "white",
        bullets: [
          "Payment platform across Product, Engineering, Security, Ops, QA, vendors, customers.",
          "Governance, releases, dashboards, risks.",
          "Result: 40% better delivery performance.",
        ],
      },
      {
        title: "Customer-Facing Ownership",
        tone: "green",
        bullets: [
          "Primary liaison for integrations, onboarding, issue resolution, SLA tracking.",
          "Ran reviews, escalations, backlog follow-up.",
          "Result: more confidence and predictability.",
        ],
      },
      {
        title: "Governance / Audit",
        tone: "gray",
        bullets: [
          "Payment platform SDLC controls and ISO audit readiness.",
          "Documentation, reporting, evidence, risks and dependencies.",
          "Phrase: make compliance operational, not ceremonial.",
        ],
      },
      {
        title: "Agile Application Delivery",
        tone: "yellow",
        bullets: [
          "Philips Forecast2Plan as PO/Scrum Master.",
          "Epics, features, stories, acceptance criteria, KPIs.",
          "Result: better business/delivery transparency.",
        ],
      },
      {
        title: "Digital Adoption",
        tone: "white",
        bullets: [
          "Publicis Sapient: Microsoft 365 Copilot rollout.",
          "Governance, readiness, adoption planning, success metrics.",
          "Phrase: portal succeeds when users trust it daily.",
        ],
      },
    ],
  },
  {
    part: "Part 5",
    title: "Conflict + Bad Situation Handling",
    subtitle: "This is the Swedish competency-interview hotspot. Stay calm, factual, accountable and no-blame.",
    compact: true,
    notes: [
      {
        title: "Default Tone",
        tone: "yellow",
        body: "Understand facts and impact. Bring the right people together. Clarify ownership. Communicate transparently. Recover first, then improve the process.",
      },
      {
        title: "Stakeholder Conflict",
        tone: "white",
        body: "Business wanted fast customer commitment; engineering saw risk. I made options and trade-offs visible, phased scope and protected the critical outcome.",
      },
      {
        title: "Customer Escalation",
        tone: "green",
        body: "Separate immediate recovery from root cause. Assign owner, communication cadence and next actions. Keep customer update clear without overpromising.",
      },
      {
        title: "Supplier Issue",
        tone: "gray",
        body: "Make the gap specific: timeline, quality, communication, requirement, dependency or capacity. Follow up with owner, date, impact and evidence-based escalation.",
      },
      {
        title: "Saying No",
        tone: "yellow",
        body: "Do not just say no. Explain impact on timeline, quality and commitments. Offer options: next release, smaller version, or open reprioritization.",
      },
      {
        title: "Strong Close",
        tone: "white",
        body: "Difficult situations become easier to manage when ownership, facts, communication and follow-up are clear.",
      },
    ],
  },
  {
    part: "Part 6",
    title: "Questions, Salary + Logistics",
    subtitle: "Use near the end. Ask smart questions, answer salary calmly, and close with confidence.",
    notes: [
      {
        title: "Ask Riitta",
        tone: "yellow",
        bullets: [
          "What outcomes matter most in the first 6-12 months?",
          "What are the biggest portal pain points today?",
          "Which KPIs matter most for the portal?",
          "How is supplier performance managed today?",
        ],
      },
      {
        title: "Ask About Scope",
        tone: "white",
        bullets: [
          "What applications and integrations are in scope?",
          "How is the roadmap governed?",
          "How do security and compliance enter releases?",
          "What would make year one a success?",
        ],
      },
      {
        title: "Closing Question",
        tone: "green",
        body: "Based on our conversation, is there any area of my background you would like me to clarify further, especially around service ownership, suppliers, budget or customer-facing platforms?",
      },
      {
        title: "Salary Answer",
        tone: "gray",
        body: "Expectation: around SEK 63,000/month gross fixed salary. Open to discuss depending on full package, responsibility level and benefits. Say it calmly, then pause.",
      },
      {
        title: "Notice Period",
        tone: "yellow",
        body: "Confirm exact contract notice period. If unsure: I will confirm the exact contractual notice period, but I expect it to be around [X months].",
      },
      {
        title: "Teams Checklist",
        tone: "white",
        body: "May 18, 2026, 13:00 CEST. Camera, microphone, internet, clean background. Join 5-7 minutes early. Keep resume, job ad and notes nearby.",
      },
    ],
  },
];

const main = document.getElementById("posters");

for (const [index, poster] of posters.entries()) {
  const section = document.createElement("section");
  section.className = `poster${poster.compact ? " compact" : ""}`;
  section.dataset.poster = String(index + 1).padStart(2, "0");
  section.innerHTML = `
    <div class="content">
      <div class="kicker">${poster.part} / Sandvik Interview Quick Reference</div>
      <h1>${poster.title}</h1>
      <div class="accent-line"></div>
      <p class="subtitle">${poster.subtitle}</p>
      <div class="grid">
        ${poster.notes
          .map((note) => {
            const content = note.bullets
              ? `<ul>${note.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
              : `<p class="${note.body && note.body.length < 120 ? "quote" : ""}">${note.body}</p>`;
            return `
              <article class="note ${note.tone || "yellow"}${note.wide ? " wide" : ""}">
                <h2>${note.title}</h2>
                ${content}
                ${note.micro ? `<div class="micro">${note.micro}</div>` : ""}
              </article>
            `;
          })
          .join("")}
      </div>
    </div>
    <div class="footer">
      <span>IT Service Owner - Customer Portal / Sandvik Mining</span>
      <span class="badge">Speak in headlines, then example, result, relevance</span>
    </div>
  `;
  main.appendChild(section);
}

