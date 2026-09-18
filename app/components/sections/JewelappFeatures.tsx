"use client";

import React from "react";
import Image from "next/image";
import {
    FiCheckCircle,
    FiPieChart,
    FiBarChart2,
    FiActivity,
} from "react-icons/fi";
import { motion } from "framer-motion";

const jewelShowcaseFeatures = [
    {
        title: "Identify Jewellery by Image",
        description:
            "Allows users to identify jewellery using an image. A customer or showroom staff member can provide an image of a jewellery piece, and the system can help find the corresponding design and its available information.",
    },
    {
        title: "Scan & Access by Barcode",
        description:
            "Every jewellery item can be associated with a unique barcode. By scanning the barcode, users can quickly access the item's information without manually searching through the catalogue, providing a fast way to identify a specific piece and retrieve its details.",
    },
    {
        title: "Explore Jewellery Details",
        description:
            "Once a jewellery item is identified, users can view its relevant information, such as product/design details, specifications, weight and other attributes, available stock, and related design information.",
    },
];

const branchControlFeatures = [
    {
        id: "dashboard",
        title: "Overall Inventory Dashboard",
        description:
            "View total stock, available items, barcode-linked products, design-wise inventory, and other key inventory insights across the business.",
        icon: <FiPieChart className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    },
    {
        id: "comparison",
        title: "Branch Comparison",
        description:
            "Compare stock availability, inventory levels, product movement, and barcode activity across different branches.",
        icon: <FiBarChart2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    },
    {
        id: "monitoring",
        title: "Barcode & Stock Monitoring",
        description:
            "Track jewellery items through their unique barcodes and monitor their current stock status across branches.",
        icon: <FiActivity className="w-6 h-6 sm:w-7 sm:h-7 text-white" />,
    },
];

