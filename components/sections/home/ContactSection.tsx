import { Card, CardContent } from "@/components/ui/card"
import { Clock, Mail, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact Us</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're here to help. Get in touch with us.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Phone className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-500 dark:text-gray-400">+213 5 41 93 09 17</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Mail className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-500 dark:text-gray-400">ramdanidentalcenter@gmail.com</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-500 dark:text-gray-400">Sun-Thu: 9am-4pm</p>
              <p className="text-gray-500 dark:text-gray-400">Sat: 9am-2pm</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[2/1] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1288.3903746345609!2d2.8527784!3d36.4961343!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sar!2sdz!4v1742107248442!5m2!1sar!2sdz"
                  className="w-full h-full"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

