"use client";

import { motion } from "framer-motion";
import { Star, ChevronDown, Calendar, Users, MapPin } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { hero } = placeholderData;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

function Badge({
  label,
  delay,
  className,
}: {
  label: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`absolute flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/80 backdrop-blur-md text-white text-sm font-medium shadow-lg ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-primary" />
      {label}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-background"
    >
      {/* Background gradient overlay for warm tone */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-background" />

      <div className="relative z-10 flex flex-col min-h-screen px-4 md:px-8 lg:px-12 pt-28 md:pt-32 pb-6">
        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-6 md:mb-8"
        >
          <motion.h1
            variants={item}
            className="font-heading text-[clamp(2.5rem,6vw+1rem,5.5rem)] font-bold tracking-tight leading-[1.05]"
          >
            {hero.headline}{" "}
            <span className="text-primary">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            {hero.description}
          </motion.p>
        </motion.div>

        {/* Hero Image Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative flex-1 min-h-[400px] md:min-h-[500px] mx-auto w-full max-w-6xl"
        >
          {/* Rounded image frame with white border */}
          <div className="relative h-full w-full rounded-3xl md:rounded-[2rem] overflow-hidden border-2 border-white/60 shadow-2xl">
            <Image
              src={hero.image}
              alt="Luxury stay in Ella Town"
              fill
              className="object-cover"
              priority
            />

            {/* Subtle inner vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Floating Badges */}
          <Badge
            label={hero.badges[0].label}
            delay={0.7}
            className="top-[25%] right-[8%] md:right-[15%] z-20"
          />
          <Badge
            label={hero.badges[1].label}
            delay={0.85}
            className="top-[50%] left-[3%] md:left-[8%] z-20"
          />
          <Badge
            label={hero.badges[2].label}
            delay={1.0}
            className="top-[55%] right-[3%] md:right-[8%] z-20"
          />

          {/* Map Circle - Bottom Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="absolute -bottom-4 -left-2 md:bottom-4 md:left-4 z-20 w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted"
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-[#e8e4d4] flex items-center justify-center">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
          </motion.div>

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-6 md:pb-10 z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              {/* Bottom text */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="text-white/90 text-xs md:text-sm max-w-xs md:max-w-sm leading-relaxed text-center md:text-left ml-24 md:ml-32"
              >
                {hero.bottomText}
              </motion.p>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="flex flex-col items-end"
              >
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 md:w-6 md:h-6 fill-primary text-primary" />
                  <span className="text-3xl md:text-4xl font-heading font-bold text-white">
                    {hero.rating.value}
                  </span>
                </div>
                <span className="text-white/70 text-xs md:text-sm mt-1">
                  {hero.rating.label}
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Booking Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="relative z-20 mx-auto w-full max-w-4xl -mt-8 md:-mt-10"
        >
          <div className="bg-card rounded-2xl shadow-xl border border-border/50 px-4 md:px-6 py-3 md:py-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-0 md:divide-x md:divide-border">
              {/* Room Selector */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 px-2 md:px-4 py-2 md:py-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Room
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-foreground truncate">
                      {hero.bookingBar.defaultRoom}
                    </p>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* Check-in */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 px-2 md:px-4 py-2 md:py-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Check-in
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-foreground">
                      15 Mar 2025
                    </p>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* Check-out */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 px-2 md:px-4 py-2 md:py-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Check-out
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-foreground">
                      30 Mar 2025
                    </p>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 w-full sm:w-auto sm:flex-1 px-2 md:px-4 py-2 md:py-0">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Guests
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-foreground">
                      4 Adults
                    </p>
                    <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="w-full sm:w-auto px-2 md:pl-4">
                <motion.a
                  href={hero.bookingBar.cta.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  className="flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
                >
                  {hero.bookingBar.cta.label}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
