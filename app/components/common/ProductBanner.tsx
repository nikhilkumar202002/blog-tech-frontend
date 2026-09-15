"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export interface ProductBannerProps {
  bgImage?: string;
  bannerImage?: string;
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

  return (
    <section
      className={`relative w-full h-screen min-h-[100dvh] flex items-center overflow-hidden bg-stone-950 ${className}`}
    >
      {/* Fixed Background Banner Image */}
      {activeImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-right bg-no-repeat transition-all duration-700"
            style={{
              backgroundImage: `url('${activeImage}')`,
              backgroundAttachment: "fixed",
            }}
            role="img"
            aria-label={titleHighlight || titlePrefix || "Product Showcase"}
          />
          {/* Subtle Left-to-Right 50% Width Black Gradient Overlay (Left 100% to Right 0%) */}
          <div className="absolute top-0 bottom-0 left-0 w-full md:w-[55%] bg-gradient-to-r from-black via-black/70 to-transparent pointer-events-none opacity-90 z-1" />
        </div>
      )}

      {/* Main Content Container inside Global Class Container (site-container) */}
      <div className="site-container relative z-10 w-full py-20 pt-28">
        <div className="max-w-xl">
          {/* Main Title with Serif Gold Accent */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white font-[var(--font-dm-sans)] leading-[1.08] mb-3 drop-shadow-md">
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
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-stone-100 font-[var(--font-dm-sans)] mb-5 leading-snug drop-shadow-sm">
              {subtitle}
            </h2>
          )}

          {/* Description Paragraphs */}
          {description && (
            <div className="space-y-3 mb-8 sm:mb-10 max-w-lg">
              {description.split("\n\n").map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-stone-200/90 font-[var(--font-dm-sans)] font-normal leading-relaxed drop-shadow-sm"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* CTA Button with Circle Expansion Animation */}
          {buttonText && (
            <div className="flex items-center">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
