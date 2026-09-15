import React from "react";
import ProductpageBanner from "../components/sections/ProductpageBanner";
import Service from "../components/sections/Service";
import OurServices from "../components/sections/OurServices";
import Faq from "../components/sections/Faq";

export default function OurProductsPage() {
  return (
    <main className="w-full">
      <ProductpageBanner />
      <div id="products">
        <Service />
      </div>
      <OurServices />
      <Faq />
    </main>
  );
}
