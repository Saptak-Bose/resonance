import PageHeader from "@/components/global/page-header";
import HeroPattern from "../components/hero-pattern";
import DashboardHeader from "../components/dashboard-header";
import TextInputPanel from "../components/text-input-panel";
import QuickActionsPanel from "../components/quick-actions-panel";

type Props = object;

export default function DashboardView({}: Props) {
  return (
    <div className="relative">
      <PageHeader title="Dashboard" className="lg:hidden" />
      <HeroPattern />
      <div className="relative space-y-8 p-4 lg:p-16">
        <DashboardHeader />
        <TextInputPanel />
        <QuickActionsPanel />
      </div>
    </div>
  );
}
