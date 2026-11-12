import { CONTACT, DOCUMENT, PEOPLE, SIGN } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG, LockupStackG, WordmarkG, WordmarkVerticalG } from '@/components/art/Mark';
import { BrandDefs, FrondG, ArrowG } from '@/components/art/KeyArt';
import s from './lp-contato.module.css';

// m12: the compliance letter. Mint sheet, the word-mark huge and vertical along the left edge, the mark top right.
export function Letter() {
  const cut = DOCUMENT.title.indexOf(' e ');
  const lines = [DOCUMENT.title.slice(0, cut), DOCUMENT.title.slice(cut + 1)];
  return (
    <Art viewBox="0 0 520 680" title="Compliance letter: Termo de Compliance e Conduta Ética" exportName="lp-contato-letter">
      <BrandDefs idp="lp-contato-lt" />
      <clipPath id="lp-contato-lt-clip"><rect width="520" height="680" /></clipPath>
      <rect width="520" height="680" fill="url(#lp-contato-lt-paper)" />
      <g clipPath="url(#lp-contato-lt-clip)">
        <WordmarkVerticalG x={-6} y={668} size={104} fill="#162557" />
      </g>
      <MarkG x={420} y={36} size={58} fill="#26CF7B" archClass="roof-arch" barClass="roof-bar" />
      <g fill="#162557">
        <text x="236" y="150" fontSize="26" fontWeight="300" lang="pt-BR">{lines[0]}</text>
        <text x="236" y="182" fontSize="26" fontWeight="700" lang="pt-BR">{lines[1]}</text>
        <text x="236" y="218" fontSize="13" fontWeight="400">{DOCUMENT.address}</text>
      </g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x="236" y={262 + i * 24} width={i === 6 ? 120 : 250} height="7" fill="#162557" opacity="0.14" className="grow-x" style={{ '--i': i }} />
      ))}
      <rect x="236" y="560" width="250" height="3" fill="#162557" />
      <g fill="#162557" fontSize="11" fontWeight="500" letterSpacing="0.9" className="wide">
        <text x="236" y="592">{DOCUMENT.labels[0].toUpperCase()}</text>
      </g>
      <g fill="#162557" fontSize="11">
        <text x="236" y="616" fontWeight="700">{DOCUMENT.labels[1]}</text>
        <text x="236" y="634">{CONTACT.phone}</text>
        <text x="376" y="616" fontWeight="700">{DOCUMENT.labels[2]}</text>
        <text x="376" y="634">{CONTACT.sac}</text>
      </g>
    </Art>
  );
}

// m09: the badge on its lanyard. The portrait is not reproduced: the frond on navy stands in.
export function Badge() {
  return (
    <Art viewBox="0 0 560 760" title="Lanyard badge with the mark and word-mark" exportName="lp-contato-badge">
      <rect width="560" height="760" fill="#0C1445" />
      <clipPath id="lp-contato-bd-green"><rect x="0" y="0" width="250" height="360" /></clipPath>
      <clipPath id="lp-contato-bd-front"><rect x="0" y="0" width="250" height="360" rx="12" /></clipPath>
      <g transform="translate(280 0)">
        <g className={s.swing}>
          <rect x="-30" y="0" width="60" height="220" fill="#162557" />
          <WordmarkVerticalG x={-13} y={170} size={26} fill="#FFFFFF" />
          <MarkG x={-15} y={178} size={30} fill="#FFFFFF" />
          <circle cx="0" cy="240" r="16" fill="none" stroke="#6B6F80" strokeWidth="4" />
          <path d="M-14 250H14L10 306H-10Z" fill="#111111" />
          <g transform="translate(-125 292)">
            <g transform="translate(-60 -10) rotate(-14 125 180)">
              <g clipPath="url(#lp-contato-bd-green)">
                <rect width="250" height="360" rx="12" fill="#26CF7B" />
                <g transform="translate(70 330) rotate(-90)">
                  <WordmarkG x={0} y={0} size={56} fill="#FFFFFF" />
                </g>
              </g>
            </g>
            <g clipPath="url(#lp-contato-bd-front)">
              <rect width="250" height="360" rx="12" fill="#162557" />
              <g opacity="0.9">
                <FrondG cx={250} cy={360} r={150} a0={185} a1={275} count={30} len={170} width={8} lean={58} tone="onNavy" />
              </g>
              <MarkG x={20} y={24} size={36} fill="#26CF7B" />
              <WordmarkG x={230} y={46} size={16} fill="#FFFFFF" anchor="end" />
              <circle cx="125" cy="22" r="7" fill="#0C1445" />
              <text x="22" y="306" fontSize="30" fontWeight="300" fill="#FFFFFF">{PEOPLE.badge.name}</text>
              <text x="22" y="340" fontSize="30" fontWeight="300" fill="#FFFFFF">{PEOPLE.badge.role}</text>
            </g>
          </g>
        </g>
      </g>
    </Art>
  );
}

// m17: the wall sign. Gradient plate, stacked lockup, the address lower left, HOME and the arrow lower right.
export function WallSign() {
  return (
    <Art viewBox="0 0 800 480" title={`Wall sign: ${SIGN.home} arrow`} exportName="lp-contato-sign">
      <BrandDefs idp="lp-contato-sg" />
      <clipPath id="lp-contato-sg-clip"><rect width="800" height="480" /></clipPath>
      <rect width="800" height="480" fill="url(#lp-contato-sg-rise)" filter="url(#lp-contato-sg-grain)" />
      <g clipPath="url(#lp-contato-sg-clip)">
        <FrondG cx={820} cy={-20} r={330} a0={95} a1={185} count={34} len={240} width={10} lean={50} tone="onNavy" opacity={0.16} />
      </g>
      <LockupStackG x={160} y={110} fill="#FFFFFF" markFill="#26CF7B" />
      <text x="40" y="440" fontSize="15" fill="#26CF7B" fontWeight="500">{CONTACT.web}</text>
      <text x="670" y="446" fontSize="26" fontWeight="400" textAnchor="end" letterSpacing="4" fill="#FFFFFF" className="wide">{SIGN.home}</text>
      <ArrowG x={690} y={424} size={28} stroke="#FFFFFF" strokeWidth={3} />
    </Art>
  );
}
