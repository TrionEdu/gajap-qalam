# Gajap Qalam Project Notes

## Current Requirements
- Build the site as a polished platform for "Ғажап Қалам", a Kazakhstan youth creative tournament.
- Use the provided `gq.png` logo as the brand mark.
- Match the user-approved Claude artifact: a light editorial layout, blue accent, large centered headline, three pastel direction cards, season timeline, school/partner blocks, archive preview, and registration form.
- Use the seven user screenshots from 2026-09-14 as the literal desktop reference for scale, spacing and hierarchy: narrow centered content, restrained heading sizes, light timeline, equal white school/partner cards, unframed archive numbers and a narrow centered form.
- Preserve the artifact's concise Russian copy and clear one-page navigation.
- Keep the supplied Gajap Qalam logo in the header and footer while adapting its scale to the approved layout.
- The submission workflow is now implemented with Cloudflare D1 and private R2 storage. PDF files are limited to 20 MB and optional covers to 2 MB.
- Each successful submission receives a public application number and a private status code. Publication requires a separate parent consent and an editor action.
- Season schedule: registration in September; master classes from September through January; submissions through the end of February; jury in March; festival in April so the season finishes before May.
- Public source repository: `https://github.com/TrionEdu/gajap-qalam`. The GitHub remote is named `github`; the existing Sites remote remains `origin`.
- Use the supplied `telegaaagq.png` circular pencil character logo in the header, hero, footer and favicon. Preserve the exact artwork rather than redrawing it.
- The 2026-10-12 Claude export adds useful visual energy and content: vivid hero artwork, theme switching, richer competition tracks, a special Great Steppe nomination, collaboration calls, a rotating showcase and a fuller registration questionnaire.
- Keep the public site honest: registration, status, file upload, library publication and moderated reviews are implemented; accounts, social voting and unmoderated posting remain out of scope.
- Updated directions: Comics and Manga; Scenario and Storytelling; Concept Art and Merch; plus the special nomination Legends of the Great Steppe: Neo-Nomads.
- Brand asset assignment updated on 2026-10-12: `phavicon.png` is the favicon and Apple touch icon; `black logo GQ.png` is the header/footer lockup; `banner.png` is the main hero artwork.
- The main banner already contains a Gajap Qalam mark, so the former separate hero seal is removed to avoid duplicated branding.
- The owner replaced the hero artwork with the wider `banner2.png` on 2026-10-12; use a fresh asset URL and responsive crop so browsers do not retain the previous banner from cache.
- The owner requires every detail of `banner2.png` to remain visible without cropping: use `object-fit: contain` on desktop and show the complete banner as a separate full-width media strip above the hero copy on narrow screens.
- The approved 2026-10-12 banner composition removes all overlaid hero copy: the complete artwork sits directly below the header, followed immediately by the news rail and statistics, matching the supplied `qqqq.png` reference.
- The owner restored the hero copy and calls to action on 2026-10-12: on desktop they align with the banner's upper-right logo without covering it; on narrow screens they remain a separate blue block below the complete banner.
- Mobile hero order updated from the owner's 2026-10-12 phone reference: copy and calls to action come first, followed by a 16:9 left-focused banner crop that keeps the children and QALAM artwork prominent. Desktop remains unchanged.
- The supplied `phavicon.png` already matched the tracked favicon asset exactly; use the new `gajap-qalam-favicon-v2.png` URL in icon, shortcut and Apple metadata to refresh browser caches.
- Primary header/footer branding updated on 2026-10-12 to the supplied horizontal `LOGO GQ.png`. Keep the complete lockup visible without cropping; the separate typed wordmark is removed.

## Definition Of Done
- Main desktop viewport renders without obvious overlap, clipped critical text, or broken imagery.
- Mobile viewport renders without unintended horizontal scrolling and with readable primary content.
- Floating news block is visible and centered on desktop, and becomes readable below hero content on narrow screens.
- Hero controls and primary CTAs are keyboard/focus accessible as links or buttons.
- Build completes successfully.
- Published URL is updated after verified changes.
- Public access is a separate setting and must not be changed without the user's explicit request.

## Latest Verification
- 2026-10-12: Platform phase implemented with D1 submissions/status/reviews and private R2 work/cover storage. Admin access is restricted by the Sites identity email.
- 2026-10-12: Local end-to-end test passed: PDF submission, receipt and status lookup, admin review, publication, online reading, review moderation and public approved review.
- 2026-10-12: `npx tsc --noEmit`, `npm run lint`, `git diff --check` and `npm run build` passed after the platform changes.
- 2026-10-12: Desktop browser check at 1280 px and mobile checks at 390 px found no horizontal overflow on home, submit, library or work detail. A Cyrillic-slug double-encoding issue and PDF.js worker URL issue were found and fixed. The canvas reader rendered the test PDF at both breakpoints.
- 2026-10-12: Automatic email notifications are optional and remain inactive until a valid `RESEND_API_KEY` is configured. Submissions still appear immediately in `/admin`.
- 2026-09-13: Build completed with `build-site.mjs`.
- 2026-09-13: Desktop browser check confirmed no horizontal overflow and no overlap between the hero title and floating news block.
- 2026-09-13: Mobile browser check at 390px confirmed no horizontal overflow, hidden mobile slider arrows, and hidden category scrollbar.
- 2026-09-13: External Claude artifact could not be inspected because Claude required sign-in.
- 2026-09-14: Claude artifact opened successfully in the user's authenticated session and the user explicitly approved it as the replacement design.
- 2026-09-14: The first light implementation was rejected because it widened the layout, enlarged and over-weighted headings, darkened the timeline, colored the partner card blue and framed the archive. Those deviations must not return.
- 2026-10-12: The Claude Artifact URL required authentication in a fresh browser session. The supplied `gajapqalam-next` export was inspected as the matching source implementation.
- 2026-10-12: The export's platform-like interactions were classified as prototypes only; the production site keeps email-based actions and explicitly states that it does not store registration data.

