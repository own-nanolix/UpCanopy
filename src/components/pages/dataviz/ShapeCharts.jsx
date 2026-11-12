// Chart types the brand has no series for. They draw the shape only: no labels on the values, placeholder bars
// where labels would stand, and a plain caption. Nothing here is a number the case study published.
import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { stepPath, linePath, areaPath, seeded } from '@/lib/charts';
import { INK, QUIET, Lbl, Ph, tip } from './kit';

const SHAPE = 'Shape only: no published data';

// Chart 13: trend. A stepped rising line (stepPath), thick rules for the axes.
export function TrendShape() {
  const pts = [170, 150, 140, 104, 86, 40].map((y, k) => [44 + k * 50, y]);
  return (
    <Art viewBox="0 0 320 240" title={`Trend as a stepped rising line. ${SHAPE}`} exportName="dataviz-trend-shape">
      <rect x="24" y="10" width="2" height="190" fill={INK} />
      <rect x="24" y="198" width="290" height="2" fill={INK} />
      <path d={stepPath(pts)} fill="none" stroke={HEX.navy} strokeWidth="4" strokeLinejoin="miter" className="draw" style={{ '--len': 700 }} />
      <rect x="288" y="34" width="12" height="12" fill={HEX.green} className="lock" style={{ '--i': 14 }} {...tip(SHAPE)} />
      {[40, 100, 160].map((y) => <Ph key={y} x={0} y={y} w={16} />)}
      {pts.map((_, k) => <Ph key={k} x={30 + k * 48} y={212} w={28} />)}
    </Art>
  );
}

// Chart 15: distribution. A histogram of square blocks; the column heights are a shape, not a count.
export function DistributionShape() {
  const cols = [1, 2, 4, 5, 7, 5, 4, 2, 1];
  return (
    <Art viewBox="0 0 440 264" title={`Distribution as a histogram of square blocks. ${SHAPE}`} exportName="dataviz-distribution-shape">
      <g {...tip(SHAPE)}>
        {cols.map((n, k) =>
          Array.from({ length: n }, (_, j) => (
            <rect key={`${k}-${j}`} x={19 + k * 46} y={206 - 30 * j} width="26" height="26" fill={k === 4 && j === n - 1 ? HEX.green : HEX.navy} className="rise" style={{ '--i': k + j }} />
          )),
        )}
      </g>
      <rect x="0" y="236" width="440" height="2" fill={INK} />
      {cols.map((_, k) => <Ph key={k} x={19 + k * 46} y={250} w={26} />)}
    </Art>
  );
}

// Chart 16: time. A week grid of square cells; the filled cells are a shape, not a schedule.
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
export function WeekShape() {
  const rnd = seeded(7);
  return (
    <Art viewBox="0 0 440 258" title={`Time as a week grid of square cells. ${SHAPE}`} exportName="dataviz-week-shape">
      {DAYS.map((d, c) => <Lbl key={d} x={26 + c * 64} y="16" size={14} anchor="middle" ls={0.08}>{d}</Lbl>)}
      <g {...tip(SHAPE)}>
        {Array.from({ length: 4 }, (_, r) =>
          DAYS.map((d, c) => (
            <rect key={`${r}-${c}`} x={c * 64} y={28 + r * 58} width="52" height="52" fill={c < 5 && rnd() < 0.45 ? HEX.navy : QUIET} className="rise" style={{ '--i': c + r }} />
          )),
        )}
      </g>
    </Art>
  );
}

// Sparklines (shape only), four small forms for the stat cards.
const SPARK = [[4, 40], [32, 36], [60, 28], [88, 24], [116, 14], [144, 6]];
export function Spark({ n }) {
  const base = <rect x="0" y="44" width="160" height="2" fill={INK} opacity="0.5" />;
  const title = `Sparkline ${n}. ${SHAPE}`;
  return (
    <Art viewBox="0 0 160 50" title={title} exportName={`dataviz-spark-${n}`}>
      {base}
      {n === 1 && <path d={stepPath(SPARK)} fill="none" stroke={HEX.navy} strokeWidth="3" strokeLinejoin="miter" className="draw" style={{ '--len': 400 }} />}
      {n === 2 && <path d={linePath(SPARK.map(([x, y], i) => [x, y + (i === 2 ? 8 : 0)]))} fill="none" stroke={HEX.navy} strokeWidth="3" strokeLinejoin="miter" className="draw" style={{ '--len': 400 }} />}
      {n === 3 && (
        <g>
          <path d={areaPath(SPARK, 44)} fill={HEX.navy} opacity="0.18" className="fade-in" />
          <path d={linePath(SPARK)} fill="none" stroke={HEX.navy} strokeWidth="3" strokeLinejoin="miter" className="draw" style={{ '--len': 400 }} />
        </g>
      )}
      {n === 4 && [10, 16, 14, 24, 30, 28, 38, 42].map((h, i) => (
        <rect key={i} x={4 + i * 19.5} y={44 - h} width="14" height={h} fill={i === 7 ? HEX.green : HEX.navy} className="rise" style={{ '--i': i }} />
      ))}
    </Art>
  );
}
