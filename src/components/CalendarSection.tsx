import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import Form from "./Form";

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
}

const eventColors = [
  "from-red-500 to-red-700",
];

export default function CalendarSection() {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [showEventForm, setShowEventForm] = useState(false);
  const [eventInitialData, setEventInitialData] = useState<Record<string,string>>({});

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
          "event_name, event_location, event_time, form_link, start_date, end_date"
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
            date: start.getDate().toString().padStart(2, "0"),
            day: start.toLocaleString("en-US", { weekday: "short" }),
            month: start.toLocaleString("en-US", { month: "short" }),
            year: start.getFullYear().toString(),
            _endObj: end,
          };
        })
        .filter((ev) => ev._endObj >= today)
        .map((ev) => {
          delete (ev as any)._endObj;
          return ev;
        });

      setEvents(formatted);
    };

    fetchEvents();
  }, []);

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const goToPage = (p: number) => {
    if (!sliderRef.current) return;

    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollTo({
      left: width * p,
      behavior: "smooth",
    });

    setPage(p);
  };

  const nextPage = () => page < totalPages - 1 && goToPage(page + 1);
  const prevPage = () => page > 0 && goToPage(page - 1);

  const formatFullDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.getDate()} ${d.toLocaleString("en-US", {
      month: "short",
    })} ${d.getFullYear()}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-opacity-15 bg-whiteBgTextHover text-whiteBgTextHover font-secondary px-4 py-2 rounded-full text-sm font-semibold mb-4">
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

          {/* Desktop Arrow Buttons (absolute sides, hidden on mobile) */}
          <button
            onClick={prevPage}
            disabled={page === 0}
            className={`rounded-full hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 
              bg-white hover:bg-white border border-gray-200 shadow-lg 
              p-3 z-30 transition-all
              ${
                page === 0
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:scale-110"
              }`}
            style={{ marginLeft: "-55px" }}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <button
            onClick={nextPage}
            disabled={page === totalPages - 1}
            className={`rounded-full hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 
              bg-white hover:bg-white border border-gray-200 shadow-lg 
              p-3 z-30 transition-all
              ${
                page === totalPages - 1
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:scale-110"
              }`}
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
                  className={`grid gap-6`}
                  style={{
                    gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))`,
                  }}
                >
                  {events
                    .slice(
                      p * itemsPerPage,
                      p * itemsPerPage + itemsPerPage
                    )
                    .map((event, idx) => (
                      <div
                        key={idx}
                        className="bg-white shadow-lg border border-gray-100  overflow-hidden 
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
                            <div className="uppercase text-sm opacity-75">
                              {event.month}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between min-h-[200px]">
                          <div className="space-y-4 overflow-y-auto pr-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {event.title}
                            </h3>

                            <div className="flex items-start gap-2 text-sm text-gray-600">
                              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                              <span>{event.location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{event.time}</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                              <Calendar className="w-4 h-4 text-gray-500" />

                              {event.end_date ? (
                                <span>
                                  {formatFullDate(event.start_date)} –{" "}
                                  {formatFullDate(event.end_date)}
                                </span>
                              ) : (
                                <span>{formatFullDate(event.start_date)}</span>
                              )}
                            </div>
                          </div>

                          {/* Learn More Button */}
                          <button
                            onClick={() => {
                              if (event.form_link) {
                                window.open(event.form_link, "_blank");
                                return;
                              }
                              setEventInitialData({
                                event_name: event.title,
                                event_location: event.location,
                                event_date: formatFullDate(event.start_date),
                                event_time: event.time || '',
                              });
                              setShowEventForm(true);
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

          {/* Mobile Arrow Buttons (below slider, visible only on mobile/tablet) */}
          <div className="flex lg:hidden justify-center items-center gap-6 mt-4">
            <button
              onClick={prevPage}
              disabled={page === 0}
              className={`rounded-full bg-white hover:bg-white border border-gray-200 shadow-lg p-3
                transition-all ${
                  page === 0 ? "opacity-30 cursor-not-allowed" : "hover:scale-110"
                }`}
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

      {/* Event registration modal */}
      {showEventForm && (
        <Form
          type="EVENT_FORM"
          onClose={() => setShowEventForm(false)}
          initialData={eventInitialData}
        />
      )}
    </section>
  );
}
