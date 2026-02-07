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
    <main className="h-screen flex flex-col items-center justify-center px-6 gap-6">
      <TextBlock text={COPY.eevee.title} delay={TIMING.short} />
      <TextBlock text={COPY.eevee.subtitle} delay={TIMING.medium} />

      <div className="w-full max-w-sm flex flex-col gap-4">
        {COPY.eevee.options.map((opt, i) => (
          <EeveeCard
            key={opt.id}
            label={opt.label}
            onClick={() => setSelected(i)}
          />
        ))}
      </div>

      {option && (
        <>
          <TextBlock text={option.text} delay={TIMING.short} />

          <Button onClick={() => router.push("/office")}>
            {COPY.eevee.cta}
          </Button>
        </>
      )}
    </main>
  );
}
