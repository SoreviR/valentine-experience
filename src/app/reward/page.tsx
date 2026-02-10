"use client";

import { useState, useEffect } from "react";
import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";
import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";

type PuzzleState = {
  herNumber: number | "";
  myNumber: number | "";
  herSign: string;
  mySign: string;
};

export default function RewardPage() {
  const [step, setStep] = useState(0);
  const TOTAL_STEPS = COPY.reward.lines.length;

  const [values, setValues] = useState<PuzzleState>({
    herNumber: "",
    myNumber: "",
    herSign: "",
    mySign: "",
  });

  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClick = () => {
    if (step < TOTAL_STEPS) setStep(step + 1);
  };

  const isSolved =
    values.herNumber === 5 &&
    values.myNumber === 13 &&
    values.herSign === "libra" &&
    values.mySign === "pisces";

  const revealReward = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reward", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Invalid");

      const data = await res.json();
      setCode(data.code);
    } catch {
      setError("Not yet. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
      {step < TOTAL_STEPS ? (
        <>
          <TextBlock text={COPY.reward.lines[step]} delay={TIMING.short} />
          <Button onClick={handleClick}>Next</Button>
        </>
      ) : (
        <>
          <TextBlock text={COPY.reward.giftText} delay={TIMING.short} />

          {/* PUZZLE / REWARD AREA */}
          <div className="flex flex-col gap-4 mt-6 w-full max-w-sm">
            {/* Numbers */}
            <select
              className="p-3 rounded-xl bg-neutral-800 text-neutral-200"
              value={values.herNumber}
              onChange={(e) =>
                setValues({ ...values, herNumber: Number(e.target.value) })
              }
            >
              <option value="" disabled>
                Your number
              </option>
              {[3, 5, 7, 9].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <select
              className="p-3 rounded-xl bg-neutral-800 text-neutral-200"
              value={values.myNumber}
              onChange={(e) =>
                setValues({ ...values, myNumber: Number(e.target.value) })
              }
            >
              <option value="" disabled>
                My number
              </option>
              {[8, 13, 21].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            {/* Signs */}
            <select
              className="p-3 rounded-xl bg-neutral-800 text-neutral-200"
              value={values.herSign}
              onChange={(e) =>
                setValues({ ...values, herSign: e.target.value })
              }
            >
              <option value="" disabled>
                Your sign
              </option>
              {["libra", "leo", "virgo"].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            <select
              className="p-3 rounded-xl bg-neutral-800 text-neutral-200"
              value={values.mySign}
              onChange={(e) => setValues({ ...values, mySign: e.target.value })}
            >
              <option value="" disabled>
                My sign
              </option>
              {["pisces", "scorpio", "cancer"].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>

            {/* ERROR / CODE */}
            <div className="min-h-6 text-sm text-neutral-400">{error}</div>

            {code && (
              <div className="p-4 bg-neutral-800 rounded-xl text-neutral-200 font-mono">
                {code}
              </div>
            )}

            {!code && (
              <Button onClick={revealReward} disabled={!isSolved || loading}>
                {loading ? "Revealing…" : COPY.reward.buttonText}
              </Button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
