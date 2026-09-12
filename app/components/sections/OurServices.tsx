"use client";

import React from "react";
import { FiShoppingCart, FiHeadphones, FiMonitor, FiDatabase } from "react-icons/fi";
import "../styles/Section.css";

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: "jewellery-erp",
    title: "Jewellery ERP Solutions",
    description:
      "Industry-focused ERP software designed around the unique needs of jewellery businesses to help streamline operations.",
    icon: <FiShoppingCart className="our-service-icon" />,
  },
  {
    id: "maintenance-support",
    title: "Maintenance & Support",
    description:
      "Continuous technical support and software maintenance to keep your systems reliable and running smoothly.",
    icon: <FiHeadphones className="our-service-icon" />,
  },
  {
    id: "custom-software",
    title: "Custom Software Solutions",
    description:
      "Tailored features, workflows, and functionalities designed to match specific business processes.",
    icon: <FiMonitor className="our-service-icon" />,
  },
  {
    id: "data-management",
    title: "Data & System Management",
    description:
      "Secure database management, data migration, and system optimization for reliable performance.",
    icon: <FiDatabase className="our-service-icon" />,
  },
];

const OurServices: React.FC = () => {
  return (
    <section className="our-services-section" id="our-services">
      <div className="site-container">
        {/* Section Header */}
        <div className="our-services-header">
          <span className="our-services-subtitle">Our Services</span>
          <h2 className="our-services-headline">
            Comprehensive <span className="our-services-accent">Services</span>
            <br />
            <span className="our-services-accent">Tailored</span> For You
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="our-services-grid">
          {SERVICES_DATA.map((item) => (
            <div key={item.id} className="our-service-card">
              <div className="our-service-icon-badge">{item.icon}</div>
              <h3 className="our-service-card-title">{item.title}</h3>
              <p className="our-service-card-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Pagination Dots */}
        <div className="our-services-dots">
          <span className="our-services-dot active" />
          <span className="our-services-dot" />
          <span className="our-services-dot" />
        </div>
      </div>
    </section>
  );
};

export default OurServices;
