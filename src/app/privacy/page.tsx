"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, EyeOff, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "April 23, 2026";

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm mb-6">
              <ShieldCheck className="w-4 h-4" />
              <span>Trust & Security</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 font-heading">
              Your data is <br />
              <span className="text-primary text-glow">your business.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We built JobTrack to help you find work, not to find out about your life. 
              Our privacy policy is simple: we don't own your data, and we don't sell it.
            </p>
            <p className="mt-8 text-sm text-white/40 font-mono">Last Updated: {lastUpdated}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
              <Lock className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-white font-bold mb-2">Secure Storage</h4>
              <p className="text-sm text-muted-foreground">All data is stored in secure, encrypted databases.</p>
            </div>
            <div className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
              <EyeOff className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-white font-bold">No Retargeting</h4>
              <p className="text-sm text-muted-foreground">We never use your data for advertising or model training.</p>
            </div>
            <div className="p-8 glass-card rounded-2xl flex flex-col items-center text-center">
              <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
              <h4 className="text-white font-bold">Google Verified</h4>
              <p className="text-sm text-muted-foreground">Fully compliant with the Google API Limited Use Policy.</p>
            </div>
          </div>

          <div className="prose prose-invert prose-indigo max-w-none space-y-12">
            <section className="bg-white/5 border border-white/10 rounded-3xl p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="text-primary" />
                1. Information We Collect
              </h2>
              <div className="space-y-6 text-muted-foreground">
                <div>
                  <h4 className="text-white font-bold mb-3">Gmail API Data</h4>
                  <p>
                    JobTrack uses the Gmail API to scan your inbox for specifically job-related communications (applications, interview invites, offers, etc.). 
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li><strong>Scopes</strong>: We use the <code>https://www.googleapis.com/auth/gmail.readonly</code> scope.</li>
                    <li><strong>Data Access</strong>: The App reads email headers (Subject, From, Date) and body text to identify job application updates.</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3">Application Data</h4>
                  <p>
                    We store details about your job applications, including company names, roles, application dates, and current statuses, to provide your dashboard.
                  </p>
                </div>
              </div>
            </section>

            <section className="p-10">
              <h2 className="text-2xl font-bold text-white mb-6">2. How We Use Your Information</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">1</div>
                  <p><strong>Job Tracking</strong>: To automatically populate your job application dashboard and journey visualization.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">2</div>
                  <p><strong>AI Summarization</strong>: With your consent, email fragments are processed by AI models to extract specific details. This data is not used for model training.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold text-xs">3</div>
                  <p><strong>Improved UX</strong>: To provide smart filters and refined timeline views.</p>
                </li>
              </ul>
            </section>

            <section className="bg-primary/5 border border-primary/20 rounded-3xl p-10">
              <h3 className="text-xl font-bold text-white mb-4">Limited Use Disclosure</h3>
              <p className="text-muted-foreground leading-relaxed">
                JobTrack's use and transfer of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-primary hover:underline transition-all">Google API Service User Data Policy</a>, including the Limited Use requirements.
              </p>
            </section>

            <section className="p-10">
              <h2 className="text-2xl font-bold text-white mb-6">3. Data Integrity and Security</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  <strong>No Selling of Data</strong>: We <strong>never</strong> sell, rent, or trade your Gmail data or personal information to third parties.
                </p>
                <p>
                  <strong>Encryption</strong>: All data is stored securely and encrypted in transit and at rest.
                </p>
                <p>
                  <strong>Access Control</strong>: Only you can access your data. We use standard OAuth2 and NextAuth.js for secure authentication.
                </p>
              </div>
            </section>

            <section className="p-10 border-t border-white/5">
              <h2 className="text-2xl font-bold text-white mb-6">Questions?</h2>
              <p className="text-muted-foreground mb-8">
                If you have any concerns regarding this policy or how your data is handled, 
                please contact us via our support channels.
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
