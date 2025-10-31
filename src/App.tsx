import { BrowserRouter, Routes, Route } from "react-router-dom";
import Producttemplate from "./components/Producttemplate";
import Blogtemplate from "./components/Blogtemplate";
import KnowledgeBase from "./pages/Knowledge";
import ProductListingPage from "./components/ProductListingPage";
import AwardsPage from './pages/Awards';
import Careers from "./pages/Careers";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from './pages/About';


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Producttemplate />} />
        <Route path="/blog/:id" element={<Blogtemplate />} />
        <Route path="/knowledge" element={<KnowledgeBase />} />
        <Route path="/products/:segment/:subcategory"element={<ProductListingPage />}/>
        <Route path="/awards"element={<AwardsPage />}/>
        <Route path="/careers"element={<Careers />}/>
        <Route path="/about"element={<About />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;