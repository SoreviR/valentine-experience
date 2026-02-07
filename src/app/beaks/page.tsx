"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Beak from "@/components/Beak";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";

import { COPY } from "@/lib/copy";

export default function BeaksPage() {
  const router = useRouter();
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
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-10">
      {/* COPY */}
      <TextBlock text={COPY.beak.confirmation} />

      {/* BEAKS */}
      <div className="flex gap-6">
        {crushed.map((isCrushed, i) => (
          <Beak key={i} crushed={isCrushed} onClick={() => crushBeak(i)} />
        ))}
      </div>

      {/* CONTINUE */}
      {allCrushed && (
        <Button onClick={() => router.push("/focus")}>
          {COPY.beak.continue}
        </Button>
      )}
    </main>
  );
}
