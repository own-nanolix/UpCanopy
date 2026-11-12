import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import IconRail from '@/components/pages/icons/IconRail';
import IconSheet from '@/components/pages/icons/IconSheet';
import Construction from '@/components/pages/icons/Construction';
import InUse from '@/components/pages/icons/InUse';
import Illustrations from '@/components/pages/icons/Illustrations';
import { SPECS } from '@/components/pages/icons/data';
import s from '@/components/pages/icons/icons.module.css';

export const metadata = pageMeta('icons');

export default function Page() {
  return (
    <section className="page" id="p-icons" aria-label="Icons and illustration">
      <div className="split split-right">
        <IconRail />
        <div className="split-main">
          <section className={s.intro} aria-labelledby="icons-intro-h">
            <Reveal>
              <h1 id="icons-intro-h" tabIndex={-1} className="t-h1">
                Icons and <span className="strong">illustration</span>
              </h1>
              <p className="t-lead" style={{ maxWidth: 680, marginTop: 14 }}>
                The set is drawn in the language of the mark: <span lang="pt-BR">linhas grossas e ângulos bem definidos</span>.
              </p>
              <div className={s.introRow}>
                {SPECS.map((t, i) => (
                  <Chip key={t} tone={i === 1 ? 'green' : undefined} size="sm">{t}</Chip>
                ))}
              </div>
            </Reveal>
          </section>
          <IconSheet />
          <Construction />
          <InUse />
          <Illustrations />
        </div>
      </div>
    </section>
  );
}
