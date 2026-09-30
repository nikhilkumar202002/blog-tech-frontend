import React from "react";
import StockMatehero from "@/app/components/sections/our-products/stockmate/StockMatehero";
import StockMateIntro from "@/app/components/sections/our-products/stockmate/StockMateIntro";
import StockMateFeatures from "@/app/components/sections/our-products/stockmate/StockMateFeatures";
import WhyStockMate from "@/app/components/sections/our-products/stockmate/WhyStockMate";
import StockmateCta from "@/app/components/sections/our-products/stockmate/StockmateCta";

export default function StockMatePage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <StockMatehero />
      <StockMateIntro />
      <StockMateFeatures />
      <WhyStockMate />
      <StockmateCta />
    </main>
  );
}
