'use client';

import { useState } from 'react';
import { Placeholder } from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import { DOCUMENT } from '@/lib/brand';
import { range } from '@/lib/site';
import { InvoiceArt } from './FinArt';
import d from './desk.module.css';

const MAX = 8;
const LEN = [58, 34, 72, 46, 64, 40, 80, 52];

// The invoice builder: lines can be added and removed; the sheet rebuilt from the case study (m01) follows.
// Every value is a quiet bar: the case study prints no amounts.
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
        <button type="button" className="btn btn-block" onClick={add} disabled={lines.length >= MAX}>Add line</button>
      </div>
      <div className={d.sheet}>
        <InvoiceArt lines={lines} />
      </div>
    </div>
  );
}
