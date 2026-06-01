import AppShell from "@/components/AppShell";
import BookSection from "@/components/BookSection";
import { getBooksByStatus } from "@/lib/api";

export default async function ForYouPage() {
  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    getBooksByStatus("selected"),
    getBooksByStatus("recommended"),
    getBooksByStatus("suggested"),
  ]);

  return (
    <AppShell activeItem="for-you">
      <header className="for-you__header">
        <div>
          <p className="for-you__eyebrow">Selected just for you</p>
          <h1 className="for-you__title">For You</h1>
        </div>
      </header>

      <BookSection
        books={selectedBooks.slice(0, 1)}
        title="Selected Book"
        variant="featured"
      />
      <BookSection
        books={recommendedBooks.slice(0, 4)}
        title="Recommended Books"
      />
      <BookSection books={suggestedBooks.slice(0, 4)} title="Suggested Books" />
    </AppShell>
  );
}
