"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useAuthModal } from "@/components/AuthModalProvider";
import { auth } from "@/lib/firebase";

export default function LibraryAction() {
  const { openAuthModal } = useAuthModal();
  const [user, setUser] = useState<User | null>(null);
  const [isResolvingAuth, setIsResolvingAuth] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsResolvingAuth(false);
    });

    return unsubscribe;
  }, []);

  function handleClick() {
    setMessage("");

    if (isResolvingAuth) {
      return;
    }

    if (!user) {
      openAuthModal();
      return;
    }

    setMessage("Library saving coming soon.");
  }

  return (
    <div className="book-detail__library-wrap">
      <button
        className="book-detail__library"
        disabled={isResolvingAuth}
        onClick={handleClick}
        type="button"
      >
        {isResolvingAuth ? "Checking account..." : "Add to My Library"}
      </button>
      <p className="book-detail__library-feedback" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
