"use client";

import React, { useEffect, useRef, useState } from "react";

import "../styles/Section.css";

export interface HeroSlide {
  id: number;
  headline: string;
  caption: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    headline: "Turning Ideas into Digital Solutions.",
    caption:
      "We bring ideas to life through practical technology and simple, user-friendly design, built around the way you work.",
  },
  {
    id: 2,
    headline: "Your Business. At Your Fingertips.",
    caption:
      "Powerful tools to keep your business connected, accessible, and within your control.",
  },
  {
    id: 3,
    headline: "Create. Connect. Grow",
    caption:
      "We build technology around your business needs, helping you work smarter, stay connected, and create new opportunities for growth.",
  },
  {
    id: 4,
    headline: "Built on Trust. Driven by Experience.",
    caption:
      "Trusted relationships and a deep understanding of business shape the way we work, as we continue to evolve with your changing needs.",
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
  const [isTransitioning, setIsTransitioning] = useState(false);

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

  // Slide rotation logic with smooth transition
  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIdx, autoPlayInterval]);

  const handleNextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === currentIdx) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx(idx);
      setIsTransitioning(false);
    }, 250);
  };

  const currentSlide = heroSlides[currentIdx];

  return (
    <section
      className={`hero-section ${className || ""}`}
    >
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
        <source src="/video/blogtech-banner-video.webm" type="video/webm" />
        Your browser does not support HTML5 video.
      </video>

      {/* Subtle soft gradient on left side to ensure high-contrast readability */}
      <div className="hero-overlay" />

      {/* Hero Left Content Container */}
      <div className="hero-content-wrapper container custom-container">
        <div className="hero-text-block">
          
          {/* Animated Headline & Caption */}
          <div
            className={`hero-slide-content ${
              isTransitioning ? "is-transitioning" : ""
            }`}
          >
            <h1 className="hero-headline">
              {currentSlide.headline}
            </h1>

            <p className="hero-caption">
              {currentSlide.caption}
            </p>
          </div>

          {/* Slide Indicator Bar & Navigation */}
          <div className="hero-indicators">
            {heroSlides.map((slide, idx) => {
              const isActive = idx === currentIdx;
              return (
                <button
                  key={slide.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`hero-indicator-btn ${
                    isActive ? "is-active" : ""
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="sr-only">Slide {idx + 1}</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;