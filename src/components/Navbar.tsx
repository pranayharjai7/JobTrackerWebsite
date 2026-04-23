"use client";

import Link from "next/link";
import { Github, Menu, X } from "lucide-react";
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
            <Github className="w-5 h-5" />
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
                <Github className="w-6 h-6" />
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
