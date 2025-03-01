import { Button } from "@/components-landingpage/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-white py-6">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About Us</h4>
            <p className="text-sm text-gray-500">
              Providing exceptional dental care with a focus on patient comfort
              and satisfaction.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <a href="#services" className="hover:text-dental-600">
                  Services
                </a>
              </li>
              <li>
                <a href="#book" className="hover:text-dental-600">
                  Book Appointment
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-dental-600">Contact</a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Newsletter</h4>
            <p className="text-sm text-gray-500">
              Subscribe to our newsletter for updates and dental care tips.
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border px-3 py-2 text-sm"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Dental Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
