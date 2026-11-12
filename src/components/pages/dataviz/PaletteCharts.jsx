// Charts drawn from the six printed colours (slide m07) and the four direction words (slide m03).
import Art from '@/components/art/Art';
import { PALETTE, HEX, DIRECTION } from '@/lib/brand';
import { shares, stepPath, r2 } from '@/lib/charts';
import { INK, Lbl, tip, pad2 } from './kit';

// Estimated proportions read from the case study images (SOURCE.md): about, not measured.
export const SHARE = [
  { key: 'navy', name: 'Blue Ocean', v: 40, fill: HEX.navy },
  { key: 'greens', name: 'Greens', v: 35, fill: HEX.green },
  { key: 'mint', name: 'Pale mint, white', v: 20, fill: HEX.mint },
  { key: 'dark', name: 'Asfalt, Gray', v: 5, fill: HEX.asphalt },
];
const saySh = (g) => `${g.name}: about ${g.v}% (estimated)`;

// Chart 6: the estimated palette share as a ring of thick bands with cut ends.
export function PaletteRing() {
  const segs = shares(SHARE.map((g) => g.v), 160, 112, 58, 98, 3);
  return (
    <Art viewBox="0 0 320 316" title="Estimated share of the palette as a ring of thick bands" exportName="dataviz-palette-ring">
      {segs.map((sg, i) => (
        <path key={SHARE[i].key} d={sg.d} fill={SHARE[i].fill} stroke={HEX.muted} strokeWidth={SHARE[i].key === 'mint' ? 1 : 0} className="lock" style={{ '--i': i }} {...tip(saySh(SHARE[i]))} />
      ))}
      <Lbl x="160" y="124" size={40} weight={500} anchor="middle" wide ls={-0.04}>6</Lbl>
      <Lbl x="160" y="144" size={11} anchor="middle" ls={0.12}>COLOURS</Lbl>
      {SHARE.map((g, i) => (
        <g key={g.key}>
          <rect x="0" y={236 + 22 * i} width="13" height="13" fill={g.fill} stroke={HEX.muted} strokeWidth="1" />
          <Lbl x="24" y={247 + 22 * i} size={13}>{g.name}</Lbl>
          <Lbl x="320" y={247 + 22 * i} size={13} weight={700} anchor="end">{`≈${g.v}%`}</Lbl>
        </g>
      ))}
    </Art>
  );
}

// Chart 7: the same estimate as one stacked proportion bar.
export function PaletteStack() {
  const bars = SHARE.map((g, i) => ({ ...g, x: r2(SHARE.slice(0, i).reduce((a, h) => a + h.v, 0) * 4.4), w: r2(g.v * 4.4) }));
  return (
    <Art viewBox="0 0 440 190" title="Estimated share of the palette as a stacked proportion bar" exportName="dataviz-palette-stack">
      {bars.map((b, i) => (
        <g key={b.key}>
          <Lbl x={i === 3 ? 440 : b.x} y="26" size={16} weight={700} anchor={i === 3 ? 'end' : 'start'}>{`≈${b.v}%`}</Lbl>
          <rect x={b.x} y="40" width={i === 3 ? b.w : b.w - 3} height="56" fill={b.fill} stroke={HEX.muted} strokeWidth={b.key === 'mint' ? 1 : 0} className="grow-x" style={{ '--i': i * 3 }} {...tip(saySh(b))} />
        </g>
      ))}
      <rect x="0" y="112" width="440" height="2" fill={INK} opacity="0.9" />
      {SHARE.map((g, i) => (
        <g key={g.key}>
          <rect x={(i % 2) * 226} y={128 + 26 * Math.floor(i / 2)} width="14" height="14" fill={g.fill} stroke={HEX.muted} strokeWidth="1" />
          <Lbl x={(i % 2) * 226 + 24} y={140 + 26 * Math.floor(i / 2)} size={15}>{g.name}</Lbl>
        </g>
      ))}
    </Art>
  );
}

// Chart 8: slide m07 rebuilt. Name top left, number top right, hex and role as printed.
const INKS = { green: HEX.navy, navy: '#FFFFFF', 'green-dark': HEX.mint, asphalt: '#FFFFFF', mint: HEX.navy, gray: HEX.navy };
export function PaletteSwatches() {
  const cols = [[0, 170], [178, 126], [312, 128]];
  const order = [[0, 2, 3], [1, 4, 5]];
  return (
    <Art viewBox="0 0 440 264" title="The six palette swatches as printed: name, hex, number and role" exportName="dataviz-palette-swatches">
      {order.map((row, r) =>
        row.map((idx, c) => {
          const p = PALETTE[idx];
          const [x, w] = cols[c];
          const y = r * 136;
          const ink = INKS[p.token];
          return (
            <g key={p.name} className="rise" style={{ '--i': idx }} {...tip(`${p.name} ${p.hex} ${p.no} ${p.role}`)}>
              <rect x={x} y={y} width={w} height="128" fill={p.hex} stroke={HEX.muted} strokeWidth={p.token === 'mint' ? 1 : 0} />
              <Lbl x={x + 12} y={y + 24} size={14} weight={500} fill={ink} ls={0.01}>{p.name}</Lbl>
              <Lbl x={x + w - 12} y={y + 24} size={14} weight={500} fill={ink} anchor="end" ls={0}>{p.no}</Lbl>
              <Lbl x={x + 12} y={y + 43} size={12} fill={ink} ls={0.03}>{p.hex.slice(1).toLowerCase()}</Lbl>
              <Lbl x={x + w - 12} y={y + (w > 150 ? 43 : 60)} size={11} fill={ink} anchor="end" ls={0.03} lang="pt-BR">{p.role}</Lbl>
            </g>
          );
        }),
      )}
    </Art>
  );
}

