"use client"

import { useSession, signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import { User, Zap, Mail, Trash2, ShieldCheck, Loader2 } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [name, setName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isClearingData, setIsClearingData] = useState(false)

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name)
    }
  }, [session])

  const handleUpdateProfile = async () => {
    setIsUpdating(true)
    try {
      const res = await fetch("/api/user/update", {
        method: "PATCH",
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        await update({ name }) // Update the session client-side
        alert("Profile updated successfully!")
      }
    } catch {
      alert("Failed to update profile.")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!confirm("Are you absolutely sure? This will permanently delete your account and all tracked data.")) {
      return
    }

    setIsDeleting(true)
    try {
      const res = await fetch("/api/user/delete", { method: "DELETE" })
      if (res.ok) {
        await signOut({ callbackUrl: "/" })
      }
    } catch {
      alert("Failed to delete account.")
      setIsDeleting(false)
    }
  }

  const handleClearData = async () => {
    if (!confirm("Are you sure you want to clear all tracked data? This will delete all applications, emails, and events but keep your account.")) {
      return
    }

    setIsClearingData(true)
    try {
      const res = await fetch("/api/user/clear-data", { method: "DELETE" })
      if (res.ok) {
        alert("All tracked data has been cleared.")
        window.location.reload() // Reload to refresh data
      } else {
        alert("Failed to clear data.")
      }
    } catch {
      alert("An error occurred while clearing data.")
    } finally {
      setIsClearingData(false)
    }
  }

  return (
    <div className="max-w-4xl space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and platform preferences.</p>
      </header>

      <div className="grid gap-8">
        {/* Profile Section */}
        <section className="p-8 rounded-2xl border border-border bg-card/30 glass space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Profile Information</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden">
                {session?.user?.image ? (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={96} 
                    height={96} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <User className="w-10 h-10 text-primary/50" />
                )}
              </div>
            </div>
            
            <div className="flex-1 grid gap-4 w-full">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="Your name" 
                  className="bg-[#0B0B0F]/50" 
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue={session?.user?.email || ""} disabled className="bg-[#0B0B0F]/50 opacity-50" />
                <p className="text-[10px] text-muted-foreground">Your email is managed by Google and cannot be changed.</p>
              </div>
              <Button 
                onClick={handleUpdateProfile} 
                disabled={isUpdating || name === session?.user?.name}
                className="w-fit px-8 mt-2"
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Save Changes
              </Button>
            </div>
          </div>
        </section>

        {/* AI & Integration Section */}
        <section className="p-8 rounded-2xl border border-border bg-card/30 glass space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Connections & AI</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-[#0B0B0F]/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="font-semibold">Gmail Integration</div>
                  <div className="text-xs text-muted-foreground">Connected and scanning for applications</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="opacity-50 cursor-not-allowed">
                Managed by Google
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-[#0B0B0F]/50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">AI Intelligence Level</div>
                  <div className="text-xs text-muted-foreground">Using GPT-4o Mini for optimal parsing</div>
                </div>
              </div>
              <Button variant="outline" size="sm" disabled>
                Pro Feature
              </Button>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <Trash2 className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl font-bold text-rose-500">Danger Zone</h2>
          </div>
          
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-rose-500/10 bg-rose-500/5">
              <div className="space-y-1">
                <div className="font-semibold text-rose-500">Clear Tracked Data</div>
                <p className="text-xs text-muted-foreground">
                  Permanently delete all job applications, emails, and events.
                </p>
              </div>
              <Button 
                onClick={handleClearData}
                disabled={isClearingData}
                variant="outline" 
                className="text-rose-500 border-rose-500/50 hover:bg-rose-500 hover:text-white transition-all w-fit"
              >
                {isClearingData ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Clear All Data
              </Button>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-rose-500/10 bg-rose-500/5">
              <div className="space-y-1">
                <div className="font-semibold text-rose-500">Delete Account</div>
                <p className="text-xs text-muted-foreground">
                  Permanently delete your account and all associated data.
                </p>
              </div>
              <Button 
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                variant="outline" 
                className="text-rose-500 border-rose-500/50 hover:bg-rose-500 hover:text-white transition-all w-fit"
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Delete Account
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
