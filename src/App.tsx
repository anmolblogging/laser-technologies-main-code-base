import Hero from './components/Hero';
import NoticeSection from './components/NoticeSection';
import CalendarSection from './components/CalendarSection';
import IndustryCarousel from './components/IndustryCarousel';
import StatsCounter from './components/StatsCounter';
import VideoSection from './components/VideoSection';
import ProductsSection from './components/ProductsSection';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar/>
      <Hero />
      <NoticeSection />
      <ProductsSection />
      <CalendarSection />
      <IndustryCarousel />
      <StatsCounter />
      <VideoSection />
    </div>
  );
}

export default App;
