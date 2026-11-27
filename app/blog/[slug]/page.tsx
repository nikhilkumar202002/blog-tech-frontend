import React from "react";
import { getBlogs } from "@/app/utils/blog";
import BlogDetailClient from "./BlogDetailClient";

const FALLBACK_BLOG_SLUGS = [
  "why-custom-software-development-is-essential-for-growing-businesses-in-2026",
];

export async function generateStaticParams() {
  try {
    const res = await getBlogs();
    const items = Array.isArray(res?.data) ? res.data : [];
    const slugs = items
      .map((item: { slug?: string }) => item.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0);

    if (slugs.length > 0) {
      return slugs.map((slug: string) => ({ slug }));
    }
  } catch (error) {
    console.error("Failed to fetch blog slugs for static params:", error);
  }

  return FALLBACK_BLOG_SLUGS.map((slug) => ({ slug }));
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
