"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const SERVICE_CARDS = [
  { id: "erp", label: "ERP" },
  { id: "support", label: "Support" },
  { id: "upgrades", label: "Upgrades" },
  { id: "data", label: "Data" },
  { id: "digital", label: "Digital" },
];

export interface ServiceEcosystemProps {
  className?: string;
}

export default function ServiceEcosystem({ className = "" }: ServiceEcosystemProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const customerRef = useRef<HTMLDivElement>(null);
  const blogtecRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [leftLineD, setLeftLineD] = useState<string>("");
  const [rightLines, setRightLines] = useState<{ id: string; d: string }[]>([]);

  useEffect(() => {
    const updatePaths = () => {
      if (!containerRef.current || !customerRef.current || !blogtecRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const customerRect = customerRef.current.getBoundingClientRect();
      const blogtecRect = blogtecRef.current.getBoundingClientRect();

      // Left Line: Customers right edge -> Blogtec left edge
      const custX = customerRect.right - containerRect.left;
      const custY = customerRect.top + customerRect.height / 2 - containerRect.top;
      const blogtecLeftX = blogtecRect.left - containerRect.left;
      const blogtecY = blogtecRect.top + blogtecRect.height / 2 - containerRect.top;

      setLeftLineD(`M ${custX} ${custY} L ${blogtecLeftX} ${blogtecY}`);

      // Right Lines: Blogtec right edge -> Card i left edge
      const startX = blogtecRect.right - containerRect.left;
      const startY = blogtecY;

      const computed = SERVICE_CARDS.map((card, idx) => {
        const cardEl = cardRefs.current[idx];
        if (!cardEl) return { id: card.id, d: "" };

        const cardRect = cardEl.getBoundingClientRect();
        const cardX = cardRect.left - containerRect.left;
        const cardY = cardRect.top + cardRect.height / 2 - containerRect.top;

        const controlX = startX + (cardX - startX) * 0.5;

        return {
          id: card.id,
          d: `M ${startX} ${startY} C ${controlX} ${startY}, ${controlX} ${cardY}, ${cardX} ${cardY}`,
        };
      });

      setRightLines(computed);
    };

    updatePaths();
    const timer = setTimeout(updatePaths, 150);
    window.addEventListener("resize", updatePaths);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePaths);
    };
  }, []);

  return (
    <section
      className={`w-full py-16 sm:py-24 lg:py-32 bg-white text-stone-900 overflow-hidden ${className}`}
    >
      <div className="site-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg lg:text-xl font-normal capitalize tracking-[0] text-stone-400 mb-[6px] font-[var(--font-dm-sans)]"
          >
            One Technology Partner
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ letterSpacing: "-3px" }}
            className="text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-900 leading-[1.18] font-[var(--font-dm-sans)]"
          >
            From everyday operations
            <br />
            to{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#B65A00]"
            >
              digital experiences.
            </span>
          </motion.h2>
        </div>

        {/* Ecosystem Diagram Container */}
        <div
          ref={containerRef}
          className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 max-w-6xl mx-auto min-h-[454px]"
        >
          {/* Dynamic SVG Overlay spanning exact container width/height */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" style={{ overflow: "visible" }}>
              {/* Left Connector: Customers -> Blogtec */}
              {leftLineD && (
                <motion.path
                  d={leftLineD}
                  fill="none"
                  stroke="#B65A00"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeOpacity="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}

              {/* Right Connectors: Blogtec Center -> 5 Cards */}
              {rightLines.map((line, idx) => {
                if (!line.d) return null;
                const isHovered = hoveredCardId === line.id;
                return (
                  <motion.path
                    key={line.id}
                    d={line.d}
                    fill="none"
                    stroke="#B65A00"
                    strokeWidth={isHovered ? "2.5" : "1.5"}
                    strokeDasharray="4 4"
                    strokeOpacity={isHovered ? 1 : hoveredCardId ? 0.25 : 0.45}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1, ease: "easeInOut" }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Left Node: Customers Circle */}
          <motion.div
            ref={customerRef}
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center justify-center w-[140px] h-[140px] rounded-full bg-[#B65A00] shadow-lg shadow-[#B65A00]/20 flex-shrink-0 cursor-default"
          >
            {/* Inline SVG Outline Users Icon */}
            <svg
              className="w-9 h-9 text-white mb-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
              />
            </svg>
            <span className="text-white text-base font-medium font-[var(--font-dm-sans)]">
              Customers
            </span>
          </motion.div>

          {/* Mobile Vertical Dotted Line 1 */}
          <div className="lg:hidden w-[1.5px] h-10 border-r-2 border-dashed border-[#B65A00]/50" />

          {/* Center Node: Blogtec Circle */}
          <motion.div
            ref={blogtecRef}
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex items-center justify-center w-[220px] h-[220px] sm:w-[230px] sm:h-[230px] rounded-full bg-[#F7F7F7] border border-[#EEEEEE] shadow-sm flex-shrink-0 cursor-default p-6 text-center"
          >
            <div className="relative w-[150px] h-[60px]">
              <Image
                src="/main-logo-320.png"
                alt="Blogtec Software"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Mobile Vertical Dotted Line 2 */}
          <div className="lg:hidden w-[1.5px] h-10 border-r-2 border-dashed border-[#B65A00]/50" />

          {/* Right Stack: 5 Service Cards */}
          <div className="relative z-10 flex flex-col gap-4 w-full sm:w-auto items-center lg:items-end">
            {SERVICE_CARDS.map((card, idx) => {
              const isHovered = hoveredCardId === card.id;
              return (
                <motion.div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  onMouseEnter={() => setHoveredCardId(card.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`w-[250px] h-[78px] rounded-[16px] bg-[#F8F8F8] border border-[#EEEEEE] flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isHovered
                      ? "-translate-y-1 shadow-md shadow-stone-200/80 border-[#B65A00]/40"
                      : "hover:-translate-y-1 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`text-[24px] font-medium font-[var(--font-dm-sans)] transition-colors duration-300 ${
                      isHovered ? "text-[#B65A00]" : "text-stone-900"
                    }`}
                  >
                    {card.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
