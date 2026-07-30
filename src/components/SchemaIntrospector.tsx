import { useState } from 'react';
import { motion } from 'motion/react';
import { Link2, GitBranch, EyeOff, LayoutGrid, CheckSquare, Edit3, Settings2, Sparkles, Check } from 'lucide-react';

export default function SchemaIntrospector() {
  const [vFkActive, setVFkActive] = useState(true);
  const [hidePassHash, setHidePassHash] = useState(true);
  const [amountLabel, setAmountLabel] = useState('Total Due (USD)');
  const [displayCol, setDisplayCol] = useState('email');

  return (
    <section id="relationships" className="py-24 bg-bg-primary relative overflow-hidden transition-colors duration-200">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-72 w-72 rounded-full bg-indigo-500/5 blur-[120px] ml-auto" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
              PHASE 3: METADATA STITCHING
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Stitch microservice boundaries seamlessly
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Microservices isolate their databases, stripping out physical foreign keys. 
              Lizard lets you restore these relationships **virtually**, storing links in our dedicated metadata schema. 
              No modifications are ever written to your production databases.
            </p>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-secondary/40 border border-border-primary">
                <GitBranch className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-primary font-semibold">Informs the AI Planner</p>
                  <p className="text-text-muted mt-1">Lizard passes virtual FK definitions to Claude, allowing it to write precise cross-DB joins automatically.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-bg-secondary/40 border border-border-primary">
                <LayoutGrid className="h-4.5 w-4.5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-text-primary font-semibold">Generates Searchable Pickers</p>
                  <p className="text-text-muted mt-1">Cross-DB columns automatically turn into instant search dialogs in CRUD forms.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive link simulator */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border-primary bg-bg-secondary/30 p-6 sm:p-8 relative">
              
              <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-900/50 px-2 py-0.5 rounded">
                <Settings2 className="h-3 w-3" />
                <span>Virtual Configurator</span>
              </div>

              <div className="space-y-8">
                
                {/* Simulated Linker Visual */}
                <div className="p-4 rounded-xl bg-bg-primary border border-border-primary space-y-6">
                  <p className="text-[11px] font-bold font-mono text-text-muted uppercase tracking-wider">Virtual Foreign Key Link Map</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative">
                    
                    {/* Database A Column */}
                    <div className="sm:col-span-5 p-3 rounded-lg border border-border-primary bg-bg-secondary/50 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="font-mono text-[10px] text-text-muted">orders_db (Postgres)</span>
                      </div>
                      <p className="font-mono text-xs text-text-primary font-bold">orders.user_id</p>
                    </div>

                    {/* SVG Connector */}
                    <div className="sm:col-span-2 flex justify-center">
                      <button
                        onClick={() => setVFkActive(!vFkActive)}
                        className={`h-9 w-9 rounded-full flex items-center justify-center border cursor-pointer transition-all ${
                          vFkActive
                            ? 'bg-emerald-500 border-emerald-400 text-gray-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400'
                            : 'bg-bg-secondary border-border-primary text-text-muted hover:text-text-primary hover:border-text-secondary/40'
                        }`}
                        title="Toggle virtual foreign key mapping"
                      >
                        <Link2 className={`h-4.5 w-4.5 ${vFkActive ? 'animate-pulse' : ''}`} />
                      </button>
                    </div>

                    {/* Database B Column */}
                    <div className="sm:col-span-5 p-3 rounded-lg border border-border-primary bg-bg-secondary/50 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="font-mono text-[10px] text-text-muted">users_db (Postgres)</span>
                      </div>
                      <p className="font-mono text-xs text-text-primary font-bold">users.id</p>
                    </div>

                  </div>

                  <div className="text-[11px] font-mono flex items-center justify-between text-text-muted">
                    <span>Virtual FK Mapping:</span>
                    <span className={vFkActive ? 'text-emerald-400 font-bold' : 'text-text-muted font-bold'}>
                      {vFkActive ? '✓ LINKED & INDEXED BY AI' : '✗ DISCONNECTED'}
                    </span>
                  </div>
                </div>

                {/* Simulated Overrides Panel */}
                <div className="space-y-4">
                  <p className="text-[11px] font-bold font-mono text-text-muted uppercase tracking-wider">Metadata Overrides Console (Lizard Side)</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    
                    {/* Override Hide password */}
                    <button
                      onClick={() => setHidePassHash(!hidePassHash)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between h-24 cursor-pointer transition-all ${
                        hidePassHash
                          ? 'border-emerald-500/20 bg-emerald-950/10'
                          : 'border-border-primary bg-bg-primary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full text-[10px] text-text-muted">
                        <span>COLUMN EYE</span>
                        <EyeOff className="h-3 w-3" />
                      </div>
                      <div>
                        <span className="block font-bold text-text-primary">users.password_hash</span>
                        <span className={`text-[10px] font-semibold ${hidePassHash ? 'text-emerald-400' : 'text-text-muted'}`}>
                          {hidePassHash ? '● HIDDEN IN GRID' : '○ VISIBLE'}
                        </span>
                      </div>
                    </button>

                    {/* Override Label */}
                    <div className="p-3 rounded-xl border border-border-primary bg-bg-primary/50 flex flex-col justify-between h-24">
                      <div className="flex items-center justify-between text-[10px] text-text-muted">
                        <span>CUSTOM RENAME</span>
                        <Edit3 className="h-3 w-3" />
                      </div>
                      <div className="space-y-1">
                        <span className="block font-bold text-text-muted text-[10px]">invoices.amount_usd</span>
                        <input
                          type="text"
                          value={amountLabel}
                          onChange={(e) => setAmountLabel(e.target.value)}
                          className="w-full bg-bg-secondary border border-border-primary rounded px-1.5 py-0.5 text-[10px] text-text-primary focus:outline-none focus:border-emerald-500/50"
                        />
                      </div>
                    </div>

                    {/* Override display column priority */}
                    <div className="p-3 rounded-xl border border-border-primary bg-bg-primary/50 flex flex-col justify-between h-24">
                      <div className="flex items-center justify-between text-[10px] text-text-muted">
                        <span>DISPLAY COL</span>
                        <CheckSquare className="h-3 w-3" />
                      </div>
                      <div className="space-y-1">
                        <span className="block font-bold text-text-muted text-[10px]">users display column</span>
                        <select
                          value={displayCol}
                          onChange={(e) => setDisplayCol(e.target.value)}
                          className="w-full bg-bg-secondary border border-border-primary rounded px-1.5 py-0.5 text-[10px] text-text-primary focus:outline-none"
                        >
                          <option value="email">email</option>
                          <option value="id">id (raw)</option>
                          <option value="plan">plan</option>
                        </select>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
