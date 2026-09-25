"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../styles/Components.css";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "AURIX", href: "/our-products/aurix" },
      { label: "Aurown", href: "/our-products/aurown" },
      { label: "Scheme Mobile App", href: "/our-products/scheme-app" },
      { label: "Jewel Connect", href: "/our-products/jewel-connect" },
      { label: "Employee & Payroll", href: "/our-products/employee-payroll" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about-us" },
      { label: "Our Experience", href: "/#founder-story" },
      { label: "Our Approach", href: "/#platform" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "ERP Solutions", href: "/our-services" },
      { label: "Support & Maintenance", href: "/our-services" },
      { label: "Custom Software", href: "/our-services" },
      { label: "Data & System Management", href: "/our-services" },
      { label: "Mobile & Digital Solutions", href: "/our-services" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/") {
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

  return (
    <footer className="site-footer w-full flex-shrink-0">
      <div className="site-footer-container site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" prefetch={true} onClick={(e) => handleLinkClick(e, "/")} aria-label="Blogtec Software home">
            <Image
              src="/main-logo-320.png"
              alt="Blogtec Software"
              width={120}
              height={29}
              className="site-footer-logo"
            />
          </Link>
          <p>Create. Connect. Grow</p>
        </div>

        {footerColumns.map((column) => (
          <nav className="site-footer-column" aria-label={column.title} key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    prefetch={true}
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="site-footer-contact" id="footer-contact">
        <div className="site-footer-contact-cell site-footer-phones">
          <a href="tel:+917994455922">79944 55922</a>
          <a href="tel:+914844539025">0484 4539025</a>
        </div>
        <div className="site-footer-contact-cell site-footer-email">
          <a href="mailto:blogtecsoftware@gmail.com">blogtecsoftware@gmail.com</a>
        </div>
        <address className="site-footer-contact-cell site-footer-address">
          1st floor, Regent Court, 62/4063, Chittoor Rd, Iyyattil Junction,
          Ernakulam South, Kochi, Kerala 682011
        </address>
      </div>

      <div className="site-footer-container site-footer-bottom">
        <span>© {new Date().getFullYear()} Blogtec Software. All Rights Reserved.</span>
        <span className="site-footer-legal">
          <Link href="/terms-and-conditions" prefetch={true}>Terms &amp; Conditions</Link>{" "}
          <span aria-hidden="true">·</span>{" "}
          <Link href="/privacy-policy" prefetch={true}>Privacy Policy</Link>
        </span>
      </div>
    </footer>
  );
}
