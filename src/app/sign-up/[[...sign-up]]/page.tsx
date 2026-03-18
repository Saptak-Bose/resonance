import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";

type Props = object;

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignUpPage({}: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
        }}
      />
    </div>
  );
}
