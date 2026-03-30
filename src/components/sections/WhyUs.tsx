"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { whyUs } = placeholderData;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

// Deterministic pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const avatars = [
  "/assets/images/avatar/1.jpg",
  "/assets/images/avatar/2.jpg",
  "/assets/images/avatar/3.jpg",
  "/assets/images/avatar/4.jpg",
  "/assets/images/avatar/5.jpg",
];

export function WhyUs() {
  return (
    <section id="why-us" className="bg-background py-16 md:py-24 lg:py-28">
      <div className="px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Top: Label + Headline + Tagline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div>
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase border border-border rounded-full text-muted-foreground">
                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
                {whyUs.sectionLabel}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              className="font-heading text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-normal tracking-tighter leading-[1.1] text-foreground"
            >
              {whyUs.headline}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="text-foreground/70 text-base md:text-base italic max-w-sm lg:text-right leading-relaxed tracking-tighter"
          >
            {whyUs.tagline}
          </motion.p>
        </div>

        {/* 3-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr] gap-4 md:gap-5">
          {/* Left: Local Expertise with dotted map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", duration: 0.4, bounce: 0.15 },
            }}
            className="relative flex flex-col justify-between rounded-2xl md:rounded-3xl bg-muted/50 border border-border/50 p-6 md:p-8 min-h-[380px] md:min-h-[460px] overflow-hidden cursor-pointer"
          >
            {/* Dotted world map pattern */}
            <div className="flex-1 flex items-center justify-center opacity-[0.12]">
              <svg
                viewBox="0 0 800 400"
                className="w-full max-w-md"
                fill="currentColor"
              >
                {/* Simplified dot map of Sri Lanka region */}
                {Array.from({ length: 40 }).map((_, row) =>
                  Array.from({ length: 80 }).map((_, col) => {
                    const x = col * 10 + 5;
                    const y = row * 10 + 5;
                    const seed = row * 80 + col;
                    // Create a rough world map shape using mathematical regions
                    const inContinent =
                      // Americas
                      (x > 80 &&
                        x < 250 &&
                        y > 40 &&
                        y < 350 &&
                        seededRandom(seed) > 0.4) ||
                      // Europe/Africa
                      (x > 330 &&
                        x < 500 &&
                        y > 30 &&
                        y < 380 &&
                        seededRandom(seed + 3200) > 0.45) ||
                      // Asia
                      (x > 480 &&
                        x < 720 &&
                        y > 40 &&
                        y < 300 &&
                        seededRandom(seed + 6400) > 0.4) ||
                      // Australia
                      (x > 620 &&
                        x < 740 &&
                        y > 280 &&
                        y < 370 &&
                        seededRandom(seed + 9600) > 0.5);
                    if (!inContinent) return null;
                    return (
                      <circle
                        key={`${row}-${col}`}
                        cx={x}
                        cy={y}
                        r={2}
                        opacity={0.6 + seededRandom(seed + 12800) * 0.4}
                      />
                    );
                  }),
                )}
                {/* Highlight dot for Sri Lanka */}
                <circle
                  cx={560}
                  cy={220}
                  r={6}
                  className="text-primary fill-primary"
                  opacity={0.8}
                />
                <circle
                  cx={560}
                  cy={220}
                  r={12}
                  className="text-primary fill-primary"
                  opacity={0.2}
                />
              </svg>
            </div>

            {/* Bottom content */}
            <div className="mt-6 space-y-2">
              <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tighter text-foreground">
                {whyUs.localExpertise.title}
              </h3>
              <p className="text-foreground/70 text-base leading-relaxed tracking-tighter max-w-sm">
                {whyUs.localExpertise.description}
              </p>
            </div>
          </motion.div>

          {/* Center: 2 stacked cards */}
          <div className="flex flex-col gap-4 md:gap-5">
            {whyUs.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.1,
                  ease: EASE_OUT,
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", duration: 0.4, bounce: 0.15 },
                }}
                className="flex-1 flex flex-col justify-between rounded-2xl md:rounded-3xl bg-muted/50 border border-border/50 p-6 md:p-8 cursor-pointer"
              >
                <h3 className="font-heading text-lg md:text-xl font-medium tracking-tighter text-foreground mb-4">
                  {card.title}
                </h3>

                {/* Avatar stack for community card */}
                {card.showAvatars && (
                  <div className="flex -space-x-2 mb-4">
                    {avatars.map((avatar, i) => (
                      <motion.div
                        key={avatar}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: 0.4 + i * 0.05,
                          ease: EASE_OUT,
                        }}
                        className="relative w-9 h-9 rounded-full border-2 border-background overflow-hidden"
                      >
                        <Image
                          src={avatar}
                          alt={`Community member ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                <p className="text-foreground/70 text-base leading-relaxed tracking-tighter">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right: Featured image card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            whileHover={{
              scale: 1.02,
              transition: { type: "spring", duration: 0.4, bounce: 0.15 },
            }}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[380px] md:min-h-[460px] md:col-span-2 lg:col-span-1 cursor-pointer"
          >
            <Image
              src={whyUs.featuredImage.src}
              alt="Ella Q8 travel experience"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
              <p className="text-white/90 text-base md:text-base font-medium italic tracking-tighter max-w-[200px]">
                {whyUs.featuredImage.caption}
              </p>
              <motion.a
                href="#testimonials"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-foreground text-background shrink-0"
              >
                <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
