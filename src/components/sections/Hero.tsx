"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronDown, Calendar as CalendarIcon, Users, MapPin, Bed, Home, Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import placeholderData from "@/data/placeholder.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const { hero } = placeholderData;

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT },
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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.35,
        ease: EASE_OUT,
      }}
      className={`absolute items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/80 backdrop-blur-md text-white text-[10px] sm:text-sm tracking-tighter font-medium shadow-lg ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-primary" />
      {label}
    </motion.div>
  );
}

export function Hero() {
  const [room, setRoom] = useState(hero.bookingBar.defaultRoom);
  const [checkIn, setCheckIn] = useState<Date>(new Date(2025, 2, 15));
  const [checkOut, setCheckOut] = useState<Date>(new Date(2025, 2, 30));
  const [adults, setAdults] = useState(4);
  const [children, setChildren] = useState(0);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  return (
    <section
      id="hero"
      className="relative min-h-dvh w-full overflow-hidden "
      style={{
        backgroundImage: `url(${hero.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        objectFit: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Bottom gradient for smooth transition to next section */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" /> */}

      {/* Inset rounded border frame */}
      {/* <div className="absolute inset-2 sm:inset-3 md:inset-5 lg:inset-12 rounded-2xl sm:rounded-3xl md:rounded-[2rem] border-2 sm:border-3 border-white/40 z-10 pointer-events-none" /> */}

      <div className="relative z-10 flex flex-col justify-between min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 pt-28 sm:pt-28 md:pt-32 pb-4 sm:pb-6">
        {/* Headline */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center mb-6 md:mb-8"
        >
          <motion.h1
            variants={item}
            className="font-heading text-[2.2rem] sm:text-[clamp(2rem,5vw+0.75rem,5.5rem)] lg:text-[clamp(2.5rem,6vw+1rem,5rem)] font-semibold tracking-tighter leading-[1.05] text-white"
          >
            {hero.headline}{" "}
            <span className="text-white">{hero.headlineAccent}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 sm:mt-4 text-sm md:text-lg text-white/80 max-w-xs sm:max-w-md md:max-w-xl mx-auto leading-relaxed tracking-tighter"
          >
            {hero.description}
          </motion.p>
        </motion.div>

        {/* Middle content area with badges and info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: EASE_OUT,
          }}
          className="relative flex-1 mx-auto w-full max-w-6xl"
        >
          {/* Floating Badges */}
          <Badge
            label={hero.badges[0].label}
            delay={0.7}
            className="hidden sm:flex top-[20%] sm:top-[25%] right-[2%] sm:right-[8%] md:right-[15%] z-20"
          />
          <Badge
            label={hero.badges[1].label}
            delay={0.85}
            className="hidden sm:flex top-[45%] sm:top-[50%] left-[1%] sm:left-[3%] md:left-[8%] z-20"
          />
          <Badge
            label={hero.badges[2].label}
            delay={1.0}
            className="hidden sm:flex top-[50%] sm:top-[55%] right-[1%] sm:right-[3%] md:right-[8%] z-20"
          />

          {/* Map Circle - Bottom Left */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.35, ease: EASE_OUT }}
            className="absolute bottom-4 left-4 z-20 w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted"
          >
            <div className="w-full h-full relative">
              <div className="absolute inset-0 bg-[#e8e4d4] flex items-center justify-center">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              </div>
            </div>
          </motion.div> */}

          {/* Bottom overlay content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-6 md:pb-10 z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
              {/* Bottom text */}
              {/* <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4, ease: EASE_OUT }}
                className="text-white/90 text-xs md:text-sm max-w-xs md:max-w-sm leading-relaxed text-center md:text-left ml-24 md:ml-32"
              >
                {hero.bottomText}
              </motion.p> */}

              {/* Rating */}
              {/* <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.4, ease: EASE_OUT }}
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
              </motion.div> */}
            </div>
          </div>
        </motion.div>

        {/* Booking Bar */}
        <motion.div
          initial={{ opacity: 0, transform: "translateY(12px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{
            delay: 0.4,
            duration: 0.45,
            ease: EASE_OUT,
          }}
          className="relative z-20 mx-auto w-full max-w-4xl mt-4 sm:mt-6"
        >
          <div className="bg-card rounded-2xl lg:rounded-full shadow-xl border border-border/50 p-3 lg:p-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row items-stretch lg:items-center gap-1 lg:gap-0 lg:divide-x lg:divide-border">
              {/* Room Selector */}
              <Select value={room} onValueChange={setRoom}>
                <SelectTrigger className="flex items-center gap-3 w-full lg:flex-1 px-2 lg:pr-4 py-2 lg:py-0 border-0 shadow-none bg-transparent h-auto rounded-none focus:ring-0 focus-visible:ring-0 cursor-pointer [&>svg:last-child]:hidden">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Home className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-[9px] sm:text-[8px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {hero.bookingBar.roomLabel}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium text-foreground truncate">
                        <SelectValue />
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                    </div>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {hero.bookingBar.rooms.map((r: string) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Check-in */}
              <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 w-full lg:flex-1 px-2 lg:px-4 py-2 lg:py-0 text-left cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[8px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {hero.bookingBar.checkInLabel}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-medium text-foreground">
                          {format(checkIn, "dd MMM yyyy")}
                        </p>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(date) => {
                      if (date) {
                        setCheckIn(date);
                        if (date >= checkOut) {
                          const next = new Date(date);
                          next.setDate(next.getDate() + 1);
                          setCheckOut(next);
                        }
                        setCheckInOpen(false);
                      }
                    }}
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>

              {/* Check-out */}
              <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 w-full lg:flex-1 px-2 lg:px-4 py-2 lg:py-0 text-left cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[8px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {hero.bookingBar.checkOutLabel}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-medium text-foreground">
                          {format(checkOut, "dd MMM yyyy")}
                        </p>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(date) => {
                      if (date) {
                        setCheckOut(date);
                        setCheckOutOpen(false);
                      }
                    }}
                    disabled={(date) => date <= checkIn}
                  />
                </PopoverContent>
              </Popover>

              {/* Guests */}
              <Popover open={guestsOpen} onOpenChange={setGuestsOpen}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-3 w-full lg:flex-1 px-2 lg:px-4 py-2 lg:py-0 text-left cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                        {hero.bookingBar.guestsLabel}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-medium text-foreground">
                          {adults} Adult{adults !== 1 ? "s" : ""}
                          {children > 0 && `, ${children} Child${children !== 1 ? "ren" : ""}`}
                        </p>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64" align="start">
                  <div className="space-y-4">
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{hero.bookingBar.adultsLabel}</p>
                        <p className="text-xs text-muted-foreground">{hero.bookingBar.adultsAge}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          disabled={adults <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-4 text-center">{adults}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setAdults(Math.min(10, adults + 1))}
                          disabled={adults >= 10}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{hero.bookingBar.childrenLabel}</p>
                        <p className="text-xs text-muted-foreground">{hero.bookingBar.childrenAge}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          disabled={children <= 0}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-4 text-center">{children}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setChildren(Math.min(6, children + 1))}
                          disabled={children >= 6}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* CTA Button */}
              <div className="col-span-2 lg:col-span-1 w-full lg:w-auto lg:pl-4 mt-1 lg:mt-0">
                <motion.a
                  href={hero.bookingBar.cta.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  className="flex items-center justify-center w-full lg:w-auto px-6 py-3 bg-primary text-primary-foreground text-base font-semibold tracking-tighter rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap"
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
