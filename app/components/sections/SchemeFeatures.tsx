"use client";

import React from "react";
import { FiSmartphone, FiCreditCard, FiBell, FiShield, FiHeadphones, FiRefreshCw, FiDatabase, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const schemeShowcaseFeatures = [
  {
    title: "Branded Experience",
    description: "Customized with your jewellery business's name, logo, and branding.",
  },
  {
    title: "Digital Passbook",
    description: "Check scheme amount, duration, start date, and maturity details.",
  },
  {
    title: "Direct Payments",
    description: "Pay installments directly through the app and receive instant confirmations.",
  },
  {
    title: "Real-Time Updates",
    description: "Get installment reminders, due-date alerts, and track overall scheme progress.",
  },
];

const supportServices = [
  {
    id: "maintenance",
    title: "App Support & Maintenance",
    description:
      "Continuous technical maintenance and App Store monitoring to ensure maximum uptime, speed, and security.",
    icon: <FiHeadphones className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
  },
  {
    id: "upgrades",
    title: "Updates & Feature Enhancements",
    description:
      "Regular mobile app updates introducing new payment options, security upgrades, and user experience enhancements.",
    icon: <FiRefreshCw className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
  },
  {
    id: "data-management",
    title: "ERP & Data Synchronization",
    description:
      "Real-time bi-directional synchronization between the Scheme Mobile App and your showroom ERP (AURIX).",
    icon: <FiDatabase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
  },
];

export default function SchemeFeatures() {
  return (
    <>
      <section className="w-full py-16 sm:py-28 md:py-36 bg-white text-stone-900 flex-shrink-0">
        <div className="site-container relative z-10">

          {/* Top Showcase Section: Image Left, Content Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center mb-24 sm:mb-32 md:mb-40">

            {/* Left Column: Scheme App UI Image */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: -30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 xl:col-span-6 flex justify-center"
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex justify-center">
                <div className="absolute inset-0 bg-[#A44B03]/10 rounded-full blur-[100px] pointer-events-none" />
                <img
                  src="/products/scheme-app/scheme-app-UI.webp"
                  alt="Manage Jewellery Schemes Mobile App UI"
                  className="relative z-10 w-full h-auto object-contain max-h-[520px] sm:max-h-[600px] drop-shadow-2xl rounded-3xl"
                />
              </div>
            </motion.div>

            {/* Right Column: Heading, Description & Feature Points */}
            <motion.div
              initial={{ opacity: 0, y: 30, x: 30 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.12] mb-4">
                Manage Jewellery Schemes,{" "}
                <span
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  className="italic font-normal text-[#A44B03] block sm:inline mt-1 sm:mt-0"
                >
                  Anytime, Anywhere.
                </span>
              </h2>

              <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed font-[var(--font-dm-sans)] font-normal mb-8">
                Provide customers with a fully branded mobile app to track their scheme progress, view passbooks, and make secure installment payments without visiting the showroom.
              </p>

              {/* 4 Bullet Points */}
              <div className="space-y-4 sm:space-y-5">
                {schemeShowcaseFeatures.map((feat) => (
                  <div key={feat.title} className="flex items-start gap-3 sm:gap-3.5">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#A44B03]/10 text-[#A44B03] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-lg font-bold text-stone-900 font-[var(--font-dm-sans)] tracking-tight">
                        {feat.title}:
                      </h3>
                      <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed font-[var(--font-dm-sans)] font-normal">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Comprehensive Support Section */}
          <div className="mt-16 sm:mt-28 md:mt-36">

            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center max-w-3xl mx-auto mb-10 sm:mb-20"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-tight">
                Comprehensive
              </h2>
              <p className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] mt-1">
                <span
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  className="italic font-normal text-[#A44B03] mr-2"
                >
                  Support
                </span>
                for Every Stage
              </p>
            </motion.div>

            {/* 3 Support Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
              {supportServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center px-3 sm:px-4 py-4 sm:py-6"
                >
                  {/* Icon Box Container */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#d46b19] via-[#A44B03] to-[#803801] shadow-md shadow-[#A44B03]/20 flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0">
                    {service.icon}
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-2xl font-bold text-stone-900 tracking-tight font-[var(--font-dm-sans)] mb-2 sm:mb-3">
                    {service.title}
                  </h3>

                  {/* Card Description */}
                  <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-[var(--font-dm-sans)] font-normal max-w-sm">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* Turning Ideas into Digital Solutions Section */}
      <section className="w-full py-16 sm:py-28 md:py-36 bg-[#F9F9F9] text-stone-900 flex-shrink-0">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start justify-between">

            {/* Left Column - Large Headline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.1]">
                Turning Ideas
                <br />
                into{" "}
                <span
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  className="italic font-normal text-[#A44B03]"
                >
                  Digital
                </span>
                <br />
                Solutions.
              </h2>
            </motion.div>

            {/* Right Column - Descriptive Text & Direct Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right space-y-6 sm:space-y-8 lg:pt-2"
            >

              {/* Description Text */}
              <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed font-[var(--font-dm-sans)] font-normal max-w-md">
                Built on trust and driven by experience since 2007.
                Connect directly with our engineering team to get your branded
                Scheme Mobile App for iOS & Android.
              </p>

              {/* Direct Contact Numbers & Email */}
              <div className="space-y-2 font-[var(--font-dm-sans)] font-medium text-stone-900 text-base sm:text-lg tracking-tight">
                <div className="flex flex-col sm:flex-row items-start lg:items-end sm:items-center gap-1 sm:gap-2">
                  <a href="tel:7994455922" className="hover:text-[#A44B03] transition-colors">
                    +91 79944 55922
                  </a>
                  <span className="hidden sm:inline text-stone-400">/</span>
                  <a href="tel:04844539025" className="hover:text-[#A44B03] transition-colors">
                    0484 4539025
                  </a>
                </div>
                <p>
                  <a href="mailto:blogtecsoftware@gmail.com" className="hover:text-[#A44B03] transition-colors">
                    blogtecsoftware@gmail.com
                  </a>
                </p>
              </div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
