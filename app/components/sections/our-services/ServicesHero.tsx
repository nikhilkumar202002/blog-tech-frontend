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
      className={`relative w-full min-h-screen flex items-center justify-start pt-20 md:pt-24 pb-12 md:pb-16 bg-[#FBF9F5] overflow-hidden ${className}`}
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

      {/* Main Content Container (Vertically Centered Alignment) */}
      <div className="site-container w-full relative z-10 flex items-center">
        <div className="max-w-3xl text-left flex flex-col justify-center my-auto">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-[50px] xl:text-6xl 2xl:text-7xl font-medium tracking-tight text-stone-900 leading-[1.08] max-w-xl lg:max-w-2xl xl:max-w-3xl font-[var(--font-dm-sans)]"
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
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
