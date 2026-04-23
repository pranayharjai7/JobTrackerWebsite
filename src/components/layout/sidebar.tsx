"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Briefcase, 
  History, 
  BarChart3, 
  RefreshCw, 
  Settings,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut, useSession } from "next-auth/react"
import { useSyncContext } from "@/context/SyncContext"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "Applications", href: "/dashboard/applications" },
  { icon: History, label: "Timeline", href: "/dashboard/timeline" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: RefreshCw, label: "Email Sync", href: "/dashboard/sync" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

const legalItems = [
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { status: syncStatus } = useSyncContext()
  const isSyncing = syncStatus === "syncing"

  return (
    <aside className="w-64 h-screen border-r border-border bg-card/30 flex flex-col sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-primary/20 shadow-lg shadow-primary/10">
            {session?.user?.image ? (
              <img src={session.user.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-primary flex items-center justify-center">
                <span className="font-black text-white text-lg">
                  {session?.user?.name?.[0] || "J"}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight font-outfit">JobTrack</span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] -mt-1">Premium</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_10px_rgba(139,92,246,0.1)]" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "w-4 h-4 transition-colors",
                  isActive ? "text-primary" : "group-hover:text-foreground"
                )} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="mt-8">
          <span className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Resources</span>
          <nav className="mt-4 space-y-1">
            {legalItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-border/50">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full group"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
