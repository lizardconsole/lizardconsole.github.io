import type { ReactNode } from 'react';

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-lizard max-w-3xl">{children}</div>;
}
