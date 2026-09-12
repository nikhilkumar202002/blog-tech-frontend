"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export interface HeaderProps {
  position?: "fixed" | "absolute";
  fixed?: boolean;
  className?: string;
  activeItem?: string;
}

const navItems = [
  { label: "Home", href: "#", hasDropdown: false },
  { label: "About Us", href: "#", hasDropdown: false },
  { label: "Products", href: "#", hasDropdown: true },
  { label: "Services", href: "#", hasDropdown: true },
  { label: "Technology", href: "#", hasDropdown: false },
  { label: "Contact Us", href: "#", hasDropdown: false },
];

export const BlogtecLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <Link href="/" className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/MAIN-LOGO.png"
        alt="Blogtec Software Logo"
        width={100}
        height={38}
        className="h-5 md:h-6 w-auto object-contain"
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

  const isFixed = fixed !== undefined ? fixed : position === "fixed";

  const containerClasses = isFixed
    ? `fixed top-3 md:top-5 left-3 md:left-5 right-3 md:right-5 z-50 pointer-events-none ${className}`
    : `absolute top-0 left-0 right-0 z-50 pointer-events-none ${className}`;

  return (
    <header className={containerClasses}>
      <div className="relative w-full h-[62px] md:h-[70px]">
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

          {/* Mobile Hamburger Button */}
          <div className="pointer-events-auto flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#f1f1f1] text-neutral-800 border border-black/[0.06] hover:bg-neutral-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto md:hidden mx-4 mt-2 p-3 bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-neutral-200/80 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const isActive = active === item.label;
            return (
              <button
                key={item.label}
                onClick={() => {
                  setActive(item.label);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl text-left transition-colors ${isActive
                  ? "bg-[#A44B03] text-white"
                  : "text-neutral-800 hover:bg-neutral-100"
                  }`}
              >
                <span>{item.label}</span>
                {item.hasDropdown && (
                  <svg
                    className="w-4 h-4 opacity-70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
