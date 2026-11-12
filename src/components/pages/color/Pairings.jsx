import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { PAIRINGS, level } from './color-data';
import s from './color.module.css';

// Six accessible pairings as paired half-squares: the ground with the ink on it, and the ink as a ground.
export function PairingsArt() {
  const TW = 300;
  const TH = 230;
  return (
    <Art viewBox="0 0 1000 620" title="Six accessible colour pairings with their contrast ratios" exportName="color-pairings">
      {PAIRINGS.map((p, i) => {
        const x = (i % 3) * 350;
        const y = Math.floor(i / 3) * 320;
        return (
          <g key={p.id} className="slide-up" style={{ '--i': i }}>
            <rect x={x} y={y} width={TW / 2} height={TH} fill={p.bg} />
            <rect x={x + TW / 2} y={y} width={TW / 2} height={TH} fill={p.fg} />
            <rect x={x} y={y} width={TW} height={TH} fill="none" stroke={HEX.navy} strokeOpacity="0.2" />
            <text x={x + TW / 4} y={y + 142} fontSize="78" fontWeight="700" textAnchor="middle" fill={p.fg}>Aa</text>
            <text x={x + (TW * 3) / 4} y={y + 142} fontSize="78" fontWeight="700" textAnchor="middle" fill={p.bg}>Aa</text>
            <text x={x} y={y + 262} fontSize="17" fontWeight="700" fill={HEX.navy}>{p.label}</text>
            <text x={x} y={y + 288} fontSize="17" fontWeight="400" fill={HEX.muted}>{p.ratio.toFixed(2)} : 1, {level(p.ratio)}</text>
          </g>
        );
      })}
    </Art>
  );
}

export function PairingsTable() {
  return (
    <div className={s.tableWrap} role="region" aria-label="Pairing values" tabIndex={0}>
      <table className={s.spec} style={{ minWidth: 560 }}>
        <caption className="sr-only">Foreground, background and contrast ratio of each pairing</caption>
        <thead>
          <tr><th scope="col">Pairing</th><th scope="col">Ink</th><th scope="col">Ground</th><th scope="col">Ratio</th></tr>
        </thead>
        <tbody>
          {PAIRINGS.map((p) => (
            <tr key={p.id}>
              <td>{p.label}</td>
              <td><CopyValue value={p.fg} label={`${p.label} ink hex`} /></td>
              <td><CopyValue value={p.bg} label={`${p.label} ground hex`} /></td>
              <td><span className={s.ok}>{p.ratio.toFixed(2)}</span> <span className={s.low}>{level(p.ratio)}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
