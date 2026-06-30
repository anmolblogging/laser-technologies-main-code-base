import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Loader2,
  Check,
  Mail,
  User,
  Building2,
  Phone,
  MessageSquare,
} from "lucide-react";

interface AdsFormProps {
  onClose: () => void;
  productName?: string;
  categoryName?: string;
}

const FIELDS = [
  {
    id: "name",
    label: "Full Name",
    type: "text" as const,
    icon: User,
    required: true,
    placeholder: "Your Name",
    half: true,
  },
  {
    id: "company",
    label: "Company Name",
    type: "text" as const,
    icon: Building2,
    required: false,
    placeholder: "Your Company (Optional)",
    half: true,
  },
  {
    id: "email",
    label: "Email Address",
    type: "email" as const,
    icon: Mail,
    required: true,
    placeholder: "your@email.com",
    half: true,
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel" as const,
    icon: Phone,
    required: true,
    placeholder: "+91 98765 43210",
    half: true,
  },
  {
    id: "message",
    label: "Requirements",
    type: "textarea" as const,
    icon: MessageSquare,
    required: false,
    placeholder: "Tell us about your material, thickness, and production requirement...",
    half: false,
  },
];

function getTrackingParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("source") || params.get("utm_source") || "",
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
  };
}

const AdsForm: React.FC<AdsFormProps> = ({
  onClose,
  productName = "",
  categoryName = "",
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: productName
      ? `Interested in ${productName} (${categoryName}). `
      : "",
  });

  const [trackingParams] = useState(getTrackingParams);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);


  const validate = () => {
    const newErrors: Record<string, string> = {};
    FIELDS.forEach(({ id, label, type, required }) => {
      const val = (formData[id] || "").trim();
      if (required && !val) newErrors[id] = `${label} is required`;
      if (type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
        newErrors[id] = "Please enter a valid email";
      if (type === "tel" && val && !/^[\d\s+()-]{7,}$/.test(val))
        newErrors[id] = "Please enter a valid phone number";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const e = { ...prev };
        delete e[id];
        return e;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          page: "ads-laser-cutting",
          website: "ADS-LASER",
          productName,
          categoryName,
          ...trackingParams,
        }),
      });


      if (!res.ok) throw new Error("Mail failed");

      setSuccess(true);

      setTimeout(() => {
        onClose();
        // Navigate to a thank you or just close
        navigate("/ads", { replace: true });
      }, 900);
    } catch {
      alert("Failed to send request. Please try again or call us at 9004005151.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white w-full max-w-2xl shadow-2xl relative overflow-hidden"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.45 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#f31524]" />

          <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-gray-100">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 bg-transparent"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-primary font-light text-gray-900 pr-12">
              Get a Custom Quote
            </h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Fill in your details and our application expert will contact you within 24 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-6 sm:px-8 py-7 max-h-[68vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
              {FIELDS.filter((f) => f.half).map(
                ({ id, label, type, icon: Icon, required, placeholder }) => (
                  <div key={id}>
                    <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                      {label}
                      {required && <span className="text-[#f31524] ml-1">*</span>}
                    </label>
                    <div className="relative">
                      <Icon className="absolute top-1/2 -translate-y-1/2 left-3 w-4 h-4 text-gray-300" />
                      <input
                        type={type}
                        value={formData[id] || ""}
                        onChange={(e) => handleChange(id, e.target.value)}
                        placeholder={placeholder}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 focus:border-[#f31524] focus:ring-1 focus:ring-[#f31524] outline-none transition-colors bg-white text-gray-900"
                      />
                    </div>
                    {errors[id] && (
                      <p className="text-xs text-[#f31524] mt-1">{errors[id]}</p>
                    )}
                  </div>
                ),
              )}
            </div>

            {FIELDS.filter((f) => !f.half).map(
              ({ id, label, icon: Icon, placeholder }) => (
                <div key={id} className="mt-5">
                  <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                    {label}
                  </label>
                  <div className="relative">
                    <Icon className="absolute top-3 left-3 w-4 h-4 text-gray-300" />
                    <textarea
                      value={formData[id] || ""}
                      onChange={(e) => handleChange(id, e.target.value)}
                      placeholder={placeholder}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 focus:border-[#f31524] focus:ring-1 focus:ring-[#f31524] outline-none resize-none transition-colors bg-white text-gray-900"
                    />
                  </div>
                </div>
              ),
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting || success}
              className="w-full mt-7 py-4 bg-[#f31524] text-white flex items-center justify-center gap-3 font-primary font-medium text-base hover:bg-[#d91220] transition-colors disabled:opacity-70"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : success ? (
                <Check className="w-5 h-5" />
              ) : (
                <Mail className="w-5 h-5" />
              )}
              {isSubmitting
                ? "Submitting..."
                : success
                  ? "Request Sent!"
                  : "Submit Quote Request"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdsForm;
