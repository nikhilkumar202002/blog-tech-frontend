"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface AurownVisibilityProps {
  className?: string;
}

const AurownVisibility: React.FC<AurownVisibilityProps> = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Opposite vertical movements on scroll:
  // Left phone mockup moves UP as user scrolls down
  const y1 = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  // Right phone mockup moves DOWN in opposite direction as user scrolls down
  const y2 = useTransform(scrollYProgress, [0, 1], ["-50px", "50px"]);

  return (
    <section
      ref={sectionRef}
      className={`w-full py-20 sm:py-28 lg:py-36 bg-[#f8f8f8] text-stone-900 overflow-hidden ${className}`}
    >
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 2 Mobile Mockup PNG Images with Opposite Scroll Parallax */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-[440px] sm:min-h-[540px]">
            <div className="relative w-full max-w-[500px] flex items-center justify-center gap-4 sm:gap-6">
              
              {/* Left Phone Mockup (Moves UP on scroll) */}
              <motion.div
                style={{ y: y1 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1 }}
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

              {/* Right Phone Mockup (Moves DOWN on scroll in opposite direction) */}
              <motion.div
                style={{ y: y2 }}
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1 }}
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
          </div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex flex-col justify-center text-left"
          >
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#B65A00] mb-3 font-[var(--font-dm-sans)]">
              BUSINESS VISIBILITY
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.1] mb-6">
              Stay Connected to Your Business,{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#B65A00] block sm:inline"
              >
                Wherever You Are.
              </span>
            </h2>

            {/* Paragraph 1 */}
            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed mb-4">
              Running a jewellery business often means managing multiple stores, large inventories, sales activity and customer relationships.
            </p>

            {/* Paragraph 2 */}
            <p className="text-stone-600 text-base sm:text-lg font-[var(--font-inter)] font-normal leading-relaxed">
              Aurown brings key business information together in one place, helping owners stay informed about what is happening across their business without always being at the showroom.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AurownVisibility;
