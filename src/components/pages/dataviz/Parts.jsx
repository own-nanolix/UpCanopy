// Stat cards, KPI tiles, the data table, legend, tooltip, tabs and the loading / empty / error states.
import Art from '@/components/art/Art';
import Card from '@/components/ui/Card';
import Tabs from '@/components/ui/Tabs';
import Icon from '@/components/site/Icon';
import CountUp from '@/components/site/CountUp';
import Reveal from '@/components/site/Reveal';
import { PALETTE, HEX, SCALES, DIRECTION, MANIFESTO, PILLARS } from '@/lib/brand';
import { segments, linePath, r2 } from '@/lib/charts';
import ChartFrame from './ChartFrame';
import { tip } from './kit';
import s from './dataviz.module.css';

const scaleName = (sc) => `${sc.left}–${sc.right}`;
// Words per manifesto paragraph, counted from the text itself.
const WORDS = MANIFESTO.map((p) => p.split(/\s+/).filter(Boolean).length);

// Sparkline 1: the chosen step of each scale, in slide order (8, 7, 9, 8, 7).
function SparkScales() {
  const pts = SCALES.map((sc, i) => [r2(10 + i * 35), r2(46 - sc.chosen * 4)]);
  return (
    <Art viewBox="0 0 160 52" title="Sparkline: chosen step of each of the five scales, in slide order" exportName="dataviz-spark-scales">
      <rect x="0" y="48" width="160" height="2" fill={HEX.asphalt} opacity="0.5" />
      <path d={linePath(pts)} fill="none" stroke={HEX.navy} strokeWidth="3" strokeLinejoin="miter" className="draw" style={{ '--len': 220 }} />
      {pts.map(([x, y], i) => (
        <rect key={SCALES[i].left} x={x - 5} y={y - 5} width="10" height="10" fill={SCALES[i].chosen === 9 ? HEX.green : HEX.navy} className="lock" style={{ '--i': i + 4 }} {...tip(`${scaleName(SCALES[i])}: ${SCALES[i].chosen} of 10`)} />
      ))}
    </Art>
  );
}

// Sparkline 2: words per manifesto paragraph; paragraph 4, the turning point, is green.
function SparkWords() {
  const max = Math.max(...WORDS);
  return (
    <Art viewBox="0 0 160 52" title="Sparkline: words in each of the ten manifesto paragraphs, counted" exportName="dataviz-spark-words">
      {WORDS.map((n, i) => {
        const h = r2((n / max) * 44);
        return <rect key={i} x={r2(i * 16.2)} y={r2(48 - h)} width="12" height={h} fill={i === 3 ? HEX.green : HEX.navy} className="rise" style={{ '--i': i }} {...tip(`Paragraph ${i + 1}: ${n} words`)} />;
      })}
      <rect x="0" y="48" width="160" height="2" fill={HEX.asphalt} opacity="0.5" />
    </Art>
  );
}

// Four stat cards with live counters on real counts. Each card is built differently.
export function StatCards() {
  return (
    <div className={s.statGrid}>
      <Reveal>
        <div className={`card ${s.stat}`}>
          <p className="t-label">Attribute scales</p>
          <div className={s.statRow}>
            <CountUp as="p" value={String(SCALES.length)} className={s.statFig} />
            <ChartFrame className={s.sparkBox}><SparkScales /></ChartFrame>
          </div>
          <p className="t-small">Chosen step per scale: 8, 7, 9, 8, 7.</p>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className={`card ${s.stat}`}>
          <ChartFrame><SparkWords /></ChartFrame>
          <div className={s.statFoot}>
            <p className="t-label">Manifesto paragraphs</p>
            <CountUp as="p" value={String(MANIFESTO.length)} className={s.statFig} />
          </div>
          <p className="t-small">{`${WORDS.reduce((a, b) => a + b, 0)} words in all, counted per paragraph.`}</p>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className={`card ${s.stat}`}>
          <div className={s.statSide}>
            <CountUp as="p" value={String(PALETTE.length)} className={`${s.statFig} ${s.statBox}`} />
            <p className="t-label">Colours in the palette</p>
          </div>
          <div className={s.swRow} role="img" aria-label={`The six colours: ${PALETTE.map((p) => p.name).join(', ')}`}>
            {PALETTE.map((p) => <span key={p.name} style={{ background: p.hex }} title={p.name} />)}
          </div>
          <p className="t-small">Two primary, four secondary.</p>
        </div>
      </Reveal>
      <Reveal delay={180}>
        <div className={`card-navy ${s.stat}`}>
          <div className={s.statTop}>
            <p className="t-label on-navy">Brand pillars</p>
            <CountUp as="p" value={String(PILLARS.length)} className={`${s.statFig} hl`} />
          </div>
          <ol className={s.pillars} lang="pt-BR">
            {PILLARS.map((p) => <li key={p}>{p}</li>)}
          </ol>
        </div>
      </Reveal>
    </div>
  );
}

