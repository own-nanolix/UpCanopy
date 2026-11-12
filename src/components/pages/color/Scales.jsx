import Art from '@/components/art/Art';
import CopyValue from '@/components/site/CopyValue';
import { HEX } from '@/lib/brand';
import { withRatios, level, inkOn, LIGHT, DARK } from './color-data';
import s from './color.module.css';

// A row of swatches that rise into place, one SVG per scale (exportable).
export function ScaleStrip({ exportName, title, rows }) {
  const n = rows.length;
  const W = 150;
  return (
    <Art viewBox={`0 0 ${n * W} 230`} title={title} exportName={exportName}>
      {rows.map((r, i) => {
        const ink = inkOn(r.hex);
        const x = i * W;
        return (
          <g key={r.token} className="rise" style={{ '--i': i }}>
            <rect x={x} y="0" width={W - 8} height="230" fill={r.hex} />
            <rect x={x} y="0" width={W - 8} height="230" fill="none" stroke={HEX.navy} strokeOpacity="0.14" />
            <text x={x + 14} y="30" fontSize="15" fontWeight="700" fill={ink}>{r.token}</text>
            <text x={x + 14} y="214" fontSize="14" fontWeight="500" fill={ink}>{r.hex}</text>
          </g>
        );
      })}
    </Art>
  );
}

function Ratio({ value }) {
  const lv = level(value);
  return (
    <span className={lv === 'Below 3' ? s.low : s.ok}>
      {value.toFixed(2)} <span className={s.low}>{lv}</span>
    </span>
  );
}

// Spec table: token, hex, RGB, contrast on light and dark. Every value is click-to-copy.
export function SpecTable({ caption, rows }) {
  const data = withRatios(rows);
  return (
    <div className={s.tableWrap} role="region" aria-label={caption} tabIndex={0}>
      <table className={s.spec}>
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Swatch</th>
            <th scope="col">Token</th>
            <th scope="col">Hex</th>
            <th scope="col">RGB</th>
            <th scope="col">On light {LIGHT}</th>
            <th scope="col">On dark {DARK}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r.token}>
              <td><span className={s.chipSw} style={{ background: r.hex }} /></td>
              <td><CopyValue value={r.token} label={`${r.token} token`} /></td>
              <td><CopyValue value={r.hex} label={`${r.token} hex`} /></td>
              <td><CopyValue value={r.rgb} label={`${r.token} RGB`} /></td>
              <td><Ratio value={r.onLight} /></td>
              <td><Ratio value={r.onDark} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
