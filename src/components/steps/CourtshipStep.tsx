"use client";

import { useState } from "react";
import Beak from "../Beak";

type CourtshipStepProps = {
  onContinue: () => void;
};

export default function CourtshipStep({ onContinue }: CourtshipStepProps) {
  const TOTAL_BEAKS = 3;

  const [crushed, setCrushed] = useState<boolean[]>(
    Array(TOTAL_BEAKS).fill(false),
  );

  const crushBeak = (index: number) => {
    if (crushed[index]) return;

    const updated = [...crushed];
    updated[index] = true;
    setCrushed(updated);
  };

  const allCrushed = crushed.every(Boolean);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-10">
      {/* COPY */}
      <p className="text-xl md:text-2xl text-gray-300 max-w-md leading-relaxed">
        A veces no hace falta decir nada más.
        <br />
        Solo confirmar que queremos seguir.
      </p>

      {/* BEAKS */}
      <div className="flex gap-6">
        {crushed.map((isCrushed, i) => (
          <Beak key={i} crushed={isCrushed} onClick={() => crushBeak(i)} />
        ))}
      </div>

      {/* CONTINUE */}
      {allCrushed && (
        <button
          onClick={onContinue}
          className="
            mt-4 px-6 py-3
            rounded-xl
            bg-gray-200 text-black
            transition-all duration-300
            hover:scale-105
          "
        >
          Continuar
        </button>
      )}
    </div>
  );
}
