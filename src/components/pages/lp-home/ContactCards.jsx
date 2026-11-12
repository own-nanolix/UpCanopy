import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { PEOPLE, CONTACT, HEX } from '@/lib/brand';
import s from './lp-home.module.css';

// The business card (m23): the navy side with the green mark, the green side with the contacts exactly as printed.
export default function ContactCards() {
  const [first, ...rest] = PEOPLE.founder.name.split(' ');
  const ink = HEX.greenDark;
  return (
    <div className={s.contact}>
      <Reveal>
        <Art className={s.card} viewBox="0 0 700 400" title="Business card front: navy with the green mark" exportName="lp-home-card-front">
          <rect width="700" height="400" fill={HEX.navy} />
          <rect y="388" width="700" height="12" fill={HEX.green} />
          <MarkG x={275} y={105} size={150} fill={HEX.green} archClass="roof-arch" barClass="roof-bar" />
        </Art>
      </Reveal>
      <Reveal delay={140}>
        <Art className={s.card} viewBox="0 0 700 400" title="Business card back: green with the founder's contacts" exportName="lp-home-card-back">
          <rect width="700" height="400" fill={HEX.green} />
          <text x="44" y="64" fontSize="20" fill={ink}>
            <tspan fontWeight="700">{first}</tspan> <tspan fontWeight="300">{rest.join(' ')}</tspan>
          </text>
          <text x="44" y="90" fontSize="15" fontWeight="300" fill={ink}>{PEOPLE.founder.role}</text>
          <g fontSize="19" fontWeight="400" fill={ink}>
            <text x="44" y="190">{CONTACT.handle}</text>
            <text x="44" y="218">{CONTACT.phone}</text>
            <text x="44" y="246">{CONTACT.hello}</text>
            <text x="44" y="300">{CONTACT.address}</text>
            <text x="44" y="352" fontWeight="700">{CONTACT.webCased}</text>
          </g>
          <WordmarkG x={656} y={66} size={26} fill="#FFFFFF" anchor="end" weight={400} />
        </Art>
      </Reveal>
      <Reveal className={s.contactBtn} delay={200}>
        <Button href="/lp-contato/" variant="navy" iconRight="arrow-right">Contact</Button>
      </Reveal>
    </div>
  );
}
