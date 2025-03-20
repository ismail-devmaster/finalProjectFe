import { Button } from "@/components/ui/button"
import { Facebook, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-950 dark:border-gray-800 py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">About Us</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Providing exceptional dental care with a focus on patient comfort and satisfaction.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Services
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/p/Ramdani-dental-center-100028732556438/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </a>
              <a href="https://www.instagram.com/ramdani_dental_center/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Button>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Newsletter</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subscribe to our newsletter for updates and dental care tips.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border dark:border-gray-700 dark:bg-gray-800 px-3 py-2 text-sm"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t dark:border-gray-800 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ramdani Dental Center. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

