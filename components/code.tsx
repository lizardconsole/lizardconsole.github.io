"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useSecretTemplate } from "@/hooks/use-secret-template";

interface CodeProps {
  children: string;
  secrets?: boolean | Record<string, number>;
}

export function Code({ children, secrets }: CodeProps) {
  const text = useSecretTemplate(children, Boolean(secrets), typeof secrets === "object" ? secrets : undefined);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="relative">
      <pre className="pr-12">
        <code>{text}</code>
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy to clipboard"}
        className="absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-md bg-surface text-text-secondary shadow-(--shadow-btn-secondary) transition-colors hover:text-text-primary"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
