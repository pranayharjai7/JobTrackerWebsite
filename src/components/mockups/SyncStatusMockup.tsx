"use client";

import { motion } from "framer-motion";
import { Check, Loader2, X } from "lucide-react";

export default function SyncStatusMockup() {
  return (
    <div className="flex flex-col gap-4 w-full p-6 glass-card rounded-2xl max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white/60">Gmail Sync Status</span>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-primary/10 border border-primary/20 rounded-full py-4 px-6 flex items-center justify-between shadow-[0_0_20px_rgba(var(--primary),0.1)]"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="w-5 h-5 text-primary" />
          </motion.div>
          <span className="font-bold text-primary tracking-tight">Syncing inbox...</span>
        </div>
        <button className="text-primary/60 hover:text-primary transition-colors">
          <X className="w-4 h-4" />
        </button>
      </motion.div>

      <div className="space-y-3 pt-2">
        {[
          { label: "Fetching emails", status: "complete" },
          { label: "AI Classification", status: "complete" },
          { label: "Data Extraction", status: "processing" },
        ].map((step, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <span className={step.status === "complete" ? "text-white/80" : "text-white/40"}>
              {step.label}
            </span>
            {step.status === "complete" ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-4 h-4 rounded-full border-2 border-primary/30 border-t-primary"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
