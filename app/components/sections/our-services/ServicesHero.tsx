"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface ServicesHeroProps {
  className?: string;
}

const ServicesHero: React.FC<ServicesHeroProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full min-h-screen flex items-start md:items-center justify-start md:justify-center pt-24 sm:pt-32 md:pt-44 lg:pt-48 pb-16 sm:pb-24 lg:pb-32 bg-[#FBF9F5] overflow-hidden ${className}`}
    >
      {/* Background Image from images folder */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background Banner Image */}
        <Image
          src="/images/service-banner-desktop.webp"
          alt="Blogtec Jewellery Technology Services Banner Desktop"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />
        {/* Mobile Background Banner Image */}
        <Image
          src="/images/service-banner-mobile.webp"
          alt="Blogtec Jewellery Technology Services Banner Mobile"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-center"
        />
      </div>

      {/* Main Content Container (Left Side Content Alignment) */}
      <div className="site-container w-full relative z-10">
        <div className="max-w-3xl text-left flex flex-col items-start">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl font-normal text-stone-500 font-[var(--font-dm-sans)] mb-3 sm:mb-4 tracking-normal"
        >
          Our Services
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-5xl lg:text-[50px] xl:text-6xl 2xl:text-7xl font-medium tracking-tight text-stone-900 leading-[1.08] max-w-xl lg:max-w-2xl xl:max-w-3xl font-[var(--font-dm-sans)] mb-0 md:mb-6"
        >
          Technology That{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="italic font-normal text-[#A44B03]"
          >
            Supports
          </span>
          <br className="hidden sm:inline" />
          {" "}Your{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="italic font-normal text-[#A44B03]"
          >
            Business
          </span>{" "}
          At Every Step.
        </motion.h1>

        {/* Subtext Description (Hidden on mobile) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block text-stone-600 font-normal leading-relaxed text-base lg:text-base xl:text-lg max-w-lg lg:max-w-xl xl:max-w-2xl font-[var(--font-dm-sans)] tracking-normal"
        >
          From Jewellery ERP Solutions To Ongoing Support, Custom Development And Digital Solutions,
          Blogtec Helps Jewellery Businesses Implement And Evolve Technology Around Their Real
          Business Requirements.
        </motion.p>

        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
