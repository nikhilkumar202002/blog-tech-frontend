"use client";

import React from "react";
import { motion } from "framer-motion";

export interface WorkflowStep {
  step: string;
  title: string;
  description: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Understand",
    description: "We begin by understanding the actual requirements of your business.",
  },
  {
    step: "02",
    title: "Build",
    description: "We develop practical and user-friendly solutions around those requirements.",
  },
  {
    step: "03",
    title: "Support",
    description: "We provide ongoing maintenance and technical support.",
  },
  {
    step: "04",
    title: "Evolve",
    description: "We continuously improve solutions as business and industry requirements change.",
  },
];

export interface ServicesWorkflowProps {
  className?: string;
}

const ServicesWorkflow: React.FC<ServicesWorkflowProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-[80px] lg:py-[150px] bg-[#f8f8f8] text-stone-900 ${className}`}
    >
      <div className="site-container">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-xl font-normal capitalize tracking-[0] text-stone-400 mb-[6px] font-[var(--font-dm-sans)]"
          >
            How We Work
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ letterSpacing: "-3px" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 leading-[1.08] font-[var(--font-dm-sans)]"
          >
            Understand. Build.{" "}
            <br />
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#B65A00]"
            >
              Support. Evolve.
            </span>
          </motion.h2>
        </div>

        {/* 4-Column Step Cards Grid with 20px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
          {WORKFLOW_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white rounded-[25px] p-[24px] sm:p-[28px] flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Step Number Badge */}
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#B65A00] mb-6 font-[var(--font-dm-sans)]">
                  {item.step}
                </div>

                {/* Step Title */}
                <h3 className="text-[22px] sm:text-[24px] font-medium leading-snug tracking-tight text-stone-900 mb-3 font-[var(--font-dm-sans)] group-hover:text-[#B65A00] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Step Description */}
                <p className="text-[16px] text-stone-500 font-normal leading-relaxed font-[var(--font-inter)]">
                  {item.description}
                </p>
              </div>

              {/* Bottom Decorative Indicator */}
              <div className="mt-8 pt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>STEP {idx + 1} OF 4</span>
                <span className="text-[#B65A00] opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                  PROCESS
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesWorkflow;
