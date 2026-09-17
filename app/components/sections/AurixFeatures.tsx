"use client";

import React, { useState } from "react";
import {
  FiShoppingCart,
  FiFileText,
  FiCreditCard,
  FiBox,
  FiRadio,
  FiUserCheck,
  FiTool,
  FiTrendingUp,
  FiDollarSign,
  FiUsers,
  FiLayers,
  FiPieChart,
  FiSend,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiArrowRight,
  FiArrowUpRight,
  FiShield,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";


export interface FeatureDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
}

export interface FeatureGroup {
  id: string;
  category: string;
  description: string;
  badge: string;
  icon: React.ReactNode;
  items: FeatureDetail[];
}

const featureData: FeatureGroup[] = [
  {
    id: "sales-invoicing",
    category: "Sales & Invoicing",
    description: "Streamline counter operations, order processing, and bill generation.",
    badge: "3 Core Modules",
    icon: <FiShoppingCart className="w-5 h-5 text-[#A44B03]" />,
    items: [
      {
        id: "sales-mgmt",
        title: "Sales Management",
        description:
          "Manage jewellery sales efficiently from customer selection to transaction completion. Track sales, product details, customer purchases, sales returns, and related transactions with accuracy.",
        icon: <FiShoppingCart className="w-5 h-5" />,
        tag: "Point of Sale",
      },
      {
        id: "order-mgmt",
        title: "Order Management",
        description:
          "Efficiently manage customer orders from creation to completion, and track order details and status to ensure smooth and timely processing.",
        icon: <FiFileText className="w-5 h-5" />,
        tag: "Custom Orders",
      },
      {
        id: "billing-payments",
        title: "Billing & Payments",
        description:
          "Simplify invoicing with accurate bill generation, payment collection, and transaction tracking. Maintain complete billing records and monitor outstanding and received payments in one centralized system.",
        icon: <FiCreditCard className="w-5 h-5" />,
        tag: "GST Ready",
      },
    ],
  },
  {
    id: "inventory-tracking",
    category: "Inventory & Tracking",
    description: "Automate stock control with RFID and barcode accuracy.",
    badge: "2 Core Modules",
    icon: <FiBox className="w-5 h-5 text-[#A44B03]" />,
    items: [
      {
        id: "inventory-mgmt",
        title: "Inventory Management",
        description:
          "Maintain optimal stock levels by monitoring inventory and identifying required quantities for timely reordering. This helps minimize excess stock and prevent shortages.",
        icon: <FiBox className="w-5 h-5" />,
        tag: "Real-time Stock",
      },
      {
        id: "barcode-rfid",
        title: "Barcode & RFID Management",
        description:
          "Simplify inventory tracking and product identification efficiently across inventory, sales, and stock movements, with support for both barcode-based and RFID-enabled technology.",
        icon: <FiRadio className="w-5 h-5" />,
        tag: "RFID Enabled",
      },
    ],
  },
  {
    id: "production-processing",
    category: "Production & Processing",
    description: "End-to-end goldsmith job work, repair tracking, and yield accounting.",
    badge: "3 Core Modules",
    icon: <FiTool className="w-5 h-5 text-[#A44B03]" />,
    items: [
      {
        id: "smith-mgmt",
        title: "Smith Management",
        description:
          "Manage goldsmith and job-work activities efficiently by tracking smith details, assigned jobs, metal issued and received, and work status.",
        icon: <FiUserCheck className="w-5 h-5" />,
        tag: "Job-Work Ledger",
      },
      {
        id: "repair-mgmt",
        title: "Repair Management",
        description:
          "Manage customer jewellery repairs efficiently by tracking customer items issued to smiths and received back after repair, maintaining complete records of status and item movement.",
        icon: <FiTool className="w-5 h-5" />,
        tag: "Repair Tracking",
      },
      {
        id: "yield-processing",
        title: "Yield Processing",
        description:
          "Monitor and manage metal yield for jewellery purchased from customers. Track metal received, issued weight, finished weight, wastage, recovery, and yield calculations to ensure accurate material accounting.",
        icon: <FiTrendingUp className="w-5 h-5" />,
        tag: "Wastage & Recovery",
      },
    ],
  },
  {
    id: "customer-finance",
    category: "Customer & Financial Control",
    description: "Master financial ledger, customer relationships, and savings schemes.",
    badge: "3 Core Modules",
    icon: <FiDollarSign className="w-5 h-5 text-[#A44B03]" />,
    items: [
      {
        id: "accounts-finance",
        title: "Accounts & Finance",
        description:
          "Maintain better control over your financial operations by managing customer accounts, payments, financial transactions, and cheque reconciliation.",
        icon: <FiDollarSign className="w-5 h-5" />,
        tag: "Accounting",
      },
      {
        id: "crm",
        title: "Customer Relationship Management (CRM)",
        description:
          "Build stronger customer relationships by maintaining customer profiles, purchase history, and transactions in one place.",
        icon: <FiUsers className="w-5 h-5" />,
        tag: "Customer History",
      },
      {
        id: "scheme-mgmt",
        title: "Scheme Management",
        description:
          "Easily manage jewellery schemes and customer enrollments while tracking scheme details, payments, and related transactions.",
        icon: <FiLayers className="w-5 h-5" />,
        tag: "Savings Schemes",
      },
    ],
  },
  {
    id: "analytics-insights",
    category: "Analytics & Insights",
    description: "Comprehensive reporting for actionable business intelligence.",
    badge: "1 Core Module",
    icon: <FiPieChart className="w-5 h-5 text-[#A44B03]" />,
    items: [
      {
        id: "reports-mis",
        title: "Reports & MIS",
        description:
          "Get meaningful insights into your business with comprehensive reports and Management Information System (MIS) tools. Analyse sales, inventory, accounts, purchases, customers, and overall business performance to make informed decisions.",
        icon: <FiPieChart className="w-5 h-5" />,
        tag: "Executive MIS",
      },
    ],
  },
];

