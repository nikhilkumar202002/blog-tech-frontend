"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMapPin, FiBriefcase, FiClock, FiArrowRight } from "react-icons/fi";
import { getCareers } from "@/app/utils/career";

export interface CareerItem {
  id: number | string;
  title: string;
  slug: string;
  department?: string | null;
  category?: string | { name?: string } | null;
  location?: string | null;
  employment_type?: string | null;
  type?: string | null;
  experience?: string | null;
  experience_level?: string | null;
  short_description?: string | null;
  description?: string | null;
}

const CareersGrid: React.FC = () => {
  const [jobs, setJobs] = useState<CareerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCareers = async () => {
      try {
        const res = await getCareers();
        const items: CareerItem[] = Array.isArray(res?.data) ? res.data : [];
        if (isMounted) {
          setJobs(items);
        }
      } catch (err) {
        console.error("Failed to fetch careers:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCareers();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full pt-28 md:pt-36 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="site-container w-full max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-medium text-[#737373] font-[var(--font-dm-sans)] uppercase tracking-widest mb-3 block">
            OPEN POSITIONS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-[48px] lg:text-[58px] font-medium tracking-tight text-[#202020] leading-[1.08] font-[var(--font-dm-sans)] mb-5">
            Build Your{" "}
            <span
              style={{ fontFamily: "var(--font-cormorant-garamond), serif" }}
              className="italic font-normal text-[#A44B03]"
            >
              Career
            </span>{" "}
            With Us
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto font-[var(--font-dm-sans)]">
            Explore current opportunities at Blogtec and join a team crafting reliable
            enterprise and jewellery software solutions.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white/85 border border-stone-200/80 rounded-3xl p-7 animate-pulse space-y-4"
              >
                <div className="h-5 w-28 bg-stone-200 rounded-full" />
                <div className="h-7 w-3/4 bg-stone-200 rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-stone-100 rounded-md" />
                  <div className="h-4 w-5/6 bg-stone-100 rounded-md" />
                </div>
                <div className="h-5 w-36 bg-stone-100 rounded-md pt-2" />
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, idx) => {
              const department =
                job.department ||
                (typeof job.category === "string"
                  ? job.category
                  : job.category?.name);
              const rawJobType = job.employment_type || job.type;
              const jobType = rawJobType ? rawJobType.replace(/_/g, " ") : null;
              const exp = job.experience || job.experience_level;
              const rawSummary = job.short_description || job.description || "";
              const summary = rawSummary
                .replace(/<[^>]+>/g, " ")
                .replace(/\s+/g, " ")
                .trim();

              return (
                <motion.div
                  key={job.id ?? job.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <Link
                    href={`/careers/${job.slug}`}
                    className="group flex flex-col justify-between h-full bg-white/90 border border-stone-200/90 hover:border-[#A44B03]/50 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:shadow-md"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {department && (
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#A44B03] bg-[#FAF2E4] px-3 py-1 rounded-full font-[var(--font-dm-sans)]">
                            {department}
                          </span>
                        )}
                        {jobType && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium capitalize text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-[var(--font-dm-sans)]">
                            <FiBriefcase className="w-3 h-3" />
                            {jobType}
                          </span>
                        )}
                      </div>

                      <h2 className="text-xl sm:text-2xl font-medium text-stone-900 group-hover:text-[#A44B03] transition-colors mb-2.5 font-[var(--font-dm-sans)]">
                        {job.title}
                      </h2>

                      {summary && (
                        <p className="text-sm sm:text-[15px] text-stone-500 leading-relaxed line-clamp-3 font-[var(--font-inter)]">
                          {summary}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-500 font-[var(--font-dm-sans)]">
                        {job.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <FiMapPin className="w-3.5 h-3.5 text-[#A44B03]" />
                            {job.location}
                          </span>
                        )}
                        {exp && (
                          <span className="inline-flex items-center gap-1.5">
                            <FiClock className="w-3.5 h-3.5 text-[#A44B03]" />
                            {exp}
                          </span>
                        )}
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A44B03] group-hover:translate-x-1 transition-transform font-[var(--font-dm-sans)]">
                        <span>View Details</span>
                        <FiArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 border border-stone-200/80 rounded-3xl p-10 text-center">
            <p className="text-stone-600 text-base font-[var(--font-dm-sans)]">
              No open positions at the moment. You can still share your profile below.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareersGrid;
