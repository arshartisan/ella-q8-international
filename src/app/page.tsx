import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedPlace } from "@/components/sections/FeaturedPlace";
import { Accommodation } from "@/components/sections/Accommodation";
import { TourPackages } from "@/components/sections/TourPackages";
import { Floor } from "@/components/sections/Floor";
import { WhyUs } from "@/components/sections/WhyUs";
import { Cities } from "@/components/sections/Cities";
import { Destinations } from "@/components/sections/Destinations";
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

      {/* Why Us Section */}
      <WhyUs />

      {/* Accommodation Section */}
      <Accommodation />

      {/* Tour Packages Section */}
      <TourPackages />

      {/* Destinations Map Section */}
      <Destinations />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      {/* <FAQ /> */}

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
