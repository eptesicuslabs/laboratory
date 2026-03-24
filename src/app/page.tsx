import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ResearchSection from "@/components/sections/ResearchSection";
import TeamSection from "@/components/sections/TeamSection";
import Footer from "@/components/layout/Footer";
import StartupOverlay from "@/components/visuals/StartupOverlay";

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen relative bg-[var(--bg-primary)]">
      <StartupOverlay />
      <div className="flex flex-col min-h-screen">
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
