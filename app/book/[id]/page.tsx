import Link from "next/link";
import AppShell from "@/components/AppShell";
import LibraryAction from "@/components/LibraryAction";
import { getBookById } from "@/lib/api";

function formatRating(value: number | undefined) {
  return typeof value === "number" ? value.toFixed(1) : "N/A";
}

export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  const tags = Array.isArray(book.tags) ? book.tags : [];
  const actionHref = book.subscriptionRequired
    ? "/choose-plan"
    : `/player/${book.id}`;

  return (
    <AppShell contentClassName="book-detail">
      <div className="book-detail__back">
        <Link href="/for-you">Back to For You</Link>
      </div>

      <section className="book-detail__hero">
        <figure className="book-detail__cover--mask">
          <img
            className="book-detail__cover"
            src={book.imageLink}
            alt={book.title}
          />
        </figure>

        <div className="book-detail__intro">
          <div className="book-detail__topline">
            <span>{book.type}</span>
            {book.subscriptionRequired ? <span>Premium</span> : null}
          </div>
          <h1 className="book-detail__title">{book.title}</h1>
          <p className="book-detail__subtitle">{book.subTitle}</p>
          <p className="book-detail__author">By {book.author}</p>

          <div className="book-detail__stats" aria-label="Book stats">
            <div>
              <strong>{formatRating(book.averageRating)}</strong>
              <span>
                {book.totalRating
                  ? `Average rating - ${book.totalRating.toLocaleString()} ratings`
                  : "Average rating"}
              </span>
            </div>
            <div>
              <strong>{book.keyIdeas}</strong>
              <span>Key ideas</span>
            </div>
          </div>

          {tags.length > 0 ? (
            <ul className="book-detail__tags" aria-label="Book tags">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}

          <div className="book-detail__actions">
            <Link className="btn book-detail__action" href={actionHref}>
              Read
            </Link>
            <Link
              className="book-detail__action book-detail__action--secondary"
              href={actionHref}
            >
              Listen
            </Link>
            <LibraryAction
              book={{
                id: book.id,
                title: book.title,
                author: book.author,
                imageLink: book.imageLink,
                subTitle: book.subTitle,
                averageRating: book.averageRating,
                totalRating: book.totalRating,
                subscriptionRequired: book.subscriptionRequired,
              }}
            />
          </div>
        </div>
      </section>

      <section className="book-detail__section">
        <h2>What&apos;s it about?</h2>
        <p>{book.bookDescription}</p>
      </section>

      <section className="book-detail__section">
        <h2>About the author</h2>
        <p>{book.authorDescription}</p>
      </section>
    </AppShell>
  );
}
