'use client';

import { useState } from 'react';
import { LINES } from '@/lib/brand';
import { Segmented } from '@/components/ui/Toggle';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import s from './lp-manifesto.module.css';

const VIEWS = ['Poster', 'Guides'];
const ROWS = LINES.bridge.rows4;
const W = 900;
const H = 1200;
const EDGE = 64;
const FS = 56;
const LEAD = 76;
const TOP = 150;

// The hero measured against the poster: the line right-aligned, the pale frond down the left edge, the mark in
// the lower left corner. A switch lays the guides over the artwork so the proportions can be read.
export default function Measure() {
  const [view, setView] = useState(VIEWS[0]);
  const guides = view === VIEWS[1];
  return (
    <div className={s.measureGrid}>
      <div className={s.measureText}>
        <p className="t-label on-navy">Poster, measured</p>
        <h2 id="lp-manifesto-measure-h" className="t-caps-lg" style={{ marginTop: 12 }}>
          The line, the frond, the mark
        </h2>
        <ul className={s.measureList}>
          <li>Line, right-aligned in four rows</li>
          <li>Frond, entering from the left edge</li>
          <li>Mark, in the lower left corner</li>
        </ul>
        <div style={{ marginTop: 28 }}>
          <Segmented id="lp-manifesto-measure-view" label="View" options={VIEWS} value={view} onChange={setView} />
        </div>
        <p className="t-small on-navy" style={{ marginTop: 12 }}>Guides marks the margins and the rows.</p>
      </div>
      <div className={s.measureStage} data-guides={guides ? 'on' : 'off'}>
        <Art viewBox={`0 0 ${W} ${H}`} title="Poster composition: the bridge line right-aligned, pale frond on the left, mark in the corner" exportName="lp-manifesto-poster-measure">
          <BrandDefs idp="lp-manifesto-ms" />
          <rect width={W} height={H} fill="#052E25" />
          <rect width={W} height={H} fill="url(#lp-manifesto-ms-rise-dark)" opacity="0.55" filter="url(#lp-manifesto-ms-grain)" />
          <FrondG cx={-330} cy={720} r={470} a0={-52} a1={58} count={40} len={360} width={10} lean={14} tone="onDark" fan />
          <MarkG x={EDGE} y={H - EDGE - 100} size={96} fill="#26CF7B" />
          <text textAnchor="end" fontSize={FS} fontWeight="300" fill="#F2FFE4" lang="pt-BR">
            {ROWS.map((row, k) => {
              const last = k === ROWS.length - 1;
              return (
                <tspan key={row} x={W - EDGE} y={TOP + k * LEAD} fontWeight={last ? 700 : 300} fill={last ? '#26CF7B' : '#F2FFE4'}>
                  {row}
                </tspan>
              );
            })}
          </text>
          <g className={s.guideLayer} fill="none" stroke="#26CF7B" strokeWidth="2" strokeDasharray="10 8">
            <path d={`M${W - EDGE} 40V${H - 40}`} />
            <path d={`M${EDGE} 40V${H - 40}`} />
            {ROWS.map((row, k) => (
              <path key={row} d={`M40 ${TOP + k * LEAD}H${W - 40}`} strokeWidth="1" />
            ))}
            <rect x={EDGE} y={H - EDGE - 100} width="96" height="96" />
          </g>
        </Art>
      </div>
    </div>
  );
}
