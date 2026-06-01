"use client";

import { useState } from "react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

type AuthMode = "login" | "register";
type AuthAction = AuthMode | "guest";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const GUEST_EMAIL = "guest@gmail.com";
const GUEST_PASSWORD = "guest123";

function getAuthErrorMessage(error: unknown, action: AuthAction) {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/wrong-password":
        return "The password you entered is incorrect.";
      case "auth/user-not-found":
        return action === "guest"
          ? "Guest account is not available right now."
          : "No account was found with that email.";
      case "auth/email-already-in-use":
        return "An account with that email already exists.";
      case "auth/invalid-credential":
        return action === "guest"
          ? "Guest account is not available right now."
          : "Email or password is incorrect.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  return "Something went wrong. Please try again.";
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState<AuthAction | null>(null);

  if (!isOpen) {
    return null;
  }

  const isLogin = mode === "login";
  const isLoading = loadingAction !== null;

  function handleSuccess() {
    onClose();
    router.push("/for-you");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const action = mode;

    setError("");
    setLoadingAction(action);

    try {
      if (action === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }

      handleSuccess();
    } catch (authError) {
      setError(getAuthErrorMessage(authError, action));
    } finally {
      setLoadingAction(null);
    }
  }

  async function handleGuestLogin() {
    setError("");
    setLoadingAction("guest");

    try {
      await signInWithEmailAndPassword(auth, GUEST_EMAIL, GUEST_PASSWORD);
      handleSuccess();
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "guest"));
    } finally {
      setLoadingAction(null);
    }
  }

  return (
    <div className="auth-modal__layer">
      <button
        aria-label="Close authentication modal"
        className="auth-modal__backdrop"
        disabled={isLoading}
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
          disabled={isLoading}
          onClick={onClose}
          type="button"
        >
          X
        </button>

        <div className="auth-modal__header">
          <button
            className={`auth-modal__tab${isLogin ? " auth-modal__tab--active" : ""}`}
            disabled={isLoading}
            onClick={() => {
              setError("");
              setMode("login");
            }}
            type="button"
          >
            Login
          </button>
          <button
            className={`auth-modal__tab${!isLogin ? " auth-modal__tab--active" : ""}`}
            disabled={isLoading}
            onClick={() => {
              setError("");
              setMode("register");
            }}
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
          onSubmit={handleSubmit}
        >
          <label className="auth-modal__label" htmlFor="auth-email">
            Email
          </label>
          <input
            className="auth-modal__input"
            id="auth-email"
            name="email"
            placeholder="Email Address"
            disabled={isLoading}
            required
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
            disabled={isLoading}
            required
            type="password"
          />

          <p aria-live="polite" className="auth-modal__error">
            {error || " "}
          </p>

          <button
            className="btn auth-modal__submit"
            disabled={isLoading}
            type="submit"
          >
            {loadingAction === "login"
              ? "Signing in..."
              : loadingAction === "register"
                ? "Creating account..."
                : isLogin
                  ? "Login"
                  : "Register"}
          </button>

          <button
            className="auth-modal__guest"
            disabled={isLoading}
            onClick={handleGuestLogin}
            type="button"
          >
            {loadingAction === "guest" ? "Signing in..." : "Login as a Guest"}
          </button>
        </form>
      </div>
    </div>
  );
}
