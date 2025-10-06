import Hero from './components/Hero';
import NoticeSection from './components/NoticeSection';
import CalendarSection from './components/CalendarSection';
import IndustryCarousel from './components/IndustryCarousel';
import StatsCounter from './components/StatsCounter';
import VideoSection from './components/VideoSection';
import ProductsSection from './components/ProductsSection';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <NoticeSection />
      <CalendarSection />
      <IndustryCarousel />
      <StatsCounter />
      <VideoSection />
      <ProductsSection />
    </div>
  );
}

export default App;
