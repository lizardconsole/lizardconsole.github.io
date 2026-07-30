import { useState } from 'react';
import { Database, Shield, Github, ArrowUpRight, Terminal, Menu, X, Sun, Moon } from 'lucide-react';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navigation({ theme, toggleTheme }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Why Lizard', href: '#comparison' },
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Virtual FKs', href: '#relationships' },
    { label: 'Security', href: '#security' },
    { label: 'Sandbox', href: '#console' },
    { label: 'Quickstart', href: '#quickstart' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-primary bg-bg-secondary/80 backdrop-blur-md transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-lg shadow-emerald-500/15">
            <Database className="h-5 w-5 text-gray-950" strokeWidth={2.5} />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-xl font-bold tracking-tight text-text-primary">Lizard</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-900/50">v1.0</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
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

        {/* Live Systems Metrics & Actions */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 rounded-full border border-emerald-900/30 bg-emerald-950/20 px-3 py-1 text-[11px] text-emerald-400">
            <Shield className="h-3 w-3" />
            <span>SQL Guard: <strong className="text-emerald-300">Enforced</strong></span>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary transition-all duration-200"
            title="GitHub Repository"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href="#quickstart"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3.5 py-1.5 text-xs font-bold text-gray-950 transition-all duration-200 shadow-md shadow-emerald-500/10"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span>Get Started</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle Button for Mobile header */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
          </button>

          <a
            href="#quickstart"
            className="flex items-center gap-1.5 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20"
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

      {/* Mobile Drawer */}
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
              href="#quickstart"
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
