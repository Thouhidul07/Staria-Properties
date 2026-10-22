# Product requirements

Last updated: 22 October 2026

## Purpose

Help customers discover Staria properties, developments and services, and send enquiries
that the company can review through a protected admin portal.

## Users

- Visitors browse listings and services, request consultations/viewings, discuss projects
  and submit employment applications.
- Owner/admin users manage permitted content and review incoming enquiries.
- Reviewer users inspect permitted information with read-only access.

## Functional requirements

| Area | Required behavior |
| --- | --- |
| Listings | Display published sale, rent and lease properties from the API |
| Homepage | Display featured records according to API filters |
| Property details | Open the selected listing, show its information and viewing action |
| Projects | Browse published projects and submit a discussion enquiry for the chosen project |
| Development services | Explore a relevant service page and request a consultation |
| Consultation | Validate contact details and consent; save requests for admin review |
| Employment | Provide Join us / Apply on Contact, collect employment details and a PDF CV |
| Admin enquiries | Show customer details, source, message, status and received time |
| Notifications | Display a `NEW` enquiry count; attempt email alerts when SMTP is configured |
| CV access | Permit authorised admins to download attached PDFs; deny anonymous access |
| WhatsApp | Offer direct chat on the public site and exclude it from admin pages |
| CMS | Support permission-controlled create/edit/publish operations for configured resources |

## Acceptance criteria

1. An unpublished property cannot be returned by its public detail endpoint.
2. An empty property or project result displays an empty state, without invented listings.
3. View Details opens the requested property, independently of the listing page's first
   page of results.
4. Viewing and project enquiries include the selected record's identity and link.
5. Successful form submission creates a stored enquiry visible to an authorised admin.
6. Failed submission does not display a success confirmation.
7. Employment applications require a PDF CV no larger than 5 MB; the server also checks
   file type, extension and PDF header.
8. CV downloads require authentication and contact read permission.
9. The enquiry navigation badge refreshes periodically; it represents `NEW` status,
   not a separate read/unread notification system.
10. Primary actions work with keyboard navigation and mobile layouts.

## Operational requirements

Keep secrets out of source control. Use database migrations for schema changes. Maintain
database and private CV backups. Configure persistent CV storage before deploying on an
ephemeral filesystem. SMTP and Cloudinary integrations require their own credentials.

## Current scope limits

The site is not yet fully editable through the CMS. General employment applications
currently live in Enquiries, separately from job-linked Applications. Browser push
notifications, recruitment tracking, live public content updates and guaranteed email
delivery are not implemented requirements of the current flow.

See [Tasks](Tasks.md) for remaining work and [Architecture](Architecture.md) for implementation.
