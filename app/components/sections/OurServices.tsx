"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight, FiChevronRight } from "react-icons/fi";
import "../styles/Section.css";

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

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "jewellery-erp",
    title: "Jewellery ERP Solutions",
    subtitle: "Enterprise Operations",
    badge: "ERP Software",
    tag: "JewelleryTech",
    description:
      "Industry-focused ERP software designed around the unique needs of jewellery businesses to streamline inventory, manufacturing, and POS operations.",
    imageUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    link: "/contact-us",
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    subtitle: "24/7 Technical Care",
    badge: "Support Services",
    tag: "System Care",
    description:
      "Continuous technical support, security updates, and software maintenance to keep your business systems reliable and operating smoothly.",
    imageUrl:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop",
    link: "/contact-us",
  },
  {
    id: "custom-software",
    title: "Custom Software Solutions",
    subtitle: "Tailored Development",
    badge: "Custom Dev",
    tag: "Workflows",
    description:
      "Tailored features, custom modules, and specialized workflows engineered specifically to match your company's operational requirements.",
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
    link: "/contact-us",
  },
  {
    id: "data-management",
    title: "Data & System Management",
    subtitle: "Cloud Infrastructure",
    badge: "Data Systems",
    tag: "Security",
    description:
      "Secure database architecture, seamless data migration, and high-performance system optimization for enterprise reliability.",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
    link: "/contact-us",
  },
  {
    id: "business-reporting",
    title: "Business Analytics & BI",
    subtitle: "Intelligence & Growth",
    badge: "BI Analytics",
    tag: "Insights",
    description:
      "Real-time analytics, inventory forecasting, and comprehensive sales reports to empower smart decision-making in the jewellery industry.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    link: "/contact-us",
  },
];

const OurServices: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("jewellery-erp");
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
    isMoved: boolean;
  } | null>(null);

  const handleMobileScroll = () => {
    const el = carouselRef.current;
    if (!el || isDragging) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const index = Math.round(el.scrollLeft / (cardWidth + 16));
    setMobileActiveIndex(Math.max(0, Math.min(SERVICES_DATA.length - 1, index)));
  };

  const scrollToMobileSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    el.scrollTo({
      left: index * (cardWidth + 16),
      behavior: "smooth",
    });
    setMobileActiveIndex(index);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("a, button")) return;

    dragStartRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      scrollLeft: carouselRef.current?.scrollLeft || 0,
      isMoved: false,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start || !carouselRef.current) return;

    const diffX = e.clientX - start.startX;
    if (Math.abs(diffX) > 4) {
      start.isMoved = true;
      carouselRef.current.scrollLeft = start.scrollLeft - diffX;
    }
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
    setIsDragging(false);
  };

  return (
    <section className="our-services-section relative z-10 w-full pt-[80px] pb-0 md:pt-[150px] md:pb-0 bg-[#faf9f6] block" id="our-services">
      <div className="site-container w-full">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 md:mb-14">
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
        </div>

        {/* Card Container: Mobile Swipe Carousel (< md) vs Desktop Accordion (>= md) */}
        <div
          ref={carouselRef}
          onScroll={handleMobileScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className={`flex overflow-x-auto gap-4 w-full select-none touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:overflow-visible md:flex-row md:h-[500px] lg:h-[560px] ${
            isDragging ? "snap-none cursor-grabbing" : "snap-x snap-mandatory cursor-grab md:cursor-default"
          }`}
        >
          {SERVICES_DATA.map((item, idx) => {
            const isActive = activeId === item.id;

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveId(item.id)}
                onClick={() => {
                  if (dragStartRef.current?.isMoved) return;
                  setActiveId(item.id);
                  scrollToMobileSlide(idx);
                }}
                className={`relative group rounded-[28px] sm:rounded-[32px] overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between p-6 sm:p-8 shrink-0 snap-center w-[85vw] sm:w-[340px] h-[440px] md:w-auto md:h-full ${
                  isActive
                    ? "md:flex-[3.2] bg-neutral-900 shadow-none md:shadow-2xl md:ring-1 md:ring-black/10"
                    : "md:flex-[1] bg-neutral-800 hover:md:flex-[1.2]"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                  className={`object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-105" : "scale-100 group-hover:scale-105 opacity-80"
                  }`}
                  priority={idx === 0}
                />

                {/* Dark Gradient Overlay */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 bg-gradient-to-t from-black/90 via-black/40 to-black/30 ${
                    isActive ? "opacity-90" : "opacity-85 md:opacity-80 group-hover:opacity-75"
                  }`}
                />

                {/* Top Row: Arrow Button */}
                <div className="relative z-10 flex items-start justify-end w-full">
                  <div
                    className={`flex-shrink-0 grid place-items-center rounded-full transition-all duration-500 ${
                      isActive
                        ? "w-11 h-11 bg-[#A44B03] text-white shadow-none md:shadow-lg scale-100"
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
                        ? "text-2xl sm:text-3xl lg:text-4xl mb-3"
                        : "text-2xl sm:text-2xl md:text-xl lg:text-2xl mb-3 md:mb-2"
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`text-sm sm:text-base text-neutral-200/90 font-[var(--font-dm-sans)] leading-relaxed transition-all duration-500 max-w-xl ${
                      isActive
                        ? "opacity-100 max-h-32 mb-6"
                        : "opacity-100 md:opacity-0 max-h-32 md:max-h-0 overflow-hidden mb-5 md:mb-0"
                    }`}
                  >
                    {item.description}
                  </p>

                  <Link
                    href={item.link}
                    className={`inline-flex items-center justify-between gap-3 w-full sm:w-auto px-5 py-3 rounded-full bg-white text-neutral-900 font-semibold text-xs uppercase tracking-wider shadow-none md:shadow-xl transition-all duration-300 hover:bg-[#A44B03] hover:text-white group/btn ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-100 md:opacity-75"
                    }`}
                  >
                    <span>Explore Service</span>
                    <span className="w-6 h-6 rounded-full bg-neutral-100 group-hover/btn:bg-white/20 grid place-items-center text-neutral-900 group-hover/btn:text-white transition-colors">
                      <FiChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
          {SERVICES_DATA.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => scrollToMobileSlide(idx)}
              aria-label={`Go to service slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                mobileActiveIndex === idx
                  ? "w-6 bg-[#A44B03]"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurServices;
