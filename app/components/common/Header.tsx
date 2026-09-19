"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface HeaderProps {
  position?: "fixed" | "absolute";
  fixed?: boolean;
  className?: string;
  activeItem?: string;
}

const navItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "About Us", href: "/about-us", hasDropdown: false },
  { label: "Products", href: "#", hasDropdown: true },
  { label: "Services", href: "/our-services", hasDropdown: true },
  { label: "Technology", href: "/#technology", hasDropdown: false },
  { label: "Contact Us", href: "/contact-us", hasDropdown: false },
];

export interface DropdownItem {
  label: string;
  href: string;
  description: string;
}

const PRODUCTS_DROPDOWN: DropdownItem[] = [
  {
    label: "AURIX",
    href: "/our-products/aurix",
    description: "Jewellery ERP & POS Management Solution",
  },
  {
    label: "Jewel Connect",
    href: "/our-products/jewel-connect",
    description: "Digital Catalogue & Barcode Stock Availability",
  },
  {
    label: "Scheme Mobile App",
    href: "/our-products/scheme-app",
    description: "Customer Savings & Installment Tracking",
  },
  {
    label: "Employee & Payroll",
    href: "/our-products/employee-payroll",
    description: "Staff Attendance, Salary & HR Management",
  },
  {
    label: "Aurown",
    href: "/our-products/aurown",
    description: "Business Operations & Executive Dashboard",
  },
];

const SERVICES_DROPDOWN: DropdownItem[] = [
  {
    label: "Jewellery ERP Solutions",
    href: "/our-services",
    description: "Enterprise Operations for Jewellery Stores",
  },
  {
    label: "Jewel Connect Platform",
    href: "/our-products/jewel-connect",
    description: "Digital Catalogue & Barcode Stock Availability",
  },
  {
    label: "Support & Maintenance",
    href: "/our-services",
    description: "24/7 Technical Care & System Updates",
  },
  {
    label: "Custom Software",
    href: "/our-services",
    description: "Tailored Development & Workflows",
  },
  {
    label: "Data & System Management",
    href: "/our-services",
    description: "Cloud Infrastructure & Data Migration",
  },
  {
    label: "Mobile & Digital Solutions",
    href: "/our-services",
    description: "Apps for Store Owners, Employees & Clients",
  },
];

