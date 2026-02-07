"use client";

import { motion } from "framer-motion";

type Props = {
  label: string;
  onClick: () => void;
};

export default function EeveeCard({ label, onClick }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full py-4 rounded-xl 
                 bg-neutral-800 
                 text-neutral-200 text-lg
                 tracking-wide
                 transition-colors hover:bg-neutral-700"
    >
      {label}
    </motion.button>
  );
}
