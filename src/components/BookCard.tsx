import { Link } from "@tanstack/react-router";
import { MapPin, Layers } from "lucide-react";
import type { Book } from "@/lib/books";
import { BookCover } from "./BookCover";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function BookCard({ book, available }: { book: Book; available: boolean }) {
  return (
    <div className="surface-card group flex flex-col gap-4 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex gap-4">
        <BookCover book={book} className="h-32 w-24 shrink-0" />
        <div className="min-w-0 flex-1 space-y-1">
          <h3 className="line-clamp-2 font-display text-base font-semibold">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <span className="inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
            {book.category}
          </span>
          <div className="pt-1">
            <AvailabilityBadge available={available} />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5" /> {book.block}
        </span>
        <span className="inline-flex items-center gap-1">
          <Layers className="h-3.5 w-3.5" /> Rack {book.rack}
        </span>
        <span>Shelf {book.shelf}</span>
      </div>
      <Button asChild className="w-full">
        <Link to="/book/$bookId" params={{ bookId: book.id }}>
          View Details
        </Link>
      </Button>
    </div>
  );
}
