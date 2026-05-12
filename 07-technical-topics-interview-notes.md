# Technical Topics Interview Notes

Use these notes if the interview goes into application landscape, data platforms, cloud, DevOps, CI/CD, or security. For this role, do not present yourself as a hands-on architect unless asked. Present yourself as technically fluent enough to own the service, ask the right questions, manage risks, and align teams and suppliers.

Best positioning line:

"I am not positioning myself as the hands-on developer or cloud architect, but I am comfortable owning the service conversation across application, data, integration, security, CI/CD, infrastructure, suppliers, and business impact."

## 1. Data Sources: Databases, S3, Snowflake

What it means:
- Data sources are the systems where business or operational data originates or is stored.
- For a customer portal like My Sandvik, data could come from ERP, CRM, product master data, parts catalogues, warranty systems, fleet/equipment systems, telemetry platforms, manuals/content systems, and customer identity systems.

Examples:
- Relational databases: structured application data such as users, orders, warranty claims, assets, permissions.
- AWS S3: object storage for files, logs, exports, data lake zones, documents, reports, or raw data feeds.
- Snowflake: cloud data warehouse for analytics, reporting, governed data sharing, and business insights.

Service Owner angle:
- Know what data the portal depends on.
- Know the source of truth for key data: customer, asset, parts, order, warranty, manual, telemetry.
- Understand data freshness, quality, ownership, and access model.
- Make data issues visible in service reporting because bad data can look like an application issue to users.

Good interview wording:

"For a customer portal, I would want to understand the key data sources behind each journey: customer identity, fleet data, parts and pricing, warranty, manuals, and order flows. I would also clarify source of truth, data ownership, refresh frequency, data quality controls, and what happens when a data feed fails."

Questions to ask:
- What are the main systems of record behind My Sandvik?
- Which data quality issues create the most customer friction today?
- Are data feeds real time, near real time, batch, or manually maintained?
- Who owns data quality: business, IT, supplier, or application team?

## 2. Data Processing Pipelines: Databricks And Similar Platforms

What it means:
- A data pipeline moves, transforms, validates, and makes data usable.
- Pipelines can ingest raw data, clean it, enrich it, join it with other sources, and publish it to applications, dashboards, APIs, or warehouses.

Examples:
- Databricks: big data and analytics platform often used for data engineering, lakehouse architecture, machine learning, and large-scale transformations.
- AWS Glue, Lambda, Step Functions, Airflow, dbt, Spark jobs: other examples of pipeline/orchestration tools.

Typical pipeline flow:
- Ingest data from source systems.
- Store raw data.
- Validate and clean it.
- Transform and enrich it.
- Publish curated data to a portal, API, warehouse, dashboard, or reporting layer.
- Monitor failures, latency, data quality, and lineage.

Service Owner angle:
- You do not need to code the pipeline, but you should understand its impact on portal reliability.
- Pipeline failures may affect fleet visibility, reports, warranty information, pricing, manuals, or customer dashboards.
- A Service Owner should care about monitoring, incident ownership, data refresh SLAs, and business impact of delayed data.

Good interview wording:

"If the portal depends on processed data, I would want the service model to include pipeline health, data freshness, failure alerts, retry processes, and clear ownership. From the customer's point of view, stale or missing data is still a portal reliability issue."

Questions to ask:
- Which customer portal features depend on data pipelines?
- Are there data freshness SLAs for fleet, order, warranty, or reporting data?
- How are pipeline failures monitored and escalated?
- Is there clear ownership between application teams, data teams, and suppliers?

## 3. Data Catalogue

What it means:
- A data catalogue is an inventory of data assets: what data exists, where it lives, what it means, who owns it, how sensitive it is, and how it can be used.

Common catalogue details:
- Dataset name and description.
- Source system and owner.
- Business definition.
- Data lineage.
- Data classification.
- Access rules.
- Quality indicators.
- Retention and compliance requirements.

Why it matters:
- Helps teams find trusted data.
- Reduces confusion about source of truth.
- Supports governance, compliance, GDPR, security, and audit readiness.
- Helps resolve data-quality disputes faster.

Service Owner angle:
- For a customer portal, a catalogue helps clarify data ownership and meaning across many systems.
- It is especially useful when different teams use the same terms differently, such as customer, account, asset, fleet, warranty, entitlement, order, or user.

Good interview wording:

"A data catalogue is valuable because it reduces ambiguity. For a portal service, I would want critical datasets documented with ownership, classification, source of truth, lineage, access rules, and quality expectations. That helps both service reliability and compliance."

Questions to ask:
- Does Sandvik have an enterprise data catalogue or data governance model?
- Are critical portal data assets classified and owned?
- How are source-of-truth conflicts resolved?
- Is data lineage visible for customer-facing reports or fleet insights?

## 4. CI/CD And AWS As Infrastructure

What CI/CD means:
- Continuous Integration: developers merge changes frequently and automated checks validate code quality, tests, security scans, and build health.
- Continuous Delivery/Deployment: approved changes move through environments in a controlled and repeatable way.

Typical CI/CD flow:
- Code commit.
- Automated build.
- Unit/integration tests.
- Security and quality scans.
- Package/container creation.
- Deploy to dev/test/stage.
- Approval or automated promotion.
- Deploy to production.
- Monitor release health.

