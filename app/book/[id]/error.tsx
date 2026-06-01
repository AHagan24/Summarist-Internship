"use client";

import { useEffect } from "react";
import AppShell from "@/components/AppShell";

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
    <AppShell>
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
    </AppShell>
  );
}
