// Site Configuration Types
export interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  accentColor: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  logo: {
    default: string;
    white: string;
    alt: string;
  };
  seo: SEO;
  theme: Theme;
}

// Navbar Types
export interface NavLink {
  name: string;
  href: string;
}

export interface NavbarConfig {
  logo: Logo;
  links: NavLink[];
}

// Hero Carousel Types
export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundColor: string;
  titleColor: string;
  subtitleColor: string;
}

export interface HeroCarouselConfig {
  autoplayInterval: number;
  slides: Slide[];
}

// About Types
export interface AboutStyle {
  brandColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface AboutConfig {
  brandName: string;
  brandNameSuffix: string;
  description: string;
  style: AboutStyle;
}

// Products Types
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface ProductsConfig {
  sectionTitle: string;
  items: Product[];
}

// Certificates Types
export interface Certificate {
  id: string;
  name: string;
  image: string;
}

export interface CenterLogo {
  src: string;
  alt: string;
  backgroundColor: string;
}

export interface CertificatesConfig {
  sectionTitle: string;
  description: string;
  centerLogo: CenterLogo;
  leftCertificates: Certificate[];
  rightCertificates: Certificate[];
}

// Memberships Types
export interface Membership {
  id: string;
  name: string;
  image?: string;
  gridClass?: string;
}

export interface MembershipsConfig {
  sectionTitle: string;
  items: Membership[];
}

// Testimonials Types
export interface TextTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export interface VideoTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  videoSrc: string;
  posterImage: string;
}

export interface TestimonialsDescription {
  highlight: string;
  text: string;
}

export interface TestimonialsConfig {
  headline: string;
  description: TestimonialsDescription;
  textTestimonials: TextTestimonial[];
  videoTestimonial: VideoTestimonial;
}

// FAQ Types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQConfig {
  headline: string;
  description: string;
  items: FAQItem[];
}

// Footer Types
export interface FooterLink {
  name: string;
  href: string;
}

export interface CTAButton {
  label: string;
  href: string;
  variant: "primary" | "outline";
}

export interface ContactInfo {
  address: string;
  phones: string[];
  email: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "facebook" | "instagram" | "linkedin" | "twitter";
}

export interface FooterLinkGroup {
  category: string;
  links: FooterLink[];
}

export interface FooterConfig {
  topNavLinks: FooterLink[];
  badge: string;
  headline: string;
  logo: CenterLogo;
  ctaButtons: CTAButton[];
  linkGroups: FooterLinkGroup[];
  contact: ContactInfo;
  socialLinks: SocialLink[];
}

// Main Placeholder Data Type
export interface PlaceholderData {
  site: SiteConfig;
  navbar: NavbarConfig;
  heroCarousel: HeroCarouselConfig;
  about: AboutConfig;
  products: ProductsConfig;
  certificates: CertificatesConfig;
  memberships: MembershipsConfig;
  testimonials: TestimonialsConfig;
  faq: FAQConfig;
  footer: FooterConfig;
}
