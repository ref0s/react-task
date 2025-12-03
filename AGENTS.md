# Repository Guidelines

## Project Structure & Module Organization
- Core app lives in `src/` with entry at `src/main.tsx` and root layout in `src/App.tsx`.
- Shared UI primitives are under `src/components/ui/` (Radix-based controls, form helpers, feedback components). Add new reusable pieces here.
- Page-level screens live in `src/pages/` (e.g., `home.tsx`); keep routing/view logic here and import UI atoms/molecules from `components`.
- Styles come from `src/index.css` and `src/App.css`, augmented by Tailwind via `@tailwindcss/vite`. Place static assets in `src/assets/` and public files in `public/`.

## Build, Test, and Development Commands
- `npm run dev` — start Vite dev server with HMR.
- `npm run build` — type-check via `tsc -b` then produce the production bundle with Vite.
- `npm run preview` — serve the built bundle locally for smoke testing.
- `npm run lint` — run ESLint (flat config) on all TypeScript/React sources.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components; prefer hooks over classes.
- Components: PascalCase file and component names (`UserCard.tsx`), camelCase for functions/vars, SCREAMING_SNAKE_CASE for constants.
- Styling: favor Tailwind utility classes; keep custom CSS scoped to the component when possible.
- Linting: `eslint.config.js` extends `@eslint/js`, `typescript-eslint`, React Hooks, and React Refresh rules. Resolve lint warnings before pushing.

## Testing Guidelines
- No framework is wired yet; if you add tests, align on Vitest + React Testing Library.
- Co-locate unit tests as `*.test.ts`/`*.test.tsx` beside the code or in `src/__tests__/`.
- Aim for meaningful coverage on form validation, UI state, and data plumbing; add small fixtures/mocks instead of hitting real services.

## Commit & Pull Request Guidelines
- Write imperative, scoped commits: `feat: add customer table`, `fix: handle empty form submission`.
- PRs should include a short summary, screenshots/GIFs for UI changes, linked issue (if any), and how to exercise the change locally.
- Keep diffs focused; note any follow-ups or intentional gaps in the description.

## Security & Configuration Tips
- Do not commit secrets; use env placeholders and `.env` entries kept local.
- Validate external inputs (forms, query params) with schema helpers like `zod` before using them.
- Run `npm run build` and `npm run preview` before releases to catch type or bundling issues early.
