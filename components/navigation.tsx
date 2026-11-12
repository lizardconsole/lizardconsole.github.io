'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Menu, X, Sun, Moon } from 'lucide-react';
import { GITHUB_URL, GITHUB_REPO } from '@/lib/site';
import { GitHubStars } from './github-stars';

const navLinks = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Security', href: '/#security' },
  { label: 'Compare', href: '/#comparison' },
  { label: 'Docs', href: '/docs' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(next);
      try {
        localStorage.setItem('theme', next);
      } catch {}
      return next;
    });
  };

  const ThemeIcon = theme === 'dark' ? Sun : Moon;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-[background-color,border-color] duration-200 border-b ${
        scrolled || mobileMenuOpen
          ? 'bg-bg-primary/80 backdrop-blur-xl border-border-primary'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/lizard-logo.png" alt="" width={28} height={28} className="h-7 w-7 object-contain" priority />
            <span className="text-[17px] font-semibold tracking-[-0.02em] text-text-primary">Lizard</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors cursor-pointer"
          >
            <ThemeIcon className="h-4 w-4" />
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex h-8 items-center gap-2 rounded-md px-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            aria-label="Lizard on GitHub"
          >
            <Github className="h-4 w-4" />
            <GitHubStars repo={GITHUB_REPO} />
          </a>

          <div className="mx-1 h-5 w-px bg-border-primary" />

          <a href="/docs/quickstart" className="btn btn-sm btn-primary">
            Get started
          </a>
        </div>

        <div className="flex md:hidden items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary hover:text-text-primary cursor-pointer"
          >
            <ThemeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-md text-text-secondary hover:text-text-primary cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border-primary bg-bg-primary px-4 pt-3 pb-5">
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-[15px] text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 text-[15px] text-text-secondary hover:text-text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
          <a
            href="/docs/quickstart"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary mt-4 w-full"
          >
            Get started
          </a>
        </div>
      )}
    </header>
  );
}
