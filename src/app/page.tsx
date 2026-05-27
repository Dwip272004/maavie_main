import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressLogos from "@/components/PressLogos";
import ShopByNeed from "@/components/ShopByNeed";
import OurIngredients from "@/components/OurIngredients";
import Testimonials from "@/components/Testimonials";
import BestSellers from "@/components/BestSellers";
import BrandStory from "@/components/BrandStory";
import ExpertCredentials from "@/components/ExpertCredentials";
import FounderQuote from "@/components/FounderQuote";
import Community from "@/components/Community";
import BundlePromo from "@/components/BundlePromo";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <PressLogos />
        <ShopByNeed />
        <OurIngredients />
        <Testimonials />
        <BestSellers />
        <BrandStory />
        <ExpertCredentials />
        <FounderQuote />
        <Community />
        <BundlePromo />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
