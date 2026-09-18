"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiSliders, FiLayers, FiRefreshCw } from "react-icons/fi";

export interface ApproachCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const APPROACH_ITEMS: ApproachCard[] = [
  {
    id: "deep-understanding",
    title: "Deep Understanding",
    description:
      "Analyzing the actual, ground-level requirements of jewellery businesses.",
    icon: <FiSearch className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
  },
  {
    id: "practicality-first",
    title: "Practicality First",
    description:
      "Developing user-friendly software solutions that reduce manual effort.",
    icon: <FiSliders className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
  },
  {
    id: "organized-control",
    title: "Organized Control",
    description:
      "Providing powerful tools for better stock management, accounts, and business oversight.",
    icon: <FiLayers className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
  },
  {
    id: "evolving-together",
    title: "Evolving Together",
    description:
      "Continuously improving our solutions based on shifting industry needs and building strong, lasting relationships",
    icon: <FiRefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />,
  },
];

export interface CoreApproachProps {
  className?: string;
}

const CoreApproach: React.FC<CoreApproachProps> = ({ className = "" }) => {
  return (
    <section className={`w-full py-20 sm:py-28 lg:py-36 bg-white text-stone-900 flex-shrink-0 ${className}`}>
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-center">

          {/* Left Column: Heading & Intro Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center text-left"
          >
            <span className="block text-sm sm:text-base font-medium text-stone-500 font-[var(--font-dm-sans)] mb-3">
              Our Core Approach
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.1] mb-6">
              Simplifying{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#A44B03]"
              >
                Complex
              </span>
              <br />
              Operations
            </h2>

            <p className="text-stone-500 text-base sm:text-lg font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-lg">
              We believe that good software should not make business operations more complicated; it should make them simpler, faster, and more organized. Our development philosophy is centered around
            </p>
          </motion.div>

          {/* Right Column: 2x2 Grid of Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="lg:col-span-7 xl:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {APPROACH_ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#f6f6f5] hover:bg-[#f1f1f0] transition-colors duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-start border border-stone-200/40 group"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#A44B03] flex items-center justify-center flex-shrink-0 mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-[var(--font-dm-sans)] tracking-tight mb-2">
                    {item.title}
                  </h3>

                  <p className="text-stone-500 text-xs sm:text-sm font-[var(--font-dm-sans)] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CoreApproach;
