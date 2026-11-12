# REPORT: UpCanopy brand site

A 30-page brand site built from the Behance case study "UpCanopy" by Jonas Nicacio
(https://www.behance.net/gallery/246813295/UpCanopy). UpCanopy is a remote back-office (CRM, agenda and finance)
for landscape and hardscape companies run by Brazilian immigrants in the United States.

## Where the site is

- **Routes:** `/` shows the overview. Every page is `/<id>/`: overview, logo, color, gradients, typography, icons,
  dataviz, motion, strategy, web-system, lp-home, lp-crm, lp-agenda, lp-financeiro, lp-hardscape, lp-manifesto,
  lp-contato, dashboard, mobile-a, mobile-b, feature, showcase, campaign, use-apparel, use-accessories,
  use-stationery, use-packaging, use-event, use-world, use-product.
- **Static export:** `npm run build` writes the site to `out/`. It needs no server features.
- **Local dev server:** http://localhost:3103 (`npx next dev -p 3103`).
- **GitHub:** https://github.com/own-nanolix/UpCanopy (branch `main`). Pushed once, after the final review,
  because Vercel is connected to the owner's repos and every push goes live (the owner's standing orders).
- **Live link:** needs a Vercel import by the owner (no Vercel project is known for this repo yet).

## Deliverables: minimum and delivered

Exportable SVGs per page, as counted by `node tools/check.mjs` on the built site (30 of 30 pages `ok`). The
`data-export` / `exportName` count is the only deliverable count that was re-checked by a tool.

| # | Page | Minimum | Delivered |
|---|---|---|---|
| 1 | overview | 2 | 16 |
| 2 | logo | 18 | 30 |
| 3 | color | 5 | 11 |
| 4 | gradients | 20 | 25 |
| 5 | typography | 6 | 12 |
| 6 | icons | 40 | 46 |
| 7 | dataviz | 20 | 24 |
| 8 | motion | 6 | 14 |
| 9 | strategy | 3 | 14 |
| 10 | web-system | 3 | 6 |
| 11 | lp-home | 2 | 11 |
| 12 | lp-crm | 2 | 6 |
| 13 | lp-agenda | 2 | 8 |
| 14 | lp-financeiro | 2 | 7 |
| 15 | lp-hardscape | 2 | 7 |
| 16 | lp-manifesto | 2 | 10 |
| 17 | lp-contato | 2 | 10 |
| 18 | dashboard | 8 | 12 |
| 19 | mobile-a | 2 | 7 |
| 20 | mobile-b | 2 | 10 |
| 21 | feature | 2 | 4 |
| 22 | showcase | 4 | 5 |
| 23 | campaign | 7 | 17 |
| 24 | use-apparel | 12 | 13 |
| 25 | use-accessories | 20 | 22 |
| 26 | use-stationery | 14 | 18 |
| 27 | use-packaging | 12 | 14 |
| 28 | use-event | 19 | 20 |
| 29 | use-world | 6 | 6 |
| 30 | use-product | 12 | 17 |

The delivered column adds up to 422, the same as the number of files in `export/svg/`.

Other content in section 9 (for example the 32 icons, the 16 chart types, the 18 mobile screens, the 5 dashboard
options) was checked by the reviewers against the list in the spec. We did not recount it item by item for this
report; only the SVG counts above come from a tool. Two points that follow from the case study: the landing pages
are renamed (lp-crm, lp-agenda, lp-financeiro, lp-hardscape, lp-manifesto, lp-contato), and HERO_FEATURE (page
`feature`) is the remote back-office with CRM, agenda and finance linked in one desk.

## SVG export

`node tools/export-svg.mjs` wrote **422 SVGs** to `export/svg/` with **0 warnings**. The files were checked by the
exporter's warnings only; they were not opened one by one. Text in exported files is live SVG text in the brand
font stack, so a computer without Lexend Exa or Red Hat Display shows a system font until the text is outlined in
a design tool.

## Faithful rebuilds, and what we added

The case study shows no website, no app screens, no prices and no statistics. It shows print, signs, apparel and
objects, plus a few slides.

