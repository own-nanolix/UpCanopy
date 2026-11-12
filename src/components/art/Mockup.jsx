// The mockup kit. This project's direction (do not change it per page):
//   Staging:  diagonal cascade: objects step across the frame along one diagonal and crop off its edges.
//   Backdrop: a seamless studio sweep tinted with the lightest brand colour (Green Ligth #F2FFE4).
//   Light:    one direction, from the upper left. Objects throw a hard, short shadow to the lower right
//             (as in the designer's own flat lays) and sit on a soft contact shadow.
// Each mockup is ONE <Art> SVG: sweep, shadows, objects, materials, shading and the brand artwork on them.
// Every page runs its cascade on a different diagonal, step and crop (see LAYOUTS.md).

export const LIGHT = { x: -0.64, y: -0.77 };           // where the light comes from (upper left)
export const SHADOW_DIR = { x: 0.64, y: 0.77 };        // where shadows fall (lower right)

// The seamless sweep: a tinted wall that curves into the floor with no visible edge.
// horizon (0..1) is where the curve sits. Needs idp. Put it first in the SVG.
export function SweepG({ idp, w, h, horizon = 0.62, tint = '#F2FFE4', ...rest }) {
  return (
    <g {...rest}>
      <linearGradient id={`${idp}-sweep`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset={Math.max(0, horizon - 0.22)} stopColor={tint} />
        <stop offset={horizon} stopColor="#E3F5D3" />
        <stop offset={Math.min(1, horizon + 0.1)} stopColor={tint} />
        <stop offset="1" stopColor="#F8FFF0" />
      </linearGradient>
      <radialGradient id={`${idp}-sweep-light`} cx="0.22" cy="0.12" r="0.9">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
        <stop offset="0.6" stopColor="#FFFFFF" stopOpacity="0" />
      </radialGradient>
      <rect width={w} height={h} fill={`url(#${idp}-sweep)`} />
      <rect width={w} height={h} fill={`url(#${idp}-sweep-light)`} />
    </g>
  );
}

// Hard cast shadow of a flat object: the same outline, shifted to the lower right, in dark green.
// d is the object's outline path (in the same coordinates the object is drawn in); depth is the shift.
export function CastG({ d, depth = 18, opacity = 0.22, fill = '#052E25', ...rest }) {
  return <path d={d} transform={`translate(${depth * 0.64} ${depth * 0.77})`} fill={fill} opacity={opacity} {...rest} />;
}

// Soft contact shadow under a standing or rounded object. idp must be unique per shadow.
export function ShadowG({ idp, cx, cy, rx, ry = rx * 0.14, opacity = 0.3, blur = 9, fill = '#052E25', ...rest }) {
  const id = `${idp}-shadow`;
  return (
    <g {...rest}>
      <filter id={id} x="-30%" y="-150%" width="160%" height="400%">
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <ellipse cx={cx + rx * 0.1} cy={cy} rx={rx} ry={ry} fill={fill} opacity={opacity} filter={`url(#${id})`} />
    </g>
  );
}

// Material definitions as <defs>. Put <MaterialDefs idp="..." /> once inside each mockup SVG, then use:
//   fill="url(#<idp>-metal)"       brushed steel            fill="url(#<idp>-metal-dark)"  black anodised metal
//   fill="url(#<idp>-plastic)"     white glossy plastic     fill="url(#<idp>-glass)"       glass sheen (overlay)
//   fill="url(#<idp>-rubber)"      matte rubber             fill="url(#<idp>-card)"        coated card
//   fill="url(#<idp>-shade)"       left-to-right shade overlay for round bodies
//   fill="url(#<idp>-shade-v)"     top-to-bottom shade overlay
//   filter="url(#<idp>-fabric)"    woven fabric             filter="url(#<idp>-paper)"     fine paper grain
//   filter="url(#<idp>-soft)"      small blur for soft edges
export function MaterialDefs({ idp }) {
  return (
    <defs>
      <linearGradient id={`${idp}-metal`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F4F4F4" />
        <stop offset="0.3" stopColor="#BFC4C2" />
        <stop offset="0.52" stopColor="#ECEEEC" />
        <stop offset="0.76" stopColor="#9DA3A0" />
        <stop offset="1" stopColor="#D2D6D3" />
      </linearGradient>
      <linearGradient id={`${idp}-metal-dark`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#55595A" />
        <stop offset="0.42" stopColor="#1D1D1B" />
        <stop offset="0.62" stopColor="#3C4040" />
        <stop offset="1" stopColor="#0E0E0D" />
      </linearGradient>
      <radialGradient id={`${idp}-plastic`} cx="0.3" cy="0.22" r="0.95">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.55" stopColor="#EEF3EA" />
        <stop offset="1" stopColor="#C3CCBE" />
      </radialGradient>
      <linearGradient id={`${idp}-glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.5" />
        <stop offset="0.36" stopColor="#FFFFFF" stopOpacity="0.06" />
        <stop offset="0.64" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.18" />
      </linearGradient>
      <linearGradient id={`${idp}-rubber`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3A3C3A" />
        <stop offset="1" stopColor="#1D1D1B" />
      </linearGradient>
      <linearGradient id={`${idp}-card`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#EDF6E6" />
      </linearGradient>
      <linearGradient id={`${idp}-shade`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.3" />
        <stop offset="0.32" stopColor="#FFFFFF" stopOpacity="0" />
        <stop offset="0.6" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
      </linearGradient>
      <linearGradient id={`${idp}-shade-v`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.2" />
        <stop offset="0.4" stopColor="#000000" stopOpacity="0" />
        <stop offset="1" stopColor="#000000" stopOpacity="0.24" />
      </linearGradient>
      <filter id={`${idp}-fabric`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85 0.4" numOctaves="2" seed="5" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.24 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <filter id={`${idp}-paper`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="11" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.1 0" result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
      <filter id={`${idp}-soft`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

// One step of the cascade. Position the object with x, y; i sets the order in which the steps arrive.
// On load each step slides in along the diagonal (CSS) and lands exactly at x, y.
//   <StepG i={0} x={-40} y={420}>…</StepG> <StepG i={1} x={260} y={300}>…</StepG> <StepG i={2} x={560} y={180}>…</StepG>
export function StepG({ i = 0, x = 0, y = 0, rotate = 0, children, ...rest }) {
  return (
    <g transform={`translate(${x} ${y})${rotate ? ` rotate(${rotate})` : ''}`} {...rest}>
      <g className="mock-step" style={{ '--i': i }}>
        {children}
      </g>
    </g>
  );
}

// Helper: positions for n steps along a diagonal from (x0, y0) to (x1, y1). Returns [{ x, y, i }].
export function cascade(n, x0, y0, x1, y1) {
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0 : i / (n - 1);
    return { x: Math.round(x0 + (x1 - x0) * t), y: Math.round(y0 + (y1 - y0) * t), i };
  });
}

// Glass / gloss sheen that slowly turns to the light. Place over a shape of the same geometry.
export function SheenG({ idp, d, opacity = 0.4, ...rest }) {
  return <path d={d} fill={`url(#${idp}-glass)`} opacity={opacity} className="mock-sheen" {...rest} />;
}
