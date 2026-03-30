"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Car, Clock, Mountain, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { about } = placeholderData;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

function CountUp({ value, duration = 2000 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const target = parseFloat(value);
  const isDecimal = value.includes(".");
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;

    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setDisplay(isDecimal ? current.toFixed(1) : Math.round(current).toString());

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }, [inView, target, duration, isDecimal]);

  return <span ref={ref}>{display}</span>;
}

const iconMap: Record<string, React.ElementType> = {
  car: Car,
  clock: Clock,
  mountain: Mountain,
};

export function About() {
  return (
    <section id="about" className="bg-background py-16 md:py-24 lg:py-28">
      <div className="px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Top: Section label + Headline */}
        <div className="mb-12 md:mb-16">
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
              {about.sectionLabel}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
            className="font-heading text-[clamp(1.75rem,4vw+0.5rem,3.5rem)] font-medium tracking-tighter leading-[1.1] text-foreground/80 max-w-5xl"
          >
            {about.headline}
          </motion.h2>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.2fr_1fr] gap-4 md:gap-5 mb-12 md:mb-16">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
            className="relative flex flex-col justify-between rounded-2xl md:rounded-3xl bg-muted/60 border border-border/50 p-6 min-h-[360px] md:min-h-[420px]"
          >
            {/* Icon */}
            <div>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mb-4">
                <Compass
                  className="w-5 h-5 text-foreground/70"
                  strokeWidth={1.5}
                />
              </div>

              <p className="text-foreground/80 text-sm md:text-base leading-relaxed tracking-tighter">
                {about.card.description}
              </p>
            </div>

            {/* Content at bottom */}
            <div className="mt-8 space-y-5">
              {/* Tags */}
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {about.card.tags.map((tag) => {
                  const Icon = iconMap[tag.icon] || Mountain;
                  return (
                    <div
                      key={tag.label}
                      className="flex items-center gap-2 text-base text-foreground/70"
                    >
                      <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="tracking-tighter">{tag.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <motion.a
                  href={about.card.cta.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-foreground text-background text-base font-medium rounded-full tracking-tighter hover:bg-foreground/90 hover:bg-primary transition-colors"
                >
                  {about.card.cta.label}
                </motion.a>
                <motion.a
                  href={about.card.cta.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="inline-flex items-center justify-center w-10 h-10 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Center: Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
            className="relative rounded-2xl md:rounded-3xl overflow-hidden min-h-[300px] md:min-h-[420px]"
          >
            <Image
              src={about.featuredImage.src}
              alt={about.featuredImage.title}
              fill
              className="object-cover"
            />
            {/* Title overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
            <h3 className="absolute top-6 left-6 md:top-8 md:left-8 font-heading text-2xl md:text-3xl font-normal text-white tracking-tighter">
              {about.featuredImage.title}
            </h3>
          </motion.div>

          {/* Right: Photo Collage */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="relative flex flex-col justify-between rounded-2xl md:rounded-3xl bg-muted/40 border border-border/50 p-6 md:p-8 min-h-[360px] md:min-h-[420px]"
          >
            {/* Fan-spread photo collage */}
            <div className="relative flex-1 flex items-center justify-center">
              <div className="relative flex items-center justify-center h-48 md:h-56">
                {/* Photo 1 - left, rotated counter-clockwise */}
                <motion.div
                  initial={{ opacity: 0, rotate: -18 }}
                  whileInView={{ opacity: 1, rotate: -10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
                  className="relative -mr-4 md:-mr-5 w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden shadow-lg border-2 border-background z-10 shrink-0 self-end"
                >
                  <Image
                    src={about.gallery.images[0]}
                    alt="Traveler moment 1"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Photo 2 - center, upright and overlapping */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
                  className="relative w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden shadow-xl border-2 border-background z-20 shrink-0 self-start"
                >
                  <Image
                    src={about.gallery.images[1]}
                    alt="Traveler moment 2"
                    fill
                    className="object-cover"
                  />
                </motion.div>

                {/* Photo 3 - right, rotated clockwise */}
                <motion.div
                  initial={{ opacity: 0, rotate: 18 }}
                  whileInView={{ opacity: 1, rotate: 10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT }}
                  className="relative -ml-4 md:-ml-5 w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden shadow-lg border-2 border-background z-10 shrink-0 self-end"
                >
                  <Image
                    src={about.gallery.images[2]}
                    alt="Traveler moment 3"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            {/* Caption */}
            <p className="text-foreground/70 text-sm md:text-base leading-relaxed tracking-tighter mt-4">
              {about.gallery.caption}
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-5xl mx-auto">
          {about.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: EASE_OUT,
              }}
              className="text-center space-y-8"
            >
              <p className=" text-4xl md:text-5xl lg:text-[4.5rem] font-normal tracking-tighter text-primary">
                <CountUp value={stat.value} />
                <span className="text-foreground/60">{stat.suffix}</span>
              </p>
              <p className="capitalize text-xs md:text-base text-muted-foreground mt-1.5 tracking-tighter">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
