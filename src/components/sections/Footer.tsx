"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import placeholderData from "@/data/placeholder.json";

const { footer } = placeholderData;

// Social Icons
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  twitter: TwitterIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

export function Footer() {
  return (
    <footer id="footer" className="relative">
      {/* Top CTA Section */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src={footer.cta.backgroundImage}
          alt="Luxury hotel exterior"
          fill
          className="object-cover object-center"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-primary/50" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 text-center px-6"
        >
          {/* Headline */}
          <h2 className="font-body tracking-tighter capitalize text-3xl md:text-4xl lg:text-6xl font-normal text-white mb-4 max-w-md mx-auto leading-[1]">
            {footer.cta.headline}
          </h2>

          {/* Subtitle */}
          <p className="text-white/80 mb-8 max-w-sm tracking-tighter mx-auto">
            {footer.cta.subtitle}
          </p>

          {/* CTA Button */}
          <Button
            asChild
            className="bg-white text-foreground hover:bg-white/90 rounded-none px-1.5 py-5 gap-3 text-base"
          >
            <a href={footer.cta.buttonHref} className="tracking-tighter pr-4 ">
              <span className="w-8 h-8 bg-primary flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
              {footer.cta.buttonLabel}
            </a>
          </Button>
        </motion.div>
      </section>

      {/* Bottom Footer Section */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="px-6 md:px-12 lg:px-16">
          {/* Main Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-0 mb-16">
            {/* Left Column - Nav Menu & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Nav Menu */}
              <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">{footer.navMenu.title}</p>
              <ul className="space-y-3 mb-10">
                {footer.navMenu.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white hover:text-primary transition-colors tracking-tighter text-xl font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">Follow us</p>
              <div className="flex items-center gap-4">
                {footer.socialLinks.map((social) => {
                  const Icon = iconMap[social.icon] || TwitterIcon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-primary transition-colors"
                      aria-label={social.name}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </motion.div>

            {/* Center Column - Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:px-12"
            >
              <p className="text-white/80 text-xl md:text-center mb-6 max-w-xs mx-auto tracking-tighter">
                {footer.newsletter.description}
              </p>

              {/* Newsletter Form */}
              <form className="flex items-center border-b border-white/20 pb-2">
                <input
                  type="email"
                  placeholder={footer.newsletter.placeholder}
                  className="flex-1 bg-transparent text-white placeholder:text-white/40 focus:outline-none py-2 tracking-tighter"
                />
                <button
                  type="submit"
                  className="text-white cursor-pointer hover:text-primary transition-colors tracking-tighter text-lg font-medium"
                >
                  {footer.newsletter.buttonText}
                </button>
              </form>
            </motion.div>

            {/* Right Column - Pages & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-right"
            >
              {/* Pages */}
              <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">{footer.pages.title}</p>
              <ul className="space-y-3 mb-10">
                {footer.pages.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white hover:text-primary transition-colors tracking-tighter text-xl font-medium"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Contact */}
              <p className="text-white/50 text-xs mb-4 tracking-widest uppercase">{footer.contact.title}</p>
              <div className="space-y-2">
                <p className="text-white tracking-tighter text-xl font-medium">{footer.contact.phone}</p>
                <p className="text-white tracking-tighter text-xl font-medium">{footer.contact.email}</p>
                <p className="text-white/70 text-sm tracking-tighter">{footer.contact.address}</p>
              </div>
            </motion.div>
          </div>

          {/* Large Brand Name */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative overflow-hidden"
          >
            <h2
              className="font-heading text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] xl:text-[340px] font-normal text-center leading-none tracking-tighter select-none"
              style={{
                background: "linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, rgba(26,26,26, 1) 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {footer.brand.name}
            </h2>
          </motion.div>
        </div>
      </section>
    </footer>
  );
}
