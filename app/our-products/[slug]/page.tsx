import React from "react";
import { getProducts } from "@/app/utils/product";
import ProductSingleClient from "./ProductSingleClient";

const FALLBACK_SLUGS = [
  "aurix",
  "aurix-jewellery-erp-software",
  "aurown",
  "employee-payroll",
  "jewel-connect",
  "scheme-app",
  "stockmate",
];

export async function generateStaticParams() {
  try {
    const res = await getProducts();
    const items = Array.isArray(res?.data) ? res.data : [];
    const apiSlugs = items
      .map((item: { slug?: string }) => item.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0);

    const uniqueSlugs = Array.from(new Set([...apiSlugs, ...FALLBACK_SLUGS]));
    return uniqueSlugs.map((slug) => ({ slug }));
  } catch {
    return FALLBACK_SLUGS.map((slug) => ({ slug }));
  }
}

export default function ProductSinglePage() {
  return <ProductSingleClient />;
}
