import { Badge } from "../ui/badge";
import { Spinner } from "../ui/spinner";

type Props = object;

export default function Loader({}: Props) {
  return (
    <Badge
      variant={"outline"}
      className="gap-2 bg-background/90 px-3 py-1.5 text-sm text-foreground shadow-sm"
    >
      <Spinner className="size-5" />
      <span>Loading...</span>
    </Badge>
  );
}
