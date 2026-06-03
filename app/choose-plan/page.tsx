"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { onAuthStateChanged, type User } from "firebase/auth";
import {
  ArrowLeft,
  ChevronDown,
  Clock,
  Headphones,
  Library,
} from "lucide-react";
import {
  AuthModalProvider,
  useAuthModal,
} from "@/components/AuthModalProvider";
import { auth } from "@/lib/firebase";

type PlanId = "monthly" | "yearly";

const faqs = [
  {
    question: "Can I use Summarist before choosing a plan?",
    answer:
      "Yes. You can keep exploring free content while premium checkout is being prepared.",
  },
  {
    question: "Does the yearly plan include a free trial?",
    answer:
      "Yes. The yearly plan includes a 7-day free trial before the annual subscription begins.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Yes you can switch between monthly and yearly plans at any time from your account settings.",
  },
  {
    question: "Is Stripe checkout active right now?",
    answer:
      "Yes. You can proceed to checkout and complete the purchase to start your subscription. If you encounter any issues, please contact our support team.",
  },
];

const planCards = [
  {
    id: "monthly" as const,
    label: "Monthly",
    price: "$9.99",
    cadence: "/month",
    summary: "Flexible access for readers building a new habit.",
    note: "Monthly membership",
  },
  {
    id: "yearly" as const,
    label: "Yearly",
    price: "$99.99",
    cadence: "/year",
    summary: "Best value for steady growth, with a 7-day free trial.",
    note: "7-day free trial included",
  },
];

