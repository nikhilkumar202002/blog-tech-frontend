"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export interface AurownAccessProps {
  className?: string;
}

const AurownAccess: React.FC<AurownAccessProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-20 sm:py-28 lg:py-36 bg-[#f8f8f8] text-stone-900 overflow-hidden ${className}`}
    >
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Expanded Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Eyebrow */}
            <p className="text-base sm:text-lg lg:text-xl font-normal capitalize tracking-[0] text-stone-400 mb-[6px] font-[var(--font-dm-sans)]">
              Access From Anywhere
            </p>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.1] mb-6">
              Your Business Doesn't Stop{" "}
              <br className="hidden sm:inline" />
              When You{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#B65A00]"
              >
                Leave the Showroom.
              </span>
            </h2>

            {/* Paragraphs */}
            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed mb-4">
              Aurown empowers jewellery business owners with instant, 24/7 mobile access to critical operations, allowing you to monitor store performance from anywhere in the world.
            </p>

            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed mb-4">
              Whether you're visiting suppliers, managing another branch, traveling abroad, or away from the showroom floor, your core metrics remain continuously synchronized and accessible.
            </p>

            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed mb-6">
              Gain complete peace of mind with real-time sales visibility, stock audit tracking, and automated business alerts delivered straight to your smartphone.
            </p>

            {/* Feature Highlights Bullet List */}
            <div className="space-y-3 pt-4 border-t border-stone-200/80">
              {[
                "Real-Time Multi-Branch Synchronization",
                "Instant Counter Sales & Revenue Notifications",
                "Role-Based Mobile Security & Data Encryption",
              ].map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FiCheckCircle className="w-5 h-5 text-[#B65A00] flex-shrink-0" />
                  <span className="text-stone-800 text-sm sm:text-base font-medium font-[var(--font-dm-sans)]">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Standalone Mobile Phone Mockup PNG */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center items-center relative"
          >
            <div className="relative w-full max-w-[420px] flex justify-center items-center">
              {/* Soft Ambient Radial Glow */}
              <div className="absolute w-[80%] h-[80%] bg-[#FAF2E4] rounded-full filter blur-3xl opacity-70 z-0 pointer-events-none" />

              {/* Mobile Mockup PNG Image */}
              <motion.img
                src="/products/aurown/mobile-mockup-1.png"
                alt="Aurown Mobile App Mockup - Access From Anywhere"
                className="relative z-10 w-full max-w-[360px] sm:max-w-[380px] h-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-[1.03]"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AurownAccess;
