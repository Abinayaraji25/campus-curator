export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  block: string;
  rack: string;
  shelf: string;
  available: boolean;
  description: string;
};

export const CATEGORIES = [
  "Story Books",
  "Programming",
  "AI & Machine Learning",
  "Data Science",
  "Database",
  "Networking",
  "Web Development",
  "Operating Systems",
] as const;

const b = (
  id: string,
  title: string,
  author: string,
  category: string,
  block: string,
  rack: string,
  shelf: string,
  available: boolean,
  description: string,
): Book => ({ id, title, author, category, block, rack, shelf, available, description });

export const BOOKS: Book[] = [
  // Programming
  b("B001", "Java: The Complete Reference", "Herbert Schildt", "Programming", "Block A", "R05", "S02", true, "The definitive Java guide covering syntax, OOP, collections, streams and the modern Java platform."),
  b("B002", "Head First Java", "Kathy Sierra", "Programming", "Block A", "R05", "S03", true, "A brain-friendly, visual introduction to Java programming and object oriented thinking."),
  b("B003", "Python Crash Course", "Eric Matthes", "Programming", "Block A", "R06", "S01", true, "A hands-on, project-based introduction to Python programming for absolute beginners."),
  b("B004", "Automate the Boring Stuff with Python", "Al Sweigart", "Programming", "Block A", "R06", "S02", false, "Practical Python programming for total beginners who want to automate everyday tasks."),
  b("B005", "The C Programming Language", "Brian Kernighan and Dennis Ritchie", "Programming", "Block A", "R04", "S01", true, "The classic K&R text on C, the foundation of modern systems programming."),
  b("B006", "Data Structures and Algorithms in Java", "Robert Lafore", "Programming", "Block A", "R04", "S02", true, "Learn arrays, stacks, queues, trees, graphs and sorting with clear Java examples."),
  b("B007", "Introduction to Algorithms", "Thomas H. Cormen", "Programming", "Block A", "R04", "S03", false, "The comprehensive CLRS reference on algorithm design, analysis and correctness."),
  b("B008", "Clean Code", "Robert C. Martin", "Programming", "Block A", "R05", "S01", true, "A handbook of agile software craftsmanship and writing readable, maintainable code."),
  b("B009", "Effective Java", "Joshua Bloch", "Programming", "Block A", "R05", "S04", true, "78 best practices for writing robust, efficient and idiomatic Java code."),
  b("B010", "C++ Primer", "Stanley B. Lippman", "Programming", "Block A", "R04", "S04", true, "A thorough introduction to modern C++ with practical examples and exercises."),
  b("B011", "The Pragmatic Programmer", "Andrew Hunt and David Thomas", "Programming", "Block A", "R06", "S03", true, "Timeless advice on craftsmanship, tooling and career growth for developers."),
  b("B012", "Programming in ANSI C", "E. Balagurusamy", "Programming", "Block A", "R06", "S04", true, "A popular Indian university text covering C fundamentals with solved examples."),

  // AI & ML
  b("B013", "Artificial Intelligence: A Modern Approach", "Stuart Russell and Peter Norvig", "AI & Machine Learning", "Block B", "R01", "S01", true, "The standard AI textbook: search, logic, planning, probabilistic reasoning and learning."),
  b("B014", "Hands-On Machine Learning", "Aurelien Geron", "AI & Machine Learning", "Block B", "R01", "S02", true, "Build ML systems with Scikit-Learn, Keras and TensorFlow through practical projects."),
  b("B015", "Deep Learning", "Ian Goodfellow", "AI & Machine Learning", "Block B", "R01", "S03", false, "The foundational deep learning text on neural networks and representation learning."),
  b("B016", "Pattern Recognition and Machine Learning", "Christopher Bishop", "AI & Machine Learning", "Block B", "R01", "S04", true, "A rigorous probabilistic treatment of pattern recognition and machine learning."),
  b("B017", "Machine Learning", "Tom M. Mitchell", "AI & Machine Learning", "Block B", "R02", "S01", true, "A classic introduction to concept learning, decision trees and neural networks."),
  b("B018", "Grokking Deep Learning", "Andrew W. Trask", "AI & Machine Learning", "Block B", "R02", "S02", true, "Learn how neural networks work by building them from scratch in Python."),

  // Data Science
  b("B019", "Python for Data Analysis", "Wes McKinney", "Data Science", "Block B", "R03", "S01", true, "Data wrangling with pandas, NumPy and Jupyter by the creator of pandas."),
  b("B020", "Data Science from Scratch", "Joel Grus", "Data Science", "Block B", "R03", "S02", true, "First principles data science: statistics, linear algebra and models in plain Python."),
  b("B021", "Storytelling with Data", "Cole Nussbaumer Knaflic", "Data Science", "Block B", "R03", "S03", true, "A practical guide to data visualisation and communicating insight clearly."),
  b("B022", "R for Data Science", "Hadley Wickham", "Data Science", "Block B", "R03", "S04", false, "Import, tidy, transform, visualise and model data using the tidyverse in R."),
  b("B023", "Practical Statistics for Data Scientists", "Peter Bruce", "Data Science", "Block B", "R04", "S01", true, "Core statistical concepts explained for working data practitioners."),
  b("B024", "Big Data: Principles and Best Practices", "Nathan Marz", "Data Science", "Block B", "R04", "S02", true, "Designing scalable real-time data systems using the lambda architecture."),

  // Database
  b("B025", "Database System Concepts", "Abraham Silberschatz", "Database", "Block C", "R01", "S01", true, "The classic database text: relational model, SQL, transactions and storage."),
  b("B026", "Fundamentals of Database Systems", "Elmasri and Navathe", "Database", "Block C", "R01", "S02", true, "Comprehensive coverage of ER modelling, normalisation and query processing."),
  b("B027", "SQL in 10 Minutes a Day", "Ben Forta", "Database", "Block C", "R01", "S03", true, "Fast, focused lessons that teach practical SQL query writing."),
  b("B028", "MongoDB: The Definitive Guide", "Kristina Chodorow", "Database", "Block C", "R01", "S04", false, "Document-oriented database design, indexing and scaling with MongoDB."),
  b("B029", "Designing Data-Intensive Applications", "Martin Kleppmann", "Database", "Block C", "R02", "S01", true, "The ideas behind reliable, scalable and maintainable data systems."),

  // Networking
  b("B030", "Computer Networking: A Top-Down Approach", "Kurose and Ross", "Networking", "Block C", "R03", "S01", true, "Networking taught from the application layer down to the physical layer."),
  b("B031", "Computer Networks", "Andrew S. Tanenbaum", "Networking", "Block C", "R03", "S02", true, "A complete reference on network architecture, protocols and standards."),
  b("B032", "TCP/IP Illustrated", "W. Richard Stevens", "Networking", "Block C", "R03", "S03", false, "A deep, packet-level exploration of the TCP/IP protocol suite."),
  b("B033", "Data Communications and Networking", "Behrouz A. Forouzan", "Networking", "Block C", "R03", "S04", true, "Widely used university text on data communication concepts and protocols."),
  b("B034", "Network Security Essentials", "William Stallings", "Networking", "Block C", "R04", "S01", true, "Cryptography, authentication and network security applications explained."),

  // Operating Systems
  b("B035", "Operating System Concepts", "Abraham Silberschatz", "Operating Systems", "Block C", "R05", "S01", true, "The dinosaur book: processes, scheduling, memory, file systems and security."),
  b("B036", "Modern Operating Systems", "Andrew S. Tanenbaum", "Operating Systems", "Block C", "R05", "S02", true, "A clear, practical treatment of modern OS design and implementation."),
  b("B037", "Operating Systems: Three Easy Pieces", "Remzi Arpaci-Dusseau", "Operating Systems", "Block C", "R05", "S03", true, "Virtualization, concurrency and persistence explained with clarity and humour."),
  b("B038", "Linux Kernel Development", "Robert Love", "Operating Systems", "Block C", "R05", "S04", false, "An insider guide to the design and implementation of the Linux kernel."),

  // Web Development
  b("B039", "HTML and CSS: Design and Build Websites", "Jon Duckett", "Web Development", "Block D", "R01", "S01", true, "A beautifully designed visual introduction to HTML and CSS."),
  b("B040", "JavaScript and JQuery", "Jon Duckett", "Web Development", "Block D", "R01", "S02", true, "Interactive front-end development explained with clear illustrations."),
  b("B041", "Eloquent JavaScript", "Marijn Haverbeke", "Web Development", "Block D", "R01", "S03", true, "A modern introduction to programming with JavaScript and the browser."),
  b("B042", "You Don't Know JS Yet", "Kyle Simpson", "Web Development", "Block D", "R01", "S04", false, "Deep dives into scope, closures, types and the JavaScript engine."),
  b("B043", "Learning React", "Alex Banks and Eve Porcello", "Web Development", "Block D", "R02", "S01", true, "Modern patterns for building user interfaces with React and hooks."),
  b("B044", "Node.js Design Patterns", "Mario Casciaro", "Web Development", "Block D", "R02", "S02", true, "Server-side JavaScript architecture, streams and scalability patterns."),

  // Story Books
  b("B045", "The Alchemist", "Paulo Coelho", "Story Books", "Block E", "R01", "S01", true, "Santiago the shepherd travels to Egypt chasing a recurring dream of treasure."),
  b("B046", "Harry Potter and the Philosopher's Stone", "J.K. Rowling", "Story Books", "Block E", "R01", "S02", false, "A boy discovers he is a wizard and begins his first year at Hogwarts."),
  b("B047", "Harry Potter and the Chamber of Secrets", "J.K. Rowling", "Story Books", "Block E", "R01", "S03", true, "A hidden chamber opens at Hogwarts and a monster stalks the corridors."),
  b("B048", "The Hobbit", "J.R.R. Tolkien", "Story Books", "Block E", "R01", "S04", true, "Bilbo Baggins joins thirteen dwarves on a quest to reclaim a stolen treasure."),
  b("B049", "The Little Prince", "Antoine de Saint-Exupery", "Story Books", "Block E", "R02", "S01", true, "A pilot meets a young prince who has travelled from a tiny asteroid."),
  b("B050", "Pride and Prejudice", "Jane Austen", "Story Books", "Block E", "R02", "S02", true, "Elizabeth Bennet navigates manners, family and the proud Mr Darcy."),
  b("B051", "The Great Gatsby", "F. Scott Fitzgerald", "Story Books", "Block E", "R02", "S03", true, "Jay Gatsby chases a golden past across the lawns of Long Island."),
  b("B052", "To Kill a Mockingbird", "Harper Lee", "Story Books", "Block E", "R02", "S04", false, "Scout Finch watches her father defend an innocent man in the American South."),
  b("B053", "The Kite Runner", "Khaled Hosseini", "Story Books", "Block E", "R03", "S01", true, "A story of friendship, betrayal and redemption set in Kabul and California."),
  b("B054", "Life of Pi", "Yann Martel", "Story Books", "Block E", "R03", "S02", true, "A boy survives a shipwreck sharing a lifeboat with a Bengal tiger."),
  b("B055", "The Book Thief", "Markus Zusak", "Story Books", "Block E", "R03", "S03", true, "Narrated by Death, a girl steals books in Nazi Germany."),
  b("B056", "The Fault in Our Stars", "John Green", "Story Books", "Block E", "R03", "S04", true, "Two teenagers meet at a cancer support group and fall in love."),
  b("B057", "Alice's Adventures in Wonderland", "Lewis Carroll", "Story Books", "Block E", "R04", "S01", true, "Alice falls down a rabbit hole into a world of delightful nonsense."),
  b("B058", "The Jungle Book", "Rudyard Kipling", "Story Books", "Block E", "R04", "S02", true, "Mowgli grows up among wolves, a bear and a panther in the Indian jungle."),
  b("B059", "Around the World in Eighty Days", "Jules Verne", "Story Books", "Block E", "R04", "S03", true, "Phileas Fogg wagers his fortune on circling the globe in eighty days."),
  b("B060", "Little Women", "Louisa May Alcott", "Story Books", "Block E", "R04", "S04", true, "The March sisters grow up together through hardship, art and love."),
];

