import { MANIFESTO, PILLARS } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import s from './lp-manifesto.module.css';

const FILLS = [
  { bg: '#162557', fg: '#FFFFFF', mark: '#26CF7B' },
  { bg: '#26CF7B', fg: '#162557', mark: '#162557' },
  { bg: '#052E25', fg: '#F2FFE4', mark: '#26CF7B' },
];

// The three pillars as square blocks that lock together, beside paragraph six verbatim.
export default function Pillars() {
  return (
    <div className={s.pillarGrid}>
      <div className={s.pillarArt}>
        <Art viewBox="0 0 660 260" title="Three square blocks locked together: Organização, Disciplina, Confiança" exportName="lp-manifesto-pillars">
          <rect x="0" y="240" width="660" height="20" fill="#162557" />
          {PILLARS.map((p, k) => {
            const f = FILLS[k];
            return (
              <g key={p} transform={`translate(${k * 220} 20)`}>
                <g className={`lock ${s.block}`} style={{ '--i': k * 5 }}>
                  <rect width="220" height="220" fill={f.bg} />
                  <MarkG x={22} y={22} size={44} fill={f.mark} />
                  <text x="22" y="190" fontSize="22" fontWeight="500" letterSpacing="-1.2" fill={f.fg} className="wide" lang="pt-BR">{p}</text>
                  <text x="198" y="48" fontSize="14" fontWeight="500" textAnchor="end" fill={f.fg} className="wide">{`0${k + 1}`}</text>
                </g>
              </g>
            );
          })}
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
