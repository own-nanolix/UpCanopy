import { ICONS } from './icons';
import { MARK_ARCH, MARK_BAR } from '@/components/art/Mark';

// Hidden SVG sprite: the logo symbol (#site-mark) and every icon (#site-icon-<name>).
export default function Sprite() {
  return (
    <svg id="site-sprite" width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <symbol id="site-mark" viewBox="0 0 100 100">
          <path d={MARK_ARCH} fill="currentColor" />
          <path d={MARK_BAR} fill="currentColor" />
        </symbol>
        {Object.entries(ICONS).map(([name, d]) => (
          <symbol key={name} id={`site-icon-${name}`} viewBox="0 0 24 24">
            <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="miter" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