export default function AurixFeatures() {
  // Sidebar Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    showroomName: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section className="w-full py-16 sm:py-24 bg-gradient-to-b from-stone-50 via-white to-stone-50 text-stone-900 flex-shrink-0">
      <div className="site-container">

        {/* Main Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-stone-200">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 font-[var(--font-dm-sans)] leading-tight">
              Core Features &amp;{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic text-[#A44B03]"
              >
                Workflows
              </span>
            </h2>
            <p className="mt-2 text-stone-500 text-sm sm:text-base max-w-2xl">
              Organized into targeted modules to give your jewellery showroom unmatched precision, automation, and control.
            </p>
          </div>
        </div>

        {/* 2-Column Grid: Left Side Feature Cards + Right Side Sticky Sidebar Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* LEFT SIDE CONTENT: Clean Feature Cards by Category (7 or 8 Columns) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-12 sm:space-y-14">
            {featureData.map((group, index) => (
              <div
                key={group.id}
                className={`space-y-6 ${index !== featureData.length - 1 ? "pb-12 border-b border-stone-200/70" : ""
                  }`}
              >
                {/* Category Header (Clean Text Title without Badge) */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-stone-900 font-[var(--font-dm-sans)] tracking-tight">
                    {group.category}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 font-normal mt-1">
                    {group.description}
                  </p>
                </div>

                {/* Techwarelab Jobwyz Style Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-1">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 sm:p-7 rounded-[26px] bg-[#f8f9f8] hover:bg-white border border-stone-200/80 shadow-2xs hover:shadow-xl hover:shadow-stone-200/50 hover:border-[#A44B03]/40 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Card Row: Title + Icon Badge */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h4 className="text-base sm:text-lg font-semibold text-stone-900 group-hover:text-[#A44B03] transition-colors font-[var(--font-dm-sans)] leading-snug">
                            {item.title}
                          </h4>
                          <div className="w-10 h-10 rounded-2xl bg-[#A44B03]/10 text-[#A44B03] border border-[#A44B03]/15 flex items-center justify-center group-hover:bg-[#A44B03] group-hover:text-white transition-all duration-300 flex-shrink-0">
                            {item.icon}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE SIDEBAR: Sticky Lead/Demo CTA Form (5 or 4 Columns) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl border border-stone-200/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all duration-300 hover:border-[#A44B03]/40">

              {/* Subtle Ambient Glow Accent */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#A44B03]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl border border-[#A44B03]/20">
                  <HiSparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 font-[var(--font-dm-sans)]">
                    See AURIX In Action
                  </h3>
                </div>
              </div>

              <p className="text-stone-500 text-xs sm:text-sm mb-6 leading-relaxed">
                Book a personalized demo tailored for your jewellery showroom.
              </p>

              {isSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center my-4">
                  <FiCheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-stone-900 mb-1">Demo Request Received!</h4>
                  <p className="text-stone-600 text-xs mb-4">
                    Our team will contact you shortly to schedule your personalized AURIX walkthrough.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-5 py-2 rounded-xl bg-[#A44B03] text-white text-xs font-semibold hover:bg-[#8b3f02] transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="aurix-name" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="aurix-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Rajesh Verma"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="aurix-phone" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="aurix-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleFormChange}
                      placeholder="+91 79944 55922"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="aurix-showroom" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Showroom / Business Name
                    </label>
                    <input
                      type="text"
                      id="aurix-showroom"
                      name="showroomName"
                      value={formData.showroomName}
                      onChange={handleFormChange}
                      placeholder="e.g. Royal Jewellers"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="aurix-email" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="aurix-email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@showroom.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="aurix-message" className="block text-[11px] font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                      Specific Requirements (Optional)
                    </label>
                    <textarea
                      id="aurix-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your showroom size or software needs..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-xs sm:text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#A44B03] hover:bg-[#8b3f02] text-white font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-[#A44B03]/25 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing Demo Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Book Showroom Demo</span>
                        <FiSend className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Direct Reach Badge inside Sidebar */}
              <div className="mt-6 pt-5 border-t border-stone-100 flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">Or reach us directly:</span>
                <div className="flex items-center justify-between text-xs font-medium text-stone-700">
                  <a
                    href="tel:7994455922"
                    className="flex items-center gap-1.5 hover:text-[#A44B03] transition-colors"
                  >
                    <FiPhone className="w-3.5 h-3.5 text-[#A44B03]" />
                    <span>7994455922</span>
                  </a>
                  <a
                    href="mailto:blogtecsoftware@gmail.com"
                    className="flex items-center gap-1.5 hover:text-[#A44B03] transition-colors truncate max-w-[170px]"
                  >
                    <FiMail className="w-3.5 h-3.5 text-[#A44B03]" />
                    <span className="truncate">blogtecsoftware@gmail.com</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quick Trust Indicator Card */}
            <div className="bg-stone-900 text-white rounded-3xl p-6 flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl text-[#A44B03]">
                <FiShield className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-semibold font-[var(--font-dm-sans)]">Trusted Jewellery ERP</h4>
                <p className="text-xs text-stone-400 mt-0.5">Customized for retail showrooms, wholesalers, &amp; manufacturers.</p>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM CALL-TO-ACTION (CTA) SECTION */}
        <div className="mt-20 relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 lg:p-16 border border-stone-800">

          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#A44B03]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A44B03]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight font-[var(--font-dm-sans)] leading-tight text-white mb-4">
              Ready to take control of your{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic text-[#A44B03]"
              >
                jewellery business?
              </span>
            </h2>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base md:text-lg text-stone-300 font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-2xl mb-8">
              Connect with our team to see how AURIX can be tailored to your showroom&apos;s unique needs.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Primary Contact Support Button (Direct Link to Phone & Email) */}
              <a
                href="tel:7994455922"
                className="px-8 py-4 rounded-2xl bg-[#A44B03] hover:bg-[#8b3f02] text-white font-semibold text-sm sm:text-base transition-all duration-300 flex items-center gap-2.5 shadow-xl shadow-[#A44B03]/30 hover:scale-[1.02]"
              >
                <FiPhone className="w-5 h-5" />
                <span>Contact Support: 7994455922</span>
                <FiArrowRight className="w-4 h-4 ml-1" />
              </a>

              {/* Direct Email Support Button */}
              <a
                href="mailto:blogtecsoftware@gmail.com"
                className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/15 backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 hover:scale-[1.02]"
              >
                <FiMail className="w-5 h-5 text-[#A44B03]" />
                <span>Email Support</span>
              </a>
            </div>

            {/* Contact Details Footer Note */}
            <p className="text-xs text-stone-400 mt-6 flex items-center justify-center flex-wrap gap-x-4 gap-y-1">
              <span>Phone: <strong className="text-stone-200">+91 79944 55922</strong></span>
              <span className="hidden sm:inline text-stone-600">•</span>
              <span>Email: <strong className="text-stone-200">blogtecsoftware@gmail.com</strong></span>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}
