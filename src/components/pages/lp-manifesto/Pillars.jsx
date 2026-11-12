import { HEX, MANIFESTO, PILLARS } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MARK_ARCH } from '@/components/art/Mark';
import s from './lp-manifesto.module.css';

// Bottom to top: the obsession is the foundation, the language the course above it, the promise the course that
// carries the roof. The fills follow the brand's three dark-to-bright grounds.
const COURSES = [
  { name: PILLARS[0], bg: HEX.greenDark, fg: HEX.mint, rule: HEX.green },
  { name: PILLARS[1], bg: HEX.green, fg: HEX.navy, rule: HEX.navy },
  { name: PILLARS[2], bg: HEX.navy, fg: HEX.white, rule: HEX.green },
];
const X = 60;
const BW = 480;
const BH = 100;
const GAP = 10;
const BASE = 540;

// The three pillars as three locked courses laid one on another, the arch of the mark set on top as the roof.
// Each course drops into place and locks after the one below it (CSS keyframes towards the finished artwork).
export default function Pillars() {
  return (
    <div className={s.pillarGrid}>
      <div className={s.pillarArt}>
        <Art viewBox="0 0 600 580" title="Organização, Disciplina and Confiança laid as three courses under the arch of the mark" exportName="lp-manifesto-pillars">
          <rect x="30" y={BASE + 6} width="540" height="16" fill={HEX.navy} />
          {COURSES.map((c, k) => {
            const y = BASE - (k + 1) * BH - k * GAP;
            return (
              <g key={c.name} className={`lock ${s.block}`} style={{ '--i': k * 4 }}>
                <rect x={X} y={y} width={BW} height={BH} fill={c.bg} />
                <rect x={X} y={y} width={BW} height="8" fill={c.rule} />
                <text x={X + 28} y={y + 66} fontSize="34" fontWeight="500" letterSpacing="-1.6" fill={c.fg} className="wide" lang="pt-BR">{c.name}</text>
                <text x={X + BW - 28} y={y + 64} fontSize="16" fontWeight="500" textAnchor="end" fill={c.fg} className="wide">{`0${k + 1}`}</text>
              </g>
            );
          })}
          <g className="lock" style={{ '--i': 14 }}>
            <g transform={`translate(120 ${BASE - 3 * BH - 2 * GAP - 244}) scale(3.6)`}>
              <path d={MARK_ARCH} fill={HEX.green} />
            </g>
          </g>
        </Art>
      </div>
      <div>
        <p lang="pt-BR" className="t-lead">{MANIFESTO[5]}</p>
        <ul className={s.pillarList} lang="pt-BR">
          {PILLARS.map((p) => (
            <li key={p} className="t-caps-lg">{p}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
