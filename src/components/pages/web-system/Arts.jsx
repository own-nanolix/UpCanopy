import Art from '@/components/art/Art';
import { BrandDefs, FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { DescriptorG, MarkG, WordmarkG } from '@/components/art/Mark';
import { IconUse } from '@/components/site/Icon';
import { r2 } from '@/lib/charts';
import { CONTACT, DIRECTION, LINES, NAV_LINKS, SCALES } from '@/lib/brand';
import { range } from '@/lib/site';
import s from './web-system.module.css';

const NAVY = '#162557';
const GREEN = '#26CF7B';
const SLIDE = '#F0F0F0';
const WHITE = '#FFFFFF';
const MUTED = '#4A5568';

// Small SVG text helper in the logotype voice (wide caps).
function T({ x, y, size = 11, fill = NAVY, anchor = 'start', spacing = 0.06, weight = 500, children, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} letterSpacing={r2(size * spacing)} className="wide" style={{ fontFamily: 'var(--font-wide)' }} {...rest}>
      {children}
    </text>
  );
}

// A dimension line with end ticks. dir 'h' runs along x, 'v' along y.
function Dim({ x: x0, y: y0, len: l0, dir = 'h', stroke = MUTED }) {
  const x = +x0, y = +y0, len = +l0;
  const d = dir === 'h' ? `M${x} ${y}H${x + len}M${x} ${y - 5}V${y + 5}M${x + len} ${y - 5}V${y + 5}` : `M${x} ${y}V${y + len}M${x - 5} ${y}H${x + 5}M${x - 5} ${y + len}H${x + 5}`;
  return <path d={d} fill="none" stroke={stroke} strokeWidth="1.5" />;
}

// 1. Button anatomy: the real values of .btn, drawn at 3x.
export function ButtonAnatomy() {
  const k = 3, x0 = 60, y0 = 70, H = 52 * k;
  const padL = 24 * k, textW = 44 * k, gap = 12 * k, arrowW = 18 * k, padR = 24 * k;
  const W = padL + textW + gap + arrowW + padR;
  const xs = [x0, x0 + padL, x0 + padL + textW, x0 + padL + textW + gap, x0 + padL + textW + gap + arrowW, x0 + W];
  const yb = y0 + H + 34;
  const notes = ['HEIGHT 52', 'RADIUS 0', 'TYPE 12 PX, 500, CAPS', 'TRACKING 0.08EM', 'GHOST LINE 2 PX'];
  return (
    <Art viewBox="0 0 720 380" title="Button anatomy: 52 px high, square corners, 24 px side padding, wide caps 12 px" exportName="web-system-button-anatomy">
      <rect width="720" height="380" fill={SLIDE} />
      <rect x={x0} y={y0} width={W} height={H} fill={GREEN} />
      <T x={x0 + padL} y={y0 + H / 2 + 13} size={12 * k} spacing={0.08}>HOME</T>
      <path d={`M${x0 + padL + textW + gap} ${y0 + H / 2}H${x0 + padL + textW + gap + arrowW}M${x0 + padL + textW + gap + arrowW - 20} ${y0 + H / 2 - 20}L${x0 + padL + textW + gap + arrowW} ${y0 + H / 2}L${x0 + padL + textW + gap + arrowW - 20} ${y0 + H / 2 + 20}`} fill="none" stroke={NAVY} strokeWidth="6" />
      {/* padding brackets */}
      {[[0, 1], [3, 4], [4, 5]].map(([a, b], i) => (
        <g key={i}>
          <Dim x={xs[a]} y={yb} len={xs[b] - xs[a]} />
          <T x={r2((xs[a] + xs[b]) / 2)} y={yb + 24} size={11} anchor="middle" fill={MUTED}>{['24', '12', '24'][i]}</T>
        </g>
      ))}
      <Dim x={x0 + W + 20} y={y0} len={H} dir="v" />
      <T x={x0 + W + 32} y={y0 + H / 2 + 4} size={11} fill={MUTED}>52</T>
      {notes.map((n, i) => (
        <g key={n}>
          <rect x="510" y={r2(96 + i * 38)} width="10" height="10" fill={i === 1 ? GREEN : NAVY} />
          <T x="528" y={r2(106 + i * 38)} size={11}>{n}</T>
        </g>
      ))}
      <T x="60" y="352" size={10} fill={MUTED}>PADDING 0 24 · ICON GAP 12 · WIDE CAPS</T>
      <T x="660" y="352" size={10} anchor="end" fill={MUTED}>BUTTON ANATOMY</T>
    </Art>
  );
}

