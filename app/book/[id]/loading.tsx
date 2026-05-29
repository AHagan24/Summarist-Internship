function SidebarSkeleton() {
  return (
    <aside className="for-you__sidebar">
      <figure className="for-you__logo--mask">
        <img className="for-you__logo" src="/assets/logo.png" alt="Summarist" />
      </figure>
      <div className="for-you__nav-skeleton" />
      <div className="for-you__nav-skeleton" />
      <div className="for-you__nav-skeleton" />
    </aside>
  );
}

export default function Loading() {
  return (
    <main className="for-you-page">
      <div className="for-you__shell">
        <SidebarSkeleton />

        <section className="for-you__content book-detail">
          <div className="book-detail__skeleton-link" />
          <section className="book-detail__hero">
            <div className="book-detail__cover--mask book-detail__skeleton-cover" />
            <div className="book-detail__intro book-detail__skeleton-intro">
              <div className="book-skeleton__line book-skeleton__line--short" />
              <div className="book-skeleton__line book-detail__skeleton-title" />
              <div className="book-skeleton__line" />
              <div className="book-skeleton__line book-skeleton__line--short" />
              <div className="book-detail__skeleton-stats">
                <div className="book-skeleton__line" />
                <div className="book-skeleton__line" />
              </div>
              <div className="book-detail__skeleton-actions">
                <div className="book-skeleton__line" />
                <div className="book-skeleton__line" />
                <div className="book-skeleton__line" />
              </div>
            </div>
          </section>
          <section className="book-detail__section">
            <div className="book-skeleton__line book-detail__skeleton-heading" />
            <div className="book-skeleton__line" />
            <div className="book-skeleton__line" />
            <div className="book-skeleton__line book-skeleton__line--short" />
          </section>
        </section>
      </div>
    </main>
  );
}
