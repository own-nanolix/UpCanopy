# BRIEF: how to build a page of the UpCanopy brand site

You are building pages of a 30-page brand site for **UpCanopy**, a remote back-office for landscape and
hardscape companies led by Brazilian immigrants in the United States, from a Behance case study by **Jonas
Nicacio**. The designer is the audience: they must recognise their own work on every page and see what a partner
adds. **Reproduce what they made; do not redesign it. Then extend it generously, in their language.**

Read first, in this order: this file, `SOURCE.md` (all copy, palette, shapes, the page's full text), your lines
in `LAYOUTS.md`, then `src/app/globals.css`, `src/lib/*.js` and the files in `src/components/site`,
`src/components/ui`, `src/components/art`. Do not read `out/`, `.next/` or `node_modules/`.

The project is Next.js 16 (App Router), React 19, **JavaScript only** (`.jsx`, no TypeScript), Tailwind v4 plus
plain CSS and CSS Modules, framer-motion 14. The app lives in `src/`. Import alias: `@/` = `src/`.

## Language

The case study is in Brazilian Portuguese. **The site's own words (headings that name deliverables, labels,
captions, controls) are English. Brand copy stays exactly as the designer wrote it, in Portuguese**, with its
accents, quotes and spellings. Never translate a brand line, and never write new Portuguese copy.

## The brand in one paragraph

UpCanopy is the roof over a working business: a disciplined structure, drawn in thick lines and exact arcs, that
shelters people who work with their hands and lifts them into running a company. It speaks warmly in the
client's own language and looks as solid as a large American firm: navy for trust, green for growth. Every
extension must be explainable from this.

Look and feel: bold and quiet at once. Big flat fields of navy (`#162557`), Green Park (`#26CF7B`), dark green
and pale mint; the navy-to-green gradient rising from lower left to upper right, with fine print grain; a small
mark in one corner, a brand line in light type with its last word bold in the opposite corner, contacts small at
bottom right; the word-mark often huge, set vertically or cropped by an edge. Corners are square; lines are
thick; ends are cut straight. The secondary graphic is **the frond**: a sweep of long pointed leaflets fanned
along an arc, entering from an edge. Slides are light grey with tiny bold caps in the corners, rows of ten dots
with one green dot, and big squares. Motion is steady and upward: things rise into place and lock.

## Rules that cannot be broken

1. **Do not redesign.** Where the case study shows something, reproduce it exactly: copy verbatim, colours,
   layout, proportions and shapes. Measure from the reference images.
2. **Extend generously, only in the designer's language.** Same palette, type voices, square corners, thick
   strokes, cut ends, gradients, the frond. Mark nothing as "new" in the interface.
3. **Invent no facts.** The case study contains **no prices, statistics, testimonials, product screens, client
   lists, dates or figures** other than what `SOURCE.md` and `src/lib/brand.js` hold. Never invent any. Where a
   deliverable needs such facts, use the brand's own words (CRM, Agenda, Financeiro, Landscape, Hardscape,
   Organização, Disciplina, Confiança, the brand lines, the five attribute scales, the palette) or a **quiet
   placeholder** (`<Placeholder />`, class `ph`, or a pale bar in SVG). Product UI is therefore mostly structure:
   labelled areas, placeholder rows, and controls that work. Plain English labels that only name a deliverable
   or a control are allowed ("Clear space", "Front", "Back", "Search", "Sort"). Report every word or value that
   is your own.
4. **The deliverable list is a checklist, not a design.** How things look and are named comes from this brand's
   case study only. Do not borrow concepts, compositions, headings or copy from other brand systems.
5. **All assets are code.** Inline SVG (JSX) and CSS only. No `<img>`, no `next/image`, no raster files, no
   base64, no external URLs, no icon or chart libraries, no new packages. The case study's photographs
   (portraits of workers, hands, plants, buildings, rooms) are **never reproduced and never replaced by drawn
   people**: use a brand gradient, the frond, the mark crop or a plain field instead. People appear only as
   initials on a navy tile (`Who`).
6. **One site, 30 routes.** Your page is `/<id>/`. Links to other pages are `<Link href="/<id>/">` from
   `next/link` (always with the trailing slash). Never use plain `#anchor` links; scroll with JS instead. No
   server features.
