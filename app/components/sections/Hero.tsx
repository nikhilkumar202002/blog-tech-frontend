"use client";

import React, { useEffect, useRef, useState } from "react";
import '../styles/Section.css'

export interface HeroSlide {
    id: number;
    headline: string;
    caption: string;
}

const heroSlides: HeroSlide[] = [
    {
        id: 1,
        headline: "Turning Ideas into Digital Solutions.",
        caption:
            "We bring ideas to life through practical technology and simple, user-friendly design, built around the way you work.",
    },
    {
        id: 2,
        headline: "Your Business. At Your Fingertips.",
        caption:
            "Powerful tools to keep your business connected, accessible, and within your control.",
    },
    {
        id: 3,
        headline: "Create. Connect. Grow",
        caption:
            "We build technology around your business needs, helping you work smarter, stay connected, and create new opportunities for growth.",
    },
    {
        id: 4,
        headline: "Built on Trust. Driven by Experience.",
        caption:
            "Trusted relationships and a deep understanding of business shape the way we work, as we continue to evolve with your changing needs.",
    },
];

export interface HeroProps {
    className?: string;
    autoPlayInterval?: number;
}

const Hero: React.FC<HeroProps> = ({
    className = "",
    autoPlayInterval = 5500,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Autoplay video initialization
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.defaultMuted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // Ignore autoplay restriction errors
                });
            }
        }
    }, []);

    // Slide rotation logic with smooth transition
    useEffect(() => {
        const timer = setInterval(() => {
            handleNextSlide();
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [currentIdx, autoPlayInterval]);

    const handleNextSlide = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIdx((prev) => (prev + 1) % heroSlides.length);
            setIsTransitioning(false);
        }, 300);
    };

    const handleSelectSlide = (idx: number) => {
        if (idx === currentIdx) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentIdx(idx);
            setIsTransitioning(false);
        }, 250);
    };

    const currentSlide = heroSlides[currentIdx];

    return (
        <section
            className={`relative w-full h-screen min-h-[100vh] flex items-center overflow-hidden ${className}`}
        >

            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover -z-10"
            >
                <source src="/video/blogtech-banner-video.webm" type="video/webm" />
                Your browser does not support HTML5 video.
            </video>

            <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-black/25 via-black/10 to-transparent pointer-events-none -z-10" />

            <div className="relative z-10 w-full mx-auto custom-container pt-16 md:pt-20">
                <div className="max-w-xl lg:max-w-2xl flex flex-col items-start text-left">

                    <div
                        className={`transition-all duration-300 transform ${isTransitioning
                            ? "opacity-0 -translate-y-2"
                            : "opacity-100 translate-y-0"
                            }`}
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-regular tracking-tight text-[#483527] leading-[1.12] drop-shadow-xs">
                            {currentSlide.headline}
                        </h1>

                        <p className="mt-4 md:mt-5 text-base sm:text-lg md:text-xl font-desc text-neutral-700 md:text-neutral-800 leading-relaxed max-w-lg">
                            {currentSlide.caption}
                        </p>
                    </div>

                    {/* Slide Indicator Bar & Navigation */}
                    <div className="mt-8 md:mt-10 flex items-center gap-2">
                        {heroSlides.map((slide, idx) => {
                            const isActive = idx === currentIdx;
                            return (
                                <button
                                    key={slide.id}
                                    onClick={() => handleSelectSlide(idx)}
                                    className={`group relative h-1.5 rounded-full transition-all duration-300 ${isActive
                                        ? "w-8 md:w-10 bg-[#A44B03]"
                                        : "w-2.5 md:w-3 bg-neutral-400/60 hover:bg-neutral-600"
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                >
                                    <span className="sr-only">Slide {idx + 1}</span>
                                </button>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;