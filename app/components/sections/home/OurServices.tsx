"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import OurServiceMobile from "./OurServicesMobile";
import { getServices } from "@/app/utils/service";
import "@/app/components/styles/Section.css";

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  tag?: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface ApiServiceItem {
  id: number | string;
  name: string;
  slug: string;
  short_description?: string | null;
  description?: string | null;
  featured_image?: string | null;
  featured_image_url?: string | null;
  sort_order?: number;
}

const OurServices: React.FC = () => {
  const [items, setItems] = useState<ServiceDetail[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchServices = async () => {
      try {
        const res = await getServices();
        const data: ApiServiceItem[] = Array.isArray(res?.data) ? res.data : [];

        if (isMounted && data.length > 0) {
          const sorted = [...data].sort(
            (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
          );
          const mapped: ServiceDetail[] = sorted.map((item) => ({
            id: item.slug || String(item.id),
            title: item.name,
            subtitle: "",
            description: item.short_description || item.description || "",
            imageUrl:
              item.featured_image_url ||
              item.featured_image ||
              "/images/maintance.webp",
            link: `/our-services#${item.slug}`,
          }));
          setItems(mapped);
          setActiveId(mapped[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch services:", err);
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
    <section className="our-services-section relative z-10 w-full pt-[80px] pb-0 md:pt-[150px] md:pb-0 bg-[#faf9f6] block" id="our-services">
      <div className="site-container w-full">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center mb-10 md:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.15] max-w-3xl">
            Comprehensive{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic text-[#A44B03]"
            >
              Services
            </span>{" "}
            Tailored For You
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-[var(--font-dm-sans)] max-w-xl">
            Empowering jewellery businesses with end-to-end software solutions and dedicated support.
          </p>
        </motion.div>

        {loading ? (
          <div className="hidden md:flex flex-row h-[500px] lg:h-[560px] w-full gap-4 animate-pulse">
            <div className="flex-[3.2] rounded-[32px] bg-stone-200 h-full" />
            <div className="flex-[1] rounded-[32px] bg-stone-200 h-full" />
            <div className="flex-[1] rounded-[32px] bg-stone-200 h-full" />
            <div className="flex-[1] rounded-[32px] bg-stone-200 h-full" />
          </div>
        ) : (
          <>
            {/* Mobile View: Separate Mobile Card Carousel */}
            <OurServiceMobile services={items} />

            {/* Desktop View: Interactive Accordion (md and above) */}
            <div className="hidden md:flex flex-row h-[500px] lg:h-[560px] w-full gap-4">
              {items.map((item, idx) => {
                const isActive = activeId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    onMouseEnter={() => setActiveId(item.id)}
                    onClick={() => setActiveId(item.id)}
                    className={`relative group rounded-[32px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-8 h-full ${
                      isActive
                        ? "flex-[3.2] bg-neutral-900 shadow-2xl ring-1 ring-black/10"
                        : "flex-[1] bg-neutral-800 hover:flex-[1.2]"
                    }`}
                  >
                    {/* Background Image */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${
                        isActive ? "scale-105" : "scale-100 group-hover:scale-105 opacity-80"
                      }`}
                    />

                    {/* Dark Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/90 via-black/40 to-black/30 ${
                        isActive ? "opacity-90" : "opacity-80 group-hover:opacity-75"
                      }`}
                    />

                    {/* Top Row: Arrow Button */}
                    <div className="relative z-10 flex items-start justify-end w-full">
                      <div
                        className={`flex-shrink-0 grid place-items-center rounded-full transition-all duration-500 ${
                          isActive
                            ? "w-11 h-11 bg-[#A44B03] text-white shadow-lg scale-100"
                            : "w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 text-white group-hover:bg-white group-hover:text-black scale-95"
                        }`}
                      >
                        {isActive ? (
                          <FiArrowRight className="w-5 h-5" />
                        ) : (
                          <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        )}
                      </div>
                    </div>

                    {/* Bottom Row: Content & CTA */}
                    <div className="relative z-10 w-full mt-auto pt-8">
                      <h3
                        className={`font-medium font-[var(--font-dm-sans)] text-white tracking-tight leading-tight transition-all duration-500 ${
                          isActive
                            ? "text-3xl lg:text-4xl mb-3"
                            : "text-xl lg:text-2xl mb-2"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p
                        className={`text-base text-neutral-200/90 font-[var(--font-dm-sans)] leading-relaxed transition-all duration-500 max-w-xl ${
                          isActive
                            ? "opacity-100 max-h-32 mb-6"
                            : "opacity-0 max-h-0 overflow-hidden mb-0"
                        }`}
                      >
                        {item.description}
                      </p>

                      <Link
                        href={item.link}
                        className={`inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-white text-neutral-900 font-semibold text-xs uppercase tracking-wider shadow-xl transition-all duration-300 hover:bg-[#A44B03] hover:text-white group/btn ${
                          isActive ? "opacity-100 translate-y-0" : "opacity-75"
                        }`}
                      >
                        <span>Explore Service</span>
                        <span className="w-6 h-6 rounded-full bg-neutral-100 group-hover/btn:bg-white/20 grid place-items-center text-neutral-900 group-hover/btn:text-white transition-colors">
                          <FiChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
};

export default OurServices;
