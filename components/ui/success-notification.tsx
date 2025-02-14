"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle } from "lucide-react"

interface SuccessNotificationProps {
  message: string
  onDismiss: () => void
}

export function SuccessNotification({ message, onDismiss }: SuccessNotificationProps) {
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
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-lg flex items-center">
            <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
            <p className="flex-grow">{message}</p>
            <button
              onClick={() => setIsVisible(false)}
              className="ml-4 text-green-700 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
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

