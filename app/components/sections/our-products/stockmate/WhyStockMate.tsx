"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiBarChart2, FiCheckCircle, FiEye, FiFileText, FiSearch, FiZap } from "react-icons/fi";

const ADVANTAGES = [
  { title: "Complete Branch Visibility", description: "Know the current stock available at every branch.", icon: FiEye },
  { title: "Better Stock Control", description: "Track every receipt, issue, transfer and adjustment.", icon: FiCheckCircle },
  { title: "Less Manual Work", description: "Replace manual registers and spreadsheets with organized digital stock management.", icon: FiFileText },
  { title: "Faster Stock Checking", description: "Find item availability quickly across branches.", icon: FiSearch },
  { title: "Better Inventory Planning", description: "Monitor minimum stock levels and plan purchases efficiently.", icon: FiZap },
  { title: "Accurate Reports", description: "Get clear and reliable stock information whenever you need it.", icon: FiBarChart2 },
];

const WhyStockMate = () => {
  return (
    <section className="w-full bg-white py-20 sm:py-24 lg:py-32">
      <div className="site-container grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-stone-100"
        >
          <Image
            src="/products/stockmate/stock-mate-why.webp"
            alt="StockMate branch inventory management"
            width={1200}
            height={900}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 text-sm font-semibold uppercase text-[#A44B03]">
            The StockMate Advantage
          </p>
          <h2 className="max-w-xl text-3xl font-medium leading-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Better Visibility. Better Control. Less Manual Work.
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {ADVANTAGES.map(({ title, description, icon: Icon }) => (
              <div key={title} className="group flex gap-3">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-[#FAF2E4] text-[#A44B03] transition-colors duration-300 group-hover:bg-[#7A3602] group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-medium text-stone-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyStockMate;
