import { Sidebar } from "@/components/layout/sidebar"
import { SyncProvider } from "@/context/SyncContext"
import { SyncToast } from "@/components/dashboard/SyncToast"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SyncProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-8 py-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      {/* Global sync toast — visible on every dashboard sub-page */}
      <SyncToast />
    </SyncProvider>
  )
}
