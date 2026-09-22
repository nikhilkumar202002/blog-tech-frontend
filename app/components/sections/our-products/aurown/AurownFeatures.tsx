"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FiActivity,
  FiTrendingUp,
  FiBox,
  FiFileText,
  FiUsers,
  FiBarChart2,
} from "react-icons/fi";

const AUROWN_FEATURES_DATA = [
  {
    icon: FiActivity,
    title: "Business Overview",
    description: "Get a clear, real-time view of your entire jewellery business activity from a single centralized mobile dashboard.",
  },
  {
    icon: FiTrendingUp,
    title: "Sales Tracking",
    description: "Monitor counter sales, daily revenue trends, and employee performance to stay informed about business health wherever you are.",
  },
  {
    icon: FiBox,
    title: "Stock & Inventory",
    description: "Keep detailed track of live inventory, tag information, stock movements, and low-stock alerts right at your fingertips.",
  },
  {
    icon: FiFileText,
    title: "Purchase Tracking",
    description: "Monitor supplier purchases, order statuses, and maintain full visibility over all incoming business transactions.",
  },
  {
    icon: FiUsers,
    title: "Customer & Scheme Monitoring",
    description: "Stay connected with customer profiles, purchase history, and active gold/jewellery savings scheme activities.",
  },
  {
    icon: FiBarChart2,
    title: "Reports & Insights",
    description: "Access comprehensive executive reports, profit analysis, and operational insights to make data-driven decisions.",
  },
];

export interface AurownFeaturesProps {
  className?: string;
}

const AurownFeatures: React.FC<AurownFeaturesProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-20 sm:py-28 lg:py-36 bg-white text-stone-900 ${className}`}
    >
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-[40px]">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-xl font-normal capitalize tracking-[0] text-stone-400 mb-[6px] font-[var(--font-dm-sans)]"
          >
            Built For Business Owners
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 leading-[1.08] font-[var(--font-dm-sans)] tracking-tight"
          >
            Everything You Need to{" "}
            <br />
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#B65A00]"
            >
              Monitor Your Business.
            </span>
          </motion.h2>
        </div>

        {/* 3-Column Feature Cards Grid with 20px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {AUROWN_FEATURES_DATA.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-[#f9f9f8] hover:bg-[#FAF2E4]/60 border border-stone-200/60 hover:border-[#B65A00]/30 rounded-[24px] p-8 sm:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  {/* Icon Badge Container with 15px bottom margin */}
                  <div className="w-[52px] h-[52px] rounded-2xl bg-white border border-stone-200/80 group-hover:border-[#B65A00]/40 group-hover:bg-white flex items-center justify-center text-[#B65A00] mb-[15px] transition-colors duration-300 shadow-sm">
                    <IconComponent className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  {/* Feature Title with 6px bottom margin */}
                  <h3 className="text-xl font-medium leading-snug tracking-tight text-stone-900 mb-[6px] font-[var(--font-dm-sans)] group-hover:text-[#B65A00] transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Feature Description */}
                  <p className="text-base text-stone-600 font-normal leading-relaxed font-[var(--font-inter)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AurownFeatures;
