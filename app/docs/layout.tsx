import type { ReactNode } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { DocsSidebar } from "@/components/docs-sidebar";

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
      <Navigation />
      <div className="container mx-auto w-full px-4 sm:px-6 py-12 lg:py-16 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3">
          <DocsSidebar />
        </aside>
        <main className="lg:col-span-9 min-w-0">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
