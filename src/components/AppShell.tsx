import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookOpen,
  Home,
  Search,
  Library,
  Heart,
  FolderOpen,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useLibrary } from "@/lib/library-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/search", label: "Search Books", icon: Search },
  { to: "/my-books", label: "My Books", icon: Library },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/categories", label: "Categories", icon: FolderOpen },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { student, ready, logout } = useLibrary();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !student) navigate({ to: "/login", replace: true });
  }, [ready, student, navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!ready || !student) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading your library…
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="gradient-warm flex h-9 w-9 items-center justify-center rounded-xl text-primary-foreground">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-semibold leading-none">
              Smart Library
              <span className="block text-[11px] font-normal text-muted-foreground">
                Book Finder
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                  pathname === item.to && "bg-secondary text-foreground",
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden lg:inline-flex"
              onClick={() => {
                logout();
                navigate({ to: "/login", replace: true });
              }}
            >
              <LogOut className="h-4 w-4" /> Logout
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle navigation"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-border/70 px-4 pb-4 pt-2 lg:hidden">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary"
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            ))}
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-destructive hover:bg-secondary"
              onClick={() => {
                logout();
                navigate({ to: "/login", replace: true });
              }}
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-xs text-muted-foreground">
        Smart Library Book Finder · Design Thinking – Project Better Tomorrow
      </footer>
    </div>
  );
}
