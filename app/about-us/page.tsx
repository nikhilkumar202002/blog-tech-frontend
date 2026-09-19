import React from "react";
import AboutpageBanner from "../components/sections/AboutpageBanner";
import CoreApproach from "../components/sections/CoreApproach";
import PreparingTomorrow from "../components/sections/PreparingTomorrow";
import About from "../components/sections/About";
import CEOMessage from "../components/sections/CEOMessage";
import Faq from "../components/sections/Faq";

export default function AboutUsPage() {
    return (
        <main className="w-full">
            <AboutpageBanner />
            <CoreApproach />
            <PreparingTomorrow />
        </main>
    );
}