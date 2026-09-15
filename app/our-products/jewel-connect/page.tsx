import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";

export default function JewelConnectPage() {
  return (
    <main className="w-full">
      <ProductBanner
        bgImage="/products/jewel.jpg"
        titlePrefix="Discover "
        titleHighlight="Jewel Connect."
        subtitle="Digital Jewellery Information Platform"
        description="Connect customers and showroom teams with jewellery designs, product information, barcode details and stock availability."
        buttonText="Book Jewel Connect Demo"
        buttonLink="/contact-us?product=jewel-connect"
      />
    </main>
  );
}
