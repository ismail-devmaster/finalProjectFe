"use client";
import { Navigation } from "@/components-landingpage/NavigationBar";
import { HeroSection } from "@/components-landingpage/HeroSection";
import { AboutSection } from "@/components-landingpage/AboutSection";
import { ServicesSection } from "@/components-landingpage/ServicesSection";
import { ContactSection } from "@/components-landingpage/ContactSection";
import { Footer } from "@/components-landingpage/FooterBar";
export default function Home(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
