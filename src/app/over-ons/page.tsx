import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OverTeaser from "@/components/OverTeaser";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata = { title: "Over ons • Klusdam" };

export default function OverOns() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />
      <OverTeaser />
      <Footer />
    </>
  );
}
