"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="for-you-page">
      <div className="for-you__shell">
        <aside className="for-you__sidebar">
          <figure className="for-you__logo--mask">
            <img
              className="for-you__logo"
              src="/assets/logo.png"
              alt="Summarist"
            />
          </figure>
          <nav className="for-you__nav" aria-label="Book navigation">
            <Link className="for-you__nav-item" href="/for-you">
              For You
            </Link>
            <span className="for-you__nav-item">My Library</span>
            <span className="for-you__nav-item">Highlights</span>
          </nav>
        </aside>

        <section className="for-you__content">
          <div className="book-detail__error">
            <h1 className="for-you__error-title">Unable to load this book</h1>
            <p className="for-you__error-copy">
              Something went wrong while loading the book details.
            </p>
            <button
              className="btn for-you__error-button"
              onClick={unstable_retry}
              type="button"
            >
              Try again
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
