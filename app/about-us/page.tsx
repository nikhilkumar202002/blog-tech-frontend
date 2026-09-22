import React from "react";
import AboutpageBanner from "@/app/components/sections/about-us/AboutpageBanner";
import CoreApproach from "@/app/components/sections/about-us/CoreApproach";
import PreparingTomorrow from "@/app/components/sections/about-us/PreparingTomorrow";

export default function AboutUsPage() {
    return (
        <main className="w-full">
            <AboutpageBanner />
            <CoreApproach />
            <PreparingTomorrow />
        </main>
    );
}