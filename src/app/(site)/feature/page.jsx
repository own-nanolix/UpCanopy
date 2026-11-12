import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Chip from '@/components/ui/Chip';
import { Line } from '@/components/ui/Card';
import { DESCRIPTOR, MANIFESTO } from '@/lib/brand';
import Desk from '@/components/pages/feature/Desk';
import { ThreeDesks, BeforeAfter, FrondTile, TenDots, SigFrond } from '@/components/pages/feature/Diagrams';
import s from '@/components/pages/feature/feature.module.css';

export const metadata = pageMeta('feature');

export default function Page() {
  return (
    <section className="page" id="p-feature" aria-label="Remote back-office">
      <div className={`wrap ${s.top}`}>
        <div className={s.topRow}>
          <h1 tabIndex={-1} className="t-display">Remote <span className="strong">back-office</span></h1>
          <Chip>{DESCRIPTOR}</Chip>
        </div>
        <p className={`t-lead ${s.lead}`}>
          One desk where CRM, Agenda and Financeiro are kept in order. Pick a client, move a block, tick a row, switch the mode: the three panels answer each other.
        </p>
      </div>

      <div className={`wrap ${s.sec}`}>
        <Reveal>
          <Desk />
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal>
          <div className={s.sig}>
            <div className={s.sigArt}><SigFrond /></div>
            <p className="t-label on-navy" style={{ position: 'relative', zIndex: 1 }}>Modo</p>
            <p className={s.sigLine} lang="pt-BR">
              <Line text={MANIFESTO[7]} strong={['"sobrevivência"', '"expansão"']} className="hl" />
            </p>
          </div>
        </Reveal>
      </div>

      <div className={`wrap ${s.sec}`}>
        <div className={s.secHead}>
          <h2 className="t-h2">Drawings of the desk</h2>
          <p className="t-small">Each one exports as SVG.</p>
        </div>
        <div className={s.figs}>
          <Reveal className={`${s.fig} ${s.f7}`}>
            <ThreeDesks />
            <p className={s.figCap}><span>Three desks under the arch</span><span>CRM · Agenda · Financeiro</span></p>
          </Reveal>
          <Reveal className={`${s.fig} ${s.f5}`} delay={120}>
            <FrondTile />
            <p className={s.figCap}><span>Frond tile</span></p>
          </Reveal>
          <Reveal className={`${s.fig} ${s.f12}`}>
            <BeforeAfter />
            <p className={s.figCap}><span>Before and after</span><span lang="pt-BR">sobrevivência → expansão</span></p>
          </Reveal>
          <Reveal className={`${s.fig} ${s.f12}`}>
            <TenDots />
            <p className={s.figCap}><span>Ten-dot scales</span></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