const footerGroups = [
  {
    title: "Actions",
    links: ["Summarist Magazine", "Cancel Subscription", "Help", "Contact us"],
  },
  {
    title: "Useful Links",
    links: [
      "Pricing",
      "Summarist Business",
      "Gift Cards",
      "Authors & Publishers",
    ],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  {
    title: "Other",
    links: ["Sitemap", "Legal Notice", "Terms of Service", "Privacy Policies"],
  },
];

export default function ChoosePlanPage() {
  return (
    <AuthModalProvider>
      <ChoosePlanContent />
    </AuthModalProvider>
  );
}

function ChoosePlanContent() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("yearly");
  const [openFaq, setOpenFaq] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const { openAuthModal } = useAuthModal();
  const ctaText =
    selectedPlan === "yearly"
      ? "Start your free 7-day trial"
      : "Start your first month";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
    });

    return unsubscribe;
  }, []);

  function handlePlanKeyDown(event: KeyboardEvent, planId: PlanId) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedPlan(planId);
    }
  }

  async function handleCheckoutClick() {
    const currentUser = user ?? auth.currentUser;

    if (!currentUser) {
      openAuthModal();
      return;
    }

    setIsCreatingCheckout(true);
    setCheckoutError("");

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: selectedPlan,
          customerEmail: currentUser.email,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        url?: unknown;
        error?: unknown;
      };

      if (!response.ok || typeof data.url !== "string") {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Unable to start Stripe checkout.",
        );
      }

      window.location.assign(data.url);
    } catch (error) {
      setCheckoutError(
        error instanceof Error
          ? error.message
          : "Unable to start Stripe checkout.",
      );
      setIsCreatingCheckout(false);
    }
  }

  return (
    <>
      <main className="choose-plan">
        <nav className="choose-plan__nav" aria-label="Choose plan navigation">
          <Link className="choose-plan__logo-link" href="/">
            <Image
              className="choose-plan__logo"
              src="/assets/logo.png"
              alt="Summarist"
              width={200}
              height={47}
              priority
            />
          </Link>
          <Link className="choose-plan__back" href="/for-you">
            <ArrowLeft aria-hidden="true" />
            Back to library
          </Link>
        </nav>

        <section className="choose-plan__hero">
          <div className="choose-plan__hero-copy">
            <p className="choose-plan__eyebrow">Choose your plan</p>
            <h1 className="choose-plan__title">
              Unlock more knowledge in less time
            </h1>
            <p className="choose-plan__subtitle">
              Get unlimited access to concise book summaries, audio insights,
              and recommendations built around the way you read.
            </p>

            <div className="choose-plan__quick-list" aria-label="Plan benefits">
              <span>
                <Clock aria-hidden="true" />
                15-minute reads
              </span>
              <span>
                <Headphones aria-hidden="true" />
                Audio included
              </span>
              <span>
                <Library aria-hidden="true" />
                Build your library
              </span>
            </div>
          </div>

          <figure className="choose-plan__image-wrap">
            <Image
              className="choose-plan__image"
              src="/assets/pricing-top-transparent.png"
              alt="Summarist premium preview"
              width={858}
              height={722}
              priority
            />
          </figure>
        </section>

        <section className="choose-plan__plans" aria-labelledby="plans-title">
          <div className="choose-plan__section-header">
            <div>
              <p className="choose-plan__eyebrow">Premium access</p>
              <h2 id="plans-title">Pick the rhythm that fits your reading</h2>
            </div>
          </div>

          <div
            className="choose-plan__card-grid"
            role="radiogroup"
            aria-label="Plan selection"
          >
            {planCards.map((plan, index) => (
              <div className="choose-plan__option-wrap" key={plan.id}>
                {index > 0 ? (
                  <div className="choose-plan__or-divider" aria-hidden="true">
                    <span />
                    <strong>or</strong>
                    <span />
                  </div>
                ) : null}

                <article
                  className={`choose-plan__card${
                    selectedPlan === plan.id
                      ? " choose-plan__card--selected"
                      : ""
                  }`}
                  role="radio"
                  aria-checked={selectedPlan === plan.id}
                  tabIndex={0}
                  onClick={() => setSelectedPlan(plan.id)}
                  onKeyDown={(event) => handlePlanKeyDown(event, plan.id)}
                >
                  <span className="choose-plan__radio" aria-hidden="true">
                    <span />
                  </span>

                  <div className="choose-plan__card-copy">
                    <div className="choose-plan__card-top">
                      <span className="choose-plan__plan-label">
                        {plan.label}
                      </span>
                      <span className="choose-plan__plan-note">
                        {plan.note}
                      </span>
                    </div>
                    <div className="choose-plan__price">
                      <strong>{plan.price}</strong>
                      <span>{plan.cadence}</span>
                    </div>
                    <p>{plan.summary}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          <div className="choose-plan__cta-area">
            <button
              className="choose-plan__cta"
              disabled={isCreatingCheckout}
              onClick={handleCheckoutClick}
              type="button"
            >
              {isCreatingCheckout ? "Preparing checkout..." : ctaText}
            </button>
            <span className="choose-plan__checkout-note">
              Secure checkout powered by Stripe
            </span>
            {checkoutError ? (
              <p className="choose-plan__checkout-error">{checkoutError}</p>
            ) : null}
          </div>
        </section>

        <section className="choose-plan__faq" aria-labelledby="faq-title">
          <h2 id="faq-title">FAQ</h2>
          <div className="choose-plan__faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const panelId = `choose-plan-faq-${index}`;

              return (
                <div className="choose-plan__faq-item" key={faq.question}>
                  <button
                    className="choose-plan__faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown aria-hidden="true" />
                  </button>
                  <div
                    className={`choose-plan__faq-answer${
                      isOpen ? " choose-plan__faq-answer--open" : ""
                    }`}
                    id={panelId}
                    aria-hidden={!isOpen}
                  >
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="footer__top--wrapper">
              {footerGroups.map((group) => (
                <div className="footer__block" key={group.title}>
                  <h3 className="footer__link--title">{group.title}</h3>
                  <div>
                    {group.links.map((link) => (
                      <div className="footer__link--wrapper" key={link}>
                        <span className="footer__link">{link}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">
                Copyright &copy; 2026 Summarist.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
