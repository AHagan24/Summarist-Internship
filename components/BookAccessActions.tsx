"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useAuthModal } from "@/components/AuthModalProvider";
import { auth, db } from "@/lib/firebase";
import {
  hasPremiumAccess,
  type UserSubscription,
} from "@/lib/subscription";

type BookAccessActionsProps = {
  bookId: string;
  subscriptionRequired: boolean;
};

export default function BookAccessActions({
  bookId,
  subscriptionRequired,
}: BookAccessActionsProps) {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<UserSubscription | null>(
    null,
  );
  const [isResolvingAuth, setIsResolvingAuth] = useState(true);
  const [isResolvingSubscription, setIsResolvingSubscription] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;
    let activeCheck = 0;

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      const checkId = ++activeCheck;

      setUser(nextUser);
      setIsResolvingAuth(false);
      setError("");

      if (!nextUser || !subscriptionRequired) {
        setSubscription(null);
        setIsResolvingSubscription(false);
        return;
      }

      setIsResolvingSubscription(true);

      getDoc(doc(db, "users", nextUser.uid))
        .then((snapshot) => {
          if (!isCurrent || checkId !== activeCheck) {
            return;
          }

          setSubscription((snapshot.data() as UserSubscription) ?? null);
        })
        .catch(() => {
          if (isCurrent && checkId === activeCheck) {
            setSubscription(null);
            setError("Unable to verify your subscription. Please try again.");
          }
        })
        .finally(() => {
          if (isCurrent && checkId === activeCheck) {
            setIsResolvingSubscription(false);
          }
        });
    });

    return () => {
      isCurrent = false;
      unsubscribe();
    };
  }, [subscriptionRequired]);

  function handleAccessClick() {
    if (isResolvingAuth || isResolvingSubscription) {
      return;
    }

    if (!user) {
      openAuthModal();
      return;
    }

    if (!subscriptionRequired || hasPremiumAccess(subscription)) {
      router.push(`/player/${bookId}`);
      return;
    }

    if (error) {
      return;
    }

    router.push("/choose-plan");
  }

  const isResolving = isResolvingAuth || isResolvingSubscription;
  const primaryLabel = isResolving ? "Checking access..." : "Read";
  const secondaryLabel = isResolving ? "Checking access..." : "Listen";

  return (
    <>
      <button
        className="btn book-detail__action"
        disabled={isResolving}
        onClick={handleAccessClick}
        type="button"
      >
        {primaryLabel}
      </button>
      <button
        className="book-detail__action book-detail__action--secondary"
        disabled={isResolving}
        onClick={handleAccessClick}
        type="button"
      >
        {secondaryLabel}
      </button>
      {error ? (
        <p
          className="book-detail__access-feedback book-detail__access-feedback--error"
          aria-live="polite"
        >
          {error}
        </p>
      ) : null}
    </>
  );
}
