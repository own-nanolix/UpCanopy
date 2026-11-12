// The kit's contents: the sage folder with the letter (m12), the dark tube (m01), business card stacks, the puck (m11).
import Art from '@/components/art/Art';
import { SweepG, CastG, ShadowG, MaterialDefs, StepG, SheenG, cascade } from '@/components/art/Mockup';
import { MarkG, WordmarkG, DescriptorG } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { Letter, shadowOffset, NAVY, GREEN, DEEP } from './parts';

// Hard cast shadow of an object drawn inside a rotated, scaled group (so the offset stays to the lower right).
function Cast({ d, deg, k, depth = 30, opacity = 0.2 }) {
  const [x, y] = shadowOffset(deg, depth / k);
  return <path d={d} transform={`translate(${x} ${y})`} fill="#052E25" opacity={opacity} />;
}

// ---- Folder, opened flat, with the letter ----
export function Folder() {
  const id = 'use-product-folder';
  const mat = `${id}-m`;
  const deg = -14, k = 0.64;
  const SAGE = '#C4D2C1';
  return (
    <Art viewBox="0 0 800 900" title="Folder, opened flat, with the letter" exportName="use-product-kit-folder">
      <MaterialDefs idp={mat} />
      <SweepG idp={`${id}-s`} w={800} h={900} horizon={0.72} />
      <g className="mock-lit">
        <g transform={`translate(420 460) rotate(${deg}) scale(${k})`}>
          <Cast d="M-760 -360H760V360H-760Z" deg={deg} k={k} depth={44} opacity={0.22} />
          {/* thickness */}
          <path d="M-760 360H760V374H-760Z" fill="#7E9381" />
          {/* left panel */}
          <rect x="-760" y="-360" width="560" height="720" fill={SAGE} filter={`url(#${mat}-paper)`} />
          <rect x="-760" y="-360" width="560" height="720" fill={`url(#${mat}-shade-v)`} opacity="0.7" />
          {/* pocket */}
          <rect x="-200" y="-360" width="400" height="720" fill="#A9BCA8" filter={`url(#${mat}-paper)`} />
          <rect x="-200" y="-360" width="40" height="720" fill="#000000" opacity="0.2" />
          {/* right panel, paler */}
          <rect x="200" y="-360" width="560" height="720" fill="#E4ECE1" filter={`url(#${mat}-paper)`} />
          <rect x="200" y="-360" width="560" height="720" fill={`url(#${mat}-shade-v)`} opacity="0.6" />
          <path d="M200 -360V360" stroke="#7E9381" strokeWidth="5" opacity="0.7" />
          <path d="M-200 -360V360" stroke="#FFFFFF" strokeWidth="3" opacity="0.5" />
          {/* the stack edge and the letter */}
          <g transform="translate(-196 -316)">
            <rect x="-6" y="14" width="24" height="560" fill="#F3F5F0" />
            {Array.from({ length: 9 }, (_, i) => <path key={i} d={`M${-6 + i * 2.6} 14V574`} stroke="#9AA89A" strokeWidth="0.8" />)}
          </g>
          <g transform="translate(-166 -318) scale(0.86)">
            <g transform="translate(18 12)" opacity="0.3"><rect width="430" height="640" fill="#052E25" /></g>
            <Letter idp={`${id}-l`} mat={mat} />
          </g>
          {/* the pocket's front flap */}
          <path d="M-200 360L-150 232H150L200 360Z" fill="#B7C8B4" filter={`url(#${mat}-paper)`} />
          <path d="M-200 360L-150 232H150L200 360Z" fill={`url(#${mat}-shade-v)`} />
          <path d="M-150 232H150" stroke="#FFFFFF" strokeWidth="3" opacity="0.55" />
        </g>
      </g>
    </Art>
  );
}

// ---- Tube with the pale label ----
export function Tube() {
  const id = 'use-product-tube';
  const mat = `${id}-m`;
  const deg = -32, k = 1;
  return (
    <Art viewBox="0 0 800 900" title="Tube with the pale label" exportName="use-product-kit-tube">
      <MaterialDefs idp={mat} />
      <SweepG idp={`${id}-s`} w={800} h={900} horizon={0.7} />
      <g className="mock-lit">
        <g transform={`translate(400 470) rotate(${deg})`}>
          <ShadowG idp={`${id}-sh`} cx={0} cy={112} rx={380} ry={30} opacity={0.4} blur={12} />
          <Cast d="M-330 -100H330V100H-330Z" deg={deg} k={k} depth={24} opacity={0.18} />
          <path d="M-336 -100H320V100H-336Z" fill="#0A2F27" />
          <path d="M-336 -100H320V100H-336Z" fill={`url(#${mat}-shade-v)`} />
          {/* the label wraps the body */}
          <rect x="-236" y="-100" width="360" height="200" fill="#EAF5EA" filter={`url(#${mat}-paper)`} />
          <rect x="-236" y="-100" width="360" height="200" fill={`url(#${mat}-shade-v)`} />
          <rect x="-236" y="-100" width="3" height="200" fill="#000000" opacity="0.18" />
          <rect x="121" y="-100" width="3" height="200" fill="#000000" opacity="0.18" />
          <MarkG x={-216} y={-86} size={42} fill={GREEN} />
          <text x="-60" y="-14" fontSize="20" fontWeight="300" fill={NAVY} textAnchor="middle" lang="pt-BR">
            <tspan x="-60" dy="0">{'Deixe de ser \'faz-tudo\''}</tspan>
            <tspan x="-60" dy="27">e torne-se o <tspan fontWeight="700">CEO</tspan> da sua</tspan>
            <tspan x="-60" dy="27">empresa de <tspan fontWeight="700">Hardscape</tspan></tspan>
          </text>
          {/* metal-bound end with a rim, and the end disc */}
          <path d="M-336 -100V100" stroke="#000000" strokeOpacity="0.4" strokeWidth="4" />
          <ellipse cx="320" cy="0" rx="36" ry="100" fill="#0E3A30" />
          <ellipse cx="320" cy="0" rx="36" ry="100" fill="none" stroke="#2E6F5F" strokeWidth="3" />
          <ellipse cx="322" cy="0" rx="26" ry="84" fill="#0A2F27" />
          <g transform="translate(322 0) scale(0.34 1)">
            <MarkG x={-60} y={-60} size={120} fill={GREEN} />
          </g>
          <path d="M-330 -96H316" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="3" />
        </g>
      </g>
    </Art>
  );
}

