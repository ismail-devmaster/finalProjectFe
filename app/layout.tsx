import type React from "react"
import "@/app/globals.css"
import { LanguageProvider } from "../components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Playfair_Display, Inter } from "next/font/google"
import { SmoothScroll } from "@/components/sections/home/smooth-scroll"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata = {
  title: "Ramdani Dental Center - Expert Dental Care in Blida",
  description:
    "Professional dental care services in Blida, Algeria. Specializing in general dentistry, cosmetic procedures, orthodontics, and more.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="ramdani-dental-theme"
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <SmoothScroll />
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