AWS infrastructure examples:
- Compute: EC2, ECS, EKS, Lambda.
- Storage: S3, EBS.
- Database: RDS, DynamoDB, Aurora.
- Networking: VPC, subnets, load balancers, Route 53.
- Security: IAM, KMS, Security Groups, WAF, Secrets Manager.
- Monitoring: CloudWatch, X-Ray, CloudTrail.
- Infrastructure as Code: CloudFormation, Terraform, CDK.

Service Owner angle:
- You should know how releases move to production.
- You should care about release quality, rollback, approvals, environment stability, monitoring, and change governance.
- CI/CD should support speed, control, auditability, and reliability.

Good interview wording:

"From a Service Owner perspective, CI/CD is important because it makes changes repeatable, traceable, and safer. I would want to understand the release path, test gates, security scans, approvals, rollback plan, environment ownership, and how production health is monitored after deployment."

Questions to ask:
- What CI/CD tooling is used for the Customer Portal?
- Are deployments automated across environments?
- What are the release gates for testing, security, and business approval?
- How are rollbacks handled?
- Is infrastructure managed through Terraform, CloudFormation, CDK, or another IaC tool?

## 5. DevOps: Blue-Green Deployment

What it means:
- Blue-green deployment uses two production-like environments.
- Blue is the current live version.
- Green is the new version.
- Traffic is switched from blue to green after validation.
- If something goes wrong, traffic can be switched back to blue.

Why it matters:
- Reduces downtime.
- Supports faster rollback.
- Makes releases safer for customer-facing services.
- Useful when availability is important.

Related concepts:
- Canary deployment: release to a small percentage of users first.
- Rolling deployment: gradually replace old instances with new ones.
- Feature flags: release code but control feature visibility.

Service Owner angle:
- You do not need to implement blue-green, but you should know when it helps.
- For My Sandvik, safer deployment matters because portal downtime or broken flows can affect customers, parts ordering, fleet visibility, warranty, and trust.

Good interview wording:

"Blue-green deployment is a useful pattern for customer-facing portals because it reduces release risk. As Service Owner, I would want to understand whether the portal has zero-downtime deployment options, rollback paths, smoke tests, monitoring, and release communication. The key is not the pattern alone, but whether it protects customer journeys."

Questions to ask:
- Does the portal support blue-green, canary, rolling deployment, or feature flags?
- What are the critical smoke tests before traffic is switched?
- How quickly can the team rollback a failed release?
- Are release windows tied to customer usage patterns or regions?

## 6. Security: ISEC, GDPR, IAM, Role-Based Access Control

Note:
- If Sandvik uses "ISEC" as an internal term, treat it as information security governance and controls. If asked, clarify the local meaning instead of assuming.

Information Security / ISEC:
- Policies and controls that protect confidentiality, integrity, and availability.
- Includes risk management, security requirements, vulnerability management, audit readiness, secure development, incident handling, supplier security, and compliance.

GDPR:
- EU data protection regulation for personal data.
- Important topics: lawful basis, data minimization, consent where relevant, purpose limitation, retention, data subject rights, privacy by design, breach notification, processor/controller responsibilities.

IAM:
- Identity and Access Management.
- Controls who can access what.
- Includes authentication, authorization, SSO, MFA, service accounts, privileged access, access reviews, and joiner/mover/leaver processes.

Role-Based Access Control:
- Access is granted based on role, not person-by-person custom permissions.
- Examples for a customer portal: customer admin, buyer, service manager, warranty user, internal support, supplier support, business admin, IT admin.

Service Owner angle:
- Customer portals need strong access control because external users, internal users, suppliers, and admins may all interact with sensitive customer and operational data.
- Security must be built into roadmap, releases, supplier governance, incident handling, and service reporting.
- Access issues can directly affect customer experience.

Good interview wording:

"For a customer portal, security is part of the service, not a separate checklist. I would want clear IAM and RBAC design, periodic access reviews, GDPR-aware data handling, secure supplier access, vulnerability follow-up, audit evidence, and a clear process for security incidents or access-related escalations."

Questions to ask:
- What identity provider and SSO model does My Sandvik use?
- How are external customer roles and permissions managed?
- Are access reviews performed regularly?
- What personal data is processed in the portal, and how is GDPR handled?
- How are suppliers given access, monitored, and removed?
- How are vulnerabilities prioritized and tracked to closure?

## How To Link These Topics To Your Experience

Use this bridge:

"In my previous roles, I have worked around customer-facing digital platforms where integrations, data quality, security, release readiness, dashboards, and supplier coordination affected service reliability. I may not have been the person writing the pipeline or infrastructure code, but I have coordinated across the teams responsible for those areas and made the impact visible through governance, reporting, risk management, and service improvement."

## If They Ask: Are You Hands-On?

Suggested answer:

"I am hands-on in service ownership, governance, stakeholder alignment, backlog and roadmap coordination, SLA/KPI visibility, risk management, and issue resolution. I am not claiming to be the hands-on engineer for AWS, Databricks, or CI/CD pipelines, but I understand enough to ask the right questions, manage dependencies, follow risks, and make sure the service is reliable and secure."

## Quick Glossary

- Source of truth: the authoritative system for a type of data.
- Data freshness: how current the data is.
- Data lineage: where data came from and how it changed.
- Data classification: sensitivity level of data.
- ETL/ELT: extract, transform, load / extract, load, transform.
- SLA: agreed service level.
- MTTR: mean time to restore.
- IaC: infrastructure as code.
- IAM: identity and access management.
- RBAC: role-based access control.
- SSO: single sign-on.
- MFA: multi-factor authentication.
- Zero-downtime deployment: release without service interruption.

