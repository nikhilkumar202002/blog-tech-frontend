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
      className={`relative w-full h-[540px] sm:h-[620px] md:h-[85vh] lg:h-screen min-h-[540px] sm:min-h-[620px] md:min-h-[85vh] lg:min-h-screen flex items-start md:items-center justify-start pt-28 sm:pt-32 md:pt-24 lg:pt-28 pb-10 md:pb-16 bg-[#FBF9F5] overflow-hidden ${className}`}
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Background Banner Image */}
        <Image
          src="/images/service-banner-desktop.webp"
          alt="Blogtec Jewellery Technology Services Banner Desktop"
          fill
          priority
          sizes="100vw"
          className="hidden md:block object-cover object-[70%_center] lg:object-center"
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

      {/* Main Content Container (Top Aligned on Mobile, Vertically Centered on Desktop) */}
      <div className="site-container w-full relative z-10 flex items-start md:items-center h-full">
        <div className="max-w-[340px] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl text-left mt-0 md:my-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[36px] sm:text-[44px] md:text-[48px] lg:text-[54px] xl:text-[64px] 2xl:text-[74px] font-medium tracking-tight text-stone-900 leading-[1.1] sm:leading-[1.1] font-[var(--font-dm-sans)]"
          >
            Technology That{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Supports
            </span>{" "}
            Your{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Business
            </span>{" "}
            At Every Step.
          </motion.h1>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
