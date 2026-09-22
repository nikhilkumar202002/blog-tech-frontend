"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const FADE_DURATION_MS = 350;
const PRELOADER_DURATION_MS = 3_500; // Target 3.5s (3 to 4 seconds range)

export default function Preloader() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitingRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    try {
      sessionStorage.setItem("blogtec_preloaded", "true");
    } catch {
      // Ignore quota or security errors
    }
    setExiting(true);
    exitTimerRef.current = setTimeout(() => setVisible(false), FADE_DURATION_MS);
  }, []);

  const adjustPlaybackSpeed = useCallback((video: HTMLVideoElement) => {
    if (video.duration && !isNaN(video.duration) && video.duration > 0) {
      // Scale playback speed to fit the 3.5s target window (3-4 seconds)
      const targetSec = PRELOADER_DURATION_MS / 1000;
      video.playbackRate = Math.max(0.5, video.duration / targetSec);
    } else {
      video.playbackRate = 1.43; // Default speed for ~5s video to finish in ~3.5s
    }
  }, []);

  useEffect(() => {
    // Skip preloader if already played in this browser session
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem("blogtec_preloaded")) {
        setVisible(false);
        return;
      }
    } catch {
      // Fallback if sessionStorage is disabled
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      return;
    }

    if (videoRef.current) {
      adjustPlaybackSpeed(videoRef.current);
    }

    const preloaderTimer = setTimeout(finish, PRELOADER_DURATION_MS);
    videoRef.current?.play().catch(finish);

    return () => {
      clearTimeout(preloaderTimer);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    };
  }, [finish, adjustPlaybackSpeed]);

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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#fdfdfd] overflow-hidden select-none transition-opacity duration-[350ms] motion-reduce:hidden ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center w-full max-w-[400px] max-h-[100dvh] overflow-hidden leading-none">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            adjustPlaybackSpeed(e.currentTarget);
          }}
          onEnded={finish}
          onError={finish}
          aria-hidden="true"
          className="block h-auto max-h-[100dvh] w-full max-w-[400px] object-contain outline-none border-0 ring-0 translate-z-0 scale-[1.01]"
        >
          <source src="/video/preloader.mp4" type="video/mp4" />
          <source src="/video/hero-banner-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}




