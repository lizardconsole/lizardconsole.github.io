'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { DOCKER_IMAGE, APP_PORT } from '@/lib/site';
import { SectionHeader } from './section-header';

const envFile = `openssl rand -base64 32

cat > .env <<'EOF'
LIZARD_ENCRYPTION_KEY=<paste the key printed above>
LIZARD_LLM_URL=https://:sk-ant-…@api.anthropic.com/v1?model=claude-sonnet-5
EOF`;

const dockerCode = `${envFile}

docker run -d -p ${APP_PORT}:${APP_PORT} \\
  --env-file .env \\
  -v lizard_data:/app/data \\
  ${DOCKER_IMAGE}`;

const npmCode = `${envFile}

npm install
npm run dev`;

const tabs = [
  { id: 'docker', label: 'Docker', code: dockerCode },
  { id: 'npm', label: 'Node', code: npmCode },
] as const;

type TabId = (typeof tabs)[number]['id'];

const notes = [
  'Generate the encryption key once and keep it. A new key would lock you out of stored passwords.',
  'AI turns on when you add an LLM URL.',
  'State lives in a local SQLite file, or your own Postgres for multiple instances.',
  'Anthropic, OpenAI, Gemini, DeepSeek, or any compatible gateway such as Ollama.',
];

export function Quickstart() {
  const [activeTab, setActiveTab] = useState<TabId>('docker');
  const [copied, setCopied] = useState(false);

  const activeCode = tabs.find((t) => t.id === activeTab)!.code;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="quickstart" className="border-t border-border-primary py-24 sm:py-32">
      <div className="container mx-auto grid grid-cols-1 items-start gap-14 px-4 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader eyebrow="Quickstart" title="Running in one command">
            Lizard is open source and runs on your own infrastructure. Database traffic never leaves your
            network.
          </SectionHeader>

          <ul className="mt-8 space-y-3 text-sm leading-6 text-text-secondary">
            {notes.map((note) => (
              <li key={note} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                {note}
              </li>
            ))}
          </ul>

          <a href="/docs/quickstart" className="btn btn-secondary mt-8">
            Read the full guide
          </a>
        </div>

        <div className="card-raised overflow-hidden lg:col-span-7">
          <div className="flex items-center justify-between gap-2 border-b border-border-primary px-2 py-2">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-md px-3 py-1.5 text-[13px] transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-bg-tertiary text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={handleCopy}
              aria-label="Copy to clipboard"
              className="flex h-8 w-8 items-center justify-center rounded-md text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors cursor-pointer"
            >
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>

          <pre className="max-h-90 overflow-x-auto bg-bg-secondary p-5 font-mono text-[12.5px] leading-6 text-text-primary">
            <code>{activeCode}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
