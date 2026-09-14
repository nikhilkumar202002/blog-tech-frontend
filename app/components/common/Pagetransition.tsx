"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Pagetransition.module.css";

type Phase = "idle" | "closing" | "covered" | "opening";

const CLOSE_MS = 700;
const OPEN_MS = 950;
const NAVIGATION_TIMEOUT_MS = 4000;

export default function Pagetransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const previousPathRef = useRef(pathname);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const frameRef = useRef<number | null>(null);

  const changePhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhase(next);
  }, []);

  const clearTimers = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  const openPage = useCallback(() => {
    if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    changePhase("opening");
    openTimerRef.current = setTimeout(() => changePhase("idle"), OPEN_MS);
  }, [changePhase]);

  useEffect(() => {
    if (previousPathRef.current === pathname) return;
    previousPathRef.current = pathname;

    clearTimers();

    const scroller = document.querySelector<HTMLElement>("#site-frame [data-site-scroll]");
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const target = hash ? document.getElementById(hash) : null;
    if (target) target.scrollIntoView();
    else if (scroller) scroller.scrollTop = 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      changePhase("idle");
      return;
    }

    changePhase("covered");
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = requestAnimationFrame(openPage);
    });
  }, [pathname, changePhase, clearTimers, openPage]);

  useEffect(() => {
    const handleLinkClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) return;

      const link = event.target instanceof Element
        ? event.target.closest<HTMLAnchorElement>("a[href]")
        : null;
      if (
        !link ||
        link.hasAttribute("download") ||
        link.hasAttribute("data-no-page-transition") ||
        (link.target && link.target !== "_self")
      ) return;

      const destination = new URL(link.href, window.location.href);
      if (
        destination.origin !== window.location.origin ||
        !["http:", "https:"].includes(destination.protocol) ||
        destination.pathname === window.location.pathname
      ) return;

      event.preventDefault();
      if (phaseRef.current !== "idle") return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        routerRef.current.push(destination.pathname + destination.search + destination.hash);
        return;
      }

      changePhase("closing");
      closeTimerRef.current = setTimeout(() => {
        changePhase("covered");
        routerRef.current.push(destination.pathname + destination.search + destination.hash);
        navigationTimerRef.current = setTimeout(openPage, NAVIGATION_TIMEOUT_MS);
      }, CLOSE_MS);
    };

    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      clearTimers();
    };
  }, [changePhase, clearTimers, openPage]);

  return (
    <div className={styles.stage}>
      <div className={styles.aperture} data-phase={phase} aria-busy={phase !== "idle"}>
        {children}
      </div>
    </div>
  );
}
