"use client";

import React, { useState } from "react";
import { FiMaximize2 } from "react-icons/fi";

const uiScreenRows = [
  {
    id: "dashboard",
    titlePart1: "Complete ",
    titleHighlight1: "Showroom",
    titleHighlight2: "Command ",
    titlePart2: "Center",
    description:
      "Control your jewellery business from a single dashboard. Monitor live daily gold and silver rates, access master files, and review critical business reports instantly. Centralized utility controls and performance analytics provide total visibility over daily operations, allowing you to make rapid, informed business decisions.",
    image: "/UI/Aurix_dashboard.webp",
    alt: "Complete Showroom Command Center",
    imageFirst: true,
  },
  {
    id: "sales",
    titlePart1: "Seamless ",
    titleHighlight1: "Retail Billing",
    titlePart2: "& Invoicing",
    description:
      "Execute high-speed, accurate billing tailored for jewellery retail. Manage the complete sales cycle from customer selection to transaction completion. The system instantly processes barcode inputs, calculates gross weight, stone weight, and value additions (VA), while securely recording customer advance payments and generating precise invoices on a single screen.",
    image: "/UI/aurix_invoicing_billing.webp",
    alt: "Seamless Retail Billing & Invoicing",
    imageFirst: false,
  },
  {
    id: "orders",
    titlePart1: "Precision Custom",
    titleHighlight1: "Order Tracking",
    description:
      "Manage complex customer orders efficiently from initial creation to final delivery. Log advance payments, record specific requests like bespoke wedding jewellery, and establish strict delivery schedules. Real-time status tracking and dedicated order condition fields ensure accurate workshop communication and on-time customer fulfillment.",
    image: "/UI/aurix_order_tracking.webp",
    alt: "Precision Custom Order Tracking",
    imageFirst: true,
  },
];

export default function AurixUIShowcase() {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <section className="w-full py-20 sm:py-28 md:py-36 bg-white text-stone-900 flex-shrink-0 relative overflow-hidden">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#A44B03]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Global CSS Common Class */}
      <div className="site-container relative z-10">
        
        {/* Alternating Feature Rows */}
        <div className="space-y-20 sm:space-y-28 md:space-y-36">
          {uiScreenRows.map((row) => (
            <div
              key={row.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 lg:gap-16 items-center"
            >
              
              {/* IMAGE COLUMN (Real Mockup Image from Folder - No Custom Frame) */}
              <div
                className={`lg:col-span-6 xl:col-span-7 flex justify-center ${
                  row.imageFirst ? "order-1" : "order-1 lg:order-2"
                }`}
              >
                <div
                  onClick={() => setZoomedImage(row.image)}
                  className="relative w-full max-w-2xl cursor-pointer group transition-transform duration-500 hover:scale-[1.02]"
                >
                  <img
                    src={row.image}
                    alt={row.alt}
                    className="w-full h-auto object-contain max-h-[520px] drop-shadow-xl"
                  />
                </div>
              </div>

              {/* TEXT CONTENT COLUMN */}
              <div
                className={`lg:col-span-6 xl:col-span-5 ${
                  row.imageFirst ? "order-2" : "order-2 lg:order-1"
                }`}
              >
                <div className="max-w-xl">
                  
                  {/* Two-Line Styled Heading with Italic Gold Serif Highlights */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-[1.12] mb-4">
                    {row.titlePart1 && <span>{row.titlePart1}</span>}
                    {row.titleHighlight1 && (
                      <span
                        style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                        className="italic font-normal text-[#A44B03] ml-1.5"
                      >
                        {row.titleHighlight1}
                      </span>
                    )}
                    {row.titleHighlight2 && (
                      <>
                        <br />
                        <span
                          style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                          className="italic font-normal text-[#A44B03]"
                        >
                          {row.titleHighlight2}
                        </span>
                      </>
                    )}
                    {row.titlePart2 && (
                      <span>{row.titlePart2}</span>
                    )}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-sm sm:text-base md:text-lg text-stone-600 font-[var(--font-dm-sans)] font-normal leading-relaxed">
                    {row.description}
                  </p>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* High Resolution Lightbox Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-7xl w-full max-h-[92vh] overflow-auto bg-white border border-stone-200 rounded-2xl p-2 shadow-2xl">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 z-20 px-4 py-2 rounded-xl bg-stone-900/90 text-white text-xs font-semibold border border-stone-700 hover:bg-stone-900 transition-all shadow-md"
            >
              Close Preview [ESC]
            </button>
            <img
              src={zoomedImage}
              alt="Full Software UI Preview"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
