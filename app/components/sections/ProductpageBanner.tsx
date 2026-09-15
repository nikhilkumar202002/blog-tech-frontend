"use client";

import React from "react";
import { FiArrowDown } from "react-icons/fi";

export interface ProductpageBannerProps {
  className?: string;
}

const ProductpageBanner: React.FC<ProductpageBannerProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full flex-shrink-0 min-h-screen min-h-[100dvh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-24 md:pb-32 overflow-hidden bg-white ${className}`}
    >
      {/* Light Grey Grid Lines Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Radial Background Effect on White Screen */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 45%, rgba(255, 255, 255, 0.2) 0%, rgba(248, 246, 243, 0.75) 50%, rgba(230, 226, 220, 0.95) 100%)
          `,
        }}
      />

      {/* Brand Amber Radial Glow behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, rgba(164, 75, 3, 0.08) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />

      {/* Main Content Container */}
      <div className="site-container relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center my-auto">
        
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[76px] font-medium tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.08] mb-6 max-w-4xl">
          Technology built around the{" "}
          <span
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="italic text-[#A44B03] font-normal"
          >
            jewellery business.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-stone-600 font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-2xl mx-auto">
          Explore Blogtec&apos;s suite of software solutions designed to simplify jewellery business operations, connect customers and teams, and give business owners better control over their business.
        </p>

      </div>

      {/* Rotating Circular Scroll Down Badge at Bottom */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <a
          href="#products"
          aria-label="Scroll down to products"
          className="group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-transform duration-300 hover:scale-105"
        >
          {/* Circular Rotating Text SVG */}
          <svg
            className="w-full h-full animate-[spin_12s_linear_infinite] pointer-events-none text-stone-800"
            viewBox="0 0 100 100"
          >
            <path
              id="scrollTextPath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[9.5px] uppercase tracking-[0.24em] font-medium fill-stone-700 font-[var(--font-dm-sans)]">
              <textPath href="#scrollTextPath" startOffset="0%">
                SCROLL DOWN • SCROLL DOWN • 
              </textPath>
            </text>
          </svg>

          {/* Plain Down Arrow in Center */}
          <div className="absolute flex items-center justify-center text-[#A44B03]">
            <FiArrowDown className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-y-1" />
          </div>
        </a>
      </div>

    </section>
  );
};

export default ProductpageBanner;
