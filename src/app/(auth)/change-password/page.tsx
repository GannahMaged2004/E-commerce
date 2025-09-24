// src app (auth) change-password => page.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { changePasswordReq } from "@/app/lib/auth-api";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const e = typeof window !== "undefined" ? localStorage.getItem("resetEmail") : null;
    setEmail(e);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      alert("Missing change-password email. Please start from Forgot Password again.");
      router.push("/forgot-password");
      return;
    }

    setLoading(true);
    try {
      const form = new FormData(e.currentTarget);
      const newPassword = String(form.get("newPassword") || "");
      const confirmPassword = String(form.get("confirmPassword") || "");

      if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      await changePasswordReq(email, newPassword); 
      localStorage.removeItem("resetEmail");
      setDone(true);
    } catch (err: any) {
      alert(err?.message || "Couldn’t change the password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
          <Image src="/images/login.png" alt="change password preview" fill className="object-cover" priority />
        </div>

        <div className="flex items-center">
          <div className="w-full max-w-md lg:mx-auto">
            <h1 className="text-3xl font-semibold text-neutral-600">Change Password</h1>
            <p className="mt-2 text-sm text-neutral-400">
              {email ? `Resetting password for ${email}` : "Update your password securely."}
            </p>

            {done ? (
              <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
                ✅ Password updated successfully.
                <div className="mt-4 flex items-center gap-3">
                  <Link href="/login" className="text-brand-600 hover:text-brand-700">Go to Login</Link>
                  <button
                    onClick={() => router.push("/login")}
                    className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
                  >
                    Log in now
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="newPassword" className="mb-1 block text-sm text-neutral-500"></label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    required
                    className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm text-neutral-500"></label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    className="w-full border-b border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-600 placeholder:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand-300"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-300 disabled:opacity-70"
                >
                  {loading ? "Updating ⟳" : "Update Password"}
                </button>

                <p className="text-center text-sm text-neutral-500">
                  <Link href="/forgot-password" className="text-brand-600 hover:text-brand-700">
                    Start over
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
