import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiTag } from "react-icons/fi";

interface BlogPostData {
  slug: string;
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  description: string;
  content: string[];
}

const BLOG_POSTS_DETAILS: Record<string, BlogPostData> = {
  "technology-built-around-jewellery-business": {
    slug: "technology-built-around-jewellery-business",
    id: "00",
    title: "Technology Built Around the Jewellery Business",
    category: "Industry Insights",
    date: "September 20, 2026",
    readTime: "5 min read",
    author: "Blogtec Team",
    image: "/images/growing-industry-1.webp",
    description:
      "Discover how purpose-built technology can simplify complex jewellery business operations and bring greater visibility across inventory, sales, customers, accounts and everyday workflows.",
    content: [
      "The jewellery industry requires a unique blend of craftsmanship, trust, and meticulous operational control. Unlike standard retail, jewellery management involves gold and silver metal accounting, purity tracking, stones inventory, counter billing, custom orders, and complex scheme savings management.",
      "Generic ERP software often falls short because it lacks the specialized tools required for precious metal management. Purpose-built technology addresses these exact pain points by integrating tag printing, barcode scanning, metal balance ledgers, and real-time inventory synchronization across showrooms.",
      "By adopting digital solutions tailored specifically to jewellery workflows, business owners gain end-to-end operational visibility. This empowers showroom teams to serve customers faster while giving management transparent control over inventory valuation, daily sales, and branch performance."
    ],
  },
  "how-technology-is-changing-jewellery-business-management": {
    slug: "how-technology-is-changing-jewellery-business-management",
    id: "01",
    title: "How Technology Is Changing Jewellery Business Management",
    category: "Jewellery Business",
    date: "September 18, 2026",
    readTime: "4 min read",
    author: "Blogtec Insights",
    image: "/images/growing-industry-1.webp",
    description:
      "Explore how modern software can help jewellery businesses manage complex operations more efficiently.",
    content: [
      "Traditional manual record-keeping and standalone billing software are rapidly being replaced by integrated Cloud ERP platforms.",
      "Modern jewellery technology connects every aspect of store operations—from metal weight loss tracking during ornament manufacturing to automated GST invoicing at counter checkout.",
      "Embracing modern management tools allows jewellers to prevent stock discrepancies, automate customer scheme payments via mobile apps, and access real-time business reports from anywhere."
    ],
  },
  "what-to-look-for-in-jewellery-management-software": {
    slug: "what-to-look-for-in-jewellery-management-software",
    id: "02",
    title: "What to Look for in Jewellery Management Software",
    category: "Jewellery ERP",
    date: "September 15, 2026",
    readTime: "6 min read",
    author: "Blogtec Tech Team",
    image: "/images/growing-industry-2.webp",
    description:
      "A practical look at the capabilities jewellery businesses need when choosing software for everyday operations.",
    content: [
      "Choosing the right ERP software is one of the most critical decisions for a growing jewellery retailer or wholesaler.",
      "Key features to look for include: fast barcode tag scanning, item-wise wastage & making charge calculations, metal rate board auto-updates, integrated accounting, and robust security permission controls.",
      "The ideal software should also scale seamlessly as you open new branch showrooms, offering real-time multi-store data sync without slowdowns."
    ],
  },
  "managing-jewellery-inventory-with-greater-visibility": {
    slug: "managing-jewellery-inventory-with-greater-visibility",
    id: "03",
    title: "Managing Jewellery Inventory with Greater Visibility",
    category: "Inventory",
    date: "September 12, 2026",
    readTime: "5 min read",
    author: "Blogtec Team",
    image: "/images/growing-industry-3.webp",
    description:
      "Understand the importance of accurate stock information, product identification and inventory monitoring in jewellery businesses.",
    content: [
      "Inventory represents the largest investment in any jewellery business. Having inaccurate stock figures can lead to capital lock-up or lost sales opportunities.",
      "Implementing RFID or barcode-based inventory tracking allows daily stock audits in minutes instead of hours, significantly reducing human error and preventing shrinkage.",
      "Clear visibility across high-demand categories (like bridal sets, gold chains, or solitaire rings) enables data-driven purchasing and stock rotation across branches."
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(BLOG_POSTS_DETAILS).map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS_DETAILS[slug] || {
    slug,
    id: "00",
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    category: "Jewellery Insights",
    date: "September 2026",
    readTime: "4 min read",
    author: "Blogtec Team",
    image: "/images/growing-industry-1.webp",
    description:
      "Discover practical technology insights and software strategies tailored for the modern jewellery business.",
    content: [
      "Jewellery business management requires precise operational controls, real-time stock tracking, and smooth customer experiences across digital and physical touchpoints.",
      "Blogtec provides specialized software built around the real requirements of jewellers—from counter billing and metal accounting to customer mobile apps and executive analytics.",
      "Stay connected with our platform to transform your business operations and capture new growth opportunities."
    ],
  };

  return (
    <article className="w-full min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-20 bg-[#FBF9F5] text-stone-900">
      <div className="site-container max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-stone-600 hover:text-[#A44B03] font-medium text-sm transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Blog</span>
        </Link>

        {/* Category & Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 mb-4 font-[var(--font-dm-sans)]">
          <span className="px-3 py-1 bg-[#A44B03]/10 text-[#A44B03] font-semibold rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <FiCalendar className="w-4 h-4 text-stone-400" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <FiClock className="w-4 h-4 text-stone-400" />
            {post.readTime}
          </span>
        </div>

        {/* Article Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.15] font-[var(--font-dm-sans)] mb-6">
          {post.title}
        </h1>

        {/* Lead Description */}
        <p className="text-stone-600 text-lg sm:text-xl leading-relaxed font-normal font-[var(--font-dm-sans)] mb-10 border-l-4 border-[#A44B03] pl-4 italic">
          {post.description}
        </p>

        {/* Hero Image */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 border border-stone-200 shadow-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-center"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-stone max-w-none text-stone-700 text-base sm:text-lg leading-relaxed space-y-6 font-[var(--font-inter)] mb-12">
          {post.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* CTA Footer Card */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-stone-900 mb-2 font-[var(--font-dm-sans)]">
              Want to see how Blogtec can help your business?
            </h3>
            <p className="text-stone-600 text-sm font-normal">
              Speak with our software specialists today for a personalized walkthrough.
            </p>
          </div>
          <Link
            href="/contact-us"
            className="px-6 py-3 rounded-xl bg-[#A44B03] hover:bg-[#8b3f02] text-white font-semibold text-sm transition-colors whitespace-nowrap shadow-sm"
          >
            Contact Our Team
          </Link>
        </div>

      </div>
    </article>
  );
}
