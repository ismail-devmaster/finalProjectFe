import { Button } from "@/components/ui-landingpage/button";
import { Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="w-full min-h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "white",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white animate-fadeIn">
              A Healthy Smile Starts Here
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Expert dental care for a confident, radiant smile. Book your
              appointment today!
            </p>
          </div>
          <div className="space-x-4">
            <Button className="bg-dental-600 hover:bg-dental-700 animate-float">
              <Calendar className="mr-2 h-4 w-4" />
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
