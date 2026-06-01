import AppShell from "@/components/AppShell";

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={`book-card book-card--skeleton${
        featured ? " book-card--featured" : " book-card--standard"
      }`}
    >
      <div className="book-skeleton__cover" />
      <div className="book-skeleton__content">
        <div className="book-skeleton__line book-skeleton__line--short" />
        <div className="book-skeleton__line book-skeleton__line--title" />
        <div className="book-skeleton__line" />
        <div className="book-skeleton__line" />
      </div>
    </div>
  );
}

export default function ForYouSkeleton() {
  return (
    <AppShell activeItem="for-you">
      <div className="for-you__header">
        <div>
          <div className="for-you__eyebrow">Selected just for you</div>
          <h1 className="for-you__title">For You</h1>
        </div>
      </div>

      <section className="book-section">
        <h2 className="book-section__title">Selected Book</h2>
        <div className="book-section__list book-section__list--featured">
          <SkeletonCard featured />
        </div>
      </section>

      <section className="book-section">
        <h2 className="book-section__title">Recommended Books</h2>
        <div className="book-section__list book-section__list--standard">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>

      <section className="book-section">
        <h2 className="book-section__title">Suggested Books</h2>
        <div className="book-section__list book-section__list--standard">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
