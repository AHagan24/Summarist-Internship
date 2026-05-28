import BookSection from "@/components/BookSection";
import { getBooksByStatus } from "@/lib/api";

export default async function ForYouPage() {
  const [selectedBooks, recommendedBooks, suggestedBooks] = await Promise.all([
    getBooksByStatus("selected"),
    getBooksByStatus("recommended"),
    getBooksByStatus("suggested"),
  ]);

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
          <nav className="for-you__nav" aria-label="For you navigation">
            <span className="for-you__nav-item for-you__nav-item--active">
              For You
            </span>
            <span className="for-you__nav-item">My Library</span>
            <span className="for-you__nav-item">Highlights</span>
          </nav>
        </aside>

        <section className="for-you__content">
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
          <BookSection
            books={suggestedBooks.slice(0, 4)}
            title="Suggested Books"
          />
        </section>
      </div>
    </main>
  );
}
