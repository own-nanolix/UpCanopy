import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { DOCUMENT, HEX } from '@/lib/brand';
import { seeded } from '@/lib/charts';
import { range } from '@/lib/site';

// The ledger drawn as a sheet: square boxes, two quiet bars per row, the running bar below.
export function LedgerSheetArt() {
  const rnd = seeded(12);
  const rows = range(9, (i) => ({ y: 120 + i * 36, a: 60 + Math.round(rnd() * 150), b: 40 + Math.round(rnd() * 90), on: i === 1 || i === 4 || i === 5 }));
  return (
    <Art viewBox="0 0 400 520" title="Ledger sheet with ticked rows" exportName="lp-financeiro-ledger-sheet">
      <rect width="400" height="520" fill={HEX.white} />
      <rect x="0" y="0" width="400" height="12" fill={HEX.navy} />
      <MarkG x={28} y={28} size={34} fill={HEX.green} />
      <text x="372" y="62" fontSize="12" fontWeight="700" textAnchor="end" fill={HEX.navy}>{DOCUMENT.invoice[1]}</text>
      <rect x="28" y="92" width="344" height="4" fill={HEX.navy} />
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="28" y={r.y} width="20" height="20" fill={r.on ? HEX.green : HEX.white} stroke={HEX.navy} strokeWidth="3" />
          {r.on && <rect x="33" y={r.y + 5} width="10" height="10" fill={HEX.navy} />}
          <rect x="64" y={r.y + 4} width={r.a} height="12" fill={r.on ? HEX.navy : HEX.gray} className="grow-x" style={{ '--i': i }} />
          <rect x={372 - r.b} y={r.y + 4} width={r.b} height="12" fill={HEX.gray} className="grow-x" style={{ '--i': i }} />
        </g>
      ))}
      <rect x="28" y="452" width="344" height="4" fill={HEX.navy} />
      <text x="28" y="488" fontSize="14" fontWeight="700" fill={HEX.navy}>{DOCUMENT.invoice[2]}</text>
      <rect x="200" y="470" width="172" height="22" fill={HEX.green} className="grow-x" />
    </Art>
  );
}

// The slides' habit: a row of ten, one of them green. Here it counts rows, three of ten locked in.
export function RowsStripArt() {
  return (
    <Art viewBox="0 0 400 140" title="Ten rows, one locked in" exportName="lp-financeiro-rows-strip">
      <rect width="400" height="140" fill={HEX.slide} />
      {range(10, (i) => (
        <rect key={i} x={20 + i * 36} y="36" width="28" height="68" fill={i === 0 ? HEX.green : HEX.gray} className="rise" style={{ '--i': i }} />
      ))}
      <rect x="20" y="112" width="360" height="4" fill={HEX.navy} />
    </Art>
  );
}
