import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Bell, BookMarked, Heart, PartyPopper } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";
import { BookCard } from "@/components/BookCard";
import { BookCover } from "@/components/BookCover";
import { LibraryMap } from "@/components/LibraryMap";
import { Receipt } from "@/components/Receipt";
import { getBook, similarBooks } from "@/lib/books";
import { fmtDate, LOAN_DAYS, useLibrary, type Loan } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/book/$bookId")({
  head: () => ({
    meta: [
      { title: "Book Details | Smart Library Book Finder" },
      {
        name: "description",
        content:
          "See availability, block, rack and shelf location, and borrow the book instantly.",
      },
      { property: "og:title", content: "Book Details | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Check availability and the exact rack and shelf for any library book.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <BookDetails />
    </AppShell>
  ),
});

function BookDetails() {
  const { bookId } = Route.useParams();
  const navigate = useNavigate();
  const { isAvailable, borrow, favorites, toggleFavorite, notifyList, toggleNotify, student } =
    useLibrary();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [loan, setLoan] = useState<Loan | null>(null);

  const book = getBook(bookId);
  if (!book) {
    return (
      <div className="surface-card p-10 text-center">
        <h1 className="text-2xl">Book not found</h1>
        <Button asChild className="mt-4">
          <Link to="/search" search={{ q: "", category: "" }}>
            Back to search
          </Link>
        </Button>
      </div>
    );
  }

  const available = isAvailable(book.id);
  const isFav = favorites.includes(book.id);
  const isNotify = notifyList.includes(book.id);
  const due = new Date(Date.now() + LOAN_DAYS * 86400000).toISOString();

  function confirmBorrow() {
    const created = borrow(book!.id);
    setConfirmOpen(false);
    if (created) {
      setLoan(created);
      toast.success("🎉 Book Borrowed Successfully!");
    } else {
      toast.error("Sorry, this book is no longer available.");
    }
  }

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate({ to: "/search", search: { q: "", category: "" } })}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to search
      </button>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="surface-card flex flex-col gap-6 p-6 sm:flex-row">
            <BookCover book={book} size="lg" className="h-64 w-44 shrink-0 self-center sm:self-start" />
            <div className="space-y-3">
              <h1 className="text-3xl">{book.title}</h1>
              <p className="text-muted-foreground">by {book.author}</p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                  {book.category}
                </span>
                <span className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                  Book ID: {book.id}
                </span>
                <AvailabilityBadge available={available} />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{book.description}</p>

              <div className="flex flex-wrap gap-2 pt-2">
                {available && !loan && (
                  <Button size="lg" onClick={() => setConfirmOpen(true)}>
                    <BookMarked className="h-4 w-4" /> Borrow Book
                  </Button>
                )}
                {!available && !loan && (
                  <Button
                    size="lg"
                    variant={isNotify ? "secondary" : "default"}
                    onClick={() => {
                      toggleNotify(book.id);
                      toast(isNotify ? "Notification removed" : "🔔 We'll notify you when it's back!");
                    }}
                  >
                    <Bell className="h-4 w-4" />
                    {isNotify ? "Notification On" : "Notify Me When Available"}
                  </Button>
                )}
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    toggleFavorite(book.id);
                    toast(isFav ? "Removed from favorites" : "❤️ Added to Favorites");
                  }}
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-destructive text-destructive" : ""}`} />
                  {isFav ? "In Favorites" : "Add to Favorites"}
                </Button>
              </div>
            </div>
          </div>

          {loan && student && (
            <div className="space-y-4">
              <div className="surface-card flex items-start gap-3 border-success/40 bg-success/5 p-5">
                <PartyPopper className="h-5 w-5 text-success" />
                <div>
                  <p className="font-display text-lg font-semibold">Book Borrowed Successfully!</p>
                  <p className="text-sm text-muted-foreground">
                    {book.title} · Rack {book.rack} · Shelf {book.shelf} · Borrowed{" "}
                    {fmtDate(loan.borrowDate)} · Due {fmtDate(loan.dueDate)}
                  </p>
                  <Button asChild variant="link" className="h-auto px-0">
                    <Link to="/my-books">Go to My Books →</Link>
                  </Button>
                </div>
              </div>
              <Receipt book={book} loan={loan} student={student} />
            </div>
          )}

          {!available && (
            <section className="space-y-3">
              <h2 className="text-xl">📚 Similar Books</h2>
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {similarBooks(book).map((s) => (
                  <BookCard key={s.id} book={s} available={isAvailable(s.id)} />
                ))}
              </div>
            </section>
          )}
        </div>

        <LibraryMap book={book} />
      </div>

      {available && (
        <section className="space-y-3">
          <h2 className="text-xl">You may also like</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similarBooks(book).map((s) => (
              <BookCard key={s.id} book={s} available={isAvailable(s.id)} />
            ))}
          </div>
        </section>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Borrowing</DialogTitle>
            <DialogDescription>Please check the details before confirming.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 rounded-xl bg-secondary/50 p-4 text-sm">
            <p>
              <span className="text-muted-foreground">Book:</span> {book.title}
            </p>
            <p>
              <span className="text-muted-foreground">Student:</span> {student?.fullName}
            </p>
            <p>
              <span className="text-muted-foreground">Borrow Date:</span>{" "}
              {fmtDate(new Date().toISOString())}
            </p>
            <p>
              <span className="text-muted-foreground">Due Date:</span> {fmtDate(due)} ({LOAN_DAYS}{" "}
              days)
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmBorrow}>Confirm Borrow</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
