"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr" | "ar"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "nav.services": "Services",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "hero.title": "A Healthy Smile Starts Here",
    "hero.subtitle": "Expert dental care for a confident, radiant smile. Book your appointment today!",
    "hero.button": "Book Appointment",
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive dental care tailored to your needs",
    "about.title": "About Ramdani Dental",
    "about.subtitle": "Your trusted partner in dental health, providing exceptional care with a gentle touch",
    "testimonials.title": "What Our Patients Say",
    "faq.title": "Frequently Asked Questions",
    "booking.title": "Book Your Appointment",
    "contact.title": "Contact Us",
    "contact.subtitle": "We're here to help. Get in touch with us.",
    "auth.title": "Login or Register",
    "auth.subtitle": "Access your patient portal or staff dashboard",
    // Add more translations as needed
  },
  fr: {
    "nav.services": "Services",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.signup": "S'inscrire",
    "hero.title": "Un Sourire Sain Commence Ici",
    "hero.subtitle":
      "Des soins dentaires experts pour un sourire confiant et radieux. Prenez rendez-vous aujourd'hui !",
    "hero.button": "Prendre Rendez-vous",
    "services.title": "Nos Services",
    "services.subtitle": "Des soins dentaires complets adaptés à vos besoins",
    "about.title": "À Propos de Ramdani Dental",
    "about.subtitle":
      "Votre partenaire de confiance en santé dentaire, offrant des soins exceptionnels avec une touche délicate",
    "testimonials.title": "Ce Que Disent Nos Patients",
    "faq.title": "Questions Fréquemment Posées",
    "booking.title": "Prenez Rendez-vous",
    "contact.title": "Contactez-nous",
    "contact.subtitle": "Nous sommes là pour vous aider. Contactez-nous.",
    "auth.title": "Connexion ou Inscription",
    "auth.subtitle": "Accédez à votre portail patient ou tableau de bord du personnel",
    // Add more translations as needed
  },
  ar: {
    "nav.services": "الخدمات",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.login": "تسجيل الدخول",
    "nav.signup": "التسجيل",
    "hero.title": "ابتسامة صحية تبدأ هنا",
    "hero.subtitle": "رعاية الأسنان الخبيرة لابتسامة واثقة ومشرقة. احجز موعدك اليوم!",
    "hero.button": "حجز موعد",
    "services.title": "خدماتنا",
    "services.subtitle": "رعاية شاملة للأسنان مصممة لتلبية احتياجاتك",
    "about.title": "عن رمضاني دنتال",
    "about.subtitle": "شريكك الموثوق في صحة الأسنان، نقدم رعاية استثنائية بلمسة لطيفة",
    "testimonials.title": "ماذا يقول مرضانا",
    "faq.title": "الأسئلة المتكررة",
    "booking.title": "احجز موعدك",
    "contact.title": "اتصل بنا",
    "contact.subtitle": "نحن هنا للمساعدة. تواصل معنا.",
    "auth.title": "تسجيل الدخول أو التسجيل",
    "auth.subtitle": "الوصول إلى بوابة المريض أو لوحة تحكم الموظفين",
    // Add more translations as needed
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string) => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

