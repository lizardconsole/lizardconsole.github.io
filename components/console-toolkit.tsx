import { Table2, Columns3, Images, CalendarDays, ListTree } from "lucide-react";
import { SectionHeader } from "./section-header";

const viewTypes = [
  { icon: Table2, label: "Table", hint: "Any table" },
  { icon: Columns3, label: "Kanban", hint: "Group by a status or enum" },
  { icon: Images, label: "Gallery", hint: "Tables with images" },
  { icon: CalendarDays, label: "Calendar", hint: "Date and time columns" },
  { icon: ListTree, label: "Tree", hint: "Self-referencing parent_id" }
];

const tools = [
  {
    title: "Saved views",
    desc: "Name a combination of filters, sort, visible columns and view type, and share it with your team."
  },
  {
    title: "Bulk actions",
    desc: "Select rows to edit or delete them together, or duplicate a row as the start of a new one."
  },
  {
    title: "Import",
    desc: "Load CSV, JSON or NDJSON into a table, written through the same single-database path as every edit."
  },
  {
    title: "Many-to-many links",
    desc: "Junction tables are detected from their foreign keys and shown as linked records on both sides."
  },
  {
    title: "Comments on records",
    desc: "Leave notes on any row, in any database. They live in Lizard, so nothing is added to your schema."
  },
  {
    title: "Search everything",
    desc: "Press ⌘K to jump to any table or record. Type connection/table to scope the search."
  }
];

export function ConsoleToolkit() {
  return (
    <section id="console" className="border-t border-border-primary py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="The console" title="Everything you do with rows, without writing a single page">
          Five ways to look at any table, offered automatically from its columns, and the everyday tools of a good admin, generated from the
          schema.
        </SectionHeader>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {viewTypes.map((view) => (
            <div key={view.label} className="card p-4">
              <span className="icon-tile">
                <view.icon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-sm font-medium text-text-primary">{view.label}</p>
              <p className="mt-0.5 text-[13px] leading-5 text-text-muted">{view.hint}</p>
            </div>
          ))}
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <div key={tool.title} className="border-l border-border-strong pl-4">
              <dt className="text-sm font-medium text-text-primary">{tool.title}</dt>
              <dd className="mt-1 text-sm leading-6 text-text-secondary">{tool.desc}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
