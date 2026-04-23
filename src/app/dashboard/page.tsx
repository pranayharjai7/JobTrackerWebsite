import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { 
  Briefcase, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  TrendingUp,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const userId = session.user.id

  const stats = [
    { label: "Total Applications", value: await prisma.application.count({ where: { userId } }), icon: Briefcase, color: "text-blue-500" },
    { label: "Interviews", value: await prisma.application.count({ where: { userId, status: "INTERVIEW" } }), icon: MessageSquare, color: "text-purple-500" },
    { label: "Offers", value: await prisma.application.count({ where: { userId, status: "OFFER" } }), icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Rejections", value: await prisma.application.count({ where: { userId, status: "REJECTED" } }), icon: Send, color: "text-rose-500" },
  ]

  const recentApplications = await prisma.application.findMany({
    where: { userId },
    orderBy: { lastUpdate: "desc" },
    take: 5,
  })

  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session.user.name}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your job search.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-border bg-card/50 glass hover:border-primary/50 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-background/50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12%
              </span>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Applications</h2>
            <button className="text-sm text-primary hover:underline">View all</button>
          </div>
          
          <div className="space-y-3">
            {recentApplications.length > 0 ? (
              recentApplications.map((app) => (
                <div key={app.id} className="p-4 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {app.company[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{app.company}</div>
                      <div className="text-sm text-muted-foreground">{app.role}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-medium">{new Date(app.appliedDate).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">Applied</div>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      getStatusStyles(app.status)
                    )}>
                      {app.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-border rounded-2xl text-muted-foreground">
                No applications tracked yet. Connect your Gmail to start.
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity / Timeline */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Latest Activity</h2>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/50">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 relative">
                <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex-shrink-0 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Interview Scheduled</div>
                  <div className="text-xs text-muted-foreground mb-1">Amazon • Technical Round</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    2 hours ago
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "APPLIED": return "bg-blue-500/10 text-blue-500"
    case "IN_REVIEW": return "bg-yellow-500/10 text-yellow-500"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500"
    case "OFFER": return "bg-emerald-500/10 text-emerald-500"
    case "REJECTED": return "bg-rose-500/10 text-rose-500"
    default: return "bg-muted text-muted-foreground"
  }
}
