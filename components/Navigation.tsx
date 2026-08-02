'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Terminal, Menu, X, Sun, Moon } from 'lucide-react';
import { GITHUB_URL, GITHUB_REPO } from '@/lib/site';
import GitHubStars from './GitHubStars';

const navLinks = [
  { label: 'Why Lizard', href: '/#comparison' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Security', href: '/#security' },
  { label: 'Screenshots', href: '/#screenshots' },
  { label: 'Quickstart', href: '/#quickstart' },
  { label: 'Docs', href: '/docs' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(next);
      localStorage.setItem('theme', next);
      return next;
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-primary bg-bg-secondary/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/lizard-logo.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" priority />
          <span className="font-display text-xl font-bold tracking-tight text-text-primary">Lizard</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs lg:text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 p-2 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary transition-all duration-200"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
            <GitHubStars repo={GITHUB_REPO} />
          </a>

          <a
            href="/#quickstart"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-gray-950 transition-all duration-200 shadow-md shadow-emerald-500/10"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Get Started</span>
          </a>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          <a
            href="/#quickstart"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-accent border border-emerald-500/20"
          >
            <span>Get Started</span>
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-text-secondary hover:text-text-primary hover:bg-bg-primary rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border-primary bg-bg-primary px-4 pt-2 pb-6 space-y-3 transition-all duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-border-primary flex flex-col gap-3">
            <a
              href="/#quickstart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-gray-950"
            >
              <Terminal className="h-4 w-4" />
              <span>Get Started</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
