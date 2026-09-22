"use client";

import React, { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  opacity: number;
  lineWidth: number;
  isClick?: boolean;
}

interface GridPoint {
  baseX: number;
  baseY: number;
}

export interface RippleBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  theme?: "dark" | "light" | "white";
  backgroundColor?: string;
  hoverOnly?: boolean;
}

/*
|--------------------------------------------------------------------------
| BRAND COLOR (RGB)
|--------------------------------------------------------------------------
|
| Blogtec primary color: #A24A02 -> rgb(162, 74, 2)
|
*/

const PRIMARY_COLOR_RGB = "162, 74, 2";

/*
|--------------------------------------------------------------------------
| RIPPLE BACKGROUND
|--------------------------------------------------------------------------
*/

export default function RippleBackground({
  className = "",
  children,
  theme = "light",
  backgroundColor,
  hoverOnly = true,
}: RippleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    active: false,
  });

  const lastSpawnRef = useRef({
    x: -1000,
    y: -1000,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let width = 0;
    let height = 0;
    let devicePixelRatio = 1;

    let animationFrameId = 0;

    const ripples: Ripple[] = [];
    let gridPoints: GridPoint[] = [];

    /*
    |--------------------------------------------------------------------------
    | SETTINGS
    |--------------------------------------------------------------------------
    */

    const GRID_SPACING = 24;

    const RIPPLE_RADIUS = 190;

    const RIPPLE_TRIGGER_DISTANCE = 22;

    const RIPPLE_WAVE_WIDTH = 50;

    /*
    |--------------------------------------------------------------------------
    | RESIZE
    |--------------------------------------------------------------------------
    */

    const handleResize = () => {
      const rect = container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = Math.round(
        width * devicePixelRatio
      );

      canvas.height = Math.round(
        height * devicePixelRatio
      );

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );

      /*
       * Generate the dot grid.
       */
      gridPoints = [];

      for (
        let x = GRID_SPACING / 2;
        x < width;
        x += GRID_SPACING
      ) {
        for (
          let y = GRID_SPACING / 2;
          y < height;
          y += GRID_SPACING
        ) {
          gridPoints.push({
            baseX: x,
            baseY: y,
          });
        }
      }
    };

    /*
    |--------------------------------------------------------------------------
    | CREATE RIPPLE
    |--------------------------------------------------------------------------
    */

    const spawnRipple = (
      x: number,
      y: number,
      isClick = false
    ) => {
      ripples.push({
        x,
        y,

        radius: 4,

        maxRadius: isClick
          ? 260
          : RIPPLE_RADIUS,

        speed: isClick
          ? 4.5
          : 3.2,

        opacity: isClick
          ? 0.95
          : 0.75,

        lineWidth: isClick
          ? 2
          : 1.2,

        isClick,
      });

      /*
       * Prevent too many active ripples.
       */
      if (ripples.length > 15) {
        ripples.shift();
      }
    };

    /*
    |--------------------------------------------------------------------------
    | MOUSE MOVE
    |--------------------------------------------------------------------------
    */

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      const rect =
        container.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      mouseRef.current = {
        x,
        y,
        active: true,
      };

      const distance = Math.hypot(
        x - lastSpawnRef.current.x,
        y - lastSpawnRef.current.y
      );

      if (
        distance >
        RIPPLE_TRIGGER_DISTANCE
      ) {
        spawnRipple(x, y);

        lastSpawnRef.current = {
          x,
          y,
        };
      }
    };

    /*
    |--------------------------------------------------------------------------
    | MOUSE LEAVE
    |--------------------------------------------------------------------------
    */

    const handleMouseLeave = () => {
      mouseRef.current.active = false;

      lastSpawnRef.current = {
        x: -1000,
        y: -1000,
      };
    };

    /*
    |--------------------------------------------------------------------------
    | CLICK RIPPLE
    |--------------------------------------------------------------------------
    */

    const handleClick = (
      event: MouseEvent
    ) => {
      const rect =
        container.getBoundingClientRect();

      const x =
        event.clientX - rect.left;

      const y =
        event.clientY - rect.top;

      spawnRipple(
        x,
        y,
        true
      );
    };

    /*
    |--------------------------------------------------------------------------
    | TOUCH
    |--------------------------------------------------------------------------
    */

    const handleTouchMove = (
      event: TouchEvent
    ) => {
      const touch = event.touches[0];

      if (!touch) return;

      const rect =
        container.getBoundingClientRect();

      const x =
        touch.clientX - rect.left;

      const y =
        touch.clientY - rect.top;

      mouseRef.current = {
        x,
        y,
        active: true,
      };

      const distance = Math.hypot(
        x - lastSpawnRef.current.x,
        y - lastSpawnRef.current.y
      );

      if (distance > 25) {
        spawnRipple(x, y);

        lastSpawnRef.current = {
          x,
          y,
        };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current.active = false;
    };

    /*
    |--------------------------------------------------------------------------
    | EVENTS
    |--------------------------------------------------------------------------
    */

    handleResize();

    const resizeObserver =
      new ResizeObserver(
        handleResize
      );

    resizeObserver.observe(
      container
    );

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    container.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    container.addEventListener(
      "click",
      handleClick
    );

    container.addEventListener(
      "touchmove",
      handleTouchMove,
      {
        passive: true,
      }
    );

    container.addEventListener(
      "touchend",
      handleTouchEnd
    );

    let time = 0;

    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    const render = () => {
      time += 0.015;

      /*
       * Clear canvas.
       */
      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      /*
      |--------------------------------------------------------------------------
      | BACKGROUND
      |--------------------------------------------------------------------------
      */

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
      } else if (theme === "dark") {
        ctx.fillStyle = "#0D0B0A";
      } else if (theme === "white") {
        ctx.fillStyle = "#FFFFFF";
      } else {
        ctx.fillStyle = "#FAF7F2";
      }

      ctx.fillRect(
        0,
        0,
        width,
        height
      );

      /*
      |--------------------------------------------------------------------------
      | CURSOR GLOW
      |--------------------------------------------------------------------------
      */

      if (
        mouseRef.current.active
      ) {
        const {
          x,
          y,
        } = mouseRef.current;

        const glow =
          ctx.createRadialGradient(
            x,
            y,
            0,
            x,
            y,
            220
          );

        if (theme === "dark") {
          glow.addColorStop(
            0,
            `rgba(${PRIMARY_COLOR_RGB}, 0.2)`
          );

          glow.addColorStop(
            0.45,
            `rgba(${PRIMARY_COLOR_RGB}, 0.08)`
          );
        } else {
          glow.addColorStop(
            0,
            `rgba(${PRIMARY_COLOR_RGB}, 0.14)`
          );

          glow.addColorStop(
            0.45,
            `rgba(${PRIMARY_COLOR_RGB}, 0.04)`
          );
        }

        glow.addColorStop(
          1,
          `rgba(${PRIMARY_COLOR_RGB}, 0)`
        );

        ctx.fillStyle = glow;

        ctx.fillRect(
          0,
          0,
          width,
          height
        );
      }

      /*
      |--------------------------------------------------------------------------
      | UPDATE RIPPLES
      |--------------------------------------------------------------------------
      */

      for (
        let i = ripples.length - 1;
        i >= 0;
        i--
      ) {
        const ripple =
          ripples[i];

        ripple.radius +=
          ripple.speed;

        ripple.opacity *=
          0.965;

        if (
          ripple.radius >=
            ripple.maxRadius ||
          ripple.opacity < 0.015
        ) {
          ripples.splice(
            i,
            1
          );

          continue;
        }
      }

      /*
      |--------------------------------------------------------------------------
      | DRAW DOT GRID
      |--------------------------------------------------------------------------
      */

      for (
        const point of gridPoints
      ) {
        let drawX =
          point.baseX;

        let drawY =
          point.baseY;

        let totalDisplacementX = 0;
        let totalDisplacementY = 0;

        let strongestInfluence = 0;

        /*
        |--------------------------------------------------------------------------
        | APPLY RIPPLE TO DOTS
        |--------------------------------------------------------------------------
        */

        for (
          const ripple of ripples
        ) {
          const dx =
            point.baseX -
            ripple.x;

          const dy =
            point.baseY -
            ripple.y;

          const distance =
            Math.hypot(
              dx,
              dy
            );

          if (
            distance === 0
          ) {
            continue;
          }

          const distanceFromWave =
            Math.abs(
              distance -
                ripple.radius
            );

          if (
            distanceFromWave <
            RIPPLE_WAVE_WIDTH
          ) {
            /*
             * Smooth wave influence.
             */
            const normalized =
              distanceFromWave /
              RIPPLE_WAVE_WIDTH;

            const wave =
              Math.sin(
                normalized *
                  Math.PI
              );

            const influence =
              wave *
              ripple.opacity;

            /*
             * Push the dot away
             * from the ripple center.
             */
            const displacement =
              influence * 25;

            totalDisplacementX +=
              (dx / distance) *
              displacement;

            totalDisplacementY +=
              (dy / distance) *
              displacement;

            strongestInfluence =
              Math.max(
                strongestInfluence,
                influence
              );
          }
        }

        /*
         * Ambient floating motion
         */
        const floatX = Math.sin(time + point.baseY * 0.04) * 0.8;
        const floatY = Math.cos(time + point.baseX * 0.04) * 0.8;

        drawX +=
          totalDisplacementX + floatX;

        drawY +=
          totalDisplacementY + floatY;

        /*
        |--------------------------------------------------------------------------
        | DOT SIZE & OPACITY
        |--------------------------------------------------------------------------
        */

        if (hoverOnly && strongestInfluence <= 0.001) {
          continue;
        }

        const dotRadius =
          1.2 +
          strongestInfluence *
            1.8;

        const opacity = hoverOnly
          ? strongestInfluence * (theme === "dark" ? 0.65 : 0.75)
          : (theme === "dark"
              ? 0.16 + strongestInfluence * 0.45
              : 0.18 + strongestInfluence * 0.52);

        if (opacity <= 0.005) {
          continue;
        }

        /*
        |--------------------------------------------------------------------------
        | DRAW DOT
        |--------------------------------------------------------------------------
        */

        ctx.beginPath();

        ctx.fillStyle =
          `rgba(${PRIMARY_COLOR_RGB}, ${opacity})`;

        ctx.arc(
          drawX,
          drawY,
          dotRadius,
          0,
          Math.PI * 2
        );

        ctx.fill();
      }

      /*
      |--------------------------------------------------------------------------
      | NEXT FRAME
      |--------------------------------------------------------------------------
      */

      animationFrameId =
        requestAnimationFrame(
          render
        );
    };

    /*
    |--------------------------------------------------------------------------
    | START
    |--------------------------------------------------------------------------
    */

    render();

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      resizeObserver.disconnect();

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      container.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      container.removeEventListener(
        "click",
        handleClick
      );

      container.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      container.removeEventListener(
        "touchend",
        handleTouchEnd
      );
    };
  }, [theme, backgroundColor, hoverOnly]);

  /*
  |--------------------------------------------------------------------------
  | COMPONENT
  |--------------------------------------------------------------------------
  */

  return (
    <div
      ref={containerRef}
      className={`
        relative
        w-full
        overflow-hidden
        ${className}
      `}
    >
      {/* Ripple Canvas */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
        "
      >
        <canvas
          ref={canvasRef}
          className="
            block
            h-full
            w-full
          "
        />
      </div>

      {/* Page Content */}
      <div
        className="
          relative
          z-10
        "
      >
        {children}
      </div>
    </div>
  );
}