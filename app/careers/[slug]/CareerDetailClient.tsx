"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowLeft, FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";
import { getCareerBySlug } from "@/app/utils/career";
import CareerForm from "@/app/components/sections/careers/CareerForm";

interface CareerDetail {
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
  qualification?: string | null;
  skills?: string[] | null;
  short_description?: string | null;
  description?: string | null;
  content?: string | null;
  responsibilities?: string | string[] | null;
  requirements?: string | string[] | null;
}

export default function CareerDetailClient() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [job, setJob] = useState<CareerDetail | null>(null);
  const [loading, setLoading] = useState(Boolean(slug));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    let isMounted = true;
    const fetchCareer = async () => {
      try {
        const res = await getCareerBySlug(slug);
        if (isMounted) {
          setJob(res?.data ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch career details:", err);
        if (isMounted) {
          setError("Job opening not found.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCareer();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-screen bg-[#FAF7F2] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="site-container max-w-6xl mx-auto space-y-6 animate-pulse">
          <div className="h-6 w-36 bg-stone-200 rounded-md" />
          <div className="bg-white rounded-3xl p-8 space-y-4">
            <div className="h-9 w-2/3 bg-stone-200 rounded-md" />
            <div className="h-4 w-full bg-stone-100 rounded-md" />
            <div className="h-4 w-5/6 bg-stone-100 rounded-md" />
          </div>
          <div className="bg-white rounded-3xl p-8 h-[380px]" />
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="w-full min-h-screen bg-[#FAF7F2] pt-36 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="site-container max-w-6xl mx-auto text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl font-medium text-stone-900 font-[var(--font-dm-sans)]">
            {error || "Job opening not found."}
          </h1>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A44B03] hover:underline font-[var(--font-dm-sans)]"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to All Openings</span>
          </Link>
        </div>
      </main>
    );
  }

  const department =
    job.department ||
    (typeof job.category === "string" ? job.category : job.category?.name);
  const rawJobType = job.employment_type || job.type;
  const jobType = rawJobType ? rawJobType.replace(/_/g, " ") : null;
  const exp = job.experience || job.experience_level;
  const descriptionHtml = job.description || job.short_description;

  const richTextClasses =
    "text-stone-600 text-sm sm:text-base font-[var(--font-inter)] leading-relaxed space-y-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2 [&_li_p]:m-0 [&_strong]:text-stone-900 [&_strong]:font-semibold [&_h2]:text-xl [&_h2]:font-medium [&_h2]:text-stone-900 [&_h2]:mt-6 [&_h2]:font-[var(--font-dm-sans)] [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-stone-900 [&_h3]:mt-4 [&_h3]:font-[var(--font-dm-sans)]";

  const renderSectionList = (
    heading: string,
    value?: string | string[] | null
  ) => {
    if (!value || (Array.isArray(value) && value.length === 0)) return null;
    return (
      <div className="pt-6 border-t border-stone-100">
        <h2 className="text-lg sm:text-xl font-medium text-stone-900 mb-3 font-[var(--font-dm-sans)]">
          {heading}
        </h2>
        {Array.isArray(value) ? (
          <ul className="list-disc pl-5 space-y-2 text-stone-600 text-sm sm:text-base font-[var(--font-inter)]">
            {value.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <div
            className={richTextClasses}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>
    );
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF7F2] pt-28 md:pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="site-container max-w-6xl mx-auto space-y-10">
        <Link
          href="/careers"
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-[#A44B03] transition-colors font-[var(--font-dm-sans)]"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to All Openings</span>
        </Link>

        {/* Job Details Card */}
        <article className="bg-white/90 border border-stone-200/90 rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            {department && (
              <span className="text-xs font-semibold uppercase tracking-wider text-[#A44B03] bg-[#FAF2E4] px-3 py-1 rounded-full font-[var(--font-dm-sans)]">
                {department}
              </span>
            )}
            {jobType && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium capitalize text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-[var(--font-dm-sans)]">
                <FiBriefcase className="w-3.5 h-3.5" />
                {jobType}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-[var(--font-dm-sans)]">
                <FiMapPin className="w-3.5 h-3.5 text-[#A44B03]" />
                {job.location}
              </span>
            )}
            {exp && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-100 px-3 py-1 rounded-full font-[var(--font-dm-sans)]">
                <FiClock className="w-3.5 h-3.5 text-[#A44B03]" />
                {exp}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-medium text-stone-900 tracking-tight leading-tight font-[var(--font-dm-sans)]">
            {job.title}
          </h1>

          {descriptionHtml && (
            <div
              className={richTextClasses}
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}

          {job.content && (
            <div
              className={`pt-4 border-t border-stone-100 ${richTextClasses}`}
              dangerouslySetInnerHTML={{ __html: job.content }}
            />
          )}

          {renderSectionList("Key Responsibilities", job.responsibilities)}
          {renderSectionList("Requirements", job.requirements)}

          {job.qualification && (
            <div className="pt-6 border-t border-stone-100">
              <h2 className="text-lg sm:text-xl font-medium text-stone-900 mb-2 font-[var(--font-dm-sans)]">
                Qualification
              </h2>
              <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-[var(--font-inter)]">
                {job.qualification}
              </p>
            </div>
          )}

          {Array.isArray(job.skills) && job.skills.length > 0 && (
            <div className="pt-6 border-t border-stone-100">
              <h2 className="text-lg sm:text-xl font-medium text-stone-900 mb-3 font-[var(--font-dm-sans)]">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-sm font-medium text-[#A44B03] bg-[#FAF2E4] px-3.5 py-1.5 rounded-full font-[var(--font-dm-sans)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Application Form (without Area of Interest & Years of Experience) */}
        <section className="space-y-4">
          <div className="px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#A44B03] font-[var(--font-dm-sans)]">
              APPLY NOW
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-stone-900 mt-1 font-[var(--font-dm-sans)]">
              Apply for {job.title}
            </h2>
          </div>

          <CareerForm
            compact
            jobTitle={job.title}
            defaultAreaOfInterest={department || job.title}
          />
        </section>
      </div>
    </main>
  );
}
