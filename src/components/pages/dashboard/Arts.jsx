import Art from '@/components/art/Art';
import { MarkG, MarkCropG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import { IconUse } from '@/components/site/Icon';
import { AREAS, HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { ScaleRows } from './Parts';
import { ROWS, SLOTS, DAYS, LINES_N, countBy } from './data';

const N = HEX.navy, G = HEX.green, M = HEX.mint;
const bars = (x, y, w, n, fill, gap = 14, h = 6, op = 0.22) =>
  Array.from({ length: n }, (_, i) => <rect key={i} x={x} y={r2(y + i * gap)} width={r2(w * (0.55 + ((i * 37) % 40) / 100))} height={h} fill={fill} opacity={op} />);

// The ten-dot scales, the five values printed on the slide.
export function ArtScales() {
  return (
    <Art viewBox="0 0 1000 350" title="The five attribute scales, ten dots each" exportName="dashboard-scales">
      <rect width="1000" height="350" fill={HEX.slide} />
      <ScaleRows lock tag />
    </Art>
  );
}

// Block summary chart: one square per row, filled squares are the rows of that area.
export function ArtBlocks() {
  const areas = AREAS.map((a) => [a, countBy(a), a === 'Financeiro' ? LINES_N : countBy(a)]);
  return (
    <Art viewBox="0 0 600 300" title="Block summary: rows per area" exportName="dashboard-blocks">
      <rect width="600" height="300" fill={M} />
      {areas.map(([a, n], k) => (
        <g key={a} transform={`translate(${40 + k * 180} 30)`}>
          {Array.from({ length: 12 }, (_, i) => {
            const on = i < countBy(a);
            return (
              <g key={i} tabIndex={0} className="lock" style={{ '--i': i + k * 3 }}>
                <rect x={(i % 3) * 44} y={150 - Math.floor(i / 3) * 44} width="38" height="38" fill={on ? (k === 0 ? G : N) : N} opacity={on ? 1 : 0.12} />
                <title>{`${a}: row ${i + 1} of ${n}`}</title>
              </g>
            );
          })}
          <text x="0" y="200" fontSize="14" fontWeight="500" letterSpacing="1.4" fill={N} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{a.toUpperCase()}</text>
          <text x="0" y="232" fontSize="26" fill={N} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{n}</text>
        </g>
      ))}
    </Art>
  );
}

// Week grid drawing: the structure of the calendar screen.
export function ArtWeek() {
  const x0 = 70, w = 100, h = 36;
  return (
    <Art viewBox="0 0 800 460" title="Week grid with slots" exportName="dashboard-week-grid">
      <rect width="800" height="460" fill="#FFFFFF" />
      {DAYS.map((d, i) => (
        <text key={d} x={x0 + i * w + 8} y="30" fontSize="13" letterSpacing="1.3" fontWeight="500" fill={N} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{d.toUpperCase()}</text>
      ))}
      {Array.from({ length: 11 }, (_, i) => <rect key={i} x="0" y={44 + i * h} width="800" height={i ? 1 : 2} fill={N} opacity={i ? 0.14 : 1} />)}
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x={x0 + i * w - 1} y="44" width="1" height="360" fill={N} opacity="0.14" />)}
      {SLOTS.map((sl) => (
        <g key={sl.id} className="rise" style={{ '--i': sl.id }}>
          <rect x={x0 + sl.d * w + 4} y={44 + sl.h * h + 3} width={w - 8} height={sl.n * h - 6} fill={sl.id === 1 ? G : N} />
          <rect x={x0 + sl.d * w + 12} y={44 + sl.h * h + 12} width="44" height="6" fill={sl.id === 1 ? N : '#FFFFFF'} opacity="0.35" />
        </g>
      ))}
    </Art>
  );
}