// 2. Navigation bar anatomy.
export function NavAnatomy() {
  const labels = [...NAV_LINKS.map((l) => l.label), 'Manifesto'];
  const lw = 8.7;
  let x = 214;
  const items = labels.map((l) => {
    const w = r2(l.length * lw + 28);
    const it = { l, x, w };
    x += w + 2;
    return it;
  });
  const barY = 50, barH = 74;
  return (
    <Art viewBox="0 0 820 260" title="Navigation bar anatomy: lockup, wide caps links, the HOME call" exportName="web-system-nav-anatomy">
      <rect width="820" height="260" fill={SLIDE} />
      <rect x="0" y={barY} width="820" height={barH} fill={NAVY} />
      <MarkG x={24} y={barY + 22} size={30} fill={GREEN} />
      <WordmarkG x={66} y={barY + 44} size={20} fill={WHITE} />
      {items.map((it, i) => (
        <g key={it.l}>
          <T x={r2(it.x + 14)} y={barY + 41} size={11} fill={WHITE}>{it.l.toUpperCase()}</T>
          {i === 0 && <rect x={it.x} y={barY + 55} width={it.w} height="2" fill={GREEN} />}
        </g>
      ))}
      <rect x="710" y={barY + 18} width="86" height="38" fill={GREEN} />
      <T x="726" y={barY + 41} size={10} spacing={0.08}>HOME →</T>
      {/* callouts */}
      <path d={`M54 ${barY + barH}V170M${it0(items)} ${barY + 57}V170M753 ${barY + 56}V170`} stroke={MUTED} strokeWidth="1.5" fill="none" />
      <T x="54" y="188" size={10} fill={MUTED}>LOCKUP</T>
      <T x="54" y="204" size={10} fill={NAVY}>MARK 30 · WORD 20</T>
      <T x={it0(items)} y="188" size={10} fill={MUTED}>CURRENT</T>
      <T x={it0(items)} y="204" size={10} fill={NAVY}>2 PX GREEN LINE</T>
      <T x="753" y="188" size={10} fill={MUTED} anchor="end">ACTION</T>
      <T x="753" y="204" size={10} fill={NAVY} anchor="end">BTN-SM 38 PX</T>
      <Dim x="808" y={barY} len={barH} dir="v" />
      <T x="60" y="240" size={10} fill={MUTED}>LINKS 11 PX · PAD 10 14 · TRACKING 0.06EM · BAR PAD 18</T>
    </Art>
  );
}
const it0 = (items) => r2(items[0].x + items[0].w / 2);

// 3. The mega-menu gradient tile: gradient with grain, the frond, the mark and the brand line.
export function MegaTile() {
  const idp = 'web-system-tile';
  const rows = LINES.bridge.rows4;
  return (
    <Art viewBox="0 0 480 360" title="Mega menu tile: gradient, frond, mark and the brand line" exportName="web-system-mega-tile">
      <BrandDefs idp={idp} />
      <clipPath id={`${idp}-clip`}><rect width="480" height="360" /></clipPath>
      <g clipPath={`url(#${idp}-clip)`}>
        <rect width="480" height="360" fill={`url(#${idp}-rise)`} filter={`url(#${idp}-grain)`} />
        <FrondG cx={0} cy={360} r={150} a0={268} a1={352} count={36} len={250} width={8} lean={58} tone="onNavy" opacity={0.6} fan />
      </g>
      <MarkG x={28} y={26} size={46} fill={GREEN} archClass="roof-arch" barClass="roof-bar" />
      <text x="452" y="62" textAnchor="end" fontSize="22" fontWeight="300" fill={WHITE}>
        {rows.map((r, i) => (
          <tspan key={r} x="452" dy={i ? 28 : 0} fontWeight={i === rows.length - 1 ? 700 : 300} fill={i === rows.length - 1 ? GREEN : WHITE}>{r}</tspan>
        ))}
      </text>
      <T x="452" y="338" size={10} anchor="end" fill={WHITE}>{CONTACT.footer}</T>
    </Art>
  );
}

