"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import SyncStatusMockup from "@/components/mockups/SyncStatusMockup";
import HeatmapMockup from "@/components/mockups/HeatmapMockup";
import TimelineMockup from "@/components/mockups/TimelineMockup";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Gauge, Globe, Mail, ShieldCheck, Zap, BarChart3, Clock, Brain, Shield } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0B0F]">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden hero-gradient">
        <div className="absolute inset-0 grid-bg opacity-30" />
        
        <div className="container-custom relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-8"
          >
            <Bot className="w-4 h-4" />
            <span>AI-Powered Job Tracking</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[1.1] font-heading"
          >
            Your job search, <br />
            <span className="text-primary text-glow">perfectly organized.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 text-balance leading-relaxed"
          >
            JobTrack automates the tedious parts of your job hunt. Sync with Gmail, 
            extract data with advanced AI, and visualize your entire career journey—all in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link
              href="/api/auth/signin"
              className="px-10 py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-105 hover:bg-primary/90 transition-all shadow-[0_0_40px_rgba(var(--primary),0.3)] group"
            >
              Start Tracking for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
            >
              Explore Features
            </Link>
          </motion.div>
        </div>

        {/* Hero Mockup Grid */}
        <div className="container-custom mt-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-1">
              <SyncStatusMockup />
            </div>
            <div className="md:col-span-2">
              <TimelineMockup />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Privacy Section */}
      <section className="py-24 border-y border-white/5 bg-[#09090b]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center border border-white/5 p-12 rounded-[2.5rem] bg-white/[0.02]">
            <div>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/20">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6 font-heading">
                Privacy is not a feature. <br />
                <span className="text-primary">It's the foundation.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Your career data is sensitive. JobTrack processes your emails securely, 
                storing only what's necessary for tracking. We never sell your data, 
                and we prioritize transparency in everything we do.
              </p>
              <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span>Google Limited Use Policy Compliant</span>
               </div>
               <div className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span>Encrypted Data Storage</span>
               </div>
               <div className="flex items-center gap-3 text-white/80">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <span>Secure AI Email Classification</span>
               </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
              <HeatmapMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 bg-background">
        <div className="container-custom">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter mb-6 underline decoration-primary/30 decoration-4 underline-offset-8 font-heading">
              Built for high-performance job hunts.
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Extract every detail from your inbox without lifting a finger. 
              Powered by the latest LLMs and real-time automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Mail}
              title="Gmail Sync"
              description="Automatically detect applications, interviews, assessments, and offers as they land in your inbox."
              delay={0.1}
            />
            <FeatureCard
              icon={Brain}
              title="AI Parsing"
              description="Advanced LLMs parse complex recruiter emails to extract interview dates, stage updates, and next steps."
              delay={0.2}
            />
            <FeatureCard
              icon={Gauge}
              title="Search Intensity"
              description="Visualize your activity with an interactive heatmap. Know exactly how hard you're pushing."
              delay={0.3}
            />
            <FeatureCard
              icon={Clock}
              title="Timeline View"
              description="Visualize your entire job search journey from first application to final offer in a beautiful, linear timeline."
              delay={0.4}
            />
            <FeatureCard
              icon={Shield}
              title="Privacy First"
              description="Fast, private, and secure. Data matching and storage happen with your privacy as the top priority."
              delay={0.5}
            />
            <FeatureCard
              icon={BarChart3}
              title="Smart Analytics"
              description="Get insights into your interview conversion rates, rejection patterns, and overall application health."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container-custom glass-card rounded-[3rem] p-16 relative overflow-hidden text-center group">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 relative z-10 font-heading">
            Ready to reclaim your <br />
            <span className="text-primary">career journey?</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto relative z-10">
            Stop digging through your inbox. Let JobTrack handle the record-keeping so you can focus on the interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 relative z-10">
            <Link
              href="/api/auth/signin"
              className="px-12 py-5 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              Get Started Now
            </Link>
            <Link
              href="/about"
              className="px-12 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
