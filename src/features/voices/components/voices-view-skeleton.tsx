import { Skeleton } from "@/components/ui/skeleton";

type Props = object;

const VoicesSectionSkeleton = ({ titleWidth }: { titleWidth: string }) => {
  return (
    <div className="space-y-4">
      <Skeleton className={`h-7 ${titleWidth}`} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Skeleton className="h-24 w-full rounded-xl lg:h-30" />
        <Skeleton className="h-24 w-full rounded-xl lg:h-30" />
      </div>
    </div>
  );
};

export default function VoicesViewSkeleton({}: Props) {
  return (
    <div className="space-y-10">
      <VoicesSectionSkeleton titleWidth="w-34" />
      <VoicesSectionSkeleton titleWidth="w-38" />
    </div>
  );
}
