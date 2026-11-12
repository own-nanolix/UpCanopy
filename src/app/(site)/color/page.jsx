import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import ColorRail from '@/components/pages/color/ColorRail';
import PaletteSlide from '@/components/pages/color/PaletteSlide';
import { ScaleStrip, SpecTable } from '@/components/pages/color/Scales';
import Proportion from '@/components/pages/color/Proportion';
import { PairingsArt, PairingsTable } from '@/components/pages/color/Pairings';
import { TokensArt, TokenColumns } from '@/components/pages/color/Tokens';
import { GREEN_SCALE, BLUE_SCALE, NEUTRALS } from '@/components/pages/color/color-data';
import s from '@/components/pages/color/color.module.css';

export const metadata = pageMeta('color');

function Head({ n, title, children }) {
  return (
    <div className={s.secHead}>
      <h2 className="t-h2">{title}</h2>
      <span className="t-caps muted">{n}{children ? ` · ${children}` : ''}</span>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-color" aria-label="Colour">
      <div className="split">
        <ColorRail />
        <div className="split-main">
          <section className={s.head}>
            <div className={s.kicker}>
              <Chip tone="navy">Colour</Chip>
              <Chip>Click any value to copy it</Chip>
            </div>
            <h1 className="t-display" tabIndex={-1}>Six colours, <span className="hl-ink">two primaries</span></h1>
            <p className={`t-lead muted ${s.note}`} style={{ marginTop: 18 }}>
              The palette as printed on the designer&apos;s slide, and what we built from it: scales, tables, pairings and tokens.
              The rail on the left is the palette itself.
            </p>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="01" title="Palette slide" /></Reveal>
            <Reveal><div className={s.slideWrap}><PaletteSlide /></div></Reveal>
            <p className={`t-small ${s.note}`}>Names and spellings exactly as printed: Green Ligth and Asfalt are kept.</p>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="02" title="Primary colour scales" /></Reveal>
            <p className={`t-small ${s.note}`}>Nine steps around each primary. The 500 step is the printed colour; the others are mixed in code (tints with white, shades with black).</p>
            <Reveal><div className={s.plate}><ScaleStrip exportName="color-scale-green" title="Green Park scale, nine steps" rows={GREEN_SCALE} /></div></Reveal>
            <SpecTable caption="Green Park scale" rows={GREEN_SCALE} />
            <Reveal><div className={s.plate}><ScaleStrip exportName="color-scale-blue" title="Blue Ocean scale, nine steps" rows={BLUE_SCALE} /></div></Reveal>
            <SpecTable caption="Blue Ocean scale" rows={BLUE_SCALE} />
          </section>

          <section className={s.sec}>
            <Reveal><Head n="03" title="Neutral scale" /></Reveal>
            <Reveal><div className={s.plate}><ScaleStrip exportName="color-scale-neutral" title="Neutral scale, seven steps" rows={NEUTRALS} /></div></Reveal>
            <SpecTable caption="Neutral scale" rows={NEUTRALS} />
          </section>

          <section className={s.sec}>
            <Reveal><Head n="04" title="Proportion">estimated</Head></Reveal>
            <p className={`t-small ${s.note}`}>Estimated by eye from the case study images; the designer does not publish proportions.</p>
            <Reveal><div className={s.plate}><Proportion /></div></Reveal>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="05" title="Accessible pairings" /></Reveal>
            <div className={s.pairGrid}>
              <Reveal><div className={s.plate}><PairingsArt /></div></Reveal>
              <PairingsTable />
            </div>
          </section>

          <section className={s.sec}>
            <Reveal><Head n="06" title="Semantic tokens" /></Reveal>
            <Reveal><div className={s.plate}><TokensArt /></div></Reveal>
            <TokenColumns />
          </section>
        </div>
      </div>
    </section>
  );
}
