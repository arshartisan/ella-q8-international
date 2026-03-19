"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import placeholderData from "@/data/placeholder.json";

const { faq } = placeholderData;

export function FAQ() {
  // Allow multiple items to be open, start with first one open
  const [openItems, setOpenItems] = useState<string[]>([faq.items[0]?.id]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="relative">
      {/* Two-column background */}
      <div className="relative px-6 md:px-12 lg:px-16 py-20 md:py-28 lg:py-32">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column - Header & Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              {/* Section Label with Line */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary" />
                  <span className="text-xs text-black/50 tracking-widest uppercase">
                    {faq.sectionLabel}
                  </span>
                </div>
                {/* <div className="flex-1 h-px bg-border" /> */}
              </div>

              {/* Headline */}
              <h2 className="font-body text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter capitalize">
                {faq.headline}
              </h2>
            </div>

            {/* Contact Card - Bottom */}
            <div className="mt-12 lg:mt-0">
              {/* Image */}
              {/* <div className="relative w-24 h-24 overflow-hidden mb-4">
                <Image
                  src={faq.contactCard.image}
                  alt="Our concierge team"
                  fill
                  className="object-cover"
                />
              </div> */}

              {/* Text */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed tracking-tighter mb-4 max-w-xs">
                {faq.contactCard.text}
              </p>

              {/* CTA Button */}
              <Button
                asChild
                variant="outline"
                className="rounded-none p-6 border-foreground hover:bg-primary hover:border-primary tracking-tighter capitalize hover:text-background transition-colors"
              >
                <a href={faq.contactCard.cta.href}>{faq.contactCard.cta.label}</a>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-0 md:space-y-2 lg:col-span-2"
          >
            {faq.items.map((item, index) => {
              const isOpen = openItems.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={cn(
                    "border-b border-border/50",
                    index === 0 && "border-t"
                  )}
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full cursor-pointer py-6 flex items-start justify-between gap-4 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-body text-lg md:text-xl font-medium text-foreground pr-4 tracking-tighter">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "w-10 h-10 border border-border/50 flex items-center justify-center flex-shrink-0 transition-all duration-200",
                        isOpen
                          ? "bg-primary text-background"
                          : "bg-transparent text-foreground group-hover:border-foreground"
                      )}
                    >
                      {isOpen ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  {/* Answer - Animated */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-muted-foreground leading-relaxed pr-14 tracking-tighter text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
