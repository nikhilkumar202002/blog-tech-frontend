"use client";

import React, { useEffect, useId, useRef, useState } from "react";

export interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    className?: string;
    contentClassName?: string;

    fixed?: boolean;
    frameColor?: string;
    borderColor?: string;
    borderWidth?: number;
    headerSlot?: React.ReactNode;
    fixedInset?: string;
}

function calculateFramePath(width: number, height: number): string {

    const w = Math.max(width, 320);
    const h = Math.max(height, 200);
    const r = 22;
    const leftShoulderH = 38;
    const leftShoulderW = 105;
    const leftRiseW = 28;
    const leftRiseEnd = leftShoulderW + leftRiseW;

    return [
        `M 0,${leftShoulderH + r}`,
        `A ${r},${r} 0 0,1 ${r},${leftShoulderH}`,
        `L ${leftShoulderW},${leftShoulderH}`,
        `C ${leftShoulderW + leftRiseW * 0.4},${leftShoulderH} ${leftRiseEnd - leftRiseW * 0.45},0 ${leftRiseEnd},0`,
        `L ${w - r},0`,
        `A ${r},${r} 0 0,1 ${w},${r}`,
        `L ${w},${h - r}`,
        `A ${r},${r} 0 0,1 ${w - r},${h}`,
        `L ${r},${h}`,
        `A ${r},${r} 0 0,1 0,${h - r}`,
        `Z`,
    ].join(" ");
}

const Frame: React.FC<FrameProps> = ({
    children,
    className = "",
    contentClassName = "",
    fixed = true,
    frameColor = "#ffffff",
    borderColor = "none",
    borderWidth = 0,
    headerSlot,
    fixedInset = "inset-3 md:inset-5",
    style,
    ...rest
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const rawId = useId();
    const clipId = `frame-clip-${rawId.replace(/:/g, "")}`;
    const [size, setSize] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setSize({
                    width: Math.round(rect.width),
                    height: Math.round(rect.height),
                });
            }
        };

        updateSize();

        const resizeObserver = new ResizeObserver(() => {
            updateSize();
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const pathD = size
        ? calculateFramePath(size.width, size.height)
        : calculateFramePath(1000, 600);

    const containerClasses = fixed
        ? `fixed ${fixedInset} z-40 flex flex-col pointer-events-none ${className}`
        : `relative w-full h-full min-h-[400px] flex flex-col pointer-events-none ${className}`;

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            style={style}
            {...rest}
        >
            <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                viewBox={size ? `0 0 ${size.width} ${size.height}` : "0 0 1000 600"}
                preserveAspectRatio={size ? "none" : "none"}
            >
                <defs>
                    <clipPath id={clipId}>
                        <path d={pathD} />
                    </clipPath>
                </defs>

                <path
                    d={pathD}
                    fill={frameColor}
                    stroke={borderWidth > 0 ? borderColor : "none"}
                    strokeWidth={borderWidth}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    className="transition-colors duration-200"
                />
            </svg>

            {headerSlot && (
                <div className="relative z-10 pointer-events-auto px-6 pt-2 pb-1">
                    {headerSlot}
                </div>
            )}
            <div
                className={`relative z-10 flex-1 flex flex-col pointer-events-auto overflow-auto ${headerSlot ? "pt-2" : "pt-12 md:pt-14"
                    } px-6 md:px-8 pb-6 ${contentClassName}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Frame;