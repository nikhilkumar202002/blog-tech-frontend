"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiUser, FiTag } from "react-icons/fi";
import { getBlogBySlug, getBlogs } from "@/app/utils/blog";

interface BlogDetail {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  excerpt?: string | null;
  content?: string | null;
  featured_image?: string | null;
  featured_image_url?: string | null;
  published_at?: string | null;
  created_at?: string | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  } | null;
  author?: {
    id?: number;
    name?: string;
  } | null;
}

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return "";
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return "";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function BlogDetailClient() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [post, setPost] = useState<BlogDetail | null>(null);
  const [otherPosts, setOtherPosts] = useState<BlogDetail[]>([]);
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;

    const fetchData = async () => {
      try {
        const [detailRes, listRes] = await Promise.all([
          getBlogBySlug(slug),
          getBlogs().catch(() => null),
        ]);

        if (isMounted) {
          setPost(detailRes?.data ?? null);
          const allItems: BlogDetail[] = Array.isArray(listRes?.data)
            ? listRes.data
            : [];
          setOtherPosts(allItems.filter((item) => item.slug !== slug));
        }
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        if (isMounted) {
          setError("Blog article not found.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-[#f8f8f8] pt-28 pb-20">
        <div className="site-container animate-pulse space-y-6">
          <div className="h-5 w-32 bg-stone-200 rounded" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white rounded-[25px] p-8 space-y-4">
              <div className="h-8 w-3/4 bg-stone-200 rounded" />
              <div className="aspect-[16/9] bg-stone-100 rounded-[18px]" />
              <div className="h-4 w-full bg-stone-100 rounded" />
              <div className="h-4 w-5/6 bg-stone-100 rounded" />
            </div>
            <div className="lg:col-span-4 bg-white rounded-[25px] p-6 h-[280px]" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="w-full min-h-screen bg-[#f8f8f8] pt-36 pb-20">
        <div className="site-container text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-medium text-stone-900 font-[var(--font-dm-sans)]">
            {error || "Blog article not found."}
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A44B03] hover:underline font-[var(--font-dm-sans)]"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </main>
    );
  }

  const featuredImage = post.featured_image_url || post.featured_image;
  const formattedDate = formatDate(post.published_at || post.created_at);

  return (
    <main className="w-full min-h-screen bg-[#f8f8f8] pt-28 md:pt-36 pb-20 text-stone-900">
      <div className="site-container">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-[#A44B03] transition-colors font-[var(--font-dm-sans)]"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px] lg:gap-[32px] items-start">
          {/* Left Side: Blog Content */}
          <article className="lg:col-span-8 bg-white rounded-[25px] p-6 sm:p-8 lg:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-500 font-[var(--font-dm-sans)]">
              {post.category?.name && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#A44B03] bg-[#FAF2E4] px-3 py-1 rounded-full">
                  <FiTag className="w-3 h-3" />
                  {post.category.name}
                </span>
              )}
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <FiCalendar className="w-3.5 h-3.5 text-[#A44B03]" />
                  {formattedDate}
                </span>
              )}
              {post.author?.name && (
                <span className="inline-flex items-center gap-1.5">
                  <FiUser className="w-3.5 h-3.5 text-[#A44B03]" />
                  {post.author.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-stone-900 tracking-tight leading-tight font-[var(--font-dm-sans)]">
              {post.title}
            </h1>

            {featuredImage && (
              <div className="w-full aspect-[16/9] rounded-[18px] overflow-hidden bg-stone-100">
                <img
                  src={featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {post.content ? (
              <div
                className="pt-2 text-stone-600 font-[var(--font-inter)] leading-relaxed space-y-4 [&_h1]:text-2xl [&_h1]:font-medium [&_h1]:text-stone-900 [&_h1]:font-[var(--font-dm-sans)] [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-stone-900 [&_h2]:mt-6 [&_h2]:font-[var(--font-dm-sans)] [&_h2_p]:text-base [&_h2_p]:font-normal [&_h2_p]:text-stone-600 [&_h2_p]:mt-2 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-stone-900 [&_h3]:mt-4 [&_h3]:font-[var(--font-dm-sans)] [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li_p]:m-0 [&_strong]:text-stone-900"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              (post.description || post.excerpt) && (
                <p className="text-stone-600 text-base leading-relaxed font-[var(--font-inter)]">
                  {post.description || post.excerpt}
                </p>
              )
            )}
          </article>

          {/* Right Side: Other Blogs Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-[25px] p-6">
              <h2 className="text-[18px] font-medium text-stone-900 mb-4 pb-3 border-b border-stone-100 font-[var(--font-dm-sans)]">
                Other Blogs
              </h2>

              {otherPosts.length > 0 ? (
                <nav aria-label="Other Blogs" className="flex flex-col gap-3">
                  {otherPosts.map((item) => {
                    const thumb =
                      item.featured_image_url || item.featured_image;
                    return (
                      <Link
                        key={item.id ?? item.slug}
                        href={`/blog/${item.slug}`}
                        className="group flex items-start gap-3 p-2.5 rounded-[14px] hover:bg-[#FAF2E4]/60 transition-colors duration-200"
                      >
                        {thumb && (
                          <div className="w-16 h-14 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                            <img
                              src={thumb}
                              alt={item.title}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          {item.category?.name && (
                            <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#A44B03] font-[var(--font-dm-sans)] mb-0.5">
                              {item.category.name}
                            </span>
                          )}
                          <h3 className="text-[14px] font-medium text-stone-800 group-hover:text-[#A44B03] leading-snug line-clamp-2 font-[var(--font-dm-sans)] transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              ) : (
                <p className="text-[14px] text-stone-400 font-[var(--font-inter)]">
                  No other blogs available.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
