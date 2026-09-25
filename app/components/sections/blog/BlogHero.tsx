"use client";

import React from "react";
import { motion } from "framer-motion";

export interface BlogHeroProps {
  className?: string;
}

const BlogHero: React.FC<BlogHeroProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full bg-[#FAF7F2] pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-28 text-stone-900 overflow-hidden flex flex-col justify-center ${className}`}
    >
      <div className="site-container w-full text-left">
        
        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-stone-900 leading-[1.08] max-w-4xl font-[var(--font-dm-sans)] mb-6"
        >
          Ideas, Insights &amp; Updates for the{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="italic font-normal text-[#A44B03]"
          >
            Jewellery
          </span>{" "}
          Business.
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-stone-600 text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-2xl font-[var(--font-dm-sans)]"
        >
          Explore practical insights on jewellery business management, technology,
          software, digital solutions and the evolving needs of modern jewellery
          businesses.
        </motion.p>

      </div>
    </section>
  );
};

export default BlogHero;