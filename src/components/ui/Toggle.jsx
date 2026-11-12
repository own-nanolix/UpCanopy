'use client';

import { useState } from 'react';

// A switch.  <Toggle label="Agenda" checked={on} onChange={setOn} />
// Uncontrolled when `checked` is not given (use defaultChecked).
export default function Toggle({ label, checked, defaultChecked = false, onChange, className = '', hideLabel = false, ...rest }) {
  const [inner, setInner] = useState(defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const flip = () => {
    if (checked === undefined) setInner(!on);
    if (onChange) onChange(!on);
  };
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={hideLabel ? label : undefined} className={`toggle ${className}`} onClick={flip} {...rest}>
      <span className="toggle-track" aria-hidden="true">
        <span className="toggle-thumb" />
      </span>
      {!hideLabel && <span>{label}</span>}
    </button>
  );
}

// A two- or three-option switch: buttons in a row, one pressed.
// <Segmented id="lp-home-area" label="Area" options={['CRM', 'Agenda', 'Financeiro']} value={v} onChange={setV} />
export function Segmented({ id, label, options, value, onChange, className = '' }) {
  const [inner, setInner] = useState(options[0]);
  const active = value !== undefined ? value : inner;
  const pick = (o) => {
    if (value === undefined) setInner(o);
    if (onChange) onChange(o);
  };
  return (
    <div className={`row ${className}`} role="group" aria-label={label} id={id} style={{ gap: 4 }}>
      {options.map((o) => (
        <button key={o} type="button" className={`btn btn-sm ${o === active ? 'btn-navy' : 'btn-ghost'}`} style={o === active ? undefined : { boxShadow: 'none' }} aria-pressed={o === active} onClick={() => pick(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}
