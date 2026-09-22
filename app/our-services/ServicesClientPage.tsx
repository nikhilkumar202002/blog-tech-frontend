"use client";

import React from "react";
import { motion } from "framer-motion";
import ServicesHero from "@/app/components/sections/our-services/ServicesHero";
import ServicesGrid from "@/app/components/sections/our-services/ServicesGrid";
import ServiceEcosystem from "@/app/components/sections/our-services/ServiceEcosystem";
import ServicesWorkflow from "@/app/components/sections/our-services/ServicesWorkflow";
import ServicesCTA from "@/app/components/sections/our-services/ServicesCTA";

export default function ServicesClientPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen bg-white"
    >
      <ServicesHero />
      <ServicesGrid />
      <ServiceEcosystem />
      <ServicesWorkflow />
      <ServicesCTA />

    </motion.main>
  );
}
