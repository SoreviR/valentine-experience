// src/components/TextBlock.tsx
"use client";

import { motion } from "framer-motion";
import { TIMING } from "@/lib/timings";

type Props = {
  text: string;
  delay?: number;
};

export default function TextBlock({ text, delay = 0 }: Props) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: TIMING.medium / 1000 }}
      className="text-center text-lg md:text-xl text-neutral-300 max-w-md"
    >
      {text}
    </motion.p>
  );
}
