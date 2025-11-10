import React, { useState, useEffect, useCallback } from "react";
import AboutCarousel from "../components/AboutCarousel";
const logo = 'https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg' ;
import {
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
  Quote,
  Mail,
  X,
  Building2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const BRAND = {
  primary: "#6b0f0f",
  hover: "#4f0b0b",
  light: "#fef2f2",
  border: "rgba(107,15,15,0.15)",
};

// Leadership team data
const LEADERSHIP_DATA = [
  {
    name: "Mr. Rakesh Agarwal",
    title: "Founder & Managing Director",
    image:
      "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/rakesh-agarwal.jpg",
    bio: 'Rakesh Agarwal is the founder of Laser Technologies. With an aim to make laser machines accessible to everyone in India, Mr. Agarwal founded this organization in 2011. He was the brain behind the "Laser Tech 2010", the biggest exhibition on laser technology in India.',
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rakesh@lasertechnologies.co.in",
    },
  },
  {
    name: "Ms. Pankti Agarwal",
    title: "Co-Founder & Executive Director",
    image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/pankti-mob.jpg",
    bio: "Ms. Pankti Agarwal is the Director of Operations at Laser Technologies. She oversees all the behind-the-scenes operations happening at the office of Laser Technologies. She has been selected for Top 30 Business Women to Watch in 2020 by the CEO Magazine.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "pankti@lasertechnologies.co.in",
    },
  },
  {
    name: "Mr. Rana Pratap Singh",
    title: "Vice President - Sales",
    image: "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/rana-pratap.jpg",
    bio: "Mr. Rana Pratap Singh is the Vice President - Sales at Laser Technologies. He is responsible for developing and executing strategic plans to achieve the sales targets and expand our customer base.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rana@lasertechnologies.co.in",
    },
  },
];

