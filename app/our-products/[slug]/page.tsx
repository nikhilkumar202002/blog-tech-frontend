import React from "react";
import { getProducts } from "@/app/utils/product";
import ProductSingleClient from "./ProductSingleClient";

export async function generateStaticParams() {
  const res = await getProducts();
  const items = Array.isArray(res?.data) ? res.data : [];
  return items
    .map((item: { slug?: string }) => item.slug)
    .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug: string) => ({ slug }));
}

export default function ProductSinglePage() {
  return <ProductSingleClient />;
}
