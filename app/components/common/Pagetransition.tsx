"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const CLOSE_EYE_MS = 380;
const OPEN_EYE_MS = 450;
const NAVIGATION_KEY = "blogtec_page_transition";

function scrollToHash() {
  let hash = window.location.hash.slice(1);
  try {
    hash = decodeURIComponent(hash);
  } catch {

  }

  document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
}

export default function Pagetransition({ children }: { children: React.ReactNode }) {
  const [isEyeShut, setIsEyeShut] = useState(false);
  const isNavigatingRef = useRef(false);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearNavigationTimer = useCallback(() => {
    if (navigationTimerRef.current !== null) {
      clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = null;
    }
  }, []);

  const openEye = useCallback(() => {
    clearNavigationTimer();
    isNavigatingRef.current = false;
    setIsEyeShut(false);
  }, [clearNavigationTimer]);

  useEffect(() => {
   
    if (document.documentElement.classList.contains("page-transition-pending")) {
      requestAnimationFrame(() => {
        setIsEyeShut(true);
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("page-transition-pending");
          requestAnimationFrame(openEye);
        });
      });
    } else if (window.location.hash) {
      requestAnimationFrame(scrollToHash);
    }

    const handleLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>("a[href]")
          : null;
      const rawHref = anchor?.getAttribute("href");

      if (
        !anchor ||
        !rawHref ||
        rawHref === "#" ||
        rawHref.startsWith("#") ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target.toLowerCase() !== "_self")
      ) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (!/^https?:$/.test(url.protocol) || url.origin !== window.location.origin) {
        return;
      }

      const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
      const targetPath = url.pathname.replace(/\/$/, "") || "/";
      const isSamePage =
        currentPath === targetPath && window.location.search === url.search;

      if (isSamePage) {
        if (url.hash && url.hash !== window.location.hash) {
          event.preventDefault();
          window.history.pushState(null, "", url.hash);
          scrollToHash();
        }
        return;
      }

      event.preventDefault();
      if (isNavigatingRef.current) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.location.assign(url.href);
        return;
      }

      isNavigatingRef.current = true;
      setIsEyeShut(true);
      navigationTimerRef.current = setTimeout(() => {
        navigationTimerRef.current = null;
        try {
          sessionStorage.setItem(NAVIGATION_KEY, "1");
        } catch {
          // Navigation still works when session storage is unavailable.
        }
        window.location.assign(url.href);
      }, CLOSE_EYE_MS);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        document.documentElement.classList.remove("page-transition-pending");
        openEye();
      }
    };

    document.addEventListener("click", handleLinkClick, true);
    window.addEventListener("pageshow", handlePageShow);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      window.removeEventListener("pageshow", handlePageShow);
      clearNavigationTimer();
    };
  }, [clearNavigationTimer, openEye]);

  return (
    <>
      {/* Frame clips both shutters to its shape. */}
      {(["top", "bottom"] as const).map((edge) => (
        <div
          key={edge}
          aria-hidden="true"
          data-page-shutter={edge}
          className={`fixed left-0 right-0 h-[51dvh] bg-white z-[99999] pointer-events-none ${
            edge === "top" ? "top-0" : "bottom-0"
          }`}
          style={{
            transform: isEyeShut
              ? "translateY(0%)"
              : `translateY(${edge === "top" ? "-" : ""}105%)`,
            transition: `transform ${
              isEyeShut ? CLOSE_EYE_MS : OPEN_EYE_MS
            }ms ${
              isEyeShut
                ? "cubic-bezier(0.76, 0, 0.24, 1)"
                : "cubic-bezier(0.16, 1, 0.3, 1)"
            }`,
            willChange: "transform",
          }}
        />
      ))}
      {children}
    </>
  );
}
