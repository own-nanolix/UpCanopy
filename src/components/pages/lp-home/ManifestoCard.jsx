import Art from '@/components/art/Art';
import { FrondG } from '@/components/art/KeyArt';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { LINES } from '@/lib/brand';
import s from './lp-home.module.css';

// "Deixe o caos para trás. Assuma o controle." large on dark green with the frond entering from the right edge.
export default function ManifestoCard() {
  const [first, second] = LINES.control.split('. ');
  return (
    <Reveal className={`${s.manifesto} field-dark`}>
      <Art className={s.manifestoArt} decorative viewBox="0 0 1200 560" preserveAspectRatio="xMaxYMid slice" exportName="lp-home-manifesto-frond">
        <FrondG cx={760} cy={290} r={560} a0={-62} a1={62} count={40} len={430} width={10} lean={-172} tone="onDark" opacity={0.75} fan />
      </Art>
      <h2 className={`t-display ${s.manifestoH2}`} lang="pt-BR">
        <span style={{ display: 'block' }}>{first}.</span>
        <span className="hl" style={{ display: 'block' }}>{second}</span>
      </h2>
      <div className={s.manifestoBtn}>
        <Button href="/lp-manifesto/" iconRight="arrow-right">Manifesto</Button>
      </div>
    </Reveal>
  );
}
