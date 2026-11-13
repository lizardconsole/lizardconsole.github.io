import { Navigation } from '@/components/navigation';
import { GalleryProvider } from '@/components/gallery-provider';
import { Hero } from '@/components/hero';
import { FeaturesGrid } from '@/components/features-grid';
import { HowItWorks } from '@/components/how-it-works';
import { Screenshots } from '@/components/screenshots';
import { VirtualRelationships } from '@/components/virtual-relationships';
import { FileConnections } from '@/components/file-connections';
import { Dashboards } from '@/components/dashboards';
import { TimeHandling } from '@/components/time-handling';
import { SecuritySection } from '@/components/security-section';
import { AtScale } from '@/components/at-scale';
import { ComparisonStrip } from '@/components/comparison-strip';
import { Quickstart } from '@/components/quickstart';
import { CallToActionBand } from '@/components/call-to-action-band';
import { Footer } from '@/components/footer';
import { GITHUB_URL } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lizard Console',
  description:
    'Self-hosted data console for your Postgres, MySQL and MongoDB fleet: auto-generated CRUD UI, natural-language querying, and dashboards that join across databases.',
  url: 'https://lizardconsole.github.io',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Self-hosted via Node.js or Docker (Linux, macOS, Windows)',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  sameAs: [GITHUB_URL],
  author: {
    '@type': 'Organization',
    name: 'Lizard Console',
    url: GITHUB_URL,
  },
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-bg-primary text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <main>
        <GalleryProvider>
          <Hero />
          <FeaturesGrid />
          <HowItWorks />
          <Screenshots />
        </GalleryProvider>
        <VirtualRelationships />
        <FileConnections />
        <Dashboards />
        <TimeHandling />
        <AtScale />
        <SecuritySection />
        <ComparisonStrip />
        <Quickstart />
        <CallToActionBand />
      </main>
      <Footer />
    </div>
  );
}