export default function JewelappFeatures() {
    return (
        <>
            <section className="w-full py-12 sm:py-24 md:py-36 bg-white text-stone-900 flex-shrink-0">
                <div className="site-container relative z-10">

                    {/* Top Showcase Section: Image Left, Content Right */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-14 lg:gap-16 items-center">

                        {/* Left Column: Jewel Connect UI Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 25, x: -20 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 xl:col-span-6 flex justify-center"
                        >
                            <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg flex justify-center items-center">
                                <div className="absolute inset-0 bg-[#A44B03]/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
                                <Image
                                    src="/products/jewel-connect/jewel-connect-mockup.webp"
                                    alt="Jewel Connect Digital Showroom Platform UI"
                                    width={600}
                                    height={800}
                                    priority
                                    className="relative z-10 w-full h-auto object-contain max-h-[320px] xs:max-h-[380px] sm:max-h-[550px] drop-shadow-2xl rounded-2xl sm:rounded-3xl"
                                />
                            </div>
                        </motion.div>

                        {/* Right Column: Heading, Description & 3 Feature Points */}
                        <motion.div
                            initial={{ opacity: 0, y: 25, x: 20 }}
                            whileInView={{ opacity: 1, y: 0, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center"
                        >
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.18] mb-3 sm:mb-4">
                                Empower Customers and{" "}
                                <span
                                    style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                                    className="italic font-normal text-[#A44B03] inline-block sm:block mt-0.5 sm:mt-1"
                                >
                                    Showroom Staff
                                </span>
                            </h2>

                            <p className="text-stone-600 text-xs sm:text-base md:text-lg leading-relaxed font-[var(--font-dm-sans)] font-normal mb-6 sm:mb-8">
                                Jewel Connect is designed to work on tablets and other customer-facing devices inside the showroom. Customers can browse or identify jewellery themselves, while showroom staff can use the system to quickly retrieve product information and stock details.
                            </p>

                            {/* 3 Bullet Points */}
                            <div className="space-y-3.5 sm:space-y-5">
                                {jewelShowcaseFeatures.map((feat) => (
                                    <div key={feat.title} className="flex items-start gap-2.5 sm:gap-3.5">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#A44B03]/10 text-[#A44B03] flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <FiCheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                                        </div>
                                        <div>
                                            <h3 className="text-xs sm:text-base md:text-lg font-bold text-stone-900 font-[var(--font-dm-sans)] tracking-tight">
                                                {feat.title}:
                                            </h3>
                                            <p className="text-stone-600 text-[11px] sm:text-sm md:text-base leading-relaxed font-[var(--font-dm-sans)] font-normal mt-0.5">
                                                {feat.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* Centralized Control Across All Branches Section */}
                    <div className="mt-14 sm:mt-28 md:mt-40">
                        {/* Section Heading & Description */}
                        <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 px-2 sm:px-0"
                        >
                            <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-tight">
                                Centralized Control
                            </h2>
                            <p className="text-2xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] mt-0.5 sm:mt-1">
                                <span
                                    style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                                    className="italic font-normal text-[#A44B03] mr-1.5 sm:mr-2"
                                >
                                    Across All
                                </span>
                                Branches
                            </p>
                            <p className="text-stone-600 text-xs sm:text-base md:text-lg leading-relaxed font-[var(--font-dm-sans)] font-normal mt-4 sm:mt-6 max-w-2xl mx-auto">
                                Get a centralized overview of jewellery inventory, designs, barcode records, and stock movement across the entire business. Admins and authorized company users can monitor jewellery stock, barcode activity, and inventory status across individual branches.
                            </p>
                        </motion.div>

                        {/* 3 Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10">
                            {branchControlFeatures.map((feature, idx) => (
                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex flex-col items-center text-center px-2 sm:px-4 py-3 sm:py-6"
                                >
                                    {/* Icon Box Container with Gradient */}
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#d46b19] via-[#A44B03] to-[#803801] shadow-md shadow-[#A44B03]/20 flex items-center justify-center mb-3 sm:mb-6 flex-shrink-0">
                                        {feature.icon}
                                    </div>

                                    {/* Item Title */}
                                    <h3 className="text-base sm:text-2xl font-bold text-stone-900 tracking-tight font-[var(--font-dm-sans)] mb-1.5 sm:mb-3">
                                        {feature.title}
                                    </h3>

                                    {/* Item Description */}
                                    <p className="text-stone-600 text-xs sm:text-base leading-relaxed font-[var(--font-dm-sans)] font-normal max-w-sm">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* Turning Ideas into Digital Solutions Section */}
            <section className="w-full py-12 sm:py-28 md:py-36 bg-[#F9F9F9] text-stone-900 flex-shrink-0">
                <div className="site-container relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 lg:gap-16 items-start justify-between">

                        {/* Left Column - Large Headline */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-7"
                        >
                            <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.15] sm:leading-[1.1]">
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
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-5 flex flex-col items-start lg:items-end text-left lg:text-right space-y-4 sm:space-y-8 lg:pt-2"
                        >

                            {/* Description Text */}
                            <p className="text-stone-600 text-xs sm:text-base md:text-lg leading-relaxed font-[var(--font-dm-sans)] font-normal max-w-md">
                                Built on trust and driven by experience since 2007.
                                Connect directly with our engineering team to see how
                                Jewel Connect elevates your showroom experience.
                            </p>

                            {/* Direct Contact Numbers & Email */}
                            <div className="space-y-1.5 sm:space-y-2 font-[var(--font-dm-sans)] font-medium text-stone-900 text-sm sm:text-lg tracking-tight">
                                <div className="flex flex-col sm:flex-row items-start lg:items-end sm:items-center gap-0.5 sm:gap-2">
                                    <a href="tel:7994455922" className="hover:text-[#A44B03] transition-colors">
                                        +91 79944 55922
                                    </a>
                                    <span className="hidden sm:inline text-stone-400">/</span>
                                    <a href="tel:04844539025" className="hover:text-[#A44B03] transition-colors">
                                        0484 4539025
                                    </a>
                                </div>
                                <p>
                                    <a href="mailto:blogtecsoftware@gmail.com" className="hover:text-[#A44B03] transition-colors text-xs sm:text-base">
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