import type { Metadata } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { cn } from "@/lib/utils"

const outfit = Outfit({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JobTrack – Smart Job Application Tracker",
  description: "Track every job application automatically with Gmail and AI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          outfit.className,
          "min-h-screen bg-background text-foreground antialiased soft-gradient"
        )}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
