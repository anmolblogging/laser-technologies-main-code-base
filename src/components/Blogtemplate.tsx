import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Calendar, Share2, Tag } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Loading from "./Loading";

interface BlogPost {
  id: string;
  title: string;
  image: string;
  content: string; // now a single HTML block
  author: string;
  designation: string;
  authorImage: string;
  date: string;
  category: string;
  tags: string[];
  shareCount?: number;
}

const BRAND = {
  primary: "#f31524",
  hover: "#f31524",
  light: "#fef2f2",
  border: "rgba(107,15,15,0.15)",
};

const getCategoryPath = (category: string) => {
  if (category === "News & Media") return "/news";
  if (category === "CSR") return "/csr";
  if (category === "Articles") return "/articles";
  return "/";
};

const BlogTemplate: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          setBlog(null);
        } else if (data) {
          let contentHtml = "";

          // If content is already a full HTML string (new way)
          if (typeof data.content === "string") {
            contentHtml = data.content;
          } else if (data.content && typeof data.content === "object") {
            // Backward compatibility: convert old JSON structure into HTML
            // data.content is assumed to be Record<string, { description: string; image?: string | null }>
            const sections = data.content as Record<
              string,
              { description: string; image?: string | null }
            >;

            contentHtml = Object.entries(sections)
              .map(([heading, section], index) => {
                const safeHeading = heading || "";
                const safeDescription = section?.description || "";
                const imageHtml = section?.image
                  ? `<div class="mt-6"><img src="${section.image}" alt="${safeHeading} illustration" style="max-width:100%;height:auto;" /></div>`
                  : "";

                return `
                  <section style="margin-top:${index > 0 ? "3rem" : "0"};padding-top:${index > 0 ? "3rem" : "0"};border-top:${index > 0 ? `1px solid ${BRAND.border}` : "none"};">
                    <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
                      <div style="flex-shrink:0;width:6px;height:48px;background-color:${BRAND.primary};margin-top:0.15em;"></div>
                      <h2 style="font-size:1.75rem;font-weight:500;color:#111827;margin:0;">${safeHeading}</h2>
                    </div>
                    <div style="padding-left:1.5rem;font-size:1.05rem;line-height:1.8;color:#374151;white-space:pre-line;">
                      ${safeDescription}
                    </div>
                    ${imageHtml}
                  </section>
                `;
              })
              .join("");
          }

          setBlog({
            id: data.id,
            title: data.title,
            image: data.image,
            content: contentHtml,
            author: data.author,
            designation: data.designation,
            authorImage: data.author_image,
            date: data.created_at,
            category: data.category,
            tags: data.tags || [],
            shareCount: 0,
          });
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      fetchBlog();
    }
  }, [id]);

  const handleShare = useCallback(async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error(`error in sharing -> ${err}`);
      }
    }
  }, [blog]);

  const goBack = () => navigate(-1);

  if (loading) {
    return <Loading text="Articles" />;
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50 px-4">
        <div className="text-center max-w-md">
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: BRAND.primary }}
          >
            404
          </h1>
          <p className="text-gray-600 mb-8 text-lg">Article not found</p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-8 py-3 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND.primary }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND.hover)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = BRAND.primary)
            }
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50">
      <main className="flex-grow">
        <header
          className="md:pt-4 top-0 mt-20 z-50 bg-white/80 backdrop-blur-md border-b"
          style={{ borderColor: BRAND.border }}
        >
          <div className="w-full pb-2 mx-auto px-4 sm:px-6 lg:px-12 ">
            <button
              onClick={goBack}
              className="inline-flex items-left text-sm font-semibold  bg-transparent hover:bg-transparent hover:text-black text-black "
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </button>
          </div>
        </header>

        <div className="relative w-full">
          <div className="relative object-center overflow-hidden">
            <div className="absolute inset-0"></div>
            <img
              src={blog.image}
              alt={blog.title}
              className=" w-full object-cover object-center"
              loading="eager"
            />
            <div className="absolute top-6 left-6 sm:left-12 z-20">
              <button
                onClick={() => navigate(getCategoryPath(blog.category))}
                className="inline-block px-4 py-2 text-md font-medium font-secondary text-white backdrop-blur-sm shadow-lg bg-whiteBgButtonBg hover:bg-whiteBgButtonBg  hover:bg-opacity-40 bg-opacity-40 cursor-pointer"
              >
                {blog.category}
              </button>
            </div>
          </div>

          {/* Banner/Card with Title, Author, Meta */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-32 lg:-mt-40 z-20">
            <div className="bg-white shadow-xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 leading-tight">
                {blog.title}
              </h1>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border py-3 px-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-contain ring-4 ring-white shadow-lg"
                      loading="lazy"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-md"
                      style={{ backgroundColor: BRAND.primary }}
                    ></div>
                  </div>
                  <div>
                    <p className="text-xl font-medium text-gray-900">
                      {blog.author}
                    </p>
                    <p className="text-md text-gray-500">{blog.designation}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-7">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: BRAND.light }}
                    >
                      <Calendar
                        className="w-4 h-4"
                        style={{ color: BRAND.primary }}
                      />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <time
                        dateTime={blog.date}
                        className="text-sm font-semibold text-gray-900"
                      >
                        {new Date(blog.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600"></div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 bg-whiteBgButtonBg bg-opacity-40 text-[#060C2A] text-sm font-semibold rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    aria-label="Share article"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <article className="py-8 sm:py-12 lg:py-16">
            <div className="bg-white p-6 sm:p-10 lg:p-16 mb-12 border">
              <div
                className="prose prose-lg max-w-none"
                // ⚠️ HTML from Supabase goes here
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

          </article>
        </main>
      </main>
    </div>
  );
};

export default React.memo(BlogTemplate);
