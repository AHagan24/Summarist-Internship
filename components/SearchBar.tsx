"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Book } from "@/lib/api";
import { searchBooksByAuthorOrTitle } from "@/lib/api";

type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

export default function SearchBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setStatus("loading");
      setIsOpen(true);

      try {
        const books = await searchBooksByAuthorOrTitle(
          trimmedQuery,
          controller.signal,
        );

        setResults(books);
        setStatus(books.length > 0 ? "success" : "empty");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setResults([]);
        setStatus("error");
      }
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  const shouldShowDropdown = isOpen && query.trim().length > 0;

  return (
    <div className="search-bar" ref={wrapperRef}>
      <div className="search-bar__input-wrap">
        <span className="search-bar__icon" aria-hidden="true">
          Search
        </span>
        <input
          id="global-search"
          className="search-bar__input"
          type="search"
          value={query}
          onChange={(event) => {
            const nextQuery = event.target.value;

            setQuery(nextQuery);
            setIsOpen(nextQuery.trim().length > 0);

            if (!nextQuery.trim()) {
              setResults([]);
              setStatus("idle");
            }
          }}
          onFocus={() => setIsOpen(query.trim().length > 0)}
          placeholder="Search books or authors"
          autoComplete="off"
        />
      </div>

      {shouldShowDropdown ? (
        <div className="search-bar__dropdown">
          {status === "loading" ? (
            <div className="search-bar__state">Searching...</div>
          ) : null}

          {status === "empty" ? (
            <div className="search-bar__state">No books found.</div>
          ) : null}

          {status === "error" ? (
            <div className="search-bar__state">
              Search is unavailable right now.
            </div>
          ) : null}

          {status === "success" ? (
            <ul className="search-bar__results" aria-label="Search results">
              {results.map((book) => (
                <li key={book.id}>
                  <Link
                    className="search-bar__result"
                    href={`/book/${book.id}`}
                    onClick={() => {
                      setIsOpen(false);
                      setQuery("");
                      setResults([]);
                      setStatus("idle");
                    }}
                  >
                    {book.imageLink ? (
                      <img
                        className="search-bar__result-cover"
                        src={book.imageLink}
                        alt=""
                      />
                    ) : null}
                    <span className="search-bar__result-copy">
                      <strong>{book.title}</strong>
                      <span>{book.author}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
