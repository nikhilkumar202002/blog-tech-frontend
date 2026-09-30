import React from "react";
import ProductBanner from "@/app/components/common/ProductBanner";

const StockMatehero = () => (
  <ProductBanner
    bgImage="/products/stockmate/stock-mate-banner.webp"
    titlePrefix="One System."
    titleHighlight="Multiple Branches."
    titleSuffix=" Complete Stock Control."
    description="Manage every item, track stock across every branch, and stay in control of receipts, issues, transfers, adjustments, and availability — all from one centralized platform."
    buttonText="Explore Features"
    buttonLink="#features"
  />
);

export default StockMatehero;
