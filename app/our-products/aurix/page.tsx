import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";
import AurixUIShowcase from "@/app/components/sections/AurixUIShowcase";
import AurixFeatures from "@/app/components/sections/AurixFeatures";

export default function AurixPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/aurix/product-aurix.webp"
        mobileBgImage="/products/aurix/aurx-mobile-banner.webp"
        titlePrefix={"Total Control.\nOne "}
        titleHighlight="Jewellery Business."
        subtitle="Your Business. At Your Fingertips."
        description="AURIX is a comprehensive jewellery management solution built to streamline day-to-day operations, from inventory and billing to customer management, accounting, and business reporting."
        buttonText="Call Now"
        buttonLink="tel:7994455922"
      />
      <AurixUIShowcase />
      <AurixFeatures />
    </main>
  );
}

