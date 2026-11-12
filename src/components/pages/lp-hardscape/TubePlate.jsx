import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { HEX, LINES } from '@/lib/brand';

// The tube label from the flat lay (m01): a dark green tube lying on its side, open at the left end,
// with a pale paper label carrying the mark and the line. Light from the upper left, hard cast shadow
// to the lower right.
const BOLD = /(CEO|Hardscape)/;

export default function TubePlate() {
  return (
    <Art viewBox="0 0 900 520" title="Tube with a paper label: the faz-tudo to CEO line" exportName="lp-hardscape-tube-label">
      <defs>
        <linearGradient id="lp-hardscape-tube-shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HEX.white} stopOpacity="0.28" />
          <stop offset="0.35" stopColor={HEX.white} stopOpacity="0" />
          <stop offset="1" stopColor={HEX.asphalt} stopOpacity="0.42" />
        </linearGradient>
        <linearGradient id="lp-hardscape-tube-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={HEX.white} />
          <stop offset="1" stopColor={HEX.mintPaper} />
        </linearGradient>
        <clipPath id="lp-hardscape-tube-clip"><rect x="250" y="100" width="560" height="320" /></clipPath>
      </defs>
      <rect width="900" height="520" fill={HEX.mint} />
      {/* hard cast shadow */}
      <path d="M200 120H830L860 460H230Z" fill={HEX.greenDark} opacity="0.16" />
      <g className="fade-in">
        <rect x="250" y="100" width="560" height="320" fill={HEX.greenDark} />
        <rect x="250" y="100" width="560" height="320" fill="url(#lp-hardscape-tube-shade)" />
        {/* the open end: a rim, the dark inside, the far wall */}
        <ellipse cx="250" cy="260" rx="62" ry="160" fill={HEX.greenDark} />
        <ellipse cx="258" cy="260" rx="48" ry="146" fill={HEX.asphalt} />
        <path d="M250 112A62 160 0 0 1 250 408" fill="none" stroke={HEX.gray} strokeWidth="5" opacity="0.55" />
        <ellipse cx="810" cy="260" rx="40" ry="160" fill={HEX.greenDark} />
        <ellipse cx="810" cy="260" rx="40" ry="160" fill="url(#lp-hardscape-tube-shade)" />
      </g>
      {/* the label, wrapped round the tube */}
      <g clipPath="url(#lp-hardscape-tube-clip)" className="slide-up">
        <rect x="360" y="100" width="380" height="320" fill="url(#lp-hardscape-tube-paper)" />
        <rect x="360" y="100" width="380" height="320" fill="url(#lp-hardscape-tube-shade)" opacity="0.7" />
        <MarkG x={392} y={128} size="46" fill={HEX.navy} />
        <g fill={HEX.asphalt} fontSize="30" fontWeight="300">
          {LINES.ceo.rows.map((row, i) => (
            <text key={row} x="392" y={238 + i * 40}>
              {row.split(BOLD).map((p, k) => (BOLD.test(p) ? <tspan key={k} fontWeight="800" fill={HEX.navy}>{p}</tspan> : p))}
            </text>
          ))}
        </g>
      </g>
      <rect x="360" y="100" width="4" height="320" fill={HEX.gray} opacity="0.7" />
      <rect x="736" y="100" width="4" height="320" fill={HEX.gray} opacity="0.7" />
    </Art>
  );
}
