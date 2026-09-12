import React from "react";
import Frame from "./components/common/Frame";
import Header from "./components/common/Header";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8f8f8] flex items-center justify-center p-3 md:p-5">
      <Header position="fixed" />
      <Frame>

      </Frame>
    </div>
  );
}
