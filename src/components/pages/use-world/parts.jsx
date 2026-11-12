// Shared pieces of the "In the world" scenes: the plate, the brand lines as printed, bolts and ribs.
import Art from '@/components/art/Art';
import { HEX, LINES } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './use-world.module.css';

// One plate: the ONE-svg mockup on the tinted `mock` plate plus a plain caption. side is 'left' or 'right'.
export function Plate({ side = 'left', name, exportName, title, children }) {
  return (
    <figure className={`${s.scene} ${side === 'right' ? s.right : s.left}`}>
      <div className="mock">
        <Art viewBox="0 0 1600 900" title={title} exportName={exportName}>
          {children}
        </Art>
      </div>
      <figcaption className="mock-cap">
        <span>{name}</span>
      </figcaption>
    </figure>
  );
}

// The line in its printed breaks, last row bold (rows: LINES.bridge.rows or rows4).
export function BridgeLine({ rows = LINES.bridge.rows, x = 0, y = 0, size = 28, lh = 1.22, fill = '#FFFFFF', strong = HEX.green, anchor = 'start', weight = 300 }) {
  return (
    <g lang="pt-BR">
      {rows.map((row, i) => {
        const last = i === rows.length - 1;
        return (
          <text key={row} x={x} y={r2(y + i * size * lh)} fontSize={size} fontWeight={last ? 700 : weight} fill={last ? strong : fill} textAnchor={anchor}>
            {row}
          </text>
        );
      })}
    </g>
  );
}

// "Passe a credibilidade ..." in its printed rows; "empresa americana" is bold.
export function CredLine({ x = 0, y = 0, size = 24, lh = 1.3, fill = HEX.navy }) {
  const bold = LINES.credibility.strong;
  return (
    <g lang="pt-BR">
      {LINES.credibility.rows.map((row, i) => {
        const at = row.indexOf(bold);
        return (
          <text key={row} x={x} y={r2(y + i * size * lh)} fontSize={size} fontWeight={300} fill={fill}>
            {at < 0 ? row : (
              <>
                {row.slice(0, at)}
                <tspan fontWeight={800}>{bold}</tspan>
                {row.slice(at + bold.length)}
              </>
            )}
          </text>
        );
      })}
    </g>
  );
}

// A bolt head with a highlight (light from the upper left).
export function Bolt({ x, y, r = 4 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#5E6360" />
      <circle cx={r2(x - r * 0.25)} cy={r2(y - r * 0.25)} r={r2(r * 0.62)} fill="#C9CECB" />
      <circle cx={r2(x - r * 0.4)} cy={r2(y - r * 0.4)} r={r2(r * 0.22)} fill="#FFFFFF" />
    </g>
  );
}

// A steel bar from a to b with a lit edge and a shaded edge (horizontal or vertical), drawn as a rect.
export function SteelBar({ idp, x, y, w, h, dark = false, className }) {
  return (
    <g className={className}>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-${dark ? 'metal-dark' : 'metal'})`} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-${w > h ? 'shade-v' : 'shade'})`} />
    </g>
  );
}

// Vertical ribs of a corrugated dark wall: n bars of width bw from x0, y0 to y1.
export function Ribs({ x0, y0, y1, n, bw }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const x = r2(x0 + i * bw);
        const tone = i % 2 ? '#1E2120' : '#2D3130';
        return (
          <g key={i}>
            <rect x={x} y={y0} width={bw} height={y1 - y0} fill={tone} />
            <rect x={x} y={y0} width={r2(bw * 0.18)} height={y1 - y0} fill="#6C7170" opacity={i % 2 ? 0.25 : 0.6} />
            <rect x={r2(x + bw * 0.72)} y={y0} width={r2(bw * 0.28)} height={y1 - y0} fill="#050606" opacity={i % 2 ? 0.7 : 0.4} />
          </g>
        );
      })}
    </g>
  );
}

// A thin lit rim around a rect (inset highlight upper left, shade lower right).
export function Rim({ x, y, w, h, t = 3 }) {
  return (
    <g>
      <path d={`M${x} ${y + h}V${y}H${x + w}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth={t} />
      <path d={`M${x + w} ${y}V${y + h}H${x}`} fill="none" stroke="#000000" strokeOpacity="0.35" strokeWidth={t} />
    </g>
  );
}
