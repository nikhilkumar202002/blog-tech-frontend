"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FiBarChart2,
  FiDatabase,
  FiHeadphones,
  FiMonitor,
  FiShoppingCart,
} from "react-icons/fi";
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
  {
    id: "business-reporting",
    title: "Business Analytics & Reporting",
    description:
      "Clear reports on sales, inventory, and customer trends to help jewellery businesses make informed decisions.",
    icon: <FiBarChart2 className="our-service-icon" />,
  },
];

function getCarouselStep(carousel: HTMLDivElement) {
  const firstCard = carousel.children[0] as HTMLElement | undefined;
  const secondCard = carousel.children[1] as HTMLElement | undefined;
  return firstCard && secondCard
    ? secondCard.offsetLeft - firstCard.offsetLeft
    : carousel.clientWidth;
}

function getLastSlide(carousel: HTMLDivElement) {
  const step = getCarouselStep(carousel);
  return step > 0
    ? Math.max(0, Math.round((carousel.scrollWidth - carousel.clientWidth) / step))
    : 0;
}

const OurServices: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ pointerId: number; x: number; scrollLeft: number } | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [lastSlide, setLastSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const scrollToSlide = (index: number) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const slide = Math.max(0, Math.min(index, getLastSlide(carousel)));
    carousel.scrollTo({
      left: slide * getCarouselStep(carousel),
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
    setActiveSlide(slide);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const updateSlides = () => {
      const last = getLastSlide(carousel);
      const step = getCarouselStep(carousel);
      setLastSlide(last);
      setActiveSlide(step > 0 ? Math.min(last, Math.round(carousel.scrollLeft / step)) : 0);
    };

    updateSlides();
    const resizeObserver = new ResizeObserver(updateSlides);
    resizeObserver.observe(carousel);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lastSlide === 0 || !isInView || isHovered || isFocused || isDragging || isTouching || prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      const carousel = carouselRef.current;
      if (!carousel || document.hidden) return;

      const step = getCarouselStep(carousel);
      const current = step > 0 ? Math.round(carousel.scrollLeft / step) : 0;
      const next = current >= getLastSlide(carousel) ? 0 : current + 1;
      carousel.scrollTo({ left: next * step, behavior: "smooth" });
      setActiveSlide(next);
    }, 4000);

    return () => window.clearInterval(interval);
  }, [lastSlide, isInView, isHovered, isFocused, isDragging, isTouching, prefersReducedMotion]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") {
      setIsTouching(true);
      return;
    }
    if (event.button !== 0) return;

    dragStartRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      scrollLeft: event.currentTarget.scrollLeft,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragStart = dragStartRef.current;
    if (!dragStart || dragStart.pointerId !== event.pointerId) return;

    event.currentTarget.scrollLeft = dragStart.scrollLeft - (event.clientX - dragStart.x);
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") {
      setIsTouching(false);
      return;
    }

    if (dragStartRef.current?.pointerId !== event.pointerId) return;
    dragStartRef.current = null;
    setIsDragging(false);
    const carousel = event.currentTarget;
    const step = getCarouselStep(carousel);
    const nearest = step > 0 ? Math.round(carousel.scrollLeft / step) : 0;
    window.requestAnimationFrame(() => scrollToSlide(nearest));
  };

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

        <div
          className="our-services-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setIsFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsFocused(false);
          }}
        >
          <div
            ref={carouselRef}
            className={`our-services-grid${isDragging ? " is-dragging" : ""}`}
            role="region"
            aria-roledescription="carousel"
            aria-label="Our services"
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onScroll={(event) => {
              const carousel = event.currentTarget;
              const step = getCarouselStep(carousel);
              setActiveSlide(step > 0 ? Math.min(getLastSlide(carousel), Math.round(carousel.scrollLeft / step)) : 0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                scrollToSlide(activeSlide + (event.key === "ArrowRight" ? 1 : -1));
              }
            }}
          >
            {SERVICES_DATA.map((item) => (
              <div key={item.id} className="our-service-card">
                <div className="our-service-icon-badge">{item.icon}</div>
                <h3 className="our-service-card-title">{item.title}</h3>
                <p className="our-service-card-desc">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="our-services-dots" aria-label="Service carousel navigation">
            {Array.from({ length: lastSlide + 1 }, (_, index) => (
              <button
                key={index}
                type="button"
                className={`our-services-dot${index === activeSlide ? " active" : ""}`}
                aria-label={`Go to service slide ${index + 1}`}
                aria-current={index === activeSlide ? "true" : undefined}
                onClick={() => scrollToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
