"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthModalTrigger from "@/components/AuthModalTrigger";
import { auth, db } from "@/lib/firebase";

export type BillingCycle = "monthly" | "yearly";

type SubscriptionState = {
  billingCycle?: BillingCycle;
  subscription?: string;
  subscriptionStatus?: string;
};

type SettingsContentProps = {
  checkoutPlan?: string;
  checkoutSuccess?: boolean;
};

function isBillingCycle(value: string | null): value is BillingCycle {
  return value === "monthly" || value === "yearly";
}

function getSubscriptionLabel(subscription: SubscriptionState | null) {
  if (
    subscription?.subscription !== "premium" ||
    subscription.subscriptionStatus !== "active"
  ) {
    return "Basic";
  }

  return subscription.billingCycle === "yearly"
    ? "Premium Plus Yearly"
    : "Premium Monthly";
}

export default function SettingsContent({
  checkoutPlan,
  checkoutSuccess = false,
}: SettingsContentProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isResolvingAuth, setIsResolvingAuth] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionState | null>(
    null,
  );
  const [isLoadingSubscription, setIsLoadingSubscription] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionError, setSubscriptionError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const processedSuccessRef = useRef("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        setIsLoadingSubscription(true);
      } else {
        setSubscription(null);
        setSubscriptionMessage("");
      }
      setIsResolvingAuth(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const uid = user.uid;
    let isCurrent = true;

    async function loadSubscription() {
      try {
        const snapshot = await getDoc(doc(db, "users", uid));

        if (!isCurrent) {
          return;
        }

        if (processedSuccessRef.current.startsWith(`${uid}:`)) {
          return;
        }

        const data = snapshot.data() as SubscriptionState | undefined;
        setSubscription(data ?? null);
      } catch {
        if (isCurrent) {
          setSubscriptionError("Unable to load subscription details.");
        }
      } finally {
        if (isCurrent) {
          setIsLoadingSubscription(false);
        }
      }
    }

    loadSubscription();

    return () => {
      isCurrent = false;
    };
  }, [user]);

  useEffect(() => {
    const plan = checkoutPlan ?? null;

    if (!checkoutSuccess || !isBillingCycle(plan) || !user) {
      return;
    }

    const processedKey = `${user.uid}:${plan}`;

    if (processedSuccessRef.current === processedKey) {
      return;
    }

    const uid = user.uid;
    const billingCycle: BillingCycle = plan;
    processedSuccessRef.current = processedKey;

    async function activateSubscription() {
      setSubscriptionError("");

      const nextSubscription: SubscriptionState = {
        subscription: "premium",
        billingCycle,
        subscriptionStatus: "active",
      };

      try {
        await setDoc(
          doc(db, "users", uid),
          {
            ...nextSubscription,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );

        setSubscription((current) => ({
          ...(current ?? {}),
          ...nextSubscription,
        }));
        setSubscriptionMessage("Subscription activated");
        router.replace("/settings");
      } catch {
        processedSuccessRef.current = "";
        setSubscriptionError("Unable to activate subscription. Please retry.");
      }
    }

    activateSubscription();
  }, [checkoutPlan, checkoutSuccess, router, user]);

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
            <p>
              {isLoadingSubscription
                ? "Loading..."
                : getSubscriptionLabel(subscription)}
            </p>
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

        {subscriptionMessage ? (
          <p className="settings-page__success" aria-live="polite">
            {subscriptionMessage}
          </p>
        ) : null}

        {subscriptionError ? (
          <p className="settings-page__error" aria-live="polite">
            {subscriptionError}
          </p>
        ) : null}
      </div>
    </section>
  );
}
