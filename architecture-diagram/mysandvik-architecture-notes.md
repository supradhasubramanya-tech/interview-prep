# My Sandvik Architecture Diagram Notes

Diagram files:
- `outputs/mysandvik-high-level-architecture.png`
- `outputs/mysandvik-high-level-architecture.svg`

## Important Disclaimer

The diagram is based on publicly described My Sandvik features and a typical architecture for a B2B customer portal. Sandvik's internal implementation technologies are not publicly confirmed in the sources reviewed.

Use this wording in the interview:

"I have mapped this as a high-level, inferred architecture based on the public My Sandvik feature set. I am not assuming Sandvik uses this exact stack, but it helps me think through the service boundaries, integrations, data flows, security controls, and ownership model."

## Public Feature Basis

Public Sandvik pages describe My Sandvik as a digital customer portal where customers can:
- Shop online, request quotes, and purchase products.
- View fleet overview, machine status, location, warranty dates, and related information.
- Access electronic manuals, parts information, operational and maintenance material.
- Access bulletins for safety, parts, and critical information.
- Use Digital Service Solutions, including insights and reports on connected machines.
- Create and follow up warranty claims.
- Sign up and log in quickly.

## Inferred Architecture Logic

The architecture diagram groups the portal into:

- Users: customer buyer, fleet manager, service manager, internal support, business admin.
- Experience layer: portal and customer-facing modules such as Shop, My Fleet, manuals, bulletins, digital service insights, warranty claims, login.
- API and application services: identity/access, API gateway, account service, catalog/pricing, order/quote, asset/fleet, warranty, content/manuals, reporting/notifications.
- Systems of record: ERP, CRM, PIM/parts catalogue, asset/fleet master, warranty, CMS/DAM/manuals, IoT/telemetry.
- Data platform: data lake, processing pipelines, warehouse, data catalogue, BI/reporting.
- Cross-cutting operations: CI/CD, infrastructure as code, AWS-style cloud infrastructure, blue-green/canary release options, monitoring, GDPR/ISEC, supplier governance.

## Interview Talking Point

"For a Service Owner, the key is not to know every technical detail by memory. The key is to know which customer journeys depend on which systems, where data comes from, who owns it, how releases are controlled, how access is secured, and how incidents or data-quality issues are detected and resolved."

## Questions This Diagram Helps You Ask

- What are the real service boundaries for My Sandvik?
- Which modules are in scope for this Service Owner role?
- What are the main systems of record behind Shop, My Fleet, manuals, bulletins, warranty, and digital service reports?
- Which integrations or data feeds create the most operational risk?
- What CI/CD, release, rollback, and monitoring model is used today?
- How are external customer users, internal support users, and suppliers managed through IAM and RBAC?
- Where do GDPR, information security, audit evidence, and supplier security enter the service governance?
- Is there a data catalogue or formal ownership model for critical customer portal data?

## Sources

- My Sandvik customer portal: https://www.mining.sandvik/en/products/technology/my-sandvik-customer-portal/
- My Sandvik portal press release: https://www.mining.sandvik/en/news-and-media/news-archive/2020/03/my-sandvik-customer-portal-easier-faster-more-efficient-operation-for-construction-customers/
- Sandvik digitalization: https://www.mining.sandvik/en/about-us/digitalization/
- Sandvik digital solutions: https://www.mining.sandvik/en/digital-solutions/
- Sandvik Mining business area: https://www.home.sandvik/en/about-us/business-areas/sandvik-mining-and-rock-solutions/

