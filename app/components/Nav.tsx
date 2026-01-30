"use client";

import Link from "next/link";
import { XMarkIcon, Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/mission", label: "Mission" },
];

const protocolLinks = [
  { href: "/your-cloud", label: "Your Cloud", desc: "Self-hosted storage" },
  { href: "/protect-the-internet", label: "Decentralized Net", desc: "HAM radio networks" },
  { href: "/your-stock-vote", label: "Stock Vote", desc: "Proxy voting tools" },
];

const secondaryLinks = [
  { href: "/find-help", label: "Find Help" },
  { href: "/learn", label: "Learn" },
  { href: "/directory", label: "Directory" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [protocolsOpen, setProtocolsOpen] = useState(false);
  const [mobileProtocolsOpen, setMobileProtocolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProtocolsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-void/95 backdrop-blur-sm border-b border-ash sticky top-0 z-50">
      {/* Scan line effect */}
      <div className="scan-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo-skull-nav.png"
                alt="The John Connor Project"
                className="h-10 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,23,68,0.5)]"
              />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 rounded-full signal-pulse" />
              </div>
            </div>
            <span className="hidden sm:block font-display text-xs tracking-widest text-crimson">
              JCP
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link px-3 py-2"
              >
                {link.label}
              </Link>
            ))}

            {/* Protocols Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setProtocolsOpen(!protocolsOpen)}
                className="nav-link px-3 py-2 flex items-center gap-1"
              >
                Protocols
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-200 ${
                    protocolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {protocolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-terminal border border-ash shadow-xl"
                  >
                    {/* Dropdown header */}
                    <div className="px-4 py-2 border-b border-ash">
                      <span className="text-xs font-mono text-text-muted uppercase tracking-wider">
                        Defense Protocols
                      </span>
                    </div>

                    <div className="py-2">
                      {protocolLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setProtocolsOpen(false)}
                          className="block px-4 py-3 hover:bg-slate/50 transition-colors group"
                        >
                          <span className="font-mono text-sm text-text-primary group-hover:text-crimson transition-colors">
                            {link.label}
                          </span>
                          <span className="block text-xs font-mono text-text-muted mt-0.5">
                            {link.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {secondaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link px-3 py-2"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/get-involved"
              className="btn-resistance ml-4 px-5 py-2 text-sm font-medium"
            >
              <span className="relative z-10">Join the Resistance</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative p-2 text-text-secondary hover:text-crimson transition-colors"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XMarkIcon className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Bars3Icon className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-ash"
          >
            <div className="bg-terminal/95 backdrop-blur-sm">
              {/* Terminal header */}
              <div className="px-4 py-2 border-b border-ash flex items-center gap-2">
                <span className="text-phosphor text-xs font-mono">
                  root@jcp:~$
                </span>
                <span className="text-text-secondary text-xs font-mono cursor-blink">
                  ./navigate
                </span>
              </div>

              <div className="px-4 py-4 space-y-1">
                {/* Main Links */}
                {mainLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-3 px-2 text-text-secondary hover:text-crimson hover:bg-slate/50 transition-all duration-200 group"
                    >
                      <span className="text-crimson opacity-50 group-hover:opacity-100 font-mono text-xs">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm uppercase tracking-wider">
                        {link.label}
                      </span>
                      <span className="ml-auto text-ash group-hover:text-crimson transition-colors">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Protocols Section */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: mainLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <button
                    onClick={() => setMobileProtocolsOpen(!mobileProtocolsOpen)}
                    className="flex items-center gap-3 py-3 px-2 w-full text-text-secondary hover:text-crimson hover:bg-slate/50 transition-all duration-200 group"
                  >
                    <span className="text-crimson opacity-50 group-hover:opacity-100 font-mono text-xs">
                      {String(mainLinks.length + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm uppercase tracking-wider">
                      Protocols
                    </span>
                    <ChevronDownIcon
                      className={`ml-auto h-4 w-4 text-ash group-hover:text-crimson transition-all ${
                        mobileProtocolsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileProtocolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden ml-6 border-l border-ash"
                      >
                        {protocolLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className="flex flex-col py-3 px-4 text-text-secondary hover:text-crimson hover:bg-slate/50 transition-all duration-200"
                            >
                              <span className="font-mono text-sm">
                                {link.label}
                              </span>
                              <span className="font-mono text-xs text-text-muted">
                                {link.desc}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Secondary Links */}
                {secondaryLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (mainLinks.length + 1 + index) * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 py-3 px-2 text-text-secondary hover:text-crimson hover:bg-slate/50 transition-all duration-200 group"
                    >
                      <span className="text-crimson opacity-50 group-hover:opacity-100 font-mono text-xs">
                        {String(mainLinks.length + 2 + index).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-sm uppercase tracking-wider">
                        {link.label}
                      </span>
                      <span className="ml-auto text-ash group-hover:text-crimson transition-colors">
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: (mainLinks.length + secondaryLinks.length + 1) * 0.05 + 0.1 }}
                  className="pt-4 mt-4 border-t border-ash"
                >
                  <Link
                    href="/get-involved"
                    onClick={() => setIsOpen(false)}
                    className="btn-resistance w-full py-3 text-center block text-sm"
                  >
                    <span className="relative z-10">Join the Resistance</span>
                  </Link>
                </motion.div>

                {/* Status footer */}
                <div className="pt-4 flex items-center justify-between text-xs text-text-muted font-mono">
                  <span className="status-active">Network Active</span>
                  <span>v2.0.47</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
