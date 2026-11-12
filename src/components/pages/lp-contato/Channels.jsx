import { CONTACT } from '@/lib/brand';
import Icon from '@/components/site/Icon';
import CopyValue from '@/components/site/CopyValue';
import Reveal from '@/components/site/Reveal';
import s from './lp-contato.module.css';

const CHANNELS = [
  { id: 'tel', title: 'Telephone', icon: 'headset', values: [{ v: CONTACT.phone, label: 'telephone number' }], tone: 'navy' },
  { id: 'mail', title: 'E-mail', icon: 'note', values: [{ v: CONTACT.sac, label: `e-mail address ${CONTACT.sac}` }, { v: CONTACT.hello, label: `e-mail address ${CONTACT.hello}` }], tone: 'green' },
  { id: 'web', title: 'Web', icon: 'link', values: [{ v: CONTACT.web, label: 'web address' }], tone: 'paper' },
];

// Three channel cards with the real details printed in the case study, each value a copy button.
export default function Channels() {
  return (
    <div className={s.channelGrid}>
      {CHANNELS.map((c, k) => (
        <Reveal key={c.id} delay={k * 90}>
          <article className={`${s.channel} ${s[`ch_${c.tone}`]}`}>
            <div className="card-head">
              <h3 className="t-caps-lg">{c.title}</h3>
              <Icon name={c.icon} size={28} />
            </div>
            <ul className={s.channelVals}>
              {c.values.map((x) => (
                <li key={x.v} className="t-h3">
                  <CopyValue value={x.v} label={x.label} />
                </li>
              ))}
            </ul>
            <p className="t-caps">Click a value to copy it</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
