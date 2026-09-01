import { Download, BookOpen } from "lucide-react";
import type { Book } from "@/lib/books";
import { fmtDate, type Loan, type Student } from "@/lib/library-store";
import { Button } from "@/components/ui/button";

export function Receipt({
  book,
  loan,
  student,
}: {
  book: Book;
  loan: Loan;
  student: Student;
}) {
  function download() {
    const text = [
      "📚 LIBRARY BORROWING RECEIPT",
      "Smart Library Book Finder",
      "-----------------------------------",
      `Student Name : ${student.fullName}`,
      `Student ID   : ${student.studentId}`,
      `Book Title   : ${book.title}`,
      `Book ID      : ${book.id}`,
      `Location     : ${book.block} / Rack ${book.rack} / Shelf ${book.shelf}`,
      `Borrow Date  : ${fmtDate(loan.borrowDate)}`,
      `Due Date     : ${fmtDate(loan.dueDate)}`,
      "Status       : Borrowed",
      "-----------------------------------",
      "Please return on or before the due date.",
    ].join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${book.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="surface-card overflow-hidden">
      <div className="gradient-warm flex items-center gap-2 px-5 py-3 text-primary-foreground">
        <BookOpen className="h-4 w-4" />
        <span className="font-display font-semibold">Library Borrowing Receipt</span>
      </div>
      <dl className="grid gap-3 p-5 text-sm sm:grid-cols-2">
        <Row label="Student Name" value={student.fullName} />
        <Row label="Student ID" value={student.studentId} />
        <Row label="Book Title" value={book.title} />
        <Row label="Book ID" value={book.id} />
        <Row label="Borrow Date" value={fmtDate(loan.borrowDate)} />
        <Row label="Due Date" value={fmtDate(loan.dueDate)} />
        <Row label="Location" value={`${book.block} · Rack ${book.rack} · Shelf ${book.shelf}`} />
        <Row label="Status" value="🟢 Borrowed" />
      </dl>
      <div className="border-t border-dashed p-4">
        <Button variant="outline" onClick={download} className="w-full">
          <Download className="h-4 w-4" /> Download Receipt
        </Button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
