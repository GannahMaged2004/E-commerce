"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyResetCodeReq } from "@/app/lib/auth-api";

export default function VerifyCodePage() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    try {
      await verifyResetCodeReq(code.trim());
      router.push("/change-password");
    } catch (err: any) {
      alert(err?.message || "Invalid or expired code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-10">
      <div className="mx-auto max-w-md rounded-md border border-neutral-100 bg-white p-6">
        <h1 className="text-2xl font-semibold text-neutral-600">Verify Reset Code</h1>
        <p className="mt-2 text-sm text-neutral-400">Enter the 6-digit code we sent to your email.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-70"
          >
            {loading ? "Verifying ⟳" : "Verify Code"}
          </button>
        </form>
      </div>
    </section>
  );
}