// Chart 14: comparison of the two ranks, in square blocks (2 primary, 4 secondary).
export function PaletteRanks() {
  const rows = [
    { label: 'PRIMARY', items: PALETTE.slice(0, 2), y: 18 },
    { label: 'SECONDARY', items: PALETTE.slice(2), y: 108 },
  ];
  return (
    <Art viewBox="0 0 320 230" title="Palette ranks compared: 2 primary and 4 secondary colours as square blocks" exportName="dataviz-palette-ranks">
      {rows.map((r, k) => (
        <g key={r.label}>
          <Lbl x="0" y={r.y} size={13}>{r.label}</Lbl>
          <Lbl x="320" y={r.y + 8} size={30} weight={500} anchor="end" wide ls={-0.04}>{r.items.length}</Lbl>
          {r.items.map((p, i) => (
            <rect key={p.name} x={i * 64} y={r.y + 12} width="56" height="48" fill={p.hex} stroke={HEX.muted} strokeWidth={p.token === 'mint' || p.token === 'gray' ? 1 : 0} className="rise" style={{ '--i': i + k * 2 }} {...tip(`${p.name}: ${p.no} ${p.role}`)} />
          ))}
        </g>
      ))}
      <rect x="0" y="190" width="320" height="2" fill={INK} opacity="0.9" />
      <Lbl x="0" y="216" size={13} ls={0.1}>OF 6 COLOURS</Lbl>
    </Art>
  );
}

// Chart 17: flow of the six colours into their two ranks.
export function PaletteFlow() {
  const bars = [
    { name: 'PRIMARY', n: 2, x: 0, w: 140, fill: HEX.green, ink: HEX.navy, from: 0 },
    { name: 'SECONDARY', n: 4, x: 152, w: 288, fill: HEX.navy, ink: '#FFFFFF', from: 2 },
  ];
  return (
    <Art viewBox="0 0 440 214" title="Flow of the six colours into two ranks: 2 primary, 4 secondary" exportName="dataviz-palette-flow">
      {PALETTE.map((p, k) => {
        const b = k < 2 ? bars[0] : bars[1];
        const i = k - b.from;
        const cx = k * 76.8 + 28;
        const tx = b.x + ((i + 0.5) * b.w) / b.n;
        return (
          <g key={p.name}>
            <path d={stepPath([[cx, 58], [cx, 104], [tx, 104], [tx, 150]])} fill="none" stroke={INK} strokeWidth="2" strokeLinejoin="miter" className="draw" style={{ '--len': 500, '--i': k }} />
            <rect x={k * 76.8} y="0" width="56" height="56" fill={p.hex} stroke={HEX.muted} strokeWidth={p.token === 'mint' || p.token === 'gray' ? 1 : 0} className="rise" style={{ '--i': k }} {...tip(`${p.name}: ${p.no} ${p.role}`)} />
          </g>
        );
      })}
      {bars.map((b) => (
        <g key={b.name} {...tip(`${b.name.toLowerCase()}: ${b.n} of 6 colours`)}>
          <rect x={b.x} y="150" width={b.w} height="52" fill={b.fill} className="grow-x" style={{ '--i': 8 }} />
          <Lbl x={b.x + 12} y="182" size={15} weight={500} fill={b.ink} ls={0.06}>{`${b.name} ${b.n}`}</Lbl>
        </g>
      ))}
    </Art>
  );
}

// Chart 20: the four direction words as four blocks (slide m03, bottom line).
export function DirectionWords() {
  return (
    <Art viewBox="0 0 440 190" title="The four direction words as four blocks" exportName="dataviz-direction-words">
      <Lbl x="0" y="16" size={14} weight={700} ls={0.02} lang="pt-BR">{DIRECTION.label}</Lbl>
      {DIRECTION.words.map((w, i) => {
        const x = (i % 2) * 224, y = 30 + 80 * Math.floor(i / 2);
        const hi = i === 1;
        const ink = hi ? HEX.navy : '#FFFFFF';
        return (
          <g key={w} className="rise" style={{ '--i': i * 2 }} {...tip(`${pad2(i + 1)} ${w}`)}>
            <rect x={x} y={y} width="216" height="72" fill={hi ? HEX.green : HEX.navy} />
            <Lbl x={x + 14} y={y + 32} size={17} weight={700} fill={ink} ls={0.04} lang="pt-BR">{w}</Lbl>
            <Lbl x={x + 202} y={y + 32} size={14} fill={ink} anchor="end" ls={0}>{pad2(i + 1)}</Lbl>
          </g>
        );
      })}
    </Art>
  );
}
