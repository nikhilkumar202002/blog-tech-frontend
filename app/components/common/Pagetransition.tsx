"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Pagetransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll on the frame container when changing pages
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
  }, [pathname]);

  return <>{children}</>;
}

