"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { SectionHeader } from "./section-header";
import { useGallery } from "./gallery-provider";

const ease = [0.22, 1, 0.36, 1] as const;

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease,
      delay: i * 0.08,
      delayChildren: i * 0.08 + 0.3,
      staggerChildren: 0.12,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

const popVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 22 },
  },
};

function Cell({
  title,
  desc,
  children,
  className = "",
  index = 0,
}: {
  title: string;
  desc: string;
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={cellVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className={`group card flex flex-col overflow-hidden ${className}`}
    >
      <div className="p-6 pb-0">
        <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-text-primary">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-6 text-text-secondary">{desc}</p>
      </div>
      <div className="mt-6 flex-1 flex flex-col justify-end">{children}</div>
    </motion.div>
  );
}

function Shot({
  src,
  alt,
  position = "object-left-top",
}: {
  src: string;
  alt: string;
  position?: string;
}) {
  const gallery = useGallery();
  return (
    <motion.button
      type="button"
      variants={{
        hidden: { opacity: 0, x: 24 },
        show: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
      }}
      onClick={() => gallery.open(src)}
      aria-label="Open screenshot"
      className="relative ml-6 h-64 sm:h-72 cursor-zoom-in overflow-hidden rounded-tl-xl border-l border-t border-border-primary bg-bg-secondary"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 700px, 100vw"
        className={`object-cover ${position} transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
      />
    </motion.button>
  );
}

const agentSteps = [
  { label: "search_schema", detail: '"customers", "orders"', done: true },
  {
    label: "describe_table",
    detail: "orders_service.public.orders",
    done: true,
  },
  { label: "get_relations", detail: "orders.customer_id", done: true },
  { label: "submit_plan", detail: "validating SQL…", done: false },
];

function AgentTrace() {
  return (
    <div className="mx-6 mb-6 rounded-lg border border-border-primary bg-bg-secondary p-3">
      <p className="px-1 pb-2 text-[13px] text-text-primary">
        Top 10 customers by orders last month
      </p>
      <ul className="space-y-1">
        {agentSteps.map((step) => (
          <motion.li
            key={step.label}
            variants={itemVariants}
            className="flex items-center gap-2 rounded-md bg-surface px-2 py-1.5 text-[12px]"
          >
            {step.done ? (
              <motion.span variants={popVariants} className="flex">
                <Check className="h-3.5 w-3.5 shrink-0 text-accent" />
              </motion.span>
            ) : (
              <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-text-muted" />
            )}
            <span className="font-mono text-text-primary">{step.label}</span>
            <span className="truncate text-text-muted">{step.detail}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function FederationSnippet() {
  return (
    <motion.pre
      variants={{
        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
        show: {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          transition: { duration: 0.9, ease },
        },
      }}
      className="mx-6 mb-6 overflow-x-auto rounded-lg border border-border-primary bg-bg-secondary p-4 font-mono text-[12px] leading-5 text-text-secondary"
    >
      <code>
        <span className="text-text-primary">select</span> c.country,
        sum(o.total){"\n"}
        <span className="text-text-primary">from</span>{" "}
        orders_service.public.orders o{"\n"}
        <span className="text-text-primary">join</span>{" "}
        users_service.public.customers c{"\n"}
        {"  "}
        <span className="text-text-primary">on</span> c.id = o.customer_id{"\n"}
        <span className="text-text-primary">group by</span> 1
      </code>
    </motion.pre>
  );
}

const fileTypes = [
  "orders.csv",
  "events.parquet",
  "targets.xlsx",
  "signups.ndjson",
];

function FileList() {
  return (
    <ul className="mx-6 mb-6 divide-y divide-border-primary rounded-lg border border-border-primary bg-bg-secondary text-[13px]">
      {fileTypes.map((file) => (
        <motion.li
          key={file}
          variants={itemVariants}
          className="flex items-center justify-between px-3 py-2"
        >
          <span className="font-mono text-text-primary">{file}</span>
          <span className="text-[12px] text-text-muted">read-only</span>
        </motion.li>
      ))}
    </ul>
  );
}

const roles = [
  { team: "finance", role: "reader" },
  { team: "support", role: "editor" },
  { team: "platform", role: "manager" },
];

function RoleList() {
  return (
    <div className="mx-6 mb-6 rounded-lg border border-border-primary bg-bg-secondary p-1">
      {roles.map((r) => (
        <motion.div
          key={r.team}
          variants={itemVariants}
          className="flex items-center justify-between rounded-md px-2.5 py-2 text-[13px]"
        >
          <span className="text-text-primary">{r.team}</span>
          <motion.span
            variants={popVariants}
            className="rounded-md bg-surface px-2 py-0.5 font-mono text-[11px] text-text-secondary shadow-(--shadow-btn-secondary)"
          >
            {r.role}
          </motion.span>
        </motion.div>
      ))}
      <p className="px-2.5 pb-1.5 pt-1 text-[12px] text-text-muted">
        Synced from Entra ID, Okta or Keycloak
      </p>
    </div>
  );
}

const auditRows = [
  { who: "maya@", what: "update", where: "orders #4812" },
  { who: "sam@", what: "federated_query", where: "2 databases" },
  { who: "li@", what: "query", where: "support_service" },
];

function AuditList() {
  return (
    <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-border-primary text-[12px]">
      {auditRows.map((row, i) => (
        <motion.div
          key={i}
          variants={itemVariants}
          className="grid grid-cols-[56px_1fr] sm:grid-cols-[56px_120px_1fr] gap-2 border-b border-border-primary bg-bg-secondary px-3 py-2 last:border-b-0"
        >
          <span className="font-mono text-text-muted">{row.who}</span>
          <span className="font-mono text-text-primary">{row.what}</span>
          <span className="hidden sm:block truncate text-text-secondary">
            {row.where}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Features"
          title="Everything you'd build into an internal admin, already built"
        >
          Lizard reads your schema and derives the rest. No models to declare,
          no pages to assemble, no tables added to your databases.
        </SectionHeader>

        <MotionConfig reducedMotion="user">
          <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Cell
              index={0}
              className="lg:col-span-2"
              title="Every table, browsable and editable"
              desc="Filters, search, inline edits and foreign keys shown as readable labels, all generated from introspection across every schema and database."
            >
              <Shot
                src="/screenshots/browse-orders-table.png"
                alt="The Lizard data grid for an orders table"
              />
            </Cell>

            <Cell
              index={1}
              title="Ask in plain English"
              desc="An agent explores only the tables it needs and streams each step. The SQL is always shown, and you can stop it mid-run."
            >
              <AgentTrace />
            </Cell>

            <Cell
              index={0}
              title="Join across services"
              desc="Reads span databases and engines through an embedded, read-only DuckDB 2.0. Writes always go to the one owning database."
            >
              <FederationSnippet />
            </Cell>

            <Cell
              index={1}
              title="Query files like tables"
              desc="Upload CSV, JSON, Parquet, XLSX or Avro and join them against live databases."
            >
              <FileList />
            </Cell>

            <Cell
              index={2}
              title="Teams and single sign-on"
              desc="Grant a connection to a team once. Roles come from your OIDC provider at every sign-in."
            >
              <RoleList />
            </Cell>

            <Cell
              index={0}
              title="Every query on the record"
              desc="Reads, writes and AI queries all go to an audit log with tiered retention."
            >
              <AuditList />
            </Cell>

            <Cell
              index={1}
              className="lg:col-span-2"
              title="Dashboards that version themselves"
              desc="A block is one query plus how to read it: table, chart, kanban or gallery. Edits stay a draft until you save, and every save is a version you can restore."
            >
              <Shot
                src="/screenshots/browse-tickets-kanban.png"
                alt="Support tickets as a kanban board"
              />
            </Cell>
          </div>
        </MotionConfig>
      </div>
    </section>
  );
}
