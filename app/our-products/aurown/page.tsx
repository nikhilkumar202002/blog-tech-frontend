import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";

export default function AurownPage() {
  return (
    <main className="w-full">
      <ProductBanner
        bgImage="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=80"
        titlePrefix="Meet "
        titleHighlight="Aurown."
        subtitle="Business Monitoring App"
        description="Stay connected to your business with mobile access to sales, stock, purchases, customers, schemes and business insights."
        buttonText="Book Aurown Demo"
        buttonLink="/contact-us?product=aurown"
      />
    </main>
  );
}
