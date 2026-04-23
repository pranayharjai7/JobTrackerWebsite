"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Scale, UserCheck, ShieldAlert, Rocket } from "lucide-react";

export default function TermsPage() {
  const lastUpdated = "April 23, 2026";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-6">
              <Scale className="w-4 h-4" />
              <span>Legal Guidelines</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 font-heading">
              Terms of <br />
              <span className="text-primary text-glow">Service.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Welcome to JobTrack! By using our application, you agree to these terms. 
              We've kept them as clear and straightforward as possible.
            </p>
            <p className="mt-8 text-sm text-white/40 font-mono">Last Updated: {lastUpdated}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
              <UserCheck className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-white font-bold mb-2">User First</h4>
              <p className="text-sm text-muted-foreground">You own your data. We just help you organize it.</p>
            </div>
            <div className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
              <ShieldAlert className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-white font-bold">Safe Use</h4>
              <p className="text-sm text-muted-foreground">Agreement to use the app lawfully and respect platform limits.</p>
            </div>
            <div className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
              <Rocket className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-white font-bold">Career Focus</h4>
              <p className="text-sm text-muted-foreground">A tool designed to empower your search, not guarantee an offer.</p>
            </div>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none space-y-12 mb-24">
            <section className="bg-white/5 border border-white/10 rounded-3xl p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="text-primary" />
                1. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using the JobTrack web application ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree, please do not use the Service.
              </p>
            </section>

            <section className="p-10">
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">2. Description of Service</h2>
              <p className="text-muted-foreground mb-6">JobTrack is a job application management tool designed to:</p>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs font-mono">A</div>
                  <p><strong>Automate Tracking</strong>: Sync with your Gmail account to identify and organize job-related communications.</p> 
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs font-mono">B</div>
                  <p><strong>AI Insights</strong>: Use artificial intelligence to summarize application details and provide smart filters.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs font-mono">C</div>
                  <p><strong>Visualize Progress</strong>: Provide heatmaps and journey timelines of your career search.</p>
                </li>
              </ul>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-10">
              <h3 className="text-xl font-bold text-white mb-4">3. Account & Gmail Integration</h3>
              <div className="space-y-4 text-muted-foreground">
                <p><strong>Authentication</strong>: To use the Service's core features, you must connect a Google Account.</p>
                <p><strong>Gmail Access</strong>: You grant JobTrack permission to access your Gmail in "read-only" mode. We use this to extract job-related data.</p>
                <p><strong>Responsibility</strong>: You are responsible for maintaining the security of your account credentials.</p>
              </div>
            </section>

            <section className="p-10">
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">4. Disclaimers & Liability</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  <strong>"As Is" Basis</strong>: JobTrack is provided "as is" without warranties of any kind.
                </p>
                <p>
                  <strong>No Career Guarantee</strong>: JobTrack is a tracking tool; we do not guarantee job placements or specific outcomes.
                </p>
                <p>
                  <strong>Liability</strong>: In no event shall JobTrack be liable for any damages resulting from service interruptions or data loss.
                </p>
              </div>
            </section>

            <section className="p-10 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6 font-heading">Contact Us</h2>
              <p className="text-muted-foreground mb-8">
                If you have any questions about these Terms, please reach out via our official repository or support channels.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
