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
  ChevronDown,
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

const ICONS: any = {
  "laser-cutting": Zap,
  "laser-welding": Wrench,
  "laser-marking": FileText,
  "laser-engraving": BookOpen,
  "laser-4-0": Cpu,
};

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
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const [topics, setTopics] = useState<any[]>([]);
  const [loadingCategory, setLoadingCategory] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [blocksBySubtopic, setBlocksBySubtopic] = useState<Record<string, any[]>>({});
  const [loadedSubtopics, setLoadedSubtopics] = useState<Record<string, boolean>>({});

  const [activeSection, setActiveSection] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const sidebarRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const blockContainerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Fetch distinct categories on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setError(null);

        const { data: rawTopics, error } = await supabase
          .from("topics")
          .select("category")
          .not("category", "is", null)
          .order("category", { ascending: true });

        if (error) throw error;

        const distinctCategories = Array.from(
          new Set(rawTopics?.map((t) => t.category).filter(Boolean))
        ).sort();

        const categoriesData = distinctCategories.map((cat) => ({
          id: cat,
          title: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " "),
        }));

        if (mounted) {
          setCategories(categoriesData);
          if (categoriesData.length > 0) setActiveCategory(categoriesData[0].id);
        }
      } catch (e: any) {
        if (mounted) setError(e.message);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch topics and subtopics for active category
  useEffect(() => {
    if (!activeCategory) return;

    let mounted = true;

    (async () => {
      try {
        setLoadingCategory(true);
        setError(null);

        const { data: fetchedTopics, error: err1 } = await supabase
          .from("topics")
          .select("*")
          .eq("category", activeCategory)
          .order("title", { ascending: true });

        if (err1) throw err1;

        const topicIds = fetchedTopics?.map((t) => t.id) || [];

        const { data: fetchedSubtopics, error: err2 } = await supabase
          .from("subtopics")
          .select("*")
          .in("topic_id", topicIds)
          .order("order_index");

        if (err2) throw err2;

        const topicsWithSubtopics = fetchedTopics.map((topic) => ({
          ...topic,
          subtopics: fetchedSubtopics.filter((sub) => sub.topic_id === topic.id),
        }));

        if (mounted) {
          setTopics(topicsWithSubtopics);
          setLoadedSubtopics({});
          setBlocksBySubtopic({});
          setActiveSection("");
        }
      } catch (e: any) {
        if (mounted) setError(e.message);
      } finally {
        if (mounted) setLoadingCategory(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeCategory]);

  // IntersectionObserver to detect active section with improved sidebar scrolling
  useEffect(() => {
    if (!contentRef.current) return;
    
    let scrollTimeout: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let mostVisible = entries[0];
        entries.forEach((entry) => {
          if (entry.intersectionRatio > mostVisible.intersectionRatio) {
            mostVisible = entry;
          }
        });

        if (mostVisible && mostVisible.isIntersecting) {
          const sectionId = mostVisible.target.id;
          setActiveSection(sectionId);

          // Debounce sidebar scroll for smoother experience
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            if (sidebarRef.current && sidebarRefs.current[sectionId]) {
              const sidebar = sidebarRef.current;
              const button = sidebarRefs.current[sectionId];
              
              if (button) {
                const sidebarRect = sidebar.getBoundingClientRect();
                const buttonRect = button.getBoundingClientRect();
                
                // Add padding for better visibility
                const padding = 100;
                const isVisible = 
                  buttonRect.top >= sidebarRect.top + padding &&
                  buttonRect.bottom <= sidebarRect.bottom - padding;
                
                if (!isVisible) {
                  // Center the button in the sidebar view
                  const targetScroll = button.offsetTop - sidebar.clientHeight / 2 + button.clientHeight / 2;
                  
                  sidebar.scrollTo({
                    top: targetScroll,
                    behavior: "smooth",
                  });
                }
              }
            }
          }, 100);
        }
      },
      { 
        rootMargin: "-10% 0px -70% 0px", 
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
      }
    );

    const sections = contentRef.current.querySelectorAll("[data-section]");
    sections.forEach((sec) => observer.observe(sec));

    return () => {
      clearTimeout(scrollTimeout);
      observer.disconnect();
    };
  }, [topics]);

  // Lazy load content blocks for subtopics on scroll
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (!entry.isIntersecting) return;

          const subtopicId = entry.target.getAttribute("data-subtopic-id");
          if (!subtopicId) return;

          if (loadedSubtopics[subtopicId]) return;

          try {
            const { data: blocks, error } = await supabase
              .from("content_blocks")
              .select("*")
              .eq("subtopic_id", subtopicId)
              .order("order_index");

            if (error) throw error;

            setBlocksBySubtopic((prev) => ({
              ...prev,
              [subtopicId]: blocks,
            }));
            setLoadedSubtopics((prev) => ({
              ...prev,
              [subtopicId]: true,
            }));
          } catch (e) {
            console.error("Error loading blocks for subtopic", subtopicId, e);
          }
        });
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    Object.values(blockContainerRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [topics, loadedSubtopics]);

  // Scroll to subtopic on sidebar click
  const handleSidebarClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 120;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({ top, behavior: "smooth" });
    setMobileNavOpen(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCategoryDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!activeCategory) return <Loading text="Loading Categories..." />;
  if (loadingCategory) return <Loading text="Loading Topics..." />;

  const activeCategoryObj = categories.find((c) => c.id === activeCategory);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      {/* HERO */}
      <header
        className="relative overflow-hidden mt-16 md:mt-20 bg-black"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm mb-6">
            <BookOpen className="text-white" size={20} />
            <span className="text-white text-sm font-medium">Knowledge Center</span>
          </div>

          <h1 className="text-3xl md:text-5xl text-white font-bold mb-4">
            Laser University
          </h1>
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto px-4">
            Your complete hub for advanced laser technology education.
          </p>
        </div>
      </header>

      {/* CATEGORY BAR - Desktop */}
      <div className="bg-white shadow-sm sticky top-16 z-40 hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 hide-scrollbar">
            {categories.map((cat) => {
              const Icon = ICONS[cat.id] || BookOpen;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className="flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg whitespace-nowrap transition-all text-sm md:text-base"
                  style={{
                    backgroundColor: isActive ? BRAND.light : "transparent",
                    color: isActive ? BRAND.primary : "#6b7280",
                    border: `2px solid ${isActive ? BRAND.border : "transparent"}`,
                  }}
                >
                  <Icon size={18} />
                  {cat.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CATEGORY DROPDOWN - Mobile */}
      <div className="bg-white shadow-sm sticky top-16 z-40 md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-2"
            style={{
              backgroundColor: BRAND.light,
              borderColor: BRAND.border,
              color: BRAND.primary,
            }}
          >
            <div className="flex items-center gap-2">
              {React.createElement(ICONS[activeCategory] || BookOpen, { size: 18 })}
              <span className="font-medium text-sm">{activeCategoryObj?.title || "Select Category"}</span>
            </div>
            <ChevronDown
              size={20}
              className={`transition-transform ${categoryDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {categoryDropdownOpen && (
            <div
              className="absolute left-4 right-4 mt-2 bg-white border-2 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50"
              style={{ borderColor: BRAND.border }}
            >
              {categories.map((cat) => {
                const Icon = ICONS[cat.id] || BookOpen;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-sm"
                    style={{
                      backgroundColor: isActive ? BRAND.light : "transparent",
                      color: isActive ? BRAND.primary : "#6b7280",
                    }}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{cat.title}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 lg:gap-8 relative">
        {/* SIDEBAR - Desktop */}
        <aside
          ref={sidebarRef}
          className="hidden lg:block w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-32 self-start max-h-[calc(100vh-10rem)] overflow-y-auto"
        >
          <div className="bg-white shadow-md p-4 xl:p-6 border border-gray-200 rounded-lg">
            <h2
              className="font-bold text-base xl:text-lg mb-4 flex items-center gap-2 pb-3 border-b"
              style={{ color: BRAND.primary, borderColor: BRAND.border }}
            >
              <BookOpen size={20} /> Table of Contents
            </h2>

            {topics.map((topic, tIdx) => (
              <div key={topic.id} className="mb-6 last:mb-0">
                <h3
                  className="font-semibold text-sm mb-3 flex items-center gap-2"
                  style={{ color: BRAND.primary }}
                >
                  <span
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ backgroundColor: BRAND.light }}
                  >
                    {tIdx + 1}
                  </span>
                  <span className="break-words">{topic.title}</span>
                </h3>

                <ul className="ml-9 space-y-1">
                  {topic.subtopics.map((sub: any, idx: number) => {
                    const secId = slugify(sub.title);
                    const active = activeSection === secId;

                    return (
                      <li key={sub.id}>
                        <button
                          ref={(el) => (sidebarRefs.current[secId] = el)}
                          onClick={() => handleSidebarClick(secId)}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all hover:shadow-sm flex items-start gap-2"
                          style={{
                            backgroundColor: active ? BRAND.light : "transparent",
                            color: active ? BRAND.primary : "#6b7280",
                            fontWeight: active ? 600 : 400,
                            border: active ? `1px solid ${BRAND.border}` : "1px solid transparent",
                          }}
                        >
                          <span className="flex-shrink-0 font-semibold text-xs">{idx + 1}.</span>
                          <span className="break-words leading-snug">{sub.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* MOBILE SIDEBAR BUTTON */}
        <button
          onClick={() => setMobileNavOpen((open) => !open)}
          className="lg:hidden fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-50"
          style={{ backgroundColor: BRAND.primary }}
        >
          {mobileNavOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </button>

        {/* MOBILE SIDEBAR */}
        {mobileNavOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            style={{ top: "4rem" }}
            onClick={() => setMobileNavOpen(false)}
          >
            <div
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className="font-semibold mb-4 flex items-center gap-2"
                style={{ color: BRAND.primary }}
              >
                <BookOpen size={20} /> Table of Contents
              </h2>

              {topics.map((topic, tIdx) => (
                <div key={topic.id} className="mb-6">
                  <h3
                    className="font-semibold text-sm mb-2 flex items-center gap-2"
                    style={{ color: BRAND.primary }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: BRAND.light }}
                    >
                      {tIdx + 1}
                    </span>
                    <span className="break-words">{topic.title}</span>
                  </h3>

                  <ul className="ml-6 space-y-1">
                    {topic.subtopics.map((sub: any, idx: number) => {
                      const secId = slugify(sub.title);
                      return (
                        <li key={sub.id}>
                          <button
                            onClick={() => handleSidebarClick(secId)}
                            className="w-full text-left px-2 py-2 text-sm text-gray-700 hover:text-gray-900 flex items-start gap-2"
                          >
                            <span className="flex-shrink-0 text-xs">{idx + 1}.</span>
                            <span className="break-words">{sub.title}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT AREA */}
        <main className="flex-1 min-w-0 w-full" ref={contentRef}>
          <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
            {topics.map((topic, tIdx) => (
              <div
                key={topic.id}
                className="border-b last:border-0"
                style={{ borderColor: BRAND.border }}
              >
                {/* TOPIC HEADER */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 mb-6 md:mb-8 pb-4 md:pb-6 border-b" style={{ borderColor: BRAND.border }}>
                    <div
                      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl font-bold text-xl md:text-2xl flex-shrink-0"
                      style={{ backgroundColor: BRAND.light, color: BRAND.primary }}
                    >
                      {tIdx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 break-words"
                        style={{ color: BRAND.primary }}
                      >
                        {topic.title}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        {topic.subtopics.length * 5} min read • {topic.subtopics.length} sections
                      </p>
                    </div>
                  </div>

                  {/* SUBTOPICS */}
                  {topic.subtopics.map((sub, sIdx) => {
                    const secId = slugify(sub.title);
                    const blocks = blocksBySubtopic[sub.id];

                    return (
                      <section
                        key={sub.id}
                        id={secId}
                        data-section
                        data-subtopic-id={sub.id}
                        className="mb-8 md:mb-12 scroll-mt-32"
                        ref={(el) => (blockContainerRefs.current[secId] = el)}
                      >
                        {/* SUBTOPIC HEADER */}
                        <div className="flex items-start gap-2 md:gap-3 mb-4">
                          <div
                            className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-sm font-semibold flex-shrink-0"
                            style={{
                              backgroundColor: BRAND.light,
                              color: BRAND.primary,
                            }}
                          >
                            {sIdx + 1}
                          </div>

                          <h3
                            style={{ color: BRAND.primary }}
                            className="text-xl sm:text-2xl md:text-3xl font-semibold break-words leading-tight"
                          >
                            {sub.title}
                          </h3>
                        </div>

                        {/* CONTENT BLOCKS */}
                        <div className="px-2 prose prose-sm sm:prose-base lg:prose-lg max-w-none pl-10 md:pl-12">
                          {blocks ? (
                            blocks.length > 0 ? (
                              blocks.map((block: any) => {
                                if (block.block_type === "paragraph") {
                                  return (
                                    <p key={block.id} className="mb-4 text-gray-700 break-words leading-relaxed">
                                      {block.content.text}
                                    </p>
                                  );
                                }
                                if (block.block_type === "list") {
                                  return (
                                    <ul key={block.id} className="mb-4 space-y-2 list-disc pl-5">
                                      {block.content.items.map((item: string, idx: number) => (
                                        <li key={idx} className="text-gray-700 break-words leading-relaxed">
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  );
                                }
                                if (block.block_type === "table") {
  const { headers, rows } = block.content;
  return (
    <div
      key={block.id}
      className="mb-8 px-4 -mx-4 sm:px-0 sm:mx-0"
    >
      <div className="inline-block min-w-full border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            {headers && (
              <thead>
                <tr className="bg-gradient-to-r  border-b-2 border-gray-200">
                  {headers.map((header: string, hi: number) => (
                    <th
                      key={hi}
                      className="px-6 py-4 text-left font-medium text-gray-800 text-sm md:text-base whitespace-nowrap first:pl-8 border-r border-gray-200 last:border-r-0"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rows.map((row: any[], ri: number) => (
                <tr
                  key={ri}
                  className="border-b border-gray-100 last:border-b-0 hover:bg-blue-50 transition-all duration-200 ease-in-out"
                >
                  {row.map((cell: string, ci: number) => (
                    <td
                      key={ci}
                      className="px-6 py-4 text-gray-700 text-sm md:text-base align-top break-words first:pl-8 border-r border-gray-100 last:border-r-0"
                    >
                      <div className="min-h-[2rem] flex items-center">
                        {cell}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
                                return null;
                              })
                            ) : (
                              <p className="text-gray-500 italic text-sm">No content available for this section.</p>
                            )
                          ) : (
                            <div className="flex items-center gap-2 py-6">
                              {/* <div className="animate-spin rounded-full h-5 w-5 border-b-2" style={{ borderColor: BRAND.primary }}></div> */}
                              <span style={{ color: BRAND.primary }} className="text-sm font-medium">
                                Laser Technologies
                              </span>
                            </div>
                          )}
                        </div>

                        {sIdx < topic.subtopics.length - 1 && (
                          <div className="mt-6 md:mt-8 pl-10 md:pl-12">
                            <div className="h-px" style={{ backgroundColor: BRAND.border }}></div>
                          </div>
                        )}
                      </section>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Styled scrollbar for sidebar */
        aside::-webkit-scrollbar {
          width: 8px;
        }
        aside::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
          margin: 4px 0;
        }
        aside::-webkit-scrollbar-thumb {
          background: ${BRAND.primary};
          border-radius: 10px;
          transition: background 0.2s;
        }
        aside::-webkit-scrollbar-thumb:hover {
          background: ${BRAND.hover};
        }
        
        /* Firefox scrollbar */
        aside {
          scrollbar-width: thin;
          scrollbar-color: ${BRAND.primary} #f1f5f9;
        }

        /* Responsive utilities */
        @media (max-width: 640px) {
          .prose {
            font-size: 0.875rem;
            line-height: 1.6;
          }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Remove tap highlight on mobile */
        * {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default KnowledgeBase;