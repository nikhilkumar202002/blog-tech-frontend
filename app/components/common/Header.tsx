"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface HeaderProps {
  position?: "fixed" | "absolute";
  fixed?: boolean;
  className?: string;
  activeItem?: string;
}

const navItems = [
  { label: "Home", href: "/#home", hasDropdown: false },
  { label: "About Us", href: "/#about", hasDropdown: false },
  { label: "Products", href: "/#services", hasDropdown: true },
  { label: "Services", href: "/#our-services", hasDropdown: true },
  { label: "Technology", href: "/#technology", hasDropdown: false },
  { label: "Contact Us", href: "/#footer-contact", hasDropdown: false },
];

export const BlogtecLogo: React.FC<{ className?: string; onClick?: () => void }> = ({
  className = "",
  onClick,
}) => {
  return (
    <Link href="/" onClick={onClick} className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/MAIN-LOGO.png"
        alt="Blogtec Software Logo"
        width={100}
        height={38}
        className="h-6 md:h-7 w-auto object-contain"
        priority
      />
    </Link>
  );
};

const Header: React.FC<HeaderProps> = ({
  position = "fixed",
  fixed = true,
  className = "",
  activeItem = "Home",
}) => {
  const [active, setActive] = useState(activeItem);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const frame = document.getElementById("site-frame");
    const previousInert = frame?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    if (frame) frame.inert = true;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = menuDialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", closeOnDesktop);

    return () => {
      if (frame) frame.inert = previousInert;
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileMenuOpen]);

  const isFixed = fixed !== undefined ? fixed : position === "fixed";

  const containerClasses = isFixed
    ? `fixed top-3 md:top-5 left-3 md:left-5 right-3 md:right-5 z-50 pointer-events-none ${className}`
    : `absolute top-0 left-0 right-0 z-50 pointer-events-none ${className}`;

  return (
    <header className={containerClasses}>
      <div className="relative w-full h-[62px] md:h-[80px]" inert={mobileMenuOpen} aria-hidden={mobileMenuOpen}>
        {/* Left: Logo situated exactly inside the frame's top-left tab (like TechwareLab) */}
        <div className="absolute left-2  top-2.5  pointer-events-auto flex items-center">
          <BlogtecLogo />
        </div>

        {/* Right: Floating Pill Navigation Bar */}
        <div className="absolute right-6 md:right-8 top-2 md:top-2.5 pointer-events-auto flex items-center">
          <nav className="hidden md:flex items-center bg-[#f1f1f1]/90 backdrop-blur-md px-2 py-1.5 rounded-2xl shadow-xs border border-black/[0.04]">
            {navItems.map((item) => {
              const isActive = active === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  className={`flex items-center gap-1 text-sm font-medium transition-all duration-150 ${isActive
                    ? "bg-[#A44B03] text-white px-4 py-1.5 rounded-lg shadow-xs"
                    : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/50 px-3.5 py-1.5 rounded-lg"
                    }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <svg
                      className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-white/90" : "text-neutral-500"
                        }`}
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="4 6 8 10 12 6" />
                    </svg>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu trigger */}
          <div className="pointer-events-auto flex md:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-menu"
              className="flex h-11 items-center gap-2.5 rounded-full border border-[#e5ded6] bg-white px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#44352b] shadow-sm transition-colors hover:bg-[#faf6f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A44B03]"
            >
              <span>Menu</span>
              <span className="flex w-4 flex-col items-end gap-1" aria-hidden="true">
                <span className="h-[1.5px] w-4 rounded-full bg-current" />
                <span className="h-[1.5px] w-2.5 rounded-full bg-current" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      {mobileMenuOpen && (
        <div
          ref={menuDialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="pointer-events-auto fixed inset-0 z-10 overflow-y-auto bg-[#fbf9f6] md:hidden"
        >
          <div className="mx-auto flex min-h-dvh max-w-2xl flex-col px-6 pb-7 pt-6 sm:px-10">
            <div className="flex items-center justify-between">
              <BlogtecLogo onClick={() => setMobileMenuOpen(false)} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  requestAnimationFrame(() => menuButtonRef.current?.focus());
                }}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border border-[#e5ded6] bg-white text-[#44352b] shadow-sm transition-colors hover:bg-[#faf0e6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A44B03]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>

            <div className="my-auto py-10">
              <p className="mb-5 font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.22em] text-[#A44B03]">
                Explore Blogtec
              </p>
              <nav id="mobile-site-menu" aria-label="Mobile navigation">
                {navItems.map((item, index) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      setActive(item.label);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={active === item.label ? "location" : undefined}
                    className="group flex min-h-14 items-center gap-4 border-b border-[#e5ded6] py-3 text-[#211d1a] transition-colors hover:text-[#A44B03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A44B03]"
                  >
                    <span className="w-6 self-start pt-1 font-[var(--font-inter)] text-[11px] font-medium tracking-[0.12em] text-[#A44B03]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 font-[var(--font-dm-sans)] text-[clamp(1.75rem,7.5vw,3rem)] font-medium leading-[1.08] tracking-[-0.04em]">
                      {item.label}
                    </span>
                    <svg className="h-5 w-5 flex-none text-[#A44B03] transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14m-6-6 6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </nav>
            </div>

            <p className="border-t border-[#e5ded6] pt-5 font-[var(--font-inter)] text-xs leading-relaxed text-[#70675f]">
              Technology built around the jewellery business.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
