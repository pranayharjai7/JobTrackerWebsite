"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mail, BarChart3, Clock, Brain, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between glass sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="font-bold text-white text-xl">J</span>
          </div>
          <span className="text-xl font-bold tracking-tight">JobTrack</span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
          <Link href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">How it Works</Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</Link>
        </nav>
        <div className="flex gap-4">
          <Link 
            href="/api/auth/signin" 
            className="px-5 py-2 rounded-full text-sm font-medium border border-border hover:bg-muted transition-all"
          >
            Sign In
          </Link>
          <Link 
            href="/api/auth/signin" 
            className="px-5 py-2 rounded-full text-sm font-medium bg-primary text-white hover:opacity-90 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-6 lg:px-12 pt-24 pb-32 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20 mb-6 inline-block">
              AI-Powered Job Tracking
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
              Track every job application <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                automatically.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect your Gmail. Our AI scans your inbox, extracts application details, and keeps your status updated in real-time. Never lose track of an interview again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/api/auth/signin" 
                className="group px-8 py-4 rounded-full bg-primary text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)]"
              >
                Start Tracking for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#demo" 
                className="px-8 py-4 rounded-full border border-border font-semibold hover:bg-muted transition-all"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Product Mockup */}
          <motion.div 
            className="mt-20 max-w-5xl mx-auto glass rounded-2xl p-4 shadow-2xl relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="bg-[#0B0B0F] rounded-xl overflow-hidden border border-border/50 aspect-[16/9] flex items-center justify-center text-muted-foreground">
              {/* This is a placeholder for a real screenshot/mockup */}
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Modern Productivity Dashboard</h3>
                <p>Interactive timeline, AI insights, and real-time Gmail sync.</p>
              </div>
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 lg:px-12 py-32 bg-[#0B0B0F]/50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">Everything you need to land your next role</h2>
              <p className="text-muted-foreground text-lg">Stop using spreadsheets. Start using a platform built for modern job hunting.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Mail className="w-6 h-6 text-primary" />}
                title="Gmail Auto Tracking"
                description="Our system automatically detects job-related emails and extracts key information without you lifting a finger."
              />
              <FeatureCard 
                icon={<Clock className="w-6 h-6 text-primary" />}
                title="Interactive Timeline"
                description="Visualize your entire job search journey from first application to final offer in a beautiful, linear timeline."
              />
              <FeatureCard 
                icon={<BarChart3 className="w-6 h-6 text-primary" />}
                title="Smart Analytics"
                description="Get insights into your interview conversion rates, rejection patterns, and overall application health."
              />
              <FeatureCard 
                icon={<Brain className="w-6 h-6 text-primary" />}
                title="AI Email Parsing"
                description="Advanced LLMs parse complex recruiter emails to extract interview dates, stage updates, and next steps."
              />
              <FeatureCard 
                icon={<Shield className="w-6 h-6 text-primary" />}
                title="Privacy First"
                description="We never store your full email bodies. We only extract what's necessary for your tracking."
              />
              <FeatureCard 
                icon={<ArrowRight className="w-6 h-6 text-primary" />}
                title="Automated Follow-ups"
                description="Get smart reminders when an application has been inactive for too long. Never let an opportunity slip."
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 lg:px-12 py-12 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <span className="font-bold text-white text-sm">J</span>
            </div>
            <span className="font-bold tracking-tight">JobTrack</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 JobTrack. Built for the modern builder.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      className="p-8 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all group"
      whileHover={{ y: -5 }}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </motion.div>
  )
}
