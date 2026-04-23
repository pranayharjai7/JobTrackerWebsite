"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle2, AlertCircle, Mail, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SyncPage() {
  const [isSyncing, setIsSyncing] = useState(false)
  const [logs, setLogs] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const handleSync = async () => {
    setIsSyncing(true)
    setError(null)
    setLogs([])

    try {
      const response = await fetch("/api/sync", { method: "POST" })
      const data = await response.json()

      if (response.ok) {
        setLogs(data.logs || ["No new application emails found."])
      } else {
        setError(data.message || "Failed to sync emails. Please try again.")
      }
    } catch (err) {
      setError("An unexpected error occurred during sync.")
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Gmail Sync</h1>
        <p className="text-muted-foreground mt-1">Connect your inbox and let AI track your applications automatically.</p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sync Controls */}
        <div className="p-8 rounded-2xl border border-border bg-card/30 glass space-y-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Automated Tracking</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When you click sync, JobTrack will scan your Gmail for application-related emails from the last 30 days. 
              Our AI will then extract company names, roles, and status updates.
            </p>
          </div>
          
          <Button 
            onClick={handleSync} 
            disabled={isSyncing}
            className="w-full h-12 gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            {isSyncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing with Gmail...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Trigger Manual Sync
              </>
            )}
          </Button>

          <p className="text-[10px] text-center text-muted-foreground">
            We only read application-related emails. Your privacy is our priority.
          </p>
        </div>

        {/* Sync Status / Info */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold">Sync Progress</h3>
          
          <div className="min-h-[300px] p-6 rounded-2xl border border-border bg-[#0B0B0F]/50 font-mono text-xs overflow-y-auto max-h-[400px] space-y-2">
            <AnimatePresence mode="popLayout">
              {logs.length > 0 ? (
                logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-2 text-emerald-400"
                  >
                    <span className="text-emerald-500/50">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </motion.div>
                ))
              ) : isSyncing ? (
                <div className="text-muted-foreground animate-pulse">Scanning inbox for application emails...</div>
              ) : error ? (
                <div className="text-rose-400 flex gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              ) : (
                <div className="text-muted-foreground h-full flex items-center justify-center text-center italic">
                  Ready to sync. Click the button to start.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
