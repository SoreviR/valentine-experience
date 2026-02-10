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
    <main className="min-h-screen flex flex-col px-6 text-center">
      {/* TOP SPACER */}
      <div className="h-24" />

      {/* CONTENT */}
      <div className="flex flex-col items-center gap-10 min-h-65">
        <TextBlock text={COPY.beak.confirmation} />
        <TextBlock text={COPY.beak.info} style="text-sm italic" />

        <div className="flex gap-6">
          {crushed.map((isCrushed, i) => (
            <Beak key={i} crushed={isCrushed} onClick={() => crushBeak(i)} />
          ))}
        </div>
      </div>

      {/* ACTION */}
      <div className="flex items-start justify-center min-h-20">
        {allCrushed ? (
          <Button onClick={() => router.push("/focus")}>
            {COPY.beak.continue}
          </Button>
        ) : (
          <div className="h-12" />
        )}
      </div>
    </main>
  );
}
