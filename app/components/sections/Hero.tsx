"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../common/Button";
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

// Framer Motion Animation Variants
const contentContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.35,
    },
  },
};

const titlePrimaryVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const titleAccentVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -18,
    filter: "blur(4px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const captionVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(2px)",
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
      {/* 100vh Full Width Background Video (Intact, without animations) */}
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

      {/* Animated Soft Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="hero-overlay"
      />

      {/* Hero Left Content Container */}
      <div className="hero-container">
        <div className="hero-text-block">
          {/* Animated Headline & Caption */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              variants={contentContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="hero-slide-content"
            >
              <h1 className="hero-headline">
                <motion.span
                  variants={titlePrimaryVariants}
                  className="hero-headline-primary block"
                >
                  {currentSlide.primaryTitle}
                </motion.span>
                <motion.span
                  variants={titleAccentVariants}
                  className="hero-headline-accent block"
                >
                  {currentSlide.accentTitle}
                </motion.span>
              </h1>

              <motion.p
                variants={captionVariants}
                className="hero-caption"
              >
                {currentSlide.caption}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Action Row: Custom Expanding Theme Pill Button */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="hero-actions-row"
          >
            <Button
              href={currentSlide.ctaLink || "#services"}
              textKey={currentSlide.id}
              onClick={(e) => {
                const target =
                  document.getElementById("services") ||
                  document.getElementById("our-services");
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {currentSlide.ctaText || "Explore Our Solutions"}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
