export type UserSubscription = {
  subscription?: string;
  subscriptionStatus?: string;
};

export function hasPremiumAccess(
  subscription: UserSubscription | null | undefined,
) {
  return (
    subscription?.subscription === "premium" &&
    subscription.subscriptionStatus === "active"
  );
}
