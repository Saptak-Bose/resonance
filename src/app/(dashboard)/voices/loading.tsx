import VoicesViewSkeleton from "@/features/voices/components/voices-view-skeleton";

type Props = object;

export default function LoadingPage({}: Props) {
  return (
    <div className="flex-1 space-y-10 overflow-y-auto p-3 lg:p-6">
      <VoicesViewSkeleton />
    </div>
  );
}
