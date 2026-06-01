"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import AuthModalTrigger from "@/components/AuthModalTrigger";
import { auth } from "@/lib/firebase";

export default function SettingsContent() {
  const [user, setUser] = useState<User | null>(null);
  const [isResolvingAuth, setIsResolvingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsResolvingAuth(false);
    });

    return unsubscribe;
  }, []);

  async function handleLogout() {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await signOut(auth);
    } catch {
      setLogoutError("Unable to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isResolvingAuth) {
    return (
      <section className="settings-page">
        <p className="for-you__eyebrow">Account</p>
        <h1 className="for-you__title">Settings</h1>
        <div className="settings-page__panel settings-page__panel--skeleton">
          <div className="book-skeleton__line settings-page__skeleton-title" />
          <div className="book-skeleton__line" />
          <div className="book-skeleton__line book-skeleton__line--short" />
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="settings-page settings-page--logged-out">
        <header className="settings-page__logged-out-header">
          <h1 className="for-you__title">Settings</h1>
        </header>

        <div className="settings-page__logged-out-card">
          <figure className="settings-page__illustration">
            <img
              className="settings-page__illustration-img"
              src="/assets/login-transparent.png"
              alt=""
            />
          </figure>
          <p>Log in to your account to see your details.</p>
          <AuthModalTrigger className="btn settings-page__login-button">
            Login
          </AuthModalTrigger>
        </div>
      </section>
    );
  }

  return (
    <section className="settings-page">
      <p className="for-you__eyebrow">Account</p>
      <h1 className="for-you__title">Settings</h1>

      <div className="settings-page__panel">
        <div className="settings-page__row">
          <div>
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="settings-page__row">
          <div>
            <h2>Subscription</h2>
            <p>Basic</p>
          </div>
          <Link
            className="btn settings-page__action settings-page__action--primary"
            href="/choose-plan"
          >
            Upgrade
          </Link>
        </div>

        <div className="settings-page__actions">
          <button
            className="settings-page__action settings-page__action--secondary"
            disabled={isLoggingOut}
            onClick={handleLogout}
            type="button"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

        {logoutError ? (
          <p className="settings-page__error" aria-live="polite">
            {logoutError}
          </p>
        ) : null}
      </div>
    </section>
  );
}
