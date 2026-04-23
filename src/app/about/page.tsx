"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code2, Rocket, Heart, Coffee } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 flex flex-col items-center text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 font-heading">
              The story behind <br />
              <span className="text-primary text-glow">JobTrack.</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary pl-8 py-2 max-w-2xl">
              "I built JobTrack because I was tired of manually updating spreadsheets for every role I applied to. I wanted something that was as smart as the modern web and automated the boring parts of my job hunt."
            </p>
          </motion.div>

          <div className="space-y-16 text-lg text-muted-foreground leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-4 font-heading">
                <Rocket className="text-primary" />
                The Mission
              </h2>
              <p>
                JobTrack is an intelligent web application built with **Next.js** and **TypeScript** that helps you organize and track your job search journey automatically. By syncing with your Gmail and utilizing advanced AI for data extraction, it removes the friction of record-keeping, allowing you to focus on what matters: the human side of the job search.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-4 font-heading">
                <Code2 className="text-primary" />
                Technical Excellence
              </h2>
              <p>
                Built following modern web standards, JobTrack is a testament to efficient software design. 
                We use **Prisma** for data modeling, **PostgreSQL** for reliable storage, and **Framer Motion** for a beautiful, responsive user interface.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2">Next.js 14</h4>
                  <p className="text-sm">Leveraging Server Components and Server Actions for optimal performance.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-bold mb-2">Secure Sync</h4>
                  <p className="text-sm">Your data is synced securely via OAuth2 and stored with enterprise-grade encryption.</p>
                </div>
              </div>
            </section>

            <section className="space-y-6 p-12 rounded-[2.5rem] bg-primary/5 border border-primary/20 relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <GithubIcon className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4 font-heading">
                  <GithubIcon className="w-8 h-8 text-primary" />
                  Open Source
                </h2>
                <p className="mb-8">
                  JobTrack is a project created by Pranay Harjai. It is built to solve real-world productivity challenges for job seekers. 
                  Contributions are welcome—whether it's adding new AI parsing features or refining the UI.
                </p>
                <Link 
                  href="https://github.com/pranayharjai7/JobTrackerWebsite" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-primary hover:text-white transition-all"
                >
                  <GithubIcon className="w-5 h-5" />
                  View the Repo
                </Link>
              </div>
            </section>

            <section className="flex flex-col items-center text-center py-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-red-400/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
              </div>
              <p className="max-w-md italic">
                Designed with care. Built for the modern job hunter.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
