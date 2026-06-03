"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CircleHelp,
  Highlighter,
  Home,
  Library,
  LogIn,
  LogOut,
  Search,
  Settings,
} from "lucide-react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import {
  AuthModalProvider,
  useAuthModal,
} from "@/components/AuthModalProvider";
import SearchBar from "@/components/SearchBar";
import { auth } from "@/lib/firebase";

type AppShellProps = {
  activeItem?: "for-you" | "library" | "settings";
  children: ReactNode;
  contentClassName?: string;
  showSearch?: boolean;
};

function navItemClassName(isActive: boolean) {
  return `for-you__nav-item${isActive ? " for-you__nav-item--active" : ""}`;
}

function NavIcon({ children }: { children: ReactNode }) {
  return <span className="for-you__nav-icon">{children}</span>;
}

export default function AppShell({
  activeItem,
  children,
  contentClassName = "",
  showSearch = true,
}: AppShellProps) {
  return (
    <AuthModalProvider>
      <AppShellContent
        activeItem={activeItem}
        contentClassName={contentClassName}
        showSearch={showSearch}
      >
        {children}
      </AppShellContent>
    </AuthModalProvider>
  );
}

function AppShellContent({
  activeItem,
  children,
  contentClassName = "",
  showSearch = true,
}: AppShellProps) {
  const router = useRouter();
  const { openAuthModal } = useAuthModal();
  const [user, setUser] = useState<User | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsSigningOut(false);
    });

    return unsubscribe;
  }, []);

  async function handleAuthMenuClick() {
    if (!user) {
      openAuthModal();
      return;
    }

    setIsSigningOut(true);

    try {
      await signOut(auth);
      setUser(null);
      router.push("/settings");
    } catch {
      setIsSigningOut(false);
    }
  }

  const AuthIcon = user ? LogOut : LogIn;
  const authLabel = user
    ? isSigningOut
      ? "Logging out..."
      : "Logout"
    : "Login";

  return (
    <main className="for-you-page">
      <div className="for-you__shell">
        <aside className="for-you__sidebar">
          <figure className="for-you__logo--mask">
            <img
              className="for-you__logo"
              src="/assets/logo.png"
              alt="Summarist"
            />
          </figure>
          <nav className="for-you__nav" aria-label="App navigation">
            <div className="for-you__nav-section for-you__nav-section--top">
              <Link
                className={navItemClassName(activeItem === "for-you")}
                href="/for-you"
              >
                <NavIcon>
                  <Home aria-hidden="true" />
                </NavIcon>
                For You
              </Link>
              <Link
                className={navItemClassName(activeItem === "library")}
                href="/library"
              >
                <NavIcon>
                  <Library aria-hidden="true" />
                </NavIcon>
                My Library
              </Link>
              <span className="for-you__nav-item">
                <NavIcon>
                  <Highlighter aria-hidden="true" />
                </NavIcon>
                Highlights
              </span>
              <span className="for-you__nav-item">
                <NavIcon>
                  <Search aria-hidden="true" />
                </NavIcon>
                Search
              </span>
            </div>

            <div className="for-you__nav-section for-you__nav-section--bottom">
              <Link
                className={navItemClassName(activeItem === "settings")}
                href="/settings"
              >
                <NavIcon>
                  <Settings aria-hidden="true" />
                </NavIcon>
                Settings
              </Link>
              <span className="for-you__nav-item">
                <NavIcon>
                  <CircleHelp aria-hidden="true" />
                </NavIcon>
                Help & Support
              </span>
              <button
                className="for-you__nav-item for-you__nav-button"
                disabled={isSigningOut}
                onClick={handleAuthMenuClick}
                type="button"
              >
                <NavIcon>
                  <AuthIcon aria-hidden="true" />
                </NavIcon>
                {authLabel}
              </button>
            </div>
          </nav>
        </aside>

        <section className="for-you__content">
          <div
            className={`for-you__content-inner${contentClassName ? ` ${contentClassName}` : ""}`}
          >
            {showSearch ? (
              <div className="app-shell__search-area">
                <SearchBar />
              </div>
            ) : null}
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
