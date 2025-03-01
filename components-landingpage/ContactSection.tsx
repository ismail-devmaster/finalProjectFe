import { Button } from "@/components-landingpage/ui/button";
import { Card, CardContent } from "@/components-landingpage/ui/card";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Contact Us
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We're here to help. Get in touch with us.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Phone className="h-12 w-12 text-dental-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-500">+1 (555) 123-4567</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Mail className="h-12 w-12 text-dental-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-500">contact@dentalclinic.com</p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm md:col-span-2 lg:col-span-1">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Clock className="h-12 w-12 text-dental-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Hours</h3>
              <p className="text-gray-500">Mon-Fri: 9am-6pm</p>
              <p className="text-gray-500">Sat: 9am-2pm</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12">
          <Card className="bg-white/50 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[2/1] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991641538527!2d2.2922926156744784!3d48.8583736792866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sEiffel%20Tower!5e0!3m2!1sen!2sfr!4v1647951371002!5m2!1sen!2sfr"
                  className="w-full h-full"
                  loading="lazy"
                  style={{ border: 0 }}
                  allowFullScreen
                >
                </iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
