"use client"

import { createContext, useContext, useRef, useState, useCallback, ReactNode } from "react"

export type SyncStatus = "idle" | "syncing" | "success" | "error"

interface SyncContextValue {
  status: SyncStatus
  lastSynced: Date | null
  triggerSync: () => Promise<void>
}

const SyncContext = createContext<SyncContextValue | null>(null)

export function SyncProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SyncStatus>("idle")
  const [lastSynced, setLastSynced] = useState<Date | null>(null)
  // Ref ensures we never double-fire even if the button is clicked rapidly
  const isSyncingRef = useRef(false)

  const triggerSync = useCallback(async () => {
    if (isSyncingRef.current) return
    isSyncingRef.current = true
    setStatus("syncing")

    try {
      const res = await fetch("/api/sync", { method: "POST" })
      if (!res.ok) throw new Error("Sync failed")

      setLastSynced(new Date())
      setStatus("success")

      // Broadcast completion — any mounted page can listen and refresh its own data
      window.dispatchEvent(new CustomEvent("jobtrack:sync-complete"))

      // Auto-reset to idle after 4 s so the toast disappears
      setTimeout(() => setStatus("idle"), 4000)
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    } finally {
      isSyncingRef.current = false
    }
  }, [])

  return (
    <SyncContext.Provider value={{ status, lastSynced, triggerSync }}>
      {children}
    </SyncContext.Provider>
  )
}

export function useSyncContext() {
  const ctx = useContext(SyncContext)
  if (!ctx) throw new Error("useSyncContext must be used within a SyncProvider")
  return ctx
}
