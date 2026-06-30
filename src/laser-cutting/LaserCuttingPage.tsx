import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet";

import AdsNavbar from "./components/AdsNavbar";
import AdsHero from "./components/AdsHero";
import AdsTrustBar from "./components/AdsTrustBar";
import AdsProductCategories from "./components/AdsProductCategories";
import AdsIndustries from "./components/AdsIndustries";
import AdsWhyLT from "./components/AdsWhyLT";
import AdsMidCTA from "./components/AdsMidCTA";
import AdsFAQ from "./components/AdsFAQ";
import AdsFooter from "./components/AdsFooter";
import AdsChatbot from "./components/AdsChatbot";
import AdsForm from "./components/AdsForm";

export default function LaserCuttingPage() {
  const [quoteForm, setQuoteForm] = useState<{
    open: boolean;
    productName?: string;
    categoryName?: string;
  }>({ open: false });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openGeneralForm = () => {
    setQuoteForm({ open: true });
  };

  const openProductForm = (productName: string, categoryName: string) => {
    setQuoteForm({ open: true, productName, categoryName });
  };

  return (
    <div className="bg-white min-h-screen font-secondary">
      <Helmet>
        <title>Laser Cutting Machine Manufacturer in India | LT</title>
        <meta
          name="description"
          content="Laser Technologies is a leading laser cutting machine manufacturer in India. Sheet, tube, fiber and automated systems. 5,500+ installations. Get a quote."
        />
        <meta
          name="keywords"
          content="Laser Cutting Machine, Fiber Laser Cutting Machine India, CNC Laser Cutting Machine Manufacturer, Industrial Laser Cutting Machine, Metal Laser Cutting Machine India, Laser Cutting Machine for Sheet Metal, Sheet Laser Cutting Machine, Tube Laser Cutting Machine India, Pipe Laser Cutting Machine, Sheet and Tube Laser Cutting Machine, Fully Automatic Laser Cutting Machine, Electrolamination Sheet Laser Cutting Machine"
        />
      </Helmet>

      {/* Ads-specific Navbar (no main site navbar) */}
      <AdsNavbar />

      {/* 01 — Hero Banner */}
      <AdsHero onOpenForm={openGeneralForm} />

      {/* 02 — Trust Bar */}
      <AdsTrustBar />

      {/* 03 — Which Machine is Right for You? */}
      <AdsProductCategories onOpenForm={openProductForm} />

      {/* 04 — Industries Served */}
      <AdsIndustries />

      {/* 05 — Why Laser Technologies */}
      <AdsWhyLT />

      {/* 06 — Mid-Page Conversion CTA */}
      <AdsMidCTA onOpenForm={openGeneralForm} />

      {/* 07 — FAQ Section */}
      <AdsFAQ />

      {/* Ads-specific Footer (no main site footer) */}
      <AdsFooter />

      {/* WhatsApp Chatbot */}
      <AdsChatbot />

      {/* Quote Form Modal */}
      <AnimatePresence>
        {quoteForm.open && (
          <AdsForm
            onClose={() => setQuoteForm({ open: false })}
            productName={quoteForm.productName}
            categoryName={quoteForm.categoryName}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
