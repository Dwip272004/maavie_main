import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressLogos from "@/components/PressLogos";
import ShopByNeed from "@/components/ShopByNeed";
import Testimonials from "@/components/Testimonials";
import BestSellers from "@/components/BestSellers";
import BrandStory from "@/components/BrandStory";
import ExpertCredentials from "@/components/ExpertCredentials";
import KnowledgeFounder from "@/components/KnowledgeFounder";
import Community from "@/components/Community";
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
        <Testimonials />
        <BestSellers />
        <BrandStory />
        <ExpertCredentials />
        <KnowledgeFounder />
        <Community />
      </main>
      <Footer />
    </>
  );
}
