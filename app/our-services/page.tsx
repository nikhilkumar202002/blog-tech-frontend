import React from "react";
import type { Metadata } from "next";
import ServicesClientPage from "./ServicesClientPage";

export const metadata: Metadata = {
  title: "Our Services | Blogtec Software — Jewellery ERP & Technical Solutions",
  description:
    "From Jewellery ERP Solutions To Ongoing Support, Custom Development And Digital Solutions, Blogtec Helps Jewellery Businesses Implement And Evolve Technology Around Their Real Business Requirements.",
  openGraph: {
    title: "Our Services | Blogtec Software",
    description:
      "Technology That Supports Your Business At Every Step.",
    url: "https://blogtecsoftware.com/our-services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClientPage />;
}

