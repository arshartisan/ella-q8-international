"use client";

import { motion } from "framer-motion";
import { House, HeartHandshake } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { about } = placeholderData;

// Icon mapping
const iconMap: Record<string, React.ElementType> = {
  building: House,
  "file-text": HeartHandshake,
};

export function About() {
  return (
    <section id="about" className="relative">
      {/* Top Section - Two Column Layout */}
      <div className="bg-background py-20 md:py-28 lg:py-32">
        <div className="px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col justify-between h-full"
            >
              <div className="space-y-6">
                {/* Section Label */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground tracking-widest uppercase">
                    {about.sectionLabel}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-body capitalize text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-gray-800 leading-[1] -tracking-[0.08em]">
                  {about.headline}
                </h2>

                {/* Description */}
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg tracking-tighter">
                  {about.description}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="space-y-4 pt-4">
                {about.features.map((feature, index) => {
                  const Icon = iconMap[feature.icon] || House;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: 0.1 + index * 0.1,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      className="flex gap-5 p-5 bg-muted/70 "
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-foreground/70" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <div className="space-y-1.5">
                        <h3 className="font-body tracking-tighter capitalize font-medium text-foreground">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed tracking-tighter">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative h-full w-full min-h-[400px] lg:min-h-[600px]"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={about.image}
                  alt="Luxury hotel interior"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-[#1a1a1a] py-16 md:py-20"
      >
        <div className="px-6 md:px-12 lg:px-16">
          {/* Stats Header */}
          <div className="text-center mb-16">
            {/* Label */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-white/50 tracking-widest uppercase">
                {about.statsBar.label}
              </span>
            </div>
            {/* Headline */}
            <h3 className="font-body capitalize text-2xl md:text-3xl lg:text-4xl font-normal text-white tracking-tighter">
              {about.statsBar.headline}
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {about.statsBar.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-center"
              >
                <p className="font-body text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tighter">
                  {stat.value}
                  <span className="text-primary">{stat.suffix}</span>
                </p>
                <p className="text-xs uppercase tra text-white/50 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
