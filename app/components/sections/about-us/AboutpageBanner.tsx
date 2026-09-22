"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface AboutpageBannerProps {
  className?: string;
}

const AboutpageBanner: React.FC<AboutpageBannerProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full h-[520px] min-h-[520px] md:min-h-[90vh] lg:min-h-screen flex items-start md:items-center pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 md:pb-24 lg:pb-32 bg-[#FBF9F5] overflow-hidden ${className}`}
    >
      {/* Background Image from images folder */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background Banner Image */}
        <Image
          src="/images/about-banner.webp"
          alt="Blogtec Jewellery Technology Banner Desktop"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-center"
        />
        {/* Mobile Background Banner Image */}
        <Image
          src="/images/about-banner-mobile.webp"
          alt="Blogtec Jewellery Technology Banner Mobile"
          fill
          priority
          sizes="100vw"
          className="block md:hidden object-cover object-center"
        />
      </div>

      {/* Main Content Container (Left Side Content Alignment) */}
      <div className="site-container w-full relative z-10">
        <div className="max-w-3xl text-left">
          
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-normal tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.08] mb-0 md:mb-6"
          >
            Technology Built<br />
            Around the{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Jewellery
            </span>{" "}
            Business.
          </motion.h1>

          {/* Description (Hidden on mobile) */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            className="hidden md:block text-stone-700 text-base sm:text-lg md:text-xl font-[var(--font-dm-sans)] font-medium leading-relaxed max-w-2xl mb-10 sm:mb-12"
          >
            Built around the unique needs of jewellers, our software combines
            19+ years of industry expertise, practical technology, and effortless
            usability to transform jewellery business operations.
          </motion.p>

          {/* Key Stats Row (Hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            className="hidden md:grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-stone-300/80 max-w-2xl"
          >
            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#202020] mb-1.5 font-[var(--font-dm-sans)] flex items-baseline">
                19<span className="text-[#A44B03]">+</span>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 font-[var(--font-dm-sans)] leading-snug font-medium">
                Years of Industry
                <br />
                Experience
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#202020] mb-1.5 font-[var(--font-dm-sans)]">
                5
              </div>
              <div className="text-xs sm:text-sm text-stone-700 font-[var(--font-dm-sans)] leading-snug font-medium">
                Specialized Core
                <br />
                Solutions
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#202020] mb-1.5 font-[var(--font-dm-sans)]">
                100<span className="text-[#A44B03]">%</span>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 font-[var(--font-dm-sans)] leading-snug font-medium">
                Jewellery Industry
                <br />
                Focus
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutpageBanner;



