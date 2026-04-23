"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Github, Mail, Code2, Rocket, Heart, Coffee } from "lucide-react";
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
                <Github className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-4 font-heading">
                  <Github className="text-primary" />
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
                  <Github className="w-5 h-5" />
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
