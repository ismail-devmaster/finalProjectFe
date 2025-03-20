"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/components/language-provider"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navLinks = [
    { href: "services", text: t("nav.services") },
    { href: "about", text: t("nav.about") },
    { href: "before-after", text: "Before & After" },
    { href: "contact", text: t("nav.contact") },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className={`text-2xl md:text-3xl font-bold font-playfair ${
              isScrolled
                ? "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                : "text-blue-500 dark:text-blue-300 hover:text-blue-400 dark:hover:text-blue-200"
            }`}
          >
            Ramdani Dental Center
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`font-medium text-base ${
                  !isScrolled
                    ? "text-white dark:text-gray-200 hover:[text-shadow:_0px_0px_5px_rgba(255,255,255,0.5)]"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-300 hover:[text-shadow:_0px_0px_5px_rgba(59,130,246,0.2)]"
                }`}
              >
                {link.text}
              </button>
            ))}
            <div className="flex items-center space-x-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
            <Link href="/auth/login">
              <Button
                className={`${
                  isScrolled
                    ? "hover:bg-gray-200 dark:hover:bg-gray-700 bg-gray-100 dark:bg-gray-800"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600"
                } text-base text-black dark:text-white font-medium`}
              >
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                className={`${
                  isScrolled
                    ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                    : "bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
                } text-base font-medium`}
              >
                {t("nav.signup")}
              </Button>
            </Link>
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => {
                        scrollToSection(link.href);
                        (document.querySelector("[data-radix-collection-item]") as HTMLElement)?.click();
                      }}
                      className="text-lg font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {link.text}
                    </button>
                  ))}
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                      {t("nav.signup")}
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

