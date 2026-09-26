"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { ServiceDetail } from "./OurServices";

interface OurServiceMobileProps {
  services: ServiceDetail[];
}

const OurServiceMobile: React.FC<OurServiceMobileProps> = ({ services }) => {
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
    const gap = 16;
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setMobileActiveIndex(Math.max(0, Math.min(services.length - 1, index)));
  };

  const scrollToMobileSlide = (index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth || 280;
    const gap = 16;
    el.scrollTo({ left: index * (cardWidth + gap), behavior: "smooth" });
    setMobileActiveIndex(index);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
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
    if (!start || !carouselRef.current || start.pointerId !== e.pointerId) return;
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
    <div className="relative w-full block md:hidden">
      {/* Left Overlay Navigation Arrow */}
      <button
        onClick={() => scrollToMobileSlide(Math.max(0, mobileActiveIndex - 1))}
        disabled={mobileActiveIndex === 0}
        aria-label="Previous service"
        className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
          mobileActiveIndex === 0
            ? "opacity-20 cursor-not-allowed"
            : "opacity-90 hover:opacity-100 hover:bg-[#A44B03] hover:border-[#A44B03] active:scale-95"
        }`}
      >
        <FiChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Overlay Navigation Arrow */}
      <button
        onClick={() => scrollToMobileSlide(Math.min(services.length - 1, mobileActiveIndex + 1))}
        disabled={mobileActiveIndex === services.length - 1}
        aria-label="Next service"
        className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all ${
          mobileActiveIndex === services.length - 1
            ? "opacity-20 cursor-not-allowed"
            : "opacity-90 hover:opacity-100 hover:bg-[#A44B03] hover:border-[#A44B03] active:scale-95"
        }`}
      >
        <FiChevronRight className="w-5 h-5" />
      </button>

      {/* Mobile Card Carousel Container */}
      <div
        ref={carouselRef}
        onScroll={handleMobileScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        className={`flex overflow-x-auto overflow-y-hidden gap-4 w-full py-2 px-2 touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? "snap-none cursor-grabbing select-none" : "snap-x snap-mandatory cursor-grab"
        }`}
      >
        {services.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => {
              if (dragStartRef.current?.isMoved) return;
              scrollToMobileSlide(idx);
            }}
            className="relative group rounded-[24px] overflow-hidden cursor-pointer flex flex-col justify-between p-6 shrink-0 snap-center w-[85vw] max-w-[320px] min-h-[380px] bg-neutral-900"
          >
            {/* Background Image */}
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 85vw, 320px"
              className="object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-105"
              priority={idx === 0}
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30 opacity-90 pointer-events-none" />

            {/* Bottom Content & Action */}
            <div className="relative z-10 w-full mt-auto pt-4">
              <h3 className="font-medium font-[var(--font-dm-sans)] text-white tracking-tight leading-tight text-xl mb-2">
                {item.title}
              </h3>

              <p className="text-xs text-neutral-200/90 font-[var(--font-dm-sans)] leading-relaxed mb-4">
                {item.description}
              </p>

              <Link
                href={item.link}
                className="inline-flex items-center justify-between gap-3 w-full px-5 py-2.5 rounded-full bg-white text-neutral-900 font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:bg-[#A44B03] hover:text-white group/btn"
              >
                <span>Explore Service</span>
                <span className="w-6 h-6 rounded-full bg-neutral-100 group-hover/btn:bg-white/20 grid place-items-center text-neutral-900 group-hover/btn:text-white transition-colors">
                  <FiChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurServiceMobile;