import Image from 'next/image';

const sizes = {
  md: { icon: 28, text: 'text-[17px]', mono: 'text-[15px]', caret: 'h-[15px] w-[7px]' },
  sm: { icon: 24, text: 'text-[15px]', mono: 'text-[13px]', caret: 'h-[13px] w-[6px]' },
};

export function Logo({ size = 'md', priority = false }: { size?: keyof typeof sizes; priority?: boolean }) {
  const s = sizes[size];
  return (
    <span className="flex items-center gap-2">
      <Image
        src="/lizard-logo.png"
        alt=""
        width={s.icon}
        height={s.icon}
        style={{ width: s.icon, height: s.icon }}
        className="object-contain"
        priority={priority}
      />
      <span className="flex items-baseline gap-1.5">
        <span className={`${s.text} font-semibold tracking-[-0.02em] text-text-primary`}>Lizard</span>
        <span className={`${s.mono} flex items-center font-mono tracking-[-0.02em] text-text-secondary`}>
          console
          <span aria-hidden="true" className={`logo-caret ml-[2px] inline-block translate-y-[1px] rounded-[1px] bg-accent ${s.caret}`} />
        </span>
      </span>
    </span>
  );
}
