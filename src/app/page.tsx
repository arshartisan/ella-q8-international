import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedPlace } from "@/components/sections/FeaturedPlace";
import { Floor } from "@/components/sections/Floor";
import { WhyUs } from "@/components/sections/WhyUs";
import { Cities } from "@/components/sections/Cities";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Featured Place Section */}
      <FeaturedPlace />

      {/* Floor Section */}
      <Floor />

      {/* Why Us Section */}
      <WhyUs />

      {/* Cities Section */}
      <Cities />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
