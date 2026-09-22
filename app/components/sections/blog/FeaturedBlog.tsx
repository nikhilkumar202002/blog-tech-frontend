"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiClock, FiTag } from "react-icons/fi";
import Button from "@/app/components/common/Button";

export interface FeaturedBlogProps {
  className?: string;
}

const FeaturedBlog: React.FC<FeaturedBlogProps> = ({ className = "" }) => {
  return (
    <section className={`w-full py-12 sm:py-16 lg:py-20 bg-white overflow-hidden ${className}`}>
      <div className="site-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Left Side Image (6 of 12 columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 w-full"
          >
            <Link
              href="/blog/technology-built-around-jewellery-business"
              className="group block relative w-full h-[320px] sm:h-[400px] lg:h-[460px] rounded-3xl overflow-hidden border border-stone-200/80 shadow-lg shadow-stone-200/50"
            >
              <Image
                src="/images/growing-industry-1.webp"
                alt="Technology Built Around the Jewellery Business"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
              
              {/* Category Pill over image */}
              <div className="absolute top-5 left-5 z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                  <FiTag className="w-3.5 h-3.5 text-[#A44B03]" />
                  Industry Insights
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Right Side Content (6 of 12 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Featured Eyebrow */}
            <span className="text-xs sm:text-sm font-medium text-stone-400 font-[var(--font-dm-sans)] uppercase tracking-widest mb-4 block">
              Featured
            </span>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 leading-[1.12] font-[var(--font-dm-sans)] mb-4">
              Technology Built Around the{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#A44B03]"
              >
                Jewellery
              </span>{" "}
              Business
            </h2>

            {/* Description */}
            <p className="text-stone-600 text-base sm:text-lg font-normal leading-relaxed font-[var(--font-dm-sans)] mb-6">
              Discover how purpose-built technology can simplify complex jewellery
              business operations and bring greater visibility across inventory,
              sales, customers, accounts and everyday workflows.
            </p>

            {/* Category & Read Time Row */}
            <div className="flex items-center gap-4 text-xs sm:text-sm text-stone-500 mb-8 pb-6 border-b border-stone-200/80 w-full">
              <span className="px-3 py-1 bg-stone-100 border border-stone-200 rounded-lg text-stone-700 font-medium">
                Industry Insights
              </span>
              <span className="flex items-center gap-1.5 text-stone-500">
                <FiClock className="w-4 h-4 text-stone-400" />
                5 min read
              </span>
            </div>

            {/* CTA Button */}
            <Button
              href="/blog/technology-built-around-jewellery-business"
              text="Read Article"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;