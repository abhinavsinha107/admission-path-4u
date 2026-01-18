import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <AdminSidebar className="h-full" />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        <div className="h-full p-8 pt-6">{children}</div>
      </main>
    </div>
  );
}
