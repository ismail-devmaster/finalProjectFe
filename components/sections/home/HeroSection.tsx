"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ParticlesBackground } from "../../particles"

export function HeroSection() {
  const { t } = useLanguage()

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking")
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="absolute inset-0 opacity-30">
        <ParticlesBackground />
      </div>
      <div className="container px-4 md:px-6 relative z-20">
        <div className="flex flex-col items-center space-y-6 text-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter font-playfair sm:text-4xl md:text-5xl lg:text-6xl/none text-white animate-fadeIn">
              {t("hero.title")}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("hero.subtitle")}
            </p>
          </div>
          <div>
            <Button
              className="bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 animate-float text-white"
              onClick={scrollToBooking}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {t("hero.button")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

