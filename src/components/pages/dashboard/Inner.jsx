import { useState } from 'react';
import Icon from '@/components/site/Icon';
import Tabs from '@/components/ui/Tabs';
import { LockupG, MarkG } from '@/components/art/Mark';
import { FrondG, BrandDefs } from '@/components/art/KeyArt';
import { AREAS, DOCUMENT, CONTACT } from '@/lib/brand';
import { DAYS, HOURS } from './data';
import { Ph, MarkSvg, AccountChip, StageDot } from './Parts';
import s from './dashboard.module.css';

const Fields = ({ labels }) => (
  <div className={s.rFields}>
    {labels.map((l, i) => (
      <div key={l} className="slide-up" style={{ '--i': i }}><p className={s.cap}>{l}</p><div className={s.rBox}><Ph w="60%" /></div></div>
    ))}
  </div>
);

function PanelAgenda() {
  return (
    <div className={s.rWeek}>
      {DAYS.map((d, i) => (
        <div key={d} className="slide-up" style={{ '--i': i }}>
          <p className={s.cap}>{d}</p>
          {HOURS.slice(0, 4).map((h, k) => <div key={h} className={s.rCell} data-on={(i + k) % 3 === 0} />)}
        </div>
      ))}
    </div>
  );
}

function PanelMoney() {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i} className={`${s.rLine} slide-up`} style={{ '--i': i }}><Ph w={`${40 + (i % 3) * 14}%`} /><Ph w={80} /></div>
      ))}
      <div className={s.rLine} style={{ borderTop: '2px solid var(--ink)', marginTop: 8 }}><span className={s.cap}>{DOCUMENT.invoice[2]}</span><Ph w={120} h={14} /></div>
    </div>
  );
}

// Inner screen 1: a client record. The initials tile stands for a person; tabs split the three areas.
export function ScreenRecord({ b }) {
  const stage = b.stages[0];
  return (
    <div className={`${s.board} ${s.bF}`} data-screen="dashboard-record">
      <header className={s.cTop}>
        <MarkSvg size={52} color="#162557" />
        <p className={s.cap}>CRM<span>Client record</span></p>
        <span className={s.grow} />
        <AccountChip />
      </header>
      <div className={s.rHead}>
        <span className={s.rTile} aria-hidden="true">CL</span>
        <div className={s.phStack}><Ph w={360} h={22} /><Ph w={220} h={10} /></div>
        <span className={s.grow} />
        <span className={s.stageTxt}><StageDot stage={stage} />{stage}</span>
        <span className="chip chip-sm chip-navy">{AREAS[0]}</span>
      </div>
      <div className={s.rBody}>
        <Tabs
          id="dashboard-record"
          label="Client areas"
          tone="green"
          tabs={[
            { id: 'crm', label: AREAS[0], content: <Fields labels={[DOCUMENT.labels[0], DOCUMENT.labels[1], DOCUMENT.labels[2], 'Stage', 'Status', 'Note']} /> },
            { id: 'agenda', label: AREAS[1], content: <PanelAgenda /> },
            { id: 'fin', label: AREAS[2], content: <PanelMoney /> },
          ]}
        />
        <svg viewBox="0 0 300 360" className={s.rFrond} aria-hidden="true">
          <BrandDefs idp="dashboard-rec" />
          <clipPath id="dashboard-rec-clip"><rect width="300" height="360" /></clipPath>
          <rect width="300" height="360" fill="url(#dashboard-rec-rise)" />
          <g clipPath="url(#dashboard-rec-clip)"><FrondG cx={0} cy={380} r={170} a0={-95} a1={-5} count={30} len={190} width={8} tone="onNavy" /></g>
          <MarkG x={24} y={24} size={48} fill="#26CF7B" />
        </svg>
      </div>
    </div>
  );
}

// Inner screen 2: the invoice, rebuilt from the case study's sheet (lockup, Bank Account n°, Bank Detail, Total).
export function ScreenInvoice() {
  const [n, setN] = useState(5);
  return (
    <div className={`${s.board} ${s.bG}`} data-screen="dashboard-invoice">
      <div className={s.gSide}>
        <MarkSvg size={52} color="#26CF7B" />
        <p className={s.cap}>Invoice<span>{n} lines</span></p>
        <div className={s.gBtns}>
          <button type="button" className="btn btn-sm" onClick={() => setN((v) => Math.min(9, v + 1))} disabled={n >= 9}><Icon name="plus" size={18} />Add line</button>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => setN((v) => Math.max(1, v - 1))} disabled={n <= 1}><Icon name="close" size={18} />Remove line</button>
        </div>
      </div>
      <article className={s.sheet} aria-label="Invoice">
        <svg viewBox="0 0 400 60" width="320" aria-hidden="true"><LockupG fill="#162557" markFill="#26CF7B" /></svg>
        <div className={s.gLines}>
          {Array.from({ length: n }, (_, i) => (
            <div key={i} className={`${s.rLine} slide-up`} style={{ '--i': i }}><Ph w={`${46 + (i % 4) * 8}%`} /><Ph w={90} /></div>
          ))}
        </div>
        <div className={s.gBank}>
          <div><p className={s.cap}>{DOCUMENT.invoice[0]}</p><div className={s.rBox}><Ph w="70%" /></div></div>
          <div><p className={s.cap}>{DOCUMENT.invoice[1]}</p><div className={s.rBox}><Ph w="55%" /></div></div>
        </div>
        <div className={s.gTotal}><span className={s.cap}>{DOCUMENT.invoice[2]}</span><Ph w={160} h={18} /></div>
        <div className={s.gSign}><div><hr className="rule" /><p className={s.cap}>{DOCUMENT.labels[3]}</p></div><p className={s.gFoot}>{CONTACT.footer}</p></div>
      </article>
    </div>
  );
}
