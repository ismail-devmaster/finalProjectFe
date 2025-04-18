import { Button } from "@/components/ui/button"
import { Facebook, Instagram } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="w-full border-t bg-white dark:bg-gray-950 dark:border-gray-800 py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex justify-start mb-2">
              <Image
                src="/images/FullLogo.png"
                alt="Ramdani Dental Center Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Providing exceptional dental care with a focus on patient comfort and satisfaction.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold font-playfair">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <ul>
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
            </ul>
          </div>
          <div className="space-y-4 ">
            <h4 className="text-lg font-semibold font-playfair">Connect</h4>
            <div className="flex space-x-4 ">
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
         
        </div>
        <div className="mt-6 border-t dark:border-gray-800 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ramdani Dental Center. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

