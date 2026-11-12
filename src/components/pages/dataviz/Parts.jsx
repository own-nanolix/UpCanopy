// Stat cards, KPI tiles, the data table, legend, tooltip, tabs and the loading / empty / error states.
import Art from '@/components/art/Art';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import Icon from '@/components/site/Icon';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import { PALETTE, HEX, SCALES, DIRECTION } from '@/lib/brand';
import { segments } from '@/lib/charts';
import { Spark } from './ShapeCharts';
import s from './dataviz.module.css';

// Four stat cards: live counters on real counts, each with a sparkline that draws only a shape.
const STATS = [
  { n: 10, label: 'Dots on every scale' },
  { n: 6, label: 'Colours in the palette' },
  { n: 5, label: 'Attribute scales' },
  { n: 3, label: 'Brand pillars' },
];
export function StatCards() {
  return (
    <div className={s.statGrid}>
      {STATS.map((t, i) => (
        <Reveal key={t.label} delay={i * 60}>
          <div className={`card ${s.stat}`}>
            <p className="t-label">{t.label}</p>
            <CountUp as="p" value={String(t.n)} className={s.statFig} />
            <Spark n={i + 1} />
            <p className="t-small">Shape only: no published data.</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// Three KPI tiles: a real step of ten, shown as ten square segments.
const KPIS = [
  { fig: '9', label: 'NATURAL–URBANA', note: 'Highest of the five scales', n: 10, on: 9 },
  { fig: '7', label: 'CLÁSSICA–FUTURISTA, CONCEITUAL–DIRETA', note: 'Lowest of the five scales (two of them)', n: 10, on: 7 },
  { fig: '4', label: DIRECTION.label, note: 'Direction words', n: 4, on: 4 },
];
export function KpiTiles() {
  return (
    <div className={s.kpiGrid}>
      {KPIS.map((k, i) => (
        <Reveal key={k.label} delay={i * 60}>
          <div className={`card-navy ${s.kpi}`}>
            <p className="t-caps on-navy" lang="pt-BR">{k.label}</p>
            <p className={`${s.kpiFig} hl`}>{k.fig}</p>
            <Art viewBox="0 0 240 18" title={`${k.note}: ${k.on} of ${k.n}`} exportName={`dataviz-kpi-${i + 1}`}>
              {segments(k.n, 240, k.on, k.n === 10 ? 4 : 8).map((b, j) => (
                <rect key={j} x={b.x} y="0" width={b.w} height="18" fill={b.on ? (j === k.on - 1 ? HEX.green : '#FFFFFF') : '#FFFFFF'} opacity={b.on ? 1 : 0.18} className="rise" style={{ '--i': j }} />
              ))}
            </Art>
            <p className="t-small on-navy">{k.note}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// The six palette entries, exactly as printed on slide m07.
export function PaletteTable() {
  return (
    <div className={`card ${s.tableWrap}`} style={{ marginTop: 'var(--gap)' }}>
      <table className={s.table}>
        <caption className="sr-only">The six palette entries as printed</caption>
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Swatch</span></th>
            <th scope="col">Name</th>
            <th scope="col">Hex</th>
            <th scope="col">No.</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {PALETTE.map((p) => (
            <tr key={p.name}>
              <td><span className={s.sw} style={{ background: p.hex }} aria-hidden="true" /></td>
              <th scope="row" style={{ textAlign: 'left', fontWeight: 500, fontSize: 14, padding: '10px 12px', borderBottom: '1px solid var(--gray)' }}>{p.name}</th>
              <td className={s.mono}>{p.hex.slice(1).toLowerCase()}</td>
              <td className={s.mono}>{p.no}</td>
              <td className="t-caps">{p.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Legend: a square or round key and a plain label.
export function Legend({ items, label }) {
  return (
    <ul className={s.legend} aria-label={label}>
      {items.map((it) => (
        <li key={it.label}>
          <span className={`${s.key} ${it.round ? s.keyRound : ''}`} style={{ background: it.fill }} aria-hidden="true" />
          {it.label}
        </li>
      ))}
    </ul>
  );
}

const TAB_LEGENDS = [
  { id: 'scales', label: 'Scales', content: <Legend label="Scale legend" items={[{ label: 'Chosen step', fill: HEX.green, round: true }, { label: 'Other step', fill: '#22272B', round: true }, { label: 'Open step', fill: 'transparent', round: true }]} /> },
  { id: 'palette', label: 'Palette', content: <Legend label="Palette legend" items={[{ label: 'Blue Ocean', fill: HEX.navy }, { label: 'Greens', fill: HEX.green }, { label: 'Pale mint, white', fill: HEX.mint }, { label: 'Asfalt, Gray', fill: HEX.asphalt }]} /> },
  { id: 'counts', label: 'Counts', content: <Legend label="Count legend" items={[{ label: 'One counted item', fill: HEX.navy }, { label: 'Turning point', fill: HEX.green }, { label: 'Not published', fill: HEX.gray }]} /> },
];

export function Components() {
  const sample = SCALES[2];
  return (
    <div className={s.rows}>
      <div className={s.l}>
        <Card title="Chart tabs and legend" variant="slide" className={s.chart}>
          <Tabs id="dataviz-legend-tabs" label="Legend sets" tabs={TAB_LEGENDS} tone="green" />
          <p className="t-small">The legend names each mark once. Use the arrow keys to move between tabs.</p>
        </Card>
      </div>
      <div className={s.s}>
        <Card title="Tooltip" variant="slide" className={s.chart}>
          <div>
            <span className={`${s.tip} ${s.tipDemo}`} role="note" lang="pt-BR">{`${sample.left}–${sample.right}: ${sample.chosen} of 10`}</span>
          </div>
          <p className="t-small">Shown on hover and on keyboard focus of any mark; Escape hides it.</p>
        </Card>
      </div>
    </div>
  );
}

// Loading, empty and error states: quiet square tiles with an icon and a plain label.
export function States() {
  return (
    <div className={s.strip}>
      <Card title="Loading" variant="slide">
        <div className={s.state} role="status" aria-label="Loading chart">
          <div className={`skeleton ${s.sk}`} />
          <div className={`skeleton ${s.sk}`} style={{ width: '70%' }} />
          <div className="skeleton" style={{ height: 40, width: 40 }} />
          <p className="t-label">Loading chart</p>
        </div>
      </Card>
      <Card title="Empty" variant="slide">
        <div className={s.state}>
          <Icon name="folder" size={32} />
          <p className="t-label">No data to show</p>
        </div>
      </Card>
      <Card title="Error" variant="slide">
        <div className={`${s.state} ${s.stateErr}`} role="alert">
          <Icon name="alert" size={32} />
          <p className="t-label" style={{ color: 'var(--red-ink)' }}>The chart could not load</p>
        </div>
      </Card>
    </div>
  );
}
