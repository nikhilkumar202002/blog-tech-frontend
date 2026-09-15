import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";

export default function AurixPage() {
  return (
    <main className="w-full">
      <ProductBanner
        bgImage="/products/aurix/product-aurix.webp"
        titlePrefix="Meet "
        titleHighlight="AURIX."
        subtitle="Built for the way jewellery businesses work."
        description="A comprehensive jewellery management solution designed to bring sales, inventory, billing, customers, accounts, schemes and business reporting together in one organized system. AURIX helps jewellery businesses simplify everyday operations, improve visibility and maintain better control over their business."
        buttonText="Book an AURIX Demo"
        buttonLink="/contact-us?product=aurix"
      />
    </main>
  );
}
