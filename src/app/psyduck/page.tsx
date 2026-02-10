"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Psyduck from "@/components/Psyduck";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";

import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";

export default function PsyduckPage() {
  const [step, setStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClick = () => {
    if (step < COPY.psyduck.lines.length - 1) {
      setStep(step + 1);
    }
  };

  const isLastStep = step === COPY.psyduck.lines.length - 1;

  return (
    <main className="min-h-screen flex flex-col px-6 text-center">
      {/* TOP SPACER */}
      <div className="h-16" />

      {/* CONTENT (TEXT + PSYDUCK) */}
      <div className="flex flex-col items-center align-content-start gap-4 min-h-75">
        <TextBlock text={COPY.psyduck.lines[step]} delay={TIMING.short} />

        <Psyduck onClick={handleClick} />
      </div>

      {/* ACTION AREA */}
      <div className="flex-1 flex items-start justify-center min-h-20">
        {isLastStep ? (
          <Button onClick={() => router.push("/eevee")}>
            {COPY.psyduck.cta}
          </Button>
        ) : (
          <div className="h-12" />
        )}
      </div>
    </main>
  );
}
