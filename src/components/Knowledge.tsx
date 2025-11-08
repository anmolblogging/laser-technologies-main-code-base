/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import Loading from "./Loading";
import {
  BookOpen,
  Zap,
  Wrench,
  FileText,
  Cpu,
  Menu,
  X,
  ChevronRight,
  Clock,
} from "lucide-react";

import { supabase } from "../lib/supabase";

const logo =
  "https://dihcmuqusfdckdcadswg.supabase.co/storage/v1/object/public/images/page/dark_BACKGROUND.jpg";
const BRAND = {
  primary: "#060C2A",
  hover: "#f31524",
  light: "rgba(243, 21, 36, 0.2)",
  border: "rgba(107,15,15,0.15)",
};

// ICON mapping - icons are kept client-side
const ICONS = {
  "laser-cutting": Zap,
  "laser-welding": Wrench,
  "laser-marking": FileText,
  "laser-engraving": BookOpen,
  "laser-4-0": Cpu,
};

// helper: slugify a section title => unique id
const slugify = (text: string) =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

const KnowledgeBase = () => {
  const [dataGrouped, setDataGrouped] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [activeCategory, setActiveCategory] = useState("laser-cutting");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const contentRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const activeButtonRef = useRef<HTMLButtonElement>(null);

  // fetch all rows from Supabase and group
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const { data, error: supaErr } = await supabase
          .from("knowledge")
          .select("category, topic, section_number, section_title, content");

        if (supaErr) throw supaErr;
        if (!mounted) return;

        // Group rows -> category -> topic -> sections
        const grouped: any = {};
        (data || []).forEach((row: any) => {
          const categoryKey = (row.category || "Uncategorized").toString();
          const topicKey = (row.topic || "General").toString();
          const sectionTitle =
            row.section_title || row.section_number || "Untitled";
          const sectionId = slugify(
            sectionTitle + "-" + (row.section_number || "")
          );
          const sectionObj = {
            id: sectionId,
            title: sectionTitle,
            section_number: row.section_number || "",
            content: row.content || "",
          };

          if (!grouped[categoryKey])
            grouped[categoryKey] = {
              id: categoryKey,
              title: categoryKey,
              topics: {},
            };
          if (!grouped[categoryKey].topics[topicKey])
            grouped[categoryKey].topics[topicKey] = {
              id: topicKey,
              title: topicKey,
              sections: [],
            };

          grouped[categoryKey].topics[topicKey].sections.push(sectionObj);
        });

        // Convert grouped map -> array
        const categories = Object.keys(grouped).map((catKey) => {
          const topicMap = grouped[catKey].topics;
          const topics = Object.keys(topicMap).map((tKey) => {
            return {
              id: tKey,
              title: topicMap[tKey].title,
              sections: topicMap[tKey].sections,
            };
          });
          return {
            id: catKey,
            title: grouped[catKey].title,
            topics,
          };
        });

        if (mounted) {
          setDataGrouped({ categories });
          const hasDefault = categories.some((c) => c.id === activeCategory);
          if (!hasDefault && categories.length > 0) {
            setActiveCategory(categories[0].id);
          }
        }
      } catch (err: any) {
        console.error(err);
        if (mounted) setError(err.message || String(err));
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper: get active category object
  const activeCategories = dataGrouped?.categories?.find(
    (c: any) => c.id === activeCategory
  );

  // Intersection Observer: track visible section
  useEffect(() => {
    if (!contentRef.current) return;
    observerRef.current?.disconnect();

    const options = {
      root: null,
      rootMargin: "-20% 0px -35% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = contentRef.current.querySelectorAll("[data-section]");
    sections.forEach((section) => observerRef.current!.observe(section));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [activeCategory, dataGrouped, mobileNavOpen]);

  // Scroll to section handler
  const handleSidebarClick = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 100;
      const elementPosition =
        el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
    setMobileNavOpen(false);
  };

  // Auto scroll active category button into view on mobile nav
  useEffect(() => {
    if (activeButtonRef.current && navContainerRef.current) {
      setTimeout(() => {
        activeButtonRef.current!.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }, 0);
    }
  }, [activeCategory, dataGrouped]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
        <header
          className="relative overflow-hidden mt-16 md:mt-20 bg-black"
          style={{
            backgroundImage: `url(${logo})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm mb-6">
                <BookOpen className="text-white" size={20} />
                <span className="text-white text-sm font-medium">
                  Knowledge Center
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
                Laser University
              </h1>
              <p className="text-xl pb-4 text-white/90 mb-8 max-w-2xl mx-auto">
                Loading content...
              </p>
            </div>
          </div>
        </header>

        <div className="">
          <Loading text="Content" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl text-center p-6 bg-white border rounded">
          <h3 className="text-lg font-semibold mb-2">Error loading content</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white"
            onClick={() => {
              setLoading(true);
              setError(null);
              window.location.reload();
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (
    !dataGrouped ||
    !dataGrouped.categories ||
    dataGrouped.categories.length === 0
  ) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h3 className="text-2xl font-semibold mb-4">No content found</h3>
          <p className="text-gray-600">Your knowledge table is empty or missing rows.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* Hero Section */}
      <header
        className="relative overflow-hidden mt-16 md:mt-20 bg-black"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm mb-6">
              <BookOpen className="text-white" size={20} />
              <span className="text-white text-sm font-medium">Knowledge Center</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6">
              Laser University
            </h1>
            <p className="text-xl pb-4 text-white/90 mb-8 max-w-2xl mx-auto">
              Take your creativity to the next level with comprehensive laser technology education
            </p>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={navContainerRef}
            className="flex gap-2 overflow-x-auto py-4 hide-scrollbar"
          >
            {dataGrouped.categories.map((category: any) => {
              const Icon = ICONS[category.id] || BookOpen;
              const isActive = activeCategory === category.id;

              return (
                <button
                  onClick={() => {
                    setActiveCategory(category.id);
                    setMobileNavOpen(false);
                    setActiveSection("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  key={category.id}
                  ref={isActive ? activeButtonRef : null}
                  className="flex items-center gap-2 px-6 py-3 whitespace-nowrap rounded-lg transition-all flex-shrink-0"
                  style={{
                    backgroundColor: isActive ? BRAND.light : "transparent",
                    color: isActive ? BRAND.primary : "#6b7280",
                    fontWeight: isActive ? "600" : "500",
                    border: `2px solid ${isActive ? BRAND.border : "transparent"}`,
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
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-32 self-start max-h-[calc(100vh-10rem)] overflow-y-auto">
            <div className="bg-white shadow-sm p-6 border" style={{ borderColor: BRAND.border }}>
              <div className="flex items-center gap-2 mb-6 pb-4 border-b" style={{ borderColor: BRAND.border }}>
                <BookOpen size={20} style={{ color: BRAND.primary }} />
                <h2 className="font-semibold" style={{ color: BRAND.primary }}>Table of Contents</h2>
              </div>

              <nav className="space-y-6">
                {activeCategories?.topics.map((topic: any, topicIdx: number) => (
                  <div key={topic.id}>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: BRAND.primary }}>
                      <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: BRAND.light }}>
                        {topicIdx + 1}
                      </span>
                      <span className="line-clamp-2">{topic.title}</span>
                    </h3>

                    <ul className="space-y-1 ml-8">
                      {topic.sections.map((section: any) => {
                        const isActive = activeSection === section.id;

                        return (
                          <li key={section.id}>
                            <button
                              onClick={() => handleSidebarClick(section.id)}
                              className="text-sm text-left w-full px-3 py-2 rounded-lg transition-all flex items-center gap-2 group"
                              style={{
                                backgroundColor: isActive ? BRAND.light : "transparent",
                                color: isActive ? BRAND.primary : "#6b7280",
                                fontWeight: isActive ? "500" : "400",
                              }}
                            >
                              <ChevronRight size={14} className={`transition-transform ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
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

          {/* Mobile Nav Toggle */}
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
                    {activeCategories?.topics.map((topic: any, topicIdx: number) => (
                      <div key={topic.id}>
                        <h3 className="font-semibold text-sm mb-3 flex items-center gap-2" style={{ color: BRAND.primary }}>
                          <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ backgroundColor: BRAND.light }}>
                            {topicIdx + 1}
                          </span>
                          {topic.title}
                        </h3>

                        <ul className="space-y-1 ml-8">
                          {topic.sections.map((section: any) => {
                            const isActive = activeSection === section.id;

                            return (
                              <li key={section.id}>
                                <button
                                  onClick={() => handleSidebarClick(section.id)}
                                  className="text-sm text-left w-full px-3 py-2 rounded-lg transition-all"
                                  style={{
                                    backgroundColor: isActive ? BRAND.light : "transparent",
                                    color: isActive ? BRAND.primary : "#6b7280",
                                    fontWeight: isActive ? "500" : "400",
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

          {/* Main Content */}
          <main className="flex-1" ref={contentRef}>
            <div className="bg-white shadow-sm border" style={{ borderColor: BRAND.border }}>
              {activeCategories?.topics.map((topic: any, topicIdx: number) => (
                <div key={topic.id} className="border-b last:border-b-0" style={{ borderColor: BRAND.border }}>
                  <div className="p-6 sm:p-8 lg:p-10">
                    {/* Topic Header */}
                    <div className="flex items-start gap-4 mb-8">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: BRAND.light }}
                      >
                        <span className="text-xl font-bold" style={{ color: BRAND.primary }}>
                          {topicIdx + 1}
                        </span>
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

                    {/* All Sections */}
                    {topic.sections.map((section: any, idx: number) => (
                      <section key={section.id} id={section.id} data-section className="mb-12 last:mb-0 scroll-mt-32">
                        {/* Section Header */}
                        <div className="flex items-start gap-3 mb-4">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-semibold"
                            style={{ backgroundColor: BRAND.light, color: BRAND.primary }}
                          >
                            {idx + 1}
                          </div>

                          <h3 className="text-xl md:text-2xl font-semibold flex-1" style={{ color: BRAND.primary }}>
                            {section.title}
                          </h3>
                        </div>

                        {/* Section Content */}
                        <div className="prose max-w-none pl-11">
                          {section.content.split("\n\n").map((paragraph: string, pIdx: number) => {
                            if (paragraph.trim().startsWith("•")) {
                              const items = paragraph.split("\n").filter((line) => line.trim());
                              return (
                                <ul key={pIdx} className="space-y-2 mb-6">
                                  {items.map((item: string, itemIdx: number) => (
                                    <li key={itemIdx} className="text-gray-700 leading-relaxed flex items-start gap-3">
                                      <span
                                        className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                                        style={{ backgroundColor: BRAND.primary }}
                                      ></span>
                                      <span>{item.replace("•", "").trim()}</span>
                                    </li>
                                  ))}
                                </ul>
                              );
                            }

                            return (
                              <p key={pIdx} className="text-gray-700 mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          })}
                        </div>

                        {idx < topic.sections.length - 1 && (
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
          </main>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar for sidebar */
        aside::-webkit-scrollbar {
          width: 6px;
        }
        aside::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        aside::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeBase;
