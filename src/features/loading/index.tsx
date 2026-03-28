import Loader from "@/components/loader";

type Props = object;

export default function Loading({}: Props) {
  return (
    <div className="flex min-h-[80vh] items-center justify-center">
      <Loader />
    </div>
  );
}
