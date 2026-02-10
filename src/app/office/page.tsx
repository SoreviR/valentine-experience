"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import TextBlock from "@/components/TexBlock";
import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";

export default function OfficePage() {
  const [step, setStep] = useState(0);
  const [showEaster, setShowEaster] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClick = () => {
    if (step < COPY.office.lines.length - 1) {
      setStep(step + 1);
    } else {
      setShowEaster(true);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-2 px-6">
      <TextBlock text={COPY.office.lines[step]} delay={TIMING.short} />

      <div className="flex flex-col gap-2 mt-6 w-full max-w-sm">
        {!showEaster && (
          <Button onClick={handleClick}>
            {step < COPY.office.lines.length - 1 ? "Next" : COPY.office.cta}
          </Button>
        )}

        {showEaster && (
          <Button onClick={() => router.push("/beaks")}>
            {COPY.office.easterEgg}
          </Button>
        )}
      </div>
    </main>
  );
}
