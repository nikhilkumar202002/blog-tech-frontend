"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Section.css";

export interface HeroSlide {
  id: number;
  primaryTitle: string;
  accentTitle: string;
  caption: string;
  ctaText?: string;
  ctaLink?: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    primaryTitle: "Turning Ideas Into",
    accentTitle: "Digital Solutions.",
    caption:
      "We bring ideas to life through practical technology and simple, user-friendly design, built around the way you work.",
    ctaText: "Explore Our Solutions",
    ctaLink: "#services",
  },
  {
    id: 2,
    primaryTitle: "Your Business.",
    accentTitle: "At Your Fingertips.",
    caption:
      "Powerful tools to keep your business connected, accessible, and within your control.",
    ctaText: "Explore Our Solutions",
    ctaLink: "#services",
  },
  {
    id: 3,
    primaryTitle: "Create. Connect.",
    accentTitle: "Grow.",
    caption:
      "We build technology around your business needs, helping you work smarter, stay connected, and create new opportunities for growth.",
    ctaText: "Explore Our Solutions",
    ctaLink: "#services",
  },
  {
    id: 4,
    primaryTitle: "Built on Trust.",
    accentTitle: "Driven by Experience.",
    caption:
      "Trusted relationships and a deep understanding of business shape the way we work, as we continue to evolve with your changing needs.",
    ctaText: "Explore Our Solutions",
    ctaLink: "#services",
  },
];

export interface HeroProps {
  className?: string;
  autoPlayInterval?: number;
}

const Hero: React.FC<HeroProps> = ({
  className = "",
  autoPlayInterval = 5500,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  // Autoplay video initialization
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.defaultMuted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Ignore autoplay restriction errors
        });
      }
    }
  }, []);

  // Slide rotation logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % heroSlides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIdx, autoPlayInterval]);

  const currentSlide = heroSlides[currentIdx];

  return (
    <section className={`hero-section ${className || ""}`} id="home">
      {/* 100vh Full Width Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="hero-video"
      >
        <source
          src="/video/blogtech-banner-video-mobile.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <source
          src="/video/blogtech-banner-video.webm"
          type="video/webm"
        />
        Your browser does not support HTML5 video.
      </video>

      {/* Subtle soft gradient on left side to ensure high-contrast readability */}
      <div className="hero-overlay" />

      {/* Hero Left Content Container */}
      <div className="hero-container">
        <div className="hero-text-block">
          {/* Animated Headline & Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hero-slide-content"
            >
              <h1 className="hero-headline">
                <span className="hero-headline-primary">
                  {currentSlide.primaryTitle}
                </span>
                <span className="hero-headline-accent">
                  {currentSlide.accentTitle}
                </span>
              </h1>

              <p className="hero-caption">{currentSlide.caption}</p>
            </motion.div>
          </AnimatePresence>

          {/* Action Row: CTA Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hero-actions-row"
          >
            <a
              href={currentSlide.ctaLink || "#services"}
              onClick={(e) => {
                const target = document.getElementById("services") || document.getElementById("our-services");
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hero-cta-btn"
            >
              <span>{currentSlide.ctaText || "Explore Our Solutions"}</span>
              <svg
                className="hero-cta-arrow"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M3.5 10.5L10.5 3.5M10.5 3.5H4.66667M10.5 3.5V9.33333"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
