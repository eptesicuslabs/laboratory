import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ResearchSection from "@/components/sections/ResearchSection";
import ResearchPosts from "@/components/sections/ResearchPosts";
import TeamSection from "@/components/sections/TeamSection";
import Footer from "@/components/layout/Footer";
import StartupOverlay from "@/components/visuals/StartupOverlay";
import EcholocationPulse from "@/components/visuals/EcholocationPulse";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative bg-[var(--bg-primary)]">
      <StartupOverlay />
      <EcholocationPulse />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <ResearchSection />
        <ResearchPosts />
        <TeamSection />
        <div className="flex-grow" />
        <Footer />
      </div>
    </main>
  );
}
