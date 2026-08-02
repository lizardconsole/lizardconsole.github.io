import ScreenshotPlaceholder from './ScreenshotPlaceholder';

const shots = [
  {
    title: 'Data grid & CRUD',
    desc: 'Browse, filter, and edit every table across every connected database — auto-generated from the schema.',
  },
  {
    title: 'AI query console',
    desc: 'Ask a question, watch the agent explore the schema live, and review the generated SQL before it runs.',
  },
  {
    title: 'Charts & dashboards',
    desc: 'One-click visualize a result, or describe a chart in words. Pin panels from different databases to one dashboard.',
  },
];

export default function Screenshots() {
  return (
    <section id="screenshots" className="py-24 bg-bg-primary border-t border-b border-border-primary relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
            SEE IT IN ACTION
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            The console, screenshot by screenshot
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Real product screenshots — the fastest way to know what you're actually running.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {shots.map((shot) => (
            <div key={shot.title} className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-4 space-y-4">
              <ScreenshotPlaceholder label={`${shot.title} — screenshot coming soon`} className="h-56" />
              <div>
                <h3 className="font-display text-sm font-bold text-text-primary">{shot.title}</h3>
                <p className="mt-1.5 text-xs text-text-secondary leading-relaxed">{shot.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
