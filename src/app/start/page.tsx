"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import TextBlock from "@/components/TexBlock";
import { COPY } from "@/lib/copy";
import { TIMING } from "@/lib/timings";
import { useEffect } from "react";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center px-6">
      <TextBlock text={COPY.start.intro} delay={TIMING.short} />

      <Button onClick={() => router.push("/psyduck")}>{COPY.start.cta}</Button>
    </main>
  );
}
