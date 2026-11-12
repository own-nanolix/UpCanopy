// Scene 2 (3:1): eight phones lying flat in isometric view, stepping from bottom-left to top-right; the first
// and the last are cropped by the frame. Screens alternate: the app home, navy, Green Park and mint.
import Art from '@/components/art/Art';
import { SweepG, ShadowG, CastG, MaterialDefs, StepG, SheenG, cascade } from '@/components/art/Mockup';
import { PhoneG, ScreenHomeG } from '@/components/art/Devices';
import { isoMatrix, isoRoundRect, isoPt, ScreenPlain } from './parts';

const P = 'showcase-s2';
const KINDS = ['home', 'navy', 'green', 'mint'];
const THICK = 9;
const [a, b, c, d] = isoMatrix();
const MATRIX = `matrix(${a} ${b} ${c} ${d} 0 0)`;
const SIDE = '#1E2547';

export default function SceneLineup() {
  const W = 2100, H = 700;
  const spots = cascade(8, -140, 566, 1790, 130);
  const outline = isoRoundRect(430, 884, 66);
  const bodies = Array.from({ length: THICK }, (_, j) => j + 1);
  const mid = isoPt(215, 442);
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Line-up of eight phones lying flat, stepping up to the right" exportName="showcase-phone-lineup">
      <MaterialDefs idp={P} />
      <SweepG idp={P} w={W} h={H} horizon={0.58} />
      {spots.map((s) => {
        const kind = KINDS[s.i % 4];
        const hero = s.i === 4;
        const phone = (
          <g transform={MATRIX}>
            <PhoneG idp={`${P}-p${s.i}`} x={0} y={0} w={430}>
              {kind === 'home' ? <ScreenHomeG idp={`${P}-h${s.i}`} /> : <ScreenPlain kind={kind} />}
            </PhoneG>
            <rect x="20" y="20" width="390" height="844" rx="48" fill={`url(#${P}-glass)`} opacity="0.55" />
          </g>
        );
        return (
          <StepG key={s.i} i={s.i} x={s.x} y={s.y}>
            <ShadowG idp={`${P}-s${s.i}`} cx={mid[0] + 20} cy={mid[1] + THICK + 6} rx={150} ry={36} opacity={0.3} blur={12} transform={`rotate(30 ${mid[0]} ${mid[1]})`} />
            <CastG d={outline} depth={22} />
            {/* the thickness: the same body stacked down, painted dark; the left face is lit, the right one in shade */}
            {bodies.map((j) => (
              <g key={j} transform={`translate(0 ${j})`}>
                <g transform={MATRIX}>
                  <rect width="430" height="884" rx="66" fill={SIDE} />
                </g>
              </g>
            ))}
            {hero ? (
              <g className="mock-lit">
                {phone}
                <SheenG idp={P} d={outline} opacity={0.4} />
              </g>
            ) : (
              phone
            )}
          </StepG>
        );
      })}
    </Art>
  );
}
