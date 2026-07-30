import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Shield, Terminal, Play, BarChart3, 
  Table2, Info, ChevronRight, ChevronDown, CheckCircle2, 
  Search, Code, Eye, RefreshCw, AlertTriangle, Cpu, Layers 
} from 'lucide-react';
import { INITIAL_CONNECTIONS, MOCK_QUERIES, DBConnection, AIQuerySample } from '../types';

export default function InteractiveConsole() {
  const [connections, setConnections] = useState<DBConnection[]>(INITIAL_CONNECTIONS);
  const [expandedConn, setExpandedConn] = useState<string | null>('users_db');
  const [activeQuery, setActiveQuery] = useState<AIQuerySample>(MOCK_QUERIES[0]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'grid' | 'chart' | 'sql' | 'heuristics'>('grid');
  const [searchPrompt, setSearchPrompt] = useState(MOCK_QUERIES[0].prompt);

  // Set default tabs based on active query
  useEffect(() => {
    setSearchPrompt(activeQuery.prompt);
    if (activeQuery.chartType === 'grid') {
      setActiveTab('grid');
    } else {
      setActiveTab('chart');
    }
  }, [activeQuery]);

  const toggleConnection = (id: string) => {
    setExpandedConn(expandedConn === id ? null : id);
  };

  const handleQuerySelect = (query: AIQuerySample) => {
    setActiveQuery(query);
  };

  const handleRunQuery = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 900);
  };

  // Find max value in active query dataset for scaling charts
  const maxVal = activeQuery.rows.reduce((max, row) => {
    const val = row[activeQuery.yAxis];
    return val > max ? val : max;
  }, 1);

  return (
    <section id="console" className="py-20 bg-bg-primary border-t border-b border-border-primary relative transition-colors duration-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.04),transparent)] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
            LIZARD LIVE SANDBOX
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Experience the Federated AI Console
          </h2>
          <p className="mt-4 text-base text-text-secondary">
            Select one of the pre-configured natural language scenarios below, or examine the database catalog. 
            Lizard parses the tables, checks constraints, validates security via SQL Guard, and draws the output immediately.
          </p>
        </div>

        {/* Console layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Connection Tree & Scenarios */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Connection Tree */}
            <div className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-4">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-primary">
                <h3 className="text-xs font-bold font-mono text-text-secondary uppercase tracking-wider flex items-center gap-2">
                  <Database className="h-4 w-4 text-emerald-400" />
                  <span>Schema Introspective Fleet</span>
                </h3>
                <span className="text-[10px] font-mono text-text-muted bg-bg-primary px-2 py-0.5 rounded border border-border-primary">
                  Live
                </span>
              </div>

              <div className="space-y-2 max-h-[260px] overflow-y-auto no-scrollbar">
                {connections.map((conn) => {
                  const isExpanded = expandedConn === conn.id;
                  return (
                    <div key={conn.id} className="rounded-lg bg-bg-primary/60 border border-border-primary overflow-hidden">
                      <button
                        onClick={() => toggleConnection(conn.id)}
                        className="w-full flex items-center justify-between p-2.5 text-xs font-medium hover:bg-bg-tertiary transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${conn.status === 'connected' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          <span className="font-mono text-text-primary">{conn.name}</span>
                          <span className="text-[9px] font-mono text-text-muted bg-bg-tertiary px-1.5 py-0.2 rounded uppercase">
                            {conn.type}
                          </span>
                        </div>
                        {isExpanded ? <ChevronDown className="h-3.5 w-3.5 text-text-muted" /> : <ChevronRight className="h-3.5 w-3.5 text-text-muted" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden bg-bg-primary/30 border-t border-border-primary"
                          >
                            <div className="p-2.5 pl-6 space-y-2 text-[11px] font-mono text-text-secondary">
                              <p className="text-[10px] text-text-muted uppercase font-bold">Tables & Row Counts:</p>
                              {conn.schemas.map((schema) => (
                                <div key={schema.name} className="space-y-1">
                                  <p className="text-teal-500 font-semibold text-[10px]">Schema: {schema.name}</p>
                                  {schema.tables.map((table) => (
                                    <div key={table.name} className="flex justify-between items-center py-0.5 hover:text-text-primary transition-colors">
                                      <span>├─ {table.name}</span>
                                      <span className="text-text-muted text-[10px] bg-bg-tertiary px-1 rounded">
                                        {table.rowCount.toLocaleString()} rows
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prompt scenarios selection */}
            <div className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-4">
              <h3 className="text-xs font-bold font-mono text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-emerald-400" />
                <span>Select AI Scenarios</span>
              </h3>
              
              <div className="space-y-2">
                {MOCK_QUERIES.map((query) => {
                  const isSelected = activeQuery.id === query.id;
                  return (
                    <button
                      key={query.id}
                      onClick={() => handleQuerySelect(query)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500/30 bg-emerald-950/30 ring-1 ring-emerald-500/20'
                          : 'border-border-primary bg-bg-primary/50 hover:border-text-secondary/40 hover:bg-bg-primary'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-text-primary">{query.label}</span>
                        <span className={`text-[9px] font-mono uppercase px-1.5 py-0.2 rounded ${
                          query.target === 'federated' 
                            ? 'bg-purple-950 text-purple-300 border border-purple-900' 
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-900'
                        }`}>
                          {query.target === 'federated' ? 'Federated Join' : 'Single DB'}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-secondary mt-1.5 line-clamp-1 italic">
                        "{query.prompt}"
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Console Terminal and Results Output */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Input Bar */}
            <div className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-4 relative">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-text-muted">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={searchPrompt}
                    onChange={(e) => setSearchPrompt(e.target.value)}
                    placeholder="Ask Lizard to query or chart anything..."
                    className="w-full bg-bg-primary border border-border-primary rounded-xl py-2.5 pl-9 pr-4 text-xs font-mono text-text-primary placeholder-text-muted focus:outline-none focus:border-emerald-500/40"
                  />
                </div>
                <button
                  onClick={handleRunQuery}
                  disabled={isExecuting}
                  className="rounded-xl px-5 py-2.5 text-xs font-bold text-gray-950 bg-gradient-to-r from-emerald-400 to-teal-500 hover:opacity-95 shadow-lg shadow-emerald-500/10 flex items-center gap-1.5 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
                >
                  {isExecuting ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Play className="h-3 w-3 fill-current" />
                  )}
                  <span>{isExecuting ? 'Querying...' : 'Ask Lizard'}</span>
                </button>
              </div>

              {/* Connected Targets summary */}
              <div className="flex flex-wrap items-center gap-3 mt-3 text-[10px] text-text-secondary">
                <span className="font-semibold text-text-muted uppercase tracking-wider">Active connections for this prompt:</span>
                {activeQuery.connections.map((c) => (
                  <span key={c} className="bg-bg-primary px-2 py-0.5 rounded border border-border-primary font-mono text-[9px] text-teal-400 flex items-center gap-1">
                    <Database className="h-2.5 w-2.5" />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Terminal View */}
            <div className="rounded-2xl border border-border-primary bg-bg-secondary/50 overflow-hidden min-h-[460px] flex flex-col">
              
              {/* Header Info Panel (SQL Guard Status) */}
              <div className="bg-bg-primary px-4 py-3 border-b border-border-primary flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span className="font-semibold text-text-secondary">Lizard SQL Guard:</span>
                  <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                    <CheckCircle2 className="h-3 w-3" /> Approved: r/o select only
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-text-muted">
                  <Cpu className="h-3 w-3" />
                  <span>Schema Dialect: </span>
                  <span className="text-text-primary uppercase font-bold">{activeQuery.dialect}</span>
                </div>
              </div>

              {/* Output Tab Selection */}
              <div className="bg-bg-primary/50 px-4 border-b border-border-primary/80 flex">
                {[
                  { id: 'chart', label: 'AI Chart output', icon: BarChart3, hidden: activeQuery.chartType === 'grid' },
                  { id: 'grid', label: 'Data Grid', icon: Table2 },
                  { id: 'sql', label: 'Raw SQL / Query', icon: Code },
                  { id: 'heuristics', label: 'Engine Trace', icon: Info }
                ].map((tab) => {
                  if (tab.hidden) return null;
                  const Icon = tab.icon;
                  const isTabActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold border-b-2 -mb-[2px] transition-all relative cursor-pointer ${
                        isTabActive 
                          ? 'border-emerald-500 text-text-primary bg-bg-secondary/30' 
                          : 'border-transparent text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon className={`h-3.5 w-3.5 ${isTabActive ? 'text-emerald-400' : 'text-text-muted'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Canvas */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                
                {isExecuting ? (
                  <div className="h-64 flex flex-col items-center justify-center gap-3">
                    <RefreshCw className="h-8 w-8 text-emerald-500 animate-spin" />
                    <p className="font-mono text-xs text-text-secondary animate-pulse">[Lizard Engine] Compiling federated context and executing safely...</p>
                  </div>
                ) : (
                  <div className="flex-1">
                    
                    {/* CHART TAB */}
                    {activeTab === 'chart' && (
                       <div className="py-2 h-64 flex flex-col justify-between">
                        
                        {activeQuery.chartType === 'bar' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                              <span className="text-xs text-text-secondary font-mono">Metric: USD Revenue per email (Join Federated)</span>
                              <span className="text-[10px] text-text-muted font-mono">ECharts Vector Simulation</span>
                            </div>
                            <div className="space-y-3">
                              {activeQuery.rows.map((row) => {
                                const val = row[activeQuery.yAxis];
                                const label = row[activeQuery.xAxis];
                                const percent = (val / maxVal) * 100;
                                return (
                                  <div key={label} className="space-y-1">
                                    <div className="flex justify-between text-[11px] font-mono">
                                      <span className="text-text-secondary truncate max-w-[200px] sm:max-w-xs">{label}</span>
                                      <span className="text-emerald-400 font-semibold">${val.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                                    </div>
                                    <div className="h-2 w-full bg-bg-primary rounded-full overflow-hidden border border-border-primary">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        transition={{ duration: 0.6, ease: 'easeOut' }}
                                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {activeQuery.chartType === 'line' && (
                          <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                              <span className="text-xs text-text-secondary font-mono">Metric: Monthly active signups by subscription level</span>
                              <span className="text-[10px] text-text-muted font-mono">Stacked Trend Vectors</span>
                            </div>
                            
                            {/* SVG Trend representation */}
                            <div className="relative h-44 border-b border-l border-border-primary rounded-bl p-1 flex items-end">
                              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                {/* Free plan path */}
                                <motion.path
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1 }}
                                  d="M 10 90 Q 30 70, 50 50 T 90 20"
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2.5"
                                />
                                {/* Pro plan path */}
                                <motion.path
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1, delay: 0.2 }}
                                  d="M 10 95 Q 30 85, 50 70 T 90 40"
                                  fill="none"
                                  stroke="#3b82f6"
                                  strokeWidth="2"
                                />
                                {/* Enterprise plan path */}
                                <motion.path
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{ duration: 1, delay: 0.4 }}
                                  d="M 10 98 Q 30 95, 50 90 T 90 75"
                                  fill="none"
                                  stroke="#a855f7"
                                  strokeWidth="1.5"
                                />
                              </svg>

                              <div className="absolute inset-x-0 bottom-1 flex justify-between px-4 text-[9px] text-text-muted font-mono">
                                <span>Jan 2026</span>
                                <span>Mar 2026</span>
                                <span>May 2026</span>
                              </div>
                            </div>

                            <div className="flex justify-center gap-6 text-[10px] font-semibold">
                              <span className="flex items-center gap-1.5 text-emerald-400">
                                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Free Tier
                              </span>
                              <span className="flex items-center gap-1.5 text-blue-400">
                                <span className="h-2 w-2 rounded-full bg-blue-500" /> Pro Plan
                              </span>
                              <span className="flex items-center gap-1.5 text-purple-400">
                                <span className="h-2 w-2 rounded-full bg-purple-500" /> Enterprise Plan
                              </span>
                            </div>
                          </div>
                        )}

                        {activeQuery.chartType === 'pie' && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div className="relative h-40 flex items-center justify-center">
                              {/* Custom SVG Donut Chart */}
                              <svg className="w-32 h-32 transform -rotate-90">
                                <circle cx="64" cy="64" r="45" fill="transparent" stroke="var(--border-primary)" strokeWidth="20" />
                                {/* Segment 1 - 45% */}
                                <circle cx="64" cy="64" r="45" fill="transparent" stroke="#10b981" strokeWidth="20" 
                                        strokeDasharray="282" strokeDashoffset="127" />
                                {/* Segment 2 - 25% */}
                                <circle cx="64" cy="64" r="45" fill="transparent" stroke="#f59e0b" strokeWidth="20" 
                                        strokeDasharray="282" strokeDashoffset="240" className="transform origin-center rotate-45" />
                                {/* Segment 3 - 30% */}
                                <circle cx="64" cy="64" r="45" fill="transparent" stroke="#ef4444" strokeWidth="20" 
                                        strokeDasharray="282" strokeDashoffset="260" className="transform origin-center rotate-135" />
                              </svg>
                              <div className="absolute flex flex-col items-center">
                                <span className="text-lg font-bold text-text-primary">5</span>
                                <span className="text-[9px] text-text-muted uppercase tracking-widest font-mono">Invoices</span>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-[11px] font-bold text-text-secondary uppercase tracking-wider font-mono">High-value unpaid stack:</p>
                              <div className="space-y-1 text-xs font-mono">
                                <div className="flex justify-between items-center text-emerald-400">
                                  <span>SpaceX Invoicing (Paid Wait)</span>
                                  <span>$8.5k</span>
                                </div>
                                <div className="flex justify-between items-center text-amber-400">
                                  <span>Uber Global Sync</span>
                                  <span>$4.2k</span>
                                </div>
                                <div className="flex justify-between items-center text-red-400">
                                  <span>OpenAI API Team</span>
                                  <span>$3.5k</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                      </div>
                    )}

                    {/* DATA GRID TAB */}
                    {activeTab === 'grid' && (
                      <div className="overflow-x-auto max-h-[260px] border border-border-primary rounded-lg bg-bg-primary">
                        <table className="w-full text-left text-xs font-mono leading-normal">
                          <thead className="bg-bg-tertiary text-text-secondary sticky top-0">
                            <tr>
                              {activeQuery.columns.map((col) => (
                                <th key={col} className="px-4 py-3 font-semibold uppercase text-[10px] tracking-wider border-b border-border-primary">
                                  {col}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border-primary text-text-secondary">
                            {activeQuery.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-bg-secondary/40 transition-colors">
                                {activeQuery.columns.map((col) => {
                                  const val = row[col];
                                  return (
                                    <td key={col} className="px-4 py-3 whitespace-nowrap">
                                      {typeof val === 'number' && col.includes('usd') ? (
                                        <span className="text-emerald-400 font-semibold">
                                          ${val.toLocaleString(undefined, {minimumFractionDigits: 2})}
                                        </span>
                                      ) : typeof val === 'number' ? (
                                        <span className="text-text-primary font-medium">{val.toLocaleString()}</span>
                                      ) : (
                                        val
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* SQL TAB */}
                    {activeTab === 'sql' && (
                      <div className="relative">
                        <div className="absolute top-2 right-2 text-[10px] font-mono text-text-muted uppercase bg-bg-secondary px-2 py-0.5 rounded">
                          SELECT ONLY
                        </div>
                        <pre className="bg-bg-primary p-4 rounded-xl border border-border-primary text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-[260px] leading-relaxed">
                          <code>{activeQuery.sql}</code>
                        </pre>
                      </div>
                    )}

                    {/* HEURISTICS TAB */}
                    {activeTab === 'heuristics' && (
                      <div className="space-y-4">
                        <div className="p-3.5 rounded-xl border border-emerald-950/40 bg-emerald-950/10 text-xs flex gap-3">
                          <Info className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-semibold text-emerald-300">Lizard Heuristics Parser Trace</p>
                            <p className="text-text-secondary mt-1 leading-relaxed">
                              {activeQuery.explanation}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-[11px]">
                          <div className="bg-bg-primary p-3 rounded-lg border border-border-primary">
                            <span className="text-text-muted uppercase block text-[9px] mb-1">Target Engine</span>
                            <span className="text-text-secondary font-bold">{activeQuery.dialect === 'duckdb' ? 'DuckDB Federation CJS' : 'Native PostgreSQL'}</span>
                          </div>
                          <div className="bg-bg-primary p-3 rounded-lg border border-border-primary">
                            <span className="text-text-muted uppercase block text-[9px] mb-1">Query Plan Cost</span>
                            <span className="text-emerald-400 font-bold">12ms response index</span>
                          </div>
                          <div className="bg-bg-primary p-3 rounded-lg border border-border-primary">
                            <span className="text-text-muted uppercase block text-[9px] mb-1">Security Footprint</span>
                            <span className="text-teal-300 font-bold">Passed (READ ROLE)</span>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* Audit footnote info */}
                <div className="mt-6 pt-4 border-t border-border-primary/80 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono text-text-muted animate-fade-in">
                  <div className="flex items-center gap-4">
                    <span>EXECUTION TIME: <strong className="text-text-secondary">{activeQuery.auditLog.durationMs}ms</strong></span>
                    <span>ROWS FETCHED: <strong className="text-text-secondary">{activeQuery.auditLog.rowsCount}</strong></span>
                  </div>
                  <span>DB ROLE: <strong className="text-text-secondary">{activeQuery.auditLog.rolesUsed}</strong></span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
