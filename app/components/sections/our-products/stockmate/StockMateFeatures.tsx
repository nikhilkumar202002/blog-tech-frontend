import React from "react";
import {
  FiAlertCircle,
  FiBarChart2,
  FiBox,
  FiClipboard,
  FiDatabase,
  FiEye,
  FiLayers,
  FiRepeat,
  FiTruck,
} from "react-icons/fi";

const FEATURE_ICONS = [
  FiLayers,
  FiBox,
  FiTruck,
  FiRepeat,
  FiClipboard,
  FiEye,
  FiAlertCircle,
  FiDatabase,
  FiBarChart2,
];

const FEATURES = [
  {
    number: "01",
    title: "Multi-Branch Inventory",
    description: "Manage and monitor stock across all your branches from one centralized system.",
  },
  {
    number: "02",
    title: "Smart Item Management",
    description: "Organize every item with categories, barcodes, units, rates, stock limits, descriptions and status details.",
  },
  {
    number: "03",
    title: "Stock Receipt & Issue",
    description: "Record incoming stock and track items issued or consumed at each branch with accurate transaction details.",
  },
  {
    number: "04",
    title: "Branch Stock Transfer",
    description: "Transfer stock between branches while maintaining stock records at both locations.",
  },
  {
    number: "05",
    title: "Stock Adjustment",
    description: "Keep system stock aligned with physical stock by recording shortages, excess, damaged or lost items, and other adjustments.",
  },
  {
    number: "06",
    title: "Real-Time Stock Visibility",
    description: "Know what is available at every branch and quickly check item availability whenever needed.",
  },
  {
    number: "07",
    title: "Low Stock Alerts",
    description: "Identify items reaching minimum stock levels and plan replenishment before shortages affect operations.",
  },
  {
    number: "08",
    title: "Stock Register",
    description: "Track the complete movement of every item—from opening stock to receipts, issues, transfers, adjustments and closing stock.",
  },
  {
    number: "09",
    title: "Powerful Reports",
    description: "Get clear insights with current stock, branch-wise stock, receipt, issue, transfer, adjustment, low-stock and valuation reports.",
  },
];

const StockMateFeatures = () => {
  return (
    <section id="features" className="w-full bg-[#FAF7F2] py-20 sm:py-24 lg:py-32">
      <div className="site-container">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <p className="mb-4 text-sm font-semibold uppercase text-[#A44B03]">
            Built for Complete Stock Control
          </p>
          <h2 className="text-3xl font-medium text-stone-900 sm:text-4xl lg:text-5xl">
            Everything You Need to Manage Your Inventory.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.number}
              className={`group flex min-h-[250px] flex-col justify-between rounded-[24px] border p-6 transition-colors duration-300 sm:p-7 ${
                index === 0
                  ? "border-[#7A3602] bg-[#7A3602] text-white hover:bg-[#8f4104]"
                  : "border-stone-200 bg-white text-stone-900 hover:border-[#A44B03] hover:bg-[#FAF2E4]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {React.createElement(FEATURE_ICONS[index], {
                  className: `h-7 w-7 ${index === 0 ? "text-[#f4c98d]" : "text-[#A44B03]"}`,
                  "aria-hidden": true,
                })}
                <span
                  className={`text-sm font-semibold ${
                    index === 0 ? "text-[#f4c98d]" : "text-[#A44B03]"
                  }`}
                >
                  {feature.number}
                </span>
              </div>
              <div className="mt-10">
                <h3 className={`text-xl font-medium transition-colors duration-300 sm:text-2xl ${index === 0 ? "" : "group-hover:text-[#A44B03]"}`}>
                  {feature.title}
                </h3>
                <p
                  className={`mt-3 max-w-xl text-sm leading-relaxed sm:text-base ${
                    index === 0 ? "text-white/80" : "text-stone-600"
                  }`}
                >
                  {feature.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StockMateFeatures;
