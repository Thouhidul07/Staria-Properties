# Services and UI updates

Development service and client-advantage copy is based on `K:/Staria/Staria profile 2.pdf`, pages 2 and 4. Rental services appear under the separate Properties division in the profile; the affected public Development presentation omits them at the client's request. Backend, database and admin capabilities remain unchanged.

The five existing Development service rows cover residential, commercial/mixed-use, smart infrastructure (including digital signage and intelligent displays), sustainable construction, and project planning/management/consultancy. The former property-management rows and dark cards now explain the five client advantages without repeating these services.

## Assets and details still needed

- Client-approved Development and client-advantage photographs. Existing Unsplash imagery is retained and identified as illustrative stock imagery.
- Confirmed project names, specifications, completion status and photographs before the static Development concept showcase can be presented as completed or active STARIA projects. Its existing source data remains intact, and its public presentation is labelled illustrative.
- Any certifications, warranties, response commitments or detailed technical facilities require explicit confirmation before inclusion; they are not inferred from the profile.

## Retained consultation sections

- In `frontend/src/app/components/property-management-section.tsx`, `SHOW_PORTFOLIO_CTA = false` keeps the original green portfolio CTA unmounted. Set it to `true` only when the original property-management promotion is approved for public use. The original dialog and CTA markup remain available.
- `InteriorCTASection` is retained in `frontend/src/app/components/interior-design-page.tsx`, but is no longer mounted by `InteriorDesignPage`.

## Verification

Local Chrome checks at 1440px desktop and 375px touch-mobile widths verified sale-only results, the combined type/location/budget search, all four Interior gallery categories and active states, and the absence of the two consultation banners and rental service cards. Listing checks used mocked API responses, including rental/lease records returned despite the sale query, to verify defensive filtering without changing database records. Live backend search was not verified.
