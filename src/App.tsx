import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Producttemplate = lazy(() => import("./components/Producttemplate"));
const Blogtemplate = lazy(() => import("./components/Blogtemplate"));
const KnowledgeBase = lazy(() => import("./pages/Knowledge"));
const ProductListingPage = lazy(() => import("./components/ProductListingPage"));
const AwardsPage = lazy(() => import("./pages/Awards"));
const Careers = lazy(() => import("./pages/Careers"));
const Posts = lazy(() => import("./components/Posts"));
const About = lazy(() => import("./pages/About"));
const Milestone = lazy(() => import("./pages/Timeline"));
const LaserGurukul = lazy(() => import("./pages/LaserGurukul"));
const Contact = lazy(() => import("./pages/Contact"));
const Partners = lazy(() => import("./pages/Partners"));
const OurLeadership = lazy(() => import("./pages/OurLeadership"));
const TechSupport = lazy(() => import("./pages/TechSupport"));
const Software = lazy(() => import("./pages/Software"));
const FAQ = lazy(() => import("./pages/FAQ"));
const OutOfWarranty = lazy(() => import("./pages/OutOfWarranty"));
const TechnicalTraining = lazy(() => import("./pages/TechnicalTraining"));
const CustomerStories = lazy(() => import("./pages/CustomerStories"));
const CustomerStoriesTemplate = lazy(() => import("./pages/CustomerStoriesTemplate"));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Producttemplate />} />
          <Route path="/blog/:id" element={<Blogtemplate />} />
          <Route path="/laser-university" element={<KnowledgeBase />} />
          <Route path="/products/:segment/:subcategory" element={<ProductListingPage />} />
          <Route path="/awards" element={<AwardsPage />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/news" element={<Posts />} />
          <Route path="/csr" element={<Posts />} />
          <Route path="/articles" element={<Posts />} />
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
          <Route path="/customer-stories" element={<CustomerStories />} />
          <Route path="/customer-stories/:slug" element={<CustomerStoriesTemplate />} />
        </Routes>
      </Suspense>
      <Chatbot />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
