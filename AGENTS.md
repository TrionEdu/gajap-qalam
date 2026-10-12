# AGENTS.md

## Project goal

Maintain the public platform for the Ғажап Қалам youth creative tournament: information, submissions, status tracking, editorial moderation and an online library.

## Product constraints

- Preserve the approved light editorial visual direction and compact Apple-like proportions.
- Keep the current five-stage season calendar unless the owner explicitly changes it.
- Registration data is stored in D1 and uploaded work files are stored privately in R2. Do not imply that these files are public before editorial selection.
- Treat participant accounts and self-service authentication as unimplemented. Editor access uses the Sites identity header and the configured owner email.
- Publication requires separate parent consent. Public reviews require moderation.
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
