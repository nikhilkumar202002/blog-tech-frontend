"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { getBlogs } from "@/app/utils/blog";

export interface BlogGridProps {
  className?: string;
}

interface ApiBlogPost {
  id: number | string;
  title: string;
  slug: string;
  description?: string | null;
  excerpt?: string | null;
  featured_image?: string | null;
  featured_image_url?: string | null;
  category?: {
    id?: number;
    name?: string;
    slug?: string;
  } | null;
}

const BlogGrid: React.FC<BlogGridProps> = ({ className = "" }) => {
  const [posts, setPosts] = useState<ApiBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchBlogs = async () => {
      try {
        const res = await getBlogs();
        const items: ApiBlogPost[] = Array.isArray(res?.data) ? res.data : [];
        if (isMounted) {
          setPosts(items);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBlogs();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className={`w-full py-16 sm:py-20 lg:py-24 bg-stone-50/50 border-t border-stone-200/60 overflow-hidden ${className}`}
    >
      <div className="site-container w-full">
        {/* 3-Column Card Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="flex flex-col bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 animate-pulse"
              >
                <div className="w-full h-[210px] rounded-xl bg-stone-200 mb-4" />
                <div className="h-3 w-24 bg-stone-200 rounded mb-3" />
                <div className="h-5 w-4/5 bg-stone-200 rounded mb-2" />
                <div className="space-y-2 mb-5">
                  <div className="h-3.5 w-full bg-stone-100 rounded" />
                  <div className="h-3.5 w-5/6 bg-stone-100 rounded" />
                </div>
                <div className="pt-3 border-t border-stone-100">
                  <div className="h-4 w-24 bg-stone-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, idx) => {
              const imageUrl =
                post.featured_image_url || post.featured_image || "";
              const summary = post.excerpt || post.description || "";
              const categoryName = post.category?.name || "Article";
              const numberLabel = String(idx + 1).padStart(2, "0");

              return (
                <motion.article
                  key={post.id ?? post.slug}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: (idx % 3) * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#A44B03]/30 transition-all duration-300"
                >
                  {/* Card Image */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative w-full h-[200px] sm:h-[220px] rounded-xl overflow-hidden mb-4 bg-stone-100 block"
                  >
                    {imageUrl && (
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </Link>

                  {/* Number & Category */}
                  <div className="text-xs font-semibold text-[#A44B03] uppercase tracking-wider font-[var(--font-dm-sans)] mb-2 flex items-center gap-1.5">
                    <span>{numberLabel}</span>
                    <span>—</span>
                    <span>{categoryName}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-semibold text-stone-900 leading-snug font-[var(--font-dm-sans)] mb-2 group-hover:text-[#A44B03] transition-colors duration-200 line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed font-[var(--font-dm-sans)] mb-5 line-clamp-3 flex-grow">
                    {summary}
                  </p>

                  {/* Read Article CTA */}
                  <div className="pt-3 border-t border-stone-100 mt-auto">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 group-hover:text-[#A44B03] transition-colors duration-200"
                    >
                      <span>Read Article</span>
                      <FiArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#A44B03]" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-10 border border-stone-200/80 text-center">
            <p className="text-stone-500 text-sm sm:text-base font-[var(--font-dm-sans)]">
              No blog articles published yet.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;
