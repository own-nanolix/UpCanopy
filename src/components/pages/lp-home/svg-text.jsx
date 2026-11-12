// Small helpers for brand lines set as SVG <text> inside the exportable artwork.
// Portuguese copy always arrives from @/lib/brand; these only lay it out.

// Splits one row into [{ t, bold }] segments, bolding any of the `strong` parts.
export function segments(row, strong) {
  const parts = [].concat(strong || []).filter(Boolean);
  const out = [];
  let rest = row;
  while (rest) {
    let best = -1;
    let hit = '';
    for (const p of parts) {
      const i = rest.indexOf(p);
      if (i >= 0 && (best < 0 || i < best)) { best = i; hit = p; }
    }
    if (best < 0) { out.push({ t: rest, bold: false }); break; }
    if (best > 0) out.push({ t: rest.slice(0, best), bold: false });
    out.push({ t: hit, bold: true });
    rest = rest.slice(best + hit.length);
  }
  return out;
}

// A brand line as stacked rows. x, y is the first baseline; anchor start | end | middle.
// Light type with the bold part in `strongFill`.
export function LineRows({ rows, strong, x = 0, y = 0, size = 24, lh = 1.22, anchor = 'start', fill = '#FFFFFF', strongFill, weight = 300 }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} fill={fill} textAnchor={anchor} lang="pt-BR">
      {rows.map((row, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : size * lh}>
          {segments(row, strong).map((s, k) => (
            <tspan key={k} fontWeight={s.bold ? 700 : weight} fill={s.bold && strongFill ? strongFill : undefined}>{s.t}</tspan>
          ))}
        </tspan>
      ))}
    </text>
  );
}

// A grain overlay: fine print noise on a rectangle, as on the designer's gradient pieces.
export function GrainDefs({ id, opacity = 0.16 }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7" />
      <feColorMatrix type="matrix" values={`0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${opacity} 0`} />
    </filter>
  );
}
