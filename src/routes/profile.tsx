import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/AppShell";
import { getBook } from "@/lib/books";
import { useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | Smart Library Book Finder" },
      {
        name: "description",
        content: "Your student profile, borrowing stats and favorite books in the smart library.",
      },
      { property: "og:title", content: "My Profile | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "View and edit your student details and library activity.",
      },
    ],
  }),
  component: () => (
    <AppShell>
      <Profile />
    </AppShell>
  ),
});

function Profile() {
  const { student, activeLoans, historyLoans, favorites, updateProfile } = useLibrary();
  const [editing, setEditing] = useState(false);
  if (!student) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl">My Profile</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="surface-card p-6">
          {editing ? (
            <form
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                updateProfile({
                  fullName: String(fd.get("fullName") ?? "").trim().slice(0, 80),
                  email: String(fd.get("email") ?? "").trim().slice(0, 120),
                  phone: String(fd.get("phone") ?? "").trim().slice(0, 15),
                  department: String(fd.get("department") ?? "").trim().slice(0, 60),
                  year: String(fd.get("year") ?? "").trim().slice(0, 20),
                });
                setEditing(false);
                toast.success("Profile updated");
              }}
            >
              {(
                [
                  ["fullName", "Full Name", student.fullName],
                  ["email", "College Email", student.email],
                  ["phone", "Phone Number", student.phone],
                  ["department", "Department", student.department],
                  ["year", "Year of Study", student.year],
                ] as const
              ).map(([name, label, value]) => (
                <div key={name} className="space-y-1.5">
                  <Label htmlFor={name}>{label}</Label>
                  <Input id={name} name={name} defaultValue={value} />
                </div>
              ))}
              <div className="flex gap-2 sm:col-span-2">
                <Button type="submit">Save Changes</Button>
                <Button type="button" variant="outline" onClick={() => setEditing(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <span className="gradient-warm flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl text-primary-foreground">
                  {student.fullName.charAt(0).toUpperCase()}
                </span>
                <div>
                  <p className="font-display text-2xl font-semibold">{student.fullName}</p>
                  <p className="text-sm text-muted-foreground">{student.studentId}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <Info label="College Email" value={student.email} />
                <Info label="Phone Number" value={student.phone} />
                <Info label="Department" value={student.department} />
                <Info label="Year of Study" value={student.year} />
                <Info label="Books Borrowed (active)" value={String(activeLoans.length)} />
                <Info label="Books Returned" value={String(historyLoans.length)} />
              </dl>
              <Button className="mt-6" onClick={() => setEditing(true)}>
                Edit Profile
              </Button>
            </>
          )}
        </div>

        <div className="surface-card p-6">
          <h2 className="text-lg">Favorite Books</h2>
          {favorites.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">No favorites saved yet.</p>
          ) : (
            <ul className="mt-3 space-y-2 text-sm">
              {favorites.map((id) => {
                const book = getBook(id);
                if (!book) return null;
                return (
                  <li key={id}>
                    <Link
                      to="/book/$bookId"
                      params={{ bookId: id }}
                      className="hover:text-primary hover:underline"
                    >
                      ❤️ {book.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
