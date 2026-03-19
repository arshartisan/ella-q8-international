"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LayoutGrid, Bed, Heart } from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { featuredPlace } = placeholderData;

export function FeaturedPlace() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="featured" className="relative bg-muted/30">
      {/* Section Header */}
      <div className="py-16 md:py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-body capitalize text-6xl font-medium tracking-tighter"
        >
          {featuredPlace.headline}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-muted-foreground tracking-tighter"
        >
          {featuredPlace.subtitle}
        </motion.p>
      </div>

      {/* Stacking Cards Container */}
      <div ref={containerRef} className="relative px-4 md:px-8 lg:px-16 pb-8">
        {featuredPlace.places.map((place, index) => (
          <PlaceCard
            key={place.id}
            place={place}
            index={index}
            totalCards={featuredPlace.places.length}
          />
        ))}
      </div>
    </section>
  );
}

interface PlaceCardProps {
  place: {
    id: string;
    title: string;
    description: string;
    image: string;
    size: string;
    type: string;
    style: string;
  };
  index: number;
  totalCards: number;
}

function PlaceCard({ place, index, totalCards }: PlaceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Calculate the top offset for stacking (each card sticks a bit lower)
  const topOffset = 100 + index * 20;

  // Scale down slightly as cards go behind
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 1 - (totalCards - index - 1) * 0.02]
  );

  return (
    <motion.div
      ref={cardRef}
      style={{
        top: `${topOffset}px`,
        scale,
      }}
      className="sticky mb-8 last:mb-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="bg-gray-50 border-6 border-white overflow-hidden shadow-lg shadow-black/5"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0">
          {/* Left Column - Content */}
          <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-between order-2 md:order-1">
            <div className="space-y-4">
              {/* Title */}
              <h3 className="font-body capitalize text-2xl md:text-3xl font-semibold tracking-tighter">
                {place.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md tracking-tighter">
                {place.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-8">
              {/* Size Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/5 px-2.5 py-1">
                <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                <span className="tracking-tighter">{place.size}</span>
              </div>

              {/* Type Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/5 px-2.5 py-1">
                <Bed className="w-4 h-4" strokeWidth={1.5} />
                <span className="tracking-tighter">{place.type}</span>
              </div>

              {/* Style Tag */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-black/5 px-2.5 py-1">
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                <span className="tracking-tighter">{place.style}</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[500px] order-1 md:order-2 lg:col-span-2">
            <Image
              src={place.image}
              alt={place.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
