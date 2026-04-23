"use client"

import { useSyncContext } from "@/context/SyncContext"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function SyncToast() {
  const { status, lastSynced } = useSyncContext()
  const visible = status !== "idle"

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sync-toast"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl text-sm font-semibold select-none",
            status === "syncing" && "bg-card/90 border-primary/30 text-foreground shadow-primary/10",
            status === "success" && "bg-emerald-950/90 border-emerald-500/30 text-emerald-300 shadow-emerald-500/10",
            status === "error"   && "bg-red-950/90 border-red-500/30 text-red-300 shadow-red-500/10"
          )}
        >
          {status === "syncing" && (
            <>
              <RotateCcw className="w-4 h-4 text-primary animate-spin shrink-0" />
              <div className="flex flex-col leading-tight">
                <span>Syncing Gmail in background…</span>
                <span className="text-xs font-normal text-muted-foreground">You can keep browsing</span>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span>Gmail sync complete</span>
                {lastSynced && (
                  <span className="text-xs font-normal text-emerald-500/70">
                    {lastSynced.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                )}
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span>Sync failed</span>
                <span className="text-xs font-normal text-red-400/70">Please try again</span>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
