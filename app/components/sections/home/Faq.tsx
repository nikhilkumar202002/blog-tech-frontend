"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import "@/app/components/styles/Section.css";

const questions = [
  {
    question: "What is Blogtec Jewellery ERP?",
    answer:
      "Blogtec Jewellery ERP is a business management platform designed specifically for jewellery businesses. It brings essential operations such as inventory, billing, purchasing, customer management, accounting, gold schemes, branch management, and reporting into one connected system.",
  },
  {
    question: "Is Blogtec ERP designed specifically for jewellery businesses?",
    answer:
      "Yes. Blogtec is built around the day-to-day needs of jewellery businesses, including stock, sales, billing, customer records, and scheme management.",
  },
  {
    question: "What can I manage with Blogtec Jewellery ERP?",
    answer:
      "You can manage core workflows such as inventory, sales, purchases, customers, accounts, schemes, and business reporting from one platform.",
  },
  {
    question: "Can Blogtec manage multiple jewellery branches?",
    answer:
      "Blogtec supports branch management so you can keep track of operations and reporting across locations.",
  },
  {
    question: "Can Blogtec handle jewellery inventory and product tracking?",
    answer:
      "Yes. Inventory and product information can be organized and tracked to help your team see what is available and where it is needed.",
  },
  {
    question: "How is my business data managed?",
    answer:
      "Our data and system management services cover database maintenance, migration, and optimization to help keep your information reliable.",
  },
  {
    question: "Can I manage gold schemes through Blogtec?",
    answer:
      "Yes. Blogtec includes solutions for managing jewellery schemes, and customers can track installments through the branded scheme app.",
  },
  {
    question: "Can Blogtec integrate accounting with business operations?",
    answer:
      "Accounting can be connected with everyday business activity so financial information and operational records stay in one system.",
  },
  {
    question: "Can we migrate our existing data to Blogtec?",
    answer:
      "Yes. Our team can help plan and carry out data migration as part of moving your business to Blogtec.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "The timeline depends on your current systems, data, branches, and the workflows you need. We can outline a practical schedule after reviewing your requirements.",
  },
  {
    question: "Do you provide training for our staff?",
    answer:
      "We can guide your team through the system during onboarding and provide ongoing technical support as they start using it.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-title">
      <div className="site-container">
        <div className="faq-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
            className="faq-header"
          >
            <span className="faq-eyebrow">FAQ</span>
            <h2 className="faq-title" id="faq-title">
              Everything You Need to Know
              <br className="faq-title-break" />
              {" "}Before <span className="faq-title-accent">Getting Started.</span>
            </h2>
            <p className="faq-intro">
              Have questions about Blogtec Jewellery ERP, implementation, or how it fits your business?
              <br className="faq-intro-break" /> Here are some of the questions jewellery businesses ask us most often.
            </p>
          </motion.div>

          <div className="faq-list">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              const questionId = `faq-question-${index + 1}`;
              const answerId = `faq-answer-${index + 1}`;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                  className={`faq-item${isOpen ? " is-open" : ""}`}
                >
                  <h3 className="faq-question">
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      <span>
                        {String(index + 1).padStart(2, "0")}. {item.question}
                      </span>
                      <span className="faq-icon" aria-hidden="true">
                        <FiChevronDown />
                      </span>
                    </button>
                  </h3>
                  <div
                    className="faq-answer"
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    hidden={!isOpen}
                  >
                    <p>{item.answer}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

