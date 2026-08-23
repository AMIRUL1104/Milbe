import Categories from "./Categories";
import CTASection from "./CTASection";
import FAQ from "./FAQ";
import FeaturedBooks from "./FeaturedBooks";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />

      <FeaturedBooks />

      <HowItWorks />

      <Categories />

      <FAQ />

      <CTASection />
    </main>
  );
}