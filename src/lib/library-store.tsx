import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BOOKS, type Book } from "./books";

export type Student = {
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  password: string;
};

export type Loan = {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: string; // ISO
  dueDate: string; // ISO
  returnDate: string | null;
};

type State = {
  students: Student[];
  currentId: string | null;
  loans: Loan[];
  favorites: Record<string, string[]>;
  notify: Record<string, string[]>;
};

const KEY = "smart-library-v1";

const empty: State = { students: [], currentId: null, loans: [], favorites: {}, notify: {} };

function load(): State {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as State) } : empty;
  } catch {
    return empty;
  }
}

export const LOAN_DAYS = 14;

export function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function daysLeft(iso: string) {
  const ms = new Date(iso).setHours(23, 59, 59, 999) - Date.now();
  return Math.ceil(ms / 86400000);
}

type Ctx = {
  ready: boolean;
  state: State;
  student: Student | null;
  register: (s: Student) => { ok: boolean; error?: string };
  login: (idOrEmail: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateProfile: (patch: Partial<Student>) => void;
  isAvailable: (bookId: string) => boolean;
  activeLoans: Loan[];
  historyLoans: Loan[];
  borrow: (bookId: string) => Loan | null;
  returnBook: (loanId: string) => void;
  favorites: string[];
  toggleFavorite: (bookId: string) => void;
  notifyList: string[];
  toggleNotify: (bookId: string) => void;
  books: Book[];
};

const LibraryContext = createContext<Ctx | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, ready]);

  const value = useMemo<Ctx>(() => {
    const student = state.students.find((s) => s.studentId === state.currentId) ?? null;
    const myLoans = state.loans.filter((l) => l.studentId === state.currentId);
    const activeLoans = myLoans.filter((l) => !l.returnDate);
    const historyLoans = myLoans.filter((l) => l.returnDate);
    const favorites = (state.currentId && state.favorites[state.currentId]) || [];
    const notifyList = (state.currentId && state.notify[state.currentId]) || [];

    const isAvailable = (bookId: string) => {
      const book = BOOKS.find((x) => x.id === bookId);
      if (!book) return false;
      const borrowed = state.loans.some((l) => l.bookId === bookId && !l.returnDate);
      return book.available && !borrowed;
    };

    return {
      ready,
      state,
      student,
      books: BOOKS,
      activeLoans,
      historyLoans,
      favorites,
      notifyList,
      isAvailable,
      register: (s) => {
        if (state.students.some((x) => x.studentId.toLowerCase() === s.studentId.toLowerCase()))
          return { ok: false, error: "A student with this ID already exists." };
        if (state.students.some((x) => x.email.toLowerCase() === s.email.toLowerCase()))
          return { ok: false, error: "This email is already registered." };
        setState((p) => ({ ...p, students: [...p.students, s] }));
        return { ok: true };
      },
      login: (idOrEmail, password) => {
        const key = idOrEmail.trim().toLowerCase();
        const found = state.students.find(
          (x) => x.studentId.toLowerCase() === key || x.email.toLowerCase() === key,
        );
        if (!found) return { ok: false, error: "No account found. Please register first." };
        if (found.password !== password) return { ok: false, error: "Incorrect password." };
        setState((p) => ({ ...p, currentId: found.studentId }));
        return { ok: true };
      },
      logout: () => setState((p) => ({ ...p, currentId: null })),
      updateProfile: (patch) =>
        setState((p) => ({
          ...p,
          students: p.students.map((s) => (s.studentId === p.currentId ? { ...s, ...patch } : s)),
        })),
      borrow: (bookId) => {
        if (!state.currentId || !isAvailable(bookId)) return null;
        const now = new Date();
        const due = new Date(now.getTime() + LOAN_DAYS * 86400000);
        const loan: Loan = {
          id: `L${Date.now()}`,
          bookId,
          studentId: state.currentId,
          borrowDate: now.toISOString(),
          dueDate: due.toISOString(),
          returnDate: null,
        };
        setState((p) => ({ ...p, loans: [...p.loans, loan] }));
        return loan;
      },
      returnBook: (loanId) =>
        setState((p) => ({
          ...p,
          loans: p.loans.map((l) =>
            l.id === loanId ? { ...l, returnDate: new Date().toISOString() } : l,
          ),
        })),
      toggleFavorite: (bookId) =>
        setState((p) => {
          if (!p.currentId) return p;
          const cur = p.favorites[p.currentId] ?? [];
          const next = cur.includes(bookId) ? cur.filter((x) => x !== bookId) : [...cur, bookId];
          return { ...p, favorites: { ...p.favorites, [p.currentId]: next } };
        }),
      toggleNotify: (bookId) =>
        setState((p) => {
          if (!p.currentId) return p;
          const cur = p.notify[p.currentId] ?? [];
          const next = cur.includes(bookId) ? cur.filter((x) => x !== bookId) : [...cur, bookId];
          return { ...p, notify: { ...p.notify, [p.currentId]: next } };
        }),
    };
  }, [state, ready]);

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used inside LibraryProvider");
  return ctx;
}
