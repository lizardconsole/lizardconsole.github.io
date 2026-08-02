'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

function formatStars(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
}

export default function GitHubStars({ repo }: { repo: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data.stargazers_count === 'number') {
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [repo]);

  if (stars === null) return null;

  return (
    <span className="hidden lg:flex items-center gap-1 text-[11px] font-mono text-text-secondary">
      <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
      {formatStars(stars)}
    </span>
  );
}