7. **One system.** Use the shared tokens, classes and components listed below. Never redefine or edit them.
   Anything missing is built inside your own folder and reported.
8. **Motion is a headline feature.** framer-motion and CSS with the shared tokens from `@/lib/motion` (JS) or
   `--ease-*` / `--dur-*` (CSS). Never default easings. Every page has a designed entrance, scroll reveals (the
   shared `Reveal`: opacity and transform only) and at least one signature animated moment (the frond fanning
   out, the arch lowering onto the bar, scale dots locking in, a gradient rising). Every interactive element has
   hover, focus-visible and active states. Animate `transform` and `opacity` where possible. Animations always
   land on their final value, also when interrupted or when the page is left and re-entered.
   `prefers-reduced-motion` is honoured (the shared CSS shortens CSS animations; in JS use `still()`).
9. **Minor accessibility fixes only.** Small text (under 24 px) must reach 4.5:1. The brand's own pairs already
   pass: navy on green, green on navy, white on navy, mint on dark green, navy on mint. Never put small Green
   Park text on mint, white or grey: use `var(--green-ink)` there; small secondary text is `var(--muted)` on
   light surfaces and `var(--navy-muted)` on navy. Real `<button>` and `<a>`; keyboard support for every
   interactive module (use the shared `Tabs`, `Toggle`, `Segmented`); meaningful SVG gets `role="img"` and
   `aria-label`, decorative SVG gets `aria-hidden="true"` (the `Art` wrapper does this); screen-reader labels
   use real names. Portuguese brand lines inside English pages get `lang="pt-BR"` on their element. No
   horizontal page scroll from 1920 px down to 390 px: grid columns are `minmax(0, 1fr)`, wide SVGs scale with
   `width: 100%`, wide tables sit in an `overflow-x: auto` wrapper.
10. **Everything graphic exports as SVG.** Every logo variant, swatch sheet, gradient, texture, icon,
    illustration, chart, social post, poster, device frame, product and mockup is its own inline `<svg>`:
    - Use `<Art viewBox title exportName>`: it adds `viewBox`, `<title>` first, the role and `data-export`.
      `exportName` is `<page id>-<name>`: lower-case letters, digits and hyphens, unique across the site.
    - Geometry lives in attributes (`d`, `x`, `width`, `transform`, ...), never in CSS. An SVG `transform`
      attribute and a CSS transform animation must not sit on the same element (the animation would replace the
      attribute): put the animated class on an inner `<g>`. Paint may come from CSS classes and tokens. In JSX
      use camelCase SVG attributes (`strokeWidth`, `stopColor`) and `href`.
    - The markup is the finished artwork. Inside an exportable SVG animate with **CSS keyframes only**, playing
      *from* a start state *towards* the base style (`animation-fill-mode: both`), so that with animation off the
      SVG is complete. The shared classes `draw`, `rise`, `grow-x`, `lock`, `fan`, `fade-in`, `slide-up`,
      `roof-arch`, `roof-bar`, `mock-step`, `mock-lit` are built this way. framer-motion may move a wrapper
      *around* an SVG, never the artwork inside it.
    - No `<foreignObject>`, no HTML inside the SVG, no CSS `background` or pseudo-element standing in for
      artwork. Gradients, clips, masks, filters and textures are SVG `<defs>`.
    - Text inside artwork is SVG `<text>`. It inherits the text voice; for the wide logotype voice add
      `className="wide"` and `style={{ fontFamily: 'var(--font-wide)' }}`.
    - A mockup is one SVG: sweep, shadows, object, materials, shading and the brand artwork, in one `viewBox`.
    - Interactive UI (dashboards, mobile screens, landing pages) is built as React components. Inside it every
      icon, chart, illustration and device frame still follows this rule, and each full screen has a fixed-size
      artboard root marked `data-screen="<name>"`.
    - An exportable SVG must not be nested inside another SVG, and must not be inside a `<button>` or `<a>`.
11. **English only** in every file, except brand copy, which stays in Portuguese exactly as written (including
    the spellings "Green Ligth", "Asfalt", "Jhon Due").

## Page format

You own `src/app/(site)/<id>/` and `src/components/pages/<id>/` for your page ids, and nothing else.

