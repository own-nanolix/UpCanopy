// <Chip>REMOTE BACK–OFFICE</Chip>             a small caps label, as on the slides of the case study
// <Chip tone="green" size="sm">CRM</Chip>      tone: green | navy | mint | ink; size: sm
// <Chip pressed={on} onClick={...}>Filter</Chip>  becomes a toggle button (use inside a client component)
export default function Chip({ children, tone, size, pressed, onClick, as: Tag = 'span', className = '', ...rest }) {
  const cls = ['chip', tone && `chip-${tone}`, size === 'sm' && 'chip-sm', className].filter(Boolean).join(' ');
  if (onClick || pressed !== undefined) {
    return (
      <button type="button" className={cls} aria-pressed={pressed} onClick={onClick} {...rest}>
        {children}
      </button>
    );
  }
  return (
    <Tag className={cls} {...rest}>
      {children}
    </Tag>
  );
}
