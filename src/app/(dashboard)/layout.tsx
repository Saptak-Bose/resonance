import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/features/dashboard/components/dasboard-sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <SidebarProvider defaultOpen className="h-svh">
      <DashboardSidebar />
      <SidebarInset className="min-h-0 min-w-0">
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