```jsx
// src/app/(site)/<id>/page.jsx  (server component: no 'use client' here, so it can export metadata)
import { pageMeta } from '@/lib/pages';
import Demo from '@/components/pages/<id>/Demo'; // interactive parts are client components
import s from '@/components/pages/<id>/<id>.module.css';

export const metadata = pageMeta('<id>');

export default function Page() {
  return (
    <section className="page" id="p-<id>" aria-label="<Page title>">
      <h1 tabIndex={-1}>…</h1>
      …
    </section>
  );
}
```

- The page root is that `<section>`. **Remove `data-stub`.** Keep `id="p-<id>"` and the `aria-label`.
- Page-only styles live in `src/components/pages/<id>/<id>.module.css` (CSS Modules work normally: `import s
  from './<id>.module.css'`, then `s.name`; keyframes named `<id>-xxx`) or in Tailwind classes that use the
  shared tokens (`bg-navy`, `text-green`, `bg-mint`, `text-muted`, ...). No global CSS from pages. In CSS
  Modules never write a bare element or `:root` selector; start from a class.
- **Every id**, including SVG gradient, filter, clip-path, mask and pattern ids, starts with `<id>-` and is
  unique within the page. Shared art that takes `idp` gets a different `idp` each time, starting with `<id>-`.
  The shared `Tabs`, `Field` and `Segmented` take an `id` prop: it must start with `<id>-` too.
- Exactly one `<h1>` per page, then ordered `h2` / `h3`.
- Repetitive SVG (dots, rows, leaflets, grids, colourways, repeated objects) is generated with `.map()` and
  small functions, never hand-typed.
- Server and browser must render the same markup: no `Math.random()` or `Date.now()` in render. Use
  `seeded(n)` from `@/lib/charts` for scatter. Round computed coordinates (`r2()`).
- 600 to 1,600 lines per page in total across its files. Split big pages into several component files.
- Create files with the Write tool, not shell heredocs (they break on apostrophes on this machine).
- Do not edit anything outside your folders. Never run `npm run build` / `next build`. Never start a server.
- Check with `npx eslint "src/app/(site)/<id>" "src/components/pages/<id>"` and fix every error. The lint rules
  are strict (React Compiler): do not call `setState` synchronously inside `useEffect` (set it in an event
  handler, a timer, an observer callback or `requestAnimationFrame`); do not read or write `ref.current` during
  render; do not wrap callbacks in `useCallback` / `useMemo` by hand; write `{'//'}` for a literal `//` in JSX
  text and `&apos;` or `{"…"}` for apostrophes and quotes in JSX text.
- Look at your page on the shared dev server (address in `STATE.md`): run
  `node tools/audit.mjs --base=<address> <id>` (fix overflow at 390 px, low contrast, unnamed controls, SVGs
  without role, duplicate ids, console errors) and `node tools/export-svg.mjs --dry --base=<address> <id>` (zero
  warnings wanted). Take a screenshot and look at it: wait about 1.5 s after the page loads before scrolling
  (so scroll reveals are ready), then scroll slowly to the bottom before a full-page capture.

## Tokens (CSS variables in `globals.css`; the same names work as Tailwind colours: `bg-navy`, `text-green`)

| Token | Value | Use |
|---|---|---|
| `--green` | `#26CF7B` | Green Park: the mark, the bold closing word on dark grounds, primary button, fields |
| `--navy` | `#162557` | Blue Ocean: fields, text on light grounds, word-mark |
| `--green-dark` | `#052E25` | Green Dark: posters and folders |
| `--asphalt` | `#1D1D1B` | Asfalt: dots, dark objects |
| `--mint` | `#F2FFE4` | Green Ligth: the page background and the studio sweep |
| `--gray` | `#DADADA` | Gray: construction slide, neutral surfaces |
| `--navy-deep` `--slide` `--mint-paper` `--frond` | `#0C1445` `#F0F0F0` `#DFF7E6` `#8FC9B5` | Sampled: deep mockup ground, slide grey, paper, frond tint |
| `--green-ink` `--muted` `--navy-muted` `--red-ink` | `#086338` `#4A5568` `#A9B1D1` `#B3261E` | Small-text inks (rule 9); red for errors only |
| `--r-0` `--r-1` `--stroke` | 0, 3 px, 2 px | Square corners, small card radius, thick lines |
| `--ease-out` `--ease-in-out` `--ease-draw` `--ease-lock` | see `globals.css` | Rising into place; moves; arcs and the frond; locking in |
| `--dur-1` … `--dur-5` | 120, 240, 480, 800, 1400 ms | Hover; toggles; cards and reveals; charts; drawing |

