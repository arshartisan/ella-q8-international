"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { cities } = placeholderData;

export function Cities() {
  // Take first 4 locations for the grid
  const displayLocations = cities.locations.slice(0, 4);

  return (
    <section id="cities" className="relative bg-background py-20 md:py-28 lg:py-32">
      <div className="px-6 md:px-12 lg:px-16">
        {/* Section Header - Centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
        >
          {/* Section Label with Lines */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border max-w-[200px]" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-black/50 tracking-widest uppercase">
                {cities.sectionLabel}
              </span>
            </div>
            <div className="flex-1 h-px bg-border max-w-[200px]" />
          </div>

          {/* Headline */}
          <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter capitalize mb-4">
            {cities.headline}
          </h2>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed tracking-tighter">
            {cities.description}
          </p>
        </motion.div>

        {/* Cities Grid - 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={location.image}
                alt={`${location.city}, ${location.country}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content - Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                {/* City Name */}
                <h3 className="font-body text-xl md:text-3xl tracking-tighter font-normal text-white mb-1">
                  {location.city}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm line-clamp-2 leading-snug tracking-tighter">
                  {location.description}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
