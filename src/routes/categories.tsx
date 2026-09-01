import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Code2,
  Brain,
  BarChart3,
  Database,
  Network,
  Globe,
  Cpu,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BOOKS, CATEGORIES } from "@/lib/books";
import { useLibrary } from "@/lib/library-store";

const ICONS: Record<string, typeof BookOpen> = {
  "Story Books": BookOpen,
  Programming: Code2,
  "AI & Machine Learning": Brain,
  "Data Science": BarChart3,
  Database: Database,
  Networking: Network,
  "Web Development": Globe,
  "Operating Systems": Cpu,
};

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories | Smart Library Book Finder" },
      {
        name: "description",
        content:
          "Browse library categories: programming, AI, data science, database, networking, web and story books.",
      },
      { property: "og:title", content: "Categories | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Explore the college library catalogue by subject category.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <Categories />
    </AppShell>
  ),
});

function Categories() {
  const { isAvailable } = useLibrary();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Categories</h1>
        <p className="mt-1 text-sm text-muted-foreground">Browse the collection by subject.</p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const books = BOOKS.filter((b) => b.category === c);
          const avail = books.filter((b) => isAvailable(b.id)).length;
          const Icon = ICONS[c] ?? BookOpen;
          return (
            <Link
              key={c}
              to="/search"
              search={{ q: "", category: c }}
              className="surface-card flex items-center gap-4 p-5 transition-transform hover:-translate-y-1"
            >
              <span className="gradient-warm flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{c}</p>
                <p className="text-xs text-muted-foreground">
                  {books.length} books · {avail} available
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
