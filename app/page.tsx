import rawData from "@/data/templates.json";
import type { AutoPulseTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { BookingSection } from "@/components/sections/BookingSection";

const templateData: AutoPulseTemplateData = rawData;
const sectionData = templateData.categories.Automotive.sections;
const servicesData = sectionData.Services?.variants?.AutomotiveServices1;
const bookingData = sectionData.Booking?.variants?.AutomotiveBooking1;

// The form's service list: every service of the Services list, then the form's own extra choices ("Other" …)
const serviceOptions = [...(servicesData?.items ?? []).map((item) => item.title), ...(bookingData?.extraServices ?? [])];

/*
  One landing page, sections in the order of the design. Each section's id (templates.json) matches the
  menu and footer links ("#about" → id="about"); every "Book" button leads to the booking form (#book).
*/
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.AutomotiveHero1} />
      <AboutSection data={sectionData.About?.variants?.AutomotiveAbout1} />
      <ServicesSection data={servicesData} />
      <WhySection data={sectionData.Why?.variants?.AutomotiveWhy1} />
      <ProcessSection data={sectionData.Process?.variants?.AutomotiveProcess1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.AutomotiveTestimonials1} />
      <FaqSection data={sectionData.Faq?.variants?.AutomotiveFaq1} />
      <ContactSection data={sectionData.Contact?.variants?.AutomotiveContact1} />
      <BookingSection data={bookingData} serviceOptions={serviceOptions} />
    </main>
  );
}
