import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";
import SchemeFeatures from "@/app/components/sections/SchemeFeatures";

export default function SchemeAppPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/scheme-app/scheme-app.webp"
        mobileBgImage="/products/scheme-app/scheme-app-mobile.webp"
        titlePrefix={"Empower Your Customers\nwith "}
        titleHighlight="Digital Scheme Management"
        description="A mobile app customized with your branding that allows customers to manage their jewellery schemes, make installment payments, and track their progress conveniently from anywhere."
        buttonText="Get Your Custom App"
        buttonLink="/contact-us?product=scheme-app"
      />
      <SchemeFeatures />
    </main>
  );
}
