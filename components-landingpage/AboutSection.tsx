import { Card, CardContent } from "@/components-landingpage/ui/card";
import { Award, Heart, Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              About Remdani Dental
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Your trusted partner in dental health, providing exceptional care
              with a gentle touch
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Heart className="h-12 w-12 text-dental-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-500">
                Providing exceptional dental care that transforms lives through
                healthy, beautiful smiles.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Award className="h-12 w-12 text-dental-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experience</h3>
              <p className="text-gray-500">
                Over 15 years of expertise in advanced dental procedures and
                patient care.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Users className="h-12 w-12 text-dental-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Team</h3>
              <p className="text-gray-500">
                Dedicated professionals committed to your comfort and dental
                health.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
