'use client';

import Icon from '@/components/site/Icon';
import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';
import s from './icons.module.css';

// A separate button next to each icon (an exportable SVG never sits inside a button).
export default function CopyName({ name }) {
  const onClick = async () => {
    const ok = await copy(name);
    toast(ok ? `Copied ${name}` : `Could not copy ${name}`);
  };
  return (
    <button type="button" className={s.copyBtn} onClick={onClick} aria-label={`Copy icon name ${name}`}>
      <Icon name="copy" size={16} />
    </button>
  );
}
