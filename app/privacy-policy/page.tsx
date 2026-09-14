import type { Metadata } from "next";
import Link from "next/link";
import { PiArrowLeft, PiArrowUpRight } from "react-icons/pi";
import styles from "./privacy-policy.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Blogtec Software",
  description:
    "How Blogtec Software handles information related to website visits and enquiries.",
};

const contents = [
  { id: "scope", title: "About this policy" },
  { id: "information", title: "Information we receive" },
  { id: "use", title: "How we use information" },
  { id: "sharing", title: "When information is shared" },
  { id: "cookies", title: "Cookies and external content" },
  { id: "retention", title: "Retention and security" },
  { id: "choices", title: "Your choices" },
  { id: "children", title: "Children's information" },
  { id: "contact", title: "Contact and updates" },
];

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="privacy-title">
        <div className={styles.heroInner}>
          <Link className={styles.backLink} href="/">
            <PiArrowLeft aria-hidden="true" /> Back to home
          </Link>
          <p className={styles.eyebrow}>Blogtec Software / Legal</p>
          <h1 className={styles.title} id="privacy-title">
            Privacy <em>Policy.</em>
          </h1>
          <p className={styles.lead}>
            A clear view of how information is handled when you visit our website
            or get in touch with Blogtec Software.
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
            <nav className={styles.contentsNav} aria-label="Privacy policy sections">
              {contents.map((item, index) => (
                <a href={`#${item.id}`} key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.title}
                </a>
              ))}
            </nav>
            <div className={styles.sidebarContact}>
              <p>Questions about your information?</p>
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
              <h2>About this policy</h2>
            </div>
            <p>
              Blogtec Software (&ldquo;Blogtec,&rdquo; &ldquo;we,&rdquo; or
              &ldquo;us&rdquo;) provides this website to share information about
              our jewellery software and services. This policy describes how
              personal information connected with visits to this website and
              direct enquiries to us is handled.
            </p>
            <p>
              Information handled within a Blogtec product for a business
              customer may be subject to that customer&apos;s arrangements and
              separate product terms. This page focuses on the public website.
            </p>
          </section>

          <section className={styles.policySection} id="information">
            <div className={styles.sectionHeading}>
              <span>02</span>
              <h2>Information we receive</h2>
            </div>
            <ul>
              <li>
                <strong>Information you share with us.</strong> If you call or
                email us, we receive the details you choose to provide, such as
                your name, business name, email address, phone number, and the
                contents of your enquiry.
              </li>
              <li>
                <strong>Technical information.</strong> The systems that deliver
                and protect this website may process details such as your IP
                address, browser or device type, pages requested, access times,
                and error or security logs.
              </li>
            </ul>
          </section>

          <section className={styles.policySection} id="use">
            <div className={styles.sectionHeading}>
              <span>03</span>
              <h2>How we use information</h2>
            </div>
            <p>We use the information described above to:</p>
            <ul>
              <li>respond to enquiries and discuss products or services you request;</li>
              <li>operate, troubleshoot, and protect the website;</li>
              <li>maintain appropriate records of business communications; and</li>
              <li>meet applicable legal obligations.</li>
            </ul>
          </section>

          <section className={styles.policySection} id="sharing">
            <div className={styles.sectionHeading}>
              <span>04</span>
              <h2>When information is shared</h2>
            </div>
            <p>
              Website hosting, email, and other service providers may process
              information while providing their services to us. We may also
              disclose information where required by law or to respond to a
              lawful request. We do not make the details of your private enquiry
              public on this website.
            </p>
          </section>

          <section className={styles.policySection} id="cookies">
            <div className={styles.sectionHeading}>
              <span>05</span>
              <h2>Cookies and external content</h2>
            </div>
            <p>
              This website does not currently include advertising or analytics
              cookies in its own code. The services that deliver the site may
              still use technical storage or logs needed to operate it. You can
              manage cookies through your browser settings.
            </p>
            <p>
              Some images or links on this website may come from external
              services. When you load or visit their content, those services may
              receive technical information and apply their own privacy policies.
            </p>
          </section>

          <section className={styles.policySection} id="retention">
            <div className={styles.sectionHeading}>
              <span>06</span>
              <h2>Retention and security</h2>
            </div>
            <p>
              The time we keep information depends on why it was received and
              any applicable record-keeping obligations. We aim to keep it only
              for as long as reasonably needed for those purposes. We take
              reasonable steps to protect information, although no method of
              online transmission or storage is completely secure.
            </p>
          </section>

          <section className={styles.policySection} id="choices">
            <div className={styles.sectionHeading}>
              <span>07</span>
              <h2>Your choices</h2>
            </div>
            <p>
              You may contact us to ask about personal information you have
              provided, request a correction or deletion, or raise a privacy
              concern. We may need to verify your identity and may have to keep
              some information where the law requires it. Where a particular use
              depends on your consent, you can contact us to withdraw it.
            </p>
          </section>

          <section className={styles.policySection} id="children">
            <div className={styles.sectionHeading}>
              <span>08</span>
              <h2>Children&apos;s information</h2>
            </div>
            <p>
              This website is intended for people exploring business software,
              not for children. If you believe a child has shared personal
              information with us, please contact us so we can review it.
            </p>
          </section>

          <section className={styles.policySection} id="contact">
            <div className={styles.sectionHeading}>
              <span>09</span>
              <h2>Contact and updates</h2>
            </div>
            <p>
              For questions or requests about this policy, email us at{" "}
              <a href="mailto:blogtecsoftware@gmail.com">
                blogtecsoftware@gmail.com
              </a>
              . You can also write to Blogtec Software, 1st floor, Regent Court,
              62/4063, Chittoor Rd, Iyyattil Junction, Ernakulam South, Kochi,
              Kerala 682011.
            </p>
            <p>
              We may update this policy as the website or our practices change.
              The date at the top of the page shows when it was last updated.
            </p>
          </section>
        </article>
      </div>

      <div className={styles.closing}>
        <p>Still have a question?</p>
        <h2>We&apos;re here to help you understand.</h2>
        <a href="mailto:blogtecsoftware@gmail.com">
          Get in touch <PiArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
