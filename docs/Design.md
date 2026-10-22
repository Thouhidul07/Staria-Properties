# Design

Last updated: 22 October 2026

## Visual direction

The public website uses a restrained real-estate presentation: generous spacing,
architectural photography, rounded cards, serif headings, and clear enquiry actions.

| Element | Existing convention |
| --- | --- |
| Deep backgrounds | `#082D1C` |
| Primary green | `#0B5E3C` |
| Gold actions and accents | `#D9A11A` |
| Body text | `#1B1B1B` and muted greys |
| Light surfaces | White, `#FAFAF6`, `#F7F7F5` |
| Heading type | Gilda Display with Georgia/serif fallback |
| Body type | DM Sans with sans-serif fallback |
| Icons | Lucide React; inline WhatsApp mark |
| Motion | Motion for React; preserve usable reduced-motion behavior |

## Page and interaction patterns

- Public pages share `Layout.tsx`; admin pages use `AdminLayout.tsx`.
- Property cards link to `/properties/:id`, which fetches the published property directly.
- Project links use `/projects/:id`; the project details currently appear within the
  Projects page rather than a standalone detail-page component.
- Development service buttons link to `/development/services/:slug`.
- Consultation and application forms use Radix dialogs with labelled fields, privacy
  consent, pending, error and success states.
- Keep the selected property, project or service visible in contextual enquiry forms.
- The WhatsApp widget belongs to the public layout only. Keep it off admin routes.
- Position the scroll-to-top control above the WhatsApp widget.

## Forms

| Form | Main information |
| --- | --- |
| Consultation | Name, email, phone, service, requirements, consent |
| Property viewing | Contact details, property reference/link, preferred time, message |
| Project discussion | Contact details, project name/link, requirements |
| Employment | Contact details, desired role, experience, qualifications, PDF CV, cover letter |

PDF CVs are required for new employment submissions and limited to 5 MB. The admin
enquiry card provides a download action; the private storage reference is hidden from
the displayed message.

## Content states

- Property and project grids render API records only; do not substitute demo cards when
  results are empty or requests fail.
- Show loading, empty and error states separately.
- A missing/unpublished property should show an unavailable state.
- Show form success only after the API accepts the submission. Keep entered data when
  submission fails so the customer can retry.
- Some other public sections still contain fixed content or demo fallbacks. See
  [Tasks](Tasks.md) before describing the entire website as CMS-driven.

## Accessibility and responsive behavior

Use links for navigation and phone calls, buttons for actions, and visible focus states.
Associate labels with controls, announce errors and success, and prevent duplicate
submissions while pending. Dialog content must scroll on small screens. Images need
useful alternative text. Check desktop navigation and the mobile menu when changing
shared calls to action.
