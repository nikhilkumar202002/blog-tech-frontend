"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Pagetransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isFirstRender = useRef(true);
  const [phase, setPhase] = useState<"idle" | "closing" | "opening">("idle");
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const handleScrollTarget = () => {
      const scroller = document.querySelector<HTMLElement>("[data-site-scroll]");
      const hash = typeof window !== "undefined" && window.location.hash
        ? decodeURIComponent(window.location.hash.slice(1))
        : "";

      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }

      if (scroller) {
        scroller.scrollTop = 0;
      } else if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    };

    if (isFirstRender.current) {
      isFirstRender.current = false;
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash) {
        setTimeout(handleScrollTarget, 150);
      }
      return;
    }

    setPhase("opening");
    isNavigatingRef.current = false;

    const scrollTimer = setTimeout(handleScrollTarget, 150);

    const timer = setTimeout(() => {
      setPhase("idle");
    }, 400);

    return () => {
      clearTimeout(scrollTimer);
      clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      if (isNavigatingRef.current) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, mailto, tel, downloads, target="_blank", or hash-only links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#")
      ) {
        return;
      }

      // Check if target URL is same pathname with hash
      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.pathname === window.location.pathname) {
          if (url.hash) return; // Allow smooth scroll inside page
          return; // Same page click
        }

        // Intercept navigation to close shutters over current page first
        e.preventDefault();
        isNavigatingRef.current = true;
        setPhase("closing");

        // After shutters close shut (380ms), push new route
        setTimeout(() => {
          router.push(url.pathname + url.search + url.hash);
        }, 380);
      } catch {
        // Fallback for malformed URLs
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
    };
  }, [router]);

  // Compute Shutter Panel Transforms:
  // - Closing: Panels slide from off-screen (-100% / 100%) to meet in center (0%)
  // - Opening / Idle: Panels slide back off-screen (-100% / 100%)
  const topTranslate = phase === "closing" ? "translateY(0%)" : "translateY(-100%)";
  const bottomTranslate = phase === "closing" ? "translateY(0%)" : "translateY(100%)";

  return (
    <>
      {/* Top Clean Shutter Overlay (No Borders, No Shadows) */}
      <div
        className="fixed top-0 left-0 right-0 h-[50dvh] bg-[#f8f8f8] z-[9999] pointer-events-none"
        style={{
          transform: topTranslate,
          transition: "transform 380ms cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
        }}
      />

      {/* Bottom Clean Shutter Overlay (No Borders, No Shadows) */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[50dvh] bg-[#f8f8f8] z-[9999] pointer-events-none"
        style={{
          transform: bottomTranslate,
          transition: "transform 380ms cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
        }}
      />

      {/* Main Page Content */}
      <div className="w-full flex-1 flex-shrink-0">
        {children}
      </div>
    </>
  );
}







