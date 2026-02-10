"use client";

import { useState, useEffect } from "react";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";
import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";
import confetti from "canvas-confetti";

type Selection = {
  herNumber?: number;
  myNumber?: number;
  herSign?: string;
  mySign?: string;
};

// Datos hardcodeados para puzzle
const CORRECT_ANSWER: Selection = {
  herNumber: 5,
  myNumber: 13,
  herSign: "Libra",
  mySign: "Pisces",
};

export default function RewardPage() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<Selection>({});
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const TOTAL_STEPS = COPY.reward.lines.length;

  // Confeti reutilizable
  const launchConfetti = () => {
    const duration = 1500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        startVelocity: 18,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#d4d4d4", "#f5c2c7"],
        scalar: 0.9,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Confeti al desbloquear
  useEffect(() => {
    if (!unlocked) return;

    launchConfetti();
  }, [unlocked]);

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const isComplete =
    selection.herNumber !== undefined &&
    selection.myNumber !== undefined &&
    selection.herSign &&
    selection.mySign;

  const submitPuzzle = () => {
    setError(false);

    const isCorrect =
      selection.herNumber === CORRECT_ANSWER.herNumber &&
      selection.myNumber === CORRECT_ANSWER.myNumber &&
      selection.herSign === CORRECT_ANSWER.herSign &&
      selection.mySign === CORRECT_ANSWER.mySign;

    if (!isCorrect) {
      setError(true);
      return;
    }

    setUnlocked(true);
  };

  const handleFinalButton = () => {
    launchConfetti();
    // Aquí puedes añadir cualquier otra acción que quieras al presionar
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm min-h-115 flex flex-col justify-between items-center">
        {step < TOTAL_STEPS ? (
          <>
            <TextBlock text={COPY.reward.lines[step]} delay={TIMING.short} />
            <Button onClick={handleNext}>Next</Button>
          </>
        ) : !unlocked ? (
          <>
            <TextBlock
              text="Some things only work when you remember the little details."
              delay={TIMING.short}
            />

            {/* PUZZLE */}
            <div className="w-full mt-6 p-4 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col gap-5">
              <PuzzleGroup
                label="Bailey girl favorite number"
                options={[3, 5, 8]}
                selected={selection.herNumber}
                onSelect={(v) => setSelection((s) => ({ ...s, herNumber: v }))}
              />

              <PuzzleGroup
                label="His favorite number"
                options={[7, 11, 13]}
                selected={selection.myNumber}
                onSelect={(v) => setSelection((s) => ({ ...s, myNumber: v }))}
              />

              <PuzzleGroup
                label="Bailey girl zodiac sign"
                options={["Libra", "Leo", "Gemini"]}
                selected={selection.herSign}
                onSelect={(v) => setSelection((s) => ({ ...s, herSign: v }))}
              />

              <PuzzleGroup
                label="His zodiac sign"
                options={["Pisces", "Scorpio", "Cancer"]}
                selected={selection.mySign}
                onSelect={(v) => setSelection((s) => ({ ...s, mySign: v }))}
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 mt-3">
                Almost… but not quite. Try again.
              </p>
            )}

            <Button onClick={submitPuzzle} disabled={!isComplete}>
              Unlock
            </Button>
          </>
        ) : (
          <>
            <TextBlock text={COPY.reward.giftText} delay={TIMING.short} />
            <TextBlock
              text="Let me know the secret phrase to redeem your gift"
              delay={TIMING.short}
              style="italic"
            />

            <div className="mt-6 p-4 bg-neutral-800 rounded-xl text-center text-neutral-200 font-mono tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.15)]">
              - DADY I'M CALIENTE -
            </div>

            <Button onClick={handleFinalButton}>
              {COPY.reward.buttonText}
            </Button>
          </>
        )}
      </div>
    </main>
  );
}

/* ---------- Helper ---------- */

function PuzzleGroup<T extends string | number>({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: T[];
  selected?: T;
  onSelect: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-sm text-neutral-400 mb-2">{label}</p>
      <div className="flex gap-2">
        {options.map((opt) => (
          <button
            key={String(opt)}
            onClick={() => onSelect(opt)}
            className={`flex-1 py-2 rounded-lg border transition
              ${
                selected === opt
                  ? "border-neutral-300 bg-neutral-800"
                  : "border-neutral-700"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
