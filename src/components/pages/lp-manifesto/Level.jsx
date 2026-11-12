'use client';

import { useState } from 'react';
import { LINES, MANIFESTO, MODES, HEX } from '@/lib/brand';
import { Segmented } from '@/components/ui/Toggle';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { ScaleDotsG } from '@/components/art/KeyArt';
import s from './lp-manifesto.module.css';

const REST = MANIFESTO[7].slice(LINES.level.length).trim();

// The two modes as a switch that lifts one block from a low to a high position.
export default function Level() {
  const [mode, setMode] = useState(MODES[0]);
  const high = mode === MODES[1];
  return (
    <div className={s.levelGrid}>
      <div className={s.levelText}>
        <h2 className="t-display" lang="pt-BR"><span className="strong">{LINES.level}</span></h2>
        <p lang="pt-BR" className="t-lead" style={{ marginTop: 20 }}>{REST}</p>
        <div style={{ marginTop: 28 }} lang="pt-BR">
          <Segmented id="lp-manifesto-mode" label="Mode" options={MODES} value={mode} onChange={setMode} />
        </div>
        <p className="t-small" style={{ marginTop: 12 }}>Switch the mode to lift the block.</p>
      </div>
      <div className={s.levelStage} data-mode={high ? 'high' : 'low'}>
        <Art viewBox="0 0 800 520" title="Two modes: the block lifts from survival to expansion" exportName="lp-manifesto-lift">
          <rect width="800" height="520" fill={HEX.mint} />
          <rect x="0" y="470" width="800" height="50" fill={HEX.navy} />
          {/* the two levels */}
          <rect x="60" y="400" width="340" height="14" fill={HEX.navy} />
          <rect x="400" y="140" width="340" height="14" fill={HEX.green} />
          <rect x="386" y="140" width="14" height="330" fill={HEX.navy} />
          <text x="76" y="436" fontSize="16" fontWeight="500" letterSpacing="1.2" fill={HEX.navy} className="wide" lang="pt-BR">{MODES[0].toUpperCase()}</text>
          <text x="416" y="126" fontSize="16" fontWeight="500" letterSpacing="1.2" fill={HEX.greenInk} className="wide" lang="pt-BR">{MODES[1].toUpperCase()}</text>
          {/* ten-dot scale climbing the right-hand level */}
          <ScaleDotsG x={430} y={182} w={280} r={9} chosen={high ? 10 : 1} off={HEX.navy} lock />
          {/* the block: low position is the finished state; the lift is a CSS move on the inner group */}
          <g transform="translate(150 280)">
            <g className={s.liftBlock}>
              <rect width="120" height="120" fill={high ? HEX.green : HEX.navy} className={s.liftFill} />
              <MarkG x={22} y={22} size={76} fill={high ? HEX.navy : HEX.green} />
            </g>
          </g>
        </Art>
      </div>
    </div>
  );
}
