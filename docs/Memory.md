# Project memory

Last updated: 22 October 2026

This file records current project context for future work. It is not a credential store
or proof that a running service is still available; recheck runtime state when needed.

## Established decisions

- Use PostgreSQL and Prisma, not XAMPP/MySQL.
- Keep the existing React frontend and Express backend.
- Customers submit enquiries; admins review them in **Admin -> Enquiries**.
- WhatsApp appears on public pages only, never in the admin portal.
- Empty property/project API results must not revive demo listing cards.
- Preserve context when requesting a viewing, discussing a project or exploring a service.
- Employment applications are general enquiries with source `employment-application`;
  they currently do not populate the separate job-specific Applications CMS resource.

## Implemented in recent work

- Floating WhatsApp link using the shared Bangladesh contact number.
- Desktop and mobile consultation buttons opening a submission dialog.
- Dedicated property details with a viewing request form.
- Project-specific discussion form and admin enquiry label.
- Property management consultation and telephone actions.
- Five development service detail pages and working Explore Service links.
- Contact-page Join us section with employment application dialog.
- PDF CV upload, server validation, private storage and authenticated admin download.
- Admin enquiry labels and a polling badge for `NEW` enquiries.
- Property/project loading, empty and error states without demo-record fallbacks.

## Last observed local setup

- PostgreSQL 18 was running; `staria_properties` was created, migrated and seeded.
- Frontend was served at `http://localhost:5173`.
- API was served at `http://localhost:5000/api/v1`.
- Admin sign-in route is `/admin/login`.
- Local credentials are in `backend/.env`; do not reproduce them here.
- Local processes may stop between sessions; check health and ports before restarting.

## Verification history and limits

Recent checks included frontend production builds, backend TypeScript checks, published
property detail API requests, admin authentication, enquiry persistence, and private CV
upload/download. Missing, invalid and oversized CVs were rejected; anonymous CV access
was rejected. Temporary test enquiries were archived and the test CV removed.

These checks do not mean every CMS editor, public field or browser interaction has been
tested. Browser automation was unavailable during recent work. SMTP delivery has not
been established; email notifications depend on valid mail configuration.

## Remaining context

Some menus, social links, footer copy, contact-page details and about/interior content
remain fixed rather than fully driven by admin settings. Some non-listing sections
still retain fallbacks. See [Tasks](Tasks.md).

Older phase documents describe earlier milestones. Use the current source and recent
verification when they differ from this context or from each other.
