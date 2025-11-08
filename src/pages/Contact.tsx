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
      title: "Phone",
      details: ["+91 22 6666 6666", "+91 22 6666 6667"],
      link: "tel:+912266666666",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@lasertechnologies.in", "sales@lasertechnologies.in"],
      link: "mailto:info@lasertechnologies.in",
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        "Laser Technologies Pvt Ltd",
        "Mumbai, Maharashtra 400001",
        "India",
      ],
      link: null,
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 9:00 AM - 1:00 PM",
      ],
      link: null,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're here to help and answer any question you might have.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-200">
                    <info.icon className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-gray-600 mb-1">
                        {info.link && idx === 0 ? (
                          <a
                            className="hover:text-black"
                            href={info.link}
                          >
                            {detail}
                          </a>
                        ) : (
                          detail
                        )}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Map */}
            <div className="bg-white shadow-md overflow-hidden">
              <div className="h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12..."
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="LaserTech Office Location"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-md p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Us A Message
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <p className="text-green-800 font-medium">
                    Thank you! Your message has been sent successfully.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Phone + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300"
                        placeholder="Company Name"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white"
                    >
                      <option value="">Select subject</option>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-200 hover:bg-red-300 py-4 px-6 font-semibold text-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
