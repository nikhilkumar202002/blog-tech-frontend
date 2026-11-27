import React from "react";
import { getProducts } from "@/app/utils/product";
import ProductSingleClient from "./ProductSingleClient";

const PRODUCT_SLUGS = [
  "aurix-jewellery-erp-software",
  "auron-jewellery-business-mobile-app",
  "jewel-connect",
  "scheme-mobile-app",
  "employee-payroll-management",
  "stockmate-inventory-management",
];

export async function generateStaticParams() {
  try {
    const res = await getProducts();
    const items = Array.isArray(res?.data) ? res.data : [];
    const slugs = items
      .map((item: { slug?: string }) => item.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0);

    if (slugs.length > 0) {
      return slugs.map((slug: string) => ({ slug }));
    }
  } catch (error) {
    console.error("Failed to fetch product slugs for static params:", error);
  }

  return PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export default function ProductSinglePage() {
  return <ProductSingleClient />;
}
