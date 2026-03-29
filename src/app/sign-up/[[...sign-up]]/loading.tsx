import { Skeleton } from "@/components/ui/skeleton";

type Props = object;

export default function LoadingPage({}: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6 shadow-lg">
        <Skeleton className="h-8 w-28" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-9 w-full" />
        <Skeleton className="mx-auto h-4 w-44" />
      </div>
    </div>
  );
}
