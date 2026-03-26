import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Capabilities from "@/components/Capabilities";
import CaseStudy from "@/components/CaseStudy";
import TechStack from "@/components/TechStack";
import Differentiator from "@/components/Differentiator";
import CtaSection from "@/components/CtaSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <HowItWorks />
      <Capabilities />
      <CaseStudy />
      <TechStack />
      <Differentiator />
      <CtaSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
