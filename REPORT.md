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

The other items each row of section 9 asks for were counted from the page code after the final review:

| Page | Item | Minimum | Delivered |
|---|---|---|---|
| overview | Cover / principle cards / chapter index / mockup-and-product index | 1 / 4 / 1 / 1 | 1 / 4 / 1 (4 groups) / 1 |
| logo | Primary lockup / construction / clear space | 1 / 1 / 1 | 1 / 1 / 1 |
| logo | Minimum sizes / colour versions / lockup family / misuse examples | 4 / 4 / 4 / 6 | 4 / 6 / 7 / 6 |
| logo | Secondary graphic / animated draw-on | 1 / 1 | 2 / 1 |
| color | Scale tables / proportion bar / accessible pairings / semantic tokens | 2 / 1 / 6 / light and dark | 3 / 1 / 6 / light and dark |
| gradients | Named gradients / anatomy / grain levels with comparison / key art / motion studies | 6 / 2 / 4 + 1 / 6 / 4 | 6 / 2 / 4 + 1 / 6 / 4 |
| typography | Primary weights / secondary weights / scale rows / character sets / hierarchy layouts / metrics study | all / all / full / 1 / 1 / 1 | 4 / 3 / 15 / 2 / 2 / 1 |
| icons | Icons / constructions with 4 sizes / in-use examples / illustrations on light and dark | 32 / 2 / 4 / 3 | 32 / 2 / 4 / 3 (6 exports) |
| dataviz | Chart types / stat cards / KPI tiles / table rows / live counters / chart rules / states | 16 / 4 / 3 / 6 / 2 / 6 / 3 | 20 / 4 / 3 / 6 / 4 / 6 / 3 |
| dataviz | Sparklines; legend, tooltip and tab components | present | 2 sparklines; all present |
| motion | Easing demos / logo animations / transition demos / micro-interaction groups / do and don't | present | 4 / 2 / 5 / 7 / 1 (3 rules) |
| strategy | Story sections | present | 6 |
| web-system | Button variants with states / navigation bar / mega menu / footer | 6 / 1 / 1 / 1 | 6 (5 states each) / 1 / 1 / 1 |
| web-system | Links, tags, feature cards, content block, list rows | present | present (not counted one by one) |
| lp-home | Sections | 8 | 8 |
| lp-crm / lp-agenda / lp-financeiro | Sections | 7 each | 7 / 12 / 8 |
| lp-hardscape / lp-manifesto / lp-contato | Sections | 7 each | 10 / 11 / 10 |
| dashboard | Home options / options overview / inner screens / components | 5 / 1 / 2 / 9 | 5 / 1 / 2 / 10 |
| mobile-a | Screens / row of all nine | 9 / 1 | 9 / 1 |
| mobile-b | Screens / components / interaction patterns | 9 / 10 / 7 | 9 / 10 / 7 |
| feature | Working demo | 1 | 1 (4 scripted steps) |
| showcase | Hero scenes / phones in the line-up | 4 / 8 | 4 (and 1 extra) / 8 |
| campaign | Social posts / posters / stories / profile grid | 4 / 3 / present / 1 | 7 / 3 / 4 / 1 (9 tiles) |
| use-apparel | Collection scene / t-shirts front and back / hoodies / caps / print-spec sheet | 1 / 3 / 3 / 3 / 1 | 1 / 3 / 3 (see note) / 3 / 1 |
| use-accessories | Totes / mugs / bottles / sticker sheet / pin card / patches / keychain | 2 / 2 / 2 / 1 / 1 / 4 / 1 | 2 / 2 / 2 / 1 / 1 / 4 / 1 |
| use-accessories | Cup with sleeve / coasters / desk mat / mouse pad / umbrella / socks / gift card front, back and carrier | 1 each / 3 | 1 each / 3 |
| use-stationery | Letterhead / envelope / card fronts / card back / pen / notebooks / brochure / report cover / slides | 1 / 1 / 2 / 1 / 1 / 2 / 1 / 1 / 5 | 1 / 1 / 2 / 1 / 1 / 2 / 1 / 1 / 5 |
| use-packaging | Tape rolls / strips / shipping boxes / product boxes / shopping bags / tissue / seal / label | 2 / 1 / 2 / 2 / 3 / 1 / 1 / 1 | 2 / 1 / 2 / 3 / 3 / 1 / 1 / 1 |
| use-event | Lanyard with badge / staff IDs / fabric wristbands / silicone wristbands / tickets / VIP pass / booth / feather flags / banner | 1 / 2 / 4 / 3 / 3 / 1 / 1 / 3 / 1 | 1 / 2 / 4 / 3 / 3 / 1 / 1 / 3 / 1 |
| use-world | Billboard / citylight with roll-ups / reception signage with wayfinding and room plaque / vehicle wrap | 1 / 1 / 1 / 1 | 1 / 1 (2 roll-ups) / 2 / 1 |
| use-product | Product object views / kit pieces / card colourways front and back / tablet, phone and watch / app icon sizes | present / present / 3 / 3 / 5 | 3 / 4 / 3 / 3 / 5 |

