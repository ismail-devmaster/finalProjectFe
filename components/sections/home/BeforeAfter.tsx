"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BeforeAfterImageProps {
  beforeSrc: string
  afterSrc: string
  title: string
  description: string
}

const beforeAfterImages: BeforeAfterImageProps[] = [
  {
    beforeSrc: "/placeholder.png",
    afterSrc: "/placeholder.png",
    title: "Dental Implants",
    description: "Patient received dental implants to replace missing teeth, restoring both function and aesthetics.",
  },
  {
    beforeSrc: "/placeholder.png",
    afterSrc: "/placeholder.png",
    title: "Teeth Whitening",
    description: "Professional teeth whitening treatment that removed years of stains and discoloration.",
  },
  {
    beforeSrc: "/placeholder.png?height=400&width=600",
    afterSrc: "/placeholder.png?height=400&width=600",
    title: "Orthodontic Treatment",
    description: "Clear aligners were used to correct misalignment, resulting in a perfectly straight smile.",
  },
]

function BeforeAfterImage({ beforeSrc, afterSrc, title, description }: BeforeAfterImageProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
      const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100))
      setSliderPosition(percentage)
    }
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    const percentage = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percentage)
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 cursor-ew-resize"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
        >
          {/* Before image (full width) */}
          <div className="absolute inset-0">
            <img src={beforeSrc || "/placeholder.png"} alt="Before treatment" className="h-full w-full object-cover" />
          </div>

          {/* After image (clipped) */}
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
            <img
              src={afterSrc || "/placeholder.png"}
              alt="After treatment"
              className="h-full w-full object-cover"
              style={{ width: `${100 / (sliderPosition / 100)}%` }}
            />
          </div>

          {/* Slider control */}
          <div className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize" style={{ left: `${sliderPosition}%` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-lg flex items-center justify-center">
              <ChevronLeft className="h-4 w-4 text-blue-600" />
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 text-sm rounded">Before</div>
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 text-sm rounded">After</div>
        </div>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

export function BeforeAfterSection() {
  return (
    <section id="before-after" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Before & After</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See the transformative results of our dental treatments
            </p>
          </div>
        </div>

        <Tabs defaultValue="case-1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="case-1">Case 1</TabsTrigger>
            <TabsTrigger value="case-2">Case 2</TabsTrigger>
            <TabsTrigger value="case-3">Case 3</TabsTrigger>
          </TabsList>
          {beforeAfterImages.map((image, index) => (
            <TabsContent key={index} value={`case-${index + 1}`} className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <BeforeAfterImage {...image} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

