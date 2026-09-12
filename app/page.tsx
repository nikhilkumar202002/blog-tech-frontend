import React from "react";
import Frame from "./components/common/Frame";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#f8f8f8] flex items-center justify-center p-4">
      <Frame>
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2">
            Workspace
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 mb-3">
            Custom Frame Interface
          </h1>
          <p className="font-description text-neutral-500 max-w-md text-sm sm:text-base leading-relaxed">
            Engineered with a responsive vector silhouette, custom smooth fillets,
            and background color #f8f8f8.
          </p>
        </div>
      </Frame>
    </div>
  );
}
