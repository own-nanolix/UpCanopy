// Flat lays: tissue paper cropped by the top edge, the round seal sticker, and the shipping label.
import { StepG, CastG, cascade } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { seeded, r2 } from '@/lib/charts';
import { Plate, C, polyD, rectPts } from './parts';
import { ShipLabel } from './Boxes';

// ---------- Tissue: wavy-edged sheets, soft creases, a quiet repeat of the mark ----------
function sheetPts(seed, x0, y0, x1, y1, amp = 7) {
  const rnd = seeded(seed), pts = [];
  const edge = (ax, ay, bx, by, n) => {
    for (let i = 0; i < n; i++) {
      const t = i / n, nx = by - ay, ny = ax - bx, len = Math.hypot(nx, ny) || 1;
      const o = (rnd() - 0.5) * amp * 2;
      pts.push([ax + (bx - ax) * t + (nx / len) * o, ay + (by - ay) * t + (ny / len) * o]);
    }
  };
  edge(x0, y0, x1, y0, 14); edge(x1, y0, x1, y1, 10); edge(x1, y1, x0, y1, 14); edge(x0, y1, x0, y0, 10);
  return pts;
}

function Tissue({ id, m, seed, x0, y0, x1, y1, tilt, tint, op }) {
  const pts = sheetPts(seed, x0, y0, x1, y1);
  const d = polyD(pts);
  const rnd = seeded(seed + 3);
  const creases = Array.from({ length: 9 }, (_, i) => {
    const x = x0 + (x1 - x0) * rnd(), y = y0 + (y1 - y0) * rnd(), l = 120 + rnd() * 220, a = -0.6 + rnd() * 1.2 + tilt / 40;
    return { i, x, y, x2: x + Math.cos(a) * l, y2: y + Math.sin(a) * l };
  });
  const cols = Math.ceil((x1 - x0) / 96), rows = Math.ceil((y1 - y0) / 96);
  return (
    <g>
      <CastG d={d} depth={14} opacity={0.2} />
      <path d={d} fill={tint} opacity={op} filter={`url(#${m}-paper)`} />
      <clipPath id={`${id}-clip`}><path d={d} /></clipPath>
      <g clipPath={`url(#${id}-clip)`}>
        <g transform={`rotate(${tilt} ${(x0 + x1) / 2} ${(y0 + y1) / 2})`} fill={C.green} opacity="0.3">
          {Array.from({ length: rows * cols }, (_, k) => k).map((k) => {
            const cx = x0 - 40 + (k % cols) * 96 + (Math.floor(k / cols) % 2) * 48, cy = y0 - 40 + Math.floor(k / cols) * 96;
            return <MarkG key={k} x={cx} y={cy} size={34} fill={C.green} />;
          })}
        </g>
        {creases.map((c) => (
          <g key={c.i}>
            <path d={`M${r2(c.x)} ${r2(c.y)}Q${r2((c.x + c.x2) / 2 + 14)} ${r2((c.y + c.y2) / 2 - 12)} ${r2(c.x2)} ${r2(c.y2)}`} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.8" />
            <path d={`M${r2(c.x + 2.5)} ${r2(c.y + 3)}L${r2(c.x2 + 2.5)} ${r2(c.y2 + 3)}`} stroke={C.dark} strokeOpacity="0.06" strokeWidth="4" />
          </g>
        ))}
        <rect x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={`url(#${m}-shade)`} opacity="0.7" />
      </g>
      <path d={d} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="1.5" />
    </g>
  );
}

export function TissuePaper() {
  const sheets = [
    { seed: 4, x0: 60, y0: -60, x1: 700, y1: 360, tilt: -8, tint: '#CDEFD9', op: 0.98 },
    { seed: 9, x0: 280, y0: 140, x1: 960, y1: 560, tilt: 6, tint: C.paper, op: 0.93 },
    { seed: 15, x0: 520, y0: 360, x1: 1100, y1: 800, tilt: -4, tint: '#E9FBEF', op: 0.9 },
  ];
  return (
    <Plate id="tissue" title="Tissue paper printed with the mark">
      {({ idp, m }) => sheets.map((s, i) => (
        <StepG key={s.seed} i={i} x={0} y={0}>
          <Tissue id={`${idp}-t${i}`} m={m} {...s} />
        </StepG>
      ))}
    </Plate>
  );
}

