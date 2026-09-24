import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { Features } from "@/components/landing/Features";
import { ModelsCatalog } from "@/components/landing/ModelsCatalog";
import { ProductPreview } from "@/components/landing/ProductPreview";

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
      </main>
    </div>
  );
}