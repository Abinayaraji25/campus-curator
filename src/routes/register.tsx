import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Student Registration | Smart Library Book Finder" },
      {
        name: "description",
        content:
          "Create your Smart Library account to search, borrow and track college library books.",
      },
      { property: "og:title", content: "Student Registration | Smart Library Book Finder" },
      {
        property: "og:description",
        content: "Register as a student to borrow books from the smart college library.",
      },
    ],
  }),
  component: RegisterPage,
});

const schema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name").max(80),
    studentId: z.string().trim().min(3, "Enter your student ID").max(20),
    email: z.string().trim().email("Enter a valid college email").max(120),
    phone: z.string().trim().regex(/^[0-9+\-\s]{8,15}$/, "Enter a valid phone number"),
    department: z.string().trim().min(2, "Enter your department").max(60),
    year: z.string().trim().min(1, "Select your year of study"),
    password: z.string().min(6, "Password must be at least 6 characters").max(64),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

function RegisterPage() {
  const { register } = useLibrary();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const { confirmPassword, ...student } = parsed.data;
    void confirmPassword;
    const res = register(student);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    setDone(true);
    toast.success("Registration successful! Welcome to Smart Library.");
    setTimeout(() => navigate({ to: "/login" }), 1600);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10">
      <Link to="/" className="mb-6 flex items-center gap-2 self-center">
        <span className="gradient-warm flex h-10 w-10 items-center justify-center rounded-xl text-primary-foreground">
          <BookOpen className="h-5 w-5" />
        </span>
        <span className="font-display text-xl font-semibold">Smart Library Book Finder</span>
      </Link>

      {done ? (
        <div className="surface-card space-y-3 p-10 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <h1 className="text-2xl">Registration successful!</h1>
          <p className="text-muted-foreground">Welcome to Smart Library. Taking you to login…</p>
        </div>
      ) : (
        <div className="surface-card p-6 sm:p-8">
          <h1 className="text-2xl">Student Registration</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Join your college library in under a minute.
          </p>

          <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
            <Field label="Full Name" name="fullName" error={errors["fullName"]} placeholder="Abinayaraji M" />
            <Field label="Student ID" name="studentId" error={errors["studentId"]} placeholder="22CS045" />
            <Field
              label="College Email"
              name="email"
              type="email"
              error={errors["email"]}
              placeholder="abinaya@college.edu"
            />
            <Field label="Phone Number" name="phone" error={errors["phone"]} placeholder="9876543210" />
            <Field
              label="Department"
              name="department"
              error={errors["department"]}
              placeholder="Computer Science"
            />
            <div className="space-y-1.5">
              <Label htmlFor="year">Year of Study</Label>
              <select
                id="year"
                name="year"
                defaultValue=""
                className="h-10 w-full rounded-md border border-input bg-card px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="" disabled>
                  Select year
                </option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              {errors["year"] && <p className="text-xs text-destructive">{errors["year"]}</p>}
            </div>
            <Field label="Password" name="password" type="password" error={errors["password"]} />
            <Field
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              error={errors["confirmPassword"]}
            />

            <Button type="submit" size="lg" className="sm:col-span-2">
              Create Account
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-primary underline-offset-4 hover:underline">
              Login
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} placeholder={placeholder} maxLength={120} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
