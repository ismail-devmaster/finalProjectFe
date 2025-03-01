"use client";
import { Navigation } from "@/components/sections/landingpage/Navigation";
import Hero from "@/components/sections/landingpage/Hero";
import About from "@/components/sections/landingpage/About";
import Services from "@/components/sections/landingpage/Services";
import Contact from "@/components/sections/landingpage/Contact";
import Footer from "@/components/sections/landingpage/Footer";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
