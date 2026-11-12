import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import Card, { Line, Placeholder, Who } from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import { FrondG } from '@/components/art/KeyArt';
import { MarkCropG } from '@/components/art/Mark';
import { AREAS, CONTACT, LINES, MANIFESTO, PEOPLE, PILLARS } from '@/lib/brand';
import s from './web-system.module.css';

const AREA_ICON = { CRM: 'users', Agenda: 'calendar', Financeiro: 'chart' };

export function AreaCards() {
  return (
    <div className={s.areaGrid}>
      {AREAS.map((a) => (
        <article key={a} className={`card ${s.areaCard}`}>
          <span className={s.iconTile}><Icon name={AREA_ICON[a]} size={24} /></span>
          <h3 className="t-caps-lg">{a}</h3>
          <hr className={s.cardRule} />
          {[8, 6, 7].map((w, k) => <div key={k} className={s.phRow}><Placeholder width={w} /></div>)}
        </article>
      ))}
    </div>
  );
}

// The brand line card on the gradient: mark in one corner, line (last word bold green) in the opposite one,
// contacts small at the bottom right, the frond sweeping in from the lower left edge.
export function BrandLineCard() {
  return (
    <div className={`field-rise ${s.lineCard}`}>
      <svg className={s.lineCardFrond} viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <FrondG cx={0} cy={340} r={140} a0={268} a1={352} count={34} len={260} width={8} lean={58} tone="onNavy" opacity={0.6} />
      </svg>
      <div className={s.lineCardTop}>
        <svg viewBox="0 0 100 100" width="44" height="44" aria-hidden="true" style={{ color: 'var(--green)' }}><use href="#site-mark" /></svg>
        <p lang="pt-BR" className={`t-line ${s.lineCardText}`}>
          <Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" />
        </p>
      </div>
      <p className={`t-caps ${s.lineCardFoot}`}>{CONTACT.footer}</p>
    </div>
  );
}

export function CeoCard() {
  return (
    <div className={`card-navy ${s.ceoCard}`}>
      <div className={s.ceoText}>
        <svg viewBox="0 0 100 100" width="36" height="36" aria-hidden="true" style={{ color: 'var(--green)' }}><use href="#site-mark" /></svg>
        <p lang="pt-BR" className="t-line">
          <Line text={LINES.ceo.text} strong={LINES.ceo.strong} className="hl" />
        </p>
        <Button variant="mint" size="sm" iconRight="arrow-right">Hardscape</Button>
      </div>
      <svg className={s.ceoCrop} viewBox="0 0 120 340" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="120" height="340" fill="#26CF7B" />
        <MarkCropG idp="web-system-ceo" w={120} h={340} zoom={2.6} dx={-0.9} dy={-0.12} fill="#162557" />
      </svg>
    </div>
  );
}

// The pillar sentences, taken verbatim from the manifesto paragraph that names them.
const SENTENCES = MANIFESTO[5].split('. ').slice(1).map((t) => (t.endsWith('.') ? t : `${t}.`));

export function PillarCards() {
  return (
    <div>
      {PILLARS.map((p, i) => (
        <Card key={p} variant="line" className={s.pillarCard} title={p} arrow>
          <p lang="pt-BR" className="t-body" style={{ margin: 0 }}>
            <Line text={SENTENCES[i]} strong={p} className="hl-ink" />
          </p>
        </Card>
      ))}
    </div>
  );
}

export function PersonCard() {
  const f = PEOPLE.founder;
  return (
    <Card>
      <div className="card-head">
        <Who name={f.name} role={f.role} initials={f.initials} />
        <Chip tone="green" size="sm">CRM</Chip>
      </div>
      <div className={s.personRows}>
        <div className={s.personRow}><span className="t-label">Handle</span><span>{CONTACT.handle}</span></div>
        <div className={s.personRow}><span className="t-label">Telephone</span><span>{CONTACT.phone}</span></div>
        <div className={s.personRow}><span className="t-label">Email</span><span>{CONTACT.hello}</span></div>
      </div>
    </Card>
  );
}

