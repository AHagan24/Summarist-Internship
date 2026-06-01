import AppShell from "@/components/AppShell";

export default function Loading() {
  return (
    <AppShell contentClassName="book-detail">
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
    </AppShell>
  );
}
