import { pageMeta } from '@/lib/pages';
import Chart from '@/components/pages/dataviz/Chart';
import { ScaleDots, ScaleRadar, ScaleRanked, ScalePoles, ScaleMatrix, ScaleGauge, ScaleRings } from '@/components/pages/dataviz/ScaleCharts';
import { PaletteRing, PaletteStack, PaletteSwatches, PaletteRanks, PaletteFlow, DirectionWords } from '@/components/pages/dataviz/PaletteCharts';
import { CountPictogram, ManifestoStrip, ModesFlow, AreasPlace } from '@/components/pages/dataviz/CountCharts';
import { TrendShape, DistributionShape, WeekShape } from '@/components/pages/dataviz/ShapeCharts';
import { StatCards, KpiTiles, PaletteTable, Components, States } from '@/components/pages/dataviz/Parts';
import s from '@/components/pages/dataviz/dataviz.module.css';

export const metadata = pageMeta('dataviz');

const RULES = [
  ['Ten steps, one green dot', 'Every scale has ten dots. Exactly one is green: the chosen step.'],
  ['Thick lines, cut ends', 'Bands and rules are drawn thick and finish in straight cuts, never round caps.'],
  ['One green accent', 'Green marks the one thing to read first, on navy or dark. All else is navy, asphalt or grey.'],
  ['Caps, wide tracking', 'Labels are short caps with open spacing, small, and in the same place on every chart.'],
  ['Square blocks', 'Bars, cells and swatches are squares with square corners. No rounded bars.'],
  ['Never invent a number', 'Show only what the case study published. Where a series is missing, draw the shape and use quiet placeholder bars.'],
];

export default function Page() {
  return (
    <section className="page" id="p-dataviz" aria-label="Data visualisation">
      <div className="split">
        <aside className="split-rail split-rail-dark" aria-label="Chart rules">
          <div className={s.rail}>
            <div>
              <p className="t-caps" style={{ color: 'var(--green)' }}>Brand chart language</p>
              <h1 tabIndex={-1} className="t-h1" style={{ marginTop: 10, fontSize: 'clamp(26px, 2.5vw, 40px)', overflowWrap: 'anywhere' }}>Data <span className="hl">visualisation</span></h1>
            </div>
            <div>
              <h2 className="t-caps" style={{ marginBottom: 12 }}>Six chart rules</h2>
              <ol className={s.rules}>
                {RULES.map(([t, d], i) => (
                  <li key={t}>
                    <span className={s.ruleNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <p className={s.ruleTitle}>{t}</p>
                      <p className={s.ruleText}>{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </aside>

        <div className="split-main">
          <section aria-labelledby="dataviz-charts-h">
            <h2 id="dataviz-charts-h" className="t-h2" style={{ marginBottom: 'var(--gap)' }}>Charts from the <span className="hl-ink">five scales</span> and the palette</h2>
            <div className={s.rows}>
              <Chart title="Five scales" kind="Dots" size="l" caption="Slide m03 rebuilt: five rows of ten dots, one green dot each."><ScaleDots /></Chart>
              <Chart title="Radar" kind="Comparison" caption="Thick bands cut straight. The longest band is the highest step."><ScaleRadar /></Chart>

              <Chart title="Ranked" kind="Ranking" caption="The scales sorted by chosen step, in square blocks."><ScaleRanked /></Chart>
              <Chart title="Pole to pole" kind="Distribution" size="l" caption="Each track runs from the left pole to the right pole; the green block is the chosen step."><ScalePoles /></Chart>

              <Chart title="Swatches" kind="Share" size="l" caption="Slide m07 rebuilt: name top left, number top right, hex and role as printed."><PaletteSwatches /></Chart>
              <Chart title="Palette ring" kind="Share" note="est" caption="Proportions read from the images, shown as thick bands."><PaletteRing /></Chart>

              <Chart title="Dot matrix" kind="Matrix" caption="Five scales by ten steps, in the order of the scales above."><ScaleMatrix /></Chart>
              <Chart title="Proportion bar" kind="Share" size="l" note="est" caption="The same proportions as one stacked bar."><PaletteStack /></Chart>

              <Chart title="Manifesto" kind="Sequence" size="l" caption={<>The ten paragraphs in order; paragraph 4 is the turning point, <span lang="pt-BR">&ldquo;chega.&rdquo;</span></>}><ManifestoStrip /></Chart>
              <Chart title="Counts" kind="Pictogram" caption="Everything the text names, counted in square blocks."><CountPictogram /></Chart>

              <Chart title="Two modes" kind="Flow" caption="From the survival mode to the expansion mode, as two bands of one arch."><ModesFlow /></Chart>
              <Chart title="Three areas" kind="Place" size="l" caption="CRM, Agenda and Financeiro placed under the arch of the mark."><AreasPlace /></Chart>

              <Chart title="Week" kind="Time" size="l" note="shape" caption="A calendar week grid. Cells and fills are a shape, not a schedule."><WeekShape /></Chart>
              <Chart title="Ranks" kind="Comparison" caption="Two primary colours against four secondary."><PaletteRanks /></Chart>

              <Chart title="Trend" kind="Trend" note="shape" caption="A stepped rising line with placeholder bars for labels."><TrendShape /></Chart>
              <Chart title="Histogram" kind="Distribution" size="l" note="shape" caption="Square blocks stacked into columns, with placeholder bars for labels."><DistributionShape /></Chart>

              <Chart title="Rank flow" kind="Flow" size="l" caption="The six colours as printed, flowing into their two ranks."><PaletteFlow /></Chart>
              <Chart title="Gauge" kind="Gauge" caption="Ten bands for one scale: nine are filled, the ninth is green."><ScaleGauge /></Chart>

              <Chart title="Rings" kind="Radial" caption="One dashed ring per scale; each sweeps ten steps of 27 degrees."><ScaleRings /></Chart>
              <Chart title="Direction" kind="Words" size="l" caption="The four direction words, one block each."><DirectionWords /></Chart>
            </div>
          </section>

          <section className={s.sec} aria-labelledby="dataviz-numbers-h">
            <h2 id="dataviz-numbers-h" className="t-h2">Counters, tiles and <span className="hl-ink">table</span></h2>
            <p className="t-small" style={{ margin: '8px 0 var(--gap)' }}>Counts are taken from the case study text (project year 2026). Sparklines draw a shape only.</p>
            <StatCards />
            <KpiTiles />
            <PaletteTable />
          </section>

          <section className={s.sec} aria-labelledby="dataviz-states-h" style={{ paddingBottom: 'var(--band)' }}>
            <h2 id="dataviz-states-h" className="t-h2" style={{ marginBottom: 'var(--gap)' }}>Components and <span className="hl-ink">states</span></h2>
            <Components />
            <div style={{ height: 'var(--gap)' }} />
            <States />
          </section>
        </div>
      </div>
    </section>
  );
}
