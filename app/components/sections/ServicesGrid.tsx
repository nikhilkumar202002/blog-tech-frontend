"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  image: string;
  href: string;
}

const SERVICES_GRID_DATA: ServiceCardItem[] = [
  {
    id: "jewellery-erp",
    title: "Jewellery ERP Solutions",
    description:
      "Industry-focused ERP software designed around the unique operational needs of jewellery businesses—from counter billing and inventory to metal accounting.",
    highlights: ["Counter Billing & POS", "Gold & Silver Metal Accounting", "Stock & Tag Management"],
    image: "/images/mobile-laptop-mockup-3.webp",
    href: "/our-products/aurix",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Continuous technical support and software maintenance to keep your systems reliable, secure, and running smoothly during peak business hours.",
    highlights: ["Dedicated Helpdesk", "Priority Support", "System Health Checks"],
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=support",
  },
  {
    id: "upgrades-enhancements",
    title: "Upgrades & Enhancements",
    description:
      "Regular updates, performance improvements, and feature enhancements to keep your software aligned with evolving business and regulatory requirements.",
    highlights: ["Feature Expansions", "GST & Tax Updates", "UI/UX Enhancements"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=upgrades",
  },
  {
    id: "custom-solutions",
    title: "Custom Software Solutions",
    description:
      "Tailored features, proprietary workflows, and specialized functionalities built around your specific business processes and retail/wholesale models.",
    highlights: ["Custom Workflows", "Tailored Reports", "Bespoke Modules"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=custom",
  },
  {
    id: "data-management",
    title: "Data & System Management",
    description:
      "Secure database management, legacy data migration, system configuration, and continuous database optimization for fast query performance.",
    highlights: ["Legacy Migration", "Database Optimization", "Data Sanitation"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=data",
  },
  {
    id: "mobile-digital",
    title: "Mobile & Digital Solutions",
    description:
      "Mobile applications and digital platforms that connect business owners, showroom staff, and customers beyond traditional retail spaces.",
    highlights: ["Scheme Savings App", "Executive Dashboards", "Customer Portals"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    href: "/our-products/scheme-app",
  },
  {
    id: "cloud-sync",
    title: "Cloud & Multi-Branch Sync",
    description:
      "Real-time data synchronization across multiple showrooms, branch stores, and central warehouses with unified inventory and sales tracking.",
    highlights: ["Multi-Store Visibility", "Centralized Pricing", "Real-Time Stock Sync"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=cloud",
  },
  {
    id: "security-backup",
    title: "Security & Backup Solutions",
    description:
      "Enterprise-grade data encryption, automated daily cloud backups, access permissions control, and comprehensive disaster recovery management.",
    highlights: ["Automated Backups", "Role-Based Access", "Disaster Recovery"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=security",
  },
  {
    id: "third-party-integrations",
    title: "Third-Party Integrations",
    description:
      "Seamless API integrations with accounting software like Tally, SMS/WhatsApp gateways, payment terminals, and e-commerce platforms.",
    highlights: ["Tally Sync", "WhatsApp Notifications", "Payment Gateways"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    href: "/contact-us?service=integrations",
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
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={item.href}
                className="group block bg-white rounded-[25px] p-[18px] transition-all duration-300 flex flex-col h-full hover:shadow-sm"
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
                <div className="flex flex-col flex-grow justify-between px-1 pb-1">
                  <div>
                    <h3 className="text-[20px] font-medium leading-snug tracking-tight text-stone-900 mb-2 font-[var(--font-dm-sans)] group-hover:text-[#c05803] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[15px] sm:text-[16px] text-stone-500 font-normal leading-relaxed font-[var(--font-inter)]">
                      {item.description}
                    </p>
                  </div>

                  {/* Highlights Tags */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-stone-100">
                      {item.highlights.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[12px] font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full font-[var(--font-dm-sans)] group-hover:bg-[#FAF2E4] group-hover:text-[#A44B03] transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
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

