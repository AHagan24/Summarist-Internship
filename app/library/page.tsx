import AppShell from "@/components/AppShell";
import LibraryContent from "@/components/LibraryContent";

export default function LibraryPage() {
  return (
    <AppShell activeItem="library">
      <LibraryContent />
    </AppShell>
  );
}
