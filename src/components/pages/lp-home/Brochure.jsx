import Art from '@/components/art/Art';
import { MarkG, WordmarkG, LockupG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { LINES, CONTACT, HEX } from '@/lib/brand';
import { LineRows } from './svg-text';
import s from './lp-home.module.css';

// The brochure (m16): a mint panel over a green one carrying the brand line and the frond, and the navy panel
// to the right (its portrait is not reproduced; the frond on navy and the small lockup stand in).
export default function Brochure() {
  const idp = 'lp-home-brochure';
  return (
    <div className={s.brochure}>
      <Reveal>
        <Art viewBox="0 0 640 760" title="Brochure: green panel with the brand line and the frond, mint panel with the credibility line" exportName="lp-home-brochure">
          <BrandDefs idp={idp} />
          <defs>
            <clipPath id={`${idp}-green-clip`}><rect x="0" y="0" width="640" height="320" /></clipPath>
            <linearGradient id={`${idp}-mint`} x1="0.85" y1="0" x2="0.35" y2="0.9">
              <stop offset="0" stopColor="#5FD39A" />
              <stop offset="0.5" stopColor="#A9E9C5" />
              <stop offset="1" stopColor="#DDF6E2" />
            </linearGradient>
            <clipPath id={`${idp}-mint-clip`}><rect x="0" y="250" width="640" height="510" /></clipPath>
          </defs>
          <rect width="640" height="320" fill={HEX.green} />
          <g clipPath={`url(#${idp}-green-clip)`}>
            <FrondG cx={560} cy={500} r={230} a0={196} a1={290} count={34} len={250} width={8} lean={178} tone="onGreen" opacity={0.85} fan />
          </g>
          <LineRows rows={LINES.bridge.rows4} strong={LINES.bridge.strong} x={44} y={58} size={26} fill="#F2FFE4" strongFill="#F2FFE4" />
          <rect y="250" width="640" height="510" fill={`url(#${idp}-mint)`} />
          <rect y="250" width="640" height="510" fill={`url(#${idp}-dots)`} />
          <g clipPath={`url(#${idp}-mint-clip)`}>
            <MarkG x={540} y={274} size={62} fill={HEX.navy} archClass="roof-arch" barClass="roof-bar" />
            <LineRows rows={LINES.credibility.rows} strong={LINES.credibility.strong} x={44} y={530} size={22} fill={HEX.navy} strongFill={HEX.navy} />
            <text x="596" y="676" fontSize="17" textAnchor="end" fill={HEX.navy}>{CONTACT.phone}</text>
            <text x="596" y="700" fontSize="17" textAnchor="end" fill={HEX.navy}>{CONTACT.web}</text>
            <WordmarkG x={34} y={760} size={104} fill="#FFFFFF" opacity="0.55" />
          </g>
        </Art>
      </Reveal>
      <Reveal delay={140}>
        <Art viewBox="0 0 400 760" title="Brochure back: navy panel with the frond and the small lockup" exportName="lp-home-brochure-back">
          <rect width="400" height="760" fill={HEX.navy} />
          <FrondG cx={470} cy={330} r={330} a0={110} a1={250} count={34} len={330} width={10} lean={172} tone="onNavy" opacity={0.85} fan />
          <LockupG x={190} y={690} scale={0.5} fill="#FFFFFF" />
        </Art>
      </Reveal>
    </div>
  );
}
