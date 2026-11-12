import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { UPPER, LOWER, DIGITS, MARKS, ACC_LOW, ACC_UP } from './type-data';

const WIDE = { fontFamily: 'var(--font-wide)' };
const CELL = 86;

// Rows of glyphs, 13 to a line. Accents are set in Green Park.
function rows() {
  const chunk = (a, n) => Array.from({ length: Math.ceil(a.length / n) }, (_, i) => a.slice(i * n, i * n + n));
  return [
    ...chunk(UPPER, 13).map((g) => ({ g })),
    ...chunk(LOWER, 13).map((g) => ({ g })),
    { g: DIGITS },
    { g: MARKS },
    { g: ACC_LOW, accent: true },
    { g: ACC_UP, accent: true },
  ];
}

function Sheet({ exportName, title, face, wide, weight }) {
  const R = rows();
  const H = 150 + R.length * 96 + 40;
  return (
    <Art viewBox={`0 0 1200 ${H}`} title={title} exportName={exportName}>
      <rect width="1200" height={H} fill={HEX.navy} />
      <text x="40" y="58" fontSize="12" fontWeight="500" letterSpacing="1.4" fill={HEX.green} className="wide" style={WIDE}>CHARACTER SET</text>
      <text x="40" y="108" fontSize="44" fontWeight={wide ? 500 : 700} fill={HEX.white} className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined} letterSpacing={wide ? -3 : 0}>{face}</text>
      <text x="1160" y="108" fontSize="16" fontWeight="400" textAnchor="end" fill={HEX.navyMuted}>Portuguese accents in green</text>
      {R.map((row, ri) => (
        <g key={ri} className="fade-in" style={{ '--i': ri * 2 }}>
          {row.g.map((ch, ci) => (
            <text key={ch + ci} x={60 + ci * CELL} y={186 + ri * 96} fontSize={wide ? 46 : 54} fontWeight={weight} textAnchor="middle"
              fill={row.accent ? HEX.green : HEX.white} className={wide ? 'wide' : undefined} style={wide ? WIDE : undefined}>{ch}</text>
          ))}
        </g>
      ))}
    </Art>
  );
}

export function CharsetText() {
  return <Sheet exportName="typography-charset-text" title="Character set of Red Hat Display, with the Portuguese accents" face="Red Hat Display" weight={400} />;
}
export function CharsetLogotype() {
  return <Sheet exportName="typography-charset-logotype" title="Character set of Lexend Exa, with the Portuguese accents" face="Lexend Exa" weight={500} wide />;
}
