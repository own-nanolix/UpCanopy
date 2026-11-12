import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { BrandDefs, FrondG, FROND_TONES } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { GROUNDS, FRONDS, inkOn } from './color-data';

// Colour on the brand's own surfaces, as small exportable plates.

// The mark on each of the six grounds, in the colour the case study sets it in.
export function GroundsPlate() {
  const W = 300;
  const H = 220;
  return (
    <Art viewBox="0 0 960 460" title="The mark on each ground: Blue Ocean, Green Park, Green Dark, Asfalt, Green Ligth and Gray" exportName="color-mark-grounds">
      {GROUNDS.map((g, i) => {
        const x = (i % 3) * 330;
        const y = Math.floor(i / 3) * 240;
        return (
          <g key={g.id} className="rise" style={{ '--i': i }}>
            <rect x={x} y={y} width={W} height={H} fill={g.ground} />
            <rect x={x} y={y} width={W} height={H} fill="none" stroke={HEX.navy} strokeOpacity="0.16" />
            <MarkG x={x + 28} y={y + 24} size={92} fill={g.mark} />
            <text x={x + 28} y={y + H - 40} fontSize="16" fontWeight="700" fill={inkOn(g.ground)}>{g.name}</text>
            <text x={x + 28} y={y + H - 18} fontSize="13" fontWeight="400" fill={inkOn(g.ground)}>mark {g.mark}</text>
          </g>
        );
      })}
    </Art>
  );
}

// The brand gradient: Blue Ocean at lower left rising to Green Park at upper right, with the print grain.
export function GradientPlate() {
  return (
    <Art viewBox="0 0 960 420" title="The brand gradient, Blue Ocean rising to Green Park, with fine print grain" exportName="color-gradient">
      <BrandDefs idp="color-grad" />
      <rect width="960" height="420" fill="url(#color-grad-rise)" filter="url(#color-grad-grain)" />
      <rect x="40" y="338" width="14" height="42" fill={HEX.navy} className="grow-x" />
      <text x="70" y="358" fontSize="15" fontWeight="700" fill={HEX.white}>{HEX.navy}</text>
      <text x="70" y="378" fontSize="13" fontWeight="400" fill={HEX.white}>Blue Ocean, lower left</text>
      <rect x="906" y="40" width="14" height="42" fill={HEX.green} className="grow-x" />
      <text x="890" y="58" fontSize="15" fontWeight="700" textAnchor="end" fill={HEX.navy}>{HEX.green}</text>
      <text x="890" y="78" fontSize="13" fontWeight="400" textAnchor="end" fill={HEX.navy}>Green Park, upper right</text>
    </Art>
  );
}

// The frond on its four grounds, each with its two tones from FROND_TONES.
export function FrondPlate() {
  const W = 220;
  const H = 300;
  return (
    <Art viewBox="0 0 940 380" title="The frond tones on Green Dark, Blue Ocean, Green Park and Green Ligth" exportName="color-frond-tones">
      {FRONDS.map((f, i) => {
        const x = i * 240;
        const T = FROND_TONES[f.tone];
        return (
          <g key={f.tone}>
            <clipPath id={`color-frond-clip-${i}`}>
              <rect x={x} y="0" width={W} height={H} />
            </clipPath>
            <rect x={x} y="0" width={W} height={H} fill={f.ground} />
            <g clipPath={`url(#color-frond-clip-${i})`}>
              <FrondG cx={x - 40} cy={H + 30} r={190} a0={-80} a1={20} count={20} len={150} width={7} tone={f.tone} fan />
            </g>
            <rect x={x} y={H + 14} width="18" height="18" fill={T.a} />
            <rect x={x + 22} y={H + 14} width="18" height="18" fill={T.b} />
            <text x={x + 50} y={H + 28} fontSize="13" fontWeight="700" fill={HEX.navy}>{f.name}</text>
            <text x={x} y={H + 54} fontSize="12" fill={HEX.muted}>{T.a}</text>
            <text x={x + 92} y={H + 54} fontSize="12" fill={HEX.muted}>{T.b}</text>
          </g>
        );
      })}
    </Art>
  );
}
