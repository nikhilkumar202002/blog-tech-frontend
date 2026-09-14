"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FADE_DURATION_MS = 350;
const MAX_WAIT_MS = 15_000;

export default function Preloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitingRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    if (exitingRef.current) return;

    try {
      sessionStorage.setItem("has_seen_preloader", "true");
    } catch {
      // Ignore storage errors
    }

    exitingRef.current = true;
    setExiting(true);
    exitTimerRef.current = setTimeout(() => setVisible(false), FADE_DURATION_MS);
  }, []);

  useEffect(() => {
    const isReload =
      typeof window !== "undefined" &&
      (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming)?.type === "reload";

    const hasSeenPreloader =
      typeof window !== "undefined" &&
      sessionStorage.getItem("has_seen_preloader") === "true";

    if (isReload || hasSeenPreloader) {
      setVisible(false);
      return;
    }

    try {
      sessionStorage.setItem("has_seen_preloader", "true");
    } catch {
      // Ignore storage errors
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionTimer = setTimeout(() => setVisible(false), 0);
      return () => clearTimeout(reducedMotionTimer);
    }

    const fallbackTimer = setTimeout(finish, MAX_WAIT_MS);
    videoRef.current?.play().catch(finish);

    return () => {
      clearTimeout(fallbackTimer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [finish]);

  useEffect(() => {
    if (!visible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var isReload = performance.getEntriesByType && performance.getEntriesByType('navigation')[0] && performance.getEntriesByType('navigation')[0].type === 'reload';
                var hasSeen = sessionStorage.getItem('has_seen_preloader') === 'true';
                if (isReload || hasSeen) {
                  var style = document.createElement('style');
                  style.innerHTML = '#preloader-root { display: none !important; }';
                  document.head.appendChild(style);
                }
              } catch(e) {}
            })();
          `,
        }}
      />
      <div
        id="preloader-root"
        role="status"
        aria-label="Loading website"
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfdfd] transition-opacity duration-[350ms] motion-reduce:hidden ${
          exiting ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          onEnded={finish}
          onError={finish}
          aria-hidden="true"
          className="block h-auto max-h-[100dvh] w-full max-w-[400px] object-contain"
        >
          <source src="/video/preloader.webm" type="video/webm" />
        </video>
      </div>
    </>
  );
}

