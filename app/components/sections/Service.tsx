"use client";

import React, { useEffect, useRef, useState } from "react";
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
    image: "/products/aurix.jpg",
    imageAlt: "AURIX Jewellery Management Solution",
  },
  {
    id: "scheme-app",
    title: "SCHEME MOBILE APP",
    description:
      "A Mobile App Customized With Your Branding That Allows Customers To Manage Their Jewellery Schemes, Make Installment Payments, And Track Their Progress.",
    image: "/products/scheme-app.jpg",
    imageAlt: "Scheme Mobile Application Interface",
  },
  {
    id: "jewel-connect",
    title: "JEWEL CONNECT",
    description:
      "A Digital Platform Designed To Provide Jewellery Customers With Easy Access To Jewellery Designs, Product Information, Barcode Details, And Stock Availability.",
    image: "/products/jewel.jpg",
    imageAlt: "JEWEL CONNECT Digital Jewellery Platform",
  },
  {
    id: "employee-payroll",
    title: "EMPLOYEE & PAYROLL MANAGEMENT",
    description:
      "A Centralized System To Manage Employee Information, Attendance, Salary Processing, And Documentation Efficiently.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Employee and Payroll Management System",
  },
  {
    id: "aurown",
    title: "AUROWN",
    description:
      "An Application Designed Specifically For Jewellery Business Owners To Monitor And Track Business Operations, Sales, And Inventory From Anywhere.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    imageAlt: "AUROWN Business Owners Tracking App",
  },
];

const Service: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);

  // Techwarelab-style Mouse Drag (Click & Drag to Scroll)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    startXRef.current = e.pageX - trackRef.current.offsetLeft;
    startScrollLeftRef.current = trackRef.current.scrollLeft;
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    trackRef.current.scrollLeft = startScrollLeftRef.current - walk;
  };

  // Techwarelab-style Smooth Wheel Scroll & Page Scroll Progress Sync
  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    let targetScroll = track.scrollLeft;
    let currentScroll = track.scrollLeft;
    let animId: number | null = null;
    let isWheelActive = false;
    let wheelTimer: NodeJS.Timeout | null = null;

    const animate = () => {
      const diff = targetScroll - currentScroll;
      if (Math.abs(diff) > 0.3) {
        currentScroll += diff * 0.14;
        track.scrollLeft = currentScroll;
        animId = requestAnimationFrame(animate);
      } else {
        currentScroll = targetScroll;
        track.scrollLeft = targetScroll;
        animId = null;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        targetScroll = track.scrollLeft;
        currentScroll = track.scrollLeft;
        return;
      }

      const maxScroll = track.scrollWidth - track.clientWidth;
      if (maxScroll <= 0) return;

      const atLeft = track.scrollLeft <= 2;
      const atRight = track.scrollLeft >= maxScroll - 2;

      if ((e.deltaY > 0 && !atRight) || (e.deltaY < 0 && !atLeft)) {
        e.preventDefault();

        isWheelActive = true;
        if (wheelTimer) clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
          isWheelActive = false;
        }, 350);

        const step = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 90);
        targetScroll = Math.min(Math.max(0, targetScroll + step * 1.15), maxScroll);

        if (!animId) {
          animId = requestAnimationFrame(animate);
        }
      }
    };

    const scrollParent = track.closest(".overflow-y-auto") || window;

    const handleParentScroll = () => {
      if (isWheelActive || isDragging || !sectionRef.current || !trackRef.current)
        return;
      const sectionEl = sectionRef.current;
      const trackEl = trackRef.current;

      const sectionRect = sectionEl.getBoundingClientRect();
      const parentRect =
        scrollParent === window
          ? { top: 0, height: window.innerHeight }
          : (scrollParent as HTMLElement).getBoundingClientRect();

      const relativeTop = sectionRect.top - parentRect.top;
      const stickyDistance = sectionRect.height - parentRect.height;

      if (stickyDistance <= 0) return;

      const scrolled = -relativeTop;
      const rawProgress = scrolled / stickyDistance;
      // 5% deadzone at start and end for clean card anchoring with full left padding
      const progress = Math.max(0, Math.min(1, (rawProgress - 0.05) / 0.9));

      const maxScroll = trackEl.scrollWidth - trackEl.clientWidth;
      if (maxScroll > 0) {
        targetScroll = progress * maxScroll;
        currentScroll += (targetScroll - currentScroll) * 0.15;
        trackEl.scrollLeft = currentScroll;
      }
    };

    track.addEventListener("wheel", handleWheel, { passive: false });
    scrollParent.addEventListener("scroll", handleParentScroll, { passive: true });

    return () => {
      track.removeEventListener("wheel", handleWheel);
      scrollParent.removeEventListener("scroll", handleParentScroll);
      if (animId) cancelAnimationFrame(animId);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [isDragging]);

  return (
    <section ref={sectionRef} className="service-section" id="services">
      <div className="service-sticky-wrapper">
        <div className="service-container">
          {/* Techwarelab-style Mouse Drag & Wheel Horizontal Scroll Track */}
          <div
            ref={trackRef}
            className={`service-scroll-track no-scrollbar ${
              isDragging ? "is-dragging" : ""
            }`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeaveOrUp}
            onMouseUp={handleMouseLeaveOrUp}
            onMouseMove={handleMouseMove}
          >
            {/* Left Intro Card */}
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
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Product Cards */}
            {PRODUCTS.map((product) => (
              <div key={product.id} className="service-card service-product-card">
                <div className="service-card-image-wrapper">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="service-card-image"
                    loading="lazy"
                    draggable={false}
                  />
                </div>
                <div className="service-card-content">
                  <h3 className="service-product-title">{product.title}</h3>
                  <p className="service-product-description">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;