"use client";
"ssr:false";
import { Navigation } from "@/sections/landingpage/Navigation";
import Hero from "@/sections/landingpage/Hero";
import About from "@/sections/landingpage/About";
import Services from "@/sections/landingpage/Services";
import Contact from "@/sections/landingpage/Contact";
import Footer from "@/sections/landingpage/Footer";
import "./app.css";

import "./index.css";
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
