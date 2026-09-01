import { MapPin } from "lucide-react";
import { BLOCKS, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

const RACKS = ["R01", "R02", "R03", "R04", "R05", "R06"];
const SHELVES = ["S01", "S02", "S03", "S04"];

export function LibraryMap({ book }: { book: Book }) {
  return (
    <div className="surface-card space-y-5 p-5">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-primary" />
        <h3 className="font-display text-lg font-semibold">Book Location</h3>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl bg-secondary/60 p-3 text-sm font-medium">
        <span>📚 Library</span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">{book.block}</span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-full bg-primary px-2.5 py-1 text-primary-foreground">Rack {book.rack}</span>
        <span className="text-muted-foreground">→</span>
        <span className="rounded-full bg-accent px-2.5 py-1 text-accent-foreground">Shelf {book.shelf}</span>
      </div>

      <div className="space-y-3">
        {BLOCKS.map((block) => (
          <div
            key={block}
            className={cn(
              "rounded-xl border p-3",
              block === book.block ? "border-primary/50 bg-primary/5" : "opacity-60",
            )}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {block}
            </p>
            <div className="flex flex-wrap gap-2">
              {RACKS.map((rack) => {
                const isRack = block === book.block && rack === book.rack;
                return (
                  <div
                    key={rack}
                    className={cn(
                      "rounded-lg border px-2.5 py-2 text-xs",
                      isRack ? "border-primary bg-card shadow-sm" : "bg-card/60",
                    )}
                  >
                    <p className={cn("font-medium", isRack && "text-primary")}>{rack}</p>
                    {isRack && (
                      <div className="mt-1.5 flex gap-1">
                        {SHELVES.map((s) => (
                          <span
                            key={s}
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px]",
                              s === book.shelf
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-muted-foreground",
                            )}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Walk to {book.block}, find rack {book.rack} and look at shelf {book.shelf}.
      </p>
    </div>
  );
}
