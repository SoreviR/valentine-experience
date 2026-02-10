"use client";

import { useRouter } from "next/navigation";

import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";

import { COPY } from "@/lib/copy";

export default function FocusPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col px-6 text-center">
      {/* TOP */}
      <div className="flex-1" />
      {/* CONTENT */}
      <div className="flex flex-col items-center gap-4 min-h-65">
        <TextBlock text={COPY.focus.intro} />
        <TextBlock text={COPY.focus.body} />
      </div>

      {/* ACTION */}
      <div className="flex-1 flex items-start justify-center min-h-20">
        <Button onClick={() => router.push("/reward")}>
          {COPY.focus.continue}
        </Button>
      </div>
    </main>
  );
}
