"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CLOSE_EYE_MS = 360;
const OPEN_EYE_MS = 400;
const MIN_SHUT_TIME_MS = 380;
const MAX_SAFETY_MS = 900;

export default function Pagetransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);
  const [eyeState, setEyeState] = useState<"open" | "blinking_shut" | "shut" | "opening">("open");
  const isNavigatingRef = useRef(false);
  const blinkStartTimeRef = useRef<number>(0);

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (shutTimerRef.current) {
      clearTimeout(shutTimerRef.current);
      shutTimerRef.current = null;
    }
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  const openEye = useCallback(() => {
    clearTimers();
    isNavigatingRef.current = false;
    setEyeState("opening");

    openTimerRef.current = setTimeout(() => {
      setEyeState("open");
      openTimerRef.current = null;
    }, OPEN_EYE_MS);
  }, [clearTimers]);

  useEffect(() => {
    const handleScrollTarget = () => {
      const scroller = document.querySelector<HTMLElement>("[data-site-scroll]");
      const hash =
        typeof window !== "undefined" && window.location.hash
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

    // Route changed: Ensure white eyelids fully blink shut before opening new page
    const elapsed = Date.now() - blinkStartTimeRef.current;
    const delayNeeded = isNavigatingRef.current
      ? Math.max(0, MIN_SHUT_TIME_MS - elapsed)
      : 0;

    let revealTimeout: ReturnType<typeof setTimeout> | null = null;
    if (delayNeeded > 0) {
      revealTimeout = setTimeout(() => {
        openEye();
      }, delayNeeded);
    } else {
      openEye();
    }

    const scrollTimer = setTimeout(handleScrollTarget, delayNeeded + 30);

    return () => {
      if (revealTimeout) clearTimeout(revealTimeout);
      clearTimeout(scrollTimer);
    };
  }, [pathname, openEye]);

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
          if (url.hash) return;
          return;
        }

        // Close the eye (white eyelids blink shut over current page)
        isNavigatingRef.current = true;
        blinkStartTimeRef.current = Date.now();
        setEyeState("blinking_shut");

        shutTimerRef.current = setTimeout(() => {
          if (isNavigatingRef.current) {
            setEyeState("shut");
            safetyTimerRef.current = setTimeout(() => {
              if (isNavigatingRef.current) {
                openEye();
              }
            }, MAX_SAFETY_MS);
          }
          shutTimerRef.current = null;
        }, CLOSE_EYE_MS);
      } catch {
        openEye();
      }
    };

    const handlePageShow = () => openEye();
    const handlePopState = () => openEye();

    document.removeEventListener("click", handleLinkClick, { capture: true });
    document.addEventListener("click", handleLinkClick, { capture: true });
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleLinkClick, { capture: true });
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      clearTimers();
    };
  }, [clearTimers, openEye]);

  const isEyeShut = eyeState === "blinking_shut" || eyeState === "shut";

  return (
    <>
      {/* Upper White Eyelid Shutter */}
      <div
        className="fixed top-0 left-0 right-0 h-[53vh] bg-white z-[99999] pointer-events-none"
        style={{
          borderBottomLeftRadius: "50% 20%",
          borderBottomRightRadius: "50% 20%",
          transform: isEyeShut ? "translateY(0%)" : "translateY(-105%)",
          transition: `transform ${isEyeShut ? CLOSE_EYE_MS : OPEN_EYE_MS}ms ${
            isEyeShut ? "cubic-bezier(0.76, 0, 0.24, 1)" : "cubic-bezier(0.16, 1, 0.3, 1)"
          }`,
          willChange: "transform",
        }}
      />

      {/* Lower White Eyelid Shutter */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[53vh] bg-white z-[99999] pointer-events-none"
        style={{
          borderTopLeftRadius: "50% 20%",
          borderTopRightRadius: "50% 20%",
          transform: isEyeShut ? "translateY(0%)" : "translateY(105%)",
          transition: `transform ${isEyeShut ? CLOSE_EYE_MS : OPEN_EYE_MS}ms ${
            isEyeShut ? "cubic-bezier(0.76, 0, 0.24, 1)" : "cubic-bezier(0.16, 1, 0.3, 1)"
          }`,
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

