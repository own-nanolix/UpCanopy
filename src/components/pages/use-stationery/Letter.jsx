// Letterhead and envelope: the envelope under the letter, both rotated about 20 degrees, stepping down-right
// on the studio sweep (references m12 and m28). One SVG.
import Art from '@/components/art/Art';
import { SweepG, MaterialDefs, CastG } from '@/components/art/Mockup';
import { ID, rotRect } from './parts';
import { LetterG, EnvelopeG, LETTER, ENVELOPE } from './Artwork';

const P = `${ID}-lt`;
const ROT = 20;

// A top-view sheet piece: hard shadow lower right, paper edges under it, the artwork, a lit edge.
function Piece({ i, x, y, w, h, scale, rot, len, edges = 3, children, edgeFill = '#E3EBE5' }) {
  const W = w * scale, H = h * scale;
  return (
    <g className="mock-step" style={{ '--i': i }}>
      <CastG d={rotRect(x, y, W, H, rot)} depth={len} />
      {Array.from({ length: edges }, (_, k) => {
        const o = (edges - k) * 1.5;
        return <g key={k} transform={`translate(${x + o * 0.64} ${y + o * 0.77}) rotate(${rot})`}><rect width={W} height={H} fill={k % 2 ? '#CBD6CD' : edgeFill} /></g>;
      })}
      <g transform={`translate(${x} ${y}) rotate(${rot})`}>
        <g transform={`scale(${scale})`} filter={`url(#${P}-paper)`}>{children}</g>
        <rect width={W} height={H} fill={`url(#${P}-shade-v)`} opacity="0.5" />
        <path d={`M0 ${H}V0H${W}`} fill="none" stroke="#FFFFFF" strokeWidth="1.6" opacity="0.65" />
      </g>
    </g>
  );
}

export default function Letter() {
  return (
    <Art viewBox="0 0 1200 900" title="Letterhead on a navy envelope, both turned about 20 degrees, stepping down and to the right" exportName={`${ID}-letterhead-envelope`}>
      <MaterialDefs idp={P} />
      <SweepG idp={P} w={1200} h={900} horizon={0.7} />
      <Piece i={0} x={70} y={-120} w={ENVELOPE.w} h={ENVELOPE.h} scale={1.2} rot={ROT} len={22} edges={2}>
        <EnvelopeG idp={`${P}-env`} />
      </Piece>
      <Piece i={1} x={560} y={110} w={LETTER.w} h={LETTER.h} scale={1.3} rot={ROT} len={30} edges={4}>
        <LetterG idp={`${P}-let`} />
      </Piece>
    </Art>
  );
}
