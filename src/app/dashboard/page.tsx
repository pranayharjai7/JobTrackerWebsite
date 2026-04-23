"use client"

import { useState, useMemo } from "react"
import { useSession } from "next-auth/react"
import { 
  Briefcase, 
  MessageSquare, 
  CheckCircle2,
  TrendingUp,
  Clock,
  List,
  History,
  Sparkles,
  Filter,
  Search,
  RotateCcw,
  Plus
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ListView } from "@/components/dashboard/ListView"
import { JourneyMode } from "@/components/dashboard/JourneyMode"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { ApplicationDetails } from "@/components/dashboard/ApplicationDetails"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [view, setView] = useState<"list" | "journey">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [isSyncing, setIsSyncing] = useState(false)
  const [selectedApp, setSelectedApp] = useState<any>(null)

  // Mock data for demo purposes if session not yet loaded or no DB data
  const applications = [
    { id: "1", company: "Google", role: "Software Engineer", status: "INTERVIEW", appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), lastUpdate: new Date().toISOString(), location: "Mountain View, CA", emails: [], summary: "Technical rounds scheduled. Prepare for algorithm and system design questions." },
    { id: "2", company: "Meta", role: "Frontend Developer", status: "APPLIED", appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), lastUpdate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), location: "Remote", emails: [] },
    { id: "3", company: "Stripe", role: "Product Designer", status: "OFFER", appliedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), lastUpdate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), location: "San Francisco, CA", emails: [] },
  ]

  const stats = [
    { label: "Total Apps", value: applications.length, icon: Briefcase, color: "text-blue-500" },
    { label: "Interviews", value: applications.filter(a => a.status === "INTERVIEW").length, icon: MessageSquare, color: "text-purple-500" },
    { label: "Offers", value: applications.filter(a => a.status === "OFFER").length, icon: CheckCircle2, color: "text-emerald-500" },
    { label: "Active", value: applications.filter(a => a.status !== "REJECTED").length, icon: TrendingUp, color: "text-amber-500" },
  ]

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            app.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const res = await fetch("/api/sync", { method: "POST" })
      // Handle response
    } finally {
      setTimeout(() => setIsSyncing(false), 2000) // Mock delay
    }
  }

  if (!session) return null

  return (
    <div className="space-y-10 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black font-outfit tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Executive Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            Welcome back, {session.user?.name}
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-primary font-medium">System Synchronized</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={cn(
              "glass px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 border-primary/20 hover:border-primary/50 transition-all",
              isSyncing && "opacity-50 cursor-not-allowed"
            )}
          >
            <RotateCcw className={cn("w-4 h-4 text-primary", isSyncing && "animate-spin")} />
            {isSyncing ? "Synchronizing..." : "Sync Gmail"}
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all">
            <Plus className="w-4 h-4" />
            New Entry
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-xl bg-background/50", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <div className="text-3xl font-black font-outfit">{stat.value}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          {/* Controls */}
          <div className="glass-card p-2 flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-grow w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text"
                placeholder="Search companies, roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 pl-11 pr-4 py-2 text-sm font-medium"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto p-1 bg-background/30 rounded-lg">
              <button 
                onClick={() => setView("list")}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-xs font-bold transition-all",
                  view === "list" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-3.5 h-3.5" />
                List
              </button>
              <button 
                onClick={() => setView("journey")}
                className={cn(
                  "p-2 rounded-md flex items-center gap-2 text-xs font-bold transition-all",
                  view === "journey" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <History className="w-3.5 h-3.5" />
                Journey
              </button>
            </div>
          </div>

          {/* Smart Filters */}
          <div className="flex flex-wrap gap-2">
            <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3 h-3" />
              AI SUGGESTED:
            </div>
            {["Needs Follow-up", "Interview Soon", "High Response Rate"].map(filter => (
              <button key={filter} className="px-3 py-1.5 rounded-full bg-card/50 border border-border text-[10px] font-bold text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all">
                {filter}
              </button>
            ))}
          </div>

          {/* Main View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {view === "list" ? (
                <ListView applications={filteredApps} onSelect={setSelectedApp} />
              ) : (
                <JourneyMode applications={filteredApps} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <ActivityHeatmap applications={applications} />
          
          <div className="glass-card p-6">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-primary" />
              Next Milestones
            </h3>
            <div className="space-y-4">
              {[
                { label: "Technical Interview", co: "Google", time: "Tomorrow, 10:00 AM" },
                { label: "Follow-up", co: "Meta", time: "In 2 days" }
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-background/50 border border-border group hover:border-primary/30 transition-all">
                  <div className="text-[10px] font-bold text-primary uppercase mb-1">{m.co}</div>
                  <div className="text-sm font-bold">{m.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{m.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Overlay */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/50 border border-border text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <ApplicationDetails application={selectedApp} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
