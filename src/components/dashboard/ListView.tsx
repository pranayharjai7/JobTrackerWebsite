"use client"

import { formatDistanceToNow } from "date-fns"
import { Briefcase, Building2, MapPin, Calendar, ArrowRight, MoreVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface Application {
  id: string
  company: string
  role: string
  location?: string | null
  status: string
  appliedDate: Date | string
  lastUpdate: Date | string
}

export function ListView({ applications, onSelect }: { applications: Application[], onSelect?: (app: Application) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {applications.map((app) => (
        <div 
          key={app.id} 
          onClick={() => onSelect?.(app)}
          className="glass-card p-5 group flex flex-col h-full cursor-pointer"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl border border-primary/20 group-hover:scale-110 transition-transform">
                {app.company[0]}
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{app.company}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="w-3.5 h-3.5" />
                  {app.role}
                </div>
              </div>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-full text-muted-foreground transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 flex-grow">
            {app.location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {app.location}
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              Applied {formatDistanceToNow(new Date(app.appliedDate), { addSuffix: true })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className={cn(
              "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
              getStatusStyles(app.status)
            )}>
              {app.status}
            </span>
            <button className="text-xs font-semibold text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              View Details
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "APPLIED": return "bg-blue-500/10 text-blue-500 border border-blue-500/20"
    case "IN_REVIEW": return "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500 border border-purple-500/20 animate-pulse"
    case "OFFER": return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
    case "REJECTED": return "bg-rose-500/10 text-rose-500 border border-rose-500/20"
    default: return "bg-muted text-muted-foreground"
  }
}
