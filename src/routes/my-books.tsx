import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { getBook } from "@/lib/books";
import { daysLeft, fmtDate, useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookCover } from "@/components/BookCover";

export const Route = createFileRoute("/my-books")({
  head: () => ({
    meta: [
      { title: "My Books | Smart Library Book Finder" },
      {
        name: "description",
        content: "See currently borrowed books, due dates, return them and view borrowing history.",
      },
      { property: "og:title", content: "My Books | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Manage borrowed college library books and view your full borrowing history.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <MyBooks />
    </AppShell>
  ),
});

function MyBooks() {
  const { activeLoans, historyLoans, returnBook } = useLibrary();
  const [pending, setPending] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl">My Books</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Borrowed books, due dates and your complete history.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl">Currently Borrowed</h2>
        {activeLoans.length === 0 ? (
          <div className="surface-card p-8 text-center text-muted-foreground">
            You haven't borrowed any books yet.{" "}
            <Link to="/search" search={{ q: "", category: "" }} className="text-primary underline">
              Find a book
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {activeLoans.map((loan) => {
              const book = getBook(loan.bookId);
              if (!book) return null;
              const d = daysLeft(loan.dueDate);
              const overdue = d < 0;
              return (
                <div key={loan.id} className="surface-card flex flex-wrap items-center gap-4 p-4">
                  <BookCover book={book} size="sm" className="h-24 w-16 shrink-0" />
                  <div className="min-w-[200px] flex-1">
                    <Link
                      to="/book/$bookId"
                      params={{ bookId: book.id }}
                      className="font-display text-lg font-semibold hover:underline"
                    >
                      {book.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Borrowed {fmtDate(loan.borrowDate)} · Due {fmtDate(loan.dueDate)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      overdue
                        ? "bg-destructive/12 text-destructive"
                        : d <= 3
                          ? "bg-warning/20 text-warning-foreground"
                          : "bg-success/12 text-success"
                    }`}
                  >
                    {overdue
                      ? `🔴 Overdue by ${Math.abs(d)} day${Math.abs(d) === 1 ? "" : "s"}`
                      : d === 0
                        ? "⚠️ Due today"
                        : d <= 3
                          ? `⚠️ Due in ${d} day${d === 1 ? "" : "s"}`
                          : "🟢 Borrowed"}
                  </span>
                  <Button variant="outline" onClick={() => setPending(loan.id)}>
                    Return Book
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl">Borrowing History</h2>
        {historyLoans.length === 0 ? (
          <div className="surface-card p-8 text-center text-muted-foreground">
            No returned books yet.
          </div>
        ) : (
          <div className="surface-card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Book</th>
                  <th className="px-4 py-3 font-medium">Borrowed</th>
                  <th className="px-4 py-3 font-medium">Returned</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {historyLoans.map((loan) => {
                  const book = getBook(loan.bookId);
                  return (
                    <tr key={loan.id} className="border-t">
                      <td className="px-4 py-3">{book?.title}</td>
                      <td className="px-4 py-3">{fmtDate(loan.borrowDate)}</td>
                      <td className="px-4 py-3">{loan.returnDate ? fmtDate(loan.returnDate) : "—"}</td>
                      <td className="px-4 py-3 text-success">Returned</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <Dialog open={!!pending} onOpenChange={(o) => !o && setPending(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Return Confirmation</DialogTitle>
            <DialogDescription>Are you sure you want to return this book?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPending(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (pending) returnBook(pending);
                setPending(null);
                toast.success("🟢 Book returned successfully!");
              }}
            >
              Yes, Return Book
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
