import React from "react";
import Frame from "./components/common/Frame";
import Header from "./components/common/Header";
import Hero from "./components/sections/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8f8f8] flex items-center justify-center p-3 md:p-5">
      <Header position="fixed" />
      <Frame contentClassName="p-0">
        <Hero />
      </Frame>
    </div>
  );
}
