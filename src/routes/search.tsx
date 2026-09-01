import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon, Sparkles } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { BookCard } from "@/components/BookCard";
import { CATEGORIES, searchBooks, spellingSuggestion } from "@/lib/books";
import { useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchParams = { q: string; category: string };

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"].slice(0, 80) : "",
    category: typeof search["category"] === "string" ? search["category"] : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Books | Smart Library Book Finder" },
      {
        name: "description",
        content:
          "Smart search across 60 college library books by title, author, keyword or category with rack and shelf locations.",
      },
      { property: "og:title", content: "Search Books | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Find books instantly with partial, author and keyword search plus suggestions.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <SearchPage />
    </AppShell>
  ),
});

function SearchPage() {
  const { q, category } = Route.useSearch();
  const navigate = useNavigate();
  const { isAvailable } = useLibrary();
  const [term, setTerm] = useState(q);

  const results = searchBooks(q, category || undefined);
  const suggestion = q ? spellingSuggestion(q) : null;

  const apply = (nextQ: string, nextCategory: string) =>
    navigate({ to: "/search", search: { q: nextQ, category: nextCategory } });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Search Books</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Try “Harry”, “Rowling”, “programming”, or even a typo like “Jvaa”.
        </p>
      </div>

      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          apply(term, category);
        }}
      >
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            maxLength={80}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search for a book, author, or keyword…"
            className="h-12 pl-10"
          />
        </div>
        <Button type="submit" size="lg" className="h-12">
          Search
        </Button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => apply(q, "")}
          className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
            category === "" ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
          }`}
        >
          All categories
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => apply(q, c)}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
              category === c ? "bg-primary text-primary-foreground" : "bg-card hover:bg-secondary"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {suggestion && (
        <div className="surface-card flex items-center gap-2 p-4 text-sm">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
          Did you mean{" "}
          <button
            className="font-semibold text-primary underline underline-offset-4"
            onClick={() => {
              setTerm(suggestion);
              apply(suggestion, category);
            }}
          >
            “{suggestion}”
          </button>
          ?
        </div>
      )}

      <p className="text-sm text-muted-foreground">
        {results.length} book{results.length === 1 ? "" : "s"} found
        {category ? ` in ${category}` : ""}
        {q ? ` for “${q}”` : ""}
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((book) => (
          <BookCard key={book.id} book={book} available={isAvailable(book.id)} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="surface-card p-10 text-center text-muted-foreground">
          No books matched your search. Try a shorter keyword or pick a category.
        </div>
      )}
    </div>
  );
}
