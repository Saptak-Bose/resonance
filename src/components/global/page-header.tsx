import { cn } from "@/lib/utils";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";

type Props = {
  title: string;
  className?: string;
};

export default function PageHeader({ title, className }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b p-4",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"mailto:cunningsap002+resonancesupport@gmail.com"}>
            <ThumbsUp />
            <span className="hidden lg:block">Feedback</span>
          </Link>
        </Button>
        <Button variant={"outline"} size={"sm"} asChild>
          <Link href={"mailto:cunningsap002+resonancesupport@gmail.com"}>
            <Headphones />
            <span className="hidden lg:block">Need Help?</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
