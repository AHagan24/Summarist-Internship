"use client";

import { useEffect } from "react";

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
      <div className="for-you__error">
        <figure className="for-you__error-logo--mask">
          <img
            className="for-you__logo"
            src="/assets/logo.png"
            alt="Summarist"
          />
        </figure>
        <h1 className="for-you__error-title">Unable to load books</h1>
        <p className="for-you__error-copy">
          Something went wrong while loading your recommendations.
        </p>
        <button
          className="btn for-you__error-button"
          onClick={unstable_retry}
          type="button"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
