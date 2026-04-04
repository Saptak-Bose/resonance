import { Skeleton } from "@/components/ui/skeleton";

type Props = object;

export default function LoadingPage({}: Props) {
  return (
    <div className="relative">
      <div className="relative space-y-8 p-4 lg:p-16">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-52" />
          </div>
          <div className="hidden items-center gap-3 lg:flex">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>

        <div className="rounded-[22px] border bg-card p-4">
          <Skeleton className="h-35 w-full" />
          <div className="mt-4 flex items-center justify-between">
            <Skeleton className="h-6 w-48 rounded-full" />
            <Skeleton className="h-4 w-36" />
          </div>
          <div className="mt-4 flex justify-end">
            <Skeleton className="h-9 w-full lg:w-36" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-7 w-36" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
