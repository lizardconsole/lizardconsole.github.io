'use client';

import { useState } from 'react';
import { Copy, Check, Lock, Terminal, Package } from 'lucide-react';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';

const npmCode = `npm install
export LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32)   # required — encrypts stored DB passwords at rest
export ANTHROPIC_API_KEY=sk-ant-...                        # or set LIZARD_AI_PROVIDER=openai/google
npm run dev                                                 # → http://localhost:${APP_PORT}`;

const dockerCode = `docker run -p ${APP_PORT}:${APP_PORT} \\
  -e LIZARD_ENCRYPTION_KEY=$(openssl rand -base64 32) \\
  -e ANTHROPIC_API_KEY=sk-ant-... \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`;

const sqlCode = `-- run as a superuser on each service database
CREATE ROLE lizard_read LOGIN PASSWORD '…';
CREATE ROLE lizard_write LOGIN PASSWORD '…';

GRANT USAGE ON SCHEMA public TO lizard_read, lizard_write;   -- repeat per schema
GRANT SELECT ON ALL TABLES IN SCHEMA public TO lizard_read;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO lizard_write;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO lizard_write;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO lizard_read;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO lizard_write;`;

const tabs = [
  { id: 'npm' as const, label: 'npm quickstart', icon: Terminal, code: npmCode },
  { id: 'docker' as const, label: 'docker run', icon: Package, code: dockerCode },
  { id: 'sql' as const, label: 'least-privilege.sql', icon: Lock, code: sqlCode },
];

export default function Quickstart() {
  const [activeTab, setActiveTab] = useState<'npm' | 'docker' | 'sql'>('npm');
  const [copied, setCopied] = useState(false);

  const activeCode = tabs.find((t) => t.id === activeTab)!.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="py-24 bg-bg-secondary/20 border-t border-border-primary relative transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold font-mono tracking-widest text-accent uppercase bg-accent-soft px-3 py-1 rounded-full border border-accent-soft-border">
              QUICKSTART
            </span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
              Self-host in minutes
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              Lizard is open source and designed to run entirely on your own infrastructure. No outbound
              database traffic ever leaves your servers.
            </p>

            <div className="space-y-3 font-mono text-[11px] text-text-muted">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>Two required env vars, no config file to write by hand</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>State lives in a local SQLite file — no external metadata DB required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-accent" />
                <span>Anthropic by default; OpenAI and Gemini also supported for text-to-SQL</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border-primary bg-bg-secondary overflow-hidden shadow-2xl">
              <div className="bg-bg-primary px-4 py-2 border-b border-border-primary flex items-center justify-between flex-wrap gap-2">
                <div className="flex gap-2 flex-wrap">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold font-mono cursor-pointer transition-colors ${
                          activeTab === tab.id ? 'bg-bg-secondary text-accent' : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2 text-text-secondary hover:text-text-primary rounded-lg hover:bg-bg-secondary cursor-pointer transition-all flex items-center gap-1.5 text-xs font-semibold"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-accent" />
                      <span className="text-accent">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-5 font-mono text-[11px] leading-relaxed text-text-secondary overflow-x-auto max-h-[360px] bg-bg-secondary">
                <pre className="text-accent/90 whitespace-pre-wrap">
                  <code>{activeCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
