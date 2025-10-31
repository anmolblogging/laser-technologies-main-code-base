import { useState, useEffect, useRef } from 'react';
import { BookOpen, Zap, Wrench, FileText, Cpu, Menu, X, ChevronRight,Clock,  ArrowRight } from 'lucide-react';

const BRAND = {
  primary: '#060C2A', 
  hover: '#f31524',
  light: "rgba(243, 21, 36, 0.2)" ,
  border: 'rgba(107,15,15,0.15)',
};

// Content structure
const knowledgeBase = {
  categories: [
    {
      id: 'laser-cutting',
      title: 'Laser Cutting',
      icon: Zap,
      topics: [
        {
          id: 'fundamentals',
          title: '0.1 Fundamentals of Laser Cutting',
          sections: [
            {
              id: 'what-is-laser-cutting',
              title: 'What is Laser Cutting?',
              content: `Welcome to the first lesson of Laser Cutting University. Whether you're a business owner, engineer, or workshop professional, understanding laser cutting is key to leveraging modern fabrication technology.

Laser cutting is a highly precise, non-contact thermal process that uses a focused beam of light (laser) to cut, engrave, or mark various materials. Unlike traditional mechanical cutting methods (like sawing or shearing), laser cutting offers:

• High precision and accuracy (tolerance as low as ±0.1mm)
• Smooth, clean edges with minimal post-processing
• Ability to cut complex shapes and intricate designs
• Fast production speeds for both prototyping and mass production
• Reduced material waste due to narrow kerf width

The process works by concentrating a high-powered laser beam onto a small area of the material, melting, burning, or vaporizing it. An assist gas (like oxygen, nitrogen, or compressed air) blows away the molten material, resulting in a clean cut.`
            },
            {
              id: 'how-does-it-work',
              title: 'How Does Laser Cutting Work?',
              content: `The laser cutting process involves several key components working together:

1. Laser Source: Generates the laser beam (Fiber, CO₂, or other types)
2. Beam Delivery System: Directs and focuses the laser beam onto the material
3. Cutting Head: Contains focusing lens and nozzle for assist gas
4. CNC Control System: Moves the cutting head or material with precision
5. Assist Gas System: Blows away molten material and aids cutting process

The basic steps in laser cutting:

Step 1: Design Input - A CAD file is loaded into the machine's software
Step 2: Material Setup - The workpiece is positioned on the cutting table
Step 3: Parameter Setting - Cutting speed, power, and gas pressure are configured
Step 4: Laser Activation - The laser beam is focused on the material surface
Step 5: Cutting Process - The beam melts/vaporizes material while CNC moves precisely
Step 6: Cooling & Removal - Cut parts are removed and inspected`
            },
            {
              id: 'types-of-materials',
              title: 'Types of Materials That Can Be Laser Cut',
              content: `Laser cutting is versatile and works with a wide range of materials:

Metals:
• Mild Steel (up to 25mm thickness)
• Stainless Steel (up to 20mm)
• Aluminum (up to 15mm)
• Brass, Copper (limited thickness due to reflectivity)
• Titanium, Galvanized Steel

Non-Metals:
• Acrylic (PMMA) - produces smooth, polished edges
• Wood and MDF - great for decorative items
• Plywood, Veneer
• Leather, Fabric, Felt
• Cardboard, Paper
• Rubber, Foam

Materials to Avoid:
• PVC (releases toxic chlorine gas)
• Polycarbonate (discolors and produces harmful fumes)
• Reflective materials without proper settings
• Fiberglass (contains epoxy that can produce fumes)`
            },
            {
              id: 'key-advantages',
              title: 'Key Advantages of Laser Cutting',
              content: `Laser cutting offers numerous benefits over traditional cutting methods:

Precision & Accuracy:
• Tolerance levels as low as ±0.05mm
• Consistent quality across all cuts
• Ability to create intricate, complex designs

Speed & Efficiency:
• Rapid cutting speeds (up to 100 m/min for thin materials)
• No tool changes required
• Minimal setup time

Cost-Effectiveness:
• Lower operational costs compared to mechanical cutting
• Reduced material waste (narrow kerf width of 0.1-0.5mm)
• Less labor required due to automation

Versatility:
• Cuts various materials and thicknesses
• Easily programmable for different designs
• Suitable for both prototyping and mass production

Quality:
• Clean, burr-free edges
• Minimal heat-affected zone (HAZ)
• No mechanical stress on material
• Reduced need for secondary finishing`
            },
            {
              id: 'applications',
              title: 'Common Applications of Laser Cutting',
              content: `Laser cutting is used across numerous industries:

Manufacturing & Fabrication:
• Sheet metal components
• Machinery parts
• Enclosures and chassis
• Brackets and fixtures

Automotive Industry:
• Body panels and frames
• Exhaust components
• Interior trim pieces
• Prototyping and custom parts

Aerospace:
• Aircraft structural components
• Engine parts
• Precision brackets
• Lightweight panels

Architecture & Construction:
• Decorative metal screens
• Building facades
• Custom railings
• Signage and lettering

Electronics:
• PCB stencils
• Enclosures and housings
• Heat sinks
• Fine detail components

Art & Design:
• Custom jewelry
• Decorative artwork
• Architectural models
• Personalized gifts

Medical Devices:
• Surgical instruments
• Implant components
• Medical device housings
• Precision parts`
            }
          ]
        },
        {
          id: 'types-of-lasers',
          title: '2. Types of Lasers Used in Cutting Machines',
          sections: [
            {
              id: 'fiber-vs-co2',
              title: 'Fiber vs CO₂ Lasers',
              content: `Understanding the difference between Fiber and CO₂ lasers is crucial for choosing the right cutting solution.

Fiber Lasers:
• Use solid-state technology with fiber optic cables
• Wavelength: 1.064 micrometers
• Best for: Metals (steel, aluminum, brass, copper)
• Advantages: Higher efficiency, lower maintenance, faster cutting speeds
• Power range: 500W to 30kW+
• No gas required for beam generation

CO₂ Lasers:
• Use gas mixture (CO₂, nitrogen, helium) as laser medium
• Wavelength: 10.6 micrometers
• Best for: Non-metals (wood, acrylic, leather) and some metals
• Advantages: Better for thicker materials, smooth edge quality on organics
• Power range: 40W to 6kW
• Requires gas refills and optical alignment

Key Differences:
1. Efficiency: Fiber lasers are 30-40% efficient vs 10-15% for CO₂
2. Operating Costs: Fiber lasers have lower electricity and maintenance costs
3. Cutting Speed: Fiber lasers cut thin metals 2-3x faster
4. Material Versatility: CO₂ lasers better for non-metallic materials
5. Initial Cost: Fiber lasers typically more expensive upfront`
            }
          ]
        }
      ]
    },
    {
      id: 'laser-welding',
      title: 'Laser Welding',
      icon: Wrench,
      topics: [
        {
          id: 'welding-intro',
          title: 'Introduction to Laser Welding',
          sections: [
            {
              id: 'what-is-welding',
              title: 'What is Laser Welding?',
              content: `Laser welding is a precision joining process that uses a concentrated beam of light to melt and fuse materials together. It offers superior control, speed, and quality compared to traditional welding methods.

Key characteristics of laser welding include:
• Minimal heat-affected zone (HAZ)
• Deep penetration with narrow weld seams
• High welding speeds
• Excellent precision and repeatability
• Reduced distortion and warping
• Ability to weld dissimilar materials

This technology is widely used in automotive, aerospace, electronics, and medical device manufacturing.`
            }
          ]
        }
      ]
    },
    {
      id: 'laser-marking',
      title: 'Laser Marking',
      icon: FileText,
      topics: [
        {
          id: 'marking-intro',
          title: 'Introduction to Laser Marking',
          sections: [
            {
              id: 'what-is-marking',
              title: 'What is Laser Marking?',
              content: `Laser marking is a permanent marking process that uses a focused laser beam to alter the surface of a material, creating contrast and leaving a lasting mark. Unlike traditional printing or engraving, laser marking is:

• Permanent and wear-resistant
• High-precision (can mark details as small as 0.01mm)
• Fast and automated
• Non-contact (no mechanical stress)
• Environmentally friendly (no inks or chemicals)

Common marking methods include:
1. Annealing - Creates contrast through heat without removing material
2. Engraving - Removes material to create depth
3. Etching - Melts and expands surface
4. Foaming - Creates raised marks through gas expansion
5. Color change - Alters material color through chemical reaction

Applications range from serial numbers and barcodes to logos and decorative patterns.`
            }
          ]
        }
      ]
    },
    {
      id: 'laser-engraving',
      title: 'Laser Engraving',
      icon: BookOpen,
      topics: [
        {
          id: 'engraving-intro',
          title: 'Introduction to Laser Engraving',
          sections: [
            {
              id: 'what-is-engraving',
              title: 'What is Laser Engraving?',
              content: `Laser engraving is a subtractive manufacturing process where a laser beam removes material from the surface to create a visible cavity or design. It differs from marking in that it physically removes material rather than just altering the surface.

Key features of laser engraving:
• Creates depth (typically 0.02mm to 0.5mm)
• Highly detailed and precise
• Permanent and durable
• Works on various materials (metal, wood, glass, plastic)
• Can create 2D and 3D effects
• Automated and repeatable

Common applications include:
• Personalized gifts and jewelry
• Industrial part identification
• Signage and displays
• Awards and trophies
• Decorative artwork
• Mold and die marking
• Medical instrument identification

The engraving depth, speed, and quality depend on laser power, material type, and machine settings.`
            }
          ]
        }
      ]
    },
    {
      id: 'laser-4-0',
      title: 'Laser 4.0',
      icon: Cpu,
      topics: [
        {
          id: 'industry-4-0',
          title: 'Introduction to Laser 4.0',
          sections: [
            {
              id: 'what-is-laser-4-0',
              title: 'What is Laser 4.0?',
              content: `Laser 4.0 represents the integration of laser technology with Industry 4.0 principles, creating smart, connected, and automated laser systems.

Key components of Laser 4.0:

IoT Integration:
• Real-time monitoring of machine performance
• Remote diagnostics and maintenance
• Cloud-based data storage and analysis

Artificial Intelligence:
• Predictive maintenance algorithms
• Automated parameter optimization
• Quality inspection through machine vision
• Adaptive cutting strategies

Automation & Robotics:
• Robotic material handling
• Automated loading/unloading systems
• Lights-out manufacturing capability

Data Analytics:
• Production efficiency tracking
• Energy consumption monitoring
• Quality trend analysis
• Predictive failure analysis

Benefits:
• Reduced downtime through predictive maintenance
• Improved quality consistency
• Lower operational costs
• Enhanced productivity
• Better resource utilization
• Real-time production visibility

The future of laser technology lies in these smart, interconnected systems that optimize performance and minimize human intervention.`
            }
          ]
        }
      ]
    }
  ]
};



