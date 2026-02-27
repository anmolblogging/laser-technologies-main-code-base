import { useState, useEffect } from "react";
import {
  X,
  User,
  Mail,
  Phone,
  Building2,
  BookOpen,
  CheckCircle,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  module: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  module?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Gurukul Registration Modal ───────────────────────────────────────────────

export default function GururkulFormModal({
  modules,
  initialModule = "",
  onClose,
}: {
  modules: string[];
  initialModule?: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    module: initialModule,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!form.module) newErrors.module = "Please select a module";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("http://localhost:3000/api/gurukul-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (error?: string) =>
    `w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white border outline-none
     transition-colors duration-150 placeholder:text-gray-400 font-primary
     ${
       error
         ? "border-red-400 focus:border-red-600"
         : "border-gray-200 focus:border-gray-800"
     }`;

  const labelClass =
    "block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-lg bg-white overflow-hidden shadow-2xl"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Red top stripe */}
        <div className="h-[3px] w-full bg-red-600" />

        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold text-red-600 tracking-[0.2em] uppercase mb-2 font-primary">
                Register Now
              </p>
              <h2 className="text-xl font-semibold text-gray-900 leading-snug font-primary">
                Laser Gurukul
              </h2>
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
                  <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
                  Course Registration
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1.5 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="px-8 py-14 flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-red-50 flex items-center justify-center mb-5">
              <CheckCircle className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-primary">
              You're registered!
            </h3>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-primary">
              We've received your registration for{" "}
              <span className="font-medium text-gray-700">{form.module}</span>.
              Our team will be in touch shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-red-600 text-white text-sm font-semibold
                         hover:bg-red-700 transition-colors font-primary"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="px-8 py-7">
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    className={inputClass(errors.name)}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    className={inputClass(errors.email)}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    className={inputClass(errors.phone)}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.phone}</p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className={labelClass}>
                  Company Name{" "}
                  <span className="text-gray-300 font-normal normal-case tracking-normal">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input
                    type="text"
                    placeholder="Your company name"
                    value={form.company}
                    onChange={handleChange("company")}
                    className={inputClass()}
                  />
                </div>
              </div>

              {/* Module */}
              <div>
                <label className={labelClass}>
                  Module <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                  <select
                    value={form.module}
                    onChange={handleChange("module")}
                    className={`w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white border outline-none
                      transition-colors duration-150 font-primary appearance-none
                      ${errors.module
                        ? "border-red-400 focus:border-red-600"
                        : "border-gray-200 focus:border-gray-800"
                      }`}
                  >
                    <option value="">Select a module</option>
                    {modules.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
                {errors.module && (
                  <p className="mt-1.5 text-xs text-red-500 font-primary">{errors.module}</p>
                )}
              </div>

            </div>

            {/* Error banner */}
            {status === "error" && (
              <div className="mt-5 px-4 py-3 bg-red-50 border border-red-200">
                <p className="text-sm text-red-600 font-primary">
                  Something went wrong. Please try again or contact us directly.
                </p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-6 w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-60
                         text-white text-sm font-semibold transition-colors font-primary
                         flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Submit Registration"
              )}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400 font-primary">
              Our team will reach out to confirm your enrollment.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}