import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Filter, MoreHorizontal, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"

export default async function ApplicationsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const applications = await prisma.application.findMany({
    where: { userId: session.user.id },
    orderBy: { lastUpdate: "desc" },
  })

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground mt-1">Manage and track all your job applications in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search companies..." 
              className="pl-9 w-full md:w-[300px] bg-card/30"
            />
          </div>
          <button className="p-2 rounded-lg border border-border bg-card/30 hover:bg-card/50 transition-all">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-border bg-card/30 overflow-hidden glass">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <TableRow key={app.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-semibold">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {app.company[0]}
                      </div>
                      {app.company}
                    </div>
                  </TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={cn(
                      "font-semibold",
                      getStatusStyles(app.status)
                    )}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{app.location || "N/A"}</TableCell>
                  <TableCell>{new Date(app.appliedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(app.lastUpdate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <button className="p-1 rounded hover:bg-muted transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-48 text-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <Briefcase className="w-8 h-8 opacity-20" />
                    <p>No applications found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "APPLIED": return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    case "IN_REVIEW": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
    case "INTERVIEW": return "bg-purple-500/10 text-purple-500 border-purple-500/20"
    case "OFFER": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
    case "REJECTED": return "bg-rose-500/10 text-rose-500 border-rose-500/20"
    default: return "bg-muted text-muted-foreground"
  }
}
