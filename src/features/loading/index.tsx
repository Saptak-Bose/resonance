import Loader from "@/components/loader";

type Props = object;

export default function Loading({}: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader />
    </div>
  );
}
