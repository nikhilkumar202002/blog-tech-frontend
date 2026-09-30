"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const StockMateIntro = () => {
  return (
    <section id="stockmate-intro" className="w-full bg-white py-20 sm:py-24 lg:py-32">
      <div className="site-container grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[28px] bg-stone-100"
        >
          <Image
            src="/products/stockmate/stock-mate-intro.webp"
            alt="StockMate centralized inventory management dashboard"
            width={1200}
            height={900}
            className="h-auto w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#A44B03]">
            Centralised Inventory Management
          </p>
          <h2 className="text-3xl font-medium leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl">
            Every Item. Every Branch. Always in Control.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-stone-600 sm:text-lg">
            <p>
              STOCKMATE brings your entire inventory together, giving you better visibility,
              accurate records, and simpler stock management across your business.
            </p>
            <p>
              Manage stock movements, monitor item availability, maintain organized records and
              access important inventory information through one centralized system.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StockMateIntro;
