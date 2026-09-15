"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  opacity: number;
  color: string;
  lineWidth: number;
}

interface GridPoint {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
}

export interface RippleBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  theme?: "dark" | "light" | "white";
}

const RIPPLE_COLORS_DARK = [
  "rgba(164, 75, 3, ",    // Brand primary #A44B03
  "rgba(217, 119, 6, ",   // Amber 600
  "rgba(245, 158, 11, ",  // Amber 500
  "rgba(56, 189, 248, ",  // Cyan accent
  "rgba(251, 146, 60, ",  // Orange accent
];

const RIPPLE_COLORS_LIGHT = [
  "rgba(164, 75, 3, ",    // Brand primary #A44B03
  "rgba(217, 119, 6, ",   // Amber 600
  "rgba(2, 132, 199, ",   // Sky blue 600
  "rgba(194, 65, 12, ",   // Orange 700
  "rgba(109, 40, 217, ",  // Violet 700
];

export default function RippleBackground({
  className = "",
  children,
  theme = "dark",
}: RippleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const lastSpawnRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let ripples: Ripple[] = [];
    let gridPoints: GridPoint[] = [];

    const GRID_SPACING = 36;

    const initGrid = (w: number, h: number) => {
      gridPoints = [];
      for (let x = 18; x < w; x += GRID_SPACING) {
        for (let y = 18; y < h; y += GRID_SPACING) {
          gridPoints.push({ x, y, baseX: x, baseY: y });
        }
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initGrid(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const colors = theme === "dark" ? RIPPLE_COLORS_DARK : RIPPLE_COLORS_LIGHT;

    const spawnRipple = (x: number, y: number, isClick = false) => {
      const count = isClick ? 3 : 1;
      for (let i = 0; i < count; i++) {
        ripples.push({
          x,
          y,
          radius: 4 + i * 8,
          maxRadius: (isClick ? 180 : 120) + Math.random() * 40,
          speed: (isClick ? 3.5 : 2.2) + Math.random() * 0.8,
          opacity: isClick ? 0.9 : 0.7,
          color: colors[Math.floor(Math.random() * colors.length)],
          lineWidth: isClick ? 2.5 : 1.75,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosRef.current = { x, y };

      const dist = Math.hypot(x - lastSpawnRef.current.x, y - lastSpawnRef.current.y);
      if (dist > 28) {
        spawnRipple(x, y);
        lastSpawnRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => {
      mousePosRef.current = null;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnRipple(x, y, true);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("click", handleClick);

    // Touch support
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = container.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      mousePosRef.current = { x, y };
      const dist = Math.hypot(x - lastSpawnRef.current.x, y - lastSpawnRef.current.y);
      if (dist > 30) {
        spawnRipple(x, y);
        lastSpawnRef.current = { x, y };
      }
    };
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render dark/light/white background base
      if (theme === "dark") {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, "#0c0a09");
        bgGrad.addColorStop(0.5, "#151210");
        bgGrad.addColorStop(1, "#090807");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (theme === "white") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, "#fbf9f6");
        bgGrad.addColorStop(0.5, "#f5eee6");
        bgGrad.addColorStop(1, "#fbf9f6");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Mouse Cursor Glow
      if (mousePosRef.current) {
        const { x, y } = mousePosRef.current;
        const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, 220);
        glowGrad.addColorStop(
          0,
          theme === "dark" ? "rgba(164, 75, 3, 0.22)" : "rgba(164, 75, 3, 0.12)"
        );
        glowGrad.addColorStop(
          0.5,
          theme === "dark" ? "rgba(245, 158, 11, 0.08)" : "rgba(245, 158, 11, 0.04)"
        );
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = glowGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & Draw Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.965;

        if (r.opacity < 0.01 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        // Concentric wave rings
        const ringCount = 3;
        for (let k = 0; k < ringCount; k++) {
          const ringRad = r.radius - k * 14;
          if (ringRad <= 0) continue;

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, ringRad, 0, Math.PI * 2);
          const currentOpacity = Math.max(0, r.opacity * (1 - k * 0.3));
          ctx.strokeStyle = `${r.color}${currentOpacity})`;
          ctx.lineWidth = Math.max(0.5, r.lineWidth * (1 - ringRad / r.maxRadius));
          ctx.shadowColor = theme === "dark" ? "rgba(245, 158, 11, 0.4)" : "rgba(164, 75, 3, 0.2)";
          ctx.shadowBlur = 8;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw Grid Dots with Liquid Displacement
      const dotColor =
        theme === "dark" ? "rgba(255, 255, 255, 0.12)" : "rgba(164, 75, 3, 0.15)";
      ctx.fillStyle = dotColor;

      for (let i = 0; i < gridPoints.length; i++) {
        const pt = gridPoints[i];
        let dispX = 0;
        let dispY = 0;

        // Ripple displacement on grid
        for (let j = 0; j < ripples.length; j++) {
          const rip = ripples[j];
          const dx = pt.baseX - rip.x;
          const dy = pt.baseY - rip.y;
          const dist = Math.hypot(dx, dy);
          const waveDist = Math.abs(dist - rip.radius);

          if (waveDist < 35 && dist > 0) {
            const factor = Math.sin((waveDist / 35) * Math.PI) * rip.opacity * 9;
            dispX += (dx / dist) * factor;
            dispY += (dy / dist) * factor;
          }
        }

        // Ambient sine floating
        const floatX = Math.sin(time + pt.baseY * 0.05) * 1.5;
        const floatY = Math.cos(time + pt.baseX * 0.05) * 1.5;

        pt.x = pt.baseX + dispX + floatX;
        pt.y = pt.baseY + dispY + floatY;

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full flex-shrink-0 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
