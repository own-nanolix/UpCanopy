'use client';

import { useState } from 'react';
import { CONTACT, HEX, LINES } from '@/lib/brand';
import { Segmented } from '@/components/ui/Toggle';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import s from './lp-manifesto.module.css';

const VIEWS = ['Poster', 'Guides'];
const ROWS = LINES.bridge.rows4;
// Measured on the poster (m06), as fractions of the sheet (404 x 574 px in the photograph, about 1 : 1.42):
// right margin 0.106 W, first row at 0.132 H, rows 0.052 H apart, type about 0.039 H; mark 0.14 W wide, 0.07 W from
// the left edge, its foot 0.078 H above the bottom; contact lines at 0.875 H and 0.9 H, right-aligned.
const W = 900;
const H = 1280;
const EDGE = 63;
const RIGHT = W - 95;
const FS = 50;
const LEAD = 67;
const TOP = 169;
const MARK = 126;
const MARK_Y = Math.round(H * 0.922 - MARK * 0.941);

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
          <li>Contacts, small, lower right</li>
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
          <rect width={W} height={H} fill={HEX.greenDark} filter="url(#lp-manifesto-ms-grain)" />
          <FrondG cx={-1400} cy={900} r={1350} a0={-27} a1={30} count={40} len={590} width={10} lean={20} tone="onDark" fan />
          <MarkG x={EDGE} y={MARK_Y} size={MARK} fill={HEX.green} />
          <text textAnchor="end" fontSize={FS} fontWeight="300" fill={HEX.mint} lang="pt-BR">
            {ROWS.map((row, k) => {
              const last = k === ROWS.length - 1;
              return (
                <tspan key={row} x={RIGHT} y={TOP + k * LEAD} fontWeight={last ? 700 : 300} fill={last ? HEX.green : HEX.mint}>
                  {row}
                </tspan>
              );
            })}
          </text>
          <g fill={HEX.mint} fontSize="24" textAnchor="end">
            <text x={RIGHT} y={Math.round(H * 0.875)}>{CONTACT.phone}</text>
            <text x={RIGHT} y={Math.round(H * 0.9)}>{CONTACT.web}</text>
          </g>
          <g className={s.guideLayer} fill="none" stroke={HEX.green} strokeWidth="2" strokeDasharray="10 8">
            <path d={`M${RIGHT} 40V${H - 40}`} />
            <path d={`M${EDGE} 40V${H - 40}`} />
            {ROWS.map((row, k) => (
              <path key={row} d={`M40 ${TOP + k * LEAD}H${W - 40}`} strokeWidth="1" />
            ))}
            <rect x={EDGE} y={MARK_Y} width={MARK} height={MARK} />
            <path d={`M40 ${Math.round(H * 0.922)}H${W - 40}`} strokeWidth="1" />
          </g>
        </Art>
      </div>
    </div>
  );
}
