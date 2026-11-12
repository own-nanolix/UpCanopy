// Wristbands: four woven fabric bands and three silicone bands, each a diagonal stripe cropped at both ends.
import { MarkG, WordmarkG, DescriptorG } from '@/components/art/Mark';
import { FrondG } from '@/components/art/KeyArt';
import { StepG } from '@/components/art/Mockup';
import { C, Stage, Cast, Webbing, rrect } from './parts';

const LEN = 1100;
const range = (n) => Array.from({ length: n }, (_, i) => i);

export const FABRIC = [
  { name: 'band-fabric-navy', title: 'Woven wristband, navy with the mark', fill: C.navy, stitch: 'rgba(255,255,255,0.5)',
    art: () => range(9).map((k) => <MarkG key={k} x={50 + k * 130} y={22} size={48} fill="#FFFFFF" />) },
  { name: 'band-fabric-green', title: 'Woven wristband, Green Park with the word-mark', fill: C.green, stitch: 'rgba(22,37,87,0.55)',
    art: () => range(4).map((k) => <WordmarkG key={k} x={30 + k * 290} y={62} size={36} fill={C.navy} />) },
  { name: 'band-fabric-dark', title: 'Woven wristband, dark green with a frond fragment', fill: C.dark, stitch: 'rgba(223,247,230,0.45)',
    art: () => <FrondG cx={560} cy={330} r={250} a0={215} a1={325} count={30} len={110} width={6} lean={62} tone="onDark" /> },
  { name: 'band-fabric-mint', title: 'Woven wristband, mint with the descriptor', fill: C.mint, stitch: 'rgba(22,37,87,0.45)',
    art: () => range(3).map((k) => <DescriptorG key={k} x={24 + k * 370} y={57} size={20} fill={C.navy} />) },
];

const BAND_H = 100;

function FabricStrip({ idp, def, k }) {
  return (
    <Webbing id={`${idp}-w${k}`} idp={idp} len={LEN} h={BAND_H} fill={def.fill} stitch={def.stitch}>
      {def.art()}
    </Webbing>
  );
}

export function FabricBand({ index }) {
  const def = FABRIC[index];
  const idp = `use-event-${def.name}`;
  const other = FABRIC[(index + 1) % FABRIC.length];
  const a = -26;
  return (
    <Stage name={def.name} title={def.title}>
      <StepG i={0} x={0} y={0}>
        <Cast d={rrect(LEN, BAND_H)} x={-150 + 90} y={421 + 120} rot={-24} depth={10} opacity={0.18} />
        <g transform="translate(-60 541) rotate(-24)">
          <FabricStrip idp={idp} def={other} k="b" />
        </g>
      </StepG>
      <StepG i={1} x={0} y={0}>
        <Cast d={rrect(LEN, BAND_H)} x={-216} y={421} rot={a} depth={14} />
        <g transform={`translate(-216 421) rotate(${a})`}>
          <FabricStrip idp={idp} def={def} k="a" />
        </g>
      </StepG>
    </Stage>
  );
}

export const SILICONE = [
  { name: 'band-silicone-navy', title: 'Silicone wristband, navy', fill: '#1B2C68', hi: '#3A4C8E', lo: '#0A1233' },
  { name: 'band-silicone-green', title: 'Silicone wristband, Green Park', fill: '#26CF7B', hi: '#8BF0BC', lo: '#0B7E47' },
  { name: 'band-silicone-asphalt', title: 'Silicone wristband, asphalt', fill: '#2A2A28', hi: '#5C5C58', lo: '#0A0A09' },
];
const SH = 84;

function SiliconeStrip({ idp, def }) {
  const marks = range(4).map((k) => 20 + k * 290);
  return (
    <g>
      <rect y={SH - 4} width={LEN} height="14" fill={def.lo} />
      <rect y={SH - 4} width={LEN} height="14" fill="#000000" opacity="0.25" />
      <rect width={LEN} height={SH} fill={def.fill} />
      <rect width={LEN} height={SH} fill={`url(#${idp}-shade-v)`} />
      <rect y="5" width={LEN} height="2.5" fill="#FFFFFF" opacity="0.35" />
      <rect y={SH - 8} width={LEN} height="3" fill="#000000" opacity="0.3" />
      {marks.map((x) => (
        <g key={x} className="wide" fontSize="30" fontWeight="500" letterSpacing="-2" style={{ fontFamily: 'var(--font-wide)' }}>
          <text x={x - 1.2} y="54" fill={def.lo}>UpCanopy</text>
          <text x={x + 1.2} y="56" fill={def.hi} opacity="0.85">UpCanopy</text>
          <text x={x} y="55" fill={def.fill}>UpCanopy</text>
        </g>
      ))}
      <rect width={LEN} height={SH} fill={`url(#${idp}-glass)`} opacity="0.5" />
    </g>
  );
}

export function SiliconeBand({ index }) {
  const def = SILICONE[index];
  const idp = `use-event-${def.name}`;
  const other = SILICONE[(index + 1) % SILICONE.length];
  const d = `M0 0H${LEN}V${SH + 10}H0Z`;
  return (
    <Stage name={def.name} title={def.title}>
      <StepG i={0} x={0} y={0}>
        <Cast d={d} x={-30} y={500} rot={-24} depth={10} opacity={0.18} />
        <g transform="translate(-30 500) rotate(-24)">
          <SiliconeStrip idp={idp} def={other} />
        </g>
      </StepG>
      <StepG i={1} x={0} y={0}>
        <Cast d={d} x={-200} y={410} rot={-27} depth={14} />
        <g transform="translate(-200 410) rotate(-27)">
          <SiliconeStrip idp={idp} def={def} />
        </g>
      </StepG>
    </Stage>
  );
}
