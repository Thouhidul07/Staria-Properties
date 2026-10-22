# Working rules

These conventions guide maintenance of Staria Properties. Apply them within the user's
requested scope; they do not add a new approval gate to routine work.

## Before changing code

- Read the relevant existing page, route, service and schema before adding another flow.
- Preserve unrelated edits and private environment configuration.
- Prefer existing components and endpoints when they meet the requirement.
- Check the actual implementation before promising that every CMS change appears publicly.

## Frontend

- Keep shared public controls in the public layout and admin controls in the admin layout.
- Use real route links for navigation, `tel:` links for calls, and buttons for form/dialog actions.
- Keep context in enquiries: the property, project or service must be identifiable.
- Do not render demo property/project records when API responses are empty or fail.
- Provide appropriate loading, empty, error, pending and success states.
- Follow the visual conventions in [Design](Design.md) and preserve keyboard access.

## Backend and data

- Validate public input on the server, even when the browser already validates it.
- Protect admin routes with authentication and the relevant permission.
- Do not bypass access controls to make an action appear to work.
- Use Prisma migrations when changing the database schema.
- Preserve existing real data; keep test records identifiable and clean up only test data.
- Never log passwords, session tokens, private configuration or uploaded CV contents.

## Files and integrations

- Keep CV uploads private, enforce the 5 MB PDF limit, and serve downloads through the
  authenticated endpoint. Do not expose the private upload directory as static files.
- Keep `.env`, CV files and generated outputs out of commits.
- Use a persistent `CV_STORAGE_DIR` on deployments and include it in backups.
- Report SMTP/Cloudinary configuration requirements accurately; saving a request does
  not prove an email was delivered.

## Verification

- Frontend changes: run `npm run build` inside `frontend`.
- Backend changes: run `npm run check` inside `backend`; build when applicable.
- For data flows, verify both submission and authorised retrieval where possible.
- For private downloads, verify access denial and file validation as well as success.
- Summarise what was checked and disclose untested browser behavior or integration limits.
- Update the relevant documentation when changing a documented behavior.
