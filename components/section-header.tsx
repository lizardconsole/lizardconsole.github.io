import type { ReactNode } from 'react';

export function SectionHeader({
  eyebrow,
  title,
  children,
  align = 'left',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl sm:text-[40px] font-semibold tracking-[-0.035em] leading-[1.1] text-text-primary text-balance">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-base sm:text-[17px] leading-7 text-text-secondary text-pretty">{children}</p>
      )}
    </div>
  );
}
