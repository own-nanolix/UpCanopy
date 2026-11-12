import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupStackG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import { LINES, CONTACT, HEX } from '@/lib/brand';
import { LineRows } from './svg-text';

// The three lit window panels (m15), each a square. The portrait of the first panel is not reproduced: the
// frond on navy fills it instead.
export function WindowA() {
  return (
    <Art viewBox="0 0 600 600" title="Window panel: navy with the mark and the word-mark" exportName="lp-home-window-navy">
      <rect width="600" height="600" fill={HEX.navy} />
      <FrondG cx={470} cy={330} r={400} a0={120} a1={240} count={36} len={380} width={11} lean={170} tone="onNavy" opacity={0.9} fan />
      <MarkG x={34} y={30} size={58} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
      <WordmarkG x={566} y={568} size={30} fill="#FFFFFF" anchor="end" />
    </Art>
  );
}

export function WindowB() {
  const idp = 'lp-home-window-mint';
  return (
    <Art viewBox="0 0 600 600" title="Window panel: mint to green with the brand line and contacts" exportName="lp-home-window-mint">
      <BrandDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-sky`} x1="0.2" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#62D39A" />
          <stop offset="0.55" stopColor="#A8E8C4" />
          <stop offset="1" stopColor="#E3F8E4" />
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill={`url(#${idp}-sky)`} />
      <rect width="600" height="600" fill={`url(#${idp}-dots)`} />
      <MarkG x={34} y={30} size={58} fill="#0FA05C" archClass="roof-arch" barClass="roof-bar" />
      <LineRows rows={LINES.bridge.rows4} strong={LINES.bridge.strong} x={566} y={72} size={25} anchor="end" fill={HEX.navy} strongFill={HEX.navy} />
      <text x="34" y="566" fontSize="17" fill={HEX.navy}>{CONTACT.footer}</text>
      <WordmarkG x={566} y={568} size={30} fill="#FFFFFF" anchor="end" opacity="0.6" />
    </Art>
  );
}

export function WindowC() {
  return (
    <Art viewBox="0 0 600 600" title="Window panel: navy with the stacked lockup" exportName="lp-home-window-lockup">
      <rect width="600" height="600" fill={HEX.navy} />
      <LockupStackG x={120} y={205} scale={0.75} fill="#FFFFFF" />
    </Art>
  );
}
