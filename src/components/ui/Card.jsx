import Icon from '@/components/site/Icon';

// The card. <Card title="Naming" arrow>text</Card>
// variant: 'white' (on the mint page) | 'slide' (presentation grey, square) | 'navy' | 'green' | 'line' (outline).
// The title is rendered with the heading tag given in `level` (default h3).
const CLASS = { white: 'card', slide: 'card-slide', navy: 'card-navy', green: 'card-green', line: 'card-line' };
export default function Card({ title, arrow = false, variant = 'white', level = 'h3', as: Tag = 'div', className = '', children, ...rest }) {
  const H = level;
  return (
    <Tag className={`${CLASS[variant] || 'card'} ${className}`} {...rest}>
      {(title || arrow) && (
        <div className="card-head">
          {title && <H className="t-caps-lg">{title}</H>}
          {arrow && <Icon name="arrow-right" size={20} />}
        </div>
      )}
      {children}
    </Tag>
  );
}

// A person shown by initials on a navy tile (portraits are never reproduced).
// <Who name="EDERSON DEVENS" role="CEO • FOUNDER" initials="ED" />
export function Who({ name, role, initials, className = '' }) {
  return (
    <p className={`who ${className}`}>
      <span className="who-face" aria-hidden="true">{initials}</span>
      <span>
        <span className="who-name" style={{ display: 'block' }}>{name}</span>
        <span className="who-role" style={{ display: 'block' }}>{role}</span>
      </span>
    </p>
  );
}

// Renders a brand line with its bold part, the designer's habit. `strong` is a string or an array of strings.
// On dark grounds use className="hl" (bold and Green Park); on light grounds "strong" (bold) or "hl-ink".
// <Line text={LINES.bridge.text} strong={LINES.bridge.strong} className="hl" />
export function Line({ text, strong, className = 'strong' }) {
  const parts = [].concat(strong || []).filter(Boolean);
  if (!parts.length) return text;
  const out = [];
  let rest = text;
  let key = 0;
  while (rest) {
    let best = -1;
    let hit = '';
    for (const p of parts) {
      const i = rest.indexOf(p);
      if (i >= 0 && (best < 0 || i < best)) { best = i; hit = p; }
    }
    if (best < 0) { out.push(rest); break; }
    if (best > 0) out.push(rest.slice(0, best));
    out.push(<span key={key++} className={className}>{hit}</span>);
    rest = rest.slice(best + hit.length);
  }
  return <>{out}</>;
}

// A quiet placeholder line for a fact the case study does not publish. width in em.
export function Placeholder({ width = 6, label = 'Not published in the case study' }) {
  return <span className="ph" style={{ minWidth: `${width}em` }} role="img" aria-label={label} />;
}
