import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Badge } from "@/components/ui/badge"
import { 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  ArrowLeft,
  MessageSquare,
  FileText
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default async function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/api/auth/signin")
  }

  const application = await prisma.application.findUnique({
    where: { id: params.id, userId: session.user.id },
    include: {
      emails: { orderBy: { timestamp: "desc" } },
      events: { orderBy: { date: "desc" } },
    },
  })

  if (!application) {
    notFound()
  }

  return (
    <div className="space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Link 
            href="/dashboard/applications" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Applications
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-2xl text-primary border border-primary/20">
              {application.company[0]}
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{application.company}</h1>
              <p className="text-xl text-muted-foreground">{application.role}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={cn("text-sm px-4 py-1.5 font-bold", getStatusStyles(application.status))}>
            {application.status}
          </Badge>
          <button className="px-4 py-2 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-all text-sm font-medium">
            Edit Details
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Timeline Section */}
          <section className="p-8 rounded-2xl border border-border bg-card/30 glass">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Journey Timeline
            </h2>
            <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/50">
              {application.events.map((event) => (
                <div key={event.id} className="flex gap-6 relative">
                  <div className="w-6 h-6 rounded-full bg-background border-2 border-primary flex-shrink-0 z-10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div className="flex-1 p-4 rounded-xl border border-border bg-card/30">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold">{event.eventType}</div>
                      <div className="text-xs text-muted-foreground">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                    {event.notes && <p className="text-sm text-muted-foreground">{event.notes}</p>}
                  </div>
                </div>
              ))}
              {/* Initial Applied Event if not in events */}
              <div className="flex gap-6 relative">
                <div className="w-6 h-6 rounded-full bg-background border-2 border-border flex-shrink-0 z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-border" />
                </div>
                <div className="flex-1 p-4 rounded-xl border border-border bg-card/30 opacity-60">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-bold">APPLIED</div>
                    <div className="text-xs text-muted-foreground">{new Date(application.appliedDate).toLocaleDateString()}</div>
                  </div>
                  <p className="text-sm text-muted-foreground">Initial application submitted via {application.source || "Gmail"}.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Related Emails */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Parsed Emails
            </h2>
            <div className="space-y-3">
              {application.emails.map((email) => (
                <div key={email.id} className="p-6 rounded-xl border border-border bg-card/30 hover:bg-card/50 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{email.subject}</div>
                    <div className="text-xs text-muted-foreground">{new Date(email.timestamp).toLocaleDateString()}</div>
                  </div>
                  <p className="text-sm text-muted-foreground italic line-clamp-2">"{email.bodySnippet}..."</p>
                  <Link 
                    href={`https://mail.google.com/mail/u/0/#inbox/${email.gmailId}`}
                    target="_blank"
                    className="text-xs text-primary hover:underline flex items-center gap-1"
                  >
                    View original in Gmail
                    <FileText className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-8 rounded-2xl border border-border bg-card/30 glass space-y-6">
            <h3 className="text-lg font-bold">Quick Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{application.location || "Location not specified"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">Applied on {new Date(application.appliedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{application.emails.length} Emails parsed</span>
              </div>
            </div>
            
            <hr className="border-border/50" />
            
            <div className="space-y-2">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Source</div>
              <div className="text-sm flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Gmail Integration
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl border border-border bg-primary/5 space-y-4 border-primary/20">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Success Probablity
            </h3>
            <div className="space-y-2">
              <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[65%] shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-primary font-bold">65% Health Score</span>
                <span className="text-muted-foreground">High Activity</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Based on interview rounds and communication frequency, your application health is currently strong.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "APPLIED": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "IN_REVIEW": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "OFFER": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
    case "REJECTED": return "bg-rose-500/10 text-rose-500 border-rose-500/20"
    default: return "bg-muted text-muted-foreground"
  }
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 22V18" />
      <path d="M14 22V18" />
      <path d="M18 4H6v7a6 6 0 0 0 12 0V4Z" />
    </svg>
  )
}
