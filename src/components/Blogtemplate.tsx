import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { supabase } from "../lib/supabase";

interface ContentSection {
  description: string;
  image: string | null;
}

interface BlogPost {
  id: string;
  title: string;
  summary: string;
  image: string;
  content: Record<string, ContentSection>;
  author: string;
  designation: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  shareCount?: number;
}

const BRAND = {
  primary: '#6b0f0f',
  hover: '#4f0b0b',
  light: '#fef2f2',
  border: 'rgba(107,15,15,0.15)',
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
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          setBlog(null);
        } else if (data) {
          let content: Record<string, ContentSection>;
          if (typeof data.content === 'string') {
            try {
              content = JSON.parse(data.content);
            } catch {
              content = {};
            }
          } else {
            content = data.content;
          }
          setBlog({
            id: data.id,
            title: data.title,
            summary: data.summary,
            image: data.image,
            content: content,
            author: data.author,
            designation: data.designation,
            authorImage: data.author_image,
            date: data.created_at,
            readTime: data.read_time,
            category: data.category,
            tags: data.tags || [],
            shareCount: 0,
          });
        }
        setLoading(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
        // ignore error
      }
    }
  }, [blog]);

  const goBack = () => navigate(-1);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50">
        <div className="text-center">
          <div className="inline-flex space-x-2 mb-4">
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: BRAND.primary }}></div>
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: BRAND.primary, animationDelay: '0.2s' }}></div>
            <div className="w-3 h-3 rounded-full animate-pulse" style={{ backgroundColor: BRAND.primary, animationDelay: '0.4s' }}></div>
          </div>
          <p className="text-sm font-medium" style={{ color: BRAND.primary }}>Loading article</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-red-50 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: BRAND.primary }}>404</h1>
          <p className="text-gray-600 mb-8 text-lg">Article not found</p>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-2 px-8 py-3 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND.primary }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BRAND.hover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = BRAND.primary}
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
      <Navbar />
      <main className="flex-grow">
        <header className="md:pt-4 top-0 mt-20 z-50 bg-white/80 backdrop-blur-md border-b" style={{ borderColor: BRAND.border }}>
          <div className="w-full pb-2 mx-auto px-4 sm:px-6 lg:px-12 ">
            <button
              onClick={goBack}
              className="inline-flex items-left text-sm font-semibold duration-300 hover:gap-3"
              style={{ color: BRAND.primary }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Articles</span>
            </button>
          </div>
        </header>

        <div className="relative w-full">
          <div className="relative w-full h-[40vh] sm:h-[50vh] lg:h-[65vh] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute top-6 left-6 sm:left-12 z-20">
              <span
                className="inline-block px-4 py-2 text-md font-medium text-white backdrop-blur-sm shadow-lg"
                style={{ backgroundColor: 'rgba(107, 15, 15, 0.9)' }}
              >
                {blog.category}
              </span>
            </div>
          </div>

          {/* Banner/Card with Title, Summary, Author, Meta */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-32 lg:-mt-40 z-20">
            <div className="bg-white shadow-xl p-6 sm:p-8 lg:p-12 backdrop-blur-sm border">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-4 sm:mb-6 leading-tight">
                {blog.title}
              </h1>
              <p className="text-base sm:text-lg lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mb-8">
                {blog.summary}
              </p>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border py-3 px-4" >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={blog.authorImage}
                      alt={blog.author}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                      loading="lazy"
                    />
                    <div
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white shadow-md"
                      style={{ backgroundColor: BRAND.primary }}
                    ></div>
                  </div>
                  <div>
                    <p className="text-xl font-medium text-gray-900">{blog.author}</p>
                    <p className="text-md text-gray-500">{blog.designation}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:gap-7">
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: BRAND.light }}>
                      <Calendar className="w-4 h-4" style={{ color: BRAND.primary }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published</p>
                      <time dateTime={blog.date} className="text-sm font-semibold text-gray-900">
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: BRAND.light }}>
                      <Clock className="w-4 h-4" style={{ color: BRAND.primary }} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Read Time</p>
                      <span className="text-sm font-semibold text-gray-900">{blog.readTime}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-6 py-3 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
                    style={{ backgroundColor: BRAND.primary }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = BRAND.hover}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = BRAND.primary}
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

        {/* Content Sections */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <article className="py-8 sm:py-12 lg:py-16">
            <div className="bg-white p-6 sm:p-10 lg:p-16 mb-12 border">
              <div className="prose prose-lg max-w-none">
                {Object.entries(blog.content).map(([heading, section], idx) => (
                  <div key={heading} className={idx > 0 ? "mt-12 pt-12 border-t" : ""} style={{ borderColor: idx > 0 ? BRAND.border : 'transparent' }}>
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="flex-shrink-0 w-1 md:w-1.5 h-8 md:h-12 mt-1"
                        style={{ backgroundColor: BRAND.primary }}
                      ></div>
                      <h2 className="text-2xl pt-1 sm:text-3xl lg:text-4xl font-medium text-gray-900 leading-tight">
                        {heading}
                      </h2>
                    </div>
                    <p className="text-gray-700 text-base sm:text-lg leading-relaxed pl-8">
                      {section.description}
                    </p>
                    {section.image && (
                      <div className="mt-6 pl-8">
                        <img
                          src={section.image}
                          alt={`${heading} illustration`}
                          className="w-full max-w-4xl rounded-lg shadow-md"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white shadow-md p-6 sm:p-8 mb-12 border">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg" style={{ backgroundColor: BRAND.light }}>
                  <Tag className="w-5 h-5" style={{ color: BRAND.primary }} />
                </div>
                <span className="text-lg font-medium text-black">Tags</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-5 py-2.5 text-sm font-semibold transition-all duration-300"
                    style={{
                      backgroundColor: BRAND.light,
                      color: BRAND.primary
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </main>
      </main>
      <Footer />
    </div>
  );
};

export default React.memo(BlogTemplate);
