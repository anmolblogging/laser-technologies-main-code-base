import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import NoticeSection from './components/NoticeSection'
import CalendarSection from './components/CalendarSection'
import IndustryCarousel from './components/IndustryCarousel'
import StatsCounter from './components/StatsCounter'
import VideoSection from './components/VideoSection'
import ProductsSection from './components/ProductsSection'
import Navbar from './components/Navbar'
import Testimonial from './components/Testimonial'
import Blog from './components/Blog'
import Producttemplate from './components/Producttemplate'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import IndustryCarousel2 from './components/IndustryCarousel2'
import Blogtemplate from './components/Blogtemplate'
import KnowledgeBase from './components/Knowledge'


function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <NoticeSection />
      <ProductsSection />
      <CalendarSection />
      <IndustryCarousel />
      <IndustryCarousel2 />
      <StatsCounter />
      <VideoSection />
      <Blog />
      <Testimonial />
      <Gallery />
      <Footer />
   
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Producttemplate />} />
        <Route path="/blog/:id" element={<Blogtemplate />} />
        <Route path="/knowledge" element={   <KnowledgeBase />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
