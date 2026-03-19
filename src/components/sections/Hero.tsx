"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { hero } = placeholderData;

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt="Luxury hotel interior"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen px-6 md:px-12 lg:px-16 pt-32 pb-8">
        {/* Middle Content - Description & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex-1 flex flex-col justify-center max-w-xl"
        >
          <p className="text-white/90 text-lg md:text-2xl leading-snug tracking-tighter font-light">
            {hero.description}
          </p>

          {/* CTA Button */}
          <motion.a
            href={hero.cta.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex items-center justify-center w-fit px-6 py-3 bg-white text-foreground text-base capitalize font-medium hover:bg-primary hover:text-white transition-colors tracking-tighter"
          >
            {hero.cta.label}
          </motion.a>
        </motion.div>

        {/* Bottom Section - Brand Name & Concierge Card */}
        <div className="relative">
          {/* Large Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <h1 className="font-heading text-[clamp(4rem,15vw,14rem)] font-normal text-white leading-[0.85] tracking-tighter">
              {hero.brandName}
            </h1>
          </motion.div>

          {/* Concierge Card - Floating on Bottom Right */}
          <motion.a
            href={hero.conciergeCard.href}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02 }}
            className="hidden md:flex absolute bottom-0 right-0 items-center gap-4 bg-white p-2 pr-2 shadow-lg group"
          >
            {/* Avatar */}
            <div className="relative w-12 h-12 overflow-hidden flex-shrink-0">
              <Image
                src={hero.conciergeCard.avatar}
                alt="Concierge"
                fill
                className="object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {hero.conciergeCard.smallText}
              </p>
              <p className="text-sm font-medium text-foreground tracking-tighter">
                {hero.conciergeCard.mainText}
              </p>
            </div>

            {/* Arrow Button */}
            <div className="flex items-center justify-center w-10 h-10 border border-border group-hover:bg-foreground group-hover:text-background transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
