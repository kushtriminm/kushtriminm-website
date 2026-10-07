"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Text that turns from grey to white while it is in the middle of the screen.
export default function LightUp({ children }: { children: ReactNode }) {
  return (
    <motion.p
      initial={{ color: "#6b7280" }}
      whileInView={{ color: "#ffffff" }}
      viewport={{ margin: "-35% 0px -35% 0px" }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.p>
  );
}