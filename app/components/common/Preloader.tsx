"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FADE_DURATION_MS = 350;
const PRELOADER_DURATION_MS = 5_000;

export default function Preloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitingRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    setExiting(true);
    exitTimerRef.current = setTimeout(() => setVisible(false), FADE_DURATION_MS);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    const preloaderTimer = setTimeout(finish, PRELOADER_DURATION_MS);
    videoRef.current?.play().catch(finish);

    return () => {
      clearTimeout(preloaderTimer);
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
        loop
        playsInline
        preload="auto"
        onError={finish}
        aria-hidden="true"
        className="block h-auto max-h-[100dvh] w-full max-w-[400px] object-contain"
      >
        <source src="/video/preloader.webm" type="video/webm" />
      </video>
    </div>
  );
}


