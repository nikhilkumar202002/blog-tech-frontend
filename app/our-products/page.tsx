import React from "react";
import ProductpageBanner from "../components/sections/ProductpageBanner";
import ProductcardSection from "../components/sections/ProductcardSection";
import OurServices from "../components/sections/OurServices";
import Faq from "../components/sections/Faq";

export default function OurProductsPage() {
    return (
        <main className="w-full">
            <ProductpageBanner />
            <ProductcardSection />
            <OurServices />
            <Faq />
        </main>
    );
}

