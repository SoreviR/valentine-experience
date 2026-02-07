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

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8 px-6">
      <TextBlock text={COPY.psyduck.lines[step]} delay={TIMING.short} />

      <Psyduck onClick={handleClick} />

      {step === COPY.psyduck.lines.length - 1 && (
        <Button onClick={() => router.push("/eevee")}>
          {COPY.psyduck.cta}
        </Button>
      )}
    </main>
  );
}
