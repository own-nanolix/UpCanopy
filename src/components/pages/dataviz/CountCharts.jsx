// Charts drawn from the counts that can be counted in the case study text.
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { ArrowG } from '@/components/art/KeyArt';
import { AREAS, PILLARS, SECTORS, PERSONALITY, SCALES, PALETTE, DIRECTION, MANIFESTO, MODES, HEX } from '@/lib/brand';
import { bandPath, stepPath } from '@/lib/charts';
import { INK, Lbl, Ph, tip, pad2 } from './kit';

export const COUNTS = [
  { label: 'PILLARS', n: PILLARS.length },
  { label: 'AREAS', n: AREAS.length },
  { label: 'SECTORS', n: SECTORS.length },
  { label: 'TRAITS', n: PERSONALITY.length },
  { label: 'SCALES', n: SCALES.length },
  { label: 'COLOURS', n: PALETTE.length },
  { label: 'WORDS', n: DIRECTION.words.length },
  { label: 'PARAGRAPHS', n: MANIFESTO.length },
];

// Chart 9: counts as square-block pictograms, one row per thing the text names.
export function CountPictogram() {
  return (
    <Art viewBox="0 0 320 240" title="Counts from the case study as square-block pictograms" exportName="dataviz-count-pictogram">
      {COUNTS.map((c, i) => {
        const y = 22 + 30 * i;
        return (
          <g key={c.label} {...tip(`${c.label.toLowerCase()}: ${c.n}`)}>
            <Lbl x="0" y={y} size={13}>{c.label}</Lbl>
            {Array.from({ length: c.n }, (_, j) => (
              <rect key={j} x={112 + j * 17} y={y - 12} width="13" height="13" fill={c.label === 'WORDS' && j === 3 ? HEX.green : HEX.navy} className="rise" style={{ '--i': j + i }} />
            ))}
            <Lbl x="320" y={y} size={15} weight={700} anchor="end">{c.n}</Lbl>
          </g>
        );
      })}
    </Art>
  );
}

// Chart 10: the ten paragraphs of the manifesto as a sequence, with its turning point at paragraph 4.
export function ManifestoStrip() {
  const size = 36;
  const x = (i) => Math.round(((440 - size) / 9) * i * 100) / 100;
  return (
    <Art viewBox="0 0 440 178" title="The ten manifesto paragraphs as a strip, with the turning point at paragraph 4" exportName="dataviz-manifesto-strip">
      <text x={x(3) + 18} y="40" textAnchor="middle" fontSize="20" fontWeight="700" fill={HEX.greenInk} lang="pt-BR">chega.</text>
      <rect x={x(3) + 17} y="48" width="2" height="22" fill={INK} />
      {MANIFESTO.map((_, i) => (
        <g key={i} {...tip(`Paragraph ${i + 1} of 10${i === 3 ? ': the turning point' : ''}`)}>
          <rect x={x(i)} y="70" width={size} height={size} fill={i === 3 ? HEX.green : HEX.navy} className="rise" style={{ '--i': i }} />
          <Lbl x={x(i) + 18} y="128" size={14} anchor="middle" fill={i === 3 ? HEX.greenInk : INK} weight={i === 3 ? 700 : 400} ls={0}>{pad2(i + 1)}</Lbl>
        </g>
      ))}
      <rect x="0" y="142" width="440" height="2" fill={INK} opacity="0.9" />
      <Lbl x={x(3) + 18} y="168" size={13} anchor="middle" ls={0.08}>TURNING POINT</Lbl>
      <Lbl x="440" y="168" size={13} anchor="end" ls={0.08}>PARAGRAPHS</Lbl>
    </Art>
  );
}

// Chart 11: the two modes as two thick bands in one arch, from sobrevivência to expansão.
export function ModesFlow() {
  return (
    <Art viewBox="0 0 320 240" title="Flow from the survival mode to the expansion mode as two thick bands" exportName="dataviz-modes-flow">
      <path d={bandPath(160, 206, 86, 130, -72, -3)} fill={HEX.navy} className="rise" style={{ '--i': 0 }} {...tip(`modo ${MODES[0]}`)} />
      <path d={bandPath(160, 206, 86, 130, 3, 72)} fill={HEX.green} className="rise" style={{ '--i': 4 }} {...tip(`modo ${MODES[1]}`)} />
      <Lbl x="6" y="190" size={15} weight={500} ls={0.02}>{MODES[0]}</Lbl>
      <Lbl x="314" y="190" size={15} weight={500} anchor="end" ls={0.02}>{MODES[1]}</Lbl>
      <rect x="6" y="206" width="308" height="2" fill={INK} opacity="0.9" />
      <ArrowG x="266" y="218" size={16} stroke={INK} strokeWidth={2} />
      <Lbl x="6" y="231" size={13} ls={0.1}>MODO</Lbl>
    </Art>
  );
}

// Chart 12: the three service areas, placed under the arch of the mark.
export function AreasPlace() {
  const w = 136;
  return (
    <Art viewBox="0 0 440 284" title="The three areas, CRM, Agenda and Financeiro, placed under the arch" exportName="dataviz-areas-place">
      <MarkG x={140} y={0} size={160} fill={HEX.navy} archClass="roof-arch" barClass="roof-bar" />
      {AREAS.map((a, i) => {
        const x = i * (w + 16), cx = x + w / 2;
        return (
          <g key={a}>
            <path d={stepPath([[220, 158], [220, 178], [cx, 178], [cx, 196]])} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="miter" className="draw" style={{ '--len': 400, '--i': i }} />
            <g className="rise" style={{ '--i': i * 2 }} {...tip(`Area ${i + 1} of 3: ${a}`)}>
              <rect x={x} y="196" width={w} height="84" fill={HEX.navy} />
              <Lbl x={x + 14} y="228" size={18} weight={500} fill="#FFFFFF" ls={0.01}>{a}</Lbl>
              <Ph x={x + 14} y={246} w={80} fill="#FFFFFF" op={0.3} />
              <Ph x={x + 14} y={260} w={52} fill="#FFFFFF" op={0.3} />
            </g>
          </g>
        );
      })}
    </Art>
  );
}
