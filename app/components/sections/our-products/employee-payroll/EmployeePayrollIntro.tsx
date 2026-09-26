"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmployeePayrollIntro() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const mockupImage = "/products/enroll-payroll/MOCKUP-1.png";

  return (
    <section className="w-full py-20 sm:py-28 md:py-32 bg-white text-stone-900 flex-shrink-0 relative overflow-hidden">
      {/* Background Soft Glow Accent */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A44B03]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: MOCKUP IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-start order-1 w-full"
          >
            <div
              onClick={() => setZoomedImage(mockupImage)}
              className="relative w-full cursor-pointer group transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={mockupImage}
                alt="Employee & Payroll Management System Interface"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
            </div>
          </motion.div>

          {/* RIGHT SIDE: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center order-2 w-full"
          >
            <div className="w-full max-w-xl lg:max-w-2xl">
              
              {/* Category / Eyebrow Badge */}
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#A44B03] font-[var(--font-dm-sans)] mb-3 block">
                PEOPLE MANAGEMENT
              </span>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.12] mb-6">
                Everything Your Team Needs,{" "}
                <span
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  className="italic font-normal text-[#A44B03] block sm:inline mt-1 sm:mt-0"
                >
                  Organised in One Place.
                </span>
              </h2>

              {/* Description Paragraphs */}
              <div className="space-y-4 text-stone-600 font-[var(--font-dm-sans)] font-normal text-base sm:text-lg leading-relaxed">
                <p>
                  Managing employees involves more than maintaining salary records. From employee information and attendance to leave, payroll and documentation, having organised employee data helps businesses manage their teams more efficiently.
                </p>
                <p className="text-stone-800 font-medium pt-1">
                  Employee &amp; Payroll Management brings these essential processes together in a single system.
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Interactive Lightbox Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-7xl w-full max-h-[92vh] overflow-auto bg-white border border-stone-200 rounded-2xl p-2 shadow-2xl"
            >
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute top-4 right-4 z-20 px-4 py-2 rounded-xl bg-stone-900/90 text-white text-xs font-semibold border border-stone-700 hover:bg-stone-900 transition-all shadow-md"
              >
                Close Preview [ESC]
              </button>
              <img
                src={zoomedImage}
                alt="Employee & Payroll Management Mockup Preview"
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
