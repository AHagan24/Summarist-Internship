import type { Book } from "@/lib/api";
import BookCard from "./BookCard";

type BookSectionProps = {
  books: Book[];
  title: string;
  variant?: "standard" | "featured";
};

export default function BookSection({
  books,
  title,
  variant = "standard",
}: BookSectionProps) {
  return (
    <section className="book-section">
      <div className="book-section__header">
        <h2 className="book-section__title">{title}</h2>
      </div>

      {books.length > 0 ? (
        <div className={`book-section__list book-section__list--${variant}`}>
          {books.map((book) => (
            <BookCard book={book} key={book.id} variant={variant} />
          ))}
        </div>
      ) : (
        <div className="book-section__empty">No books available right now.</div>
      )}
    </section>
  );
}