const KnowledgeBase = () => {
  const [activeSection, setActiveSection] = useState('');
  const [activeCategory, setActiveCategory] = useState('laser-cutting');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = contentRef.current?.querySelectorAll('[data-section]');
    sections?.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeCategory]);

  const activeCategories = knowledgeBase.categories.find(c => c.id === activeCategory);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setMobileNavOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">


      {/* Hero Section */}
      <div className="relative overflow-hidden mt-16 md:mt-20 bg-black" >
        {/* <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 -right-20 -top-20 w-96 h-96 rounded-full" style={{ backgroundColor: 'white' }}></div>
          <div className="absolute transform -rotate-45 -left-20 -bottom-20 w-80 h-80 rounded-full" style={{ backgroundColor: 'white' }}></div>
        </div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2  bg-white/20 backdrop-blur-sm mb-6">
              <BookOpen className="text-white" size={20} />
              <span className="text-white text-sm font-medium">Knowledge Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
              Laser University
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Take your creativity to the next level with comprehensive laser technology education
            </p>

          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 hide-scrollbar">
            {knowledgeBase.categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2 px-6 py-3 whitespace-nowrap rounded-lg transition-all flex-shrink-0"
                  style={{
                    backgroundColor: isActive ? BRAND.light : 'transparent',
                    color: isActive ? BRAND.primary : '#6b7280',
                    fontWeight: isActive ? '600' : '500',
                    border: `2px solid ${isActive ? BRAND.border : 'transparent'}`
                  }}
                >
                  <Icon size={18} />
                  <span>{category.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8 relative pt-2">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32 self-start">
            <div className="bg-white  shadow-sm p-6 border" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center gap-2 mb-6 pb-4 border-b" style={{ borderColor: BRAND.border }}>
                <BookOpen size={20} style={{ color: BRAND.primary }} />
                <h2 className="font-semibold" style={{ color: BRAND.primary }}>Table of Contents</h2>
              </div>
              <nav className="space-y-6">
                {activeCategories?.topics.map((topic, topicIdx) => (
                  <div key={topic.id}>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: BRAND.primary }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: BRAND.light }}>
                        {topicIdx + 1}
                      </span>
                      <span className="line-clamp-2">{topic.title}</span>
                    </h3>
                    <ul className="space-y-1 ml-8">
                      {topic.sections.map((section) => {
                        const isActive = activeSection === section.id;
                        return (
                          <li key={section.id}>
                            <button
                              onClick={() => scrollToSection(section.id)}
                              className="text-sm text-left w-full px-3 py-2 rounded-lg transition-all flex items-center gap-2 group"
                              style={{
                                backgroundColor: isActive ? BRAND.light : 'transparent',
                                color: isActive ? BRAND.primary : '#6b7280',
                                fontWeight: isActive ? '500' : '400'
                              }}
                            >
                              <ChevronRight size={14} className={`transition-transform ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                              <span className="line-clamp-2">{section.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile Navigation Button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-50"
            style={{ backgroundColor: BRAND.primary }}
          >
            {mobileNavOpen ? <X className="text-white" size={24} /> : <Menu className="text-white" size={24} />}
          </button>

          {/* Mobile Navigation */}
          {mobileNavOpen && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16" onClick={() => setMobileNavOpen(false)}>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <h2 className="font-semibold mb-6 flex items-center gap-2" style={{ color: BRAND.primary }}>
                    <BookOpen size={20} />
                    Table of Contents
                  </h2>
                  <nav className="space-y-6">
                    {activeCategories?.topics.map((topic, topicIdx) => (
                      <div key={topic.id}>
                        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: BRAND.primary }}>
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: BRAND.light }}>
                            {topicIdx + 1}
                          </span>
                          {topic.title}
                        </h3>
                        <ul className="space-y-1 ml-8">
                          {topic.sections.map((section) => {
                            const isActive = activeSection === section.id;
                            return (
                              <li key={section.id}>
                                <button
                                  onClick={() => scrollToSection(section.id)}
                                  className="text-sm text-left w-full px-3 py-2 rounded-lg transition-all"
                                  style={{
                                    backgroundColor: isActive ? BRAND.light : 'transparent',
                                    color: isActive ? BRAND.primary : '#6b7280',
                                    fontWeight: isActive ? '500' : '400'
                                  }}
                                >
                                  {section.title}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <main className="flex-1" ref={contentRef}>
            <div className="bg-white  shadow-sm border" style={{ borderColor: BRAND.border }}>
              {activeCategories?.topics.map((topic, topicIdx) => (
                <div key={topic.id} className="border-b last:border-b-0" style={{ borderColor: BRAND.border }}>
                  <div className="p-6 sm:p-8 lg:p-10">
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BRAND.light }}>
                        <span className="text-xl font-bold" style={{ color: BRAND.primary }}>{topicIdx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: BRAND.primary }}>
                          {topic.title}
                        </h2>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {topic.sections.length * 5} min read
                          </span>
                          <span>•</span>
                          <span>{topic.sections.length} sections</span>
                        </div>
                      </div>
                    </div>

                    {topic.sections.map((section, sectionIdx) => (
                      <section
                        key={section.id}
                        id={section.id}
                        data-section
                        className="mb-12 last:mb-0 scroll-mt-32"
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-semibold" style={{ backgroundColor: BRAND.light, color: BRAND.primary }}>
                            {sectionIdx + 1}
                          </div>
                          <h3 className="text-xl md:text-2xl font-semibold flex-1" style={{ color: BRAND.primary }}>
                            {section.title}
                          </h3>
                        </div>
                        
                        <div className="prose max-w-none pl-11">
                          {section.content.split('\n\n').map((paragraph, idx) => {
                            // Check if paragraph is a list item
                            if (paragraph.trim().startsWith('•')) {
                              const items = paragraph.split('\n').filter(line => line.trim());
                              return (
                                <ul key={idx} className="space-y-2 mb-6">
                                  {items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="text-gray-700 leading-relaxed flex items-start gap-3">
                                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND.primary }}></span>
                                      <span>{item.replace('•', '').trim()}</span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }
                            
                            // Check if it's a heading (contains a colon at the end of first line)
                            const lines = paragraph.split('\n');
                            if (lines[0].trim().endsWith(':') && lines.length > 1) {
                              return (
                                <div key={idx} className="mb-6">
                                  <h4 className="font-semibold text-lg mb-3" style={{ color: BRAND.primary }}>
                                    {lines[0].trim()}
                                  </h4>
                                  <div className="space-y-2">
                                    {lines.slice(1).map((line, lineIdx) => (
                                      line.trim() && (
                                        <p key={lineIdx} className="text-gray-700 leading-relaxed flex items-start gap-3">
                                          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND.primary }}></span>
                                          <span>{line.replace('•', '').trim()}</span>
                                        </p>
                                      )
                                    ))}
                                  </div>
                                </div>
                              );
                            }
                            
                            // Check if it's a numbered step
                            if (paragraph.trim().match(/^(Step \d+:|^\d+\.)/)) {
                              const stepMatch = paragraph.match(/^(Step \d+:|^\d+\.)(.+)/);
                              if (stepMatch) {
                                return (
                                  <div key={idx} className="mb-4 p-4 rounded-lg" style={{ backgroundColor: BRAND.light }}>
                                    <p className="text-gray-700 leading-relaxed">
                                      <span className="font-semibold" style={{ color: BRAND.primary }}>{stepMatch[1]}</span>
                                      {stepMatch[2]}
                                    </p>
                                  </div>
                                );
                              }
                            }
                            
                            // Regular paragraph
                            return (
                              <p key={idx} className="text-gray-700 mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>

                        {sectionIdx < topic.sections.length - 1 && (
                          <div className="mt-8 pl-11">
                            <div className="h-px" style={{ backgroundColor: BRAND.border }}></div>
                          </div>
                        )}
                      </section>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Related Topics Card
            <div className="mt-8 bg-gradient-to-br from-white to-gray-50  shadow-sm border p-6 sm:p-8" style={{ borderColor: BRAND.border }}>
              <h3 className="text-xl font-medium mb-4" style={{ color: BRAND.primary }}>
                Explore More Topics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {knowledgeBase.categories.filter(c => c.id !== activeCategory).map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-4  border-2 transition-all hover:shadow-md group text-left"
                      style={{ borderColor: BRAND.border }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = BRAND.primary;
                        e.currentTarget.style.backgroundColor = BRAND.light;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = BRAND.border;
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                    >
                      <Icon size={24} style={{ color: BRAND.primary }} className="mb-2" />
                      <h4 className="font-semibold mb-1" style={{ color: BRAND.primary }}>{category.title}</h4>
                      <p className="text-sm text-gray-600">Learn about {category.title.toLowerCase()} technology</p>
                      <div className="flex items-center gap-1 mt-2 text-sm font-medium" style={{ color: BRAND.primary }}>
                        <span>Explore</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div> */}

          </main>
        </div>
      </div>



      <style >{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeBase