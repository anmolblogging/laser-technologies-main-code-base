
import Hero from "../components/Hero";
import AboutSection from "../components/NoticeSection";
import CalendarSection from "../components/CalendarSection";

import StatsCounter from "../components/StatsCounter";
import VideoSection from "../components/VideoSection";
import ProductsSection from "../components/ProductsSection";

import Testimonial from "../components/Testimonial";
import Blog from "../components/Blog";
import Clients from "../components/Clients";
import Gallery from "../components/Gallery";
import IndustryCarousel2 from "../components/IndustryCarousel2";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Hero />
      <AboutSection />
      <ProductsSection />
      <CalendarSection />
      <IndustryCarousel2 />
      <StatsCounter />
      <VideoSection />
      <Blog />
      <Testimonial />
      <Clients />
      <Gallery />

    </div>
  );
}
export default Home;