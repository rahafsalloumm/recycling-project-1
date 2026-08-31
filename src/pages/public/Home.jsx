import Navbar from "../../components/layout/Navbar";
import HeroSection from "../../components/home/HeroSection";
import StatsSection from "../../components/home/StatsSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import CTASection from "../../components/home/CTASection";

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