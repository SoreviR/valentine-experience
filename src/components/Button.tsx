// src/components/Button.tsx
"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: Props) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className="mt-8 px-8 py-4 rounded-xl 
                 bg-neutral-100 text-neutral-900 
                 text-lg font-medium tracking-wide
                 transition-colors hover:bg-neutral-200"
    >
      {children}
    </motion.button>
  );
}
