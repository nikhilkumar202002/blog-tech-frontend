"use client";

import React, { useState } from "react";
import RippleBackground from "../components/ui/RippleBackground";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <RippleBackground theme="light" className="min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A44B03]/10 border border-[#A44B03]/25 text-[#A44B03] text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#A44B03] animate-pulse" />
            Get In Touch
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 tracking-tight font-[var(--font-cormorant-garamond)] mb-4">
            Let&apos;s Build Something <span className="text-[#A44B03] italic">Extraordinary</span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg font-[var(--font-dm-sans)] font-normal leading-relaxed">
            Have a question, an idea, or need custom technology solutions for your business? 
            Move your cursor across the page to experience the interactive ripple effect and reach out below.
          </p>
        </div>

        {/* Content Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-200/50 relative overflow-hidden transition-all duration-300 hover:border-[#A44B03]/40">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#A44B03]/10 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 font-[var(--font-cormorant-garamond)] mb-2">
              Send Us a Message
            </h2>
            <p className="text-stone-500 text-sm mb-8">
              Fill in your details and our team will get back to you within 24 hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-8 backdrop-blur-md">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">Message Sent Successfully!</h3>
                <p className="text-stone-600 text-sm mb-6">
                  Thank you for reaching out. We look forward to partnering with you.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-[#A44B03] hover:bg-[#8b3f02] text-white text-sm font-semibold transition-all duration-200 shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Input */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm"
                    />
                  </div>

                  {/* Subject Select */}
                  <div>
                    <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                      Topic / Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Jewellery Tech Solutions">Jewellery Tech Solutions</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Support & Maintenance">Support & Maintenance</option>
                    </select>
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm resize-none"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#A44B03] hover:bg-[#8b3f02] text-white font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#A44B03]/25 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Card 1 */}
            <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:border-[#A44B03]/40">
              <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-cormorant-garamond)] mb-6 flex items-center gap-3">
                <span className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl border border-[#A44B03]/20">
                  📍
                </span>
                Our Headquarters
              </h3>
              
              <div className="space-y-4 text-stone-600 text-sm">
                <p className="leading-relaxed">
                  <strong className="text-stone-900 block mb-1">Blogtec Software Solutions</strong>
                  123 Tech Park Avenue, Suite 400<br />
                  Silicon Valley &amp; Regional Operations
                </p>
                
                <div className="pt-4 border-t border-stone-100 flex items-center gap-3 text-stone-600">
                  <span className="text-[#A44B03]">🕒</span>
                  <span>Monday – Friday: 9:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Info Card 2 */}
            <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:border-[#A44B03]/40">
              <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-cormorant-garamond)] mb-6 flex items-center gap-3">
                <span className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl border border-[#A44B03]/20">
                  ✉️
                </span>
                Direct Communication
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs uppercase tracking-wider text-stone-400 block mb-1">Email Us</span>
                  <a href="mailto:info@blogtec.com" className="text-[#A44B03] hover:text-[#8b3f02] font-semibold transition-colors">
                    info@blogtec.com
                  </a>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <span className="text-xs uppercase tracking-wider text-stone-400 block mb-1">Call Us</span>
                  <a href="tel:+18001234567" className="text-stone-900 font-semibold hover:text-[#A44B03] transition-colors">
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
            </div>

            {/* Support Highlight Pill */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#A44B03]/10 to-white/90 border border-[#A44B03]/25 backdrop-blur-md shadow-md">
              <div className="flex items-center gap-3 text-stone-900 font-semibold text-base mb-1">
                <span className="text-[#A44B03]">⚡</span>
                <span>Dedicated Enterprise Support</span>
              </div>
              <p className="text-stone-600 text-xs leading-relaxed">
                Need immediate technical assistance or specialized jewellery management support? Our support engineers are available round-the-clock.
              </p>
            </div>

          </div>

        </div>
      </div>
    </RippleBackground>
  );
}
