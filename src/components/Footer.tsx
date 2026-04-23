import Link from "next/link";
import { Github, Mail, Globe } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8 px-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold">J</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">JobTrack</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
              The intelligent assistant that automates your job search journey. 
              Built with modern technology, powered by advanced AI, and committed to your privacy.
            </p>
            <div className="flex items-center gap-4">
              <Link 
                href="https://github.com/pranayharjai7/JobApplicationTracker" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="mailto:contact@jobtrack.app" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Mail className="w-5 h-5" />
              </Link>
              <Link 
                href="https://jobtrack.app" 
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Globe className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Product</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/features" className="text-muted-foreground hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/api/auth/signin" className="text-muted-foreground hover:text-primary transition-colors">Get Started</Link></li>
              <li><Link href="https://github.com/pranayharjai7/JobApplicationTracker" className="text-muted-foreground hover:text-primary transition-colors">Source Code</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 font-heading">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} JobTrack. All rights reserved.</p>
          <p>Created by Pranay Harjai</p>
        </div>
      </div>
    </footer>
  );
}
