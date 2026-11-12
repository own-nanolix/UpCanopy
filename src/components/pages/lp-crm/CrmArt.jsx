import Art from '@/components/art/Art';
import { BrandDefs, FrondG, ScaleDotsG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { SCALES } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// The ten-dot scales of the case study (slide m03), one row per scale, the chosen dot green.
export function ScalesArt() {
  return (
    <Art viewBox="0 0 560 360" title="The five brand scales, ten dots each" exportName="lp-crm-scales" style={{ width: '100%', height: 'auto' }}>
      <rect width="560" height="360" fill="#F0F0F0" />
      {SCALES.map((sc, i) => (
        <g key={sc.left} transform={`translate(30 ${52 + i * 66})`}>
          <text x="0" y="-18" fontSize="10" fontWeight="700" letterSpacing="1" fill="#162557">{sc.left}</text>
          <text x="500" y="-18" fontSize="10" fontWeight="700" letterSpacing="1" textAnchor="end" fill="#162557">{sc.right}</text>
          <ScaleDotsG x={0} y={0} w={500} r={10} chosen={sc.chosen} lock />
        </g>
      ))}
    </Art>
  );
}

// The frond entering from the lower left edge on dark green, as on the poster.
export function FrondArt() {
  return (
    <Art viewBox="0 0 400 420" title="Frond on Green Dark" exportName="lp-crm-frond" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="420" fill="#052E25" />
      <FrondG cx={-60} cy={440} r={330} a0={-100} a1={-8} count={34} len={230} width={8} lean={58} tone="onDark" fan />
      <MarkG x={300} y={330} size={52} fill="#26CF7B" archClass="roof-arch" barClass="roof-bar" />
    </Art>
  );
}

// The board as pure structure: three columns, rows of quiet bars.
export function BoardOutlineArt() {
  const cols = [0, 1, 2];
  return (
    <Art viewBox="0 0 520 300" title="Board outline: three columns of placeholder cards" exportName="lp-crm-board-outline" style={{ width: '100%', height: 'auto' }}>
      <rect width="520" height="300" fill="#F2FFE4" />
      {cols.map((c) => (
        <g key={c} transform={`translate(${20 + c * 166} 20)`}>
          <rect width="152" height="260" fill="#FFFFFF" />
          <rect width="152" height="6" fill={c === 2 ? '#26CF7B' : '#162557'} />
          <rect x="12" y="20" width="60" height="8" fill="#162557" opacity="0.2" />
          {Array.from({ length: 4 - c }, (_, k) => (
            <g key={k} className="rise" style={{ '--i': c * 3 + k }}>
              <rect x="12" y={r2(44 + k * 52)} width="128" height="42" fill="#F0F0F0" />
              <rect x="20" y={r2(52 + k * 52)} width="18" height="18" fill="#162557" />
              <rect x="46" y={r2(54 + k * 52)} width={r2(50 + ((k + c) % 3) * 14)} height="6" fill="#162557" opacity="0.22" />
              <rect x="46" y={r2(66 + k * 52)} width={r2(30 + ((k * 2 + c) % 3) * 12)} height="6" fill="#162557" opacity="0.22" />
            </g>
          ))}
        </g>
      ))}
    </Art>
  );
}

// The three board stages as thick bands with cut ends, stepping up to the right like the arch's legs; each
// band carries a column of quiet rows that shortens as the stage moves on. Labels name the board columns.
const STAGES = ['New', 'In progress', 'Done'];
export function StageFlowArt() {
  const W = 960, H = 260, bw = 260, gap = 40;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Board stages: New, In progress, Done, stepping up to the right" exportName="lp-crm-stage-flow" style={{ width: '100%', height: 'auto' }}>
      <rect width={W} height={H} fill="#F2FFE4" />
      {STAGES.map((name, i) => {
        const x = 40 + i * (bw + gap), top = 150 - i * 50, last = i === STAGES.length - 1;
        return (
          <g key={name} className="rise" style={{ '--i': i }}>
            <path d={`M${x} ${H - 30}L${x + 18} ${top}H${x + bw}L${x + bw - 18} ${H - 30}Z`} fill={last ? '#26CF7B' : '#162557'} />
            <text x={x + 34} y={top + 30} fontSize="15" fontWeight="700" letterSpacing="1.5" fill={last ? '#162557' : '#FFFFFF'}>{name.toUpperCase()}</text>
            {Array.from({ length: 3 - i }, (_, k) => (
              <rect key={k} x={x + 34} y={top + 50 + k * 20} width={r2(150 - k * 30)} height="8" fill={last ? '#162557' : '#FFFFFF'} opacity="0.3" />
            ))}
            {!last && <path d={`M${x + bw + 6} ${top + 22}H${x + bw + gap - 6}M${x + bw + gap - 16} ${top + 12}L${x + bw + gap - 6} ${top + 22}L${x + bw + gap - 16} ${top + 32}`} fill="none" stroke="#162557" strokeWidth="3" />}
          </g>
        );
      })}
    </Art>
  );
}

// The mark on the brand gradient: a square tile for the masonry.
export function MarkTileArt() {
  return (
    <Art viewBox="0 0 300 300" title="Mark on the brand gradient" exportName="lp-crm-mark-tile" style={{ width: '100%', height: '100%' }} preserveAspectRatio="xMidYMid slice">
      <BrandDefs idp="lp-crm-mt" />
      <rect width="300" height="300" fill="url(#lp-crm-mt-rise)" filter="url(#lp-crm-mt-grain)" />
      <MarkG x={90} y={90} size={120} fill="#F2FFE4" archClass="roof-arch" barClass="roof-bar" />
    </Art>
  );
}
