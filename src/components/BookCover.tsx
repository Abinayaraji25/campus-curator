import { coverStyle, type Book } from "@/lib/books";
import { cn } from "@/lib/utils";

export function BookCover({
  book,
  className,
  size = "md",
}: {
  book: Book;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const text = size === "lg" ? "text-lg" : size === "sm" ? "text-[10px]" : "text-xs";
  return (
    <div
      style={coverStyle(book.id)}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-lg p-3 text-primary-foreground shadow-md",
        className,
      )}
    >
      <div className="absolute inset-y-0 left-0 w-2 bg-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.25),transparent_55%)]" />
      <span className={cn("relative font-display font-semibold leading-tight line-clamp-4", text)}>
        {book.title}
      </span>
      <span className={cn("relative opacity-80", size === "lg" ? "text-sm" : "text-[10px]")}>
        {book.author}
      </span>
    </div>
  );
}
