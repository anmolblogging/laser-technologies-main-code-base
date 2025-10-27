import { useState, ChangeEvent, FormEvent } from "react";
import { X, Calendar, Bell } from "lucide-react";

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};
type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

type FieldConfig = {
  name: keyof FormData;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  multiline?: boolean;
};

export default function NoticeSection() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: keyof FormData
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Full Name *",
      type: "text",
      required: true,
      placeholder: "John Doe",
    },
    {
      name: "email",
      label: "Email Address *",
      type: "email",
      required: true,
      placeholder: "john@company.com",
    },
    {
      name: "phone",
      label: "Phone Number *",
      type: "tel",
      required: true,
      placeholder: "+1 (555) 000-0000",
    },
    {
      name: "company",
      label: "Company Name",
      type: "text",
      placeholder: "Your Company",
    },
    {
      name: "message",
      label: "Message",
      multiline: true,
      placeholder: "Tell us about your requirements...",
    },
  ];

  return (
    <section
      className="pb-16 lg:pb-44 bg-gray-50"
      aria-labelledby="notice-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Content Section */}
          <div className="order-2 lg:order-1 space-y-6">
            <div
              className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold"
              aria-label="Important announcement"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              Important Announcement
            </div>

            <h2
              id="notice-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight"
            >
              Join Our Exclusive Technology Showcase
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Experience the future of laser manufacturing technology. Register
              now for live demonstrations, expert consultations, and special
              launch offers on our latest precision laser systems.
            </p>

            <ul className="space-y-3 text-gray-700">
              {[
                "Upcoming demo sessions available nationwide",
                "One-on-one consultation with our experts",
                "Exclusive early bird pricing for registrants",
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Calendar
                    className="w-5 h-5 text-red-600 mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowForm(true)}
              style={{backgroundColor : BRAND.primary}}
              className=" hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              aria-haspopup="dialog"
            >
              Register Your Interest
            </button>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://images.pexels.com/photos/1550086/pexels-photo-1550086.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Laser manufacturing showcase event"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Register Now
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close registration form"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {fields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <textarea
                      id={field.name}
                      rows={4}
                      required={field.required}
                      value={formData[field.name]}
                      onChange={(e) => handleChange(e, field.name)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all resize-none"
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      id={field.name}
                      type={field.type}
                      required={field.required}
                      value={formData[field.name]}
                      onChange={(e) => handleChange(e, field.name)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                style={{backgroundColor : BRAND.primary}}
                className="w-full  hover:from-red-700 hover:to-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg" 
              >
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
