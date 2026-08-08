import Navigation from '@/components/Navigation';
import GalleryProvider from '@/components/GalleryProvider';
import Hero from '@/components/Hero';
import ComparisonStrip from '@/components/ComparisonStrip';
import FeaturesGrid from '@/components/FeaturesGrid';
import HowItWorks from '@/components/HowItWorks';
import Screenshots from '@/components/Screenshots';
import Dashboards from '@/components/Dashboards';
import TimeHandling from '@/components/TimeHandling';
import VirtualRelationships from '@/components/VirtualRelationships';
import AtScale from '@/components/AtScale';
import SecuritySection from '@/components/SecuritySection';
import Quickstart from '@/components/Quickstart';
import CallToActionBand from '@/components/CallToActionBand';
import Footer from '@/components/Footer';
import { GITHUB_URL } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lizard',
  description:
    'AI-native, zero-config data console for your Postgres, MySQL, and MongoDB fleet — auto-generated CRUD UI, natural-language querying, and prompt-driven charts, 100% self-hosted.',
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
    name: 'Lizard contributors',
    url: GITHUB_URL,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex flex-col font-sans antialiased overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <GalleryProvider>
        <Hero />
        <ComparisonStrip />
        <FeaturesGrid />
        <HowItWorks />
        <Screenshots />
      </GalleryProvider>
      <Dashboards />
      <TimeHandling />
      <VirtualRelationships />
      <AtScale />
      <SecuritySection />
      <Quickstart />
      <CallToActionBand />
      <Footer />
    </div>
  );
}