export const BlogtecLogo: React.FC<{ className?: string; onClick?: () => void }> = ({
  className = "",
  onClick,
}) => {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();
    if (pathname === "/") {
      e.preventDefault();
      const scroller = document.querySelector<HTMLElement>("[data-site-scroll]");
      if (scroller) {
        scroller.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <Link href="/" prefetch={true} onClick={handleLogoClick} className={`inline-flex items-center select-none ${className}`}>
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
  const pathname = usePathname();
  const [active, setActive] = useState(activeItem);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"Products" | "Services" | null>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname === "/about-us") {
      setActive("About Us");
    } else if (pathname === "/contact-us") {
      setActive("Contact Us");
    } else if (pathname.startsWith("/our-products")) {
      setActive("Products");
    } else if (pathname.startsWith("/our-services")) {
      setActive("Services");
    } else if (pathname === "/") {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash === "#technology") {
        setActive("Technology");
      } else {
        setActive("Home");
      }
    }
  }, [pathname]);

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

  const handleMouseEnter = (label: string, hasDropdown?: boolean) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (hasDropdown && (label === "Products" || label === "Services")) {
      setOpenDropdown(label as "Products" | "Services");
    } else {
      setOpenDropdown(null);
    }
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: { label: string; href: string; hasDropdown?: boolean }
  ) => {
    if (item.label === "Products" || item.href === "#") {
      e.preventDefault();
      setActive(item.label);
      setOpenDropdown((prev) => (prev === item.label ? null : (item.label as "Products" | "Services")));
      return;
    }

    setActive(item.label);
    setOpenDropdown(null);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (item.href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        const scroller = document.querySelector<HTMLElement>("[data-site-scroll]");
        if (scroller) {
          scroller.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    if (item.href.includes("#")) {
      const [path, hash] = item.href.split("#");
      const targetPath = path || "/";

      if (pathname === targetPath || (pathname === "" && targetPath === "/")) {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }
  };

  const handleSubItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    parentLabel: string
  ) => {
    setActive(parentLabel);
    setOpenDropdown(null);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }

    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";

      if (pathname === targetPath || (pathname === "" && targetPath === "/")) {
        const element = document.getElementById(hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    }
  };

  const isFixed = fixed !== undefined ? fixed : position === "fixed";

  const containerClasses = isFixed
    ? `fixed top-3 md:top-5 left-3 md:left-5 right-3 md:right-5 z-50 pointer-events-none ${className}`
    : `absolute top-0 left-0 right-0 z-50 pointer-events-none ${className}`;

  return (
    <header className={containerClasses}>
      <div className="relative w-full h-[62px] md:h-[80px]" inert={mobileMenuOpen} aria-hidden={mobileMenuOpen}>
        {/* Left: Logo situated inside top-left frame tab */}
        <div className="absolute left-2 top-2.5 pointer-events-auto flex items-center">
          <BlogtecLogo />
        </div>

        {/* Right: Floating Navigation Bar */}
        <div className="absolute right-6 md:right-8 top-2 md:top-2.5 pointer-events-auto flex items-center">
          <nav className="hidden md:flex items-center bg-[#f1f1f1]/90 backdrop-blur-md px-2 py-1.5 rounded-2xl shadow-xs border border-black/[0.04]">
            {navItems.map((item) => {
              const isActive = active === item.label;
              const isDropdownOpen = openDropdown === item.label;
              const dropdownList = item.label === "Products" ? PRODUCTS_DROPDOWN : item.label === "Services" ? SERVICES_DROPDOWN : null;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label, item.hasDropdown)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    prefetch={true}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-150 ${isActive
                      ? "bg-[#A44B03] text-white px-4 py-1.5 rounded-lg shadow-xs"
                      : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-200/50 px-3.5 py-1.5 rounded-lg"
                      }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""} ${isActive ? "text-white/90" : "text-neutral-500"
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
                  </Link>

                  {/* Desktop Floating Dropdown Menu */}
                  {item.hasDropdown && dropdownList && isDropdownOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[560px] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onMouseEnter={() => handleMouseEnter(item.label, true)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-2xl rounded-2xl p-3">
                        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#A44B03] font-[var(--font-inter)] border-b border-stone-100 mb-2">
                          Blogtec {item.label}
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {dropdownList.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              prefetch={true}
                              onClick={(e) => handleSubItemClick(e, sub.href, item.label)}
                              className="group/item flex flex-col p-2.5 rounded-xl hover:bg-[#A44B03]/[0.06] transition-colors"
                            >
                              <div className="flex items-center justify-between text-xs font-semibold text-stone-900 group-hover/item:text-[#A44B03]">
                                <span>{sub.label}</span>
                                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-[#A44B03]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              <span className="text-[11px] text-stone-500 font-normal leading-snug mt-0.5">
                                {sub.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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

            <div className="my-auto py-8">
              <p className="mb-4 font-[var(--font-inter)] text-xs font-semibold uppercase tracking-[0.22em] text-[#A44B03]">
                Explore Blogtec
              </p>
              <nav id="mobile-site-menu" aria-label="Mobile navigation" className="space-y-1">
                {navItems.map((item, index) => {
                  const dropdownList = item.label === "Products" ? PRODUCTS_DROPDOWN : item.label === "Services" ? SERVICES_DROPDOWN : null;
                  return (
                    <div key={item.label} className="border-b border-[#e5ded6] py-2">
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={(e) => handleNavClick(e, item)}
                        aria-current={active === item.label ? "location" : undefined}
                        className="group flex min-h-12 items-center gap-4 text-[#211d1a] transition-colors hover:text-[#A44B03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A44B03]"
                      >
                        <span className="w-6 self-start pt-1 font-[var(--font-inter)] text-[11px] font-medium tracking-[0.12em] text-[#A44B03]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 font-[var(--font-dm-sans)] text-[clamp(1.5rem,6.5vw,2.5rem)] font-medium leading-[1.08] tracking-[-0.04em]">
                          {item.label}
                        </span>
                        <svg className="h-5 w-5 flex-none text-[#A44B03] transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14m-6-6 6 6-6 6" />
                        </svg>
                      </Link>

                      {/* Mobile Sub-Links List */}
                      {dropdownList && (
                        <div className="pl-10 pr-2 pt-1 pb-2 space-y-2">
                          {dropdownList.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              prefetch={true}
                              onClick={(e) => handleSubItemClick(e, sub.href, item.label)}
                              className="block py-1 text-xs font-medium text-stone-600 hover:text-[#A44B03] transition-colors"
                            >
                              • {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
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

