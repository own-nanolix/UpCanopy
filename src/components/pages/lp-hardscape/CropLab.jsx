'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { MarkG, MarkCropG } from '@/components/art/Mark';
import { BrandDefs } from '@/components/art/KeyArt';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Segmented } from '@/components/ui/Toggle';
import { Line } from '@/components/ui/Card';
import s from './lp-hardscape.module.css';

// Two crops of the same mark. "Hero" is the crop behind the line at the top of this page; "Folder" is the
// closed folder cover (m08), where the arch fills the panel. The numbers are the crop parameters, measured
// on the plate, not facts from the case study.
const CROPS = {
  Hero: { zoom: 1.55, dx: -0.22, dy: -0.12 },
  Folder: { zoom: 1.9, dx: -0.42, dy: -0.2 },
};
const NAMES = Object.keys(CROPS);
const PW = 420;
const PH = 560;

function Plate({ crop }) {
  const { zoom, dx, dy } = crop;
  const size = PW * zoom;
  const ox = r2(PW * dx);
  const oy = r2(PH * dy);
  const ticks = [0.25, 0.5, 0.75];
  return (
    <Art viewBox="0 0 900 700" title="The mark crop measured on a folder-cover panel" exportName="lp-hardscape-crop-measure">
      <BrandDefs idp="lp-hardscape-measure" />
      <rect width="900" height="700" fill={HEX.navyDeep} />
      <g transform="translate(60 70)">
        <rect width={PW} height={PH} fill="url(#lp-hardscape-measure-rise)" filter="url(#lp-hardscape-measure-grain)" />
        <MarkCropG idp="lp-hardscape-measure" w={PW} h={PH} zoom={zoom} dx={dx} dy={dy} fill={HEX.navy} />
        {/* the whole mark, ghosted, to show what the panel cuts away */}
        <g opacity="0.35">
          <MarkG x={ox} y={oy} size={r2(size)} fill="none" stroke={HEX.mint} strokeWidth="1.5" strokeDasharray="6 6" />
        </g>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={r2(PW * t)} y1="0" x2={r2(PW * t)} y2="14" stroke={HEX.mint} strokeWidth="2" />
            <line x1="0" y1={r2(PH * t)} x2="14" y2={r2(PH * t)} stroke={HEX.mint} strokeWidth="2" />
          </g>
        ))}
        <rect width={PW} height={PH} fill="none" stroke={HEX.green} strokeWidth="3" />
      </g>
      {/* dimension lines */}
      <g stroke={HEX.green} strokeWidth="2" fill="none">
        <path d={`M60 ${PH + 110}H${60 + PW}M60 ${PH + 100}v20M${60 + PW} ${PH + 100}v20`} />
        <path d={`M${PW + 90} 70V${70 + PH}M${PW + 80} 70h20M${PW + 80} ${70 + PH}h20`} />
        <path d={`M${60 + PW + 140} ${PH + 110}h${r2(size * 0.62)}`} className="draw" style={{ '--len': 400 }} />
      </g>
      <g fill={HEX.mint} className="wide" style={{ fontFamily: 'var(--font-wide)' }} fontSize="15" letterSpacing="1.2">
        <text x="60" y={PH + 144}>PANEL WIDTH = 1</text>
        <text x={PW + 112} y="90">PANEL HEIGHT</text>
        <text x={PW + 200} y={PH + 144}>{`MARK WIDTH = ${zoom}`}</text>
      </g>
      {/* the arch and the line, small, as the designer sets it on the page beside the panel */}
      <g transform={`translate(${PW + 200} 180)`}>
        <MarkG size="86" fill={HEX.green} />
        <g fill={HEX.mint} fontSize="26" fontWeight="300">
          {LINES.ceo.rows.map((row, i) => (
            <text key={row} x="0" y={150 + i * 40}>
              {row.split(/(CEO|Hardscape)/).map((p, k) => (p === 'CEO' || p === 'Hardscape' ? <tspan key={k} fontWeight="800" fill={HEX.white}>{p}</tspan> : p))}
            </text>
          ))}
        </g>
      </g>
      <g fill={HEX.navyMuted} fontSize="14" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>
        <text x="60" y="40">{`OFFSET X ${dx}   OFFSET Y ${dy}`}</text>
      </g>
    </Art>
  );
}

export default function CropLab() {
  const [name, setName] = useState(NAMES[0]);
  return (
    <div className={s.lab}>
      <div className={s.labBar}>
        <Segmented id="lp-hardscape-crop" label="Crop" options={NAMES} value={name} onChange={setName} />
        <p className="t-small on-navy" aria-live="polite">{name === 'Hero' ? 'The crop behind the line above.' : 'The crop on the closed folder.'}</p>
      </div>
      <div className={s.labPlate}><Plate crop={CROPS[name]} /></div>
      <p className={s.labLine} lang="pt-BR">
        {LINES.ceo.rows.map((row) => (
          <span key={row} className={s.labRow}><Line text={row} strong={LINES.ceo.strong} className="strong" /></span>
        ))}
      </p>
    </div>
  );
}
