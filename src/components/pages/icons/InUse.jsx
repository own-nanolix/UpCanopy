'use client';

import { useState } from 'react';
import Link from 'next/link';
import Art from '@/components/art/Art';
import { ArrowG } from '@/components/art/KeyArt';
import Icon from '@/components/site/Icon';
import CopyValue from '@/components/site/CopyValue';
import Reveal from '@/components/site/Reveal';
import { CONTACT, SIGN, AREAS } from '@/lib/brand';
import { GlyphAt } from './data';
import s from './icons.module.css';

const RAIL = ['home', 'users', 'calendar', 'chart', 'gear'];
const RAIL_LABEL = ['Home', 'CRM', 'Agenda', 'Financeiro', 'Settings'];
const AREA_ICON = ['users', 'calendar', 'chart'];
const CONTACTS = [
  { icon: 'headset', label: 'Phone', value: CONTACT.phone },
  { icon: 'note', label: 'Email', value: CONTACT.sac },
  { icon: 'link', label: 'Web', value: CONTACT.web },
];

const wide = { fontFamily: 'var(--font-wide)' };

function RailArt({ on }) {
  return (
    <Art viewBox="0 0 96 396" title="Navy rail of square icon buttons, active one green" exportName="icons-use-rail" className={s.railArt}>
      <rect width="96" height="396" fill="#162557" />
      {RAIL.map((n, i) => (
        <g key={n}>
          <rect x="12" y={12 + i * 76} width="72" height="72" fill={i === on ? '#26CF7B' : 'none'} stroke={i === on ? '#26CF7B' : '#A9B1D1'} strokeWidth="2" />
          <GlyphAt name={n} x={24} y={24 + i * 76} size={48} color={i === on ? '#162557' : '#FFFFFF'} />
        </g>
      ))}
    </Art>
  );
}

function AreasArt() {
  return (
    <Art viewBox="0 0 540 130" title="Three area buttons: CRM, Agenda, Financeiro" exportName="icons-use-areas" className={s.useArt}>
      <rect width="540" height="130" fill="#F0F0F0" />
      {AREAS.map((a, i) => (
        <g key={a}>
          <rect x={10 + i * 176} y="10" width="168" height="110" fill={i === 0 ? '#26CF7B' : '#162557'} />
          <GlyphAt name={AREA_ICON[i]} x={26 + i * 176} y={26} size={40} color={i === 0 ? '#162557' : '#26CF7B'} />
          <text x={26 + i * 176} y="104" fontSize="15" fontWeight="500" letterSpacing="0.8" fill={i === 0 ? '#162557' : '#FFFFFF'} className="wide" style={wide}>
            {a.toUpperCase()}
          </text>
        </g>
      ))}
    </Art>
  );
}

function ContactArt() {
  return (
    <Art viewBox="0 0 440 210" title="Contact row: phone, email, web" exportName="icons-use-contact" className={s.useArt}>
      <rect width="440" height="210" fill="#F0F0F0" />
      {CONTACTS.map((c, i) => (
        <g key={c.label}>
          <rect x="14" y={14 + i * 64} width="52" height="52" fill="#26CF7B" />
          <GlyphAt name={c.icon} x={26} y={26 + i * 64} size={28} color="#162557" />
          <text x="82" y={36 + i * 64} fontSize="10" fontWeight="700" letterSpacing="1" fill="#4A5568" className="wide" style={wide}>
            {c.label.toUpperCase()}
          </text>
          <text x="82" y={58 + i * 64} fontSize="19" fontWeight="500" fill="#162557">
            {c.value}
          </text>
        </g>
      ))}
    </Art>
  );
}

function SignArt() {
  return (
    <Art viewBox="0 0 360 110" title="HOME arrow sign button" exportName="icons-use-sign" className={s.useArt}>
      <rect width="360" height="110" fill="#F0F0F0" />
      <rect x="14" y="14" width="332" height="82" fill="#162557" />
      <text x="40" y="66" fontSize="26" fontWeight="500" letterSpacing="1.5" fill="#FFFFFF" className="wide" style={wide}>
        {SIGN.home}
      </text>
      <rect x="262" y="14" width="84" height="82" fill="#26CF7B" />
      <ArrowG x={278} y={37} size={36} stroke="#162557" strokeWidth={4} />
    </Art>
  );
}

function Card({ n, title, note, art, live }) {
  return (
    <Reveal delay={n * 80} className={s.useCard}>
      <p className="t-label">Example 0{n}</p>
      <h3 className="t-caps-lg">{title}</h3>
      <div className={s.useStage}>{art}</div>
      <div className={s.useLive}>
        <p className="t-label">Live</p>
        {live}
      </div>
      <p className="t-small">{note}</p>
    </Reveal>
  );
}

export default function InUse() {
  const [on, setOn] = useState(2);
  const [area, setArea] = useState(0);
  return (
    <section id="icons-use" aria-labelledby="icons-use-h">
      <Reveal>
        <p className="t-label">Deliverable 03</p>
        <h2 id="icons-use-h" className="t-h2">
          Icons <span className="strong">in use</span>
        </h2>
        <p className="t-body muted" style={{ maxWidth: 640, marginTop: 12 }}>
          Four small compositions in the print-like language of the brand: square blocks, thick lines, navy and green. The
          artwork exports as SVG; the controls below it work.
        </p>
      </Reveal>
      <div className={s.useGrid}>
        <Card
          n={1}
          title="Navy rail"
          note="Square icon buttons; the active one turns green."
          art={<RailArt on={on} />}
          live={
            <div className={s.liveRail} role="group" aria-label="Rail of icon buttons">
              {RAIL.map((n, i) => (
                <button key={n} type="button" className={s.railIcon} aria-pressed={i === on} aria-label={RAIL_LABEL[i]} onClick={() => setOn(i)}>
                  <Icon name={n} size={24} />
                </button>
              ))}
            </div>
          }
        />
        <Card
          n={2}
          title="Area buttons"
          note="One icon per area of the back-office."
          art={<AreasArt />}
          live={
            <div className={s.liveAreas} role="group" aria-label="Areas">
              {AREAS.map((a, i) => (
                <button key={a} type="button" className={s.areaBtn} aria-pressed={i === area} onClick={() => setArea(i)}>
                  <Icon name={AREA_ICON[i]} size={24} />
                  <span>{a}</span>
                </button>
              ))}
            </div>
          }
        />
        <Card
          n={3}
          title="Contact row"
          note="The details printed in the case study."
          art={<ContactArt />}
          live={
            <ul className={s.liveContact}>
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <span className={s.contactIcon}><Icon name={c.icon} size={20} /></span>
                  <CopyValue value={c.value} label={`${c.label} ${c.value}`} />
                </li>
              ))}
            </ul>
          }
        />
        <Card
          n={4}
          title="Sign button"
          note="As on the wall sign: the word and a thick arrow."
          art={<SignArt />}
          live={
            <Link href="/overview/" className="btn btn-navy">
              {SIGN.home}
              <Icon name="arrow-right" size={20} />
            </Link>
          }
        />
      </div>
    </section>
  );
}
