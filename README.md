# Smart Library Hub

Build a complete, interactive web application called “Smart Library Book Finder”.

IMPORTANT: I do NOT want a code explanation or a code-only response. Build the actual working application with a modern, polished and fully interactive UI. The application should simulate a real college library system.

🎯 Main Purpose

The application should allow a college student to:

Register → Login → Search for a Book → Check Availability → Find Rack & Shelf → Borrow/Reserve the Book → View Borrowed Books → Return the Book

The complete student journey should be realistic and easy to demonstrate.

👤 1. STUDENT REGISTRATION

Create a Student Registration page.

Fields:

Full Name

Student ID

College Email

Phone Number

Department

Year of Study

Password

Confirm Password

Button:

Create Account

After successful registration, show:

“Registration successful! Welcome to Smart Library.”

Then take the student to the Login page.

Also provide:

Already have an account? Login

🔐 2. STUDENT LOGIN

Create a Login page.

Fields:

Student ID / Email

Password

Buttons:

Login

Forgot Password?

After login, take the student to the Student Dashboard.

🏠 3. STUDENT DASHBOARD

Create a personalized dashboard.

Show:

Welcome, [Student Name] 👋

Example:

Welcome, Abinayaraji!

Display:

📚 Total Books

🟢 Available Books

📖 My Borrowed Books

⏰ Books Due Soon

Add a large search bar:

“Search for a book, author, or keyword…”

Quick categories:

Story Books

Programming

AI & Machine Learning

Data Science

Database

Networking

Web Development

Operating Systems

🔍 4. SEARCH BOOKS

Students can search by:

Book title

Author

Keyword

Category

Example searches:

Java

Harry Potter

Python

J.K. Rowling

Display matching books as attractive cards.

Each card should show:

📖 Book Cover

Book Title

Author

Category

Availability

Rack

Shelf

Button:

View Details

📖 5. BOOK DETAILS

When the student selects a book, show a detailed page.

Example:

Java: The Complete Reference

Author: Herbert Schildt

Category: Programming

Book ID: B001

Availability

🟢 Available

📍 Book Location

Block A

Rack R05

Shelf S02

Show a visual location indicator:

Library → Block A → Rack R05 → Shelf S02

Buttons:

📚 Borrow Book

❤️ Add to Favorites

🔴 6. UNAVAILABLE BOOK

If the book is unavailable, show:

🔴 Currently Unavailable

Do NOT show the Borrow button.

Instead show:

🔔 Notify Me When Available

and:

📚 Similar Books

Recommend 3 similar books.

Example:

If “Harry Potter” is unavailable:

The Hobbit

The Little Prince

The Jungle Book

📚 7. BORROW BOOK

When the student clicks:

📚 Borrow Book

show a confirmation dialog:

Confirm Borrowing

Book: Java: The Complete Reference

Student: Abinayaraji

Borrow Date: Automatically use current date

Due Date: Automatically calculate a reasonable due date, such as 14 days later.

Buttons:

Confirm Borrow

Cancel

After confirmation:

Show:

🎉 Book Borrowed Successfully!

Then display:

Book: Java: The Complete Reference

Rack: R05

Shelf: S02

Borrow Date: Current Date

Due Date: Automatically calculated date

🎫 8. DIGITAL BORROWING RECEIPT

After borrowing, generate a simple digital receipt/card.

Show:

📚 Library Borrowing Receipt

Student Name

Student ID

Book Title

Book ID

Borrow Date

Due Date

Status:

🟢 Borrowed

Add:

Download Receipt

if supported.

📖 9. MY BOOKS

Create a My Books page.

Divide it into:

Currently Borrowed

Show:

Book title

Author

Borrow date

Due date

Status

Return button

Borrowing History

Show previously borrowed books.

Example:

BookBorrowedReturnedStatusJava ProgrammingSep 1Sep 10ReturnedHarry PotterSep 2—Borrowed

🔄 10. RETURN BOOK

Each borrowed book should have:

Return Book

When clicked, show:

Return Confirmation

“Are you sure you want to return this book?”

Buttons:

Yes, Return Book

Cancel

After returning:

🟢 Book returned successfully!

Update the book availability to:

Available

⏰ 11. DUE DATE REMINDER

On the dashboard, show books that are close to their due date.

Example:

⚠️ Book due in 2 days

Also show:

🔴 Overdue

if the due date has passed.

Use clear visual status indicators.

❤️ 12. FAVORITES

Allow students to save books using:

❤️ Add to Favorites

Create a:

My Favorites

page.

Students can remove books from favorites.

🤖 13. SMART SEARCH

Make search intelligent.

Support:

