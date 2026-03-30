"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import placeholderData from "@/data/placeholder.json";

const SrilankaMap = dynamic(() => import("@react-map/srilanka"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
    </div>
  ),
});

const { destinations } = placeholderData;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

interface Place {
  id: string;
  name: string;
  type: string;
  district: string;
  description: string;
  image: string;
  mapX: number;
  mapY: number;
  highlight?: boolean;
}

export function Destinations() {
  const places = destinations.places as Place[];

  const [activePlace, setActivePlace] = useState<Place>(
    places.find((p) => p.highlight) || places[0]
  );

  // Build a district-to-place lookup for map clicks
  const districtMap = useMemo(() => {
    const map: Record<string, Place> = {};
    places.forEach((place) => {
      // First match wins (for districts with multiple places like Badulla)
      if (!map[place.district]) {
        map[place.district] = place;
      }
    });
    return map;
  }, [places]);

  const handleMapSelect = (district: string | null) => {
    if (!district) return;
    const match = districtMap[district];
    if (match) {
      setActivePlace(match);
    }
  };

  return (
    <section
      id="destinations"
      className="bg-background py-16 md:py-24 lg:py-28"
    >
      <div className="px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mb-4"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase border border-border rounded-full text-muted-foreground">
                {destinations.sectionLabel}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              className="font-heading text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-normal tracking-tight leading-[1.1] text-foreground"
            >
              {destinations.headline}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="text-foreground/70 text-sm md:text-base max-w-md lg:text-right leading-relaxed tracking-tight"
          >
            {destinations.tagline}
          </motion.p>
        </div>

        {/* Map + Place List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 md:gap-8"
        >
          {/* Map */}
          <div className="relative rounded-2xl md:rounded-3xl bg-muted/40 border border-border/50 p-6 md:p-8 flex items-center justify-center min-h-[400px] md:min-h-[520px]">
            <div className="relative w-full max-w-[320px] md:max-w-[360px]">
              <SrilankaMap
                type="select-single"
                size={360}
                mapColor="#e8e5e0"
                strokeColor="#c4c0b8"
                strokeWidth={1}
                hoverColor="#c9a962"
                selectColor="#1a1a1a"
                hints={true}
                hintTextColor="#ffffff"
                hintBackgroundColor="#1a1a1a"
                hintPadding="6px 12px"
                hintBorderRadius={8}
                onSelect={handleMapSelect}
              />

              {/* Marker overlays */}
              {places.map((place) => {
                const isActive = place.id === activePlace.id;
                return (
                  <button
                    key={`marker-${place.id}`}
                    onClick={() => setActivePlace(place)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer group/marker"
                    style={{
                      left: `${place.mapX}%`,
                      top: `${place.mapY}%`,
                    }}
                  >
                    {/* Pulse ring for active */}
                    {isActive && (
                      <span className="absolute inset-0 -m-3">
                        <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                      </span>
                    )}

                    {/* Marker pin */}
                    <motion.div
                      animate={{
                        scale: isActive ? 1 : 0.75,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-full border-2 transition-colors ${
                        isActive
                          ? "bg-foreground border-foreground scale-100"
                          : "bg-background border-foreground/40 group-hover/marker:border-foreground/70"
                      }`}
                    >
                      <span
                        className={`block w-2 h-2 rounded-full transition-colors ${
                          isActive
                            ? "bg-background"
                            : "bg-foreground/40 group-hover/marker:bg-foreground/70"
                        }`}
                      />
                    </motion.div>

                    {/* Label tooltip */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, y: 4, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 4, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2.5 py-1 bg-foreground text-background text-[10px] font-medium tracking-wide rounded-md whitespace-nowrap pointer-events-none"
                        >
                          {place.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Place List + Active Detail */}
          <div className="flex flex-col">
            {/* Active Place Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePlace.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="rounded-2xl md:rounded-3xl bg-foreground text-background overflow-hidden mb-4 md:mb-5"
              >
                {/* Image */}
                <div className="relative h-40 md:h-48 w-full overflow-hidden">
                  <Image
                    src={activePlace.image}
                    alt={activePlace.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/30 to-transparent" />

                  <motion.a
                    href="#footer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                    }}
                    className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-background text-foreground shrink-0"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.a>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 -mt-10 relative">
                  <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-background/50">
                    {activePlace.type}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-medium tracking-tight mt-1 mb-3">
                    {activePlace.name}
                  </h3>
                  <p className="text-background/70 text-sm leading-relaxed tracking-tight max-w-sm">
                    {activePlace.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Place List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-2.5">
              {places.map((place, i) => {
                const isActive = place.id === activePlace.id;
                return (
                  <motion.button
                    key={place.id}
                    onClick={() => setActivePlace(place)}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.05,
                      ease: EASE_OUT,
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors cursor-pointer ${
                      isActive
                        ? "bg-muted/70 border border-border/60"
                        : "hover:bg-muted/40 border border-transparent"
                    }`}
                  >
                    <MapPin
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                      strokeWidth={1.5}
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-medium tracking-tight truncate ${
                          isActive
                            ? "text-foreground"
                            : "text-foreground/80"
                        }`}
                      >
                        {place.name}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {place.type}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
