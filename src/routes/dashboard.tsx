import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search, BookOpen, CheckCircle2, Library, Clock, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BOOKS, CATEGORIES, getBook } from "@/lib/books";
import { daysLeft, fmtDate, useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Student Dashboard | Smart Library Book Finder" },
      {
        name: "description",
        content:
          "Your library dashboard: total books, availability, borrowed books and due-date reminders.",
      },
      { property: "og:title", content: "Student Dashboard | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Track borrowed books, due dates and search the college library catalogue.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <Dashboard />
    </AppShell>
  ),
});

function Dashboard() {
  const { student, activeLoans, isAvailable } = useLibrary();
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const availableCount = BOOKS.filter((b) => isAvailable(b.id)).length;
  const dueSoon = activeLoans.filter((l) => daysLeft(l.dueDate) <= 3);

  return (
    <div className="space-y-8">
      <section className="surface-card overflow-hidden">
        <div className="gradient-warm px-6 py-8 text-primary-foreground sm:px-10 sm:py-10">
          <p className="text-sm opacity-85">Smart Library Book Finder</p>
          <h1 className="mt-1 text-3xl sm:text-4xl">Welcome, {student?.fullName?.split(" ")[0]} 👋</h1>
          <p className="mt-2 max-w-lg text-sm opacity-90">
            Find any book, check availability and get the exact block, rack and shelf in seconds.
          </p>

          <form
            className="mt-6 flex max-w-2xl gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/search", search: { q, category: "" } });
            }}
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                maxLength={80}
                placeholder="Search for a book, author, or keyword…"
                className="h-12 bg-card pl-10 text-foreground"
              />
            </div>
            <Button type="submit" size="lg" variant="secondary" className="h-12">
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={BookOpen} label="Total Books" value={BOOKS.length} tone="text-primary" />
        <Stat icon={CheckCircle2} label="Available Books" value={availableCount} tone="text-success" />
        <Stat icon={Library} label="My Borrowed Books" value={activeLoans.length} tone="text-accent-foreground" />
        <Stat icon={Clock} label="Books Due Soon" value={dueSoon.length} tone="text-destructive" />
      </section>

      {activeLoans.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl">Due date reminders</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {activeLoans.map((loan) => {
              const book = getBook(loan.bookId);
              const d = daysLeft(loan.dueDate);
              const overdue = d < 0;
              const soon = d >= 0 && d <= 3;
              return (
                <div
                  key={loan.id}
                  className={`surface-card flex items-center justify-between gap-3 p-4 ${
                    overdue ? "border-destructive/40" : soon ? "border-warning/50" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{book?.title}</p>
                    <p className="text-xs text-muted-foreground">Due {fmtDate(loan.dueDate)}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      overdue
                        ? "bg-destructive/12 text-destructive"
                        : soon
                          ? "bg-warning/20 text-warning-foreground"
                          : "bg-success/12 text-success"
                    }`}
                  >
                    {overdue ? (
                      <span className="inline-flex items-center gap-1">
                        <AlertTriangle className="h-3.5 w-3.5" /> Overdue by {Math.abs(d)}d
                      </span>
                    ) : d === 0 ? (
                      "Due today"
                    ) : (
                      `Due in ${d} day${d === 1 ? "" : "s"}`
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl">Quick categories</h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to="/search"
              search={{ q: "", category: c }}
              className="surface-card px-4 py-2 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="surface-card flex items-center gap-4 p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
        <Icon className={`h-5 w-5 ${tone}`} />
      </span>
      <div>
        <p className="font-display text-2xl font-semibold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
