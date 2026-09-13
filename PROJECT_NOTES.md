# Gajap Qalam Project Notes

## Current Requirements
- Build the site as a polished platform for "Ғажап Қалам", a Kazakhstan youth creative tournament.
- Use the provided `gq.png` logo as the brand mark.
- Match the user-approved Claude artifact: a light editorial layout, blue accent, large centered headline, three pastel direction cards, season timeline, school/partner blocks, archive preview, and registration form.
- Use the seven user screenshots from 2026-09-14 as the literal desktop reference for scale, spacing and hierarchy: narrow centered content, restrained heading sizes, light timeline, equal white school/partner cards, unframed archive numbers and a narrow centered form.
- Preserve the artifact's concise Russian copy and clear one-page navigation.
- Keep the supplied Gajap Qalam logo in the header and footer while adapting its scale to the approved layout.
- The current submission form is a visual prototype; real database, uploads, and accounts are not implemented yet.
- The registration form opens a prefilled email and does not upload files or store personal data on the site.
- Season schedule: registration in September; master classes from September through January; submissions through the end of February; jury in March; festival in April so the season finishes before May.

## Definition Of Done
- Main desktop viewport renders without obvious overlap, clipped critical text, or broken imagery.
- Mobile viewport renders without unintended horizontal scrolling and with readable primary content.
- Floating news block is visible and centered on desktop, and becomes readable below hero content on narrow screens.
- Hero controls and primary CTAs are keyboard/focus accessible as links or buttons.
- Build completes successfully.
- Published URL is updated after verified changes.
- Public access is a separate setting and must not be changed without the user's explicit request.

## Latest Verification
- 2026-09-13: Build completed with `build-site.mjs`.
- 2026-09-13: Desktop browser check confirmed no horizontal overflow and no overlap between the hero title and floating news block.
- 2026-09-13: Mobile browser check at 390px confirmed no horizontal overflow, hidden mobile slider arrows, and hidden category scrollbar.
- 2026-09-13: External Claude artifact could not be inspected because Claude required sign-in.
- 2026-09-14: Claude artifact opened successfully in the user's authenticated session and the user explicitly approved it as the replacement design.
- 2026-09-14: The first light implementation was rejected because it widened the layout, enlarged and over-weighted headings, darkened the timeline, colored the partner card blue and framed the archive. Those deviations must not return.

## Checked External References
- `bubble.ru`: used only as a layout and product-surface reference, not copied verbatim.
- Claude artifact link: fully inspected on 2026-09-14 after sign-in; its visible content and page structure are now the approved reference.

## Rejected Variants
- Bright orange sale-style promo layout: felt too commercial and not aligned with the user direction.
- Full noir detective-only layout: atmospheric, but less close to Bubble's comic-media portal structure.
- Dark Bubble-style portal with a floating news card: superseded by the approved light Claude artifact on 2026-09-14.
- First Claude-inspired implementation: rejected for changing the reference's proportions and component treatment instead of matching it closely.
