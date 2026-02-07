"use client";

import { useState, useEffect } from "react";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";
import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";

export default function RewardPage() {
  const [step, setStep] = useState(0);
  const TOTAL_STEPS = COPY.reward.lines.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClick = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6 px-6">
      {step < TOTAL_STEPS ? (
        <>
          <TextBlock text={COPY.reward.lines[step]} delay={TIMING.short} />
          <Button onClick={handleClick}>Next</Button>
        </>
      ) : (
        <>
          <TextBlock text={COPY.reward.giftText} delay={TIMING.short} />
          <div className="flex flex-col gap-4 mt-4">
            {/* Aquí va tu regalo digital: ejemplo código de gift card */}
            <div className="p-4 bg-neutral-800 rounded-xl text-center text-neutral-200 font-mono">
              STEAM-GIFT-1234-ABCD
            </div>

            <Button onClick={() => alert("Enjoy your gift 😉")}>
              {COPY.reward.buttonText}
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
