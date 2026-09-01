import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { BookCard } from "@/components/BookCard";
import { getBook } from "@/lib/books";
import { useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "My Favorites | Smart Library Book Finder" },
      {
        name: "description",
        content: "Books you saved to read later, with availability and shelf locations.",
      },
      { property: "og:title", content: "My Favorites | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Your saved college library books in one place.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <Favorites />
    </AppShell>
  ),
});

function Favorites() {
  const { favorites, toggleFavorite, isAvailable } = useLibrary();
  const books = favorites.map(getBook).filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">My Favorites</h1>
        <p className="mt-1 text-sm text-muted-foreground">{books.length} saved book(s)</p>
      </div>

      {books.length === 0 ? (
        <div className="surface-card p-10 text-center text-muted-foreground">
          No favorites yet.{" "}
          <Link to="/search" search={{ q: "", category: "" }} className="text-primary underline">
            Browse books
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div key={book!.id} className="space-y-2">
              <BookCard book={book!} available={isAvailable(book!.id)} />
              <Button
                variant="ghost"
                className="w-full text-destructive"
                onClick={() => {
                  toggleFavorite(book!.id);
                  toast("Removed from favorites");
                }}
              >
                <Heart className="h-4 w-4 fill-destructive" /> Remove from Favorites
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
