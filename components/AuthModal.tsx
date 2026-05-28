"use client";

import { useState } from "react";

type AuthMode = "login" | "register";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login");

  if (!isOpen) {
    return null;
  }

  const isLogin = mode === "login";

  return (
    <div className="auth-modal__layer">
      <button
        aria-label="Close authentication modal"
        className="auth-modal__backdrop"
        onClick={onClose}
        type="button"
      />
      <div
        aria-labelledby="auth-modal-title"
        aria-modal="true"
        className="auth-modal"
        role="dialog"
      >
        <button
          aria-label="Close authentication modal"
          className="auth-modal__close"
          onClick={onClose}
          type="button"
        >
          X
        </button>

        <div className="auth-modal__header">
          <button
            className={`auth-modal__tab${isLogin ? " auth-modal__tab--active" : ""}`}
            onClick={() => setMode("login")}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-modal__tab${!isLogin ? " auth-modal__tab--active" : ""}`}
            onClick={() => setMode("register")}
            type="button"
          >
            Register
          </button>
        </div>

        <h2 className="auth-modal__title" id="auth-modal-title">
          {isLogin ? "Login to your account" : "Create your account"}
        </h2>

        <form
          className="auth-modal__form"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="auth-modal__label" htmlFor="auth-email">
            Email
          </label>
          <input
            className="auth-modal__input"
            id="auth-email"
            name="email"
            placeholder="Email Address"
            type="email"
          />

          <label className="auth-modal__label" htmlFor="auth-password">
            Password
          </label>
          <input
            className="auth-modal__input"
            id="auth-password"
            name="password"
            placeholder="Password"
            type="password"
          />

          <p aria-live="polite" className="auth-modal__error">
            {" "}
          </p>

          <button className="btn auth-modal__submit" type="button">
            {isLogin ? "Login" : "Register"}
          </button>

          <button className="auth-modal__guest" type="button">
            Login as a Guest
          </button>
        </form>
      </div>
    </div>
  );
}