## Checked External References
- `bubble.ru`: used only as a layout and product-surface reference, not copied verbatim.
- Claude artifact link: fully inspected on 2026-09-14 after sign-in; its visible content and page structure are now the approved reference.

## Rejected Variants
- Bright orange sale-style promo layout: felt too commercial and not aligned with the user direction.
- Full noir detective-only layout: atmospheric, but less close to Bubble's comic-media portal structure.
- Dark Bubble-style portal with a floating news card: superseded by the approved light Claude artifact on 2026-09-14.
- First Claude-inspired implementation: rejected for changing the reference's proportions and component treatment instead of matching it closely.

## Festival cover — 2026-10-12
- Requested asset: 16:9 cover inspired by the supplied sports poster; blue #0361ff, oversized QALAM, photorealistic Kazakh schoolchildren running in one shared perspective, tablets/styluses/sketchbook/pencils, one floating sheet. No decorative patterns or additional copy.
- Created one built-in imagegen trial and saved `public/images/qalam-festival-cover-v1.png`. Export normalized to exact 16:9 at 1664 × 936.
- Checked full composition and enlarged equipment/hand details: four fictional children, shared travel direction, all bodies in frame, two tablets, drawing album, pencils and floating sheet visible; no obvious duplicated limbs. QALAM is partially covered by people as intended.
- Blue was requested as #0361ff; generated lighting produces blue variations, so uniform exact pixel color is not claimed.
- Asset created and visually checked; not integrated into the page, published, or owner-approved. Source files were not changed; build/layout checks are not applicable to this asset-only delivery.

### Cover revision v2 — 2026-10-12
- Owner correction: add the QALAM cast shadow on the floor; make all children visibly run left.
- v1 defect: typography was treated as a flat backdrop, so it had no floor shadow; three-quarter forward poses did not make leftward motion sufficiently clear.
- One built-in imagegen edit: floor shadows from upright letters and left-facing running profiles; preserved blue/white palette, four children, art equipment and floating paper. Saved separately as `public/images/qalam-festival-cover-v2.png`, exact 1664 × 936 (16:9).
- Full-resolution visual review: letter shadows visible in floor perspective, all four faces and strides directed left, complete bodies, equipment and one paper retained. No obvious extra limbs or decorative objects. Not yet integrated/published/owner-approved.

### Cover revision v3 — 2026-10-12
- Owner requests the supplied poster's stronger dynamics; previous left-facing revision remains a content reference, not the composition target.
- One built-in imagegen edit with sports poster as dynamics reference: low wide-angle view, tilted typography/ground, large foreshortened foreground stride, progressively smaller runners. Preserved leftward travel, four photorealistic children, equipment, single floating paper and QALAM floor shadows.
- Saved `public/images/qalam-festival-cover-v3.png`, normalized to 1664 × 936. Reviewed full-resolution image: all four bodies visible, faces/strides leftward, extreme foreground shoe perspective, shadows visible, requested equipment retained, no obvious limb duplication. Floating paper touches upper edge. No site integration, publishing or owner approval claimed.

### Cover revision v4 — 2026-10-12
- Owner supersedes leftward direction: turn east/right, run toward viewer, move children slightly farther back.
- One built-in imagegen edit of v3. Shared travel now from rear left toward foreground right/camera, frontal three-quarter poses, reduced lead figure/foreground shoe, more floor space. Kept QALAM and floor shadows, four children, two tablets, stylus, album, pencils and single floating paper.
- Saved separately as `public/images/qalam-festival-cover-v4.png`, exact 1664 × 936. Reviewed full export at original resolution: four complete bodies, rightward faces and approaching strides, equipment visible, no obvious duplicated limbs, paper now fully inside frame. Site integration/publication/owner approval remain unclaimed.

### Cover revision v5 — 2026-10-12
- Owner removes QALAM and all floor shadows, will compose typography independently. Requests more natural photographic children with less synthetic texture.
- One built-in imagegen edit of v4; preserved four children, travel toward viewer/right, art equipment and floating sheet. Removed background text and cast shadows, simplified blue background. Requested natural face/hair/cloth rendering without HDR or artificial grain.
- Saved `public/images/qalam-festival-cover-v5.png`, 1664 × 936. Checked whole generated image and enlarged lead face/hands: text and floor shadows absent, four full bodies and props retained, no obvious extra limbs. Photographic naturalness remains a visual limitation: generated hair/faces still show some synthetic styling; do not claim actual photography or complete removal of AI appearance. Not integrated/published/owner-approved.

