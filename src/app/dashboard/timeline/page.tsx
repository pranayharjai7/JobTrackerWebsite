"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, Circle, Clock, Mail, MessageSquare, Trophy, AlertCircle, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

export default function TimelinePage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const res = await fetch("/api/applications")
        if (res.ok) {
          const data = await res.json()
          setApplications(data)
        }
      } catch (error) {
        console.error("Failed to fetch applications")
      } finally {
        setIsLoading(false)
      }
    }
    if (session) fetchApps()
  }, [session])

  if (!session) return null

  return (
    <div className="space-y-10 pb-20">
      <header>
        <h1 className="text-4xl font-black font-outfit tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Career Journey
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">A visual map of your job search progress and milestones.</p>
      </header>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <RotateCcw className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : applications.length > 0 ? (
        <div className="space-y-16">
          {applications.map((job, idx) => (
            <motion.div 
              key={job.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 mb-8 flex-wrap md:flex-nowrap">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-2xl text-primary border border-primary/20 shadow-[0_0_20px_rgba(139,92,246,0.15)] flex-shrink-0">
                  {job.company[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl font-black font-outfit truncate" title={job.company}>{job.company}</h3>
                  <p className="text-sm text-muted-foreground font-medium truncate" title={job.role}>{job.role}</p>
                </div>
                <div className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex-shrink-0 ml-0 md:ml-auto",
                  getStatusStyles(job.status)
                )}>
                  {job.status}
                </div>
              </div>

              {/* Dynamic Horizontal Timeline based on app history if available */}
              <div className="ml-7 flex gap-4 relative overflow-x-auto pb-4 pt-6 scrollbar-hide">
                <div className="absolute left-0 right-0 top-[42px] h-[2px] bg-border/50 z-0" />
                
                <TimelineEvent 
                  type="Applied" 
                  date={job.appliedDate} 
                  icon={Mail} 
                  isLast={job.status === "APPLIED"} 
                />
                
                {job.status !== "APPLIED" && job.status !== "REJECTED" && (
                  <TimelineEvent 
                    type={job.status === "OFFER" ? "Offer" : "Progress"} 
                    date={job.lastUpdate} 
                    icon={job.status === "OFFER" ? Trophy : Clock} 
                    isLast={true} 
                  />
                )}

                {job.status === "REJECTED" && (
                  <TimelineEvent 
                    type="Decision" 
                    date={job.lastUpdate} 
                    icon={Circle} 
                    isLast={true} 
                    isRejected 
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-muted/50 border border-border">
            <AlertCircle className="w-8 h-8 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg">No Journey Data</h3>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Track your first application to see your career journey visualization here.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function TimelineEvent({ type, date, icon: Icon, isLast, isRejected }: any) {
  return (
    <div className="relative pt-10 min-w-[140px] flex-shrink-0">
      <div className={cn(
        "absolute left-1/2 -translate-x-1/2 top-0 w-9 h-9 rounded-full bg-background border-2 flex items-center justify-center z-10 transition-all",
        isRejected ? "border-rose-500/50" : "border-border",
        isLast && !isRejected && "border-primary"
      )}>
        <Icon className={cn(
          "w-4 h-4",
          isLast ? "text-primary" : "text-muted-foreground",
          isRejected && "text-rose-500"
        )} />
        {isLast && !isRejected && (
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
        )}
      </div>
      <div className="text-center">
        <div className="text-xs font-black uppercase tracking-widest mb-1">{type}</div>
        <div className="text-[10px] font-bold text-muted-foreground">
          {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "OFFER": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500 border-purple-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
    case "REJECTED": return "bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.1)]"
    default: return "bg-muted text-muted-foreground border-border"
  }
}
