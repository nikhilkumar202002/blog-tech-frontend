"use client";

import React, { useEffect, useRef } from "react";

export interface AboutpageBannerProps {
  className?: string;
}

const AboutpageBanner: React.FC<AboutpageBannerProps> = ({ className = "" }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      videoRef.current.play().catch(() => {
        // Autoplay fallback
      });
    }
  }, []);

  return (
    <section
      className={`relative w-full flex-shrink-0 min-h-screen min-h-[100dvh] flex items-center justify-center pt-24 md:pt-32 pb-16 md:pb-24 bg-[#f8f8f8] ${className}`}
    >
      <div className="site-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Heading Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A44B03]/10 border border-[#A44B03]/25 text-[#A44B03] text-xs font-semibold uppercase tracking-widest mb-4 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#A44B03] animate-pulse" />
              About Blogtec
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.1] mb-4">
              Built on Trust.
              <br />
              Driven by{" "}
              <span
                style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
                className="italic text-[#A44B03]"
              >
                Experience.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-xl">
              For nearly two decades, Blogtec Software has provided reliable, industry-focused software solutions tailored specifically for the jewellery business.
            </p>
          </div>

          {/* Right Side: Direct Video Blended with Background (No Inner Box) */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end relative">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ mixBlendMode: "multiply" }}
              className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply"
            >
              <source src="/video/preloader.webm" type="video/webm" />
              Your browser does not support HTML5 video.
            </video>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutpageBanner;
