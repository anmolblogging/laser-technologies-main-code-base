import { Calendar, MapPin, Clock } from 'lucide-react';

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
    color: 'from-red-500 to-red-600'
  },
  {
    date: '22',
    day: 'MON',
    month: 'OCT',
    title: 'Manufacturing Innovation Summit',
    location: 'Mumbai International Trade Center',
    time: '10:00 AM - 5:00 PM',
    color: 'from-purple-500 to-purple-600'
  },
  {
    date: '05',
    day: 'TUE',
    month: 'NOV',
    title: 'Industrial Automation Workshop',
    location: 'Bangalore Tech Park',
    time: '2:00 PM - 7:00 PM',
    color: 'from-blue-500 to-blue-600'
  },
  {
    date: '18',
    day: 'MON',
    month: 'NOV',
    title: 'Smart Factory Solutions Demo',
    location: 'Pune Industrial Hub',
    time: '11:00 AM - 4:00 PM',
    color: 'from-green-500 to-green-600'
  }
];

export default function CalendarSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Calendar className="w-4 h-4" />
            Upcoming Events
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Mark Your Calendar
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us at these exclusive events to explore cutting-edge laser technology and connect with industry experts
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {events.map((event, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 transform hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${event.color} p-6 text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
                <div className="relative">
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

                <button className="w-full bg-gray-100 hover:bg-red-600 text-gray-700 hover:text-white font-semibold py-3 rounded-lg transition-all duration-300 text-sm">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
