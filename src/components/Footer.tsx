import Link from "next/link";
import { Mail, Globe } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

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
                <GithubIcon className="w-5 h-5" />
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
