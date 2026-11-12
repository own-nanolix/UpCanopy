// Flat artwork of the printed pieces, drawn once and used both on the print-artwork sheets and on the mockups.
// Every group sits in its own local space starting at 0, 0.
import { MarkG, WordmarkG, LockupG, WordmarkVerticalG } from '@/components/art/Mark';
import { BrandDefs } from '@/components/art/KeyArt';
import { seeded, r2 } from '@/lib/charts';
import { CONTACT, PEOPLE, DOCUMENT } from '@/lib/brand';
import { C, Lines } from './parts';

export const CARD = { w: 350, h: 200 };
export const LETTER = { w: 400, h: 566 };
export const ENVELOPE = { w: 560, h: 300 };

// Business card, front: navy with the Green Park mark.
export function CardFrontMarkG() {
  return (
    <g>
      <rect width={CARD.w} height={CARD.h} fill={C.navy} />
      <MarkG x={125} y={50} size={100} fill={C.green} />
    </g>
  );
}

// Business card, front: navy with the horizontal lockup.
export function CardFrontLockupG() {
  return (
    <g>
      <rect width={CARD.w} height={CARD.h} fill={C.navy} />
      <LockupG x={47} y={80} scale={0.7} fill={C.white} />
    </g>
  );
}

// Business card, back: Green Park with small dark text exactly as printed.
export function CardBackG() {
  return (
    <g>
      <rect width={CARD.w} height={CARD.h} fill={C.green} />
      <text x="24" y="38" fontSize="9.5" fontWeight="700" fill={C.navy}>{PEOPLE.founder.name}</text>
      <text x="24" y="50" fontSize="7.5" fontWeight="400" fill={C.navy}>{PEOPLE.founder.role}</text>
      <Lines rows={[CONTACT.handle, CONTACT.phone, CONTACT.hello]} x={24} y={84} size={8} lh={1.45} fill={C.navy} />
      <Lines rows={['HERO Studio,', 'NY, New York 3875']} x={24} y={130} size={8} lh={1.45} fill={C.navy} />
      <text x="24" y="172" fontSize="8" fontWeight="700" fill={C.navy}>{CONTACT.webCased}</text>
      <WordmarkG x={CARD.w - 22} y={36} size={14} fill={C.navy} anchor="end" weight={400} />
    </g>
  );
}

// Letterhead: mint-to-white sheet, the giant navy word-mark up the left edge, the mark top right, quiet body
// lines (the body copy is illegible in the source, so it is never written) and the footer.
export function LetterG({ idp }) {
  const { w, h } = LETTER;
  const rnd = seeded(7);
  const rows = Array.from({ length: 27 }, (_, i) => ({ y: 150 + i * 11.2, len: i % 9 === 8 ? 0.55 : 0.86 + rnd() * 0.14 }));
  return (
    <g>
      <linearGradient id={`${idp}-sheet`} x1="0.1" y1="1" x2="0.5" y2="0">
        <stop offset="0" stopColor="#35D58C" />
        <stop offset="0.35" stopColor="#9CEAC6" />
        <stop offset="0.7" stopColor="#E6F6EE" />
        <stop offset="1" stopColor="#F6F7F4" />
      </linearGradient>
      <rect width={w} height={h} fill={`url(#${idp}-sheet)`} />
      {/* the word set vertically, reading top to bottom with the letter tops towards the text, as on m12 / m28 */}
      <g transform={`translate(${r2(14 + 84 * 0.97)} 22) rotate(90)`}><WordmarkG x={0} y={r2(84 * 0.76)} size={84} fill={C.navy} /></g>
      <MarkG x={w - 62} y={22} size={32} fill={C.green} />
      <text x="118" y="68" fontSize="11" fontWeight="400" fill={C.navy}>{DOCUMENT.title}</text>
      <text x="118" y="84" fontSize="8.5" fontWeight="400" fill={C.navy} opacity="0.8">{DOCUMENT.address}</text>
      <path d={`M118 104H${w - 28}`} stroke={C.navy} strokeWidth="0.8" />
      {rows.map((r, i) => <rect key={i} x="118" y={r2(r.y)} width={r2((w - 146) * r.len)} height="3" fill={C.navy} opacity="0.2" />)}
      <path d={`M118 ${h - 74}H${w - 28}`} stroke={C.navy} strokeWidth="0.8" />
      <text x={w - 28} y={h - 52} fontSize="10" fontWeight="700" fill={C.navy} textAnchor="end">{DOCUMENT.labels[0]}</text>
      <Lines rows={[DOCUMENT.labels[1], DOCUMENT.labels[2]]} x={w - 28} y={h - 36} size={8} lh={1.5} fill={C.navy} anchor="end" />
      <Lines rows={[CONTACT.phone, CONTACT.sac]} x={w - 84} y={h - 44} size={8} lh={1.5} fill={C.navy} anchor="end" />
    </g>
  );
}

// Envelope, front: navy with the flap, the mark and the contacts.
export function EnvelopeG({ idp }) {
  const { w, h } = ENVELOPE;
  return (
    <g>
      <linearGradient id={`${idp}-flap`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#24357A" />
        <stop offset="1" stopColor="#162557" />
      </linearGradient>
      <rect width={w} height={h} fill="#1A2A6E" />
      <path d={`M0 0H${w}L${w / 2} 150Z`} fill={`url(#${idp}-flap)`} />
      <path d={`M0 0L${w / 2} 150L${w} 0`} fill="none" stroke="#0B1540" strokeWidth="2" />
      <path d={`M0 ${h}L${w * 0.36} ${h * 0.52}M${w} ${h}L${w * 0.64} ${h * 0.52}`} stroke="#0B1540" strokeWidth="1.2" opacity="0.5" />
      <MarkG x={26} y={176} size={34} fill={C.green} />
      <WordmarkG x={68} y={204} size={22} fill={C.white} weight={400} />
      <Lines rows={[CONTACT.phone, CONTACT.web]} x={w - 28} y={h - 46} size={13} lh={1.4} fill={C.white} anchor="end" />
    </g>
  );
}

// A shared defs wrapper for the print-artwork sheets.
export function ArtDefs({ idp }) {
  return <BrandDefs idp={idp} />;
}
