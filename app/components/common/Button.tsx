"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface ButtonProps {
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  children?: React.ReactNode;
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  pillColor?: string;
  textKey?: string | number;
  variant?: "default" | "transparent-white" | "transparent";
}

const Button: React.FC<ButtonProps> = ({
  href,
  onClick,
  children,
  text,
  className = "",
  type = "button",
  target,
  rel,
  pillColor = "bg-[#A44B03]",
  textKey,
  variant = "default",
}) => {
  const content = text || children;

  const variantStyles = {
    default: "bg-white text-stone-900 border-black/5",
    "transparent-white": "bg-transparent text-stone-900 border-white",
    transparent: "bg-transparent text-stone-900 border-stone-300 hover:border-stone-400",
  };

  const selectedVariant = variantStyles[variant] || variantStyles.default;

  const baseClasses = `group relative inline-flex items-center justify-between h-14 min-w-[240px] sm:min-w-[260px] pl-6 pr-16 ${selectedVariant} font-semibold text-base border rounded-2xl overflow-hidden select-none transition-all duration-300 ${className}`;

  const innerElements = (
    <>
      {/* Layer 0: Expanding Theme Background Fill */}
      <div
        className={`absolute right-1 top-[4px] bottom-[4px] w-12 group-hover:w-[calc(100%-8px)] ${pillColor} rounded-xl z-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      />

      {/* Layer 1: Left-aligned Text Content */}
      <span className="relative z-10 transition-colors duration-500 group-hover:text-white font-[var(--font-dm-sans)] pr-2">
        {textKey !== undefined ? (
          <AnimatePresence mode="wait">
            <motion.span
              key={textKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              {content}
            </motion.span>
          </AnimatePresence>
        ) : (
          <span className="inline-block">{content}</span>
        )}
      </span>

      {/* Layer 2: Right-aligned Arrow Icon (Perfectly Centered in Pill Box) */}
      <div className="absolute right-1 top-[4px] bottom-[4px] w-12 z-10 flex items-center justify-center text-white pointer-events-none">
        <svg
          className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L19.5 10.5M19.5 10.5L13.5 16.5M19.5 10.5H4.5"
          />
        </svg>
      </div>
    </>
  );

  if (href) {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="inline-block"
      >
        <Link
          href={href}
          onClick={onClick as (e: React.MouseEvent<HTMLAnchorElement>) => void}
          target={target}
          rel={rel}
          className={baseClasses}
        >
          {innerElements}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick as (e: React.MouseEvent<HTMLButtonElement>) => void}
      className={baseClasses}
    >
      {innerElements}
    </motion.button>
  );
};

export default Button;