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
      className={`relative w-full h-[520px] min-h-[520px] md:min-h-screen md:h-screen flex items-start md:items-center overflow-hidden bg-stone-950 flex-shrink-0 ${className}`}
    >
      {/* Background Banner Image Container */}
      {activeImage && (
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0 w-full overflow-hidden"
        >
          {/* Desktop Banner Image */}
          <img
            src={activeImage}
            alt={titleHighlight || titlePrefix || "Product Showcase"}
            className={`w-full h-full object-cover object-right transition-all duration-700 ${
              activeMobileImage !== activeImage ? "hidden md:block" : "block"
            }`}
          />

          {/* Mobile Banner Image (Fits 520px height on mobile) */}
          {activeMobileImage !== activeImage && (
            <img
              src={activeMobileImage}
              alt={titleHighlight || titlePrefix || "Product Showcase Mobile"}
              className="w-full h-full object-cover object-center block md:hidden transition-all duration-700"
            />
          )}

          {/* Dark Gradient Overlay: Top-to-Bottom on Mobile, Left-to-Right on Desktop */}
          <div className="absolute inset-0 w-full md:w-[55%] bg-gradient-to-b md:bg-gradient-to-r from-black via-black/80 md:via-black/70 to-transparent pointer-events-none opacity-90 z-1" />
        </motion.div>
      )}

      {/* Main Content Container inside Global Class Container (site-container) */}
      <div className="site-container relative z-10 w-full pt-28 sm:pt-36 md:pt-28 pb-10 md:py-20 flex flex-col justify-between md:justify-center h-full">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Main Title with Serif Gold Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white font-[var(--font-dm-sans)] leading-[1.08] mb-3 drop-shadow-md"
          >
            {titlePrefix.includes("\n") ? (
              <>
                <span className="block">{titlePrefix.split("\n")[0]}</span>
                <span className="block whitespace-nowrap mt-1">
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
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block space-y-3 mb-8 sm:mb-10 max-w-lg"
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
              transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <Link
                href={buttonLink}
                className="group relative inline-flex items-center justify-between gap-6 sm:gap-8 pl-6 sm:pl-8 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full border border-white/90 bg-black/20 backdrop-blur-sm text-white font-[var(--font-dm-sans)] overflow-hidden transition-colors duration-500 shadow-xl"
              >
                {/* Expanding White Circle Background on Hover */}
                <span className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[28] pointer-events-none z-0" />

                {/* Button Label Text */}
                <span className="relative z-10 text-base sm:text-lg font-normal tracking-tight text-white transition-colors duration-300 group-hover:text-black">
                  {buttonText}
                </span>

                {/* Right Circle Icon with Black Arrow */}
                <span className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <FiArrowUpRight className="w-5 h-5 stroke-[2.2] text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
