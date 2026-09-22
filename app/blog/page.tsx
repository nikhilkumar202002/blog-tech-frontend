import React from "react";
import BlogHero from "@/app/components/sections/blog/BlogHero";
import FeaturedBlog from "@/app/components/sections/blog/FeaturedBlog";
import BlogGrid from "@/app/components/sections/blog/BlogGrid";

export default function BlogPage() {
  return (
    <main className="w-full min-h-screen bg-white">
      <BlogHero />
      <FeaturedBlog />
      <BlogGrid />
    </main>
  );
}