export function ArtFrond() {
  return (
    <Art viewBox="0 0 400 300" title="Frond tile on the brand gradient" exportName="dashboard-frond-tile">
      <BrandDefs idp="dashboard-ft" />
      <clipPath id="dashboard-ft-clip"><rect width="400" height="300" /></clipPath>
      <rect width="400" height="300" fill="url(#dashboard-ft-rise)" />
      <g clipPath="url(#dashboard-ft-clip)"><FrondG cx={0} cy={330} r={190} a0={-95} a1={-5} count={34} len={230} width={9} tone="onNavy" /></g>
      <MarkG x={24} y={24} size={44} fill={G} />
    </Art>
  );
}

export function ArtCrop() {
  return (
    <Art viewBox="0 0 300 300" title="Mark crop tile" exportName="dashboard-mark-crop-tile">
      <rect width="300" height="300" fill={G} />
      <MarkCropG idp="dashboard-mc" w={300} h={300} zoom={1.9} dx={-0.4} dy={-0.15} fill={N} />
    </Art>
  );
}

// Three KPI tiles: area label, count, quiet bars.
export function ArtKpi() {
  const vals = [ROWS.length, SLOTS.length, LINES_N];
  return (
    <Art viewBox="0 0 660 220" title="Three summary tiles" exportName="dashboard-kpi-tiles">
      <rect width="660" height="220" fill={M} />
      {AREAS.map((a, i) => (
        <g key={a} transform={`translate(${i * 224 + 8} 10)`}><g className="slide-up" style={{ '--i': i }}>
          <rect width="204" height="200" fill={i === 0 ? N : 'none'} stroke={N} strokeWidth="2" />
          <text x="18" y="34" fontSize="12" letterSpacing="1.2" fontWeight="500" fill={i === 0 ? '#FFFFFF' : N} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{a.toUpperCase()}</text>
          <text x="18" y="108" fontSize="64" letterSpacing="-3" fill={i === 0 ? G : N} className="wide" style={{ fontFamily: 'var(--font-wide)' }}>{vals[i]}</text>
          {bars(18, 140, 150, 3, i === 0 ? '#FFFFFF' : N, 16, 7, 0.28)}
        </g></g>
      ))}
    </Art>
  );
}

const RAIL = ['home', 'users', 'calendar', 'chart', 'gear'];
export function ArtRail() {
  return (
    <Art viewBox="0 0 120 430" title="Rail of square icon buttons" exportName="dashboard-icon-rail">
      <rect width="120" height="430" fill={N} />
      <MarkG x={32} y={20} size={56} fill={G} />
      {RAIL.map((n, i) => (
        <g key={n} className="slide-up" style={{ '--i': i }}>
          <rect x="30" y={100 + i * 66} width="60" height="56" fill={i === 1 ? G : 'none'} stroke={i === 1 ? G : 'rgba(255,255,255,0.3)'} strokeWidth="2" />
          <IconUse name={n} x={r2(45)} y={r2(114 + i * 66)} size={30} color={i === 1 ? N : '#FFFFFF'} />
        </g>
      ))}
    </Art>
  );
}

