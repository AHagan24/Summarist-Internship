import Link from "next/link";
import AudioPlayer from "@/components/AudioPlayer";
import { getBookById } from "@/lib/api";

function Sidebar() {
  return (
    <aside className="for-you__sidebar">
      <figure className="for-you__logo--mask">
        <img className="for-you__logo" src="/assets/logo.png" alt="Summarist" />
      </figure>
      <nav className="for-you__nav" aria-label="Player navigation">
        <Link className="for-you__nav-item" href="/for-you">
          For You
        </Link>
        <span className="for-you__nav-item">My Library</span>
        <span className="for-you__nav-item">Highlights</span>
      </nav>
    </aside>
  );
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <main className="for-you-page">
      <div className="for-you__shell">
        <Sidebar />

        <section className="for-you__content player-page">
          <div className="book-detail__back">
            <Link href={`/book/${book.id}`}>Back to book details</Link>
          </div>

          <section className="player-page__header">
            {book.imageLink ? (
              <figure className="player-page__cover--mask">
                <img
                  className="player-page__cover"
                  src={book.imageLink}
                  alt={book.title}
                />
              </figure>
            ) : null}

            <div className="player-page__intro">
              <p className="for-you__eyebrow">Now playing</p>
              <h1 className="player-page__title">{book.title}</h1>
              <p className="player-page__author">By {book.author}</p>
              <AudioPlayer audioLink={book.audioLink} bookId={book.id} />
            </div>
          </section>

          <section className="player-page__summary">
            <h2>Summary</h2>
            <p>{book.summary}</p>
          </section>
        </section>
      </div>
    </main>
  );
}
