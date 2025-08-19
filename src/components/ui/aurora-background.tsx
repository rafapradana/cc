"use client";
import { cn } from "@/lib/utils";
import React from "react";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
}: AuroraBackgroundProps) {
  return (
    <section className={cn("relative h-screen flex items-center justify-center overflow-hidden", className)}>
      {/* Aurora Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950" />

      {/* Animated Aurora Layers */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-indigo-400/20 animate-aurora blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-l from-indigo-400/20 via-blue-400/20 to-purple-400/20 animate-aurora blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-400/20 via-indigo-400/20 to-blue-400/20 animate-aurora blur-3xl" style={{ animationDelay: '4s' }} />
      </div>

      {/* Radial Gradient Overlay */}
      {showRadialGradient && (
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-white/5 to-white/20 dark:from-transparent dark:via-black/5 dark:to-black/20" />
      )}

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </section>
  );
}
