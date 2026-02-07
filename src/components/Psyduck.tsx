"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  onClick: () => void;
};

export default function Psyduck({ onClick }: Props) {
  return (
    <motion.div
      whileTap={{ scale: 0.95, rotate: -2 }}
      onClick={onClick}
      className="w-48 h-48 rounded-full 
                 bg-neutral-800 
                 flex items-center justify-center
                 cursor-pointer select-none"
    >
      <span className="text-neutral-400 text-sm">
        <Image src="/psyduck.png" alt="Psyduck" width={150} height={150} />
      </span>
    </motion.div>
  );
}
