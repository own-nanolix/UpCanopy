'use client';

import { useRef, useState } from 'react';
import { PALETTE, HEX } from '@/lib/brand';
import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';
import s from './color.module.css';

// The rail is the palette: six stacked bands sized by rank, each a button that copies its hex.
const INK = { green: HEX.navy, navy: HEX.white, 'green-dark': HEX.mint, asphalt: HEX.white, mint: HEX.navy, gray: HEX.navy };

export default function ColorRail() {
  const [done, setDone] = useState(-1);
  const timer = useRef(0);

  const onPick = async (i, c) => {
    const ok = await copy(c.hex);
    toast(ok ? `Copied ${c.hex}` : `Could not copy ${c.hex}`);
    setDone(i);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(-1), 1400);
  };

  return (
    <aside className={`split-rail ${s.rail}`} aria-label="Palette: click a band to copy its hex">
      <div className={s.bands}>
        {PALETTE.map((c, i) => (
          <button
            key={c.token}
            type="button"
            className={`${s.band} ${i < 2 ? s.bandStrong : ''}`}
            style={{ background: c.hex, color: INK[c.token], '--i': i }}
            onClick={() => onPick(i, c)}
            aria-label={`Copy ${c.name} hex ${c.hex}`}
          >
            <span>
              <span className={s.bandName}>{c.name}</span>
              <span className={`${s.bandHex} ${done === i ? s.bandCopy : ''}`}>{done === i ? 'Copied' : c.hex}</span>
            </span>
            <span>
              <span className={s.bandNo}>{c.no}</span>
              <span className={s.bandRole} lang="pt-BR">{c.role}</span>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
