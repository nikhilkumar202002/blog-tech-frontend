import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";
import AurixIntro from "@/app/components/sections/AurixIntro";
import AurixFeatures from "@/app/components/sections/AurixFeatures";

export default function AurixPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/aurix/product-aurix.webp"
        titlePrefix="Meet "
        titleHighlight="AURIX."
        subtitle="Built for the way jewellery businesses work."
        description="A comprehensive jewellery management solution designed to bring sales, inventory, billing, customers, accounts, schemes and business reporting together in one organized system. AURIX helps jewellery businesses simplify everyday operations, improve visibility and maintain better control over their business."
        buttonText="Book an AURIX Demo"
        buttonLink="/contact-us?product=aurix"
      />
      <AurixIntro />
      <AurixFeatures />
    </main>
  );
}

