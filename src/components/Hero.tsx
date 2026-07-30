import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, Database, Play, CheckCircle2, RefreshCw, Github, ArrowRight,
  Search, Filter, Download, Plus, Eye, ShieldCheck, Sparkles, GitMerge, Table
} from 'lucide-react';

const SAMPLES = [
  {
    name: 'Postgres (Users DB)',
    url: 'postgresql://lizard_read:••••••••@pg-prod-us.internal:5432/production_users?sslmode=require',
    tables: ['public.users', 'public.user_profiles', 'public.user_sessions'],
    dbType: 'postgres'
  },
  {
    name: 'MySQL (Billing Core)',
    url: 'mysql://lizard_read:••••••••@mysql-billing-primary:3306/stripe_sync_billing',
    tables: ['stripe_sync.invoices', 'stripe_sync.payouts', 'stripe_sync.chargebacks'],
    dbType: 'mysql'
  },
  {
    name: 'MongoDB (Catalog Logs)',
    url: 'mongodb+srv://lizard_read:••••••••@mongo-replica.atlas/stock_catalog',
    tables: ['default.products', 'default.stock_logs', 'default.categories'],
    dbType: 'mongodb'
  }
];

export default function Hero() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [connectionString, setConnectionString] = useState(SAMPLES[0].url);
  const [status, setStatus] = useState<'idle' | 'testing' | 'introspecting' | 'connected'>('idle');
  const [logLines, setLogLines] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'preview' | 'playground'>('preview');

  useEffect(() => {
    setConnectionString(SAMPLES[selectedPreset].url);
    setStatus('idle');
    setLogLines([]);
  }, [selectedPreset]);

  const handleConnect = () => {
    if (status !== 'idle') return;
    
    setStatus('testing');
    setLogLines(['[Lizard Engine] Connecting to target database server...']);
    
    setTimeout(() => {
      setLogLines(prev => [...prev, '[SQL Guard] Verifying read/write role definitions (lizard_read, lizard_write)...']);
      setStatus('introspecting');
    }, 800);

    setTimeout(() => {
      setLogLines(prev => [
        ...prev,
        '[Introspector] Executing system schema query on pg_catalog/information_schema...',
        `[Introspector] Successfully indexed ${SAMPLES[selectedPreset].tables.length} tables and active foreign key structures.`
      ]);
    }, 1800);

    setTimeout(() => {
      setLogLines(prev => [
        ...prev,
        `[Lizard Engine] Zero-Config catalog cached. Listening on port 3000.`
      ]);
      setStatus('connected');
    }, 2800);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 glow-mesh transition-colors duration-200">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute top-1/3 left-1/4 -z-10 h-80 w-80 -translate-x-1/4 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Pitch Headline */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/40 bg-emerald-950/30 px-3.5 py-1 text-xs text-emerald-400 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider">Self-Hosted Multi-DB Admin Console</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
            Multi-database admin tool for engineering teams.{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-500 bg-clip-text text-transparent block mt-2">
              100% self-hosted in your VPC.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-sans">
            Connect <strong className="text-text-primary font-semibold">Postgres, MySQL, and MongoDB</strong>. Lizard auto-generates a browsable, editable UI with virtual foreign keys, custom dashboards, and guarded AI querying — with <strong className="text-emerald-400 font-semibold">zero schema pollution</strong>.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="#quickstart"
              className="group flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 py-3.5 text-sm font-bold text-gray-950 hover:opacity-95 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary/80 px-6 py-3.5 text-sm font-bold text-text-primary hover:bg-bg-tertiary transition-all cursor-pointer"
            >
              <Github className="h-4.5 w-4.5" />
              <span>View on GitHub</span>
            </a>

            <a
              href="#console"
              className="flex items-center gap-2 rounded-xl border border-border-primary bg-bg-secondary/40 px-6 py-3.5 text-sm font-semibold text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-all cursor-pointer"
            >
              <Play className="h-4 w-4 text-emerald-400" />
              <span>Try Live Sandbox</span>
            </a>
          </div>

          {/* Value callouts row */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs font-mono text-text-muted">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No SaaS Data Exposure</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> No System Tables Injected</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Cross-DB Virtual FKs</span>
          </div>
        </div>

        {/* Product UI Screenshot & Live Interactive Preview Container */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border-primary bg-bg-secondary/60 backdrop-blur-xl shadow-2xl overflow-hidden relative">
            
            {/* Top Bar of the Mockup Console */}
            <div className="bg-bg-primary px-4 py-3 border-b border-border-primary flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-xs text-text-secondary font-semibold flex items-center gap-2 border-l border-border-primary pl-3">
                  <Database className="h-3.5 w-3.5 text-emerald-400" />
                  <span>lizard-admin.internal</span>
                </span>
              </div>

              {/* View Toggle (Product Preview vs Connection Introspector) */}
              <div className="flex bg-bg-secondary p-1 rounded-lg border border-border-primary text-xs font-mono">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-bg-primary text-emerald-400 font-bold shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Data Grid Preview
                </button>
                <button
                  onClick={() => setActiveTab('playground')}
                  className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                    activeTab === 'playground'
                      ? 'bg-bg-primary text-emerald-400 font-bold shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  Live Introspector
                </button>
              </div>
            </div>

            {/* TAB 1: PRODUCT MOCKUP SCREENSHOT */}
            {activeTab === 'preview' && (
              <div className="p-4 sm:p-6 bg-bg-primary/90 space-y-4 font-sans">
                
                {/* Control bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-bg-secondary p-3 rounded-xl border border-border-primary">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono text-text-primary flex items-center gap-1.5 bg-bg-primary px-2.5 py-1 rounded border border-border-primary">
                      <Table className="h-3.5 w-3.5 text-emerald-400" />
                      public.orders
                    </span>
                    <span className="text-[10px] font-mono bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded border border-purple-900/50 flex items-center gap-1">
                      <GitMerge className="h-3 w-3" /> Virtual FK Connected → users_db.users
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <div className="relative">
                      <Search className="h-3.5 w-3.5 text-text-muted absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        readOnly
                        value="status = 'completed'"
                        className="bg-bg-primary border border-border-primary rounded-lg py-1.5 pl-8 pr-3 text-xs text-text-primary w-48 font-mono focus:outline-none"
                      />
                    </div>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border-primary bg-bg-primary text-text-secondary hover:text-text-primary">
                      <Filter className="h-3.5 w-3.5" /> Filter
                    </button>
                    <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-emerald-900/50 bg-emerald-950/30 text-emerald-400 font-semibold">
                      <Download className="h-3.5 w-3.5" /> Export CSV
                    </button>
                  </div>
                </div>

                {/* Simulated Data Grid */}
                <div className="overflow-x-auto border border-border-primary rounded-xl bg-bg-secondary/40">
                  <table className="w-full text-left text-xs font-mono leading-normal">
                    <thead className="bg-bg-tertiary text-text-secondary border-b border-border-primary text-[10px] uppercase">
                      <tr>
                        <th className="px-4 py-3 font-semibold">id</th>
                        <th className="px-4 py-3 font-semibold">user_id (Virtual FK)</th>
                        <th className="px-4 py-3 font-semibold">amount_usd</th>
                        <th className="px-4 py-3 font-semibold">status</th>
                        <th className="px-4 py-3 font-semibold">created_at</th>
                        <th className="px-4 py-3 font-semibold text-right">actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-primary text-text-secondary">
                      <tr className="hover:bg-bg-secondary/60">
                        <td className="px-4 py-3 font-bold text-text-primary">#ORD-9021</td>
                        <td className="px-4 py-3 text-teal-400 flex items-center gap-1.5 font-bold">
                          <span>usr_8820 (alice@acme.co)</span>
                          <span className="text-[9px] bg-teal-950 text-teal-300 px-1 rounded">Postgres</span>
                        </td>
                        <td className="px-4 py-3 text-emerald-400 font-bold">$1,250.00</td>
                        <td className="px-4 py-3">
                          <span className="bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded text-[10px]">completed</span>
                        </td>
                        <td className="px-4 py-3 text-text-muted">2026-07-24 10:12</td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-emerald-400 hover:underline text-[11px] font-bold">Edit Row</button>
                        </td>
                      </tr>

                      <tr className="hover:bg-bg-secondary/60">
                        <td className="px-4 py-3 font-bold text-text-primary">#ORD-9022</td>
                        <td className="px-4 py-3 text-teal-400 flex items-center gap-1.5 font-bold">
                          <span>usr_4401 (bob@dev.io)</span>
                          <span className="text-[9px] bg-teal-950 text-teal-300 px-1 rounded">Postgres</span>
                        </td>
                        <td className="px-4 py-3 text-emerald-400 font-bold">$3,400.50</td>
                        <td className="px-4 py-3">
                          <span className="bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded text-[10px]">completed</span>
                        </td>
                        <td className="px-4 py-3 text-text-muted">2026-07-24 10:28</td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-emerald-400 hover:underline text-[11px] font-bold">Edit Row</button>
                        </td>
                      </tr>

                      <tr className="hover:bg-bg-secondary/60">
                        <td className="px-4 py-3 font-bold text-text-primary">#ORD-9023</td>
                        <td className="px-4 py-3 text-amber-400 flex items-center gap-1.5 font-bold">
                          <span>usr_1092 (carol@cloud.com)</span>
                          <span className="text-[9px] bg-amber-950 text-amber-300 px-1 rounded">MySQL</span>
                        </td>
                        <td className="px-4 py-3 text-emerald-400 font-bold">$890.00</td>
                        <td className="px-4 py-3">
                          <span className="bg-amber-950/50 text-amber-300 border border-amber-900/50 px-2 py-0.5 rounded text-[10px]">pending</span>
                        </td>
                        <td className="px-4 py-3 text-text-muted">2026-07-24 10:31</td>
                        <td className="px-4 py-3 text-right">
                          <button className="text-emerald-400 hover:underline text-[11px] font-bold">Edit Row</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer status bar */}
                <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted pt-2">
                  <div className="flex items-center gap-4">
                    <span>Active connections: <strong className="text-text-primary">Postgres, MySQL, Mongo</strong></span>
                    <span>Zero DB pollution: <strong className="text-emerald-400">Verified</strong></span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Read/Write RBAC Role Active
                  </span>
                </div>

              </div>
            )}

            {/* TAB 2: LIVE PLAYGROUND CONNECTOR */}
            {activeTab === 'playground' && (
              <div className="p-5 sm:p-6 lg:p-8">
                
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-3">
                  {SAMPLES.map((sample, idx) => (
                    <button
                      key={sample.name}
                      onClick={() => setSelectedPreset(idx)}
                      className={`flex flex-col items-start text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                        selectedPreset === idx
                          ? 'border-emerald-500/40 bg-emerald-950/20 ring-1 ring-emerald-500/20'
                          : 'border-border-primary bg-bg-primary/40 hover:border-text-secondary/40 hover:bg-bg-primary/80'
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Preset {idx + 1}</span>
                      <span className="text-xs font-semibold text-text-primary mt-1">{sample.name}</span>
                    </button>
                  ))}
                </div>

                {/* Connection Bar */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <Database className="h-4 w-4 text-text-muted" />
                    </div>
                    <input
                      type="text"
                      value={connectionString}
                      onChange={(e) => setConnectionString(e.target.value)}
                      disabled={status !== 'idle'}
                      className="w-full bg-bg-primary border border-border-primary rounded-xl py-3 pl-10 pr-4 text-xs font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-emerald-500/50 disabled:opacity-70 transition-all"
                    />
                  </div>

                  <button
                    onClick={handleConnect}
                    disabled={status !== 'idle'}
                    className="rounded-xl px-6 py-3 text-xs font-bold text-text-primary bg-bg-primary hover:bg-bg-tertiary border border-border-primary flex items-center justify-center gap-2 transition-all cursor-pointer min-w-[150px]"
                  >
                    {status === 'idle' && (
                      <>
                        <span>Connect DB</span>
                        <ArrowRight className="h-3.5 w-3.5 text-emerald-400" />
                      </>
                    )}
                    {status === 'testing' && (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-400" />
                        <span>Ping Dialect...</span>
                      </>
                    )}
                    {status === 'introspecting' && (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                        <span>Analyzing Keys...</span>
                      </>
                    )}
                    {status === 'connected' && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        Connected
                      </span>
                    )}
                  </button>
                </div>

                {/* Output console */}
                <div className="mt-5 rounded-xl bg-bg-primary/80 p-4 border border-border-primary font-mono text-[11px] leading-relaxed text-text-secondary min-h-[110px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-text-muted mb-2 border-b border-border-primary pb-2">
                      <Terminal className="h-3.5 w-3.5 text-emerald-500/70" />
                      <span>INTROSCOPE_AUDIT_LOG_STREAM</span>
                    </div>

                    {logLines.length === 0 ? (
                      <p className="text-text-muted italic">Select a database connection preset and click "Connect DB" to simulate zero-config schema extraction.</p>
                    ) : (
                      <div className="space-y-1.5">
                        {logLines.map((line, i) => (
                          <p
                            key={i}
                            className={
                              line.includes('[Lizard Engine]')
                                ? 'text-emerald-400 font-medium'
                                : line.includes('Successfully')
                                ? 'text-teal-300'
                                : 'text-text-primary'
                            }
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>

                  {status === 'connected' && (
                    <div className="mt-4 pt-3 border-t border-border-primary flex flex-wrap items-center justify-between gap-2 text-[10px]">
                      <div className="flex items-center gap-3">
                        <span className="text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded">AUTO-CRUD GENERATED</span>
                        <span className="text-text-muted">Virtual Foreign Keys: 1 detected</span>
                      </div>
                      <a
                        href="#console"
                        className="text-teal-400 hover:text-teal-300 font-bold flex items-center gap-1 hover:underline"
                      >
                        <span>View In AI Console</span>
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
