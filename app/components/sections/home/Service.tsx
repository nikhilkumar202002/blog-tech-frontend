"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/app/components/common/Button";
import "@/app/components/styles/Section.css";

const MotionLink = motion.create(Link);

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
    id: "aurown",
    title: "AUROWN",
    description:
      "An Application Designed Specifically For Jewellery Business Owners To Monitor And Track Business Operations, Sales, And Inventory From Anywhere.",
    image: "/products/aurown/aurown-app-mockup.webp",
    imageAlt: "AUROWN Business Owners Tracking App",
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
    image: "/products/enroll-payroll/enroll-management-system.webp",
    imageAlt: "Employee and Payroll Management System",
  },
];

const Service: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const dragStartRef = useRef<{
    pointerId: number;
    x: number;
    scrollTop: number;
    scrollLeft: number;
    pinned: boolean;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const wrapper = section.querySelector(".service-sticky-wrapper") as HTMLElement;
    const scrollParent = section.closest(".overflow-y-auto") as HTMLElement | null;
    if (!scrollParent) return;
    scrollParentRef.current = scrollParent;

    const pinMedia = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const syncTrack = () => {
      frame = 0;
      if (!section.classList.contains("is-pinned")) return;

      const sectionTop = section.getBoundingClientRect().top;
      const parentTop = scrollParent.getBoundingClientRect().top;
      const distance = track.scrollWidth - track.clientWidth;
      track.scrollLeft = Math.max(0, Math.min(distance, parentTop - sectionTop));
    };

    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncTrack);
    };

    const measure = () => {
      const distance = Math.max(0, track.scrollWidth - track.clientWidth);
      section.style.setProperty("--service-viewport-height", `${scrollParent.clientHeight}px`);
      const topPadding = Number.parseFloat(window.getComputedStyle(wrapper).paddingTop);
      const pinned = pinMedia.matches && distance > 0 &&
        scrollParent.clientHeight >= track.offsetHeight + topPadding;
      section.style.height = pinned ? `${scrollParent.clientHeight + distance}px` : "";
      section.classList.toggle("is-pinned", pinned);
      scheduleSync();
    };

    const handleHorizontalWheel = (event: WheelEvent) => {
      if (!section.classList.contains("is-pinned") || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;

      event.preventDefault();
      scrollParent.scrollTop += event.deltaX;
    };

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(scrollParent);
    resizeObserver.observe(track);
    measure();

    pinMedia.addEventListener("change", measure);
    scrollParent.addEventListener("scroll", scheduleSync, { passive: true });
    track.addEventListener("wheel", handleHorizontalWheel, { passive: false });

    return () => {
      resizeObserver.disconnect();
      pinMedia.removeEventListener("change", measure);
      scrollParent.removeEventListener("scroll", scheduleSync);
      track.removeEventListener("wheel", handleHorizontalWheel);
      if (frame) window.cancelAnimationFrame(frame);
      scrollParentRef.current = null;
    };
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0 ||
        (event.target as HTMLElement).closest("button, a")) return;

    const scrollParent = scrollParentRef.current;
    dragStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollTop: scrollParent?.scrollTop ?? 0,
      scrollLeft: event.currentTarget.scrollLeft,
      pinned: !!sectionRef.current?.classList.contains("is-pinned"),
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start || start.pointerId !== event.pointerId) return;

    const offset = (event.clientX - start.x) * 1.5;
    if (start.pinned && scrollParentRef.current) {
      scrollParentRef.current.scrollTop = start.scrollTop - offset;
    } else {
      event.currentTarget.scrollLeft = start.scrollLeft - offset;
    }
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current?.pointerId !== event.pointerId) return;
    dragStartRef.current = null;
    setIsDragging(false);
  };

  return (
    <section ref={sectionRef} className="service-section" id="services">
      <div className="service-sticky-wrapper">
        <div className="service-container">
          <div
            ref={trackRef}
            className={`service-scroll-track no-scrollbar ${
              isDragging ? "is-dragging" : ""
            }`}
            role="region"
            aria-label="Blogtec products"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
              event.preventDefault();
              const direction = event.key === "ArrowRight" ? 1 : -1;
              const [firstCard, secondCard] = Array.from(event.currentTarget.children) as HTMLElement[];
              const step = firstCard && secondCard
                ? secondCard.offsetLeft - firstCard.offsetLeft
                : event.currentTarget.clientWidth;
              const distance = step * direction;
              if (sectionRef.current?.classList.contains("is-pinned") && scrollParentRef.current) {
                scrollParentRef.current.scrollBy({ top: distance, behavior: "smooth" });
              } else {
                event.currentTarget.scrollBy({ left: distance, behavior: "smooth" });
              }
            }}
          >
            {/* Left Intro Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
              className="service-card service-intro-card"
            >
              <div className="service-intro-top">
                <h2 className="service-headline">
                  <span className="service-headline-accent">Built</span> for Jewellery.
                  <br />
                  Ready for <span className="service-headline-accent">Growth.</span>
                </h2>
              </div>
              <div className="service-intro-bottom">
                <p className="service-intro-description">
                  From Managing Everyday Jewellery Operations To Connecting Business
                  Owners And Customers, Blogtec Provides Specialized Solutions For
                  Different Aspects Of The Jewellery Business.
                </p>
                <Button href="/our-products/aurix" pillColor="bg-[#7A3602]">
                  Explore Products
                </Button>
              </div>
            </motion.div>

            {/* Product Cards */}
            {PRODUCTS.map((product, idx) => (
              <MotionLink
                key={product.id}
                id={product.id}
                href={`/our-products/${product.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                className="service-card service-product-card group cursor-pointer block text-inherit no-underline"
              >
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
              </MotionLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;

