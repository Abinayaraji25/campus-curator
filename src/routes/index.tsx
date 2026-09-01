import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, MapPin, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKS } from "@/lib/books";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Library Book Finder | College Library System" },
      {
        name: "description",
        content:
          "Search 60+ college library books, check availability, find the exact rack and shelf, borrow, and return — all in one student-friendly app.",
      },
      { property: "og:title", content: "Smart Library Book Finder | College Library System" },
      {
        property: "og:description",
        content:
          "Register, search, borrow and return books with rack and shelf navigation for your college library.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="gradient-warm flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold">Smart Library</span>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="ghost">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </header>

      <section className="mt-16 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Design Thinking · Project Better Tomorrow
        </span>
        <h1 className="mt-5 text-4xl leading-tight sm:text-6xl">
          Smart Library <span className="text-primary">Book Finder</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Never wander the aisles again. Search any of our {BOOKS.length} books, see live
          availability, and get walked to the exact block, rack and shelf — then borrow it in two
          taps.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/register">Create Student Account</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/login">I already have an account</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16 grid gap-5 sm:grid-cols-3">
        {[
          { icon: Search, title: "Smart Search", body: "Partial, author, keyword and typo-tolerant search with suggestions." },
          { icon: MapPin, title: "Rack & Shelf Map", body: "A visual map highlights Block → Rack → Shelf for every book." },
          { icon: BookOpen, title: "Borrow & Return", body: "Digital receipts, due-date reminders and one-tap returns." },
        ].map((f) => (
          <div key={f.title} className="surface-card p-6">
            <f.icon className="h-6 w-6 text-primary" />
            <h2 className="mt-3 font-display text-lg font-semibold">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
