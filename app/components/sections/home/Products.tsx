"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "@/app/components/common/Button";
import { getProducts } from "@/app/utils/product";
import "@/app/components/styles/Section.css";

const MotionLink = motion.create(Link);

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

const Service: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollParentRef = useRef<HTMLElement | null>(null);
  const [products, setProducts] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const data = Array.isArray(res?.data) ? res.data : [];
        if (isMounted && data.length > 0) {
          const sorted = [...data].sort(
            (a: { sort_order?: number }, b: { sort_order?: number }) =>
              (a.sort_order ?? 0) - (b.sort_order ?? 0)
          );
          const mapped: ServiceItem[] = sorted.map(
            (item: {
              slug: string;
              name: string;
              short_description?: string | null;
              description?: string | null;
              featured_image_url?: string | null;
              featured_image?: string | null;
            }) => ({
              id: item.slug,
              title: item.name,
              description: item.short_description || item.description || "",
              image:
                item.featured_image_url ||
                item.featured_image ||
                "",
              imageAlt: item.name,
            })
          );
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);
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

    const scrollParent = section.closest("[data-site-scroll]") as HTMLElement | null;
    if (!scrollParent) return;
    scrollParentRef.current = scrollParent;

    const pinMedia = window.matchMedia("(min-width: 768px)");
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
      const viewportHeight = Math.max(scrollParent.clientHeight, 1);
      section.style.setProperty("--service-viewport-height", `${viewportHeight}px`);

      // Pin on every desktop viewport that has horizontal overflow. The previous
      // height check disabled the animation on shorter desktop screens.
      const pinned = pinMedia.matches && distance > 0;
      section.style.height = pinned ? `${viewportHeight + distance}px` : "";
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
  }, [loading, products.length]);

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
                <Button href="/our-products/aurix-jewellery-erp-software" pillColor="bg-[#7A3602]">
                  Explore Products
                </Button>
              </div>
            </motion.div>

            {/* Product Cards */}
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="service-card service-product-card animate-pulse"
                  >
                    <div className="service-card-image-wrapper shrink-0 !h-[220px] md:!h-[235px] bg-stone-200" />
                    <div className="service-card-content space-y-2">
                      <div className="h-5 w-2/3 bg-stone-200 rounded" />
                      <div className="h-4 w-full bg-stone-100 rounded" />
                      <div className="h-4 w-5/6 bg-stone-100 rounded" />
                    </div>
                  </div>
                ))
              : products.map((product, idx) => (
                  <MotionLink
                    key={product.id}
                    id={product.id}
                    href={`/our-products/${product.id}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                    className="service-card service-product-card group cursor-pointer flex flex-col text-inherit no-underline"
                  >
                    <div className="service-card-image-wrapper shrink-0 !h-[220px] md:!h-[235px]">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.imageAlt}
                          className="service-card-image w-full h-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      )}
                    </div>
                    <div className="service-card-content min-w-0">
                      <h3 className="service-product-title truncate">
                        {product.title}
                      </h3>
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

