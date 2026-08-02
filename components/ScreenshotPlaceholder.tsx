import { ImageOff } from 'lucide-react';

export default function ScreenshotPlaceholder({
  label,
  className = '',
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border-primary bg-bg-secondary/40 text-text-muted ${className}`}
    >
      <ImageOff className="h-6 w-6" />
      <span className="text-xs font-mono text-center px-4">{label}</span>
    </div>
  );
}
