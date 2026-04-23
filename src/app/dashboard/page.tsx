"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { useSession } from "next-auth/react"
import { 
  Briefcase,
  List,
  History,
  Sparkles,
  Search,
  RotateCcw,
  Plus,
  AlertCircle,
  Target,
  Award,
  XCircle,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSyncContext } from "@/context/SyncContext"
import { ListView } from "@/components/dashboard/ListView"
import { JourneyMode } from "@/components/dashboard/JourneyMode"
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap"
import { ApplicationDetails } from "@/components/dashboard/ApplicationDetails"
import { AddApplicationModal } from "@/components/dashboard/AddApplicationModal"
import { motion, AnimatePresence } from "framer-motion"


export default function DashboardPage() {
  const { data: session } = useSession()
  const [view, setView] = useState<"list" | "journey">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter] = useState("ALL")
  const { status: syncStatus, triggerSync } = useSyncContext()
  const isSyncing = syncStatus === "syncing"
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [editingApp, setEditingApp] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const fetchApps = useCallback(async () => {
    try {
      const res = await fetch("/api/applications")
      if (res.ok) {
        const data = await res.json()
        setApplications(data)
      }
    } catch {
      console.error("Failed to fetch applications")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!session) return
    fetchApps()

    // Refresh data whenever a background sync completes,
    // regardless of which page the user was on during the sync.
    window.addEventListener("jobtrack:sync-complete", fetchApps)
    return () => window.removeEventListener("jobtrack:sync-complete", fetchApps)
  }, [session, fetchApps])

  const stats = [
    { label: "Total Apps", value: applications.length, icon: Briefcase, color: "text-blue-500" },
    { label: "Interviews", value: applications.filter(a => ["INTERVIEW", "OFFER"].includes(a.status)).length, icon: Target, color: "text-purple-500" },
    { label: "Offers Received", value: applications.filter(a => a.status === "OFFER").length, icon: Award, color: "text-emerald-500" },
    { label: "Rejected", value: applications.filter(a => a.status === "REJECTED").length, icon: XCircle, color: "text-rose-500" },
  ]

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = app.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            app.role.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus = statusFilter === "ALL" || app.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter, applications])

  const handleSync = () => triggerSync()

  const handleEdit = (app: any) => {
    setEditingApp(app)
    setIsAddModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/applications/${id}`, { method: "DELETE" })
      if (res.ok) {
        if (selectedApp?.id === id) setSelectedApp(null)
        fetchApps()
      }
    } catch (error) {
      console.error("Failed to delete application:", error)
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
          <p className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
            Welcome back, {session.user?.name}
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-primary font-bold">System Online</span>
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
          <button 
            onClick={() => {
              setEditingApp(null)
              setIsAddModalOpen(true)
            }}
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Manually
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

          {/* Main View */}
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <RotateCcw className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={view}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {filteredApps.length > 0 ? (
                  view === "list" ? (
                    <ListView 
                      applications={filteredApps} 
                      onSelect={setSelectedApp} 
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ) : (
                    <JourneyMode applications={filteredApps} />
                  )
                ) : (
                  <div className="glass-card p-20 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-muted/50 border border-border">
                      <AlertCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">No Applications Found</h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        Connect your Gmail accounts to automatically track your job search progress.
                      </p>
                    </div>
                    <button 
                      onClick={handleSync}
                      className="text-primary font-bold text-sm flex items-center gap-2 hover:underline"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Try Syncing Now
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <ActivityHeatmap applications={applications} />
          
          <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/10">
            <h3 className="font-bold flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              Pro Insights
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our AI engine is currently analyzing your application patterns. Connect more accounts to receive personalized suggestions and interview tips.
            </p>
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
                <ApplicationDetails 
                  application={selectedApp} 
                  onEdit={(app) => {
                    setSelectedApp(null)
                    handleEdit(app)
                  }}
                  onDelete={handleDelete}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add Modal */}
      <AddApplicationModal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingApp(null)
        }} 
        onSuccess={fetchApps}
        initialData={editingApp}
      />
    </div>
  )
}