Hex values for use inside SVG attributes are in `HEX` and `PALETTE` from `@/lib/brand`.

## Classes (`globals.css`)

- Text voice (light, with a bold close): `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-line` (a brand line), `t-lead`,
  `t-body`, `t-small`, `strong` (bold), `hl` (bold Green Park, for dark grounds and large type), `hl-ink` (bold
  deep green, for light grounds), `muted`, `on-navy`, `on-green`, `t-center`, `t-right`, `t-balance`.
- Logotype voice (wide): `t-wide`, `t-wide-xl` (the giant word-mark), `t-caps`, `t-caps-lg`, `t-label`,
  `t-figure`, `t-figure-xl`.
- Layout: `page`, `wrap`, `wrap-narrow`, `band`, `stack`, `stack-lg`, `row`, `grid` with `cols-2|3|4|6|12`,
  `rule` (thick), `hair` (thin), `corners` (slide furniture row), `sr-only`.
- Split screen (the direction for brand pages): `split` (rail left) or `split split-right` (rail right),
  `split-rail` (navy, sticky, full height) with `split-rail-green|dark|light`, `split-main` (scrolling side;
  its direct `section` children are spaced apart). On phones the rail becomes a block above the content.
- Surfaces: `card` (white), `card-slide` (grey, square), `card-navy`, `card-green`, `card-line` (outline),
  `card-head`, `field-navy`, `field-deep`, `field-green`, `field-dark`, `field-asphalt`, `field-paper`,
  `field-rise` (the brand gradient), `field-rise-soft`.
- Chips and dots: `chip`, `chip-sm`, `chip-green|navy|mint|ink`, `dot`, `dot-on`; placeholder: `ph`.
- Buttons: `btn` (green), `btn-navy`, `btn-mint`, `btn-dark`, `btn-white`, `btn-ghost`, `btn-block`, `btn-sm`,
  `btn-icon`; links: `link`, `link-arrow`.
- Controls: `tabs` / `tab` / `tabpanel` (`tabs-green`), `toggle`, `fieldset`, `input`.
- People: `who`, `who-face`, `who-name`, `who-role`.
- Devices (HTML): `device device-phone|tablet|laptop|monitor|watch`, `device-screen`, `screen-fit`.
- Landing: `lp-nav`, `lp-brand`, `lp-links`, `lp-actions`, `lp-footer`.
- Mockups: `mock` (the tinted plate), `mock-cap`, `mock-step` (one step of the cascade), `mock-lit` (slow turn
  to the light), `mock-sheen`.
- Motion: `draw` (set `--len`, `--i`), `rise`, `grow-x`, `lock` (a dot or block locking in), `fan` (a leaflet
  fanning out), `fade-in`, `slide-up`, `roof-arch` / `roof-bar` (the mark assembling), `tick-cursor`,
  `skeleton`. Set order with `style={{ '--i': n }}`.

## Components

`@/components/site`
- `Icon` : `<Icon name="calendar" size={24} />`; add `label="..."` when it carries meaning. `IconUse` (named
  export) places an icon inside a larger SVG: `<IconUse name="pin" x={10} y={10} size={24} color="#162557" />`.
- `icons.js` : `CORE` (the 32 icons: layers, link, headset, gear, folder, logout, briefcase, bell, share,
  arrow-right, arrow-up-right, arrow-up, chevron-down, more, pin, crane, hardhat, ruler, cube, truck, user,
  users, note, chart, calendar, clock, search, filter, check, plus, close, home), `UTIL` (chevron-left,
  chevron-right, arrow-left, arrow-down, menu, copy, play, pause, grid, download, alert, sort, x, linkedin,
  youtube), `ICONS`, `CORE_NAMES`. One path string each on a 24 px grid; drawn with a 2 px stroke, butt caps and
  mitre joins (thick lines, defined angles).
- `Reveal` : `<Reveal delay={120} from="left">…</Reveal>` (`from`: `left` | `right` | `scale`; `as` for the tag).
- `CountUp`, `Typewriter`, `CopyValue` (`<CopyValue value="#26CF7B" label="Green Park hex" />`), and
  `toast('…')` from `@/components/site/Toast` (client only).

