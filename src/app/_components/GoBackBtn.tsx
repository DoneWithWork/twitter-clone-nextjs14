"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackBtn() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      style={{ background: "none", border: "none", cursor: "pointer" }}
      aria-label="Go back"
      title="Go back"
    >
      <ArrowLeft size={25} />
    </button>
  );
}
