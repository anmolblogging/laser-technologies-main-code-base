import { Sparkles } from "lucide-react";
import Image from '../assets/About-Home.webp';

export default function AboutSection() {
  return (
    <section className="py-10 pb-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-8xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-opacity-15 bg-whiteBgTextHover text-whiteBgTextHover px-4 py-2 rounded-full text-sm font-semibold font-secondary">
              <Sparkles className="w-4 h-4" />
              About Laser Technologies Pvt. Ltd.
            </div>

            <h2 className="text-4xl md:text-5xl font-medium font-primary text-whiteBgText leading-tight">
              Pioneering Innovation in Laser Manufacturing
            </h2>

            <p className="text-lg text-whiteBgText font-secondary leading-relaxed">
              Laser Technologies Pvt. Ltd. is a leader in advanced laser
              cutting, welding, and marking systems built for unparalleled
              precision and performance. Our mission is to empower industries
              with intelligent, energy-efficient, and future-ready laser
              solutions.
            </p>

            <ul className="space-y-3 text-whiteBgText font-secondary ">
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2  bg-whiteBgTextHover  flex-shrink-0"></span>
                Cutting-edge CNC and fiber laser systems
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2  bg-whiteBgTextHover  flex-shrink-0"></span>
                Intelligent automation and path optimization
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2.5 h-2.5 mt-2   bg-whiteBgTextHover flex-shrink-0"></span>
                Unmatched support and global service network
              </li>
            </ul>
            <br />
            <a href="/about">
              <button className="text-white  bg-whiteBgButtonBg  hover:bg-whiteBgButtonBg hover:text-[#060C2A] font-secondary px-8 py-3 text-lg  ">
                Learn More About Us
              </button>
            </a>
          </div>

          {/* Right Image */}
          <div className="relative overflow-hidden shadow-2xl ">
            <img
              src={Image}
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
