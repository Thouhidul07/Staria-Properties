# Tasks

Last updated: 22 October 2026

This is a current maintenance checklist, not a claim that every flow has passed an
end-to-end browser test. Older milestone history is in [project-roadmap.md](project-roadmap.md).

## Implemented

- [x] Public WhatsApp widget; excluded from admin pages.
- [x] Consultation form connected to stored admin enquiries.
- [x] Local PostgreSQL setup, migrations, seed and verified admin sign-in.
- [x] Remove demo listing fallbacks from homepage property/project grids and listing pages.
- [x] Dedicated property detail route and direct record loading.
- [x] Viewing request form with property context and preferred viewing time.
- [x] Development service links, detail pages and contextual consultations.
- [x] Property management consultation and telephone buttons.
- [x] Project discussion form with project context.
- [x] Contact-page Join us / Apply employment form.
- [x] Replace employment CV link with required PDF upload.
- [x] Private PDF storage, admin download and rejection of invalid/oversized files.
- [x] Admin enquiry source labels and polling badge for new enquiries.

## Remaining work

- [ ] Audit every configured CMS resource against its public consumer; document unsupported fields.
- [ ] Connect remaining fixed navigation, social links and footer values to admin settings.
- [ ] Make public contact details consistent with company/contact settings across all pages.
- [ ] Review fixed about/interior content and remaining non-listing demo fallbacks.
- [ ] Review development services against CMS services; current development detail pages
  share a fixed frontend data module.
- [ ] Verify all relevant desktop/mobile buttons, dialogs and detail pages in a browser.
- [ ] Add an admin workflow to update enquiry status; the current enquiry screen displays
  status but does not provide a status editor, so the `NEW` count does not clear on viewing.
- [ ] Decide whether general employment applications should join the separate job-linked
  Applications resource or remain in Enquiries.
- [ ] Configure SMTP and verify real admin email notifications.
- [ ] Configure Cloudinary and verify general media uploads where required.
- [ ] Provision persistent CV storage and database/CV backup procedures for deployment.
- [ ] Confirm provider deployment, environment configuration and live acceptance checks.

## Verification commands

```powershell
# Run from backend/
npm run check
npm run build
npm run db:seed:verify

# Run from frontend/
npm run build
```

Do not reseed, delete or reset an existing database merely to run a build. For a fresh
environment, follow [local setup](phase-4-local-setup.md).
