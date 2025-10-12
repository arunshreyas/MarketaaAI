import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Tutorial from "@/components/Tutorial";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Tutorial />
      <Navigation />
      <main>
        <Hero />
        <Features />
        <About />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
