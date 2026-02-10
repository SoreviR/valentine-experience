"use client";

import { useState, useEffect } from "react";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";
import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";

type Selection = {
  herNumber?: number;
  myNumber?: number;
  herSign?: string;
  mySign?: string;
};

function shuffle<T>(array: T[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function RewardPage() {
  const [step, setStep] = useState(0);
  const [selection, setSelection] = useState<Selection>({});
  const [error, setError] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  // Randomized options
  const [herNumbers] = useState<number[]>(() => shuffle([3, 5, 8]));
  const [myNumbers] = useState<number[]>(() => shuffle([7, 11, 13]));
  const [herSigns] = useState<string[]>(() =>
    shuffle(["Libra", "Leo", "Gemini"]),
  );
  const [mySigns] = useState<string[]>(() =>
    shuffle(["Pisces", "Scorpio", "Cancer"]),
  );

  const TOTAL_STEPS = COPY.reward.lines.length;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const isComplete =
    selection.herNumber !== undefined &&
    selection.myNumber !== undefined &&
    selection.herSign !== undefined &&
    selection.mySign !== undefined;

  const submitPuzzle = async () => {
    setError(false);

    const res = await fetch("/api/reward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selection),
    });

    if (!res.ok) {
      setError(true);
      return;
    }

    const data = await res.json();
    setCode(data.code);
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm min-h-115 flex flex-col justify-between items-center">
        {step < TOTAL_STEPS ? (
          <>
            <TextBlock text={COPY.reward.lines[step]} delay={TIMING.short} />
            <Button onClick={handleNext}>Next</Button>
          </>
        ) : !code ? (
          <>
            <TextBlock
              text="Some things only work when you remember the little details."
              delay={TIMING.short}
            />

            <div className="w-full mt-6 p-4 rounded-xl bg-neutral-900 border border-neutral-700 flex flex-col gap-5">
              {/* Her number */}
              <div>
                <p className="text-sm text-neutral-400 mb-2">
                  Bailey girl favorite number
                </p>
                <div className="flex gap-2">
                  {herNumbers.map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setError(false);
                        setSelection((s) => ({ ...s, herNumber: n }));
                      }}
                      className={`flex-1 py-2 rounded-lg border transition
                        ${
                          selection.herNumber === n
                            ? "border-neutral-300 bg-neutral-800"
                            : "border-neutral-700"
                        }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* His number */}
              <div>
                <p className="text-sm text-neutral-400 mb-2">
                  His favorite number
                </p>
                <div className="flex gap-2">
                  {myNumbers.map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setError(false);
                        setSelection((s) => ({ ...s, myNumber: n }));
                      }}
                      className={`flex-1 py-2 rounded-lg border transition
                        ${
                          selection.myNumber === n
                            ? "border-neutral-300 bg-neutral-800"
                            : "border-neutral-700"
                        }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Her sign */}
              <div>
                <p className="text-sm text-neutral-400 mb-2">
                  Bailey girl zodiac sign
                </p>
                <div className="flex gap-2">
                  {herSigns.map((sign) => (
                    <button
                      key={sign}
                      onClick={() => {
                        setError(false);
                        setSelection((s) => ({ ...s, herSign: sign }));
                      }}
                      className={`flex-1 py-2 rounded-lg border transition
                        ${
                          selection.herSign === sign
                            ? "border-neutral-300 bg-neutral-800"
                            : "border-neutral-700"
                        }`}
                    >
                      {sign}
                    </button>
                  ))}
                </div>
              </div>

              {/* His sign */}
              <div>
                <p className="text-sm text-neutral-400 mb-2">His zodiac sign</p>
                <div className="flex gap-2">
                  {mySigns.map((sign) => (
                    <button
                      key={sign}
                      onClick={() => {
                        setError(false);
                        setSelection((s) => ({ ...s, mySign: sign }));
                      }}
                      className={`flex-1 py-2 rounded-lg border transition
                        ${
                          selection.mySign === sign
                            ? "border-neutral-300 bg-neutral-800"
                            : "border-neutral-700"
                        }`}
                    >
                      {sign}
                    </button>
                  ))}
                </div>
              </div>
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
              text="Let me know the secret phrase!"
              delay={TIMING.short}
              style="italic"
            />

            <div className="mt-6 p-4 bg-neutral-800 rounded-xl text-center text-neutral-200 font-mono tracking-widest">
              {code}
            </div>

            <Button onClick={() => {}}>{COPY.reward.buttonText}</Button>
          </>
        )}
      </div>
    </main>
  );
}