export default function AboutUsPage() {
  const navigate = useNavigate();
  const [selectedLeader, setSelectedLeader] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header Section */}
      <header
        className="relative mt-16 md:mt-20 bg-black overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1600&h=900&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex rounded-full items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <Building2 className="text-white" size={20} />
              <span className="text-white text-sm font-medium tracking-wide">
                ABOUT US
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              Empowering Industries,
              <br />
              Inspiring Generations
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Leading the revolution in laser technology with innovation,
              quality, and customer excellence since 2011.
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold">₹300Cr+</div>
                <div className="text-sm md:text-base opacity-90 mt-1">
                  Enterprise Value
                </div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/30"></div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold">7200+</div>
                <div className="text-sm md:text-base opacity-90 mt-1">
                  Customers
                </div>
              </div>
              <div className="hidden sm:block w-px h-16 bg-white/30"></div>
              <div className="text-white">
                <div className="text-4xl md:text-5xl font-bold">150+</div>
                <div className="text-sm md:text-base opacity-90 mt-1">
                  Employees
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Content Section */}
      <section className="pt-20 pb-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: BRAND.light }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: BRAND.primary }}
              ></div>
              <span
                className="text-sm font-semibold"
                style={{ color: BRAND.primary }}
              >
                WHO WE ARE
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-medium  mb-4">
              About Laser Technologies
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Delivering cutting-edge laser solutions across diverse industries
            </p>
            
            {/* Mobile image - only visible on small screens */}
            <div className="relative mt-8 md:hidden">
              <div
                className="absolute -inset-4  opacity-10"
                style={{ backgroundColor: BRAND.primary }}
              ></div>
              <img
                src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/laser_tech_about_us_main_image.jpg"
                alt="About Company"
                className="relative shadow-2xl w-full"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-700 leading-relaxed text-lg">
                At Laser Technologies Pvt Ltd, we understand that every industry
                has unique needs and challenges. That's why we offer a wide
                range of laser solutions that cater to diverse industries,
                including manufacturing, automotive, aerospace, and more.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                We believe that customer satisfaction is the key to our success.
                Our team of experts works closely with customers to understand
                their specific needs and requirements, and we provide customized
                solutions that meet their unique demands.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our Laser Source repairing center and head repairing center are
                equipped with state-of-the-art technology to handle all kinds of
                repair and maintenance needs.
              </p>
            </div>
            {/* Desktop image - hidden on mobile, visible on md and up */}
            <div className="relative hidden md:block">
              <div
                className="absolute -inset-4  opacity-10"
                style={{ backgroundColor: BRAND.primary }}
              ></div>
              <img
                src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/laser_tech_about_us_main_image.jpg"
                alt="About Company"
                className="relative shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Full Width */}
      <section className="relative overflow-hidden bg-white">
        <div className="relative py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BRAND.primary }}
                  ></div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: BRAND.primary }}
                  >
                    OUR MISSION
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-medium mb-6 text-whiteBgText">
                  Making Technology Accessible to All
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  <p>
                    Our mission is to make technology accessible to the masses,
                    and we are grateful for the support of our partners and
                    customers who have helped us grow into a leading player in
                    the market.
                  </p>
                  <p>
                    Our focus on quality, innovation, and customer service has
                    enabled us to build lasting relationships with our clients,
                    who trust us to deliver the best laser solutions in the
                    industry.
                  </p>
                </div>
                {/* <button 
                  className="mt-8 group inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-xl"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button> */}
              </div>
              <div className="order-1 md:order-2">
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/laser_tech_about_us_mission.jpg"
                    alt="Our Mission"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section - Full Width with Different Background */}
      <section className="relative pb-20 overflow-hidden">
        <div className="relative py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="relative overflow-hidden shadow-2xl">
                  <img
                    src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/laser_tech_about_us_vision.jpg"
                    alt="Our Vision"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-6">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: BRAND.primary }}
                  ></div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: BRAND.primary }}
                  >
                    OUR VISION
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-medium mb-6 text-whiteBgText">
                  Leading India to Global Excellence
                </h2>
                <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                  <p>
                    Laser Technologies wants to be a global leader in delivering
                    cost-effective solutions to global businesses and make India
                    a superpower in the international laser market.
                  </p>
                  <p>
                    Since the inception of Laser Technologies, our goal has been
                    to ensure every Indian business in the laser community gets
                    access to state-of-the-art laser machines.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/about/milestone")}
                  className="mt-8 group inline-flex items-center gap-2 px-8 py-4 text-white font-semibold transition-all duration-300 hover:shadow-xl"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  <span>Our Journey</span>
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* pankti agarwal -- card */}
{/* 
      <section className="relative w-full bg-gradient-to-br from-slate-50 via-red-50 to-slate-100 py-20 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-300/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 lg:pr-12">
              <div className="relative">
                <Quote
                  className="w-16 h-16 md:w-20 md:h-20 text-red-400/40 absolute -top-4 -left-2"
                  fill="currentColor"
                />
              </div>
              <div className="space-y-3 pt-8">
                <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-300"></div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight">
                  Pankti Agarwal
                </h2>
                <p className="text-lg md:text-xl text-red-600 font-medium tracking-wide">
                  Co-Founder & Executive Director
                </p>
              </div>

              <blockquote className="space-y-6">
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed font-light">
                  "Since the inception of Laser Technologies, our goal has been
                  to ensure every Indian business in the laser community gets
                  access to state-of-the-art laser machines."
                </p>

                <p className="text-base md:text-lg text-gray-600 leading-relaxed border-l-4 border-red-400 pl-6">
                  The Laser Technologies team aspires to solve the growing
                  demand for laser cutitng and marking machines through our
                  modernistic approach. Welcome to Laser Technologies.
                </p>
              </blockquote>

              <div className="flex items-center gap-4 pt-4">
                <div className="flex-1 h-px bg-gradient-to-r from-red-400 to-transparent"></div>
                <svg className="w-32 h-12" viewBox="0 0 200 60">
                  <path
                    d="M10 40 Q 30 10, 50 30 T 90 40 Q 110 25, 130 35 T 170 40"
                    stroke="#ef4444"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="relative lg:pl-12">
              <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 transform translate-x-6 translate-y-6 -z-10"></div>

              <div className="relative bg-white p-2 shadow-2xl">
                <div className="relative overflow-hidden">
                  <img
                    src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/director-img.jpg"
                    alt="Pankti Agarwal - Founder and CEO"
                    className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover object-center"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent"></div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-red-500"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-red-500"></div>
            </div>
          </div>
        </div>
      </section>  
      */}

      <section className="relative w-full bg-gradient-to-br from-slate-50 via-red-50 to-slate-100 py-20 md:py-32 overflow-hidden">
  {/* Decorative Elements */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-red-200/30 blur-3xl"></div>
  <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-300/20 blur-3xl"></div>

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
      {/* Left Side - Text Content */}
      <div className="space-y-8 lg:pr-12">
        {/* Quote Icon */}
        <div className="relative">
          <Quote
            className="w-16 h-16 md:w-20 md:h-20 text-red-400/40 absolute -top-4 -left-2"
            fill="currentColor"
          />
        </div>

        {/* Owner Name with Accent */}
        <div className="space-y-3 pt-8">
          <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-red-300"></div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900 leading-tight">
            Rakesh Agrawal
          </h2>
          <p className="text-lg md:text-xl text-red-600 font-medium tracking-wide">
            Founder & Managing Director
          </p>
        </div>

        {/* Biography Content */}
        <blockquote className="space-y-6">
          <p className="text-sm md:text-md lg:text-lg text-gray-800 leading-relaxed font-light">
            "Mr. Rakesh Agrawal has traveled a long way—literally from a small town in Northern India to Mumbai, and metaphorically from humble beginnings to entrepreneurial excellence. With a Master’s degree in Electronics and 20 years of corporate experience, he founded Laser Technologies Pvt Ltd in 2011 with just two members. Under his vision, the company has grown to a ₹300 crore enterprise with 125 team members in under 14 years."
          </p>
          <p className="text-base md:text-md text-gray-600 leading-relaxed border-l-4 border-red-400 pl-6">
            Today, Laser Technologies works with clients across India and partners with manufacturers from Europe, America, and Asia. Mr. Rakesh is a life member of prestigious organizations such as the Indian Welding Society (IWS), Indian Laser Association (ILA), Bombay Industries Association (BIA), Laser Industries Association of India (LIAI), and TTC MIDC Industries Association (TMIA). His international consultancy includes engagements with Ridgetop Research USA, Coleman Research Group USA, and Cognolink UK.
          </p>
          <p className="text-base md:text-md text-gray-600 leading-relaxed">
            His thought leadership is shared through regular articles in leading industrial magazines. Under his guidance, Laser Technologies has received several honors: “Change-Makers of Indian Industry,” “Most Enterprising Business,” “Engineering Excellence Award,” “CSIR activities during COVID,” and the “Atal Achievement Award.” His inspiring journey is documented in the book “Change Makers of Indian Mfg.”
          </p>
          <p className="text-base md:text-md text-gray-600 leading-relaxed">
            Mr. Rakesh’s leadership led to India's first “ Laser Repair Centre, ” an  “E-commerce platform for Laser consumables,” and “Laser Gurukul,” the only training centre in India for Laser Machines. He is deeply committed to inclusive growth and serving society at large.
          </p>
        </blockquote>

        {/* Signature or Additional Element */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex-1 h-px bg-gradient-to-r from-red-400 to-transparent"></div>
          <svg className="w-32 h-12" viewBox="0 0 200 60">
            <path
              d="M10 40 Q 30 10, 50 30 T 90 40 Q 110 25, 130 35 T 170 40"
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="relative lg:pl-12">
        {/* Background Accent Shape */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 transform translate-x-6 translate-y-6 -z-10"></div>

        {/* Main Image Container - Replace src with Rakesh Agrawal's image */}
        <div className="relative bg-white p-2 shadow-2xl">
          <div className="relative overflow-hidden">
            <img
              src="https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/rakesh-agarwal.jpg"
              alt="Rakesh Agrawal - Founder and Managing Director"
              className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover object-center"
              loading="lazy"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 border-t-4 border-r-4 border-red-500"></div>
        <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-4 border-l-4 border-red-500"></div>
      </div>
    </div>
  </div>
</section>


      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: BRAND.light }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: BRAND.primary }}
              ></div>
              <span
                className="text-sm font-semibold"
                style={{ color: BRAND.primary }}
              >
                LEADERSHIP
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-whiteBgText">
              The Torchbearers
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Here's presenting the trinity of Laser Technologies who are
              striving to come up with the best and innovative solutions. With
              their unwavering commitment, guidance and strong leadership, Laser
              Technologies has been able to capture the attention of the Indian
              laser community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {LEADERSHIP_DATA.map((leader, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedLeader(leader)}
              >
                <div className="relative overflow-hidden shadow-xl mb-6 aspect-square">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover "
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-sm font-medium">Click to learn more</p>
                    </div>
                  </div>
                  {/* Arrow Icon Always in Bottom Right */}
                  <div className="absolute bottom-4 right-4">
                    <ArrowRight className="w-8 h-8 text-red-400 p-1" />
                  </div>
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold mb-2 group-hover:opacity-80 transition-colors"
                  style={{ color: BRAND.primary }}
                >
                  {leader.name}
                </h3>
                <p className="text-gray-600 font-medium">{leader.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Carousel */}
      {/* <section className="py-20 md:py-32 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <span className="text-sm font-semibold text-white">OUR FACILITIES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              State-of-the-Art Infrastructure
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our world-class facilities and cutting-edge technology
            </p>
          </div>

          <div className="relative">
            <div className="relative h-[400px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={GALLERY_IMAGES[galleryIndex]} 
                alt={`Gallery ${galleryIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <button
              onClick={prevGallery}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all transform hover:scale-110"
              style={{ color: BRAND.primary }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextGallery}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 md:p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all transform hover:scale-110"
              style={{ color: BRAND.primary }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            <div className="flex justify-center gap-3 mt-8">
              {GALLERY_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === galleryIndex ? 'w-8' : 'w-2'
                  }`}
                  style={{ 
                    backgroundColor: index === galleryIndex ? BRAND.primary : '#fff',
                    opacity: index === galleryIndex ? 1 : 0.5
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section> */}
      <AboutCarousel />
      {/* Leader Modal */}
      {selectedLeader && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedLeader(null)}
        >
          <div
            className="bg-white  max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <button
                onClick={() => setSelectedLeader(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
                style={{ color: BRAND.primary }}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="grid md:grid-cols-5 gap-8 p-8">
                <div className="md:col-span-2">
                  <div className="sticky top-8">
                    <div className=" overflow-hidden shadow-xl mb-6">
                      <img
                        src={selectedLeader.image}
                        alt={selectedLeader.name}
                        className="w-full aspect-square object-cover"
                      />
                    </div>
                    <div className="flex gap-4 justify-center">
                      <a
                        href={selectedLeader.social.linkedin}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                        style={{
                          backgroundColor: BRAND.light,
                          color: BRAND.primary,
                        }}
                        aria-label="LinkedIn profile"
                      >
                        <Linkedin size={20} />
                      </a>
                      <a
                        href={selectedLeader.social.twitter}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                        style={{
                          backgroundColor: BRAND.light,
                          color: BRAND.primary,
                        }}
                        aria-label="Twitter profile"
                      >
                        <Twitter size={20} />
                      </a>
                      <a
                        href={`mailto:${selectedLeader.social.email}`}
                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
                        style={{
                          backgroundColor: BRAND.light,
                          color: BRAND.primary,
                        }}
                        aria-label="Send email"
                      >
                        <Mail size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h3
                      className="text-3xl md:text-4xl font-semibold mb-3"
                      style={{ color: BRAND.primary }}
                    >
                      {selectedLeader.name}
                    </h3>
                    <p className="text-xl text-gray-600 font-medium">
                      {selectedLeader.title}
                    </p>
                  </div>

                  <div
                    className="h-1 w-20 rounded-full"
                    style={{ backgroundColor: BRAND.primary }}
                  ></div>

                  <p className="text-gray-700 leading-relaxed text-lg">
                    {selectedLeader.bio}
                  </p>

                  <div className="pt-6">
                    <a
                      href={`mailto:${selectedLeader.social.email}`}
                      className="inline-block px-8 py-4 text-white font-medium  transition-all transform hover:scale-105 hover:shadow-xl"
                      style={{ backgroundColor: BRAND.primary }}
                    >
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
