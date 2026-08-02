import Link from 'next/link';
import Image from 'next/image';
import { Github, Shield, BookOpen } from 'lucide-react';
import { GITHUB_URL } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary/60 py-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border-primary pb-8">
          <div className="flex items-center gap-2.5">
            <Image src="/lizard-logo.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">Lizard</span>
          </div>

          <p className="text-xs text-text-muted font-sans text-center md:text-left max-w-md">
            AI-native, zero-config data console for your Postgres, MySQL, and MongoDB fleet. Open source, self-hosted.
          </p>

          <div className="flex gap-4">
            <Link
              href="/docs"
              className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary transition-all"
              title="Docs"
            >
              <BookOpen className="h-4 w-4" />
            </Link>
            <a
              href="/#security"
              className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary transition-all"
              title="Security Model"
            >
              <Shield className="h-4 w-4" />
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary transition-all"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-text-muted font-mono">
          <span>&copy; {new Date().getFullYear()} Lizard contributors. Open source on GitHub.</span>
          <div className="flex gap-4">
            <Link href="/docs" className="hover:text-text-primary transition-colors">Docs</Link>
            <a href="/#security" className="hover:text-text-primary transition-colors">Security</a>
            <a href="/#quickstart" className="hover:text-text-primary transition-colors">Self-Hosting</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
