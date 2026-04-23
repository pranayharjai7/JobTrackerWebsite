"use client"

import { useState, useEffect, useMemo } from "react"
import { useSession } from "next-auth/react"
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
  Line,
  Legend
} from "recharts"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { RotateCcw, TrendingUp, Target, Clock, Award } from "lucide-react"

interface Application {
  id: string
  company: string
  role: string
  status: string
  appliedDate: string
  lastUpdate: string
  emails: { id: string }[]
}

const STATUS_COLORS: Record<string, string> = {
  APPLIED:    "#3B82F6",
  IN_REVIEW:  "#F59E0B",
  INTERVIEW:  "#A855F7",
  OFFER:      "#10B981",
  REJECTED:   "#F43F5E",
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session) return
    const fetch_ = async () => {
      try {
        const res = await fetch("/api/applications")
        if (res.ok) setApplications(await res.json())
      } finally {
        setIsLoading(false)
      }
    }
    fetch_()
  }, [session])

  // --- Derived Data ---
  const monthlyData = useMemo(() => {
    const map: Record<string, { name: string; Applied: number; Interviews: number; Offers: number }> = {}
    applications.forEach(app => {
      const d = new Date(app.appliedDate)
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`
      const label = `${MONTHS[d.getMonth()]} '${String(d.getFullYear()).slice(2)}`
      if (!map[key]) map[key] = { name: label, Applied: 0, Interviews: 0, Offers: 0 }
      map[key].Applied++
      if (app.status === "INTERVIEW") map[key].Interviews++
      if (app.status === "OFFER") map[key].Offers++
    })
    return Object.keys(map).sort().map(k => map[k])
  }, [applications])

  const statusData = useMemo(() => {
    const counts: Record<string, number> = {}
    applications.forEach(app => {
      counts[app.status] = (counts[app.status] || 0) + 1
    })
    return Object.entries(counts).map(([name, value]) => ({ name, value, color: STATUS_COLORS[name] ?? "#64748B" }))
  }, [applications])

  const metrics = useMemo(() => {
    const total = applications.length
    const interviews = applications.filter(a => ["INTERVIEW", "OFFER"].includes(a.status)).length
    const offers = applications.filter(a => a.status === "OFFER").length
    const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0
    const offerRate = interviews > 0 ? Math.round((offers / interviews) * 100) : 0

    // Average days from apply to last update for offers
    const offerApps = applications.filter(a => a.status === "OFFER")
    const avgDays = offerApps.length > 0
      ? Math.round(offerApps.reduce((acc, a) => {
          const diff = (new Date(a.lastUpdate).getTime() - new Date(a.appliedDate).getTime()) / (1000 * 60 * 60 * 24)
          return acc + diff
        }, 0) / offerApps.length)
      : 0

    return { total, interviews, offers, interviewRate, offerRate, avgDays }
  }, [applications])

  if (isLoading) return (
    <div className="h-96 flex items-center justify-center">
      <RotateCcw className="w-8 h-8 text-primary animate-spin" />
    </div>
  )

  return (
    <div className="space-y-10 pb-20">
      <header>
        <h1 className="text-4xl font-black font-outfit tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Real-time insights across {metrics.total} tracked application{metrics.total !== 1 ? "s" : ""}.
        </p>
      </header>

      {/* Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Applications", value: metrics.total, icon: TrendingUp, color: "text-blue-500", sub: "tracked via Gmail & manual" },
          { label: "Interviews", value: metrics.interviews, icon: Target, color: "text-purple-500", sub: `${metrics.interviewRate}% conversion rate` },
          { label: "Offers", value: metrics.offers, icon: Award, color: "text-emerald-500", sub: `${metrics.offerRate}% offer rate` },
          { label: "Avg. Time to Offer", value: metrics.avgDays > 0 ? `${metrics.avgDays}d` : "—", icon: Clock, color: "text-amber-500", sub: "from application to offer" },
        ].map((stat, i) => (
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
            <div className="text-[11px] text-muted-foreground/60 mt-1">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Applications Over Time */}
        <motion.div
          className="p-8 rounded-2xl border border-border bg-card/30 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-lg font-bold mb-2">Application Activity</h3>
          <p className="text-xs text-muted-foreground mb-8">Monthly breakdown of applications, interviews &amp; offers</p>
          {monthlyData.length > 0 ? (
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1F2330" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748B" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#111318", border: "1px solid #1F2330", borderRadius: "12px", fontSize: "12px" }}
                    cursor={{ fill: "rgba(139,92,246,0.05)" }}
                  />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "11px", paddingTop: "16px" }} />
                  <Bar dataKey="Applied" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={24} />
                  <Bar dataKey="Interviews" fill="#A855F7" radius={[4, 4, 0, 0]} maxBarSize={24} />
                  <Bar dataKey="Offers" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-muted-foreground text-sm italic">
              No application data yet. Start by syncing Gmail or adding manually.
            </div>
          )}
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          className="p-8 rounded-2xl border border-border bg-card/30 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-lg font-bold mb-2">Status Distribution</h3>
          <p className="text-xs text-muted-foreground mb-8">Current state of all your applications</p>
          {statusData.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="h-[220px] w-full md:w-[220px] flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={90}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#111318", border: "1px solid #1F2330", borderRadius: "12px", fontSize: "12px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3 flex-1 w-full">
                {statusData.map(s => (
                  <div key={s.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                      <span className="text-xs font-bold text-muted-foreground">{s.name.replace("_", " ")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.round((s.value / metrics.total) * 100)}%`, backgroundColor: s.color }}
                        />
                      </div>
                      <span className="text-xs font-black text-white w-6 text-right">{s.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-muted-foreground text-sm italic">
              No data available yet.
            </div>
          )}
        </motion.div>

        {/* Funnel / Success Metrics */}
        <motion.div
          className="lg:col-span-2 p-8 rounded-2xl border border-border bg-card/30 glass"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-bold mb-2">Conversion Funnel</h3>
          <p className="text-xs text-muted-foreground mb-8">How your applications progress through each stage</p>
          <div className="grid md:grid-cols-3 gap-8">
            <MetricCard
              title="Interview Rate"
              value={metrics.total > 0 ? `${metrics.interviewRate}%` : "—"}
              subtext={`${metrics.interviews} of ${metrics.total} applications`}
              color="text-purple-500"
              barColor="bg-purple-500"
              barWidth={metrics.interviewRate}
            />
            <MetricCard
              title="Offer Conversion"
              value={metrics.interviews > 0 ? `${metrics.offerRate}%` : "—"}
              subtext={`${metrics.offers} of ${metrics.interviews} interviews`}
              color="text-emerald-500"
              barColor="bg-emerald-500"
              barWidth={metrics.offerRate}
            />
            <MetricCard
              title="Avg. Time to Offer"
              value={metrics.avgDays > 0 ? `${metrics.avgDays} days` : "—"}
              subtext={metrics.offers > 0 ? `Across ${metrics.offers} offer(s)` : "No offers tracked yet"}
              color="text-amber-500"
              barColor="bg-amber-500"
              barWidth={Math.min(metrics.avgDays, 100)}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MetricCard({
  title, value, subtext, color, barColor, barWidth
}: {
  title: string, value: string, subtext: string, color: string, barColor: string, barWidth: number
}) {
  return (
    <div className="p-6 rounded-xl border border-border bg-[#0B0B0F]/50 space-y-4">
      <div className="text-xs font-black text-muted-foreground uppercase tracking-widest">{title}</div>
      <div className={cn("text-4xl font-black font-outfit", color)}>{value}</div>
      <div className="space-y-2">
        <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
          <div className={cn("h-full rounded-full transition-all", barColor)} style={{ width: `${Math.min(barWidth, 100)}%` }} />
        </div>
        <div className="text-xs text-muted-foreground">{subtext}</div>
      </div>
    </div>
  )
}
