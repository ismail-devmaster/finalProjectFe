
import { Stethoscope, Sparkles, Wrench, HeartPulse, Clock } from "lucide-react";
import { ServiceCard } from "./ui/card-service";

const services = [
  {
    title: "General Checkups",
    description: "Comprehensive dental examinations and preventive care to maintain your oral health.",
    icon: Stethoscope,
  },
  {
    title: "Teeth Whitening",
    description: "Professional whitening treatments for a brighter, more confident smile.",
    icon: Sparkles,
  },
  {
    title: "Dental Implants",
    description: "Permanent, natural-looking tooth replacements to restore your smile.",
    icon: Wrench,
  },
  {
    title: "Emergency Care",
    description: "24/7 emergency dental services when you need immediate attention.",
    icon: Clock,
  },
  {
    title: "Orthodontics",
    description: "Traditional braces and clear aligners for straighter teeth and better bite alignment.",
    icon: HeartPulse,
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-dental-50" />
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive dental care tailored to your needs
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1974&auto=format&fit=crop" 
              alt="Modern dental equipment" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">State-of-the-Art Facilities</h3>
            <p className="text-gray-600">
              Our clinic is equipped with the latest dental technology to provide you with the highest quality care. 
              From digital X-rays to advanced sterilization systems, we ensure your safety and comfort throughout your visit.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <HeartPulse className="h-5 w-5 text-dental-600 mr-2" />
                Advanced Diagnostic Equipment
              </li>
              <li className="flex items-center">
                <HeartPulse className="h-5 w-5 text-dental-600 mr-2" />
                Comfortable Treatment Rooms
              </li>
              <li className="flex items-center">
                <HeartPulse className="h-5 w-5 text-dental-600 mr-2" />
                Modern Sterilization Systems
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