// Thumbnails: the structure of each option.
function Thumb({ kind }) {
  const t = {
    a: { bg: M, ink: N, ex: 'dashboard-thumb-a', title: 'Option A: light editorial layout of large figures' },
    b: { bg: N, ink: '#FFFFFF', ex: 'dashboard-thumb-b', title: 'Option B: navy command layout with a rail and three columns' },
    c: { bg: '#FFFFFF', ink: N, ex: 'dashboard-thumb-c', title: 'Option C: calendar-first week grid with a side list' },
    d: { bg: HEX.slide, ink: N, ex: 'dashboard-thumb-d', title: 'Option D: ledger-first table with a summary strip' },
    e: { bg: HEX.greenDark, ink: M, ex: 'dashboard-thumb-e', title: 'Option E: kanban board in three columns' },
  }[kind];
  const { ink } = t;
  let body;
  if (kind === 'a') {
    body = (
      <>
        <MarkG x={16} y={14} size={22} fill={N} />
        {[0, 1, 2].map((i) => <g key={i}><rect x={20 + i * 122} y="62" width="62" height="40" fill={N} /><rect x={20 + i * 122} y="112" width="104" height="2" fill={N} />{bars(20 + i * 122, 124, 90, 2, N, 10, 4)}</g>)}
        {[0, 1, 2, 3, 4].map((k) => Array.from({ length: 10 }, (_, i) => <circle key={`${k}-${i}`} cx={26 + i * 14} cy={168 + k * 14} r="4.2" fill={i === 6 + (k % 3) ? G : N} />))}
        {bars(200, 160, 160, 5, N, 14, 5)}
      </>
    );
  } else if (kind === 'b') {
    body = (
      <>
        <rect x="0" y="0" width="52" height="250" fill="#0C1445" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="12" y={52 + i * 36} width="28" height="28" fill={i === 1 ? G : 'none'} stroke={i === 1 ? G : 'rgba(255,255,255,0.4)'} strokeWidth="2" />)}
        <MarkG x={12} y={12} size={28} fill={G} />
        {[0, 1, 2].map((i) => <g key={i}><rect x={66 + i * 108} y="40" width="98" height="190" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" /><rect x={66 + i * 108} y="40" width="98" height={i === 1 ? 4 : 2} fill={i === 1 ? G : '#FFFFFF'} />{bars(74 + i * 108, 62, 80, 9, '#FFFFFF', 18, 6, 0.3)}</g>)}
        <rect x="66" y="12" width="120" height="16" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
      </>
    );
  } else if (kind === 'c') {
    body = (
      <>
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x="14" y={38 + i * 25} width="262" height="1" fill={N} opacity="0.2" />)}
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={14 + i * 37.5} y="30" width="1" height="200" fill={N} opacity="0.2" />)}
        {SLOTS.map((sl) => <rect key={sl.id} x={16 + sl.d * 37.5} y={40 + sl.h * 20} width="33" height={sl.n * 20 - 4} fill={sl.id === 1 ? G : N} />)}
        <rect x="14" y="14" width="262" height="2" fill={N} />
        <rect x="292" y="14" width="2" height="216" fill={N} />
        {Array.from({ length: 8 }, (_, i) => <g key={i}><rect x="304" y={24 + i * 26} width="80" height="16" fill={i === 0 ? G : 'none'} stroke={N} strokeWidth="1.5" /></g>)}
      </>
    );
  } else if (kind === 'd') {
    body = (
      <>
        {[0, 1, 2, 3].map((i) => <g key={i}><rect x={16 + i * 94} y="16" width="86" height="50" fill={i === 3 ? N : 'none'} stroke={N} strokeWidth="2" /><rect x={24 + i * 94} y="24" width="30" height="16" fill={i === 3 ? G : N} /></g>)}
        <rect x="16" y="84" width="368" height="2" fill={N} />
        {Array.from({ length: 9 }, (_, i) => <g key={i}><rect x="16" y={96 + i * 17} width="368" height="1" fill={N} opacity="0.2" />{bars(22, 101 + i * 17, 60, 1, N, 0, 5, 0.3)}<rect x="130" y={101 + i * 17} width="40" height="5" fill={N} opacity="0.22" /><rect x="250" y={101 + i * 17} width={i % 3 === 0 ? 12 : 30} height="5" fill={i % 3 === 2 ? G : N} opacity={i % 3 === 2 ? 1 : 0.25} /></g>)}
      </>
    );
  } else {
    body = (
      <>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={16 + i * 122} y="16" width="112" height="3" fill={G} />
            {Array.from({ length: 4 - (i === 2 ? 1 : 0) }, (_, k) => <g key={k}><rect x={16 + i * 122} y={30 + k * 52} width="112" height="44" fill="none" stroke={M} strokeWidth="1.5" /><rect x={22 + i * 122} y={36 + k * 52} width="14" height="14" fill={G} />{bars(42 + i * 122, 38 + k * 52, 60, 1, M, 0, 5, 0.4)}{bars(22 + i * 122, 58 + k * 52, 90, 1, M, 0, 4, 0.25)}</g>)}
          </g>
        ))}
      </>
    );
  }
  return (
    <Art viewBox="0 0 400 250" title={t.title} exportName={t.ex}>
      <rect width="400" height="250" fill={t.bg} stroke={ink} strokeWidth="0" />
      {body}
    </Art>
  );
}
export { Thumb };