// ---------- Seal sticker: navy discs, one peeling from its backing sheet ----------
function Seal({ id, m, r, peel }) {
  const a1 = ((200 * Math.PI) / 180), a2 = ((262 * Math.PI) / 180);
  const p1 = [r * Math.cos(a1), r * Math.sin(a1)], p2 = [r * Math.cos(a2), r * Math.sin(a2)];
  const seg = (sweep) => `M${r2(p1[0])} ${r2(p1[1])}A${r} ${r} 0 0 ${sweep} ${r2(p2[0])} ${r2(p2[1])}Z`;
  return (
    <g>
      <CastG d={`M${-r} 0A${r} ${r} 0 1 0 ${r} 0A${r} ${r} 0 1 0 ${-r} 0Z`} depth={10} opacity={0.26} />
      <circle r={r} fill={C.navy} filter={`url(#${m}-paper)`} />
      <circle r={r} fill={`url(#${m}-shade)`} />
      <circle r={r * 0.9} fill="none" stroke={C.green} strokeWidth="2.4" />
      <circle r={r * 0.94} fill="none" stroke="#fff" strokeOpacity="0.2" strokeWidth="1" />
      <MarkG x={-r * 0.45} y={-r * 0.5} size={r * 0.9} fill={C.green} />
      <path d={`M${-r} 0A${r} ${r} 0 0 1 0 ${-r}`} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="2.4" />
      {peel && (
        <g>
          <path d={seg(1)} fill="#E9EEE9" />
          <path d={seg(1)} fill="none" stroke="#000" strokeOpacity="0.08" />
          <clipPath id={`${id}-flap`}><path d={seg(0)} /></clipPath>
          <path d={seg(0)} fill="#F6FAF6" />
          <g clipPath={`url(#${id}-flap)`}>
            <path d={seg(0)} fill={`url(#${m}-shade)`} transform="scale(1)" />
            <path d={`M${r2(p1[0])} ${r2(p1[1])}L${r2(p2[0])} ${r2(p2[1])}`} stroke="#000" strokeOpacity="0.22" strokeWidth="6" />
          </g>
          <path d={`M${r2(p1[0])} ${r2(p1[1])}L${r2(p2[0])} ${r2(p2[1])}`} stroke="#fff" strokeWidth="1.6" strokeOpacity="0.9" />
        </g>
      )}
    </g>
  );
}

export function SealSticker() {
  const sheet = rectPts(640, 520, -14, 520, 380);
  const pos = cascade(3, 300, 200, 700, 520);
  return (
    <Plate id="seal" title="Round navy seal sticker">
      {({ idp, m }) => (
        <g>
          <CastG d={polyD(sheet)} depth={16} opacity={0.2} />
          <path d={polyD(sheet)} fill="#fff" filter={`url(#${m}-paper)`} />
          <path d={polyD(sheet)} fill={`url(#${m}-shade-v)`} opacity="0.6" />
          {pos.map((p) => (
            <g key={p.i} transform={`translate(${p.x} ${p.y})`}>
              <circle r={[92, 92, 92][p.i]} fill="#DCE3DD" opacity="0.9" />
              <circle r={92} fill="none" stroke="#000" strokeOpacity="0.1" />
            </g>
          ))}
          {pos.map((p) => (
            <StepG key={`s${p.i}`} i={p.i} x={p.x} y={p.y}>
              <Seal id={`${idp}-s${p.i}`} m={m} r={92} peel={p.i === 2} />
            </StepG>
          ))}
        </g>
      )}
    </Plate>
  );
}

// ---------- Shipping label: flat labels rotated and stepping down-right ----------
export function ShippingLabel() {
  const pos = cascade(3, 360, 250, 760, 600);
  const sc = [2.3, 1.7, 1.3];
  return (
    <Plate id="label" title="Shipping label">
      {({ m }) => (
        [...pos].reverse().map((p) => {
          const w = 190 * sc[p.i], h = 118 * sc[p.i];
          return (
            <StepG key={p.i} i={p.i} x={p.x} y={p.y}>
              <CastG d={polyD(rectPts(w, h, -16))} depth={14} opacity={0.24} />
              <g transform="rotate(-16)">
                <g transform={`translate(${-w / 2} ${-h / 2})`}>
                  <ShipLabel w={190} scale={sc[p.i]} />
                  <rect width={w} height={h} fill={`url(#${m}-shade)`} opacity="0.5" />
                </g>
              </g>
            </StepG>
          );
        })
      )}
    </Plate>
  );
}
