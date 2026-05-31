import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PressLogos from "@/components/PressLogos";
import ShopByNeed from "@/components/ShopByNeed";
import IngredientsMarquee from "@/components/IngredientsMarquee";
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
        <IngredientsMarquee />
        <BrandStory />
        <ExpertCredentials />
        <KnowledgeFounder />
        <Community />
      </main>
      <Footer />
    </>
  );
}