`@/components/ui`
- `Button` : `<Button variant="navy" href="/lp-contato/" icon="calendar" iconRight="arrow-right" size="sm" block>`.
  Variants: green (default), navy, mint, dark, white, ghost. Icon-only buttons need `label`.
- `Chip` : `<Chip>REMOTE BACK–OFFICE</Chip>`, `<Chip tone="green" size="sm">`, `<Chip pressed={on} onClick={fn}>`.
- `Card` (default), `Who`, `Line`, `Placeholder` : `<Card title="Naming" arrow variant="white|slide|navy|green|line">`;
  `<Who name="EDERSON DEVENS" role="CEO • FOUNDER" initials="ED" />`;
  `<Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" />` renders a brand line with its
  bold part; `<Placeholder width={8} />` is the quiet bar for unpublished facts.
- `Tabs` : `<Tabs id="<id>-x" label="…" tabs={[{ id, label, content }]} tone="green" />` (client component).
- `Toggle` (default) and `Segmented` : `<Toggle label="Agenda" checked={v} onChange={setV} />`;
  `<Segmented id="<id>-area" label="Area" options={['CRM', 'Agenda', 'Financeiro']} />`.
- `Field` : `<Field id="<id>-email" label="Email" type="email" />`.
- `LandingNav` : `<LandingNav current="lp-crm" tone="navy|light" />`. `LandingFooter` : `<LandingFooter />`.
- `Devices` (named exports `Phone`, `Tablet`, `Laptop`, `Monitor`, `Watch`): live HTML screens in SVG-drawn
  frames. `<Phone screen="<id>-home" exportName="<id>-phone-frame">…</Phone>`. Screen sizes to design for:
  phone 390 x 844, monitor 1600 x 1000, laptop 1440 x 900, tablet 1180 x 820, watch 184 x 224 (scale a
  fixed artboard with CSS `transform`).

`@/components/art` (all return SVG groups; wrap in `Art`)
- `Art` : `<Art viewBox="0 0 800 600" title="Stacked lockup" exportName="<id>-stacked">…</Art>`; `decorative`
  hides it from screen readers.
- `Mark.jsx` : `MarkG` (`x y size fill archClass barClass`), `WordmarkG` (`x y size fill anchor weight`),
  `DescriptorG` ("REMOTE BACK–OFFICE"), `LockupG` (horizontal; box 400 x 60 at scale 1; `scale fill markFill`),
  `LockupStackG` (box 480 x 240; `descriptor`), `WordmarkVerticalG` (the word reading bottom to top),
  `AppIconG` (`size radius tile fill`), `MarkCropG` (`idp x y w h zoom dx dy fill`; the enlarged mark as a
  cover graphic), constants `MARK` (the three circle centres, the ring unit and the radii), `MARK_ARCH`,
  `MARK_BAR`, `LOCKUP_H`, `LOCKUP_V`.
- `KeyArt.jsx` : `FrondG` (`cx cy r a0 a1 count len width lean tone opacity fan`; tone `onDark` | `onNavy` |
  `onGreen` | `onMint`), `BrandDefs` (`idp`; then `url(#<idp>-rise|-rise-dark|-paper|-green|-dots)` as fills and
  `url(#<idp>-grain)` as a filter), `ConstructionG` (`x y size rings`; the dashed construction circles),
  `ScaleDotsG` (`x y w r chosen count lock`; one row of the ten-dot scale), `ArrowG`, `FROND_TONES`.
- `Mockup.jsx` : `SweepG` (`idp w h horizon`; the tinted studio sweep, put it first), `CastG` (`d depth`; the
  hard shadow of a flat object, lower right), `ShadowG` (`idp cx cy rx`; soft contact shadow), `MaterialDefs`
  (`idp`; then `url(#<idp>-metal|-metal-dark|-plastic|-glass|-rubber|-card|-shade|-shade-v)` as fills and
  `url(#<idp>-fabric|-paper|-soft)` as filters), `StepG` (`i x y rotate`; one step of the cascade, slides in on
  load), `cascade(n, x0, y0, x1, y1)` (positions along a diagonal), `SheenG`, `LIGHT`, `SHADOW_DIR`.