// ---- Business card stacks ----
function Stack({ face, edge, n = 10, children }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const o = (n - i) * 0.95;
        return <rect key={i} x={r2(o)} y={r2(o)} width="320" height="200" rx="8" fill={edge} stroke={i % 2 ? '#000000' : '#FFFFFF'} strokeOpacity="0.12" strokeWidth="0.6" />;
      })}
      <rect width="320" height="200" rx="8" fill={face} />
      {children}
    </g>
  );
}

export function CardStacks() {
  const id = 'use-product-stacks';
  const mat = `${id}-m`;
  const pos = cascade(3, -30, 90, 400, 520);
  return (
    <Art viewBox="0 0 800 900" title="Business card stacks" exportName="use-product-kit-cards">
      <MaterialDefs idp={mat} />
      <SweepG idp={`${id}-s`} w={800} h={900} horizon={0.7} />
      {pos.map((p, i) => (
        <StepG key={i} i={i} x={p.x} y={p.y} rotate={-10}>
          <g className={i === 0 ? 'mock-lit' : undefined}>
            <CastG d="M0 0H330V210H0Z" depth={18} opacity={0.2} />
            {i === 0 && (
              <Stack face={NAVY} edge={GREEN}>
                <MarkG x={28} y={26} size={72} fill={GREEN} />
                <WordmarkG x={28} y={170} size={26} fill="#FFFFFF" />
              </Stack>
            )}
            {i === 1 && (
              <Stack face={GREEN} edge={NAVY}>
                <g transform="translate(26 176) rotate(-90)">
                  <WordmarkG x={0} y={0} size={34} fill="#FFFFFF" />
                </g>
                <MarkG x={238} y={26} size={56} fill={NAVY} />
              </Stack>
            )}
            {i === 2 && (
              <Stack face="#DFF7E6" edge="#8FC9B5">
                <MarkG x={118} y={30} size={84} fill={NAVY} />
                <DescriptorG x={160} y={160} size={10} fill={NAVY} anchor="middle" />
              </Stack>
            )}
            <rect width="320" height="200" rx="8" fill={`url(#${mat}-shade)`} opacity="0.7" />
            <path d="M8 .8H312" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.4" />
          </g>
        </StepG>
      ))}
    </Art>
  );
}

// ---- The puck ----
function Puck({ id, sid, mat, x, y, s, glow }) {
  const body = 'M-250 0V120A250 150 0 0 0 250 120V0A250 150 0 0 1 -250 0Z';
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ShadowG idp={`${sid}-sh`} cx={30} cy={150} rx={290} ry={46} opacity={0.4} blur={14} />
      <path d={body} fill="#E2EAD9" />
      <path d={body} fill={`url(#${mat}-shade)`} />
      <path d="M-250 120A250 150 0 0 0 250 120" fill="none" stroke={GREEN} strokeOpacity="0.45" strokeWidth="6" filter={`url(#${id}-glow)`} />
      <ellipse rx="250" ry="150" fill="#F1F5EC" />
      <ellipse rx="250" ry="150" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />
      <ellipse rx="218" ry="130" cy="-4" fill={GREEN} opacity={glow} filter={`url(#${id}-glow)`} />
      <ellipse rx="206" ry="122" cy="-4" fill={`url(#${id}-disc)`} />
      <g transform="translate(0 -4) scale(1 0.6)">
        <MarkG x={-78} y={-78} size={156} fill={GREEN} opacity="0.7" filter={`url(#${id}-glow)`} />
        <MarkG x={-78} y={-78} size={156} fill={GREEN} />
      </g>
      <SheenG idp={mat} d="M-206 -4A206 122 0 0 1 206 -4A206 122 0 0 1 -206 -4Z" opacity={0.5} />
    </g>
  );
}

export function PuckPlate() {
  const id = 'use-product-puck';
  const mat = `${id}-m`;
  return (
    <Art viewBox="0 0 800 900" title="The puck" exportName="use-product-kit-puck">
      <MaterialDefs idp={mat} />
      <defs>
        <filter id={`${id}-glow`} x="-20%" y="-30%" width="140%" height="160%"><feGaussianBlur stdDeviation="9" /></filter>
        <radialGradient id={`${id}-disc`} cx="0.35" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#2A3F8C" />
          <stop offset="0.6" stopColor={NAVY} />
          <stop offset="1" stopColor={DEEP} />
        </radialGradient>
      </defs>
      <SweepG idp={`${id}-s`} w={800} h={900} horizon={0.7} />
      <StepG i={0} x={380} y={380}>
        <g className="mock-lit"><Puck id={id} sid={`${id}-a`} mat={mat} x={0} y={0} s={1} glow={0.5} /></g>
      </StepG>
      <StepG i={1} x={700} y={760}>
        <Puck id={id} sid={`${id}-b`} mat={mat} x={0} y={0} s={0.6} glow={0.35} />
      </StepG>
    </Art>
  );
}
