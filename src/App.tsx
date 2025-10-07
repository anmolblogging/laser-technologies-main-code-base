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

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <NoticeSection />
      <ProductsSection />
      <CalendarSection />
      <IndustryCarousel />
      <StatsCounter />
      <VideoSection />
      <Blog />
      <Testimonial />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
