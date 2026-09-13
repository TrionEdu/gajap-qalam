# Gajap Qalam Project Notes

## Current Requirements
- Build the site as a polished platform for "Ғажап Қалам", a Kazakhstan youth creative tournament.
- Use the provided `gq.png` logo as the brand mark.
- Keep the structure closer to `bubble.ru`: dark header, centered logo, category navigation, large comic-style hero slider, catalog-style cards.
- Keep the news block floating in the center of the hero/banner area.
- Preserve a warm, cinematic, comic/noir tone rather than the earlier bright promo-sale style.
- The current submission form is a visual prototype; real database, uploads, and accounts are not implemented yet.

## Definition Of Done
- Main desktop viewport renders without obvious overlap, clipped critical text, or broken imagery.
- Mobile viewport renders without unintended horizontal scrolling and with readable primary content.
- Floating news block is visible and centered on desktop, and becomes readable below hero content on narrow screens.
- Hero controls and primary CTAs are keyboard/focus accessible as links or buttons.
- Build completes successfully.
- Published URL is updated after verified changes.

## Latest Verification
- 2026-09-13: Build completed with `build-site.mjs`.
- 2026-09-13: Desktop browser check confirmed no horizontal overflow and no overlap between the hero title and floating news block.
- 2026-09-13: Mobile browser check at 390px confirmed no horizontal overflow, hidden mobile slider arrows, and hidden category scrollbar.
- 2026-09-13: External Claude artifact could not be inspected because Claude required sign-in.

## Checked External References
- `bubble.ru`: used only as a layout and product-surface reference, not copied verbatim.
- Claude artifact link: checked on 2026-09-13. It requires Claude sign-in, so its content is not available and cannot be treated as verified source content.

## Rejected Variants
- Bright orange sale-style promo layout: felt too commercial and not aligned with the user direction.
- Full noir detective-only layout: atmospheric, but less close to Bubble's comic-media portal structure.
