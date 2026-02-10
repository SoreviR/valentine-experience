"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "@/components/Button";
import TextBlock from "@/components/TexBlock";
import { TIMING } from "@/lib/timings";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6">
      {/* Fixed vertical layout to avoid jumps */}
      <div className="flex flex-col items-center justify-center gap-6 min-h-55">
        <TextBlock text="This is just for you." delay={TIMING.short} />
        <TextBlock text="My Bailey girl." delay={TIMING.medium} />

        <TextBlock
          text="Take your time. When you’re ready, start."
          delay={TIMING.long}
        />
      </div>

      {/* Button area with reserved space */}
      <div className="min-h-16 mt-6">
        <Button onClick={() => router.push("/start")}>Start</Button>
      </div>
    </main>
  );
}
