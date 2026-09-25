import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { ModelsCatalog } from "@/components/landing/ModelsCatalog";
import { ProductPreview } from "@/components/landing/ProductPreview";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { Pricing } from "@/components/landing/Pricing";
import { Faq } from "@/components/landing/Faq";
import { Testimonials } from "@/components/landing/Testimonials";

export default function Home() {
  return (
    <div id="top" className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Features />
        <ModelsCatalog />
        <ProductPreview />
        <WhyChoose />
        <Pricing />
        <Faq />
        <Testimonials />
      </main>
    </div>
  );
}