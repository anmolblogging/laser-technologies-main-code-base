import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  Building2,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Event {
  start_date: string;
  end_date?: string;
  title: string;
  location: string;
  time: string;
  form_link: string;
  date: string;
  day: string;
  month: string;
  year: string;
  extra_info?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

// ─── Constants ───────────────────────────────────────────────────────────────

const eventColors = ["from-red-500 to-red-700"];

// ─── Event Registration Modal ─────────────────────────────────────────────────

function EventFormModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  // Lock body scroll while modal is open
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/event-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          event_name: event.title,
          event_location: event.location,
          event_date: formatFullDate(event.start_date),
          event_end_date: event.end_date ? formatFullDate(event.end_date) : null,
          event_time: event.time || "",
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const formatFullDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
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
                Register Interest
              </p>
              <h2 className="text-xl font-semibold text-gray-900 leading-snug font-primary">
                {event.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5">
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  {event.location}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                  {formatFullDate(event.start_date)}
                  {event.end_date && ` – ${formatFullDate(event.end_date)}`}
                </span>
                {event.time && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-400 font-primary">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    {event.time}
                  </span>
                )}
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
              <span className="font-medium text-gray-700">{event.title}</span>.
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
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
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
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
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
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
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
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-[0.15em] mb-1.5 font-primary">
                  Company{" "}
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
              Our team will reach out to confirm your attendance.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── Calendar Section ─────────────────────────────────────────────────────────

export default function CalendarSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItems = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(3);
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("calendar")
        .select(
          "event_name, event_location, event_time, form_link, start_date, end_date, extra_info"
        )
        .order("start_date", { ascending: true });

      if (error) return console.error("Error:", error);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const formatted = (data || [])
        .map((e) => {
          const start = new Date(e.start_date);
          const end = e.end_date ? new Date(e.end_date) : new Date(e.start_date);

          return {
            start_date: e.start_date,
            end_date: e.end_date,
            title: e.event_name,
            location: e.event_location,
            time: e.event_time,
            form_link: e.form_link,
            extra_info: e.extra_info,
            date: start.getDate().toString().padStart(2, "0"),
            day: start.toLocaleString("en-US", { weekday: "short" }),
            month: start.toLocaleString("en-US", { month: "short" }),
            year: start.getFullYear().toString(),
            _endObj: end,
          };
        })
        .filter((ev) => ev._endObj >= today)
        .map((ev) => {
          const { _endObj, ...rest } = ev as any;
          return rest as Event;
        });

      setEvents(formatted);
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const goToPage = (p: number) => {
    if (!sliderRef.current) return;
    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({ left: width * p, behavior: "smooth" });
    setPage(p);
  };

  const nextPage = () => page < totalPages - 1 && goToPage(page + 1);
  const prevPage = () => page > 0 && goToPage(page - 1);

  const formatFullDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()} ${d.toLocaleString("en-US", { month: "short" })} ${d.getFullYear()}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-opacity-15 bg-whiteBgTextHover
            text-whiteBgTextHover font-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-primary text-whiteBgText mb-4">
            Mark Your Calendar
          </h2>
          <p className="text-lg font-secondary text-opacity-80 text-whiteBgText max-w-2xl mx-auto">
            Join us at these exclusive events and explore cutting-edge laser innovations.
          </p>
        </div>

        {/* Slider Section */}
        <div className="relative w-full">

          {/* Desktop Prev Arrow */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className={`rounded-full hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2
              bg-white hover:bg-white border border-gray-200 shadow-lg
              p-3 z-30 transition-all
              ${page === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
            style={{ marginLeft: "-55px" }}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          {/* Desktop Next Arrow */}
          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className={`rounded-full hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2
              bg-white hover:bg-white border border-gray-200 shadow-lg
              p-3 z-30 transition-all
              ${page === totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
            style={{ marginRight: "-55px" }}
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>

          {/* Slider Wrapper */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
          >
            {Array.from({ length: totalPages }).map((_, p) => (
              <div
                key={p}
                className="w-full flex-shrink-0 px-2 sm:px-4"
                style={{ scrollSnapAlign: "start" }}
              >
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                  }}
                >
                  {events
                    .slice(p * itemsPerPage, p * itemsPerPage + itemsPerPage)
                    .map((event, idx) => (
                      <div
                        key={idx}
                        className="bg-white shadow-lg border border-gray-100 overflow-hidden
                          h-[460px] flex flex-col"
                      >
                        {/* Header */}
                        <div
                          className={`bg-gradient-to-br ${
                            eventColors[idx % eventColors.length]
                          } p-6 text-white h-[160px]`}
                        >
                          <div className="text-center">
                            <div className="text-5xl font-bold">{event.date}</div>
                            <div className="text-md">{event.day}</div>
                            <div className="uppercase text-sm opacity-75">{event.month}</div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between min-h-[200px]">
                          <div className="space-y-4 overflow-y-auto pr-1">
                            <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>

                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <span>{event.location}</span>
                            </div>

                            {event.time && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{event.time}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              {event.end_date ? (
                                <span>
                                  {formatFullDate(event.start_date)} – {formatFullDate(event.end_date)}
                                </span>
                              ) : (
                                <span>{formatFullDate(event.start_date)}</span>
                              )}
                            </div>
                          </div>

                          {event.extra_info && (
                            <div className="mt-4 text-sm text-gray-600">{event.extra_info}</div>
                          )}

                          {/* Register / Learn More Button */}
                          <button
                            onClick={() => {
                              if (event.form_link) {
                                window.open(event.form_link, "_blank");
                                return;
                              }
                              setSelectedEvent(event);
                            }}
                            className="w-full mt-4 py-3 bg-whiteBgButtonBg bg-opacity-20
                              text-[#060C2A] font-semibold text-sm flex items-center justify-center gap-2"
                          >
                            Learn More
                            <ArrowRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Arrows */}
          <div className="flex lg:hidden justify-center items-center gap-6 mt-4">
            <button
              onClick={prevPage}
              disabled={page === 0}
              className={`rounded-full bg-white hover:bg-white border border-gray-200 shadow-lg p-3
                transition-all ${page === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"}`}
              aria-label="Previous page"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={nextPage}
              disabled={page === totalPages - 1}
              className={`rounded-full bg-white hover:bg-white border border-gray-200 shadow-lg p-3
                transition-all ${
                  page === totalPages - 1 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
                }`}
              aria-label="Next page"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>
      </div>

      {/* Event Registration Modal */}
      {selectedEvent && (
        <EventFormModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}