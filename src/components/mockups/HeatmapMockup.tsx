"use client";

import { motion } from "framer-motion";

export default function HeatmapMockup() {
  // Generate fake heatmap data
  const grid = Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, () => Math.random())
  );

  return (
    <div className="p-6 glass-card rounded-2xl w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white font-bold tracking-tight">Search Intensity</h3>
          <p className="text-xs text-white/40">Last 6 months activity</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Growth +24%</span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        {grid.map((row, i) => (
          <div key={i} className="flex gap-1.5">
            {row.map((val, j) => (
              <motion.div
                key={j}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (i * 24 + j) * 0.002 }}
                className="w-3 h-3 rounded-[2px] cursor-pointer transition-colors"
                style={{
                  backgroundColor: val > 0.8 
                    ? "hsl(var(--primary))" 
                    : val > 0.5 
                    ? "hsla(var(--primary), 0.6)" 
                    : val > 0.2 
                    ? "hsla(var(--primary), 0.3)" 
                    : "rgba(255, 255, 255, 0.05)"
                }}
                whileHover={{ scale: 1.4, zIndex: 10, backgroundColor: "hsl(var(--primary))" }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white leading-none">128</span>
            <span className="text-[10px] text-white/40 uppercase tracking-tighter">Apps Sent</span>
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white leading-none">14</span>
            <span className="text-[10px] text-white/40 uppercase tracking-tighter">Interviews</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-white/40">Less</span>
          {[0.1, 0.3, 0.6, 1].map((opacity) => (
            <div 
              key={opacity} 
              className="w-2.5 h-2.5 rounded-[1px]" 
              style={{ backgroundColor: `hsla(var(--primary), ${opacity})` }} 
            />
          ))}
          <span className="text-[10px] text-white/40">More</span>
        </div>
      </div>
    </div>
  );
}
