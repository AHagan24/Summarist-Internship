"use client";

import Link from "next/link";
import SearchBar from "@/components/SearchBar";

type AppShellProps = {
  activeItem?: "for-you" | "settings";
  children: React.ReactNode;
  contentClassName?: string;
  showSearch?: boolean;
};

function navItemClassName(isActive: boolean) {
  return `for-you__nav-item${isActive ? " for-you__nav-item--active" : ""}`;
}

export default function AppShell({
  activeItem,
  children,
  contentClassName = "",
  showSearch = true,
}: AppShellProps) {
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
            <Link
              className={navItemClassName(activeItem === "for-you")}
              href="/for-you"
            >
              For You
            </Link>
            <span className="for-you__nav-item">My Library</span>
            <span className="for-you__nav-item">Highlights</span>
            <Link
              className={navItemClassName(activeItem === "settings")}
              href="/settings"
            >
              Settings
            </Link>
          </nav>
        </aside>

        <section
          className={`for-you__content${contentClassName ? ` ${contentClassName}` : ""}`}
        >
          {showSearch ? (
            <div className="app-shell__search-area">
              <SearchBar />
            </div>
          ) : null}
          {children}
        </section>
      </div>
    </main>
  );
}
