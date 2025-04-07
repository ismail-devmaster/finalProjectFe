import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          </div>
        </div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">
                How often should I visit the dentist?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                We recommend visiting the dentist every 6 months for a regular check-up and professional cleaning.
                However, if you have specific dental issues, your dentist may recommend more frequent visits.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">
                What should I do in case of a dental emergency?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                In case of a dental emergency such as severe pain, broken tooth, or injury, contact our emergency line
                immediately at +213 5 41 93 09 17. We offer emergency appointments to address urgent dental issues.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">Do you accept dental insurance?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                Yes, we work with most major dental insurance providers. Please contact our office with your insurance
                details, and we'll be happy to verify your coverage before your appointment.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">What payment methods do you accept?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                We accept various payment methods including cash, credit/debit cards, and bank transfers. We also offer
                flexible payment plans for extensive treatments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left font-medium">
                How long does a dental implant procedure take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                The dental implant process typically takes 3-6 months from start to finish. This includes the initial
                consultation, implant placement surgery, healing period, and final restoration placement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger className="text-left font-medium">Is teeth whitening safe?</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                Yes, professional teeth whitening performed by our dental professionals is safe. We use high-quality
                products and customize the treatment to ensure optimal results with minimal sensitivity.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}

