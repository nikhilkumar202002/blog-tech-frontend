"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GALLERY_IMAGES = [
  {
    src: "/images/growing-industry-1.webp",
    alt: "Growing With the Industry - Jewellery Technology 1",
  },
  {
    src: "/images/growing-industry-2.webp",
    alt: "Growing With the Industry - Jewellery Technology 2",
  },
  {
    src: "/images/growing-industry-3.webp",
    alt: "Growing With the Industry - Jewellery Technology 3",
  },
];

export interface PreparingTomorrowProps {
  className?: string;
}

const PreparingTomorrow: React.FC<PreparingTomorrowProps> = ({ className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`w-full py-20 sm:py-28 lg:py-36 bg-[#f9f9f8] text-stone-900 flex-shrink-0 ${className}`}>
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">

          {/* Left Column: Image Gallery Auto Slider (Full container fill, no shadow, no arrows, no status bar) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-6 flex justify-center items-center"
          >
            <div
              style={{ borderRadius: "25px" }}
              className="relative w-full max-w-[560px] h-[440px] sm:h-[540px] lg:h-[600px] xl:h-[640px] rounded-[25px] overflow-hidden border border-black/5 flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={GALLERY_IMAGES[currentIndex].src}
                  alt={GALLERY_IMAGES[currentIndex].alt}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ borderRadius: "25px" }}
                  className="w-full h-full object-cover object-center rounded-[25px]"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Column: Heading & Description Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            <span className="block text-sm sm:text-base font-medium text-stone-500 font-[var(--font-dm-sans)] mb-3">
              Growing With the Industry
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.08] mb-6">
              <span className="block">Preparing You for</span>
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#A44B03] block mt-1"
              >
                Tomorrow
              </span>
            </h2>

            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-xl">
              The jewellery industry continues to evolve with changing customer
              expectations, increasing competition, and a growing reliance on
              technology. Businesses today need more than basic billing or accounting
              systems—they need connected solutions that provide better visibility.
              From traditional desktop-based business management to modern mobile and
              digital solutions, our focus remains on helping jewellery businesses
              adopt new technology without losing the simplicity they need to function
              efficiently.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PreparingTomorrow;
