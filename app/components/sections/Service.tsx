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
      "A Comprehensive Jewellery Management Solution Built To Streamline Day-To-Day Operations, From Inventory And Billing To Customer Management And Accounting.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    imageAlt: "AURIX Jewellery Management Software on Laptop",
  },
  {
    id: "scheme-app",
    title: "SCHEME MOBILE APP",
    description:
      "A Mobile App Customized With Your Branding That Allows Customers To Manage Their Jewellery Schemes, Make Installment Payments, And Track Their Progress.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Jewellery Scheme Mobile Application Interface",
  },
  {
    id: "jewellery-pos",
    title: "JEWELLERY POS & BILLING",
    description:
      "A Touchscreen Point-Of-Sale System Built For Jewellery Stores, Offering Instant Invoicing, Barcode Scanning, RFID Integration, And Real-Time Gold Rate Adjustments.",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Jewellery POS and Billing Software System",
  },
  {
    id: "workshop-tracking",
    title: "WORKSHOP & ORDER TRACKING",
    description:
      "Track Custom Manufacturing Orders From Metal Melting To Final Polish, Managing Artisan Craftsmen, Metal Wastage, Weight Variations, And Delivery Schedules.",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Jewellery Workshop and Order Tracking System",
  },
  {
    id: "digital-catalog",
    title: "DIGITAL CATALOG & APP",
    description:
      "Showcase Your Fine Jewellery Collections Online With An Interactive Digital Catalog App, Enabling Virtual Try-Ons, Live Rate Calculator, And Direct Customer Enquiries.",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Digital Jewellery Catalog Application",
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