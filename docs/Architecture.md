# Architecture

Last updated: 22 October 2026

## System overview

Staria Properties combines a public real-estate website with an authenticated content
management portal. Both interfaces use the same Express API and PostgreSQL database.

```text
Public website / Admin portal (React + React Router + Vite)
                       |
                 /api/v1 (Express)
                       |
       Routes -> validation/auth -> controllers -> services
                       |
                 Repositories / Prisma
                       |
                   PostgreSQL
```

## Code locations

| Location | Responsibility |
| --- | --- |
| `frontend/src/app/routes.tsx` | Public and admin routes, lazy page loading |
| `frontend/src/app/Layout.tsx` | Public navigation, footer, consultation dialog, WhatsApp |
| `frontend/src/app/pages/` | Public pages and property/service detail screens |
| `frontend/src/app/admin/` | Authentication, CMS editors, media, dashboard, enquiries |
| `frontend/src/app/services/api.ts` | API requests, session refresh, shared record types |
| `backend/src/routes/` | API endpoints and access controls |
| `backend/src/services/` | Business rules, submissions, authentication and notifications |
| `backend/src/repositories/` | Database access |
| `backend/prisma/schema.prisma` | PostgreSQL models and relationships |
| `backend/prisma/migrations/` | Versioned SQL migrations |

## API boundaries

All paths below are relative to `/api/v1`.

- `/content`: published public content and individual records.
- `/site`: public company settings.
- `/auth`: login, sessions, password and account operations.
- `/contact`: contact, consultation, viewing and project enquiries.
- `/contact/employment`: multipart employment application with a PDF CV.
- `/newsletter` and `/quotations`: public submissions.
- `/admin/cms`: permission-controlled content management and media.
- `/admin/contact-submissions`: enquiries, including protected CV downloads.

## Important data flows

1. Admin edits a property and publishes it; the public property API returns the record.
   The website loads it on the next page load. Featured homepage records are filtered
   separately. There is no public live-update subscription.
2. A consultation, viewing or project form sends an enquiry to `/contact`. The service
   validates and stores it, records an audit event, and attempts configured email alerts.
3. Employment applications use `/contact/employment`. The server validates the PDF,
   stores it privately, and attaches an internal CV reference to the enquiry message.
   Admins download it through `/:id/cv` with contact read permission.
4. The admin navigation polls the count of `NEW` enquiries every 30 seconds.

## Storage and deployment

- Database: PostgreSQL through `DATABASE_URL`; this is not a XAMPP/MySQL application.
- General media: Cloudinary when configured.
- CVs: backend `private-uploads/cvs`, or the path in `CV_STORAGE_DIR`. Deployment needs
  persistent storage and backups of both the CV directory and database.
- Secrets: private `.env` files; never copy real credentials into documentation.
- Local ports: frontend `5173`, backend `5000`, PostgreSQL normally `5432`.
- Hosting configuration exists for Docker Compose, Render, Railway and DigitalOcean.
  Provider configuration files alone do not establish that a deployment is live.

## Related documents

[Design](Design.md), [requirements](PRD.md), [working rules](Rules.md),
[current context](Memory.md), [tasks](Tasks.md).
