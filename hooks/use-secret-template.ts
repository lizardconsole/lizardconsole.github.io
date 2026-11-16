"use client";

import { useEffect, useState } from "react";

const TOKEN = /\{\{([A-Z_]+)\}\}/g;
const DEFAULT_BYTES = 32;

function randomSecret(byteLength: number) {
  const bytes = crypto.getRandomValues(new Uint8Array(byteLength));
  return btoa(String.fromCharCode(...bytes))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function useSecretTemplate(template: string, enabled = true, bytes: Record<string, number> = {}) {
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const sizes = JSON.stringify(bytes);

  useEffect(() => {
    if (!enabled) return;
    const byteLengths: Record<string, number> = JSON.parse(sizes);
    const names = new Set(Array.from(template.matchAll(TOKEN), (m) => m[1]));
    setValues(Object.fromEntries(Array.from(names, (name) => [name, randomSecret(byteLengths[name] ?? DEFAULT_BYTES)])));
  }, [template, enabled, sizes]);

  if (!enabled) return template;
  return template.replace(TOKEN, (_, name: string) => values?.[name] ?? "<random>");
}
