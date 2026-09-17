import React from "react";

const businessModules = [
  {
    id: "inventory",
    title: "Inventory & Identification",
    items: [
      {
        label: "Inventory Management:",
        text: "Maintain optimal stock levels by monitoring inventory and identifying required quantities for timely reordering to minimize excess stock and prevent shortages.",
      },
      {
        label: "Barcode & RFID Management:",
        text: "Simplify product identification and stock tracking across inventory, sales, and stock movements with barcode and RFID technology.",
      },
    ],
  },
  {
    id: "workshop",
    title: "Workshop & Production",
    items: [
      {
        label: "Smith Management:",
        text: "Manage goldsmith and job-work activities, tracking metal issued and received, assigned jobs, and work status.",
      },
      {
        label: "Repair Management:",
        text: "Track customer jewellery issued to smiths and received back after repair, maintaining complete movement records.",
      },
      {
        label: "Yield Processing:",
        text: "Monitor metal yield for jewellery purchased from customers, tracking wastage, recovery, and yield calculations to minimize discrepancies.",
      },
    ],
  },
  {
    id: "customers",
    title: "Customers & Schemes",
    items: [
      {
        label: "Customer Relationship Management:",
        text: "Maintain comprehensive customer profiles, purchase history, and transactions in one centralized hub.",
      },
      {
        label: "Scheme Management:",
        text: "Easily manage jewellery schemes and customer enrollments, tracking payment milestones and schedules.",
      },
    ],
  },
  {
    id: "finance",
    title: "Finance & Executive MIS",
    items: [
      {
        label: "Accounts & Finance:",
        text: "Manage customer accounts, payments, financial transactions, and cheque reconciliation.",
      },
      {
        label: "Reports & MIS:",
        text: "Generate comprehensive reports across sales, inventory, accounts, and overall performance for clear operational oversight.",
      },
    ],
  },
];

export default function AurixFeatures() {
  return (
    <section className="w-full py-20 sm:py-28 md:py-36 bg-white text-stone-900 flex-shrink-0">
      {/* Global CSS App Container Class */}
      <div className="site-container relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-tight">
            Comprehensive
          </h2>
          <p
            style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
            className="text-4xl sm:text-5xl md:text-6xl italic font-normal text-[#A44B03] mt-1"
          >
            Business Modules
          </p>
        </div>

        {/* 2x2 Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {businessModules.map((module) => (
            <div
              key={module.id}
              className="bg-[#f5f5f5] rounded-[28px] sm:rounded-[32px] p-8 sm:p-10 md:p-12 flex flex-col justify-start"
            >
              {/* Module Card Title with Orange/Gold Bullet */}
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight font-[var(--font-dm-sans)] mb-6 flex items-start gap-2">
                <span className="text-[#A44B03] font-bold select-none leading-none mt-0.5">•</span>
                <span>{module.title}</span>
              </h3>

              {/* Sub-items list */}
              <div className="space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-[var(--font-dm-sans)] font-normal">
                {module.items.map((item, idx) => (
                  <p key={idx}>
                    <span className="font-semibold text-stone-800 mr-1.5">
                      {item.label}
                    </span>
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
