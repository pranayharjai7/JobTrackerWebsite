"use client"

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const data = [
  { name: "Jan", apps: 12, interviews: 2 },
  { name: "Feb", apps: 18, interviews: 4 },
  { name: "Mar", apps: 25, interviews: 7 },
  { name: "Apr", apps: 32, interviews: 12 },
]

const statusData = [
  { name: "Applied", value: 45, color: "#3B82F6" },
  { name: "Interview", value: 15, color: "#A855F7" },
  { name: "Offer", value: 5, color: "#10B981" },
  { name: "Rejected", value: 35, color: "#F43F5E" },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-1">Visualize your job search progress and success rates.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Applications Over Time */}
        <motion.div 
          className="p-8 rounded-2xl border border-border bg-card/30 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-bold mb-8">Application Growth</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2330" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111318", border: "1px solid #1F2330", borderRadius: "8px" }}
                  itemStyle={{ color: "#8B5CF6" }}
                />
                <Line type="monotone" dataKey="apps" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: "#8B5CF6" }} />
                <Line type="monotone" dataKey="interviews" stroke="#06B6D4" strokeWidth={3} dot={{ fill: "#06B6D4" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div 
          className="p-8 rounded-2xl border border-border bg-card/30 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold mb-8">Status Distribution</h3>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111318", border: "1px solid #1F2330", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold">100</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Total</span>
            </div>
          </div>
        </motion.div>

        {/* Success Rates */}
        <motion.div 
          className="lg:col-span-2 p-8 rounded-2xl border border-border bg-card/30 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-8">Success Metrics</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <MetricCard title="Interview Rate" value="15%" subtext="From total applications" color="text-purple-500" />
            <MetricCard title="Offer Conversion" value="33%" subtext="From interviews" color="text-emerald-500" />
            <MetricCard title="Time to Offer" value="42 Days" subtext="Average duration" color="text-blue-500" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MetricCard({ title, value, subtext, color }: { title: string, value: string, subtext: string, color: string }) {
  return (
    <div className="p-6 rounded-xl border border-border bg-[#0B0B0F]/50">
      <div className="text-sm text-muted-foreground mb-2">{title}</div>
      <div className={cn("text-4xl font-bold", color)}>{value}</div>
      <div className="text-xs text-muted-foreground mt-2">{subtext}</div>
    </div>
  )
}
