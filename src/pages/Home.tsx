
import { Suspense, lazy } from "react";

import Hero from "../components/Hero";
import AboutSection from "../components/NoticeSection";
import CalendarSection from "../components/CalendarSection";
import ProductsSection from "../components/ProductsSection";

const StatsCounter = lazy(() => import("../components/StatsCounter"));
const VideoSection = lazy(() => import("../components/VideoSection"));
const Testimonial = lazy(() => import("../components/Testimonial"));
const Blog = lazy(() => import("../components/Blog"));
const Clients = lazy(() => import("../components/Clients"));
const Gallery = lazy(() => import("../components/Gallery"));
const IndustryCarousel2 = lazy(() => import("../components/IndustryCarousel2"));

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Hero />
      <AboutSection />
      <ProductsSection />
      <CalendarSection />
      
      <Suspense fallback={<div className="h-96 bg-gray-50 mb-12" />}>
        <IndustryCarousel2 />
        <StatsCounter />
        <div className="hidden md:block">
          <VideoSection />
        </div>
        <div className="sm:-pt-20 lg:mt-0">
            <Blog />
        </div>
        <Testimonial />
        <Clients />
        <Gallery />
      </Suspense>
    </div>
  );
}
export default Home;