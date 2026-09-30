import React from "react";
import Button from "@/app/components/common/Button";

const StockmateCta = () => {
  return (
    <section className="w-full bg-[#FAF7F2] py-20 text-stone-900 sm:py-24 lg:py-28">
      <div className="site-container flex flex-col items-center text-center">
        <p className="mb-4 text-sm font-semibold uppercase text-[#A44B03]">
          STOCKMATE · SMART INVENTORY MANAGEMENT
        </p>
        <h2 className="max-w-4xl text-3xl font-medium  sm:text-4xl lg:text-6xl">
          Every Item. Every Branch. Always in Control.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-600 sm:text-lg">
          STOCKMATE brings your entire inventory together, giving you better visibility, accurate
          records and simpler stock management across your business.
        </p>
        <Button
          href="tel:7994455922"
          text="Call Now"
          pillColor="bg-[#A44B03]"
          hoverTextColor="group-hover:text-white"
          arrowColor="text-white"
          className="mt-8"
        />
      </div>
    </section>
  );
};

export default StockmateCta;
