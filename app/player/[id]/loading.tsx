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

        <section className="for-you__content player-page">
          <div className="book-detail__skeleton-link" />
          <section className="player-page__header">
            <div className="player-page__cover--mask book-detail__skeleton-cover" />
            <div className="player-page__intro player-page__skeleton-intro">
              <div className="book-skeleton__line book-skeleton__line--short" />
              <div className="book-skeleton__line player-page__skeleton-title" />
              <div className="book-skeleton__line book-skeleton__line--short" />
              <div className="player-page__skeleton-player">
                <div className="book-skeleton__line" />
                <div className="book-skeleton__line" />
              </div>
            </div>
          </section>
          <section className="player-page__summary">
            <div className="book-skeleton__line book-detail__skeleton-heading" />
            <div className="book-skeleton__line" />
            <div className="book-skeleton__line" />
            <div className="book-skeleton__line" />
            <div className="book-skeleton__line book-skeleton__line--short" />
          </section>
        </section>
      </div>
    </main>
  );
}
