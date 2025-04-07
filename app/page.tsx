"use client";
import { Navigation } from "@/components/sections/home/NavigationBar";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutSection } from "@/components/sections/home/AboutSection";
import { ServicesSection } from "@/components/sections/home/ServicesSection";
import { ContactSection } from "@/components/sections/home/ContactSection";
import { Footer } from "@/components/sections/home/FooterBar";
import { FaqSection } from "@/components/sections/home/FAQ";
import { GoToTop } from "@/components/sections/home/GoTop";
import { Testimonials } from "@/components/sections/home/Testimonials";
export default function Home(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
      
        <Testimonials />
        <ContactSection />
        <FaqSection/>
      </main>
      <Footer />
      <GoToTop/>
    </div>
  );
}