Faithful to the case study:
- **overview:** the cover (the stationery flat lay) and the project sheet (client, project, country, year, scope).
- **logo:** the mark, the construction by three families of circles, the stacked and horizontal lockups, the
  colour versions shown.
- **color:** the six swatches with the names and hex values as printed.
- **gradients:** navy-to-green, the mint paper gradient, grain, the dot texture, the frond and the mark crop.
- **typography:** the three voices as seen (logotype, text, slide).
- **strategy:** the page's own texts in order (challenge, strategy, naming, visual identity, tone of voice,
  values) and the slide with the five scales.
- **campaign, showcase:** the window panels, the citylight and the poster.
- **use-* pages:** the stationery set, folders, cards, badge on a lanyard, t-shirt, caps, jackets, tote, bottle,
  booth, truck, signs and puck.
- **use-product:** the navy document box with the compliance letter and pen.
- **lp-home** is built from the brand lines and the poster and folder layouts, since the case study shows no
  website. It is an extension, not a copy.

Added by us, as partners, in the designer's language: logo clear space, sizes, misuse and draw-on; colour scales,
pairings and semantic tokens; the gradient library, anatomy, key-art plates and motion studies; the type scale and
metrics study; all 32 icons and the three illustrations; the charts (on the five scales and the palette); the
whole motion system; the web component bench and mega menu; all seven landing pages; the dashboard (options A to
E and two inner screens); all 18 mobile screens, the component set and interaction patterns; the remote
back-office demo; the showcase scenes; social posts, stories and profile grid; the rest of the apparel,
accessories, packaging and event items; the world scenes; and the kit contents, access card, devices and app icon.

## Wording and values that did not come from the case study

- **Site words are English.** Brand copy stays in Brazilian Portuguese exactly as the designer wrote it. Page
  headings, control labels and captions that name deliverables are ours.
- **Names we gave things:** the six gradients, the key-art plate names and scale token names.
- **Recommendations:** minimum logo sizes, clear space, chart rules, motion do / don't pairs and print-spec
  dimensions.
- **Computed values:** colour scale steps are mixed in code from the published colours; contrast ratios are
  calculated. Sampled colours (the slide grey, the deep navy ground, the mint paper, the frond tint) were read
  from the images.
- **Product pages** (CRM, agenda, financeiro, dashboard, mobile, feature) use only the case study's labels (CRM,
  agenda, financeiro, landscape, hardscape, Organização, Disciplina, Confiança), the five attribute scales and the
  palette. Everything else is a quiet placeholder bar. No prices, statistics or testimonials were invented.
- **Placeholders (quiet grey bars):** the letter's body text (too small to read), the invoice's amounts (only
  "Bank Account n°", "Bank Detail" and "Total" are legible), client names, dates, amounts and note text.
- **Source oddities kept as printed:** "Green Ligth", "Asfalt", "Jhon Due" (the placeholder name on the badge),
  "REMOTE BACK–OFFICE" with its en dash.
- **Source text left out:** the design studio's own slide furniture (its name mark, e-mail and site) is not
  reproduced; the designer is credited by name on the overview.
- **Reviewers corrected:** invented sparkline data on dataviz (removed); a clock time on the mobile "now" rule
  (removed); studio slide text on the stationery slides (removed); invented bolding of brand lines (corrected to
  what the case study sets in bold); sections that repeated between landing pages (removed).

## Accessibility changes that altered the look

- The page background is Green Ligth (`#F2FFE4`). Small green text on light surfaces uses a deeper green
  (`#086338`), because Green Park (`#26CF7B`) fails 4.5:1 there.
- Small white text on the gradient on lp-home was found to fail at 390 px in wave 1 and was fixed by the reviewers.
- Left as designed: the green bold "UpCanopy" on the mid-gradient of the web-system mega-menu tile is about 4:1.
  It is the designer's own poster treatment (display artwork inside an SVG).

## Font, and what could not be reproduced in code

