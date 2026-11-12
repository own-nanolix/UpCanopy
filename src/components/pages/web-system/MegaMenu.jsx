'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import { Line, Placeholder } from '@/components/ui/Card';
import LandingNav from '@/components/ui/LandingNav';
import { FrondG } from '@/components/art/KeyArt';
import { LINES, PILLARS } from '@/lib/brand';
import s from './web-system.module.css';

// Three area columns (each with one pillar), a fourth for the sectors, and a gradient tile with the frond.
const AREA_COLS = [
  { label: 'CRM', href: '/lp-crm/', pillar: PILLARS[0] },
  { label: 'Agenda', href: '/lp-agenda/', pillar: PILLARS[1] },
  { label: 'Financeiro', href: '/lp-financeiro/', pillar: PILLARS[2] },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(true);
  const btn = useRef(null);
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      setOpen(false);
      btn.current?.focus();
    }
  };
  return (
    <div className={`field-navy ${s.mega}`} onKeyDown={onKeyDown}>
      <LandingNav current="lp-crm" />
      <div className={s.megaBar}>
        <Button
          ref={btn}
          variant="ghost"
          size="sm"
          icon={open ? 'close' : 'menu'}
          aria-expanded={open}
          aria-controls="web-system-mega-panel"
          onClick={() => setOpen((o) => !o)}
        >
          Menu
        </Button>
        <span className="t-label" style={{ color: 'var(--navy-muted)' }}>Esc closes</span>
      </div>
      <div id="web-system-mega-panel" className={s.megaPanel} data-open={open} role="region" aria-label="Menu">
        <div className={s.megaInner}>
          <div className={s.megaGrid}>
            {AREA_COLS.map((c, i) => (
              <div key={c.label} className={s.megaCol} style={{ '--i': i }}>
                <Link href={c.href} className={s.megaTitle}>{c.label}<Icon name="arrow-right" size={18} /></Link>
                <Link href="/lp-manifesto/" className={s.megaLink} lang="pt-BR">{c.pillar}</Link>
                <div className={s.megaPh}><Placeholder width={9} /><Placeholder width={5} /></div>
              </div>
            ))}
            <div className={s.megaCol} style={{ '--i': 3 }}>
              <p className={s.megaTitle} style={{ cursor: 'default' }}>Landscape / Hardscape</p>
              <Link href="/lp-hardscape/" className={s.megaLink}>Hardscape</Link>
              <Link href="/lp-home/" className={s.megaLink}>Landscape</Link>
            </div>
            <div className={`${s.megaCol} ${s.megaTile} field-rise`} style={{ '--i': 4 }}>
              <svg className="tileFrond" viewBox="0 0 300 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <FrondG cx={0} cy={260} r={100} a0={268} a1={352} count={30} len={170} width={6} lean={58} tone="onNavy" opacity={0.6} />
              </svg>
              <svg viewBox="0 0 100 100" width="34" height="34" aria-hidden="true" style={{ color: 'var(--green)' }}><use href="#site-mark" /></svg>
              <p lang="pt-BR" className={`t-lead ${s.megaTileText}`}>
                <Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" />
              </p>
            </div>
          </div>
          <div className={s.megaFoot}>
            <div className={s.megaFootLinks}>
              <Link href="/lp-manifesto/" className="link link-arrow">Manifesto</Link>
              <Link href="/lp-contato/" className="link link-arrow">Contact</Link>
            </div>
            <Button href="/lp-home/" iconRight="arrow-right" size="sm">HOME</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
