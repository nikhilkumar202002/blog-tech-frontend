import React from "react";
import { getBlogs } from "@/app/utils/blog";
import BlogDetailClient from "./BlogDetailClient";

export async function generateStaticParams() {
  const res = await getBlogs();
  const items = Array.isArray(res?.data) ? res.data : [];
  return items
    .map((item: { slug?: string }) => item.slug)
    .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug: string) => ({ slug }));
}

export default function BlogDetailPage() {
  return <BlogDetailClient />;
}
