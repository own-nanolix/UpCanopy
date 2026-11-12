'use client';

import { useState } from 'react';
import Art from '@/components/art/Art';
import { MarkG, MarkCropG, WordmarkG } from '@/components/art/Mark';
import { BrandDefs } from '@/components/art/KeyArt';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { Segmented } from '@/components/ui/Toggle';
import { Line } from '@/components/ui/Card';
import { CROPS } from './HardArt';
import s from './lp-hardscape.module.css';

const NAMES = Object.keys(CROPS);

function Plate({ crop }) {
  const { zoom, dx, dy, pw: PW, ph: PH, ground } = crop;
  const size = PW * zoom;
  const ticks = [0.25, 0.5, 0.75];
  const folder = ground === 'green';
  const VW = PW + 340;
  return (
    <Art viewBox={`0 0 ${VW} 760`} title="The mark crop measured on its panel" exportName="lp-hardscape-crop-measure">
      <BrandDefs idp="lp-hardscape-measure" />
      <rect width={VW} height="760" fill={HEX.navyDeep} />
      <g transform="translate(60 70)">
        <rect width={PW} height={PH} fill={`url(#lp-hardscape-measure-${ground})`} filter="url(#lp-hardscape-measure-grain)" />
        <MarkCropG idp="lp-hardscape-measure" w={PW} h={PH} zoom={zoom} dx={dx} dy={dy} fill={HEX.navy} />
        {folder && (
          <g transform={`translate(${PW - 26} 34) rotate(90)`}>
            <WordmarkG x={0} y={0} size={22} fill={HEX.white} />
          </g>
        )}
        {/* the whole mark, ghosted, to show what the panel cuts away */}
        <g opacity="0.35">
          <MarkG x={r2(PW * dx)} y={r2(PH * dy)} size={r2(size)} fill="none" stroke={HEX.mint} strokeWidth="1.5" strokeDasharray="6 6" />
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
        <path d={`M60 ${PH + 100}H${60 + PW}M60 ${PH + 90}v20M${60 + PW} ${PH + 90}v20`} />
        <path d={`M${PW + 90} 70V${70 + PH}M${PW + 80} 70h20M${PW + 80} ${70 + PH}h20`} />
      </g>
      <g fill={HEX.mint} className="wide" style={{ fontFamily: 'var(--font-wide)' }} fontSize="15" letterSpacing="1.2">
        <text x="60" y={PH + 134}>PANEL WIDTH = 1</text>
        <text x="60" y={PH + 162}>{`MARK WIDTH = ${zoom} × PANEL WIDTH`}</text>
        <text x={PW + 112} y="90">{`PANEL HEIGHT = ${r2(PH / PW)}`}</text>
      </g>
      <g fill={HEX.navyMuted} fontSize="14" className="wide" style={{ fontFamily: 'var(--font-wide)' }}>
        <text x="60" y="40">{`OFFSET X ${dx} × WIDTH`}</text>
        <text x="60" y="58">{`OFFSET Y ${dy} × HEIGHT`}</text>
      </g>
    </Art>
  );
}

export default function CropLab() {
  const [name, setName] = useState(NAMES[1]);
  return (
    <div className={s.lab}>
      <div className={s.labBar}>
        <Segmented id="lp-hardscape-crop" label="Crop" options={NAMES} value={name} onChange={setName} />
        <p className="t-small on-navy" aria-live="polite">{name === 'Hero' ? 'The crop behind the line at the top of this page.' : 'The crop on the closed folder cover.'}</p>
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
