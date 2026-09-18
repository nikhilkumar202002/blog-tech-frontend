import React from "react";
import AboutpageBanner from "../components/sections/AboutpageBanner";
import CoreApproach from "../components/sections/CoreApproach";
import About from "../components/sections/About";
import CEOMessage from "../components/sections/CEOMessage";
import Faq from "../components/sections/Faq";

export default function AboutUsPage() {
    return (
        <main className="w-full">
            <AboutpageBanner />
            <CoreApproach />
        </main>
    );
}