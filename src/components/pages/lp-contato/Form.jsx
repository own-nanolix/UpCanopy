'use client';

import { useState } from 'react';
import Field from '@/components/ui/Field';
import Button from '@/components/ui/Button';
import Icon from '@/components/site/Icon';
import s from './lp-contato.module.css';

const EMPTY = { name: '', email: '', tel: '', message: '' };
const REQUIRED = ['name', 'email', 'message'];
const NAMES = { name: 'Name', email: 'Email', tel: 'Telephone', message: 'Message' };

// Pure check: returns the error text for one field, or '' when it is fine.
function check(key, value) {
  const v = value.trim();
  if (REQUIRED.includes(key) && !v) return `${NAMES[key]} is required`;
  if (key === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter an e-mail address such as name@company.com';
  return '';
}

// The contact form with real states: empty, focused, filled, invalid and sent.
// Sending only switches the view to a summary: the page makes no network request, and says so.
export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);

  const errors = Object.fromEntries(Object.keys(EMPTY).map((k) => [k, touched[k] ? check(k, values[k]) : '']));
  const done = REQUIRED.filter((k) => !check(k, values[k])).length;

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = (e) => {
    e.preventDefault();
    const all = Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true]));
    setTouched(all);
    const bad = Object.keys(EMPTY).find((k) => check(k, values[k]));
    if (bad) {
      document.getElementById(`lp-contato-${bad}`)?.focus();
      return;
    }
    setSent(true);
  };
  const reset = () => {
    setValues(EMPTY);
    setTouched({});
    setSent(false);
  };

  const field = (k, extra) => (
    <Field
      id={`lp-contato-${k}`}
      label={NAMES[k] + (REQUIRED.includes(k) ? ' (required)' : ' (optional)')}
      name={k}
      value={values[k]}
      onChange={set(k)}
      onBlur={blur(k)}
      required={REQUIRED.includes(k)}
      aria-invalid={errors[k] ? 'true' : undefined}
      hint={errors[k] || undefined}
      className={`${values[k].trim() && !errors[k] ? s.filled : ''} ${errors[k] ? s.invalid : ''}`}
      {...extra}
    />
  );

  if (sent) {
    return (
      <div className={`${s.form} ${s.sentBox}`} role="status" aria-live="polite" id="lp-contato-sent">
        <div className={s.sentHead}>
          <span className={s.sentTick} aria-hidden="true"><Icon name="check" size={22} /></span>
          <h2 className="t-caps-lg">Message ready</h2>
        </div>
        <p className="t-body">
          Nothing was sent. This page makes no network request, so the message below stays in your browser until you leave.
        </p>
        <dl className={s.sentList}>
          {Object.keys(EMPTY).map((k) => (
            <div key={k} className={s.sentRow}>
              <dt className="t-caps">{NAMES[k]}</dt>
              <dd>{values[k].trim() || <span className="ph" role="img" aria-label="Left empty" />}</dd>
            </div>
          ))}
        </dl>
        <div className={s.formFoot}>
          <Button variant="navy" onClick={() => setSent(false)}>Edit message</Button>
          <Button variant="ghost" onClick={reset}>Clear form</Button>
        </div>
      </div>
    );
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate aria-label="Contact form">
      <div className={s.progress} aria-hidden="true">
        {REQUIRED.map((k, i) => (
          <span key={k} className={`${s.progressStep} ${i < done ? s.progressOn : ''}`} />
        ))}
      </div>
      <div className={`slide-up ${s.formRow}`} style={{ '--i': 2 }}>
        {field('name', { autoComplete: 'name' })}
        {field('email', { autoComplete: 'email', type: 'email' })}
      </div>
      <div className="slide-up" style={{ '--i': 4 }}>
        {field('tel', { autoComplete: 'tel', type: 'tel' })}
      </div>
      <div className="slide-up" style={{ '--i': 6 }}>
        {field('message', { as: 'textarea', rows: 5, style: { padding: 14, resize: 'vertical' } })}
      </div>
      <div className={`slide-up ${s.formFoot}`} style={{ '--i': 8 }}>
        <Button type="submit" variant="navy" iconRight="arrow-right">Send</Button>
        <p className="t-small" id="lp-contato-form-note">
          {done} of {REQUIRED.length} required fields filled. Demo only: sending makes no network request.
        </p>
      </div>
    </form>
  );
}
