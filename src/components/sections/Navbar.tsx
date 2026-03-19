"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/lib/useLenis";
import placeholderData from "@/data/placeholder.json";
import Image from "next/image";

const { navbar } = placeholderData;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lenis = useLenis();

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const menuLinks = [
    { name: "Home", href: "#hero" },
    { name: "Rooms", href: "#floor" },
    { name: "Amenities", href: "#why-us" },
    { name: "About", href: "#about" },
    { name: "Destinations", href: "#cities" },
    { name: "Contact", href: "#footer" },
  ];

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      lenis?.scrollTo(href, { offset: -20, duration: 1.2 });
    }, 100);
  }, [lenis]);

  return (
    <>
      {/* Main Navigation Bar - Floating Pill */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 max-w-lg mx-auto"
      >
        <nav
          className={cn(
            "flex items-center justify-between px-4 py-3 transition-all duration-300",
            "bg-white/95 backdrop-blur-md border border-border/50 shadow-lg shadow-black/5"
          )}
        >
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center">
            <Image
              src={navbar.logo.default}
              alt={navbar.logo.alt}
              width={150}
              height={150}
              className="w-auto h-8 md:h-12"
            />
          </a>


          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-3 group"
            aria-label="Open menu"
          >
            {/* Hamburger Lines */}
            <div className="flex flex-col gap-1.5">
              <span className="w-5 h-[2px] bg-foreground rounded-full transition-all duration-200 group-hover:w-6" />
              <span className="w-5 h-[2px] bg-foreground rounded-full transition-all duration-200 group-hover:w-4" />
            </div>
            <span className="text-base tracking-tighter font-medium text-foreground hidden sm:block">
              Menu
            </span>
          </button>
        </nav>
      </motion.header>

      {/* Expandable Full Screen Menu - Slides from Right */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel - Slides from Right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[480px] bg-[#1a1a1a] overflow-y-auto"
            >
              <div className="flex flex-col min-h-full p-8">
                {/* Close Button */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="self-start flex items-center justify-center w-12 h-12 bg-white rounded-sm hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-[#1a1a1a]" />
                </motion.button>

                {/* Menu Links */}
                <nav className="mt-12 md:mt-16 flex-1">
                  <ul className="space-y-2">
                    {menuLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="group block py-2"
                        >
                          <span className="text-3xl md:text-4xl tracking-tighter font-medium text-white/90 group-hover:text-primary transition-colors duration-200">
                            {link.name}
                          </span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Contact & Socials Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="mt-auto pt-12 space-y-8"
                >
                  {/* Contact */}
                  <div>
                    <p className="text-sm text-white/40 mb-3">Contact</p>
                    <div className="space-y-1">
                      <a
                        href={`mailto:${navbar.contact.email}`}
                        className="block text-white/70 hover:text-primary transition-colors text-sm underline underline-offset-2"
                      >
                        {navbar.contact.email}
                      </a>
                      <a
                        href={`tel:${navbar.contact.phone}`}
                        className="block text-white/70 hover:text-primary transition-colors text-sm underline underline-offset-2"
                      >
                        {navbar.contact.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
