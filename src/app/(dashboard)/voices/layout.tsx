import VoicesLayout from "@/features/voices/views/voices-layout";
import { ReactNode } from "react";

export default function VoicesRootLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <VoicesLayout>{children}</VoicesLayout>;
}
