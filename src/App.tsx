import { BrowserRouter, Routes, Route } from "react-router-dom";
import Producttemplate from "./components/Producttemplate";
import Blogtemplate from "./components/Blogtemplate";
import KnowledgeBase from "./pages/Knowledge";
import ProductListingPage from "./components/ProductListingPage";
import AwardsPage from "./pages/Awards";
import Careers from "./pages/Careers";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./pages/About";
import Posts from "./components/Posts";
import Milestone from "./pages/Timeline";
import LaserGurukul from "./pages/LaserGurukul";
import Chatbot from "./components/Chatbot";
import Contact from "./pages/Contact";
import Partners from "./pages/Partners";
import OurLeadership from "./pages/OurLeadership";
import TechSupport from "./pages/TechSupport";
import Software from "./pages/Software";
import FAQ from "./pages/FAQ";
import OutOfWarranty from "./pages/OutOfWarranty";
import TechnicalTraining from "./pages/TechnicalTraining";

function App() {
  return (
    <BrowserRouter >
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Producttemplate />} />
        <Route path="/blog/:id" element={<Blogtemplate />} />
        <Route path="/laser-university" element={<KnowledgeBase />} />
        <Route path="/products/:segment/:subcategory" element={<ProductListingPage />}/>
        <Route path="/awards" element={<AwardsPage />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/news" element={<Posts />} />
        <Route path="/csr" element={<Posts />} />
        <Route path="/articles" element={<Posts />} />
        <Route path="/blog/:id" element={<Blogtemplate />} />
        <Route path="/about/company" element={<About />} />
        <Route path="/about/milestone" element={<Milestone />} />
        <Route path="/laserGurukul" element={<LaserGurukul />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/about/leadership" element={<OurLeadership />} />
        <Route path="/services/tech-support" element={<TechSupport />} />
        <Route path="/services/software" element={<Software />} />
        <Route path="/services/faqs" element={<FAQ />} />
        <Route path="/services/out-of-warranty" element={<OutOfWarranty />} />
        <Route path="/services/technical-training" element={<TechnicalTraining />} />
      </Routes>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
