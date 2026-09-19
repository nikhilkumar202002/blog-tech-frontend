"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

const SERVICES_GRID_DATA: ServiceCardItem[] = [
  {
    id: "jewellery-erp",
    title: "Jewellery ERP Solutions",
    description:
      "Industry-Focused ERP Software Designed Around The Unique Operational Needs Of Jewellery Businesses.",
    image: "/images/mobile-laptop-mockup-3.webp",
    href: "/our-products/aurix",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Continuous Technical Support And Software Maintenance To Keep Your Systems Reliable, Secure And Running Smoothly.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=support",
  },
  {
    id: "upgrades-enhancements",
    title: "Upgrades & Enhancements",
    description:
      "Regular Updates, Improvements And Enhancements To Keep Your Software Aligned With Evolving Business Requirements.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=upgrades",
  },
  {
    id: "custom-solutions",
    title: "Custom Software Solutions",
    description:
      "Tailored Features, Workflows And Functionalities Designed Around Your Specific Business Processes.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=custom",
  },
  {
    id: "data-management",
    title: "Data & System Management",
    description:
      "Secure Database Management, Data Migration, System Configuration And Optimization For Efficient System Performance.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=data",
  },
  {
    id: "mobile-digital",
    title: "Mobile & Digital Solutions",
    description:
      "Mobile Applications And Digital Platforms That Connect Business Owners, Staff And Customers Beyond The Showroom.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    href: "/our-products/scheme-app",
  },
];

export interface ServicesGridProps {
  className?: string;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ className = "" }) => {
  return (
    <section
      className={`w-full py-[80px] lg:py-[150px] bg-[#f8f8f8] text-stone-900 ${className}`}
    >
      <div className="site-container">
        
        {/* 3-Column Cards Grid with 20px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {SERVICES_GRID_DATA.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={item.href}
                className="group block bg-white rounded-[25px] p-[18px] transition-all duration-300 flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden mb-4 bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow justify-start px-1 pb-1">
                  <h3 className="text-[20px] font-medium leading-snug tracking-tight text-stone-900 mb-2 font-[var(--font-dm-sans)] group-hover:text-[#c05803] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[17px] text-stone-500 font-normal leading-relaxed font-[var(--font-inter)]">
                    {item.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;
