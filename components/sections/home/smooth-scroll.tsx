"use client"

import { useEffect } from "react"

export function SmoothScroll() {
  useEffect(() => {
    // Add smooth scrolling to all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]')

    const handleClick = (e: Event) => {
      e.preventDefault()
      const target = e.currentTarget as HTMLAnchorElement
      const targetId = target.getAttribute("href")

      if (targetId && targetId !== "#") {
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }

    internalLinks.forEach((link) => {
      link.addEventListener("click", handleClick)
    })

    return () => {
      internalLinks.forEach((link) => {
        link.removeEventListener("click", handleClick)
      })
    }
  }, [])

  return null
}

