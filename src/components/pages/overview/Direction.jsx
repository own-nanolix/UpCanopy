import Art from '@/components/art/Art';
import { ScaleDotsG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { SCALES, DIRECTION, PALETTE, HEX } from '@/lib/brand';
import s from './overview.module.css';

// The two published "data" sets of the case study, set as quick sheets: the five attribute scales (m03) and the
// six palette entries (m07). Both are exportable SVG; the dots lock in left to right, the chosen one is green.
const ROW = 92;

function ScalesSheet() {
  const h = 70 + SCALES.length * ROW;
  return (
    <Art viewBox={`0 0 1000 ${h}`} title="Five attribute scales of ten dots, one green dot each" exportName="overview-scales" className={s.sheetArt}>
      <rect width="1000" height={h} fill={HEX.slide} />
      <text x="36" y="40" fontSize="13" fontWeight="700" letterSpacing="1.4" fill={HEX.asphalt} lang="pt-BR">{DIRECTION.label}</text>
      {SCALES.map((sc, i) => {
        const y = 70 + i * ROW;
        return (
          <g key={sc.left}>
            <text x="36" y={y + 24} fontSize="14" letterSpacing="1.2" fill={HEX.asphalt} lang="pt-BR">{sc.left}</text>
            <text x="964" y={y + 24} fontSize="14" letterSpacing="1.2" fill={HEX.asphalt} textAnchor="end" lang="pt-BR">{sc.right}</text>
            <ScaleDotsG x={50} y={y + 56} w={900} r={13} chosen={sc.chosen} off={HEX.asphalt} on={HEX.green} lock style={{ '--row': i }} />
          </g>
        );
      })}
    </Art>
  );
}

function PaletteSheet() {
  const w = 1000 / PALETTE.length;
  return (
    <Art viewBox="0 0 1000 360" title="The six published colours with their printed names and hex values" exportName="overview-palette" className={s.sheetArt}>
      {PALETTE.map((c, i) => {
        const dark = ['navy', 'green-dark', 'asphalt'].includes(c.token);
        const ink = dark ? '#FFFFFF' : HEX.navy;
        return (
          <g key={c.name} transform={`translate(${i * w} 0)`}>
            <g className="rise" style={{ '--i': i }}>
              <rect width={w} height="360" fill={c.hex} stroke={c.token === 'mint' ? HEX.gray : 'none'} />
              <text x="14" y="30" fontSize="13" fontWeight="700" fill={ink}>{c.name}</text>
              <text x={w - 14} y="30" fontSize="13" fontWeight="700" fill={ink} textAnchor="end">{c.no}</text>
              <text x="14" y="318" fontSize="12" fontWeight="700" letterSpacing="1" fill={ink} lang="pt-BR">{c.role}</text>
              <text x="14" y="340" fontSize="14" fill={ink}>{c.hex}</text>
            </g>
          </g>
        );
      })}
    </Art>
  );
}

export default function Direction() {
  return (
    <div className={s.direction}>
      <Reveal className={s.dirCol}>
        <ScalesSheet />
        <p className={`t-caps ${s.dirCap}`} lang="pt-BR">{DIRECTION.words.join(' • ')}</p>
      </Reveal>
      <Reveal delay={120} className={s.dirCol}>
        <PaletteSheet />
        <p className={`t-small ${s.dirCap}`}>Names and spellings as printed on the colour slide.</p>
      </Reveal>
    </div>
  );
}
