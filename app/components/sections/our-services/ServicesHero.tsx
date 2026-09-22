"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ServicesHeroProps {
  className?: string;
}

const ServicesHero: React.FC<ServicesHeroProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 bg-white text-stone-900 overflow-hidden flex flex-col items-center justify-center ${className}`}
    >
      <div className="site-container flex flex-col items-center text-center">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl lg:text-2xl font-normal text-stone-400 font-[var(--font-dm-sans)] mb-4 tracking-normal"
        >
          Our Services
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-stone-900 leading-[1.08] max-w-5xl font-[var(--font-dm-sans)] mb-6"
        >
          Technology That{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="italic font-normal text-[#c05803]"
          >
            Supports
          </span>
          <br className="hidden sm:inline" />
          {" "}Your{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="italic font-normal text-[#c05803]"
          >
            Business
          </span>{" "}
          At Every Step.
        </motion.h1>

        {/* Subtext Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-sm sm:text-base lg:text-lg text-stone-500 font-normal leading-[1.4] max-w-3xl font-[var(--font-inter)] tracking-normal"
        >
          From Jewellery ERP Solutions To Ongoing Support, Custom Development And Digital Solutions,
          Blogtec Helps Jewellery Businesses Implement And Evolve Technology Around Their Real
          Business Requirements.
        </motion.p>

      </div>
    </section>
  );
};

export default ServicesHero;