// 4. Chip sheet.
const cw = (t, size) => r2(t.length * size * 0.82 + (size === 10 ? 20 : 28));
function Chp({ x, y, t, tone = 'line', size = 11 }) {
  const sm = size === 10;
  const h = sm ? 24 : 31;
  const w = cw(t, size);
  const fill = { line: 'none', green: GREEN, navy: NAVY, ink: '#1D1D1B', mint: '#F2FFE4' }[tone];
  const txt = { line: NAVY, green: NAVY, navy: WHITE, ink: WHITE, mint: NAVY }[tone];
  const stroke = tone === 'line' ? NAVY : fill;
  return (
    <g>
      <rect x={x + 1} y={y + 1} width={w - 2} height={h - 2} fill={fill} stroke={stroke} strokeWidth="2" />
      <T x={x + (sm ? 8 : 12) + 2} y={y + h / 2 + 4} size={size} fill={txt}>{t.toUpperCase()}</T>
    </g>
  );
}
export function ChipSheet() {
  return (
    <Art viewBox="0 0 480 330" title="Chip sheet: outline, tones, small and pressed" exportName="web-system-chip-sheet">
      <rect width="480" height="330" fill={SLIDE} />
      <T x="24" y="30" size={10} fill={MUTED}>DESCRIPTOR</T>
      <Chp x={24} y={40} t="REMOTE BACK–OFFICE" />
      <T x="24" y="102" size={10} fill={MUTED}>TONES</T>
      <Chp x={24} y={112} t="CRM" tone="green" />
      <Chp x={98} y={112} t="Agenda" tone="navy" />
      <Chp x={198} y={112} t="Financeiro" tone="ink" />
      <rect x="24" y="156" width="432" height="52" fill={NAVY} />
      <Chp x={36} y={167} t="Landscape" tone="mint" />
      <Chp x={170} y={167} t="Hardscape" tone="green" />
      <T x="24" y="236" size={10} fill={MUTED}>SMALL · 4 8 · 10 PX</T>
      {DIRECTION.words.map((w, i) => <Chp key={w} x={24 + DIRECTION.words.slice(0, i).reduce((a, b) => a + cw(b, 10) + 8, 0)} y={246} t={w} size={10} />)}
      <T x="24" y="302" size={10} fill={MUTED}>PRESSED</T>
      <Chp x={104} y={288} t="CRM" />
      <Chp x={172} y={288} t="CRM" tone="green" />
      <T x="456" y="318" size={10} fill={MUTED} anchor="end">HEIGHT 31 · STROKE 2 · RADIUS 0</T>
    </Art>
  );
}

