# AGENTS.md

## Project goal

Maintain the public website for the Ғажап Қалам youth creative tournament. The current product is a polished one-page informational site, not a complete submission platform.

## Product constraints

- Preserve the approved light editorial visual direction and compact Apple-like proportions.
- Keep the current five-stage season calendar unless the owner explicitly changes it.
- Do not claim that registration data or uploaded files are stored. The current form only opens a prefilled email.
- Treat database storage, accounts, authentication and file uploads as unimplemented features.
- Keep participant and parent-facing copy clear and suitable for a youth tournament.
- Do not publish personal information about minors.

## Engineering workflow

- Reuse the existing Next.js, Vinext, TypeScript and CSS structure.
- Keep changes scoped to the requested behavior.
- Run `npm run build` after source changes.
- Verify desktop and mobile layouts after visual changes.
- Do not commit `.env` files, credentials, tokens, generated build folders or dependency folders.

## Important files

- `app/page.tsx`: page content and interactions.
- `app/globals.css`: visual system and responsive layout.
- `app/layout.tsx`: metadata and document shell.
- `PROJECT_NOTES.md`: accepted decisions, rejected directions and verification history.
