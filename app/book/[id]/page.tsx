import Link from "next/link";
import { AuthModalProvider } from "@/components/AuthModalProvider";
import AuthModalTrigger from "@/components/AuthModalTrigger";
import { getBookById } from "@/lib/api";

function Sidebar() {
  return (
    <aside className="for-you__sidebar">
      <figure className="for-you__logo--mask">
        <img className="for-you__logo" src="/assets/logo.png" alt="Summarist" />
      </figure>
      <nav className="for-you__nav" aria-label="Book navigation">
        <Link className="for-you__nav-item" href="/for-you">
          For You
        </Link>
        <span className="for-you__nav-item">My Library</span>
        <span className="for-you__nav-item">Highlights</span>
      </nav>
    </aside>
  );
}

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
    <AuthModalProvider>
      <main className="for-you-page">
        <div className="for-you__shell">
          <Sidebar />

          <section className="for-you__content book-detail">
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
                  <AuthModalTrigger className="book-detail__library">
                    Add title to My Library
                  </AuthModalTrigger>
                </div>
              </div>
            </section>

            <section className="book-detail__section">
              <h2>What's it about?</h2>
              <p>{book.bookDescription}</p>
            </section>

            <section className="book-detail__section">
              <h2>About the author</h2>
              <p>{book.authorDescription}</p>
            </section>
          </section>
        </div>
      </main>
    </AuthModalProvider>
  );
}
