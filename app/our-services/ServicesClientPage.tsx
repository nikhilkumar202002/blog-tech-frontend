"use client";

import React from "react";
import { motion } from "framer-motion";
import ServicesHero from "../components/sections/ServicesHero";
import ServicesGrid from "../components/sections/ServicesGrid";
import ServiceEcosystem from "../components/sections/ServiceEcosystem";
import ServicesWorkflow from "../components/sections/ServicesWorkflow";
import ServicesCTA from "../components/sections/ServicesCTA";

export default function ServicesClientPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen bg-white"
    >
      {/* Section 01: Hero */}
      <ServicesHero />

      {/* Section 02: Services List Grid */}
      <ServicesGrid />

      {/* Section 03: Service Ecosystem Diagram */}
      <ServiceEcosystem />

      {/* Section 04: How We Work Workflow */}
      <ServicesWorkflow />

      {/* Section 05: Final CTA Section */}
      <ServicesCTA />
    </motion.main>
  );
}
