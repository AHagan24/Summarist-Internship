import AppShell from "@/components/AppShell";

export default function SettingsPage() {
  return (
    <AppShell activeItem="settings">
      <section className="settings-page">
        <p className="for-you__eyebrow">Account</p>
        <h1 className="for-you__title">Settings</h1>
        <div className="settings-page__panel">
          <h2>Profile</h2>
          <p>Account preferences will be available here soon.</p>
        </div>
      </section>
    </AppShell>
  );
}
