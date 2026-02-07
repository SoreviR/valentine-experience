"use client";

import { useRouter } from "next/navigation";

import TextBlock from "@/components/TexBlock";
import Button from "@/components/Button";

import { COPY } from "@/lib/copy";

export default function FocusPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center gap-12">
      {/* INTRO */}
      <TextBlock text={COPY.focus.intro} />

      {/* BODY */}
      <TextBlock text={COPY.focus.body} />

      {/* CONTINUE */}
      <Button onClick={() => router.push("/reward")}>
        {COPY.focus.continue}
      </Button>
    </main>
  );
}
