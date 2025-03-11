import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", text: "Services" },
    { href: "#about", text: "About" },
    { href: "#contact", text: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="/"
            className={`text-3xl font-bold  ${
              isScrolled
                ? "text-dental-600 hover:text-dental-700"
                : "text-dental-500 hover:text-dental-400"
            }`}
          >
            Remdani Dental
          </a>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={` font-medium text-base ${
                  !isScrolled
                    ? "text-white hover:[text-shadow:_0px_0px_5px_rgba(255,255,255,0.5)]"
                    : "hover:text-dental-800 hover:[text-shadow:_0px_0px_5px_rgba(250,132,199,0.2)]"
                }`}
              >
                {link.text}
              </a>
            ))}
            <Button
              variant="outline"
              className={`text-base  ${
                isScrolled ? "hover:bg-gray-100" : "bg-gray-200 hover:bg-white"
              } font-medium mr-2`}
            >
              Login
            </Button>
            <Button
              className={` ${
                isScrolled
                  ? "bg-dental-600 hover:bg-dental-700"
                  : "bg-dental-600 hover:bg-dental-500"
              } text-base font-medium`}
            >
              Sign Up
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