// Three KPI tiles on the five scales and the direction line, each with its own structure.
const HIGH = SCALES[2];
const LOW = SCALES.filter((sc) => sc.chosen === Math.min(...SCALES.map((x) => x.chosen)));
export function KpiTiles() {
  return (
    <div className={s.kpiGrid}>
      <Reveal>
        <div className={`card-navy ${s.kpi}`}>
          <p className="t-caps on-navy" lang="pt-BR">{scaleName(HIGH)}</p>
          <p className={`${s.kpiFig} hl`}>{HIGH.chosen}</p>
          <Art viewBox="0 0 240 18" title={`Highest of the five scales: ${scaleName(HIGH)}, ${HIGH.chosen} of 10`} exportName="dataviz-kpi-high">
            {segments(10, 240, HIGH.chosen, 4).map((b, j) => (
              <rect key={j} x={b.x} y="0" width={b.w} height="18" fill={b.on && j === HIGH.chosen - 1 ? HEX.green : '#FFFFFF'} opacity={b.on ? 1 : 0.18} className="rise" style={{ '--i': j }} />
            ))}
          </Art>
          <p className="t-small on-navy">Highest of the five scales</p>
        </div>
      </Reveal>
      <Reveal delay={60}>
        <div className={`card ${s.kpi} ${s.kpiSplit}`}>
          <div className={s.kpiLow}>
            <p className="t-label">{`Lowest step, ${LOW.length} scales`}</p>
            <Art viewBox="0 0 186 100" title={`Lowest step of the five scales: ${LOW.map(scaleName).join(' and ')}, ${LOW[0].chosen} of 10`} exportName="dataviz-kpi-low">
              {LOW.map((sc, k) => (
                <g key={sc.left}>
                  <text x="0" y={13 + k * 52} fontSize="12" letterSpacing="0.6" fill={HEX.navy} lang="pt-BR">{scaleName(sc)}</text>
                  {Array.from({ length: 10 }, (_, j) => (
                    <circle key={j} cx={r2(7.5 + j * 19)} cy={32 + k * 52} r="7" fill={j === sc.chosen - 1 ? HEX.green : j < sc.chosen ? HEX.navy : 'none'} stroke={j < sc.chosen ? 'none' : HEX.muted} strokeWidth="1.5" className="lock" style={{ '--i': j + k * 3 }} />
                  ))}
                </g>
              ))}
            </Art>
          </div>
          <p className={`${s.kpiFig} ${s.kpiInk}`}>{LOW[0].chosen}</p>
        </div>
      </Reveal>
      <Reveal delay={120}>
        <div className={`card-green ${s.kpi}`}>
          <div className={s.kpiHead}>
            <p className={s.kpiFig}>{DIRECTION.words.length}</p>
            <p className="t-caps" lang="pt-BR">{DIRECTION.label}</p>
          </div>
          <ul className={s.kpiWords} lang="pt-BR">
            {DIRECTION.words.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </div>
      </Reveal>
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
              <th scope="row" className={s.rowHead}>{p.name}</th>
              <td className={s.mono}>{p.hex.slice(1).toLowerCase()}</td>
              <td className={s.mono}>{p.no}</td>
              <td className="t-caps" lang="pt-BR">{p.role}</td>
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