### Cover revision v6 — 2026-10-12
- Owner requests different dynamic motions rather than synchronized running.
- Built-in imagegen edit: leader in airborne bound, tablet girl in long stride, album boy in compact running phase, pencil girl with high knee/open balance arm. Preserved rightward approach, four children, equipment, paper, no lettering or cast shadows.
- First trial produced an extra bent arm on tablet girl. Rejected that trial; targeted second edit removed the extra arm. Checked whole corrected output and enlarged girl/central boy anatomy: two arms each, no obvious duplicated limbs; four distinct silhouettes visible. Naturalness limitation from v5 remains.
- Saved corrected `public/images/qalam-festival-cover-v6.png` at exact 1664 × 936. Not integrated/published/owner-approved.

### Cover revision v7 — 2026-10-12
- Owner rejects synthetic-looking hair/faces. Changed approach from generic realism enhancement to explicit replacement of hairstyles and expressions: boys with ordinary short dark hair, tablet girl with ponytail, pencil girl with braids; less uniform smiles and distinct facial proportions.
- One built-in imagegen edit. Saved `public/images/qalam-festival-cover-v7.png`, 1664 × 936. Reviewed full generated composition and close crops of all four faces/hands: ornamental curls removed, ponytail and short hair visible, central boy expression differs; four poses/props/full bodies retained, no return of third arm, text or floor shadows.
- Improved naturalness is a visual assessment, not proof of authentic photography or complete removal of synthetic appearance. Not integrated/published/owner-approved.

### Cover revision v8 — 2026-10-12
- Owner requests far-left blue-shirt girl's gaze directly toward viewer.
- One built-in imagegen localized head/gaze edit of v7. Saved `public/images/qalam-festival-cover-v8.png`, 1664 × 936.
- Checked whole generated output and close crop of girl's head: face turned toward camera, both eyes visible and direct gaze; running pose and equipment retained. Other three poses, single paper, no text/shadows retained; no obvious recurrence of extra limbs. Not integrated/published/owner-approved.

### Cover revision v9 — 2026-10-12
- Owner requests removal of mottled/striped surface artifacts and slight off-camera gaze for far-left girl.
- One built-in imagegen cleanup edit of v8; changed girl's gaze slightly to image right, reduced artificial clothing/background texture. Whole composition and enlarged left/central detail reviewed: poses/props retained, gaze changed, no text/shadows or extra limbs. Some synthetic texture remains on jeans; complete artifact removal is not verified.
- Saved `public/images/qalam-festival-cover-v9.png`, normalized to 1664 × 936. Not integrated/published/owner-approved.

### Cover revision v10 — 2026-10-12
- Owner pinpoints remaining mottled artifacts on boys' black clothing. Generic cleanup in v9 was insufficient; approach changed to localized replacement of fabric material rather than global denoising.
- One built-in imagegen edit rebuilt leader's dark pants and central boy's hoodie/pants as plain matte black cotton, keeping natural folds. Saved `public/images/qalam-festival-cover-v10.png`, exact 1664 × 936.
- Checked whole generated composition and enlarged both boys' clothing: prior brown/gray marbled markings removed, broad natural fold shading remains. Four poses, faces, props, girl's slightly off-camera gaze, paper and no text/shadows retained; no obvious extra limbs. Girl's jeans were outside this targeted edit and still have some synthetic texture. Not integrated/published/owner-approved.

### Cover revision v11 — 2026-10-12
- Owner rejects accumulated edits for degrading faces/anatomy; requests full recreation with natural photographic quality.
- Changed approach: one fresh built-in imagegen generation with no previous generated image as input. Retained four Kazakh pupils, different running phases toward right/viewer, two tablets/stylus/album/pencils, one paper, blue background without text/shadows. New identities/composition; ordinary hairstyles and plain fabrics.
- Saved `public/images/qalam-festival-cover-v11.png`, normalized to 1664 × 936. Checked full output and enlarged all four faces/hands: complete bodies, two arms/two legs each, props held coherently, ordinary skin/hair and clean black fabric without previous marbling. No obvious anatomical duplication; a visual inspection cannot guarantee perfect photography. Group depth is less dramatic than v6; not owner-approved/integrated/published.

### Cover revision v12 — 2026-10-12
- Owner explicitly approves v11 photographic appearance; requests only a slightly more forward running direction.
- One built-in imagegen edit of v11: trajectories rotated toward camera, more frontal torsos/knees, small rightward component. Saved `public/images/qalam-festival-cover-v12.png`, exact 1664 × 936; approved v11 kept separately.
- Reviewed full image and close crops covering all faces/hands/clothes: forward movement visible, props/full bodies retained, no obvious extra limbs or previous marbled black fabric. Gait differences are subtler in frontal view. This revision itself not yet owner-approved, integrated or published.
