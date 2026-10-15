"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiUploadCloud,
  FiCheckCircle,
  FiChevronDown,
  FiFileText,
  FiArrowLeft,
} from "react-icons/fi";
import Button from "@/app/components/common/Button";

export interface CareerFormProps {
  className?: string;
}

const INITIAL_FORM_DATA = {
  fullName: "",
  email: "",
  phone: "",
  areaOfInterest: "",
  experience: "",
  portfolioUrl: "",
  aboutYourself: "",
  additionalMessage: "",
  consent: false,
};

const CareerForm: React.FC<CareerFormProps> = ({ className = "" }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<{
    fullName: string;
    email: string;
    areaOfInterest: string;
    fileName?: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const summary = {
      fullName: formData.fullName,
      email: formData.email,
      areaOfInterest: formData.areaOfInterest,
      fileName: selectedFile?.name,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSummary(summary);
      setSubmitted(true);
      if (formCardRef.current) {
        formCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 1000);
  };

  const handleBackToForm = () => {
    // Clear all form inputs
    setFormData(INITIAL_FORM_DATA);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setSubmitted(false);
    setSubmittedSummary(null);

    // Scroll to the top of the form
    setTimeout(() => {
      if (formCardRef.current) {
        formCardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  return (
    <section
      className={`w-full pt-20 md:pt-28 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
    >
      <div className="site-container w-full max-w-6xl mx-auto">
        
        {/* Section Header (Centered, 2 Lines) */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium text-[#737373] font-[var(--font-dm-sans)] uppercase tracking-widest mb-3 block">
            JOIN OUR TEAM
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[54px] xl:text-[64px] 2xl:text-[74px] font-medium tracking-tight text-[#202020] leading-[1.08] font-[var(--font-dm-sans)] mb-5">
            Don&apos;t See a Role?<br />
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Send Us
            </span>{" "}
            Your Profile.
          </h1>

          <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto font-[var(--font-dm-sans)]">
            We welcome applications from people who believe their skills and experience
            could contribute to Blogtec. Tell us a little about yourself, your experience and
            the kind of work you&apos;re interested in.
          </p>
        </div>

        {/* Modern Form Card */}
        <div
          ref={formCardRef}
          className="bg-white/85 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden transition-all duration-300 hover:border-[#A44B03]/40"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="py-8 sm:py-14 text-center max-w-xl mx-auto"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-100/70 text-emerald-800 mb-4 font-[var(--font-dm-sans)]">
                Application Received
              </span>

              <h3 className="text-2xl sm:text-3xl font-medium text-stone-900 mb-3 font-[var(--font-dm-sans)]">
                Thank You{submittedSummary?.fullName ? `, ${submittedSummary.fullName}` : ""}!
              </h3>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed mb-6 font-[var(--font-dm-sans)] max-w-md mx-auto">
                Your application has been received successfully. Our recruitment team will review your profile and contact you regarding potential opportunities.
              </p>

              {/* Submission Summary Box */}
              {submittedSummary && (
                <div className="bg-stone-50/90 border border-stone-200/80 rounded-2xl p-5 mb-8 text-left space-y-3 font-[var(--font-dm-sans)]">
                  <div className="text-xs uppercase tracking-wider font-semibold text-stone-400 pb-1 border-b border-stone-200/60">
                    Submission Details
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-stone-500 font-medium">Applicant:</span>
                    <span className="text-stone-800 font-semibold">{submittedSummary.fullName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-stone-500 font-medium">Email:</span>
                    <span className="text-stone-800 font-semibold">{submittedSummary.email}</span>
                  </div>
                  {submittedSummary.areaOfInterest && (
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-stone-500 font-medium">Area of Interest:</span>
                      <span className="text-stone-800 font-semibold">{submittedSummary.areaOfInterest}</span>
                    </div>
                  )}
                  {submittedSummary.fileName && (
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-stone-500 font-medium">Resume Attached:</span>
                      <span className="text-stone-800 font-semibold flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-[260px]">
                        <FiFileText className="w-3.5 h-3.5 text-[#A44B03] shrink-0" />
                        <span className="truncate">{submittedSummary.fileName}</span>
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
                    <span className="text-stone-500 font-medium">Status:</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Under Review
                    </span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleBackToForm}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#A44B03] hover:bg-[#8b3f02] text-white text-sm font-medium transition-all shadow-md hover:shadow-lg active:scale-[0.98] w-full sm:w-auto cursor-pointer"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span>Back to Form</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information Fields */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="fullName" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <FiUser className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-stone-900 text-sm placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
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
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-stone-900 text-sm placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <FiPhone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="w-full bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-stone-900 text-sm placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-stone-100" />

              {/* Section 2: Professional Information */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-[var(--font-dm-sans)] mb-4">
                  Professional Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Area of Interest */}
                  <div>
                    <label htmlFor="areaOfInterest" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Area of Interest *
                    </label>
                    <div className="relative">
                      <select
                        id="areaOfInterest"
                        name="areaOfInterest"
                        required
                        value={formData.areaOfInterest}
                        onChange={handleInputChange}
                        className="w-full bg-stone-50/70 border border-stone-200 rounded-xl px-4 py-3 pr-10 text-stone-900 text-sm focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all appearance-none"
                      >
                        <option value="">Select an area</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile Development">Mobile Development</option>
                        <option value="Testing / QA">Testing / QA</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                        <FiChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Years of Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Years of Experience
                    </label>
                    <div className="relative">
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full bg-stone-50/70 border border-stone-200 rounded-xl px-4 py-3 pr-10 text-stone-900 text-sm focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all appearance-none"
                      >
                        <option value="">Select experience</option>
                        <option value="Fresh Graduate / 0 Years">Fresh Graduate / 0 Years</option>
                        <option value="1-2 Years">1-2 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5-8 Years">5-8 Years</option>
                        <option value="8+ Years">8+ Years</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-stone-400">
                        <FiChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Portfolio / LinkedIn URL */}
                  <div className="sm:col-span-2">
                    <label htmlFor="portfolioUrl" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Portfolio / LinkedIn URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <FiGlobe className="w-4 h-4" />
                      </div>
                      <input
                        type="url"
                        id="portfolioUrl"
                        name="portfolioUrl"
                        value={formData.portfolioUrl}
                        onChange={handleInputChange}
                        placeholder="https://"
                        className="w-full bg-stone-50/70 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-stone-900 text-sm placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-stone-100" />

              {/* Section 3: Application & Resume */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 font-[var(--font-dm-sans)] mb-4">
                  Application
                </h3>

                <div className="space-y-6">
                  {/* Tell us about yourself */}
                  <div>
                    <label htmlFor="aboutYourself" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Tell us about yourself *
                    </label>
                    <textarea
                      id="aboutYourself"
                      name="aboutYourself"
                      required
                      rows={4}
                      value={formData.aboutYourself}
                      onChange={handleInputChange}
                      placeholder="Briefly tell us about your experience, skills and what you'd like to contribute at Blogtec."
                      className="w-full bg-stone-50/70 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all resize-none"
                    />
                  </div>

                  {/* Upload Resume */}
                  <div>
                    <label htmlFor="resume" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Upload Resume *
                    </label>
                    <div className="relative border-2 border-dashed border-stone-200 hover:border-[#A44B03]/50 rounded-2xl p-6 text-center bg-stone-50/40 hover:bg-stone-50 transition-all group cursor-pointer">
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="resume"
                        name="resume"
                        required={!selectedFile}
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center justify-center pointer-events-none">
                        <div className="p-3 bg-stone-100 group-hover:bg-[#A44B03]/10 text-stone-500 group-hover:text-[#A44B03] rounded-full mb-3 transition-colors">
                          <FiUploadCloud className="w-6 h-6" />
                        </div>
                        {selectedFile ? (
                          <div className="flex items-center gap-2 text-stone-900 font-medium text-sm">
                            <FiFileText className="w-4 h-4 text-[#A44B03]" />
                            <span>{selectedFile.name}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm font-semibold text-stone-800 mb-1">
                              Choose File <span className="font-normal text-stone-500">or drag and drop</span>
                            </p>
                            <p className="text-xs text-stone-400">
                              PDF, DOC or DOCX · Max 5 MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label htmlFor="additionalMessage" className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">
                      Additional Message
                    </label>
                    <textarea
                      id="additionalMessage"
                      name="additionalMessage"
                      rows={3}
                      value={formData.additionalMessage}
                      onChange={handleInputChange}
                      placeholder="Anything else you'd like us to know?"
                      className="w-full bg-stone-50/70 border border-stone-200 rounded-xl px-4 py-3 text-stone-900 text-sm placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#A44B03] focus:ring-1 focus:ring-[#A44B03] transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-stone-100" />

              {/* Section 4: Consent & Submit */}
              <div className="space-y-6">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-1 h-4 w-4 rounded border-stone-300 text-[#A44B03] focus:ring-[#A44B03] cursor-pointer"
                  />
                  <span className="text-xs sm:text-sm text-stone-600 font-[var(--font-dm-sans)] leading-relaxed">
                    I confirm that the information provided is accurate and that Blogtec may contact
                    me regarding potential career opportunities.
                  </span>
                </label>

                <div>
                  <Button
                    type="submit"
                    text={isSubmitting ? "Submitting Application..." : "Submit Application"}
                    className="w-full sm:w-auto"
                  />
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};

export default CareerForm;
