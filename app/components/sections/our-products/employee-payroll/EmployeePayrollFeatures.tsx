"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiUserCheck,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiFolder,
  FiTrendingUp,
  FiBarChart2,
} from "react-icons/fi";

const coreFeatures = [
  {
    id: "profiles",
    number: "01",
    title: "Employee Profiles",
    description:
      "Maintain structured employee information and keep important workforce records organized in one centralized hub.",
    icon: <FiUserCheck className="w-6 h-6" />,
  },
  {
    id: "attendance",
    number: "02",
    title: "Attendance & Leave",
    description:
      "Track attendance, manage shift schedules, and process leave requests seamlessly with real-time visibility.",
    icon: <FiCalendar className="w-6 h-6" />,
  },
  {
    id: "payroll",
    number: "03",
    title: "Salary & Payroll",
    description:
      "Automate payroll calculations, handle deductions, and maintain accurate employee compensation structures.",
    icon: <FiDollarSign className="w-6 h-6" />,
  },
  {
    id: "payslips",
    number: "04",
    title: "Payslips & Salary Records",
    description:
      "Generate detailed digital payslips and preserve historical salary records for simplified compliance and audit readiness.",
    icon: <FiFileText className="w-6 h-6" />,
  },
  {
    id: "documents",
    number: "05",
    title: "Employee Documents",
    description:
      "Securely store and organize identification, contracts, certificates, and confidential HR files per employee.",
    icon: <FiFolder className="w-6 h-6" />,
  },
  {
    id: "lifecycle",
    number: "06",
    title: "Employee Lifecycle",
    description:
      "Manage every milestone from onboarding to performance reviews, role changes, and offboarding workflows.",
    icon: <FiTrendingUp className="w-6 h-6" />,
  },
  {
    id: "reports",
    number: "07",
    title: "HR Analytics & Reports",
    description:
      "Gain actionable workforce insights with comprehensive reporting on headcount, payroll expenses, attendance patterns, and staff metrics.",
    icon: <FiBarChart2 className="w-6 h-6" />,
    featured: true,
  },
];

export default function EmployeePayrollFeatures() {
  return (
    <section className="w-full py-20 sm:py-28 md:py-32 bg-[#FAF7F2] text-stone-900 flex-shrink-0 relative overflow-hidden border-t border-stone-200/60">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#A44B03]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="site-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#A44B03] font-[var(--font-dm-sans)] mb-3 block"
          >
            CORE FEATURES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.15] mb-5"
          >
            A Simpler Way to{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Manage Employees.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-stone-600 font-[var(--font-inter)] leading-relaxed"
          >
            Streamline workforce operations, centralize staff records, and maintain effortless salary and attendance management with our powerful feature suite.
          </motion.p>
        </div>

        {/* Responsive Card Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {coreFeatures.map((feature, idx) => {
            const isFeatured = feature.featured;

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                className={`group relative bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isFeatured ? "md:col-span-2 lg:col-span-3 bg-gradient-to-br from-white via-white to-[#FAF2E4]/40 border-[#A44B03]/30" : ""
                }`}
              >
                {/* Number Watermark Badge */}
                <span className="absolute top-6 right-7 text-2xl font-mono font-bold text-stone-300/40 group-hover:text-[#A44B03]/30 transition-colors duration-300 select-none">
                  {feature.number}
                </span>

                <div className={isFeatured ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-center" : ""}>
                  {/* Icon & Details */}
                  <div className={isFeatured ? "lg:col-span-8" : ""}>
                    {/* Icon Box */}
                    <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-[#A44B03]/10 text-[#A44B03] flex items-center justify-center mb-6 group-hover:bg-[#A44B03] group-hover:text-white transition-all duration-300 shadow-sm">
                      {feature.icon}
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-dm-sans)] tracking-tight mb-3 group-hover:text-[#A44B03] transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="text-sm sm:text-[15px] text-stone-600 font-[var(--font-inter)] font-normal leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Featured Extra Accent Box */}
                  {isFeatured && (
                    <div className="lg:col-span-4 flex items-center justify-start lg:justify-end pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-stone-200/70 lg:pl-8">
                      <div className="bg-[#FAF2E4] rounded-2xl p-5 border border-[#A44B03]/20 w-full">
                        <span className="text-xs font-semibold text-[#A44B03] uppercase tracking-wider block mb-1 font-[var(--font-dm-sans)]">
                          KEY ADVANTAGE
                        </span>
                        <p className="text-xs sm:text-sm text-stone-700 font-medium font-[var(--font-inter)]">
                          Export customized PDF & Excel reports instantly for leadership decision-making.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtle Hover Accent Bottom Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#A44B03] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
