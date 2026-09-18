"use client";

import React from "react";
import { motion } from "framer-motion";

export interface AboutpageBannerProps {
  className?: string;
}

const AboutpageBanner: React.FC<AboutpageBannerProps> = ({ className = "" }) => {
  return (
    <section
      className={`relative w-full flex-shrink-0 min-h-screen min-h-[100dvh] lg:h-screen flex items-end pt-24 lg:pt-28 pb-0 bg-[#A44B03] bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:100px_100px] overflow-hidden ${className}`}
    >
      {/* Top to Bottom Linear Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7a3400]/40 via-transparent to-[#592600]/50 pointer-events-none z-[1]" />

      <div className="site-container w-full relative z-10 h-full flex flex-col justify-end">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-12 xl:gap-16 items-end w-full">

          {/* Left Side: 30% Width (3 of 10 cols), 80vh Height touching bottom, No Compression */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-3 flex justify-center lg:justify-start items-end h-full pt-4"
          >
            <div className="relative w-full max-w-[420px] lg:max-w-none h-[420px] sm:h-[520px] lg:h-[80vh] rounded-t-[32px] lg:rounded-t-[38px] rounded-b-none overflow-hidden border-t border-x border-white/15 group">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1000&q=80"
                alt="Technology Built Around Jewellery Business"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Right Side: 70% Width (7 of 10 cols), Heading, Description & Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 flex flex-col justify-center text-left text-white pb-10 lg:pb-16"
          >
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal tracking-tight text-white font-[var(--font-dm-sans)] leading-[1.12] mb-6">
              Technology Built
              <br />
              Around the{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#F3C476]"
              >
                Jewellery
              </span>
              <br />
              Business.
            </h1>

            {/* Description */}
            <p className="text-white/85 text-base sm:text-lg font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-xl mb-10 sm:mb-14">
              Built around the unique needs of jewellers, our software combines
              industry expertise, practical technology, and effortless usability.
            </p>

            {/* Stats Row (3 Columns) - Border Top Removed */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4">
              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2 font-[var(--font-dm-sans)]">
                  19+
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-[var(--font-dm-sans)] leading-snug">
                  Years of Industry
                  <br />
                  Experience
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2 font-[var(--font-dm-sans)]">
                  5
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-[var(--font-dm-sans)] leading-snug">
                  Specialized Core
                  <br />
                  Solutions
                </div>
              </div>

              <div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2 font-[var(--font-dm-sans)]">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-white/80 font-[var(--font-dm-sans)] leading-snug">
                  Jewellery
                  <br />
                  Industry Focus
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutpageBanner;