- **Font:** the case study names no typefaces. The closest free matches, both on Google Fonts and loaded through
  `next/font/google`, are **Lexend Exa** for the logotype voice (wide, extended, squared round letters) and **Red
  Hat Display** for the text voice (light geometric sans with one bold word). The real fonts are unknown and
  probably commercial. The word-mark is drawn as SVG text in the logotype voice, not traced letter by letter.
- **Not reproduced:** photographs and portraits. They are never reproduced or drawn; the frond, the gradient or
  the mark crop stands in. The glossy 3D mark on the glass tower is a flat drawing with a light edge. Mockups are
  drawn objects, not photographic renders. The pieces that show a hand or a person are drawn without them.

## What was verified in the browser, and what was not

Verified by the lead on the built site (`out/`, served locally), at the end of the review round:
- eslint is clean; `npm run build` passes; `node tools/check.mjs --strict` reports 30 of 30 `ok`.
- `node tools/audit.mjs`: 30 of 30 pages clean at 1440 and 390 px (overflow, low contrast, unnamed controls, bad
  links, missing SVG roles, duplicate ids), with no console errors.
- `node tools/export-svg.mjs` wrote 422 SVGs with 0 warnings.

Verified by the reviewers on the dev server: the interactive parts of their pages by mouse and keyboard. Small
text on gradients, which the audit cannot measure, was checked by eye on the landing pages. On mobile-a (44) and
mobile-b (20) those texts are inside phone screens and were checked by reading the colour pairs only.

Not verified:
- Touch input, Safari and Firefox.
- Reduced motion was checked by reading the code on most pages, not by running it.
- Exported SVGs were checked by the exporter's warnings, not opened one by one.

## Agents

- **Builders:** 24, on Sonnet. Wave 1: 12 builders, 17 pages. Wave 2: 12 builders, 13 pages. None failed.
- **Sent back once:** nine pages came back under the 600-line minimum (overview, strategy, color, typography,
  lp-agenda, lp-financeiro, lp-hardscape, lp-manifesto, lp-contato). Each went once to a second builder
  (Sonnet) and now runs about 700 to 870 lines.
- **Reviewers:** 8, on Opus. Each reviewed and fixed its own pages. The lead applied the shared fixes: the
  vertical word-mark can read top to bottom, the mark-crop defaults match the folder cover, six icons squared,
  placeholder bars may shrink, and landing nav links wrap under 640 px.
- **Final reviewer:** 1, on Opus, independent, checks the code and every page against both rule files before the
  push.
- **Problems found along the way:** the Tailwind loader had to be limited to non-module CSS so CSS Modules export
  class names; the static export's prefetch files gave 404s on a plain static host (fixed by
  `scripts/flatten-prefetch.mjs`, run as `postbuild`); `cacheComponents` and `partialPrefetching` were removed
  because they cannot be combined with a static export. These fixes came from the Tectra project and were applied
  from the start.

## Decisions made under the standing orders

1. The two rule files disagree on technology: `rule/08-upcanopy.md` describes a single HTML file,
   `rule/Brand-site.md` describes this Next.js site and says it gives everything beyond the link, site name and
   layout direction. `Brand-site.md` is followed; from `08-upcanopy.md` only the Behance link, the site name and
   section 2b apply.
2. Commits are local after every builder and fix. One push, after the final review.
3. Site words are English; brand copy stays in Brazilian Portuguese exactly as written.
4. No other company's name, address, product names or copyright appears on any page. The design studio's own
   slide furniture is not reproduced; the designer is credited by name on the overview.
5. Photographs and portraits in the case study are never reproduced or drawn; the frond, the gradient or the mark
   crop stands in.
6. The vertical word-mark reads top to bottom on the letter (as in the case study) and bottom to top on cards and
   jackets.
7. A reviewer's unused file `src/components/pages/lp-hardscape/Pillars.jsx` is kept: files are never deleted.
8. A builder's stray screenshot was moved out of the project.
9. The green bold "UpCanopy" on the mid-gradient of the web-system mega-menu tile is about 4:1: left as the
   designer's own poster treatment.

## Final review

Findings and fixes: to be completed
