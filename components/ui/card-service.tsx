"use client"

import type React from "react"

import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  children?: React.ReactNode
  className?: string
}

export function ServiceCard({ title, description, icon: Icon, children, className }: ServiceCardProps) {
  return (
    <div className={`h-[320px] perspective-1000 group ${className}`} tabIndex={0} role="button">
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: 0 }}
        whileHover={{ rotateY: 180 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden rounded-lg border bg-card text-card-foreground shadow-sm dark:border-gray-800">
          <div className="p-6 pb-0">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">{title}</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400 mt-4">{description}</p>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rounded-lg border bg-card text-card-foreground shadow-sm dark:border-gray-800 rotate-y-180 p-6 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4 text-center">{title}</h3>
          <div className="space-y-2">{children}</div>
        </div>
      </motion.div>
    </div>
  )
}

