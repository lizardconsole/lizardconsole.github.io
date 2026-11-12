'use client';

import Image from 'next/image';
import { SectionHeader } from './section-header';
import { useGallery } from './gallery-provider';

const shots = [
  { src: '/screenshots/explore-ai.png', title: 'AI query console' },
  { src: '/screenshots/federated-tickets-customers.png', title: 'MySQL joined to Postgres' },
  { src: '/screenshots/record-detail.png', title: 'Record detail' },
  { src: '/screenshots/browse-customers-gallery.png', title: 'Gallery view' },
  { src: '/screenshots/relationship-graph.png', title: 'Relationship graph' },
  { src: '/screenshots/explore-sql.png', title: 'SQL editor' },
];

export function Screenshots() {
  const gallery = useGallery();

  return (
    <section id="screenshots" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Product" title="A closer look at the console">
          Real screenshots from a local fleet of five service databases.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((shot) => (
            <figure key={shot.src}>
              <button
                type="button"
                onClick={() => gallery.open(shot.src)}
                aria-label={`Open screenshot: ${shot.title}`}
                className="card group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden"
              >
                <Image
                  src={shot.src}
                  alt={shot.title}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-left-top transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="mt-3 text-sm text-text-secondary">{shot.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
