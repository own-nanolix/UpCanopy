import { MANIFESTO, HEX } from '@/lib/brand';
import Art from '@/components/art/Art';
import { FrondG } from '@/components/art/KeyArt';
import LandingNav from '@/components/ui/LandingNav';
import s from './lp-manifesto.module.css';

const FIRST = 'Nós conhecemos o valor do suor.';
const REST = MANIFESTO[0].slice(FIRST.length).trim();

// The first sentence of the manifesto, set huge on Green Dark, with the frond fanning out from the edge.
export default function Hero() {
  return (
    <header className={`field-dark ${s.hero}`}>
      <LandingNav current="lp-manifesto" />
      <div className={s.heroArt} aria-hidden="true">
        <Art viewBox="0 0 900 760" title="Frond fanning out from the right edge" exportName="lp-manifesto-frond" decorative>
          <rect width="900" height="760" fill={HEX.greenDark} />
          <FrondG cx={900} cy={760} r={470} a0={182} a1={272} count={40} len={300} width={11} lean={58} tone="onDark" fan />
        </Art>
      </div>
      <div className={`wrap ${s.heroBody}`}>
        <p className={`t-label ${s.heroKicker}`}>Manifesto</p>
        <h1 lang="pt-BR" className={s.heroTitle} tabIndex={-1}>{FIRST}</h1>
        <p lang="pt-BR" className={`t-lead ${s.heroRest}`}>{REST}</p>
      </div>
    </header>
  );
}
