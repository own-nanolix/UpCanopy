// Tablet, phone and watch showing the back-office, falling in size and stepping down-right.
import Art from '@/components/art/Art';
import { SweepG, CastG, ShadowG, MaterialDefs, StepG, SheenG } from '@/components/art/Mockup';
import { TabletG, PhoneG, WatchG, ScreenAppG, ScreenHomeG, ScreenWatchG } from '@/components/art/Devices';

const rect = (x, y, w, h, r = 0) => `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;

export function DeviceTrio() {
  const id = 'use-product-devices';
  const mat = `${id}-m`;
  const tw = 900, th = (tw * 900) / 1260;
  const pw = 300, ph = (pw * 884) / 430;
  const ww = 170, wh = (ww * 490) / 240;
  return (
    <Art viewBox="0 0 1600 1000" title="Tablet, phone and watch" exportName="use-product-devices">
      <MaterialDefs idp={mat} />
      <SweepG idp={`${id}-s`} w={1600} h={1000} horizon={0.7} />
      <StepG i={0} x={-90} y={70}>
        <g className="mock-lit">
          <ShadowG idp={`${id}-sh-t`} cx={tw / 2} cy={th + 10} rx={tw * 0.5} opacity={0.3} />
          <CastG d={rect(0, 0, tw, th, 32)} depth={30} opacity={0.2} />
          <TabletG idp={`${id}-t`} x={0} y={0} w={tw}>
            <g transform="translate(0 41) scale(0.7375)"><ScreenAppG idp={`${id}-t`} /></g>
          </TabletG>
          <SheenG idp={mat} d={rect(28, 28, tw - 56, th - 56)} opacity={0.35} />
        </g>
      </StepG>
      <StepG i={1} x={790} y={300}>
        <ShadowG idp={`${id}-sh-p`} cx={pw / 2} cy={ph + 6} rx={pw * 0.55} opacity={0.3} />
        <CastG d={rect(0, 0, pw, ph, 46)} depth={26} opacity={0.2} />
        <PhoneG idp={`${id}-p`} x={0} y={0} w={pw}><ScreenHomeG idp={`${id}-p`} /></PhoneG>
        <SheenG idp={mat} d={rect(10, 10, pw - 20, ph - 20)} opacity={0.2} />
      </StepG>
      <StepG i={2} x={1250} y={660}>
        <ShadowG idp={`${id}-sh-w`} cx={ww / 2} cy={wh + 4} rx={ww * 0.7} opacity={0.3} />
        <CastG d={rect(0, 100 * ww / 240, ww, wh - 100 * ww / 240, 50)} depth={20} opacity={0.2} />
        <WatchG idp={`${id}-w`} x={0} y={0} w={ww}><ScreenWatchG /></WatchG>
      </StepG>
    </Art>
  );
}
