import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";
import JewelappFeatures from "@/app/components/sections/our-products/jewel-connect/JewelappFeatures";

export default function JewelConnectPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/jewel-connect/jewel-connect.webp"
        mobileBgImage="/products/jewel-connect/jewel-connect-mobile.webp"
        titlePrefix={"Your Entire Collection\n"}
        titleHighlight="Just a Click Away"
        description="Jewel Connect is a digital platform designed to provide jewellery customers and staff with easy, convenient access to jewellery designs, product information, barcode details, and real-time stock availability."
        buttonText="Request a Demo"
        buttonLink="/contact-us?product=jewel-connect"
      />
      <JewelappFeatures />
    </main>
  );
}
