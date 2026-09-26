"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUserCheck, FiCalendar, FiDollarSign, FiFileText, FiFolder, FiTrendingUp, FiBarChart2 } from "react-icons/fi";

const coreFeatures = [
  {
    id: "profiles",
    title: "Employee Profiles",
    description: "Maintain structured employee information and keep important employee records organised.",
    icon: <FiUserCheck className="w-5 h-5 text-[#A44B03]" />,
  },
  {
    id: "attendance",
    title: "Attendance & Leave",
    description: "Manage employee attendance and leave information from one central system.",
    icon: <FiCalendar className="w-5 h-5 text-[#A44B03]" />,
  },
  {
    id: "payroll",
    title: "Salary & Payroll",
    description: "Manage salary and payroll information while keeping employee compensation records organised.",
    icon: <FiDollarSign className="w-5 h-5 text-[#A44B03]" />,
  },
  {
    id: "payslips",
    title: "Payslips & Salary Records",
    description: "Maintain payslips and salary-related records for easier employee management.",
    icon: <FiFileText className="w-5 h-5 text-[#A44B03]" />,
  },
  {
    id: "documents",
    title: "Employee Documents",
    description: "Keep important employee documents organised and accessible within employee records.",
    icon: <FiFolder className="w-5 h-5 text-[#A44B03]" />,
  },
  {
    id: "lifecycle",
    title: "Employee Lifecycle",
    description: "Manage employee information throughout the different stages of their employment.",
    icon: <FiTrendingUp className="w-5 h-5 text-[#A44B03]" />,
  },
  {
    id: "reports",
    title: "Employee Reports",
    description: "Access employee-related reports to maintain better visibility over workforce information.",
    icon: <FiBarChart2 className="w-5 h-5 text-[#A44B03]" />,
  },
];

export default function EmployeePayrollFeatures() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const rightMockupImage = "/products/enroll-payroll/MOCKUP-2.png";

  return (
    <section className="w-full py-20 sm:py-28 md:py-32 bg-[#FAF7F2] text-stone-900 flex-shrink-0 relative overflow-hidden border-t border-stone-200/60">
      {/* Background Glow Accent */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#A44B03]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE: CONTENT & 2-COLUMN GRID VIEW OF 7 CORE FEATURES */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 xl:col-span-7 order-1 w-full"
          >
            <div className="w-full max-w-2xl lg:max-w-3xl">
              
              {/* Category / Eyebrow Badge */}
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#A44B03] font-[var(--font-dm-sans)] mb-3 block">
                CORE FEATURES
              </span>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.12] mb-8">
                A Simpler Way to{" "}
                <span
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  className="italic font-normal text-[#A44B03] block sm:inline mt-1 sm:mt-0"
                >
                  Manage Employees.
                </span>
              </h2>

              {/* 2-Column Grid View for Core Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {coreFeatures.map((feature, idx) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.05 }}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-start"
                  >
                    {/* Icon Box Accent */}
                    <div className="w-9 h-9 rounded-xl bg-[#A44B03]/10 flex items-center justify-center mb-3 flex-shrink-0 text-[#A44B03]">
                      {feature.icon}
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-base font-semibold text-stone-900 font-[var(--font-dm-sans)] tracking-tight mb-1">
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="text-xs sm:text-sm text-stone-600 font-[var(--font-dm-sans)] font-normal leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>

            </div>
          </motion.div>

          {/* RIGHT SIDE: MOCKUP IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 xl:col-span-5 flex justify-center lg:justify-end order-2 lg:sticky lg:top-28 w-full"
          >
            <div
              onClick={() => setZoomedImage(rightMockupImage)}
              className="relative w-full max-w-md lg:max-w-lg cursor-pointer group transition-transform duration-500 hover:scale-[1.02]"
            >
              <img
                src={rightMockupImage}
                alt="Employee Management System Interface Features"
                className="w-full h-auto object-contain drop-shadow-xl"
              />
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
                alt="Employee & Payroll Feature Interface Preview"
                className="w-full h-auto object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
