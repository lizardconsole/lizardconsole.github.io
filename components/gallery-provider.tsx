'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/screenshots/federated-orders-customers.png',
    alt: 'A Lizard dashboard federating a Postgres orders table with a Postgres customers table into a revenue-by-country chart and a joined orders table',
    title: 'Federated dashboard: orders joined to customers',
  },
  {
    src: '/screenshots/browse-orders-table.png',
    alt: 'A Lizard data grid showing an orders table, with FK-resolved customer names and inline row actions',
    title: 'Data grid',
  },
  {
    src: '/screenshots/explore-ai.png',
    alt: 'The Lizard AI query console with a prompt box and suggested natural-language questions',
    title: 'Ask in plain English',
  },
  {
    src: '/screenshots/federated-tickets-customers.png',
    alt: 'A federated Lizard dashboard joining a MySQL tickets table with a Postgres customers table into a donut chart and a joined table',
    title: 'Cross-engine dashboard',
  },
  {
    src: '/screenshots/browse-tickets-kanban.png',
    alt: 'Support tickets shown as a kanban board grouped by status',
    title: 'Kanban view',
  },
  {
    src: '/screenshots/browse-customers-gallery.png',
    alt: 'Customers shown as a card gallery',
    title: 'Gallery view',
  },
  {
    src: '/screenshots/record-detail.png',
    alt: 'A single record detail page with related records',
    title: 'Record detail',
  },
  {
    src: '/screenshots/relationship-graph.png',
    alt: 'A schema graph showing a tickets table linked to a customers table in another database via a virtual relationship',
    title: 'Relationship graph',
  },
  {
    src: '/screenshots/explore-sql.png',
    alt: 'The SQL editor with connection chips for picking one database or federating across several',
    title: 'SQL editor',
  },
];

interface GalleryContextValue {
  open: (src: string) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useGallery must be used within GalleryProvider');
  return ctx;
}

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(-1);

  const open = useCallback((src: string) => {
    setIndex(Math.max(0, GALLERY_IMAGES.findIndex((img) => img.src === src)));
  }, []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <GalleryContext.Provider value={value}>
      {children}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={GALLERY_IMAGES}
        plugins={[Counter]}
        counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
        styles={{ container: { backgroundColor: 'rgba(10, 10, 12, .92)' } }}
      />
    </GalleryContext.Provider>
  );
}
