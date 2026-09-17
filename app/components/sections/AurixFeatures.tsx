"use client";

import React from "react";
import { FiHeadphones, FiRefreshCw, FiDatabase } from "react-icons/fi";
import { motion } from "framer-motion";

const businessModules = [
  {
    id: "inventory",
    title: "Inventory & Identification",
    items: [
      {
        label: "Inventory Management:",
        text: "Maintain optimal stock levels by monitoring inventory and identifying required quantities for timely reordering to minimize excess stock and prevent shortages.",
      },
      {
        label: "Barcode & RFID Management:",
        text: "Simplify product identification and stock tracking across inventory, sales, and stock movements with barcode and RFID technology.",
      },
    ],
  },
  {
    id: "workshop",
    title: "Workshop & Production",
    items: [
      {
        label: "Smith Management:",
        text: "Manage goldsmith and job-work activities, tracking metal issued and received, assigned jobs, and work status.",
      },
      {
        label: "Repair Management:",
        text: "Track customer jewellery issued to smiths and received back after repair, maintaining complete movement records.",
      },
      {
        label: "Yield Processing:",
        text: "Monitor metal yield for jewellery purchased from customers, tracking wastage, recovery, and yield calculations to minimize discrepancies.",
      },
    ],
  },
  {
    id: "customers",
    title: "Customers & Schemes",
    items: [
      {
        label: "Customer Relationship Management:",
        text: "Maintain comprehensive customer profiles, purchase history, and transactions in one centralized hub.",
      },
      {
        label: "Scheme Management:",
        text: "Easily manage jewellery schemes and customer enrollments, tracking payment milestones and schedules.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance & Executive MIS",
    items: [
      {
        label: "Accounts & Finance:",
        text: "Manage customer accounts, payments, financial transactions, and cheque reconciliation.",
      },
      {
        label: "Reports & MIS:",
        text: "Generate comprehensive reports across sales, inventory, accounts, and overall performance for clear operational oversight.",
      },
    ],
  },
];

const techLogos = [
  { name: "Java", src: "/tech_logos/731_java.png", height: "h-12 sm:h-14 md:h-16" },
  { name: "React Native", src: "/tech_logos/react-native.png", height: "h-8 sm:h-10 md:h-11" },
  { name: "Spring Boot", src: "/tech_logos/spring-boot.png", height: "h-8 sm:h-10 md:h-11" },
  { name: "PostgreSQL", src: "/tech_logos/pngwing.com.png", height: "h-9 sm:h-11 md:h-12" },
  { name: "Hibernate", src: "/tech_logos/Hibernate_logo_a.png", height: "h-7 sm:h-9 md:h-10" },
  { name: "Apache Maven", src: "/tech_logos/Apache_Maven_logo.png", height: "h-7 sm:h-9 md:h-10" },
];

const supportServices = [
  {
    id: "maintenance",
    title: "Maintenance & Support",
    description:
      "Continuous technical support and software maintenance to keep systems reliable, secure, and running smoothly.",
    icon: <FiHeadphones className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
  },
  {
    id: "upgrades",
    title: "Upgrades & Custom Solutions",
    description:
      "Regular software updates and tailored workflows designed to match specific showroom business processes.",
    icon: <FiRefreshCw className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
  },
  {
    id: "data-management",
    title: "Data & System Management",
    description:
      "Secure database administration, data migration, and system optimization for reliable performance.",
    icon: <FiDatabase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
  },
];

export default function AurixFeatures() {
  return (
    <>
      <section className="w-full pb-16 sm:pb-28 md:pb-36 bg-white text-stone-900 flex-shrink-0">
        {/* Global CSS App Container Class */}
        <div className="site-container relative z-10">
          
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
            <p
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="text-3xl sm:text-5xl md:text-6xl italic font-normal text-[#A44B03] mt-1"
            >
              Business Modules
            </p>
          </motion.div>

          {/* 2x2 Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {businessModules.map((module, idx) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#f5f5f5] rounded-[24px] sm:rounded-[32px] p-5 sm:p-10 md:p-12 flex flex-col justify-start"
              >
                {/* Module Card Title with Orange/Gold Bullet */}
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 tracking-tight font-[var(--font-dm-sans)] mb-4 sm:mb-6 flex items-start gap-2.5">
                  <span className="text-[#A44B03] font-bold select-none leading-none mt-0.5">•</span>
                  <span>{module.title}</span>
                </h3>

                {/* Sub-items list */}
                <div className="space-y-3.5 sm:space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-[var(--font-dm-sans)] font-normal">
                  {module.items.map((item, itemIdx) => (
                    <p key={itemIdx}>
                      <span className="font-semibold text-stone-800 mr-1.5">
                        {item.label}
                      </span>
                      {item.text}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Built on Reliable, Enterprise-Grade Architecture Section */}
          <div className="mt-16 sm:mt-32 md:mt-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column - Heading */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5"
            >
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.18]">
                Built on Reliable,
                <br />
                Enterprise–Grade
                <br />
                <span
                  style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                  className="italic font-normal text-[#A44B03]"
                >
                  Architecture
                </span>
              </h2>
            </motion.div>

            {/* Right Column - Tech Stack Logos Grid (2 cols mobile, 3 cols sm+) */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-y-6 sm:gap-y-10 gap-x-4 sm:gap-x-12 items-center justify-items-center">
              {techLogos.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center p-2"
                >
                  <img
                    src={tech.src}
                    alt={tech.name}
                    className={`w-auto object-contain max-w-[110px] sm:max-w-[180px] ${tech.height}`}
                  />
                </motion.div>
              ))}
            </div>

          </div>

          {/* Comprehensive Support for Every Stage Section */}
          <div className="mt-16 sm:mt-32 md:mt-40">
            
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
                  {/* Icon Box Container with Gradient */}
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

      {/* Turning Ideas into Digital Solutions Section - ONLY this section has #F9F9F9 background */}
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
                Connect directly with our engineering team to see how
                AURIX transforms your showroom workflow.
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
