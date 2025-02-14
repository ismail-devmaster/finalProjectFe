"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle } from "lucide-react"

interface ErrorNotificationProps {
  message: string
  onDismiss: () => void
}

export function ErrorNotification({ message, onDismiss }: ErrorNotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isVisible) {
      const dismissTimer = setTimeout(() => {
        onDismiss()
      }, 300) // Wait for exit animation to complete

      return () => clearTimeout(dismissTimer)
    }
  }, [isVisible, onDismiss])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-4 right-4 z-50 max-w-sm"
        >
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-lg flex items-center">
            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
            <p className="flex-grow">{message}</p>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 text-red-700 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="Dismiss notification"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

