"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`pd-card ${className}`}>{children}</div>;
}

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="pd-hero-title">{children}</h1>;
}

export function Sub({ children }: { children: ReactNode }) {
  return <p className="pd-hero-sub">{children}</p>;
}

export function Badge({
  children,
  intent = "default",
}: {
  children: ReactNode;
  intent?: "default" | "success" | "outline";
}) {
  const base = "pd-badge";
  const extra =
    intent === "success"
      ? " pd-badge--success"
      : intent === "outline"
      ? " pd-badge--outline"
      : "";
  return <span className={base + extra}>{children}</span>;
}

export const PrimaryButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }
> = ({ children, className = "", ...props }) => (
  <motion.button
    whileTap={{ scale: 0.96 }}
    className={`pd-btn-primary ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

export const FadeIn: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);
