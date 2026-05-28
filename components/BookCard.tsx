import Link from "next/link";
import type { Book } from "@/lib/api";

type BookCardProps = {
  book: Book;
  variant?: "standard" | "featured";
};

export default function BookCard({ book, variant = "standard" }: BookCardProps) {
  return (
    <Link
      className={`book-card book-card--${variant}`}
      href={`/book/${book.id}`}
    >
      <figure className="book-card__image--mask">
        <img
          className="book-card__image"
          src={book.imageLink}
          alt={book.title}
        />
      </figure>

      <div className="book-card__content">
        <div className="book-card__topline">
          <span className="book-card__type">{book.type}</span>
          {book.subscriptionRequired ? (
            <span className="book-card__premium">Premium</span>
          ) : null}
        </div>

        <h3 className="book-card__title">{book.title}</h3>
        <p className="book-card__author">{book.author}</p>
        <p className="book-card__subtitle">{book.subTitle}</p>

        <div className="book-card__details">
          <span>{book.averageRating.toFixed(1)} rating</span>
          <span>{book.keyIdeas} key ideas</span>
        </div>
      </div>
    </Link>
  );
}
