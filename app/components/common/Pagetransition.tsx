"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const CLOSE_EYE_MS = 380;
const OPEN_EYE_MS = 450;
const MIN_SHUT_TIME_MS = 340;
const MAX_WAIT_MS = 15_000;

// Isolate URL observation so static exports still include the page HTML.
function RouteObserver({ onCommit }: { onCommit: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    onCommit();
  }, [pathname, searchParams, onCommit]);
  return null;
}

function scrollToDestination() {
  let hash = window.location.hash.slice(1);
  try {
    hash = decodeURIComponent(hash);
  } catch {
    // A malformed escape sequence must not leave the shutters closed.
  }
  const target = hash ? document.getElementById(hash) : null;
  if (target) {
    target.scrollIntoView({ behavior: "instant" });
    return;
  }
  const scroller = document.querySelector<HTMLElement>("[data-site-scroll]");
  if (scroller) scroller.scrollTo({ top: 0, behavior: "instant" });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

export default function Pagetransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isEyeShut, setIsEyeShut] = useState(false);
  const navigationRef = useRef<{ closedAt: number; pushed: boolean } | null>(null);
  const shutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    for (const timer of [shutTimerRef, revealTimerRef, safetyTimerRef]) {
      if (timer.current !== null) clearTimeout(timer.current);
      timer.current = null;
    }
  }, []);

  const openEye = useCallback(() => {
    clearTimers();
    navigationRef.current = null;
    setIsEyeShut(false);
  }, [clearTimers]);

  const handleRouteCommit = useCallback(() => {
    const navigation = navigationRef.current;
    if (navigation && !navigation.pushed) return;
    clearTimers();
    const delay = navigation
      ? Math.max(0, MIN_SHUT_TIME_MS - (performance.now() - navigation.closedAt))
      : 0;
    revealTimerRef.current = setTimeout(() => {
      // Position the new page while covered; preserve history scroll restoration.
      if (navigation || window.location.hash) scrollToDestination();
      openEye();
    }, delay);
  }, [clearTimers, openEye]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (!anchor || anchor.hasAttribute("download") ||
          (anchor.target && anchor.target.toLowerCase() !== "_self") ||
          anchor.getAttribute("href")?.startsWith("#")) return;
      const url = new URL(anchor.href, window.location.href);
      if (!/^https?:$/.test(url.protocol) || url.origin !== window.location.origin) return;

      // Prevent a second click from bypassing the pending transition.
      if (navigationRef.current) {
        event.preventDefault();
        return;
      }
      const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
      const targetPath = url.pathname.replace(/\/$/, "") || "/";
      if (currentPath === targetPath && window.location.search === url.search) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      clearTimers();
      const destination = url.pathname + url.search + url.hash;
      navigationRef.current = { closedAt: 0, pushed: false };
      setIsEyeShut(true);
      shutTimerRef.current = setTimeout(() => {
        shutTimerRef.current = null;
        if (!navigationRef.current) return;
        navigationRef.current.closedAt = performance.now();
        navigationRef.current.pushed = true;
        // Release a stalled overlay without racing Next with a document reload.
        safetyTimerRef.current = setTimeout(openEye, MAX_WAIT_MS);
        try {
          router.push(destination, { scroll: false });
        } catch {
          openEye();
          window.location.assign(destination);
        }
      }, CLOSE_EYE_MS);
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) openEye();
    };
    document.addEventListener("click", handleLinkClick, true);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", openEye);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", openEye);
      clearTimers();
      navigationRef.current = null;
    };
  }, [clearTimers, openEye, router]);

  return (
    <>
      <Suspense fallback={null}>
        <RouteObserver onCommit={handleRouteCommit} />
      </Suspense>
      {/* Render outside Frame's clip path and stacking context. */}
      {(["top", "bottom"] as const).map((edge) => (
        <div
          key={edge}
          aria-hidden="true"
          data-page-shutter={edge}
          className={`fixed left-0 right-0 h-[51dvh] bg-white z-[99999] pointer-events-none ${edge === "top" ? "top-0" : "bottom-0"}`}
          style={{
            transform: isEyeShut ? "translateY(0%)" : `translateY(${edge === "top" ? "-" : ""}105%)`,
            transition: `transform ${isEyeShut ? CLOSE_EYE_MS : OPEN_EYE_MS}ms ${
              isEyeShut ? "cubic-bezier(0.76, 0, 0.24, 1)" : "cubic-bezier(0.16, 1, 0.3, 1)"
            }`,
            willChange: "transform",
          }}
        />
      ))}
      {children}
    </>
  );
}
