"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import "@/app/components/styles/Section.css";

export default function CEOMessage() {
  return (
    <section className="ceo-message-section" id="founder-story" aria-labelledby="ceo-message-title">
      <div className="site-container">
        <div className="ceo-message-top">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="ceo-message-intro"
          >
            <span className="ceo-message-eyebrow">The Story Behind Blogtec</span>
            <h2 className="ceo-message-title" id="ceo-message-title">
              Built From a Clear Understanding of the{" "}
              <span className="ceo-message-title-accent">Jewellery Business.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
            className="ceo-message-copy"
          >
            <p className="ceo-message-description">
              I founded Blogtec Software in 2007 with a clear vision: to develop reliable, efficient, and industry-focused software solutions specifically for the jewellery business. Over the years, our close association with jewellery businesses has given us a deep understanding of the challenges they face every day—from managing stock and billing to accounting, schemes, and business reporting
            </p>

            <div className="ceo-message-signoff">
              <Image
                src="/signature_1.png"
                alt="Prajesh Raj CA signature"
                width={213}
                height={48}
              />
              <strong>Prajesh Raj CA</strong>
              <span>Founder</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
          className="ceo-message-bottom"
        >
          <div className="ceo-message-photo">
            <Image
              src="/images/founder-story-illustration.webp"
              alt="Illustrative office portrait of a professional speaking on the phone at a desk"
              fill
              sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 45vw, 48vw"
            />
          </div>

          <blockquote className="ceo-message-quote">
            “Technology Built Around the Jewellery Business.”
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

