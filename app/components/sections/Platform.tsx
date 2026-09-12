import React from 'react';
import '../styles/Section.css';

export interface PlatformProps {
  className?: string;
}

const Platform: React.FC<PlatformProps> = ({ className = '' }) => {
  return (
    <section className={`platform-section ${className}`} id="platform">
      {/* Soft gradient overlay to enhance text contrast on fixed background */}
      <div className="platform-overlay" />

      <div className="platform-container">
        <div className="platform-content">
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
            <a href="#platform-explore" className="platform-cta-btn">
              Explore the Platform
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;