// The designer's slide language (references m03, m05, m07, m14, m10): five slides of 1600 x 900, light grey or
// white grounds, tiny bold caps in the corners, big squares, rows of ten dots with one green dot.
import Art from '@/components/art/Art';
import { LockupG, LockupStackG, MarkG } from '@/components/art/Mark';
import { ConstructionG, ScaleDotsG } from '@/components/art/KeyArt';
import { PALETTE, SCALES, DIRECTION, SHEET, DESCRIPTOR, BRAND } from '@/lib/brand';
import { ID, C } from './parts';

export const SLIDE = { w: 1600, h: 900 };
const FU = { fill: '#6B6F72', fontSize: 12.5 };
const CLIENT = `${SHEET[0][0].toUpperCase()}: ${SHEET[0][1].toUpperCase()}`;
const PROJECT = `${SHEET[1][0].toUpperCase()}: ${SHEET[1][1].toUpperCase()}`;

// Slide furniture: tiny caps in the four corners.
function Furniture({ n }) {
  return (
    <g {...FU}>
      <text x="27" y="52" fontWeight="700">APRESENTAÇÃO DO</text>
      <text x="27" y="66" fontWeight="700">PROJETO DE IDENTIDADE VISUAL</text>
      <text x="1075" y="52" fontWeight="400">{CLIENT}</text>
      <text x="1075" y="66" fontWeight="400">{PROJECT}</text>
      <text x="1573" y="52" fontWeight="400" textAnchor="end">→(0{n})</text>
      <text x="27" y="874" fontWeight="400">{BRAND.toUpperCase()}</text>
      <text x="1573" y="874" fontWeight="400" textAnchor="end">{DESCRIPTOR}</text>
    </g>
  );
}

// 1 and 2: a grey square and a navy square side by side, a lockup on each (m05, m14).
function LockupSlide({ n, stacked }) {
  return (
    <g>
      <rect width="1600" height="900" fill={C.white} />
      <rect x="40" y="83" width="762" height="707" fill={C.slide} />
      <rect x="824" y="83" width="762" height="707" fill={C.navy} />
      {stacked ? (
        <>
          <LockupStackG x={421 - 240 * 0.93} y={336} scale={0.93} fill={C.navy} />
          <LockupStackG x={1205 - 240 * 0.93} y={336} scale={0.93} fill={C.white} />
        </>
      ) : (
        <>
          <LockupG x={421 - 207} y={402} scale={1.15} fill={C.navy} />
          <LockupG x={1205 - 207} y={402} scale={1.15} fill={C.white} />
        </>
      )}
      <Furniture n={n} />
    </g>
  );
}

// 3: the palette, six swatches as printed (m07).
const SW = [[27, 27, 760, 410], [27, 463, 760, 410], [813, 27, 367, 410], [1207, 27, 367, 410], [813, 463, 367, 410], [1207, 463, 367, 410]];
function PaletteSlide() {
  const dark = (hex) => ['#162557', '#052E25', '#1D1D1B'].includes(hex);
  return (
    <g>
      <rect width="1600" height="900" fill={C.white} />
      {PALETTE.map((p, i) => {
        const [x, y, w, h] = SW[i];
        const ink = dark(p.hex) ? '#FFFFFF' : '#1D1D1B';
        return (
          <g key={p.name}>
            <rect x={x} y={y} width={w} height={h} rx="4" fill={p.hex} />
            <text x={x + 26} y={y + 37} fontSize="16" fontWeight="300" fill={ink}>{p.name}</text>
            <text x={x + 26} y={y + 50} fontSize="10" fontWeight="300" fill={ink} opacity="0.8">{p.hex.slice(1).toLowerCase()}</text>
            <text x={x + w - 26} y={y + 37} fontSize="16" fontWeight="300" fill={ink} textAnchor="end">{p.no}</text>
            <text x={x + w - 26} y={y + 50} fontSize="9.5" fontWeight="300" fill={ink} textAnchor="end">{p.role}</text>
          </g>
        );
      })}
    </g>
  );
}

// 4: the five scales of ten dots with the visual direction below (m03).
function ScalesSlide({ n }) {
  return (
    <g>
      <rect width="1600" height="900" fill={C.slide} />
      {SCALES.map((s, i) => {
        const y = 265 + i * 93.2;
        return (
          <g key={s.left}>
            <text x="345" y={y + 6} fontSize="18" fontWeight="300" fill={C.ink} textAnchor="end" letterSpacing="0.6">{s.left}</text>
            <ScaleDotsG x={410} y={y} w={804} r={21} chosen={s.chosen} off="#22272B" />
            <text x="1278" y={y + 6} fontSize="18" fontWeight="300" fill={C.ink} letterSpacing="0.6">{s.right}</text>
          </g>
        );
      })}
      <text x="696" y="781" fontSize="26" fontWeight="700" fill={C.ink} textAnchor="end">{DIRECTION.label}</text>
      <path d="M712 750V796" stroke="#BDBDBD" strokeWidth="1.2" />
      <text x="724" y="779" fontSize="26" fontWeight="700" fill={C.ink}>{DIRECTION.words.join(' • ')}</text>
      <Furniture n={n} />
    </g>
  );
}

// 5: the construction of the mark, dashed circles about three centres (m10).
function ConstructionSlide({ n, cid }) {
  return (
    <g>
      <clipPath id={cid}><rect width="1600" height="900" /></clipPath>
      <rect width="1600" height="900" fill={C.gray} />
      <g clipPath={`url(#${cid})`}>
        <ConstructionG x={590} y={240} size={420} rings={9} stroke="#4A4A4A" strokeWidth={0.3} />
        <MarkG x={590} y={240} size={420} fill="#A5A5A5" />
      </g>
      <Furniture n={n} />
    </g>
  );
}

export const SLIDES = [
  { id: 'lockup-stacked', title: 'Slide: the stacked lockup on grey and on navy', G: (p) => <LockupSlide {...p} stacked /> },
  { id: 'lockup-horizontal', title: 'Slide: the horizontal lockup on grey and on navy', G: (p) => <LockupSlide {...p} /> },
  { id: 'palette', title: 'Slide: the palette, six swatches', G: PaletteSlide },
  { id: 'scales', title: 'Slide: the five scales of ten dots', G: ScalesSlide },
  { id: 'construction', title: 'Slide: the construction of the mark', G: ConstructionSlide },
];

// The slide as a group (also used, scaled, in the fan behind the report).
export function SlideG({ k, cid }) {
  const S = SLIDES[k];
  return <S.G n={k + 1} cid={cid} />;
}

export function SlideArt({ k }) {
  const S = SLIDES[k];
  return (
    <Art viewBox="0 0 1600 900" title={S.title} exportName={`${ID}-slide-${S.id}`}>
      <S.G n={k + 1} cid={`${ID}-slide-clip`} />
    </Art>
  );
}

export const slideCount = SLIDES.length;
