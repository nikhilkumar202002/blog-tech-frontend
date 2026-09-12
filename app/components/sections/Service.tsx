"use client";

import React, { useRef, useState } from "react";
import "../styles/Section.css";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const PRODUCTS: ServiceItem[] = [
  {
    id: "aurix",
    title: "AURIX",
    description:
      "A comprehensive jewellery management solution built to streamline day-to-day operations, from inventory and billing to customer management and accounting.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "AURIX Jewellery Management Solution",
  },
  {
    id: "employee-payroll",
    title: "EMPLOYEE & PAYROLL MANAGEMENT",
    description:
      "A centralized system to manage employee information, attendance, salary processing, and documentation efficiently.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Employee and Payroll Management System",
  },
  {
    id: "jewel-connect",
    title: "JEWEL CONNECT",
    description:
      "A digital platform designed to provide jewellery customers with easy access to jewellery designs, product information, barcode details, and stock availability.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "JEWEL CONNECT Digital Jewellery Platform",
  },
  {
    id: "scheme-app",
    title: "SCHEME MOBILE APP",
    description:
      "A mobile app customized with your branding that allows customers to manage their jewellery schemes, make installment payments, and track their progress.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Scheme Mobile Application Interface",
  },
  {
    id: "aurown",
    title: "AUROWN",
    description:
      "An application designed specifically for jewellery business owners to monitor and track business operations, sales, and inventory from anywhere.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    imageAlt: "AUROWN Business Owners Tracking App",
  },
];

const Service: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollTrack = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = direction === "left" ? -420 : 420;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="service-section">
      <div className="service-container">
        {/* Track Header Controls: Scroll Navigation Arrows */}
        <div className="service-header-controls">
          <div className="service-nav-arrows">
            <button
              onClick={() => scrollTrack("left")}
              className="service-arrow-btn"
              aria-label="Scroll left"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scrollTrack("right")}
              className="service-arrow-btn"
              aria-label="Scroll right"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`service-scroll-track no-scrollbar ${
            isDragging ? "is-dragging" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Card 1: Intro / Headline Card */}
          <div className="service-card service-intro-card">
            <div className="service-intro-top">
              <h2 className="service-headline">
                Your Business.
                <br />
                At Your{" "}
                <span className="service-headline-accent">Fingertips.</span>
              </h2>
            </div>

            <div className="service-intro-bottom">
              <p className="service-intro-description">
                From Managing Everyday Jewellery Operations To Connecting Business
                Owners And Customers, Blogtec Provides Specialized Solutions For
                Different Aspects Of The Jewellery Business.
              </p>
              <button className="service-cta-btn">
                <span>View All Products</span>
                <svg
                  className="service-cta-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
          </div>

          {/* Product / Service Cards */}
          {PRODUCTS.map((product) => (
            <div key={product.id} className="service-card service-product-card">
              <div className="service-card-image-wrapper">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="service-card-image"
                  loading="lazy"
                />
              </div>
              <div className="service-card-content">
                <h3 className="service-product-title">{product.title}</h3>
                <p className="service-product-description">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;