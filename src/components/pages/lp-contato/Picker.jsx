'use client';

import { useState } from 'react';
import { CONTACT } from '@/lib/brand';
import Tabs from '@/components/ui/Tabs';
import Chip from '@/components/ui/Chip';
import CopyValue from '@/components/site/CopyValue';
import s from './lp-contato.module.css';

// Only details printed in the case study; "printed on" names the pieces where SOURCE.md shows each one.
const PICKS = [
  { id: 'phone', label: 'Phone', rows: [{ v: CONTACT.phone, n: 'telephone number', on: ['Business card', 'Envelope', 'Letterhead', 'Compliance letter', 'Folder', 'Poster'] }] },
  { id: 'email', label: 'E-mail', rows: [
    { v: CONTACT.sac, n: `e-mail address ${CONTACT.sac}`, on: ['Letterhead', 'Compliance letter'] },
    { v: CONTACT.hello, n: `e-mail address ${CONTACT.hello}`, on: ['Business card'] },
  ] },
  { id: 'web', label: 'Web', rows: [
    { v: CONTACT.web, n: 'web address', on: ['Envelope', 'Folder', 'Truck', 'Poster', 'Wall sign'] },
    { v: CONTACT.webCased, n: 'web address in brand casing', on: ['Business card'] },
  ] },
  { id: 'handle', label: 'Handle', rows: [{ v: CONTACT.handle, n: 'handle', on: ['Business card'] }] },
];

function Panel({ p }) {
  return (
    <div className={s.pickPanel}>
      {p.rows.map((r) => (
        <div key={r.v} className={s.pickItem}>
          <div className={s.pickRow}>
            <span className={`t-display ${s.pickValue}`}>{r.v}</span>
            <CopyValue value={r.v} label={r.n} className={s.pickCopy}>Copy</CopyValue>
          </div>
          <p className="t-caps">Printed on</p>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {r.on.map((x) => <Chip key={x} tone="navy" size="sm">{x}</Chip>)}
          </div>
        </div>
      ))}
    </div>
  );
}

// A channel picker: one tab per printed channel, arrow keys move between them, every value copies on click.
export default function Picker() {
  const [now, setNow] = useState(PICKS[0].id);
  return (
    <Tabs
      id="lp-contato-pick"
      label="Contact channel"
      value={now}
      onChange={setNow}
      tabs={PICKS.map((p) => ({ id: p.id, label: p.label, content: <Panel p={p} /> }))}
    />
  );
}
