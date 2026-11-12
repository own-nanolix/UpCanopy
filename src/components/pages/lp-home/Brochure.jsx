import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { LINES, CONTACT, HEX } from '@/lib/brand';
import { LineRows } from './svg-text';
import s from './lp-home.module.css';

// The brochure (m16), measured on the front copy (units are twice the reference pixels, origin at the left
// edge of the mint sheet and the top of the navy sheet behind it):
//   green sheet   x 10, y 50, 597 x 390, the brand line from (48, 120) at 31 units, 40 between rows
//   mint sheet    y 440 to the foot, full width; mark top right (620, 470, 90 units); the credibility line
//                 from (47, 970) at 26 units; contacts right-aligned at x 712; pale word-mark along the foot
//   navy sheet    behind both (its top shows above the green); on the right its visible strip carries the
//                 small lockup at the foot. The portrait is not reproduced: the frond on navy stands in.
export default function Brochure() {
  const idp = 'lp-home-brochure';
  return (
    <div className={s.brochure}>
      <Reveal>
        <Art viewBox="0 0 757 1455" title="Brochure: green panel with the brand line and the frond, mint panel with the credibility line" exportName="lp-home-brochure">
          <BrandDefs idp={idp} />
          <defs>
            <clipPath id={`${idp}-green-clip`}><rect x="10" y="50" width="597" height="390" /></clipPath>
            <linearGradient id={`${idp}-mint`} x1="1" y1="0" x2="0.2" y2="0.75">
              <stop offset="0" stopColor="#4FCB8C" />
              <stop offset="0.45" stopColor="#ABE5C2" />
              <stop offset="1" stopColor="#DDF3E0" />
            </linearGradient>
            <clipPath id={`${idp}-mint-clip`}><rect x="0" y="440" width="757" height="1015" /></clipPath>
          </defs>
          <rect width="757" height="1455" fill={HEX.navy} />
          <rect x="10" y="50" width="597" height="390" fill={HEX.green} />
          <g clipPath={`url(#${idp}-green-clip)`}>
            <FrondG cx={720} cy={470} r={480} a0={189.5} a1={262} count={34} len={110} width={9} lean={-62} tone="onGreen" opacity={0.9} fan />
          </g>
          <LineRows rows={LINES.bridge.rows4} strong={LINES.bridge.strong} x={48} y={120} size={31} lh={1.29} fill="#F2FFE4" strongFill="#F2FFE4" />
          <rect y="440" width="757" height="1015" fill={`url(#${idp}-mint)`} />
          <rect y="440" width="757" height="1015" fill={`url(#${idp}-dots)`} />
          <g clipPath={`url(#${idp}-mint-clip)`}>
            <MarkG x={620} y={470} size={90} fill={HEX.greenDark} archClass="roof-arch" barClass="roof-bar" />
            <LineRows rows={LINES.credibility.rows} strong={LINES.credibility.strong} x={47} y={970} size={26} lh={1.246} fill={HEX.greenDark} strongFill={HEX.greenDark} />
            <text x="712" y="1265" fontSize="26" textAnchor="end" fill={HEX.greenDark}>{CONTACT.phone}</text>
            <text x="712" y="1295" fontSize="26" textAnchor="end" fill={HEX.greenDark}>{CONTACT.web}</text>
            <WordmarkG x={50} y={1415} size={108} fill="#FFFFFF" opacity="0.55" />
          </g>
        </Art>
      </Reveal>
      <Reveal delay={140}>
        <Art viewBox="0 0 312 1455" title="Brochure back: navy panel with the frond and the small lockup" exportName="lp-home-brochure-back">
          <rect width="312" height="1455" fill={HEX.navy} />
          <FrondG cx={420} cy={560} r={330} a0={110} a1={250} count={34} len={300} width={10} lean={172} tone="onNavy" opacity={0.85} fan />
          <LockupG x={72} y={1379} scale={0.528} fill="#FFFFFF" />
        </Art>
      </Reveal>
    </div>
  );
}