- `Devices.jsx` : SVG frames `PhoneG`, `MonitorG`, `LaptopG`, `TabletG` (`rugged`), `WatchG` (`band`), each
  `idp x y w` with children drawn in the screen's own space (see `SCREEN`); screens `ScreenHomeG` (`idp`; phone
  home, 390 x 844), `ScreenAppG` (`idp`; desktop back-office, 1600 x 1000), `ScreenWatchG` (184 x 224).

`@/lib`
- `pages.js` : `pageMeta(id)`, `pages`, `groups`, `pageById`, `previous`, `next`, `href(id)`.
- `motion.js` : `ease` (`out`, `inOut`, `draw`, `lock`), `dur` (`d1`…`d5`, seconds), `stagger`, transitions
  `tEnter`, `tMove`, `tChart`, `tDraw`, `tLock`, variants `listV`, `itemV`, `fadeV`.
- `charts.js` : `scale`, `r2`, `linePath`, `stepPath`, `areaPath`, `polar`, `arcPath`, `bandPath` (a thick band
  with cut ends, the mark's own shape), `arcLength`, `dotScale`, `ticks`, `shares`, `segments`, `seeded`.
- `site.js` : `copy()`, `fmt()`, `uid()`, `clamp`, `lerp`, `range`, `hexToRgb`, `contrast`, `still()`.
- `brand.js` : everything the case study prints, as constants: `BRAND`, `DESCRIPTOR`, `TAGLINE`, `DESIGNER`,
  `PALETTE`, `HEX`, `LINES` (bridge, ceo, credibility, control, level, close, enough; with `strong` parts and
  line breaks as printed), `CONTACT`, `PEOPLE`, `DOCUMENT`, `SIGN`, `SHEET`, `SCALES`, `DIRECTION`, `AREAS`,
  `SECTORS`, `PILLARS`, `PERSONALITY`, `MODES`, `NAV_LINKS`, and the page's texts verbatim: `MANIFESTO` (10
  paragraphs), `INTRO`, `CHALLENGE`, `STRATEGY`, `NAMING`, `VISUAL_IDENTITY`, `TONE`, `VALUES`. Import from
  here instead of retyping text.

## Mockups: this project's direction

- **Staging: diagonal cascade.** Objects step across the frame along one diagonal (`cascade()` + `StepG`) and
  crop off its edges, as in the designer's own flat lay (reference m01, m31). The diagonal, step and crop for
  each mockup are given in `LAYOUTS.md` and differ every time.
- **Backdrop: a seamless studio sweep tinted with Green Ligth** (`SweepG`, inside a `mock` plate).
- **One light, from the upper left.** Flat objects throw a hard, short shadow to the lower right (`CastG`);
  standing and round objects also sit on a soft contact shadow (`ShadowG`). Highlights upper-left, shade
  lower-right, on every object. Use `MaterialDefs`; add your own shading shapes on top.
- Believable proportions and materials (paper with thickness and painted edges, fabric with seams, metal,
  glossy plastic); artwork follows the surface (clip it to the object, skew or rotate it with the face it sits
  on); nothing may look like a flat sticker on a flat shape.
- Text on mockups is only the logo, "UpCanopy", "REMOTE BACK–OFFICE", or lines and details that appear in the
  case study (`LINES`, `CONTACT`, `PEOPLE`, `DOCUMENT`, `SIGN`).
- Signature motion: the steps slide in along the diagonal one after another (`mock-step` via `StepG`); the hero
  object turns slowly to the light (`mock-lit`, `SheenG`).

## Reference images

`reference/mNN_1.png` are readable copies of the 32 case-study images (index in `SOURCE.md`); `logo_zoom.png`
is the construction drawing. Open **only** the ones listed in your task. They are for reading and measuring;
they are never used in the site.

## Page ids

overview, logo, color, gradients, typography, icons, dataviz, motion, strategy, web-system, lp-home, lp-crm,
lp-agenda, lp-financeiro, lp-hardscape, lp-manifesto, lp-contato, dashboard, mobile-a, mobile-b, feature,
showcase, campaign, use-apparel, use-accessories, use-stationery, use-packaging, use-event, use-world,
use-product.

## Hand-back (under 150 words)

Files written; a count of each deliverable against its minimum and the number of `data-export` SVGs against
`minExports`; which parts are faithful rebuilds; which are extensions; every word or value that is your own;
what you looked at on screen and what you did not check.
