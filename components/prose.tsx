import type { ReactNode } from "react";

interface ProseProps {
  children: ReactNode;
}

export function Prose({ children }: ProseProps) {
  return <div className="prose-lizard max-w-3xl">{children}</div>;
}
