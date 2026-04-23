"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2, ChevronRight, MessageSquare, Star, Trophy } from "lucide-react";

export default function TimelineMockup() {
  const steps = [
    { label: "Applied", icon: Briefcase, date: "Oct 12", color: "text-white/40", bgColor: "bg-white/5", status: "complete" },
    { label: "Assessment", icon: Star, date: "Oct 15", color: "text-blue-400", bgColor: "bg-blue-400/10", status: "complete" },
    { label: "Interview", icon: MessageSquare, date: "Oct 22", color: "text-purple-400", bgColor: "bg-purple-400/10", status: "complete" },
    { label: "Final Offer", icon: Trophy, date: "Oct 28", color: "text-primary", bgColor: "bg-primary/20", status: "active" },
  ];

  return (
    <div className="p-8 glass-card rounded-3xl w-full max-w-lg mx-auto overflow-hidden relative">
      <div className="absolute top-0 right-0 p-6 opacity-10">
        <Briefcase className="w-32 h-32" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Briefcase className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Senior Product Designer</h3>
            <p className="text-sm text-white/40">Stripe • Applied 16 days ago</p>
          </div>
        </div>

        <div className="flex flex-col gap-6 relative">
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-white/20 via-primary/40 to-transparent" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex items-center gap-6 relative"
            >
              <div className={`w-12 h-12 rounded-xl ${step.bgColor} flex items-center justify-center border border-white/5 relative z-10 shadow-xl`}>
                <step.icon className={`w-5 h-5 ${step.color}`} />
                {step.status === "complete" && (
                  <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <h4 className={`font-bold ${step.status === "active" ? "text-primary" : "text-white"}`}>
                    {step.label}
                  </h4>
                  <p className="text-xs text-white/40">{step.date} • Verification via AI</p>
                </div>
                {step.status === "active" && (
                  <motion.div 
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#09090b] flex items-center justify-center text-[10px] font-bold text-white/40">
                AI
              </div>
            ))}
          </div>
          <span className="text-xs text-white/40 italic">Confidence score: 98.4%</span>
        </div>
      </div>
    </div>
  );
}
