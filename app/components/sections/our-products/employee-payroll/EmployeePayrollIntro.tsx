"use client";

import React from "react";
import { motion } from "framer-motion";

export default function EmployeePayrollIntro() {
  return (
    <section className="w-full py-20 sm:py-28 md:py-32 bg-white text-stone-900 flex-shrink-0 relative overflow-hidden">
      {/* Background Soft Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A44B03]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center flex flex-col items-center"
        >
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#A44B03] font-[var(--font-dm-sans)] mb-3 block">
            PEOPLE MANAGEMENT
          </span>

          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.15] mb-6">
            Everything Your Team Needs,{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03] block sm:inline mt-1 sm:mt-0"
            >
              Organised in One Place.
            </span>
          </h2>

          {/* Description Paragraphs */}
          <div className="space-y-4 text-stone-600 font-[var(--font-inter)] font-normal text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            <p>
              Managing employees involves more than maintaining salary records. From employee information and attendance to leave, payroll and documentation, having organised employee data helps businesses manage their teams more efficiently.
            </p>
            <p className="text-stone-800 font-medium pt-2 text-lg sm:text-xl">
              Employee &amp; Payroll Management brings these essential processes together in a single system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
