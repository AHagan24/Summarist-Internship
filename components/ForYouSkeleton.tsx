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
          <div className="for-you__nav-skeleton" />
          <div className="for-you__nav-skeleton" />
        </aside>

        <section className="for-you__content">
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
        </section>
      </div>
    </main>
  );
}
