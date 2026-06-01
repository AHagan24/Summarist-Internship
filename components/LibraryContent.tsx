"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import AuthModalTrigger from "@/components/AuthModalTrigger";
import { auth } from "@/lib/firebase";
import {
  getFinishedBooks,
  getSavedBooks,
  removeBookFromLibrary,
  type FinishedBook,
  type SavedBook,
} from "@/lib/library";

export default function LibraryContent() {
  const [user, setUser] = useState<User | null>(null);
  const [isResolvingAuth, setIsResolvingAuth] = useState(true);
  const [savedBooks, setSavedBooks] = useState<SavedBook[]>([]);
  const [finishedBooks, setFinishedBooks] = useState<FinishedBook[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const [removingBookId, setRemovingBookId] = useState<string | null>(null);
  const [libraryError, setLibraryError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    let activeLoad = 0;

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      const loadId = ++activeLoad;

      setUser(nextUser);
      setIsResolvingAuth(false);
      setLibraryError("");

      if (!nextUser) {
        setSavedBooks([]);
        setFinishedBooks([]);
        setIsLoadingBooks(false);
        return;
      }

      setIsLoadingBooks(true);

      Promise.all([getSavedBooks(nextUser.uid), getFinishedBooks(nextUser.uid)])
        .then(([saved, finished]) => {
          if (isCurrent && loadId === activeLoad) {
            setSavedBooks(saved);
            setFinishedBooks(finished);
          }
        })
        .catch(() => {
          if (isCurrent && loadId === activeLoad) {
            setLibraryError(
              "Unable to load your saved books. Please try again.",
            );
          }
        })
        .finally(() => {
          if (isCurrent && loadId === activeLoad) {
            setIsLoadingBooks(false);
          }
        });
    });

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, []);

  async function handleRemoveBook(bookId: string) {
    if (!user || removingBookId) {
      return;
    }

    const previousSavedBooks = savedBooks;

    setLibraryError("");
    setRemovingBookId(bookId);
    setSavedBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== bookId),
    );

    try {
      await removeBookFromLibrary(user.uid, bookId);
    } catch {
      setSavedBooks(previousSavedBooks);
      setLibraryError("Unable to remove this book. Please try again.");
    } finally {
      setRemovingBookId(null);
    }
  }

  if (isResolvingAuth) {
    return (
      <section className="library-page">
        <p className="for-you__eyebrow">Collection</p>
        <h1 className="for-you__title">My Library</h1>
        <div className="library-page__panel library-page__panel--skeleton">
          <div className="book-skeleton__line library-page__skeleton-title" />
          <div className="book-skeleton__line" />
          <div className="book-skeleton__line book-skeleton__line--short" />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="library-page library-page--logged-out">
        <header className="library-page__header">
          <h1 className="for-you__title">My Library</h1>
        </header>

        <div className="library-page__logged-out-card">
          <p>Log in to view your saved books.</p>
          <AuthModalTrigger className="btn library-page__login-button">
            Login
          </AuthModalTrigger>
        </div>
      </section>
    );
  }

  return (
    <section className="library-page">
      <p className="for-you__eyebrow">Collection</p>
      <h1 className="for-you__title">My Library</h1>

      <div className="library-page__grid">
        <section className="library-page__panel" id="saved-books">
          <h2>Saved Books</h2>
          {isLoadingBooks ? (
            <p aria-live="polite">Loading your saved books...</p>
          ) : libraryError ? (
            <p className="library-page__error" aria-live="polite">
              {libraryError}
            </p>
          ) : savedBooks.length > 0 ? (
            <ul className="library-page__saved-list">
              {savedBooks.map((book) => (
                <li key={book.id}>
                  <article className="library-page__saved-card">
                    <Link
                      className="library-page__saved-link"
                      href={`/book/${book.id}`}
                    >
                      <figure className="library-page__saved-cover-mask">
                        <img
                          className="library-page__saved-cover"
                          src={book.imageLink}
                          alt={book.title}
                        />
                      </figure>
                      <div className="library-page__saved-copy">
                        <h3>{book.title}</h3>
                        <p>{book.author}</p>
                        <span>
                          {typeof book.averageRating === "number"
                            ? `${book.averageRating.toFixed(1)} rating`
                            : "Saved book"}
                        </span>
                      </div>
                    </Link>
                    <button
                      className="library-page__remove"
                      disabled={removingBookId === book.id}
                      onClick={() => handleRemoveBook(book.id)}
                      type="button"
                    >
                      {removingBookId === book.id ? "Removing..." : "Remove"}
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven&apos;t saved any books yet.</p>
          )}
        </section>

        <section className="library-page__panel" id="finished-books">
          <h2>Finished Books</h2>
          {isLoadingBooks ? (
            <p aria-live="polite">Loading your finished books...</p>
          ) : finishedBooks.length > 0 ? (
            <ul className="library-page__saved-list">
              {finishedBooks.map((book) => (
                <li key={book.id}>
                  <Link
                    className="library-page__saved-card library-page__saved-card--link"
                    href={`/book/${book.id}`}
                  >
                    <figure className="library-page__saved-cover-mask">
                      <img
                        className="library-page__saved-cover"
                        src={book.imageLink}
                        alt={book.title}
                      />
                    </figure>
                    <div className="library-page__saved-copy">
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                      <span>Finished</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven&apos;t finished any books yet.</p>
          )}
        </section>
      </div>

      <Link className="btn library-page__cta" href="/for-you">
        Browse Books
      </Link>
    </section>
  );
}
