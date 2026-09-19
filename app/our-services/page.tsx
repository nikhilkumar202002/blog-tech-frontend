import React from "react";
import type { Metadata } from "next";
import ServicesHero from "../components/sections/ServicesHero";
import ServicesGrid from "../components/sections/ServicesGrid";
import ServiceEcosystem from "../components/sections/ServiceEcosystem";
import ServicesWorkflow from "../components/sections/ServicesWorkflow";

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
  return (
    <main className="w-full min-h-screen bg-white">
      {/* Section 01: Hero */}
      <ServicesHero />

      {/* Section 02: Services List Grid */}
      <ServicesGrid />

      {/* Section 03: Service Ecosystem Diagram */}
      <ServiceEcosystem />

      {/* Section 04: How We Work Workflow */}
      <ServicesWorkflow />
    </main>
  );
}
