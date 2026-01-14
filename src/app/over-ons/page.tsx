import PreHeader from "@/components/PreHeader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OverTeaser from "@/components/OverTeaser";
import ScrollReveal from "@/components/ScrollReveal";
import { brand } from "@/lib/brand";

export const metadata = {
  title: `Over ons • ${brand.name}`,
};

export default function OverOns() {
  return (
    <>
      <ScrollReveal />
      <PreHeader />
      <Navbar />
      <main>
        <OverTeaser />
      </main>
      <Footer />
    </>
  );
}
