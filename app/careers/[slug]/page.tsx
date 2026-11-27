import React from "react";
import { getCareers } from "@/app/utils/career";
import CareerDetailClient from "./CareerDetailClient";

const FALLBACK_CAREER_SLUGS = [
  "frontend-developer",
  "senior-frontend-developer",
];

export async function generateStaticParams() {
  try {
    const res = await getCareers();
    const items = Array.isArray(res?.data) ? res.data : [];
    const slugs = items
      .map((item: { slug?: string }) => item.slug)
      .filter((slug: unknown): slug is string => typeof slug === "string" && slug.length > 0);

    if (slugs.length > 0) {
      return slugs.map((slug: string) => ({ slug }));
    }
  } catch (error) {
    console.error("Failed to fetch career slugs for static params:", error);
  }

  return FALLBACK_CAREER_SLUGS.map((slug) => ({ slug }));
}

export default function CareerDetailPage() {
  return <CareerDetailClient />;
}
