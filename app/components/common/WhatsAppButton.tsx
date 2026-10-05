"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917994455922"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-2.5 group pointer-events-auto"
    >
      {/* Tooltip Label */}
      <span className="hidden sm:inline-flex items-center bg-stone-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 backdrop-blur-sm whitespace-nowrap">
        Chat with us
      </span>

      {/* Floating Button Icon */}
      <div className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-emerald-500/40 hover:bg-[#20ba5a] hover:scale-110 active:scale-95 transition-all duration-300">
        {/* Subtle Pulse Aura */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8 relative z-10" />
      </div>
    </a>
  );
}
