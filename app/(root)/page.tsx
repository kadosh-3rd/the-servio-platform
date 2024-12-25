import { DemoCTA } from "@/components/demo-cta";
import { FAQ } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Newsletter } from "@/components/newsletter";
import { Pricing } from "@/components/pricing";
import { Testimonials } from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <Pricing />
      <DemoCTA />
      <Newsletter />
    </>
  );
}
