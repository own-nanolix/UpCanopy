'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { LockupG } from '@/components/art/Mark';
import { Placeholder } from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import { HEX, DOCUMENT } from '@/lib/brand';
import { range } from '@/lib/site';
import d from './desk.module.css';

const MAX = 8;
const LEN = [58, 34, 72, 46, 64, 40, 80, 52];
const SIG = DOCUMENT.labels[3];

// The sheet, redrawn from the builder's lines: every line is a pair of quiet bars.
function SheetArt({ lines }) {
  const [acct, detail, total] = DOCUMENT.invoice;
  const base = 262;
  const end = base + Math.max(lines.length, 1) * 30;
  return (
    <Art viewBox={`0 0 600 ${end + 140}`} title={`Invoice builder sheet with ${lines.length} lines`} exportName="lp-financeiro-invoice-builder">
      <rect x="18" y="18" width="560" height={end + 100} fill="#8FC9B5" opacity="0.45" />
      <rect x="0" y="0" width="560" height={end + 100} fill={HEX.white} />
      <LockupG x={290} y={38} scale={0.57} fill={HEX.navy} markFill={HEX.green} />
      <rect x="40" y="118" width="480" height="4" fill={HEX.navy} />
      <text x="40" y="160" fontSize="13" fontWeight="700" fill={HEX.navy}>{acct}</text>
      <rect x="40" y="172" width="230" height="14" fill={HEX.gray} />
      <text x="300" y="160" fontSize="13" fontWeight="700" fill={HEX.navy}>{detail}</text>
      <rect x="300" y="172" width="220" height="14" fill={HEX.gray} />
      <rect x="40" y="214" width="480" height="2" fill={HEX.navy} />
      {lines.map((l, i) => (
        <g key={l.id}>
          <rect x="40" y={base + i * 30} width={r(l.a * 2.4)} height="10" fill={HEX.gray} />
          <rect x={520 - r(l.b * 1.4)} y={base + i * 30} width={r(l.b * 1.4)} height="10" fill={HEX.navy} opacity="0.55" />
        </g>
      ))}
      <rect x="40" y={end + 8} width="480" height="4" fill={HEX.navy} />
      <text x="40" y={end + 56} fontSize="22" fontWeight="700" fill={HEX.navy}>{total}</text>
      <rect x="300" y={end + 36} width="220" height="24" fill={HEX.green} />
      <text x="40" y={end + 100} fontSize="13" fontWeight="700" fill={HEX.navy}>{SIG}</text>
      <rect x="40" y={end + 112} width="170" height="2" fill={HEX.navy} />
    </Art>
  );
}
const r = (n) => Math.round(n);

// The invoice builder: lines can be added and removed; the sheet beside it follows.
export default function InvoiceBuilder() {
  const [lines, setLines] = useState(() => range(3, (i) => ({ id: i, a: LEN[i], b: LEN[i + 3] })));
  const [next, setNext] = useState(3);

  const add = () => {
    if (lines.length >= MAX) return;
    setLines((l) => [...l, { id: next, a: LEN[next % LEN.length], b: LEN[(next + 3) % LEN.length] }]);
    setNext((n) => n + 1);
  };
  const remove = (id) => setLines((l) => l.filter((x) => x.id !== id));

  return (
    <div className={d.builder}>
      <div className={`card ${d.form}`}>
        <div className={d.formHead}>
          <h3 className="t-caps-lg">Lines</h3>
          <Chip size="sm" role="status">{lines.length} / {MAX}</Chip>
        </div>
        <dl className={d.facts}>
          <div><dt>{DOCUMENT.invoice[0]}</dt><dd><Placeholder width={9} /></dd></div>
          <div><dt>{DOCUMENT.invoice[1]}</dt><dd><Placeholder width={12} /></dd></div>
        </dl>
        <ul className={d.invLines} aria-label="Invoice lines">
          {lines.map((l, i) => (
            <li key={l.id} className={d.invLine}>
              <span className={d.invNo} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className={d.invBar}><span style={{ width: `${l.a}%` }} /></span>
              <span className={d.invBarEnd}><span style={{ width: `${l.b}%` }} /></span>
              <button type="button" className={d.remove} onClick={() => remove(l.id)} aria-label={`Remove line ${i + 1}`}>
                <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M4 4 16 16M16 4 4 16" stroke="currentColor" strokeWidth="3" fill="none" /></svg>
              </button>
            </li>
          ))}
        </ul>
        {lines.length === 0 && <p className="t-small" role="status">No lines yet.</p>}
        <div className={d.invTotal}>
          <span>{DOCUMENT.invoice[2]}</span>
          <Placeholder width={7} />
        </div>
        <div className={d.invTotal}>
          <span>{SIG}</span>
          <span className={d.sigLine} aria-hidden="true" />
        </div>
        <button type="button" className="btn btn-block" onClick={add} disabled={lines.length >= MAX}>Add line</button>
      </div>
      <div className={d.sheet}>
        <SheetArt lines={lines} />
      </div>
    </div>
  );
}
