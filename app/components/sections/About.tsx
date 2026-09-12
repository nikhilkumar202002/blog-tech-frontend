"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/Section.css";

const DESCRIPTION_TEXT =
  "Founded in 2007 by Prajesh Raj CA, Blogtec Software has a clear vision to develop reliable, efficient, and industry-focused software solutions specifically for the jewellery business. For nearly two decades, we have been dedicated to understanding the unique challenges of the industry to provide dependable software and responsive support.";

export interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = "" }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Split description text into structured words and characters
  const { words, totalChars } = useMemo(() => {
    const rawWords = DESCRIPTION_TEXT.split(" ");
    let charCounter = 0;
    const structuredWords = rawWords.map((word) => {
      const chars = word.split("").map((char) => {
        const index = charCounter++;
        return { char, index };
      });
      // count the trailing space as part of progression
      charCounter++;
      return { word, chars };
    });
    return { words: structuredWords, totalChars: charCounter };
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!textRef.current) return;

      animationFrameId = requestAnimationFrame(() => {
        if (!textRef.current) return;
        const rect = textRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || 800;

        // Progress begins when text enters lower-mid viewport (75%)
        // Progress reaches 100% when text reaches upper-mid viewport (35%)
        const start = windowHeight * 0.75;
        const end = windowHeight * 0.35;
        const current = rect.top;

        const raw = (start - current) / (start - end);
        const clamped = Math.max(0, Math.min(1, raw));
        setScrollProgress(clamped);
      });
    };

    // Attach passive listeners to window and document to capture any parent scroll container
    window.addEventListener("scroll", handleScroll, {
      passive: true,
      capture: true,
    });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`about-section ${className || ""}`}>
      <div className="about-container">
        <div className="about-content">
          {/* Eyebrow Subtitle */}
          <span className="about-subtitle">About Us</span>

          {/* Headline with Serif Italic Accent */}
          <h2 className="about-headline">
            Built on{" "}
            <span className="about-headline-accent">Trust. Driven </span>
            by Experience.
          </h2>

          {/* Scroll-Driven Letter-by-Letter Color Fill Description */}
          <p ref={textRef} className="about-description">
            {words.map((item, wordIdx) => {
              return (
                <React.Fragment key={wordIdx}>
                  <span className="about-word">
                    {item.chars.map(({ char, index }) => {
                      const threshold = index / totalChars;
                      const isFilled = scrollProgress >= threshold;
                      return (
                        <span
                          key={index}
                          className={`about-char ${isFilled ? "is-filled" : ""}`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </span>
                  {wordIdx < words.length - 1 && " "}
                </React.Fragment>
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;