// Anatomy of two gradients: stops, offsets, angle and direction, drawn with dimension lines and labels.
import Art from '@/components/art/Art';
import { r2 } from '@/lib/charts';
import { gradById, GradDef, angleOf } from './parts';
import s from './gradients.module.css';

const X0 = 80, Y0 = 84, S = 330;
const INK = '#162557';

function Halo({ children, ...p }) {
  return <g {...p}>{children}</g>;
}

function Drawing({ gkey, exportName }) {
  const g = gradById(gkey);
  const idp = `gradients-anat-${gkey}`;
  const ang = angleOf(g);
  const sx = X0 + g.v[0] * S, sy = Y0 + g.v[1] * S, ex = X0 + g.v[2] * S, ey = Y0 + g.v[3] * S;
  const rad = (ang * Math.PI) / 180;
  const R = 74;
  const stops = g.stops.map(([o, c], i) => ({ o, c, i, px: r2(sx + o * (ex - sx)), py: r2(sy + o * (ey - sy)), ly: r2(sy + o * (ey - sy) - 8) }));
  const barY = Y0 + S + 38;
  return (
    <figure className={s.fig}>
      <Art viewBox="0 0 900 540" title={`Anatomy of ${g.name}: stops, offsets and angle`} exportName={exportName} className={s.wide}>
        <defs>
          <GradDef idp={idp} g={g} />
          <linearGradient id={`${idp}-bar`} x1="0" y1="0" x2="1" y2="0">
            {g.stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
          </linearGradient>
          <marker id={`${idp}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10Z" fill={INK} />
          </marker>
        </defs>
        <rect width="900" height="540" fill="#F0F0F0" />
        <text x="80" y="48" fontSize="13" fontWeight="700" letterSpacing="1.6" fill={INK} className="wide">{g.name.toUpperCase()}</text>
        <text x="80" y="66" fontSize="12" fill="#4A5568">Direction: lower left to upper right, angle {ang}°</text>

        <rect x={X0} y={Y0} width={S} height={S} fill={`url(#${idp}-g)`} />
        <rect x={X0} y={Y0} width={S} height={S} fill="none" stroke={INK} strokeWidth="2" />

        {/* gradient vector with halo */}
        <path d={`M${sx} ${sy}L${ex} ${ey}`} stroke="#fff" strokeWidth="5" opacity="0.85" />
        <path d={`M${sx} ${sy}L${ex} ${ey}`} stroke={INK} strokeWidth="1.6" markerEnd={`url(#${idp}-arrow)`} />

        {/* angle: baseline, arc, label */}
        <path d={`M${sx} ${sy}H${r2(sx + R + 34)}`} stroke="#fff" strokeWidth="4" strokeDasharray="5 4" />
        <path d={`M${sx} ${sy}H${r2(sx + R + 34)}`} stroke={INK} strokeWidth="1.4" strokeDasharray="5 4" />
        <path d={`M${r2(sx + R)} ${sy}A${R} ${R} 0 0 0 ${r2(sx + R * Math.cos(rad))} ${r2(sy - R * Math.sin(rad))}`} fill="none" stroke="#fff" strokeWidth="4" />
        <path d={`M${r2(sx + R)} ${sy}A${R} ${R} 0 0 0 ${r2(sx + R * Math.cos(rad))} ${r2(sy - R * Math.sin(rad))}`} fill="none" stroke={INK} strokeWidth="1.6" />
        <text x={r2(sx + (R + 22) * Math.cos(rad / 2))} y={r2(sy - (R + 22) * Math.sin(rad / 2) + 5)} fontSize="15" fontWeight="700" fill={INK} stroke="#fff" strokeWidth="4" paintOrder="stroke" textAnchor="middle">{ang}°</text>

        {/* stops: points, leaders, labels */}
        {stops.map((t) => (
          <Halo key={t.i}>
            <path d={`M${t.px} ${t.py}H${X0 + S + 30}L${X0 + S + 44} ${t.ly}H${X0 + S + 70}`} fill="none" stroke="#fff" strokeWidth="4" opacity="0.9" />
            <path d={`M${t.px} ${t.py}H${X0 + S + 30}L${X0 + S + 44} ${t.ly}H${X0 + S + 70}`} fill="none" stroke={INK} strokeWidth="1.2" />
            <circle cx={t.px} cy={t.py} r="9" fill={t.c} stroke="#fff" strokeWidth="3" />
            <circle cx={t.px} cy={t.py} r="10.5" fill="none" stroke={INK} strokeWidth="1.4" />
            <rect x={X0 + S + 78} y={t.ly - 30} width="48" height="48" fill={t.c} stroke={INK} strokeWidth="2" />
            <text x={X0 + S + 140} y={t.ly - 8} fontSize="12" fontWeight="700" letterSpacing="1.4" fill={INK} className="wide">STOP {t.i + 1}</text>
            <text x={X0 + S + 140} y={t.ly + 12} fontSize="17" fill={INK}>{t.c} <tspan fontWeight="700">at {Math.round(t.o * 100)}%</tspan></text>
          </Halo>
        ))}

        {/* offsets: the same stops laid out on a straight 0 to 100% ruler */}
        <rect x={X0} y={barY} width={S} height="20" fill={`url(#${idp}-bar)`} stroke={INK} strokeWidth="1.5" />
        <path d={`M${X0} ${barY + 44}H${X0 + S}`} stroke={INK} strokeWidth="1.4" markerStart={`url(#${idp}-arrow)`} markerEnd={`url(#${idp}-arrow)`} />
        <text x={X0 + S / 2} y={barY + 62} fontSize="12" textAnchor="middle" fill="#4A5568">Offset along the gradient line, 0% to 100%</text>
        {[0, ...g.stops.map(([o]) => o), 1].filter((o, i, a) => a.indexOf(o) === i).map((o) => (
          <g key={o}>
            <path d={`M${r2(X0 + o * S)} ${barY}V${barY + 32}`} stroke={INK} strokeWidth="1.4" />
            <text x={r2(X0 + o * S)} y={barY + 14} fontSize="11" fontWeight="700" textAnchor="middle" fill="#fff" stroke={INK} strokeWidth="3" paintOrder="stroke">{Math.round(o * 100)}%</text>
          </g>
        ))}
      </Art>
      <figcaption className={s.cap}>
        <strong>{g.name}, anatomy</strong>
        <span>{g.stops.length} stops, angle {ang}°, vector from {Math.round(g.v[0] * 100)}%, {Math.round(g.v[1] * 100)}% to {Math.round(g.v[2] * 100)}%, {Math.round(g.v[3] * 100)}% of the box</span>
      </figcaption>
    </figure>
  );
}

export default function Anatomy() {
  return (
    <div className={s.anatGrid}>
      <Drawing gkey="ocean-park" exportName="gradients-anatomy-ocean-park" />
      <Drawing gkey="dark-ocean" exportName="gradients-anatomy-dark-ocean" />
    </div>
  );
}
