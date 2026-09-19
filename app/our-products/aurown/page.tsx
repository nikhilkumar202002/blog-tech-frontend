import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";
import AurownVisibility from "@/app/components/sections/AurownVisibility";
import AurownFeatures from "@/app/components/sections/AurownFeatures";
import AurownAccess from "@/app/components/sections/AurownAccess";

export default function AurownPage() {
  return (
    <main className="w-full flex flex-col flex-shrink-0">
      <ProductBanner
        bgImage="/products/aurown/aurown_hero_banner.webp"
        mobileBgImage="/products/aurown/aurown_hero_banner_mobile.webp"
        titlePrefix={"Your Jewellery Business.\nAt Your "}
        titleHighlight="Fingertips."
        subtitle=""
        description="Aurown gives jewellery business owners a convenient way to monitor their business from anywhere. Track sales, stock, purchases, customers, schemes and business reports through one connected mobile experience."
        buttonText="Request a Demo"
        buttonLink="/contact-us?product=aurown"
      />
      <AurownVisibility />
      <AurownFeatures />
      <AurownAccess />
    </main>
  );
}


