import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ResearchSection from "@/components/sections/ResearchSection";
import TeamSection from "@/components/sections/TeamSection";
import Footer from "@/components/layout/Footer";
import GradientBackground from "@/components/ui/GradientBackground";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative">
      {/* Gradient Background */}
      <GradientBackground />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <ResearchSection />
        <TeamSection />
        <div className="flex-grow" />
        <Footer />
      </div>
    </main>
  );
}
