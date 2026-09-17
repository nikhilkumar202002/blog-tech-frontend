"use client";

import React from "react";

export interface AurixIntroProps {
  headingLine1?: string;
  capsuleImage1?: string;
  headingLine1End?: string;
  headingLine2Start?: string;
  capsuleImage2?: string;
  headingLine2End?: string;
  headingLine3?: string;
  description?: string;
  taglines?: string[];
  className?: string;
}

const AurixIntro: React.FC<AurixIntroProps> = ({
  headingLine1 = "Jewellery Business",
  capsuleImage1 = "/products/aurix.jpg",
  headingLine1End = "Is",
  headingLine2Start = "Complex.",
  capsuleImage2 = "/products/aurix/product-aurix.webp",
  headingLine2End = "AURIX Makes",
  headingLine3 = "It Organized.",
  description = "From The Weight Of A Jewellery Item To Its Barcode, Customer, Transaction And Payment, Every Detail Matters. AURIX Brings The Essential Processes Of Your Jewellery Business Together, Helping Your Team Work With Greater Accuracy And Giving You Better Access To The Information That Matters.",
  taglines = ["Less Manual Effort.", "More Visibility.", "Better Control."],
  className = "",
}) => {
  return (
    <section className={`w-full py-20 sm:py-28 md:py-36 bg-white text-stone-900 ${className}`}>
      <div className="site-container max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Main Headline with Inline Pill Image Capsules - Exact 3 Line Layout */}
        <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 font-normal tracking-tight text-[#171717] font-[var(--font-dm-sans)] mb-8 sm:mb-12">
          
          {/* Line 1: Jewellery Business [Capsule 1] Is */}
          <div className="flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span>{headingLine1}</span>
            <span className="relative inline-flex items-center justify-center rounded-full overflow-hidden border border-stone-200/90 shadow-sm h-8 sm:h-11 md:h-14 lg:h-16 w-20 sm:w-28 md:w-36 lg:w-40 flex-shrink-0 transition-transform duration-500 hover:scale-105 my-1">
              <img
                src={capsuleImage1}
                alt="Jewellery Showcase 1"
                className="w-full h-full object-cover object-center"
              />
            </span>
            <span>{headingLine1End}</span>
          </div>

          {/* Line 2: Complex. [Capsule 2] AURIX Makes */}
          <div className="flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span>{headingLine2Start}</span>
            <span className="relative inline-flex items-center justify-center rounded-full overflow-hidden border border-stone-200/90 shadow-sm h-8 sm:h-11 md:h-14 lg:h-16 w-20 sm:w-28 md:w-36 lg:w-40 flex-shrink-0 transition-transform duration-500 hover:scale-105 my-1">
              <img
                src={capsuleImage2}
                alt="Jewellery Showcase 2"
                className="w-full h-full object-cover object-center"
              />
            </span>
            <span>{headingLine2End}</span>
          </div>

          {/* Line 3: It Organized. */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
            <span>{headingLine3}</span>
          </div>

        </div>

        {/* Description Paragraph */}
        {description && (
          <p className="text-sm sm:text-base md:text-lg text-stone-500 font-[var(--font-inter)] font-normal leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-10">
            {description}
          </p>
        )}

        {/* Bottom Tagline Row with Gold Dot Separators */}
        {taglines && taglines.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 text-xs sm:text-sm md:text-base font-semibold text-stone-900 font-[var(--font-dm-sans)]">
            {taglines.map((tagline, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-[#A44B03] font-bold">•</span>}
                <span>{tagline}</span>
              </React.Fragment>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default AurixIntro;