export const BLOCKS = Array.from(new Set(BOOKS.map((x) => x.block))).sort();

export const getBook = (id: string) => BOOKS.find((x) => x.id === id);

// --- Smart search helpers ---
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();

function levenshtein(a: string, b: string) {
  const n = b.length;
  let prev: number[] = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur: number[] = [i];
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min((prev[j] ?? 0) + 1, (cur[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
    }
    prev = cur;
  }
  return prev[n] ?? 0;
}

const VOCAB = Array.from(
  new Set(
    BOOKS.flatMap((x) => [...norm(x.title).split(" "), ...norm(x.author).split(" "), ...norm(x.category).split(" ")]).filter(
      (w) => w.length > 3,
    ),
  ),
);

export function searchBooks(query: string, category?: string) {
  const q = norm(query);
  let list = BOOKS;
  if (category) list = list.filter((x) => x.category === category);
  if (!q) return list;
  const terms = q.split(" ");
  const scored = list
    .map((book) => {
      const hay = norm(`${book.title} ${book.author} ${book.category} ${book.description} ${book.id}`);
      const titleHay = norm(book.title);
      let score = 0;
      for (const t of terms) {
        if (titleHay.includes(t)) score += 5;
        else if (hay.includes(t)) score += 2;
        else score -= 10;
      }
      return { book, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b2) => b2.score - a.score);
  return scored.map((x) => x.book);
}

export function spellingSuggestion(query: string): string | null {
  const q = norm(query);
  if (!q || q.length < 3) return null;
  if (searchBooks(q).length > 0) return null;
  let best: { word: string; d: number } | null = null;
  for (const w of VOCAB) {
    const d = levenshtein(q, w);
    if (!best || d < best.d) best = { word: w, d };
  }
  if (best && best.d <= Math.max(1, Math.floor(q.length / 3))) {
    return best.word.charAt(0).toUpperCase() + best.word.slice(1);
  }
  return null;
}

export function similarBooks(book: Book, count = 3) {
  return BOOKS.filter((x) => x.category === book.category && x.id !== book.id).slice(0, count);
}

// Deterministic warm cover gradient per book
export function coverStyle(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
  const hue = (h % 60) + 15; // warm amber/brown range
  return {
    backgroundImage: `linear-gradient(145deg, oklch(0.55 0.12 ${hue}), oklch(0.32 0.08 ${(hue + 30) % 360}))`,
  };
}
