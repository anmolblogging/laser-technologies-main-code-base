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

export default function BendingAdsPage() {
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
        <title>CNC Bending Machine Supplier in India | Press Brakes & Panel Benders | LT</title>
        <meta
          name="description"
          content="Laser Technologies is a leading CNC bending machine supplier in India. CNC sheet bending machines, press brakes, panel benders, and pipe & tube bending systems. 5,500+ installations. Get a quote."
        />
        <meta
          name="keywords"
          content="CNC Bending Machine, Bending Machine, CNC Bending Machine Manufacturer, Sheet Metal Bending Machine, Industrial Bending Machine, Bending Machine Manufacturer in India, CNC Sheet Bending Machine, Press Brake Machine India, Panel Bending Machine"
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
