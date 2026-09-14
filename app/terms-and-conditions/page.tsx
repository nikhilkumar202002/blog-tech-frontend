import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowLeft, PiArrowUpRight } from "react-icons/pi";
import styles from "../components/styles/LegalPage.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | Blogtec Software",
  description:
    "Terms for using the Blogtec Software website and its informational content.",
};

const contents = [
  { id: "scope", title: "About these terms" },
  { id: "content", title: "Website information" },
  { id: "use", title: "Acceptable use" },
  { id: "ownership", title: "Intellectual property" },
  { id: "enquiries", title: "Product and service enquiries" },
  { id: "external", title: "External links and content" },
  { id: "availability", title: "Availability and responsibility" },
  { id: "privacy", title: "Privacy" },
  { id: "contact", title: "Changes and contact" },
];

export default function TermsAndConditionsPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="terms-title">
        <div className={styles.heroInner}>
          <Link className={styles.backLink} href="/">
            <PiArrowLeft aria-hidden="true" /> Back to home
          </Link>
          <p className={styles.eyebrow}>Blogtec Software / Legal</p>
          <h1 className={styles.title} id="terms-title">
            Terms &amp; <em>Conditions.</em>
          </h1>
          <p className={styles.lead}>
            The terms that apply when you browse our website and explore what
            Blogtec Software offers.
          </p>
          <p className={styles.updated}>
            <span className={styles.updatedDot} aria-hidden="true" />
            Last updated <time dateTime="2026-09-14">14 September 2026</time>
          </p>
        </div>
      </section>

      <div className={styles.content}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <h2 className={styles.sidebarTitle}>On this page</h2>
            <nav className={styles.contentsNav} aria-label="Terms and conditions sections">
              {contents.map((item, index) => (
                <a href={`#${item.id}`} key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </a>
              ))}
            </nav>
            <div className={styles.sidebarContact}>
              <p>Have a question about these terms?</p>
              <a href="mailto:blogtecsoftware@gmail.com">
                Email our team <PiArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </aside>

        <article className={styles.article}>
          <section className={styles.policySection} id="scope">
            <div className={styles.sectionHeading}>
              <span>01</span>
              <h2>About these terms</h2>
            </div>
            <p>
              These Terms &amp; Conditions apply to your use of the public
              Blogtec Software website. By using the website, you agree to
              follow these terms. If you do not agree, please do not use it.
            </p>
            <p>
              These terms cover the website and its content. Any software,
              implementation, maintenance, or other services you obtain from us
              are governed by the separate terms agreed for those services.
            </p>
          </section>

          <section className={styles.policySection} id="content">
            <div className={styles.sectionHeading}>
              <span>02</span>
              <h2>Website information</h2>
            </div>
            <p>
              We provide information about our jewellery software, products,
              and services to help you decide whether to contact us. The website
              is for general information; it is not a binding offer or a
              substitute for a written proposal or agreement.
            </p>
            <p>
              Product features, availability, and service details may change.
              Please speak with our team to confirm what is available and what
              would be included in a proposed engagement.
            </p>
          </section>

          <section className={styles.policySection} id="use">
            <div className={styles.sectionHeading}>
              <span>03</span>
              <h2>Acceptable use</h2>
            </div>
            <p>You may use this website for lawful, legitimate purposes. Please do not:</p>
            <ul>
              <li>attempt to gain unauthorised access to the website or its systems;</li>
              <li>interfere with its operation, security, or other visitors&apos; use;</li>
              <li>send malicious code or use the website to spread harmful content; or</li>
              <li>misrepresent your identity when contacting us through the website.</li>
            </ul>
          </section>

          <section className={styles.policySection} id="ownership">
            <div className={styles.sectionHeading}>
              <span>04</span>
              <h2>Intellectual property</h2>
            </div>
            <p>
              The website&apos;s text, design, graphics, branding, and other
              materials belong to Blogtec Software or their respective owners.
              You may view and share links to the website for personal or
              internal business use. Please obtain permission before copying,
              republishing, or using its content or branding for another purpose,
              except where applicable law allows it.
            </p>
          </section>

          <section className={styles.policySection} id="enquiries">
            <div className={styles.sectionHeading}>
              <span>05</span>
              <h2>Product and service enquiries</h2>
            </div>
            <p>
              You can contact us using the details on this website. An enquiry
              does not, by itself, place an order or establish a software or
              services agreement. We will discuss requirements, scope, and any
              applicable commercial terms with you separately.
            </p>
            <p>
              Please avoid sending customer records, payment details, or other
              sensitive business information in an initial general enquiry.
            </p>
          </section>

          <section className={styles.policySection} id="external">
            <div className={styles.sectionHeading}>
              <span>06</span>
              <h2>External links and content</h2>
            </div>
            <p>
              This website may include links to other websites or content
              provided by third parties. Those services operate under their own
              terms and privacy practices. We do not control their content or
              availability.
            </p>
          </section>

          <section className={styles.policySection} id="availability">
            <div className={styles.sectionHeading}>
              <span>07</span>
              <h2>Availability and responsibility</h2>
            </div>
            <p>
              We aim to keep the website useful and accurate, but it may be
              unavailable at times or contain information that needs updating.
              We may change or remove website content as our offerings evolve.
            </p>
            <p>
              To the extent permitted by applicable law, the website is provided
              without a guarantee of uninterrupted access or that every detail
              is error-free. Nothing in these terms limits rights or
              responsibilities that cannot lawfully be limited.
            </p>
          </section>

          <section className={styles.policySection} id="privacy">
            <div className={styles.sectionHeading}>
              <span>08</span>
              <h2>Privacy</h2>
            </div>
            <p>
              Our <Link href="/privacy-policy">Privacy Policy</Link> explains
              how information related to visits and enquiries is handled. Please
              read it alongside these terms.
            </p>
          </section>

          <section className={styles.policySection} id="contact">
            <div className={styles.sectionHeading}>
              <span>09</span>
              <h2>Changes and contact</h2>
            </div>
            <p>
              We may update these terms when the website or our practices
              change. The date at the top of this page shows the latest update.
              If you have a question, email us at{" "}
              <a href="mailto:blogtecsoftware@gmail.com">
                blogtecsoftware@gmail.com
              </a>
              . You can also write to Blogtec Software, 1st floor, Regent Court,
              62/4063, Chittoor Rd, Iyyattil Junction, Ernakulam South, Kochi,
              Kerala 682011.
            </p>
          </section>
        </article>
      </div>

      <div className={styles.closing}>
        <p>Need a clearer answer?</p>
        <h2>Let&apos;s talk through the details.</h2>
        <a href="mailto:blogtecsoftware@gmail.com">
          Get in touch <PiArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
