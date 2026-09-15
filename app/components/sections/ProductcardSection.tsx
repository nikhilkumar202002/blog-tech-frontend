"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  ctaText: string;
  image: string;
}

const PRODUCTS: ProductItem[] = [
  {
    id: "aurix",
    title: "AURIX",
    subtitle: "Jewellery Management Software",
    tag: "Our Product",
    description:
      "A comprehensive solution for managing the everyday operations of a jewellery business—from sales and billing to inventory, customers, accounting and reporting.",
    ctaText: "Explore AURIX",
    image: "/products/aurix.jpg",
  },
  {
    id: "employee-payroll",
    title: "Employee & Payroll",
    subtitle: "People Management System",
    tag: "People Management",
    description:
      "Manage employee information, attendance, leave, payroll, salary records and employee documentation from one centralized system.",
    ctaText: "Explore Employee & Payroll",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "jewel-connect",
    title: "Jewel Connect",
    subtitle: "Digital Jewellery Information Platform",
    tag: "Digital Platform",
    description:
      "Connect customers and showroom teams with jewellery designs, product information, barcode details and stock availability.",
    ctaText: "Explore Jewel Connect",
    image: "/products/jewel.jpg",
  },
  {
    id: "scheme-app",
    title: "Scheme Mobile App",
    subtitle: "Customer Scheme Management",
    tag: "Customer Scheme",
    description:
      "Give customers a convenient way to view their jewellery schemes, make installment payments and track their scheme progress.",
    ctaText: "Explore Scheme Mobile App",
    image: "/products/scheme-app.jpg",
  },
  {
    id: "aurown",
    title: "Aurown",
    subtitle: "Business Monitoring App",
    tag: "Business Monitoring",
    description:
      "Stay connected to your business with mobile access to sales, stock, purchases, customers, schemes and business insights.",
    ctaText: "Explore Aurown",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80",
  },
];

export interface ProductcardSectionProps {
  className?: string;
}

const ProductcardSection: React.FC<ProductcardSectionProps> = ({ className = "" }) => {
  return (
    <section className={`w-full py-16 sm:py-24 md:py-32 bg-[#f8f8f8] ${className}`} id="products">
      <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-20">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#A44B03] font-[var(--font-inter)] mb-3 block">
            Our Software Products
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.12]">
            Everything you need to{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic text-[#A44B03] font-normal"
            >
              manage and grow your business.
            </span>
          </h2>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              id={product.id}
              className="group relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-100 min-h-[460px] sm:min-h-[500px] flex flex-col justify-end shadow-sm hover:shadow-2xl transition-all duration-500 border border-stone-200/80"
            >
              {/* Product Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              </div>

              {/* Bottom Amber Drawer Panel */}
              <div className="relative z-10 w-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-y-[calc(100%-125px)] group-hover:translate-y-0">
                
                {/* Tab Tag Badge */}
                <div className="inline-flex items-center px-4 py-1.5 rounded-t-2xl bg-[#A44B03] text-white text-xs font-semibold tracking-wide border-t border-x border-white/20 shadow-md">
                  {product.tag}
                </div>

                {/* Main Amber Drawer Box */}
                <div className="bg-[#A44B03] text-white p-6 sm:p-7 rounded-tr-[28px] shadow-2xl flex flex-col justify-between border-t border-white/10 min-h-[250px] sm:min-h-[270px]">
                  <div>
                    {/* Product Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-[var(--font-dm-sans)] mb-1 leading-tight">
                      {product.title}
                    </h3>

                    {/* Subtitle */}
                    <h4 className="text-sm sm:text-base font-medium text-white/95 font-[var(--font-dm-sans)] mb-3">
                      {product.subtitle}
                    </h4>

                    {/* Description (Revealed on Hover) */}
                    <p className="text-xs sm:text-sm text-white/90 font-[var(--font-dm-sans)] font-normal leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 max-w-xl">
                      {product.description}
                    </p>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/15">
                    <Link
                      href={`/our-products/${product.id}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors group/link"
                    >
                      <span>{product.ctaText}</span>
                      <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>

                    {/* White Circle Arrow Button */}
                    <Link
                      href={`/our-products/${product.id}`}
                      aria-label={`Explore ${product.title}`}
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-[#A44B03] shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 flex-shrink-0"
                    >
                      <FiArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductcardSection;
