"use client"

import { useState, useRef, useEffect } from "react"
import { formatDistanceToNow } from "date-fns"
import { Briefcase, Building2, MapPin, Calendar, ArrowRight, MoreVertical, Edit2, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Application {
  id: string
  company: string
  role: string
  location?: string | null
  status: string
  appliedDate: Date | string
  lastUpdate: Date | string
  summary?: string
  aiAnalysis?: any
}

interface ListViewProps {
  applications: Application[]
  onSelect?: (app: Application) => void
  onEdit?: (app: Application) => void
  onDelete?: (id: string) => void
}

export function ListView({ applications, onSelect, onEdit, onDelete }: ListViewProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {applications.map((app) => (
        <div 
          key={app.id} 
          onClick={() => onSelect?.(app)}
          className="glass-card p-5 group flex flex-col h-full cursor-pointer relative"
        >
          <div className="flex items-start justify-between mb-4 gap-4">
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl border border-primary/20 group-hover:scale-110 transition-transform flex-shrink-0">
                {app.company[0]}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors truncate" title={app.company}>{app.company}</h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground truncate">
                  <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate" title={app.role}>{app.role}</span>
                </div>
              </div>
            </div>
            <div className="relative flex-shrink-0" ref={openMenuId === app.id ? menuRef : null}>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setOpenMenuId(openMenuId === app.id ? null : app.id)
                }}
                className="p-2 hover:bg-white/5 rounded-full text-muted-foreground transition-colors"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {openMenuId === app.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-1.5 space-y-1">
                      <button
                        onClick={() => {
                          onEdit?.(app)
                          setOpenMenuId(null)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-left"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Application
                      </button>
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this application?")) {
                            onDelete?.(app.id)
                          }
                          setOpenMenuId(null)
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors text-left"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
