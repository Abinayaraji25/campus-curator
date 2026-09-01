import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student Login | Smart Library Book Finder" },
      {
        name: "description",
        content: "Log in with your student ID or college email to borrow and track library books.",
      },
      { property: "og:title", content: "Student Login | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Access your college library dashboard, borrowed books and favorites.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useLibrary();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const idOrEmail = String(fd.get("identifier") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!idOrEmail || !password) {
      setError("Please enter your ID/email and password.");
      return;
    }
    const res = login(idOrEmail, password);
    if (!res.ok) {
      setError(res.error ?? "Login failed");
      return;
    }
    toast.success("Welcome back to Smart Library!");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-10">
      <Link to="/" className="mb-6 flex items-center gap-2 self-center">
        <span className="gradient-warm flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground">
          <BookOpen className="h-5 w-5" />
        </span>
        <span className="font-display text-xl font-semibold">Smart Library Book Finder</span>
      </Link>

      <div className="surface-card p-6 sm:p-8">
        <h1 className="text-2xl">Student Login</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to search, borrow and return books.
        </p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit} noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="identifier">Student ID / Email</Label>
            <Input id="identifier" name="identifier" placeholder="22CS045 or abinaya@college.edu" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="••••••" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" size="lg" className="w-full">
            Login
          </Button>
          <button
            type="button"
            className="w-full text-sm text-muted-foreground underline-offset-4 hover:underline"
            onClick={() =>
              toast("Forgot Password?", {
                description: "Please contact the library desk with your student ID to reset it.",
              })
            }
          >
            Forgot Password?
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New student?{" "}
          <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
