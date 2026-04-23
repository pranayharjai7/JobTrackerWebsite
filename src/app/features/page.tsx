"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
  Database, 
  Mail, 
  Shield, 
  Workflow,
  Zap,
  Brain,
  BarChart3
} from "lucide-react";

const features = [
  {
    title: "Gmail-Based Detection",
    description: "JobTrack automatically scans your connected Gmail accounts for job-related communications, including application confirmations, interview invites, and offer letters.",
    icon: Mail,
    color: "from-blue-500/20 to-indigo-500/20",
    details: ["Read-only Gmail API access", "Real-time background sync", "Intelligent email pre-processing"]
  },
  {
    title: "AI Extraction Engine",
    description: "Powered by advanced LLMs that parse complex recruiter emails to extract interview dates, stage updates, and next steps with high accuracy.",
    icon: Brain,
    color: "from-purple-500/20 to-primary/20",
    details: ["Gemini 1.5 Flash", "Llama 3 Integration", "Automatic field mapping"]
  },
  {
    title: "Application Journey View",
    description: "Visualize the entire chronological timeline of your application stages. Track every touchpoint from initial submission to final decision.",
    icon: Workflow,
    color: "from-indigo-500/20 to-blue-500/20",
    details: ["Chronological sequencing", "Status-based badging", "Automatic stage detection"]
  },
  {
    title: "Smart Analytics",
    description: "Get insights into your interview conversion rates, rejection patterns, and overall application health to optimize your search.",
    icon: BarChart3,
    color: "from-primary/20 to-purple-500/20",
    details: ["Conversion funnels", "Activity heatmaps", "Success rate tracking"]
  },
  {
    title: "Privacy First",
    description: "We believe your job search is private. Our architecture ensures your data is handled securely and transparently.",
    icon: Shield,
    color: "from-blue-600/20 to-blue-400/20",
    details: ["Secure OAuth2 authentication", "Encrypted storage", "No data selling"]
  },
  {
    title: "Real-time Sync",
    description: "Your dashboard stays updated as emails land in your inbox. No manual refreshing or data entry required.",
    icon: Zap,
    color: "from-red-500/20 to-primary/20",
    details: ["Webhooks integration", "Instant dashboard updates", "Background processing"]
  }
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -mr-40 -mt-40" />
        
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 flex flex-col items-center text-center"
          >
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 font-heading">
              Engineered for the <br />
              <span className="text-primary">career-obsessed.</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto">
              JobTrack isn't just a spreadsheet. it's a dedicated assistant that 
              understands your applications and simplifies your journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-500 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <feature.icon className="w-8 h-8 text-white group-hover:text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-3 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Spec Section */}
      <section className="py-32 px-6 bg-[#09090b] border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 font-heading">
                Privacy-first AI. <br />
                <span className="text-primary">No compromises.</span>
              </h2>
              <div className="space-y-8 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most job trackers are data-harvesting machines. JobTrack is different. 
                  We believe your job search is private, and our architecture reflects that.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Shield className="w-6 h-6 text-primary mb-2" />
                    <h4 className="text-white font-bold">Secure Processing</h4>
                    <p className="text-sm">Mapping emails to applications happens securely in our isolated cloud environment.</p>
                  </div>
                  <div className="space-y-2">
                    <Zap className="w-6 h-6 text-primary mb-2" />
                    <h4 className="text-white font-bold">Transient AI Use</h4>
                    <p className="text-sm">Data sent to LLMs is for extraction only and never used for training models.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 glass-card rounded-[2.5rem] border-primary/20">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Database className="w-5 h-5 text-primary" />
                Technical Stack
              </h4>
              <div className="space-y-4">
                {[
                  { label: "Framework", val: "Next.js 14" },
                  { label: "Language", val: "TypeScript" },
                  { label: "UI", val: "Tailwind CSS + Framer Motion" },
                  { label: "Database", val: "Prisma + PostgreSQL" },
                  { label: "Auth", val: "NextAuth.js" },
                  { label: "AI Models", val: "Gemini 1.5, Llama 3" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="text-white font-mono text-sm">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
