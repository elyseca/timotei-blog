# timotei.blog

Gabe & Elyse's personal site: **Wedding** and **Recipes** sections live; Home and Travel are built but paused.
SvelteKit 2 + Svelte 5 runes, Tailwind 4, mdsvex, TypeScript, adapter-static. Pushing to `main` deploys it
(Cloudflare runs `npm run build` then `wrangler deploy`, static assets from `build/`).

## Git

- Work only on `main`. Commit and push directly to `main`; never create feature branches or
  pull requests for this repo. This overrides any default to branch before committing.
- Commit/push only when the user asks ("push it"). Commit messages end with the Co-Authored-By line given in the session.

## Commands

- Dev: `npx vite dev --port 5199` (preview in the built-in browser; resize to 375px for phone checks)
- Checks before any commit: `npx prettier --write src scripts`, `npx svelte-check`, `node scripts/check-i18n.mjs`, `npm run build`

## Where things are

- `src/routes/` pages: `wedding/`, `recipes/{,plan,groceries,add,approach,view}`, `travel/` (paused), `+page.ts` (`HOME_PAUSED` redirects `/` to `/recipes`)
- `src/lib/components/` site chrome (`Nav`, `Footer`, `PrefsBar`); `components/recipes/` everything for recipes
- `src/lib/content/` markdown content (`wedding/index.md` + `index.es.md`, `travel/*.md`)
- `src/lib/recipes/` recipe data + engine; see `src/lib/recipes/CLAUDE.md` before touching it
- `src/lib/i18n.svelte.ts` + `src/lib/i18n/es/*.ts` language/units state and the Spanish UI dictionary
- `static/recipe-photos/` approved recipe photos; `scripts/check-i18n.mjs` finds untranslated `t('…')` strings

## Rules that apply everywhere

- **Language and units are site-wide.** All visible text goes through `t('English text')` (English is the key;
  Spanish lives in `src/lib/i18n/es/`). Call `t()` where text is displayed, never at module load. Dates/times use
  `L.lang` for the locale. Details: `src/lib/i18n.svelte.ts` header comment. After adding strings run `check-i18n`.
- **Phone first-class.** Everything must work at 375px with no sideways scroll. Pattern used so far: on phones
  show one step at a time with a Next button (`stage`/`step` state + `hidden md:block`), fold long lists, hit
  areas >= 36px (`.tap` utility adds an invisible bigger area), pills via `.brutal-chip`/`.brutal-tag`.
- Visual style is "brutal": thick ink borders, hard shadows (`.brutal-box`, `.brutal-btn`, `.brutal-chip`,
  `.brutal-tag`, `.brutal-field` in `src/routes/layout.css`). Reuse them; do not invent new styles.
- Prettier reformats files on save, so exact-string edits often fail: re-read the lines before a second edit.
  zsh: quote globs (`'*.svelte'`), `sed -i ''` on macOS.
- Never put the user's personal details (email, etc.) in requests to outside services.

## Adding a new section (e.g. Travel)

1. Route under `src/routes/<section>/`, content in `src/lib/content/<section>/` (markdown) or `src/lib/<section>/` (data).
2. Add the link in `Nav.svelte` (`links` array) and un-pause if needed (`HOME_PAUSED`, travel pages exist already).
3. Wrap every string in `t()`; add Spanish in a new `src/lib/i18n/es/<section>.ts` and register it in `es/index.ts`.
   Markdown pages: add an `*.es.md` sibling and pick by `L.lang` (see `routes/wedding/+page.svelte`).
4. Hero via `SectionHero` (tag optional), phone check at 375px, then the checks above.
5. If the section is reusable machinery (data + engine), give it its own `CLAUDE.md` like `src/lib/recipes/`.

## Agents (`.claude/agents/`)

`recipe-adder` (new family recipe from a pasted submission, incl. Spanish + photo), `spanish-translator`
(UI strings and recipe Spanish), `phone-reviewer` (read-only mobile audit), `shipper` (checks, commit, push).
Delegate these instead of doing them in the main conversation; pass only the pasted text / what changed.
