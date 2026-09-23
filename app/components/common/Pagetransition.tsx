"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const OPEN_DURATION = 260;
const CLOSED_DELAY = 320;

export default function Pagetransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [phase, setPhase] = useState<"idle" | "closing" | "closed" | "opening">("idle");
  const isNavigatingRef = useRef(false);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTransitionTimers = useCallback(() => {
    if (revealTimerRef.current) {
      clearTimeout(revealTimerRef.current);
      revealTimerRef.current = null;
    }

    if (closedTimerRef.current) {
      clearTimeout(closedTimerRef.current);
      closedTimerRef.current = null;
    }
  }, []);

  const revealPage = useCallback(() => {
    clearTransitionTimers();
    isNavigatingRef.current = false;
    setPhase("opening");

    revealTimerRef.current = setTimeout(() => {
      setPhase("idle");
      revealTimerRef.current = null;
    }, OPEN_DURATION);
  }, [clearTransitionTimers]);

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
        setTimeout(handleScrollTarget, 100);
      }
      return;
    }

    // Page changed: Start revealing opening sequence
    revealPage();

    const scrollTimer = setTimeout(handleScrollTarget, 80);

    return () => {
      clearTimeout(scrollTimer);
    };
  }, [pathname, revealPage]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      if (
        isNavigatingRef.current ||
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore non-page links, downloads, new tabs, or hash-only links.
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        href.startsWith("#")
      ) {
        return;
      }

      try {
        const url = new URL(anchor.href, window.location.origin);
        if (url.origin !== window.location.origin) return;

        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        const targetPath = url.pathname.replace(/\/$/, "") || "/";
        const isSameRoute =
          currentPath === targetPath && window.location.search === url.search;

        if (isSameRoute) {
          if (url.hash) return; // Allow smooth scroll inside page
          return; // Same page click
        }

        // Let Next Link handle navigation immediately; this component only paints the transition.
        isNavigatingRef.current = true;
        setPhase("closing");

        closedTimerRef.current = setTimeout(() => {
          if (isNavigatingRef.current) {
            setPhase("closed");
          }
          closedTimerRef.current = null;
        }, CLOSED_DELAY);
      } catch {
        revealPage();
      }
    };

    const handlePageShow = () => revealPage();
    const handlePopState = () => revealPage();

    document.addEventListener("click", handleLinkClick, { capture: true });
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      clearTransitionTimers();
    };
  }, [clearTransitionTimers, revealPage]);

  // Compute Shutter Panel Transforms:
  // "closing" or "closed": panels shut together (0%)
  // "opening" or "idle": panels slide offscreen (-100% / 100%)
  const isShut = phase === "closing" || phase === "closed";
  const topTranslate = isShut ? "translateY(0%)" : "translateY(-100%)";
  const bottomTranslate = isShut ? "translateY(0%)" : "translateY(100%)";

  return (
    <>
      {/* Top Clean Shutter Overlay */}
      <div
        className="fixed top-0 left-0 right-0 h-[50dvh] bg-[#f8f8f8] z-[9999] pointer-events-none"
        style={{
          transform: topTranslate,
          transition: "transform 320ms cubic-bezier(0.76, 0, 0.24, 1)",
          willChange: "transform",
        }}
      />

      {/* Bottom Clean Shutter Overlay */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[50dvh] bg-[#f8f8f8] z-[9999] pointer-events-none"
        style={{
          transform: bottomTranslate,
          transition: "transform 320ms cubic-bezier(0.76, 0, 0.24, 1)",
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
