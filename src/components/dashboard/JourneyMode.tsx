"use client"

import { format } from "date-fns"
import { CheckCircle2, Circle, Clock, MessageSquare, XCircle, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

interface Application {
  id: string
  company: string
  role: string
  status: string
  appliedDate: Date | string
  lastUpdate: Date | string
  summary?: string
  aiAnalysis?: any
}

export function JourneyMode({ applications }: { applications: Application[] }) {
  const sortedApps = [...applications].sort((a, b) => 
    new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
  )

  return (
    <div className="relative space-y-12 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
      {sortedApps.map((app, index) => (
        <div key={app.id} className="relative pl-12 group">
          <div className={cn(
            "absolute left-0 top-0 w-9 h-9 rounded-full border-4 border-background flex items-center justify-center z-10 transition-all group-hover:scale-110",
            getStatusIconStyles(app.status)
          )}>
            {getStatusIcon(app.status)}
          </div>
          
          <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold text-primary mb-1 uppercase tracking-widest">
                {format(new Date(app.lastUpdate), "MMMM d, yyyy")}
              </div>
              <h3 className="text-xl font-bold">{app.company}</h3>
              <p className="text-muted-foreground">{app.role}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-xl bg-background/50 border border-border text-xs font-medium flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                Updated {format(new Date(app.lastUpdate), "h:mm a")}
              </div>
              <span className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold uppercase border",
                getStatusStyles(app.status)
              )}>
                {app.status}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusIcon(status: string) {
  switch (status) {
    case "APPLIED": return <Circle className="w-3.5 h-3.5 fill-current" />
    case "IN_REVIEW": return <Clock className="w-3.5 h-3.5" />
    case "INTERVIEW": return <MessageSquare className="w-3.5 h-3.5" />
    case "OFFER": return <Trophy className="w-3.5 h-3.5" />
    case "REJECTED": return <XCircle className="w-3.5 h-3.5" />
    default: return <Circle className="w-3.5 h-3.5" />
  }
}

function getStatusIconStyles(status: string) {
  switch (status) {
    case "APPLIED": return "bg-blue-500 text-white"
    case "IN_REVIEW": return "bg-yellow-500 text-black"
    case "INTERVIEW": return "bg-purple-500 text-white"
    case "OFFER": return "bg-emerald-500 text-white"
    case "REJECTED": return "bg-rose-500 text-white"
    default: return "bg-border text-muted-foreground"
  }
}

function getStatusStyles(status: string) {
  switch (status) {
    case "APPLIED": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "IN_REVIEW": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "OFFER": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    case "REJECTED": return "bg-rose-500/10 text-rose-500 border-rose-500/20"
    default: return "bg-muted text-muted-foreground border-border"
  }
}
