// Shared pieces of the Accessories page: the scene wrapper (one exportable SVG on the tinted sweep),
// the plate (figure + caption) and a few drawing helpers.
import Art from '@/components/art/Art';
import { BrandDefs } from '@/components/art/KeyArt';
import { MaterialDefs, SweepG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';

export const C = { navy: '#162557', green: '#26CF7B', dark: '#052E25', mint: '#F2FFE4', ink: '#1D1D1B', deep: '#0C1445', paper: '#DFF7E6', white: '#FFFFFF' };
export const SIZES = { wide: [1000, 640], narrow: [500, 640], small: [400, 400] };

// One mockup = one SVG. children is a function that receives the id prefixes:
//   p (the scene), m (material defs), b (brand defs / gradients / grain).
export function Scene({ k, title, size = 'wide', horizon = 0.62, children }) {
  const [w, h] = SIZES[size];
  const p = `use-accessories-${k}`;
  const ids = { p, m: `${p}-m`, b: `${p}-b`, w, h };
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={p}>
      <MaterialDefs idp={ids.m} />
      <BrandDefs idp={ids.b} />
      <SweepG idp={`${p}-s`} w={w} h={h} horizon={horizon} />
      {children(ids)}
    </Art>
  );
}

export function Plate({ name, children, className }) {
  return (
    <figure className={className} style={{ margin: 0 }}>
      <div className="mock">{children}</div>
      <figcaption className="mock-cap"><span>{name}</span></figcaption>
    </figure>
  );
}

// Cylinder body: left x, top y, width w, height h, ellipse half-height ry. Includes the top half-ellipse.
export const cylPath = (x, y, w, h, ry) =>
  `M${x} ${y}V${r2(y + h)}A${r2(w / 2)} ${r2(ry)} 0 0 0 ${r2(x + w)} ${r2(y + h)}V${y}A${r2(w / 2)} ${r2(ry)} 0 0 0 ${x} ${y}Z`;

// Hard shadow of a flat object inside a group rotated by rot degrees: keeps the light from the upper left.
export function Cast({ d, rot = 0, depth = 14, opacity = 0.22, ...rest }) {
  const a = (rot * Math.PI) / 180;
  const dx = 0.64 * depth, dy = 0.77 * depth;
  const t = `translate(${r2(dx * Math.cos(a) + dy * Math.sin(a))} ${r2(-dx * Math.sin(a) + dy * Math.cos(a))})`;
  return <path d={d} transform={t} fill="#052E25" opacity={opacity} {...rest} />;
}

export const rectD = (x, y, w, h) => `M${x} ${y}H${x + w}V${y + h}H${x}Z`;

// A coloured sheet of light across a shape (upper left lit): uses the material gradients of the scene.
export function Shade({ d, m, v = false, opacity = 1, ...rest }) {
  return <path d={d} fill={`url(#${m}-shade${v ? '-v' : ''})`} opacity={opacity} {...rest} />;
}
