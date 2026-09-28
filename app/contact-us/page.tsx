"use client";

import React, { useState } from "react";

import {
  FiSmartphone,
  FiPhoneCall,
  FiMail,
  FiMapPin,
  FiNavigation,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiUser,
  FiMessageSquare,
  FiChevronDown,
} from "react-icons/fi";
import {
  FaWhatsapp,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa6";

import { sendContactMessage } from "@/app/utils/service";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      if (!phoneRegex.test(formData.phone.trim()) || formData.phone.trim().length < 7) {
        newErrors.phone = "Please enter a valid phone number.";
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please select a topic/subject.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactMessage(formData);
      setSuccessMessage("Your message has been sent successfully. We will get back to you shortly!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
      setErrors({});
    } catch (err: any) {
      console.error("Contact API error:", err);
      const apiMessage =
        err?.response?.data?.message ||
        "Failed to send your message. Please try again or contact us directly.";
      setErrorMessage(apiMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF7F2] pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header Title Section (60vh Height) */}
        <div className="min-h-[55vh] flex flex-col justify-center items-center text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <span className="text-xs sm:text-sm font-medium text-[#737373] font-[var(--font-dm-sans)] uppercase tracking-widest mb-3">
            Contact Us
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-[56px] lg:text-[68px] xl:text-[76px] 2xl:text-[84px] font-medium tracking-tight text-[#202020] font-[var(--font-dm-sans)] leading-[1.05]">
            Let&apos;s Create<br />
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic text-[#A44B03]"
            >
              Something Great.
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base md:text-lg text-neutral-600 font-[var(--font-dm-sans)] font-normal leading-relaxed max-w-2xl mx-auto">
            We don&apos;t just build software, we create solutions that drive real results. From streamlining operations to boosting efficiency, our platform has empowered businesses across industries to achieve their goals.
          </p>
        </div>

        {/* Content Grid: Sticky Contact Form (Left) + Real Contact Details (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Sticky Contact Form (7 cols) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28 bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-stone-200/50 relative overflow-hidden transition-all duration-300 hover:border-[#A44B03]/40">
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#A44B03]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl">
                <FiMessageSquare className="w-5 h-5" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-stone-900 font-[var(--font-dm-sans)]">
                Send Us a Message
              </h2>
            </div>
            
            <p className="text-stone-500 text-sm mb-8">
              Fill in your details below and our team will get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Your Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <FiUser className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-stone-50 border ${errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'} rounded-xl pl-10 pr-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm`}
                    />
                  </div>
                  {errors.name && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.name}</p>}
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-stone-50 border ${errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'} rounded-xl pl-10 pr-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm`}
                    />
                  </div>
                  {errors.email && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <FiSmartphone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 79944 55922"
                      className={`w-full bg-stone-50 border ${errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'} rounded-xl pl-10 pr-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm`}
                    />
                  </div>
                  {errors.phone && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                </div>

                {/* Subject Select */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                    Topic / Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-stone-50 border ${errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'} rounded-xl px-4 py-3 pr-10 text-stone-900 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm appearance-none`}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Jewellery Tech Solutions">Jewellery Tech Solutions</option>
                      <option value="Custom Software Development">Custom Software Development</option>
                      <option value="Support & Maintenance">Support & Maintenance</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                      <FiChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  {errors.subject && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.subject}</p>}
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  className={`w-full bg-stone-50 border ${errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-stone-200'} rounded-xl px-4 py-3 text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all text-sm resize-none`}
                />
                {errors.message && <p className="text-rose-500 text-xs mt-1 font-medium">{errors.message}</p>}
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
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Success / Error Messages positioned directly below submit button */}
              {successMessage && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-3 animate-fadeIn">
                  <FiCheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {errorMessage && (
                <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-3 animate-fadeIn">
                  <FiAlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Real Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Direct Reach (Mobile, Landline, Email, WhatsApp) */}
            <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:border-[#A44B03]/40">
              <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-dm-sans)] mb-6 flex items-center gap-3">
                <span className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl border border-[#A44B03]/20">
                  <FiPhoneCall className="w-5 h-5" />
                </span>
                Get In Touch
              </h3>

              <div className="space-y-4 text-sm">
                {/* Mobile */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-stone-100 text-[#A44B03] rounded-lg mt-0.5">
                    <FiSmartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Mobile</span>
                    <a href="tel:7994455922" className="text-stone-900 font-semibold hover:text-[#A44B03] transition-colors">
                      +91 79944 55922
                    </a>
                  </div>
                </div>

                {/* Land Line */}
                <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                  <div className="p-2 bg-stone-100 text-[#A44B03] rounded-lg mt-0.5">
                    <FiPhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Land Line</span>
                    <a href="tel:04844539025" className="text-stone-900 font-semibold hover:text-[#A44B03] transition-colors">
                      04844 539025
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                  <div className="p-2 bg-stone-100 text-[#A44B03] rounded-lg mt-0.5">
                    <FiMail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">Email</span>
                    <a href="mailto:blogtecsoftware@gmail.com" className="text-[#A44B03] font-semibold hover:text-[#8b3f02] transition-colors break-all">
                      blogtecsoftware@gmail.com
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3 pt-3 border-t border-stone-100">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mt-0.5">
                    <FaWhatsapp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-400 block font-medium">WhatsApp</span>
                    <a
                      href="https://wa.me/917994455922"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
                    >
                      +91 79944 55922
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Address & Google Map */}
            <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:border-[#A44B03]/40">
              <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-dm-sans)] mb-4 flex items-center gap-3">
                <span className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl border border-[#A44B03]/20">
                  <FiMapPin className="w-5 h-5" />
                </span>
                Office Address
              </h3>

              <p className="text-stone-700 text-sm leading-relaxed mb-5 font-normal">
                1st Floor, Regent Court, 62/4063, Chittoor Rd, Iyyattil Junction, Ernakulam South, Kochi, Ernakulam, Kerala 682011
              </p>

              <a
                href="https://maps.google.com/?q=1st+Floor,+Regent+Court,+62/4063,+Chittoor+Rd,+Iyyattil+Junction,+Ernakulam+South,+Kochi,+Ernakulam,+Kerala+682011"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-md"
              >
                <FiNavigation className="w-3.5 h-3.5 text-[#A44B03]" />
                <span>Open Google Map Link</span>
              </a>
            </div>

            {/* Card 3: Open Hours */}
            <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:border-[#A44B03]/40">
              <h3 className="text-xl font-semibold text-stone-900 font-[var(--font-dm-sans)] mb-4 flex items-center gap-3">
                <span className="p-2.5 bg-[#A44B03]/10 text-[#A44B03] rounded-xl border border-[#A44B03]/20">
                  <FiClock className="w-5 h-5" />
                </span>
                Open Hours
              </h3>

              <div className="space-y-3 text-sm text-stone-700">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="font-medium text-stone-900">Monday – Friday</span>
                  <span className="text-xs font-semibold text-[#A44B03] bg-[#A44B03]/10 px-2.5 py-1 rounded-full">
                    9:30 AM – 7:00 PM
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium text-stone-900">2nd &amp; 4th Saturdays</span>
                  <span className="text-xs font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                    9:30 AM – 5:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Social Media Links */}
            <div className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/50 transition-all duration-300 hover:border-[#A44B03]/40">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-500 mb-4">
                Connect With Us
              </h3>

              <div className="flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/BlogtecSoftwarellp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-3 bg-stone-100 hover:bg-[#1877F2] hover:text-white text-stone-700 rounded-2xl transition-all duration-200 shadow-sm"
                >
                  <FaFacebook className="w-5 h-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/blogtec_software"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-3 bg-stone-100 hover:bg-[#E4405F] hover:text-white text-stone-700 rounded-2xl transition-all duration-200 shadow-sm"
                >
                  <FaInstagram className="w-5 h-5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/blogtec-software-llp/?originalSubdomain=in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="p-3 bg-stone-100 hover:bg-[#0A66C2] hover:text-white text-stone-700 rounded-2xl transition-all duration-200 shadow-sm"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
