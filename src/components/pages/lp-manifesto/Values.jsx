import { VALUES } from '@/lib/brand';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { ScaleDotsG } from '@/components/art/KeyArt';
import s from './lp-manifesto.module.css';

const [DISC, CONF] = VALUES.points;

function Paras({ items }) {
  return items.map((p) => <p key={p}>{p}</p>);
}

// The values as cards of unequal width: Discipline wide, Trust narrow, the summary full width on navy.
export default function Values() {
  return (
    <div>
      <div className={s.valuesIntro} lang="pt-BR">
        {VALUES.intro.map((p) => (
          <p key={p} className="t-lead">{p}</p>
        ))}
      </div>
      <div className={s.valueRow}>
        <article className={`${s.valueCard} ${s.valueWide}`}>
          <Art viewBox="0 0 120 120" title="Mark on a navy square" exportName="lp-manifesto-value-mark" className={s.valueIcon}>
            <rect width="120" height="120" fill="#162557" />
            <MarkG x={20} y={20} size={80} fill="#26CF7B" />
          </Art>
          <h3 lang="pt-BR" className="t-h2">{DISC.title}</h3>
          <div lang="pt-BR" className={s.valueText}><Paras items={DISC.text} /></div>
        </article>
        <article className={`${s.valueCard} ${s.valueNarrow}`}>
          <Art viewBox="0 0 300 40" title="Ten dots, one green" exportName="lp-manifesto-value-dots" className={s.valueDots}>
            <ScaleDotsG x={14} y={20} w={272} r={9} chosen={10} off="#162557" lock />
          </Art>
          <h3 lang="pt-BR" className="t-h2">{CONF.title}</h3>
          <div lang="pt-BR" className={s.valueText}><Paras items={CONF.text} /></div>
        </article>
      </div>
      <article className={`${s.valueCard} ${s.valueSummary}`}>
        <h3 lang="pt-BR" className="t-caps-lg">{VALUES.summary.title}</h3>
        <div lang="pt-BR" className={s.summaryText}><Paras items={VALUES.summary.text} /></div>
      </article>
    </div>
  );
}
