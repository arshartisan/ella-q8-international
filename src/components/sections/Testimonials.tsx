"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import placeholderData from "@/data/placeholder.json";

const { testimonials } = placeholderData;

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show 2 testimonials at a time
  const visibleCount = 2;
  const maxIndex = Math.max(0, testimonials.items.length - visibleCount);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleTestimonials = testimonials.items.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section
      id="testimonials"
      className="relative bg-muted/90 py-20 md:py-28 lg:py-32"
    >
      <div className="px-6 md:px-12 lg:px-16">
        {/* Main Grid - 3 columns */}
        <div className="grid lg:grid-cols-[1fr_1.2fr_1.2fr] gap-4">
          {/* Left Column - Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-between md:min-h-[400px]"
          >
            <div>
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-black/50 tracking-widest uppercase">
                  {testimonials.sectionLabel}
                </span>
              </div>

              {/* Headline */}
              <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter capitalize">
                {testimonials.headline}
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 mt-8">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={cn(
                  "w-12 h-12 rounded-ull cursor-pointer border border-border flex items-center justify-center transition-all duration-200",
                  currentIndex === 0
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "text-foreground hover:bg-primary hover:text-background"
                )}
                aria-label="Previous testimonials"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={cn(
                  "w-12 h-12 rounded-ull cursor-pointer border border-border flex items-center justify-center transition-all duration-200",
                  currentIndex >= maxIndex
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "text-foreground hover:bg-primary hover:text-background"
                )}
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Testimonial Cards */}
          <AnimatePresence mode="wait">
            {visibleTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="bg-background rounded-2l p-6 border border-border/30 flex flex-col justify-between min-h-[450px]"
              >
                {/* Quote Mark */}
                <div className="mb-6">
                  <svg
                    width="48"
                    height="40"
                    viewBox="0 0 48 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-muted-foreground/20"
                  >
                    <path
                      d="M0 40V24.8C0 20.2667 0.8 16.1333 2.4 12.4C4.08 8.58667 6.4 5.33333 9.36 2.64C12.4 -0.0533333 15.92 -0.746667 19.92 0.48L18.48 6.64C15.76 6.08 13.36 6.72 11.28 8.56C9.28 10.32 8.08 12.72 7.68 15.76H19.2V40H0ZM28.8 40V24.8C28.8 20.2667 29.6 16.1333 31.2 12.4C32.88 8.58667 35.2 5.33333 38.16 2.64C41.2 -0.0533333 44.72 -0.746667 48.72 0.48L47.28 6.64C44.56 6.08 42.16 6.72 40.08 8.56C38.08 10.32 36.88 12.72 36.48 15.76H48V40H28.8Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Quote Text */}
                <p className="text-foreground text-lg md:text-2xl leading-snug flex-grow tracking-tighter">
                  {testimonial.quote}
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/30">
                  {/* Avatar */}
                  <div className="relative w-16 h-16 rounded-g overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Name & Role */}
                  <div>
                    <p className="font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
