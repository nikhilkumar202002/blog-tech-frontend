import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";

export default function SchemeAppPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/scheme-app.jpg"
        titlePrefix="Experience "
        titleHighlight="Scheme Mobile App."
        subtitle="Customer Scheme Management"
        description="Give customers a convenient way to view their jewellery schemes, make installment payments and track their scheme progress."
        buttonText="Book Scheme App Demo"
        buttonLink="/contact-us?product=scheme-app"
      />
    </main>
  );
}
