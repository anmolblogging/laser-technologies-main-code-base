import { useState, useRef, useEffect } from "react";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

import { supabase } from "../lib/supabase";

interface Event {
  date: string;
  day: string;
  month: string;
  year: string;
  title: string;
  location: string;
  time: string;
  form_link: string;
}

// Gradient colors for cards
const eventColors: string[] = [
  "from-red-400 to-red-500",
  "from-purple-400 to-purple-500",
  "from-blue-400 to-blue-500",
  "from-green-400 to-green-500",
];

export default function CalendarSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [events, setEvents] = useState<Event[]>([]);

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("calendar")
        .select("*")
        .order("event_date", { ascending: true });

      if (error) {
        console.error("Error fetching events:", error);
        return;
      }

      const formattedEvents = (data || []).map((e) => {
        const d = new Date(e.event_date);
        return {
          title: e.event_name,
          location: e.event_location,
          time: e.event_time,
          form_link: e.form_link,
          date: d.getDate().toString().padStart(2, "0"),
          day: d.toLocaleString("en-US", { weekday: "short" }),
          month: d.toLocaleString("en-US", { month: "short" }),
          year: d.getFullYear().toString(),
        };
      });

      setEvents(formattedEvents);
    };

    fetchEvents();
  }, []);

  const scrollBy = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 mb-4">
            Mark Your Calendar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us at these exclusive events to explore cutting-edge laser technology and connect with industry experts
          </p>
        </div>

        {/* Events Carousel */}
        <div className="relative">
          {/* Desktop arrows */}
          <button
            onClick={() => scrollBy(-320)}
            className="rounded-full hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg p-2 z-30 hover:bg-gray-100 transition"
            aria-label="previous event"
            style={{ marginLeft: "-28px" }}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="rounded-full hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg p-2 z-30 hover:bg-gray-100 transition"
            aria-label="next event"
            style={{ marginRight: "-28px" }}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Scrollable container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory lg:pl-14 lg:pr-14"
          >
            {events.map((event, idx) => (
              <div
                key={idx}
                className={`min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[300px] snap-start group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100`}
              >
                <div
                  className={`bg-gradient-to-br ${eventColors[idx % eventColors.length]} p-6 text-white relative overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -mr-12 -mt-12" />
                  <div className="relative text-center">
                    <div className="text-5xl font-bold mb-1">{event.date}</div>
                    <div className="text-sm font-semibold opacity-90">{event.day}</div>
                    <div className="text-sm opacity-75 uppercase tracking-wider">{event.month}</div>
                    <div className="text-md font-medium tracking-wider">{event.year}</div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-red-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(event.form_link, "_blank")}
                    className="w-full bg-red-50 hover:bg-[#4f0b0b] text-[#4f0b0b] hover:text-white font-semibold py-3 transition-all duration-300 text-sm"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
