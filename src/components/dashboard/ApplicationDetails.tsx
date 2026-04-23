"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Building2, 
  Mail, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  ExternalLink,
  ShieldCheck,
  MessageSquare,
  Clock,
  Sparkles,
  Edit2,
  Trash2,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Email {
  id: string
  subject: string
  bodySnippet: string
  timestamp: Date | string
}

interface Application {
  id: string
  company: string
  role: string
  status: string
  location?: string | null
  appliedDate: Date | string
  lastUpdate: Date | string
  emails: Email[]
  summary?: string
  aiAnalysis?: {
    summary: string
    sentiment: number
    velocity: string
  } | null
}

interface ApplicationDetailsProps {
  application: Application
  onEdit?: (app: Application) => void
  onDelete?: (id: string) => void
}

export function ApplicationDetails({ application, onEdit, onDelete }: ApplicationDetailsProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "timeline">("summary")

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-8 pr-20 border-b border-border bg-gradient-to-br from-primary/5 to-transparent relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center font-black text-primary text-3xl border border-primary/20 shadow-xl shadow-primary/10">
              {application.company[0]}
            </div>
            <div>
              <h2 className="text-3xl font-black font-outfit tracking-tight">{application.company}</h2>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-4 h-4" />
                  {application.role}
                </span>
                {application.location && (
                  <span className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4" />
                    {application.location}
                  </span>
                )}
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4" />
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onEdit?.(application)}
                className="p-2 rounded-lg bg-background/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                title="Edit Application"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  if (confirm("Are you sure you want to delete this application?")) {
                    onDelete?.(application.id)
                  }
                }}
                className="p-2 rounded-lg bg-background/50 border border-border text-muted-foreground hover:text-rose-500 hover:border-rose-500/30 transition-all"
                title="Delete Application"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <span className={cn(
                "px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border shadow-sm",
                getStatusStyles(application.status)
              )}>
                {application.status}
              </span>
            </div>
            <button className="text-xs font-bold text-primary flex items-center gap-1.5 hover:underline">
              View on LinkedIn
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex border-b border-border bg-background/50">
        <button 
          onClick={() => setActiveTab("summary")}
          className={cn(
            "px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all",
            activeTab === "summary" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Intelligence Report
        </button>
        <button 
          onClick={() => setActiveTab("timeline")}
          className={cn(
            "px-8 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all",
            activeTab === "timeline" ? "border-primary text-primary bg-primary/5" : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          Correspondence
        </button>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {activeTab === "summary" ? (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 relative overflow-hidden group">
                <Sparkles className="absolute top-4 right-4 w-5 h-5 text-primary/30 group-hover:scale-125 transition-transform" />
                <h4 className="text-xs font-black text-primary uppercase tracking-widest mb-3">AI Analysis</h4>
                <p className="text-lg leading-relaxed font-medium">
                  {application.summary || (application.emails.length > 0 ? "Analyzing your correspondence to generate an intelligence report..." : "Add more details or connect Gmail to enable deep AI insights for this application.")}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-card/50">
                  <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Sentiment Analysis</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                      <div 
                        className="h-full bg-emerald-500 transition-all duration-1000" 
                        style={{ width: `${application.aiAnalysis?.sentiment || 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-emerald-500">
                      {application.aiAnalysis?.sentiment || 0}% Positive
                    </span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-card/50">
                  <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Response Velocity</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-2 rounded-full bg-border overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-1000" 
                        style={{ width: application.aiAnalysis?.velocity === "Fast" ? "100%" : application.aiAnalysis?.velocity === "Normal" ? "60%" : application.aiAnalysis?.velocity === "Slow" ? "30%" : "0%" }}
                      />
                    </div>
                    <span className="text-sm font-bold text-blue-500">
                      {application.aiAnalysis?.velocity || "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border"
            >
              {application.emails.length > 0 ? (
                application.emails.map((email, i) => (
                  <div key={email.id} className="relative pl-12 group">
                    <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-background border-2 border-border flex items-center justify-center z-10 group-hover:border-primary transition-colors">
                      <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="p-5 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/30 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold">{email.subject}</h4>
                        <span className="text-[10px] font-medium text-muted-foreground">
                          {new Date(email.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 italic">
                        "{email.bodySnippet}..."
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-muted-foreground italic">
                  No emails detected for this application.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
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

import { AnimatePresence } from "framer-motion"
