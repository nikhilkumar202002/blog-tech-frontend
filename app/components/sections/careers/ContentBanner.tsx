"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ContentBannerProps {
  className?: string;
}

const ContentBanner: React.FC<ContentBannerProps> = ({ className = "" }) => {
  return (
    <section className={`w-full py-20 sm:py-28 bg-[#FAF7F2] border-y border-stone-200/80 overflow-hidden relative ${className}`}>
      <div className="site-container w-full max-w-6xl mx-auto">
        <div className="max-w-4xl text-left">
          
          {/* Eyebrow badge */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#A44B03] font-[var(--font-dm-sans)] mb-4 block"
          >
            OUR PURPOSE & CULTURE
          </motion.span>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-[42px] lg:text-[52px] xl:text-[60px] 2xl:text-[68px] font-normal tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.15] mb-8"
          >
            Work on Technology With a{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Real-World
            </span>{" "}
            Purpose.
          </motion.h2>

          {/* Description Paragraphs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 text-stone-700 text-base sm:text-lg md:text-xl font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-3xl"
          >
            <p>
              Blogtec focuses on building software around the practical requirements of jewellery businesses. Our products support everyday operations across management, inventory, sales, customers, schemes and business monitoring.
            </p>
            <p className="text-stone-800 font-medium">
              That means the work here is closely connected to real business problems and the people who use the software every day.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContentBanner;