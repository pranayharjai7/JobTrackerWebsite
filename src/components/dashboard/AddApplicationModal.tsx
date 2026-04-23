"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Building2, Briefcase, Calendar, MapPin, Loader2, Sparkles } from "lucide-react"

interface AddApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AddApplicationModal({ isOpen, onClose, onSuccess }: AddApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "APPLIED",
    location: "",
    appliedDate: new Date().toISOString().split("T")[0]
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        onSuccess()
        onClose()
        setFormData({
          company: "",
          role: "",
          status: "APPLIED",
          location: "",
          appliedDate: new Date().toISOString().split("T")[0]
        })
      }
    } catch (error) {
      console.error("Failed to add application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl glass-card overflow-hidden"
          >
            <div className="p-8 border-b border-border bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black font-outfit tracking-tight">Add Application</h2>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Manual Entry</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-background/50 border border-border text-muted-foreground hover:text-foreground transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Building2 className="w-3 h-3" />
                    Company Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="Google, Meta, etc."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="w-3 h-3" />
                    Job Role
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="Software Engineer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Applied Date
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.appliedDate}
                    onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                    className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                    placeholder="Remote, NYC, etc."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                  Current Status
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["APPLIED", "IN_REVIEW", "INTERVIEW", "OFFER", "REJECTED"].map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setFormData({ ...formData, status })}
                      className={`px-2 py-2 rounded-lg text-[10px] font-black tracking-tighter transition-all border ${
                        formData.status === status
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                          : "bg-white/5 border-border text-muted-foreground hover:border-white/20"
                      }`}
                    >
                      {status.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-sm bg-white/5 border border-border hover:bg-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-[2] bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Add Application"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
