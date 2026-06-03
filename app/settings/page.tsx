import AppShell from "@/components/AppShell";
import SettingsContent from "@/components/SettingsContent";

type SettingsPageProps = {
  searchParams: Promise<{
    plan?: string | string[];
    success?: string | string[];
  }>;
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const params = await searchParams;
  const success = getParam(params.success) === "true";
  const plan = getParam(params.plan);

  return (
    <AppShell activeItem="settings">
      <SettingsContent checkoutPlan={plan} checkoutSuccess={success} />
    </AppShell>
  );
}
