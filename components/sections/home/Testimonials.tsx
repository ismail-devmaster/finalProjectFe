import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Benali",
    text: "I've been a patient at Ramdani Dental Center for over 2 years. The staff is always friendly and professional. Dr. Ramdani took the time to explain my treatment options and made me feel comfortable throughout the procedure.",
    rating: 5,
  },
  {
    name: "Mohammed Kaci",
    text: "The dental implant procedure I had at Ramdani Dental Center was painless and the results are amazing. I can finally smile with confidence again. Highly recommended!",
    rating: 5,
  },
  {
    name: "Amina Hadj",
    text: "I was very nervous about my root canal, but the team at Ramdani Dental made the experience much better than expected. They were patient, gentle, and the follow-up care was excellent.",
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Patients Say</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">{testimonial.text}</p>
                <p className="font-semibold text-right">— {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