Partial search

“Harry” → Harry Potter books

Author search

“Rowling” → all J.K. Rowling books

Keyword search

“programming” → relevant programming books

Spelling suggestions

If user enters:

“Jvaa”

show:

Did you mean “Java”?

Recommendations

Based on the selected book's category, show similar books.

📚 14. BOOK DATABASE

Add at least 50 sample books.

Include both academic and story books.

Story Books

Include:

The Alchemist — Paulo Coelho

Harry Potter and the Philosopher's Stone — J.K. Rowling

Harry Potter and the Chamber of Secrets — J.K. Rowling

The Hobbit — J.R.R. Tolkien

The Little Prince — Antoine de Saint-Exupéry

Pride and Prejudice — Jane Austen

The Great Gatsby — F. Scott Fitzgerald

To Kill a Mockingbird — Harper Lee

The Kite Runner — Khaled Hosseini

Life of Pi — Yann Martel

The Book Thief — Markus Zusak

The Fault in Our Stars — John Green

Alice's Adventures in Wonderland — Lewis Carroll

The Jungle Book — Rudyard Kipling

Around the World in Eighty Days — Jules Verne

Little Women — Louisa May Alcott

Academic Books

Include:

Java: The Complete Reference — Herbert Schildt

Head First Java — Kathy Sierra

Python Crash Course — Eric Matthes

Automate the Boring Stuff with Python — Al Sweigart

C Programming Language — Brian Kernighan and Dennis Ritchie

Data Structures and Algorithms in Java — Robert Lafore

Introduction to Algorithms — Thomas H. Cormen

Database System Concepts — Abraham Silberschatz

Fundamentals of Database Systems — Elmasri and Navathe

Computer Networking: A Top-Down Approach — Kurose and Ross

Computer Networks — Andrew S. Tanenbaum

Operating System Concepts — Abraham Silberschatz

Artificial Intelligence: A Modern Approach — Stuart Russell and Peter Norvig

Hands-On Machine Learning — Aurélien Géron

Python for Data Analysis — Wes McKinney

Data Science from Scratch — Joel Grus

HTML and CSS: Design and Build Websites — Jon Duckett

JavaScript and JQuery — Jon Duckett

Give every book:

Book ID

Title

Author

Category

Rack Number

Shelf Number

Availability

Description

🗺️ 15. LIBRARY LOCATION

Create a simple visual library map.

Example:

Library

→ Block A

→ Rack R01

→ Rack R02

→ Rack R03

→ Rack R04

→ Rack R05

When a student selects a book, highlight the exact:

Block → Rack → Shelf

Example:

📖 Java Programming

📍 Block A → Rack R05 → Shelf S02

Make this extremely easy to understand.

👤 16. PROFILE

Create a student profile page.

Show:

Student Name

Student ID

Email

Department

Year

Number of borrowed books

Number of returned books

Favorite books

Allow the student to edit basic profile information.

🧭 17. NAVIGATION

After login, navigation should contain:

🏠 Dashboard

🔍 Search Books

📚 My Books

❤️ Favorites

📂 Categories

👤 Profile

Add:

Logout

🔒 18. LOGIN STATE

The application should behave like a real application.

A student should:

Register an account

Login

See their name on dashboard

Search books

Borrow books

See borrowed books in My Books

Return books

See borrowing history

Keep the data persistent during the app session.

🎨 19. UI DESIGN

Use a professional modern library theme.

Design requirements:

Clean

Minimal

Student-friendly

Responsive

Mobile-friendly

Modern cards

Attractive book covers

Rounded corners

Smooth animations

Clear buttons

Search icons

Availability badges

Rack and shelf icons

Good spacing

Professional typography

Use a warm, academic library-inspired visual style.

🏆 20. FINAL USER JOURNEY

The final application should demonstrate this complete flow:

Student Registration

↓

Student Login

↓

Dashboard

↓

Search “Harry Potter”

↓

View Book

↓

Check Availability

↓

See Rack & Shelf

↓

Click Borrow Book

↓

Confirm Borrowing

↓

Receive Borrowing Receipt

↓

Book appears in My Books

↓

Due Date Reminder

↓

Return Book

↓

Book becomes Available again

This complete flow should work interactively in the final application.

IMPORTANT FINAL INSTRUCTION

Do not give me a tutorial or only source code.

Actually build the working application/prototype with all the above pages, navigation, sample books, search functionality, registration/login flow, borrowing flow, return flow, and modern UI.

The result should be suitable for a college Design Thinking – Project Better Tomorrow demonstration.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://campus-curator.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/713b1873-a18f-4000-a156-9d5d934c38bb).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
