import React from "react";
import { ContentBanner, CareerForm } from "@/app/components/sections/careers";

export default function CareersPage() {
  return (
    <main className="w-full min-h-screen bg-white pt-20">
      <CareerForm />
      <ContentBanner />
    </main>
  );
}