import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
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
            className="flex flex-col items-center justify-between group "
            href="/"
          >
            <h1
              className={`text-2xl font-bold group-hover:[text-shadow:_0px_0px_3px_rgba(160, 44, 255, 0.5)] ${
                isScrolled
                  ? "text-[#8e1be7] group-hover:text-[#60109e] "
                  : "text-[#a02cff] group-hover:text-[#8e1be7]"
              }`}
              style={{
                fontFamily: '"Cinzel Decorative", serif',
              }}
            >
              RAMDANI
            </h1>
            <p
              className={`text-xl font-bold group-hover:[text-shadow:_0px_0px_3px_rgba(255,198,41,0.5)] ${
                isScrolled
                  ? "text-[#eab730] group-hover:text-[#cfa01a]"
                  : "text-[#ffc629] group-hover:text-[#eab730]"
              }`}
              style={{ fontFamily: "Fredoka, sans-serif" }}
            >
              DENTAL CENTER
            </p>
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
            <Link href="/auth/login">
              <Button
                className={`${
                  isScrolled
                    ? "hover:bg-gray-200 bg-gray-100"
                    : "bg-gray-200 hover:bg-white"
                } text-base text-black font-medium`}
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                className={` ${
                  isScrolled
                    ? "bg-dental-600 hover:bg-dental-700"
                    : "bg-dental-600 hover:bg-dental-500"
                } text-base font-medium`}
              >
                Sign Up
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
