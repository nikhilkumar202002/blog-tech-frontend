"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Button from '@/app/components/common/Button';
import '@/app/components/styles/Section.css';

export interface PlatformProps {
  className?: string;
}

const Platform: React.FC<PlatformProps> = ({ className = '' }) => {
  return (
    <section className={`platform-section ${className}`} id="platform">
      {/* Soft gradient overlay to enhance text contrast on fixed background */}
      <div className="platform-overlay" />

      <div className="platform-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="platform-content"
        >
          <h2 className="platform-headline">
            One Platform. A Better View of Your Business.
          </h2>

          <p className="platform-description">
            Bring important business information together and access it
            through an organized platform designed for jewellery
            operations.
            <br className="hidden sm:inline" />
            {" "}Monitor the information that matters across inventory, sales,
            customers, accounts and business reporting.
          </p>

          <div className="platform-actions">
            <Button
              href="#our-services"
              variant="transparent-white-hover"
              pillColor="bg-white"
              onClick={(e) => {
                const target =
                  document.getElementById("our-services") ||
                  document.getElementById("services");
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore the Platform
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Platform;
