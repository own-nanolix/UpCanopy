# STATE: UpCanopy brand site

Spec: `rule/Brand-site.md` (master spec) and `rule/08-upcanopy.md` (this project's link and layout direction).
The same pipeline was run first on Tectra (`../project-2`); its fixes are applied here from the start.

## Project facts

- Next.js 16.4.6 (App Router, Turbopack), React 19.3.0, JavaScript only.
- App lives in `src/app`. In the spec, `app/`, `components/` and `lib/` mean `src/app`, `src/components`, `src/lib`.
- Tailwind CSS 4.3.3 through the `@tailwindcss/turbopack` loader (plain CSS only; CSS Modules keep the default
  handling) and `@import "tailwindcss"` in `src/app/globals.css`.
- Import alias: `@/*` -> `./src/*`.
- framer-motion ^14.12.0. playwright (dev) added for the checks.
- Node v22.18.0, git 2.54.0. Browser tool: playwright-cli skill (global), Chromium 1254.
- Remote: `origin` = https://github.com/own-nanolix/UpCanopy.git, branch `main`.
- BEHANCE_URL: https://www.behance.net/gallery/246813295/UpCanopy
- SITE_NAME: upcanopy-brand-site

## Layout direction (from `rule/08-upcanopy.md`, section 2b)

- Mockup staging: diagonal cascade: objects stepping across the frame and cropping off its edges.
- Mockup backdrop: a seamless studio sweep tinted with the lightest brand colour.
- Brand pages lean on: a split screen: a fixed rail on one side, scrolling content on the other.
- Dashboard option A is: a light editorial layout led by large figures; B to E are four other structures.
- Landing pages lean on: modular cards that reflow, led by product UI.

## Steps

- [x] 1. Check the project and the PC, tool files, `next.config` keys, `.gitignore` lines
- [x] 2. Extract the case study
- [x] 3. Study it and write `SOURCE.md`
- [x] 4. `LAYOUTS.md`, `pages.json`, shared system, 30 stub routes, `BRIEF.md`; dev server started
- [ ] 5. Build team, two waves; check reports 30 of 30 `ok`
- [ ] 6. Review team; shared fixes applied
- [ ] 7. Verify in the browser; SVG export
- [ ] 8. `REPORT.md` and `README.md`
- [ ] 9. Offer to publish to Vercel

## Decisions

- The spec names `PROJECT.md` and `BRAND-SITE.md` in the project root. Here they are `rule/08-upcanopy.md` and
  `rule/Brand-site.md`; they are left where they are and are not edited. From `08-upcanopy.md` only the Behance
  link, the site name and section 2b apply.
- `next.config.mjs`: `cacheComponents` and `partialPrefetching` removed (they cannot be combined with
  `output: 'export'`); the Tailwind loader is limited to non-module CSS so CSS Modules export class names.
- `scripts/flatten-prefetch.mjs` runs as `postbuild` so link prefetch files resolve on a plain static host.
- `gh` is not installed; it is not needed because `origin` exists and `git push` works.
- The case study is in Portuguese. Site words are English; brand copy stays in Portuguese exactly as written.
- HERO_FEATURE = the remote back-office (CRM, agenda, financeiro in one place). PRODUCT_OBJECT = the welcome
  kit: the navy document box with the compliance letter and pen.
- The case study names no fonts. Closest free matches: Lexend Exa (logotype voice) and Red Hat Display (text
  voice). The word-mark is set in the logotype voice, not traced.
- The case study has no product screens, prices, statistics or testimonials. Product pages are extensions and
  use only its labels (CRM, agenda, financeiro, landscape, hardscape, Organização, Disciplina, Confiança), the
  five attribute scales and the palette; everything else is a quiet placeholder.

## Dev server

http://localhost:3103 (start with `npx next dev -p 3103`; stop it before `npm run build`)

## Log

- Step 1 done: tools from spec section 16, config, gitignore, playwright, baseline build passes.
- Steps 2 and 3 done: 32 images in reference/ (headed Chrome), readable copies made, SOURCE.md written with the
  page's full Portuguese text.
- Step 4 done: LAYOUTS.md, pages.json, shared system, 30 stub routes, BRIEF.md. Lint clean; build passes; check lists 30 stubs. Plumbing (dock, index, reveal, tools, device frames) is reused from the Tectra project; tokens, type, mark, key art, mockup kit, screens, nav and footer belong to this brand only.
- Decision: landing ids lp-home, lp-crm, lp-agenda, lp-financeiro, lp-hardscape, lp-manifesto, lp-contato.
- Decision: page background is Green Ligth #F2FFE4; small green text on light surfaces uses #086338 (Green Park fails 4.5:1 there).
- Step 5 started: wave 1 launched (B1 to B12, Sonnet). If a session ends here, trust only `npm run build` and `node tools/check.mjs`.
