"use client";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-dental-600">
              Remdani Dental
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#services"
              className="text-sm font-medium hover:text-dental-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-sm font-medium hover:text-dental-600 transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-dental-600 transition-colors"
            >
              Contact
            </a>
            <button className="mr-2">Login</button>
          </nav>
        </div>
      </div>
    </header>
  );
}
