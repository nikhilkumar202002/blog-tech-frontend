"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getServices } from "@/app/utils/service";

export interface ServiceCardItem {
  id: string;
  title: string;
  description: string;
  highlights?: string[];
  image: string;
  href: string;
}

interface ApiServiceItem {
  id: number;
  name: string;
  slug: string;
  url?: string;
  short_description?: string | null;
  description?: string | null;
  features?: string[] | null;
  featured_image?: string | null;
  featured_image_url?: string | null;
  sort_order?: number;
}

const SERVICE_ROUTE_MAP: Record<string, string> = {
  "jewellery-erp-solutions": "/our-products/aurix-jewellery-erp-software",
  "maintenance-support": "/contact-us?service=support",
  "custom-software-solutions": "/contact-us?service=custom",
  "data-system-management": "/contact-us?service=data",
  "mobile-digital-solutions": "/our-products/scheme-mobile-app",
};

export interface ServicesGridProps {
  className?: string;
}

const ServicesGrid: React.FC<ServicesGridProps> = ({ className = "" }) => {
  const [services, setServices] = useState<ServiceCardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const res = await getServices();
        const items: ApiServiceItem[] = Array.isArray(res?.data) ? res.data : [];

        if (isMounted) {
          const sorted = [...items].sort(
            (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
          );
          const mapped: ServiceCardItem[] = sorted.map((item) => ({
            id: item.slug || String(item.id),
            title: item.name,
            description: item.short_description || item.description || "",
            highlights: Array.isArray(item.features) ? item.features : [],
            image:
              item.featured_image_url ||
              item.featured_image ||
              "/images/mobile-laptop-mockup-3.webp",
            href: SERVICE_ROUTE_MAP[item.slug] || item.url || "/contact-us",
          }));
          setServices(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      className={`w-full py-[80px] lg:py-[150px] bg-[#f8f8f8] text-stone-900 ${className}`}
    >
      <div className="site-container">
        
        {/* 3-Column Cards Grid with 20px gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[25px] p-[18px] flex flex-col h-full animate-pulse"
                >
                  <div className="w-full aspect-[4/3] rounded-[18px] bg-stone-200 mb-4" />
                  <div className="px-1 pb-1 space-y-3">
                    <div className="h-6 w-2/3 bg-stone-200 rounded-md" />
                    <div className="space-y-2">
                      <div className="h-4 w-full bg-stone-100 rounded-md" />
                      <div className="h-4 w-5/6 bg-stone-100 rounded-md" />
                    </div>
                    <div className="flex gap-1.5 pt-3 border-t border-stone-100">
                      <div className="h-6 w-24 bg-stone-100 rounded-full" />
                      <div className="h-6 w-28 bg-stone-100 rounded-full" />
                    </div>
                  </div>
                </div>
              ))
            : services.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={item.href}
                id={item.id}
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
                    <h3 className="text-[20px] font-medium leading-snug tracking-tight text-stone-900 mb-2 font-[var(--font-dm-sans)] group-hover:text-[#A44B03] transition-colors duration-300">
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

