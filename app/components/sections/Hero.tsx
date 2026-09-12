"use client";

import React, { useEffect, useRef } from "react";

export interface HeroProps {
    className?: string;
    children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ className = "", children }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.defaultMuted = true;
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                });
            }
        }
    }, []);

    return (
        <section
            className={`relative w-full h-screen min-h-[100vh] flex items-center justify-center overflow-hidden ${className}`}
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

            <div className="absolute inset-0 bg-black/15 pointer-events-none" />

            {children && (
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pointer-events-auto">
                    {children}
                </div>
            )}
        </section>
    );
};

export default Hero;