Rows marked "present" or "not itemised" were confirmed to exist but their members were not counted one by one.
Hoodies: the case study shows jackets, so the three "hoodies" are the hooded windbreaker, the puffer jacket and
a pullover hoodie. Two points that follow from the case study: the landing pages
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
- **Source text left out or replaced:** the design studio's own slide furniture (its name mark, e-mail, site,
  client line and page numbers) is not reproduced; the designer is credited by name on the overview. The business
  card in the case study prints a studio's name and address as its address line: that line is a quiet placeholder
  bar on every page. Phone status bars show no clock time. The typography page calls the two fonts "Text voice"
  and "Logotype voice"; their product names appear only in this report and in the CSS font stacks.
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
   slide furniture is not reproduced, the studio address printed on the business card is a placeholder bar, font
   product names are not shown on pages, and phone status bars carry no clock time; the designer is credited by
   name on the overview.
5. Photographs and portraits in the case study are never reproduced or drawn; the frond, the gradient or the mark
   crop stands in.
6. The vertical word-mark reads top to bottom on the letter (as in the case study) and bottom to top on cards and
   jackets.
7. A reviewer's unused file `src/components/pages/lp-hardscape/Pillars.jsx` is kept: files are never deleted.
8. A builder's stray screenshot was moved out of the project.
9. The green bold "UpCanopy" on the mid-gradient of the web-system mega-menu tile is about 4:1: left as the
   designer's own poster treatment.
10. An empty stray file `ShapeCharts.jsx` in the project root (left by a reviewer and committed) is kept: files
    are never deleted. It is not imported by anything.

## Final review

An independent reviewer (Opus) who had not seen the work read both rule files and the standing orders, read the
code, looked at all 30 pages at 1440 and 390 px after a slow scroll (no sideways scroll, no console errors, no
reveals stuck hidden), exercised interactive modules on 23 pages, used the dock, its keyboard shortcuts, the
index and the 404 page, and compared lp-home, logo and seven mockups with their references.

Found and fixed before the push:
- A studio's name and address (the address line printed on the business card) appeared on eight pages: now a
  placeholder bar everywhere.
- Font product names were shown on the typography page: now "Text voice" and "Logotype voice".
- "9:41" on phone status bars: now a placeholder bar.
- Bold or underline the case study does not use on five brand lines: removed.
- An invented English status line on lp-hardscape: now "Back-office on" / "Back-office off".
- The frond covered words on the feature page's mode panel and on lp-home's manifesto card at 390 px: moved.
- Private hex values in the dashboard styles: now shared tokens.
- The index overlay's exit used a default easing: now the shared one.
- The strategy scales slide carried the studio's corner texts: now the brand's own words.
- `LAYOUTS.md` said five world scenes and a truck cab: corrected to what is built (six scenes, no cab).
- This report: corrected lines and the item counts above.

Noted and left: the flat lay is rebuilt on both the overview cover and the stationery page; the mobile-a strip of
nine phones scrolls inside its own box; agenda slots are labelled with hours and dashboard figures are counts of
its own placeholder rows, neither of which is a published statistic.

After the fixes: eslint clean, build passes, `check.mjs --strict` 30 of 30 ok, `audit.mjs` 30 of 30 clean at 1440
and 390 px, `export-svg.mjs` re-run with 0 warnings.
