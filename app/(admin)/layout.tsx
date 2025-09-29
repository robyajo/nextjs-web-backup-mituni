import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import "./_components/admin.css";
import { AppSidebar } from "./_components/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
