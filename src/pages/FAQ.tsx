import { useState } from "react";
import {
  HelpCircle,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  Headphones,
  Shield,
  Zap,
} from "lucide-react";

const logo = "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<string | null>("general-0");

  const faqData = [
    {
      id: "general",
      category: "General",
      description: "Basic information about Laser Technologies and our offerings.",
      questions: [
        {
          q: "What services and products does Laser Technologies Pvt. Ltd. offer?",
          a: "Laser Technologies offers a comprehensive range of laser solutions, including Fiber Laser Cutting, Laser Welding, Marking, Engraving, and Press Brake Machines. We also provide high-quality laser consumables and spare parts to ensure continuous production.",
        },
        {
          q: "Where is your headquarters located?",
          a: "Our headquarters is located at Plot No. PAP/R/406, MIDC Road, Rabale MIDC, Navi Mumbai - 400701, Maharashtra, India. We also maintain regional offices in Pune, Gujarat, Delhi, and Chennai for localized support.",
        },
        {
          q: "How does a laser work?",
          a: "A laser generates a highly concentrated beam of light by amplifying energy within a resonator. This light is directed and focused onto a material to engrave, mark, or cut with extreme precision, depending on the machine's configuration.",
        },
      ],
    },
    {
      id: "machines",
      category: "Machines & Technology",
      description: "Technical details about operating and maintaining our machines.",
      questions: [
        {
          q: "Are laser cutting machines dangerous to operate?",
          a: "While powerful, our machines are designed with safety as a priority. All systems must be equipped with proper fume exhaust and filtration systems. We provide mandatory safety training for all operators to ensure safe usage.",
        },
        {
          q: "Does cutting speed affect the quality of the laser output?",
          a: "Yes, speed and quality are often inversely proportional. While our machines are built for speed, we help you find the optimal balance for your specific material to ensure precision and clean finishes.",
        },
        {
          q: "What laser power is needed for my application?",
          a: "Power requirements vary significantly. For standard laser cutting or high-speed applications, 80 watts or more is typically required. Our technical team can help you select the right power for your production needs.",
        },
      ],
    },
    {
      id: "service",
      category: "Service & Support",
      description: "Information about our customer service, training, and warranties.",
      questions: [
        {
          q: "What kind of customer support do you provide?",
          a: "We offer end-to-end support, including pre-sales consultation, site inspection, machine testing, and sample proofing. Our after-sales response is rapid, ensuring minimal downtime for your operations.",
        },
        {
          q: "Do you offer training for machine operators?",
          a: "Yes, we provide free specialized training for your operators at our training center. This covers laser theory, safety, operation, and maintenance. Successful participants receive a certificate of completion.",
        },
        {
          q: "How can I book a demo?",
          a: "You can book a demo by contacting us through our Request Support form or by calling our support line. We offer both on-site and virtual demonstrations of our machines and ReTenX software.",
        },
      ],
    },
  ];

  const toggleQuestion = (sectionId: string, qIdx: number) => {
    const key = `${sectionId}-${qIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28 text-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
              <HelpCircle className="text-white" size={18} />
              <span className="text-white text-xs font-medium tracking-widest uppercase">
                Help Center
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight">
              Frequently Asked <br className="hidden sm:block" />
              <span className="text-red-500">Questions</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto px-4">
              Find answers to common questions about our laser technology, machines, and support services.
            </p>
          </div>
        </div>
      </header>

      {/* FAQ Sections */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 md:space-y-12">
            {faqData.map((section) => (
              <div key={section.id} className="bg-white shadow-sm border border-gray-100 overflow-hidden">
                {/* Section Header */}
                <div className="bg-gray-900 px-6 py-5 sm:px-8 sm:py-6">
                  <h2 className="text-lg sm:text-xl font-medium text-white">{section.category}</h2>
                  <p className="text-gray-400 text-sm mt-1">{section.description}</p>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-100 bg-white">
                  {section.questions.map((item, qIdx) => {
                    const isOpen = openIndex === `${section.id}-${qIdx}`;
                    return (
                      <div key={qIdx} className="group bg-white">
                        <button
                          onClick={() => toggleQuestion(section.id, qIdx)}
                          className="w-full flex items-start sm:items-center justify-between gap-4 px-6 py-5 sm:px-8 sm:py-6 text-left hover:bg-gray-50 transition-colors focus:outline-none bg-white"
                        >
                          <span className={`text-sm sm:text-base font-medium transition-colors ${
                            isOpen ? "text-red-600" : "text-gray-900"
                          }`}>
                            {item.q}
                          </span>
                          <ChevronDown 
                            className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-red-600" : ""
                            }`} 
                            size={20} 
                          />
                        </button>
                        
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out bg-white ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}>
                          <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0 bg-white">
                            <div className="bg-gray-50 border-l-4 border-red-600 p-4 sm:p-5">
                              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">Need More Help?</h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Our specialized teams are ready to assist you.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <a 
              href="/services/tech-support" 
              className="group p-6 sm:p-8 bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all duration-300"
            >
              <Headphones className="text-red-600 mb-4" size={28} />
              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">Technical Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Get immediate technical assistance from our expert engineers.
              </p>
              <span className="inline-flex items-center text-red-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                Support Page <ArrowRight size={14} />
              </span>
            </a>
            
            <a 
              href="/contact" 
              className="group p-6 sm:p-8 bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all duration-300"
            >
              <Shield className="text-red-600 mb-4" size={28} />
              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">Warranty & Service</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Questions about warranty coverage or service plans.
              </p>
              <span className="inline-flex items-center text-red-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                Inquire Now <ArrowRight size={14} />
              </span>
            </a>

            <a 
              href="/services/software" 
              className="group p-6 sm:p-8 bg-white border border-gray-100 hover:border-red-200 hover:bg-red-50/30 transition-all duration-300 sm:col-span-2 lg:col-span-1"
            >
              <Zap className="text-red-600 mb-4" size={28} />
              <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">Software Support</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Having issues with ReTenX or AlmaCAM software integration?
              </p>
              <span className="inline-flex items-center text-red-600 font-medium text-sm gap-1 group-hover:gap-2 transition-all">
                Software Page <ArrowRight size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <MessageSquare className="mx-auto text-red-500 mb-6" size={40} />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-4">Still have questions?</h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto">
            Our support team is always ready to help you with your specific requirements.
          </p>
          <a 
            href="/contact"
            className="hover:text-white inline-flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-medium text-sm sm:text-base transition-all"
          >
            Contact Support Team
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
