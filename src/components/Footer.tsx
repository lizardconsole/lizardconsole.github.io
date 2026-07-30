import { Database, Github, Terminal, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary/60 py-12 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-border-primary pb-8">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600">
              <Database className="h-4.5 w-4.5 text-gray-950" strokeWidth={2.5} />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-text-primary">Lizard</span>
          </div>

          {/* Core pitch tag */}
          <p className="text-xs text-text-muted font-sans text-center md:text-left">
            An open-source project designed to bridge database isolation and analytics in microservice clusters.
          </p>

          {/* Social / Dev links */}
          <div className="flex gap-4">
            <a
              href="#console"
              className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary transition-all"
              title="Try Sandbox"
            >
              <Terminal className="h-4 w-4" />
            </a>
            <a
              href="#quickstart"
              className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary transition-all"
              title="Security Model"
            >
              <Shield className="h-4 w-4" />
            </a>
          </div>

        </div>

        {/* Phase Checklist Status */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-[11px] font-mono text-text-muted">
          <div>
            <p className="text-text-primary font-bold uppercase mb-2">Fleet Browsing</p>
            <ul className="space-y-1.5">
              <li className="text-emerald-400">Phase 0: Skeleton Setup ✓</li>
              <li className="text-emerald-400">Phase 1: Multi-DB browse ✓</li>
              <li className="text-emerald-400">Phase 2: Scoped Auto CRUD ✓</li>
            </ul>
          </div>
          <div>
            <p className="text-text-primary font-bold uppercase mb-2">Schema Stitching</p>
            <ul className="space-y-1.5">
              <li className="text-emerald-400">Phase 3: Virtual FKs ✓</li>
              <li className="text-emerald-400">Phase 4: SQL Guard Ask ✓</li>
              <li className="text-emerald-400">Phase 5: Instant Charts ✓</li>
            </ul>
          </div>
          <div>
            <p className="text-text-primary font-bold uppercase mb-2">Dashboards & Scale</p>
            <ul className="space-y-1.5">
              <li className="text-emerald-400">Phase 6: Panel Grids ✓</li>
              <li className="text-emerald-400">Phase 7: Auth & Security ✓</li>
              <li className="text-emerald-400">Phase 8: Rich UI Widgets ✓</li>
            </ul>
          </div>
          <div>
            <p className="text-text-primary font-bold uppercase mb-2">Extensions</p>
            <ul className="space-y-1.5">
              <li className="text-teal-400">Phase 9A: Driver Seam ✓</li>
              <li className="text-teal-400">Phase 9B: MySQL Support ✓</li>
              <li className="text-text-muted/60">Phase 9D: MongoDB Grid (Next)</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border-primary/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-text-muted font-mono">
          <span>&copy; {new Date().getFullYear()} Lizard Console Inc. MIT Licensed.</span>
          <div className="flex gap-4">
            <a href="#thesis" className="hover:text-text-primary transition-colors">Product Thesis</a>
            <a href="#console" className="hover:text-text-primary transition-colors">Security Guard</a>
            <a href="#quickstart" className="hover:text-text-primary transition-colors">Self-Hosting recipe</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
