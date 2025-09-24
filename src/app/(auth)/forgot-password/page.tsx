// src app (auth) forgot-password => page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { forgotPasswordReq } from "@/app/lib/auth-api";
import { useRouter } from "next/navigation";

function isEmail(value: string) {
  return /\S+@\S+\.\S+/.test(value);
}

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const identifier = String(form.get("identifier") || "").trim();

      if (!isEmail(identifier)) {
        alert("Please enter a valid email address. Phone numbers aren’t supported for password reset.");
        return;
      }

      await forgotPasswordReq(identifier);

      localStorage.setItem("resetEmail", identifier);
      setEmail(identifier);
      setSent(true);
    } catch (err: any) {
      alert(err?.message || "Couldn’t send the reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
          <Image src="/images/login.png" alt="forgot password preview" fill className="object-cover" priority />
        </div>

        <div className="flex items-center">
          <div className="w-full max-w-md lg:mx-auto">
            <h1 className="text-3xl font-semibold text-neutral-600">Forgot Password</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Enter your email to receive a reset link.
            </p>

            {sent ? (
              <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
                ✅ If the account exists, a reset link/code has been sent to <span className="font-medium">{email}</span>.
                <div className="mt-4 flex items-center gap-3">
                  <Link href="/login" className="text-brand-600 hover:text-brand-700">Back to Login</Link>
                  <button
                    onClick={() => router.push("/verify-code")}
                    className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
                  >
                    I have the code
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="identifier" className="mb-1 block text-sm text-neutral-500"></label>
                  <input
                    id="identifier"
                    name="identifier"
                    type="text"
                    placeholder="Email"
                    required
                    className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-70"
                >
                  {loading ? "Sending ⟳" : "Send Reset Link"}
                </button>

                <p className="text-center text-sm text-neutral-500">
                  Remember your password?{" "}
                  <Link href="/login" className="text-brand-600 hover:text-brand-700">Log in</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}