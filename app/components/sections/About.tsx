"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../styles/Section.css";

const DESCRIPTION_TEXT =
  "Our specialized software solutions are designed to simplify jewellery business operations, improve efficiency, and give you better control over every aspect of your business. We bring different aspects of your business together into one organized system, helping you reduce manual effort, improve access to information, and work smarter.";

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
    <section ref={sectionRef} className={`about-section ${className || ""}`} id="about">
      <div className="about-container">
        <div className="about-content">
          {/* Eyebrow Subtitle */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="about-subtitle"
          >
            Our Solutions
          </motion.span>

          {/* Headline with Serif Italic Accent */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="about-headline"
          >
            Practical Technology.
            <br />
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="about-headline-accent italic text-[#A44B03]"
            >
              Designed
            </span>{" "}
            for Your Workflow.
          </motion.h2>

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
