"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Users,
} from "lucide-react";
import Image from "next/image";
import placeholderData from "@/data/placeholder.json";

const { tourPackages } = placeholderData;

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

interface Tour {
  id: string;
  title: string;
  image: string;
  price: string;
  priceUnit: string;
  duration: string;
  meetingPoint: string;
  groupSize: string;
  tourType: string;
  schedule: string;
  level: string;
  languages: string;
  description: string;
}

export function TourPackages() {
  const tours = tourPackages.tours as Tour[];
  const totalSlides = tours.length;

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="tours" className="bg-background">
      {isDesktop ? (
        <DesktopCarousel tours={tours} />
      ) : (
        <MobileCarousel tours={tours} totalSlides={totalSlides} />
      )}
    </section>
  );
}

function DesktopCarousel({ tours }: { tours: Tour[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      setScrollRange(track.scrollWidth - track.clientWidth);
      setViewportHeight(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tours.length]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  const sectionHeight = scrollRange + viewportHeight;

  return (
    <div ref={sectionRef} style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-dvh flex flex-col justify-start pt-[clamp(1.5rem,4vh,3rem)] overflow-clip">
        <div className="px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto w-full">
          <Header />
        </div>

        <div className="mt-6 md:mt-8 min-h-0">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-5 pl-4 md:pl-8 lg:pl-[max(1rem,calc((100vw-1400px)/2+4rem))]"
          >
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
            <div className="shrink-0 w-8 md:w-16" />
          </motion.div>
        </div>

      </div>
    </div>
  );
}

function MobileCarousel({ tours, totalSlides }: { tours: Tour[]; totalSlides: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = useCallback((index: number) => {
    const container = mobileScrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  }, []);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const container = mobileScrollRef.current;
    if (!container) return;

    let scrollTimer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const children = Array.from(container.children) as HTMLElement[];
        let closestIndex = 0;
        let closestDist = Infinity;

        children.forEach((child, i) => {
          const dist = Math.abs(
            child.offsetLeft - container.offsetLeft - scrollLeft,
          );
          if (dist < closestDist) {
            closestDist = dist;
            closestIndex = i;
          }
        });

        setCurrentIndex(closestIndex);
      }, 50);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  return (
    <div className="py-16">
      <div className="px-4 max-w-[1400px] mx-auto">
        <Header />
      </div>

      <div className="mt-10">
        <div
          ref={mobileScrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-proximity pb-8 -mb-6 pl-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollPaddingLeft: "1rem" }}
        >
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} mobile />
          ))}
          <div className="shrink-0 w-4" />
        </div>
      </div>

      <div className="px-4 max-w-[1400px] mx-auto">
        <div className="flex items-center ml-auto justify-end gap-2 mt-8">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-4"
        >
          <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase border border-border rounded-full text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2" />
            {tourPackages.sectionLabel}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="font-heading text-[clamp(2rem,4vw+0.5rem,3.75rem)] font-normal tracking-tighter leading-[1.1] text-foreground"
        >
          {tourPackages.headline}
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
        className="flex items-center gap-2 shrink-0"
      >
        <motion.a
          href="#footer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-base tracking-tighter font-medium rounded-full hover:bg-foreground/90 transition-colors"
        >
          {tourPackages.seeAllLabel}
        </motion.a>
        <motion.a
          href="#footer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </div>
  );
}



function TourCard({ tour, mobile }: { tour: Tour; mobile?: boolean }) {
  return (
    <motion.div
      className={`${
        mobile
          ? "w-[90vw] snap-start"
          : "w-[calc(42vw-1rem)] min-w-[420px] max-w-[560px]"
      } shrink-0 group flex flex-col rounded-2xl md:rounded-3xl overflow-hidden border border-border/40 shadow-sm cursor-pointer`}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Arrow button */}
        <motion.a
          href="#footer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-foreground"
        >
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>

        {/* Bottom overlay: title + price */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-heading text-lg md:text-3xl font-medium tracking-tight text-white mb-1">
            {tour.title}
          </h3>
          <p className="text-white/80 text-base tracking-tighter">
            <span className="font-heading text-base md:text-xl font-medium text-white">
              {tour.price}
            </span>
            <span className="text-white/70">/ {tour.priceUnit}</span>
          </p>
        </div>
      </div>

      {/* Details Panel */}
      <div className="p-4 md:p-3 bg-background border-t border-border/40">
        {/* Quick info */}
        <div className="space-y-3 md:space-y-2 mb-5 md:mb-3 tracking-tighter">
          <div className="flex items-center gap-3 text-base text-foreground">
            <Clock
              className="w-4 h-4 text-muted-foreground shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-muted-foreground">{tourPackages.labels.duration}</span>
            <span className="font-medium ml-auto">{tour.duration}</span>
          </div>
          <div className="flex items-center gap-3 text-base text-foreground">
            <MapPin
              className="w-4 h-4 text-muted-foreground shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-muted-foreground">{tourPackages.labels.meetingPoint}</span>
            <span className="font-medium ml-auto">{tour.meetingPoint}</span>
          </div>
          <div className="flex items-center gap-3 text-base text-foreground">
            <Users
              className="w-4 h-4 text-muted-foreground shrink-0"
              strokeWidth={1.5}
            />
            <span className="text-muted-foreground">{tourPackages.labels.groupSize}</span>
            <span className="font-medium ml-auto">{tour.groupSize}</span>
          </div>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:gap-y-2 mb-6 md:mb-3 pt-5 md:pt-3 border-t border-border/40">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">
              {tourPackages.labels.tourType}
            </p>
            <p className="text-base font-medium text-foreground">
              {tour.tourType}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">
              {tourPackages.labels.schedule}
            </p>
            <p className="text-base font-medium text-foreground">
              {tour.schedule}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">
              {tourPackages.labels.level}
            </p>
            <p className="text-base font-medium text-foreground">
              {tour.level}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-0.5">
              {tourPackages.labels.languages}
            </p>
            <p className="text-base font-medium text-foreground">
              {tour.languages}
            </p>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="pt-5 md:pt-3 border-t border-border/40 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-2xl md:text-3xl font-semibold tracking-tighter text-foreground mb-4">
            {tour.price}
            <span className="text-base font-normal text-muted-foreground">
              / {tour.priceUnit}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <motion.a
              href="#footer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center px-6 py-2.5 bg-foreground text-background text-base tracking-tighter font-medium rounded-full hover:bg-foreground/90 transition-colors"
            >
              {tourPackages.bookTourLabel}
            </motion.a>
            <motion.a
              href="#footer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
