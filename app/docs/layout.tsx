import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import DocsSidebar from '@/components/DocsSidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary transition-colors duration-200">
      <Navigation />
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-12 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <DocsSidebar />
        </aside>
        <main className="lg:col-span-9 min-w-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
