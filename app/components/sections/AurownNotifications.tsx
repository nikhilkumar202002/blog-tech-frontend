"use client";

import React from "react";
import { motion } from "framer-motion";

export interface AurownNotificationsProps {
  className?: string;
}

const AurownNotifications: React.FC<AurownNotificationsProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-20 sm:py-28 lg:py-36 bg-white text-stone-900 overflow-hidden ${className}`}
    >
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 2 Mobile Mockup PNG Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center items-center relative min-h-[440px] sm:min-h-[500px]"
          >
            <div className="relative w-full max-w-[500px] flex items-center justify-center gap-4 sm:gap-6">
              {/* Soft Ambient Radial Glow */}
              <div className="absolute w-[80%] h-[80%] bg-[#FAF2E4] rounded-full filter blur-3xl opacity-70 z-0 pointer-events-none" />

              {/* Left Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="w-1/2 relative drop-shadow-2xl z-10"
              >
                <img
                  src="/products/aurown/mobile-mockup-1.png"
                  alt="Aurown Mobile App Mockup 1"
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.03]"
                />
              </motion.div>

              {/* Right Phone Mockup */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="w-1/2 relative drop-shadow-2xl z-20 mt-8 sm:mt-12"
              >
                <img
                  src="/products/aurown/mobile-mockup-2.png"
                  alt="Aurown Mobile App Mockup 2"
                  className="w-full h-auto object-contain transition-transform duration-500 hover:scale-[1.03]"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Eyebrow */}
            <p className="text-base sm:text-lg lg:text-xl font-normal capitalize tracking-[0] text-stone-400 mb-[6px] font-[var(--font-dm-sans)]">
              Stay Informed
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.1] mb-6">
              Important Updates,{" "}
              <br className="hidden sm:inline" />
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#B65A00]"
              >
                When They Matter.
              </span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed mb-4">
              Aurown provides real-time notifications to help owners stay informed about relevant business activity and updates.
            </p>

            {/* Paragraph 2 */}
            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed">
              Instead of constantly checking different systems, important information can reach you through the mobile experience.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AurownNotifications;
