import Art from '@/components/art/Art';
import { SweepG, MaterialDefs } from '@/components/art/Mockup';

export const C = {
  navy: '#162557',
  green: '#26CF7B',
  dark: '#052E25',
  mint: '#F2FFE4',
  white: '#FFFFFF',
  grey: '#DADADA',
  deep: '#0C1445',
};

// One mockup = one SVG: sweep, material defs, a big-region blur for folds, and the staged objects.
export function Stage({ idp, w, h, title, exportName, horizon = 0.64, children }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={exportName}>
      <MaterialDefs idp={idp} />
      <defs>
        <filter id={`${idp}-blur`} filterUnits="userSpaceOnUse" x="-800" y="-300" width="1800" height="1400">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      <SweepG idp={idp} w={w} h={h} horizon={horizon} />
      {children}
    </Art>
  );
}

// Builds a closed, left-right symmetric outline from the right half. Nodes run from the top centre to the
// bottom centre; a node with `c` ([x1,y1,x2,y2]) is reached by a cubic, otherwise by a straight line.
export function symPath(nodes) {
  let d = `M${nodes[0].x} ${nodes[0].y}`;
  for (let i = 1; i < nodes.length; i += 1) {
    const n = nodes[i];
    d += n.c ? `C${n.c.join(' ')} ${n.x} ${n.y}` : `L${n.x} ${n.y}`;
  }
  for (let i = nodes.length - 1; i > 0; i -= 1) {
    const n = nodes[i];
    const p = nodes[i - 1];
    d += n.c ? `C${-n.c[2]} ${n.c[3]} ${-n.c[0]} ${n.c[1]} ${-p.x} ${p.y}` : `L${-p.x} ${p.y}`;
  }
  return `${d}Z`;
}

// Cloth: fabric-filtered fill, then everything that lives on the surface (clipped to it), then soft folds
// and the shade overlays so folds and volume also fall across the artwork.
export function Cloth({ idp, id, d, fill, folds = [], hi = 0.12, children }) {
  const cid = `${idp}-${id}-clip`;
  const blur = `url(#${idp}-blur)`;
  return (
    <g>
      <clipPath id={cid}>
        <path d={d} />
      </clipPath>
      <path d={d} fill={fill} filter={`url(#${idp}-fabric)`} />
      <g clipPath={`url(#${cid})`}>
        {children}
        {folds.map((f) => (
          <g key={f}>
            <path d={f} transform="translate(2.5 3)" fill="none" stroke="#000" strokeOpacity="0.22" strokeWidth="9" strokeLinecap="round" filter={blur} />
            <path d={f} transform="translate(-3 -3)" fill="none" stroke="#fff" strokeOpacity={hi} strokeWidth="6" strokeLinecap="round" filter={blur} />
          </g>
        ))}
        <path d={d} fill={`url(#${idp}-shade)`} />
        <path d={d} fill={`url(#${idp}-shade-v)`} />
      </g>
    </g>
  );
}

export function Stitch({ d, c = '#FFFFFF', o = 0.5, w = 1.3, dash = '5 3.5' }) {
  return <path d={d} fill="none" stroke={c} strokeOpacity={o} strokeWidth={w} strokeDasharray={dash} />;
}

// A zip: coloured tape, teeth as a dashed thick line, a thin highlight on the upper-left side.
export function ZipG({ d, tape, teeth, w = 5 }) {
  return (
    <g fill="none">
      <path d={d} stroke="#000" strokeOpacity="0.28" strokeWidth={w + 4} transform="translate(1.5 1.5)" />
      <path d={d} stroke={tape} strokeWidth={w + 3} />
      <path d={d} stroke={teeth} strokeWidth={w} strokeDasharray="2.2 1.6" />
      <path d={d} stroke="#fff" strokeOpacity="0.35" strokeWidth="1" transform="translate(-1.5 -1.5)" strokeDasharray="2.2 1.6" />
    </g>
  );
}

// A zip slider and pull in brushed metal.
export function PullG({ idp, x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="-4.5" y="-6" width="9" height="12" fill={`url(#${idp}-metal)`} stroke="#000" strokeOpacity="0.3" strokeWidth="0.8" />
      <rect x="-2.5" y="6" width="5" height="14" fill={`url(#${idp}-metal-dark)`} />
      <rect x="-1.2" y="9" width="2.4" height="7" fill="#000" opacity="0.5" />
    </g>
  );
}

// Draw once, then once mirrored about x = 0 (no ids inside).
export function Mirror({ children }) {
  return (
    <>
      <g>{children}</g>
      <g transform="scale(-1 1)">{children}</g>
    </>
  );
}

// A slim ribbed band (cuff, hem): dark tint over the cloth and fine vertical ribs.
export function RibG({ d, mid, width = 28 }) {
  return (
    <g>
      <path d={d} fill="#000" opacity="0.2" />
      <path d={mid} fill="none" stroke="#000" strokeOpacity="0.32" strokeWidth={width} strokeDasharray="1.3 3.4" />
      <path d={mid} fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth={width} strokeDasharray="1 3.7" strokeDashoffset="-2" />
    </g>
  );
}
