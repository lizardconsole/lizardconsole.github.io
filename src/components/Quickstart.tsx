import { useState } from 'react';
import { Terminal, Copy, Check, Lock, FileCode, CheckCircle2 } from 'lucide-react';

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState<'docker' | 'sql'>('docker');
  const [copied, setCopied] = useState(false);

  const dockerCode = `version: "3.8"
services:
  lizard-console:
    image: ghcr.io/google/lizard:latest
    container_name: lizard_data_console
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - LIZARD_METADATA_STORE=sqlite:///var/lib/lizard/metadata.db
      - ANTHROPIC_API_KEY=\${ANTHROPIC_API_KEY}
    volumes:
      - lizard_data:/var/lib/lizard
    restart: unless-stopped

volumes:
  lizard_data:`;

  const sqlCode = `-- 1. Establish Read-Only role for Introspection & AI Selects
CREATE ROLE lizard_read WITH LOGIN PASSWORD 'your_secure_readonly_password';
GRANT CONNECT ON DATABASE production_users TO lizard_read;
GRANT USAGE ON SCHEMA public TO lizard_read;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lizard_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO lizard_read;

-- 2. Establish Isolated Write-Only role for Interactive CRUD
CREATE ROLE lizard_write WITH LOGIN PASSWORD 'your_secure_write_password';
GRANT CONNECT ON DATABASE production_users TO lizard_write;
GRANT USAGE ON SCHEMA public TO lizard_write;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lizard_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lizard_write;`;

  const handleCopy = () => {
    const textToCopy = activeTab === 'docker' ? dockerCode : sqlCode;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="py-24 bg-bg-secondary/20 border-t border-border-primary relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text block */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-900/50">
              DEVELOPER QUICKSTART
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Self-host inside your VPC in minutes
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Lizard is open-source first and designed to operate securely within your private network boundaries. 
              No outbound database traffic ever leaves your servers. Connections stay fully sandboxed.
            </p>

            <div className="space-y-3 font-mono text-[11px] text-text-muted">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Single Docker container with built-in in-memory DuckDB</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Audit logging captures all generated queries</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Supports SQLite, Postgres, and local file storage metadata</span>
              </div>
            </div>
          </div>

          {/* Code panel */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border-primary bg-bg-secondary overflow-hidden shadow-2xl">
              
              {/* Tabs */}
              <div className="bg-bg-primary px-4 py-2 border-b border-border-primary flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('docker')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold font-mono cursor-pointer transition-colors ${
                      activeTab === 'docker' ? 'bg-bg-secondary text-emerald-400' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <FileCode className="h-3.5 w-3.5" />
                    <span>docker-compose.yml</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('sql')}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold font-mono cursor-pointer transition-colors ${
                      activeTab === 'sql' ? 'bg-bg-secondary text-emerald-400' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Lock className="h-3.5 w-3.5" />
                    <span>least-privilege.sql</span>
                  </button>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code window */}
              <div className="p-5 font-mono text-[11px] leading-relaxed text-text-secondary overflow-x-auto max-h-[360px] bg-bg-secondary">
                <pre className="text-emerald-400/90">
                  <code>{activeTab === 'docker' ? dockerCode : sqlCode}</code>
                </pre>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
