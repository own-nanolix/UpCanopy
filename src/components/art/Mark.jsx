// The UpCanopy mark, traced from the designer's construction drawing, and its lockups. All parts are SVG
// groups (<g>) so they can be placed inside any artwork; wrap them in <Art> for a standalone graphic.
//
// Construction (on a 100-unit box): three families of concentric circles with one ring spacing (U = 21.04).
//   UL = (-55.77, -14.97)   UR = (155.77, -14.97)   B = (50, 153.16)
// The arch: outer flanks are arcs of radius 83.79 about UL and UR, inner flanks radius 104.67; the top is a band
// between radii 126.10 and 146.98 about B. The bar: a band between radii 63.46 and 84.62 about B.
// All ends are straight cuts.

export const MARK = {
  U: 21.04,
  UL: { cx: -55.77, cy: -14.97 },
  UR: { cx: 155.77, cy: -14.97 },
  B: { cx: 50, cy: 153.16 },
  flankOuter: 83.79, flankInner: 104.67, topInner: 126.1, topOuter: 146.98, barInner: 63.46, barOuter: 84.62,
};
export const MARK_ARCH = 'M24.73 8.38A146.98 146.98 0 0 1 75.27 8.38A83.79 83.79 0 0 0 100 47.39L90.66 67.72A104.67 104.67 0 0 1 60.44 27.34A126.1 126.1 0 0 0 39.29 27.34A104.67 104.67 0 0 1 9.34 67.72L0 47.39A83.79 83.79 0 0 0 24.73 8.38Z';
export const MARK_BAR = 'M14.84 75.41A84.62 84.62 0 0 1 85.16 75.41L72.53 94.09A63.46 63.46 0 0 0 27.47 94.09Z';

// <MarkG x y size fill /> : the mark in a square of `size` (its artwork spans the full width and y 5.9 to 94.1).
// archClass / barClass let a page animate the two pieces (for example "roof-arch" and "roof-bar").
export function MarkG({ x = 0, y = 0, size = 100, fill = 'currentColor', archClass, barClass, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} fill={fill} {...rest}>
      <path d={MARK_ARCH} className={archClass} />
      <path d={MARK_BAR} className={barClass} />
    </g>
  );
}

// The word in the logotype voice (wide). Baseline at y. Approximate width: 6.1 x size.
export function WordmarkG({ x = 0, y = 0, size = 40, fill = 'currentColor', anchor = 'start', weight = 500, ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={weight} textAnchor={anchor} fill={fill} letterSpacing={-size * 0.075} className="wide" style={{ fontFamily: 'var(--font-wide)' }} {...rest}>
      UpCanopy
    </text>
  );
}

// The descriptor "REMOTE BACK–OFFICE" in wide caps. Baseline at y.
export function DescriptorG({ x = 0, y = 0, size = 12, fill = 'currentColor', anchor = 'start', ...rest }) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight="500" textAnchor={anchor} fill={fill} letterSpacing={size * 0.04} className="wide" style={{ fontFamily: 'var(--font-wide)' }} {...rest}>
      REMOTE BACK–OFFICE
    </text>
  );
}

// Horizontal lockup (slide m14): mark left, word right. Box 400 x 60 at scale 1.
export const LOCKUP_H = { w: 400, h: 60 };
export function LockupG({ x = 0, y = 0, scale = 1, fill = 'currentColor', markFill = '#26CF7B', ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <MarkG x={0} y={0} size={60} fill={markFill} />
      <WordmarkG x={92} y={45} size={44} fill={fill} />
    </g>
  );
}

// Stacked lockup (slide m05): mark above the word above the descriptor, centred. Box 480 x 240 at scale 1.
export const LOCKUP_V = { w: 480, h: 240 };
export function LockupStackG({ x = 0, y = 0, scale = 1, fill = 'currentColor', markFill = '#26CF7B', descriptor = true, ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} {...rest}>
      <MarkG x={186} y={0} size={108} fill={markFill} />
      <WordmarkG x={240} y={176} size={70} fill={fill} anchor="middle" />
      {descriptor && <DescriptorG x={240} y={226} size={25} fill={fill} anchor="middle" />}
    </g>
  );
}

// The word set vertically and very large. Default: reading bottom to top (cards, jackets); x, y is the
// bottom-left corner of the column. With `down`: reading top to bottom, as on the letter (m12, m28); x, y is
// then the top-left corner of the column. size is the font size.
export function WordmarkVerticalG({ x = 0, y = 0, size = 120, fill = 'currentColor', down = false, ...rest }) {
  if (down) {
    return (
      <g transform={`translate(${x} ${y}) rotate(90)`} {...rest}>
        <WordmarkG x={0} y={-size * 0.24} size={size} fill={fill} />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) rotate(-90)`} {...rest}>
      <WordmarkG x={0} y={size * 0.76} size={size} fill={fill} />
    </g>
  );
}

// App icon: navy tile with the green mark.
export function AppIconG({ x = 0, y = 0, size = 100, radius = 22, tile = '#162557', fill = '#26CF7B', ...rest }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size / 100})`} {...rest}>
      <rect width="100" height="100" rx={radius} fill={tile} />
      <MarkG x={21} y={21} size={58} fill={fill} />
    </g>
  );
}

// The mark crop: an enlarged piece of the mark inside a w x h panel (the cover graphic of the folders).
// Needs idp for its clip path. zoom is how many times larger than the panel width the mark is drawn;
// dx / dy shift the mark (in panel units) to choose the crop.
export function MarkCropG({ idp, x = 0, y = 0, w = 300, h = 420, zoom = 1.67, dx = -0.74, dy = -0.08, fill = '#162557', ...rest }) {
  const id = `${idp}-crop`;
  const size = w * zoom;
  return (
    <g transform={`translate(${x} ${y})`} {...rest}>
      <clipPath id={id}>
        <rect width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <MarkG x={w * dx} y={h * dy} size={size} fill={fill} />
      </g>
    </g>
  );
}
