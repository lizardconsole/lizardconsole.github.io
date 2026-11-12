import type { Metadata } from 'next';
import Link from 'next/link';
import { Prose } from '@/components/prose';

export const metadata: Metadata = {
  title: 'LLM providers',
  description: 'Connect Anthropic, OpenAI, Gemini, DeepSeek or any compatible gateway with one LIZARD_LLM_URL.',
};

export default function LlmPage() {
  return (
    <Prose>
      <h1>LLM providers</h1>
      <p>
        AI querying and prompt-driven charts are enabled by a single URL. Leave it unset and Lizard runs
        with AI turned off; everything else works as normal.
      </p>
      <pre>
        <code>{`LIZARD_LLM_URL=https://:<api-key>@<host>/<path>?model=<model>&provider=<provider>&api=<api>`}</code>
      </pre>

      <table>
        <thead>
          <tr><th>Part</th><th>Meaning</th></tr>
        </thead>
        <tbody>
          <tr><td><code>api-key</code></td><td>Goes in the password slot. Optional for endpoints that don’t need one. Percent-encode <code>@ : / ? # %</code>.</td></tr>
          <tr><td><code>path</code></td><td>The endpoint’s base path, used exactly as written.</td></tr>
          <tr><td><code>model</code></td><td>Required. The model id or gateway alias, passed through as-is.</td></tr>
          <tr><td><code>provider</code></td><td><code>anthropic</code>, <code>openai</code>, <code>google</code> or <code>deepseek</code>: the API the endpoint speaks. Detected on official hosts.</td></tr>
          <tr><td><code>api</code></td><td>OpenAI only: <code>responses</code> (default) or <code>chat</code>.</td></tr>
        </tbody>
      </table>
      <p>Lizard refuses to start on an invalid URL.</p>

      <h2>Official providers</h2>
      <p>On these hosts the provider is detected, so <code>provider</code> can be left out.</p>
      <pre>
        <code>{`https://:<key>@api.anthropic.com/v1?model=claude-sonnet-5
https://:<key>@api.openai.com/v1?model=gpt-5
https://:<key>@generativelanguage.googleapis.com/v1beta?model=gemini-2.5-flash
https://:<key>@api.deepseek.com?model=deepseek-chat`}</code>
      </pre>

      <h2>Gateways and self-hosted models</h2>
      <p>
        Any other host needs <code>provider</code>. OpenAI-compatible gateways use{' '}
        <code>provider=openai</code>, usually with <code>api=chat</code>.
      </p>
      <h3>OpenRouter</h3>
      <pre>
        <code>{`https://:<key>@openrouter.ai/api/v1?provider=openai&api=chat&model=google/gemini-2.5-pro`}</code>
      </pre>
      <h3>Ollama</h3>
      <pre>
        <code>{`http://localhost:11434/v1?provider=openai&api=chat&model=llama3.1:8b`}</code>
      </pre>
      <h3>LiteLLM or a corporate gateway</h3>
      <pre>
        <code>{`https://:<key>@ai.corp.net/v1?provider=openai&api=chat&model=anthropic/claude-sonnet-5`}</code>
      </pre>
      <h3>An Anthropic-compatible proxy</h3>
      <pre>
        <code>{`https://:<key>@claude-proxy.internal/v1?provider=anthropic&model=claude-sonnet-5`}</code>
      </pre>
      <p>
        If AI queries fail with “Invalid JSON response” through a gateway, it is likely mis-serializing
        tool-only turns on the Responses API. Switch to <code>api=chat</code>.
      </p>

      <h2>What the model sees</h2>
      <p>
        The model never receives your whole schema or your rows by default. It gets a name-only skeleton of
        connections, schemas and tables, and calls tools to look closer:
      </p>
      <ul>
        <li><code>search_schema</code> fuzzy-matches table and column names and comments across the fleet.</li>
        <li><code>describe_table</code> returns full column detail for exactly one table.</li>
        <li><code>get_relations</code> returns real and virtual foreign keys touching one table.</li>
        <li><code>submit_plan</code> ends the run with SQL that is validated by the guard and executed on the read-only role.</li>
      </ul>
      <p>
        Choose a model that handles tool use well. Read the <Link href="/docs/security">Security model</Link>{' '}
        for how generated SQL is contained.
      </p>

      <h2>Debugging</h2>
      <p>
        Set <code>LIZARD_LOG_AI_CALLS=true</code> with <code>LIZARD_LOG_LEVEL=debug</code> to log every LLM
        call’s full input and output: system prompt, tool calls and results, and generated text. It is off
        by default because those logs include schema details.
      </p>
    </Prose>
  );
}
