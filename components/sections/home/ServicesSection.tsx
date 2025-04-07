import {
  Baby,
  Brush,
  Crown,
  HeartPulse,
  Scissors,
  Sparkles,
  Stethoscope,
  Wrench,
} from "lucide-react";
import { ServiceCard } from "@/components/ui/card-service";

const serviceCategories = [
  {
    title: "Dental Examinations & Diagnosis",
    description:
      "Comprehensive dental check-ups, digital X-rays, and oral health assessments.",
    icon: Stethoscope,
    services: [
      "Comprehensive dental and gum check-up",
      "Digital X-rays (Dental Radiography)",
      "Oral health assessment",
    ],
  },
  {
    title: "General Dental Care",
    description:
      "Professional cleaning, cavity treatments, and gum disease management.",
    icon: Brush,
    services: [
      "Teeth cleaning & tartar removal (Scaling & Polishing)",
      "Cavity treatment & aesthetic fillings",
      "Gum disease treatment (Gingivitis & Periodontitis treatment)",
    ],
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Enhance your smile with professional whitening, veneers, and smile makeovers.",
    icon: Sparkles,
    services: [
      "Teeth whitening",
      "Dental veneers",
      "Smile makeover (Teeth reshaping)",
    ],
  },
  {
    title: "Orthodontics",
    description:
      "Straighten your teeth with clear aligners, traditional braces, and bite correction treatments.",
    icon: HeartPulse,
    services: [
      "Invisible aligners (Clear aligners)",
      "Traditional metal braces",
      "Bite correction & misalignment treatment",
    ],
  },
  {
    title: "Dental Implants",
    description:
      "Replace missing teeth with permanent, natural-looking dental implants.",
    icon: Wrench,
    services: [
      "Dental implants placement",
      "Restoration of missing teeth",
    ],
  },
  {
    title: "Fixed & Removable Prosthetics",
    description:
      "Restore your smile with crowns, bridges, and dentures customized for you.",
    icon: Crown,
    services: [
      "Ceramic crowns & bridges",
      "Full & partial dentures",
    ],
  },
  {
    title: "Oral & Dental Surgery",
    description:
      "Specialized surgical procedures including extractions and bone grafting.",
    icon: Scissors,
    services: [
      "Tooth extraction",
      "Wisdom tooth surgery",
      "Bone grafting for implants",
    ],
  },
  {
    title: "Pediatric Dentistry",
    description:
      "Child-friendly dental care focused on prevention and healthy development.",
    icon: Baby,
    services: [
      "Dental check-ups & treatments for children",
      "Cavity prevention (Fissure sealants)",
      "Guided growth of teeth & jaws",
    ],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white to-dental-50" />
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Comprehensive dental care tailored to your needs
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
          {serviceCategories.map((category) => (
            <ServiceCard
              key={category.title}
              title={category.title}
              description={category.description}
              icon={category.icon}
              className="group cursor-pointer"
            >
              <ul className="mt-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {category.services.map((service, index) => (
                  <li
                    key={index}
                    className="text-sm text-gray-600 flex items-start"
                  >
                    <span className="text-dental-600 mr-2">•</span>
                    {service}
                  </li>
                ))}
              </ul>
            </ServiceCard>
          ))}
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <img
              src="/service.jpg"
              alt="Modern dental equipment"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">State-of-the-Art Facilities</h3>
            <p className="text-gray-600">
              Our clinic is equipped with the latest dental technology to
              provide you with the highest quality care. From digital X-rays to
              advanced sterilization systems, we ensure your safety and comfort
              throughout your visit.
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
