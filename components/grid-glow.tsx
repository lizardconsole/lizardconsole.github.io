'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const CELL = 48;
const LENGTH = 96;
const SPEED = 260;
const MAX_STREAKS = 4;

type Streak = {
  id: number;
  axis: 'x' | 'y';
  line: number;
  from: number;
  to: number;
  duration: number;
};

function pick(max: number) {
  return Math.floor(Math.random() * max);
}

export function GridGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    let id = 0;
    let timer: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const el = ref.current;
      if (el && document.visibilityState === 'visible') {
        const width = el.clientWidth;
        const height = el.clientHeight;
        const axis = Math.random() < 0.6 ? 'x' : 'y';
        const span = axis === 'x' ? width : height;
        const lines = Math.floor((axis === 'x' ? height * 0.6 : width) / CELL);
        const forward = Math.random() < 0.5;
        const from = forward ? -LENGTH : span;
        const to = forward ? span : -LENGTH;
        const streak: Streak = {
          id: id++,
          axis,
          line: (1 + pick(Math.max(lines, 1))) * CELL,
          from,
          to,
          duration: (span + LENGTH) / SPEED,
        };
        setStreaks((prev) => (prev.length >= MAX_STREAKS ? prev : [...prev, streak]));
      }
      timer = setTimeout(spawn, 900 + Math.random() * 1800);
    };

    timer = setTimeout(spawn, 600);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  const remove = (id: number) => setStreaks((prev) => prev.filter((s) => s.id !== id));

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden grid-fade">
      {streaks.map((s) => {
        const horizontal = s.axis === 'x';
        const forward = s.to > s.from;
        const direction = horizontal ? (forward ? 'to right' : 'to left') : forward ? 'to bottom' : 'to top';
        return (
          <motion.span
            key={s.id}
            className="absolute block"
            style={{
              top: horizontal ? s.line : 0,
              left: horizontal ? 0 : s.line,
              width: horizontal ? LENGTH : 1,
              height: horizontal ? 1 : LENGTH,
              background: `linear-gradient(${direction}, transparent, var(--accent))`,
              boxShadow: '0 0 6px 0 color-mix(in oklab, var(--accent) 50%, transparent)',
            }}
            initial={horizontal ? { x: s.from } : { y: s.from }}
            animate={horizontal ? { x: s.to } : { y: s.to }}
            transition={{ duration: s.duration, ease: 'linear' }}
            onAnimationComplete={() => remove(s.id)}
          />
        );
      })}
    </div>
  );
}
