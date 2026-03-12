import { quickActions } from "@/lib/constants";
import QuickActionCard from "./quick-action-card";

type Props = object;

export default function QuickActionsPanel({}: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map(({ description, gradient, href, title }) => (
          <QuickActionCard
            key={title}
            description={description}
            gradient={gradient}
            href={href}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}
