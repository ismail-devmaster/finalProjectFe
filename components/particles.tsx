"use client"

import { useCallback, useEffect, useState } from "react"
import { Particles } from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Container, Engine } from "tsparticles-engine"
import { useTheme } from "next-themes"

export function ParticlesBackground() {
  const [isClient, setIsClient] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setIsClient(true)
  }, [])

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // console.log(container)
  }, [])

  if (!isClient) return null

  return (
    <Particles
      className="absolute inset-0 z-10 pointer-events-none"
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: { enable: false },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              links: {
                opacity: 0.8,
              },
            },
          },
        },
        particles: {
          color: {
            value: isDark ? "#4d7fff" : "#ffffff",
          },
          links: {
            color: isDark ? "#4d7fff" : "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.9,
            width: 2,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.8,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1800,
            },
            value: 40,
          },
          opacity: {
            value: 0.25,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
          wobble: {
            enable: true,
            distance: 5,
            speed: 2,
          },
        },
        detectRetina: true,
      }}
    />
  )
}

