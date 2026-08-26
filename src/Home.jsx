import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import FeaturesSection from "./FeaturesSection";
import CTASection from "./CTASection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="bg-[#F8FBF6] overflow-x-hidden">

        
        <HeroSection />
        <div className="-mt-16">
          <StatsSection />
        </div>
             <FeaturesSection />

        <CTASection />

      </main>
    </>
  );
}