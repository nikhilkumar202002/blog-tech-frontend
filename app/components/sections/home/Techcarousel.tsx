"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "@/app/components/styles/Section.css";

const technologies = [
  {
    name: "Java",
    src: "/tech_logos/731_java.png",
    width: 280,
    height: 480,
    className: "java",
  },
  {
    name: "React Native",
    src: "/tech_logos/react-native.png",
    width: 384,
    height: 102,
    className: "react-native",
  },
  {
    name: "Spring Boot",
    src: "/tech_logos/spring-boot.png",
    width: 700,
    height: 174,
    className: "spring-boot",
  },
  {
    name: "PostgreSQL",
    src: "/tech_logos/pngwing.com.png",
    width: 2977,
    height: 535,
    className: "postgresql",
  },
  {
    name: "Hibernate",
    src: "/tech_logos/Hibernate_logo_a.png",
    width: 2313,
    height: 642,
    className: "hibernate",
  },
  {
    name: "Apache Maven",
    src: "/tech_logos/Apache_Maven_logo.png",
    width: 340,
    height: 86,
    className: "maven",
  },
];

export default function Techcarousel() {
  return (
    <section className="tech-carousel-section" id="technology" aria-labelledby="tech-carousel-title">
      <div className="site-container">
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
          className="tech-carousel-title"
          id="tech-carousel-title"
        >
          Our <span className="tech-carousel-title-accent">Technology</span> Stack
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
          className="tech-carousel-viewport"
        >
          <div className="tech-carousel-track">
            {[0, 1].map((copy) => (
              <div
                className="tech-carousel-group"
                aria-hidden={copy === 1}
                key={copy}
              >
                {technologies.map((technology) => (
                  <div
                    className={`tech-carousel-logo tech-carousel-logo--${technology.className}`}
                    key={technology.name}
                  >
                    <Image
                      src={technology.src}
                      alt={technology.name}
                      width={technology.width}
                      height={technology.height}
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

