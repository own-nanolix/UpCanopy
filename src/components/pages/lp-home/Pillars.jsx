'use client';

import { motion } from 'framer-motion';
import { MANIFESTO, PILLARS, TAGLINE } from '@/lib/brand';
import { ease } from '@/lib/motion';
import s from './lp-home.module.css';

// The three sentences come straight from the manifesto paragraph ("... nossa obsessão é a Organização. Nossa
// linguagem é a Disciplina. Nossa promessa é a Confiança."); only the first letter is capitalised.
const SENTENCES = MANIFESTO[5]
  .split('Por isso, ')[1]
  .split('. ')
  .map((t) => (t.endsWith('.') ? t : `${t}.`))
  .map((t) => t.charAt(0).toUpperCase() + t.slice(1));

const TONES = ['field-navy', 'field-green', 'field-dark'];

// Three square blocks that lock into a row, one after another.
export default function Pillars() {
  return (
    <div>
      <ul className={s.pillars}>
        {PILLARS.map((name, i) => (
          <motion.li
            key={name}
            className={`${s.pillar} ${TONES[i]}`}
            initial={{ opacity: 0, y: 70, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.8, ease: ease.lock, delay: i * 0.14 }}
          >
            <h3 className={`t-wide ${s.pillarName}`} lang="pt-BR">{name}</h3>
            <p className={`t-lead ${s.pillarText}`} lang="pt-BR">{SENTENCES[i]}</p>
          </motion.li>
        ))}
      </ul>
      <p className={`t-h1 ${s.tagline}`} lang="pt-BR">
        {TAGLINE}
      </p>
    </div>
  );
}
