import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OverTeaser from "@/components/OverTeaser";
import ServicesGrid from "@/components/ServicesGrid";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import ContactInline from "@/components/ContactInline";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollReveal from "@/components/ScrollReveal";

export default function Page() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />
      <Hero />
      <OverTeaser />
      <ServicesGrid />
      <Projects />
      <Testimonials />
      <ContactInline />
      <Footer />
      <ScrollToTop />
    </>
  );
}