// 5. Corner furniture of a slide: tiny caps in the four corners, a scale row and a big square.
export function SlideCorners() {
  const m = 24;
  return (
    <Art viewBox="0 0 720 405" title="Slide corner furniture grid" exportName="web-system-slide-corners">
      <rect width="720" height="405" fill={SLIDE} />
      <rect x={m} y={m} width={720 - 2 * m} height={405 - 2 * m} fill="none" stroke={NAVY} strokeOpacity="0.2" strokeDasharray="4 4" />
      {range(11, (i) => i + 1).map((i) => <path key={i} d={`M${r2(m + (i * (720 - 2 * m)) / 12)} ${m}V${405 - m}`} stroke={NAVY} strokeOpacity="0.1" />)}
      <T x={m + 8} y={m + 20} size={8} spacing={0.08} weight={700}>APRESENTAÇÃO DO PROJETO</T>
      <T x={m + 8} y={m + 32} size={8} spacing={0.08} weight={700}>DE IDENTIDADE VISUAL</T>
      <T x={720 - m - 8} y={m + 20} size={8} spacing={0.08} weight={700} anchor="end">CLIENTE: EDERSON DEVENS</T>
      <T x={720 - m - 8} y={m + 32} size={8} spacing={0.08} weight={700} anchor="end">PROJETO: UPCANOPY</T>
      <T x={m + 8} y={405 - m - 12} size={8} spacing={0.08} weight={700}>UPCANOPY©</T>
      <T x={720 - m - 8} y={405 - m - 12} size={14} spacing={0.08} weight={700} anchor="end">→</T>
      <rect x="64" y="108" width="190" height="190" fill={NAVY} />
      <MarkG x={110} y={160} size={100} fill={GREEN} />
      <rect x="270" y="108" width="190" height="190" fill={GREEN} />
      <WordmarkG x={286} y={212} size={30} fill={NAVY} />
      <DescriptorG x={286} y={232} size={8} fill={NAVY} />
      {SCALES.slice(0, 3).map((sc, i) => (
        <g key={sc.left}>
          <T x="490" y={r2(130 + i * 62)} size={7} spacing={0.08} weight={400}>{sc.left}</T>
          <T x="656" y={r2(130 + i * 62)} size={7} spacing={0.08} weight={400} anchor="end">{sc.right}</T>
          <ScaleDotsG x={496} y={r2(144 + i * 62)} w={152} r={6} chosen={sc.chosen} />
        </g>
      ))}
      <T x={m + 8} y={405 - m - 26} size={8} spacing={0.08} weight={400} fill={MUTED}>CORNERS · 4 · TINY BOLD CAPS</T>
    </Art>
  );
}

// 6. App rail anatomy.
export function RailAnatomy() {
  const icons = ['home', 'users', 'calendar', 'chart', 'folder'];
  const note = [['RAIL 72', 60], ['BUTTON 52 SQUARE', 120], ['GAP 8', 176], ['ACTIVE = GREEN PARK', 232]];
  return (
    <Art viewBox="0 0 480 360" title="App rail anatomy: square icon buttons, the active one green" exportName="web-system-rail-anatomy">
      <rect width="480" height="360" fill={SLIDE} />
      <rect x="40" y="20" width="72" height="320" fill={NAVY} />
      {icons.map((n, i) => {
        const y = 29 + i * 60;
        return (
          <g key={n}>
            {i === 1 && <rect x="50" y={y} width="52" height="52" fill={GREEN} />}
            <IconUse name={n} x={65} y={y + 15} size={22} color={i === 1 ? NAVY : WHITE} style={{ color: i === 1 ? NAVY : WHITE }} />
          </g>
        );
      })}
      <Dim x="130" y="29" len="52" dir="v" />
      <Dim x="130" y="81" len="8" dir="v" />
      <Dim x="40" y="352" len="72" />
      {note.map(([t, y]) => (
        <g key={t}>
          <path d={`M150 ${y}H190`} stroke={MUTED} strokeWidth="1.5" />
          <T x="200" y={y + 4} size={11}>{t}</T>
        </g>
      ))}
      <T x="200" y="290" size={10} fill={MUTED}>ICON 22 PX · 2 PX STROKE</T>
      <T x="200" y="308" size={10} fill={MUTED}>HOVER · WHITE 14 PERCENT</T>
    </Art>
  );
}

const SHEETS = [
  { id: 'button', Cmp: ButtonAnatomy, label: 'Button anatomy' },
  { id: 'tile', Cmp: MegaTile, label: 'Mega menu tile' },
  { id: 'chips', Cmp: ChipSheet, label: 'Chip sheet' },
  { id: 'nav', Cmp: NavAnatomy, label: 'Navigation anatomy' },
  { id: 'slide', Cmp: SlideCorners, label: 'Slide corners' },
  { id: 'rail', Cmp: RailAnatomy, label: 'Rail anatomy' },
];
export { SHEETS };
export function Sheet({ Cmp, label }) {
  return (
    <figure style={{ margin: 0 }}>
      <div className={s.sheetBox}><div className={s.sheet}><Cmp /></div></div>
      <figcaption className={`t-label ${s.sheetCap}`}><span>{label}</span><span>SVG</span></figcaption>
    </figure>
  );
}
