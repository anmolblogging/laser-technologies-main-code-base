import { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Building2,
  User,
  MessageSquare,
  Briefcase,
  CheckCircle,
  MessageCircle,
  ArrowRight,
  Users,
  Award,
  Headphones,
} from "lucide-react";

const logo =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT_FORM;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ EMAILJS SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Not provided",
          company: formData.company || "Not provided",
          subject: formData.subject,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setSubmitSuccess(true);
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong while sending your message.");
    }

    setIsSubmitting(false);

    // Reset form
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
      });
      setSubmitSuccess(false);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 91369 56932"],
      link: "tel:+919136956932",
      description: "Mon-Sat 9 AM - 7 PM",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@lasertechnologies.co.in"],
      link: "mailto:info@lasertechnologies.co.in",
      description: "We'll respond within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: ["9004005151"],
      link: "https://wa.me/919004005151",
      description: "Chat with us on WhatsApp",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat : 9:00 AM - 7:00 PM", "Sunday: Closed "],
    },
  ];

  const subjects = [
    "General Inquiry",
    "Product Information",
    "Technical Support",
    "Sales & Quotation",
    "Partnership Opportunity",
    "Career Opportunity",
    "Other",
  ];

  const experienceCentres = [
    { city: "Pune", state: "Maharashtra", region: "West India" },
    { city: "Ahmadabad", state: "Gujarat", region: "West India" },
    { city: "Delhi", state: "Delhi", region: "North India" },
    { city: "Indore", state: "Madhya Pradesh", region: "Central India" },
    { city: "Kolkata", state: "West Bengal", region: "East India" },
    { city: "Raipur", state: "Chhattisgarh", region: "Central India" },
    { city: "Bangalore", state: "Karnataka", region: "South India" },
    { city: "Rajkot", state: "Gujarat", region: "West India" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with SEO-optimized content */}
      <header
        className="relative my-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        role="banner"
        aria-label="Contact page hero section"
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              Get In Touch With Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're here to help and answer any question you might have. We look
              forward to hearing from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href="tel:+919136956932"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 font-medium hover:bg-gray-100 transition-colors"
                aria-label="Call us at +91 91369 56932"
              >
                <Phone className="h-5 w-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919004005151"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 font-medium hover:bg-green-600 hover:text-black transition-colors"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <aside
            className="lg:col-span-1 space-y-6"
            aria-label="Contact information"
          >
            <div className="bg-white p-8 text-black shadow-xl">
              <h2 className="text-2xl font-medium mb-3">
                {" "}
                Laser Technologies Pvt Ltd
              </h2>
              <p className="text-black/80 text-sm leading-relaxed mb-6">
                Our headquarters in Mumbai serves as the nerve center of our
                operations, housing our research & development team, customer
                support center, and administrative offices. Visit us to explore
                our complete range of laser technology solutions.
              </p>
              <div className="h-px bg-white/20 mb-6"></div>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4 p-4 bg-black/5  ">
                      <div className="p-2 bg-red-200 ">
                        <info.icon className="h-5 w-5 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-black mb-1">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-black/80 mb-1">
                            {info.link && idx === 0 ? (
                              <a
                                className="hover:text-red-200 transition-colors"
                                href={info.link}
                                aria-label={`${info.title}: ${detail}`}
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                        {info.description && (
                          <p className="text-xs text-black/60 mt-1 italic">
                            {info.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-xl p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Send Us A Message
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Share your requirements with us and we'll get back to you with
                  tailored solutions. Our experts typically respond within 24
                  hours.
                </p>
              </div>

              {submitSuccess && (
                <div
                  className="mb-6 p-5 bg-green-50 border-l-4 border-green-500 flex items-start gap-3"
                  role="alert"
                >
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-800 font-bold mb-1">
                      Message Sent Successfully!
                    </p>
                    <p className="text-green-700 text-sm">
                      Thank you for reaching out. Our team will contact you
                      shortly.
                    </p>
                  </div>
                </div>
              )}

              <div onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        placeholder="John Doe"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        placeholder="john@example.com"
                        aria-required="true"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Company / Organization
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    How Can We Help You? <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      aria-required="true"
                    >
                      <option value="">Select a topic</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5 pointer-events-none" />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 resize-none focus:border-red-300 focus:ring-2 focus:ring-red-100 outline-none transition-all"
                      placeholder="Tell us more about your requirements, project details, or any questions you have..."
                      aria-required="true"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Please provide as much detail as possible to help us serve
                    you better
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className="w-full bg-red-200 hover:bg-red-300 py-4 px-6 font-semibold text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  aria-label={isSubmitting ? "Sending message" : "Send message"}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Sending Your Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
                  {/* map */}
        <section className="mt-24 mb-12 md:py-20" aria-labelledby="office-locations">
          <div className="mb-20">
            <div className="bg-white shadow-2xl overflow-hidden border-t-4 border-red-600">
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-3">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                  <div className="flex items-center gap-3">
                    <Building2 className="h-5 w-5 text-white" />
                    <span className="text-white font-bold text-sm tracking-widest">
                      HEADQUARTERS - MUMBAI
                    </span>
                  </div>
                  <span className="text-white/90 text-sm">Main Office</span>
                </div>
              </div>
              <div className="">
                <div className="relative p-8 h-[450px] lg:h-[600px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8451.217590537355!2d73.0014473561612!3d19.14341475728725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bfeb4288ae8d%3A0x8b330290504e58fa!2sLaser%20Technologies%20Pvt%20Ltd!5e1!3m2!1sen!2sin!4v1763127444152!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Laser Technologies Head Office Location - Mumbai, Maharashtra"
                    className="absolute inset-0 w-full h-full"
                  />
                  <div className="absolute bottom-4 right-4 bg-black px-4 py-2 shadow-lg rounded z-10">
                    <a
                      href="https://maps.app.goo.gl/CEWi9LmpXHbZ28EM8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-white hover:text-red-200 flex items-center gap-2"
                    >
                      Get Directions
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Centres Section */}
          <div className="mt-20 md:pt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-medium text-gray-900 mb-4">
                Customer Experience Centres
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Visit our experience centres across India for live product
                demonstrations, technical consultations, and hands-on training
                sessions. Our experts are ready to guide you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {experienceCentres.map((centre, index) => (
                <article
                  key={index}
                  className="bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border-b-4 border-transparent hover:border-red-600"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gray-100 group-hover:bg-red-200 transition-colors duration-300">
                        <MapPin className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors" />
                      </div>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1">
                        {centre.region}
                      </span>
                    </div>

                    <h4 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {centre.city}
                    </h4>
                    <p className="text-gray-600 font-medium mb-4 text-sm">
                      {centre.state}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="mt-16 bg-white p-8 md:p-12 shadow-lg"
          aria-labelledby="additional-info"
        >
          <div className="max-w-4xl mx-auto">
            <h3
              id="additional-info"
              className="text-2xl font-bold text-gray-900 mb-6 text-center"
            >
              What to Expect When You Contact Us
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Quick Response Time
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our team responds to all inquiries within 24 hours during
                    business days. For urgent matters, call us directly or use
                    WhatsApp.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Expert Consultation
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Connect with our experienced professionals who understand
                    your industry and can recommend the right solutions.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Personalized Solutions
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We take time to understand your specific requirements and
                    provide customized recommendations that fit your budget.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    Ongoing Support
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our relationship doesn't end after the sale. We provide
                    continuous support and training for all our clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Laser Technologies Pvt Ltd",
          url: "https://lasertechnologies.co.in",
          logo: logo,
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+91-91369 56932",
            contactType: "customer service",
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mumbai",
            addressRegion: "Maharashtra",
            postalCode: "400001",
            addressCountry: "IN",
          },
          email: "info@lasertechnologies.co.in",
        })}
      </script>
    </div>
  );
};

export default Contact;
