"use client";

import { motion } from "framer-motion";
import { RefreshCw, Building, Award, Users } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { whyUs } = placeholderData;

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  refresh: RefreshCw,
  building: Building,
  award: Award,
  users: Users,
};

export function WhyUs() {
  return (
    <section id="why-us" className="relative bg-muted/30 py-20 md:py-28 lg:py-32">
      <div className="px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Section Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border max-w-[200px]" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-primary" />
              <span className="text-xs text-black/50 tracking-widest uppercase">
                {whyUs.sectionLabel}
              </span>
            </div>
            <div className="flex-1 h-px bg-border max-w-[200px]" />
          </div>

          {/* Headline */}
          <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter capitalize">
            {whyUs.headline}
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1fr_1fr] gap-2">
          {/* Left - Featured Card with Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden min-h-[500px] lg:min-h-[600px]"
          >
            {/* Background Image */}
            <Image
              src={whyUs.featuredCard.image}
              alt="Luxury hotel service"
              fill
              className="object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

            {/* Content */}
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between">
              {/* Top Content */}
              <div className="space-y-4">
                {/* Label */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary" />
                  <span className="text-xs uppercase tracking-widest text-white/80">
                    {whyUs.featuredCard.label}
                  </span>
                </div>
                {/* Headline */}
                <h3 className="font-body text-3xl md:text-4xl font-medium capitalize text-white leading-tight max-w-md tracking-tighter">
                  {whyUs.featuredCard.headline}
                </h3>
              </div>

              {/* Bottom Description */}
              <p className="text-white/80 text-sm md:text-base leading-snug tracking-tighter max-w-md">
                {whyUs.featuredCard.description}
              </p>
            </div>
          </motion.div>

          {/* Right - 2x2 Stats Grid */}
          <div className="grid md:grid-cols-2 gap-3">
            {whyUs.stats.map((stat, index) => {
              const Icon = iconMap[stat.icon] || Award;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.1,
                  }}
                  className="bg-white p-6 md:p-8 flex flex-col justify-between border border-border/80 min-h-[250px]"
                >
                  {/* Top - Value and Icon */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-3xl md:text-5xl font-semibold text-foreground tracking-tighter">
                        {stat.value}
                      </p>
                      <p className="text-sm text-primary mt-1 uppercase tracking-widest">
                        {stat.label}
                      </p>
                    </div>
                    <Icon
                      className="w-5 h-5 text-primary flex-shrink-0"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Bottom - Description */}
                  <p className="text-sm text-muted-foreground leading-snug tracking-tighter mt-auto">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
