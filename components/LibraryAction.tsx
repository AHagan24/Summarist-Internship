"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useAuthModal } from "@/components/AuthModalProvider";
import { auth } from "@/lib/firebase";
import {
  isBookInLibrary,
  saveBookToLibrary,
  type LibraryBook,
} from "@/lib/library";

type LibraryActionProps = {
  book: LibraryBook;
};

export default function LibraryAction({ book }: LibraryActionProps) {
  const { openAuthModal } = useAuthModal();
  const [user, setUser] = useState<User | null>(null);
  const [isResolvingAuth, setIsResolvingAuth] = useState(true);
  const [isCheckingSavedState, setIsCheckingSavedState] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"added" | "exists" | null>(
    null,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    let activeCheck = 0;

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      const checkId = ++activeCheck;

      setUser(nextUser);
      setIsResolvingAuth(false);
      setSaveStatus(null);
      setError("");

      if (!nextUser) {
        setIsCheckingSavedState(false);
        return;
      }

      setIsCheckingSavedState(true);

      isBookInLibrary(nextUser.uid, book.id)
        .then((isSaved) => {
          if (isCurrent && checkId === activeCheck && isSaved) {
            setSaveStatus("added");
          }
        })
        .catch(() => {
          if (isCurrent && checkId === activeCheck) {
            setError("Unable to check your library. Please try again.");
          }
        })
        .finally(() => {
          if (isCurrent && checkId === activeCheck) {
            setIsCheckingSavedState(false);
          }
        });
    });

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, [book.id]);

  async function handleClick() {
    if (isResolvingAuth || isCheckingSavedState || saveStatus) {
      return;
    }

    setSaveStatus(null);
    setError("");

    if (!user) {
      openAuthModal();
      return;
    }

    setIsSaving(true);

    try {
      const result = await saveBookToLibrary(user.uid, book);
      setSaveStatus(result);
    } catch {
      setError("Unable to save this book. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  const buttonLabel = isResolvingAuth
    ? "Checking account..."
    : isCheckingSavedState
      ? "Checking Library..."
    : isSaving
      ? "Adding..."
      : saveStatus === "added"
        ? "Added to Library"
        : saveStatus === "exists"
          ? "Already in Library"
          : "Add title to My Library";

  return (
    <div className="book-detail__library-wrap">
      <button
        className="book-detail__library"
        disabled={
          isResolvingAuth || isCheckingSavedState || isSaving || !!saveStatus
        }
        onClick={handleClick}
        type="button"
      >
        {buttonLabel}
      </button>
      <p
        className={`book-detail__library-feedback${
          error ? " book-detail__library-feedback--error" : ""
        }`}
        aria-live="polite"
      >
        {error}
      </p>
    </div>
  );
}
