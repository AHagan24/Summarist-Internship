import Link from "next/link";
import AppShell from "@/components/AppShell";
import AudioPlayer from "@/components/AudioPlayer";
import { getBookById } from "@/lib/api";

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);

  return (
    <AppShell contentClassName="player-page">
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
    </AppShell>
  );
}
