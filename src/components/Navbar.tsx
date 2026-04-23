"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";

const navLinks = [
  { name: "Features", href: "/features" },
  { name: "About", href: "/about" },
  { name: "Privacy", href: "/privacy" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="text-white font-bold text-xl">J</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors font-heading">
            JobTrack
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="h-4 w-px bg-white/10 mx-2" />
          <Link
            href="https://github.com/pranayharjai7/JobApplicationTracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </Link>
          {session ? (
            <Link
              href="/dashboard"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/api/auth/signin"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-primary/20"
            >
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-background border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <Link
                href="https://github.com/pranayharjai7/JobApplicationTracker"
                target="_blank"
                className="flex items-center gap-2 text-white"
              >
                <GithubIcon className="w-6 h-6" />
                <span>GitHub</span>
              </Link>
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-primary text-white px-6 py-2 rounded-full font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                <Link
                  href="/api/auth/signin"
                  className="bg-primary text-white px-6 py-2 rounded-full font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
