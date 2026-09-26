"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";

export interface ProductBannerProps {
  bgImage?: string;
  bannerImage?: string;
  mobileBgImage?: string;
  mobileBannerImage?: string;
  titlePrefix?: string;
  titleHighlight?: string;
  titleSuffix?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  className?: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({
  bgImage,
  bannerImage,
  mobileBgImage,
  mobileBannerImage,
  titlePrefix = "Meet ",
  titleHighlight = "",
  titleSuffix = "",
  subtitle = "",
  description = "",
  buttonText = "Book an AURIX Demo",
  buttonLink = "/contact-us",
  className = "",
}) => {
  const activeImage = bgImage || bannerImage || "/products/aurix/product-aurix.webp";
  const activeMobileImage =
    mobileBgImage ||
    mobileBannerImage ||
    (activeImage.includes("/products/aurix/") ? "/products/aurix/aurx-mobile-banner.webp" : activeImage);

  return (
    <section
      className={`relative w-full h-[680px] sm:h-[750px] min-h-[680px] sm:min-h-[750px] md:min-h-screen md:h-screen flex items-start md:items-center overflow-hidden bg-stone-950 flex-shrink-0 ${className}`}
    >
      {/* Background Banner Image Container */}
      {activeImage && (
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 w-full overflow-hidden"
        >
          {/* Desktop & Mobile Banner Image */}
          <picture className="absolute inset-0 h-full w-full">
            {activeMobileImage && activeMobileImage !== activeImage && (
              <source srcSet={activeMobileImage} media="(max-width: 767px)" />
            )}
            <img
              src={activeImage}
              alt={titleHighlight || titlePrefix || "Product Showcase Mobile"}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-center md:object-right transition-all duration-700"
            />
          </picture>

          {/* Dark Gradient Overlay: Top-to-Bottom on Mobile, Left-to-Right on Desktop */}
          <div className="absolute inset-0 w-full md:w-[55%] bg-gradient-to-b md:bg-gradient-to-r from-black via-black/80 md:via-black/70 to-transparent pointer-events-none opacity-90 z-1" />
        </motion.div>
      )}

      {/* Main Content Container inside Global Class Container (site-container) */}
      <div className="site-container relative z-10 w-full pt-20 sm:pt-28 md:pt-28 pb-8 md:py-20 flex flex-col justify-start md:justify-center h-full">
        <div className="max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
          {/* Main Title with Serif Gold Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-[44px] lg:text-[54px] xl:text-[64px] 2xl:text-[74px] font-semibold tracking-tight text-white font-[var(--font-dm-sans)] leading-[1.15] mb-3 sm:mb-4 drop-shadow-md"
          >
            {titlePrefix.includes("\n") ? (
              <>
                <span className="block whitespace-nowrap sm:whitespace-normal">{titlePrefix.split("\n")[0]}</span>
                <span className="block mt-1 whitespace-nowrap sm:whitespace-normal">
                  {titlePrefix.split("\n")[1]}
                  {titleHighlight && (
                    <span
                      style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                      className="italic font-normal text-[#E5B574] drop-shadow-sm ml-1.5"
                    >
                      {titleHighlight}
                    </span>
                  )}
                  {titleSuffix}
                </span>
              </>
            ) : (
              <>
                {titlePrefix}
                {titleHighlight && (
                  <span
                    style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                    className="italic font-normal text-[#E5B574] drop-shadow-sm ml-1.5"
                  >
                    {titleHighlight}
                  </span>
                )}
                {titleSuffix}
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-stone-100 font-[var(--font-dm-sans)] mb-5 leading-snug drop-shadow-sm"
            >
              {subtitle}
            </motion.h2>
          )}

          {/* Description Paragraphs (Hidden on Mobile) */}
          {description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:block space-y-3 mb-8 sm:mb-10 max-w-lg"
            >
              {description.split("\n\n").map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-stone-200/90 font-[var(--font-dm-sans)] font-normal leading-relaxed drop-shadow-sm"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          )}

          {/* CTA Button with Circle Expansion Animation */}
          {buttonText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <Link
                href={buttonLink}
                className="group relative inline-flex items-center justify-between gap-3 sm:gap-4 md:gap-5 pl-4 sm:pl-5 md:pl-6 lg:pl-7 pr-1.5 sm:pr-2 md:pr-2 py-1.5 sm:py-2 md:py-2 rounded-full border border-white/90 bg-black/20 backdrop-blur-sm text-white font-[var(--font-dm-sans)] overflow-hidden transition-colors duration-300 shadow-xl"
              >
                {/* Expanding White Circle Background on Hover */}
                <span className="absolute right-1.5 sm:right-2 md:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[36] pointer-events-none z-0" />

                {/* Button Label Text */}
                <span className="relative z-10 text-xs sm:text-sm md:text-base lg:text-base font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-black">
                  {buttonText}
                </span>

                {/* Right Circle Icon with Black Arrow */}
                <span className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <FiArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 stroke-[2.2] text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
