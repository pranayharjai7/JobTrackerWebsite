"use client"

import { useMemo } from "react"
import { format, subDays, eachDayOfInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"

interface Application {
  appliedDate: Date | string
}

export function ActivityHeatmap({ applications }: { applications: Application[] }) {
  const days = useMemo(() => {
    const end = new Date()
    const start = subDays(end, 90) // Last 90 days
    return eachDayOfInterval({ start, end })
  }, [])

  const activityData = useMemo(() => {
    return days.map(day => {
      const count = applications.filter(app => isSameDay(new Date(app.appliedDate), day)).length
      return { day, count }
    })
  }, [days, applications])

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold">Application Activity</h3>
          <p className="text-xs text-muted-foreground">Frequency over the last 3 months</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest">
          Less
          <div className="flex gap-1">
            <div className="w-2.5 h-2.5 rounded-sm bg-muted" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/30" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary/60" />
            <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
          </div>
          More
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center md:justify-start">
        {activityData.map(({ day, count }, i) => (
          <div
            key={i}
            className={cn(
              "w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 hover:z-10 cursor-help relative group",
              count === 0 && "bg-muted",
              count === 1 && "bg-primary/30",
              count === 2 && "bg-primary/60",
              count >= 3 && "bg-primary shadow-[0_0_10px_rgba(139,92,246,0.5)]"
            )}
          >
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded border border-border opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
              {format(day, "MMM d")}: {count} applications
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
