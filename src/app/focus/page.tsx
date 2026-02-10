"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";

import { COPY } from "@/lib/copy";

export default function FocusPage() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col px-6 text-center overflow-hidden">
      {/* BACKGROUND IMAGE */}
      <div
        className={`absolute inset-0 bg-contain bg-no-repeat bg-center transition-opacity duration-1000 ${
          showContent ? "opacity-30" : "opacity-100"
        }`}
        style={{
          backgroundImage: "url('/Nati_drawing_bg.jpeg')",
        }}
      />

      {/* CONTENT LAYER */}
      <div
        className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* TOP */}
        <div className="flex-1" />

        {/* CONTENT */}
        <div className="flex flex-col items-center gap-4 min-h-65 text-">
          <TextBlock text={COPY.focus.intro} style="font-bold" />
          <TextBlock text={COPY.focus.body} style="font-bold" />
        </div>

        {/* ACTION */}
        <div className="flex-1 flex items-start justify-center min-h-20">
          <Button onClick={() => router.push("/reward")}>
            {COPY.focus.continue}
          </Button>
        </div>
      </div>
    </main>
  );
}
