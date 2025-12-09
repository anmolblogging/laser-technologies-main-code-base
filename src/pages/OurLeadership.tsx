import React from "react";
import { ArrowRight, Linkedin, Twitter, Mail, X } from "lucide-react";
import CSR from "../components/CSRLeadership";
const logo =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";

const LEADERSHIP_DATA = [
  {
    name: "Dr. Rakesh Agarwal",
    title: "Founder & Managing Director",
    image:
      "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/rakesh-agarwal.jpg",
    bio: 'Rakesh Agarwal is the founder of Laser Technologies. With an aim to make laser machines accessible to everyone in India, Dr. Agarwal founded this organization in 2011. He was the brain behind the "Laser Tech 2010", the biggest exhibition on laser technology in India.',
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rakesh@lasertechnologies.co.in",
    },
  },
  {
    name: "Ms. Pankti Agarwal",
    title: "Co-Founder & Executive Director",
    image:
      "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/pankti-mob.jpg",
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
    image:
      "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/rana-pratap.jpg",
    bio: "Mr. Rana Pratap Singh is the Vice President - Sales at Laser Technologies. He is responsible for developing and executing strategic plans to achieve the sales targets and expand our customer base.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rana@lasertechnologies.co.in",
    },
  },
];
const BRAND = {
  primary: "#6b0f0f",
  hover: "#4f0b0b",
  light: "#fef2f2",
  border: "rgba(107,15,15,0.15)",
};

export default function OurLeadership() {
  const [selectedLeader, setSelectedLeader] = React.useState<any>(null);
  return (
    <div>
      <header
        className="relative mt-16 md:mt-20  overflow-hidden"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-flex rounded-full items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="text-white  text-sm font-medium tracking-wide">
                LEADERSHIP
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium text-white leading-tight">
              The Torchbearers
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"></div>
          </div>
        </div>
      </header>
      {/* content  Section */}
      <section className=" bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-600 py-20  mx-auto text-xl leading-relaxed">
              Here's presenting the trinity of Laser Technologies who are
              striving to come up with the best and innovative solutions. With
              their unwavering commitment, guidance and strong leadership, Laser
              Technologies has been able to capture the attention of the Indian
              laser community.
            </p>

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

      <CSR />
    </div>
  );
}
