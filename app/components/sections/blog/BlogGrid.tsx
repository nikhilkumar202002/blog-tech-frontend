"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

export interface BlogGridProps {
  className?: string;
}

const blogPosts = [
  {
    id: "01",
    category: "Jewellery Business",
    title: "How Technology Is Changing Jewellery Business Management",
    description:
      "Explore how modern software can help jewellery businesses manage complex operations more efficiently.",
    image: "/images/growing-industry-1.webp",
    slug: "how-technology-is-changing-jewellery-business-management",
  },
  {
    id: "02",
    category: "Jewellery ERP",
    title: "What to Look for in Jewellery Management Software",
    description:
      "A practical look at the capabilities jewellery businesses need when choosing software for everyday operations.",
    image: "/images/growing-industry-2.webp",
    slug: "what-to-look-for-in-jewellery-management-software",
  },
  {
    id: "03",
    category: "Inventory",
    title: "Managing Jewellery Inventory with Greater Visibility",
    description:
      "Understand the importance of accurate stock information, product identification and inventory monitoring in jewellery businesses.",
    image: "/images/growing-industry-3.webp",
    slug: "managing-jewellery-inventory-with-greater-visibility",
  },
  {
    id: "04",
    category: "Digital Transformation",
    title: "Moving Beyond Traditional Jewellery Business Management",
    description:
      "How connected digital solutions can extend business management beyond the showroom.",
    image: "/images/laptop-mockup-3.jpg",
    slug: "moving-beyond-traditional-jewellery-business-management",
  },
  {
    id: "05",
    category: "Customer Experience",
    title: "Building Better Customer Experiences with Digital Jewellery Solutions",
    description:
      "Explore how digital platforms and mobile experiences can help jewellery businesses stay connected with customers.",
    image: "/images/mobile-laptop-mockup-3.webp",
    slug: "building-better-customer-experiences-with-digital-jewellery-solutions",
  },
  {
    id: "06",
    category: "Business Management",
    title: "Why Business Visibility Matters for Jewellery Owners",
    description:
      "From sales and purchases to inventory and reports, better access to business information can support more informed day-to-day management.",
    image: "/images/about-banner.webp",
    slug: "why-business-visibility-matters-for-jewellery-owners",
  },
  {
    id: "07",
    category: "Scheme Management",
    title: "Streamlining Jewellery Scheme Operations for Growth",
    description:
      "How digital scheme management platforms enhance customer participation, automated tracking, and installment processing.",
    image: "/products/scheme-app/scheme-app.webp",
    slug: "streamlining-jewellery-scheme-operations-for-growth",
  },
  {
    id: "08",
    category: "POS & Billing",
    title: "Accelerating Showroom Billing and Counter Transactions",
    description:
      "Strategies and tools to simplify counter sales, GST compliance, fast barcode scanning, and multi-counter management.",
    image: "/products/aurix/product-aurix.webp",
    slug: "accelerating-showroom-billing-and-counter-transactions",
  },
  {
    id: "09",
    category: "Security & Access",
    title: "Ensuring Data Security and Access Control in Jewellery Tech",
    description:
      "Best practices for protecting sensitive business records, financial reporting, and owner access controls across devices.",
    image: "/products/aurown/aurown_hero_banner.webp",
    slug: "ensuring-data-security-and-access-control-in-jewellery-tech",
  },
];

const BlogGrid: React.FC<BlogGridProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-16 sm:py-20 lg:py-24 bg-stone-50/50 border-t border-stone-200/60 overflow-hidden ${className}`}
    >
      <div className="site-container w-full">
        
        {/* Header Section */}
        <div className="text-left mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium text-stone-400 font-[var(--font-dm-sans)] uppercase tracking-widest mb-3 block">
            LATEST FROM BLOGTEC
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.12] max-w-3xl font-[var(--font-dm-sans)]">
            Practical Knowledge for a{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Changing
            </span>{" "}
            Industry.
          </h2>
        </div>

        {/* 4-Column Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (idx % 4) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/80 shadow-sm hover:shadow-md hover:border-[#A44B03]/30 transition-all duration-300"
            >
              {/* Card Image */}
              <Link
                href={`/blog/${post.slug}`}
                className="relative w-full h-[200px] sm:h-[210px] rounded-xl overflow-hidden mb-4 bg-stone-100 block"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Number & Category */}
              <div className="text-xs font-semibold text-[#A44B03] uppercase tracking-wider font-[var(--font-dm-sans)] mb-2 flex items-center gap-1.5">
                <span>{post.id}</span>
                <span>—</span>
                <span>{post.category}</span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-stone-900 leading-snug font-[var(--font-dm-sans)] mb-2 group-hover:text-[#A44B03] transition-colors duration-200 line-clamp-2">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed font-[var(--font-dm-sans)] mb-5 line-clamp-3 flex-grow">
                {post.description}
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
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogGrid;