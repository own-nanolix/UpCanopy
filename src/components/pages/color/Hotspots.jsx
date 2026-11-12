'use client';

import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';
import s from './color.module.css';

// Click-to-copy buttons laid exactly over the cells of an exportable sheet, so a value is copied from the
// artwork itself instead of from a second copy of it. Spots are in the sheet's viewBox units (vw x vh).
export default function Hotspots({ vw, vh, spots, children }) {
  const pct = (v, of) => `${(v / of) * 100}%`;
  const onCopy = async (value) => {
    const ok = await copy(value);
    toast(ok ? `Copied ${value}` : `Could not copy ${value}`);
  };
  return (
    <div className={s.hot}>
      {children}
      {spots.map((p) => (
        <button
          key={p.key}
          type="button"
          className={s.spot}
          style={{ left: pct(p.x, vw), top: pct(p.y, vh), width: pct(p.w, vw), height: pct(p.h, vh) }}
          onClick={() => onCopy(p.value)}
          aria-label={`Copy ${p.label}`}
          title={`Copy ${p.value}`}
        />
      ))}
    </div>
  );
}
