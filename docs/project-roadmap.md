# Staria Properties project roadmap

Last updated: 27 July 2026

## Main objective

Build a complete real-estate website with a public interface, PostgreSQL database,
authentication, role-based administration portal, and a stakeholder-review deployment.
The review deployment will use demo data and a single shareable URL. Real business data
and the final public domain will be added later.

## Approval rule

Work is executed one phase at a time. Do not begin the next phase until the project owner
has reviewed the current phase and explicitly approved proceeding.

## Phase 1 — Real-estate foundation (complete)

- Replaced the original product/apparel domain with properties, projects, amenities,
  addresses, media, categories, and SEO fields.
- Connected quotations to properties.
- Added versioned Prisma migrations.
- Added public and CMS API foundations.
- Verified backend and frontend production builds.

Detailed record: [phase-1-foundation.md](phase-1-foundation.md)

## Phase 2 — Safe demo database and seed data (complete)

- Added demo-data markers throughout the database.
- Created repeatable seed data for properties, projects, services, FAQs, news,
  testimonials, clients, statistics, enquiries, settings, and related content.
- Added owner and read-only stakeholder-reviewer roles.
- Added guarded demo cleanup and seed verification commands.
- Verified migration, repeated seeding, cleanup, and reseeding against PostgreSQL.

Detailed record: [phase-2-demo-data.md](phase-2-demo-data.md)

## Phase 3 — Connected website and admin portal (complete)

- Connected public pages to the database-backed API with demo fallbacks.
- Connected property, project, news, contact, newsletter, services, FAQs,
  testimonials, statistics, hero, and site-setting content.
- Added `/admin/login`, authenticated sessions, role-based navigation, dashboard,
  content management, publishing controls, and enquiry viewing.
- Kept the reviewer account read-only and the owner account editable.
- Verified public APIs, database submissions, authentication, authorization,
  publishing, CORS, routes, and production builds.

Detailed record: [phase-3-api-ui.md](phase-3-api-ui.md)

## Current checkpoint

The implementation through Phase 3 is complete in the repository. It is not deployed
yet. To run it locally, the project owner still needs to:

1. Create a local PostgreSQL database named `staria_properties`.
2. Create `backend/.env`, add the PostgreSQL connection string, generate two JWT
   secrets, and choose the owner/reviewer seed passwords.
3. Apply migrations and seed the demo database.
4. Start the backend and frontend development servers.
5. Review the public website and both admin roles.

The seed scripts create the database tables and demo records, but PostgreSQL itself and
the empty database must exist first.

## Phase 4 — Full-product hardening (pending approval)

Planned work:

- Complete and refine admin create/edit experiences for all managed content.
- Add a practical image/media upload and selection workflow.
- Improve field validation, loading states, empty states, errors, confirmations, and
  responsive behavior.
- Finish account/session experiences, including secure password-management flows where
  appropriate.
- Improve accessibility, keyboard navigation, metadata, social sharing, structured SEO,
  and error boundaries.
- Add explicit form-consent and privacy-facing user experience.
- Run security, authorization, API, build, and end-to-end regression checks.
- Prepare production environment-variable and deployment documentation.

Phase 4 must not start until the project owner explicitly approves it.

## Phase 5 — Free stakeholder demo deployment (pending)

Planned work:

- Re-check currently available free hosting tiers before choosing providers.
- Provision a free hosted PostgreSQL database.
- Deploy the backend API to a compatible free service.
- Deploy the React frontend, with Vercel as a suitable candidate.
- Configure production secrets, URLs, CORS, secure cookies, migrations, and demo seed.
- Test the deployed public website, admin owner account, read-only reviewer account,
  enquiry submission, and database persistence.
- Provide one shareable stakeholder link, such as `project-name.vercel.app`.

A provider subdomain can be free. A custom `.com` normally requires purchasing and
renewing the domain, so that can wait until the real public launch.

Phase 5 must not start until Phase 4 is reviewed and the project owner explicitly
approves deployment and any required third-party account setup.

## Phase 6 — Real-data migration and public launch (later)

Planned after stakeholder approval:

- Back up the demo deployment.
- Import and validate real properties, projects, media, contact information, and legal
  content.
- Remove demo-only records using the guarded cleanup workflow.
- Review production permissions and replace all demo credentials and secrets.
- Purchase/connect the final custom domain and configure DNS.
- Add the selected production email, media storage, backups, monitoring, analytics, and
  privacy/legal configuration.
- Perform final content, security, accessibility, performance, mobile, and launch checks.

This phase is intentionally separate so that demo content can be reviewed safely before
real business data is introduced.
