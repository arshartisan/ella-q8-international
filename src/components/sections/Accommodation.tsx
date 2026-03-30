"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Sparkles, ShieldCheck, ArrowUpRight, BedDouble, Bath, Wifi, CarFront, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import placeholderData from "@/data/placeholder.json";

const { accommodation } = placeholderData;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

const specIcons: Record<string, LucideIcon> = {
  "Total Rooms": BedDouble,
  "Bathrooms": Bath,
  "Internet": Wifi,
  "Covered Parking": CarFront,
};

export function Accommodation() {
  const [activeCategory, setActiveCategory] = useState(
    accommodation.categories[0]
  );

  const filteredRooms = accommodation.rooms.filter(
    (room) => room.category === activeCategory
  );

  return (
    <section id="accommodation" className="bg-background py-16 md:py-24 lg:py-28">
      <div className="px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Top: Label + Headline + Tagline */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase border border-border rounded-full text-muted-foreground">
                {accommodation.sectionLabel}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              className="font-heading text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-normal tracking-tighter leading-[1.1] text-foreground"
            >
              {accommodation.headline}
            </motion.h2>
          </div>
        </div>


        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="mb-10 md:mb-14"
        >
          <div className="bg-gray-50 flex items-center rounded-full border border-border/60 p-1.5">
            {accommodation.categories.map((category: string) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative flex-1 py-3 text-sm md:text-lg tracking-tighter transition-colors duration-200 cursor-pointer whitespace-nowrap text-center z-10",
                  activeCategory === category
                    ? "text-foreground font-medium"
                    : "text-muted-foreground font-normal hover:text-foreground/70"
                )}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="categoryPill"
                    className="absolute inset-0 bg-primary/80 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Room Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="space-y-6 md:space-y-8"
          >
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

interface RoomData {
  id: string;
  category: string;
  title: string;
  tagline: string;
  rating: number;
  price: string;
  priceNote: string;
  image: string;
  specs: Record<string, string>;
  highlights: { title: string; description: string }[];
}

function RoomCard({ room }: { room: RoomData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 bg-background border border-border/60 rounded-2xl md:rounded-3xl overflow-hidden">
      {/* Col 1: Image */}
      <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[350px] overflow-hidden bg-muted">
        <Image
          src={room.image}
          alt={room.title}
          fill
          className="object-cover"
        />
        {/* Rating badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-foreground/80 backdrop-blur-sm rounded-full">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-xs font-medium text-white">
            {room.rating}
          </span>
        </div>
      </div>

      {/* Col 2: Title + Tagline */}
      <div className="p-5 border-t md:border-t-0 md:border-l border-border/60 flex flex-col justify-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">
          Ella Q8 International
        </p>
        <h3 className="font-heading text-base md:text-2xl font-medium tracking-tight text-foreground mb-2 leading-snug">
          {room.tagline}
        </h3>
        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-auto cursor-pointer tracking-tighter">
          Meet the Host
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Col 3: Price + Specs */}
      <div className="p-5 border-t lg:border-t-0 lg:border-l border-border/60 flex flex-col justify-between">
        {/* Price */}
        <div className="mb-5">
          <p className="text-2xl md:text-5xl font-medium tracking-tight text-primary">
            {room.price}
            <span className="text-sm md:text-base font-normal text-muted-foreground">
              /night
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 tracking-tighter">
            {room.priceNote}
          </p>
        </div>

        {/* Specs table */}
        <div>
          <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
            Basic Information
          </p>
          <div className="space-y-2">
            {Object.entries(room.specs).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground tracking-tighter flex items-center gap-1.5">
                  {specIcons[key] && (() => { const Icon = specIcons[key]; return <Icon className="w-3.5 h-3.5 text-muted-foreground/70" strokeWidth={1.5} />; })()}
                  {key}
                </span>
                <span className="font-medium text-foreground tracking-tight">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Col 4: Highlights + CTA */}
      <div className="p-5 border-t lg:border-t-0 lg:border-l border-border/60 flex flex-col justify-between">
        <div className="space-y-8">
          {room.highlights.map((highlight, i) => (
            <div key={highlight.title}>
              <div className="flex items-center gap-2 mb-1">
                {i === 0 ? (
                  <ShieldCheck
                    className="w-4 h-4 text-foreground/70"
                    strokeWidth={1.5}
                  />
                ) : (
                  <Sparkles
                    className="w-4 h-4 text-foreground/70"
                    strokeWidth={1.5}
                  />
                )}
                <h4 className="text-base font-semibold text-foreground tracking-tight">
                  {highlight.title}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed tracking-tighter">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>

        {/* Book Now */}
        <motion.a
          href="#footer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="mt-5 flex items-center justify-center w-full py-3 bg-foreground text-background text-sm font-medium rounded-full hover:bg-primary transition-colors tracking-tighter"
        >
          Book Now
        </motion.a>
      </div>
    </div>
  );
}
