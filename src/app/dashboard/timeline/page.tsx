"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Clock, Mail, MessageSquare, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

const timelineData = [
  {
    company: "Google",
    role: "Senior Software Engineer",
    status: "OFFER",
    date: "2024-04-15",
    events: [
      { type: "Applied", date: "2024-03-01", icon: Mail },
      { type: "Technical Interview", date: "2024-03-15", icon: MessageSquare },
      { type: "Onsite Interview", date: "2024-04-02", icon: MessageSquare },
      { type: "Offer Received", date: "2024-04-15", icon: Trophy },
    ]
  },
  {
    company: "Amazon",
    role: "Full Stack Developer",
    status: "INTERVIEW",
    date: "2024-04-10",
    events: [
      { type: "Applied", date: "2024-03-05", icon: Mail },
      { type: "Assessment", date: "2024-03-20", icon: Clock },
      { type: "Technical Round", date: "2024-04-10", icon: MessageSquare },
    ]
  },
  {
    company: "Microsoft",
    role: "Frontend Engineer",
    status: "REJECTED",
    date: "2024-03-25",
    events: [
      { type: "Applied", date: "2024-02-20", icon: Mail },
      { type: "HR Screen", date: "2024-03-10", icon: MessageSquare },
      { type: "Rejection", date: "2024-03-25", icon: Circle },
    ]
  }
]

export default function TimelinePage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Career Journey</h1>
        <p className="text-muted-foreground mt-1">A visual map of your job search progress and milestones.</p>
      </header>

      <div className="space-y-12">
        {timelineData.map((job, idx) => (
          <motion.div 
            key={job.company}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-xl text-primary border border-primary/20 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                {job.company[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold">{job.company}</h3>
                <p className="text-sm text-muted-foreground">{job.role}</p>
              </div>
              <div className={cn(
                "ml-auto px-4 py-1.5 rounded-full text-xs font-bold border",
                getStatusStyles(job.status)
              )}>
                {job.status}
              </div>
            </div>

            <div className="ml-6 grid grid-cols-1 md:grid-cols-4 gap-4 relative before:absolute before:left-0 before:right-0 before:top-[18px] before:h-[2px] before:bg-border/50 md:before:block before:hidden">
              {job.events.map((event, eIdx) => (
                <div key={eIdx} className="relative pt-10 md:pt-0">
                  <div className="absolute left-1/2 -translate-x-1/2 -top-[18px] w-9 h-9 rounded-full bg-background border-2 border-border flex items-center justify-center z-10 md:static md:mx-auto md:mb-4 group">
                    <event.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    {eIdx === job.events.length - 1 && (
                      <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-semibold">{event.type}</div>
                    <div className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "OFFER": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "REJECTED": return "bg-rose-500/10 text-rose-500 border-rose-500/20"
    default: return "bg-muted text-muted-foreground"
  }
}
