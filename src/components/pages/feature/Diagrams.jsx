import Art from '@/components/art/Art';
import { MarkG, LockupG, MARK_ARCH } from '@/components/art/Mark';
import { FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { IconUse } from '@/components/site/Icon';
import { AREAS, DIRECTION, LINES, MODES, SCALES } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';

const WIDE = { fontFamily: 'var(--font-wide)' };
const pad2 = (n) => String(n + 1).padStart(2, '0');

// ---- 1. Three desks under the arch: the mark's arch is the roof over CRM, Agenda and Financeiro ----
export function ThreeDesks() {
  const tones = [
    { bg: '#162557', ink: '#FFFFFF', icon: '#26CF7B', bar: '#FFFFFF' },
    { bg: '#26CF7B', ink: '#162557', icon: '#162557', bar: '#162557' },
    { bg: '#052E25', ink: '#F2FFE4', icon: '#26CF7B', bar: '#F2FFE4' },
  ];
  const icons = ['users', 'calendar', 'chart'];
  return (
    <Art viewBox="0 0 960 580" title="Three desks under the arch: CRM, Agenda and Financeiro" exportName="feature-three-desks">
      <rect width="960" height="580" fill="#F2FFE4" />
      {/* the arch only: the bar becomes the ground line */}
      <g transform="translate(240 30) scale(4.8)" fill="#162557">
        <path className="roof-arch" d={MARK_ARCH} />
      </g>
      {AREAS.map((a, i) => {
        const t = tones[i];
        const x = 240 + i * 166;
        return (
          <g key={a} transform={`translate(${x} 384)`}>
            <g className="lock" style={{ '--i': i * 3 }}>
              <rect width="148" height="136" fill={t.bg} />
              <IconUse name={icons[i]} x={16} y={16} size={28} color={t.icon} />
              {[0, 1].map((k) => (
                <rect key={k} x="16" y={62 + k * 14} width={[96, 64][k]} height="6" fill={t.bar} opacity="0.28" />
              ))}
              <text x="16" y="118" fontSize="14" fontWeight="500" letterSpacing="0.8" fill={t.ink} style={WIDE} className="wide">{a.toUpperCase()}</text>
            </g>
          </g>
        );
      })}
      <rect x="200" y="520" width="560" height="14" fill="#162557" />
    </Art>
  );
}

// A client card, as drawn on the desk: number tile and two quiet lines.
function CardG({ x, y, w = 230, h = 58, n, rot = 0, on = false, i = 0, lock = false }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${rot} ${w / 2} ${h / 2})`}>
      <g className={lock ? 'lock' : undefined} style={lock ? { '--i': i } : undefined}>
        <rect x="5" y="5" width={w} height={h} fill="#162557" opacity="0.22" />
        <rect width={w} height={h} fill={on ? '#26CF7B' : '#FFFFFF'} stroke="#162557" strokeWidth="2" />
        <rect width="42" height={h} fill="#162557" />
        <text x="21" y={h / 2 + 4} fontSize="12" fontWeight="500" textAnchor="middle" fill={on ? '#26CF7B' : '#FFFFFF'} style={WIDE} className="wide">{pad2(n)}</text>
        <rect x="58" y={h / 2 - 12} width={w * 0.52} height="7" fill="#162557" opacity="0.2" />
        <rect x="58" y={h / 2 + 5} width={w * 0.3} height="7" fill="#162557" opacity="0.14" />
        {lock && <rect x="-2" y="-2" width="5" height={h + 4} fill="#26CF7B" />}
      </g>
    </g>
  );
}

// ---- 2. Before and after: the two modes ----
export function BeforeAfter() {
  const rnd = seeded(33);
  const scatter = Array.from({ length: 5 }, (_, i) => ({
    x: 36 + rnd() * 290,
    y: 100 + i * 66 + (rnd() - 0.5) * 34,
    rot: Math.round((rnd() - 0.5) * 30),
  }));
  return (
    <Art viewBox="0 0 1200 520" title="Before and after: from sobrevivência to expansão" exportName="feature-before-after">
      <rect width="1200" height="520" fill="#F2FFE4" />
      <rect x="0" y="0" width="580" height="520" fill="#DADADA" />
      <rect x="620" y="0" width="580" height="520" fill="#FFFFFF" />
      <text x="36" y="52" fontSize="14" fontWeight="500" letterSpacing="1" fill="#162557" style={WIDE} className="wide" lang="pt-BR">{MODES[0].toUpperCase()}</text>
      <text x="656" y="52" fontSize="14" fontWeight="500" letterSpacing="1" fill="#162557" style={WIDE} className="wide" lang="pt-BR">{MODES[1].toUpperCase()}</text>
      {scatter.map((p, i) => <CardG key={i} x={p.x} y={p.y} n={i} rot={p.rot} />)}
      <g>
        <path d="M580 260h40m-14-14 14 14-14 14" fill="none" stroke="#162557" strokeWidth="4" />
        <rect x="574" y="0" width="6" height="520" fill="#162557" opacity="0.08" />
      </g>
      {Array.from({ length: 5 }, (_, i) => <CardG key={i} x={680} y={96 + i * 70} n={i} on={i === 2} lock i={i} w={300} />)}
      {Array.from({ length: 10 }, (_, i) => (
        <circle key={i} cx={1020 + (i % 2) * 40} cy={120 + Math.floor(i / 2) * 70} r="14" fill={i === 4 || i === 5 ? '#26CF7B' : '#162557'} className="lock" style={{ '--i': i + 3 }} />
      ))}
    </Art>
  );
}

// ---- 3. The frond tile: dark green, the frond entering from the lower left, the line top right ----
export function FrondTile() {
  return (
    <Art viewBox="0 0 600 600" title="Frond tile on Green Dark with the brand line and the mark" exportName="feature-frond-tile">
      <clipPath id="feature-tile-clip"><rect width="600" height="600" /></clipPath>
      <rect width="600" height="600" fill="#052E25" />
      <g clipPath="url(#feature-tile-clip)">
        <FrondG cx={-30} cy={700} r={430} a0={262} a1={392} count={40} len={290} width={10} lean={62} tone="onDark" fan />
      </g>
      <text textAnchor="end" fontSize="21" fontWeight="300" fill="#F2FFE4" lang="pt-BR">
        {LINES.bridge.rows4.map((row, i) => (
          <tspan key={row} x="560" y={62 + i * 27} fontWeight={i === 3 ? 700 : 300} fill={i === 3 ? '#26CF7B' : '#F2FFE4'}>{row}</tspan>
        ))}
      </text>
      <MarkG x={36} y={510} size={58} fill="#26CF7B" archClass="roof-arch" barClass="roof-bar" />
    </Art>
  );
}

// ---- 4. The ten-dot scales on the slide ground ----
export function TenDots() {
  return (
    <Art viewBox="0 0 1200 640" title="The five ten-dot scales of the brand" exportName="feature-ten-dots">
      <rect width="1200" height="640" fill="#F0F0F0" />
      <text x="48" y="58" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="#162557" lang="pt-BR">{DIRECTION.label}</text>
      <rect x="48" y="74" width="1104" height="3" fill="#162557" />
      {SCALES.map((sc, i) => {
        const y = 150 + i * 84;
        return (
          <g key={sc.left} lang="pt-BR">
            <text x="48" y={y + 5} fontSize="14" fontWeight="400" letterSpacing="0.8" fill="#162557">{sc.left}</text>
            <ScaleDotsG x={330} y={y} w={540} r={14} chosen={sc.chosen} lock />
            <text x="1152" y={y + 5} fontSize="14" fontWeight="400" letterSpacing="0.8" textAnchor="end" fill="#162557">{sc.right}</text>
          </g>
        );
      })}
      <text x="48" y="606" fontSize="12" fontWeight="700" letterSpacing="1.2" fill="#162557" lang="pt-BR">{DIRECTION.words.join(' • ')}</text>
      <LockupG x={888} y={578} scale={0.46} fill="#162557" />
    </Art>
  );
}

// A decorative frond for the signature panel (not an export).
export function SigFrond() {
  return (
    <svg viewBox="0 0 700 500" aria-hidden="true" preserveAspectRatio="xMaxYMid slice" style={{ width: '100%', height: '100%' }}>
      <FrondG cx={700} cy={560} r={400} a0={180} a1={290} count={38} len={300} width={10} lean={-62} tone="onNavy" fan />
    </svg>
  );
}
