"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import EeveeCard from "@/components/EeveeCard";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";

import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";

export default function EeveePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const option = selected !== null ? COPY.eevee.options[selected] : null;

  return (
    <main className="h-screen flex flex-col text-center">
      {/* TOP SPACER */}
      <div className="h-16" />

      {/* CONTENT */}
      <div className="flex flex-col items-center min-h-90">
        {/* TITLE */}
        <TextBlock text={COPY.eevee.title} delay={TIMING.short} />
        <TextBlock text={COPY.eevee.subtitle} delay={TIMING.medium} />

        {/* OPTIONS */}
        <div className="w-full max-w-sm flex flex-col gap-4">
          {COPY.eevee.options.map((opt, i) => (
            <EeveeCard
              key={opt.id}
              label={opt.label}
              onClick={() => setSelected(i)}
            />
          ))}
        </div>

        {/* OPTION RESULT (RESERVED SPACE) */}
        <div className="min-h-18 flex items-center">
          {option && <TextBlock text={option.text} delay={TIMING.short} />}
        </div>
      </div>

      {/* ACTION AREA */}
      <div className="flex-1 flex items-start justify-center min-h-20">
        {option ? (
          <Button onClick={() => router.push("/office")}>
            {COPY.eevee.cta}
          </Button>
        ) : (
          <div className="h-12" />
        )}
      </div>
    </main>
  );
}
