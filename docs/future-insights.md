# FUTURE IMPLEMENTATION — INSIGHTS

All Insights portions of the files listed below are marked **FUTURE IMPLEMENTATION — INSIGHTS** by this inventory. Shared files retain their other responsibilities. No content, database records, APIs, or admin functionality have been removed.

Public access is controlled by `PUBLIC_INSIGHTS_ENABLED` in `frontend/src/app/features.ts`, currently `false`. `/news` and `/news/*` redirect home without mounting the preserved page or fetching articles. The public navbar omits Insights. There are currently no homepage Insights previews or public footer article links. Newsletter subscriptions and general references to market insights remain unchanged.

## Preserved implementation inventory

| File | Preserved Insights responsibility |
| --- | --- |
| `frontend/src/app/features.ts` | Public feature switch |
| `frontend/src/app/routes.tsx` | Original listing and article lazy routes behind the switch |
| `frontend/src/app/Layout.tsx` | Original Insights navigation entry behind the switch |
| `frontend/src/app/pages/NewsPage.tsx` | Listing/article page, article requests and content rendering |
| `frontend/src/app/components/corporate-sections.tsx` | `NewsInsightsSection`, fallback articles, cards, animations and article links |
| `frontend/src/app/components/shared/RouteMetadata.tsx` | News titles, descriptions and article metadata |
| `frontend/src/app/services/api.ts` | `getNews`, `getNewsById` and `NewsRecord` |
| `frontend/src/app/admin/AdminLayout.tsx` | Admin News navigation |
| `frontend/src/app/admin/AdminDashboardPage.tsx` | Admin News dashboard entry |
| `frontend/src/app/admin/adminResources.ts` | News and blog resource definitions |
| `frontend/src/app/admin/AdminResourcePage.tsx` | Shared CMS resource editor used for News |
| `backend/src/routes/public.routes.ts` | Public news API routes, retained and operational |
| `backend/src/controllers/public.controller.ts` | News listing and detail handlers |
| `backend/src/config/cmsResources.ts` | News/blog CMS models, validation and permissions |
| `backend/src/services/cms.service.ts` | Shared News/blog CMS operations |
| `backend/src/repositories/cms.repository.ts` | Shared CMS data access for News |
| `backend/src/middleware/cmsPermission.middleware.ts` | Shared CMS authorization for News |
| `backend/src/services/site.service.ts` | Original API-provided News menu data (not rendered by the current frontend navbar/footer) |
| `backend/src/routes/cms.routes.ts` | Shared CMS resource routing for News |
| `backend/src/controllers/cms.controller.ts` | Shared CMS controller for News |
| `backend/prisma/schema.prisma` | `PostType.NEWS`, blog posts, tags, relations and SEO data |
| `backend/prisma/migrations/20260727000000_initial_real_estate/migration.sql` | Original News/blog schema history |
| `backend/prisma/migrations/20260727010000_demo_content_support/migration.sql` | Demo-content support for posts |
| `backend/src/prisma/seed.ts` | News seed records and categories |
| `backend/src/prisma/verifyDemoSeed.ts` | News seed verification |
| `backend/src/prisma/cleanupDemo.ts` | Existing demo-post cleanup support |
| `backend/src/docs/api-spec.md` | News API and CMS documentation |
| `backend/src/docs/database-design.md` | News/blog storage documentation |
| `backend/src/docs/swagger.ts` | Shared CMS API documentation |

Existing historical documentation in `backend/README.md`, `docs/phase-1-foundation.md`, `docs/phase-2-demo-data.md`, `docs/phase-3-api-ui.md`, `docs/phase-4-local-setup.md` and `docs/project-roadmap.md` also remains intact.

## Re-enable

Set `PUBLIC_INSIGHTS_ENABLED = true` in `frontend/src/app/features.ts`, then rebuild/deploy. This restores the original `/news` and `/news/:id` pages and the desktop/mobile Insights navbar entry together. The retained page mounts `NewsInsightsSection`; no homepage or footer link needs restoring because neither existed at the time of disabling. Admin News management and backend news APIs require no reactivation.

The navbar's separate Contact link was removed as requested. Both yellow buttons now read “Contact” and still open the existing consultation dialog with their original styling and mobile close behavior. The `/contact` page and footer Contact link remain available.
