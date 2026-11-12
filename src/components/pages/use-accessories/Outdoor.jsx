// An open umbrella (navy panels, one Green Park panel with the mark) and a pair of socks.
import { MarkG } from '@/components/art/Mark';
import { ShadowG, StepG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import { C, Scene, Cast, rectD } from './parts';

function Umbrella({ ids, id, R = 330 }) {
  const p = `${ids.p}-umb${id}`;
  const ry = R * 0.52, apex = [0, -R * 0.34];
  const rim = (deg) => [R * Math.cos((deg * Math.PI) / 180), ry * Math.sin((deg * Math.PI) / 180)];
  const panels = Array.from({ length: 8 }, (_, j) => {
    const a0 = 22.5 + 45 * j, a1 = a0 + 45, mid = a0 + 22.5;
    const [x0, y0] = rim(a0), [x1, y1] = rim(a1);
    const d = `M${apex[0]} ${apex[1]}L${r2(x0)} ${r2(y0)}Q${r2((x0 + x1) / 2)} ${r2((y0 + y1) / 2 - R * 0.11)} ${r2(x1)} ${r2(y1)}Z`;
    const lit = Math.cos(((mid - 230) * Math.PI) / 180);
    return { j, d, lit, x0, y0, x1, y1 };
  });
  const ribs = panels.map((q) => [q.x0, q.y0]);
  const rimD = `M${-R} 0A${R} ${ry} 0 1 0 ${R} 0A${R} ${ry} 0 1 0 ${-R} 0Z`;
  const s = R * 0.3;
  return (
    <g>
      <radialGradient id={`${p}-dome`} cx="0.36" cy="0.3" r="0.75">
        <stop offset="0" stopColor="#fff" stopOpacity="0.3" /><stop offset="0.55" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity="0.3" />
      </radialGradient>
      <clipPath id={`${p}-sil`}>{panels.map((q) => <path key={q.j} d={q.d} />)}</clipPath>
      <ShadowG idp={p} cx={R * 0.2} cy={ry * 0.5} rx={R * 1.1} ry={ry * 0.8} opacity={0.12} blur={20} />
      <g transform={`translate(${r2(R * 0.12)} ${r2(R * 0.16)})`}><path d={rimD} fill={C.dark} opacity="0.13" /></g>
      <g filter={`url(#${ids.m}-fabric)`}>
        {panels.map((q) => <path key={q.j} d={q.d} fill={q.j === 1 ? C.green : C.navy} />)}
      </g>
      {panels.map((q) => <path key={q.j} d={q.d} fill={q.lit > 0 ? '#fff' : '#000'} opacity={r2(Math.abs(q.lit) * (q.lit > 0 ? 0.2 : 0.34))} />)}
      <g transform={`translate(0 ${r2(R * 0.133)}) scale(1 0.72)`}>
        <MarkG x={-s / 2} y={-s / 2} size={s} fill={C.navy} />
      </g>
      {ribs.map(([x, y], k) => (
        <g key={k} fill="none">
          <path d={`M${apex[0]} ${apex[1]}L${r2(x)} ${r2(y)}`} stroke="#6C716E" strokeWidth="3" />
          <path d={`M${apex[0]} ${apex[1]}L${r2(x)} ${r2(y)}`} stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" strokeDasharray="5 4" transform="translate(-1.5 -1.5)" />
          <circle cx={r2(x)} cy={r2(y)} r="4.5" fill="#9DA3A0" />
        </g>
      ))}
      <path d={`M${apex[0]} ${apex[1]}m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0`} fill={`url(#${ids.m}-metal)`} />
      <rect x="-3.5" y={apex[1] - 40} width="7" height="40" fill={`url(#${ids.m}-metal)`} />
      <rect x="-3.5" y={apex[1] - 40} width="7" height="40" fill={`url(#${ids.m}-shade)`} />
      <circle cx="0" cy={apex[1] - 42} r="4.6" fill={`url(#${ids.m}-metal)`} />
      {panels.map((q) => <path key={q.j} d={q.d} fill="none" stroke="#000" strokeOpacity="0.28" strokeWidth="1.6" />)}
      <g clipPath={`url(#${p}-sil)`}><rect x={-R} y={-R * 0.6} width={2 * R} height={R * 1.2} fill={`url(#${p}-dome)`} /></g>
    </g>
  );
}

const SOCK = 'M0 0H108V150C108 175 125 185 160 185H250C290 185 305 225 270 250C250 262 230 262 200 262H55C20 262 0 235 0 200Z';

function Sock({ ids, id, x, y, rot, cuff, mark, i }) {
  const clip = `${ids.p}-sock-${id}`;
  return (
    <StepG i={i} x={x} y={y}>
      <g transform={`rotate(${rot})`}>
        <clipPath id={clip}><path d={SOCK} /></clipPath>
        <pattern id={`${clip}-rib`} width="5" height="5" patternUnits="userSpaceOnUse"><rect width="2" height="5" fill="#000" opacity="0.2" /></pattern>
        <Cast d={SOCK} rot={rot} depth={22} />
        <g filter={`url(#${ids.m}-fabric)`}>
          <path d={SOCK} fill={C.navy} />
          <g clipPath={`url(#${clip})`}>
            <path d="M232 160H310V280H214Q250 220 232 160Z" fill={cuff} />
            <path d="M-6 216L72 216Q92 240 104 280L-6 280Z" fill={cuff} />
            <rect x="0" y="0" width="108" height="52" fill={cuff} />
            <rect x="0" y="0" width="108" height="52" fill={`url(#${clip}-rib)`} />
            <MarkG x={37} y={82} size={34} fill={mark} />
          </g>
        </g>
        <g clipPath={`url(#${clip})`}>
          <path d={rectD(0, 0, 320, 280)} fill={`url(#${ids.m}-shade)`} opacity="0.8" />
          <path d="M0 55H108M0 61H108" stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M60 120C80 160 70 190 40 210" stroke="#000" strokeOpacity="0.07" strokeWidth="14" fill="none" />
          <path d="M120 195H250" stroke="#fff" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4 3" />
        </g>
        <path d={SOCK} fill="none" stroke="#000" strokeOpacity="0.25" strokeWidth="1.5" />
      </g>
    </StepG>
  );
}

export function UmbrellaOpen() {
  return (
    <Scene k="umbrella" title="Open umbrella with navy panels and one Green Park panel with the mark" size="wide">
      {(ids) => (
        <StepG i={0} x={340} y={250}><Umbrella ids={ids} id="a" R={430} /></StepG>
      )}
    </Scene>
  );
}

export function SocksPair() {
  return (
    <Scene k="socks" title="Navy socks with a Green Park cuff band and the mark, stepping below the umbrella" size="narrow">
      {(ids) => (
        <>
          <StepG i={0} x={90} y={30}><Umbrella ids={ids} id="b" R={270} /></StepG>
          <Sock ids={ids} id="a" i={1} x={120} y={290} rot={-10} cuff={C.green} mark={C.green} />
          <Sock ids={ids} id="b" i={2} x={265} y={420} rot={6} cuff={C.mint} mark={C.green} />
        </>
      )}
    </Scene>
  );
}
