'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

export interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

// The full set of product screenshots shown across the homepage (hero +
// screenshots section) — combined into one list so opening any of them lets
// you browse all of them, not just the 3-4 curated on whichever section you
// clicked from.
export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/screenshots/federated-orders-customers.png',
    alt: 'A Lizard dashboard federating a Postgres orders table with a Postgres customers table into a revenue-by-country chart and a joined orders table',
    title: 'Federated dashboard: orders → customers',
  },
  {
    src: '/screenshots/browse-orders-table.png',
    alt: 'A Lizard data grid showing an orders table, with FK-resolved customer names and inline row actions',
    title: 'Data grid & CRUD',
  },
  {
    src: '/screenshots/explore-ai.png',
    alt: 'The Lizard AI query console with an empty prompt box and a list of suggested natural-language questions',
    title: 'AI query console',
  },
  {
    src: '/screenshots/federated-tickets-customers.png',
    alt: 'A federated Lizard dashboard joining a MySQL tickets table with a Postgres customers table into a donut chart and a joined table',
    title: 'Charts & dashboards',
  },
];

interface GalleryContextValue {
  open: (index: number) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used within GalleryProvider');
  return ctx;
}

export default function GalleryProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(-1);

  const open = useCallback((i: number) => setIndex(i), []);
  const value = useMemo(() => ({ open }), [open]);

  const slides = GALLERY_IMAGES.map((img) => ({ src: img.src, alt: img.alt, title: img.title }));

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Counter]}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .9)' } }}
      />
    </GalleryContext.Provider>
  );
}
