import { Sparkles } from "lucide-react";

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
};

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles className="w-4 h-4" />
              About Laser Technologies Pvt. Ltd.
            </div>

            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 leading-tight">
              Pioneering Innovation in Laser Manufacturing
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed">
              Laser Technologies Pvt. Ltd. is a leader in advanced laser cutting, welding, and marking systems built for unparalleled precision and performance. 
              Our mission is to empower industries with intelligent, energy-efficient, and future-ready laser solutions.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2   flex-shrink-0" style={{backgroundColor : BRAND.primary}}></span>
                Cutting-edge CNC and fiber laser systems
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2   flex-shrink-0" style={{backgroundColor : BRAND.primary}}></span>
                Intelligent automation and path optimization
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2   flex-shrink-0" style={{backgroundColor : BRAND.primary}}></span>
                Unmatched support and global service network
              </li>
            </ul>

            <button
              style={{ backgroundColor: BRAND.primary }}
              className="text-white font-medium px-8 py-3 text-lg  "
            >
              Learn More About Us
            </button>
          </div>

          {/* Right Image */}
          <div className="relative overflow-hidden shadow-2xl ">
            <img
              src="https://images.pexels.com/photos/3913020/pexels-photo-3913020.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Laser cutting technology"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
