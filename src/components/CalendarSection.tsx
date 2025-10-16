import { useState, useRef } from "react";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface Event {
  date: string;
  day: string;
  month: string;
  title: string;
  location: string;
  time: string;
  color: string;
}

const events: Event[] = [
  {
    date: '15',
    day: 'MON',
    month: 'OCT',
    title: 'Laser Technology Expo 2025',
    location: 'New Delhi Convention Center',
    time: '9:00 AM - 6:00 PM',
    color: 'from-red-400 to-red-500'
  },
  {
    date: '22',
    day: 'MON',
    month: 'OCT',
    title: 'Manufacturing Innovation Summit',
    location: 'Mumbai International Trade Center',
    time: '10:00 AM - 5:00 PM',
    color: 'from-purple-400 to-purple-500'
  },
  {
    date: '05',
    day: 'TUE',
    month: 'NOV',
    title: 'Industrial Automation Workshop',
    location: 'Bangalore Tech Park',
    time: '2:00 PM - 7:00 PM',
    color: 'from-blue-400 to-blue-500'
  },
  {
    date: '18',
    day: 'MON',
    month: 'NOV',
    title: 'Smart Factory Solutions Demo',
    location: 'Pune Industrial Hub',
    time: '11:00 AM - 4:00 PM',
    color: 'from-green-400 to-green-500'
  }
];

export default function CalendarSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(0);
  console.log(scrollPos);
  const scrollBy = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: "smooth" });
      setScrollPos(containerRef.current.scrollLeft + offset);
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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4">
            Mark Your Calendar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us at these exclusive events to explore cutting-edge laser technology and connect with industry experts
          </p>
        </div>

        {/* Events Carousel */}
        <div className="relative">
          {/* Arrows for desktop */}
          <button
            onClick={() => scrollBy(-320)}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg p-2 z-30 hover:bg-gray-100 transition"
            aria-label="previous event"
            style={{ marginLeft: '-28px' }} // nudge outside the container edge
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scrollBy(320)}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-lg p-2 z-30 hover:bg-gray-100 transition"
            aria-label="next event"
            style={{ marginRight: '-28px' }} // nudge outside the container edge
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* Scrollable container */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory lg:pl-14 lg:pr-14"
            // added lg padding so cards start/end clear the arrow buttons on large screens
          >
            {events.map((event, idx) => (
              <div
                key={idx}
                className={`min-w-[280px] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[300px] snap-start group bg-white  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100`}
              >
                <div className={`bg-gradient-to-br ${event.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 -mr-12 -mt-12" />
                  <div className="relative text-center">
                    <div className="text-5xl font-bold mb-1">{event.date}</div>
                    <div className="text-sm font-semibold opacity-90">{event.day}</div>
                    <div className="text-xs opacity-75 uppercase tracking-wider">{event.month}</div>
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
                  <button className="w-full bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-semibold py-3 transition-all duration-300 text-sm">
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
