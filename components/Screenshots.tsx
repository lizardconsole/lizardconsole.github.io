'use client';

import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { useGallery } from './GalleryProvider';

// Indexes into GalleryProvider's GALLERY_IMAGES — index 0 is the hero shot,
// so these start at 1.
const shots = [
  {
    title: 'Data grid & CRUD',
    desc: 'Browse, filter, and edit every table across every connected database — auto-generated from the schema.',
    image: '/screenshots/browse-orders-table.png',
    alt: 'A Lizard data grid showing an orders table, with FK-resolved customer names and inline row actions',
    galleryIndex: 1,
  },
  {
    title: 'AI query console',
    desc: 'Ask a question, watch the agent explore the schema live, and review the generated SQL before it runs.',
    image: '/screenshots/explore-ai.png',
    alt: 'The Lizard AI query console with an empty prompt box and a list of suggested natural-language questions',
    galleryIndex: 2,
  },
  {
    title: 'Charts & dashboards',
    desc: 'One-click visualize a result, or describe a chart in words. Pin panels from different databases to one dashboard.',
    image: '/screenshots/federated-tickets-customers.png',
    alt: 'A federated Lizard dashboard joining a MySQL tickets table with a Postgres customers table into a donut chart and a joined table',
    galleryIndex: 3,
  },
];

export default function Screenshots() {
  const gallery = useGallery();

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
              <button
                type="button"
                onClick={() => gallery.open(shot.galleryIndex)}
                aria-label={`Expand: ${shot.title}`}
                className="group relative block h-56 w-full cursor-zoom-in overflow-hidden rounded-xl border border-border-primary"
              >
                <Image
                  src={shot.image}
                  alt={shot.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover object-top"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/30 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm">
                    <Maximize2 className="h-3.5 w-3.5" /> Expand
                  </span>
                </span>
              </button>
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
