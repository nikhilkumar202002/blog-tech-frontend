"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "@/app/components/common/Button";

export interface ServicesCTAProps {
  className?: string;
}

const ServicesCTA: React.FC<ServicesCTAProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-20 sm:py-28 lg:py-36 bg-[#FAF2E4] text-stone-900 overflow-hidden ${className}`}
    >
      <div className="site-container">
        
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 md:gap-12">
          
          {/* Left Side: Eyebrow + 2-Line Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-left"
          >
            {/* Eyebrow */}
            <p className="text-base sm:text-lg font-normal text-stone-900 font-[var(--font-dm-sans)] mb-3">
              Have A Requirement?
            </p>

            {/* Headline */}
            <h2
              style={{ letterSpacing: "-2px" }}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium text-stone-900 leading-[1.1] font-[var(--font-dm-sans)]"
            >
              Let's Build The{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic font-normal text-[#B65A00]"
              >
                Right Solution
              </span>
              <br />
              For Your Business.
            </h2>
          </motion.div>

          {/* Right Side: Description + Talk to Our Team CTA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start md:items-end gap-6 text-left md:text-right"
          >
            {/* Description */}
            <p className="text-sm sm:text-base text-stone-900 font-normal leading-relaxed font-[var(--font-inter)] max-w-md">
              Tell Us What Your Business Needs And Let's
              <br className="hidden sm:inline" />
              {" "}Explore How Blogtec Can Help.
            </p>

            {/* Talk to Our Team CTA Button */}
            <div>
              <Button href="/contact-us" pillColor="bg-[#A44B03]">
                Talk to Our Team
              </Button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ServicesCTA;
